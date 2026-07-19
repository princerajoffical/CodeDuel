const express = require("express");
const router = express.Router();
const { register, login, getProfile, getLeaderboard, getRecentMatches } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.get("/leaderboard", getLeaderboard);
router.get("/recent-matches", authMiddleware, getRecentMatches);
module.exports = router;