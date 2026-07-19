import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated, initialized } = useAuth();
    const location = useLocation();

    // Wait until auth state is restored from localStorage
    if (!initialized) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <p className="text-lg font-medium text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;