# D2 Dashboard Walkthrough
## Style Direction: "Cool & Responsive"
**Primary Focus:** Color Temperature Cooling + Micro-interaction Polish
**Secondary Focus:** Refined Glassmorphism

---

## 1. Hierarchy Elements (DOM Structure)

```
<body>
└── .container (flex layout, 100vh)
    ├── .sidebar (320px width)
    │   ├── .sidebar-header
    │   │   └── h2 (logo/title)
    │   ├── .utility-section (multiple)
    │   │   ├── .utility-title (section headers)
    │   │   └── .utility-btn (action buttons)
    │   ├── .profile-creator-container
    │   │   ├── .profile-slider
    │   │   ├── .profile-grid-2x1
    │   │   ├── .profile-card-mini
    │   │   └── .profile-card-large
    │   └── .scenario-btn (multiple)
    │
    ├── .map-canvas (flex: 1, center workspace)
    │   ├── #connectionBar (.connection-bar)
    │   ├── #connectionsSVG (SVG for lines)
    │   ├── .toolbar
    │   │   └── .toolbar-row
    │   │       └── .tool-btn
    │   └── .tile-card (multiple, draggable nodes)
    │       ├── .drag-handle
    │       ├── .uncollapse-trigger
    │       ├── .tile-nav-side
    │       │   └── .nav-btn (multiple)
    │       └── .tile-content-main
    │           ├── .tile-header
    │           │   ├── .tile-title-edit
    │           │   ├── .ios-date-picker
    │           │   └── .tile-nav-btns
    │           └── .tile-body
    │               └── .tile-view (multiple views)
    │                   └── .tile-field (form fields)
    │
    └── .release-schedule (320px width, right panel)
        ├── .song-list
        │   └── .song-block (multiple)
        │       ├── .song-content
        │       ├── .song-controls
        │       └── .song-control-btn
        └── .add-song-btn

OVERLAYS (Fixed Position):
├── #youtubeModal
├── #collabOverlay
├── #labelOverlay
├── #seasonPassOverlay
└── .pres-controls (#presControls)
```

---

## 2. Type Elements (UI Components)

### Buttons
| Class | Current Style | Location |
|-------|---------------|----------|
| `.utility-btn` | Glass bg, 0.8rem font, full-width | Sidebar |
| `.utility-btn.primary` | Orange fill, bold | Sidebar CTAs |
| `.nav-btn` | 32x32px, transparent bg | Tile navigation |
| `.tool-btn` | Pill shape, blur bg | Toolbar |
| `.tool-btn.create-btn` | Orange fill | Toolbar primary |
| `.song-control-btn` | 21x21px, subtle glass | Song blocks |
| `.tile-delete-btn` | Red accent, 36x36px | Tile footer |
| `.scenario-btn` | Dark glass, left-aligned | Sidebar |
| `.access-pass-btn` | Rainbow gradient animated | Special CTA |

### Cards/Containers
| Class | Current Style | Location |
|-------|---------------|----------|
| `.tile-card` | 500px wide, glass blur, shadow | Canvas nodes |
| `.song-block` | Glass container, hover lift | Right sidebar |
| `.profile-card-mini` | Small glass card | Profile section |
| `.profile-card-large` | Full-width image container | Profile section |
| `.connection-bar` | Pill shape, blur, border | Top toolbar |
| `.pres-controls` | Fixed panel, deep glass | Floating controls |

### Inputs
| Class | Current Style | Location |
|-------|---------------|----------|
| `.tile-field input` | Recessed dark bg, 10px radius | Tile forms |
| `.tile-field textarea` | Same as input | Tile forms |
| `.tile-field select` | Same as input | Tile forms |
| `.tile-title-edit` | Transparent, bold | Tile header |
| `.tile-date-edit` | Dark bg with border | Tile header |
| `.rolodex-select` | Transparent, orange text | Date picker |
| `.pres-slider` | Custom thumb, thin track | Presentation |

---

## 3. Features (Functional Sections)

### 11 Tile Types
1. **Release** - Music release planning
2. **Milestone** - Goal tracking
3. **Task** - Action items
4. **Decision** - Decision points
5. **Deliverable** - Output tracking
6. **Social Media Posts** - Content planning
7. **Video Showcase** - YouTube embeds
8. **Collaboration Predictor** - AI collab suggestions
9. **Label Predictor** - AI label matching
10. **Social Calendar** - Schedule view
11. **LTX Animator** - Animation controls

### Sidebar Sections
- Navigation controls
- Season Pass button (rainbow gradient)
- Profile Creator (expandable)
- Team Bridge Parser
- Spotify Parsers
- AI Strategist

### Right Panel
- Song list with drag reorder
- Check/complete toggles
- Edit/delete controls
- Add song button

---

## 4. Modes (View States)

| Mode | Trigger | Effect |
|------|---------|--------|
| `.presentation-mode` | Toggle button | Scales panels for presenting |
| `.mode-front` | Tile view button | Shows front-facing view |
| `.collapsed-tile` | Collapse button | Shrinks tile to header only |
| `.tile-card.done` | Check button | Blurs/fades completed tiles |
| `.song-block.done` | Check button | Dims completed songs |
| `.expanded` | Profile toggle | Expands profile section |

---

## 5. Sequences (Workflows)

### Tile Creation Flow
1. Click "Create" in toolbar
2. New tile appears at center
3. Select tile type from dropdown
4. Fill in tile fields
5. Drag to position on canvas
6. Connect to other tiles

### Song Management Flow
1. Click "Add Song" button
2. Fill in song details
3. Drag to reorder in list
4. Mark as complete with check
5. Edit or delete as needed

### Presentation Mode Flow
1. Toggle presentation mode
2. Adjust sidebar/canvas scales
3. Navigate through tiles
4. Exit presentation mode

---

## 6. CSS Implementation Plan - "Cool & Responsive"

### Current CSS Variables (`:root`)
```css
:root {
    --bg-main: #222222;
    --bg-sidebar: #222222;
    --bg-card: #222222;
    --primary: #FA5D29;
    --accent: #49B3FC;
    --text: #ffffff;
    --text-dim: #aaaaaa;
    --border: rgba(255, 255, 255, 0.15);
    --glass: rgba(255, 255, 255, 0.12);
    --glass-deep: rgba(0, 0, 0, 0.2);
    --radius-sm: 4px;
    --radius-md: 4px;
    --radius-lg: 4px;
    --radius-xl: 4px;
    --transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 8px 40px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 16px 60px rgba(0, 0, 0, 0.4);
    --brightness: 1.1;
}
```

### NEW CSS Variables for D2 "Cool & Responsive"
```css
:root {
    /* Base colors - cooler blue-gray tint */
    --bg-main: #191c22;
    --bg-sidebar: #191c22;
    --bg-card: #1d2128;
    --bg-elevated: #242830;

    /* Color cooling - blue takes prominence */
    --primary: #5BC0FF;           /* Cooled to cyan-blue */
    --primary-warm: #E86A45;      /* Warmer orange for accents only */
    --accent: #7DD3FC;            /* Lighter sky blue */
    --accent-secondary: #A78BFA;  /* Cool purple complement */

    /* Text - crisp contrast */
    --text: #f0f4f8;
    --text-dim: #7c8594;
    --text-muted: #5a6270;

    /* Glass - cool tint */
    --border: rgba(91, 192, 255, 0.12);
    --glass: rgba(255, 255, 255, 0.06);
    --glass-deep: rgba(0, 10, 20, 0.4);
    --glass-cool: rgba(91, 192, 255, 0.04);

    /* Corners - modern but not excessive */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    /* MICRO-INTERACTIONS - Fast & responsive */
    --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: 0.15s ease-out;
    --transition-bounce: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

    /* Shadows with cool tint */
    --shadow-sm: 0 2px 6px rgba(0, 15, 30, 0.2);
    --shadow-md: 0 4px 12px rgba(0, 15, 30, 0.25);
    --shadow-lg: 0 8px 20px rgba(0, 15, 30, 0.3);
    --shadow-glow: 0 0 20px rgba(91, 192, 255, 0.15);

    /* Interactive states */
    --hover-lift: translateY(-2px);
    --hover-scale: scale(1.02);
    --active-scale: scale(0.98);

    --brightness: 1.0;
}
```

