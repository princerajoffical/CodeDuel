import React from "react";
import { Code } from "lucide-react";

export type SupportedLanguage = "cpp" | "java" | "python" | "javascript" | "c";

interface LanguageSelectorProps {
    activeLanguage: SupportedLanguage;
    onLanguageChange: (lang: SupportedLanguage) => void;
    availableLanguages?: SupportedLanguage[];
}

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    cpp: "C++",
    java: "Java",
    python: "Python",
    javascript: "JavaScript",
    c: "C",
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    activeLanguage,
    onLanguageChange,
    availableLanguages = ["cpp", "java", "python", "javascript", "c"],
}) => {
    return (
        <div className="flex items-center gap-2">
            <Code size={14} className="text-text-secondary" />
            <select
                value={activeLanguage}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-bg-primary border border-border-primary text-text-primary py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            >
                {availableLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {LANGUAGE_LABELS[lang]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
// 
