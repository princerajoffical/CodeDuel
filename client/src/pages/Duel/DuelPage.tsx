import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Terminal } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRoom } from "../../services/roomService";
import { useJudge } from "../../hooks/useJudge";
import { useTheme } from "../../context/ThemeContext";
import { socket } from "../../sockets/socket";
import ProblemPanel from "../../components/duel/ProblemPanel";
import Editor, { BOILERPLATE_CODE } from "../../components/duel/Editor";
import OutputPanel from "../../components/duel/OutputPanel";
import PlayersCard from "../../components/duel/PlayersCard";
import Timer from "../../components/duel/Timer";
import TerminalLoader from "../../components/ui/TerminalLoader";
import type { SupportedLanguage } from "../../components/duel/LanguageSelector";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface RoomConfig {
    _id: string;
    roomName: string;
    roomCode: string;
    difficulty: string;
    language: string;
    timeLimit: number;
    host: {
        _id: string;
        username: string;
    };
    players: {
        _id: string;
        username: string;
        rating: number;
    }[];
    problem?: any;
}

interface MatchResultData {
    winner: string;
    winnerId: string;
    winnerRating: number;
    winnerChange: number;
    loser: string;
    loserId: string;
    loserRating: number;
    loserChange: number;
    status: string;
}

const DuelPage = () => {
    const { roomCode } = useParams<{ roomCode: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useTheme();

    const [roomConfig, setRoomConfig] = useState<RoomConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const [matchResult, setMatchResult] = useState<MatchResultData | null>(null);

    // Judge hooks & settings
    const {
        runSolution,
        submitSolution,
        isRunning,
        isSubmitting,
        runResult,
        setRunResult,
        customInput,
        setCustomInput,
    } = useJudge();

    const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>("cpp");
    const [codeDrafts, setCodeDrafts] = useState<Record<SupportedLanguage, string>>({
        cpp: BOILERPLATE_CODE.cpp,
        python: BOILERPLATE_CODE.python,
        java: BOILERPLATE_CODE.java,
        javascript: BOILERPLATE_CODE.javascript,
        c: BOILERPLATE_CODE.c,
    });

    useEffect(() => {
        if (roomConfig?.problem) {
            const templates = roomConfig.problem.languageTemplates || {};
            setCodeDrafts({
                cpp: templates.cpp || BOILERPLATE_CODE.cpp,
                python: templates.python || BOILERPLATE_CODE.python,
                java: templates.java || BOILERPLATE_CODE.java,
                javascript: templates.javascript || BOILERPLATE_CODE.javascript,
                c: templates.c || BOILERPLATE_CODE.c,
            });
            if (roomConfig.problem.examples?.[0]?.input) {
                let cleanInput = roomConfig.problem.examples[0].input;
                if (cleanInput.includes("nums =") && cleanInput.includes("target =")) {
                    const matchNums = cleanInput.match(/nums\s*=\s*(\[[^\]]*\])/);
                    const matchTarget = cleanInput.match(/target\s*=\s*(-?\d+)/);
                    if (matchNums && matchTarget) {
                        cleanInput = `${matchNums[1]}\n${matchTarget[1]}`;
                    }
                }
                setCustomInput(cleanInput);
            }
        }
    }, [roomConfig?.problem]);

    // Fetch Room Details
    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!roomCode) return;
            try {
                const res = await getRoom(roomCode);
                if (res.success && res.room) {
                    setRoomConfig(res.room);
                    if (res.room.language) {
                        const langMap: Record<string, SupportedLanguage> = {
                            "C++": "cpp",
                            Python: "python",
                            Java: "java",
                            JavaScript: "javascript",
                            C: "c",
                        };
                        const mappedLang = langMap[res.room.language];
                        if (mappedLang) {
                            setActiveLanguage(mappedLang);
                        }
                    }
                } else {
                    setApiError("Failed to fetch room configuration details.");
                }
            } catch (err) {
                setApiError("Unable to reach the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomCode]);

    // Socket state listeners
    useEffect(() => {
        if (!roomCode || !user) return;

        const joinRoom = () => {
            socket.emit("join-room", {
                roomCode,
                userId: user.id,
                username: user.username,
            });
        };

        const handleMatchEnd = (data: MatchResultData) => {
            setMatchResult(data);
        };

        const handleRoomUpdate = (updatedPlayers: any[]) => {
            setRoomConfig((prev: any) => {
                if (!prev) return prev;
                const newPlayers = updatedPlayers.map((p) => ({
                    _id: p.userId,
                    username: p.username,
                    rating: p.rating || 1200,
                }));
                return {
                    ...prev,
                    players: newPlayers,
                };
            });
        };

        socket.on("match-end", handleMatchEnd);
        socket.on("room-update", handleRoomUpdate);
        socket.on("connect", joinRoom);

        if (!socket.connected) {
            socket.connect();
        } else {
            joinRoom();
        }

        return () => {
            socket.off("connect", joinRoom);
            socket.off("match-end", handleMatchEnd);
            socket.off("room-update", handleRoomUpdate);
        };
    }, [roomCode, user]);

    const handleQuitMatch = () => {
        const confirmQuit = window.confirm("Are you sure you want to quit the match? This will forfeit the match!");
        if (confirmQuit && roomCode) {
            socket.emit("leave-room", { roomCode });
            socket.disconnect();
            navigate("/dashboard");
        }
    };

    const handleBackToDashboard = () => {
        socket.disconnect();
        navigate("/dashboard");
    };

    // Handle code state changes
    const handleCodeChange = (newCode: string) => {
        setCodeDrafts((prev) => ({
            ...prev,
            [activeLanguage]: newCode,
        }));
    };

    // Reset code draft template for active language
    const handleResetCode = () => {
        if (roomConfig?.problem?.languageTemplates?.[activeLanguage]) {
            setCodeDrafts((prev) => ({
                ...prev,
                [activeLanguage]: roomConfig.problem.languageTemplates[activeLanguage],
            }));
        } else {
            setCodeDrafts((prev) => ({
                ...prev,
                [activeLanguage]: BOILERPLATE_CODE[activeLanguage],
            }));
        }
    };

    // Run Code Action (Test code block)
    const handleRunCode = () => {
        const currentCode = codeDrafts[activeLanguage];
        runSolution(activeLanguage, currentCode);
    };

    // Submit Code Action (Final submit block)
    const handleSubmitCode = async () => {
        const currentCode = codeDrafts[activeLanguage];
        const res = await submitSolution(activeLanguage, currentCode);
        if (res && res.status === "Accepted") {
            socket.emit("submit-success", { roomCode, userId: user?.id });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-6">
                <TerminalLoader message="Entering Duel Arena & Judges..." />
            </div>
        );
    }

    if (apiError || !roomConfig) {
        return (
            <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-6">
                <Card className="w-full max-w-md text-center space-y-6 bg-bg-primary border-border-primary">
                    <div className="text-red-500 font-bold text-lg">
                        Lobby Error
                    </div>
                    <p className="text-text-secondary text-sm font-medium">{apiError || "Match details not found."}</p>
                    <Link to="/dashboard" className="block">
                        <Button className="w-full">Back to Dashboard</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-bg-primary flex flex-col overflow-hidden text-text-primary font-sans">
            {/* Top Toolbar Navigation */}
            <header className="h-14 flex items-center justify-between px-6 bg-bg-primary border-b border-border-primary z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleQuitMatch}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition cursor-pointer"
                        title="Quit Match"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-bg-secondary border border-border-primary flex items-center justify-center text-primary font-bold">
                            <Terminal size={14} />
                        </span>
                        <h1 className="text-sm font-bold text-text-primary tracking-tight">
                            {roomConfig.roomName}
                        </h1>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-bg-secondary text-primary border border-border-primary font-bold font-mono uppercase tracking-wider">
                            {roomConfig.roomCode}
                        </span>
                    </div>
                </div>

                {/* Match Metrics (Timer & Opponents) */}
                <div className="flex items-center gap-4">
                    <Timer
                        initialMinutes={roomConfig.timeLimit}
                        onTimeUp={() => {
                            setRunResult({
                                status: "Time Limit Exceeded",
                                executionTime: `${roomConfig.timeLimit} m`,
                                memory: "0 MB",
                                output: "Time Limit reached! Auto-submission occurred.",
                            });
                        }}
                    />
                    <PlayersCard
                        players={roomConfig.players}
                        hostId={roomConfig.host._id}
                        currentUserId={user?.id}
                    />
                </div>
            </header>

            {/* Core Split Pane Layout */}
            <main className="flex-1 flex overflow-hidden bg-bg-secondary/40">
                {/* Left Half: Problem Panel */}
                <section className="w-1/2 h-full flex flex-col">
                    <ProblemPanel problem={roomConfig.problem || undefined} />
                </section>

                {/* Right Half: Editor & Console Split */}
                <section className="w-1/2 h-full flex flex-col">
                    {/* Editor Portion */}
                    <div className="h-[60%] w-full">
                        <Editor
                            language={activeLanguage}
                            onLanguageChange={setActiveLanguage}
                            code={codeDrafts[activeLanguage]}
                            onCodeChange={handleCodeChange}
                            onRun={handleRunCode}
                            onSubmit={handleSubmitCode}
                            isRunning={isRunning}
                            isSubmitting={isSubmitting}
                            onResetCode={handleResetCode}
                            theme={theme}
                        />
                    </div>

                    {/* Console Portion */}
                    <div className="h-[40%] w-full">
                        <OutputPanel
                            result={runResult}
                            isRunning={isRunning}
                            onRun={handleRunCode}
                            customInput={customInput}
                            setCustomInput={setCustomInput}
                        />
                    </div>
                </section>
            </main>

            {/* Match Finished Overlay Modal */}
            {matchResult && (
                <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <Card className="w-full max-w-md text-center p-8 space-y-6 animate-in fade-in zoom-in-95 border-border-primary bg-bg-primary shadow-2xl">
                        <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
                            Match Finished
                        </h2>
                        
                        {matchResult.status === "cancelled" ? (
                            <div className="p-4.5 rounded-xl bg-bg-secondary border border-border-primary text-center space-y-2">
                                <p className="text-sm font-semibold text-text-primary">Match Cancelled</p>
                                <p className="text-xs text-text-secondary">
                                    A contender disconnected or left before a winner was determined. No rating changes have occurred.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4.5 rounded-xl bg-bg-secondary border border-border-primary text-left space-y-3.5">
                                <div className="flex justify-between items-center text-xs font-semibold">
                                    <span className="text-text-secondary">Winner:</span>
                                    <span className="text-emerald-600 dark:text-emerald-450 font-bold font-mono">
                                        {matchResult.winner} (+{matchResult.winnerChange} Elo)
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-semibold">
                                    <span className="text-text-secondary">Loser:</span>
                                    <span className="text-rose-600 dark:text-rose-455 font-bold font-mono">
                                        {matchResult.loser} ({matchResult.loserChange} Elo)
                                    </span>
                                </div>
                                <div className="text-[10px] text-text-secondary font-bold font-mono uppercase tracking-wider text-center pt-2.5 border-t border-border-primary">
                                    Match state: {matchResult.status}
                                </div>
                            </div>
                        )}

                        <Button onClick={handleBackToDashboard} className="w-full">
                            Back to Dashboard
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default DuelPage;
