# mine mine mine
### Design Intelligence Foundation — VRChat Wing Menu Dashboard
> Ahead Artist Solutions · March 2026

---

## The 6 Studied Systems

---

### GitHub #1 — axln/radial-menu-js

**Source:** https://github.com/axln/radial-menu-js
**What it is:** Pure vanilla JS + SVG radial/pie menu — closest web analog to VRChat's Action Menu

**Hierarchy:**
Flat array of `{ id, title, icon, items? }` — nesting is recursive, any item can contain a sub-ring of children. Parent menus tracked via `parentMenu[]` stack for unlimited depth back-nav.

**Clever Technique:**
Ring-to-ring submenu transitions — current ring gets class `"menu outer"` (shrinks/fades), new sub-ring enters as `"menu inner"` then transitions to `"menu"` (grows in). Zoom-in/out drill-down identical to VRChat Action Menu. Back nav reverses animation. Three input modes: click, arrow keys, mouse wheel.

**Notable Patterns:**
- SVG arc math (sin/cos → x,y per sector)
- Promise-based animation sequencing (`setClassAndWaitForTransition()`)
- `nextTick()` pattern (setTimeout 10ms) to let browser register transition start state

---

### GitHub #2 — victorqribeiro/radialMenu

**Source:** https://github.com/victorqribeiro/radialMenu
**What it is:** Canvas-rendered radial context menu — right-click replacement (desktop) or long-press (mobile)

**Hierarchy:**
Single-ring flat architecture. Buttons defined as `{ text, action }` array, fanning equally around 360deg with configurable `buttonGap` (in radians). Dynamic runtime add via `addButtons([])`.

**Clever Technique:**
Concentric ring geometry — two radii (`innerCircle: 50`, `outerCircle: 100`) create a donut/ring. Selection is purely directional (push toward slice). Exactly the VRChat joystick-toward-wedge pattern.

**Notable Patterns:**
- Canvas API rendering (not DOM per button)
- 5 gradient types (radial, linear1-4)
- Per-button style overrides
- Shadow rendering at canvas level
- z-index 9999 overlay
- ES6 module import
- FontAwesome Unicode icons

---

### GitHub #3 — kurone-kito/vrc-ui

**Source:** https://github.com/kurone-kito/vrc-ui
**What it is:** Complete recreation of VRChat's native UI as reusable Unity components — literally "VRChat's wing/quick menu UI as a prefab kit"

**Hierarchy — Atomic Design 3-tier system:**
- **Atoms:** buttons, toggles, text/icon elements, slider tracks
- **Molecules:** cards (icon + text + action), dropdown menus, scrollbar assemblies
- **Organisms:** FPS monitor, progress display, slideshow, full status panels

**Clever Technique:**
Standardized familiarity — clones VRChat's exact visual styling so users already know how to interact. Tab-based sections at top, card grid in body, scrollable content areas. Auto-dependency system pulls matching VRChat icon set.

**Notable Patterns:**
- git-vrc filter for Unity YAML normalization
- UdonSharp property binding for live updates
- Dual MIT/CC-BY-4.0 licensing

---

### CodePen #1 — Radial Menu with CSS Trig Functions

**Source:** https://codepen.io/una/pen/VwGRpXN
**Author:** Una Kravets (Google Chrome team)
**What it is:** Zero-JS radial pie menu using Popover API

**Hierarchy:**
Single toggle button → flat list of action items fanning in 180-degree arc. `<ul popover> > <li class="item"> > <button>`, each item gets `--angle` CSS variable.

**Clever Technique:**
CSS `sin()`/`cos()` trigonometric functions convert polar → Cartesian positions with no JS math. Popover API provides full modal behavior (keyboard nav, light dismiss, focus trap) for free. Anchor Positioning API pins menu to button without absolute hacks.

**Notable Patterns:**
- Grid pile (`grid-area: 1/1` stacks all items)
- Collapsed state via `:not(:focus-within)` zeroing radius/angle
- Per-item stagger via `nth-child` delays
- Fully declarative — browser handles Enter/Esc/Tab

---

### CodePen #2 — Warp Drive: Pure CSS 3D Radial Menu

**Source:** https://codepen.io/jcoulterdesign/pen/pjQdGb
**Author:** Jamie Coulter
**What it is:** Sci-fi/VR-style 3D radial menu, pure CSS, holographic HUD feel

**Hierarchy:**
Central glowing core → 5 concentric outer rings → each ring has 36 "pieces" (10-degree increments) → 5 named menu items at radial positions → tooltip labels + connector lines on hover. Core > Rings > Pieces > Items > Tooltips.

**Clever Technique:**
Entire menu in 3D-transformed space: `translateY(-21px) translateZ(-870px) rotateX(69deg) rotateY(-26deg)` — "looking down at holographic table" effect. HAML loop generates 36 segments per ring (180 DOM elements total). 20-second CSS wiggle animation.

**Notable Patterns:**
- `transform-style: preserve-3d`
- Stacked `box-shadow` for glow
- Scale + color shift on hover
- Connector lines animate outward
- Pure CSS with SCSS variables for ring offsets

---

### CodePen #3 — Slide-Out Menu with Slide-Over Submenus

