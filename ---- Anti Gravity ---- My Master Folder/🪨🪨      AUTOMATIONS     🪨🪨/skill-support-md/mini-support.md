---
filename: mini-support.md
purpose: Reference spine for /mini — holds every block the skill points to by § section name
parent skill: mini  (née c-warm-heart — thin-spine + support-md pattern)
---

# /mini — Support Reference

Dense reference doc. The skill file is a thin spine; this file is everything the spine points to. Each section is addressable by its § name (e.g., § INPUT_GRID).

The /mini philosophy: capture the SAME skill as the original — quicker, more efficient, ~half the tokens, same spirit. This file carries the weight so the spine stays light.

---

## § FOLDER_TREE

Automation folder (create if missing, skip silently otherwise):

```
C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS       🪨🪨\-- 🪨A8  -- --- Warm Heart Builder\
```

Inside it:

```
warm-heart-builder/
├── template/
│   └── index.html          (Mike Is A Blessing — standard template)
└── builds/
    └── (per-person folders go here)
```

---

## § TEMPLATE_FEATURES

Baked into `template/index.html`:
- Page 1 — interactive centerpiece (music box default, swappable)
- Page 1 — tap-to-reveal tile grid (3–6 tiles)
- Page 1 — decorative revival motif at bottom (sky lanterns drift)
- Page 2 — verbatim sourced quote cards
- Page 2 — hard facts strip (primary sources)
- Page 2 — famous voices ribbon
- Page 2 — celebrity voices carousel (gated — see § CAROUSEL_SPEC)
- Click-anywhere SOURCE BANNER (top-right, fade in/out 3s)
- Ashes→Gold theme baked in, one-CSS-block swap (see § THEME_ASHES_TO_GOLD)

