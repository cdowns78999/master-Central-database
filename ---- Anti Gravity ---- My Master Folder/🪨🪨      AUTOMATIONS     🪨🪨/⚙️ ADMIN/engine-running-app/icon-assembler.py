"""
icon-assembler.py
Reads Engine Running.html card content, infers 3 logical steps,
outputs assembled-steps.json with icon refs from the locked 20-icon set.
"""

import re
import json
import os
from datetime import datetime

# ── Paths ──
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_DIR = os.path.dirname(SCRIPT_DIR)
ENGINE_HTML = os.path.join(ADMIN_DIR, "Engine Running.html")
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "assembled-steps.json")

# ── Locked 20-icon set (SVG path data, viewBox 0 0 24 24) ──
ICON_PATHS = {
    "key": "M12.65 10a6 6 0 1 0-7.3 7.34L7 19l1.5-1.5L10 19l1.5-1.5L13 19l1-1v-2h2l1.05-1.05A6 6 0 0 0 12.65 10zM7 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
    "download": "M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
    "upload": "M12 15V3m0 0L8 7m4-4l4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
    "folder": "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z",
    "check": "M5 13l4 4L19 7",
    "link": "M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-.5.5M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l.5-.5",
    "search": "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35",
    "edit": "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
    "send": "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    "shield": "M12 2l8 4v6c0 5.25-3.5 10.13-8 11.5C7.5 22.13 4 17.25 4 12V6l8-4z",
    "eye": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "refresh": "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15",
    "plug": "M12 2v6m0 8v6m-5-15h10M7 17h10M9 8v8M15 8v8",
    "chart": "M18 20V10M12 20V4M6 20v-6",
    "user": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    "gear": "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z",
    "bolt": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "inbox": "M22 12h-6l-2 3H10l-2-3H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
    "palette": "M12 2a10 10 0 0 0-1 19.95c.55.05 1.05-.35 1.05-.9v-1.16c0-.64-.47-1.37-1.12-1.47A6 6 0 1 1 18 12c0 1.1-.9 2-2 2h-1a1 1 0 0 0-1 1v3.05M7.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    "globe": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
}

