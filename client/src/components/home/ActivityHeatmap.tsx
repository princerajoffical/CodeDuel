import { motion } from "framer-motion";

const generateActivity = () => {
    // Return values from 0 to 4
    return Array.from({ length: 119 }, () => Math.floor(Math.random() * 5));
};

const activity = generateActivity();

const colors = [
    "bg-text-secondary/10 border-border-primary/10",
    "bg-primary/20 border-primary/10",
    "bg-primary/55 border-primary/20",
    "bg-primary/80 border-primary/30",
    "bg-primary border-primary/40",
];

const ActivityHeatmap = () => {
    return (
        <section className="bg-bg-secondary py-28 border-y border-border-primary/80">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                        Stay <span className="text-primary font-bold">Consistent</span>
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        Every match room, run script, and successful compilation updates your consistency index.
                    </p>
                </motion.div>

                {/* Heatmap Card */}
                <div className="mt-16 w-full max-w-3xl mx-auto bg-bg-primary p-8 rounded-2xl border border-border-primary shadow-[0_1px_2px_rgba(0,0,0,0.01),0_8px_24px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto pb-2">
                        <div className="inline-flex gap-1.5 min-w-max mx-auto w-full justify-center">
                            {Array.from({ length: 17 }).map((_, week) => (
                                <div
                                    key={week}
                                    className="flex flex-col gap-1.5"
                                >
                                    {Array.from({ length: 7 }).map((_, day) => {
                                        const value = activity[week * 7 + day];
                                        return (
                                            <div
                                                key={day}
                                                title={`${value} activity units`}
                                                className={`h-4.5 w-4.5 rounded-[3px] border transition-transform duration-200 hover:scale-115 cursor-pointer ${colors[value]}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-xs text-text-secondary font-semibold font-sans">
                        <span>17 Weeks of Consistency</span>
                        <div className="flex items-center gap-1.5">
                            <span>Less</span>
                            {colors.map((color, i) => (
                                <div
                                    key={i}
                                    className={`h-3 w-3 rounded-[2px] border ${color}`}
                                />
                            ))}
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivityHeatmap;