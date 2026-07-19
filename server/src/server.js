require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDb = require("./config/db");
const roomSocket = require("./sockets/roomSocket");

connectDb();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

roomSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT}`);
});

// Graceful shutdown to release port 5000 cleanly on restart/exit
const gracefulShutdown = () => {
    console.log("Shutting down gracefully...");
    try {
        io.close();
    } catch (err) {
        console.error("Error closing socket.io server:", err);
    }
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
    
    // Force exit after 800ms to prevent hanging
    setTimeout(() => {
        console.log("Force exiting...");
        process.exit(0);
    }, 800);
};

process.once("SIGUSR2", () => {
    gracefulShutdown();
});

process.on("SIGINT", () => {
    gracefulShutdown();
});

process.on("SIGTERM", () => {
    gracefulShutdown();
});