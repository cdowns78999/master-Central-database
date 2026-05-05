"""
End-of-Day Google Sheets Backup — Master VR Chat Spreadsheet
Ahead Artist Solutions | Wing Dashboard

Reads all JSON feeds from the Wing Dashboard data/feeds/ directory and
backs them up to two Google Sheets (primary + double backup).

Uses Google Sheets API + Drive API via OAuth2.
Same credentials.json / token pattern as gmail-scrape.py.

SETUP:
1. Enable Google Sheets API + Google Drive API in Google Cloud Console
2. Reuses the same OAuth2 Desktop credentials.json in this folder
3. pip install google-auth google-auth-oauthlib google-api-python-client
4. Run: python end-of-day-sheets.py

First run opens browser for OAuth consent (new scopes).
Token is cached as token_sheets.json for future runs.

OUTPUT: Updates two Google Sheets with all campaign/feed data.
"""

import os
import sys
import json
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
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
]
SCRIPT_DIR = Path(__file__).parent
CREDENTIALS_FILE = SCRIPT_DIR / 'credentials.json'
TOKEN_FILE = SCRIPT_DIR / 'token_sheets.json'

# Spreadsheet names
PRIMARY_NAME = 'Master VR Chat Spreadsheet'
BACKUP_NAME = 'Master VR Chat Spreadsheet 2 double back up'

# Dashboard feeds location
AUTOMATIONS_ROOT = SCRIPT_DIR.parent.parent  # up from ADMIN/tools/ to wingdashapp root
DASHBOARD_FEEDS = AUTOMATIONS_ROOT / 'data' / 'feeds'

# Tab names
TAB_ALL_CAMPAIGNS = 'All Campaigns'
TAB_EXTRA_INFO = 'Extra Info'


# ─────────────────────────────────────────────
#  Authentication
# ─────────────────────────────────────────────

def authenticate():
    """Authenticate with Google APIs via OAuth2. Caches token for reuse."""
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

    return creds


# ─────────────────────────────────────────────
#  Toast 1 — Spreadsheet Check / Create
# ─────────────────────────────────────────────

def find_spreadsheet(drive_service, name):
    """Search Drive for a spreadsheet by exact name. Returns file ID or None."""
    query = f"name = '{name}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
    results = drive_service.files().list(
        q=query,
        spaces='drive',
        fields='files(id, name)',
        pageSize=5
    ).execute()
    files = results.get('files', [])
    return files[0]['id'] if files else None


def create_spreadsheet(sheets_service, name):
    """Create a new Google Spreadsheet with the given name."""
    body = {
        'properties': {'title': name},
    }
    spreadsheet = sheets_service.spreadsheets().create(
        body=body, fields='spreadsheetId'
    ).execute()
    return spreadsheet['spreadsheetId']


def toast_1_spreadsheet_check(drive_service, sheets_service):
    """Check for both spreadsheets, create any that are missing."""
    print("\n" + "─" * 50)
    print("  TOAST 1 — Spreadsheet Check / Create")
    print("─" * 50)

    ids = {}

    for name in [PRIMARY_NAME, BACKUP_NAME]:
        sid = find_spreadsheet(drive_service, name)
        if sid:
            print(f"  Found: {name}")
            print(f"         ID: {sid}")
            ids[name] = sid
        else:
            print(f"  Missing: {name} — creating...")
            sid = create_spreadsheet(sheets_service, name)
            print(f"  Created: {name}")
            print(f"         ID: {sid}")
            ids[name] = sid

    if len(ids) == 2:
        print("\n✅ Both spreadsheets found")

    return ids[PRIMARY_NAME], ids[BACKUP_NAME]


# ─────────────────────────────────────────────
#  Toast 2 — Tab Check / Create
# ─────────────────────────────────────────────

def get_existing_tabs(sheets_service, spreadsheet_id):
    """Get list of tab (sheet) titles in a spreadsheet."""
    meta = sheets_service.spreadsheets().get(
        spreadsheetId=spreadsheet_id,
        fields='sheets.properties'
    ).execute()
    tabs = {}
    for sheet in meta.get('sheets', []):
        props = sheet['properties']
        tabs[props['title']] = props['sheetId']
    return tabs


