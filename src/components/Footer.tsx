import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onReplay: () => void;
}

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

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
          From the backwaters of Alappuzha to autonomous neural coding copilots, human oversight remains the anchor of production value.
        </p>

        {/* Replay Narrative Experience Button */}
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C85A32] via-[#E5A93C] to-[#C85A32] text-[#12100E] font-mono text-sm font-bold tracking-wider uppercase shadow-2xl shadow-[#C85A32]/30 hover:shadow-[#E5A93C]/50 transition-all cursor-pointer mb-14"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Narrative Scrollytelling</span>
        </motion.button>

        {/* Team & TinkerHub Credits */}
        <div className="w-full bg-[#141210] p-6 md:p-8 rounded-2xl border border-white/10 mb-10 text-left font-mono text-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[#E5A93C] font-bold text-sm block">
                TEAM: UNION LEADER
              </span>
              <span className="text-[#A39E93] text-xs">
                Cochin University College of Engineering Kuttanad (CUCEK)
              </span>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[11px] text-[#E5A93C] font-semibold">
              Built during Useless Projects 3.0 by TinkerHub
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] text-[#A39E93] uppercase block font-semibold tracking-wider">
                Team Lead (Hardware & Electronics)
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#F4F1EA]">Alen Elias Cherian</span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/alenelias123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#F4F1EA] hover:border-white/30 transition-all hover:scale-110"
                    title="Alen's GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alen-elias-bb3812327/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all hover:scale-110"
                    title="Alen's LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-[#A39E93] mt-1 font-sans leading-relaxed">
                Hardware assembly, circuit schematics, chassis fabrication, and servo integration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] text-[#A39E93] uppercase block font-semibold tracking-wider">
                Software & Firmware Architecture
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#F4F1EA]">Amith Biju</span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/amith-exe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#F4F1EA] hover:border-white/30 transition-all hover:scale-110"
                    title="Amith's GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/amith-biju-a70813327/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all hover:scale-110"
                    title="Amith's LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-[#A39E93] mt-1 font-sans leading-relaxed">
                State machine logic, keystroke interception engine, Gemini AI negotiation, and UART serial interface.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Rights Strip */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A39E93] font-mono">
          <div className="flex items-center gap-1.5">
            <span>Built during</span>
            <Heart className="w-3.5 h-3.5 text-[#E84825] fill-current inline" />
            <span>Useless Projects 3.0 by TinkerHub</span>
          </div>

          <div className="text-[#A39E93]/70 text-center md:text-right">
            Tribute to the Kerala Headload Workers Act of 1978 & Labor Culture
          </div>
        </div>

      </div>
    </footer>
  );
};
