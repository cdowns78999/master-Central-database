#!/usr/bin/env python3
"""
save-result.py — Minimal HTTP server for saving dashboard results to disk.
Runs on port 3001. Accepts POST /save with JSON body.
No dependencies beyond Python stdlib.
"""

import sys
import os
import json
import re
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ──────────────────────────────────────────────────────────────
# This script lives in:  …/--wingdashapp--1--/ADMIN/tools/
# Results folder lives:  …/🪨🪨      AUTOMATIONS     🪨🪨/⚙️ ADMIN/results/
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
RESULTS_DIR = os.path.join(
    os.path.expanduser('~'),
    'OneDrive', 'Documents', 'GitHub', 'master-Central-database',
    '---- Anti Gravity ---- My Master Folder',
    '\U0001faa8\U0001faa8      AUTOMATIONS     \U0001faa8\U0001faa8',
    '\u2699\ufe0f ADMIN',
    'results'
)

# Subfolder mapping (type → subfolder name under client dir)
TYPE_FOLDERS = {
    'proposal': 'proposals',
    'presentation': 'presentations',
    'payment': 'payments',
}

PORT = 3001


def sanitize_filename(name):
    """Replace spaces with underscores, strip anything that isn't alphanumeric/underscore/hyphen."""
    name = name.strip()
    name = name.replace(' ', '_')
    name = re.sub(r'[^a-zA-Z0-9_\-]', '', name)
    return name or 'unnamed'


def sanitize_client(name):
    """Lowercase, replace spaces with underscores, strip special chars. Used for client folder names."""
    name = name.strip().lower()
    name = name.replace(' ', '_')
    name = re.sub(r'[^a-z0-9_\-]', '', name)
    return name or '_unknown'


def make_timestamp():
    """Return timestamp string in YYYY-MM-DD_HHmmss format."""
    return datetime.now().strftime('%Y-%m-%d_%H%M%S')


class SaveHandler(BaseHTTPRequestHandler):
    """Handle POST /save requests."""

    def _cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path != '/save':
            self.send_response(404)
            self._cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': 'Not found'}).encode())
            return

        try:
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            data = json.loads(body)

            result_type = data.get('type', '').lower()
            raw_client = data.get('clientName', '').strip()
            html = data.get('html', '')
            title = data.get('title', '')

            if result_type not in TYPE_FOLDERS:
                self.send_response(400)
                self._cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': f'Invalid type "{result_type}". Must be: {", ".join(TYPE_FOLDERS.keys())}'
                }).encode())
                return

            # Resolve client folder: fall back to _unknown if missing
            client_folder = sanitize_client(raw_client) if raw_client else '_unknown'

            # Build filename using original (unsanitized-for-case) client name for readability
            safe_name = sanitize_filename(raw_client) if raw_client else 'unknown'
            timestamp = make_timestamp()
            filename = f'{safe_name}_{timestamp}.html'

            # Build full path: results/clients/{client_folder}/{type_folder}/filename
            subfolder = os.path.join(RESULTS_DIR, 'clients', client_folder, TYPE_FOLDERS[result_type])
            os.makedirs(subfolder, exist_ok=True)
            filepath = os.path.join(subfolder, filename)

            # Write the file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html)

            # Relative path for response (from app root)
            rel_path = os.path.relpath(filepath, APP_ROOT).replace('\\', '/')

            print(f'  [SAVED] {rel_path}  ({len(html)} bytes)')

            self.send_response(200)
            self._cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'path': rel_path,
                'filename': filename
            }).encode())

        except Exception as e:
            print(f'  [ERROR] {e}')
            self.send_response(500)
            self._cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': str(e)
            }).encode())

    def log_message(self, format, *args):
        """Suppress default access logs — we print our own."""
        pass


if __name__ == '__main__':
    # Ensure base clients folder exists (individual client dirs created on demand)
    os.makedirs(os.path.join(RESULTS_DIR, 'clients'), exist_ok=True)

    print()
    print('  ╭──────────────────────────────────────────────╮')
    print(f'    Wing Dashboard — Save Server')
    print(f'    Port: {PORT}')
    print(f'    Saving to: {RESULTS_DIR}')
    print('  ╰──────────────────────────────────────────────╯')
    print()
    print('  Folder structure:')
    print(f'    results/clients/{{client_name}}/proposals/')
    print(f'    results/clients/{{client_name}}/presentations/')
    print(f'    results/clients/{{client_name}}/payments/')
    print()
    print('  Waiting for POST /save requests...')
    print()

    server = HTTPServer(('0.0.0.0', PORT), SaveHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')
        server.server_close()
