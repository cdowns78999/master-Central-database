# VR Language Barrier — Latency Budget & Cost Model

**Goal:** End-to-end voice roundtrip (Chad speaks EN → Yuki hears JP) **under 2 seconds**, conversation-grade. Anything >2s feels like a satellite phone — kills flow.

---

## End-to-end latency table

| # | Leg | Description | Target (ms) | Stretch (ms) | Notes |
|---|-----|-------------|------------:|-------------:|-------|
| 1 | Mic capture | MediaRecorder grabs PCM, packages as webm/opus chunk | **50** | 100 | Browser overhead + 1 audio frame buffer |
| 2 | Whisper STT | POST `/v1/audio/transcriptions` (model `whisper-1`) | **400** | 700 | ~250ms network + 150ms inference for ≤5s clip |
| 3 | GPT-4o translate | POST `/v1/chat/completions` (model `gpt-4o`) | **600** | 1000 | First-token + full response for ≤30 token output |
| 4 | ElevenLabs TTS | POST `/v1/text-to-speech/{id}` (model `eleven_flash_v2_5`) | **600** | 900 | Flash 2.5 is the explicit low-latency model |
| 5 | VB-Cable routing | Browser audio → VoiceMeeter Aux → B1 → VRChat | **50** | 150 | KS driver, 256-sample buffer @ 48kHz |
|   | **TOTAL** | | **1700 ms** | **2850 ms** | Stretch case = network jitter |

**Verdict:** Target budget = **1.7s** under nominal. Stretch case = **2.85s** when the network is bad — over budget, needs fallback (see below).

---

## Stretch / overrun fallback strategies

| Leg over budget? | Symptom | Fall back to... |
|------------------|---------|-----------------|
| **Whisper STT > 700ms** | Transcript lag, 1.5s "dead air" before TTS plays | Switch `STT_MODE=realtime` in `.env` — OpenAI Realtime WebSocket streams partial transcripts as you speak. Cuts STT to ~150ms perceived. Trade-off: ~3x more expensive. |
| **GPT-4o translate > 1000ms** | Long pause after transcript before audio | (a) Drop to `gpt-4o-mini` model — ~250ms typical, ~30% quality drop on idiomatic phrases. (b) Pre-warm a streaming completion so first token arrives in ~200ms. (c) Cap `max_tokens=80` and add `"keep it short"` system prompt. |
| **ElevenLabs TTS > 900ms** | Audio plays late even after translation arrives | (a) Make sure `eleven_flash_v2_5` is set (NOT multilingual_v2 which is ~1.4s). (b) Use streaming endpoint `text-to-speech/{id}/stream` — first audio bytes arrive in ~300ms. Already returned as stream in server.js — verify client plays incrementally not after full download. |
| **VB-Cable routing > 150ms** | Audio in VRChat is choppy or trails the browser monitor | Drop Voicemeeter buffer: System Settings → WDM=256, KS=256. Use KS driver (kernel streaming) not MME. Set ALL devices to 48000 Hz exactly. |
| **Mic capture > 100ms** | Echo / weird timing before any STT call even fires | MediaRecorder `timeslice` set to 100ms or less. Avoid 1000ms slices — they buffer too long. Use `audioBitsPerSecond: 64000`, `mimeType: 'audio/webm;codecs=opus'`. |
| **All legs nominal but total >2s** | Network is the bottleneck | (a) Move to wired ethernet, not Wi-Fi. (b) Test from `cloudflare/speedtest` — need <40ms ping to OpenAI east-coast endpoints. (c) If on VPN, disable. |

---

## Pipeline-level fallbacks

1. **"Push-to-talk preempt":** if user releases the talk button before TTS finishes generating, kill the in-flight ElevenLabs request. Don't queue stale audio.
2. **"Translation cache":** hash the input transcript → if exact match in last 5 min, replay cached audio (saves 1.2s for repeated phrases like "hello," "thank you," "see you later").
3. **"Confidence skip":** if Whisper confidence < 0.6, skip translation entirely and play a short beep + show "Didn't catch that" on UI. Saves 1.2s on garbage input.
4. **"Streaming TTS chunked playback":** start playing the first audio chunk before TTS has finished generating. ElevenLabs streaming endpoint emits MP3 frames every ~150ms. Perceived latency drops 400ms.
5. **"Local language detection":** infer source language from first 1s of audio → if same as target language (e.g. user accidentally spoke JP into JP→EN session), bypass translation. Saves the GPT-4o leg entirely.

---

## Cost-at-scale model

Assumptions for a **1-hour active conversation** (back-and-forth, both sides translating):
- **Spoken minutes:** ~30 min total (the other 30 = listening, silences, lag)
- **Words spoken per side:** ~3,000 words/hr each ⇒ ~6,000 words/hr both sides
- **Avg sentence length:** 8 words ⇒ ~750 sentences/hr both sides
- **Avg characters per sentence (after translation):** ~50