def ensure_tabs(sheets_service, spreadsheet_id, label):
    """Ensure 'All Campaigns' and 'Extra Info' tabs exist."""
    tabs = get_existing_tabs(sheets_service, spreadsheet_id)
    requests = []

    # If the spreadsheet has the default "Sheet1", rename it to All Campaigns
    if TAB_ALL_CAMPAIGNS not in tabs and 'Sheet1' in tabs:
        requests.append({
            'updateSheetProperties': {
                'properties': {
                    'sheetId': tabs['Sheet1'],
                    'title': TAB_ALL_CAMPAIGNS,
                },
                'fields': 'title',
            }
        })
        tabs[TAB_ALL_CAMPAIGNS] = tabs.pop('Sheet1')
        print(f"  [{label}] Renamed 'Sheet1' → '{TAB_ALL_CAMPAIGNS}'")

    # Create All Campaigns if still missing
    if TAB_ALL_CAMPAIGNS not in tabs:
        requests.append({
            'addSheet': {
                'properties': {'title': TAB_ALL_CAMPAIGNS}
            }
        })
        print(f"  [{label}] Creating tab: '{TAB_ALL_CAMPAIGNS}'")

    # Create Extra Info if missing
    if TAB_EXTRA_INFO not in tabs:
        requests.append({
            'addSheet': {
                'properties': {'title': TAB_EXTRA_INFO}
            }
        })
        print(f"  [{label}] Creating tab: '{TAB_EXTRA_INFO}'")

    if requests:
        sheets_service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body={'requests': requests}
        ).execute()
    else:
        print(f"  [{label}] All tabs present")

    return True


def toast_2_tab_check(sheets_service, primary_id, backup_id):
    """Check both spreadsheets for required tabs."""
    print("\n" + "─" * 50)
    print("  TOAST 2 — Tab Check / Create")
    print("─" * 50)

    ensure_tabs(sheets_service, primary_id, 'Primary')
    ensure_tabs(sheets_service, backup_id, 'Backup')

    print("\n✅ All tabs present")


# ─────────────────────────────────────────────
#  Feed Data Loading
# ─────────────────────────────────────────────

def load_feeds():
    """Load all JSON feeds from the dashboard feeds directory."""
    feeds = {}
    if not DASHBOARD_FEEDS.exists():
        print(f"  WARNING: Feeds directory not found: {DASHBOARD_FEEDS}")
        return feeds

    for f in sorted(DASHBOARD_FEEDS.glob('*.json')):
        try:
            with open(f, 'r', encoding='utf-8') as fh:
                data = json.load(fh)
                feeds[f.stem] = data
                print(f"  Loaded: {f.name}")
        except (json.JSONDecodeError, IOError) as e:
            print(f"  WARNING: Could not load {f.name}: {e}")

    return feeds


# ─────────────────────────────────────────────
#  Data Builders — All Campaigns + Extra Info
# ─────────────────────────────────────────────

