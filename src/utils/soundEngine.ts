// Web Audio API procedural sound engine for Kerala Backwaters & Cyber Parody

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  
  // Ambient nodes
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private cyberOsc: OscillatorNode | null = null;
  private cyberGain: GainNode | null = null;
  
  private currentChapter: number = 1;
  private isInitialized: boolean = false;

  private init() {
    if (this.isInitialized && this.ctx) return;
    
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // 1. Water / Organic Pink Noise Generator
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'lowpass';
    this.noiseFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    this.noiseNode.connect(this.noiseFilter);
    this.noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);
    this.noiseNode.start();

    // 2. Deep warm backwater drone
    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);
    this.droneOsc.start();

    // 3. Cyber saw synth for later chapters
    this.cyberOsc = this.ctx.createOscillator();
    this.cyberOsc.type = 'sawtooth';
    this.cyberOsc.frequency.setValueAtTime(110, this.ctx.currentTime);
    this.cyberGain = this.ctx.createGain();
    this.cyberGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.cyberOsc.connect(this.cyberGain);
    this.cyberGain.connect(this.masterGain);
    this.cyberOsc.start();

    this.isInitialized = true;
  }

  public async toggleMute(): Promise<boolean> {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    const targetGain = this.isMuted ? 0 : 0.45;

    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.5);
    }

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setChapter(chapterId: number) {
    if (chapterId === this.currentChapter) return;
    this.currentChapter = chapterId;

    if (!this.ctx || !this.isInitialized) return;
    const now = this.ctx.currentTime;

    // Adapt soundscape based on chapter
    if (chapterId <= 2) {
      // Early century water & backwaters
      this.noiseGain?.gain.linearRampToValueAtTime(0.35, now + 0.8);
      this.noiseFilter?.frequency.linearRampToValueAtTime(400, now + 0.8);
      this.droneOsc?.frequency.linearRampToValueAtTime(55, now + 0.8);
      this.cyberGain?.gain.linearRampToValueAtTime(0.0, now + 0.8);
    } else if (chapterId === 3) {
      // Industrial crane & Nokku Kooli
      this.noiseGain?.gain.linearRampToValueAtTime(0.15, now + 0.8);
      this.noiseFilter?.frequency.linearRampToValueAtTime(180, now + 0.8);
      this.droneOsc?.frequency.linearRampToValueAtTime(45, now + 0.8); // heavy mechanical sub
      this.cyberGain?.gain.linearRampToValueAtTime(0.04, now + 0.8);
    } else {
      // Chapter 4 & 5: Cyber Vibecoding
      this.noiseGain?.gain.linearRampToValueAtTime(0.05, now + 0.8);
      this.droneOsc?.frequency.linearRampToValueAtTime(65.41, now + 0.8); // C2
      this.cyberGain?.gain.linearRampToValueAtTime(0.12, now + 0.8);
      this.cyberOsc?.frequency.linearRampToValueAtTime(chapterId === 5 ? 146.83 : 110, now + 0.8);
    }
  }

  public playClick() {
    if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // ignore audio context errors
    }
  }

  public playTributeSuccess() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    try {
      const now = this.ctx.currentTime;
      // Chenda / Union Gavel impact
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(160, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start();
      osc1.stop(now + 0.25);

      // Gold coin / Cyber chime arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  public playAlarm() {
    if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(640, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.26);
    } catch {
      // ignore
    }
  }

  public getByteFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}

export const soundEngine = new SoundEngine();
