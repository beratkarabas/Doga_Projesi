import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon, RefreshCw, Sparkles, Check, Share2, Heart } from 'lucide-react';
import { NATURE_QUOTES, Quote } from '../data/quotes';

export const InspiringQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize with random quote on first load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * NATURE_QUOTES.length);
    setCurrentIndex(randomIndex);
  }, []);

  const handleNextQuote = () => {
    setIsAnimating(true);
    setCopied(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % NATURE_QUOTES.length);
      setIsAnimating(false);
      setLiked(false);
    }, 250);
  };

  const handleRandomQuote = () => {
    setIsAnimating(true);
    setCopied(false);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * NATURE_QUOTES.length);
      if (nextIndex === currentIndex) {
        nextIndex = (currentIndex + 1) % NATURE_QUOTES.length;
      }
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
      setLiked(false);
    }, 250);
  };

  const handleCopyQuote = () => {
    const current = NATURE_QUOTES[currentIndex];
    const textToCopy = `"${current.text}" - ${current.author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentQuote: Quote = NATURE_QUOTES[currentIndex];

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-emerald-700/40">
      {/* Decorative background glow & shapes */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <QuoteIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-emerald-100">İlham Veren Sözler</h3>
            <span className="text-[10px] text-emerald-300/80 font-medium">Doğa & Bilinç Mirası</span>
          </div>
        </div>

        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 border border-white/10">
          {currentIndex + 1} / {NATURE_QUOTES.length}
        </span>
      </div>

      {/* Quote Content Box with Animation */}
      <div 
        className={`min-h-[140px] flex flex-col justify-between transition-all duration-300 relative z-10 ${
          isAnimating ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        <p className="text-sm sm:text-base font-serif italic text-emerald-50 leading-relaxed tracking-wide mb-4">
          "{currentQuote.text}"
        </p>

        {/* Author info & Topic */}
        <div className="pt-3 border-t border-white/10 flex items-end justify-between gap-3">
          <div>
            <h4 className="font-display font-bold text-sm text-amber-300">
              {currentQuote.author}
            </h4>
            <p className="text-[11px] text-emerald-200/80">
              {currentQuote.title}
            </p>
          </div>

          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-400/20 shrink-0">
            {currentQuote.topic}
          </span>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              liked ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
            title="Sözü Beğen"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-pink-400' : ''}`} />
          </button>

          <button
            onClick={handleCopyQuote}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer"
            title="Sözü Kopyala"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={handleNextQuote}
          disabled={isAnimating}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
          <span>Yeni Söz Getir</span>
        </button>
      </div>
    </div>
  );
};