---

### Property-by-Property Modifications

#### A. Color Temperature Cooling (Primary Focus)

**`body::before` background gradient**
```css
/* BEFORE */
background:
    radial-gradient(circle at 20% 50%, rgba(255, 203, 5, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(248, 88, 136, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(104, 144, 240, 0.08) 0%, transparent 50%);

/* AFTER - Cool blue atmosphere */
background:
    radial-gradient(circle at 20% 50%, rgba(91, 192, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(125, 211, 252, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(167, 139, 250, 0.06) 0%, transparent 50%);
```

**`.map-canvas::before`**
```css
/* BEFORE */
background:
    radial-gradient(circle at 30% 40%, rgba(255, 203, 5, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(248, 88, 136, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(104, 144, 240, 0.04) 0%, transparent 40%);

/* AFTER - Cool workspace glow */
background:
    radial-gradient(circle at 30% 40%, rgba(91, 192, 255, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(167, 139, 250, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(125, 211, 252, 0.03) 0%, transparent 40%);
```

**`.utility-title` accent**
```css
/* BEFORE */
color: var(--primary);
border-left: 3px solid var(--primary);
text-shadow: 0 0 10px rgba(255, 203, 5, 0.3);

/* AFTER - Cool blue accent */
color: var(--primary);
border-left: 3px solid var(--primary);
text-shadow: 0 0 10px rgba(91, 192, 255, 0.25);
```

**`.sidebar-header h2`**
```css
/* BEFORE */
color: var(--primary);

/* AFTER - Blue primary */
color: var(--primary);
text-shadow: 0 0 20px rgba(91, 192, 255, 0.2);
```

**`.date-pill-view`**
```css
/* BEFORE */
background: var(--primary);
color: #000;
box-shadow: 0 2px 10px rgba(255, 203, 5, 0.3);

/* AFTER - Cool pill */
background: var(--primary);
color: var(--bg-main);
box-shadow: 0 2px 10px rgba(91, 192, 255, 0.3);
```

**`.nav-btn.active`**
```css
/* BEFORE */
background: var(--primary);
color: #000;
box-shadow: 0 0 15px rgba(255, 203, 5, 0.3), var(--glow-primary);

/* AFTER - Cool active state */
background: var(--primary);
color: var(--bg-main);
box-shadow: var(--shadow-glow);
```

#### B. Micro-interaction Polish (Primary Focus)

**Global transition standardization**
```css
/* Apply to ALL interactive elements */
--transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
/* Reduced from 0.8s for snappy, professional feel */
```

**`.utility-btn:hover`**
```css
/* BEFORE */
transform: translateY(-2px);

/* AFTER - Subtle, fast response */
transform: translateY(-1px);
transition: var(--transition);
will-change: transform, background;
```

**`.utility-btn.primary:hover`**
```css
/* BEFORE */
transform: translateY(-3px) scale(1.02);

/* AFTER - Controlled scale */
transform: scale(1.02);
transition: var(--transition);
```

**`.tile-card:hover`**
```css
/* BEFORE */
transform: translateY(-4px) scale(1.02);

/* AFTER - Subtle professional lift */
transform: translateY(-2px);
transition: transform var(--transition), box-shadow var(--transition);
will-change: transform;
```

**`.nav-btn:hover`**
```css
/* BEFORE */
transform: translateY(-1px);

/* AFTER - Quick response */
transform: translateY(-1px);
transition: var(--transition-fast);
```

**`.song-block:hover`**
```css
/* BEFORE */
transform: translateY(-2px);

/* AFTER - Smooth micro-lift */
transform: translateY(-1px);
transition: var(--transition);
will-change: transform;
```

**`.tool-btn:hover`**
```css
/* BEFORE */
transform: translateY(-2px);

/* AFTER - Crisp response */
transform: translateY(-1px) scale(1.01);
transition: var(--transition);
```

**`.tile-delete-btn:hover`**
```css
/* BEFORE */
transform: scale(1.15) rotate(5deg);

/* AFTER - Controlled danger state */
transform: scale(1.08);
transition: var(--transition-fast);
```

