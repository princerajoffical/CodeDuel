import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Menu,
    User,
    LogOut,
    ChevronDown,
    LayoutDashboard,
    Trophy,
    Sun,
    Moon,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Watch scroll position to trigger background opacity / blur
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/", { replace: true });
    };

    const handleFeaturesScroll = (e: React.MouseEvent) => {
        if (location.pathname === "/") {
            e.preventDefault();
            const el = document.getElementById("features");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleHowItWorksScroll = (e: React.MouseEvent) => {
        if (location.pathname === "/") {
            e.preventDefault();
            const el = document.getElementById("how-it-works");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-bg-primary/85 border-b border-border-primary shadow-[0_2px_8px_rgba(0,0,0,0.01)] backdrop-blur-md"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Left Section */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={onMenuClick}
                        className="rounded-xl p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary/40 transition md:hidden"
                    >
                        <Menu size={20} />
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-text-primary group font-display"
                    >
                        <span className="w-8 h-8 rounded-xl bg-text-primary text-bg-primary flex items-center justify-center text-sm font-extrabold shadow-sm group-hover:scale-105 transition-transform duration-200 font-sans">CD</span>
                        <span className="font-display font-black tracking-tighter">CodeDuel</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6 ml-4 font-sans">
                        <Link
                            to="/"
                            className={`text-sm font-semibold transition-colors ${
                                location.pathname === "/"
                                    ? "text-text-primary font-bold border-b-2 border-text-primary pb-1"
                                    : "text-text-secondary hover:text-text-primary"
                            }`}
                        >
                            Home
                        </Link>
                        <a
                            href="/#features"
                            onClick={handleFeaturesScroll}
                            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors font-medium"
                        >
                            Features
                        </a>
                        <a
                            href="/#how-it-works"
                            onClick={handleHowItWorksScroll}
                            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors font-medium"
                        >
                            How It Works
                        </a>
                        <Link
                            to="/leaderboard"
                            className={`text-sm font-semibold transition-colors ${
                                location.pathname === "/leaderboard"
                                    ? "text-text-primary font-bold border-b-2 border-text-primary pb-1"
                                    : "text-text-secondary hover:text-text-primary"
                            }`}
                        >
                            Leaderboard
                        </Link>
                        {user && (
                            <Link
                                to="/dashboard"
                                className={`text-sm font-semibold transition-colors ${
                                    location.pathname === "/dashboard"
                                        ? "text-text-primary font-bold border-b-2 border-text-primary pb-1"
                                        : "text-text-secondary hover:text-text-primary"
                                }`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-secondary/40 transition"
                        title="Toggle Theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-primary px-4 py-2 text-sm font-semibold text-text-primary hover:bg-bg-secondary shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition"
                            >
                                <span className="w-5 h-5 rounded-full bg-bg-secondary border border-border-primary flex items-center justify-center text-[10px] font-extrabold text-text-primary">
                                    {user.username.substring(0, 2).toUpperCase()}
                                </span>
                                <span>{user.username}</span>
                                <ChevronDown
                                    size={14}
                                    className={`text-gray-400 transition-transform duration-200 ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-border-primary bg-bg-primary shadow-premium-lg p-1.5 transition-all duration-200 animate-in fade-in zoom-in-95">
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-primary hover:bg-bg-secondary transition"
                                    >
                                        <LayoutDashboard size={16} className="text-text-secondary" />
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-primary hover:bg-bg-secondary transition"
                                    >
                                        <User size={16} className="text-text-secondary" />
                                        Profile
                                    </Link>

                                    <Link
                                        to="/leaderboard"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-primary hover:bg-bg-secondary transition"
                                    >
                                        <Trophy size={16} className="text-text-secondary" />
                                        Leaderboard
                                    </Link>

                                    <div className="my-1 border-t border-border-primary" />

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="text-sm font-semibold text-text-secondary hover:text-text-primary px-4 py-2 transition"
                            >
                                Sign In
                            </Link>

                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;