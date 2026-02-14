# Implementation Plan - "Ignition & Evolution" Visualizer

The goal is to create a multi-stage, real-time visualizer for the Lead Tracker (Golden Circle) that reacts instantly when any of the 10 data fields (5 checkboxes, 5 notes) are interacted with. This will be a "Kingdom Hearts" inspired cinematic experience.

## User Review Required

> [!IMPORTANT]
> - **Real-Time Ignition**: The moment a user types a character or clicks a checkbox, the Lead Tracker will emit a "Lens Flare Burst".
> - **Visualizer Evolution**: The complexity of the "Shard & Thorn" animation will scale with the amount of data. 1 field = subtle swirl, 10 fields = intense, high-speed "Final Form" visualizer.
> - **Symmetry Focus**: The visualizer will use 4 layers of rotating shards to ensure the "busy yet symmetrical" look requested.

## Proposed Changes

### findme.html

1.  **CSS: The Evolutionary Visualizer**:
    *   **Layer 1 (Subway)**: Slow rotating base glow.
    *   **Layer 2 (Thorns)**: Sharp `clip-path` shards that appear when 1+ fields are filled.
    *   **Layer 3 (Storm)**: High-speed counter-rotating white "wind" tendrils for high completion (5+ fields).
    *   **Layer 4 (Supernova)**: A pulsing radial gradient background that expands when all 10 fields are filled.
    *   **Ignition Keyframes**: A `burst` animation that triggers a 1-second white-out glow.

2.  **JavaScript: Real-Time Monitoring**:
    *   **`saveLeadData` Update**: Calculate a "Completion Score" (0-10).
    *   **`updateGlows` Update**: 
        *   Transition the `.lead-tracker` through different states based on score: `state-low`, `state-mid`, `state-high`, `state-max`.
        *   Detect if a value *changed* to non-empty to trigger the `ignition` class temporarily (burst effect).
    *   **Event Listeners**: Ensure `oninput` for text fields and `onchange` for checkboxes trigger the update instantly with no lag.

## Verification Plan

### Manual Verification
*   Open the Lead Card and type a single letter. Observe the instant "burst" on the Golden Circle.
*   Check all 5 boxes and fill all 5 notes. Verify the visualizer reaches its most "busy" and "exquisite" state.
*   Clear all fields and verify the visualizer returns to its dormant state gracefully.
