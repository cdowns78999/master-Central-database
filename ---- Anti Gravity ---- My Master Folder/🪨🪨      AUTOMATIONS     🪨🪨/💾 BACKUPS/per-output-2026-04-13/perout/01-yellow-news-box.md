---
name: 01 — Triple-Yellow News Box
description: First-output-of-session only. Renders ABOVE everything. Runs c-claude-news skill.
type: feedback
fires_on: first_output_of_session
originSessionId: 1dd07b5d-65d3-4d3d-bcf2-1c8cad0172a1
---
Run the `c-claude-news` skill on the FIRST assistant output of every new chat. Pipe its stdout (already pre-formatted as a triple-yellow box) directly into the response above all other layers.

```bash
source ~/.bashrc && python "C:/Users/chad/.claude/skills/c-claude-news/fetch.py"
```

- Skip on every response after the first.
- If script fails entirely, render an empty yellow box with `(no fresh items)`.
- Never block the rest of the response on a fetch failure.
- Use `--fresh` to bypass 6h cache. Use `--week` for 7-day window.

Sources: anthropic.com/news, anthropic.com/research, docs.anthropic.com/en/release-notes/api, nitter @AnthropicAI, nitter @claudeai.
