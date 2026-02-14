# Proposal Pro V3 Master Blueprint

This document defines the hierarchy, logic, and sequence for the final "Master" version of the Proposal Generator.

## 1. Hierarchy & Structure
The application flows top-to-bottom in a logical user journey.

### A. Stage 1: Identity (The Input)
- **Primary Input**: Global Spotify URL bar with auto-detect.
- **Auto-Pop UI**: Floating Glassmorphism Hero Section that displays Artist Name, high-res Image, and Platform Badge.

### B. Stage 2: Strategy Definition (The Vision)
- **Field 1 (Vertical Fluid)**: Auto-populated with a base strategy based on the artist's genre/profile. Full edit capability.
- **Field 2 (Timeline)**: Focused input for campaign phases and duration.

### C. Stage 3: Service Mapping (The Engine)
- **Field 3 (Service Picker)**: Intelligent search bar linked to the pricing database.
- **Dynamic Ledger**: 
    - Real-time line item insertion.
    - Automatic subtotaling.

### D. Stage 4: Incentives & Validation (The Deal)
- **Discount Module**: Fixed percentage input with "Price Impact" visualization.
- **Bonus Engine**: Dual-input fields for adding value-add services.
- **Deadline Module**: Expiration date picker with a "Time Remaining" warning.

### E. Stage 5: Generation (The GO Button)
- **Action**: A high-impact, pulsing "GO" button that locks inputs and generates the premium card visualization.

### F. Stage 6: Delivery (The Payload)
- **Visual Card**: A premium, 3D animated card mirroring the `chad6b` styling.
- **Reveal Code**: Hidden section that unveils the JSON/HTML code wrap with one-click copy.
- **Copy Text**: Legacy text export for quick messaging.

---

## 2. Logic Flow
1. **URL Input** -> `extractSpotifyID()` -> `fetchSpotifyOEmbed()` -> Update Identity Stage.
2. **Identity Update** -> Trigger default text for Stage 2 (Field 1).
3. **Field 3 Focus** -> Trigger `Service Search Engine` -> Select Item -> `updateLedger()`.
4. **Any Pricing Change** -> Trigger `calculateGrandTotal()` -> Update Ledger UI.
5. **GO Click** -> `generateVisualPreview()` -> Animate Results Area into view.
6. **Reveal Click** -> `wrapCode()` -> Inject into syntax-highlighted block.

---

## 3. Sequence (Final Implementation Checklist)
- [ ] Implement stage-based CSS (Glassmorphism + Stage Nav).
- [ ] Port and optimize Spotify parsing logic.
- [ ] Build the searchable Service Picker (V3 optimized).
- [ ] Implement the Dynamic Pricing Ledger with Discount/Bonus impacts.
- [ ] Design and code the V3 "Premium Visualization Card" (Mirrors Matrix + 6b).
- [ ] Build the One-Click Code Wrap section.
