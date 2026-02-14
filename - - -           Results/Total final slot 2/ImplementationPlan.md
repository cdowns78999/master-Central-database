# Implementation Plan - Standard Workflow UI and Shortcut Hub

Refining the dashboard to balance the "Sims" cluster aesthetic with a "Professional/Standard" workflow tile system.

## Proposed Changes

### 1. Shortcut Hub (Main Cluster)
- **Hover Activation**: The circular pie menu will now reveal itself on **hover** of the main grid nodes, rather than requiring a click.
- **New Shortcut Labels**: The 6 menu options will be updated to:
    - Spotify
    - Press
    - SoundCloud
    - YouTube
    - Social
    - Other
- **Intelligent Pre-filling**: Each shortcut will map to a unique set of pre-configured "Workflow Fields" (e.g., clicking 'Spotify' will automatically generate nodes for 'Artist Profile', 'Track Link', 'Pitching', etc.).

### 2. Standardized Workflow UI (Inside Tile)
- **Quieter Aesthetics**: Redesign the `.station` nodes to be professional capsule/pill shapes.
- **Visual Palette**: Neutral dark backgrounds with subtle borders, moving away from the bright Sims palette inside the management area.
- **Centered Typography**: Ensuring labels are clean and readable for workflow management.

### 3. Interaction Logic
- **Hover to View / Click to Select**: Hover to see the hub, Click a shortcut to "Roll Out" the pre-filled workflow.
- **Double-Click Green**: Unified system where double-clicking ANY node (Main node, Step node, or Workflow node) toggles its "Done" state (Green with Checkmark).
- **Persistent Roll-out**: Maintain the existing logic where clicking a step reveals its workflow without hiding others.

## Tasks

- [ ] Update CSS for "Standard Workflow" pills (`.station`) and Checkmarks.
- [ ] Implement Hover-triggered Pie Menu in CSS/JS.
- [ ] Define the `ShortcutRegistry` with pre-filled field names for each service (Spotify, etc.).
- [ ] Update `openTile` to handle shortcut-specific data initialization.
- [ ] Synchronize changes across `z1.html`, `z2.html`, `z3.html`, and `z4.html`.
