import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Copy, Crown, Users, ArrowLeft, RefreshCw, LogOut } from "lucide-react";
import { getRoom } from "../../services/roomService";
import { useRoomSocket } from "../../hooks/useRoomSocket";
import useAuth from "../../hooks/useAuth";
import TerminalLoader from "../../components/ui/TerminalLoader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface RoomConfig {
    roomName: string;
    roomCode: string;
    difficulty: string;
    language: string;
    timeLimit: number;
}

const WaitingRoom = () => {
    const { roomCode } = useParams<{ roomCode: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [roomConfig, setRoomConfig] = useState<RoomConfig | null>(null);
    const [apiLoading, setApiLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const {
        players,
        isHost,
        roomFull,
        error: socketError,
        startMatch,
        leaveRoom,
    } = useRoomSocket(roomCode);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!roomCode) return;
            try {
                setApiLoading(true);
                setApiError(null);
                const res = await getRoom(roomCode);
                if (res.success) {
                    setRoomConfig(res.room);
                } else {
                    setApiError(res.message || "Failed to load room details.");
                }
            } catch (err: any) {
                setApiError(
                    err.response?.data?.message || "Error fetching room settings."
                );
            } finally {
                setApiLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomCode]);

    const copyRoomCode = async () => {
        if (!roomCode) return;
        try {
            await navigator.clipboard.writeText(roomCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy room code", err);
        }
    };

    const handleLeaveLobby = () => {
        leaveRoom();
        navigate("/dashboard");
    };

    if (apiLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-bg-secondary dark:bg-slate-950">
                <TerminalLoader message="Synchronizing duel settings..." />
            </div>
        );
    }

    if (apiError || socketError) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-bg-secondary">
                <Card className="w-full max-w-md text-center space-y-6 bg-bg-primary border-border-primary">
                    <div className="text-red-500 font-bold text-lg">
                        Lobby Error
                    </div>
                    <p className="text-text-secondary text-sm font-medium">{apiError || socketError}</p>
                    <Link to="/dashboard" className="block">
                        <Button className="w-full">Back to Dashboard</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (roomFull) {
        return (
            <div className="flex-1 flex items-center justify-center p-6 bg-bg-secondary">
                <Card className="w-full max-w-md text-center space-y-6 bg-bg-primary border-border-primary">
                    <div className="text-amber-600 font-bold text-lg">
                        Lobby Full
                    </div>
                    <p className="text-text-secondary text-sm font-medium">
                        This match room already has two active participants.
                    </p>
                    <Link to="/dashboard" className="block">
                        <Button className="w-full">Back to Dashboard</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const hasTwoPlayers = players.length === 2;
    const isCpp = roomConfig?.language === "cpp";
    const displayLanguage = isCpp
        ? "C++"
        : roomConfig?.language === "java"
        ? "Java"
        : "Python";

    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-bg-secondary text-text-primary">
            <Card className="w-full max-w-3xl shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_36px_rgba(0,0,0,0.03)] bg-bg-primary border-border-primary p-10">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border-primary">
                    <button
                        onClick={handleLeaveLobby}
                        className="text-text-secondary hover:text-text-primary flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                    >
                        <ArrowLeft size={14} />
                        Dashboard
                    </button>
                    <span className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider font-sans">
                        <RefreshCw size={12} className="animate-spin text-primary" />
                        Lobby Active
                    </span>
                </div>

                <div className="mt-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Lobby Room
                    </h1>
                    <p className="text-sm text-text-secondary font-medium mt-1">
                        Host: <span className="font-semibold text-text-primary">{roomConfig?.roomName}</span>
                    </p>
                </div>

                {/* Room Code Card */}
                <div className="mt-8 rounded-2xl bg-bg-primary border border-border-primary p-6 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                    <div>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
                            Lobby Access Key
                        </p>
                        <h2 className="text-3xl font-extrabold tracking-widest text-text-primary mt-1 select-all font-mono">
                            {roomCode}
                        </h2>
                    </div>
                    <Button
                        onClick={copyRoomCode}
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Copy size={14} />
                        {copied ? "Copied" : "Copy Key"}
                    </Button>
                </div>

                {/* Connected Players Section */}
                <div className="mt-10">
                    <h2 className="flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">
                        <Users size={16} className="text-text-secondary" />
                        Players Connected ({players.length}/2)
                    </h2>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {players.map((player) => (
                            <div
                                key={player.userId}
                                className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-primary p-4.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:border-text-secondary/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-bg-secondary border border-border-primary flex items-center justify-center text-text-primary">
                                        {player.isHost ? (
                                            <Crown size={18} className="fill-primary/10 text-primary" />
                                        ) : (
                                            <Users size={18} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold flex items-center gap-1.5">
                                            {player.username}
                                            {player.userId === user?.id && (
                                                <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full font-semibold">
                                                    You
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-[10px] text-text-secondary font-semibold uppercase font-mono tracking-wider mt-0.5">
                                            Elo: {player.userId === user?.id ? user.rating : 1200} • {player.isHost ? "Host" : "Challenger"}
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 uppercase tracking-wider font-sans">
                                    Ready
                                </span>
                            </div>
                        ))}

                        {players.length < 2 && (
                            <div className="rounded-xl border border-dashed border-border-primary p-8 text-center text-xs text-text-secondary font-bold bg-bg-secondary/50 uppercase tracking-wider flex items-center justify-center">
                                Waiting for Challenger to Connect...
                            </div>
                        )}
                    </div>
                </div>

                {/* Match configurations details */}
                <div className="mt-10 grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-bg-secondary/40 border border-border-primary p-4 text-center">
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider font-mono">
                            Difficulty
                        </p>
                        <h3 className={`text-sm font-bold mt-1 uppercase tracking-wide ${
                            roomConfig?.difficulty === "Easy"
                                ? "text-emerald-600 dark:text-emerald-450"
                               : roomConfig?.difficulty === "Medium"
                                ? "text-amber-600 dark:text-amber-450"
                                : "text-rose-600 dark:text-rose-455"
                        }`}>
                            {roomConfig?.difficulty}
                        </h3>
                    </div>

                    <div className="rounded-xl bg-bg-secondary/40 border border-border-primary p-4 text-center">
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider font-mono">
                            Language
                        </p>
                        <h3 className="text-sm font-bold mt-1 uppercase tracking-wide text-text-primary">
                            {displayLanguage}
                        </h3>
                    </div>

                    <div className="rounded-xl bg-bg-secondary/40 border border-border-primary p-4 text-center">
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider font-mono">
                            Timer Limit
                        </p>
                        <h3 className="text-sm font-bold mt-1 uppercase tracking-wide text-text-primary">
                            {roomConfig?.timeLimit} Mins
                        </h3>
                    </div>
                </div>

                {/* CTA Action buttons */}
                <div className="mt-10 space-y-4">
                    {hasTwoPlayers ? (
                        isHost ? (
                            <Button
                                onClick={startMatch}
                                className="w-full"
                                size="lg"
                            >
                                Start Match
                            </Button>
                        ) : (
                            <Button
                                disabled
                                className="w-full"
                                variant="secondary"
                                size="lg"
                            >
                                Host starting match...
                            </Button>
                        )
                    ) : (
                        <Button
                            disabled
                            className="w-full"
                            variant="secondary"
                            size="lg"
                        >
                            Waiting for Challenger...
                        </Button>
                    )}                    <Button
                        onClick={() => setShowLeaveModal(true)}
                        variant="secondary"
                        size="md"
                        className="w-full flex items-center justify-center gap-2 text-red-650 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20 border-border-primary"
                    >
                        <LogOut size={15} />
                        Leave Room
                    </Button>
                </div>
            </Card>

            {/* Leave Room Modal Overlay */}
            {showLeaveModal && (
                <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
                    <Card className="w-full max-w-sm text-center p-6 space-y-5 bg-bg-primary border-border-primary shadow-xl">
                        <h3 className="text-lg font-bold">Leave Lobby Room</h3>
                        <p className="text-xs text-text-secondary font-medium leading-normal">
                            Are you sure you want to leave this waiting lobby? {isHost && "As the host, this will close the lobby room for all other contenders."}
                        </p>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowLeaveModal(false)}
                                variant="secondary"
                                className="w-1/2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleLeaveLobby}
                                className="w-1/2 bg-red-600 hover:bg-red-700 text-white"
                            >
                                Leave
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default WaitingRoom;