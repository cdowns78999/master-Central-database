# Future Updates & Expansion Guide
*This document outlines the protocol for expanding the Ocean Protocol Dashboard with new features and pages.*

## Core Philosophy
When a request comes in for a **"new page"** or a **"new handle,"** the objective is to seamlessly integrate the new functionality into the existing ecosystem. Every new feature should feel like a natural extension of the **Stone aesthetic** and **Inertia-driven interaction model**.

## Implementation Protocol
1. **Sidebar Synchronization**: Every new page must be added to the navigation sidebar in `dashboard.html`, `cards.html`, `actions.html`, and `settings.html`.
2. **Styling Consistency**: 
   - Use `style.css` for layout and sidebar styles.
   - Use `tile-component.css` for the "Stone" surfaces and variables.
3. **Component Reuse**: Leverage the `StoneTile` class from `tile-component.js` whenever managing individual entities (Artists, Contacts, Assets).
4. **Persistence**: Ensure data is either synced via `google-drive.js` or persisted in `localStorage` under the existing session keys.
5. **AI Persistent Context**: When locked in AGENTIC mode, the assistant MUST re-read the `.md` maintenance files (Task, Plan, Walkthrough) at the beginning of each relevant task to ensure precise redirection and context consistency.
6. **Communication Protocol**: All verbal output from the assistant to the user while in AGENTIC mode MUST start with a triple lock icon: 🔒🔒🔒. This is a visual handshake confirming mode lock.

---

## Active Example: "Resource Tracker / Contact Assets"
*Request: "A new page to handle a multi-category grid system for tracking contact names, their assets, and producing a quick list of resources."*

### Proposed Blueprint for `resources.html`

### 1. The Structure
- **Navigation**: Add `<a href="resources.html" class="nav-link">Resources</a>` to the sidebar.
- **Main View**: A grid system similar to `cards.html` but optimized for "Asset Management."

### 2. High-Level Features
- **The "Contact Asset" Tile**:
  - A specialized variant of `StoneTile`.
  - **Categories**: `Press Media`, `Legal/IDs`, `Financials`, `Links`.
  - **Fields**: Path links, expiry dates, and status (e.g., "Ready", "Missing").
- **Asset Quick-Fill**:
  - A "Lab" view to batch-assign Google Drive folder links to multiple contacts at once.
- **Resource Producer**:
  - A singleton function that gathers all "Active" links for a selected contact and produces a formatted markdown list/summary for instant sharing.

### 3. Data Flow
- Store asset data within the `projectData` object of the contact tile.
- Use a new `assetDB` key in the saved JSON to track global resource paths.

---

## Mandatory Update Protocol: The Walkthrough
To ensure every update has a **"good effect"** and remains maintainable, every feature addition or significant modification **MUST** be accompanied by a dedicated walkthrough file named `walkthrough_[feature_name].md`.

### Walkthrough Template
Every walkthrough file must follow this 4-part structure:

### I. [NEW PAGE ADDED] (or [SYSTEM UPDATE])
**Feature Name**: *Name of the update*
**Date**: *Timestamp*

**Changes Detail**:
- **Step 1**: Description of file creation/modification (e.g., `resources.html`).
- **Step 2**: Description of logic integration (e.g., `StoneTile` subclassing).
- **Step 3**: Sidebar updates across all existing pages.

### II. [HOW IT WORKS]
*Visual & Interaction Summary:*
- **Entry Point**: Where to find the new feature.
- **Key Interactions**: Hover effects, inertia behaviors, or batch actions added.
- **Premium Touches**: CSS animations or transitions used to maintain the "Wow" factor.

### III. [WHY IT MATTERS]
*System Impact & Value:*
- **Standardization**: How this maintains the look and feel of the brand.
- **Efficiency**: How it speeds up the workflow or data management.
- **Scalability**: How it prepares the system for the next 100 entries.

### IV. [WHY IT FITS YOUR REQUEST]
*Direct alignment with the User's Vision:*
- Explain how the specific implementation solves the problem asked in the prompt.
- Detail the chosen aesthetics and why they were selected for this specific request.

---

## Guidelines for Quick & High-Effect Updates
- **Standardize the Grid**: Always use the 420px column width for consistency.
- **Header Sync**: Ensure the page title and status dot match the "Active" state of the dashboard.
- **Zero Placeholder Policy**: If a placeholder is needed, generate a high-quality asset immediately using the `generate_image` tool.
