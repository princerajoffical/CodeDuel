import api from "./api";

export interface CreateRoomData {
    roomName: string;
    difficulty: string;
    language: string;
    timeLimit: number;
}

export interface PlayerData {
    _id: string;
    username: string;
    rating: number;
}

export interface RoomData {
    _id: string;
    roomName: string;
    roomCode: string;
    difficulty: string;
    language: string;
    timeLimit: number;
    host: PlayerData;
    players: PlayerData[];
    status: "waiting" | "active" | "finished";
    createdAt: string;
    updatedAt: string;
}

export interface RoomResponse {
    success: boolean;
    message?: string;
    room: RoomData;
}

export const createRoom = async (data: CreateRoomData): Promise<RoomResponse> => {
    const response = await api.post<RoomResponse>("/room/create", data);
    return response.data;
};

export const joinRoom = async (roomCode: string): Promise<RoomResponse> => {
    const response = await api.post<RoomResponse>("/room/join", { roomCode });
    return response.data;
};

export const getRoom = async (roomCode: string): Promise<RoomResponse> => {
    const response = await api.get<RoomResponse>(`/room/${roomCode}`);
    return response.data;
};
