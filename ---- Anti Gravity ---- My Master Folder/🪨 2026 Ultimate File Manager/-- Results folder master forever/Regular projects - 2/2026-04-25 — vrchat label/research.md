# VRChat Music Label — Research

**Pick:** #2 Notion-style kanban dashboard
**Status:** research locked · scaffold built (index.html)

## Landscape
- Karaoke worlds: Just B Club, KaraokeBox, JP karaoke venues
- Small Discord-organized micro-labels exist
- OBS audio capture is standard
- DistroKid has no official public API → web automation (Playwright)
- Spotify for Artists DOES have an official API → analytics is the easy win

## Tech Stack
- OBS / VB-Cable capture → WAV
- Adobe Podcast Enhance (free) or iZotope RX → cleanup
- Playwright auto-fill DistroKid
- Spotify for Artists API → analytics

## Pipeline
1. **Scout** — VRChat karaoke worlds, log performers
2. **Capture** — WAV via OBS
3. **Clean** — mastering pass, normalize -14 LUFS
4. **Metadata** — ISRC, cover art, royalty split
5. **Distribute** — DistroKid → Spotify/Apple/YT Music
6. **Analytics** — Spotify for Artists API → dashboard

## 10 Dashboard Mocks Considered
1. Spotify-for-Artists clone
2. **Notion kanban (Scout→Ship)** ← PICK
3. Vinyl record-label classic
4. Terminal/hacker CLI
5. iTunes left-nav + grid
6. VRChat-native UI
7. Anime label HQ manga
8. Vertical pipeline timeline
9. Neon arcade track-cards
10. Card-deck artist swipe

## Top 3 Risks
- Recording without performer consent (VRChat ToS + legal)
- Copyright claims on karaoke covers (huge — most karaoke is covers)
- DistroKid bans for spam releases or AI-detected automation

## Why #2
Matches the actual mental model: scout → ship as columns. Chad already uses kanban-style boards.

## Connections
- ***2 audio pipeline (OBS / VB-Cable)
- ***3 VRChat world scout
- ***4 DistroKid (Playwright)
- ***5 Spotify for Artists API