**`.scenario-btn:hover`**
```css
/* BEFORE */
transform: translateX(5px);

/* AFTER - Subtle slide */
transform: translateX(3px);
transition: var(--transition);
```

**NEW: Active/pressed states**
```css
/* Add to all buttons */
.utility-btn:active,
.nav-btn:active,
.tool-btn:active {
    transform: scale(0.98);
    transition: var(--transition-fast);
}
```

#### C. Refined Glassmorphism (Secondary Focus)

**`.sidebar`**
```css
/* BEFORE */
backdrop-filter: blur(20px);

/* AFTER - Optimized blur */
backdrop-filter: blur(12px);
background: linear-gradient(180deg, var(--bg-sidebar) 0%, rgba(25, 28, 34, 0.92) 100%);
```

**`.tile-card`**
```css
/* BEFORE */
backdrop-filter: blur(15px);
border: 1px solid rgba(255, 255, 255, 0.08);

/* AFTER - Cool frost */
backdrop-filter: blur(10px);
border: 1px solid rgba(91, 192, 255, 0.1);
background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%);
```

**`.connection-bar`**
```css
/* BEFORE */
border: 1px solid var(--primary);
backdrop-filter: blur(20px);

/* AFTER - Cool toolbar */
border: 1px solid rgba(91, 192, 255, 0.3);
backdrop-filter: blur(14px);
background: linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-card) 100%);
```

**`.tool-btn`**
```css
/* BEFORE */
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);

/* AFTER - Cool glass buttons */
background: var(--glass-cool);
backdrop-filter: blur(12px);
border: 1px solid rgba(91, 192, 255, 0.08);
```

---

### Color Accent Replacements

| Element | Before (Orange) | After (Cool Blue) |
|---------|-----------------|-------------------|
| `.utility-title` text-shadow | `rgba(255, 203, 5, 0.3)` | `rgba(91, 192, 255, 0.25)` |
| `.drag-handle` gradients | `rgba(255, 203, 5, *)` | `rgba(91, 192, 255, *)` |
| `.uncollapse-trigger` shadow | `rgba(255, 203, 5, 0.4)` | `rgba(91, 192, 255, 0.4)` |
| `.song-block.active` shadow | `rgba(255, 203, 5, 0.1)` | `rgba(91, 192, 255, 0.1)` |
| `.tile-card.selected` shadow | `rgba(255, 203, 5, 0.15)` | `rgba(91, 192, 255, 0.15)` |
| `@keyframes pulse` | `rgba(250, 93, 41, *)` | `rgba(91, 192, 255, *)` |

**NOTE:** Keep `.access-pass-btn` rainbow gradient as-is for visual interest contrast.

---

### Transition Timing Reference

| Interaction Type | Duration | Easing |
|------------------|----------|--------|
| Button hover | 150ms | ease-out |
| Button active/press | 100ms | ease-out |
| Card hover | 200ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Panel expand | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Fade in/out | 200ms | ease |
| Bounce effects | 300ms | cubic-bezier(0.34, 1.56, 0.64, 1) |

---

## 7. Visual Reference

**Style Inspiration: "Cool & Responsive"**
- Vercel's dashboard interface
- Raycast's command palette
- Arc browser's space switching
- Discord's modern dark theme

**Key Visual Characteristics:**
- Cool blue primary replaces warm orange
- Ultra-fast micro-interactions (150-200ms)
- Subtle but noticeable hover states
- will-change optimizations for smooth animation
- Active press states for tactile feedback
- Cool-tinted glass effects
- Purple as secondary accent color

---

## 8. Implementation Checklist

- [ ] Update `:root` color variables
- [ ] Replace all orange glow/shadow references with blue
- [ ] Standardize all transition values to 0.2s
- [ ] Add `will-change` to hoverable elements
- [ ] Add `:active` states to all buttons
- [ ] Update gradient backgrounds to cool tones
- [ ] Reduce hover transform values
- [ ] Test micro-interactions feel responsive
- [ ] Verify rainbow gradient still works on access pass
- [ ] Check all 11 tile types render with new colors
