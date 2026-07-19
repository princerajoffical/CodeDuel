const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
        },
        description: {
            type: String,
            required: true,
        },
        inputFormat: {
            type: String,
        },
        outputFormat: {
            type: String,
        },
        examples: [
            {
                input: String,
                output: String,
                explanation: String,
            },
        ],
        constraints: [String],
        languageTemplates: {
            cpp: String,
            java: String,
            python: String,
            javascript: String,
            c: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Problem", problemSchema);
