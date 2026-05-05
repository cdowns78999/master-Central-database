"""
Drive Scan — Google Drive File Lister & Search
Ahead Artist Solutions | Digital Coms Railroad

Connects to Google Drive API via OAuth2 (shares credentials with gmail-scrape.py).
Lists root files or searches by keyword.

USAGE:
  python drive-scan.py                  → list top 20 files/folders from root
  python drive-scan.py "search term"    → search Drive for matching files

SETUP:
  Same as gmail-scrape.py — uses the same credentials.json and token.json.
  If token.json is missing or stale, a browser window will open for OAuth consent.
  The token must include drive.readonly scope (run gmail-scrape.py first if needed).

OUTPUT: JSON to stdout
"""

import os
import sys
import json
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
    print("Missing dependencies. Run:", file=sys.stderr)
    print("  pip install google-auth google-auth-oauthlib google-api-python-client", file=sys.stderr)
    exit(1)

# Config — shared with gmail-scrape.py
SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
]
SCRIPT_DIR = Path(__file__).parent
CREDENTIALS_FILE = SCRIPT_DIR / 'credentials.json'
TOKEN_FILE = SCRIPT_DIR / 'token.json'
MAX_RESULTS = 20

# Default client folders root in Google Drive
DEFAULT_DRIVE_FOLDER_ID = '1HiOv4vnFh6qZeCtPH9_lOthfO-S4B-Fk'


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
                print(f"ERROR: {CREDENTIALS_FILE} not found.", file=sys.stderr)
                print("Download OAuth2 credentials from Google Cloud Console.", file=sys.stderr)
                exit(1)
            print("** First run with Drive scope — browser will open for authorization **", file=sys.stderr)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)

        TOKEN_FILE.write_text(creds.to_json())
        print("Token saved for future use.", file=sys.stderr)

    return build('drive', 'v3', credentials=creds)


def list_root_files(service):
    """List top N files/folders from Drive root."""
    results = service.files().list(
        q="'root' in parents and trashed = false",
        pageSize=MAX_RESULTS,
        fields="files(id, name, mimeType, modifiedTime, size, webViewLink)",
        orderBy="modifiedTime desc"
    ).execute()
    return results.get('files', [])


def search_files(service, query):
    """Search Drive by keyword."""
    results = service.files().list(
        q=f"name contains '{query}' and trashed = false",
        pageSize=MAX_RESULTS,
        fields="files(id, name, mimeType, modifiedTime, size, webViewLink)",
        orderBy="modifiedTime desc"
    ).execute()
    return results.get('files', [])


def format_output(files, mode="root"):
    """Build structured JSON output."""
    items = []
    for f in files:
        item = {
            'id': f['id'],
            'name': f['name'],
            'type': 'folder' if f['mimeType'] == 'application/vnd.google-apps.folder' else 'file',
            'mimeType': f['mimeType'],
            'modifiedTime': f.get('modifiedTime', ''),
            'link': f.get('webViewLink', ''),
        }
        if 'size' in f:
            item['size_bytes'] = int(f['size'])
        items.append(item)

    return {
        'mode': mode,
        'count': len(items),
        'files': items,
    }


def main():
    search_term = sys.argv[1] if len(sys.argv) > 1 else None

    service = authenticate()

    if search_term:
        print(f"Searching Drive for: {search_term}", file=sys.stderr)
        files = search_files(service, search_term)
        output = format_output(files, mode=f"search:{search_term}")
    else:
        print("Listing top 20 root files/folders...", file=sys.stderr)
        files = list_root_files(service)
        output = format_output(files, mode="root")

    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
