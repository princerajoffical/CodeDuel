import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clipboard, ArrowLeft } from "lucide-react";
import { joinRoom } from "../../services/roomService";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const JoinRoom = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setRoomCode(text.trim().toUpperCase());
        } catch (err) {
            console.error("Failed to read clipboard text: ", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedCode = roomCode.trim().toUpperCase();
        if (!trimmedCode) return;

        try {
            setLoading(true);
            setError(null);

            const res = await joinRoom(trimmedCode);
            
            if (res.success && res.room) {
                navigate(`/waiting/${res.room.roomCode}`);
            } else {
                setError(res.message || "Failed to join room");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message || 
                "We couldn't connect to the server. Please check your connection and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-bg-secondary text-text-primary">
            <Card className="w-full max-w-lg shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.03)] border-border-primary">
                <div className="mb-6">
                    <Link
                        to="/dashboard"
                        className="text-text-secondary hover:text-text-primary flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition"
                    >
                        <ArrowLeft size={14} />
                        Back to Dashboard
                    </Link>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-text-primary mb-2">
                    Join Match
                </h1>
                
                <p className="text-sm text-text-secondary font-medium mb-8">
                    Enter the unique 8-character room code shared by your friend to join the coding duel.
                </p>

                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-955/20 border border-red-100 dark:border-red-900/30 p-4 text-xs text-red-650 dark:text-red-400 text-center font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <Input
                                label="Lobby Code"
                                type="text"
                                name="roomCode"
                                placeholder="Enter Room Code (e.g. AB12CD)"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                required
                                maxLength={8}
                                className="uppercase font-mono tracking-widest text-center text-lg"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handlePaste}
                            className="flex h-11 items-center justify-center px-4 rounded-xl border border-border-primary bg-bg-secondary text-text-secondary hover:bg-bg-secondary/60 transition active:scale-95 mb-[1.5px]"
                            title="Paste from clipboard"
                        >
                            <Clipboard size={18} />
                        </button>
                    </div>

                    <Button
                        type="submit"
                        disabled={!roomCode.trim()}
                        isLoading={loading}
                        className="w-full"
                    >
                        Join Battle
                    </Button>

                    <p className="text-center text-sm font-medium text-text-secondary mt-6">
                        Want to host instead?{" "}
                        <Link
                            to="/create-room"
                            className="font-semibold text-primary hover:underline"
                        >
                            Host Room
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default JoinRoom;
