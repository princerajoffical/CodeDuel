import { motion } from "framer-motion";
import {
    UserPlus,
    Users,
    Code2,
    Trophy,
} from "lucide-react";

const steps = [
    {
        icon: <UserPlus size={20} />,
        title: "Host Room",
        desc: "Launch a room session and get an 8-character lobby key.",
    },
    {
        icon: <Users size={20} />,
        title: "Invite Peer",
        desc: "Share your room key so they can join the lobby.",
    },
    {
        icon: <Code2 size={20} />,
        desc: "Write and evaluate code side-by-side on the same prompt.",
        title: "Solve Duel",
    },
    {
        icon: <Trophy size={20} />,
        title: "Claim Win",
        desc: "The fastest execution outputs win rating adjustments.",
    },
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="bg-bg-primary py-28 scroll-mt-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                        Match flow in <span className="text-primary font-bold">seconds</span>
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        Setting up a code duel is simple. Get matched, invite your peers, and start.
                    </p>
                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-4 max-w-5xl mx-auto relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative flex flex-col items-center text-center p-6 bg-bg-secondary/40 border border-border-primary/60 rounded-2xl"
                        >
                            {/* Circle number */}
                            <div className="absolute -top-4 left-6 bg-bg-primary border border-border-primary text-xs font-bold text-text-secondary font-mono h-8 w-8 rounded-full flex items-center justify-center shadow-xs">
                                0{index + 1}
                            </div>

                            <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                                {step.icon}
                            </div>

                            <h3 className="mt-6 text-base font-bold text-text-primary tracking-tight">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-xs text-text-secondary font-medium leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;