import api from "./api";

export interface MatchEntry {
    _id: string;
    roomCode: string;
    roomName: string;
    difficulty: string;
    language: string;
    winner: {
        id: any;
        _id: string;
        username: string;
    };
    loser: {
        _id: string;
        username: string;
    };
    players: {
        _id: string;
        username: string;
        rating?: number;
    }[];
    winnerEloChange: number;
    loserEloChange: number;
    status: string;
    createdAt: string;
}

export interface RecentMatchesResponse {
    success: boolean;
    matches: MatchEntry[];
}

export const getRecentMatches = async (): Promise<RecentMatchesResponse> => {
    const response = await api.get<RecentMatchesResponse>("/auth/recent-matches");
    return response.data;
};
