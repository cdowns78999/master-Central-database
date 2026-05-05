// Exports getProgress, setComplete, resetProgress, onChange — localStorage-backed lesson progress for the 12-lesson curriculum.

const STORAGE_KEY = 'claude-music-curriculum-progress';
const TOTAL_LESSONS = 12;
const listeners = new Set();

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch (e) {
    console.warn('progress: failed to read storage', e);
    return [];
  }
}

function writeRaw(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn('progress: failed to write storage', e);
  }
}

function buildSnapshot() {
  const arr = readRaw();
  const completed = new Set(arr);
  const counted = Math.min(completed.size, TOTAL_LESSONS);
  const pct = TOTAL_LESSONS > 0 ? Math.round((counted / TOTAL_LESSONS) * 100) : 0;
  return { completed, total: TOTAL_LESSONS, pct };
}

function emit() {
  const snap = buildSnapshot();
  listeners.forEach((cb) => {
    try { cb(snap); } catch (e) { console.error('progress listener error', e); }
  });
}

export function getProgress() {
  return buildSnapshot();
}

export function setComplete(lessonId) {
  if (!lessonId || typeof lessonId !== 'string') return getProgress();
  const arr = readRaw();
  if (!arr.includes(lessonId)) {
    arr.push(lessonId);
    writeRaw(arr);
    emit();
  }
  return getProgress();
}

export function resetProgress() {
  writeRaw([]);
  emit();
  return getProgress();
}

export function onChange(callback) {
  if (typeof callback !== 'function') return () => {};
  listeners.add(callback);
  try { callback(buildSnapshot()); } catch (e) { console.error('progress onChange initial', e); }
  return () => listeners.delete(callback);
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) emit();
  });
}
