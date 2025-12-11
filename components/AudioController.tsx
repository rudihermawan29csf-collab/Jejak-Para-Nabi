import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Using a reliable Google Action sound for desert/wind ambience that fits the theme
const BGM_URL = "https://actions.google.com/sounds/v1/ambiences/desert_wind.ogg";

interface Props {
  shouldPlay: boolean;
}

const AudioController: React.FC<Props> = ({ shouldPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (shouldPlay) {
       setHasInteracted(true);
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (audioRef.current) {
      if (hasInteracted && !isMuted) {
        // Lower volume for background ambience
        audioRef.current.volume = 0.4;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio autoplay prevented by browser policy", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [hasInteracted, isMuted]);

  return (
    <div className="fixed top-20 right-4 z-50">
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="bg-gray-900/80 text-white p-3 rounded-full border border-gray-700 hover:bg-gray-800 transition-all shadow-lg backdrop-blur-sm group"
        title={isMuted ? "Unmute Suara" : "Mute Suara"}
      >
        {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400" />}
      </button>
      <audio ref={audioRef} src={BGM_URL} loop crossOrigin="anonymous" />
    </div>
  );
};

export default AudioController;