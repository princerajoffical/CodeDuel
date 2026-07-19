export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    rating: number;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}