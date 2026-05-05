#!/usr/bin/env python3
"""
imessage-send.py — Wing Dashboard iMessage Sender
===================================================
TWO-STEP FLOW:
  1. Tee-up: populate data/feeds/outbox-imessage.json with messages to send
  2. Go:     run this script — sends each message in order, prints status

Outbox format (data/feeds/outbox-imessage.json):
  [
    {
      "to":          "+15550001234  or  email@icloud.com",
      "message":     "Text of the message",
      "threadId":    "optional — conversation ID (informational only for iMessage)",
      "contactName": "Display Name"
    }
  ]

Sent items are appended to data/feeds/sent-log-imessage.json with timestamps.

PLATFORM NOTE:
  This script uses osascript (AppleScript) via subprocess.
  It only works on macOS with the Messages app installed and configured.
  Running on Windows or Linux will print a warning and skip all sends.

Dependencies:
  None — stdlib only (subprocess, json, os, sys, datetime)
"""

import sys
import os
import json
import subprocess
import platform
from datetime import datetime, timezone

# Fix Windows emoji-path encoding (safe no-op on mac/linux)
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ──────────────────────────────────────────────────────────────────────
# This script lives in:  …/--wingdashapp--1--/ADMIN/tools/
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
APP_ROOT    = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR   = os.path.join(APP_ROOT, 'data', 'feeds')
OUTBOX_FILE = os.path.join(FEEDS_DIR, 'outbox-imessage.json')
SENT_LOG    = os.path.join(FEEDS_DIR, 'sent-log-imessage.json')


# ── Platform check ─────────────────────────────────────────────────────────────
IS_MAC = platform.system() == 'Darwin'


# ── AppleScript sender ─────────────────────────────────────────────────────────
def send_imessage(to: str, message: str) -> tuple[bool, str]:
    """
    Send a message via AppleScript → Messages.app.
    Returns (success: bool, error_message: str).
    """
    if not IS_MAC:
        return False, 'iMessage only available on macOS'

    # Escape double-quotes and backslashes in the message for AppleScript
    safe_message = message.replace('\\', '\\\\').replace('"', '\\"')
    safe_to      = to.replace('\\', '\\\\').replace('"', '\\"')

    script = (
        f'tell application "Messages"\n'
        f'    send "{safe_message}" to buddy "{safe_to}"\n'
        f'end tell'
    )

    try:
        result = subprocess.run(
            ['osascript', '-e', script],
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0:
            return True, ''
        else:
            err = result.stderr.strip() or 'Unknown AppleScript error'
            return False, err
    except subprocess.TimeoutExpired:
        return False, 'osascript timed out after 30s'
    except FileNotFoundError:
        return False, 'osascript not found — are you on macOS?'
    except Exception as e:
        return False, str(e)


# ── Outbox helpers ─────────────────────────────────────────────────────────────
def load_outbox() -> list:
    """Load the outbox queue. Returns empty list if file missing or empty."""
    if not os.path.exists(OUTBOX_FILE):
        print(f'⚠️  Outbox not found: {OUTBOX_FILE}')
        return []
    with open(OUTBOX_FILE, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            return data if isinstance(data, list) else []
        except json.JSONDecodeError:
            print('⚠️  Outbox JSON is malformed — aborting.')
            return []


def clear_outbox():
    """Clear the outbox after processing."""
    with open(OUTBOX_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, indent=2)


def append_sent_log(entries: list):
    """Append sent entries to the sent log file."""
    os.makedirs(FEEDS_DIR, exist_ok=True)
    existing = []
    if os.path.exists(SENT_LOG):
        with open(SENT_LOG, 'r', encoding='utf-8') as f:
            try:
                existing = json.load(f)
            except json.JSONDecodeError:
                existing = []
    existing.extend(entries)
    with open(SENT_LOG, 'w', encoding='utf-8') as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)


# ── Main send loop ─────────────────────────────────────────────────────────────
def main():
    print()
    print('  ╭──────────────────────────────────────────────╮')
    print('    Wing Dashboard — iMessage Send')
    print(f'   Outbox: {OUTBOX_FILE}')
    print('  ╰──────────────────────────────────────────────╯')
    print()

    # Platform gate — warn but still log the attempt
    if not IS_MAC:
        print('  ⚠️  iMessage only available on macOS')
        print(f'     Detected platform: {platform.system()}')
        print('  All sends will be logged as skipped.')
        print()

    queue = load_outbox()
    if not queue:
        print('  Nothing in outbox. Exiting.')
        print()
        return

    print(f'  {len(queue)} message(s) queued.')
    print()

    sent_log = []

    for item in queue:
        to           = item.get('to', '').strip()
        message_body = item.get('message', '').strip()
        thread_id    = item.get('threadId', '').strip() or None
        contact_name = item.get('contactName', to)

        # Basic validation
        if not to or not message_body:
            print(f'  ⚠️  Skipping malformed entry (missing to/message): {item}')
            continue

        if not IS_MAC:
            # Log the skip — don't leave it untracked
            print(f'  ⚠️  iMessage only available on macOS — {contact_name}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'error':       'iMessage only available on macOS',
                'status':      'skipped',
            })
            continue

        success, error = send_imessage(to, message_body)

        if success:
            print(f'  ✅ Sent to {contact_name}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'status':      'sent',
            })
        else:
            print(f'  ❌ Failed: {contact_name} — {error}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'error':       error,
                'status':      'failed',
            })

    # Write sent log and clear outbox
    if sent_log:
        append_sent_log(sent_log)
        print()
        print(f'  Sent log updated: {SENT_LOG}')

    clear_outbox()
    print('  Outbox cleared.')
    print()


if __name__ == '__main__':
    main()
