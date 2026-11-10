/**
 * Web Audio API synthesizer for low-frequency seismic rumbling and 112 emergency tones.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private earthquakeOsc: OscillatorNode | null = null;
  private earthquakeGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startEarthquakeRumble(intensity: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.stopEarthquakeRumble();

      // Low frequency rumble (30Hz - 60Hz)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, this.ctx.currentTime);

      osc.type = 'sawtooth';
      const baseFreq = 35 + (intensity - 5) * 4;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

      // Amplitude based on intensity
      const amp = Math.min(0.25, 0.05 + (intensity - 5) * 0.03);
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(amp, this.ctx.currentTime + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.earthquakeOsc = osc;
      this.earthquakeGain = gain;
    } catch {
      // Audio not permitted or unsupported, fails gracefully
    }
  }

  stopEarthquakeRumble() {
    try {
      if (this.earthquakeGain && this.ctx) {
        this.earthquakeGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          if (this.earthquakeOsc) {
            this.earthquakeOsc.stop();
            this.earthquakeOsc.disconnect();
            this.earthquakeOsc = null;
          }
        }, 300);
      }
    } catch {
      // Ignore cleanup error
    }
  }

  playSiren() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.8);
      osc.frequency.linearRampToValueAtTime(600, now + 1.6);
      osc.frequency.linearRampToValueAtTime(950, now + 2.4);
      osc.frequency.linearRampToValueAtTime(600, now + 3.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 3.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 3.5);
    } catch {
      // Fail gracefully
    }
  }
}

export const soundFx = new SoundController();