# ── Keyword → icon mapping (priority order) ──
KEYWORD_MAP = {
    # Authentication / credentials
    "oauth": ("key", "Authorize"),
    "credential": ("key", "Authorize"),
    "authorize": ("key", "Authorize"),
    "auth": ("key", "Authorize"),
    "login": ("key", "Authorize"),
    "token": ("key", "Authorize"),
    "api key": ("key", "Authorize"),
    # Download / pull / fetch / scrape
    "download": ("download", "Pull"),
    "pull": ("download", "Pull"),
    "fetch": ("download", "Pull"),
    "scrape": ("download", "Pull"),
    "extract": ("download", "Pull"),
    "collect": ("download", "Pull"),
    "import": ("download", "Pull"),
    # Upload / push / deploy
    "upload": ("upload", "Push"),
    "push": ("upload", "Push"),
    "deploy": ("upload", "Push"),
    "publish": ("upload", "Push"),
    # Export / save / output
    "export": ("folder", "Export"),
    "save": ("folder", "Export"),
    "output": ("folder", "Export"),
    "csv": ("folder", "Export"),
    "json": ("folder", "Export"),
    "file": ("folder", "Export"),
    # Verification / check / test
    "verify": ("check", "Verify"),
    "check": ("check", "Verify"),
    "test": ("check", "Verify"),
    "validate": ("check", "Verify"),
    "confirm": ("check", "Verify"),
    # Connect / link / integrate
    "connect": ("link", "Connect"),
    "link": ("link", "Connect"),
    "integrate": ("link", "Connect"),
    "wire": ("link", "Connect"),
    "bridge": ("link", "Connect"),
    # Search / scan / find
    "search": ("search", "Search"),
    "scan": ("search", "Search"),
    "find": ("search", "Search"),
    "discover": ("search", "Search"),
    "enrich": ("search", "Search"),
    "sweep": ("search", "Search"),
    # Edit / modify / update
    "edit": ("edit", "Edit"),
    "modify": ("edit", "Edit"),
    "update": ("edit", "Edit"),
    "configure": ("edit", "Edit"),
    "config": ("edit", "Edit"),
    # Send / notify / message
    "send": ("send", "Send"),
    "notify": ("send", "Send"),
    "message": ("send", "Send"),
    "email": ("send", "Send"),
    # Security / protect
    "security": ("shield", "Secure"),
    "protect": ("shield", "Secure"),
    "encrypt": ("shield", "Secure"),
    "permission": ("shield", "Secure"),
    # View / preview / monitor
    "view": ("eye", "Review"),
    "preview": ("eye", "Review"),
    "monitor": ("eye", "Review"),
    "review": ("eye", "Review"),
    "inspect": ("eye", "Review"),
    # Refresh / sync / reload
    "refresh": ("refresh", "Sync"),
    "sync": ("refresh", "Sync"),
    "reload": ("refresh", "Sync"),
    # Plugin / extension / addon
    "plugin": ("plug", "Plug In"),
    "extension": ("plug", "Plug In"),
    "addon": ("plug", "Plug In"),
    "api": ("plug", "Plug In"),
    # Analytics / chart / data
    "analytics": ("chart", "Analyze"),
    "chart": ("chart", "Analyze"),
    "data": ("chart", "Analyze"),
    "metrics": ("chart", "Analyze"),
    "report": ("chart", "Analyze"),
    # User / contact / people
    "user": ("user", "Map Contacts"),
    "contact": ("user", "Map Contacts"),
    "people": ("user", "Map Contacts"),
    "client": ("user", "Map Contacts"),
    "supplier": ("user", "Map Contacts"),
    "lead": ("user", "Map Contacts"),
    # Settings / configure
    "settings": ("gear", "Configure"),
    "setup": ("gear", "Configure"),
    "install": ("gear", "Configure"),
    # Speed / performance / fast
    "fast": ("bolt", "Execute"),
    "quick": ("bolt", "Execute"),
    "run": ("bolt", "Execute"),
    "execute": ("bolt", "Execute"),
    "launch": ("bolt", "Execute"),
    # Inbox / receive
    "inbox": ("inbox", "Receive"),
    "receive": ("inbox", "Receive"),
    "incoming": ("inbox", "Receive"),
    # Design / style / brand
    "design": ("palette", "Design"),
    "style": ("palette", "Design"),
    "brand": ("palette", "Design"),
    "theme": ("palette", "Design"),
    # Web / cloud / external
    "web": ("globe", "Connect"),
    "cloud": ("globe", "Connect"),
    "browser": ("globe", "Connect"),
    "online": ("globe", "Connect"),
    "gmail": ("globe", "Connect"),
    "google": ("globe", "Connect"),
}


def read_cards(html_path):
    """Extract card body text from between CARD-N-START/END markers."""
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    cards = []
    for i in range(1, 5):
        pattern = rf"<!-- CARD-{i}-START -->(.*?)<!-- CARD-{i}-END -->"
        match = re.search(pattern, content, re.DOTALL)
        if match:
            raw = match.group(1)
            title_m = re.search(r'class="ic-title">(.*?)</div>', raw)
            body_m = re.search(r'class="ic-body">(.*?)</div>', raw)
            title = title_m.group(1).strip() if title_m else ""
            body = body_m.group(1).strip() if body_m else ""
            cards.append({"title": title, "body": body})

    # Also grab the status bar for source context
    source_m = re.search(r'class="sb-message">(.*?)</div>', content)
    source = source_m.group(1).strip() if source_m else "Unknown"

    return cards, source


def infer_steps(cards):
    """From card text, pick the 3 best-matching step icons."""
    combined = " ".join(c["title"] + " " + c["body"] for c in cards).lower()

    scored = {}
    for keyword, (icon, label) in KEYWORD_MAP.items():
        count = combined.count(keyword)
        if count > 0:
            if icon not in scored or count > scored[icon]["score"]:
                scored[icon] = {"score": count, "label": label, "keyword": keyword}

    # Sort by score descending, pick top 3 unique icons
    ranked = sorted(scored.items(), key=lambda x: x[1]["score"], reverse=True)

    steps = []
    used_icons = set()
    for icon, info in ranked:
        if icon not in used_icons and len(steps) < 3:
            used_icons.add(icon)
            steps.append({"icon": icon, "label": info["label"]})

    # Pad to 3 if needed
    fallbacks = [
        {"icon": "gear", "label": "Configure"},
        {"icon": "bolt", "label": "Execute"},
        {"icon": "check", "label": "Verify"},
    ]
    for fb in fallbacks:
        if len(steps) >= 3:
            break
        if fb["icon"] not in used_icons:
            steps.append(fb)
            used_icons.add(fb["icon"])

    return steps


