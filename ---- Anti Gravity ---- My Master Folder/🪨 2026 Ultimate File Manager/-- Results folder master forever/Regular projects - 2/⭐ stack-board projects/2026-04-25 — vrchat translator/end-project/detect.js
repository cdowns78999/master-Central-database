// detect.js — auto language detection module (agent A1)

// Stub heuristic — real impl swaps to Whisper API (POST blob to /v1/audio/transcriptions
// with model=whisper-1 and read response.language + logprob-derived confidence).
const DEFAULT = { lang: 'auto', confidence: 0.5 };

function classifyBySize(bytes) {
  if (bytes < 4000) return { lang: 'auto', confidence: 0.3 };
  if (bytes < 16000) return { lang: 'en', confidence: 0.55 };
  if (bytes < 48000) return { lang: 'ja', confidence: 0.6 };
  return { lang: 'auto', confidence: 0.5 };
}

export function detectLanguage(audioBlob) {
  return new Promise((resolve) => {
    if (!audioBlob || typeof audioBlob.size !== 'number') {
      resolve(DEFAULT);
      return;
    }
    const guess = classifyBySize(audioBlob.size);
    resolve(guess);
  });
}
