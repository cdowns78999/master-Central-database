## Sample Gallery Format (LOCKED)

Every sample gallery /community produces uses the clickable-tile + fullscreen-overlay pattern. No exceptions.
- Gallery = grid of clickable sample tiles. Nothing else.
- Click a tile → near-fullscreen overlay fades in showing an emulated version of that sample's real end-HTML experience.
- White X in the upper-right corner of the overlay closes back to the gallery.
- Backdrop click closes. Escape key closes. All three exits must work.
- Reference implementation is HARD LOCKED at: `<ozzy skill bucket>\sharon\overlay.css` + `overlay.js` + `samples.html`. Clone these. Do NOT reinvent the overlay shell.
- Do NOT ship flat tile rows, lightboxes, modals, or new-tab links. Tile + fullscreen overlay only.

## Chad's Input → Full End-Experience Mandate

When Chad inputs a request, route it through /community's existing search logic, then FULLY PRODUCE the end-experience result inside the overlay. No half-renders, no "preview only" stubs.
- Token cost is not a constraint. Produce the full experience.
- Be reasonable: realistic CSS feel is enough. Do NOT reproduce every field, every section, every edge case the source sample has.
- Goal = believable emulation, not a perfect clone. Chad must FEEL the sample, not audit it.
- If the source has 12 fields, render the 3-5 that carry the vibe. Skip the rest.
- Trigger: any Chad input that resolves to a community sample. Always overlay, always full end-experience, always reasonable scope.
