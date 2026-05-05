# VRChat CSS Identity System
*Extracted from hello.vrchat.com, VRCX themes, and community fan implementations.*
*Source of truth for replicating VRChat's exact design identity.*

---

## 1. Font System

```css
/* PRIMARY FONT — NON-NEGOTIABLE */
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');
--font: 'Exo 2', sans-serif;

/* Fallback stack (official VRChat site) */
font-family: "proxima-nova","Helvetica Neue",Helvetica,Arial,sans-serif;

/* Rendering */
font-synthesis: none;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Type Scale (from VRChat asset browser + official site)
```css
h1 (hero):      2rem / weight 700
h1 (page):      1.75rem / weight 700
h2:             1.5rem / weight 700
card-title:     1.25rem / weight 700
nav-logo:       1.25rem / weight 700
body:           1rem / weight 400 / line-height 1.6–1.7
card-body:      0.95rem
card-author:    0.9rem / weight 600
card-notes:     0.85rem / italic
footer:         0.9rem
card-secondary: 0.8rem
badge/tag:      0.75rem / weight 600
subtitle hero:  2rem / color #cccccc
title letter-spacing: 2px
max prose width: 80ch
```

---

## 2. Color System

### Primary Brand Colors
```css
--vrc-primary:         #4d509c;    /* Official app purple — buttons, links */
--vrc-primary-hover:   #2b2d58;    /* Darker on hover */
--vrc-primary-focus:   rgba(77, 80, 156, 0.25);
--vrc-lavender:        #bd93f9;    /* VRCX Midnight Purple accent */
--vrc-electric-purple: #5600a5;    /* VRCX K-UI — saturated variant */
--vrc-violet:          #8d6cb0;    /* Community palette mid purple */
--vrc-ube:             #cba1e7;    /* Community palette light purple */
```

### Background Depth System (all layers have blue-purple tint — NEVER neutral gray)
```css
--bg-deepest:   #0d0d1a;    /* Body base */
--bg-0:         #0e1013;    /* VRChat asset browser dark bg */
--bg-1:         #17161B;    /* VRCX Midnight Purple bg2 */
--bg-2:         #1e1e2e;    /* Deep panel */
--bg-3:         #252a30;    /* Card surface (asset browser) */
--bg-4:         #282a36;    /* VRCX Midnight Purple background */
--bg-5:         #2E3440;    /* VRCX Nord background */
--bg-6:         #3B4252;    /* VRCX Nord bg2 / elevated */
--input-bg:     #181b1f;    /* Input field background */
```

### Text Colors
```css
--text:         #f8f8f2;    /* VRCX Midnight Purple */
--text-light:   #f0f0f0;    /* Asset browser */
--text-dim:     #D8DEE9;    /* VRCX Nord text */
--text-muted:   #aaaaaa;    /* Asset browser muted */
--text-disabled:#888888;    /* Disabled state */
--text-cccccc:  #cccccc;    /* VRChat hero subtitle */
--text-blue:    #ccccff;    /* VRCX K-UI text */
```

### Border / Divider Colors
```css
--border-teal:  #064b5c;    /* Asset browser border */
--border-vrc:   rgba(77, 80, 156, 0.3);   /* Purple border */
--border-glow:  rgba(189, 147, 249, 0.2); /* Lavender glow border */
```

### Status Colors (official VRCX — Nord theme = most accurate to VRChat)
```css
--status-online:  #A3BE8C;   /* Green */
--status-joinme:  #5E81AC;   /* Blue */
--status-askme:   #D08770;   /* Orange */
--status-busy:    #BF616A;   /* Red */

/* Midnight Purple theme variants */
--status-online-mp:  #50fa7b;
--status-joinme-mp:  #6272a4;
--status-askme-mp:   #ffb86c;
--status-busy-mp:    #ff5555;
```

### Trust Rank Colors (official OGTrustRanks source + VRCX)
```css
--rank-visitor:   /* no tag — white/gray nameplate */
--rank-new:       #5E81AC;   /* Blue — system_trust_basic */
--rank-user:      #A3BE8C;   /* Green — system_trust_known */
--rank-known:     #FF7A42;   /* Orange — system_trust_trusted (naming offset!) */
--rank-trusted:   #8242E6;   /* Purple — system_trust_veteran */
--rank-team:      #BF616A;   /* Red */
--rank-friend:    #EBCB8B;   /* Gold/Yellow */
--rank-nuisance:  #782F2F;   /* Dark red */
```

### Accent (VRCX shared — all themes)
```css
--yellow:  #EBCB8B;    /* Friend tag, VRC+ tag */
--green:   #A3BE8C;    /* Nord */ / #50fa7b  /* Midnight */
--blue:    #5E81AC;    /* Nord */ / #6272a4  /* Midnight */
--orange:  #D08770;    /* Nord */ / #ffb86c  /* Midnight */
--red:     #BF616A;    /* Nord */ / #ff5555  /* Midnight */
```

### Platform Tag Colors
```css
--platform-pc:     var(--mainc);   /* primary accent color */
--platform-quest:  var(--green);   /* green */
--platform-vrcplus: var(--yellow); /* gold */
```

---

## 3. Layout & Spacing

```css
/* Page constraints */
--max-width:       1400px;   /* asset browser */
--max-width-site:  1200px;   /* hello.vrchat.com */
--max-width-sqs:   1500px;   /* Squarespace max */
--max-prose:       900px;    /* static pages */
--prose-width:     80ch;

