import React, { useEffect, useState } from 'react';
import { Chapter } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  chapter: Chapter;
  onStart: () => void;
}

const ChapterIntro: React.FC<Props> = ({ chapter, onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in effect
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center p-8 text-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-4 text-prophet-gold text-lg font-serif tracking-widest uppercase border-b border-prophet-gold pb-2">
        Bab {chapter.id}
      </div>
      
      <h1 className="text-4xl md:text-6xl font-serif text-white mb-2 drop-shadow-lg">
        {chapter.prophetName}
      </h1>
      
      <h2 className="text-2xl text-gray-300 mb-8 italic font-light">
        "{chapter.title}"
      </h2>

      <p className="max-w-xl text-lg text-gray-400 leading-relaxed mb-12">
        {chapter.introText}
      </p>

      <button
        onClick={onStart}
        className="group flex items-center gap-2 bg-prophet-gold text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg shadow-yellow-900/20"
      >
        Mulai Misi
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default ChapterIntro;