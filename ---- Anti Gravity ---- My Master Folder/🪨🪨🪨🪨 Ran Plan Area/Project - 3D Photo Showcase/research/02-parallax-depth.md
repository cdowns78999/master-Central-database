# 02 — Parallax + Depth Layer Techniques

## Intro

A sophisticated photo showcase reads as "3D" when layers move at distinct rates, accents are thin and precise, and the viewport never stutters. Three modern pillars deliver this in 2026:

1. **CSS 3D perspective parallax** — the browser does parallax on the GPU with zero JS (Chrome Developers).
2. **Scroll-driven animations** (`animation-timeline: view() / scroll()`) — compositor-thread animation tied directly to scroll progress, no rAF loop.
3. **IntersectionObserver + `translate3d`** — the proven fallback for Firefox / older Safari, kept on GPU via `will-change: transform`.

Mixing these gives depth (planes moving at different speeds), precision (thin accents that stay razor-sharp), and 60fps on mid-range hardware.

## Key Technique

The spine is **three distinct depth planes** pushed into Z-space inside a perspective container. Background layer lives furthest back (slowest), tile grid sits on the base plane (scroll speed = 1), accent rails + yellow hairlines float forward (faster). This is Paul Lewis's original Chrome trick — scrolling IS a transform, so perspective alone causes parallax without listening to scroll.

Layer on top of that: `animation-timeline: view()` for per-tile reveal (scale-up, fade-in, slight Y-lift as each 16:9 tile enters the scrollport), and a single `IntersectionObserver` that toggles `.in-view` for the non-supporting browsers.

Why this layering matters:
- **Perspective parallax** runs at native scroll rate — zero jank, no rAF.
- **View timelines** run on the compositor thread — zero main-thread work.
- **`translate3d` + `will-change: transform`** promotes each tile to its own compositor layer so shadows / gradients don't repaint during scroll.

## Code Snippet (working)

```html
<main class="stage">
  <div class="depth depth--back"  aria-hidden="true"></div>   <!-- z: -2px -->
  <div class="depth depth--mid"   aria-hidden="true"></div>   <!-- z: -1px -->

  <section class="grid">
    <article class="tile" style="--i:0"><img src="1.jpg" alt=""></article>
    <article class="tile" style="--i:1"><img src="2.jpg" alt=""></article>
    <!-- ... -->
  </section>
</main>
```

```css
/* 1. Perspective container — browser handles parallax on GPU */
.stage {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px;
  perspective-origin: 0 0;
  transform-style: preserve-3d;
  background: #0a0a0b;
}

/* 2. Distinct depth planes */
.depth {
  position: absolute;
  inset: 0;
  transform-origin: 0 0;
  will-change: transform;
}
.depth--back { transform: translateZ(-2px) scale(3);   /* slowest */
  background: radial-gradient(ellipse at 30% 20%, #141418 0%, #07070a 60%); }
.depth--mid  { transform: translateZ(-1px) scale(2);   /* mid */
  background: linear-gradient(180deg, transparent 0%, #0f0f14 80%); }

/* 3. Razor-thin yellow accent — always 1px, never scales with parallax */
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: 28px;
  padding: 12vh 6vw;
  border-top: 1px solid #f5d400;       /* the hairline */
  box-shadow: 0 -1px 0 #f5d400;        /* subpixel insurance */
}

/* 4. 16:9 dark-gradient tile */
.tile {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(160deg, #1a1a22 0%, #08080b 100%);
  box-shadow:
    0 1px 0 rgba(245, 212, 0, 0.18) inset,   /* yellow hairline, inside */
    0 30px 60px -20px rgba(0,0,0,0.6);
  transform: translate3d(0, 40px, 0) scale(0.96);
  opacity: 0;
  will-change: transform, opacity;
}
.tile img {
  width: 100%; height: 100%;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform 600ms cubic-bezier(.2,.7,.2,1);
}
.tile:hover img { transform: scale(1.01); }

/* 5. Scroll-driven reveal — modern browsers, zero JS */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .tile {
      animation: tile-in both;
      animation-timeline: view();
      animation-range: entry 10% cover 40%;
    }
    @keyframes tile-in {
      to { transform: translate3d(0,0,0) scale(1); opacity: 1; }
    }
  }
}

/* 6. Fallback path — IntersectionObserver toggles .in-view */
.tile.in-view {
  transform: translate3d(0,0,0) scale(1);
  opacity: 1;
  transition: transform 700ms cubic-bezier(.2,.7,.2,1),
              opacity 500ms linear;
  transition-delay: calc(var(--i) * 40ms);
}
```

