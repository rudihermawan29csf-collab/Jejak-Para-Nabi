import React, { useState } from 'react';
import { GamePhase, PlayerStats, Choice } from './types';
import { STORY_DATA } from './data';
import StatusPanel from './components/StatusPanel';
import ChapterIntro from './components/ChapterIntro';
import GameScene from './components/GameScene';
import Evaluation from './components/Evaluation';
import AIHelper from './components/AIHelper';
import AudioController from './components/AudioController';
import { playClickSound, playSuccessSound } from './utils/soundUtils';
import { BookOpen, User, School, ArrowRight } from 'lucide-react';

const INITIAL_STATS: PlayerStats = { iman: 5, akhlak: 5, keberanian: 5 };

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.START);
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentSceneId, setCurrentSceneId] = useState<string>('');
  const [lastStatChange, setLastStatChange] = useState<Partial<PlayerStats> | null>(null);

  // Player Identity State
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');

  const currentChapter = STORY_DATA[currentChapterIdx];
  const currentScene = currentChapter ? currentChapter.scenes[currentSceneId] : null;

  // --- ACTIONS ---

  const goToLogin = () => {
    playClickSound();
    setPhase(GamePhase.LOGIN);
  };

  const startGame = () => {
    if (!playerName.trim() || !playerClass.trim()) {
      // Simple validation shake or alert could go here
      return;
    }
    playClickSound();
    setStats(INITIAL_STATS);
    setCurrentChapterIdx(0);
    setPhase(GamePhase.CHAPTER_INTRO);
  };

  const handleRestart = () => {
    playClickSound();
    setPhase(GamePhase.START);
    // Optional: Reset name/class or keep them? Keeping them for now for easier replay.
  };

  const startChapter = () => {
    playClickSound();
    setCurrentSceneId(currentChapter.startingSceneId);
    setPhase(GamePhase.PLAYING);
    setLastStatChange(null);
  };

  const handleChoice = (choice: Choice) => {
    // Apply stats
    playClickSound();
    const newStats = {
      iman: stats.iman + choice.effect.iman,
      akhlak: stats.akhlak + choice.effect.akhlak,
      keberanian: stats.keberanian + choice.effect.keberanian
    };
    setStats(newStats);
    setLastStatChange(choice.effect);

    // Transition
    setTimeout(() => {
      if (choice.nextSceneId === 'NEXT_CHAPTER') {
        playSuccessSound();
        setPhase(GamePhase.CHAPTER_END);
      } else if (choice.nextSceneId === 'GAME_OVER') {
        setPhase(GamePhase.EVALUATION);
      } else {
        setCurrentSceneId(choice.nextSceneId);
        setLastStatChange(null); // Clear indicator after transition
      }
    }, 1500); // Delay to let user read feedback
  };

  const nextChapter = () => {
    playClickSound();
    const nextIdx = currentChapterIdx + 1;
    if (nextIdx < STORY_DATA.length) {
      setCurrentChapterIdx(nextIdx);
      setPhase(GamePhase.CHAPTER_INTRO);
    } else {
      setPhase(GamePhase.EVALUATION);
    }
  };

  // --- RENDERERS ---

  if (phase === GamePhase.START) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center text-center p-6 relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center max-w-lg animate-in fade-in zoom-in duration-1000">
          <BookOpen size={64} className="text-prophet-gold mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-2 tracking-wide drop-shadow-xl">
            JEJAK PARA NABI
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-8 uppercase tracking-widest border-t border-b border-gray-500 py-2">
            Misi Akhlak Mulia
          </h2>
          <p className="text-gray-200 mb-8 leading-relaxed">
            Selamat datang di petualangan menembus waktu. Siapkan hatimu untuk belajar dari manusia-manusia pilihan.
          </p>
          <button
            onClick={goToLogin}
            className="bg-prophet-gold text-black text-xl font-bold py-4 px-12 rounded-lg hover:bg-yellow-500 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Mulai Petualangan
          </button>
        </div>

        {/* Footnote */}
        <div className="absolute bottom-6 z-10 flex flex-col items-center animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-300">
          <div className="w-12 h-0.5 bg-prophet-gold mb-2 opacity-60"></div>
          <p className="text-gray-400 text-sm font-serif tracking-wide">Pendidikan Agama Islam</p>
          <p className="text-gray-400 text-sm font-serif tracking-wide">Tingkat SMP</p>
          <p className="text-white text-sm font-bold uppercase tracking-widest mt-1">Kabupaten Mojokerto</p>
        </div>
      </div>
    );
  }

  if (phase === GamePhase.LOGIN) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-prophet-dark p-6">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-700 p-3 rounded-full">
              <User size={32} className="text-prophet-gold" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-white text-center mb-2">Identitas Musafir</h2>
          <p className="text-gray-400 text-center mb-6 text-sm">Masukkan identitasmu sebelum memulai perjalanan.</p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2 flex items-center gap-2">
                <User size={14} /> Nama Lengkap
              </label>
              <input 
                type="text" 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-prophet-gold focus:ring-1 focus:ring-prophet-gold transition-colors"
                placeholder="Contoh: Aqil Mustofa"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2 flex items-center gap-2">
                <School size={14} /> Kelas
              </label>
              <input 
                type="text" 
                value={playerClass}
                onChange={(e) => setPlayerClass(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-prophet-gold focus:ring-1 focus:ring-prophet-gold transition-colors"
                placeholder="Contoh: 7A"
              />
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={!playerName.trim() || !playerClass.trim()}
            className="w-full bg-prophet-gold disabled:bg-gray-600 disabled:cursor-not-allowed text-black text-lg font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
          >
            Lanjutkan <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === GamePhase.EVALUATION) {
    return (
      <>
        <Evaluation 
          stats={stats} 
          onRestart={handleRestart} 
          playerName={playerName}
          playerClass={playerClass}
        />
        {/* Keep audio accessible in evaluation to turn it off if desired */}
        <AudioController shouldPlay={true} />
      </>
    );
  }

  if (phase === GamePhase.CHAPTER_INTRO && currentChapter) {
    return (
      <>
        <ChapterIntro chapter={currentChapter} onStart={startChapter} />
        <AudioController shouldPlay={true} />
      </>
    );
  }

  if (phase === GamePhase.CHAPTER_END && currentChapter) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in zoom-in-95 duration-500">
        <div className="bg-gray-800/80 p-8 rounded-2xl border border-gray-600 max-w-lg shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-serif text-prophet-gold mb-6">Bab Selesai</h2>
          <p className="text-xl text-white italic mb-8">"{currentChapter.hikmah}"</p>
          
          <div className="flex gap-4 justify-center mb-8">
            <div className="text-green-400 font-bold">+ Poin Pengalaman</div>
          </div>

          <button
            onClick={nextChapter}
            className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
          >
            {currentChapterIdx < STORY_DATA.length - 1 ? "Lanjut ke Zaman Berikutnya" : "Lihat Evaluasi Akhir"}
          </button>
        </div>
        <AudioController shouldPlay={true} />
      </div>
    );
  }

  // --- PLAYING PHASE ---
  return (
    <div className="flex flex-col h-full bg-prophet-dark relative">
      {/* Top Bar: Stats */}
      <div className="w-full bg-gray-900 border-b border-gray-800 flex justify-center sticky top-0 z-30 shadow-md">
        <StatusPanel stats={stats} changes={lastStatChange} />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 overflow-hidden relative w-full">
        {currentScene ? (
          <GameScene 
            scene={currentScene} 
            onChoice={handleChoice} 
            prophetName={currentChapter.prophetName}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-red-500">Error: Scene not found</div>
        )}
      </div>

      {/* Audio Controller */}
      <AudioController shouldPlay={true} />

      {/* AI Assistant - Always available during gameplay */}
      {currentScene && (
        <AIHelper 
          prophetName={currentChapter.prophetName} 
          sceneContext={`${currentChapter.worldDesc}. ${currentScene.text}`}
        />
      )}
    </div>
  );
};

export default App;