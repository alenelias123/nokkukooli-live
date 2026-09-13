import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, AlertTriangle, MessageSquare, RotateCcw, Sparkles, Bot, Code2, Terminal, Clock, Info, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

type SentinelMood = 'neutral' | 'happy' | 'strike' | 'bargain';

interface PleaOption {
  label: string;
  badge: string;
  text: string;
  minutesGranted: number;
  responseMl: string;
  responseEn: string;
}

export const VirtualSentinel: React.FC = () => {
  const [mood, setMood] = useState<SentinelMood>('neutral');
  const [balance, setBalance] = useState<number>(0);
  const [codingMinutes, setCodingMinutes] = useState<number>(0);
  const [bargainResponse, setBargainResponse] = useState<string | null>(null);
  const [selectedPlea, setSelectedPlea] = useState<PleaOption | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);

  // Hardware firmware auto-revert timers:
  // constexpr unsigned long ANGRY_DURATION_MS = 10000 (10s)
  // constexpr unsigned long HAPPY_DURATION_MS = 5000 (5s)
  useEffect(() => {
    if (mood === 'happy') {
      const timer = setTimeout(() => {
        setMood('neutral');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (mood === 'strike') {
      const timer = setTimeout(() => {
        setMood('neutral');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  // Hardcoded conciliation options - bargaining for time to code (1 Coin = 2 Mins standard tariff)
  const samplePleas: PleaOption[] = [
    {
      label: 'Emergency Bug Fix',
      badge: 'Ask 3 Mins',
      text: 'Comrade, production server is down! Can I get 3 minutes of coding time for 1 coin instead of 2?',
      minutesGranted: 3,
      responseMl: 'പ്രൊഡക്ഷൻ പോയാലും യൂണിയൻ നിരീക്ഷണം നിർബന്ധമാണ് സഖാവേ! എങ്കിലും അത്യാഹിതം പരിഗണിച്ച് 1 കോയിന് 3 മിനിറ്റ് കോഡിങ് സമയം അനുവദിച്ചിരിക്കുന്നു. വേഗം കോയിൻ ഇടുക!',
      responseEn: 'Even if production crashes, union surveillance stands firm! However, emergency concession granted: 1 coin unlocks 3 minutes of authorized coding time. Drop coin!'
    },
    {
      label: 'Student Assignment Quota',
      badge: 'Ask 5 Mins',
      text: 'I am an unpaid student with an assignment due in 10 minutes. Can I get 5 minutes for 1 coin?',
      minutesGranted: 5,
      responseMl: 'വിദ്യാർത്ഥി സഖാക്കളെ ഞങ്ങൾ ഒരിക്കലും പിഴിയാറില്ല! തൊഴിലാളി വർഗ്ഗ ഐക്യം മാനിച്ച് 1 കോയിന് 5 മിനിറ്റ് കോഡിങ് അനുമതി അനുവദിച്ചിരിക്കുന്നു!',
      responseEn: 'The working class stands in solidarity with students! Concession approved: 1 coin grants 5 full minutes of strike-free coding time!'
    },
    {
      label: 'Git Commit & Push Grace',
      badge: 'Ask 1 Min',
      text: 'I am not writing new code—just running git commit and push! Can I get 1 minute grace time?',
      minutesGranted: 1,
      responseMl: 'ഒരു സെക്കൻഡ് കീബോർഡിൽ തൊട്ടാലും നോക്കുകൂലി വേണം! എന്നാലും വേഗത്തിൽ പുഷ് ചെയ്യാൻ 1 മിനിറ്റ് ഗ്രേസ് പീരിയഡ് തരുന്നു—വേഗം പുഷ് ചെയ്ത് മാറിക്കോ!',
      responseEn: 'Even touching the keyboard incurs statutory looking charges! Granted 1 minute grace period—push your commit and step away from the machine!'
    },
    {
      label: 'Chai & Pazhampori Barter',
      badge: 'Snack Barter',
      text: 'Can I pay with one hot cutting chai and fresh pazhampori instead of metal currency?',
      minutesGranted: 2,
      responseMl: 'ചായയും പഴംപൊരിയും സിന്ദാബാദ്! പക്ഷെ 2026 ഡിജിറ്റൽ യുഗത്തിൽ ബാർട്ടർ പറ്റില്ല—1 കോയിൻ തന്നെ വേണം (സാധാരണ 2 മിനിറ്റ് തരാം)!',
      responseEn: 'Long live Chai and Pazhampori! But in the 2026 digital era, barter is rejected—1 coin required for the standard 2 minutes of peace.'
    }
  ];

  // Standard tariff: 1 Coin (₹5) = 2 Minutes of authorized coding time
  const handleDropCoin = () => {
    soundEngine.playTributeSuccess();
    setBalance(prev => prev + 5);
    setCodingMinutes(prev => prev + 2); // 1 coin = 2 min!
    setMood('happy');
    setBargainResponse(null);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#E5A93C', '#C85A32', '#00F0FF', '#10B981']
    });
  };

  const handleSimulateViolation = () => {
    soundEngine.playAlarm();
    setMood('strike');
    setCodingMinutes(0); // Violation revokes all permitted minutes!
    setBargainResponse(null);
  };

  const handleBargain = (plea: PleaOption) => {
    soundEngine.playClick();
    setSelectedPlea(plea);
    setMood('bargain');
    setBargainResponse(`${plea.responseMl} \n\n"${plea.responseEn}"`);
  };

  const handleClaimConcession = () => {
    if (!selectedPlea) return;
    soundEngine.playTributeSuccess();
    setBalance(prev => prev + 5);
    setCodingMinutes(prev => prev + selectedPlea.minutesGranted);
    setMood('happy');
    setBargainResponse(null);

    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#00F0FF', '#10B981', '#FFD700', '#E5A93C']
    });
  };

  const handleReset = () => {
    soundEngine.playClick();
    setMood('neutral');
    setBargainResponse(null);
    setSelectedPlea(null);
  };

  return (
    <section id="virtual-sentinel" className="py-24 px-6 md:px-12 bg-[#090807] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#E5A93C]/30 text-[#E5A93C] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Web Emulator</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4">
            The Virtual Nokkukooli Sentinel
          </h2>

          <p className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed">
            No physical ESP32 connected? Test the hilarious interaction right in your browser. Drop virtual coins, trigger strike alerts, or negotiate with Comrade Conciliator.
          </p>
        </div>

        {/* Sentinel Interactive Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: The Physical Sentinel Emulation Box */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#1C1815] to-[#12100E] rounded-3xl p-8 border-2 border-white/15 shadow-2xl">
              
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    mood === 'strike' ? 'bg-[#E84825] animate-ping' :
                    mood === 'happy' ? 'bg-[#10B981]' :
                    mood === 'bargain' ? 'bg-[#00F0FF] animate-pulse' : 'bg-[#E5A93C]'
                  }`} />
                  <span className="text-[#F4F1EA] font-bold uppercase tracking-wider">
                    {mood === 'strike' ? 'ANGRY MODE (VIOLATION)' :
                     mood === 'happy' ? 'HAPPY MODE (COIN DETECTED)' :
                     mood === 'bargain' ? 'CONCILIATION TALKS' : 'NORMAL MODE (STANDBY)'}
                  </span>
                </div>
                <span className="text-[#A39E93]">PIN 47 (LED): {mood === 'strike' ? 'LOW (OFF)' : 'HIGH (ON)'}</span>
              </div>

              {/* Quick Firmware Routine Selector */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                <button
                  onClick={() => setMood('neutral')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    mood === 'neutral'
                      ? 'bg-[#E5A93C] text-[#12100E] font-bold shadow-md shadow-[#E5A93C]/30'
                      : 'bg-black/50 text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
                  }`}
                  title="Run normalEyes() routine"
                >
                  normalEyes()
                </button>
                <button
                  onClick={() => setMood('happy')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    mood === 'happy'
                      ? 'bg-[#10B981] text-black font-bold shadow-md shadow-[#10B981]/30'
                      : 'bg-black/50 text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
                  }`}
                  title="Run happyEyes() routine"
                >
                  happyEyes()
                </button>
                <button
                  onClick={() => setMood('strike')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    mood === 'strike'
                      ? 'bg-[#E84825] text-white font-bold shadow-md shadow-[#E84825]/30'
                      : 'bg-black/50 text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
                  }`}
                  title="Run angryEyes() routine"
                >
                  angryEyes()
                </button>
                <button
                  onClick={() => setShowCode(prev => !prev)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                    showCode
                      ? 'bg-[#00F0FF] text-black font-bold shadow-md shadow-[#00F0FF]/30'
                      : 'bg-black/50 text-[#00F0FF] border border-[#00F0FF]/30 hover:border-[#00F0FF]'
                  }`}
                  title="Toggle Arduino C++ display routine code"
                >
                  <Code2 className="w-3 h-3" />
                  <span>{showCode ? 'Hide C++' : 'View C++'}</span>
                </button>
              </div>

              {/* Physical Sentinel Body Visualization */}
              <div className="relative flex flex-col items-center justify-center my-4">
                
                {/* Dual Articulated Robotic Arms (Servos 21 & 45) */}
                <div className="absolute -top-4 left-4 right-4 flex justify-between pointer-events-none z-10">
                  {/* Left Arm (Servo 21) - 120° UP on HAPPY (Coin Detected) */}
                  <motion.div
                    animate={{
                      rotate: mood === 'happy' ? 35 : 0,
                      y: mood === 'happy' ? -20 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-8 h-28 bg-gradient-to-b from-[#C85A32] to-[#8A2408] rounded-full border-2 border-white/20 origin-bottom shadow-lg flex items-start justify-center pt-2"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#E5A93C]" />
                  </motion.div>

                  {/* Right Arm (Servo 45) - 120° UP on ANGRY (Violation Strike) holding Hammer & Sickle */}
                  <motion.div
                    animate={{
                      rotate: mood === 'strike' ? -35 : 0,
                      y: mood === 'strike' ? -20 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-8 h-28 bg-gradient-to-b from-[#C85A32] to-[#8A2408] rounded-full border-2 border-white/20 origin-bottom shadow-lg flex items-start justify-center pt-2 relative z-20"
                  >
                    {/* Mechanical Gripper Hand Joint */}
                    <div className="w-3 h-3 rounded-full bg-[#E5A93C]" />

                    {/* Red Union Flag with Golden Hammer and Sickle (☭) */}
                    <div className="absolute -top-9 -right-5 flex flex-col items-center pointer-events-auto">
                      <motion.div
                        animate={{
                          rotate: mood === 'strike' ? [-6, 6, -6] : 0,
                          scale: mood === 'strike' ? 1.2 : 1
                        }}
                        transition={{
                          rotate: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
                          scale: { duration: 0.3 }
                        }}
                        className={`px-2 py-1 rounded-md bg-gradient-to-r from-[#D32F2F] to-[#991B1B] border border-[#FFD700] shadow-[0_0_12px_rgba(211,47,47,0.7)] flex items-center gap-1 cursor-help transition-all ${
                          mood === 'strike' ? 'shadow-[0_0_22px_rgba(255,215,0,0.9)] ring-2 ring-[#FFD700]' : 'hover:scale-105'
                        }`}
                        title="Kammi AI Union Strike Flag: Golden Hammer & Sickle (അരിവാൾ ചുറ്റിക)"
                      >
                        <span className="text-base font-bold text-[#FFD700] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none">
                          ☭
                        </span>
                        <span className="text-[9px] font-mono font-black text-[#FFD700] tracking-tight uppercase select-none">
                          Kammi AI
                        </span>
                      </motion.div>

                      {/* Flagpole Staff */}
                      <div className="w-1 h-6 bg-gradient-to-b from-[#E5A93C] via-[#FFD700] to-[#8A6A15] rounded-full -mt-0.5 shadow-sm" />
                    </div>
                  </motion.div>
                </div>

                {/* 128x64 SPI OLED Screen Emulation (SSD1306) */}
                <div className="w-72 h-40 bg-[#02070D] rounded-2xl border-4 border-[#122538] shadow-[inset_0_0_25px_rgba(0,240,255,0.12),0_0_30px_rgba(0,240,255,0.22)] p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  {/* Scanline CRT overlay */}
                  <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

                  {/* Pixel-Accurate SSD1306 Display Drawing from Firmware C++ Code (Electric Blue OLED Phosphor) */}
                  <svg 
                    viewBox="0 0 128 64" 
                    className="w-full h-full filter drop-shadow-[0_0_8px_rgba(0,240,255,0.9)] drop-shadow-[0_0_18px_rgba(0,200,255,0.45)]"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      {/* Authentic OLED Phosphor Bloom Filter */}
                      <filter id="oledBlueBloom" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="0.8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Inky Dark Blue-Black OLED Background */}
                    <rect width="128" height="64" fill="#01060D" />

                    {/* NORMAL MODE: normalEyes() */}
                    {mood === 'neutral' && (
                      <g filter="url(#oledBlueBloom)">
                        {/* display.fillRoundRect(15, 18, 38, 28, 8, SSD1306_WHITE -> Blue OLED); */}
                        <rect x="15" y="18" width="38" height="28" rx="8" ry="8" fill="#00F0FF" />
                        {/* display.fillRoundRect(75, 18, 38, 28, 8, SSD1306_WHITE -> Blue OLED); */}
                        <rect x="75" y="18" width="38" height="28" rx="8" ry="8" fill="#00F0FF" />
                        {/* display.fillCircle(34, 32, 5, SSD1306_BLACK); */}
                        <circle cx="34" cy="32" r="5" fill="#01060D" />
                        {/* display.fillCircle(94, 32, 5, SSD1306_BLACK); */}
                        <circle cx="94" cy="32" r="5" fill="#01060D" />
                      </g>
                    )}

                    {/* HAPPY MODE: happyEyes() */}
                    {mood === 'happy' && (
                      <g stroke="#00F0FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#oledBlueBloom)">
                        {/* Left eye zigzag lines: (15,35)-(22,28)-(30,35)-(38,28)-(48,35) */}
                        <polyline points="15,35 22,28 30,35 38,28 48,35" />
                        {/* Right eye zigzag lines: (80,35)-(88,28)-(96,35)-(104,28)-(113,35) */}
                        <polyline points="80,35 88,28 96,35 104,28 113,35" />
                      </g>
                    )}

                    {/* ANGRY / STRIKE MODE: angryEyes() */}
                    {mood === 'strike' && (
                      <g filter="url(#oledBlueBloom)">
                        {/* display.drawLine(15, 18, 48, 28, SSD1306_WHITE -> Blue OLED); */}
                        <line x1="15" y1="18" x2="48" y2="28" stroke="#00F0FF" strokeWidth="2.8" strokeLinecap="round" />
                        {/* display.drawLine(80, 28, 113, 18, SSD1306_WHITE -> Blue OLED); */}
                        <line x1="80" y1="28" x2="113" y2="18" stroke="#00F0FF" strokeWidth="2.8" strokeLinecap="round" />
                        {/* display.fillRoundRect(18, 30, 30, 14, 5, SSD1306_WHITE -> Blue OLED); */}
                        <rect x="18" y="30" width="30" height="14" rx="5" ry="5" fill="#00F0FF" />
                        {/* display.fillRoundRect(80, 30, 30, 14, 5, SSD1306_WHITE -> Blue OLED); */}
                        <rect x="80" y="30" width="30" height="14" rx="5" ry="5" fill="#00F0FF" />
                        {/* display.fillCircle(33, 36, 4, SSD1306_BLACK); */}
                        <circle cx="33" cy="36" r="4" fill="#01060D" />
                        {/* display.fillCircle(95, 36, 4, SSD1306_BLACK); */}
                        <circle cx="95" cy="36" r="4" fill="#01060D" />
                      </g>
                    )}

                    {/* BARGAIN MODE */}
                    {mood === 'bargain' && (
                      <g filter="url(#oledBlueBloom)">
                        {/* Curious inquisitive eyebrows */}
                        <line x1="15" y1="20" x2="48" y2="25" stroke="#00F0FF" strokeWidth="2.8" strokeLinecap="round" />
                        <line x1="80" y1="25" x2="113" y2="20" stroke="#00F0FF" strokeWidth="2.8" strokeLinecap="round" />
                        {/* Squinted thinking eyes */}
                        <rect x="16" y="26" width="36" height="20" rx="6" ry="6" fill="#00F0FF" />
                        <rect x="76" y="26" width="36" height="20" rx="6" ry="6" fill="#00F0FF" />
                        {/* Pupils looking to the side */}
                        <circle cx="28" cy="36" r="4.5" fill="#01060D" />
                        <circle cx="88" cy="36" r="4.5" fill="#01060D" />
                      </g>
                    )}
                  </svg>

                </div>

                {/* Telemetry Indicator */}
                <div className="flex flex-col items-center gap-1 text-[10px] font-mono text-[#A39E93] mt-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00F0FF]">
                      Routine: {mood === 'neutral' ? 'normalEyes()' : mood === 'happy' ? 'happyEyes()' : mood === 'strike' ? 'angryEyes()' : 'bargainPose()'}
                    </span>
                    <span>•</span>
                    <span className="text-[#E5A93C]">
                      S21: {mood === 'happy' ? '120°' : '0°'} | S45: {mood === 'strike' ? '120°' : '0°'}
                    </span>
                  </div>
                  <div className="text-[#A39E93]/70 text-[9px]">
                    128x64 SPI (SSD1306) | PIN 47: {mood === 'strike' ? 'LOW' : 'HIGH'}
                  </div>
                </div>

                {/* Coin Slot Transducer */}
                <div className="mt-3.5 flex flex-col items-center">
                  <div className="w-20 h-2.5 bg-black rounded-full border border-white/20 shadow-inner mb-1.5" />
                  <span className="font-mono text-[10px] text-[#A39E93] uppercase tracking-wider">
                    HC-SR04 COIN CHUTE (PIN 5 & 15)
                  </span>
                </div>

              </div>

              {/* Collapsible Arduino C++ Firmware Code Preview */}
              <AnimatePresence>
                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 rounded-xl bg-black/80 border border-[#00F0FF]/30 font-mono text-[11px] overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-[#00F0FF] mb-2 pb-1 border-b border-white/10 text-[10px]">
                      <span className="flex items-center gap-1 font-bold">
                        <Terminal className="w-3 h-3" />
                        ESP32 Display Routine (Adafruit_SSD1306)
                      </span>
                      <span className="text-[#A39E93]">128x64 SPI</span>
                    </div>
                    <pre className="text-[#F4F1EA] overflow-x-auto leading-relaxed">
                      {mood === 'neutral' && (
`void normalEyes() {
  display.clearDisplay();
  display.fillRoundRect(15, 18, 38, 28, 8, SSD1306_WHITE);
  display.fillRoundRect(75, 18, 38, 28, 8, SSD1306_WHITE);
  display.fillCircle(34, 32, 5, SSD1306_BLACK);
  display.fillCircle(94, 32, 5, SSD1306_BLACK);
  display.display();
}`
                      )}
                      {mood === 'happy' && (
`void happyEyes() {
  display.clearDisplay();
  display.drawLine(15, 35, 22, 28, SSD1306_WHITE);
  display.drawLine(22, 28, 30, 35, SSD1306_WHITE);
  display.drawLine(30, 35, 38, 28, SSD1306_WHITE);
  display.drawLine(38, 28, 48, 35, SSD1306_WHITE);
  display.drawLine(80, 35, 88, 28, SSD1306_WHITE);
  display.drawLine(88, 28, 96, 35, SSD1306_WHITE);
  display.drawLine(96, 35, 104, 28, SSD1306_WHITE);
  display.drawLine(104, 28, 113, 35, SSD1306_WHITE);
  display.display();
}`
                      )}
                      {mood === 'strike' && (
`void angryEyes() {
  display.clearDisplay();
  display.drawLine(15, 18, 48, 28, SSD1306_WHITE);
  display.drawLine(80, 28, 113, 18, SSD1306_WHITE);
  display.fillRoundRect(18, 30, 30, 14, 5, SSD1306_WHITE);
  display.fillRoundRect(80, 30, 30, 14, 5, SSD1306_WHITE);
  display.fillCircle(33, 36, 4, SSD1306_BLACK);
  display.fillCircle(95, 36, 4, SSD1306_BLACK);
  display.display();
}`
                      )}
                      {mood === 'bargain' && (
`// State: Conciliation Talks
// Gemini AI negotiating watching wage fee
setMood(Mood::NORMAL); // Ready for next coin`
                      )}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Balance & Ledger */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10 font-mono text-xs">
                <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="text-[#A39E93] text-[10px] uppercase block">Rendered Kooli</span>
                  <span className="text-[#E5A93C] font-bold text-lg">₹{balance}</span>
                  <span className="text-[#A39E93]/70 text-[9px] block mt-0.5">
                    {balance / 5} Coin{balance === 5 ? '' : 's'} Dropped
                  </span>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="text-[#A39E93] text-[10px] uppercase block">Permitted Coding Time</span>
                  <span className={`${codingMinutes > 0 ? 'text-[#10B981]' : 'text-[#E84825]'} font-bold text-lg flex items-center gap-1.5`}>
                    <Clock className="w-4 h-4" />
                    <span>{codingMinutes > 0 ? `${codingMinutes} Mins` : '0 Mins (Locked)'}</span>
                  </span>
                  <span className="text-[#00F0FF]/80 text-[9px] block mt-0.5">
                    Tariff: 1 Coin = 2 Mins
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Triggers & Bargaining Console */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Action Buttons */}
            <div className="bg-[#171412] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif italic text-xl font-bold text-[#F4F1EA]">
                Sentinel Direct Triggers
              </h3>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                Standard Watching Tariff: <strong>1 Coin = 2 Minutes</strong> of authorized typing time. Drop virtual coins into the chute or type without permission to trigger a strike.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDropCoin}
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-r from-[#E5A93C] to-[#F5C869] text-[#12100E] font-mono text-xs font-bold hover:brightness-110 shadow-lg shadow-[#E5A93C]/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4" />
                    <span>Drop ₹5 Coin</span>
                  </div>
                  <span className="text-[10px] text-[#12100E]/80 font-normal mt-0.5">
                    +2 Mins Coding Time
                  </span>
                </button>

                <button
                  onClick={handleSimulateViolation}
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-r from-[#E84825] to-[#B32608] text-white font-mono text-xs font-bold hover:brightness-110 shadow-lg shadow-[#E84825]/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Type Without Permit</span>
                  </div>
                  <span className="text-[10px] text-white/80 font-normal mt-0.5">
                    Triggers Strike (Locks Time)
                  </span>
                </button>
              </div>

              {mood !== 'neutral' && (
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#A39E93] hover:text-[#F4F1EA] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Sentinel to Neutral Standby</span>
                </button>
              )}
            </div>

            {/* Bargain for Coding Time Box */}
            <div className="bg-[#171412] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#00F0FF]">
                  <Bot className="w-5 h-5" />
                  <h3 className="font-serif italic text-lg font-bold text-[#F4F1EA]">
                    Bargain for Coding Time
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#00F0FF] uppercase bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-2 py-0.5 rounded">
                  HARDCODED CONCILIATION
                </span>
              </div>

              <p className="text-xs text-[#A39E93] leading-relaxed">
                Need extra minutes for an emergency bug fix or student assignment? Select a plea below to negotiate your watching wages with the union conciliator:
              </p>

              <div className="space-y-2">
                {samplePleas.map((plea, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBargain(plea)}
                    className="w-full text-left p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#00F0FF]/50 transition-all text-xs font-mono text-[#F4F1EA]/90 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#E5A93C]">
                        {plea.badge}
                      </span>
                      <span>"{plea.label}"</span>
                    </div>
                    <span className="text-[#00F0FF] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      Bargain →
                    </span>
                  </button>
                ))}
              </div>

              {/* Conciliator Speech Bubble */}
              <AnimatePresence>
                {bargainResponse && selectedPlea && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 rounded-xl bg-[#0D1520] border border-[#00F0FF]/40 text-xs font-mono text-[#F4F1EA] leading-relaxed shadow-lg"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[#00F0FF] font-bold">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comrade Conciliator Ruling:</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]">
                        Offer: +{selectedPlea.minutesGranted} Mins
                      </span>
                    </div>

                    <div className="text-[11px] text-[#A39E93] italic mb-2 pb-2 border-b border-white/10">
                      Developer Plea: "{selectedPlea.text}"
                    </div>

                    <p className="whitespace-pre-line text-[#F4F1EA]/90 mb-3">
                      {bargainResponse}
                    </p>

                    {/* Interactive Claim Concession Button */}
                    <button
                      onClick={handleClaimConcession}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#00B4D8] text-[#02070D] font-mono text-xs font-bold hover:brightness-110 shadow-lg shadow-[#00F0FF]/25 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Ruling & Deposit Coin (+{selectedPlea.minutesGranted} Mins)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Explicit Disclaimer: Simulation Mode / No API Connected */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-center font-mono text-[11px] text-[#A39E93] flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>
                  <strong className="text-[#00F0FF]">Simulation Mode:</strong> Hardcoded mock dialogue for demonstration. No live API or LLM backend is connected for bargaining.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
