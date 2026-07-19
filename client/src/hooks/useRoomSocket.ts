import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../sockets/socket";
import { SocketEvents } from "../sockets/socketEvents";
import useAuth from "./useAuth";

export interface Player {
    socketId: string;
    userId: string;
    username: string;
    isHost: boolean;
}

export const useRoomSocket = (roomCode: string | undefined) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [roomFull, setRoomFull] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isStartingRef = useRef(false);

    const userId = user?.id;
    const username = user?.username;

    useEffect(() => {
        if (!roomCode || !userId || !username) return;

        const joinRoom = () => {
            socket.emit(SocketEvents.JOIN_ROOM, {
                roomCode,
                userId,
                username,
            });
        };

        // Event listeners
        const handleRoomUpdate = (updatedPlayers: Player[]) => {
            setPlayers(updatedPlayers);
        };

        const handleRoomFull = () => {
            setRoomFull(true);
        };

        const handleMatchError = (msg: string) => {
            setError(msg);
        };

        const handleMatchStart = (data: { roomCode: string }) => {
            isStartingRef.current = true;
            navigate(`/duel/${data.roomCode}`);
        };

        socket.on(SocketEvents.ROOM_UPDATE, handleRoomUpdate);
        socket.on(SocketEvents.ROOM_FULL, handleRoomFull);
        socket.on(SocketEvents.MATCH_ERROR, handleMatchError);
        socket.on(SocketEvents.MATCH_START, handleMatchStart);

        // Auto-join on reconnects
        socket.on("connect", joinRoom);

        // Connect socket if disconnected (placed after listeners to avoid race conditions)
        if (!socket.connected) {
            socket.connect();
        } else {
            joinRoom();
        }

        // Cleanup
        return () => {
            socket.off("connect", joinRoom);
            socket.off(SocketEvents.ROOM_UPDATE, handleRoomUpdate);
            socket.off(SocketEvents.ROOM_FULL, handleRoomFull);
            socket.off(SocketEvents.MATCH_ERROR, handleMatchError);
            socket.off(SocketEvents.MATCH_START, handleMatchStart);
        };
    }, [roomCode, userId, username, navigate]);

    const startMatch = () => {
        if (!roomCode) return;
        socket.emit(SocketEvents.START_MATCH, { roomCode });
    };

    const leaveRoom = () => {
        if (!roomCode) return;
        socket.emit(SocketEvents.LEAVE_ROOM, { roomCode });
        socket.disconnect();
    };

    const isHost = players.find((p) => p.userId === user?.id)?.isHost || false;

    return {
        players,
        isHost,
        roomFull,
        error,
        startMatch,
        leaveRoom,
    };
};
