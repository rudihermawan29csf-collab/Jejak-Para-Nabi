import React, { useState } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { getGeminiHelp } from '../services/geminiService';

interface Props {
  prophetName: string;
  sceneContext: string;
}

const AIHelper: React.FC<Props> = ({ prophetName, sceneContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setResponse(null);
    
    const answer = await getGeminiHelp(prophetName, sceneContext, question);
    
    setResponse(answer);
    setLoading(false);
    setQuestion('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg transition-all z-50 flex items-center gap-2 border-2 border-indigo-400"
      >
        <Bot size={24} />
        <span className="hidden md:inline font-bold text-sm">Tanya Hikmah</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[90vw] md:w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="bg-indigo-900/50 p-3 flex justify-between items-center border-b border-indigo-500/30">
        <div className="flex items-center gap-2 text-indigo-200">
          <Bot size={18} />
          <span className="font-bold text-sm">Asisten Hikmah (AI)</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 bg-gray-800/90 max-h-60 overflow-y-auto">
        {!response && !loading && (
          <p className="text-gray-400 text-sm italic">
            "Aqil, apakah ada yang ingin kamu tanyakan tentang kejadian di zaman Nabi {prophetName} ini?"
          </p>
        )}
        
        {loading && (
          <div className="flex items-center justify-center py-4 text-indigo-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span className="text-sm">Mencari hikmah...</span>
          </div>
        )}

        {response && (
          <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20">
            <p className="text-gray-200 text-sm leading-relaxed">{response}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-900 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tanya sesuatu..."
          className="flex-1 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-gray-700"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIHelper;