import React, { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { CHAPTERS } from './data/chapters';
import { Header } from './components/Header';
import { StoryCanvas } from './components/StoryCanvas';
import { ComparisonTable } from './components/ComparisonTable';
import { MascotSpecs } from './components/MascotSpecs';
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

  // Navigate to summary section
  const handleScrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      
      {/* Minimal Floating Header */}
      <Header
        currentChapterId={currentChapterId}
        chapterProgress={chapterProgress}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Scroll-Driven Storytelling Section (Directly into sticky canvas) */}
      <div 
        ref={scrollTrackRef} 
        className="relative w-full h-[550vh]"
      >
        <StoryCanvas
          scrollProgress={scrollProgress}
          currentChapterId={currentChapterId}
          onChapterChange={setCurrentChapterId}
          onScrollToSummary={handleScrollToSummary}
        />
      </div>

      {/* Post-Story Interactive Summary Section (Sandbox terminal removed) */}
      <div ref={summaryRef}>
        <ComparisonTable />
        <MascotSpecs />
      </div>

      {/* Footer */}
      <Footer onReplay={handleReplay} />

    </div>
  );
};
