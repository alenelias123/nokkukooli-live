import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '../types/storytelling';
import { Eye, ShieldAlert, Cpu, Award, Anchor, ArrowDown } from 'lucide-react';

interface ChapterOverlayProps {
  chapter: Chapter;
  chapterProgress: number; // 0 to 1
  isLastChapter?: boolean;
  onScrollToSummary?: () => void;
}

export const ChapterOverlay: React.FC<ChapterOverlayProps> = ({
  chapter,
  isLastChapter,
  onScrollToSummary
}) => {
  const getIcon = () => {
    switch (chapter.id) {
      case 1:
        return <Anchor className="w-3.5 h-3.5 text-[#C85A32]" />;
      case 2:
        return <Award className="w-3.5 h-3.5 text-[#E5A93C]" />;
      case 3:
        return <Eye className="w-3.5 h-3.5 text-[#E84825]" />;
      case 4:
        return <ShieldAlert className="w-3.5 h-3.5 text-[#F5C869]" />;
      case 5:
        return <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-10 z-20">
      
      {/* Top Left: Sleek Floating Period Badge (Frame counter removed) */}
      <div className="flex items-center w-full max-w-7xl mx-auto pt-14 md:pt-12">
        <motion.div
          key={`badge-${chapter.id}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-lg"
        >
          {getIcon()}
          <span className="font-mono text-[10px] md:text-xs tracking-wider text-[#E5A93C] uppercase font-semibold">
            {chapter.periodBadge}
          </span>
        </motion.div>
      </div>

      {/* Bottom Floating Bar: Compact, Non-Obtrusive Editorial Overlay (Scroll/Touch indicator removed) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-end justify-between gap-4 pb-4 md:pb-6 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${chapter.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-xl bg-black/45 hover:bg-black/60 transition-colors backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/15 shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative accent line */}
            <div 
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, ${chapter.themeColor}, #E5A93C)`
              }}
            />

            {/* Headline */}
            <h1 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4F1EA] tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              "{chapter.headline}"
            </h1>

            {/* Body Copy */}
            <p className="text-xs sm:text-sm text-[#F4F1EA]/95 leading-relaxed font-sans mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {chapter.bodyCopy}
            </p>

            {/* Kerala Context Footnote */}
            <div className="pt-2 border-t border-white/10 flex items-start gap-1.5">
              <span className="text-[10px] font-mono text-[#E5A93C] font-bold mt-0.5">※</span>
              <p className="font-mono text-[10px] text-[#A39E93] leading-snug">
                {chapter.keralaFootnote}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Explore Summary Action Button (Only on Chapter 5) */}
        {isLastChapter && (
          <motion.button
            onClick={onScrollToSummary}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E5A93C] text-[#12100E] font-mono text-xs font-bold shadow-lg shadow-[#C85A32]/30 hover:shadow-[#E5A93C]/40 transition-all cursor-pointer whitespace-nowrap self-end"
          >
            <span>താരതമ്യ ആർട്ടിഫാക്റ്റുകൾ കാണുക</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </motion.button>
        )}
      </div>

    </div>
  );
};