def build_detail(icon, label, cards):
    """Generate a short detail string from card context matching this icon's domain."""
    combined = " ".join(c["body"] for c in cards).lower()

    detail_hints = {
        "key": "Set up OAuth2 credentials and authorize access",
        "download": "Pull data from source — threads, messages, records",
        "upload": "Push processed data to target system",
        "folder": "Save output as structured files (JSON + CSV)",
        "check": "Verify output matches expected format and content",
        "link": "Wire connections between services and data flows",
        "search": "Scan and discover contacts, profiles, or records",
        "edit": "Configure settings and update parameters",
        "send": "Send messages or notifications to targets",
        "shield": "Secure credentials and protect access tokens",
        "eye": "Review and preview output before committing",
        "refresh": "Sync latest data from all connected sources",
        "plug": "Connect to external API or service endpoint",
        "chart": "Analyze data patterns and generate reports",
        "user": "Map contacts and organize by relationship",
        "gear": "Set up and configure the tool or environment",
        "bolt": "Execute the main process and capture output",
        "inbox": "Receive and process incoming data",
        "palette": "Apply branding and style to output",
        "globe": "Connect to web service or cloud platform",
    }

    # Try to pull a relevant sentence from card bodies
    icon_keywords = {
        "key": ["oauth", "credential", "authorize", "auth", "token"],
        "download": ["pull", "fetch", "scrape", "extract", "download"],
        "folder": ["export", "json", "csv", "save", "output"],
        "search": ["scan", "discover", "enrich", "sweep", "find"],
        "link": ["connect", "link", "wire", "integrate"],
        "globe": ["gmail", "google", "web", "cloud", "api"],
        "user": ["contact", "client", "supplier", "lead", "people"],
        "send": ["send", "email", "message", "notify"],
        "check": ["verify", "test", "validate", "confirm"],
        "gear": ["setup", "configure", "install", "settings"],
        "bolt": ["run", "execute", "launch", "fast"],
        "upload": ["upload", "push", "deploy", "publish"],
    }
    keywords = icon_keywords.get(icon, [])
    for card in cards:
        body_lower = card["body"].lower()
        if any(w in body_lower for w in keywords):
            # Extract shortest sentence that contains a keyword (prefer concise)
            sentences = re.split(r'[.!]\s+', card["body"])
            matches = []
            for sent in sentences:
                if any(w in sent.lower() for w in keywords):
                    clean = sent.strip().rstrip(".")
                    matches.append(clean)
            # Pick shortest match under 70 chars; skip if all are too long
            matches.sort(key=len)
            for m in matches:
                if len(m) <= 70:
                    return m

    return detail_hints.get(icon, f"{label} this step")


def assemble(html_path, output_path):
    """Main: read cards, infer steps, write JSON."""
    cards, source = read_cards(html_path)
    if not cards:
        print("No cards found in Engine Running HTML.")
        return

    steps = infer_steps(cards)

    result = {
        "steps": [],
        "source": source,
        "generated": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
    }

    for i, step in enumerate(steps, 1):
        detail = build_detail(step["icon"], step["label"], cards)
        result["steps"].append({
            "num": i,
            "icon": step["icon"],
            "label": step["label"],
            "detail": detail,
        })

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    # Safe print (avoid cp1252 encoding errors on Windows with emoji paths)
    def safe_print(msg):
        try:
            print(msg)
        except UnicodeEncodeError:
            print(msg.encode("ascii", "replace").decode())

    safe_print(f"Assembled {len(result['steps'])} steps from {len(cards)} cards")
    safe_print(f"Source: {source}")
    safe_print(f"Output: {output_path}")
    for s in result["steps"]:
        safe_print(f"  Step {s['num']}: [{s['icon']}] {s['label']} -- {s['detail'][:60]}")


if __name__ == "__main__":
    assemble(ENGINE_HTML, OUTPUT_JSON)
