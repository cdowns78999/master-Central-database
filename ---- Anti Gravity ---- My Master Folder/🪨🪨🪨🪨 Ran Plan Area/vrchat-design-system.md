
# VRChat Design System — Official Reference
*Reverse-engineered from vrchat.com, hello.vrchat.com, VRCX themes, and community fan implementations.*
*Generated: 2026-04-09*

---

## 1. Color System

### Core Palette

```css
/* Primary Purple (buttons, links, interactive) */
--vrc-primary:          #4d509c;
--vrc-primary-hover:    #2b2d58;
--vrc-primary-focus:    rgba(77, 80, 156, 0.25);
--vrc-primary-disabled: #cecfe7;

/* Background Depth Layers */
--vrc-bg-0:    #0d0d1a;   /* body — near-black with blue-purple tint */
--vrc-bg-1:    #17161B;   /* deep panels */
--vrc-bg-2:    #1e1e2e;   /* primary panels */
--vrc-bg-3:    #282a36;   /* card surfaces */
--vrc-bg-4:    #2E3440;   /* elevated cards */
--vrc-bg-5:    #3B4252;   /* hover/active surfaces */

/* Text */
--vrc-text:         #f8f8f2;
--vrc-text-muted:   #aaaaaa;
--vrc-text-dim:     #D8DEE9;

/* Accent Lavender (glow states, highlights) */
--vrc-lavender:     #bd93f9;
--vrc-ube:          #cba1e7;
--vrc-violet:       #8d6cb0;

/* Borders */
--vrc-border:       rgba(77, 80, 156, 0.3);
--vrc-border-glow:  rgba(189, 147, 249, 0.2);
```

### Trust Rank Colors (official)

```css
--vrc-rank-visitor:    #D8DEE9;
--vrc-rank-new:        #5E81AC;
--vrc-rank-user:       #A3BE8C;
--vrc-rank-known:      #D08770;
--vrc-rank-trusted:    #B48EAD;
--vrc-rank-team:       #BF616A;
```

### Status Colors

```css
--vrc-status-online:   #A3BE8C;
--vrc-status-joinme:   #5E81AC;
--vrc-status-busy:     #BF616A;
--vrc-status-askme:    #D08770;
--vrc-status-offline:  #D8DEE9;
```

---

## 2. Typography

### Primary Font: Exo 2 (NON-NEGOTIABLE)

```css
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');

--vrc-font: 'Exo 2', sans-serif;
```

- Variable weight: 100–900
- Italic support: yes
- Character: geometric sans-serif, futuristic, sci-fi adjacent
- Source: hello.vrchat.com uses this exclusively

### Type Scale

```css
h1:      clamp(2rem, 5vw, 3.5rem) / weight 800
h2:      clamp(1.5rem, 3vw, 2.25rem) / weight 700
h3:      1.25rem / weight 600
body:    1rem / weight 400
caption: 0.85rem / weight 400
badge:   0.75rem / weight 600
```

---

## 3. Spacing & Layout

```css
--vrc-max-width:    1400px;
--vrc-gutter:       4vw;
--vrc-gutter-mob:   6vw;
--vrc-col-gap:      11px;
--vrc-card-pad:     1.5rem;
--vrc-card-radius:  12px;
--vrc-badge-radius: 20px;
--vrc-btn-radius:   8px;
--vrc-input-radius: 8px;
--vrc-section-gap:  1.5rem;
```

### Grid

