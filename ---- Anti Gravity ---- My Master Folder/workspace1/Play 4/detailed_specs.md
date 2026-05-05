# Aetheric Hearts: Detailed Specifications

Following the "study" of our Phase Plan, this document defines the specific technical attributes for the "Aetheric Hearts" carousel.

## 1. The Discord Navigation Tray
- **Position**: Fixed bottom, 100% width, height ~80px.
- **Background**: `rgba(47, 49, 54, 0.8)` with a 20px blur (Glassmorphism).
- **Buttons**:
    - Three circular icons (minimal glyph style).
    - Colors: `#b9bbbe` (default), `#ffffff` (hover/active), `#5865f2` (glow effect on poke).
    - Feedback: Scale-up by 10% on hover; a brief ripple effect on click.

## 2. The Heart Carousel State
- **Logic**: A 0-indexed circular array `[0, 1, 2]`.
- **Transitions**: Horizontal slide with a `cubic-bezier(0.4, 0, 0.2, 1)` easing for a fluid feel.
- **Variant Mapping**:
    - `0`: Neon Pulse (Red-Pink glow, heartbeat scale logic).
    - `1`: Prismatic Prism (Cyan-Gold gradient, gentle rotation).
    - `2`: Ethereal Echo (White-Violet, radiating box-shadow rings).

## 3. The "Poke" Mechanic
- Interacting with a heart or its corresponding button triggers the `poke` animation state.
- **Visuals**:
    - Instant scale to 1.3x followed by a bounce back to 1.0x.
    - Temporary opacity drop of the background for a "flash" effect.
    - Sound (optional/visual only): A brief particle burst using CSS `box-shadow` or pseudo-elements.

## 4. UI/UX Refinements
- **Font**: 'Inter' or monospaced font for a "terminal/dev" vibe in optional labels.
- **Dark Mode**: Deep `#1a1a1a` background to make the heart glows pop.
- **Responsiveness**: Centered flexbox layout ensuring the carousel stays focused on all screen sizes.
