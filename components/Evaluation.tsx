import React from 'react';
import { PlayerStats } from '../types';
import { Award, RefreshCcw, Star, User, School } from 'lucide-react';

interface Props {
  stats: PlayerStats;
  onRestart: () => void;
  playerName: string;
  playerClass: string;
}

const Evaluation: React.FC<Props> = ({ stats, onRestart, playerName, playerClass }) => {
  
  const getTitle = () => {
    const { iman, akhlak, keberanian } = stats;
    if (iman >= akhlak && iman >= keberanian) return "Penjaga Cahaya Iman";
    if (akhlak >= iman && akhlak >= keberanian) return "Teladan Akhlak Mulia";
    return "Singa Kebenaran";
  };

  const getAdvice = () => {
     const { iman, akhlak, keberanian } = stats;
     const min = Math.min(iman, akhlak, keberanian);
     if (min === iman) return "Tingkatkan lagi keyakinanmu dalam setiap ujian.";
     if (min === akhlak) return "Lembutkan hatimu kepada sesama manusia.";
     return "Jangan takut menyuarakan kebenaran.";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in duration-700 overflow-y-auto">
      <Award size={64} className="text-prophet-gold mb-6" />
      
      <h1 className="text-3xl font-serif text-white mb-2">Misi Selesai!</h1>
      <p className="text-gray-400 mb-8">Kamu telah menelusuri jejak para Nabi.</p>

      {/* Student Identity Card */}
      <div className="bg-gray-800/80 border border-gray-600 rounded-xl p-4 w-full max-w-md mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-700 p-2 rounded-full">
            <User size={20} className="text-indigo-300" />
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-400 uppercase">Nama Siswa</div>
            <div className="text-white font-bold">{playerName || "Siswa"}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div className="text-right">
             <div className="text-xs text-gray-400 uppercase">Kelas</div>
             <div className="text-white font-bold">{playerClass || "-"}</div>
          </div>
          <div className="bg-gray-700 p-2 rounded-full">
            <School size={20} className="text-indigo-300" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl mb-8">
        <h2 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-4">Gelar Akhir Kamu</h2>
        <div className="text-2xl md:text-3xl font-serif text-prophet-gold mb-6 border-b border-gray-700 pb-6">
          {getTitle()}
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-300">Iman</span>
                <span className="text-yellow-400 font-bold text-xl">{stats.iman}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full" style={{ width: `${Math.min(stats.iman * 10, 100)}%` }}></div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-gray-300">Akhlak</span>
                <span className="text-pink-400 font-bold text-xl">{stats.akhlak}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-400 h-full" style={{ width: `${Math.min(stats.akhlak * 10, 100)}%` }}></div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-gray-300">Keberanian</span>
                <span className="text-blue-400 font-bold text-xl">{stats.keberanian}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full" style={{ width: `${Math.min(stats.keberanian * 10, 100)}%` }}></div>
            </div>
        </div>
      </div>

      <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30 max-w-md mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 text-indigo-300">
              <Star size={16} />
              <span className="font-bold">Nasihat Untukmu</span>
          </div>
          <p className="text-gray-300 italic">"{getAdvice()}"</p>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-all"
      >
        <RefreshCcw size={18} />
        Mainkan Lagi
      </button>
    </div>
  );
};

export default Evaluation;