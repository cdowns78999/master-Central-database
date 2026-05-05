# c-latest-and-greatest

Automation folder for the `/c-latest-and-greatest` skill. Holds the master HTML template and per-run output files.

---

## What this folder is for

- Stores the **master output template** (`output-template.html`) — the subtle-grey, minimalist shell that every skill run clones and fills.
- Stores **rendered outputs** — one HTML file per skill invocation, saved as `output-{timestamp}.html`.
- Acts as the canonical home for anything the `/c-latest-and-greatest` skill needs to read, write, or serve.

---

## Toast protocol

Every time the skill runs, it follows these three steps in order:

1. **Check template** — read `output-template.html` in this folder. If missing or corrupted, stop and alert.
2. **Render** — replace every `{{TOKEN}}` in the template with the content gathered by the skill (CodePen results, GitHub results, tools list, topic, timestamp, etc).
3. **Save** — write the rendered HTML to this folder as `output-{timestamp}.html` (e.g. `output-2026-04-13T14-32-05.html`). The template itself is never modified.

The skill then opens the rendered file in Chrome for review.

---

## Template tokens

The template contains the following placeholders. The skill must replace all of them before saving.

| Token | Replaced with |
|---|---|
| `{{TOPIC}}` | The search topic / subject line the user requested |
| `{{GENERATED_AT}}` | ISO 8601 timestamp of when the run finished |
| `{{CODEPEN_RESULTS}}` | HTML string of `.card` blocks for fresh CodePen pens |
| `{{CODEPEN_DEMO_RESULTS}}` | HTML string of `.card` blocks for CodePen live demos |
| `{{GITHUB_RESULTS}}` | HTML string of `.card` blocks for GitHub repos |
| `{{GITHUB_EXAMPLE_RESULTS}}` | HTML string of `.card` blocks for GitHub example snippets |
| `{{TOOLS_TO_KNOW}}` | HTML string of `<li>...</li>` items for the Tools callout |

### Card shape (for the four result slots)

```html
<div class="card">
  <div class="card-title">Title line here</div>
  <div class="card-meta">author / repo</div>
  <a class="card-url" href="https://example.com" target="_blank" rel="noopener">https://example.com</a>
  <div class="card-blurb">One-line blurb describing the result.</div>
</div>
```

If a section has no results, inject the empty-state instead:

```html
<div class="empty-state">No results in this bucket yet.</div>
```

### Tools list shape

```html
<li><strong>Tool name</strong> — short description of why it matters.</li>
```

---

## Design notes

- Background `#f4f4f4` with a soft fade from `#fafafa` at the top.
- Text charcoal `#2a2a2a`, Inter from Google Fonts, JetBrains Mono for meta/timestamps.
- Four color-dotted section headers: blue, green, purple, red — matching the spec.
- Cards lift 2px on hover, subtle border color shift.
- Tools callout has a gradient left-rail (blue → purple) for visual anchor.
- Mobile-safe: viewport meta included, layout collapses cleanly under 640px.
