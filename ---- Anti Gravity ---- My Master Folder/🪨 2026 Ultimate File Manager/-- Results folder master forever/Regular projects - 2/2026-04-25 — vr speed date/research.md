# VR Speed Dating — Research

**Pick:** #10 VRChat-native HUD companion app
**Status:** research locked · awaiting build

## Landscape
- VRChat dating worlds (Just B Club, JP "Dating Bar" worlds) are static — no queue, no auto-rotation, no ratings
- Discord-organized speed-dating events exist but no companion app drives matching
- **Gap:** no matchmaking app paired with VRChat instances

## Tech Stack
- Web dashboard (queue + match algo) + VRChat OSC for in-world state sync
- Auto instance-hop on rotation timer
- Voice = in-VRChat (ToS-safe, no external bridge)

## Mechanics
1. Queue
2. Match (Elo-style)
3. Instance hop
4. 3–5 min rotation timer
5. Rate
6. Re-match

## 10 Mocks Considered
1. Tinder swipe deck
2. Hinge profile column
3. Anime VN dating sim
4. Neon arcade CRT
5. Apple-minimal mono
6. Glassmorphism panels
7. Terminal/hacker green-on-black
8. Bus-ticket/event flyer
9. Pokémon battle "match found!"
10. **VRChat-native HUD** ← PICK

## Top 3 Risks
- VRChat ToS on instance manipulation
- Voice routing must stay in-VR
- Alt-account / rotation cheating

## Why #10
Lowest friction · ToS-safe · feels native to VRChat.

## Connections
- ***1 VRChat OSC API
- ***2 audio pipeline (in-VR voice only)
