# DSP BUILD — FULL EXPORT PROMPT

Paste this entire prompt into a new Claude conversation to continue this work. Everything below is context from the session that produced it.

---

## WHAT WE BUILT

### 1. c-railgun Skill (NEW mega-skill)
A brand new skill at `C:\Users\chad\.claude\skills\c-railgun\` that combines three existing skills into one:
- **c-sub-agent-main-job** — 3x2 grid, parallel sub-agents, ANSI colored terminal tracking
- **c9-1-job-runner** — railroad HTML, pickup prompt, floor-to-ceiling step tracking
- **c-debug** — severity bar, diagnostic/results blocks, session-end reporting

**Files created:**
- `C:\Users\chad\.claude\skills\c-railgun\skill.md` — full 6-phase skill instructions
- `C:\Users\chad\.claude\skills\c-railgun\railgun-template.html` — reusable railroad + overlay HTML template (lamp palette CSS, 4-zone grid, game HUD, debug overlay with sections A/B/C/D)

**6-Phase Flow:**
- Phase 0: INTAKE (interactive, inline, or resume)
- Phase 1: RESEARCH (3 parallel web agents)
- Phase 2: SELF-REPORT (3 approaches, user picks)
- Phase 3: PLAN + RAILROAD BUILD (decompose job, create folder, populate template, open in browser)
- Phase 4: SUB-AGENT EXECUTION (3x2 grid, background agents, board swap at job 7)
- Phase 5: RAILROAD UPDATE (read/write pickupPrompt + railgunState at session boundaries)
- Phase 6: DEBUG REPORT → OVERLAY (c-debug format severity bar + diagnostic + results, populates HTML overlay)

**Registered in skills directory** — all 3 sync files updated:
- `registry.md` — added with red dot in Build/Execute section
- `index.html` (library) — added HTML row with data-skill
- Footer count bumped to 36

---

### 2. DSP Curriculum — "The Curriculum Nobody Published"
A complete, beautifully styled HTML curriculum for building a regional music DSP (Digital Service Provider) for Destin, Florida.

**File:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\destin-dsp\dsp-curriculum.html`

**Style:** Dark theme (#0a0a0a background), Spotify green (#1ed760) accents, Outfit + Inter fonts — matching the chad31 Spotify ads curriculum kit at `📙 library/chad31-master-spotify-ads-generator copy 2/`. Same design DNA: metric cards, tier cards, quote blocks, source bars, flow strips, data tables, pillar rows.

**12 Sections:**
1. **The Landscape** — 46.7% indie market share, $4.5B indie Spotify revenue, 100K tracks/day, 86% demonetized by Spotify
2. **The Culture** — 8 artist-first design principles (fair comp, transparency, discovery, fan connection, zero barrier, ownership, community, mobile-first) with Reddit/forum quotes
3. **The Gulf Coast Scene** — 4 festivals (30A 17th year, Frank Brown 42nd year, Blast on the Bay 15th, inaugural Destin Songwriter Fest), 100+ artists, 60+ genres, named venues (Club LA, Williams Backyard, Central Square Records), named artists (Kyle LaMonica, Nobius, Wayward Jones, Gulf Coast Records)
4. **The Seven Pillars** — 7 core systems every DSP needs (ingestion, transcoding, DDEX, store delivery, royalties, analytics, rights management)
5. **The Pipeline** — 9-step flow strip from upload → validation → transcode → DDEX XML → batch pack → SFTP → store process → LIVE → royalties
6. **DDEX Deep Dive** — ERN 4.3, DSR, MEAD, PIE standards. Free licence, DPID registration, validator links, GitHub repos
7. **Store Connections** — Spotify (SFTP, FLAC, hard approval), Apple (Transporter, hard), Amazon (SFTP+DDEX, medium), YouTube (Content ID, medium), smaller stores (easier). Critical truth: public APIs are consumer-facing only, content delivery is private partner integration
8. **The Shortcut** — White-label platforms: Revelator (API-first, Spotify Platinum Preferred), AudioSalad (SESAC, label clients), Label Engine (26M+ tracks), FUGA (enterprise B2B)
9. **The Build Ladder** — 4 tiers, each a functioning product:
   - Tier 1: Local Hub (community platform, $0, month 1-2)
   - Tier 2: Upload Engine (content ingestion, ~$500/mo, month 2-4)
   - Tier 3: Distribution Engine (DDEX + store delivery or white-label, ~$3K/mo, month 4-8)
   - Tier 4: Full Platform (royalties, analytics, mobile app, $5K-50K/mo, month 8-12)
10. **The Budget** — Real cost table (cloud $500-2K starting, SFTP $200-500, storage $100-500, DDEX FREE, ISRC ~$100 one-time, UPC $250/batch)
11. **Proof It Works** — Success stories: Audiomack (1B+ streams, Africa), PortalDisc (130K Chilean songs), Bandcamp ($1.68B to artists), Gulf Coast Records (BMA winners)
12. **Data Integrity** — Verified vs derived vs new (what nobody published)

---

### 3. Research Files (saved to Ran Plan Area)

**Technical Research:** `🪨🪨🪨🪨 Ran Plan Area\dsp-music-distribution-research.md`
- 717 lines, 10 sections
- Seven Pillars architecture, full pipeline diagram, DDEX ERN 4.3 annotated XML example, store-specific delivery specs (Spotify FLAC/SFTP, Apple Transporter, Amazon SFTP+DDEX, YouTube Content ID), royalty engine architecture with database schema, DDEX DSR parsing, payment splitting complexity
- Real DSP examples: DistroKid (40K songs/day to Spotify), TuneCore, CD Baby, Ditto, plus white-label platforms (Revelator, AudioSalad, Label Engine, FUGA)
- Cost estimates table, key resource links (DDEX validator, GitHub repos, store specs)
- 105 web fetches during research

**Culture Research:** `🪨🪨🪨🪨 Ran Plan Area\dsp-culture-research.md`
- 468 lines, 8 sections, 70+ sources
- Full DSP ecosystem map (streaming DSPs + regional/niche + distribution middle layer + forums/Discords)
- History timeline (phonograph → Napster → iTunes → Spotify → 2024 boycotts → 100K tracks/day)
- Indie culture deep dive (ownership, money, freedom, speed — 46.7% global market)
- Regional DSP case studies (Audiomack+Africa, PortalDisc+Chile, LINE Music+Japan, Boomplay, Deedo, Gaana)
- DESTIN / GULF COAST deep section: 30A Songwriters Festival (17th year, 4,000+ attendees), Frank Brown International (42nd year, 44 states), Blast on the Bay (15th), inaugural Destin Songwriter Festival (Oct 2025), Scene Pensacola 100+ artist directory, Gulf Coast Records, named venues and artists
- Artist-first design principles (8 principles + anti-patterns)
- Success stories with specific data
- Community voices (real Reddit quotes, Billboard exec surveys)
- All sources linked at bottom

---

### 4. Job Folder Structure (created, ready for railroad)

```
Ran Plan Area/destin-dsp/
├── dsp-curriculum.html       ← THE curriculum (dark theme, chad31 style)
├── dsp-music-distribution-research.md  ← technical research (717 lines)
├── dsp-culture-research.md   ← culture research (468 lines)
├── assets/
│   ├── scripts/              ← empty, ready for build artifacts
│   ├── data/                 ← empty, ready for JSON/CSV/config
│   └── exports/              ← empty, ready for output artifacts
└── memory/                   ← empty, ready for session logs
```

**Full path:** `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\destin-dsp\`

---

## THE CHAD31 STYLE REFERENCE

The curriculum was built to match 4 existing HTML files in the library:

**Location:** `📙 library/chad31-master-spotify-ads-generator copy 2/`

| File | Lines | What It Is |
|------|-------|------------|
| `index.html` | 1,497 | Campaign Kit Intelligence Report — benchmarks + interactive generator |
| `the-missing-document.html` | 1,255 | Zero to 40x — progressive tier ladder with verified math |
| `pre-marquee-guide.html` | 1,342 | Pre-Marquee Playbook — phase-by-phase roadmap with song slots |
| `song-campaign-cards.html` | 1,685 | Song Campaign Cards — per-song strategy cards + 4-stage wizard |

**Design DNA shared across all 4:**
- Dark theme: `--bg: #0a0a0a`, `--bg-elevated: #141414`, `--bg-float: #1a1a1a`
- Spotify green: `--spotify: #1ed760` as primary accent
- Fonts: Outfit (headings, 900 weight) + Inter (body)
- Hero sections with radial gradient glow + badge + h1 + subtitle
- Metric cards in grids (3-col or 4-col)
- Tier/phase cards with numbered nodes and colored badges
- Quote blocks with left border accent
- Source bars (`.src-bar`) citing verified data on every claim
- Data tables with colored `.val` cells
- Flow strips (horizontal step sequences)
- Footer with uppercase letter-spacing

---

## WHAT'S NEXT — THE INTENDED FLOW

The curriculum is the JOB SPEC. The next step is to feed it into c-railgun (`/c-railgun`) and roll out the actual build:

1. **Use the curriculum's 4-tier Build Ladder as the railroad phases**
2. **Each tier becomes a phase with discrete steps**
3. **Steps get assigned as claude (Claude builds) or chad (Chad decides/reviews)**
4. **Sub-agents execute steps in parallel (3x2 grid)**
5. **Railroad HTML tracks progress with pickup prompt for session resume**
6. **Debug report overlay captures diagnostics at session end**

### Suggested Railroad Decomposition:

**Phase 1: Local Hub (Tier 1)**
- Step 1: Set up Next.js project + PostgreSQL schema
- Step 2: Build artist profile pages (bio, photo, genre, links, embedded players)
- Step 3: Build festival integration (event calendar, lineup pages, artist tagging)
- Step 4: Build venue directory with booking info
- Step 5: Build community features (follows, comments, local playlists)
- Step 6: Deploy to Vercel

**Phase 2: Upload Engine (Tier 2)**
- Step 1: Build upload portal (WAV/FLAC + metadata forms)
- Step 2: Audio validation service (format, bitrate, stereo, clipping detection)
- Step 3: Cover art validation (dimensions, format, content policy)
- Step 4: AWS S3 storage + async queue (SQS)
- Step 5: FFmpeg transcoding pipeline
- Step 6: ISRC + UPC assignment system
- Step 7: On-platform streaming player

**Phase 3: Distribution Engine (Tier 3)**
- Step 1: Register for DDEX Implementation Licence + get DPID
- Step 2: Build DDEX ERN 4.3 XML generator
- Step 3: Validate with DDEX online validator
- Step 4: DECISION — build SFTP pipeline OR integrate white-label (Revelator/AudioSalad)
- Step 5: Store delivery pipeline (start with easier stores: Deezer, Tidal)
- Step 6: Apply to Spotify/Apple/Amazon as content provider (START EARLY)
- Step 7: Delivery monitoring + retry logic

**Phase 4: Full Platform (Tier 4)**
- Step 1: Build royalty report ingestion (DDEX DSR + proprietary formats)
- Step 2: Royalty matching + calculation engine
- Step 3: Payment splitting logic + Stripe Connect integration
- Step 4: Analytics dashboard (per-track, per-territory, revenue)
- Step 5: Marketing tools (pre-save links, smart links, social cards)
- Step 6: Mobile app (React Native or Flutter)

---

## KEY CONTEXT FOR THE NEXT CONVERSATION

- Chad's working directory: `C:\Users\chad`
- Random project default location: `🪨🪨🪨🪨 Ran Plan Area` (inside Anti Gravity master folder)
- Python 3.12.10 at `C:\Users\chad\AppData\Local\Programs\Python\Python312\` — use `python` not `python3`, always `source ~/.bashrc` first
- Response format: ALWAYS use the Hub Color Stack box (see MEMORY.md)
- Tone: Hype Coach (Female) — high energy, excited, encouraging
- Cache buster: ALWAYS append `?v=$(date +%s)` when opening browser previews
- The c-railgun skill is live and registered — invoke with `/c-railgun`
- The curriculum HTML is the source of truth for the DSP build
- Both research .md files have the deep details the curriculum summarizes
