const User = require("../models/User");
const Match = require("../models/Match");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        // Password Validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                rating: user.rating,
                matchesPlayed: user.matchesPlayed,
                matchesWon: user.matchesWon,
                losses: user.losses,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                rating: user.rating,
                matchesPlayed: user.matchesPlayed,
                matchesWon: user.matchesWon,
                losses: user.losses,
            },
        });
    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        const rank = await User.countDocuments({ rating: { $gt: user.rating } }) + 1;
        res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                id: user._id,
                rank,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Leaderboard
const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({}, "username rating matchesPlayed matchesWon losses")
            .sort({ rating: -1 })
            .limit(100);
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getRecentMatches = async (req, res) => {
    try {
        const matches = await Match.find({ players: req.user._id })
            .populate("players", "username rating")
            .populate("winner", "username")
            .populate("loser", "username")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            matches,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    getLeaderboard,
    getRecentMatches,
};