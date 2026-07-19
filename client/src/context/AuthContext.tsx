import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";

import { getUserProfile } from "../services/userService";

import type { User } from "../types/auth";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    initialized: boolean;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    const normalizeUser = (u: any): User | null => {
        if (!u) return null;
        const normalized = { ...u };
        if (normalized._id && !normalized.id) {
            normalized.id = normalized._id.toString();
        }
        if (normalized.id && !normalized._id) {
            normalized._id = normalized.id;
        }
        return normalized;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const verifySession = async () => {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken && savedUser) {
                setToken(savedToken);
                try {
                    setUser(normalizeUser(JSON.parse(savedUser)));
                    const res = await getUserProfile();
                    if (res && res.success && res.user) {
                        const freshUser = normalizeUser(res.user);
                        setUser(freshUser);
                        localStorage.setItem("user", JSON.stringify(freshUser));
                    } else {
                        logout();
                    }
                } catch (err) {
                    console.error("Failed to restore session profile:", err);
                    logout();
                }
            }

            setInitialized(true);
        };

        verifySession();
    }, []);

    const login = (token: string, user: User) => {
        const normalized = normalizeUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(normalized));

        setToken(token);
        setUser(normalized);
    };



    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
                initialized,
                setUser: (u) => setUser(normalizeUser(u)),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};