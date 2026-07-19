const Room = require("../models/Room");

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateRandomCode = (length = 6) => {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += CHARACTERS.charAt(
            Math.floor(Math.random() * CHARACTERS.length)
        );
    }

    return code;
};

const generateRoomCode = async () => {
    let code;
    let exists = true;

    while (exists) {
        code = generateRandomCode();

        exists = await Room.exists({
            roomCode: code,
        });
    }

    return code;
};

module.exports = generateRoomCode;