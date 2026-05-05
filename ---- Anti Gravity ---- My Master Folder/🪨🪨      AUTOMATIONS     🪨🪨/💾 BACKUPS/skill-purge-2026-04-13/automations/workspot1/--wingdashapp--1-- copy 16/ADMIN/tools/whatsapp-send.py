#!/usr/bin/env python3
"""
whatsapp-send.py — Wing Dashboard WhatsApp Sender
===================================================
TWO-STEP FLOW:
  1. Tee-up: populate data/feeds/outbox-whatsapp.json with messages to send
  2. Go:     run this script — sends each message in order, prints status

Outbox format (data/feeds/outbox-whatsapp.json):
  [
    {
      "to":          "15550001234  (E.164 format, no + prefix for Meta API)",
      "message":     "Text of the message",
      "threadId":    "optional — conversation ID (informational)",
      "contactName": "Display Name"
    }
  ]

Sent items are appended to data/feeds/sent-log-whatsapp.json with timestamps.

SETUP:
  1. Create a Meta Developer app at https://developers.facebook.com/
  2. Enable WhatsApp Business API for your app
  3. Copy your Phone Number ID and Access Token below
  4. Set BASE_URL to: https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}
  5. Set API_TOKEN to your temporary or permanent access token

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

# ── TODO: Configure these before use ──────────────────────────────────────────
#
# BASE_URL format:
#   https://graph.facebook.com/v19.0/{YOUR_PHONE_NUMBER_ID}
#
# Replace {YOUR_PHONE_NUMBER_ID} with the Phone Number ID from
# Meta Developer Console → WhatsApp → API Setup.
#
BASE_URL  = ''   # TODO: e.g. 'https://graph.facebook.com/v19.0/123456789012345'
API_TOKEN = ''   # TODO: paste your WhatsApp Business API access token here
#
# ──────────────────────────────────────────────────────────────────────────────

# ── Paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
APP_ROOT    = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR   = os.path.join(APP_ROOT, 'data', 'feeds')
OUTBOX_FILE = os.path.join(FEEDS_DIR, 'outbox-whatsapp.json')
SENT_LOG    = os.path.join(FEEDS_DIR, 'sent-log-whatsapp.json')


# ── WhatsApp API sender ────────────────────────────────────────────────────────
def send_whatsapp(to: str, message: str) -> tuple[bool, str]:
    """
    Send a text message via WhatsApp Business API.
    POST {BASE_URL}/messages with Authorization: Bearer {API_TOKEN}

    Returns (success: bool, error_message: str).
    """
    endpoint = f'{BASE_URL.rstrip("/")}/messages'

    payload = {
        'messaging_product': 'whatsapp',
        'to':   to,
        'type': 'text',
        'text': {'body': message},
    }

    body = json.dumps(payload).encode('utf-8')

    req = urllib.request.Request(
        endpoint,
        data=body,
        headers={
            'Authorization': f'Bearer {API_TOKEN}',
            'Content-Type':  'application/json',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp_data = json.loads(resp.read().decode('utf-8'))
            # Meta API returns {"messages": [{"id": "..."}]} on success
            if 'messages' in resp_data:
                msg_id = resp_data['messages'][0].get('id', '?')
                return True, msg_id
            return True, str(resp_data)
    except urllib.error.HTTPError as e:
        try:
            err_body = json.loads(e.read().decode('utf-8'))
            err_msg  = err_body.get('error', {}).get('message', str(e))
        except Exception:
            err_msg = str(e)
        return False, f'HTTP {e.code}: {err_msg}'
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
    print('    Wing Dashboard — WhatsApp Send')
    print(f'   Outbox: {OUTBOX_FILE}')
    print('  ╰──────────────────────────────────────────────╯')
    print()

    # Config gate — fail early if token not set
    if not API_TOKEN or API_TOKEN.startswith('TODO') or API_TOKEN == '':
        print('  ⚠️  WhatsApp API token not configured — skipping all sends.')
        print('     Set API_TOKEN at the top of this file.')
        print()
        return

    if not BASE_URL or BASE_URL == '':
        print('  ⚠️  WhatsApp BASE_URL not configured — skipping all sends.')
        print('     Set BASE_URL at the top of this file.')
        print()
        return

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

        success, result = send_whatsapp(to, message_body)

        if success:
            print(f'  ✅ Sent to {contact_name}  (id: {result})')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'messageId':   result,
                'status':      'sent',
            })
        else:
            print(f'  ❌ Failed: {contact_name} — {result}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'error':       result,
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
