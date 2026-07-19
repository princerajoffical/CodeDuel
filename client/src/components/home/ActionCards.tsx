import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlusCircle, DoorOpen } from "lucide-react";
import Button from "../ui/Button";

const ActionCards = () => {
    return (
        <section className="bg-bg-primary py-28 border-b border-border-primary">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
                        Enter the <span className="text-primary font-bold">Arena</span>
                    </h2>

                    <p className="mt-5 text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        Start your own coding duel immediately, or input a friend's room key to join a battle.
                    </p>
                </motion.div>

                <div className="mt-20 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
                    {/* Create Room */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl border border-border-primary bg-bg-primary p-10 shadow-[0_1px_2px_rgba(0,0,0,0.01),0_8px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary border border-border-primary text-text-primary">
                                <PlusCircle size={24} />
                            </div>

                            <h3 className="mt-8 text-2xl font-bold text-text-primary tracking-tight">
                                Host a Match
                            </h3>

                            <p className="mt-4 text-sm text-text-secondary leading-relaxed font-medium">
                                Configure difficulty, languages, and timer limits. Receive a unique room key to share with your contender.
                            </p>
                        </div>

                        <div className="mt-10">
                            <Link to="/create-room">
                                <Button className="flex items-center gap-2" size="md">
                                    Create Room
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Join Room */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl border border-border-primary bg-bg-primary p-10 shadow-[0_1px_2px_rgba(0,0,0,0.01),0_8px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary text-text-primary border border-border-primary/60">
                                <DoorOpen size={24} />
                            </div>

                            <h3 className="mt-8 text-2xl font-bold text-text-primary tracking-tight">
                                Join a Contender
                            </h3>

                            <p className="mt-4 text-sm text-text-secondary leading-relaxed font-medium">
                                Have a code shared by a peer? Paste it in to instantly drop into their lobby and start competing.
                            </p>
                        </div>

                        <div className="mt-10">
                            <Link to="/join-room">
                                <Button variant="secondary" className="flex items-center gap-2 w-full" size="md">
                                    Enter Code
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ActionCards;