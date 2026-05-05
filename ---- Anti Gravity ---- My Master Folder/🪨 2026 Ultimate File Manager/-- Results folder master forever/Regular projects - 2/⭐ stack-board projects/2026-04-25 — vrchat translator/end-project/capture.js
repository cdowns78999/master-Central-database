// capture.js — VR mic capture module (agent A1)

let mediaRecorder = null;
let stream = null;
let active = false;
let chunkTimer = null;
let pttHeld = false;
const CHUNK_MS = 2000;

async function requestMic() {
  try {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error('[capture] mic permission denied:', err);
    throw new Error('mic-permission-denied');
  }
}

function emitChunk(blob, callback) {
  if (!blob || blob.size === 0) return;
  callback({ blob, ts: Date.now() });
}

function buildRecorder(callback) {
  const rec = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  rec.ondataavailable = (e) => emitChunk(e.data, callback);
  rec.onerror = (e) => console.error('[capture] recorder error:', e.error);
  return rec;
}

function startChunking(callback) {
  mediaRecorder = buildRecorder(callback);
  mediaRecorder.start();
  chunkTimer = setInterval(() => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder = buildRecorder(callback);
      mediaRecorder.start();
    }
  }, CHUNK_MS);
}

function stopChunking() {
  if (chunkTimer) clearInterval(chunkTimer);
  chunkTimer = null;
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  mediaRecorder = null;
}

function bindPushToTalk(callback) {
  const onDown = (e) => {
    if (e.code !== 'Space' || pttHeld || !active) return;
    pttHeld = true;
    e.preventDefault();
    startChunking(callback);
  };
  const onUp = (e) => {
    if (e.code !== 'Space' || !pttHeld) return;
    pttHeld = false;
    e.preventDefault();
    stopChunking();
  };
  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);
  return () => {
    window.removeEventListener('keydown', onDown);
    window.removeEventListener('keyup', onUp);
  };
}

let unbindPTT = null;

export async function startCapture(callback) {
  if (active) return;
  if (typeof callback !== 'function') throw new Error('callback-required');
  stream = await requestMic();
  active = true;
  unbindPTT = bindPushToTalk(callback);
  console.log('[capture] ready — hold SPACE to talk');
}

export function stopCapture() {
  active = false;
  pttHeld = false;
  stopChunking();
  if (unbindPTT) { unbindPTT(); unbindPTT = null; }
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  console.log('[capture] stopped');
}
