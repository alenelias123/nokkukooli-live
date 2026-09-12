import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Play, RefreshCw, AlertTriangle, Coffee, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export const VibecodingTerminal: React.FC = () => {
  const [terminalState, setTerminalState] = useState<'idle' | 'generating' | 'blocked' | 'approved'>('idle');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [tributeCount, setTributeCount] = useState<number>(0);

  const sampleCode = [
    '// Prompt: "Vibecode a real-time reactive GraphQL backend"',
    'import { GantryAgent, LocalhostCluster } from "@vibecoding/core";',
    'import { KeralaHeadloadUnion } from "@cit-kerala/statutory";',
    '',
    'export async function deployMicroservice() {',
    '  const crane = new GantryAgent({ model: "claude-3.7-sonnet" });',
    '  const payload = await crane.liftPayload({ tokens: 4200, depth: "recursive" });',
    '  console.log(">> Crane lifting 4,200 tokens across fiber backplane...");'
  ];

  const handleStartGeneration = () => {
    soundEngine.playClick();
    setTerminalState('generating');
    setCodeLines([]);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < sampleCode.length) {
        setCodeLines(prev => [...prev, sampleCode[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        // Intercept with Union Rule
        setTimeout(() => {
          soundEngine.playAlarm();
          setTerminalState('blocked');
        }, 400);
      }
    }, 180);
  };

  const handlePayTribute = () => {
    soundEngine.playTributeSuccess();
    setTributeCount(c => c + 1);
    setTerminalState('approved');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#C85A32', '#00F0FF', '#FFFFFF']
    });

    setTimeout(() => {
      setCodeLines(prev => [
        ...prev,
        '  // [UNION OVERSIGHT PROTOCOL VERIFIED]',
        '  // Watching wages rendered to Localhost Comrade #042',
        '  return { status: 200, message: "Code released to localhost:3000" };',
        '}'
      ]);
    }, 500);
  };

  const handleReset = () => {
    soundEngine.playClick();
    setTerminalState('idle');
    setCodeLines([]);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#0C0E14] relative z-20 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Terminal Header Info */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs uppercase tracking-widest mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Localhost Sandbox</span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-[#F4F1EA]">
              The Localhost Gantry Enforcement Terminal
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] mt-2">
              Experience what happens when an AI agent attempts to ship code without paying the mandatory watching wages.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#E5A93C] bg-[#161413] px-4 py-2 rounded-xl border border-white/10">
            <span>TRIBUTES PAID:</span>
            <span className="font-bold text-[#F4F1EA] bg-[#C85A32] px-2 py-0.5 rounded text-xs">
              ₹{tributeCount * 50} ( {tributeCount} Chai )
            </span>
          </div>
        </div>

        {/* Cyberpunk Terminal Window */}
        <div className="rounded-2xl border border-white/15 bg-[#12100E] shadow-2xl overflow-hidden relative">
          
          {/* Mac-style Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#171412] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C85A32]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#E5A93C]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
              <span className="font-mono text-xs text-[#A39E93] ml-2">
                bash: vibecode --daemon --strict-union-rules
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#A39E93] uppercase">
                STATUS: {terminalState.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs md:text-sm min-h-[320px] max-h-[420px] overflow-y-auto flex flex-col justify-between relative bg-black/50">
            
            {terminalState === 'idle' && (
              <div className="flex flex-col items-center justify-center my-auto text-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1715] border border-white/10 flex items-center justify-center mb-4 text-[#E5A93C]">
                  <Play className="w-6 h-6 ml-0.5" />
                </div>
                <h4 className="font-serif italic text-xl text-[#F4F1EA] mb-1">
                  Ready to test AI Vibecoding
                </h4>
                <p className="text-xs text-[#A39E93] max-w-md mb-6 font-sans">
                  Click below to command an LLM to generate code. Observe the union daemon standing guard in your node_modules.
                </p>
                <button
                  onClick={handleStartGeneration}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#F5C869] text-[#12100E] font-mono text-xs font-bold hover:shadow-lg hover:shadow-[#E5A93C]/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Prompt LLM to Write Code</span>
                </button>
              </div>
            )}

            {(terminalState === 'generating' || terminalState === 'blocked' || terminalState === 'approved') && (
              <div className="space-y-1 text-[#F4F1EA]/90 font-mono">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#A39E93]/40 select-none w-6 text-right">{i + 1}</span>
                    <span className={line.startsWith('//') ? 'text-[#A39E93]' : 'text-[#00F0FF]'}>
                      {line}
                    </span>
                  </div>
                ))}

                {terminalState === 'generating' && (
                  <div className="flex items-center gap-2 text-[#E5A93C] pt-2 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Hydraulic LLM crane lifting tokens into AST...</span>
                  </div>
                )}
              </div>
            )}

            {/* Blocked Union Interception Modal */}
            <AnimatePresence>
              {terminalState === 'blocked' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[#2A0E08] to-[#170E0B] border-2 border-[#E84825] shadow-2xl relative"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#E84825]/20 border border-[#E84825] text-[#E84825] shrink-0">
                      <AlertTriangle className="w-7 h-7 animate-bounce" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase font-bold bg-[#E84825] text-white px-2 py-0.5 rounded">
                          UNION CITATION #402
                        </span>
                        <span className="font-mono text-xs text-[#E5A93C]">
                          KERALA LOCALHOST HEADLOAD WORKERS UNION
                        </span>
                      </div>

                      <h3 className="font-serif italic text-xl font-bold text-[#F4F1EA] mb-2">
                        Execution Suspended: Gantry Crane Unsupervised
                      </h3>

                      <p className="text-xs text-[#F4F1EA]/80 leading-relaxed mb-4 font-sans">
                        "You generated 4,200 tokens using a remote hydraulic neural crane without a registered union member watching your screen. As per Section 9A of the 1978 Localhost Workers Act, you are liable for <strong>Nokku Kooli (Watching Wages)</strong>."
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handlePayTribute}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#C85A32] text-[#12100E] font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                        >
                          <Coffee className="w-4 h-4" />
                          <span>Tap-to-Approve Tribute (₹50 / 1 Chai)</span>
                        </button>

                        <span className="text-[11px] font-mono text-[#A39E93]">
                          *Simulates tapping the 3D mascot's forehead
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Approved State Banner */}
            <AnimatePresence>
              {terminalState === 'approved' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-[#092218] border border-[#10B981] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0" />
                    <div>
                      <div className="font-mono text-xs font-bold text-[#10B981]">
                        [STAMPED] NOKKU KOOLI PAID IN FULL
                      </div>
                      <div className="text-xs text-[#F4F1EA]/80 font-sans">
                        Union oversight satisfied. Code generation unlocked and compiled cleanly.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142E22] border border-[#10B981]/50 text-xs font-mono text-[#10B981] hover:bg-[#10B981]/20 transition-all cursor-pointer self-end sm:self-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run Again</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
};
