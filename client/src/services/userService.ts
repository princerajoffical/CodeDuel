import api from "./api";

export interface LeaderboardUser {
    username: string;
    rating: number;
    matchesPlayed: number;
    matchesWon: number;
    losses: number;
}

export interface UserProfileResponse {
    success: boolean;
    user: {
        id: string;
        username: string;
        email: string;
        rating: number;
        matchesPlayed: number;
        matchesWon: number;
        losses: number;
        rank?: number;
    };
}

export interface LeaderboardResponse {
    success: boolean;
    users: LeaderboardUser[];
}

export const getUserProfile = async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>("/auth/profile");
    return response.data;
};

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
    const response = await api.get<LeaderboardResponse>("/auth/leaderboard");
    return response.data;
};
