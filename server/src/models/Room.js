const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
            trim: true,
        },
        roomCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
        },
        language: {
            type: String,
            required: true,
            enum: ["cpp", "java", "python"],
        },
        timeLimit: {
            type: Number,
            required: true, // in minutes
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ["waiting", "active", "finished"],
            default: "waiting",
        },
        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Room", roomSchema);
