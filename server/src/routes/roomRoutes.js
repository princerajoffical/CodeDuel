const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roomController = require("../controllers/roomController");

router.post(
    "/create",
    authMiddleware,
    roomController.createRoom
);

router.post(
    "/join",
    authMiddleware,
    roomController.joinRoom
);

router.get(
    "/:roomCode",
    authMiddleware,
    roomController.getRoomDetails
);

module.exports = router;