First completed /mini run (Mike's build) writes this template. Subsequent runs copy from it. Never modify during a per-person build.

---

## § THEME_ASHES_TO_GOLD

Default visual theme = "Ashes to Gold." Single CSS block swap for variants. Palette is dark-warm base → gold accents on interaction; motion is slow, reverent, unrushed. Centerpiece glow intensifies on reveal. Page 2 quote cards sit on near-black with gold rule lines. Override by editing one `:root` CSS block — no structural HTML changes required.

---

## § INPUT_GRID

Emit VERBATIM at Step 2. No AskUserQuestion. Let Chad type freely in any order.

```
╔══════════════════════════════════════════════════════════╗
║   /mini                                                  ║
║   the skill that wraps someone in evidence-backed love   ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  WHAT'S IN THE TEMPLATE (Mike standard, ready to go)     ║
║   ● Page 1 — interactive centerpiece + tap-reveal tiles  ║
║   ● Page 1 — revival moment at bottom (lanterns drift)   ║
║   ● Page 2 — verbatim sourced quote cards                ║
║   ● Page 2 — hard facts strip (primary sources only)     ║
║   ● Page 2 — famous voices ribbon                        ║
║   ● Click-anywhere SOURCE BANNER (top-right fade)        ║
║   ● Ashes→Gold theme baked in                            ║
║                                                          ║
║  WHAT THIS SKILL DOES                                    ║
║   1. You dump facts about the person                     ║
║   2. I auto-fill the 4-bucket menu                       ║
║   3. I find the "soul ache" (what hurts them most)       ║
║   4. 3 research agents pull VERBATIM sources that        ║
║      correct the ache                                    ║
║   5. Build + preview a 2-page app, no paraphrase allowed ║
║                                                          ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ┌────────────────────────┬────────────────────────┐     ║
║  │ ①  WHO IS THIS FOR?    │ ②  TELL ME ABOUT THEM  │     ║
║  │ name / nickname /      │ one blob — age, traits │     ║
║  │ handle                 │ vibes, loves, where    │     ║
║  │                        │ from, anything to know │     ║
║  │ →                      │ →                      │     ║
║  ├────────────────────────┼────────────────────────┤     ║
║  │ ③  WHAT HURTS THEM?    │ ④  THEME               │     ║
║  │ the one thing they're  │ optional — or say      │     ║
║  │ sad or insecure about  │ "you pick"             │     ║
║  │ → becomes Page 2       │                        │     ║
║  │   thesis + research    │                        │     ║
║  │ →                      │ →                      │     ║
║  └────────────────────────┴────────────────────────┘     ║
║                                                          ║
║  No interactive menu — just type answers in any order.   ║
║  I match them to boxes and fill the rest.                ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## § THESIS_EXAMPLES

Frame Page 2 thesis as a CORRECTION, not a topic:
- Ache: "autistic, worried won't find love" → Thesis: "autistic people build deeper, more loyal love than most. here is the proof."
- Ache: "stutter, worried about music career" → Thesis: "stutter is a signature the industry searches for, not a flaw."
- Ache: "introvert, worried about standing out" → Thesis: "quiet people shape culture more than loud ones. here's how."

---

## § RESEARCH_HARD_RULES

Passed verbatim to SA-A, SA-B, SA-C. Non-negotiable:
- VERBATIM ONLY — zero paraphrase
- Every quote must have: author, role, publication, year, verified source URL
- If URL can't be verified via WebFetch/WebSearch → DROP the quote
- Never fabricate
- Prefer primary sources (.gov, .edu, peer-reviewed, official foundations)
- Celebrity carousel quotes must clear § CAROUSEL_GATE (SA-C only). Any celebrity whose quote can't be verified on a gate tier → dropped entirely. Zero pass → carousel hides.

Each agent returns strict JSON. Main thread waits for all 3.

---

## § CAROUSEL_SPEC

Page 2 component. Horizontal scroll carousel. Sits BELOW famous-voices ribbon, ABOVE facts strip. Surfaces celebrity voices publicly outspoken on the same ache.

**Layout:**
- One card visible at a time, horizontal scroll-snap
- Arrow nav (left/right) + dot indicators below
- Each card: circular photo placeholder (initials fallback if no photo) + name + role/title + verbatim quote + outlet + year + clickable source link
- Smooth CSS scroll-snap, touch-friendly

**Source banner wiring:**
Each card has `data-source="<full URL>"` and `data-outlet="<outlet name>"` so clicking fires the top-right source banner fade (same pattern as quote cards).

**Fallback:**
Zero celebrities clear the gate → carousel hides itself completely.
JS check: `if (carousel.children.length === 0) carousel.parentElement.style.display = 'none'`

---

## § CAROUSEL_GATE

HARD source-tier gate (non-negotiable). A celebrity's quote only makes the carousel if its source URL lives on ONE of these tiers:

  ✓ Academic publication (.edu / peer-reviewed journal)
  ✓ Mainstream outlet (NYT, BBC, Washington Post, People, Rolling Stone, Vogue, Time, Guardian, AP, Reuters, CNN, NBC, etc.)
  ✓ Reputable blog (official foundation, verified org site, artist's own verified site, Tommy's, RAINN, Postpartum Support Int'l, etc.)
  ✗ Anything else (unverified fan blog, aggregator with no primary link, random Tumblr) → DROP the celebrity entirely. No exceptions.

---

## § NETLIFY_DEPLOY

After preview, push the build to Netlify as a **NEW site**. Never reuse an existing deploy on a first GO — every new person gets their own fresh URL.

**Site naming (practical):**
- Format: `<name-lowercase>-warm-heart` (e.g., `mythical-warm-heart`, `mike-is-a-blessing`)
- Collision → append 3-letter random: `alex-warm-heart-kxp`
- Lowercase only, hyphens only, no spaces or unicode

**Deploy flow:**
1. From the per-person build folder `builds/<name-lowercase>-app/`
2. `netlify deploy --prod --dir . --site <site-name>` (create first via `netlify sites:create --name <site-name>` if missing)
3. Capture the returned live URL
4. Open the live URL in Chrome (new tab, cache-busted)

**Hard rule — first GO = NEW site:**
- Never deploy a first-run warm-heart app to an existing Netlify site
- If a site with the derived name already exists, append suffix and create fresh
- Only redeploys to existing site when Chad explicitly says "redeploy to existing" or names the target site

**Report back to Chad — final output box:**
- Local preview path
- Live Netlify URL
- Site name used
- Deploy status (success / error)

---

## § HARD_RULES

Spine-level. Enforced on every fire:

- Zero paraphrase on Page 2 — ever
- Every source URL must verify — no fabrication
- Template is source of truth — never modify `template/index.html` during a per-person build
- Per-person builds always go in their own folder under `builds/`
- Auto-infer EVERYTHING Chad didn't specify (emojis, motion, layout, theme CSS) — don't ask unless blocked
- If the person has no ache specified, skip Page 2 entirely — don't invent suffering
- First GO on a person = fresh Netlify site, always. Never deploy the first run to an existing site
- Site naming is practical: `<name-lowercase>-warm-heart` — no generic names, no throwaway hashes unless collision forces it

---

_End of support reference. Skill points here by § name — edit in place._
