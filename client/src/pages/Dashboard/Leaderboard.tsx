import { useEffect, useState } from "react";
import { Trophy, Search, Crown, Medal, User, Loader2 } from "lucide-react";
import { getLeaderboard } from "../../services/userService";
import Card from "../../components/ui/Card";

interface LeaderboardUser {
    username: string;
    rating: number;
    matchesPlayed: number;
    matchesWon: number;
    losses: number;
}

const Leaderboard = () => {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                setIsLoading(true);
                const res = await getLeaderboard();
                if (res && res.success) {
                    setUsers(res.users);
                }
            } catch (err) {
                console.error("Failed to retrieve leaderboard:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const filteredUsers = users.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={15} className="text-amber-500 fill-amber-500/10" />;
        if (rank === 2) return <Medal size={15} className="text-gray-400 fill-gray-100 dark:fill-slate-800" />;
        if (rank === 3) return <Medal size={15} className="text-amber-700 fill-amber-50 dark:fill-slate-900/50" />;
        return <User size={14} className="text-gray-300 dark:text-slate-600" />;
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return "text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30";
        if (rank === 2) return "text-gray-700 dark:text-slate-350 bg-gray-50 dark:bg-slate-800 border-gray-150 dark:border-slate-700";
        if (rank === 3) return "text-amber-850 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/10 border-amber-200/60 dark:border-amber-900/20";
        return "text-text-secondary bg-bg-primary border-border-primary";
    };

    return (
        <div className="space-y-10 max-w-4xl mx-auto text-text-primary">
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Leaderboard
                    </h1>
                    <p className="text-sm text-text-secondary font-medium mt-1">
                        Global competitor rankings based on live match outcome calculations.
                    </p>
                </div>

                {/* Search field */}
                <div className="w-full md:w-72 relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-text-secondary/60">
                        <Search size={14} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-border-primary bg-bg-primary pl-9 pr-4 py-2.5 text-xs text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans font-semibold"
                    />
                </div>
            </div>

            {/* Leaderboard Card Container */}
            <Card className="p-6 bg-bg-primary border-border-primary shadow-premium-lg">
                <div className="flex items-center pb-4 border-b border-border-primary">
                    <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono flex items-center gap-2">
                        <Trophy size={16} className="text-primary" />
                        Global Standings
                    </h2>
                </div>

                <div className="overflow-x-auto mt-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-12 space-x-2 text-gray-400 dark:text-slate-500">
                            <Loader2 size={20} className="animate-spin text-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider font-sans">Syncing standings...</span>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-border-primary text-[10px] text-text-secondary font-mono font-bold uppercase tracking-wider">
                                    <th className="py-3 pr-4 text-center w-16">Rank</th>
                                    <th className="py-3 px-4">User</th>
                                    <th className="py-3 px-4">Elo Rating</th>
                                    <th className="py-3 px-4 text-center">Played</th>
                                    <th className="py-3 px-4 text-center">Won</th>
                                    <th className="py-3 px-4 text-right">Win rate</th>
                                </tr>
                            </thead>
                            <tbody className="font-sans font-medium text-text-primary">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-xs text-gray-400 dark:text-slate-550 font-bold uppercase tracking-wider">
                                            No users found matching query
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((item, idx) => {
                                        const rank = idx + 1;
                                        const winRatio = item.matchesPlayed > 0 ? Math.round((item.matchesWon / item.matchesPlayed) * 100) : 0;
                                        return (
                                            <tr key={item.username} className="border-b border-border-primary/40 hover:bg-bg-secondary/40 transition-colors">
                                                <td className="py-4 pr-4">
                                                    <div className={`mx-auto h-7 w-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${getRankColor(rank)}`}>
                                                        {rank <= 3 ? getRankIcon(rank) : rank}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="font-extrabold text-text-primary">{item.username}</span>
                                                </td>
                                                <td className="py-4 px-4 font-mono text-xs font-bold text-text-primary">
                                                    {item.rating}
                                                </td>
                                                <td className="py-4 px-4 text-center text-xs font-medium text-text-secondary font-mono">
                                                    {item.matchesPlayed}
                                                </td>
                                                <td className="py-4 px-4 text-center text-xs font-medium text-text-secondary font-mono">
                                                    {item.matchesWon}
                                                </td>
                                                <td className="py-4 px-4 text-right text-xs font-bold text-primary">
                                                    {winRatio}%
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Leaderboard;
