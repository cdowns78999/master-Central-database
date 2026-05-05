// VR Bridge — local Express server
// Proxies OpenAI Realtime API (ephemeral token mint) + ElevenLabs TTS (Flash v2.5).
// API keys stay server-side. Browser never sees them.
//
// Endpoints:
//   GET  /health           -> { ok: true }
//   GET  /realtime-token   -> { client_secret: { value, expires_at } }  (ephemeral OpenAI key for browser WebRTC/WS)
//   POST /tts              -> audio/mpeg stream (ElevenLabs Flash v2.5 passthrough)
//
// Static root (.) is served so index.html can load at http://localhost:3000/

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const app = express();

// CORS — allow any localhost origin (Vite, Live Server, file://, etc.)
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return cb(null, true);
    return cb(null, true); // permissive for local dev
  },
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));

// Serve static files from project root (so index.html loads at /)
app.use(express.static(__dirname));

// ---- /health ---------------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'vr-bridge',
    openai: Boolean(OPENAI_API_KEY),
    elevenlabs: Boolean(ELEVENLABS_API_KEY),
    time: new Date().toISOString()
  });
});

// ---- /realtime-token -------------------------------------------------------
// Mints a short-lived ephemeral key the browser can use to open a Realtime
// session directly with OpenAI. Docs: POST https://api.openai.com/v1/realtime/sessions
app.get('/realtime-token', async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
  }
  try {
    const r = await axios.post(
      'https://api.openai.com/v1/realtime/sessions',
      {
        model: 'gpt-4o-realtime-preview',
        voice: 'verse',
        modalities: ['audio', 'text']
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'realtime=v1'
        },
        timeout: 15000
      }
    );
    res.json(r.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const body = err.response?.data || { error: err.message };
    console.error('[realtime-token] error:', status, body);
    res.status(status).json(body);
  }
});

// ---- /tts ------------------------------------------------------------------
// Body: { text, voice_id?, model_id? }
// Default model: eleven_flash_v2_5 (low-latency). Streams audio/mpeg back.
app.post('/tts', async (req, res) => {
  if (!ELEVENLABS_API_KEY) {
    return res.status(500).json({ error: 'ELEVENLABS_API_KEY not set on server' });
  }
  const { text, voice_id, model_id } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'body.text (string) required' });
  }
  const voice = voice_id || '21m00Tcm4TlvDq8ikWAM'; // Rachel, a safe default
  const model = model_id || 'eleven_flash_v2_5';

  try {
    const r = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        text,
        model_id: model,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg'
        },
        responseType: 'stream',
        timeout: 30000
      }
    );
    res.setHeader('Content-Type', 'audio/mpeg');
    r.data.pipe(res);
  } catch (err) {
    const status = err.response?.status || 500;
    console.error('[tts] error:', status, err.message);
    res.status(status).json({ error: err.message });
  }
});

// ---- shared invite-bot state (read by server, written by invite-bot.js) ----
import fs from 'fs';
const DATA_DIR = path.join(__dirname, 'data');
const STATE_PATH = path.join(DATA_DIR, 'invite-state.json');

function readState() {
  try {
    if (!fs.existsSync(STATE_PATH)) {
      return { paused: false, watchlist: [], log: [], lastUpdate: null };
    }
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return { paused: false, watchlist: [], log: [], lastUpdate: null };
  }
}
function writeState(patch) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const next = { ...readState(), ...patch, lastUpdate: new Date().toISOString() };
  fs.writeFileSync(STATE_PATH, JSON.stringify(next, null, 2));
  return next;
}

app.get('/invite-status', (req, res) => res.json(readState()));

app.post('/watchlist', (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids.filter(Boolean) : [];
  res.json(writeState({ watchlist: [...new Set(ids)] }));
});

app.post('/invite-control', (req, res) => {
  const paused = Boolean(req.body?.paused);
  res.json(writeState({ paused }));
});

// ---- start -----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\nVR Bridge server listening on http://localhost:${PORT}`);
  console.log(`  GET  /health`);
  console.log(`  GET  /realtime-token`);
  console.log(`  POST /tts`);
  console.log(`  GET  /invite-status`);
  console.log(`  POST /watchlist`);
  console.log(`  POST /invite-control`);
  if (!OPENAI_API_KEY) console.warn('  WARN: OPENAI_API_KEY missing');
  if (!ELEVENLABS_API_KEY) console.warn('  WARN: ELEVENLABS_API_KEY missing');
});
