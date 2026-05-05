# 04 — Spring Physics Drag + Skew Tile Interactions

## Intro

The "Apple TV poster" / modern motion.dev feel on a draggable tile comes from four physics layers stacked on top of each other:

1. Pointer-driven translate (you're moving it, 1:1)
2. Inertia on release (velocity decay with a spring tail)
3. Velocity-derived skew (tiles "lean" into motion, then snap back)
4. Elastic edge resistance (rubber-band past constraints, spring back in)

Add snap-to-position at the end of inertia and you get a carousel that feels physical rather than scripted. The best production stack for vanilla JS is **GSAP Draggable + InertiaPlugin** (battle-tested, widely shipped). Motion One (motion.dev's vanilla build) is the lightweight alternative — smaller bundle, cleaner API, slightly less control over inertia snap.

## Key Technique

The core trick is **velocity-to-skew mapping** with a **clamped lerp**:

- Track live pointer velocity (px/sec) during drag via `InertiaPlugin.track()` on a proxy object (not the DOM node directly — proxies let you read velocity without dragging visible properties).
- Map that velocity through a clamp (e.g. `-40px/s → -10deg`, `+40px/s → +10deg`) so slow drags barely skew and flick gestures distort hard.
- Use `gsap.quickTo()` for skew updates in the RAF loop — it's a pre-compiled tween that's ~10× faster than `gsap.to()` per frame.
- On drag end / low velocity, lerp skew back to `0` with a soft spring (stiffness ~200, damping ~20).
- Snap lands on grid positions via Draggable's `snap` callback + InertiaPlugin's `end` array.
- Elastic edges: `edgeResistance: 0.65` inside bounds, `0.85` at edges — higher = more rubber band.

Why it works: human perception of physical objects expects shear under lateral force. The skew sells "weight." The spring return sells "elastic material." No 3D transforms required — skew alone is the illusion.

## Code Snippet (working)

Drop-in vanilla JS. Requires GSAP 3.12+ with Draggable and InertiaPlugin via CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/InertiaPlugin.min.js"></script>

<div class="rail">
  <div class="track">
    <!-- 16:9 tiles -->
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
  </div>
</div>

<style>
  :root { --accent: #ffd400; --bg: #0a0a0b; }
  body { background: var(--bg); margin: 0; overflow: hidden; }
  .rail { width: 100vw; height: 100vh; display: grid; place-items: center; overflow: hidden; }
  .track { display: flex; gap: 28px; cursor: grab; will-change: transform; }
  .track:active { cursor: grabbing; }
  .tile {
    flex: 0 0 auto;
    width: 480px; aspect-ratio: 16/9;
    background: linear-gradient(135deg, #111 0%, #1a1a1d 55%, #0a0a0b 100%);
    border-radius: 18px;
    border: 1px solid rgba(255,212,0,0.08);
    box-shadow:
      0 1px 0 rgba(255,212,0,0.35) inset,      /* razor-thin yellow top edge */
      0 30px 60px -20px rgba(0,0,0,0.9),
      0 0 0 0.5px rgba(255,212,0,0.25);
    will-change: transform;
    transform-origin: center center;
  }
</style>

<script>
gsap.registerPlugin(Draggable, InertiaPlugin);

const track = document.querySelector('.track');
const tiles = gsap.utils.toArray('.tile');
const TILE = 480 + 28;                                  // tile width + gap
const maxX = 0;
const minX = -(tiles.length - 1) * TILE;

// Proxy lets us track pointer velocity without moving the DOM directly.
const proxy = { x: 0 };
InertiaPlugin.track(proxy, 'x');

// quickTo = pre-compiled setter, RAF-friendly. Skew each tile cheaply.
const skewSetters = tiles.map(t => gsap.quickTo(t, 'skewX', {
  duration: 0.5,
  ease: 'power3.out'
}));

const clamp = gsap.utils.clamp(-12, 12);                // max skew degrees
const velToSkew = v => clamp(v / -60);                  // tune divisor for sensitivity

let raf;
function loop() {
  const v = InertiaPlugin.getVelocity(proxy, 'x') || 0;
  const s = velToSkew(v);
  skewSetters.forEach(set => set(s));
  raf = requestAnimationFrame(loop);
}

Draggable.create(track, {
  type: 'x',
  inertia: true,
  edgeResistance: 0.78,                                 // rubber-band feel
  bounds: { minX, maxX },
  snap: { x: v => Math.round(v / TILE) * TILE },        // snap to nearest tile
  onPress() { cancelAnimationFrame(raf); loop(); proxy.x = this.x; },
  onDrag()  { proxy.x = this.x; },
  onThrowUpdate() { proxy.x = this.x; },
  onRelease() { /* let inertia continue; loop keeps reading velocity */ },
  onThrowComplete() {
    cancelAnimationFrame(raf);
    skewSetters.forEach(set => set(0));                 // spring back to flat
  }
});
</script>
```

## Why it feels 3D

Skew is a 2D transform but it reads as depth because:

- **Parallax cue**: the leading edge appears to recede while the trailing edge pushes forward — the brain interprets this as rotation around a vertical axis.
- **Velocity coupling**: real objects shear under acceleration. Matching skew magnitude to drag speed (not position) reproduces the kinesthetic expectation.
- **Spring return**: a flick that overshoots then settles with an underdamped tail reads as "material with elasticity" — wood, plastic, a heavy poster — instead of "pixels on a grid."
- **Edge rubber-band**: hitting a constraint and seeing the tiles resist, then snap back, is the single strongest cue that they exist in a physical world. iOS list scrolling is built entirely on this one trick.
- **Dark gradient + razor yellow**: the thin `inset` yellow highlight on the top edge acts as a specular reflection. When tiles skew, that highlight appears to travel, which fakes a light source moving over a curved surface.

No `perspective`, no `rotateY`, no WebGL needed. Pure `transform: skewX()` + `translateX()` carries 90% of the feel.

## Tile / Nav Pattern Recommendations

**Sizing**
- 16:9 tiles at 420–520px wide on desktop, gap 24–32px. Aspect-ratio CSS keeps it honest across breakpoints.
- Mobile: same aspect, full-width minus 16px padding, gap 16px.

**Visual system**
- `background: linear-gradient(135deg, #111, #1a1a1d, #0a0a0b)` base.
- Accent = `inset 0 1px 0 rgba(255,212,0,0.35)` for the razor line. Keep to 1px max.
- Outer ring: `0 0 0 0.5px rgba(255,212,0,0.25)` — hairline definition without heaviness.
- Drop shadow long + soft: `0 30px 60px -20px rgba(0,0,0,0.9)` for floating feel.

**Physics tuning (starting values)**
- `edgeResistance`: `0.78` (0 = no resistance, 1 = locked). Feels premium around 0.75–0.82.
- Velocity→skew divisor: `/-60` for 480px tiles. Negative because skew leans opposite to motion direction.
- Max skew clamp: `±12deg`. Past 15 it looks broken.
- Skew return duration: `0.5s`, `power3.out`. Faster feels stiff, slower feels mushy.
- Snap: round to nearest tile width. For center-snap carousels, offset by `viewport/2 - tile/2`.

**Nav pattern**
- Arrow buttons should drive the same Draggable instance via `.animate()` or a tween on `track.x` — don't use a separate code path. Same physics, same skew, same snap.
- Keyboard `←/→` = tween `x` by ±`TILE` with `ease: 'power3.out'`, duration 0.6. This reuses the skew loop automatically because velocity is tracked on the proxy.
- Hover state on each tile: `scale: 1.02` + brightening the yellow inset to `0.55` alpha. Never rotate on hover — save rotation for drag.

**Performance**
- `will-change: transform` on `.track` and each `.tile`. Remove after idle if tile count > 20.
- Cancel the RAF loop in `onThrowComplete` — don't leave it running.
- For 50+ tiles, virtualize: render only the tiles within viewport ± 2 on each side.

## References

1. **GSAP Draggable & Inertia Slider with Skew** — Official GreenSock pen. The canonical velocity-to-skew pattern: `InertiaPlugin.track()` on a proxy, clamped velocity map, `quickTo` for per-frame skew updates. https://codepen.io/GreenSock/pen/ZEdoGOx
2. **Draggable + InertiaPlugin (Skew + Lerp effect) — benjamOD2** — Production-style implementation with proxy velocity tracking, clamped skew, `quickTo`, and inertia snap on release. https://codepen.io/benjamOD2/pen/GRydOmN
3. **Codrops — Mastering Carousels with GSAP** (2025-04-21) — Walks through the `horizontalLoop()` helper with `draggable: true`, center-snap, and inertia. Good reference for infinite-loop variants. https://tympanus.net/codrops/2025/04/21/mastering-carousels-with-gsap-from-basics-to-advanced-animation/
4. **Motion.dev — Drag docs** — For the Motion One / React alternative: `dragElastic` (0–1), `dragTransition: { bounceStiffness, bounceDamping }`, momentum-by-default. Smaller bundle, less snap control. https://motion.dev/docs/react-drag
5. **GSAP InertiaPlugin docs** — `InertiaPlugin.track()`, `getVelocity()`, `end` array for snap, `min/max` for elastic boundaries. https://gsap.com/docs/v3/Plugins/InertiaPlugin/
6. **Elastic Grid Scroll — Codrops** (2025-06-03) — Lag-based column offsets with GSAP ScrollSmoother. Great companion technique if this showcase ever goes from 1-row rail to multi-row grid. https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/
