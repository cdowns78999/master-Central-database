# VR Bridge — Meta Quest Standalone Audio Injection Research

**Date:** 2026-04-13
**Project:** VR Bridge — real-time voice translator for VRChat
**Core constraint:** VB-Cable + Voicemeeter (the desktop virtual audio cable pattern) does NOT work on Meta Quest standalone. Quest is Android-based; there is no system-level virtual audio cable, and VRChat on Quest pulls mic input from the Android `VOICE_COMMUNICATION` audio source, which is sandboxed and cannot be fed by a third-party app without rooting / ToS-violating injection.

---

## Candidate Evaluation

### 1. OSC over LAN (VRChat OSC chatbox)

**How it works:** Phone/PC on same Wi-Fi as Quest sends OSC messages to the Quest's IP on port 9000. VRChat listens and writes the string into the in-game chatbox bubble above the avatar.

**Pros**
- Officially supported by VRChat on Quest standalone (OSC is enabled platform-wide as of 2022.1.1 and still works on Quest builds)
- Zero audio routing needed — pure text protocol
- Works with any language Unicode; perfect for translation output
- No ToS risk (documented public API)
- Low-latency on LAN (<50 ms)

**Cons**
- **Text only.** OSC cannot inject microphone audio into VRChat on any platform — the `/chatbox/input` endpoint accepts strings, not PCM
- Other players see a chat bubble, they do NOT hear a voice
- 144-char chatbox cap, ~1.5 s rate limit
- No spatial audio / lip-sync / voice presence

**Quest support:** Confirmed. OSC endpoint is network-based, so the Quest app listens regardless of whether it's standalone or PCVR.

---

### 2. Companion Android phone app bridging audio via Bluetooth / Wi-Fi to Quest

**How it works:** Phone captures mic, runs STT → translate → TTS, then streams synthesized audio to the Quest over Bluetooth A2DP or Wi-Fi, hoping the Quest treats it as a mic source.

**Pros**
- Keeps the familiar "voice-in, voice-out" UX

**Cons (fatal)**
- Quest standalone's VRChat mic input is hard-bound to the Android `VOICE_COMMUNICATION` source — a Bluetooth A2DP stream or Wi-Fi audio stream **does not register as a mic input to VRChat**
- Bluetooth HFP (hands-free profile) could in theory surface as a mic, but Quest's OS does not expose BT headsets for arbitrary mic rerouting from a paired phone acting as a source; there is no pairing mode where a phone is a "microphone" for the Quest
- Even if it worked, injecting pre-recorded audio into VRChat's voice channel is a gray-zone ToS concern flagged on ask.vrchat.com
- Dev complexity is high (custom Android app on both ends), latency stacks up (mic → STT → translate → TTS → BT encode → Quest decode → mic bus)

**Quest support:** Not viable. No supported pathway.

---

### 3. VRChat world-based TTS hosted inside the game (Udon)

**How it works:** Build a custom VRChat world that carries a TTS engine, users type/speak and the world plays synthesized audio from world-placed AudioSources everyone in the instance hears.

**Pros**
- Audio would be heard by everyone (world audio streams)
- Fully in-game, no external device

**Cons (fatal for this project)**
- Udon has **no TTS API** — no speech synthesis, no network fetch to a cloud TTS, no raw PCM playback from arbitrary data
- VRChat worlds can only play pre-imported AudioClips or Unity VideoPlayer URLs (whitelisted streaming hosts) — not real-time synthesized speech from user input
- Locks users into a single custom world — destroys the "use anywhere in VRChat" value prop
- Heavy build (Unity + Udon + VRChat SDK + world publishing pipeline)

**Quest support:** Worlds do run on Quest, but the TTS limitation is the blocker, not the platform.

---

### 4. How existing tools (TTS-Voice-Wizard, VRCSTT, vrc-tts-osc) handle Quest

Confirmed via GitHub + vendor docs:

