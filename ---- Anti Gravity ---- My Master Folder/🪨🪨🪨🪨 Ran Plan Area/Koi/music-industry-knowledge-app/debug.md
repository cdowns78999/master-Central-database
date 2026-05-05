# debug.md — Music Industry Knowledge App
> Compiled by Report Agent X5 · 2026-04-09
> Source agents: X1 (Layout/Nav/Parallax) · X2 (Data Render) · X3 (SPA Routing) · X4 (Cat 26 Chart)

---

## SITE 1 FIXES

### CRITICAL

- **Parallax offset broken on deep sections**
  - File: `site1/app.js` — scroll handler / parallax loop
  - Issue: Uses absolute `window.scrollY` for all elements. Sections far down the page start with a massive `translateY` offset, breaking the effect entirely.
  - Fix: Switch to a `getBoundingClientRect().top` relative offset per element:
    ```js
    const rect = el.getBoundingClientRect();
    el.style.transform = `translateY(${-rect.top * 0.3}px)`;
    ```

---

### MODERATE

- **IntersectionObserver trigger window too narrow**
  - File: `site1/app.js` — IntersectionObserver config
  - Issue: `rootMargin: '-40% 0px -55% 0px'` leaves only a 5% trigger window, causing sections to miss activation during normal scroll speed.
  - Fix: Change to `rootMargin: '-20% 0px -70% 0px'` for a reliable 10% window.

- **Duplicate `.cat-section` padding rule**
  - File: `site1/style.css` — lines 148 and 531
  - Issue: Two conflicting padding declarations on `.cat-section` — creates cascade unpredictability.
  - Fix: Remove one instance, consolidate to a single rule:
    ```css
    .cat-section { padding: 100px 64px 80px 64px; }
    ```

---

### MINOR

- **`color-mix()` has no fallback for older browsers**
  - File: `site1/style.css` — wherever `color-mix()` is used
  - Issue: `color-mix()` unsupported in Safari <16.2 and Chrome <111 — will silently fail with no color applied.
  - Fix: Add a solid `rgba()` fallback on the line immediately before each `color-mix()` declaration:
    ```css
    background: rgba(30, 30, 50, 0.85); /* fallback */
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    ```

---

## SITE 2 FIXES

### HIGH PRIORITY

- **Fake Reddit URLs in data.js**
  - File: `site1/data.js` — Cat 14 community source, Cat 21 community source
  - Issue: Both URLs are fabricated. Live links to non-existent pages will 404 and undermine credibility.
  - Fix: Replace both with real verified URLs, or convert them to descriptive plain text with no `<a>` href (e.g., `"r/musicbusiness — Reddit community"`).

- **Fade-out transition fires after opacity is already set**
  - File: `site2/app.js` — `showCategory()` function
  - Issue: `area.style.transition = 'opacity 0.2s ease'` is set *after* `area.style.opacity = '0'`, so the browser applies the opacity change instantly with no animation.
  - Fix: Move the transition assignment to *before* the opacity change:
    ```js
    area.style.transition = 'opacity 0.2s ease';
    area.style.opacity = '0';
    ```

- **Bar value labels clipped by overflow:hidden on `.bar-track`**
  - File: `site2/app.js` or chart render template — bar chart HTML generation
  - Issue: `.bar-value` is rendered inside `.bar-fill`, which lives inside `.bar-track` (overflow:hidden). Short bars clip the label.
  - Fix: Move `.bar-value` outside `.bar-fill` — render it as a sibling `<span>` after `.bar-track`, not nested inside `.bar-fill`:
    ```html
    <div class="bar-track"><div class="bar-fill" data-width="72%"></div></div>
    <span class="bar-value">72%</span>
    ```

- **Bar CSS transition doesn't fire on innerHTML inject**
  - File: `site2/app.js` — `renderCategory()` and chart injection logic
  - Issue: CSS `transition: width 0.6s` on `.bar-fill` doesn't animate because width is already at its target value when the DOM is painted.
  - Fix: Use `data-width` to store target, inject bars at `width: 0`, then trigger width in the next frame:
    ```js
    // After renderCategory() injects HTML:
    setTimeout(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      });
    }, 50);
    ```

---

### MODERATE

- **Cat 26 accent color is near-white — bar fill invisible**
  - File: `site1/app.js` or `site2/app.js` — `ACCENT_COLORS[26]`
  - Issue: `ACCENT_COLORS[26]` is set to `#f8fafc`, which is nearly white and will be invisible against light backgrounds in bar chart fills.
  - Fix: Change to a visible color:
    ```js
    ACCENT_COLORS[26] = '#38bdf8'; // sky blue
    ```

---

### MINOR

- **`accent.text` defined but never used**
  - File: `site2/app.js` — `ACCENT_PALETTE` definition and `renderCategory()` function
  - Issue: `accent.text` is declared in `ACCENT_PALETTE` but never referenced in `renderCategory()`. Dead code.
  - Fix: Either wire it into the render output (e.g., apply as a text color class) or remove it from the palette definition.

- **Chart injected after sources block — reading order off**
  - File: `site2/app.js` — `renderCategory()` chart injection
  - Issue: The bar chart HTML is appended after the sources section, which is visually and semantically backwards (data before citations).
  - Fix: Move chart injection to before the sources section in `renderCategory()`.

---

## SUMMARY

| Metric | Count |
|---|---|
| Total issues | 10 |
| Critical | 1 |
| High Priority | 4 |
| Moderate | 3 |
| Minor | 3 |

**Ready for fix agent: YES**

> All issues above are self-contained — no cross-dependencies between Site 1 and Site 2 fixes.
> Suggested fix order: Critical → High Priority → Moderate → Minor.
