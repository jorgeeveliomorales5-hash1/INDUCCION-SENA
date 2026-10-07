// Web Audio API march generator for the SENA Institutional Anthem
class AnthemSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;
  private onStepCallback: ((stepIndex: number) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Melodic notes sequence (frequencies in Hz) representing the solemn march rhythm
  // Corresponds to the opening phrases of Himno del SENA
  private getMelody() {
    return [
      { note: 261.63, dur: 0.35, stanza: 0, text: 'Estudiantes del SENA' }, // C4
      { note: 329.63, dur: 0.35, stanza: 0, text: '¡adelante!' },           // E4
      { note: 392.00, dur: 0.70, stanza: 0, text: 'Por Colombia luchad con amor' }, // G4
      { note: 349.23, dur: 0.35, stanza: 0, text: 'con el ánimo noble' },   // F4
      { note: 329.63, dur: 0.35, stanza: 0, text: 'y constante' },         // E4
      { note: 293.66, dur: 0.70, stanza: 0, text: 'al trabajo ponedle ardor' }, // D4
      { note: 261.63, dur: 0.50, stanza: 0, text: '¡Ardor!' },              // C4

      { note: 329.63, dur: 0.35, stanza: 1, text: 'Hoy la patria' },        // E4
      { note: 349.23, dur: 0.35, stanza: 1, text: 'nos grita sentida' },    // F4
      { note: 392.00, dur: 0.70, stanza: 1, text: 'estudiantes del SENA triunfad' }, // G4
      { note: 440.00, dur: 0.35, stanza: 1, text: 'solo así lograréis' },   // A4
      { note: 392.00, dur: 0.35, stanza: 1, text: 'en la vida' },           // G4
      { note: 349.23, dur: 0.35, stanza: 1, text: 'más justicia' },         // F4
      { note: 329.63, dur: 0.70, stanza: 1, text: 'mayor libertad' },       // E4

      { note: 293.66, dur: 0.35, stanza: 2, text: 'Avancemos' },            // D4
      { note: 329.63, dur: 0.35, stanza: 2, text: 'con fuerza guerrera' },  // E4
      { note: 349.23, dur: 0.70, stanza: 2, text: 'estudiantes con firme tesón' }, // F4
      { note: 392.00, dur: 0.35, stanza: 2, text: 'que la patria' },        // G4
      { note: 349.23, dur: 0.35, stanza: 2, text: 'en su blanca bandera' }, // F4
      { note: 329.63, dur: 0.35, stanza: 2, text: 'vea en nosotros' },      // E4
      { note: 261.63, dur: 0.80, stanza: 2, text: 'su gran redención' },    // C4

      { note: 261.63, dur: 0.35, stanza: 3, text: 'En la fragua,' },        // C4
      { note: 329.63, dur: 0.35, stanza: 3, text: 'en el surco y la ciencia' }, // E4
      { note: 392.00, dur: 0.70, stanza: 3, text: 'el futuro empezamos a abrir' }, // G4
      { note: 440.00, dur: 0.35, stanza: 3, text: 'conquistando con clara' }, // A4
      { note: 392.00, dur: 0.35, stanza: 3, text: 'conciencia' },           // G4
      { note: 349.23, dur: 0.35, stanza: 3, text: 'el derecho a un mejor' }, // F4
      { note: 261.63, dur: 1.00, stanza: 3, text: '¡porvenir!' }            // C4
    ];
  }

  public play(onStep?: (stanzaIndex: number) => void, onComplete?: () => void) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.onStepCallback = onStep || null;

    const melody = this.getMelody();
    let noteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;

      if (noteIndex >= melody.length) {
        this.isPlaying = false;
        if (onComplete) onComplete();
        return;
      }

      const item = melody[noteIndex];
      const now = this.ctx.currentTime;
      const duration = item.dur;

      if (this.onStepCallback) {
        this.onStepCallback(item.stanza);
      }

      // Create warm brass-like tone: combination of saw and triangle
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(item.note, now);
      osc2.frequency.setValueAtTime(item.note * 1.002, now); // slight unison detune

      // Brass envelope: sharp attack, gentle decay
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.18, now + duration * 0.7);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      noteIndex++;
      this.currentTimeout = window.setTimeout(playNext, duration * 1000 + 40);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const anthemPlayer = new AnthemSynthesizer();
