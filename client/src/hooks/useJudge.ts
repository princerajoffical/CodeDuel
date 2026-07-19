import { useState, useCallback } from "react";
import { runCode, submitCode, type RunResult } from "../services/judgeService";

export const useJudge = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [runResult, setRunResult] = useState<RunResult | null>(null);
    const [customInput, setCustomInput] = useState("[2,7,11,15]\n9");

    const runSolution = useCallback(async (language: string, code: string) => {
        setIsRunning(true);
        setRunResult(null);
        try {
            const result = await runCode(language, code, customInput);
            setRunResult(result);
        } catch (err: any) {
            console.error(err);
            setRunResult({
                status: "Runtime Error",
                executionTime: "0 ms",
                memory: "0 MB",
                output: "",
                error: err.message || "Execution environment exception encountered.",
            });
        } finally {
            setIsRunning(false);
        }
    }, [customInput]);

    const submitSolution = useCallback(async (language: string, code: string) => {
        setIsSubmitting(true);
        setRunResult(null);
        try {
            const result = await submitCode(language, code);
            setRunResult(result);
            return result;
        } catch (err: any) {
            console.error(err);
            const errResult: RunResult = {
                status: "Runtime Error",
                executionTime: "0 ms",
                memory: "0 MB",
                output: "",
                error: err.message || "Compilation submission failed due to connection error.",
            };
            setRunResult(errResult);
            return errResult;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        isRunning,
        isSubmitting,
        runResult,
        setRunResult,
        customInput,
        setCustomInput,
        runSolution,
        submitSolution,
    };
};
