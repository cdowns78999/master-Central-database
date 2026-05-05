"""
snapshot-comms.py — Daily Comms Snapshot
Wing Dashboard | Ahead Artist Solutions | Digital Coms Railroad

Runs once per day. Pulls all comms channels and saves a unified snapshot JSON.
Currently live: Gmail (OAuth2, starred + recent replied).
Stubs in place for: iMessage, WhatsApp, Other (TODO).

OUTPUT:
  exports/snapshots/snapshot-{YYYY-MM-DD}.json   (dated archive)
  exports/snapshots/snapshot-latest.json         (always overwritten — diff-comms reads this)

SETUP (Gmail):
  - credentials.json + token.json must exist in same ADMIN/tools/ folder
  - pip install google-auth google-auth-oauthlib google-api-python-client
  - First run opens browser for OAuth consent. Token cached for future runs.
"""

import sys
import re
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

# Fix Windows console encoding for emoji paths and output
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ── Google API imports ────────────────────────────────────────────────────────
try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Run:")
    print("  pip install google-auth google-auth-oauthlib google-api-python-client")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────────────────────
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

SCRIPT_DIR       = Path(__file__).parent
CREDENTIALS_FILE = SCRIPT_DIR / 'credentials.json'
TOKEN_FILE       = SCRIPT_DIR / 'token.json'
SNAPSHOTS_DIR    = SCRIPT_DIR / 'exports' / 'snapshots'

# Max threads to pull per query (starred + recent replied)
MAX_STARRED  = 100
MAX_REPLIED  = 50
REPLY_DAYS   = 7   # "recent" window for replied threads


