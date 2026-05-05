"""
_version-jumper_inject.py

Phase 2 + 3: inject the unified top-center version-jump banner into every
elijah step page (40 files: step-{1..10}.html + step-{1..10}-v{2,3,4}.html),
strip out the legacy .v2-pill link and the static .v3-pill label, and print a
red/green debug table per file.

Idempotent — re-running is safe.
"""

import os
import re
import sys

ELIJAH_DIR = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(ELIJAH_DIR, "pages")

LINK_TAG = '<link rel="stylesheet" href="../_version-jumper.css">'
SCRIPT_TAG = '<script src="../_version-jumper.js" defer></script>'
MARKER = "_version-jumper.css"  # idempotency check

# Patterns to strip
RE_V2_PILL_LINK = re.compile(
    r'^\s*<a[^>]+class="v2-pill"[^>]*>.*?</a>\s*\n', re.MULTILINE
)
RE_V3_PILL_SPAN = re.compile(
    r'^\s*<span\s+class="v3-pill">[^<]*</span>\s*\n', re.MULTILINE
)

# Build target list (40 files)
targets = []
for n in range(1, 11):
    targets.append(os.path.join(PAGES_DIR, f"step-{n}.html"))
    for v in (2, 3, 4):
        targets.append(os.path.join(PAGES_DIR, f"step-{n}-v{v}.html"))

GREEN = "\033[32m"
RED = "\033[31m"
YEL = "\033[33m"
DIM = "\033[2m"
RST = "\033[0m"

results = []
for path in targets:
    name = os.path.basename(path)
    if not os.path.exists(path):
        results.append((name, False, False, False, False, "missing"))
        continue

    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    had_marker = MARKER in text
    had_v2pill = bool(RE_V2_PILL_LINK.search(text))
    had_v3pill = bool(RE_V3_PILL_SPAN.search(text))

    # Strip legacy markup
    text = RE_V2_PILL_LINK.sub("", text)
    text = RE_V3_PILL_SPAN.sub("", text)

    # Inject before </head> if marker absent
    if not had_marker:
        # Find </head> (case-insensitive, first occurrence)
        m = re.search(r"</head>", text, re.IGNORECASE)
        if not m:
            results.append((name, False, False, False, False, "no </head>"))
            continue
        idx = m.start()
        injection = f"  {LINK_TAG}\n  {SCRIPT_TAG}\n"
        text = text[:idx] + injection + text[idx:]

    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

    # Verify post-write
    with open(path, "r", encoding="utf-8") as f:
        after = f.read()
    has_link = LINK_TAG in after
    has_script = SCRIPT_TAG in after
    leftover_v2 = bool(RE_V2_PILL_LINK.search(after))
    leftover_v3 = bool(RE_V3_PILL_SPAN.search(after))
    results.append((name, has_link, has_script, not leftover_v2, not leftover_v3, "ok"))


# Print debug table
print()
print(f"{'FILE':<22} {'CSS':>5} {'JS':>5} {'V2-CLEAN':>10} {'V3-CLEAN':>10}  STATUS")
print("-" * 72)
all_green = True
for name, css, js, v2c, v3c, status in results:
    def dot(b):
        return f"{GREEN}●{RST}" if b else f"{RED}●{RST}"
    if status != "ok":
        print(f"{name:<22} {RED}{status}{RST}")
        all_green = False
        continue
    if not (css and js and v2c and v3c):
        all_green = False
    print(f"{name:<22} {dot(css):>5} {dot(js):>5} {dot(v2c):>10} {dot(v3c):>10}  {GREEN if status=='ok' else RED}{status}{RST}")

print("-" * 72)
print(f"{len(results)} files processed.")
if all_green:
    print(f"{GREEN}ALL GREEN — banner wired on every page, legacy markup stripped.{RST}")
else:
    print(f"{RED}RED ROWS PRESENT — investigate above.{RST}")
    sys.exit(1)
