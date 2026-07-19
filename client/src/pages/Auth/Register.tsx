import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const data = await registerUser(formData);
            if (data.token) {
                login(data.token, data.user);
                const redirectPath = location.state?.from?.pathname || "/";
                navigate(redirectPath, { replace: true });
            } else {
                alert("Registration successful! You can now sign in.");
                navigate("/login", { state: location.state });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create account. Please check inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-secondary p-6">
            <Card className="w-full max-w-md shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_36px_rgba(0,0,0,0.03)] border-border-primary p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <Link
                            to="/"
                            className="inline-flex h-9 w-9 rounded-xl bg-text-primary text-bg-primary items-center justify-center text-sm font-extrabold shadow-sm mb-4 font-sans"
                        >
                            CD
                        </Link>
                        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-sm text-text-secondary font-medium mt-1">
                            Sign up to start hosting matches and tracking your rating.
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-xs text-red-650 text-center font-semibold">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            label="Username"
                            type="text"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                            name="username"
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                    </div>

                    <Button type="submit" isLoading={loading} className="w-full">
                        Sign Up
                    </Button>

                    <p className="text-center text-sm font-medium text-text-secondary">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            state={location.state}
                            className="font-semibold text-primary hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Register;
// 