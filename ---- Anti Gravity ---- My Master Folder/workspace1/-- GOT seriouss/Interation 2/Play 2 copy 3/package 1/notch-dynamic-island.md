# Dynamic Island — Notch Expansion Research

## Approach
CSS keyframes + classList toggle (tommyxst pattern from GitHub)

## Key Design Decisions
- Collapsed state: 180x30px pill, border-radius 20px
- Expanded state: 340x280px island, border-radius 24px
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring overshoot
- 80% overshoot trick: `scale(1.06)` at 80% keyframe then settle to `scale(1)` at 100% — gives Apple bounce feel
- Expand duration: 0.5s, Collapse duration: 0.35s (snappier)
- Content reveal: `max-height 0 → auto`, `opacity 0 → 1`, delayed 0.15s after expand starts

## 3 GitHub Implementations Referenced
1. **tommyxst/dynamic-island** — classList toggle + CSS keyframes, smooth pill-to-island, pure CSS approach
2. **niceprogrammer/apple-dynamic-island** — Uses CSS custom properties + requestAnimationFrame for size transitions
3. **nicolo-ribaudo/dynamic-island-css** — Pure CSS with container queries, scale overshoot technique

## CSS Keyframes Blueprint

```css
@keyframes notch-expand {
    0% { width: 180px; height: 30px; border-radius: 20px; }
    80% { width: 354px; height: 294px; border-radius: 25px; transform: translateX(-50%) scale(1.06); }
    100% { width: 340px; height: 280px; border-radius: 24px; transform: translateX(-50%) scale(1); }
}

@keyframes notch-collapse {
    0% { width: 340px; height: 280px; border-radius: 24px; }
    100% { width: 180px; height: 30px; border-radius: 20px; }
}
```

## Content Fade Pattern
```css
.notch-content {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    transition-delay: 0s;
}

.notch.expanded .notch-content {
    max-height: 400px;
    opacity: 1;
    transition-delay: 0.15s;
}
```

## Implementation Notes
- notch-bar holds the collapsed pill content (dots + label)
- notch-content holds expanded island content (grid, buttons)
- Click on notch-bar toggles .expanded class
- .expanded separate from .active (assistant mode) — can be expanded without being active
- z-index 200 keeps it above everything
