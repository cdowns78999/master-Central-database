---
description: Automatically add a new link to the Mapper dashboard grid when dropped in chat.
---

# Link Drop Automation Protocol

When the user provides a URL in the chat with no other instructions:

1.  **Target File**: `c:\Users\chad\OneDrive\Documents\---- Anti Gravity ---- My Master Folder\- -         MAPPER UPDATE\chad7a-MAaaaPPER-v2.html`
2.  **Logic**:
    -   Locate `<div class="mapper-grid">`.
    -   Insert the new `<a>` tag at the **absolute top**.
    -   Follow exactly this template:
        ```html
        <a href="[URL]" target="_blank" class="p-btn">
            <div class="dot"></div>
            <div class="btn-text-container">
                <span class="btn-label">[Extracted Label]</span>
                <span class="url-text">[Domain/Slug]</span>
            </div>
        </a>
        <div></div>
        ```
    -   **Rule**: Always confirm the grid alternating sequence (A, Spacer, B, Spacer).
3.  **Completion Cue**:
    -   End the output with a copy box:
        ```text
        confirmed
        ```
