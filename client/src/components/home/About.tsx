import { motion } from "framer-motion";
import { Code2, Sword, Clock } from "lucide-react";

const features = [
    {
        icon: <Sword size={24} />,
        title: "Real-Time Battles",
        description:
            "Challenge your friends and compete in live coding duels with instant side-by-side run evaluations.",
    },
    {
        icon: <Code2 size={24} />,
        title: "DSA Focused",
        description:
            "Curated algorithmic problems covering strings, lists, DP, trees, graphs, and search strategies.",
    },
    {
        icon: <Clock size={24} />,
        title: "Race Against Time",
        description:
            "Every single second counts. Submit correct solutions first to secure Elo rating boosts.",
    },
];

const About = () => {
    return (
        <section className="bg-bg-primary py-28 border-y border-border-primary">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                        Why <span className="text-primary font-bold">CodeDuel?</span>
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        CodeDuel is built for developers who want an interactive arena to test their problem-solving speeds. Host a room, share a code, solve standard algorithmic puzzles, and track who outputs correct compiles first.
                    </p>
                </motion.div>

                <div className="mt-20 grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group rounded-2xl border border-border-primary/80 bg-bg-secondary/50 p-8 hover:border-text-secondary/20 hover:bg-bg-primary hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-primary border border-border-primary/60 text-primary shadow-[0_1px_2px_rgba(0,0,0,0.01)] group-hover:scale-105 transition-transform duration-200">
                                {feature.icon}
                            </div>

                            <h3 className="mt-6 text-lg font-bold text-text-primary tracking-tight">
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

export default About;