# LENORE ASHWORTH — EPK Landing Page
## Design Spec: Curtain-Panel Interaction Prototype

---

## 1. Interaction Pattern (Plain Language)

The landing page is a **single theatrical stage**. A Victorian portrait of the artist dominates the center and never moves — it is the visual anchor of the entire experience.

The left third and right third of the screen are invisible **click zones** (stage wings). When the user moves the pointer over either wing, a velvet curtain **peeks in from the edge**, a label appears vertically in candlelight gold (`MUSIC & DISCOGRAPHY` on the left, `BIO & PRESS` on the right), and a soft amber shimmer lights the outer edge. This tells the user: *something is behind this curtain, click me.*

Clicking a wing raises a full-height **panel from the bottom of that side** (like a stage wing rising from beneath the floor). The panel carries that section's content — tracklist on the left, bio + press quotes on the right.

**Key UX commitment: the two panels are MUTUALLY EXCLUSIVE.** Opening one automatically closes the other. This decision is deliberate:
- The portrait should never be flanked by two competing walls of content at once.
- The curtain metaphor breaks if both sides rise simultaneously — it becomes a drawer, not a stage.
- The user's attention is guided, not split.

Panels close via:
- Clicking the same wing again
- Clicking the ornate filigree close button (×) inside the panel
- Pressing `ESC`
- Opening the opposite panel (it closes the first automatically)

---

## 2. Animation Timings + Easing Curves

| Element                          | Duration | Easing                              | Why                                           |
|----------------------------------|----------|-------------------------------------|-----------------------------------------------|
| Panel rise/fall                  | **820ms**| `cubic-bezier(.22, .8, .2, 1)`      | Heavy lift that settles — feels weighted like a real curtain. Not snappy. |
| Panel inner content fade-in      | 600ms (delay 350ms) | `ease`                  | Content unveils AFTER the curtain is mostly up. Two-stage reveal. |
| Zone curtain hover-in            | 420ms    | `cubic-bezier(.22, .8, .2, 1)`      | Quick enough to feel responsive, slow enough to feel fabric-like. |
| Zone hint label fade             | 420ms    | same                                | Matches curtain so they move as one unit.     |
| Close button rotation on hover   | 420ms    | same                                | 90deg spin on the × — a subtle flourish.      |
| Candle-cursor follow             | rAF loop, 22% easing | linear per-frame         | Trailing lag makes the flame feel like it has mass. |
| Candle flicker (ambient)         | 3.2s infinite | `ease-in-out` alternate        | Irregular opacity/scale keyframes mimic a real flame. |
| Film grain shift                 | 900ms infinite | `steps(4)`                    | Stepped motion reads as old-film grain, not smooth noise. |
| Portrait entrance                | 1800ms (delay 400ms) | `cubic-bezier(.22, .8, .2, 1)` | Blurred → focused, faded → visible. "The séance begins." |

The primary easing `cubic-bezier(.22, .8, .2, 1)` is used everywhere the curtain metaphor applies. It starts fast, slows dramatically — the exact feel of a heavy velvet drape settling into place.

---

## 3. Hover Affordances + Rationale

