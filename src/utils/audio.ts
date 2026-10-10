// Web Audio API synthesizer for Cavaquinho using Karplus-Strong algorithm & Metronome lookahead engine

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Generates an AudioBuffer using the Karplus-Strong physical string plucked synthesis algorithm.
 * Replicates the percussive steel/nylon twang of a cavaquinho string.
 */
function generatePluckBuffer(ctx: AudioContext, frequency: number, duration: number = 2.0): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const totalSamples = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
  const output = buffer.getChannelData(0);

  // Buffer delay line length corresponding to fundamental frequency
  const period = Math.max(2, Math.round(sampleRate / frequency));
  const noiseBuffer = new Float32Array(period);

  // Initial excitation: shaped white noise with high-frequency emphasis for cavaquinho brightness
  for (let i = 0; i < period; i++) {
    // Random between -1 and 1 with a slight bias toward sharp attack
    noiseBuffer[i] = (Math.random() * 2 - 1) * (1 - (i / period) * 0.3);
  }

  // Karplus-Strong feedback loop with damping factor
  // Cavaquinho steel strings have a lively metallic decay
  const decayFactor = 0.993; // Adjust for natural acoustic ring
  let bufferIdx = 0;
  let previousSample = 0;

  for (let n = 0; n < totalSamples; n++) {
    if (n < period) {
      output[n] = noiseBuffer[n];
      previousSample = output[n];
    } else {
      const current = noiseBuffer[bufferIdx];
      // Averaging low-pass filter (simulates loss of high frequencies upon string reflection)
      const filtered = 0.5 * (current + previousSample) * decayFactor;
      noiseBuffer[bufferIdx] = filtered;
      output[n] = filtered;
      previousSample = filtered;
      bufferIdx = (bufferIdx + 1) % period;
    }
  }

  return buffer;
}

// In-memory cache for generated plucks to avoid recalculating every click
const pluckCache = new Map<number, AudioBuffer>();

/**
 * Plays a single plucked string note at the specified frequency.
 */
export function playPluck(frequency: number, duration: number = 1.8, volume: number = 0.85): void {
  try {
    const ctx = getAudioContext();
    const roundedFreq = Math.round(frequency * 10) / 10;
    
    let buffer = pluckCache.get(roundedFreq);
    if (!buffer) {
      buffer = generatePluckBuffer(ctx, roundedFreq, duration);
      pluckCache.set(roundedFreq, buffer);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    // Slight fade at the end to prevent any clicks
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start();
  } catch (err) {
    console.warn('Audio playback not ready or blocked by user gesture:', err);
  }
}

/**
 * Strums an entire chord (4 strings: 4ª corda até 1ª corda) with natural cavaquinho rasgueado.
 */
export function playChord(frequencies: [number, number, number, number], arpeggioDelayMs: number = 28): void {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        // Boost root strings slightly, 1st string crisp
        const vol = idx === 0 ? 0.9 : 0.82;
        playPluck(freq, 2.2, vol);
      }, idx * arpeggioDelayMs);
    });
  } catch (err) {
    console.warn('Could not play chord:', err);
  }
}

/**
 * Metronome lookahead engine based on Chris Wilson's Web Audio Metronome.
 */
export class MetronomeEngine {
  private bpm: number = 80;
  private timeSignature: number = 2; // 2/4 (samba default), 3/4, 4/4
  private isRunning: boolean = false;
  private nextNoteTime: number = 0;
  private currentBeat: number = 0;
  private timerWorkerId: number | null = null;
  private onBeatCallback: ((beat: number, totalBeats: number) => void) | null = null;

  private lookaheadMs: number = 25.0; // How frequently to call scheduling function (in milliseconds)
  private scheduleAheadSec: number = 0.1; // How far ahead to schedule audio (sec)

  constructor(bpm: number = 80, timeSignature: number = 2) {
    this.bpm = bpm;
    this.timeSignature = timeSignature;
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.min(240, Math.max(30, newBpm));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public setTimeSignature(beats: number) {
    this.timeSignature = beats;
    this.currentBeat = 0;
  }

  public getTimeSignature(): number {
    return this.timeSignature;
  }

  public setOnBeat(callback: (beat: number, totalBeats: number) => void) {
    this.onBeatCallback = callback;
  }

  public start() {
    if (this.isRunning) return;
    const ctx = getAudioContext();
    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = ctx.currentTime + 0.05;

    this.timerWorkerId = window.setInterval(() => {
      this.scheduler();
    }, this.lookaheadMs);
  }

  public stop() {
    this.isRunning = false;
    if (this.timerWorkerId !== null) {
      window.clearInterval(this.timerWorkerId);
      this.timerWorkerId = null;
    }
    this.currentBeat = 0;
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public isActive(): boolean {
    return this.isRunning;
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat = (this.currentBeat + 1) % this.timeSignature;
  }

  private scheduleNote(beatNumber: number, time: number) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Accent beat 1 with a higher pitch crisp click
    const isFirstBeat = beatNumber === 0;
    osc.frequency.value = isFirstBeat ? 1200 : 800;

    // Fast decay woodblock/click envelope
    gain.gain.setValueAtTime(isFirstBeat ? 0.95 : 0.65, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

    osc.start(time);
    osc.stop(time + 0.05);

    // Notify UI synchronized with note time
    const timeDeltaMs = Math.max(0, (time - ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isRunning && this.onBeatCallback) {
        this.onBeatCallback(beatNumber, this.timeSignature);
      }
    }, timeDeltaMs);
  }

  private scheduler() {
    const ctx = getAudioContext();
    while (this.nextNoteTime < ctx.currentTime + this.scheduleAheadSec) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.nextNote();
    }
  }
}
