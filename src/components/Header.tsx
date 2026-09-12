import React from 'react';
import { CHAPTERS } from '../data/chapters';

interface HeaderProps {
  currentChapterId: number;
  chapterProgress: number; // 0 to 1 inside current chapter
  onSelectChapter: (chapterId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapterId,
  chapterProgress,
  onSelectChapter
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-3.5 transition-all duration-300 backdrop-blur-md bg-[#12100E]/75 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo with Pixel Mustache Icon */}
        <div 
          onClick={() => onSelectChapter(1)}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="relative w-7 h-7 rounded-md bg-[#1D1917] border border-[#E5A93C]/40 flex items-center justify-center shadow-inner group-hover:border-[#E5A93C] transition-colors">
            <svg 
              className="w-4 h-4 text-[#E5A93C] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M4 14c1.5-2 4-2.5 6-1 1-1.5 3-1.5 4 0 2-1.5 4.5-1 6 1 0 1.5-1 3-3 3-2.5 0-3.5-1.5-5-1.5s-2.5 1.5-5 1.5c-2 0-3-1.5-3-3z"/>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-serif tracking-widest text-xs md:text-sm font-bold text-[#F4F1EA] uppercase">
              NOKKU KOOLI
            </span>
            <span className="text-[#E5A93C] font-mono text-xs">/</span>
            <span className="font-mono text-xs tracking-wider text-[#00F0FF] uppercase font-medium">
              VIBECODING
            </span>
          </div>
        </div>

        {/* Center/Right: Interactive Chapter Progress Scrubber */}
        <nav className="hidden sm:flex items-center bg-black/40 border border-white/10 rounded-full px-1.5 py-1 shadow-lg backdrop-blur-md">
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === currentChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`relative px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-[#12100E] font-semibold'
                    : 'text-[#A39E93] hover:text-[#F4F1EA]'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#F5C869] shadow-sm -z-10"
                  />
                )}
                <span>{ch.shortTitle}</span>

                {/* Real-time progress bar under active chapter */}
                {isActive && (
                  <div className="relative w-6 h-1 bg-black/25 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#C85A32] rounded-full transition-all duration-75"
                      style={{ width: `${Math.round(chapterProgress * 100)}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Mobile Chapter Scrubber Strip */}
      <div className="sm:hidden flex items-center justify-between gap-1 mt-2 pt-2 border-t border-white/5 overflow-x-auto no-scrollbar">
        {CHAPTERS.map((ch) => {
          const isActive = ch.id === currentChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold'
                  : 'text-[#A39E93] hover:text-[#F4F1EA]'
              }`}
            >
              {ch.shortTitle}
            </button>
          );
        })}
      </div>
    </header>
  );
};
