"""
Gmail Scrape v2 — Starred Contacts → Wing Dashboard Submenu
Ahead Artist Solutions | Digital Coms Railroad

Connects to Gmail API via OAuth2, pulls STARRED emails only (top 20),
and exports structured JSON for the Wing Dashboard submenu overlay.

Each starred email's sender becomes a clickable slot in the dashboard.
Chad curates what surfaces by starring/unstarring in Gmail.

SETUP:
1. Go to Google Cloud Console → create project (or use existing)
2. Enable Gmail API
3. Create OAuth2 credentials (Desktop app type)
4. Download credentials.json → place in this folder
5. pip install google-auth google-auth-oauthlib google-api-python-client
6. Run: python gmail-scrape.py

First run opens browser for OAuth consent. Token is cached for future runs.

OUTPUT: exports/gmail/starred-contacts.json
"""

import os
import sys
import re
import json
import csv
import base64
from datetime import datetime
from pathlib import Path

# Fix Windows console encoding for emoji folder paths
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Google API imports
try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Run:")
    print("  pip install google-auth google-auth-oauthlib google-api-python-client")
    exit(1)

# Config
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
]
SCRIPT_DIR = Path(__file__).parent
CREDENTIALS_FILE = SCRIPT_DIR / 'credentials.json'
TOKEN_FILE = SCRIPT_DIR / 'token.json'
OUTPUT_DIR = SCRIPT_DIR / 'exports' / 'gmail'
MAX_RESULTS = 500  # grab ALL starred — we trim to 20 on the display side
DISPLAY_CAP = 20   # wing submenu shows first 20 only

# Auto-deploy: scraper writes to dashboard's data/feeds/ too
AUTOMATIONS_ROOT = SCRIPT_DIR.parent.parent  # up from ADMIN/tools/ to AUTOMATIONS root
DASHBOARD_FEEDS = AUTOMATIONS_ROOT / 'workspot1' / '--wingdashapp--1--' / 'data' / 'feeds'


def authenticate():
    """Authenticate with Gmail API via OAuth2. Caches token for reuse."""
    creds = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(f"ERROR: {CREDENTIALS_FILE} not found.")
                print("Download OAuth2 credentials from Google Cloud Console.")
                exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)

        TOKEN_FILE.write_text(creds.to_json())
        print("Token saved for future use.")

    return build('gmail', 'v1', credentials=creds)


def get_email_threads(service, query='', max_results=MAX_RESULTS):
    """Pull email threads matching a query."""
    threads = []
    page_token = None

    while len(threads) < max_results:
        batch_size = min(100, max_results - len(threads))
        results = service.users().threads().list(
            userId='me',
            q=query,
            maxResults=batch_size,
            pageToken=page_token
        ).execute()

        batch = results.get('threads', [])
        threads.extend(batch)

        page_token = results.get('nextPageToken')
        if not page_token:
            break

    return threads


def extract_thread_data(service, thread_id):
    """Extract full thread data: messages, participants, dates."""
    thread = service.users().threads().get(
        userId='me',
        id=thread_id,
        format='metadata',
        metadataHeaders=['From', 'To', 'Subject', 'Date']
    ).execute()

    messages = thread.get('messages', [])
    thread_data = {
        'thread_id': thread_id,
        'message_count': len(messages),
        'messages': []
    }

    for msg in messages:
        headers = {h['name']: h['value'] for h in msg.get('payload', {}).get('headers', [])}
        thread_data['messages'].append({
            'id': msg['id'],
            'from': headers.get('From', ''),
            'to': headers.get('To', ''),
            'subject': headers.get('Subject', ''),
            'date': headers.get('Date', ''),
            'snippet': msg.get('snippet', ''),
            'labels': msg.get('labelIds', []),
        })

    # Derive thread-level metadata
    if messages:
        first = thread_data['messages'][0]
        last = thread_data['messages'][-1]
        thread_data['subject'] = first['subject']
        thread_data['first_date'] = first['date']
        thread_data['last_date'] = last['date']

        # Collect all unique participants
        participants = set()
        for m in thread_data['messages']:
            participants.add(m['from'])
            if m['to']:
                for addr in m['to'].split(','):
                    participants.add(addr.strip())
        thread_data['participants'] = list(participants)

    return thread_data


def organize_by_contact(threads_data):
    """Organize threads by primary contact."""
    by_contact = {}
    for t in threads_data:
        for participant in t.get('participants', []):
            # Skip self
            if 'me' in participant.lower():
                continue
            if participant not in by_contact:
                by_contact[participant] = []
            by_contact[participant].append({
                'thread_id': t['thread_id'],
                'subject': t.get('subject', ''),
                'message_count': t['message_count'],
                'first_date': t.get('first_date', ''),
                'last_date': t.get('last_date', ''),
            })
    return by_contact


def export_json(data, filename):
    """Export data to JSON."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Exported: {filepath}")
    return filepath


def export_csv(threads_data, filename):
    """Export flat thread list to CSV."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Thread ID', 'Subject', 'From', 'To', 'Date', 'Messages', 'Snippet'])
        for t in threads_data:
            for m in t.get('messages', []):
                writer.writerow([
                    t['thread_id'],
                    m['subject'],
                    m['from'],
                    m['to'],
                    m['date'],
                    t['message_count'],
                    m['snippet'][:200]
                ])
    print(f"Exported: {filepath}")
    return filepath


