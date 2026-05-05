# iOS Design System Reference for Web App Emulation

## Target: iPhone X and Later (2025-2026 Patterns)

All values are based on Apple's Human Interface Guidelines, the SF Pro type system, and iOS semantic color system. Point values from iOS map 1:1 to CSS `px` on a standard web viewport with `<meta name="viewport" content="width=device-width, initial-scale=1">`.

---

## 1. TYPOGRAPHY

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
  'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Text Styles

| Style | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| Large Title | 34px | 700 | 41px | 0.37px |
| Title 1 | 28px | 400 | 34px | 0.36px |
| Title 2 | 22px | 400 | 28px | 0.35px |
| Title 3 | 20px | 400 | 24px | 0.38px |
| Headline | 17px | 600 | 22px | -0.41px |
| Body | 17px | 400 | 22px | -0.41px |
| Callout | 16px | 400 | 21px | -0.32px |
| Subhead | 15px | 400 | 20px | -0.24px |
| Footnote | 13px | 400 | 18px | -0.08px |
| Caption 1 | 12px | 400 | 16px | 0 |
| Caption 2 | 11px | 400 | 13px | 0.07px |

---

## 2. COLOR SYSTEM (Dark Mode First)

### Backgrounds
| Token | Value |
|-------|-------|
| systemBackground | `#000000` |
| secondarySystemBackground | `#1C1C1E` |
| tertiarySystemBackground | `#2C2C2E` |

### Labels
| Token | Value |
|-------|-------|
| primary | `#FFFFFF` |
| secondary | `rgba(235,235,245,0.6)` |
| tertiary | `rgba(235,235,245,0.3)` |
| quaternary | `rgba(235,235,245,0.18)` |

### Fills
| Token | Value |
|-------|-------|
| systemFill | `rgba(120,120,128,0.36)` |
| secondaryFill | `rgba(120,120,128,0.32)` |
| tertiaryFill | `rgba(118,118,128,0.24)` |

### Separators
| Token | Value |
|-------|-------|
| separator | `rgba(84,84,88,0.6)` |
| opaqueSeparator | `#38383A` |

### System Colors
| Color | Dark Mode |
|-------|-----------|
| Blue | `#0A84FF` |
| Green | `#30D158` |
| Red | `#FF453A` |
| Orange | `#FF9F0A` |
| Yellow | `#FFD60A` |
| Pink | `#FF375F` |
| Purple | `#BF5AF2` |
| Teal | `#64D2FF` |
| Indigo | `#5E5CE6` |

### Gray Scale
| Token | Dark Mode |
|-------|-----------|
| Gray | `#8E8E93` |
| Gray2 | `#636366` |
| Gray3 | `#48484A` |
| Gray4 | `#3A3A3C` |
| Gray5 | `#2C2C2E` |
| Gray6 | `#1C1C1E` |

---

## 3. LAYOUT

### Structural Dimensions
| Component | Height |
|-----------|--------|
| Nav bar (inline) | 44px |
| Nav bar (large title) | 96px |
| Tab bar | 49px + 34px safe |
| Search bar | 36px |
| Standard cell | 44px |
| Safe area top | 44-59px |
| Safe area bottom | 34px |

### Corner Radii
- Small: 8px (tags, badges)
- Medium: 10px (buttons, inputs, segmented)
- Card: 12px
- Large: 16px
- Sheet: 12px
- Pill: 9999px

### Spacing
- Horizontal margin: 16px (20px on 414px+)
- Grouped list inset: 20px
- Section gap: 35px
- Cell padding: 11px vertical, 16px horizontal

---

## 4. VISUAL EFFECTS

### Blur
```css
background: rgba(0,0,0,0.72);
-webkit-backdrop-filter: saturate(180%) blur(20px);
backdrop-filter: saturate(180%) blur(20px);
```

### Animation Curves
```css
--ios-ease: cubic-bezier(0.25, 0.1, 0.25, 1.0);
--ios-spring: cubic-bezier(0.175, 0.885, 0.32, 1.1);
--ios-spring-soft: cubic-bezier(0.23, 1, 0.32, 1);
--ios-duration-normal: 0.35s;
```

### Dark Mode Elevation
| Level | Color | Usage |
|-------|-------|-------|
| 0 | `#000000` | Base background |
| 1 | `#1C1C1E` | Cards, nav bar |
| 2 | `#2C2C2E` | Elements on cards |
| 3 | `#3A3A3C` | Nested elements |
| 4 | `#48484A` | Deep nesting |

Lighter = higher elevation. No shadows in dark mode.

---

## 5. QUICK REFERENCE

| Pattern | Value |
|---------|-------|
| Border width | `0.5px` |
| Min tap target | `44px` |
| Active state opacity | `0.7` |
| Disabled opacity | `0.3` |
| Separator dark | `rgba(84,84,88,0.6)` |
| Input caret | `#0A84FF` |
| Grabber handle | `36px x 5px`, radius `2.5px` |
