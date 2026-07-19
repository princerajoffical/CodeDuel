import React from "react";
import MonacoEditor from "@monaco-editor/react";
import LanguageSelector, { type SupportedLanguage } from "./LanguageSelector";
import { Play, Send, Settings, RefreshCw } from "lucide-react";
import Button from "../ui/Button";

export const BOILERPLATE_CODE: Record<SupportedLanguage, string> = {
    cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};`,
    java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}`,
    python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Your code here\n        return []`,
    javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Your code here\n    return [];\n}`,
    c: `/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    *returnSize = 0;\n    return NULL;\n}`,
};

interface EditorProps {
    language: SupportedLanguage;
    onLanguageChange: (lang: SupportedLanguage) => void;
    code: string;
    onCodeChange: (code: string) => void;
    onRun: () => void;
    onSubmit: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
    onResetCode: () => void;
    theme?: string;
}

const Editor: React.FC<EditorProps> = ({
    language,
    onLanguageChange,
    code,
    onCodeChange,
    onRun,
    onSubmit,
    isRunning,
    isSubmitting,
    onResetCode,
    theme = "light",
}) => {
    const getMonacoLanguage = (lang: SupportedLanguage): string => {
        if (lang === "cpp") return "cpp";
        if (lang === "c") return "c";
        if (lang === "java") return "java";
        if (lang === "python") return "python";
        return "javascript";
    };

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            if (!isRunning && !isSubmitting) {
                onSubmit();
            }
        });
    };

    return (
        <div className="h-full flex flex-col bg-bg-primary border-l border-border-primary">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-bg-primary border-b border-border-primary">
                <div className="flex items-center gap-3">
                    <LanguageSelector
                        activeLanguage={language}
                        onLanguageChange={onLanguageChange}
                    />
                    <button
                        onClick={onResetCode}
                        className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition"
                        title="Reset code template"
                    >
                        <RefreshCw size={13} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider font-sans select-none">
                        Theme: {theme === "dark" ? "VS-Dark" : "Light"}
                    </span>
                    <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition">
                        <Settings size={14} />
                    </button>
                </div>
            </div>

            {/* Monaco Editor Pane */}
            <div className="flex-1 w-full bg-bg-primary overflow-hidden relative border-y border-border-primary/40">
                <MonacoEditor
                    height="100%"
                    language={getMonacoLanguage(language)}
                    theme={theme === "dark" ? "vs-dark" : "light"}
                    value={code}
                    onChange={(val) => onCodeChange(val || "")}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'Fira Code', 'Courier New', Monaco, monospace",
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true,
                        padding: { top: 12, bottom: 12 },
                        lineNumbersMinChars: 3,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                    }}
                />
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-end gap-3 px-4 py-2.5 bg-bg-primary border-t border-border-primary">
                <Button
                    onClick={onRun}
                    disabled={isRunning || isSubmitting}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1.5 font-bold"
                >
                    <Play size={13} className="text-text-secondary" />
                    Run Code
                </Button>

                <Button
                    onClick={onSubmit}
                    disabled={isRunning || isSubmitting}
                    isLoading={isSubmitting}
                    size="sm"
                    className="flex items-center gap-1.5 font-bold"
                    title="Press Ctrl + Enter to submit instantly"
                >
                    {!isSubmitting && <Send size={13} />}
                    Submit Code
                </Button>
            </div>
        </div>
    );
};

export default Editor;