def parse_sender(raw_from):
    """Parse 'Display Name <email@example.com>' into (name, email)."""
    match = re.match(r'^"?([^"<]+?)"?\s*<([^>]+)>', raw_from)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    # Bare email address
    email = raw_from.strip().strip('<>')
    name = email.split('@')[0].replace('.', ' ').replace('_', ' ').title()
    return name, email


def build_thread_url(thread_id):
    """Build a Gmail deep link for a thread."""
    return f'https://mail.google.com/mail/u/0/#inbox/{thread_id}'


def parse_date(raw_date):
    """Try to parse email date header into YYYY-MM-DD."""
    # Email dates look like "Tue, 4 Mar 2026 14:30:00 -0500"
    for fmt in ('%a, %d %b %Y %H:%M:%S %z', '%d %b %Y %H:%M:%S %z',
                '%a, %d %b %Y %H:%M:%S', '%d %b %Y %H:%M:%S'):
        try:
            return datetime.strptime(raw_date.strip(), fmt).strftime('%Y-%m-%d')
        except ValueError:
            continue
    return raw_date.strip()[:10]  # fallback: first 10 chars


def main():
    print("=" * 50)
    print("  Gmail Scrape v2 — Starred Contacts")
    print("  Ahead Artist Solutions / Wing Dashboard")
    print("=" * 50)

    # Authenticate
    print("\nAuthenticating with Gmail API...")
    service = authenticate()
    print("Authenticated successfully.")

    # Pull STARRED threads only
    print(f"\nPulling starred emails (max {MAX_RESULTS})...")
    threads = get_email_threads(service, query='is:starred', max_results=MAX_RESULTS)
    print(f"Found {len(threads)} starred threads.")

    if not threads:
        print("No starred emails found. Star some emails in Gmail first.")
        return

    # Extract thread data
    print("\nExtracting thread data...")
    threads_data = []
    for i, t in enumerate(threads):
        try:
            data = extract_thread_data(service, t['id'])
            threads_data.append(data)
            print(f"  [{i+1}/{len(threads)}] {data.get('subject', '(no subject)')[:50]}")
        except Exception as e:
            print(f"  Error on thread {t['id']}: {e}")

    # Build starred-contacts.json
    print("\nBuilding starred contacts...")
    contacts = []
    seen_emails = set()
    for t in threads_data:
        # Get the sender of the first message (thread starter)
        first_msg = t['messages'][0] if t.get('messages') else {}
        raw_from = first_msg.get('from', '')
        name, email = parse_sender(raw_from)

        # Skip duplicates — one entry per unique sender
        if email.lower() in seen_emails:
            continue
        seen_emails.add(email.lower())

        last_msg = t['messages'][-1] if t.get('messages') else first_msg
        contacts.append({
            'name': name,
            'email': email,
            'subject': t.get('subject', ''),
            'thread_url': build_thread_url(t['thread_id']),
            'date': parse_date(last_msg.get('date', ''))
        })

    # Sort alphabetically (default for wing dashboard — most-recent-4 comes later)
    contacts.sort(key=lambda c: c['name'].lower())

    # Full archive — everything starred
    full_output = {
        'updated': datetime.now().isoformat(timespec='seconds'),
        'count': len(contacts),
        'contacts': contacts
    }

    # Display feed — first 20 only (what the dashboard shows)
    display_contacts = contacts[:DISPLAY_CAP]
    starred_output = {
        'updated': datetime.now().isoformat(timespec='seconds'),
        'count': len(display_contacts),
        'total_starred': len(contacts),
        'contacts': display_contacts
    }

    # Export full archive (all starred contacts)
    export_json(full_output, 'starred-contacts-full.json')

    # Export display feed (first 20 for dashboard)
    export_json(starred_output, 'starred-contacts.json')

    # Auto-deploy to dashboard feeds
    DASHBOARD_FEEDS.mkdir(parents=True, exist_ok=True)
    feed_path = DASHBOARD_FEEDS / 'gmail.json'
    with open(feed_path, 'w', encoding='utf-8') as f:
        json.dump(starred_output, f, indent=2, ensure_ascii=False)
    print(f"Deployed: {feed_path}")

    # Also keep the legacy bulk exports as secondary
    timestamp = datetime.now().strftime('%Y-%m-%d--%H-%M')
    export_json(threads_data, f'gmail-threads--{timestamp}.json')

    # Summary
    print(f"\n{'=' * 50}")
    print(f"  GMAIL SCRAPE v2 COMPLETE")
    print(f"  Starred threads: {len(threads_data)}")
    print(f"  Unique contacts: {len(contacts)} total, {len(display_contacts)} in dashboard feed")
    print(f"  Archive: {OUTPUT_DIR / 'starred-contacts.json'}")
    print(f"  Live:    {feed_path}")
    print(f"  Legacy:  {OUTPUT_DIR / f'gmail-threads--{timestamp}.json'}")
    print(f"{'=' * 50}")
    print(f"\n  Auto-deployed to dashboard — open wing app")
    print(f"  and click the Gmail pill to see your contacts.")


if __name__ == '__main__':
    main()