```js
/* Progressive enhancement — only runs if view() is unsupported */
if (!CSS.supports('animation-timeline: view()')) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);               // one-shot, free the memory
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  document.querySelectorAll('.tile').forEach(t => io.observe(t));
}
```

## Why it feels 3D

- **Speed differential.** Back plane scales 3x and sits at `z:-2px` — it drifts past roughly 1/3 the speed of the tiles. Mid plane at `z:-1px` moves at 1/2 speed. Tiles are on the base plane (1:1). The eye reads three different motion rates as literal depth.
- **Per-tile micro-motion.** Each tile starts 40px low, 96% scale, 0 opacity. As it crosses `entry 10%` into the scrollport, `view()` animates it to rest. That late-arrival cadence is what high-end photo sites (Apple product pages, Linear's marketing, Stripe Sessions) use — the content assembles itself in front of you.
- **Razor accents stay sharp.** The 1px yellow hairline lives on the non-parallaxed grid, so it never inherits a `scale()` transform. It renders at true 1 device pixel regardless of zoom.
- **Dark gradient cards with inset yellow.** The tile gradient (`#1a1a22 → #08080b`) plus a 1px inset yellow glow at 18% alpha gives the card a "backlit edge" — cheap visually, expensive-looking.
- **GPU promotion.** `will-change: transform` on `.depth` and `.tile` puts each on its own compositor layer. Scrolls, reveals, and hover scales never trigger paint or layout.

## Tile / Nav Pattern Recommendations

**Grid spec**
- `grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));` — collapses cleanly from 3-up to 1-up.
- `gap: 28px` desktop, `gap: 16px` mobile.
- `aspect-ratio: 16 / 9;` is non-negotiable for photo showcases — locks layout before images load, zero CLS.
- Lazy-load via `<img loading="lazy" decoding="async">` to keep the scroll-driven timeline honest.

**Tile anatomy (recommended)**
1. 16:9 container with `border-radius: 14px` and `overflow: hidden`.
2. Image scaled to 1.06 at rest; settles to 1.00 on hover (600ms cubic-bezier(.2,.7,.2,1)).
3. Inset 1px yellow hairline at alpha 0.15–0.22 — the "accent" without shouting.
4. Bottom-anchored caption block that fades in with the tile (same `view()` timeline, different `animation-range`).

**Left-nav consistency (across pages)**
- Extract nav to a single component (`<nav class="rail">`) and mount identically on every page — same `position: sticky; top: 0; height: 100vh;` on desktop, `position: fixed` drawer on mobile.
- Width: 240px desktop, full-width slide-in below 900px.
- One 1px yellow vertical rail (`border-right: 1px solid #f5d400`) — mirrors the grid hairline, visually ties rail → grid.
- Active item: yellow square dot (6x6) flush-left, no background change. Keep the rail visually silent so photos carry the page.
- Persist scroll position on nav: `overflow-y: auto` on `.rail`, store `scrollTop` in sessionStorage on `beforeunload`, restore on load.

**Performance discipline**
- Never animate `top`, `left`, `margin`, `width`, `height` — only `transform` and `opacity`.
- Cap concurrent `will-change` declarations to ~12 visible elements; overuse burns VRAM.
- Respect `@media (prefers-reduced-motion: reduce)` — swap all view() animations for instant opacity fades.

## References

1. **Paul Lewis — Performant Parallaxing (Chrome for Developers).** Canonical CSS-only perspective parallax. Full working snippet above adapted from this. `perspective: 1px; transform: translateZ(-2px) scale(3);` formula: `(perspective - distance) / perspective`. https://developer.chrome.com/blog/performant-parallaxing
2. **Cyd Stumpel — Start using Scroll-driven animations today.** Production-grade `animation-timeline: view()` patterns with `animation-range` and `prefers-reduced-motion` guards. https://cydstumpel.nl/start-using-scroll-driven-animations-today/
3. **Codrops — Sticky Grid Scroll (Mar 2026).** GSAP ScrollTrigger + Lenis for the JS fallback path; demonstrates `scrub: true` coupling and `yPercent` parallax. https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/
4. **MDN — Scroll-driven animations.** Spec-level reference for `scroll()` vs `view()`, timeline ranges, compositor-thread guarantees. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
5. **Codrops — Horizontal Parallax Gallery DOM → WebGL (Feb 2026).** Escalation path if photo count > 40 and you need WebGL. https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/