```css
/* Desktop: 24-column, auto-fill cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Mobile: single column below 768px */
@media (max-width: 768px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

---

## 4. Component Patterns

### Card

```css
.vrc-card {
  background: var(--vrc-bg-3);
  border-radius: var(--vrc-card-radius);
  border: 1px solid var(--vrc-border);
  padding: var(--vrc-card-pad);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.vrc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(77, 80, 156, 0.35);
}
```

### Glass Panel (signature VRChat effect)

```css
.vrc-glass {
  background: rgba(30, 30, 50, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(189, 147, 249, 0.15);
  border-radius: 12px;
}
```

### Primary Button

```css
.vrc-btn {
  background: var(--vrc-primary);
  color: #fff;
  padding: 0.6rem 1.4rem;
  border-radius: var(--vrc-btn-radius);
  font-family: var(--vrc-font);
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.vrc-btn:hover {
  background: var(--vrc-primary-hover);
  transform: scale(1.03);
}

/* Ghost variant */
.vrc-btn-ghost {
  background: transparent;
  border: 1px solid var(--vrc-primary);
  color: var(--vrc-lavender);
}
.vrc-btn-ghost:hover {
  background: var(--vrc-primary);
  color: #fff;
}
```

### Badge / Tag (pill shape)

```css
.vrc-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: var(--vrc-badge-radius);
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vrc-bg-4);
  color: var(--vrc-text-dim);
}
```

### Navigation Bar

```css
/* Fixed top nav */
.vrc-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: rgba(13, 13, 26, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--vrc-border);
  z-index: 1000;
}

/* Logo max-height */
.vrc-logo { max-height: 50px; }

/* Mobile hamburger */
.hamburger span { height: 1px; display: block; background: var(--vrc-text); }
```

---

## 5. Signature Effects

### Purple Glow (NEVER white glow)

```css
/* Button/active state glow */
box-shadow: 0 0 12px rgba(77, 80, 156, 0.6),
            0 0 24px rgba(77, 80, 156, 0.3);

/* Lavender glow variant */
box-shadow: 0 0 10px rgba(189, 147, 249, 0.5);

/* Card hover glow */
box-shadow: 0 6px 20px rgba(77, 80, 156, 0.35);
```

### Background Radial Orbs

```css
body::before {
  content: '';
  position: fixed;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  height: 60vh;
  background: radial-gradient(ellipse, rgba(77, 80, 156, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

### Hero Gradient

```css
.vrc-hero {
  background: linear-gradient(135deg, #4d509c 0%, #2b2d58 50%, #17161B 100%);
}
```

### Glassmorphism Panel

```css
background: rgba(45, 43, 84, 0.6);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(189, 147, 249, 0.2);
```

---

## 6. Mobile Rules

```
Primary breakpoint: 768px
Mobile grid:        single column (1fr)
Mobile gutter:      6vw padding
Nav:                hamburger drawer at 768px
Logo:               max-height 50px always
Min tap target:     44px height on all interactive elements
Touch cards:        full-width on mobile, no translateY hover
```

---

## 7. Fan Implementations Reference

| Source | Key Contribution |
|--------|-----------------|
| VRCX Midnight Purple | `#bd93f9` lavender accent, `#282a36` bg — Dracula-inspired |
| VRCX K-UI | `#5600a5` electric purple, pure black bg |
| VRCX Nord Theme | `#2E3440` bg, `#5E81AC` primary, Nord color system |
| VRChat Asset Browser | Full card CSS system, Inter font, `#086c84` teal primary |
| VRColors (React) | VRChat in-game menu emulator — best component reference |
| Userstyles Dark Blur | 468 installs — dark + backdrop-filter on vrchat.com |

---

## 8. The 10 Design Truths

1. **Font is Exo 2.** Non-negotiable. Variable weight 100–900.
2. **Primary purple is `#4d509c`** — muted indigo, not bright violet.
3. **Background has 4–5 depth layers**, all with blue-purple tint. Never neutral gray.
4. **Glassmorphism is structural** — `rgba(30,30,50,0.6)` + `blur(12px)` + purple border.
5. **Glow is always purple** — `rgba(77, 80, 156, 0.6)` or `rgba(189, 147, 249, 0.4)`. Never white.
6. **Cards lift on hover** — `translateY(-5px)` + purple box-shadow. `0.2s ease`.
7. **Badges are pill-shaped** — `border-radius: 20px`, `0.75rem`, weight 600.
8. **Mobile breakpoint is 768px hard** — 6vw gutters, single-column, hamburger drawer.
9. **Trust rank / status colors are native vocabulary** — use `#B48EAD` (trusted), `#5E81AC` (join me), `#BF616A` (busy).
10. **The VRChat feel = Exo 2 + layered purple-black + glass + purple glow.** That combination is instant recognition.
