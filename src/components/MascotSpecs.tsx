import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Shield, Zap, Sparkles } from 'lucide-react';

export const MascotSpecs: React.FC = () => {
  const specs = [
    {
      title: 'Unblinking Gaze Sensors',
      desc: 'Dual optical gaze matrices that monitor your IDE cursor without ever closing their digital eyelids.',
      icon: <Eye className="w-5 h-5 text-[#E5A93C]" />,
      tag: 'OPTICAL OVERSIGHT'
    },
    {
      title: 'Kasavu Mundu Chassis',
      desc: 'Pure handloom cotton textile draped with Kasavu gold trim, housing a thermal copper heatsink for local LLM inferencing.',
      icon: <Shield className="w-5 h-5 text-[#C85A32]" />,
      tag: 'TEXTILE ARMOR'
    },
    {
      title: 'Capacitive Tribute Forehead',
      desc: 'Tap-to-approve NFC contact surface allowing engineers to swiftly disburse chai payments before git push.',
      icon: <Zap className="w-5 h-5 text-[#00F0FF]" />,
      tag: 'TRIBUTE INTERFACE'
    },
    {
      title: 'Red Microfiber Shoulder Cloth',
      desc: 'Reversible union towel designed to wipe thermal condensation from overclocked M3/M4 liquid cooling loops.',
      icon: <Cpu className="w-5 h-5 text-[#F5C869]" />,
      tag: 'COOLING ACCESSORY'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#12100E] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hardware Artifact Blueprint</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA]">
            The Nokku Kooli Desktop Enforcer
          </h2>
          <p className="text-sm text-[#A39E93] mt-3 leading-relaxed">
            The physical embodiment of Kerala labor history. Sits beside your keyboard to demand ethical watching compensation for automated labor.
          </p>
        </div>

        {/* Blueprint Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Mascot Art / Frame display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#171412] group">
              <img
                src="/4/ezgif-frame-180.jpg"
                alt="Nokku Kooli Mascot in Cyberdeck"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Hologram Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-[#F4F1EA]">
                <div className="flex items-center gap-2 bg-[#12100E]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                  <span>MODEL: NK-2026-CYBER</span>
                </div>
                <div className="bg-[#12100E]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[#E5A93C]">
                  FIRMWARE: MUNDU-OS
                </div>
              </div>
            </div>
          </div>

          {/* Specs List */}
          <div className="lg:col-span-6 space-y-4">
            {specs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-[#171412]/80 border border-white/10 hover:border-[#E5A93C]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#E5A93C] font-semibold bg-[#E5A93C]/10 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#F4F1EA] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A39E93] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
