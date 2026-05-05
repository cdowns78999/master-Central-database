#!/usr/bin/env python3
"""
other-comms-send.py — Wing Dashboard Messenger Sender
======================================================
TWO-STEP FLOW:
  1. Tee-up: populate data/feeds/outbox-other.json with messages to send
  2. Go:     run this script — sends each message in order, prints status

Outbox format (data/feeds/outbox-other.json):
  [
    {
      "to":          "PSID (Page-Scoped User ID) of the recipient",
      "message":     "Text of the message",
      "threadId":    "optional — conversation or thread ID",
      "contactName": "Display Name"
    }
  ]

Sent items are appended to data/feeds/sent-log-other.json with timestamps.

Each message is POSTed to the Facebook Messenger Send API:
  POST https://graph.facebook.com/v19.0/me/messages
  Authorization: Bearer {PAGE_ACCESS_TOKEN}
  Body:
  {
    "recipient": {"id": "<PSID>"},
    "message":   {"text": "..."}
  }

SETUP:
  1. Go to developers.facebook.com → your "Wing Dashboard" app
  2. Connect a Facebook Page to the app (Settings → Page)
  3. Generate a Page Access Token with pages_messaging permission
  4. Paste the token into PAGE_ACCESS_TOKEN below
  5. Users must have messaged your Page first (you can't cold-message)

Dependencies:
  None — stdlib only (urllib.request, json, os, sys, datetime)
"""

import sys
import os
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── TODO: Configure this before use ──────────────────────────────────────────
#
# PAGE_ACCESS_TOKEN:
#   Generated from Meta Developer Console → your app → Messenger → Settings.
#   Connect a Facebook Page, then generate a Page Access Token.
#   The token needs the `pages_messaging` permission.
#
PAGE_ACCESS_TOKEN = ''  # TODO: paste your Page Access Token here
#
# ──────────────────────────────────────────────────────────────────────────────

MESSENGER_API_URL = 'https://graph.facebook.com/v19.0/me/messages'

# ── Paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
APP_ROOT    = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR   = os.path.join(APP_ROOT, 'data', 'feeds')
OUTBOX_FILE = os.path.join(FEEDS_DIR, 'outbox-other.json')
SENT_LOG    = os.path.join(FEEDS_DIR, 'sent-log-other.json')


# ── Messenger API sender ─────────────────────────────────────────────────────
def send_messenger(to_psid: str, message: str) -> tuple[bool, str]:
    """
    Send a text message via the Facebook Messenger Send API.
    POST https://graph.facebook.com/v19.0/me/messages
    Authorization: Bearer {PAGE_ACCESS_TOKEN}

    Returns (success: bool, detail: str).
    """
    payload = {
        'recipient': {'id': to_psid},
        'message':   {'text': message},
    }

    body = json.dumps(payload).encode('utf-8')

    headers = {
        'Content-Type':  'application/json',
        'Authorization': f'Bearer {PAGE_ACCESS_TOKEN}',
    }

    req = urllib.request.Request(
        MESSENGER_API_URL,
        data=body,
        headers=headers,
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.status
            try:
                resp_text = resp.read().decode('utf-8')[:200]  # cap preview length
            except Exception:
                resp_text = '(no body)'
            return True, f'HTTP {status} — {resp_text}'
    except urllib.error.HTTPError as e:
        try:
            err_body = e.read().decode('utf-8')[:200]
        except Exception:
            err_body = ''
        return False, f'HTTP {e.code}: {err_body}'
    except urllib.error.URLError as e:
        return False, f'Network error: {e.reason}'
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
    print('    Wing Dashboard — Messenger Send')
    print(f'   Outbox: {OUTBOX_FILE}')
    print('  ╰──────────────────────────────────────────────╯')
    print()

    # Config gate
    if not PAGE_ACCESS_TOKEN or PAGE_ACCESS_TOKEN.strip() == '':
        print('  ⚠️  Page Access Token not configured — skipping all sends.')
        print('     Set PAGE_ACCESS_TOKEN at the top of this file.')
        print()
        return

    queue = load_outbox()
    if not queue:
        print('  Nothing in outbox. Exiting.')
        print()
        return

    print(f'  {len(queue)} message(s) queued.')
    print(f'  API: {MESSENGER_API_URL}')
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

        success, detail = send_messenger(to, message_body)

        if success:
            print(f'  ✅ Sent to {contact_name}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'response':    detail,
                'status':      'sent',
            })
        else:
            print(f'  ❌ Failed: {contact_name} — {detail}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'error':       detail,
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
