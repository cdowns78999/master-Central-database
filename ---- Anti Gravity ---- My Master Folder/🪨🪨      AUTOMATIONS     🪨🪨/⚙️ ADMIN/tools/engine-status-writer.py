"""
engine-status-writer.py
Reads railroadState from the control panel, generates contextual status
content for Engine Running HTML. Claude calls this, reads the JSON output,
then applies it to Engine Running via Edit tool.

Usage:
    python engine-status-writer.py

Output: JSON blob with statusPhase, statusMessage, statusNotes, 4 card texts, dewey entry
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

# ── Paths ──
BASE = Path(__file__).resolve().parent.parent  # ADMIN folder
WORK = BASE.parent / "WORK"  # sibling to ADMIN but actually under AUTOMATIONS
CONTROL_PANEL = None

# Find control panel - try known locations
candidates = [
    BASE.parent / "WORK" / "railroad-control-panel.html",
    BASE.parent / "\U0001f527 WORK" / "railroad-control-panel.html",
]
for c in candidates:
    if c.exists():
        CONTROL_PANEL = c
        break

# Also try glob fallback
if CONTROL_PANEL is None:
    for p in BASE.parent.rglob("railroad-control-panel.html"):
        if "BACKUP" not in str(p).upper() and "backup" not in str(p):
            CONTROL_PANEL = p
            break


def extract_railroad_state(html_text):
    """Pull railroadState JS object from the control panel HTML."""
    match = re.search(
        r'(?:const|let|var)\s+railroadState\s*=\s*(\{.*?\});',
        html_text,
        re.DOTALL
    )
    if not match:
        return None

    raw = match.group(1)
    # Clean JS → JSON: single quotes to double, trailing commas, unquoted keys
    raw = re.sub(r"'", '"', raw)
    raw = re.sub(r',\s*([\]}])', r'\1', raw)
    # Try to parse - if it fails, return minimal fallback
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def parse_step_data(html_text):
    """Pull stepData from control panel to get step titles."""
    match = re.search(
        r'(?:const|let|var)\s+stepData\s*=\s*(\{.*?\});',
        html_text,
        re.DOTALL
    )
    if not match:
        return {}
    raw = match.group(1)
    raw = re.sub(r"'", '"', raw)
    raw = re.sub(r',\s*([\]}])', r'\1', raw)
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {}


def build_status(state, step_data):
    """Generate all status fields from railroad state."""
    now = datetime.now()
    time_str = now.strftime("%H:%M")

    # Current position
    current_section = state.get("currentSection", "s1") if state else "s1"
    current_step = state.get("currentStep", 0) if state else 0
    mode = state.get("mode", "unknown") if state else "unknown"
    completed = state.get("completedSteps", []) if state else []
    total_steps = 112

    # Step title lookup
    section_steps = step_data.get(current_section, []) if step_data else []
    step_title = "Unknown step"
    if isinstance(section_steps, list) and current_step < len(section_steps):
        entry = section_steps[current_step]
        step_title = entry.get("title", entry) if isinstance(entry, dict) else str(entry)

    # Section name mapping
    section_names = {
        "s1": "Comms Scrape", "s2": "Social Sweep", "s3": "Revio",
        "s4": "Alley", "s5": "Integration",
        "gmail": "Gmail", "whatsapp": "WhatsApp", "imessage": "iMessage",
        "messenger": "Messenger", "discord": "Discord", "vrchat": "VRChat",
        "local": "Local", "manis": "Manis", "socialsweep": "Social Sweep",
        "revio": "Revio Platform", "alley": "Alley Platform"
    }
    section_name = section_names.get(current_section, current_section.upper())

    # Job number mapping
    section_to_job = {
        "s1": 1, "s2": 2, "s3": 3, "s4": 4, "s5": 5,
        "gmail": 6, "whatsapp": 7, "imessage": 8, "messenger": 9,
        "discord": 10, "vrchat": 11, "local": 12, "manis": 13,
        "socialsweep": 14, "revio": 15, "alley": 16
    }
    job_num = section_to_job.get(current_section, 0)
    done_count = len(completed)

    # Determine step type
    step_type = "claude"
    if isinstance(section_steps, list) and current_step < len(section_steps):
        entry = section_steps[current_step]
        if isinstance(entry, dict):
            step_type = entry.get("type", "claude")

    # ── Build outputs ──

    phase = "EXECUTING" if step_type == "claude" else "WAITING ON CHAD"
    message = f"Working on {step_title} — {section_name}"
    notes = f"Job {job_num} | Step {current_step + 1} | Mode: {mode} | {done_count}/{total_steps} complete"

    # 4 card contents
    cards = [
        {
            "icon": "&#9881;",
            "title": "Current Action",
            "body": f"{step_title} — {section_name} (Job {job_num})"
        },
        {
            "icon": "&#128203;",
            "title": "Step Context",
            "body": f"Step {current_step + 1} in {section_name}. {done_count} steps done so far across all jobs."
        },
        {
            "icon": "&#128200;",
            "title": "System Fact",
            "body": f"{total_steps} total steps across 16 jobs. {done_count} completed. {total_steps - done_count} remaining."
        },
        {
            "icon": "&#128161;",
            "title": "Tip",
            "body": get_contextual_tip(current_section, current_step, step_type)
        }
    ]

    # Dewey entry: [JOB.STEP] HH:MM description
    dewey_index = f"{job_num:03d}.{(current_step + 1):02d}"
    dewey_entry = f'<div class="dewey-entry"><span class="de-index">[{dewey_index}]</span><span class="de-time">{time_str}</span>{step_title}</div>'

    return {
        "statusPhase": phase,
        "statusMessage": message,
        "statusNotes": notes,
        "cards": cards,
        "deweyEntry": dewey_entry,
        "deweyIndex": dewey_index,
        "time": time_str,
        "mode": "loading"  # engine should show LOADING when work is active
    }


def get_contextual_tip(section, step, step_type):
    """Return a relevant tip based on current position."""
    tips = {
        "s1": "Comms Scrape gathers raw data from all communication channels. This feeds everything downstream.",
        "s2": "Social Sweep audits all social profiles. Clean presence = clean brand.",
        "s3": "Revio handles revenue tooling. Every payment flow gets mapped here.",
        "s4": "Alley connects the creative pipeline. Assets, deliverables, project tracking.",
        "s5": "Integration wires everything together. The glue job.",
        "gmail": "Gmail setup includes OAuth2, thread pulling, and structured export.",
        "whatsapp": "WhatsApp export captures chat history and media references.",
        "imessage": "iMessage pull works with local SQLite database on macOS.",
        "messenger": "Messenger data comes through Facebook data export flow.",
        "discord": "Discord setup uses bot tokens for server/channel access.",
        "vrchat": "VRChat logs social connections and world visit history.",
        "local": "Local comms covers any channels not on a major platform.",
        "manis": "Manis is the in-house project management layer.",
        "socialsweep": "Social Sweep platform does deep profile audits per network.",
        "revio": "Revio platform handles payment processing and subscription management.",
        "alley": "Alley platform manages creative asset pipelines and deliverables."
    }
    base = tips.get(section, "Each step builds on the last. The railroad keeps rolling.")
    if step_type == "chad":
        base += " This is a Chad step — your input drives it."
    return base


def main():
    if CONTROL_PANEL is None or not CONTROL_PANEL.exists():
        # Return idle/fallback status
        output = {
            "statusPhase": "STANDING BY",
            "statusMessage": "Control panel not found — engine idle",
            "statusNotes": "Ensure railroad-control-panel.html exists in WORK folder",
            "cards": [
                {"icon": "&#9881;", "title": "Current Action", "body": "No active step. Waiting for job runner."},
                {"icon": "&#128203;", "title": "Step Context", "body": "Engine will activate when a job starts."},
                {"icon": "&#128200;", "title": "System Fact", "body": "112 total steps across 16 jobs."},
                {"icon": "&#128161;", "title": "Tip", "body": "Run /c9-1-job-runner to start the railroad."}
            ],
            "deweyEntry": "",
            "deweyIndex": "000.00",
            "time": datetime.now().strftime("%H:%M"),
            "mode": "waiting"
        }
        print(json.dumps(output, indent=2))
        return

    html = CONTROL_PANEL.read_text(encoding="utf-8")
    state = extract_railroad_state(html)
    step_data = parse_step_data(html)
    output = build_status(state, step_data)
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
