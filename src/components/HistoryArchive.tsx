import React, { useState } from 'react';
import { HISTORICAL_ERAS, LEGAL_MILESTONES } from '../data/historyArchive';
import { BookOpen, Scale, Quote, ChevronRight, CheckCircle2 } from 'lucide-react';

export const HistoryArchive: React.FC = () => {
  const [activeEraId, setActiveEraId] = useState<string>(HISTORICAL_ERAS[0].id);
  const activeEra = HISTORICAL_ERAS.find(e => e.id === activeEraId) || HISTORICAL_ERAS[0];

  return (
    <section id="history-archive" className="py-24 px-6 md:px-12 bg-[#0E0C0A] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" />
            <span>ചരിത്രരേഖ / The Cultural Dossier</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4">
            The Legend of Nokkukooli
          </h2>

          <p className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed">
            How a desperate struggle for worker dignity in Kerala’s backwaters mutated into the legendary "gawking fee"—and why it found its ultimate modern home beside your mechanical keyboard.
          </p>
        </div>

        {/* Historical Eras Horizontal Stepper / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/10">
          {HISTORICAL_ERAS.map((era, index) => {
            const isActive = era.id === activeEraId;
            return (
              <button
                key={era.id}
                onClick={() => setActiveEraId(era.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#E5A93C] text-[#12100E] font-bold border-[#E5A93C] shadow-lg shadow-[#E5A93C]/20'
                    : 'bg-[#161311] text-[#A39E93] border-white/10 hover:border-[#E5A93C]/40 hover:text-[#F4F1EA]'
                }`}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-black/20">
                  {index + 1}
                </span>
                <span>{era.era}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({era.yearRange})</span>
              </button>
            );
          })}
        </div>

        {/* Main Era Display Card */}
        <div className="bg-gradient-to-br from-[#171412] to-[#12100E] rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden mb-16">
          
          {/* Top Era Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
                {activeEra.era} • {activeEra.yearRange}
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#F4F1EA] mt-1">
                {activeEra.titleEn}
              </h3>
              <div className="font-sans text-sm text-[#E5A93C] mt-0.5 font-medium">
                {activeEra.titleMl}
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#A39E93] shrink-0 self-start sm:self-auto">
              PARADIGM 0{HISTORICAL_ERAS.findIndex(e => e.id === activeEra.id) + 1} OF 05
            </div>
          </div>

          {/* Era Narrative & Key Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
            
            <div className="lg:col-span-7 space-y-4">
              <p className="font-serif italic text-lg text-[#E5A93C]/90 leading-snug">
                "{activeEra.tagline}"
              </p>
              
              <p className="text-sm text-[#F4F1EA]/90 leading-relaxed font-sans">
                {activeEra.summary}
              </p>

              <div className="pt-2 space-y-2">
                <span className="font-mono text-[11px] text-[#A39E93] uppercase tracking-wider block">
                  Key Socio-Technological Dynamics:
                </span>
                {activeEra.details.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#F4F1EA]/80 font-sans">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E5A93C] mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historic Quote Callout */}
            <div className="lg:col-span-5 bg-[#1F1A17] p-6 rounded-xl border border-[#E5A93C]/20 relative">
              <Quote className="w-8 h-8 text-[#E5A93C]/30 mb-3" />
              <blockquote className="font-serif italic text-base text-[#F4F1EA] leading-relaxed mb-4">
                "{activeEra.quote.text}"
              </blockquote>
              <div className="font-mono text-xs text-[#E5A93C] font-semibold border-t border-white/10 pt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                <span>{activeEra.quote.author}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Legal & Historical Timeline Matrix */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-[#1C1815] border border-[#E5A93C]/30 text-[#E5A93C]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-2xl font-bold text-[#F4F1EA]">
                Chronological Legal Milestones (1978 – 2026)
              </h3>
              <p className="text-xs text-[#A39E93]">
                The legislative acts, judicial decrees, and the 2026 engineering parody that defined Nokkukooli.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEGAL_MILESTONES.map((milestone, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#141210] border border-white/10 hover:border-[#E5A93C]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 font-mono text-xs font-bold text-[#E5A93C]">
                      {milestone.year}
                    </span>
                    <span className="font-mono text-[10px] text-[#A39E93]">ACT #{idx + 1}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#F4F1EA] mb-2">
                    {milestone.title}
                  </h4>

                  <p className="text-xs text-[#A39E93] leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] mt-0.5 shrink-0" />
                  <span className="text-[11px] font-mono text-[#F4F1EA]/80">
                    {milestone.significance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
