# Spotify Link Manager: The Running Register
## Entry 06: Vertical Stack Refinement

### What I Did
- Refined the "Selection Mode" layout to enforce a **Vertical Stack** for curated items.
- **Reasoning**: The user preferred items to stack on top of each other rather than going side-by-side, which further aligns with the "list" aesthetic of the master registry.
- **Layout Update**:
    - Changed `drop-zone` from a multi-column grid to a **Flex Column**.
    - Maintained the 0.75rem gap for consistent spacing between cards.
    - Kept the horizontal rectangle shape (300px wide).

### What Happened
- Dropping a second tile now correctly stacks it directly below the first one.
- The curated list now looks like a "mini" version of the master list, preserving the Dave Ramsey hierarchy.

### Notes
- Persistence is still active—the stack will restore its order on refresh.