def build_all_campaigns_rows(feeds):
    """
    Build rows for the 'All Campaigns' tab from all feed data.
    Normalizes diverse feed structures into a flat campaign table.
    """
    headers = ['Source', 'Name / Contact', 'Email', 'Subject / Label',
               'Status', 'Amount', 'Date', 'Channel', 'Note']
    rows = [headers]

    # --- Gmail contacts ---
    gmail = feeds.get('gmail', {})
    for contact in gmail.get('contacts', []):
        rows.append([
            'Gmail (Starred)',
            contact.get('name', ''),
            contact.get('email', ''),
            contact.get('subject', ''),
            'Starred',
            '',
            contact.get('date', ''),
            'gmail',
            contact.get('thread_url', ''),
        ])

    # --- Comms changes ---
    comms = feeds.get('comms-changes', {})
    for change in comms.get('changes', []):
        rows.append([
            'Comms Changes',
            change.get('contactName', ''),
            change.get('contactEmail', ''),
            change.get('subject', ''),
            change.get('type', ''),
            '',
            change.get('timestamp', ''),
            change.get('channel', ''),
            change.get('snippet', '')[:150] if change.get('snippet') else '',
        ])

    # --- Payback sections ---
    payback = feeds.get('payback', {})
    for section in payback.get('sections', []):
        label = section.get('label', '')
        for entry in section.get('entries', []):
            amount = entry.get('amount') or entry.get('minPay', '')
            amount_str = f"${amount}" if amount else ''
            rows.append([
                'Payback',
                entry.get('name', ''),
                '',
                label,
                entry.get('status', ''),
                amount_str,
                entry.get('deadline', ''),
                'financial',
                entry.get('note', ''),
            ])

    # --- Supplier pricing ---
    pricing = feeds.get('supplier-pricing', {})
    if isinstance(pricing, dict):
        for key, supplier in pricing.items():
            if isinstance(supplier, dict) and 'tiers' in supplier:
                name = supplier.get('name', key)
                for tier in supplier.get('tiers', []):
                    rows.append([
                        'Supplier Pricing',
                        name,
                        '',
                        f"{tier.get('streams', '')} streams",
                        'pricing',
                        f"${tier.get('price', '')}" if tier.get('price') else '',
                        '',
                        'supplier',
                        '',
                    ])

    # --- Sent logs (gmail, imessage, whatsapp, other) ---
    for feed_key in ['sent-log-gmail', 'sent-log-imessage', 'sent-log-whatsapp', 'sent-log-other']:
        sent = feeds.get(feed_key, [])
        if isinstance(sent, list):
            channel = feed_key.replace('sent-log-', '')
            for entry in sent:
                rows.append([
                    'Sent Log',
                    entry.get('contactName', ''),
                    entry.get('to', ''),
                    entry.get('message', '')[:100] if entry.get('message') else '',
                    entry.get('status', ''),
                    '',
                    entry.get('sentAt', ''),
                    channel,
                    entry.get('error', ''),
                ])

    # --- Outbox queues ---
    for feed_key in ['outbox-gmail', 'outbox-imessage', 'outbox-whatsapp', 'outbox-other']:
        outbox = feeds.get(feed_key, [])
        if isinstance(outbox, list):
            channel = feed_key.replace('outbox-', '')
            for entry in outbox:
                if isinstance(entry, dict):
                    rows.append([
                        'Outbox',
                        entry.get('contactName', entry.get('to', '')),
                        entry.get('to', ''),
                        entry.get('message', '')[:100] if entry.get('message') else '',
                        'queued',
                        '',
                        entry.get('queuedAt', ''),
                        channel,
                        '',
                    ])

    return rows


