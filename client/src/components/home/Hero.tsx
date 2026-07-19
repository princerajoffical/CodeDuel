import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Trophy, Users, Shield, Play } from "lucide-react";
import Button from "../ui/Button";

const AnimatedIllustration = () => {
    return (
        <div className="relative w-full max-w-[480px] h-[380px] flex items-center justify-center">
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-text-secondary/5 dark:bg-text-secondary/2 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-40 h-40 bg-text-secondary/5 dark:bg-text-secondary/2 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

            <svg viewBox="0 0 500 380" width="100%" height="100%" fill="none" className="w-full h-full select-none">
                {/* Connection lines backdrops */}
                <path d="M 90 130 C 180 130, 160 190, 250 190" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                <path d="M 410 130 C 320 130, 340 190, 250 190" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                <path d="M 250 190 L 250 290" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />

                {/* Animated transmission particles */}
                <motion.circle
                    r="3.5"
                    fill="var(--text-primary)"
                    animate={{
                        cx: [90, 150, 190, 250],
                        cy: [130, 130, 170, 190]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                />

                <motion.circle
                    r="3.5"
                    fill="var(--text-primary)"
                    animate={{
                        cx: [250, 250],
                        cy: [190, 290]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "linear",
                        delay: 1.2
                    }}
                />

                {/* Left Coder Card */}
                <motion.g
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                    transition={{
                        x: { duration: 0.6 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                    }}
                >
                    {/* Glassmorphic Board */}
                    <rect x="20" y="50" width="130" height="120" rx="12" fill="var(--color-bg-primary)" stroke="var(--border)" strokeWidth="1.5" className="shadow-premium" />
                    <rect x="20" y="50" width="130" height="24" rx="12" fill="var(--color-bg-secondary)" stroke="var(--border)" strokeWidth="1.5" />
                    {/* Window Controls */}
                    <circle cx="34" cy="62" r="3" fill="var(--text-primary)" opacity="0.3" />
                    <circle cx="44" cy="62" r="3" fill="var(--text-primary)" opacity="0.2" />
                    <circle cx="54" cy="62" r="3" fill="var(--text-primary)" opacity="0.1" />
                    <text x="68" y="65" fill="var(--color-text-secondary)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="600" opacity="0.6">arena.cpp</text>

                    {/* Code lines */}
                    <rect x="32" y="86" width="45" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.8" />
                    <rect x="32" y="96" width="70" height="3.5" rx="1.5" fill="var(--color-text-secondary)" opacity="0.4" />
                    <rect x="42" y="106" width="60" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.6" />
                    <rect x="42" y="116" width="40" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.4" />
                    <rect x="32" y="126" width="25" height="3.5" rx="1.5" fill="var(--color-text-secondary)" opacity="0.4" />

                    {/* Developer Avatar Badge */}
                    <rect x="28" y="142" width="44" height="16" rx="8" fill="var(--color-bg-secondary)" stroke="var(--border)" strokeWidth="1" />
                    <circle cx="36" cy="150" r="4.5" fill="var(--text-primary)" />
                    <text x="44" y="153" fill="var(--color-text-primary)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="700">Dev A</text>
                </motion.g>

                {/* Right Coder Card */}
                <motion.g
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
                    transition={{
                        x: { duration: 0.6 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }
                    }}
                >
                    {/* Glassmorphic Board */}
                    <rect x="350" y="50" width="130" height="120" rx="12" fill="var(--color-bg-primary)" stroke="var(--border)" strokeWidth="1.5" className="shadow-premium" />
                    <rect x="350" y="50" width="130" height="24" rx="12" fill="var(--color-bg-secondary)" stroke="var(--border)" strokeWidth="1.5" />
                    {/* Window Controls */}
                    <circle cx="364" cy="62" r="3" fill="var(--text-primary)" opacity="0.3" />
                    <circle cx="374" cy="62" r="3" fill="var(--text-primary)" opacity="0.2" />
                    <circle cx="384" cy="62" r="3" fill="var(--text-primary)" opacity="0.1" />
                    <text x="398" y="65" fill="var(--color-text-secondary)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="600" opacity="0.6">arena.py</text>

                    {/* Code lines */}
                    <rect x="362" y="86" width="50" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.8" />
                    <rect x="362" y="96" width="35" height="3.5" rx="1.5" fill="var(--color-text-secondary)" opacity="0.4" />
                    <rect x="372" y="106" width="65" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.6" />
                    <rect x="372" y="116" width="50" height="3.5" rx="1.5" fill="var(--text-primary)" opacity="0.4" />
                    <rect x="362" y="126" width="30" height="3.5" rx="1.5" fill="var(--color-text-secondary)" opacity="0.4" />

                    {/* Developer Avatar Badge */}
                    <rect x="358" y="142" width="44" height="16" rx="8" fill="var(--color-bg-secondary)" stroke="var(--border)" strokeWidth="1" />
                    <circle cx="366" cy="150" r="4.5" fill="var(--text-primary)" />
                    <text x="374" y="153" fill="var(--color-text-primary)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="700">Dev B</text>
                </motion.g>

                {/* Central Online Judge Hub */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* External spinning compiler ring */}
                    <motion.circle
                        cx="250"
                        cy="190"
                        r="34"
                        stroke="var(--text-primary)"
                        strokeWidth="1.2"
                        strokeDasharray="10 10"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                        style={{ transformOrigin: "250px 190px" }}
                    />
                    
                    {/* Inner glowing hub */}
                    <circle cx="250" cy="190" r="26" fill="var(--color-bg-primary)" stroke="var(--border)" strokeWidth="2" className="shadow-premium-hover" />
                    
                    {/* Central CPU/Judge core symbol */}
                    <path d="M 243 186 L 248 181 L 248 199 L 243 194 Z" fill="var(--text-primary)" />
                    <path d="M 257 186 L 252 181 L 252 199 L 257 194 Z" fill="var(--text-primary)" />
                    <rect x="249" y="187" width="2" height="6" fill="var(--text-primary)" />

                    {/* Status label */}
                    <rect x="215" y="230" width="70" height="14" rx="7" fill="var(--color-bg-secondary)" stroke="var(--border)" strokeWidth="1" />
                    <text x="250" y="239" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="6.5" fontFamily="var(--font-sans)" fontWeight="800" letterSpacing="0.05em">JUDGE ENGINE</text>
                </motion.g>

                {/* Bottom Live Result Output */}
                <motion.g
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: [0, -3, 0] }}
                    transition={{
                        y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                    }}
                >
                    {/* Terminal Display */}
                    <rect x="175" y="265" width="150" height="60" rx="10" fill="var(--color-bg-primary)" stroke="var(--border)" strokeWidth="1.5" />
                    <circle cx="187" cy="275" r="2" fill="var(--text-primary)" opacity="0.4" />
                    <circle cx="193" cy="275" r="2" fill="var(--text-primary)" opacity="0.3" />
                    <circle cx="199" cy="275" r="2" fill="var(--text-primary)" opacity="0.2" />
                    
                    <text x="187" y="292" fill="var(--text-primary)" fontSize="7.5" fontFamily="monospace" fontWeight="600">✔ Testcases passed</text>
                    <text x="187" y="303" fill="var(--text-secondary)" fontSize="7.5" fontFamily="monospace" fontWeight="600">PRINCE Rating +16 ELO</text>
                    <text x="187" y="314" fill="var(--text-secondary)" fontSize="7.5" fontFamily="monospace" opacity="0.6">Execution: 42ms</text>
                </motion.g>

                {/* Floating coding symbols */}
                <motion.g animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
                    <text x="210" y="80" fill="var(--text-secondary)" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.35">{`{}`}</text>
                </motion.g>
                <motion.g animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}>
                    <text x="280" y="100" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.35">{`</>`}</text>
                </motion.g>
                <motion.g animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}>
                    <text x="130" y="240" fill="var(--text-secondary)" fontSize="9.5" fontFamily="monospace" opacity="0.2">while()</text>
                </motion.g>
                <motion.g animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut", delay: 0.4 }}>
                    <text x="330" y="240" fill="var(--text-secondary)" fontSize="9.5" fontFamily="monospace" opacity="0.2">const</text>
                </motion.g>
            </svg>
        </div>
    );
};