### OpenAI cost (Whisper + GPT-4o)

| Component | Rate (Apr 2026) | Volume | Cost |
|-----------|-----------------|--------|------|
| Whisper STT | $0.006 / minute | 30 min audio | **$0.18** |
| GPT-4o input | $2.50 / 1M tokens | 750 sentences × ~30 input tokens = 22,500 tokens | **$0.06** |
| GPT-4o output | $10.00 / 1M tokens | 750 × ~25 output tokens = 18,750 tokens | **$0.19** |
| **OpenAI subtotal** | | | **~$0.43/hour** |

(If using `gpt-4o-realtime-preview` instead: input $5/1M, output $20/1M ⇒ ~$0.84/hr — about 2x.)

### ElevenLabs cost (Flash 2.5 TTS)

| Component | Rate (Apr 2026) | Volume | Cost |
|-----------|-----------------|--------|------|
| Flash v2.5 | $0.30 / 1k chars (Creator tier blended rate) | 750 sentences × 50 chars = 37,500 chars | **$11.25** |

ElevenLabs Free tier: **10,000 chars/month** = ~16 minutes of conversation/month. Burns out fast.

| Tier | $/mo | Chars/mo | Hours of conversation |
|------|-----:|----------:|----------------------:|
| Free | 0 | 10,000 | 0.27 hr |
| Starter | $5 | 30,000 | 0.80 hr |
| Creator | $22 | 100,000 | 2.67 hr |
| Pro | $99 | 500,000 | 13.3 hr |
| Scale | $330 | 2,000,000 | 53.3 hr |

### Total per hour of conversation

| Plan combo | OpenAI | ElevenLabs (effective) | **Total $/hr** |
|------------|--------|------------------------|----------------|
| OpenAI pay-as-you-go + ElevenLabs Free | $0.43 | $0 (until cap, then dead) | **$0.43** (capped) |
| OpenAI PAYG + ElevenLabs Starter | $0.43 | ~$6.27 (overage at $0.30/k) | **$6.70** |
| OpenAI PAYG + ElevenLabs Creator | $0.43 | $8.25 (37.5k @ $0.22/k blended) | **$8.68** |
| OpenAI PAYG + ElevenLabs Pro | $0.43 | $7.43 (37.5k @ $0.198/k blended) | **$7.86** |

> **Bottom line:** Assume **~$8/hour** of real conversation time on Creator tier, which is the realistic sweet spot for a single user doing 2-3 hr/week. ~$50/mo all-in. Pro tier is the move once monthly hours cross 12.

---

## Monthly cost scenarios for 1 user

| Usage profile | Hours/mo | Best plan | Monthly cost |
|---------------|---------:|-----------|-------------:|
| Casual (try it out) | 1 | OpenAI PAYG + EL Free | ~$0.50 |
| Light (weekly hangout) | 4 | OpenAI PAYG + EL Creator | ~$24 |
| Active (3x/week, 1hr each) | 12 | OpenAI PAYG + EL Pro | ~$104 |
| Heavy (daily 1hr) | 30 | OpenAI PAYG + EL Pro | ~$112 (Pro covers it) |
| Power (3hr/day every day) | 90 | OpenAI PAYG + EL Scale | ~$370 |

---

## Optimization wishlist (ordered by ROI)

1. **Translation cache (#2 above)** — common phrases hit ~30% of utterances. Saves ~30% of all costs immediately. **Build first.**
2. **Streaming TTS playback** — perceived latency drops 400ms with no spend change. **Build second.**
3. **Confidence skip on Whisper** — saves wasted TTS calls on garbage input. ~10% cost reduction.
4. **gpt-4o-mini fallback** — toggle in settings for budget mode. ~50% reduction on translation leg.
5. **Self-hosted Whisper (whisper.cpp on local GPU)** — eliminates the $0.18/hr STT cost entirely, also drops STT latency to ~80ms. Big lift to ship though — defer to Phase 6+.
6. **Self-hosted Coqui XTTS / StyleTTS2** — eliminates ElevenLabs entirely. Quality compromise. Phase 7+ research, not Phase 1-6 commitment.

---

## Latency monitoring (instrumentation to add in Phase 2)

Have the client log to console (and a `data/latency-log.jsonl` server file) per utterance:

```json
{
  "ts": "2026-04-27T10:00:00Z",
  "input_chars": 38,
  "output_chars": 47,
  "leg_mic_ms": 47,
  "leg_stt_ms": 412,
  "leg_translate_ms": 587,
  "leg_tts_ms": 612,
  "leg_route_ms": 53,
  "total_ms": 1711,
  "stt_confidence": 0.94,
  "model_translate": "gpt-4o",
  "model_tts": "eleven_flash_v2_5"
}
```

After 100 utterances, compute p50 / p95 / p99 per leg. p95 > 2000ms anywhere = trigger fallback for that leg.
