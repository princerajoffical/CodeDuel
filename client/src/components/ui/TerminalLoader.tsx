import { motion } from "framer-motion";

interface TerminalLoaderProps {
    message?: string;
}

const TerminalLoader = ({ message = "Compiling match settings..." }: TerminalLoaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-bg-primary rounded-2xl border border-border-primary shadow-premium font-mono text-sm text-text-primary w-full max-w-sm mx-auto">
            {/* Terminal Header dots */}
            <div className="flex items-center gap-1.5 w-full border-b border-border-primary pb-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-border-primary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border-primary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-border-primary"></div>
                <span className="text-text-secondary/60 text-xs ml-2 select-none font-sans font-semibold">system - codeduel</span>
            </div>
            
            {/* Terminal Lines */}
            <div className="w-full space-y-2 text-left min-h-[90px]">
                <div className="flex items-center gap-2 text-text-secondary/60 text-xs">
                    <span className="text-primary font-bold">$</span>
                    <span className="text-text-secondary font-semibold font-mono">codeduel --init</span>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-text-primary font-medium"
                >
                    <span className="text-primary font-bold">&gt;</span>
                    <span className="text-xs">{message}</span>
                </motion.div>
                
                <div className="flex items-center gap-1 text-xs">
                    <span className="text-emerald-600 font-semibold font-sans">Status: Connected</span>
                    <span className="w-1.5 h-3 bg-primary animate-pulse inline-block"></span>
                </div>
            </div>
        </div>
    );
};

export default TerminalLoader;
