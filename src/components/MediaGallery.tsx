import React from 'react';
import { Video, ExternalLink, Play, Sparkles, Users } from 'lucide-react';

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

export const MediaGallery: React.FC = () => {
  const mediaItems = [
    {
      title: 'Full Project Demonstration Video',
      tag: 'PROJECT DEMO',
      description: 'Watch the physical ESP32-S3 sentinel interact with VS Code, detect physical coin drops, raise its arms during code lockouts, and voice Malayalam union chants.',
      driveUrl: 'https://drive.google.com/drive/folders/1n8Yt4mt-epqzKZ2gL3_OR2DlSLlJ87M2?usp=sharing',
      badgeColor: '#E5A93C',
      thumbnailUrl: 'https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd'
    },
    {
      title: 'Hardware Build Journey & Assembly',
      tag: 'MAKING OF',
      description: 'Behind-the-scenes footage of circuit prototyping, servo linkage calibration, 3D chassis fitting, and firmware debugging at CUCEK lab.',
      driveUrl: 'https://drive.google.com/drive/folders/10kj9D-wRr1ZJJ6Q2odVD12QUhY3tBbYD?usp=sharing',
      badgeColor: '#00F0FF',
      thumbnailUrl: 'https://github.com/user-attachments/assets/cdd2f27f-0961-4874-b94e-8df6e7972fb4'
    }
  ];

  return (
    <section id="media-gallery" className="py-24 px-6 md:px-12 bg-[#12100E] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase tracking-widest mb-4">
            <Video className="w-4 h-4" />
            <span>Video & Build Archives</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4">
            Project Demos & Build Journey
          </h2>

          <p className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed">
            Witness the chaos in motion. Access our Google Drive video archives to inspect live hardware demonstrations and the complete construction timeline.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mediaItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-[#171412] border border-white/10 hover:border-[#E5A93C]/50 transition-all shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-transparent to-transparent opacity-80" />
                  
                  {/* Play Button Overlay */}
                  <a
                    href={item.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E5A93C]/90 text-[#12100E] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1 fill-current" />
                    </div>
                  </a>
                </div>

                <div className="p-6">
                  <span
                    className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded mb-3 inline-block"
                    style={{
                      backgroundColor: `${item.badgeColor}15`,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeColor}40`
                    }}
                  >
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#F4F1EA] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A39E93] leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <a
                  href={item.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#E5A93C] hover:text-[#F4F1EA] transition-colors"
                >
                  <span>Open Video Folder in Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* TinkerHub Useless Projects 3.0 Tribute Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1D1815] via-[#171412] to-[#12100E] border border-[#E5A93C]/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TinkerHub Useless Projects 3.0</span>
              </div>

              <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#F4F1EA]">
                "The Solution Nobody Asked For, To The Problem That Doesn't Exist."
              </h3>

              <p className="text-xs sm:text-sm text-[#A39E93] max-w-2xl leading-relaxed font-sans">
                Engineered with satirical precision by students of Cochin University College of Engineering Kuttanad (CUCEK). Dedicated to celebrating Kerala's unique cultural history through the lens of modern AI.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-[#E5A93C]/30 text-xs font-mono text-[#E5A93C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Built during Useless Projects 3.0 by TinkerHub</span>
                </div>
              </div>
            </div>

            {/* Team Members Card */}
            <div className="w-full lg:w-80 bg-black/50 p-6 rounded-2xl border border-white/10 shrink-0 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#E5A93C] font-bold border-b border-white/10 pb-2">
                <Users className="w-4 h-4" />
                <span>TEAM: UNION LEADER</span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[#A39E93] text-[10px] uppercase block font-semibold">Team Lead (Hardware & Circuit)</span>
                <div className="flex items-center justify-between">
                  <span className="text-[#F4F1EA] font-bold text-sm">Alen Elias Cherian</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://github.com/alenelias123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#F4F1EA] hover:border-white/30 transition-all hover:scale-110"
                      title="Alen's GitHub"
                    >
                      <GithubIcon className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/alen-elias-bb3812327/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all hover:scale-110"
                      title="Alen's LinkedIn"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <span className="text-[#A39E93] text-[11px] block">CUCEK</span>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/10">
                <span className="text-[#A39E93] text-[10px] uppercase block font-semibold">Software & State Machine</span>
                <div className="flex items-center justify-between">
                  <span className="text-[#F4F1EA] font-bold text-sm">Amith Biju</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://github.com/amith-exe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#F4F1EA] hover:border-white/30 transition-all hover:scale-110"
                      title="Amith's GitHub"
                    >
                      <GithubIcon className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/amith-biju-a70813327/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#A39E93] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all hover:scale-110"
                      title="Amith's LinkedIn"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <span className="text-[#A39E93] text-[11px] block">CUCEK</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
