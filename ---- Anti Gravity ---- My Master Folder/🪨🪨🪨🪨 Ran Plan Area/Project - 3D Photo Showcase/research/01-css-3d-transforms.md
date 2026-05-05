# 01 — CSS 3D Transforms for the Photo Showcase

## Intro

This doc distills modern CSS 3D transform techniques into a buildable recipe
for the Photo Showcase app. The target feel is "iPad Cover Flow" — large 16:9
tiles that tilt toward the cursor, with a razor-thin yellow border, a dark
gradient card surface, and palpable depth between the background and the tile
face.

Three real production patterns were reviewed:

1. **Armando Canals — mouse-tracked perspective rotation** (vanilla JS + CSS)
2. **Let's Build UI — 3D hover card with parallax content** (production article)
3. **Polypane — curated 3D card gallery** (perspective + preserve-3d layering)

All three converge on the same four-property core: `perspective` on the parent,
`transform-style: preserve-3d` on the card, `rotateX/rotateY` driven by mouse
math, and `translateZ` to push inner layers forward.

## Key Technique

The illusion of depth requires **separating the camera from the stage from the
actors**:

- **Camera** = `perspective` on the *parent* grid. Smaller value (400–800px) =
  more dramatic fisheye. Larger (1000–1600px) = cinematic, subtle.
- **Stage** = the tile itself with `transform-style: preserve-3d`. This tells
  the browser to keep children in real 3D space instead of flattening them.
- **Actors** = inner layers (image, title, border glow) each given their own
  `translateZ()` so they float at different depths.
- **Motion** = a `mousemove` listener maps the cursor's position inside the
  tile to `rotateY` (horizontal) and `rotateX` (vertical), with the vertical
  axis *negated* so the card tilts *toward* the cursor (natural feel).

Add `will-change: transform` and a short `transition` (100–150ms) so the
tilt feels responsive but not rubbery.

## Code Snippet (working)

```html
<div class="showcase-grid">
  <article class="tile" data-tilt>
    <div class="tile-surface">
      <img class="tile-photo" src="..." alt="">
      <div class="tile-caption">
        <h3>Photo Title</h3>
        <span>Subtitle</span>
      </div>
    </div>
  </article>
  <!-- repeat tiles -->
</div>
```

```css
.showcase-grid {
  perspective: 1400px;            /* camera distance — cinematic */
  perspective-origin: 50% 40%;    /* slight top-bias feels premium */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(520px, 1fr));
  gap: 48px;
  padding: 64px;
  background: radial-gradient(ellipse at top, #1a1a20 0%, #05050a 70%);
}

.tile {
  aspect-ratio: 16 / 9;           /* large 16:9 card sizing */
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1400px) rotateX(0) rotateY(0);
  transition: transform 140ms ease-out, box-shadow 240ms ease-out;
  will-change: transform;
  border-radius: 14px;

  /* razor-thin yellow border */
  border: 1px solid rgba(250, 204, 21, 0.85);
  box-shadow:
    0 1px 0 rgba(250, 204, 21, 0.25) inset,
    0 30px 60px -20px rgba(0, 0, 0, 0.7),
    0 12px 24px -12px rgba(0, 0, 0, 0.5);
}

.tile-surface {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  /* dark gradient card surface */
  background:
    linear-gradient(160deg, #15151c 0%, #0a0a10 55%, #05050a 100%);
  transform: translateZ(0);       /* own compositor layer */
}

.tile-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
  transform: translateZ(20px);    /* photo floats above surface */
  transition: transform 200ms ease-out;
}

.tile-caption {
  position: absolute;
  left: 24px;
  bottom: 20px;
  color: #f5f5f7;
  transform: translateZ(60px);    /* caption floats highest */
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
}

.tile:hover .tile-photo { transform: translateZ(32px) scale(1.03); }

@media (prefers-reduced-motion: reduce) {
  .tile { transition: none; transform: none !important; }
}
```