**Source:** https://codepen.io/suzannah_h/pen/QWLXvbx
**Author:** Suzannah
**What it is:** **THE closest match to VRChat's wing menu paging pattern**

**Hierarchy:**
Toggle button → Panel 1 (top-level categories) → Panel 2 slides over from right → Panel 3 slides over that. 3 stacked `.list-wrapper` divs inside `.menu-wrapper`. Back button on each panel reveals parent.

**Clever Technique:**
Three panel divs pre-built in DOM. Panels 2-3 start at `translateX(100%)`. Activated via `.is-visible` class → `transform: none` (slides in over 0.5s). Content dynamically cloned via `cloneNode(true)` from nested `<ul>` into target panel. Single nested HTML list → visual sliding panels.

**Notable Patterns:**
```css
.menu-wrapper { overflow: hidden; }          /* clips offscreen panels */
.list-wrapper { overflow-y: auto; }          /* each panel scrolls independently */
.list-wrapper:nth-child(2),
.list-wrapper:nth-child(3) {
  transform: translateX(100%);
  transition: transform 0.5s;
}
.list-wrapper.is-visible { transform: none; }
```
- Event delegation on panels for drill-down
- Dynamic back-button label updates

---

## VRChat Design Philosophy — Why It Works

### Progressive Disclosure
- Newcomers see descriptive text + help sections
- Power users minimize sidebars for denser info grids
- Left sidebar on most tabs is collapsible

### Layered Access Speed
- **Quick Menu** = instant, lightweight (Escape key)
- **Main Menu** = full-featured, expanded (double-click tab)
- **Action Menu** = hands-free radial for mid-interaction (hold button)
- **Wings** = persistent side access to favorites without leaving current tab

### Consistent Design Language
- Quick Menu and Main Menu intentionally look + navigate the same way
- If you know one, you know the other

### VRChat Quick Menu Hierarchy (what we're replicating)

```
[Header — top bar]
  Left: Profile button (status, bio, availability)
  Center: Widgets (clock, FPS, ping, credits)

[Wings — left & right sides]
  Customizable side panels (favorites, friends, emoji, items)
  Toggle independently of center content
  Introduced UI 1.5 (Nov 2021), extended to Main Menu UI 2.0 (Oct 2022)

[Center Content Area]
  Content of currently selected tab
  Always opens to Launch Pad by default

[Bottom Tab Bar — 5 tabs]
  1. Launch Pad (default) — 12 tile buttons, Quick Links + Quick Actions
  2. Notifications
  3. Here (players in current instance)
  4. Camera (photo/video tools)
  5. Settings (audio, mic)

[Bottom Controls]
  Bottom-left: Microphone toggle
  Bottom-right: Safe Mode toggle
```

---

## How This Applies to Our Build

| Research Finding | Our Application |
|---|---|
| VRChat wings = persistent side panels that don't interrupt center | Our left/right wings with 4 paged sections each — always visible, always accessible |
| `translateX(100%)` + `.is-visible` toggle (CodePen #3) | Wing track paging via `translateX(-${index * 100}%)` — same principle, horizontal scroll |
| `overflow: hidden` on wrapper + `overflow-y: auto` per panel (CodePen #3) | Critical for our wing sections — clip horizontal overflow, allow vertical scroll per section |
| Atomic Design hierarchy (vrc-ui) | Our pill buttons = molecules (icon + label + chevron), sections = organisms |
| Ring-to-ring transitions (radial-menu-js) | Inspires our wing slide transition — CSS transition on transform, promise-like sequencing |
| Directional selection (radialMenu) | Our swipe detection — directional intent (horizontal vs vertical) before committing |
| CSS trig layout (Una Kravets) | Not directly used but validates pure-CSS approach for radial Quick Actions if we expand later |
| Progressive disclosure (VRChat philosophy) | Wings show summary pills, center shows detail — information hierarchy matches |
| Bottom tab bar always visible (VRChat) | Our fixed bottom toolbar at z-index 100, solid bg, never occluded |
| Launch Pad as default center view (VRChat) | Our center pad with banner + Quick Links + Quick Actions grid |

---

## Design Tokens (Salt Rock Lamp Palette)

```css
:root {
  --lamp-deep:  #c2560a;
  --lamp-mid:   #e07b2e;
  --lamp-warm:  #f2a54a;
  --lamp-soft:  #f8c97d;
  --lamp-glow:  #fde8c8;
  --white:      #ffffff;
  --text:       #3b1a04;
  --text-dim:   rgba(59, 26, 4, 0.55);
  --border-thick: 4px;
  --radius:     16px;
}
```

## Text Icons Reference

```
Arrows:  ↑ ↓ ← → ↖ ↗ ↘ ↙ ⇄ ⇅ ↵ ↻ ↺ ⇒ ⇐ ⇑ ⇓ ➤
Shapes:  ▲ ▼ ◀ ▶ ✓ ✗ ★
Labels:  Goal, Plan, Contact, Call, Email, Update, Follow, Close,
         Meet, Track, Review, Invoice, Onboard, Escalate, Ship
```

---

*This document is the permanent design bible for the VRChat Wing Menu Dashboard build.*