def build_extra_info_rows(feeds):
    """
    Build rows for the 'Extra Info' tab — timestamps, feed metadata,
    and calendar-like summary data.
    """
    headers = ['Feed Source', 'Last Updated', 'Record Count',
               'Key Metric', 'Value', 'Detail']
    rows = [headers]

    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # --- Gmail feed summary ---
    gmail = feeds.get('gmail', {})
    rows.append([
        'Gmail',
        gmail.get('updated', ''),
        str(gmail.get('count', 0)),
        'Total Starred',
        str(gmail.get('total_starred', gmail.get('count', 0))),
        'Starred contacts from Gmail API',
    ])

    # --- Comms changes summary ---
    comms = feeds.get('comms-changes', {})
    summary = comms.get('summary', {})
    rows.append([
        'Comms Changes',
        comms.get('generated', comms.get('date', '')),
        str(summary.get('new', 0) + summary.get('replied', 0) + summary.get('resolved', 0)),
        'New Threads',
        str(summary.get('new', 0)),
        f"Replied: {summary.get('replied', 0)}, Resolved: {summary.get('resolved', 0)}",
    ])

    # --- Payback summary ---
    payback = feeds.get('payback', {})
    total_owed = 0
    entry_count = 0
    for section in payback.get('sections', []):
        for entry in section.get('entries', []):
            entry_count += 1
            amt = entry.get('amount')
            if amt and isinstance(amt, (int, float)):
                total_owed += amt
    rows.append([
        'Payback',
        payback.get('updated', ''),
        str(entry_count),
        'Total Owed',
        f"${total_owed:,.2f}",
        f"{len(payback.get('sections', []))} sections",
    ])

    # --- Supplier pricing summary ---
    pricing = feeds.get('supplier-pricing', {})
    supplier_count = 0
    if isinstance(pricing, dict):
        supplier_count = len([k for k, v in pricing.items() if isinstance(v, dict) and 'tiers' in v])
    rows.append([
        'Supplier Pricing',
        '',
        str(supplier_count),
        'Suppliers',
        str(supplier_count),
        'Pricing tiers for stream packages',
    ])

    # --- Sent log summaries ---
    for feed_key in ['sent-log-gmail', 'sent-log-imessage', 'sent-log-whatsapp', 'sent-log-other']:
        sent = feeds.get(feed_key, [])
        if isinstance(sent, list):
            channel = feed_key.replace('sent-log-', '')
            sent_count = sum(1 for e in sent if isinstance(e, dict) and e.get('status') == 'sent')
            failed_count = sum(1 for e in sent if isinstance(e, dict) and e.get('status') in ('failed', 'skipped'))
            rows.append([
                f'Sent Log ({channel})',
                '',
                str(len(sent)),
                'Sent',
                str(sent_count),
                f"Failed/Skipped: {failed_count}",
            ])

    # --- Separator + timestamp ---
    rows.append(['', '', '', '', '', ''])
    rows.append([
        'BACKUP TIMESTAMP',
        now,
        '',
        'Script',
        'end-of-day-sheets.py',
        'Ahead Artist Solutions — Wing Dashboard',
    ])

    # --- Calendar-like daily log ---
    rows.append(['', '', '', '', '', ''])
    rows.append(['── Daily Activity Calendar ──', '', '', '', '', ''])
    rows.append(['Date', 'Feed', 'Event', 'Contact', 'Channel', 'Detail'])

    # Pull recent activity from comms changes as a daily timeline
    for change in comms.get('changes', []):
        ts = change.get('timestamp', '')
        date_part = ts[:10] if ts else ''
        rows.append([
            date_part,
            'Comms',
            change.get('type', ''),
            change.get('contactName', ''),
            change.get('channel', ''),
            change.get('subject', '')[:80],
        ])

    # Pull sent activity
    for feed_key in ['sent-log-gmail', 'sent-log-imessage', 'sent-log-whatsapp']:
        sent = feeds.get(feed_key, [])
        if isinstance(sent, list):
            channel = feed_key.replace('sent-log-', '')
            for entry in sent:
                if isinstance(entry, dict):
                    ts = entry.get('sentAt', '')
                    date_part = ts[:10] if ts else ''
                    rows.append([
                        date_part,
                        'Sent',
                        entry.get('status', ''),
                        entry.get('contactName', ''),
                        channel,
                        (entry.get('message', '') or '')[:80],
                    ])

    return rows


# ─────────────────────────────────────────────
#  Toast 3 — First-Time Data Check
# ─────────────────────────────────────────────

def has_data(sheets_service, spreadsheet_id, tab_name):
    """Check if a tab has data beyond the header row."""
    try:
        result = sheets_service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id,
            range=f"'{tab_name}'!A1:A10"
        ).execute()
        values = result.get('values', [])
        return len(values) > 1  # More than just a header row
    except Exception:
        return False


def toast_3_first_time_check(sheets_service, primary_id, backup_id, feeds):
    """Check if this is a first-time population or a daily update."""
    print("\n" + "─" * 50)
    print("  TOAST 3 — First-Time Data Check")
    print("─" * 50)

    primary_has_data = has_data(sheets_service, primary_id, TAB_ALL_CAMPAIGNS)

    if primary_has_data:
        print("  Data exists in primary sheet — proceeding with daily update")
        return False  # Not first time
    else:
        print("  No data found — will do first-time population")
        return True  # First time


# ─────────────────────────────────────────────
#  Write Data to Sheets
# ─────────────────────────────────────────────

def clear_tab(sheets_service, spreadsheet_id, tab_name):
    """Clear all data in a tab."""
    try:
        sheets_service.spreadsheets().values().clear(
            spreadsheetId=spreadsheet_id,
            range=f"'{tab_name}'",
            body={}
        ).execute()
    except Exception as e:
        print(f"  WARNING: Could not clear {tab_name}: {e}")


def write_rows(sheets_service, spreadsheet_id, tab_name, rows):
    """Write rows to a tab, starting at A1."""
    body = {'values': rows}
    sheets_service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id,
        range=f"'{tab_name}'!A1",
        valueInputOption='RAW',
        body=body,
    ).execute()
    return len(rows)


