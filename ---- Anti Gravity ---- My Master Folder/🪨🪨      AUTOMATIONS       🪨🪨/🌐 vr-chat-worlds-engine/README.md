# 🌐 vr-chat-worlds-engine

Template engine backing the /vr-chat-worlds skill.

- `template/` — master HTML templates (1page / 2page / 3page) + assets. NEVER edit in place. The skill COPIES from here per request.
- `end-projects/` — each /vr-chat-worlds run lands here as `!! {YYYY-MM-DD} — {category} — {region}/`. Crown rotation: newest gets `!! ` prefix, older entries strip it.
