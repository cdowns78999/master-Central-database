# VR Language Barrier — Research

**Pick:** #3 corner subtitle box (electron transparent overlay, caption-only)
**Status:** research locked · awaiting build

## Landscape
- Whisper-based community translators exist as standalone apps
- VRChat mods that inject captions get EAC-banned
- **Gap:** no widely adopted external transparent overlay translator

## Tech Stack
- VB-Cable loopback → faster-whisper (local, low-latency) → DeepL API → electron transparent always-on-top window

## Latency Math
- 1.5s rolling STT window + 300ms translate + 100ms render = **~1.9s** ≤ 2s ✓

## 10 HUD Mocks Considered
1. Lower-third broadcast
2. Floating speech bubble
3. **Corner subtitle box** ← PICK
4. Side panel scroll
5. Karaoke top banner
6. Minimal terminal ribbon
7. Comic book pop-out
8. Anime VN dialog box
9. Iron Man AR ribbon
10. Full-screen press-to-show

## Top 3 Risks
- EAC ban risk if implemented as mod (must stay external overlay)
- Accuracy on noisy voice channels
- TTS playback would inject audio = ToS gray zone (caption-only safer)

## Why #3
Minimal · non-intrusive · ToS-safe (external transparent window, no mod injection).

## Connections
- ***2 audio pipeline (VB-Cable)
- ***6 faster-whisper + DeepL