Each click zone communicates clickability through **four layered cues** (you don't need all four to understand — each one catches a different user):

1. **Velvet curtain peek** — a gradient strip of bruised violet + blood crimson slides in from the edge, with repeating vertical pleats etched into it. Even at 10% opacity this reads as fabric, not UI chrome.
2. **Candlelight edge shimmer** — a 1px vertical line of amber gradient glows along the extreme outer edge. Catches the eye in peripheral vision.
3. **Vertical text label** — `MUSIC` / `BIO` in Cinzel Decorative at 0.6em letter-spacing, with a subheader (`& DISCOGRAPHY`) below. Rendered vertically with `writing-mode: vertical-rl` so it reads naturally along the curtain edge.
4. **Animated chevron** — a small `◂` / `▸` pulses once every 1.6 seconds. This is the lowest-friction "click here" affordance without breaking the aesthetic.

Why four and not one? Because the goth/cinematic aesthetic hides UI on purpose. We're fighting the risk of users thinking the page is a static splash. The layered hover affordance says "this is interactive" without a single modern button or chrome element appearing on the initial view.

The custom candle-flame cursor also swells when hovering interactive zones — it's the fifth, subtlest cue.

---

## 4. Mobile Scaling (< 768px)

Desktop side-zone interactions don't translate to narrow touch screens — there isn't enough horizontal real estate, and nobody expects to tap the edge of a phone. So the pattern **rotates 90°** on mobile:

- **Click zones become top and bottom edge toggles**. Two pill-shaped ornate buttons (`I. MUSIC` at top, `II. BIO` at bottom) sit at the screen edges with fleur-de-lis flourishes.
- **Panels slide in vertically**: the Music panel drops from the top, the Bio panel rises from the bottom. Each fills 85vh so the portrait remains peeking through.
- **Portrait remains anchored** in the visible center, just smaller (85vw width).
- **Custom cursor is disabled** — uses default touch behavior.
- **Ornate frame corners and fleurs shrink** proportionally so they don't overwhelm a 360px viewport.
- **Mutual exclusion is preserved** — tapping one toggle closes the other.

Chose vertical slide over a hamburger menu because:
- Hamburger = generic modern app pattern. Would shatter the EPK universe.
- Vertical slide keeps the curtain metaphor (now it's a top curtain and a bottom curtain instead of two side wings).
- Users always see the portrait, which is the whole point of an EPK landing.

---

## 5. Next Steps — Integrating Into the Full 4-Page EPK

This prototype is **page 1 of 4** (Landing). Here is the recommended integration path:

### Immediate hardening
1. **Replace SVG portrait with real hero photography** — commission a low-key-lit, color-graded portrait in the `#0a0608 / #d4a574 / #5c0a14` palette. Keep aspect ratio at 3:4.
2. **Wire real audio previews** on the Music panel play buttons. A 30-second loop with fade-in/out will feel authentic to the aesthetic.
3. **Swap placeholder panel content** for the real discography JSON feed (so updates don't require HTML edits).
4. **Add Open Graph + Twitter Card meta** with a crimson-tinted social-preview crop.

### Pages 2–4 expansion
The curtain-panel pattern is a **landing-only gesture**. Once the user taps into Music or Bio, they should transition into full pages:
- **Page 2 — Music**: Full discography grid with album artwork, track lists, streaming links. The curtain pattern dissolves into a classical letterpress album index.
- **Page 3 — Bio & Press**: Long-form narrative bio with period-appropriate pull quotes, a press clip gallery, and high-res photo downloads.
- **Page 4 — Contact / Booking**: A gilded visiting-card layout with management contact, booking agent, and a short "book this performance" form (ornate borders around form fields — treat each input as if it's being written on parchment).

Recommend threading the shared design tokens (`style.css` `:root` variables) into a single imported `tokens.css` so all 4 pages stay chromatically locked.

### Performance / production notes
- Inline-SVG portrait should be swapped for a `<picture>` with WebP + AVIF fallbacks.
- Google Fonts should be self-hosted for speed and GDPR cleanliness.
- Film grain SVG noise is currently data-URI — fine at this scale, but consider a 200×200 PNG for sub-100ms initial paint.
- Add `prefers-reduced-motion` handling (already scaffolded in CSS) — verify the curtain still opens at 200ms for motion-sensitive users.

### Analytics hooks
Instrument `openLeft` / `openRight` / `closeLeft` / `closeRight` with a small analytics callback so the label can see which side (Music vs. Bio) gets more engagement. That insight tells the real EPK content strategy where to invest next.

---

## Palette reference (in CSS variables)

```
--ink-black:      #0a0608
--ink-black-2:    #14080f
--candle-amber:   #d4a574
--candle-glow:    #fff6d9
--blood-crimson:  #5c0a14
--antique-gold:   #8b6f3f
--bruised-violet: #2a1530
--parchment:      #f0e6d2
```

## Typography reference

- **Body**: Cormorant Garamond (300, 400, 500, 600, italic)
- **Display**: Cinzel Decorative (400, 700, 900)
- **Subhead**: Italiana (400)
- **Accent**: UnifrakturCook (700) — held in reserve for Page 2/3 drop caps

---

*End of spec.*
