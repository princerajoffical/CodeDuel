import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
    House,
    User,
    Trophy,
    PlusCircle,
    DoorOpen,
    Settings,
    X,
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs"
                        onClick={onClose}
                    />

                    {/* Sidebar Container */}
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-border-primary bg-bg-primary shadow-premium-lg flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border-primary p-5 h-16">
                            <h1 className="text-xl font-bold tracking-tight text-text-primary">
                                CodeDuel
                            </h1>

                            <button
                                onClick={onClose}
                                className="rounded-lg p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 mt-6 flex flex-col gap-1.5 px-3">
                            <SidebarLink
                                to="/"
                                icon={<House size={18} />}
                                text="Home"
                                active={location.pathname === "/"}
                                onClick={onClose}
                            />

                            <SidebarLink
                                to="/profile"
                                icon={<User size={18} />}
                                text="Profile"
                                active={location.pathname === "/profile"}
                                onClick={onClose}
                            />

                            <SidebarLink
                                to="/leaderboard"
                                icon={<Trophy size={18} />}
                                text="Leaderboard"
                                active={location.pathname === "/leaderboard"}
                                onClick={onClose}
                            />

                            <SidebarLink
                                to="/create-room"
                                icon={<PlusCircle size={18} />}
                                text="Create Room"
                                active={location.pathname === "/create-room"}
                                onClick={onClose}
                            />

                            <SidebarLink
                                to="/join-room"
                                icon={<DoorOpen size={18} />}
                                text="Join Room"
                                active={location.pathname === "/join-room"}
                                onClick={onClose}
                            />

                            <SidebarLink
                                to="/dashboard"
                                icon={<Settings size={18} />}
                                text="Dashboard"
                                active={location.pathname === "/dashboard"}
                                onClick={onClose}
                            />
                        </nav>

                        {/* Footer Info */}
                        <div className="p-5 border-t border-border-primary text-[10px] font-semibold text-text-secondary font-mono tracking-wider uppercase">
                            v0.1.0 • client
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

interface SidebarLinkProps {
    to: string;
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
}

const SidebarLink = ({ to, icon, text, active, onClick }: SidebarLinkProps) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
            active
                ? "bg-primary-light text-primary font-semibold"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
        }`}
    >
        <span className={active ? "text-primary" : "text-text-secondary"}>
            {icon}
        </span>
        <span>{text}</span>
    </Link>
);

export default Sidebar;