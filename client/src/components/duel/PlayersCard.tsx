import React from "react";
import { Crown, User } from "lucide-react";

export interface CompetingPlayer {
    _id: string;
    username: string;
    rating: number;
}

interface PlayersCardProps {
    players: CompetingPlayer[];
    hostId: string;
    currentUserId?: string;
}

const PlayersCard: React.FC<PlayersCardProps> = ({
    players = [],
    hostId,
    currentUserId,
}) => {
    return (
        <div className="flex items-center gap-3.5 bg-bg-primary border border-border-primary rounded-xl px-4 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <span className="text-[10px] font-bold text-text-secondary font-mono tracking-wider uppercase">Contenders</span>
            <div className="h-3 w-px bg-border-primary" />
            <div className="flex items-center gap-4">
                {players.length === 0 ? (
                    <span className="text-xs text-text-secondary italic">No competitors connected</span>
                ) : (
                    players.map((player) => {
                        const isHost = player._id === hostId;
                        const isSelf = player._id === currentUserId;
                        return (
                            <div key={player._id} className="flex items-center gap-1.5">
                                {isHost ? (
                                    <Crown size={13} className="text-amber-500 fill-amber-500/10" />
                                ) : (
                                    <User size={13} className="text-text-secondary" />
                                )}
                                <span className={`text-xs font-bold tracking-tight ${isSelf ? "text-primary" : "text-text-primary"}`}>
                                    {player.username}
                                    {isSelf && (
                                        <span className="text-[9px] ml-1 px-1.5 py-0.1 rounded-full bg-primary-light border border-border-primary text-primary font-semibold font-sans">
                                            You
                                        </span>
                                    )}
                                </span>
                                <span className="text-[10px] text-text-secondary font-semibold font-mono">({player.rating})</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PlayersCard;
// 
