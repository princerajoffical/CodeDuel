import { useEffect, useState } from "react";
import { Trophy, Mail, Calendar, ShieldAlert, Loader2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getUserProfile } from "../../services/userService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Profile = () => {
    const { user } = useAuth();
    const [apiUser, setApiUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const res = await getUserProfile();
                if (res && res.success) {
                    setApiUser(res.user);
                }
            } catch (err) {
                console.error("Failed to load user profile:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const currentUser = apiUser || user;
    const username = currentUser?.username || "Guest Coder";
    const email = currentUser?.email || "guest@codeduel.com";
    const rating = currentUser?.rating || 1200;
    const matchesPlayed = currentUser?.matchesPlayed || 0;
    const matchesWon = currentUser?.matchesWon || 0;
    const losses = currentUser?.losses || 0;
    const globalRank = currentUser?.rank ? `Rank #${currentUser.rank}` : "Unranked";
    
    const winRatio = matchesPlayed > 0 ? Math.round((matchesWon / matchesPlayed) * 100) : 0;

    // Dynamically assign an ELO tier based on rating
    const getEloTier = (ratingVal: number) => {
        if (ratingVal >= 1500) return "Grandmaster";
        if (ratingVal >= 1400) return "Diamond";
        if (ratingVal >= 1300) return "Platinum";
        if (ratingVal >= 1200) return "Gold";
        if (ratingVal >= 1100) return "Silver";
        return "Bronze";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-gray-400">
                <Loader2 size={24} className="animate-spin text-primary mr-2" />
                <span className="text-sm font-bold uppercase tracking-wider font-mono">Synchronizing profile...</span>
            </div>
        );
    }

    return (
        <div className="space-y-10 max-w-4xl mx-auto text-text-primary">
            {/* Header Title */}
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                    Developer Profile
                </h1>
                <p className="text-sm text-text-secondary font-medium mt-1">
                    Manage your identity and track your tournament stats.
                </p>
            </div>

            {/* Profile Overview Card */}
            <Card className="p-8 bg-bg-primary border-border-primary shadow-premium-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Large Avatar */}
                    <div className="h-24 w-24 rounded-xl bg-bg-secondary border-2 border-border-primary flex items-center justify-center text-text-primary shadow-xs text-3xl font-extrabold select-none shrink-0">
                        {username.substring(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 space-y-5 text-center md:text-left">
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight flex flex-col md:flex-row items-center gap-2.5">
                                {username}
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-border-primary bg-bg-secondary text-text-primary font-mono mt-2 md:mt-0">
                                    Elo Rating: {rating}
                                </span>
                            </h2>
                            <p className="text-xs text-text-secondary font-bold uppercase tracking-wider font-mono mt-1">
                                {getEloTier(rating)} • {globalRank}
                            </p>
                        </div>

                        {/* Contacts grid */}
                        <div className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-text-secondary pt-3 border-t border-border-primary max-w-lg">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <Mail size={15} className="text-text-secondary" />
                                <span className="text-text-primary">{email}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <Calendar size={15} className="text-text-secondary" />
                                <span className="text-text-primary">Member since July 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Layout Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Stats Summary cards */}
                <Card className="p-6 bg-bg-primary border-border-primary md:col-span-2 space-y-6">
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono pb-3 border-b border-border-primary flex items-center gap-2">
                        <Trophy size={15} className="text-primary" />
                        Performance Statistics
                    </h3>

                    <div className="grid gap-6 sm:grid-cols-3 text-center">
                        <div className="space-y-1">
                            <span className="text-xs text-text-secondary font-medium">Matches Played</span>
                            <h4 className="text-2xl font-extrabold text-text-primary">{matchesPlayed}</h4>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-text-secondary font-medium">Matches Won (Losses)</span>
                            <h4 className="text-2xl font-extrabold text-text-primary">{matchesWon}W - {losses}L</h4>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-text-secondary font-medium">Win Ratio</span>
                            <h4 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-450">{winRatio}%</h4>
                        </div>
                    </div>
                </Card>

                {/* Security Card */}
                <Card className="p-6 bg-bg-primary border-border-primary flex flex-col justify-between">
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono pb-3 border-b border-border-primary flex items-center gap-2">
                        <ShieldAlert size={15} className="text-primary" />
                        Security & Config
                    </h3>

                    <div className="pt-4 space-y-4">
                        <div className="space-y-1 text-left">
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Account State</span>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5 mt-0.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Active & Verified
                            </p>
                        </div>

                        <Button variant="secondary" size="sm" className="w-full">
                            Edit Account Details
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
