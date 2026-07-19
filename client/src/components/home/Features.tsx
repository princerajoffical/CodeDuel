import { motion } from "framer-motion";
import {
    Users,
    Trophy,
    Timer,
    Brain,
    CodeXml,
    ShieldCheck,
} from "lucide-react";

const features = [
    {
        icon: <Users size={20} />,
        title: "Private Rooms",
        description:
            "Create invite-only lobbies and challenge your friends or teammates instantly with custom rules.",
    },
    {
        icon: <Trophy size={20} />,
        title: "Competitive Ranking",
        description:
            "Win duels, boost your Elo rating, climb ranks, and cement your status on the global board.",
    },
    {
        icon: <Timer size={20} />,
        title: "Live Timer",
        description:
            "A synchronized match clock. Monitor your time limits and speed adjustments relative to your rival.",
    },
    {
        icon: <Brain size={20} />,
        title: "DSA Challenges",
        description:
            "Practice carefully structured interview-style data structure and algorithm prompts.",
    },
    {
        icon: <CodeXml size={20} />,
        title: "Code Execution",
        description:
            "Compile and test solutions with custom standard inputs across C++, Java, and Python.",
    },
    {
        icon: <ShieldCheck size={20} />,
        title: "Fair Play",
        description:
            "Fully sandboxed container runners ensuring secure, synchronized output evaluations.",
    },
];

const Features = () => {
    return (
        <section id="features" className="bg-bg-secondary py-28 scroll-mt-16">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                        Built for <span className="text-primary font-bold">Speed</span> & Precision
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        A robust compilation sandbox combined with instant WebSockets delivers synchrony to every keypress, click, and compile.
                    </p>
                </motion.div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="group bg-bg-primary rounded-2xl border border-border-primary p-8 hover:border-text-secondary/20 hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary border border-border-primary text-text-primary group-hover:scale-105 transition-transform duration-200">
                                {feature.icon}
                            </div>

                            <h3 className="mt-6 text-base font-bold text-text-primary tracking-tight">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm text-text-secondary font-medium leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;