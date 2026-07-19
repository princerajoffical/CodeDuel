const Room = require("../models/Room");
const User = require("../models/User");
const Match = require("../models/Match");
const Problem = require("../models/Problem");

// Expected score ELO calculations
const calculateElo = (winnerRating, loserRating) => {
    const K = 32;
    const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));

    const winnerChange = Math.round(K * (1 - expectedWinner));
    const loserChange = Math.round(K * (0 - expectedLoser));

    return {
        winnerChange: winnerChange > 0 ? winnerChange : 1,
        loserChange: loserChange < 0 ? loserChange : -1
    };
};

module.exports = (io) => {
    const handleMatchEnd = async (roomCode, winnerUserId, loserUserId, status = "completed") => {
        try {
            const room = await Room.findOne({ roomCode });
            if (!room || room.status === "finished") return;

            const winnerUser = await User.findById(winnerUserId);
            const loserUser = await User.findById(loserUserId);

            if (!winnerUser || !loserUser) return;

            const { winnerChange, loserChange } = calculateElo(winnerUser.rating, loserUser.rating);

            // Update stats
            winnerUser.rating += winnerChange;
            winnerUser.matchesPlayed += 1;
            winnerUser.matchesWon += 1;
            await winnerUser.save();

            loserUser.rating += loserChange;
            loserUser.matchesPlayed += 1;
            loserUser.losses += 1;
            await loserUser.save();

            // Create Match history
            await Match.create({
                roomCode,
                roomName: room.roomName,
                difficulty: room.difficulty,
                language: room.language,
                players: [winnerUser._id, loserUser._id],
                winner: winnerUser._id,
                loser: loserUser._id,
                winnerEloChange: winnerChange,
                loserEloChange: loserChange,
                status,
            });

            room.status = "finished";
            await room.save();

            console.log(`[Socket] Match Ended: ${roomCode}, winner: ${winnerUser.username}`);
            io.to(roomCode).emit("match-end", {
                winner: winnerUser.username,
                winnerId: winnerUser._id,
                winnerRating: winnerUser.rating,
                winnerChange,
                loser: loserUser.username,
                loserId: loserUser._id,
                loserRating: loserUser.rating,
                loserChange,
                status,
            });
        } catch (err) {
            console.error("Failed to complete match end tasks:", err);
        }
    };

    const broadcastRoomUpdate = async (roomCode) => {
        try {
            const populatedRoom = await Room.findOne({ roomCode })
                .populate("players", "username rating");

            if (!populatedRoom) return;

            const sockets = await io.in(roomCode).fetchSockets();

            const playersList = populatedRoom.players.map(p => {
                const connectedSocket = sockets.find(s => s.userId === p._id.toString());
                return {
                    socketId: connectedSocket ? connectedSocket.id : null,
                    userId: p._id.toString(),
                    username: p.username,
                    rating: p.rating || 1200,
                    isHost: populatedRoom.host.toString() === p._id.toString()
                };
            });

            console.log(`[Socket] Room Updated: ${roomCode}, players count: ${playersList.length}/2`);
            io.to(roomCode).emit("room-update", playersList);
        } catch (err) {
            console.error("Error broadcasting room update:", err);
        }
    };

    io.on("connection", (socket) => {
        console.log(`[Socket] Client Connected: ${socket.id}`);

        socket.on("join-room", async ({ roomCode, userId, username }) => {
            if (!roomCode || !userId || !username) {
                return;
            }

            console.log(`[Socket] Room Joined Request: ${roomCode} by ${username} (${userId})`);

            try {
                const dbRoom = await Room.findOne({ roomCode });
                if (!dbRoom) {
                    socket.emit("match-error", "Room not found in database.");
                    return;
                }

                // Store state on socket connection object instead of in global memory map
                socket.userId = userId;
                socket.username = username;
                socket.roomCode = roomCode;

                socket.join(roomCode);

                const isAuthorized = dbRoom.players.some(p => p.toString() === userId);
                if (!isAuthorized && dbRoom.players.length < 2) {
                    dbRoom.players.push(userId);
                    await dbRoom.save();
                } else if (!isAuthorized) {
                    socket.emit("room-full");
                    return;
                }

                await broadcastRoomUpdate(roomCode);
            } catch (err) {
                console.error("Error joining socket room:", err);
                socket.emit("match-error", "Internal server error on join.");
            }
        });

        socket.on("leave-room", async ({ roomCode }) => {
            if (!roomCode) return;

            const userId = socket.userId;
            if (!userId) return;

            console.log(`[Socket] Player Left: ${socket.username || userId} from room ${roomCode}`);

            try {
                const dbRoom = await Room.findOne({ roomCode });
                if (dbRoom) {
                    if (dbRoom.status === "active") {
                        dbRoom.status = "finished";
                        await dbRoom.save();
                        io.to(roomCode).emit("match-end", {
                            status: "cancelled",
                            message: "Match cancelled: a contender left the duel before completion."
                        });
                        return;
                    } else if (dbRoom.status === "waiting") {
                        const isHost = dbRoom.host.toString() === userId;
                        if (isHost) {
                            console.log(`[Socket] Room Deleted (Host Left waiting room): ${roomCode}`);
                            await Room.deleteOne({ roomCode });
                            io.to(roomCode).emit("match-error", "Lobby closed by the host.");
                            return;
                        } else {
                            dbRoom.players = dbRoom.players.filter(p => p.toString() !== userId);
                            await dbRoom.save();
                        }
                    }
                }
            } catch (err) {
                console.error("Error in leave-room:", err);
            }

            socket.leave(roomCode);
            await broadcastRoomUpdate(roomCode);
        });

        socket.on("start-match", async ({ roomCode }) => {
            if (!roomCode) return;

            try {
                const dbRoom = await Room.findOne({ roomCode });
                if (!dbRoom) {
                    socket.emit("match-error", "Room not found.");
                    return;
                }
                if (dbRoom.players.length !== 2) {
                    socket.emit("match-error", "Need exactly 2 players to start.");
                    return;
                }
                if (dbRoom.status !== "waiting") {
                    socket.emit("match-error", "Room is already active or finished.");
                    return;
                }

                const isHost = dbRoom.host.toString() === socket.userId;
                if (!isHost) {
                    socket.emit("match-error", "Only the host can start the match.");
                    return;
                }

                // Retrieve all problems matching room's difficulty
                const problems = await Problem.find({ difficulty: dbRoom.difficulty });
                if (!problems || problems.length === 0) {
                    socket.emit("match-error", `No problems found for difficulty ${dbRoom.difficulty}.`);
                    return;
                }

                // Choose a random problem
                const randomIndex = Math.floor(Math.random() * problems.length);
                const chosenProblem = problems[randomIndex];

                dbRoom.problem = chosenProblem._id;
                dbRoom.status = "active";
                await dbRoom.save();

                console.log(`[Socket] Match Started: ${roomCode} with problem ${chosenProblem.title}`);
                io.to(roomCode).emit("match-start", {
                    roomCode,
                });
            } catch (err) {
                console.error("Failed to start match:", err);
                socket.emit("match-error", "Failed to start match on server.");
            }
        });

        socket.on("submit-success", async ({ roomCode, userId }) => {
            try {
                const dbRoom = await Room.findOne({ roomCode });
                if (!dbRoom || dbRoom.status !== "active") return;

                const winnerId = userId;
                const loserId = dbRoom.players.find(p => p.toString() !== winnerId)?.toString();

                if (winnerId && loserId) {
                    await handleMatchEnd(roomCode, winnerId, loserId, "completed");
                }
            } catch (err) {
                console.error("Error in submit-success handler:", err);
            }
        });

        socket.on("disconnect", async () => {
            const userId = socket.userId;
            const roomCode = socket.roomCode;
            if (!userId || !roomCode) {
                console.log(`[Socket] Client Disconnected: ${socket.id}`);
                return;
            }

            console.log(`[Socket] Player Disconnected: ${socket.username || userId} from room ${roomCode}`);

            try {
                const dbRoom = await Room.findOne({ roomCode });
                if (dbRoom) {
                    if (dbRoom.status === "active") {
                        dbRoom.status = "finished";
                        await dbRoom.save();
                        io.to(roomCode).emit("match-end", {
                            status: "cancelled",
                            message: "Match cancelled: a contender disconnected before completion."
                        });
                        return;
                    } else if (dbRoom.status === "waiting") {
                        const isHost = dbRoom.host.toString() === userId;
                        if (isHost) {
                            console.log(`[Socket] Room Deleted (Host disconnected): ${roomCode}`);
                            await Room.deleteOne({ roomCode });
                            io.to(roomCode).emit("match-error", "Lobby host disconnected.");
                            return;
                        } else {
                            dbRoom.players = dbRoom.players.filter(p => p.toString() !== userId);
                            await dbRoom.save();
                        }
                    }
                }
            } catch (err) {
                console.error("Error in disconnect handler:", err);
            }

            await broadcastRoomUpdate(roomCode);
        });
    });
};