import React from "react";

export interface Problem {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
    inputFormat: string;
    outputFormat: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
}

export const SAMPLE_PROBLEM: Problem = {
    id: "two-sum",
    title: "1. Two Sum",
    difficulty: "Easy",
    description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    inputFormat: "The first line contains nums, a comma-separated list of integers.\nThe second line contains target, a single integer.",
    outputFormat: "Return the indices as a pair [index1, index2].",
    examples: [
        {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
    ],
    constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
    ],
};

interface ProblemPanelProps {
    problem?: Problem;
}

const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem = SAMPLE_PROBLEM }) => {
    const difficultyColors = {
        Easy: "bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40",
        Medium: "bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900/40",
        Hard: "bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40",
    };

    return (
        <div className="h-full flex flex-col bg-bg-primary border-r border-border-primary overflow-y-auto p-8 space-y-8 select-text">
            {/* Title & Badge */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[problem.difficulty]}`}>
                        {problem.difficulty}
                    </span>
                    <span className="text-xs text-text-secondary font-mono font-semibold uppercase tracking-wider">ID: {problem.id}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-text-primary tracking-tight leading-tight">
                    {problem.title}
                </h2>
            </div>

            {/* Description */}
            <div className="text-sm leading-relaxed text-text-secondary font-medium whitespace-pre-line">
                {problem.description}
            </div>

            {/* Examples */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">Examples</h3>
                <div className="space-y-5">
                    {problem.examples.map((example, i) => (
                        <div key={i} className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-5 space-y-3">
                            <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider font-mono">
                                Example {i + 1}
                            </div>
                            <div className="space-y-2 font-mono text-xs text-text-primary">
                                <div className="flex items-start gap-1">
                                    <span className="text-primary font-semibold w-14 shrink-0">Input:</span>
                                    <span className="bg-bg-primary border border-border-primary/65 rounded px-1.5 py-0.5 select-all">{example.input}</span>
                                </div>
                                <div className="flex items-start gap-1">
                                    <span className="text-primary font-semibold w-14 shrink-0">Output:</span>
                                    <span className="bg-bg-primary border border-border-primary/65 rounded px-1.5 py-0.5 select-all">{example.output}</span>
                                </div>
                                {example.explanation && (
                                    <div className="pt-2 text-text-secondary italic font-sans flex gap-1">
                                        <span className="text-text-secondary font-bold uppercase text-[9px] font-mono tracking-wider shrink-0 mt-0.5">Note:</span>
                                        <span>{example.explanation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border-primary">
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">Input Format</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">{problem.inputFormat}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">Output Format</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">{problem.outputFormat}</p>
                </div>
            </div>

            {/* Constraints */}
            <div className="space-y-4 pt-4 border-t border-border-primary">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">Constraints</h3>
                <ul className="list-disc pl-5 space-y-2 text-xs text-text-secondary font-mono font-medium">
                    {problem.constraints.map((constraint, i) => (
                        <li key={i}>
                            {constraint}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProblemPanel;
// 
