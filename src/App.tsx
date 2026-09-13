import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { ArrowDown, BookOpen } from 'lucide-react';
import { CHAPTERS } from './data/chapters';
import { Header } from './components/Header';
import { StoryCanvas } from './components/StoryCanvas';
import { HistoryArchive } from './components/HistoryArchive';
import { HardwareShowcase } from './components/HardwareShowcase';
import { ExtensionShowcase } from './components/ExtensionShowcase';
import { VirtualSentinel } from './components/VirtualSentinel';
import { MediaGallery } from './components/MediaGallery';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [chapterProgress, setChapterProgress] = useState<number>(0);

  // Framer Motion useScroll hook
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end']
  });

  // Sync scroll position with chapters
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);

      const totalChapters = CHAPTERS.length;
      const clamped = Math.max(0, Math.min(0.9999, latest));
      const idx = Math.min(totalChapters - 1, Math.floor(clamped * totalChapters));
      setCurrentChapterId(CHAPTERS[idx].id);

      const chStart = idx / totalChapters;
      const chEnd = (idx + 1) / totalChapters;
      const localProg = Math.max(0, Math.min(1, (clamped - chStart) / (chEnd - chStart)));
      setChapterProgress(localProg);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  // Navigate to specific chapter
  const handleSelectChapter = (chapterId: number) => {
    if (!scrollTrackRef.current) return;
    const totalChapters = CHAPTERS.length;
    const targetIdx = chapterId - 1;
    const trackTop = scrollTrackRef.current.offsetTop;
    const trackHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;

    const targetY = trackTop + (targetIdx / totalChapters) * trackHeight + 5;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // Navigate to summary/documentation section
  const handleScrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigate to detailed history archive at the bottom
  const handleScrollToHistory = () => {
    const historyEl = document.getElementById('history-archive');
    if (historyEl) {
      historyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Replay from start
  const handleReplay = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] relative selection:bg-[#C85A32] selection:text-white">
      
      {/* Floating Header with Chapter Scrubber & Section Jumps */}
      <Header
        currentChapterId={currentChapterId}
        chapterProgress={chapterProgress}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Scroll-Driven Storytelling Section */}
      <div 
        ref={scrollTrackRef} 
        className="relative w-full h-[380vh] sm:h-[550vh]"
      >
        <StoryCanvas
          scrollProgress={scrollProgress}
          currentChapterId={currentChapterId}
          onChapterChange={setCurrentChapterId}
          onScrollToSummary={handleScrollToSummary}
          onScrollToHistory={handleScrollToHistory}
          onSelectChapter={handleSelectChapter}
        />
      </div>

      {/* Full Project Documentation & Historical Archive Portal */}
      <div ref={summaryRef}>
        
        {/* Quick Top Banner: Navigate to Detailed History at Bottom */}
        <div className="bg-[#141210] border-b border-white/10 py-4 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-[#A39E93]">
              <BookOpen className="w-4 h-4 text-[#E5A93C] shrink-0" />
              <span>കേരളത്തിലെ നോക്കുകൂലിയുടെ പൂർണ്ണ ചരിത്രവും നിയമപരമായ നാഴികക്കല്ലുകളും വായിക്കണോ?</span>
            </div>
            <button
              onClick={handleScrollToHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] hover:bg-[#E5A93C] hover:text-[#12100E] font-bold transition-all cursor-pointer whitespace-nowrap shadow-md shadow-[#E5A93C]/10"
            >
              <span>വിശദമായ ചരിത്രം കാണുക (താഴേക്ക്)</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Hardware Sentinel Engineering (ESP32-S3, BOM, Pinout & Schematics) */}
        <HardwareShowcase />

        {/* 2. VS Code Extension Architecture (Kammi AI Extension, Gemini Conciliator) */}
        <ExtensionShowcase />

        {/* 3. Playable Virtual Sentinel Emulator & AI Bargaining Console */}
        <VirtualSentinel />

        {/* 4. Video Demos, Drive Archives & TinkerHub Useless Projects Tribute */}
        <MediaGallery />

        {/* 5. Cultural & Historical Archive: The Legend of Nokkukooli (Combined at Bottom) */}
        <HistoryArchive />

      </div>

      {/* Footer with Full Team Credits & Replay */}
      <Footer onReplay={handleReplay} />

    </div>
  );
};
