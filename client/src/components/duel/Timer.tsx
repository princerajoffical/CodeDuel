import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
    initialMinutes: number; // e.g. 30
    onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimeUp }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

    useEffect(() => {
        setSecondsLeft(initialMinutes * 60);
    }, [initialMinutes]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, onTimeUp]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        return `${mins.toString().padStart(2, "0")}:${remainingSecs
            .toString()
            .padStart(2, "0")}`;
    };

    const getTimerColorClass = () => {
        if (secondsLeft < 60) {
            return "text-red-600 border-red-200 bg-red-50/50 animate-pulse font-bold";
        }
        if (secondsLeft < 300) {
            return "text-amber-600 border-amber-200 bg-amber-50/50 font-bold";
        }
        return "text-text-primary border-border-primary bg-bg-primary font-semibold";
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-all duration-300 ${getTimerColorClass()}`}>
            <Clock size={14} className="text-text-secondary shrink-0" />
            <span>{formatTime(secondsLeft)}</span>
        </div>
    );
};

export default Timer;
