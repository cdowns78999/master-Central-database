// controls.js — UI wiring + capture/engine glue (agent A3)

import { translate } from './engine.js';
import { startCapture, stopCapture } from './capture.js';
import { detectLanguage } from './detect.js';
import { addEntry, dumpEntries, seedDemo } from './log.js';

// Normalize anything detect.js or pickers spit out → engine.js dictionary keys.
function normalizeLang(code) {
  if (!code) return 'auto';
  const c = String(code).toLowerCase();
  if (c === 'ja') return 'jp';
  return c;
}

const state = {
  from: 'auto',
  to: 'en',
  capturing: false,
  pttHeld: false,
  lastSrc: '',
  lastDst: ''
};

function $(id) { return document.getElementById(id); }

function setRecording(on) {
  const status = $('recStatus');
  const label = $('recLabel');
  if (!status) return;
  status.classList.toggle('is-live', !!on);
  label.textContent = on ? 'recording' : 'idle';
  const ptt = $('pttBtn');
  if (ptt) ptt.classList.toggle('is-active', !!on);
}

function setLatency(ms) {
  const el = $('latencyMeta');
  if (el) el.textContent = ms == null ? '--ms' : `${ms}ms`;
}

function setRouteMeta() {
  const el = $('routeMeta');
  if (el) el.textContent = `${state.from} → ${state.to}`;
}

function showLive(src, dst) {
  const s = $('liveSrc');
  const d = $('liveDst');
  if (s) s.textContent = src || '';
  if (d) d.textContent = dst || '';
  // also fire the floating overlay (overlay.css handles styling)
  const overlay = $('subtitleOverlay');
  if (overlay) {
    overlay.classList.remove('is-hidden');
    overlay.querySelector('.subtitleSrc').textContent = src || '';
    overlay.querySelector('.subtitleDst').textContent = dst || '';
    clearTimeout(showLive._t);
    showLive._t = setTimeout(() => overlay.classList.add('is-hidden'), 4200);
  }
}

function toast(msg) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 1500);
}

// ──────────────────────────────────────────────────────────────────
// Audio chunk handler — wired to capture.startCapture(callback).
// In stub form, capture.js emits {blob, ts}; we run detect → translate.
// Since the engine stub can't transcribe audio, we mock the source text
// so the UX flow stays visible. Real impl: pipe blob through Whisper
// to get transcript, then call translate(transcript, from, to).
// ──────────────────────────────────────────────────────────────────
async function handleChunk({ blob, ts }) {
  const start = performance.now();
  const det = await detectLanguage(blob);
  const fromCode = state.from === 'auto' ? normalizeLang(det.lang) : state.from;
  const toCode = state.to;

  // Mock transcript pool — real impl replaces this with Whisper output.
  const samples = [
    'こんにちは', 'ありがとう', 'おはよう', 'すみません',
    'hello', 'thank you', 'good morning', 'see you later'
  ];
  const transcript = samples[Math.floor(Math.random() * samples.length)];

  const translated = await translate(transcript, fromCode, toCode);
  const dur = Math.round(performance.now() - start);

  state.lastSrc = transcript;
  state.lastDst = translated;
  showLive(transcript, translated);
  setLatency(dur);
  addEntry(fromCode, toCode, transcript, translated);
}

async function togglePTT(forceState) {
  const want = forceState != null ? forceState : !state.capturing;
  if (want && !state.capturing) {
    try {
      await startCapture(handleChunk);
      state.capturing = true;
      setRecording(true);
    } catch (err) {
      console.error('[controls] capture start failed:', err);
      toast('mic blocked');
    }
  } else if (!want && state.capturing) {
    stopCapture();
    state.capturing = false;
    setRecording(false);
  }
}

