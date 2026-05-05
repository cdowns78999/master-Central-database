// engine.js — translation engine module (agent A2)

// Demo phrase dictionary — real implementation swaps this stub for GPT / translation API call.
const PHRASE_DICT = {
  'jp-en': {
    'こんにちは': 'Hello',
    'ありがとう': 'Thank you',
    'おはよう': 'Good morning',
    'おやすみ': 'Good night',
    'すみません': 'Excuse me',
    'はじめまして': 'Nice to meet you',
    'よろしくお願いします': 'Pleased to work with you',
    'かわいい': 'Cute',
    'たのしい': 'Fun',
    'またね': 'See you later'
  },
  'en-jp': {
    'hello': 'こんにちは',
    'thank you': 'ありがとう',
    'good morning': 'おはよう',
    'good night': 'おやすみ',
    'excuse me': 'すみません',
    'nice to meet you': 'はじめまして',
    'pleased to work with you': 'よろしくお願いします',
    'cute': 'かわいい',
    'fun': 'たのしい',
    'see you later': 'またね'
  }
};

/**
 * Translate text from one language to another.
 * Stub uses a small JP↔EN phrase dictionary. Falls back to identity passthrough.
 * Real implementation: replace dictionary lookup with fetch() to GPT / translation API.
 *
 * @param {string} text   — source text
 * @param {string} fromLang — e.g. 'jp' or 'en'
 * @param {string} toLang   — e.g. 'en' or 'jp'
 * @returns {Promise<string>} translated text (or original if no match)
 */
export function translate(text, fromLang, toLang) {
  return new Promise((resolve) => {
    if (!text || typeof text !== 'string') {
      resolve(text || '');
      return;
    }

    const key = `${fromLang}-${toLang}`;
    const dict = PHRASE_DICT[key];

    // No dictionary for this pair — identity passthrough
    if (!dict) {
      resolve(text);
      return;
    }

    const trimmed = text.trim();
    const lookupKey = fromLang === 'en' ? trimmed.toLowerCase() : trimmed;

    // Exact match
    if (dict[lookupKey]) {
      resolve(dict[lookupKey]);
      return;
    }

    // Partial match — substring scan for any known phrase
    for (const [src, dst] of Object.entries(dict)) {
      if (lookupKey.includes(src)) {
        resolve(text.replace(src, dst));
        return;
      }
    }

    // Fallback — identity passthrough
    resolve(text);
  });
}
