import React, { useState, useEffect, useRef } from 'react';
import { Scene, Choice } from '../types';
import { generateClaymationImage, generateSpeech } from '../services/geminiService';
import { Loader2, Image as ImageIcon, Volume2, Square } from 'lucide-react';
import { playClickSound, playPCMAudio } from '../utils/soundUtils';

interface Props {
  scene: Scene;
  onChoice: (choice: Choice) => void;
  prophetName: string;
}

const GameScene: React.FC<Props> = ({ scene, onChoice, prophetName }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  
  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Cleanup audio on unmount or scene change
  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      setIsSpeaking(false);
      setIsLoadingSpeech(false);
    };
  }, [scene.id]);

  // Reset state and generate image when scene changes
  useEffect(() => {
    setSelectedChoice(null);
    setShowFeedback(false);
    
    // Reset image to null so we don't show the previous scene's image
    setGeneratedImage(null); 
    
    const fetchImage = async () => {
      setIsLoadingImage(true);
      // Fallback/Loading image is handled by UI logic, but we try to fetch the AI one
      const image = await generateClaymationImage(scene.bgDesc);
      if (image) {
        setGeneratedImage(image);
      }
      setIsLoadingImage(false);
    };

    fetchImage();
  }, [scene.id, scene.bgDesc]);

  const handleSpeak = async () => {
    playClickSound();
    
    if (isSpeaking) {
      if (audioSourceRef.current) {
        try {
          audioSourceRef.current.stop();
        } catch(e) { /* ignore if already stopped */ }
        audioSourceRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    setIsLoadingSpeech(true);
    const audioData = await generateSpeech(scene.text);
    setIsLoadingSpeech(false);

    if (audioData) {
      setIsSpeaking(true);
      const source = await playPCMAudio(audioData);
      if (source) {
        audioSourceRef.current = source;
        source.onended = () => {
          setIsSpeaking(false);
          audioSourceRef.current = null;
        };
      } else {
        setIsSpeaking(false);
      }
    }
  };

  const handleChoiceClick = (choice: Choice) => {
    if (showFeedback) return; // Prevent double clicks
    playClickSound();
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    playClickSound();
    if (selectedChoice) {
      onChoice(selectedChoice);
    }
  };

  // Fallback Picsum URL (used if AI fails or while loading if we wanted, but we'll show a loader instead)
  const fallbackImageUrl = `https://picsum.photos/seed/${scene.imagePlaceholder}/800/400`;

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full overflow-y-auto pb-20 no-scrollbar">
      {/* Image Area */}
      <div className="relative w-full h-48 md:h-64 shrink-0 rounded-b-2xl overflow-hidden shadow-2xl border-b border-gray-700 bg-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
        
        {isLoadingImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-prophet-gold animate-pulse">
             <Loader2 size={32} className="animate-spin mb-2" />
             <span className="text-xs uppercase tracking-widest font-bold">Membentuk Tanah Liat...</span>
          </div>
        ) : (
          <img 
            src={generatedImage || fallbackImageUrl} 
            alt={scene.bgDesc}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${generatedImage ? 'animate-in fade-in' : ''}`}
          />
        )}

        <div className="absolute bottom-2 right-2 z-20 bg-black/60 px-2 py-1 rounded text-xs text-gray-300 flex items-center gap-1">
          <ImageIcon size={10} />
          <span>{generatedImage ? 'AI Claymation' : 'Zaman'}: {prophetName}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col gap-6">
        
        {/* Narrative Text */}
        <div className="bg-gray-800/80 p-5 rounded-xl border-l-4 border-prophet-gold shadow-lg backdrop-blur-sm relative">
           <button 
            onClick={handleSpeak}
            className="absolute top-4 right-4 text-prophet-gold hover:text-white transition-colors bg-black/20 p-2 rounded-full hover:bg-black/40"
            disabled={isLoadingSpeech}
            title={isSpeaking ? "Stop Suara" : "Baca Narasi"}
          >
            {isLoadingSpeech ? (
              <Loader2 size={20} className="animate-spin" />
            ) : isSpeaking ? (
              <Square size={20} className="fill-current" />
            ) : (
              <Volume2 size={20} />
            )}
          </button>

          <p className="text-lg md:text-xl font-serif text-gray-100 leading-relaxed pr-10">
            {scene.text}
          </p>
        </div>

        {/* Choices or Feedback */}
        <div className="flex flex-col gap-3 mt-2">
          {!showFeedback ? (
            // SHOW CHOICES
            <>
              <h3 className="text-sm uppercase tracking-wide text-gray-400 font-bold mb-1">Tentukan Sikapmu:</h3>
              {scene.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoiceClick(choice)}
                  className="w-full text-left p-4 rounded-lg border border-gray-600 bg-gray-700/50 hover:bg-gray-700 hover:border-prophet-gold transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-prophet-gold/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative text-gray-200 font-sans font-medium group-hover:text-prophet-gold transition-colors">
                    {choice.text}
                  </span>
                </button>
              ))}
            </>
          ) : (
            // SHOW FEEDBACK
            <div className="animate-in zoom-in-95 duration-300">
               <div className="bg-gray-900 border border-gray-600 p-5 rounded-xl mb-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <h3 className="text-blue-400 font-bold mb-2 text-sm uppercase">Konsekuensi</h3>
                  <p className="text-white text-lg">{selectedChoice?.feedback}</p>
                  
                  {/* Stat Changes Indicator */}
                  <div className="flex gap-3 mt-3 text-xs font-mono">
                    {selectedChoice?.effect.iman !== 0 && (
                      <span className={selectedChoice!.effect.iman > 0 ? 'text-green-400' : 'text-red-400'}>
                        Iman {selectedChoice!.effect.iman > 0 ? '+' : ''}{selectedChoice!.effect.iman}
                      </span>
                    )}
                    {selectedChoice?.effect.akhlak !== 0 && (
                      <span className={selectedChoice!.effect.akhlak > 0 ? 'text-green-400' : 'text-red-400'}>
                        Akhlak {selectedChoice!.effect.akhlak > 0 ? '+' : ''}{selectedChoice!.effect.akhlak}
                      </span>
                    )}
                    {selectedChoice?.effect.keberanian !== 0 && (
                      <span className={selectedChoice!.effect.keberanian > 0 ? 'text-green-400' : 'text-red-400'}>
                        Berani {selectedChoice!.effect.keberanian > 0 ? '+' : ''}{selectedChoice!.effect.keberanian}
                      </span>
                    )}
                  </div>
               </div>

               <button
                onClick={handleContinue}
                className="w-full bg-prophet-gold text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-900/20"
               >
                 Lanjutkan Perjalanan
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScene;