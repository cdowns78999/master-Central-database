# Trailer Iterations Log

## Original Step Plan — 19 Steps

### Scene 1: Intro (Logo Reveal — 5s cinematic starfield)
| # | Step | Tool | Est. Time |
|---|------|------|-----------|
| 1 | Design/export logo asset (PNG w/ transparency) | Canva or existing file | 5 min |
| 2 | Generate starfield video background (cinematic star pan, 5s) | Veo | 3 min |
| 3 | Composite logo over starfield (overlay + fade-in animation) | Pika | 5 min |
| 4 | Record narration intro line | Nano | 2 min |
| 5 | Sync narration audio to logo reveal timing | Pika (timeline editor) | 5 min |
| 6 | Design match-moment frame (last frame = exact border position for Scene 2 cut) | Manual screenshot + CSS overlay | 10 min |
| 7 | Export Scene 1 as final video clip (5s, 1080p) | Pika export | 2 min |

### Scene 2: Screenshare Content (HTML page walkthrough)
| # | Step | Tool | Est. Time |
|---|------|------|-----------|
| 8 | Build the HTML page to screenshare (cal-card as base) | Claude Code | 10 min |
| 9 | Create master copy + backup copy of HTML | Terminal `cp` command | 1 min |
| 10 | Polish page layout with GenSpark inspiration | GenSpark | 5 min |
| 11 | Screen-record the HTML page walkthrough | Chrome ext (Loom / Screen Recorder) | 3 min |
| 12 | Record walkthrough voiceover narration | Nano | 3 min |
| 13 | Edit screen recording (transitions, cuts, trim) | Pika | 5 min |
| 14 | Export Scene 2 as final video clip | Pika export | 2 min |

### Scene 3: TBD
| # | Step | Tool | Est. Time |
|---|------|------|-----------|
| 15 | Define Scene 3 intent/content (user decision) | AskUser | 2 min |
| 16 | Generate Scene 3 visuals | Veo | 3 min |
| 17 | Record Scene 3 voiceover | Nano | 2 min |

### Scene 4: Outro + Final Assembly
| # | Step | Tool | Est. Time |
|---|------|------|-----------|
| 18 | Generate outro visuals/animation | GenSpark | 5 min |
| 19 | Final assembly — stitch all 4 scenes into one trailer | Pika (multi-clip timeline) | 10 min |

**Total: 19 steps · ~83 min estimated**

---

## Iteration 1 — 2026-02-25

### Here's what I want to do:
Look at the 19 steps and find anything that can be combined, eliminated, or swapped for a lighter tool. First pass — focus on obvious merges and redundant steps.

### Changes Made:

1. **COMBINE Steps 2+3** → Veo can generate a starfield WITH a logo overlay in one prompt. No need for separate composite step. → **1 step saved**

2. **COMBINE Steps 4+5** → Record narration directly onto the timeline in Pika instead of recording separately then syncing. Or better: Nano exports with timing metadata, Pika auto-aligns. → **1 step saved**

3. **ELIMINATE Step 6** → The match-moment frame doesn't need a manual screenshot + CSS overlay. Instead, set Pika's export to freeze on last frame, and design Scene 2's HTML to START at that exact viewport position. The "match" is baked into the HTML design, not a separate production step. → **1 step saved**

4. **COMBINE Steps 11+12** → Screen-record WITH voiceover simultaneously using a Chrome extension that captures mic + screen (like Loom). No separate VO recording needed for Scene 2. → **1 step saved**

5. **COMBINE Steps 13+14** → Edit and export in one Pika session, not two steps. → **1 step saved**

6. **ELIMINATE Step 10** → GenSpark "inspiration" is vague. The HTML page is already being built by Claude Code (step 8). Skip the separate design inspiration step — just build it right the first time. → **1 step saved**

7. **COMBINE Steps 16+17** → Once Scene 3 intent is defined, generate visuals and record VO in one session. → **1 step saved**

### Updated Plan After Iteration 1:

| # | Step | Tool | Notes |
|---|------|------|-------|
| 1 | Export logo asset | Canva / existing | Quick grab |
| 2 | Generate starfield + logo composite (5s) | Veo | One prompt: "starfield pan with logo reveal" |
| 3 | Record + sync narration onto starfield clip | Nano → Pika | Nano records, Pika auto-places |
| 4 | Export Scene 1 clip (freeze last frame for match-moment) | Pika | Last frame = Scene 2 viewport match |
| 5 | Build screenshare HTML page (cal-card base, match Scene 1 frame) | Claude Code | Bake match-moment into CSS |
| 6 | Create master + backup copies | Terminal `cp` | One command |
| 7 | Screen-record HTML walkthrough WITH live voiceover | Loom (Chrome ext) | Mic + screen capture simultaneously |
| 8 | Edit + export Scene 2 clip | Pika | Trim, transitions, export in one go |
| 9 | Define Scene 3 intent | User decision | Quick alignment |
| 10 | Generate Scene 3 visuals + record VO | Veo + Nano | Parallel: visuals generating while recording VO |
| 11 | Generate outro animation | GenSpark | Outro card/animation |
| 12 | Final assembly — stitch all scenes | Pika | 4-clip timeline, export |

- Steps before: **19**
- Steps after: **12**
- Saved: **7 steps**
- Tools used: Veo, Nano, Pika, Claude Code, Loom (Chrome ext), GenSpark, Terminal
- Status: First pass — obvious merges done, redundancies cut

---

## Iteration 2 — 2026-02-25

### Here's what I want to do:
Re-read the 12-step plan from Iteration 1. This time: look for batch operations, parallel workflows, chrome extension combos that eliminate manual handoffs, and any steps that are actually the same action disguised as two things.

### Changes Made:

1. **BATCH Steps 1+2** → Logo asset + starfield generation can happen in parallel. While Veo renders the starfield, you grab the logo. These aren't sequential — fire both at once. But even better: if the logo is already on file (it usually is), **eliminate Step 1 entirely**. Just reference the existing logo PNG in the Veo prompt. → **1 step saved**

2. **COMBINE Steps 3+4 into Step 2** → Nano records narration. Pika places it on the Veo clip AND exports — that's one Pika session, not two separate steps (record→sync is one, export is another). Collapse to: "Add narration + export Scene 1" as a single Pika action. → **1 step saved**

3. **ELIMINATE Step 6 (backup copies)** → Terminal `cp` for master+backup is paranoid overhead at this stage. The HTML is in git-tracked Desktop. If you really want a backup, Claude Code can do `cp` inside the same step that builds the HTML (step 5). Not its own step. → **1 step saved**

4. **PARALLEL Steps 7+10** → While Loom records your Scene 2 walkthrough, Veo can be generating Scene 3 visuals in another tab. These are completely independent. Run them at the same time. Not a step reduction, but a **time reduction** — 2 steps happen simultaneously.

5. **COMBINE Steps 9+10** → "Define Scene 3 intent" and "Generate Scene 3 visuals + VO" are really one creative session. You decide what it is AND generate it in the same sitting. → **1 step saved**

6. **SWAP Step 11 tool** → GenSpark for outro is overkill. The outro is just a closing card (logo + text + maybe a subtle animation). Claude Code can generate an HTML outro card, screen-capture it with a Chrome extension (GoFullPage), and Pika adds a 2s fade. Lighter than spinning up GenSpark. → **Tool swap** (GenSpark → Claude Code + Chrome ext)

### Updated Plan After Iteration 2:

| # | Step | Tool | Notes |
|---|------|------|-------|
| 1 | Generate starfield + logo composite (5s) — logo from existing file | Veo | One prompt, reference existing logo |
| 2 | Add narration + export Scene 1 (freeze last frame) | Nano → Pika | Record VO, place on clip, export — one session |
| 3 | Build screenshare HTML (cal-card base, match-moment baked in, backup in same step) | Claude Code + Terminal | Build + `cp` backup in one command chain |
| 4 | Screen-record HTML walkthrough with live VO | Loom (Chrome ext) | ‖ PARALLEL with Step 5 |
| 5 | Define Scene 3 + generate visuals + record VO | Veo + Nano | ‖ PARALLEL with Step 4 — one creative session |
| 6 | Edit + export Scene 2 clip | Pika | Trim Loom recording |
| 7 | Build outro card HTML + screenshot | Claude Code + GoFullPage (Chrome ext) | Lighter than GenSpark |
| 8 | Final assembly — stitch all scenes + outro fade | Pika | 4-clip timeline, export |

- Steps before: **12**
- Steps after: **8**
- Saved: **4 steps** (+ parallel time savings on Steps 4/5)
- Tools used: Veo, Nano, Pika, Claude Code, Loom, GoFullPage, Terminal
- Status: Second pass — batch ops, parallel workflows, tool downgrades applied

---

## Iteration 3 — 2026-02-25 (Final)

### Here's what I want to do:
This is the final squeeze. Look at the 8-step plan and ask: can Make.com automate any multi-step handoff? Can terminal scripts batch anything? Can we get this under 7 steps? Also: is the tool mix actually right, or am I carrying tools I don't need?

### Changes Made:

1. **COMBINE Steps 1+2 into a single "Scene 1 Production" block** → Here's the insight: Veo generates the starfield+logo clip. Then you open Pika ONCE, drop in the Veo output, add the Nano VO, set the last-frame freeze, and export. That's one Pika session covering what was 2 steps. The "Nano record" happens before you open Pika (just record a 3-second intro line into your mic via Nano's web UI). Then Pika = import clip + import audio + export. → **1 step saved**

2. **COMBINE Steps 3+7 (HTML builds)** → You're building TWO HTML pages in separate steps (screenshare page + outro card). Build them both in one Claude Code session. One prompt: "build the screenshare HTML AND the outro card HTML." Save both files, `cp` backup. Done. → **1 step saved**

3. **Make.com consideration** → Looked at whether Make.com could automate the Veo→Pika→export pipeline. Verdict: **No.** Veo and Pika don't have public Make.com integrations yet. The handoff is manual (download from Veo, upload to Pika). Make.com would only help if we were chaining APIs, and these are GUI tools. **Keep it manual — it's faster for a one-off trailer.**

4. **Terminal batch script for file management** → Instead of scattered `cp` commands, write one `.sh` script that: creates the project folder structure, copies backups, and organizes exports. Run once at the start. → **Not a step reduction, but cleaner execution**

5. **PARALLEL optimization** → Steps 4+5 were already parallel. Now with the HTML builds combined (Step 2), the timeline is even tighter. The new parallel window: while Pika processes Scene 1 export (Step 1), you can be screen-recording the HTML walkthrough (Step 3). Two parallel tracks throughout.

### Final Optimized Plan:

| # | Step | Tool | Time | Notes |
|---|------|------|------|-------|
| 1 | **Scene 1 Production** — Veo starfield+logo → Nano VO → Pika import+sync+freeze-frame+export | Veo → Nano → Pika | ~8 min | One continuous flow |
| 2 | **Build all HTML** — screenshare page (cal-card base, match-moment CSS) + outro card. Backup copies via terminal. | Claude Code + Terminal | ~12 min | Both pages in one session |
| 3 | **Scene 2 Production** — Loom screen-record HTML walkthrough with live VO → Pika trim+transitions+export | Loom → Pika | ~8 min | ‖ Can start while Step 1 Pika exports |
| 4 | **Scene 3 Production** — Define intent → Veo visuals → Nano VO | Veo + Nano | ~5 min | ‖ PARALLEL with Step 3 |
| 5 | **Scene 4 Production** — GoFullPage screenshot of outro HTML → Pika 2s fade animation | GoFullPage → Pika | ~3 min | Quick — it's just a card |
| 6 | **Final Assembly** — Import all 4 scene clips into Pika → stitch → add transitions → export final trailer | Pika | ~10 min | One timeline session |

- Steps before: **8**
- Steps after: **6**
- Saved: **2 steps**
- Total reduction: **19 → 12 → 8 → 6** (13 steps eliminated, 68% reduction)
- Estimated time: **~46 min** (down from ~83 min original, 45% time savings)
- Parallel tracks: Steps 3+4 run simultaneously, Step 1 Pika export overlaps with Step 2 start
- Tools final: Veo, Nano, Pika, Claude Code, Loom (Chrome ext), GoFullPage (Chrome ext), Terminal
- Make.com: **Not needed** — one-off trailer doesn't justify automation setup
- Status: Final plan — lean, practical, no wasted motion

---

## Summary

| Iteration | Steps | Saved | Key Move |
|-----------|-------|-------|----------|
| Original | 19 | — | Full production breakdown |
| Iteration 1 | 12 | 7 | Combined obvious merges, eliminated redundancies |
| Iteration 2 | 8 | 4 | Batch ops, parallel workflows, tool downgrades |
| Iteration 3 | 6 | 2 | Grouped by scene, combined HTML builds, squeezed final handoffs |
| **Total** | **6** | **13** | **68% step reduction, 45% time savings** |
