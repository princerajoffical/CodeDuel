import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const CTA = () => {
    return (
        <section className="bg-bg-primary py-32">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto flex flex-col items-center"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-6xl font-sans leading-[1.1]">
                        Sharpen your algorithms.
                        <br />
                        Defeat your peers.
                    </h2>

                    <p className="mt-8 text-base md:text-lg text-text-secondary max-w-xl font-medium leading-relaxed">
                        Join developers around the world. Host a lobby, invite your friends, and track your coding speeds live.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link to="/create-room">
                            <Button className="flex items-center gap-2" size="md">
                                Host Room
                                <ArrowRight size={16} />
                            </Button>
                        </Link>

                        <Link to="/join-room">
                            <Button variant="secondary" size="md">
                                Enter Code
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;