function swapLangs() {
  const from = $('fromLang');
  const to = $('toLang');
  if (!from || !to) return;
  // 'auto' has no twin — fall back to 'en' on the from-side after swap.
  const fromVal = state.from === 'auto' ? 'en' : state.from;
  const newFrom = state.to;
  const newTo = fromVal;
  // Make sure the option exists in the from-picker (it does — both share JP/EN/ES/FR/KO).
  from.value = newFrom;
  to.value = newTo;
  state.from = newFrom;
  state.to = newTo;
  setRouteMeta();
  toast(`swapped → ${newFrom} → ${newTo}`);
}

function copyLast() {
  const text = state.lastDst || '';
  if (!text) { toast('nothing to copy'); return; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => toast('copied'),
      () => toast('copy failed')
    );
  } else {
    // Fallback for non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); toast('copied'); }
    catch { toast('copy failed'); }
    document.body.removeChild(ta);
  }
}

function saveSession() {
  const dump = dumpEntries();
  if (!dump) { toast('log empty'); return; }
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const blob = new Blob(
    [`# VRChat Translator — session ${ts}\n\n${dump}\n`],
    { type: 'text/plain;charset=utf-8' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vrchat-translator-session-${ts}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  toast('saved');
}

function bindPickers() {
  const from = $('fromLang');
  const to = $('toLang');
  if (from) from.addEventListener('change', (e) => {
    state.from = normalizeLang(e.target.value);
    setRouteMeta();
  });
  if (to) to.addEventListener('change', (e) => {
    state.to = normalizeLang(e.target.value);
    setRouteMeta();
  });
}

function bindButtons() {
  $('copyBtn')?.addEventListener('click', copyLast);
  $('saveBtn')?.addEventListener('click', saveSession);
  $('swapBtn')?.addEventListener('click', swapLangs);
  $('swapBarBtn')?.addEventListener('click', swapLangs);

  // PTT button — pointerdown/up so it works for mouse + touch.
  const ptt = $('pttBtn');
  if (ptt) {
    const down = (e) => { e.preventDefault(); togglePTT(true); };
    const up   = (e) => { e.preventDefault(); togglePTT(false); };
    ptt.addEventListener('pointerdown', down);
    ptt.addEventListener('pointerup', up);
    ptt.addEventListener('pointerleave', up);
    ptt.addEventListener('pointercancel', up);
  }
}

function bindShortcuts() {
  // capture.js already binds Space for PTT internally — we mirror visual state here.
  // Letter shortcuts: C copy, S save, X swap.
  window.addEventListener('keydown', (e) => {
    if (e.target && /input|select|textarea/i.test(e.target.tagName)) return;
    if (e.code === 'Space') {
      // capture.js handles the actual mic toggle; we just reflect it.
      if (!state.pttHeld && state.capturing) {
        state.pttHeld = true;
        setRecording(true);
      }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === 'c') { e.preventDefault(); copyLast(); }
    else if (k === 's') { e.preventDefault(); saveSession(); }
    else if (k === 'x') { e.preventDefault(); swapLangs(); }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' && state.pttHeld) {
      state.pttHeld = false;
      // recording state itself is owned by capture.js' chunk lifecycle;
      // visual dim happens once the chunk timer stops.
      setRecording(false);
    }
  });
}

/**
 * Boot the UI. Called from index.html after modules load.
 * Wires pickers + buttons, seeds demo log entries, sets initial state.
 */
export function init() {
  // Sync state from any pre-set picker values
  const from = $('fromLang'); const to = $('toLang');
  if (from) state.from = normalizeLang(from.value);
  if (to) state.to = normalizeLang(to.value);

  bindPickers();
  bindButtons();
  bindShortcuts();
  setRouteMeta();
  setRecording(false);
  setLatency(null);
  seedDemo();

  // Auto-start mic listener so SPACE PTT (handled inside capture.js) works
  // immediately — actual chunking only fires while space is held.
  startCapture(handleChunk).catch((err) => {
    console.warn('[controls] mic deferred — click PTT to grant permission:', err.message);
  });
}
