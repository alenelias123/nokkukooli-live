import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CHAPTERS } from '../data/chapters';
import { frameCache } from '../utils/frameLoader';
import { ChapterOverlay } from './ChapterOverlay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryCanvasProps {
  scrollProgress: number; // 0 to 1 across the 5 chapters
  currentChapterId: number;
  onChapterChange: (chapterId: number) => void;
  onScrollToSummary: () => void;
  onScrollToHistory?: () => void;
  onSelectChapter?: (chapterId: number) => void;
}

export const StoryCanvas: React.FC<StoryCanvasProps> = ({
  scrollProgress,
  currentChapterId,
  onChapterChange,
  onScrollToSummary,
  onScrollToHistory,
  onSelectChapter
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const lastRenderedImageRef = useRef<HTMLImageElement | null>(null);

  const [chapterProgress, setChapterProgress] = useState<number>(0);

  // Keep target progress in sync with scroll
  useEffect(() => {
    targetProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Preload initial keyframes
  useEffect(() => {
    CHAPTERS.forEach((ch) => {
      frameCache.preloadChapterKeyframes(ch.folder, ch.frameCount);
    });
  }, []);

  // Compute chapter and frame index from progress (0..1)
  const computeStateFromProgress = useCallback((progress: number) => {
    const totalChapters = CHAPTERS.length;
    const clampedProgress = Math.max(0, Math.min(0.9999, progress));
    const rawChapterIdx = Math.floor(clampedProgress * totalChapters);
    const chapterIdx = Math.min(totalChapters - 1, Math.max(0, rawChapterIdx));
    const activeChapter = CHAPTERS[chapterIdx];

    const chapterStart = chapterIdx / totalChapters;
    const chapterEnd = (chapterIdx + 1) / totalChapters;
    const progInChapter = Math.max(0, Math.min(1, (clampedProgress - chapterStart) / (chapterEnd - chapterStart)));

    const frameIdx = Math.min(
      activeChapter.frameCount,
      Math.max(1, Math.floor(progInChapter * (activeChapter.frameCount - 1)) + 1)
    );

    return {
      activeChapter,
      frameIdx,
      progInChapter
    };
  }, []);

  // Touch gesture support: swipe left for next chapter, swipe right for previous
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartPos.current.x;
    const deltaY = endY - touchStartPos.current.y;
    touchStartPos.current = null;

    // Detect horizontal swipe (at least 45px, more horizontal than vertical)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0 && currentChapterId < 5) {
        // Swipe left -> next chapter
        onSelectChapter?.(currentChapterId + 1);
      } else if (deltaX > 0 && currentChapterId > 1) {
        // Swipe right -> previous chapter
        onSelectChapter?.(currentChapterId - 1);
      }
    }
  };

  // Continuous RAF loop for buttery smooth physics/scrubbing
  useEffect(() => {
    let animId: number;
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const renderLoop = () => {
      // Lerp smoothProgress towards targetProgress: faster lerp on touch devices ensures instant feel
      const lerpRate = isTouchDevice ? 0.35 : 0.16;
      const diff = targetProgressRef.current - smoothProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        smoothProgressRef.current += diff * lerpRate;
      } else {
        smoothProgressRef.current = targetProgressRef.current;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          const { activeChapter, frameIdx, progInChapter } = computeStateFromProgress(smoothProgressRef.current);

          if (activeChapter.id !== currentChapterId) {
            onChapterChange(activeChapter.id);
          }
          setChapterProgress(progInChapter);

          const img = frameCache.getFrame(activeChapter.folder, frameIdx, activeChapter.frameCount);

          // Cap DPR at 2 to ensure maximum 60-120fps performance on 3x mobile Retina screens
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const displayWidth = canvas.clientWidth;
          const displayHeight = canvas.clientHeight;

          if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          // Enable high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          const imageToDraw = (img && img.complete && img.naturalWidth > 0) ? img : lastRenderedImageRef.current;

          if (imageToDraw && imageToDraw.naturalWidth > 0) {
            if (img && img.complete && img.naturalWidth > 0) {
              lastRenderedImageRef.current = img;
            }

            // Object-fit: cover geometry
            const imgRatio = imageToDraw.naturalWidth / imageToDraw.naturalHeight;
            const canvasRatio = displayWidth / displayHeight;
            let renderWidth = displayWidth;
            let renderHeight = displayHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
              renderHeight = displayWidth / imgRatio;
              offsetY = (displayHeight - renderHeight) / 2;
            } else {
              renderWidth = displayHeight * imgRatio;
              offsetX = (displayWidth - renderWidth) / 2;
            }

            ctx.drawImage(imageToDraw, offsetX, offsetY, renderWidth, renderHeight);

            // Subtle atmospheric film vignette that doesn't wash out details
            const grad = ctx.createRadialGradient(
              displayWidth / 2, displayHeight / 2, Math.min(displayWidth, displayHeight) * 0.45,
              displayWidth / 2, displayHeight / 2, Math.max(displayWidth, displayHeight) * 0.85
            );
            grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
            grad.addColorStop(1, 'rgba(10, 8, 6, 0.45)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, displayWidth, displayHeight);
          } else {
            ctx.fillStyle = '#12100E';
            ctx.fillRect(0, 0, displayWidth, displayHeight);
          }

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [computeStateFromProgress, currentChapterId, onChapterChange]);

  const activeChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  return (
    <div 
      className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#12100E] touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 60-120fps Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />

      {/* Subtle CRT Scanline */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

      {/* Mobile Floating Step Chevrons (Previous / Next Chapter) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex items-center justify-between pointer-events-none z-30 sm:hidden">
        {currentChapterId > 1 ? (
          <button
            onClick={() => onSelectChapter?.(currentChapterId - 1)}
            aria-label="Previous Chapter"
            className="pointer-events-auto p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F4F1EA] active:scale-90 active:bg-[#C85A32] transition-all shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : <div />}

        {currentChapterId < 5 ? (
          <button
            onClick={() => onSelectChapter?.(currentChapterId + 1)}
            aria-label="Next Chapter"
            className="pointer-events-auto p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F4F1EA] active:scale-90 active:bg-[#C85A32] transition-all shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : <div />}
      </div>

      {/* Mobile Initial Scroll / Swipe Hint (visible on Chapter 1) */}
      {currentChapterId === 1 && scrollProgress < 0.08 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-30 sm:hidden">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#E5A93C]/40 text-[#E5A93C] text-[10px] font-mono animate-bounce shadow-lg whitespace-nowrap">
            <span>👇 താഴേക്ക് സ്ക്രോൾ ചെയ്യുക / സ്വൈപ്പ്</span>
          </div>
        </div>
      )}

      {/* Narrative & Editorial Overlay */}
      <ChapterOverlay
        chapter={activeChapter}
        chapterProgress={chapterProgress}
        isLastChapter={activeChapter.id === 5 && chapterProgress > 0.8}
        onScrollToSummary={onScrollToSummary}
        onScrollToHistory={onScrollToHistory}
      />
    </div>
  );
};
