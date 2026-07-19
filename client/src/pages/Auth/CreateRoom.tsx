import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createRoom } from "../../services/roomService";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const CreateRoom = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roomName: "",
        difficulty: "Easy",
        language: "cpp",
        timeLimit: 30,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.name === "timeLimit"
                    ? Number(e.target.value)
                    : e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const res = await createRoom(formData);

            if (res.success && res.room) {
                navigate(`/waiting/${res.room.roomCode}`);
            } else {
                setError(res.message || "Failed to create room");
            }

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to create room. Please check your connection and try again."
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
                    Host a Match
                </h1>
                <p className="text-sm text-text-secondary font-medium mb-8">
                    Create a customized duel arena and invite a Peer to code live.
                </p>

                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-4 text-xs text-red-650 dark:text-red-400 text-center font-semibold">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <Input
                        label="Room Name"
                        type="text"
                        name="roomName"
                        placeholder="e.g. Speed Coders"
                        value={formData.roomName}
                        onChange={handleChange}
                        required
                    />

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary font-sans">
                            Difficulty Level
                        </label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-border-primary bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary font-sans">
                            Match Language
                        </label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-border-primary bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                        >
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary font-sans">
                            Time Constraint
                        </label>
                        <select
                            name="timeLimit"
                            value={formData.timeLimit}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-border-primary bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                        >
                            <option value={15}>15 Minutes</option>
                            <option value={30}>30 Minutes</option>
                            <option value={45}>45 Minutes</option>
                            <option value={60}>60 Minutes</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full"
                    >
                        Create Arena
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default CreateRoom;