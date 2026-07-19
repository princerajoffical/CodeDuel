const roomService = require("../services/roomService");

const createRoom = async (req, res) => {
    try {
        const {
            roomName,
            difficulty,
            language,
            timeLimit,
        } = req.body;

        if (!roomName || !difficulty || !language || !timeLimit) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const room = await roomService.createRoom({
            roomName,
            difficulty,
            language,
            timeLimit,
            hostId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            room,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getRoomDetails = async (req, res) => {
    try {
        const { roomCode } = req.params;

        if (!roomCode) {
            return res.status(400).json({
                success: false,
                message: "Room code is required",
            });
        }

        const room = await roomService.getRoomByCode(roomCode);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        return res.status(200).json({
            success: true,
            room,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const joinRoom = async (req, res) => {
    try {
        const { roomCode } = req.body;

        if (!roomCode) {
            return res.status(400).json({
                success: false,
                message: "Room code is required",
            });
        }

        const room = await roomService.joinRoom({
            roomCode: roomCode.trim().toUpperCase(),
            userId: req.user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Successfully joined the room",
            room,
        });

    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Internal Server Error";
        return res.status(status).json({
            success: false,
            message,
        });
    }
};

module.exports = {
    createRoom,
    getRoomDetails,
    joinRoom,
};