- **TTS-Voice-Wizard (VRCWizard):** PC-only. Uses a virtual audio cable (VB-Cable) to feed TTS audio into the PC mic bus that PC VRChat reads. On Quest standalone, only the OSC chatbox portion survives — the audio portion cannot reach the Quest app. Their own wiki gates audio features behind a "Virtual Cable" setup page.
- **VRCSTT (vrcstt.com):** Same pattern. "Virtual Audio Cable Setup" is a required step. No Quest standalone path documented.
- **vrc-tts-osc (MaurerKrisztian):** Tool readme explicitly: "Play the synthesized speech through a virtual audio device to simulate microphone input in VRChat." PC-only audio; OSC chatbox text is the only Quest-compatible output.
- **TaSTT (yum-food):** Whisper STT → OSC chatbox text. Text-only — works on Quest because it never tries to inject audio.
- **VRCT / Kikitan Translator:** Chatbox-text translators. Quest-compatible for the same reason — they only push OSC strings.

**Pattern:** every working Quest-compatible tool uses OSC chatbox (text). Every tool advertising "voice out in VRChat" requires PC VRChat + a virtual audio cable. Nothing in the current ecosystem injects voice audio into Quest standalone VRChat.

---

## Winning Path — OSC Chatbox over LAN (Text-Only Translation)

**Rationale**
1. It's the only candidate that actually works on Quest standalone today
2. It matches the proven ecosystem pattern (TaSTT, VRCT, Kikitan all ship this way and have Quest users)
3. Zero ToS risk — uses VRChat's documented public OSC API
4. Low latency, Unicode-safe, any-language-friendly — ideal for real-time translation
5. Simple architecture: phone/PC captures mic → Whisper STT → translate → send string to Quest IP:9000 via OSC `/chatbox/input`

**Trade-off accepted:** Output is a chat bubble over the user's avatar, not spoken audio. Other players read instead of hear. This is the same constraint every Quest-compatible VRChat speech tool has accepted.

**Future upgrade path (optional):**
- Dual-mode: if a PC is present in the user's setup, fall back to the VB-Cable TTS audio pipeline for voice output (PCVR users get voice; Quest-standalone users get chatbox text)
- Keep all PC code paths separate from the core Quest path so the product still works for pure-Quest users

---

## Architecture Summary (Chosen Path)

```
[User speaks into phone mic]
         |
         v
[Phone app: Whisper STT]
         |
         v
[Translate API: source lang -> target lang]
         |
         v
[OSC client: UDP to Quest IP : 9000]
         |
         v
[VRChat on Quest receives /chatbox/input "<translated text>"]
         |
         v
[Chat bubble renders above user's avatar — all nearby players see it]
```

**LAN requirement:** phone and Quest on same Wi-Fi. OSC is UDP, no external server needed.

**Endpoint:** `/chatbox/input <string> <send_immediately:true> <play_notification_sound:false>`

**Rate limit:** respect ~1.5 s between messages to avoid VRChat throttling.

---

## Sources

- VRChat OSC Overview — https://docs.vrchat.com/docs/osc-overview
- VRChat OSC Resources — https://docs.vrchat.com/docs/osc-resources
- Chatbox Wiki — https://wiki.vrchat.com/wiki/Chatbox
- TTS-Voice-Wizard Virtual Cable wiki — https://github.com/VRCWizard/TTS-Voice-Wizard/wiki/Virtual-Cable
- vrc-tts-osc — https://github.com/MaurerKrisztian/vrc-tts-osc
- TaSTT (OSC-only, Quest-compatible) — https://github.com/yum-food/TaSTT
- VRCT (chatbox translator) — https://github.com/misyaguziya/VRCT
- Audio injection ToS thread — https://ask.vrchat.com/t/audio-injection-concerns/48038
- VB-Cable — https://vb-audio.com/Cable/ (PC-only, confirmed not usable on Quest)