# ── Auth ──────────────────────────────────────────────────────────────────────
def authenticate():
    """OAuth2 Gmail auth. Caches token.json for reuse."""
    creds = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(f"ERROR: {CREDENTIALS_FILE} not found.")
                print("Download OAuth2 Desktop credentials from Google Cloud Console.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)

        TOKEN_FILE.write_text(creds.to_json())
        print("  Token saved.")

    return build('gmail', 'v1', credentials=creds)


# ── Gmail helpers ─────────────────────────────────────────────────────────────
def list_threads(service, query, max_results):
    """Return a list of thread stubs [{id, snippet}] matching query."""
    threads = []
    page_token = None

    while len(threads) < max_results:
        batch = min(100, max_results - len(threads))
        resp = service.users().threads().list(
            userId='me',
            q=query,
            maxResults=batch,
            pageToken=page_token
        ).execute()

        threads.extend(resp.get('threads', []))
        page_token = resp.get('nextPageToken')
        if not page_token:
            break

    return threads


def parse_sender(raw_from):
    """Parse 'Display Name <email@example.com>' → (name, email)."""
    match = re.match(r'^"?([^"<]+?)"?\s*<([^>]+)>', raw_from.strip())
    if match:
        return match.group(1).strip(), match.group(2).strip().lower()
    email = raw_from.strip().strip('<>').lower()
    name = email.split('@')[0].replace('.', ' ').replace('_', ' ').title()
    return name, email


def parse_date_to_iso(raw_date):
    """
    Parse email Date header into ISO 8601 string.
    Falls back to raw string if all formats fail.
    """
    fmts = [
        '%a, %d %b %Y %H:%M:%S %z',
        '%d %b %Y %H:%M:%S %z',
        '%a, %d %b %Y %H:%M:%S',
        '%d %b %Y %H:%M:%S',
    ]
    raw = raw_date.strip()
    # Strip trailing timezone name like " (EST)" that Python can't parse
    raw_clean = re.sub(r'\s+\([^)]+\)$', '', raw)
    for fmt in fmts:
        try:
            dt = datetime.strptime(raw_clean, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.isoformat()
        except ValueError:
            continue
    return raw[:25]  # fallback: return whatever we have


def fetch_thread(service, thread_id):
    """
    Fetch a single thread with metadata headers only.
    Returns a structured snapshot thread object or None on error.
    """
    try:
        thread = service.users().threads().get(
            userId='me',
            id=thread_id,
            format='metadata',
            metadataHeaders=['From', 'To', 'Subject', 'Date']
        ).execute()
    except Exception as e:
        print(f"  Warning: could not fetch thread {thread_id}: {e}")
        return None

    messages = thread.get('messages', [])
    if not messages:
        return None

    # First message = thread opener (subject, original sender)
    first_msg   = messages[0]
    last_msg    = messages[-1]

    first_hdrs  = {h['name']: h['value'] for h in first_msg.get('payload', {}).get('headers', [])}
    last_hdrs   = {h['name']: h['value'] for h in last_msg.get('payload', {}).get('headers', [])}

    raw_from    = first_hdrs.get('From', '')
    contact_name, contact_email = parse_sender(raw_from)
    subject     = first_hdrs.get('Subject', '(no subject)')
    snippet     = last_msg.get('snippet', '')
    last_date   = parse_date_to_iso(last_hdrs.get('Date', ''))

    return {
        'threadId':            thread_id,
        'contactName':         contact_name,
        'contactEmail':        contact_email,
        'subject':             subject,
        'lastMessageSnippet':  snippet,
        'lastMessageTimestamp': last_date,
        'messageCount':        len(messages),
        'channel':             'gmail',
    }


def pull_gmail(service):
    """
    Pull starred threads + replied threads from the last REPLY_DAYS days.
    Deduplicates by threadId. Returns list of thread snapshot objects.
    """
    print(f"  Pulling starred threads (max {MAX_STARRED})...")
    starred_stubs = list_threads(service, 'is:starred', MAX_STARRED)
    print(f"  Found {len(starred_stubs)} starred threads.")

    # "Replied in last N days" — threads where Chad sent a reply
    cutoff_date = (datetime.now(tz=timezone.utc) - timedelta(days=REPLY_DAYS)).strftime('%Y/%m/%d')
    replied_query = f'in:sent after:{cutoff_date}'
    print(f"  Pulling recently replied threads (last {REPLY_DAYS} days, max {MAX_REPLIED})...")
    replied_stubs = list_threads(service, replied_query, MAX_REPLIED)
    print(f"  Found {len(replied_stubs)} recently replied threads.")

    # Deduplicate by thread ID — starred takes priority
    seen_ids = set()
    all_stubs = []
    for stub in starred_stubs + replied_stubs:
        tid = stub['id']
        if tid not in seen_ids:
            seen_ids.add(tid)
            all_stubs.append(tid)

    print(f"  Fetching thread details ({len(all_stubs)} unique threads)...")
    threads = []
    for i, tid in enumerate(all_stubs):
        data = fetch_thread(service, tid)
        if data:
            threads.append(data)
        if (i + 1) % 10 == 0:
            print(f"    ...processed {i+1}/{len(all_stubs)}")

    print(f"  Gmail: {len(threads)} threads captured.")
    return threads


# ── Channel stubs (TODO) ──────────────────────────────────────────────────────
def pull_imessage():
    """
    TODO: iMessage integration.
    Requires macOS + direct DB access (~/Library/Messages/chat.db).
    Not available on Windows without a bridge/export tool.
    """
    print("  ⚠️ iMessage not configured — returning empty array")
    return []


def pull_whatsapp():
    """
    TODO: WhatsApp integration.
    Possible approaches: WhatsApp Business API, exported chat files, or
    a local bridge. Requires explicit setup and credentials.
    """
    print("  ⚠️ WhatsApp not configured — returning empty array")
    return []


def pull_other():
    """
    TODO: Other comms channels (Slack, Teams, SMS via carrier API, etc.).
    Add channel-specific scrapers here and merge into the array.
    """
    print("  ⚠️ Other comms not configured — returning empty array")
    return []


# ── Snapshot assembly + save ──────────────────────────────────────────────────
def build_snapshot(gmail_threads, imessage_threads, whatsapp_threads, other_threads):
    """Assemble the unified snapshot object."""
    today = datetime.now(tz=timezone.utc)
    return {
        'date':      today.strftime('%Y-%m-%d'),
        'timestamp': today.isoformat(),
        'channels': {
            'gmail':    gmail_threads,
            'imessage': imessage_threads,
            'whatsapp': whatsapp_threads,
            'other':    other_threads,
        }
    }


def save_snapshot(snapshot):
    """
    Write snapshot to two paths:
      exports/snapshots/snapshot-{YYYY-MM-DD}.json  (dated archive)
      exports/snapshots/snapshot-latest.json         (always overwritten)
    """
    SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)

    date_str  = snapshot['date']
    dated_path  = SNAPSHOTS_DIR / f'snapshot-{date_str}.json'
    latest_path = SNAPSHOTS_DIR / 'snapshot-latest.json'

    for path in (dated_path, latest_path):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(snapshot, f, indent=2, ensure_ascii=False)

    print(f"  Saved: {dated_path}")
    print(f"  Saved: {latest_path}")
    return dated_path, latest_path


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print("=" * 55)
    print("  snapshot-comms.py — Daily Comms Snapshot")
    print("  Wing Dashboard | Ahead Artist Solutions")
    print("=" * 55)

    # ── Gmail ─────────────────────────────────────────────────────────────────
    print("\n[Gmail]")
    service = authenticate()
    gmail_threads = pull_gmail(service)

    # ── Other channels (stubs) ────────────────────────────────────────────────
    print("\n[iMessage]")
    imessage_threads = pull_imessage()

    print("\n[WhatsApp]")
    whatsapp_threads = pull_whatsapp()

    print("\n[Other]")
    other_threads = pull_other()

    # ── Assemble + save ───────────────────────────────────────────────────────
    print("\n[Saving snapshot]")
    snapshot = build_snapshot(gmail_threads, imessage_threads, whatsapp_threads, other_threads)
    save_snapshot(snapshot)

    # ── Summary ───────────────────────────────────────────────────────────────
    n_gmail    = len(gmail_threads)
    n_imessage = len(imessage_threads)
    n_whatsapp = len(whatsapp_threads)
    n_other    = len(other_threads)
    total      = n_gmail + n_imessage + n_whatsapp + n_other

    print(f"\n{'=' * 55}")
    print(f"  SNAPSHOT COMPLETE — {snapshot['date']}")
    print(f"  Total threads: {total}")
    print(f"{'=' * 55}")
    print(f"\n  📸 Snapshot saved — {n_gmail} Gmail threads, {n_imessage} iMessage, {n_whatsapp} WhatsApp, {n_other} Other")


if __name__ == '__main__':
    main()
