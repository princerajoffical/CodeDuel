import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Auth/Home";
import CreateRoom from "../pages/Auth/CreateRoom";
import JoinRoom from "../pages/Auth/JoinRoom";
import WaitingRoom from "../pages/Auth/WaitingRoom";
import DuelPage from "../pages/Duel/DuelPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Auth/Profile";
import Leaderboard from "../pages/Dashboard/Leaderboard";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth routes without full layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main app routes wrapped in Layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/leaderboard"
                        element={
                            <ProtectedRoute>
                                <Leaderboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create-room"
                        element={
                            <ProtectedRoute>
                                <CreateRoom />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/join-room"
                        element={
                            <ProtectedRoute>
                                <JoinRoom />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/waiting/:roomCode"
                        element={
                            <ProtectedRoute>
                                <WaitingRoom />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/duel/:roomCode"
                        element={
                            <ProtectedRoute>
                                <DuelPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;