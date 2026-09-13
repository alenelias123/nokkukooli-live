import React, { useState } from 'react';
import { Code2, Terminal, Bot, Cpu } from 'lucide-react';

export const ExtensionShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      title: 'Keystroke & Paste Interceptor',
      badge: 'POLICY ENGINE',
      icon: <Terminal className="w-5 h-5 text-[#E84825]" />,
      description: 'Hooks into the VS Code extension host to override default typing and clipboard paste commands. If your Nokkukooli permit state has expired, all text edits are instantaneously blocked at the LSP level.',
      codeSnippet: `// VS Code Extension Host: Intercepting Input
vscode.commands.registerCommand('type', async (args) => {
  if (permitStateMachine.isLocked()) {
    serialManager.sendViolation();
    strikeModal.reveal();
    return; // Input blocked!
  }
  await vscode.commands.executeCommand('default:type', args);
});`
    },
    {
      title: 'Comrade Conciliator (Gemini AI)',
      badge: 'AI NEGOTIATION',
      icon: <Bot className="w-5 h-5 text-[#00F0FF]" />,
      description: 'Powered by the Google Gemini API. When your editor is locked, you can speak or type pleas to bargain down your demanded Kooli. The Comrade Conciliator argues with Marxist-Leninist labor rhetoric in authentic Malayalam and English.',
      codeSnippet: `// Google Gemini API Prompting
const prompt = \`You are Comrade Conciliator, representing the 
Kerala Localhost Headload Workers Union. The developer is pleading:
"\${userPlea}". Defend the sacred Nokkukooli fee with dialectical 
arguments in sarcastic Malayalam & English.\`;
const response = await gemini.generateContent(prompt);`
    },
    {
      title: '115200 Baud Serial Bridge',
      badge: 'HARDWARE LINK',
      icon: <Cpu className="w-5 h-5 text-[#F5C869]" />,
      description: 'Maintains a bidirectional 115200 baud UART link between the VS Code extension and the ESP32-S3 microcontroller. Transmits instant coin drop triggers, strike postures, and OLED face animations.',
      codeSnippet: `// Serial Event Handling Loop
serialPort.on('data', (data) => {
  if (data.includes('EVENT:COIN')) {
    permitStateMachine.grantKooliPermit();
    vscode.window.showInformationMessage('Kooli received! You may code.');
  }
});`
    }
  ];

  return (
    <section id="extension-showcase" className="py-24 px-6 md:px-12 bg-[#0C0E14] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E84825]/30 text-[#E84825] font-mono text-xs uppercase tracking-widest mb-4">
            <Code2 className="w-4 h-4" />
            <span>The Software Companion</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4">
            Kammi AI: VS Code Extension Architecture
          </h2>

          <p className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed">
            The software agent that enforces Kerala's legendary watching wages directly on your localhost. Built with TypeScript, Google Gemini AI, and real-time serial hardware sync.
          </p>
        </div>

        {/* Real Screenshots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          
          {/* Main Extension Modal Screenshot */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/15 bg-[#171412] shadow-2xl group">
            <div className="p-4 bg-[#1C1815] border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-bold text-[#F4F1EA] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E84825] animate-ping" />
                Constructivist Strike Modal in VS Code
              </span>
              <span className="font-mono text-[10px] text-[#E5A93C]">LOCKOUT ACTIVE</span>
            </div>
            <img
              src="https://github.com/user-attachments/assets/4f4dc750-c2b9-4ff5-97d9-5f0ae741ed3c"
              alt="Constructivist Strike Modal"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="p-4 bg-[#12100E] border-t border-white/10 text-xs font-mono text-[#A39E93]">
              The full-screen Constructivist Strike Modal halts editor input until the developer drops a coin or negotiates a settlement with Gemini AI.
            </div>
          </div>

          {/* Soviet Sidebar Screenshot */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/15 bg-[#171412] shadow-2xl group">
            <div className="p-4 bg-[#1C1815] border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-bold text-[#F4F1EA]">
                Soviet Sidebar
              </span>
              <span className="font-mono text-[10px] text-[#00F0FF]">UART HOST</span>
            </div>
            <img
              src="https://github.com/user-attachments/assets/e2f96f5b-e310-411c-adea-d78f424e93f4"
              alt="Soviet Sidebar"
              className="w-full h-auto object-contain bg-[#0F0D0C] p-4"
            />
            <div className="p-4 bg-[#12100E] border-t border-white/10 text-xs font-mono text-[#A39E93]">
              Port Selector and Proletarian Agent Dispatch tool inside VS Code activity bar.
            </div>
          </div>

        </div>

        {/* Feature Deep Dive & Code Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Feature Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {features.map((feat, idx) => {
              const isSelected = activeFeature === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1815] border-[#E5A93C] shadow-xl'
                      : 'bg-[#141210] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 shrink-0">
                      {feat.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#E5A93C] font-semibold bg-[#E5A93C]/10 px-2 py-0.5 rounded">
                          {feat.badge}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#F4F1EA] mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-[#A39E93] leading-relaxed line-clamp-2">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Code / Architecture Detail */}
          <div className="lg:col-span-7 bg-[#171412] rounded-2xl border border-white/15 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E84825]" />
                <span className="w-3 h-3 rounded-full bg-[#E5A93C]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="font-mono text-xs text-[#F4F1EA] ml-2 font-bold">
                  {features[activeFeature].title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#00F0FF] uppercase">
                {features[activeFeature].badge}
              </span>
            </div>

            <p className="text-sm text-[#F4F1EA]/90 font-sans leading-relaxed mb-6">
              {features[activeFeature].description}
            </p>

            <div className="rounded-xl bg-black/70 border border-white/10 p-4 font-mono text-xs text-[#00F0FF] overflow-x-auto">
              <pre>
                <code>{features[activeFeature].codeSnippet}</code>
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A39E93]">
              <span>TypeScript • Node.js • VS Code API</span>
              <span className="text-[#E5A93C]">Kammi AI Extension v1.0.0</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
