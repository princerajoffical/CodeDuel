import { Link } from "react-router-dom";
import { Mail } from "lucide-react"; 

const Github = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="border-t border-border-primary bg-bg-primary text-text-primary">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2 font-display">
                            <span className="w-6 h-6 rounded-lg bg-text-primary text-bg-primary flex items-center justify-center text-xs font-extrabold shadow-xs font-sans">CD</span>
                            <span className="text-lg font-black tracking-tighter text-text-primary">
                                CodeDuel
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
                            Real-time competitive coding platform built
                            for developers who love solving algorithmic challenges.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 font-mono">
                            Navigation
                        </h3>
                        <div className="flex flex-col gap-2.5 text-sm text-text-secondary font-medium">
                            <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
                            <Link to="/profile" className="hover:text-text-primary transition-colors">Profile</Link>
                            <Link to="/leaderboard" className="hover:text-text-primary transition-colors">Leaderboard</Link>
                            <Link to="/dashboard" className="hover:text-text-primary transition-colors">Dashboard</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 font-mono">
                            Connect
                        </h3>
                        <div className="flex gap-4 text-text-secondary">
                            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub">
                                <Github className="cursor-pointer hover:text-primary transition-colors" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
                                <Linkedin className="cursor-pointer hover:text-primary transition-colors" />
                            </a>
                            <a href="mailto:info@codeduel.com" title="Email Us">
                                <Mail size={20} className="cursor-pointer hover:text-primary transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border-primary flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary font-medium">
                    <span>© 2026 CodeDuel. All rights reserved.</span>
                    <span className="mt-2 md:mt-0 font-mono">Designed for speed & precision.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;