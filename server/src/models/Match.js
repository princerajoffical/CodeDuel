const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        roomCode: {
            type: String,
            required: true,
        },
        roomName: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        loser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        winnerEloChange: {
            type: Number,
            required: true,
        },
        loserEloChange: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["completed", "forfeited"],
            default: "completed",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Match", matchSchema);
