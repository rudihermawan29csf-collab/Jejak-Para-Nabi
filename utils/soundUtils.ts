// Simple synth beep for UI interactions using Web Audio API
// This avoids needing external files for simple UI sounds
export const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // High pitch short "blip"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export const playSuccessSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1); // C#
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Ignore
  }
};

let ttsAudioContext: AudioContext | null = null;

const getTTSContext = () => {
  if (!ttsAudioContext) {
    ttsAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (ttsAudioContext.state === 'suspended') {
    ttsAudioContext.resume();
  }
  return ttsAudioContext;
};

export const playPCMAudio = async (arrayBuffer: ArrayBuffer): Promise<AudioBufferSourceNode | null> => {
  try {
    const ctx = getTTSContext();
    
    // Gemini TTS output is typically 24kHz mono PCM (16-bit little endian)
    const dataInt16 = new Int16Array(arrayBuffer);
    const float32Data = new Float32Array(dataInt16.length);
    
    for (let i = 0; i < dataInt16.length; i++) {
      // Convert int16 to float32 [-1.0, 1.0]
      float32Data[i] = dataInt16[i] / 32768.0;
    }
    
    const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
    audioBuffer.copyToChannel(float32Data, 0);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
    
    return source;
  } catch (e) {
    console.error("Failed to play PCM audio", e);
    return null;
  }
};