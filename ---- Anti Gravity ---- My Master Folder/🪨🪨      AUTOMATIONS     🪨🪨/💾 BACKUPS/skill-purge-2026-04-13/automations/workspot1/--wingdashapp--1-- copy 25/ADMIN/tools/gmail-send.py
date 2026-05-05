#!/usr/bin/env python3
"""
gmail-send.py — Wing Dashboard Gmail Sender
============================================
TWO-STEP FLOW:
  1. Tee-up: populate data/feeds/outbox-gmail.json with messages to send
  2. Go:     run this script — sends each message in order, prints status

Outbox format (data/feeds/outbox-gmail.json):
  [
    {
      "to":          "email@example.com",
      "message":     "Text of the message",
      "threadId":    "optional — Gmail thread ID to reply into",
      "contactName": "Display Name"
    }
  ]

Sent items are appended to data/feeds/sent-log-gmail.json with timestamps.

Dependencies:
  pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
"""

import sys
import os
import json
import base64
import email.mime.text
from datetime import datetime, timezone

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ──────────────────────────────────────────────────────────────────────
# This script lives in:  …/--wingdashapp--1--/ADMIN/tools/
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
APP_ROOT    = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR   = os.path.join(APP_ROOT, 'data', 'feeds')
OUTBOX_FILE = os.path.join(FEEDS_DIR, 'outbox-gmail.json')
SENT_LOG    = os.path.join(FEEDS_DIR, 'sent-log-gmail.json')

# OAuth credentials — same files used by gmail-scrape.py
TOKEN_FILE       = os.path.join(SCRIPT_DIR, 'token.json')
CREDENTIALS_FILE = os.path.join(SCRIPT_DIR, 'credentials.json')

# Gmail API scopes required — gmail.send added on top of gmail.readonly
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
]


# ── Auth ───────────────────────────────────────────────────────────────────────
def get_gmail_service():
    """Return an authenticated Gmail API service object."""
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build

    creds = None

    # Load existing token
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # Refresh or re-authenticate if needed
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                raise FileNotFoundError(
                    f'credentials.json not found at: {CREDENTIALS_FILE}\n'
                    'Download it from Google Cloud Console → OAuth 2.0 Client IDs.'
                )
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save refreshed token
        with open(TOKEN_FILE, 'w', encoding='utf-8') as f:
            f.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)


# ── Message builder ────────────────────────────────────────────────────────────
def build_message(to: str, body: str, thread_id: str | None = None) -> dict:
    """
    Build a Gmail API message payload.
    If thread_id is provided, the message will be sent as a reply in that thread.
    """
    mime_msg = email.mime.text.MIMEText(body, 'plain', 'utf-8')
    mime_msg['to'] = to

    # Encode to base64url as Gmail API requires
    raw = base64.urlsafe_b64encode(mime_msg.as_bytes()).decode('utf-8')
    payload = {'raw': raw}

    if thread_id:
        payload['threadId'] = thread_id

    return payload


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
    print('    Wing Dashboard — Gmail Send')
    print(f'   Outbox: {OUTBOX_FILE}')
    print('  ╰──────────────────────────────────────────────╯')
    print()

    queue = load_outbox()
    if not queue:
        print('  Nothing in outbox. Exiting.')
        print()
        return

    print(f'  {len(queue)} message(s) queued. Authenticating...')
    print()

    try:
        service = get_gmail_service()
    except Exception as auth_err:
        print(f'❌ Auth failed: {auth_err}')
        return

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

        try:
            payload = build_message(to, message_body, thread_id)
            result  = service.users().messages().send(userId='me', body=payload).execute()

            print(f'  ✅ Sent to {contact_name}  (id: {result.get("id", "?")})')

            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'messageId':   result.get('id'),
                'status':      'sent',
            })

        except Exception as e:
            print(f'  ❌ Failed: {contact_name} — {e}')
            sent_log.append({
                'to':          to,
                'contactName': contact_name,
                'message':     message_body,
                'threadId':    thread_id,
                'sentAt':      datetime.now(timezone.utc).isoformat(),
                'error':       str(e),
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
