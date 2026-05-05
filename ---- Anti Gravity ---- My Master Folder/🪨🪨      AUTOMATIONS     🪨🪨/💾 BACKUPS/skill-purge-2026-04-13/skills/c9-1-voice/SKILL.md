---
name: c9-1-voice
description: Voice input (optimized) — fast mic open, background Whisper loading, local transcription
---

# c9-1-voice

Optimized voice input — opens mic fast, loads Whisper in background while you talk.

## Instructions

When this skill is invoked:

### Step 1: Listen
Run the listen script to record from the user's microphone and transcribe:
```
uv run --python 3.12 "C:/Users/chad/.claude/skills/c9-1-voice/scripts/listen.py"
```
This will output the transcribed text to stdout.

### Step 2: Show Transcript + Respond
Display the transcript ONE time only, with hub color dots on BOTH sides so it catches the eye. Then respond normally underneath — short and casual, like a DM.
```
🔵🟢🟣 "transcribed text here" 🟣🟢🔵
```
- Do NOT show the raw transcript separately — the dotted line IS the transcript display.
- Only one copy of the transcript, ever.

## Notes
- Optimized for speed — only imports sounddevice upfront, lazy-loads everything else in a background thread while you talk.
- "Listening..." appears as soon as the mic is confirmed open (~1-2s).
- Whisper model loads in parallel — transcription starts instantly after you stop talking.
- First run downloads the model (~150MB) with a progress message before mic opens. Cached after that.
- Runs 100% locally — no API key needed. Uses faster-whisper with the `base` model.
- No TTS — listen and respond as text.