def write_to_spreadsheet(sheets_service, spreadsheet_id, label, campaigns_rows, extra_rows):
    """Clear and write fresh data to one spreadsheet."""
    # Clear both tabs
    clear_tab(sheets_service, spreadsheet_id, TAB_ALL_CAMPAIGNS)
    clear_tab(sheets_service, spreadsheet_id, TAB_EXTRA_INFO)

    # Write All Campaigns
    count_c = write_rows(sheets_service, spreadsheet_id, TAB_ALL_CAMPAIGNS, campaigns_rows)
    print(f"  [{label}] '{TAB_ALL_CAMPAIGNS}': {count_c} rows written")

    # Write Extra Info
    count_e = write_rows(sheets_service, spreadsheet_id, TAB_EXTRA_INFO, extra_rows)
    print(f"  [{label}] '{TAB_EXTRA_INFO}': {count_e} rows written")

    return count_c, count_e


# ─────────────────────────────────────────────
#  Main
# ─────────────────────────────────────────────

def main():
    print("=" * 50)
    print("  End-of-Day Sheets Backup")
    print("  Ahead Artist Solutions / Wing Dashboard")
    print("=" * 50)

    # Authenticate
    print("\nAuthenticating with Google APIs...")
    creds = authenticate()
    sheets_service = build('sheets', 'v4', credentials=creds)
    drive_service = build('drive', 'v3', credentials=creds)
    print("Authenticated successfully.")

    # Toast 1 — Spreadsheet Check / Create
    primary_id, backup_id = toast_1_spreadsheet_check(drive_service, sheets_service)

    # Toast 2 — Tab Check / Create
    toast_2_tab_check(sheets_service, primary_id, backup_id)

    # Load feed data
    print("\n" + "─" * 50)
    print("  Loading Feed Data")
    print("─" * 50)
    feeds = load_feeds()

    if not feeds:
        print("  No feed data found. Nothing to back up.")
        print("  Run your scrapers first to populate data/feeds/")
        return

    print(f"\n  Loaded {len(feeds)} feed files")

    # Toast 3 — First-Time Data Check
    is_first_time = toast_3_first_time_check(sheets_service, primary_id, backup_id, feeds)

    if is_first_time:
        print("\n  Performing first-time population...")
    else:
        print("\n  Performing daily update (clear + refresh)...")

    # Build datasets
    print("\n" + "─" * 50)
    print("  Building Datasets")
    print("─" * 50)

    campaigns_rows = build_all_campaigns_rows(feeds)
    extra_rows = build_extra_info_rows(feeds)

    # Add timestamp row at the end of campaigns
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    campaigns_rows.append([])
    campaigns_rows.append([f'Last Updated: {now}', '', '', '',
                           '', '', '', '', 'end-of-day-sheets.py'])

    print(f"  All Campaigns: {len(campaigns_rows)} rows")
    print(f"  Extra Info: {len(extra_rows)} rows")

    # Write to both spreadsheets
    print("\n" + "─" * 50)
    print("  Writing to Spreadsheets")
    print("─" * 50)

    print("\n  → Primary sheet...")
    c1, e1 = write_to_spreadsheet(sheets_service, primary_id, 'Primary', campaigns_rows, extra_rows)

    print("\n  → Backup sheet...")
    c2, e2 = write_to_spreadsheet(sheets_service, backup_id, 'Backup', campaigns_rows, extra_rows)

    # Summary
    print(f"\n{'=' * 50}")
    print(f"  END-OF-DAY BACKUP COMPLETE")
    print(f"  Timestamp: {now}")
    print(f"  Feeds processed: {len(feeds)}")
    print(f"  Primary:  {c1} campaign rows, {e1} extra rows")
    print(f"  Backup:   {c2} campaign rows, {e2} extra rows")
    print(f"")
    print(f"  Primary ID: {primary_id}")
    print(f"  Backup ID:  {backup_id}")
    print(f"{'=' * 50}")
    print(f"\n  Both sheets are synced and up to date.")
    print(f"  Open: https://docs.google.com/spreadsheets/d/{primary_id}")


if __name__ == '__main__':
    main()
