"""One-shot: inject v3 red-door button into step-X-v2.html and emit step-X-v3.html placeholders."""
from pathlib import Path

HERE = Path(__file__).parent
TITLES = {
    1: "Branding 101",
    2: "Recording 101",
    3: "Distribution 101",
    4: "Streaming 101",
    5: "Royalties 101",
    6: "Publishing 101",
    7: "Social Media 101",
    8: "Live Performance 101",
    9: "Building Your Team",
    10: "Where do we go from here?",
}

BUTTON_BLOCK = """
<!-- ============ V3 RED DOOR BUTTON ============ -->
<style>
  .v3-door-btn {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 22px;
    background: #000000;
    color: #c1121f;
    border: 2px solid #8b0000;
    border-radius: 4px;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 0 0 1px #1a0000, 0 0 24px rgba(139, 0, 0, 0.55), 0 0 44px rgba(193, 18, 31, 0.25);
    transition: all 0.22s ease;
    text-shadow: 0 0 6px rgba(193, 18, 31, 0.45);
  }
  .v3-door-btn::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c1121f;
    box-shadow: 0 0 8px #c1121f, 0 0 16px rgba(193, 18, 31, 0.6);
    animation: v3-pulse 1.6s ease-in-out infinite;
  }
  .v3-door-btn:hover {
    background: #1a0000;
    color: #ff1f1f;
    border-color: #c1121f;
    box-shadow: 0 0 0 1px #2a0000, 0 0 32px rgba(193, 18, 31, 0.85), 0 0 60px rgba(255, 31, 31, 0.4);
    transform: translateY(-2px);
    text-decoration: none;
  }
  @keyframes v3-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.55; transform: scale(0.85); }
  }
</style>
<a class="v3-door-btn" href="step-{N}-v3.html">▾ enter v3</a>

</body>"""

V3_PLACEHOLDER = """<!DOCTYPE html>
<!-- STEP {N} v3 — placeholder. Designed one at a time. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Step {N} v3 — {TITLE}</title>
<style>
  :root {{
    --bg: #050000;
    --bg-2: #0a0303;
    --ink: #f4d8d8;
    --ink-soft: #c79898;
    --ink-mute: #6a4040;
    --blood: #c1121f;
    --blood-deep: #8b0000;
    --blood-bright: #ff1f1f;
    --rule: #2a0a0a;
    --font: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; }}
  body {{
    font-family: var(--font);
    background:
      radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.18) 0%, transparent 55%),
      radial-gradient(circle at 80% 75%, rgba(193, 18, 31, 0.14) 0%, transparent 50%),
      var(--bg);
    color: var(--ink);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }}
  a {{ color: var(--blood); text-decoration: none; }}
  a:hover {{ color: var(--blood-bright); }}

  .stage {{
    width: 100%;
    max-width: 720px;
    text-align: center;
  }}
  .v3-pill {{
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.32em;
    color: var(--blood);
    border: 1px solid var(--blood-deep);
    background: rgba(139, 0, 0, 0.08);
    padding: 6px 16px;
    border-radius: 999px;
    text-transform: uppercase;
    box-shadow: 0 0 18px rgba(193, 18, 31, 0.18);
    margin-bottom: 22px;
  }}
  h1 {{
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 10px;
    color: var(--ink);
    text-shadow: 0 0 22px rgba(193, 18, 31, 0.32);
  }}
  .step-meta {{
    font-size: 13px;
    letter-spacing: 0.2em;
    color: var(--ink-mute);
    text-transform: uppercase;
    margin: 0 0 36px;
  }}
  .placeholder-card {{
    border: 1px solid var(--rule);
    border-left: 3px solid var(--blood);
    background: linear-gradient(180deg, rgba(20, 0, 0, 0.55) 0%, rgba(8, 0, 0, 0.85) 100%);
    border-radius: 6px;
    padding: 28px 30px;
    text-align: left;
    box-shadow: 0 0 32px rgba(139, 0, 0, 0.18);
    margin-bottom: 30px;
  }}
  .placeholder-card h2 {{
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--blood);
  }}
  .placeholder-card p {{
    margin: 0 0 10px;
    font-size: 14px;
    color: var(--ink-soft);
    line-height: 1.65;
  }}
  .placeholder-card p:last-child {{ margin: 0; }}
  .blink-cursor {{
    display: inline-block;
    width: 10px;
    height: 16px;
    background: var(--blood);
    vertical-align: middle;
    margin-left: 4px;
    box-shadow: 0 0 8px var(--blood);
    animation: cursor-blink 1s steps(2) infinite;
  }}
  @keyframes cursor-blink {{
    50% {{ opacity: 0; }}
  }}
  .back-row {{
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }}
  .back-btn {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: transparent;
    color: var(--blood);
    border: 1px solid var(--blood-deep);
    border-radius: 4px;
    font-family: var(--font);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: all 0.18s ease;
  }}
  .back-btn:hover {{
    background: rgba(139, 0, 0, 0.18);
    color: var(--blood-bright);
    border-color: var(--blood);
    box-shadow: 0 0 18px rgba(193, 18, 31, 0.4);
  }}
</style>
</head>
<body>
  <div class="stage">
    <span class="v3-pill">v3 · deeper room</span>
    <h1>{TITLE}<span class="blink-cursor"></span></h1>
    <p class="step-meta">step {N} · v3 layer</p>

    <div class="placeholder-card">
      <h2>under construction</h2>
      <p>This is the v3 deeper room behind step {N}. We're designing one page at a time — when this one's turn comes up, the actual content lands here.</p>
      <p>Until then, the door's open but the room's empty. Hit back to return to v2.</p>
    </div>

    <div class="back-row">
      <a class="back-btn" href="step-{N}-v2.html">← back to step {N} v2</a>
      <a class="back-btn" href="../index.html">← dashboard</a>
    </div>
  </div>
</body>
</html>
"""

button_changes = 0
created = 0

for n in range(1, 11):
    v2_path = HERE / f"step-{n}-v2.html"
    v3_path = HERE / f"step-{n}-v3.html"

    if v2_path.exists():
        html = v2_path.read_text(encoding="utf-8")
        if "v3-door-btn" in html:
            print(f"  [skip-button] step-{n}-v2.html already has v3 button")
        else:
            block = BUTTON_BLOCK.replace("{N}", str(n))
            new_html = html.replace("</body>", block, 1)
            if new_html == html:
                print(f"  [WARN] no </body> found in step-{n}-v2.html")
            else:
                v2_path.write_text(new_html, encoding="utf-8")
                button_changes += 1
                print(f"  [button]    injected into step-{n}-v2.html")
    else:
        print(f"  [MISSING]  step-{n}-v2.html not found")

    if v3_path.exists():
        print(f"  [skip-v3]   step-{n}-v3.html already exists, leaving alone")
    else:
        page = V3_PLACEHOLDER.replace("{N}", str(n)).replace("{TITLE}", TITLES[n])
        v3_path.write_text(page, encoding="utf-8")
        created += 1
        print(f"  [v3]        created step-{n}-v3.html ({TITLES[n]})")

print(f"\nDone. Buttons injected: {button_changes}/10. v3 placeholders created: {created}/10.")
