# D1 Dashboard Walkthrough
## Style Direction: "Frosted Professional"
**Primary Focus:** Refined Glassmorphism + Depth/Shadow System
**Secondary Focus:** Typography Refinement

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

## 6. CSS Implementation Plan - "Frosted Professional"

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

### NEW CSS Variables for D1 "Frosted Professional"
```css
:root {
    /* Base colors - slightly cooler */
    --bg-main: #1a1d21;
    --bg-sidebar: #1a1d21;
    --bg-card: #1e2227;

    /* Primary shifts cooler orange, accent stays blue */
    --primary: #E85A30;
    --accent: #4DB8FF;
    --accent-glow: rgba(77, 184, 255, 0.15);

    /* Text - higher contrast */
    --text: #f5f5f7;
    --text-dim: #8b8d94;

    /* Glass - optimized transparency */
    --border: rgba(255, 255, 255, 0.12);
    --glass: rgba(255, 255, 255, 0.08);
    --glass-deep: rgba(0, 0, 0, 0.35);
    --glass-frost: rgba(255, 255, 255, 0.04);

    /* Premium rounded corners */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-xl: 28px;

    /* Faster, professional transitions */
    --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: 0.15s ease-out;

    /* Refined 3-tier shadow system */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15);

    /* NEW: Crisp luminous borders */
    --border-glow: rgba(255, 255, 255, 0.18);
    --frost-border: 1px solid rgba(255, 255, 255, 0.1);

    --brightness: 1.0;
}
```

---

### Property-by-Property Modifications

#### A. Refined Glassmorphism (Primary Focus)

**`.sidebar`**
```css
/* BEFORE */
backdrop-filter: blur(20px);
background: var(--bg-sidebar);
border-right: 1px solid var(--border);

/* AFTER - Optimized frost */
backdrop-filter: blur(12px);
background: linear-gradient(180deg, var(--bg-sidebar) 0%, rgba(26, 29, 33, 0.95) 100%);
border-right: 2px solid var(--border-glow);
```

**`.tile-card`**
```css
/* BEFORE */
backdrop-filter: blur(15px);
background: var(--bg-card);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 8px;

/* AFTER - Premium frost */
backdrop-filter: blur(10px);
background: linear-gradient(135deg, var(--bg-card) 0%, rgba(30, 34, 39, 0.9) 100%);
border: 2px solid var(--border-glow);
border-radius: var(--radius-lg);
```

**`.connection-bar`**
```css
/* BEFORE */
backdrop-filter: blur(20px);
border: 1px solid var(--primary);

/* AFTER - Crisp frost bar */
backdrop-filter: blur(14px);
border: 2px solid rgba(232, 90, 48, 0.6);
box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.08);
```

**`.pres-controls`**
```css
/* BEFORE */
backdrop-filter: blur(20px);
background: var(--glass-deep);

/* AFTER - Deep frost panel */
backdrop-filter: blur(16px);
background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%);
border: 2px solid var(--border-glow);
```

#### B. Depth & Shadow System (Primary Focus)

**`.tile-card` shadows**
```css
/* BEFORE */
box-shadow: var(--shadow-md), 6px 6px 0px rgba(255, 255, 255, 0.1);

/* AFTER - Refined layered shadows */
box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.05);
```

**`.tile-card:hover`**
```css
/* BEFORE */
transform: translateY(-4px) scale(1.02);
box-shadow: var(--glow-primary);

/* AFTER - Subtle professional lift */
transform: translateY(-2px) scale(1.01);
box-shadow: var(--shadow-lg), 0 0 0 2px rgba(232, 90, 48, 0.2);
```

**`.utility-btn`**
```css
/* BEFORE */
background: rgba(255, 255, 255, 0.05);

/* AFTER - Crisp inset feel */
background: var(--glass-frost);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), var(--shadow-sm);
```

**`.tile-field input/textarea`**
```css
/* BEFORE */
background: rgba(0, 0, 0, 0.2);
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);

/* AFTER - Professional inset */
background: rgba(0, 0, 0, 0.25);
box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
```

#### C. Typography Refinement (Secondary Focus)

**`.sidebar-header h2`**
```css
/* BEFORE */
font-size: 1.5rem;
font-weight: 800;
letter-spacing: -0.02em;

/* AFTER - Tighter tracking */
font-size: 1.5rem;
font-weight: 800;
letter-spacing: -0.03em;
```

**`.utility-title`**
```css
/* BEFORE */
font-size: 0.7rem;
letter-spacing: 0.15em;

/* AFTER - Sharper uppercase */
font-size: 0.65rem;
letter-spacing: 0.12em;
font-weight: 700;
```

**`.tile-title-edit`**
```css
/* BEFORE */
font-size: 15px;
font-weight: 800;

/* AFTER - Better hierarchy */
font-size: 14px;
font-weight: 700;
letter-spacing: -0.02em;
```

**`.tile-field-label`**
```css
/* BEFORE */
font-size: 0.65rem;
letter-spacing: 0.15em;
opacity: 0.25;

/* AFTER - Cleaner labels */
font-size: 0.6rem;
letter-spacing: 0.1em;
opacity: 0.35;
font-weight: 700;
```

**`body`**
```css
/* BEFORE */
line-height: 1.6;

/* AFTER - Tighter body text */
line-height: 1.5;
```

---

### Micro-interaction Adjustments

**All buttons hover**
```css
/* Standardize to subtle scale */
transform: scale(1.02);
/* Instead of translateY(-2px) scale(1.02) */
```

**Transition timing**
```css
/* Global standard */
--transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
/* Down from 0.8s for snappier feel */
```

---

## 7. Visual Reference

**Style Inspiration: "Frosted Professional"**
- Apple's macOS Ventura control panels
- Linear.app's card interface
- Figma's dark mode panels
- Notion's glass-like containers

**Key Visual Characteristics:**
- Subtle frosted glass with visible but not heavy blur
- Crisp 2px luminous borders
- Layered shadows that create depth without being dramatic
- Premium rounded corners (20px on cards)
- Tight typography with clear hierarchy
- Cool-toned base with warm orange accent

---

## 8. Implementation Checklist

- [ ] Update `:root` CSS variables
- [ ] Modify `.sidebar` glassmorphism
- [ ] Update `.tile-card` styling
- [ ] Refine `.connection-bar` appearance
- [ ] Adjust all shadow values
- [ ] Update typography letter-spacing
- [ ] Standardize hover transitions
- [ ] Test all tile types render correctly
- [ ] Verify overlays still function
- [ ] Check presentation mode scaling
