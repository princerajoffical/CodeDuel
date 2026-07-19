const Room = require("../models/Room");
const generateRoomCode = require("../utils/generateRoomCode");

const createRoom = async ({
    roomName,
    difficulty,
    language,
    timeLimit,
    hostId,
}) => {
    const roomCode = await generateRoomCode();

    const room = await Room.create({
        roomName,
        roomCode,
        difficulty,
        language,
        timeLimit,
        host: hostId,
        players: [hostId],
        status: "waiting",
    });

    return room;
};

const getRoomByCode = async (roomCode) => {
    const room = await Room.findOne({ roomCode })
        .populate("host", "username rating")
        .populate("players", "username rating")
        .populate("problem");
    return room;
};

const joinRoom = async ({ roomCode, userId }) => {
    const room = await Room.findOne({ roomCode });
    if (!room) {
        const error = new Error("Couldn't join the room - We couldn't find a room with that code. Double-check the code and try again.");
        error.status = 404;
        throw error;
    }

    if (room.status !== "waiting") {
        const error = new Error("Room already started - The duel has already begun.");
        error.status = 400;
        throw error;
    }

    // Check if player is already in room
    const isPlayerAlreadyInRoom = room.players.includes(userId);
    if (room.players.length >= 2 && !isPlayerAlreadyInRoom) {
        const error = new Error("Room is already full - This duel already has two participants.");
        error.status = 400;
        throw error;
    }

    if (!isPlayerAlreadyInRoom) {
        room.players.push(userId);
        await room.save();
    }

    const populatedRoom = await Room.findOne({ roomCode })
        .populate("host", "username rating")
        .populate("players", "username rating")
        .populate("problem");

    return populatedRoom;
};

module.exports = {
    createRoom,
    getRoomByCode,
    joinRoom,
};