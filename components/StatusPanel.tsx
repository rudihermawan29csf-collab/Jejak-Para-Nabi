import React from 'react';
import { PlayerStats } from '../types';
import { Heart, Shield, Star } from 'lucide-react';

interface Props {
  stats: PlayerStats;
  changes?: Partial<PlayerStats> | null;
}

const StatusPanel: React.FC<Props> = ({ stats, changes }) => {
  const renderStat = (
    label: string,
    value: number,
    icon: React.ReactNode,
    colorClass: string,
    changeVal?: number
  ) => (
    <div className="flex flex-col items-center bg-gray-800/50 p-2 rounded-lg border border-gray-700 w-full">
      <div className={`${colorClass} mb-1`}>{icon}</div>
      <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xl font-serif text-white">{value}</span>
        {changeVal !== undefined && changeVal !== 0 && (
          <span className={`text-xs font-bold ${changeVal > 0 ? 'text-green-400' : 'text-red-400'} animate-pulse`}>
            {changeVal > 0 ? '+' : ''}{changeVal}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex justify-between gap-4 w-full max-w-2xl px-4 py-2">
      {renderStat("Iman", stats.iman, <Star size={20} />, "text-yellow-400", changes?.iman)}
      {renderStat("Akhlak", stats.akhlak, <Heart size={20} />, "text-pink-400", changes?.akhlak)}
      {renderStat("Berani", stats.keberanian, <Shield size={20} />, "text-blue-400", changes?.keberanian)}
    </div>
  );
};

export default StatusPanel;