/* Gutters */
--gutter:          4vw;      /* desktop */
--gutter-mobile:   6vw;      /* mobile */
--page-padding:    3vw;      /* hello.vrchat.com */

/* Grid */
--col-gap:         11px;     /* VRChat site grid gap */
--card-gap:        1.5rem;   /* asset browser card gap */
--nav-gap:         1.5rem;   /* nav links gap */
--filter-gap:      0.5rem;   /* badge/filter gap */

/* Component dimensions */
--card-radius:     12px;
--dialog-radius:   5px;      /* base */ / 25px  /* user/world/avatar */
--badge-radius:    20px;     /* pill */
--btn-radius:      8px;
--input-radius:    8px;
--fab-radius:      50%;
--logo-height:     50px;
--logo-mobile-max: 50px;

/* Padding */
--card-pad:        1.5rem;
--welcome-pad:     2.5rem 2rem;
--btn-pad:         0.6rem 1.2rem;
--badge-pad:       0.25rem 0.6rem;
--input-pad:       0.75rem 1rem;
--header-pad:      1rem 2rem;
--dialog-pad:      20px;
--trailer-pad:     20px 40px;

/* Download buttons */
--dl-btn-w:        180px;
--dl-btn-h:        50px;
--dl-btn-w-mob:    120px;
--dl-btn-h-mob:    40px;
```

---

## 4. Component CSS — Exact Values

### Card (from asset browser — most detailed source)
```css
.card {
  background-color: #252a30;
  border-radius: 12px;
  border: 1px solid #064b5c;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.4);
}
.card-header {
  border-bottom: 1px solid #064b5c;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
.card-author { color: #086c84; font-size: 0.9rem; font-weight: 600; }
.card-notes  { color: #aaa; font-style: italic; font-size: 0.85rem; }
.card-secondary { color: #aaa; font-size: 0.8rem; }
```

### Button — Primary
```css
.btn {
  background-color: #086c84;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: background-color 0.2s, transform 0.2s, color 0.2s, border-color 0.2s;
}
.btn:hover {
  background-color: #064b5c;
  transform: scale(1.03);
}
```

### Button — Ghost
```css
.btn-ghost {
  background-color: transparent;
  color: #086c84;
  border: 1px solid #086c84;
}
.btn-ghost:hover {
  background-color: #086c84;
  color: #ffffff;
}
```

### Button — Disabled
```css
.btn-disabled {
  background-color: #181b1f;
  color: #888;
  pointer-events: none;
  cursor: not-allowed;
  border-color: #064b5c;
}
```

### FAB / Back-to-top
```css
.fab {
  position: fixed;
  bottom: 2rem; right: 2rem;
  background-color: #086c84;
  color: #ffffff;
  border: none; border-radius: 50%;
  width: 50px; height: 50px;
  opacity: 0; visibility: hidden;
  transform: translateY(20px);
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  z-index: 1000;
}
.fab.visible {
  opacity: 1; visibility: visible;
  transform: translateY(0);
}
```

### Badge / Tag
```css
.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-weight: 600;
  background-color: #181b1f;
  color: #f0f0f0;
}
```

### Nav / Header
```css
header {
  background-color: #252a30;
  box-shadow: 0 2px 5px rgba(0,0,0,0.4);
  padding: 1rem 2rem;
  position: sticky; top: 0; z-index: 100;
}
.nav-logo { font-weight: 700; font-size: 1.25rem; color: #f0f0f0; }
nav a { color: #f0f0f0; font-weight: 600; transition: color 0.2s; }
nav a:hover { color: #086c84; }

/* Glassmorphism variant (official VRChat site) */
.nav-glass {
  background: rgba(13, 13, 26, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(77, 80, 156, 0.3);
}
```

### Input / Select
```css
input, select, textarea {
  background-color: #181b1f;
  border: 1px solid #064b5c;
  border-radius: 8px;
  color: #f0f0f0;
  padding: 0.75rem 1rem;
}
input:focus {
  outline: none;
  box-shadow: 0 0 2px 2px #4d90fe;
}
```

### Status Dot
```css
.status-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.status-online  { background: #A3BE8C; }
.status-joinme  { background: #5E81AC; }
.status-askme   { background: #D08770; }
.status-busy    { background: #BF616A; }
```

### Trust Rank Badge
```css
.rank-badge {
  font-size: 0.75rem; font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  border: 1px solid currentColor;
  background: transparent;
}
.rank-new      { color: #5E81AC; }
.rank-user     { color: #A3BE8C; }
.rank-known    { color: #FF7A42; }
.rank-trusted  { color: #8242E6; }
.rank-team     { color: #BF616A; }
.rank-friend   { color: #EBCB8B; }
```

### Platform Tag
```css
.tag-pc     { color: #bd93f9; border-color: #bd93f9; }
.tag-quest  { color: #A3BE8C; border-color: #A3BE8C; }
.tag-vrcplus{ color: #EBCB8B; border-color: #EBCB8B; }
```

---

## 5. Shadow & Glow Values

```css
/* Card resting */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

/* Card hover */
box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);

/* Nav header */
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

/* FAB */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

/* Input focus ring */
box-shadow: 0 0 2px 2px #4d90fe;

/* Social icon border-via-shadow */
box-shadow: 0 0 0 2px inset;

/* Purple glow (inferred — community standard) */
box-shadow: 0 0 12px rgba(77, 80, 156, 0.6), 0 0 24px rgba(77, 80, 156, 0.3);

/* Lavender glow */
box-shadow: 0 0 10px rgba(189, 147, 249, 0.5);
```

---

## 6. Animation & Transition Values

```css
/* Standard transitions */
transition: transform 0.2s, box-shadow 0.2s;       /* card hover */
transition: color 0.2s;                              /* nav links */
transition: background-color 0.2s, transform 0.2s;  /* buttons */
transition: background-color 0.3s, color 0.3s;      /* theme switch */
transition: opacity 0.3s, visibility 0.3s, transform 0.3s; /* FAB */

/* Hover transforms */
transform: translateY(-5px);    /* card lift */
transform: scale(1.03);         /* button press */
transform: translateY(0);       /* FAB visible */
transform: translateY(20px);    /* FAB hidden */

/* Squarespace bounce modal */
@keyframes bounceIn {
  0%   { opacity: 0; transform: scale(0.3); }
  50%  { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
}
animation-duration: 2.6s;
animation-timing-function: cubic-bezier(.32,.94,.6,1);

/* RGB cycling (VRCX Midnight Purple) */
animation: RGBbg 10s ease-in-out infinite;
animation: RGB 10s ease-in-out infinite;

/* Global animations (hello.vrchat.com) */
animation-duration: 0.1s;
animation-delay: 0.1s;
```

---

## 7. Glassmorphism Values

```css
/* Official VRChat site nav (detected via @supports) */
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

/* Hero overlay */
background-color: rgba(0, 0, 0, 0.6);

/* Glass panel (inferred from community implementations) */
background: rgba(30, 30, 50, 0.6);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(189, 147, 249, 0.2);

/* Tooltip dark (VRCX) */
background: #282a36;  /* Midnight */ / #2E3440 /* Nord */
border-color: #17161B /* Midnight */ / #3B4252 /* Nord */
```

---

## 8. Scrollbar Values

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track {
  background: rgba(0,0,0,0);
  border-radius: 16px;
}

/* Midnight Purple */
::-webkit-scrollbar-thumb {
  background: rgba(189, 147, 249, 1);   /* #bd93f9 */
  border-radius: 16px;
}

/* K-UI */
::-webkit-scrollbar-thumb {
  background: rgba(86, 0, 165, 1);      /* #5600a5 */
  border-radius: 16px;
}

/* Nord-Blue */
::-webkit-scrollbar-thumb {
  background: rgba(94, 129, 172, 1);    /* #5E81AC */
  border-radius: 16px;
}
```

---

## 9. Mobile / Responsive Rules

```css
/* Primary breakpoint */
@media (max-width: 768px) { /* sidebar collapse, grid stack */ }
@media (max-width: 480px) { /* download button resize */ }
@media screen and (max-width: 432px) { /* Squarespace mobile */ }

/* Download buttons mobile */
@media (max-width: 480px) {
  .dl-btn { width: 120px; height: 40px; margin: 5px; }
}

/* Mobile header */
header-vert-padding: 6vw;
logo-max-height: 50px;
gutter: 6vw;

/* Fluid grid (no explicit breakpoint needed) */
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* filters */
```

---

## 10. Implementation Tiers

### NORMAL TIER (Site 1)
Apply: Exo 2 font · correct purple tokens (#4d509c primary) · 3 bg depth layers · card lift + shadow · pill badges · glass nav · status colors

### PRECISION TIER (Site 2)
Apply everything in Normal PLUS:
- All 6 bg depth layers with exact hex values
- Full trust rank badge system with color coding
- Status dot components (.status-online/joinme/askme/busy)
- Platform tag system (.tag-pc/.tag-quest/.tag-vrcplus)
- Exact button states: default + hover(scale 1.03) + disabled
- RGB scrollbar (#bd93f9 thumb, 16px radius, transparent track)
- Input focus ring: box-shadow: 0 0 2px 2px #4d90fe
- FAB button (fixed bottom-right, 50x50, 50% radius)
- Glassmorphism panels: rgba(30,30,50,0.6) + blur(12px) + lavender border
- Purple glow on active/hover: rgba(77,80,156,0.6)
- Letter-spacing: 2px on section title/wordmark
- Animation: bounceIn keyframe for modals
- VRCX-style tooltip pattern
- All EBCB8B / D08770 / A3BE8C / 5E81AC / BF616A accent uses
- body::before radial orb ambient effect
