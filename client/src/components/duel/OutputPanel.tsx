import React, { useState } from "react";
import { Terminal, Play, CheckCircle2, AlertTriangle, Cpu, HardDrive } from "lucide-react";
import type { RunResult } from "../../services/judgeService";
import Button from "../ui/Button";

interface OutputPanelProps {
    result: RunResult | null;
    isRunning: boolean;
    onRun: () => void;
    customInput: string;
    setCustomInput: (input: string) => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
    result,
    isRunning,
    onRun,
    customInput,
    setCustomInput,
}) => {
    const [activeTab, setActiveTab] = useState<"result" | "customInput">("result");

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Accepted":
                return "text-emerald-700 border-emerald-250 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-900/40 dark:bg-emerald-950/20";
            case "Wrong Answer":
                return "text-rose-700 border-rose-250 bg-rose-50/50 dark:text-rose-400 dark:border-rose-900/40 dark:bg-rose-950/20";
            case "Compile Error":
            case "Runtime Error":
                return "text-amber-700 border-amber-250 bg-amber-50/50 dark:text-amber-450 dark:border-amber-900/40 dark:bg-amber-950/20";
            default:
                return "text-primary border-border-primary bg-primary-light";
        }
    };

    return (
        <div className="h-full flex flex-col bg-bg-primary border-t border-border-primary text-text-primary">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-border-primary px-4 bg-bg-primary">
                <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                    <button
                        onClick={() => setActiveTab("result")}
                        className={`py-3 px-1 transition-all border-b-2 outline-none font-sans ${
                            activeTab === "result"
                                ? "border-primary text-text-primary"
                                : "border-transparent text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        Console Output
                    </button>
                    <button
                        onClick={() => setActiveTab("customInput")}
                        className={`py-3 px-1 transition-all border-b-2 outline-none font-sans ${
                            activeTab === "customInput"
                                ? "border-primary text-text-primary"
                                : "border-transparent text-text-secondary hover:text-text-primary"
                        }`}
                    >
                        Custom Testcase
                    </button>
                </div>

                <Button
                    onClick={onRun}
                    disabled={isRunning}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-[11px] font-bold text-primary hover:bg-bg-secondary"
                >
                    <Play size={11} className="fill-primary/10 text-primary" />
                    {isRunning ? "Running" : "Run Test"}
                </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto font-mono text-xs leading-relaxed bg-bg-primary">
                {activeTab === "customInput" ? (
                    <div className="h-full flex flex-col space-y-3">
                        <label className="text-[10px] text-text-secondary uppercase font-sans font-bold tracking-wider">Provide custom console input:</label>
                        <textarea
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            className="flex-1 w-full bg-bg-secondary border border-border-primary rounded-xl p-4 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-mono"
                            placeholder="Input values here..."
                        />
                    </div>
                ) : isRunning ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-3 text-text-secondary">
                        <Terminal size={20} className="animate-pulse text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-sans animate-pulse">Running compilation checks on Judge0...</span>
                    </div>
                ) : result ? (
                    <div className="space-y-5">
                        {/* Status bar */}
                        <div className={`flex items-center justify-between p-4 rounded-xl border ${getStatusStyles(result.status)}`}>
                            <div className="flex items-center gap-2">
                                {result.status === "Accepted" ? (
                                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                    <AlertTriangle size={16} className="text-rose-600 dark:text-rose-450" />
                                )}
                                <span className="text-sm font-extrabold uppercase tracking-wide">{result.status}</span>
                            </div>

                             <div className="flex items-center gap-4 text-[10px] font-sans text-text-secondary font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Cpu size={12} className="text-text-secondary" />
                                    <span>Time: <span className="font-mono text-text-primary normal-case">{result.executionTime}</span></span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <HardDrive size={12} className="text-text-secondary" />
                                    <span>Memory: <span className="font-mono text-text-primary normal-case">{result.memory}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Stderr (Error) */}
                        {result.error && (
                            <div className="space-y-2">
                                <h4 className="text-[10px] text-red-500 uppercase font-sans font-bold tracking-wider">Standard Error</h4>
                                <pre className="bg-red-50/30 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 text-red-700/90 dark:text-red-400 text-xs rounded-xl p-4 whitespace-pre-wrap select-all font-mono">
                                    {result.error}
                                </pre>
                            </div>
                        )}

                        {/* Stdout (Output) */}
                        <div className="space-y-2">
                            <h4 className="text-[10px] text-text-secondary uppercase font-sans font-bold tracking-wider">Output</h4>
                            <pre className="bg-bg-secondary border border-border-primary text-text-primary text-xs rounded-xl p-4 whitespace-pre-wrap select-all font-mono">
                                {result.output || "No stdout produced."}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center space-y-2 text-text-secondary">
                        <Terminal size={20} className="text-text-secondary/40" />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-sans">Run or submit code to view execution details.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutputPanel;
