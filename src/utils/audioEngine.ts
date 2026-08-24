/**
 * Procedural Historical Audio Synthesizer for Chhatrapati Shivaji Maharaj Experience
 * Pure Web Audio API - Zero external asset failures, zero network lag.
 */

class HistoricalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  
  // Ambient Sound Nodes
  private windGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private ambientMusicGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private droneInterval: number | null = null;
  private horseInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupWindAmbient();
    } catch {
      console.warn('Web Audio API not supported in this environment');
    }
  }

  private ensureRunning() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.ensureRunning();
    if (!this.ctx || !this.masterGain) return;

    const targetGain = muted ? 0 : 0.8;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.5);

    if (!muted && !this.isMusicPlaying) {
      this.startAmbientMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Continuous Sahyadri Mountain Wind generator (filtered noise)
   */
  private setupWindAmbient() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Pink noise generation
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
      output[i] *= 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'lowpass';
    this.windFilter.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(3, this.ctx.currentTime);

    // LFO to create howling breeze effect
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(260, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(this.windFilter.frequency);
    lfo.start();

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    whiteNoise.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    whiteNoise.start();
  }

  /**
   * Ambient Indian Classical Harmonic Drone (Tanpura & Strings mood)
   */
  public startAmbientMusic() {
    if (this.isMusicPlaying || !this.ctx || !this.masterGain) return;
    this.isMusicPlaying = true;

    this.ambientMusicGain = this.ctx.createGain();
    this.ambientMusicGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    this.ambientMusicGain.connect(this.masterGain);

    // Root notes for Raag Bhairav / Shiv Kalyan mood: C# (138.59 Hz), G# (207.65 Hz), D# (155.56 Hz)
    const baseFreqs = [138.59, 207.65, 277.18, 415.30];

    const playHarmonic = (freq: number, duration: number, delay: number = 0) => {
      if (!this.ctx || !this.ambientMusicGain || this.isMuted) return;
      const now = this.ctx.currentTime + delay;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      // Slight pitch wobble for sitar/flute warmth
      const vib = this.ctx.createOscillator();
      vib.frequency.setValueAtTime(4.5, now);
      const vibGain = this.ctx.createGain();
      vibGain.gain.setValueAtTime(2, now);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start(now);
      vib.stop(now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ambientMusicGain);

      osc.start(now);
      osc.stop(now + duration);
    };

    const loopNotes = () => {
      if (!this.isMusicPlaying) return;
      baseFreqs.forEach((freq, idx) => {
        playHarmonic(freq, 6, idx * 1.8);
      });
    };

    loopNotes();
    this.droneInterval = window.setInterval(loopNotes, 7500);
  }

  /**
   * War Drum / Dhol-Tasha Beat (Bass punch + metallic resonance)
   */
  public playWarDrum(intensity: 'light' | 'heavy' = 'heavy') {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = intensity === 'heavy' ? 140 : 180;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);

    gain.gain.setValueAtTime(intensity === 'heavy' ? 0.9 : 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.55);

    // Rim click / Dhol skin transient
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(450, now);
    snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    snapGain.gain.setValueAtTime(0.4, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    snapOsc.connect(snapGain);
    snapGain.connect(this.masterGain);

    snapOsc.start(now);
    snapOsc.stop(now + 0.09);
  }

  /**
   * Royal Tutari / War Horn Fanfare (Coronation & Maratha Call)
   */
  public playTutariFanfare() {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const notes = [
      { freq: 293.66, time: 0, dur: 0.3 },    // D4
      { freq: 392.00, time: 0.35, dur: 0.3 }, // G4
      { freq: 587.33, time: 0.7, dur: 0.8 },  // D5 (high victorious note)
      { freq: 440.00, time: 1.55, dur: 0.25 },
      { freq: 587.33, time: 1.85, dur: 1.2 },
    ];

    notes.forEach((n) => {
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime + n.time;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.freq, now);

      oscHarmonic.type = 'square';
      oscHarmonic.frequency.setValueAtTime(n.freq * 2, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(n.freq * 1.5, now);
      filter.Q.setValueAtTime(2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.45, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.dur);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + n.dur);
      oscHarmonic.stop(now + n.dur);
    });
  }

  /**
   * Temple Bell / Ghanta Chime (Sacred prayer & Bhavani temple)
   */
  public playTempleBell() {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const freqs = [784, 1568, 2352, 3136];
    freqs.forEach((f, i) => {
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      const decay = 2.5 - i * 0.4;
      gain.gain.setValueAtTime(0.3 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  /**
   * Horse Gallop / Hoofbeats effect
   */
  public startHorseGallop() {
    if (this.horseInterval) return;
    this.ensureRunning();

    let step = 0;
    this.horseInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      
      // 2-part hoof rhythm: Clip-Clop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(step % 2 === 0 ? 550 : 380, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(step % 2 === 0 ? 120 : 90, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
      step++;
    }, 280);
  }

  public stopHorseGallop() {
    if (this.horseInterval) {
      clearInterval(this.horseInterval);
      this.horseInterval = null;
    }
  }

  /**
   * Sword Clang & Spark sound effect
   */
  public playSwordClash() {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  /**
   * Sacred Shankhnaad / Conch Horn blast
   */
  public playShankhnaad() {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(330, now + 0.8);
    osc.frequency.linearRampToValueAtTime(440, now + 2.2);
    osc.frequency.exponentialRampToValueAtTime(220, now + 3.4);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.linearRampToValueAtTime(660, now + 0.8);
    osc2.frequency.linearRampToValueAtTime(880, now + 2.2);
    osc2.frequency.exponentialRampToValueAtTime(440, now + 3.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(500, now + 3.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 3.6);
    osc2.stop(now + 3.6);
  }

  /**
   * Cannon Blast & Shockwave for Mountain Fortresses
   */
  public playCannonFire() {
    this.ensureRunning();
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.8);

    gain.gain.setValueAtTime(0.95, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + 1.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.2);
  }
}

export const audioEngine = new HistoricalAudioEngine();