```javascript
// Mouse-tracked tilt — applied per-tile, not globally
const TILT_MAX = 10;              // degrees at the edge
const LIFT = 18;                  // px the card lifts toward camera

document.querySelectorAll('[data-tilt]').forEach(tile => {
  tile.addEventListener('mousemove', (e) => {
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;   // 0..1
    const y = (e.clientY - r.top)  / r.height;  // 0..1

    const rotateY = (x - 0.5) *  TILT_MAX * 2;  // left/right
    const rotateX = (y - 0.5) * -TILT_MAX * 2;  // up/down (negated)

    tile.style.transform =
      `perspective(1400px) ` +
      `rotateX(${rotateX.toFixed(2)}deg) ` +
      `rotateY(${rotateY.toFixed(2)}deg) ` +
      `translateZ(${LIFT}px)`;
  });

  tile.addEventListener('mouseleave', () => {
    tile.style.transform =
      'perspective(1400px) rotateX(0) rotateY(0) translateZ(0)';
  });
});
```

## Why it feels 3D

Four cues stack to trick the eye:

1. **Parallax between layers** — `translateZ` on the photo and caption means
   when the card tilts, inner layers visibly slide relative to the frame. The
   brain reads this as genuine depth, not a CSS trick.
2. **Perspective foreshortening** — the `perspective` value on the grid makes
   the far edge of a tilted tile actually shrink on screen. A flat `skew`
   can't do this.
3. **Cursor-anchored rotation** — the card rotates *toward* the pointer, so it
   feels like the viewer is tipping a physical object, not scrubbing a slider.
4. **Contrast lighting via shadow + yellow hairline** — the 1px yellow border
   catches ambient "light" on the lifted edge, and the long offset shadow
   anchors the card to the dark ground plane. Remove either and the illusion
   collapses to a flat rectangle.

The dark gradient surface is critical: a flat fill reveals that the tile is
just a plane. A 160deg gradient from #15151c to #05050a reads as a slightly
reflective matte, which the eye accepts as a real surface.

## Tile / Nav pattern recommendations

- **Grid** — use CSS Grid with `auto-fit, minmax(520px, 1fr)` so tiles stay
  generous on wide screens and reflow cleanly below ~1100px. Put `perspective`
  on the **grid**, not the tile, so sibling tiles share one vanishing point
  and tilt in a consistent world.
- **Neighbor feedback** — when one tile is hovered, subtly push siblings back
  with `transform: translateZ(-4px); opacity: 0.85;` via a parent `:has()`
  selector. This adds Cover Flow "focus" without JS.
- **Keyboard nav** — give each tile `tabindex="0"` and replicate the tilt on
  `:focus-visible` with a fixed tilt (e.g. `rotateX(-4deg) rotateY(4deg)
  translateZ(18px)`) so keyboard users get the same depth language.
- **Click / open** — on click, transition the tile to
  `rotateX(0) rotateY(0) translateZ(80px) scale(1.04)` before routing. The
  tile feels like it *rises toward* the viewer before the next view loads.
- **Don't over-tilt** — cap `TILT_MAX` at 10–12deg. Beyond that, the photo
  starts to feel like a cheap flip effect and text distortion becomes
  readable.
- **Throttle** — `mousemove` fires 60+ times/sec. Wrap the handler in
  `requestAnimationFrame` if you add more inner layers or filters.
- **Always respect `prefers-reduced-motion`** — kill the transform entirely.
  The yellow border + gradient still reads as a premium card without motion.

## References

- Armando Canals — *Rotating a 3D object with perspective based on mouse
  position*. Core math for mapping cursor → rotation angles.
  https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html
- Let's Build UI — *A 3D Hover Effect Using CSS Transforms*. Production
  article with `preserve-3d`, inner-layer `translateZ`, and reduced-motion
  handling. https://www.letsbuildui.dev/articles/a-3d-hover-effect-using-css-transforms/
- Polypane — *Beautiful CSS 3D Transform Perspective Examples*. Curated
  gallery covering nav/card patterns with perspective + preserve-3d layering.
  https://polypane.app/css-3d-transform-examples/
- David DeSandro — *Intro to CSS 3D transforms: Perspective*. Canonical
  explainer for perspective-origin and preserve-3d semantics.
  https://3dtransforms.desandro.com/perspective
- Addy Osmani — *Cover Flow with Modern CSS: Scroll-Driven Animations*.
  Modern take on Apple's Cover Flow using scroll-snap + scroll-driven
  animations — useful if the showcase gains a horizontal carousel mode.
  https://addyosmani.com/blog/coverflow/
- vanilla-tilt.js — production-tested library if you'd rather not hand-roll
  the mousemove math. https://micku7zu.github.io/vanilla-tilt.js/