const Hero = () => {
    const handleWatchDemoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById("how-it-works");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative overflow-hidden pt-20 pb-28 bg-bg-secondary">
            {/* Minimal Decorative Subtle Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 lg:grid-cols-12 items-center">
                    {/* Left Column: Headline and Content */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        {/* Top Pill Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-primary px-4 py-1.5 text-xs font-semibold text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-text-primary animate-pulse" />
                            Live Multiplayer Coding Arena
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-[1.1] font-display"
                        >
                            Build. Battle.
                            <br />
                            <span className="text-text-primary opacity-80">Become Better.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-sans font-medium"
                        >
                            Practice coding against real developers in live multiplayer coding duels. Challenge friends, test your algorithmic speed, and claim the top rank.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <Link to="/join-room">
                                <Button className="flex items-center gap-2 font-sans font-semibold" size="md">
                                    Start Coding
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>

                            <a href="#how-it-works" onClick={handleWatchDemoClick}>
                                <Button variant="secondary" className="flex items-center gap-2 font-sans font-semibold border border-border-primary dark:hover:bg-bg-primary/20" size="md">
                                    <Play size={14} className="fill-current" />
                                    Watch Demo
                                </Button>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Premium SVG Illustration */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <AnimatedIllustration />
                    </div>
                </div>

                {/* Features Badges Grid */}
                <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
                    <div className="flex items-center gap-4 bg-bg-primary p-5 rounded-2xl border border-border-primary shadow-premium hover:border-text-secondary/20 transition-colors">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                            <Code2 size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-text-primary font-sans">Multi-Lang</h4>
                            <p className="text-xs text-text-secondary mt-0.5 font-medium font-sans">C++, Java, Python, JS</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-bg-primary p-5 rounded-2xl border border-border-primary shadow-premium hover:border-text-secondary/20 transition-colors">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                            <Users size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-text-primary font-sans">Invite Rooms</h4>
                            <p className="text-xs text-text-secondary mt-0.5 font-medium font-sans">Quick duel invitations</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-bg-primary p-5 rounded-2xl border border-border-primary shadow-premium hover:border-text-secondary/20 transition-colors">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-text-primary font-sans">Elo Ranking</h4>
                            <p className="text-xs text-text-secondary mt-0.5 font-medium font-sans">Compare and climb ranks</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-bg-primary p-5 rounded-2xl border border-border-primary shadow-premium hover:border-text-secondary/20 transition-colors">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-text-primary font-sans">Fair Judge</h4>
                            <p className="text-xs text-text-secondary mt-0.5 font-medium font-sans">Secured runner sandboxing</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;