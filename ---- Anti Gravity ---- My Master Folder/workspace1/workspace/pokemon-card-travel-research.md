# Pokemon Card Travel & Rotation — Research Notes
> For: Wing Menu Dashboard — Star Button Expand Animation

---

## Example 1: TushantMan/Pokemon-3D-Card
**Repo:** https://github.com/TushantMan/Pokemon-3D-Card

**Technique:** Interactive 3D hover card that rotates toward cursor. Card tilts, nested elements translate forward in 3D space.

**Key Code:**
```css
.container { perspective: 1200px; }
.card {
  transform-style: preserve-3d;
  transition: all 0.5s ease-out;
}
.logo, .pika {
  transition: all 0.3s ease-out;
}
```

**Motion Pattern:**
- Mouse-tracking rotation: `rotateY(+x°) rotateX(-y°)` applied dynamically
- Parallax travel: nested elements use `translate3d(0, 0, 20px)` to move forward on hover
- Reset: slower 0.5s transition back to flat

**Best for:** Hover-based rotation during motion itself

---

## Example 2: simeydotme/pokemon-cards-css
**Repo:** https://github.com/simeydotme/pokemon-cards-css

**Technique:** Card fanning/stacking with cursor-aware 3D rotation. Active card expands/scales into center.

**Key Code:**
```css
.card {
  transform: rotateZ(var(--rotation)) translateX(var(--offset));
  z-index: calc(var(--card-scale) * 10 + 50);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.card.active {
  transform: translate3d(0, 0, 0.1px) !important;
  z-index: 999;
}
```

**Motion Pattern:**
- CSS custom properties drive real-time cursor-based perspective
- Active state resets transform and bumps z-index for "zoom into center" effect
- Smooth expand: `transition: opacity 0.2s ease, transform 0.2s ease`

**Best for:** The expand-scale-and-center motion we want for the star card

---

## What We're Taking From This

| Pattern | Our Application |
|---|---|
| `perspective` on parent container | Add to `.center-pad` for 3D context |
| `transform-style: preserve-3d` | On the star card for depth |
| `transition: transform 0.4s ease-out` | Smooth expand from 0 to full size |
| Scale + translate combo | Card scales from `scale(0.8)` → `scale(1)` while fading in |
| z-index bump on active | Star card gets z-index above tiles |
| `translate3d(0, 0, 0.1px)` trick | GPU acceleration for smoother animation |
