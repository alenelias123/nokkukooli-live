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
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2.5 md:px-8 md:py-3 transition-all duration-300 backdrop-blur-md bg-[#12100E]/85 border-b border-white/10">
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

          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-xs md:text-sm font-bold text-[#F4F1EA] uppercase">
              NOKKU KOOLI
            </span>
            <span className="text-[#E5A93C] font-mono text-xs">/</span>
            <span className="text-[#FFD700] text-sm md:text-base leading-none drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] select-none">
              ☭
            </span>
          </div>
        </div>

        {/* Center: Story Chapters Scrubber */}
        <nav className="hidden lg:flex items-center bg-black/40 border border-white/10 rounded-full px-1.5 py-1 shadow-lg backdrop-blur-md">
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

                {isActive && (
                  <div className="relative w-5 h-1 bg-black/25 rounded-full overflow-hidden">
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

        {/* Right: Section Jump Links */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => scrollToSection('hardware-showcase')}
            className="px-2.5 py-1 rounded-lg text-[#A39E93] hover:text-[#E5A93C] hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline-block"
          >
            ഹാർഡ്‌വെയർ
          </button>
          <button
            onClick={() => scrollToSection('extension-showcase')}
            className="px-2.5 py-1 rounded-lg text-[#A39E93] hover:text-[#E5A93C] hover:bg-white/5 transition-colors cursor-pointer hidden md:inline-block"
          >
            എക്സ്റ്റൻഷൻ
          </button>
          <button
            onClick={() => scrollToSection('virtual-sentinel')}
            className="px-2.5 py-1 rounded-lg text-[#A39E93] hover:text-[#00F0FF] hover:bg-white/5 transition-colors cursor-pointer hidden lg:inline-block"
          >
            സിമുലേറ്റർ
          </button>
          <button
            onClick={() => scrollToSection('history-archive')}
            className="px-3 py-1 rounded-lg bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] hover:bg-[#E5A93C] hover:text-[#12100E] font-bold transition-all cursor-pointer"
          >
            ചരിത്രം
          </button>
        </div>

      </div>

      {/* Mobile Quick Navigation Strip */}
      <div className="lg:hidden flex items-center justify-between gap-1 mt-2 pt-2 border-t border-white/5 overflow-x-auto no-scrollbar">
        {CHAPTERS.map((ch) => {
          const isActive = ch.id === currentChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold'
                  : 'text-[#A39E93] hover:text-[#F4F1EA]'
              }`}
            >
              {ch.shortTitle}
            </button>
          );
        })}
        <button
          onClick={() => scrollToSection('history-archive')}
          className="text-[10px] font-mono px-2 py-0.5 text-[#E5A93C] whitespace-nowrap"
        >
          ചരിത്രം
        </button>
        <button
          onClick={() => scrollToSection('hardware-showcase')}
          className="text-[10px] font-mono px-2 py-0.5 text-[#E5A93C] whitespace-nowrap"
        >
          ഹാർഡ്‌വെയർ
        </button>
        <button
          onClick={() => scrollToSection('virtual-sentinel')}
          className="text-[10px] font-mono px-2 py-0.5 text-[#00F0FF] whitespace-nowrap font-bold"
        >
          സിമുലേറ്റർ
        </button>
      </div>
    </header>
  );
};
