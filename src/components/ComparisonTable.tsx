import React from 'react';
import { motion } from 'framer-motion';
import { COMPARISON_ROWS } from '../data/chapters';
import { Users, Cpu, Bot, Coins, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const getRowIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users className="w-5 h-5 text-[#C85A32]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#E5A93C]" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-[#00F0FF]" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-[#F5C869]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#E5A93C]" />;
    }
  };

  return (
    <section id="comparative-archive" className="py-24 px-6 md:px-12 bg-[#0F1117] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Dialectical Labor Matrix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4"
          >
            The Historical Parallels of "Watching Wages"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed"
          >
            Nokku Kooli was never about laziness—it was an existential demand for labor sovereignty in the face of sudden industrial automation. In 2026, the same tension governs software engineering.
          </motion.p>
        </div>

        {/* 2-Column Comparative Table / Cards */}
        <div className="grid grid-cols-1 gap-6">
          {COMPARISON_ROWS.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-gradient-to-r from-[#171412] via-[#141419] to-[#121620] p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#E5A93C]/40 transition-all duration-300"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#E5A93C]/40 transition-colors">
                    {getRowIcon(row.iconName)}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#E5A93C] font-semibold">
                    {row.badge}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#A39E93] uppercase">
                  PARALLEL #{idx + 1}
                </span>
              </div>

              {/* 2-Column Mapping Grid */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
                
                {/* Column 1: 1970s Historical Precedent */}
                <div className="md:col-span-5 bg-[#12100E]/70 p-5 rounded-xl border border-[#C85A32]/20 group-hover:border-[#C85A32]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                    <span className="font-mono text-[10px] text-[#C85A32] uppercase tracking-wider font-bold">
                      1970s Physical Reality
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F4F1EA] mb-2">
                    {row.historicalElement}
                  </h3>
                  <p className="text-xs text-[#A39E93] leading-relaxed">
                    {row.historicalDesc}
                  </p>
                </div>

                {/* Center Connector Indicator */}
                <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                  <div className="w-9 h-9 rounded-full bg-[#1A1715] border border-white/10 flex items-center justify-center group-hover:border-[#E5A93C] group-hover:bg-[#E5A93C]/10 transition-all">
                    <ArrowRight className="w-4 h-4 text-[#E5A93C] hidden md:block group-hover:translate-x-0.5 transition-transform" />
                    <span className="md:hidden font-mono text-xs text-[#E5A93C]">▼</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#A39E93] uppercase mt-1 hidden md:block">
                    MUTATES TO
                  </span>
                </div>

                {/* Column 2: 2026 Vibecoding Digital Counterpart */}
                <div className="md:col-span-5 bg-[#0D131A]/70 p-5 rounded-xl border border-[#00F0FF]/20 group-hover:border-[#00F0FF]/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                    <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider font-bold">
                      2026 Vibecoding Era
                    </span>
                  </div>
                  <h3 className="font-mono text-lg font-bold text-[#F4F1EA] mb-2 flex items-center gap-2">
                    {row.digitalElement}
                  </h3>
                  <p className="text-xs text-[#A39E93] leading-relaxed">
                    {row.digitalDesc}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
