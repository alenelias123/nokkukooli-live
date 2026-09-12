import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Shield } from 'lucide-react';

interface FooterProps {
  onReplay: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplay }) => {
  return (
    <footer className="py-20 px-6 md:px-12 bg-[#090807] border-t border-white/10 relative z-20 text-[#F4F1EA]">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Decorative Badge */}
        <div className="w-12 h-12 rounded-2xl bg-[#1D1917] border border-[#E5A93C]/40 flex items-center justify-center mb-6 shadow-xl">
          <Shield className="w-6 h-6 text-[#E5A93C]" />
        </div>

        {/* Section Headline */}
        <h2 className="font-serif italic text-3xl md:text-4xl font-bold mb-3">
          Labor Evolves. The Demand for Respect Endures.
        </h2>
        <p className="text-sm text-[#A39E93] max-w-xl mb-10 leading-relaxed font-sans">
          From the waterways of Alappuzha to autonomous neural coding copilots, human oversight remains the anchor of production value.
        </p>

        {/* Prominent Center Action: Replay Narrative Experience Button */}
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C85A32] via-[#E5A93C] to-[#C85A32] text-[#12100E] font-mono text-sm font-bold tracking-wider uppercase shadow-2xl shadow-[#C85A32]/30 hover:shadow-[#E5A93C]/50 transition-all cursor-pointer mb-16"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Narrative Experience</span>
        </motion.button>

        {/* Bottom Credits & Acknowledgements */}
        <div className="w-full pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A39E93] font-mono">
          
          <div className="flex flex-col md:items-start text-center md:text-left gap-1">
            <span className="text-[#F4F1EA] font-semibold">
              NOKKU KOOLI FOR VIBECODING
            </span>
            <span>
              A cultural parody and archival inquiry into Kerala's labor history and autonomous AI agents.
            </span>
          </div>

          <div className="flex flex-col md:items-end text-center md:text-right gap-1">
            <span className="flex items-center justify-center md:justify-end gap-1 text-[#E5A93C]">
              <span>Tribute to Kerala Headload Workers Act of 1978</span>
            </span>
            <span className="text-[#A39E93]/70">
              Visual generation via generative diffusion • Motion by Framer Motion
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
