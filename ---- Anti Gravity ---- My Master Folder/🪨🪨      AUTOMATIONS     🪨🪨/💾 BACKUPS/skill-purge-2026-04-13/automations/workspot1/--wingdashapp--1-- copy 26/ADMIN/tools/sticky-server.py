#!/usr/bin/env python3
"""
sticky-server.py — Wing Dashboard Sticky Note Server
=====================================================
HTTP server (port 3004) that manages per-client sticky note task lists.

Endpoints:
  GET  /stickynote?client={slug}  -> returns client's sticky note JSON
  POST /stickynote                -> save/update a sticky note
  POST /stickynote/download       -> backup copy to timestamped file

CORS enabled for localhost:3000.

Usage:
  python sticky-server.py
"""

import sys
import os
import json
import shutil
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR     = os.path.dirname(os.path.abspath(__file__))
APP_ROOT       = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
STICKYNOTES_DIR = os.path.join(APP_ROOT, 'ADMIN', 'stickynotes')
BACKUPS_DIR     = os.path.join(APP_ROOT, 'ADMIN', 'stickynotes', 'backups')

PORT = 3004


# ── File helpers ──────────────────────────────────────────────────────────────
def note_path(slug):
    return os.path.join(STICKYNOTES_DIR, f'{slug}.json')


def load_json(path):
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except (json.JSONDecodeError, ValueError):
            return None


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ── Request handler ───────────────────────────────────────────────────────────
class StickyHandler(BaseHTTPRequestHandler):

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _json_response(self, status, data):
        body = json.dumps(data, indent=2, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        length = int(self.headers.get('Content-Length', 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode('utf-8'))
        except (json.JSONDecodeError, ValueError):
            return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/stickynote':
            self._get_stickynote(parsed)
        else:
            self._json_response(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path == '/stickynote':
            self._post_stickynote()
        elif self.path == '/stickynote/download':
            self._post_download()
        else:
            self._json_response(404, {'error': 'Not found'})

    # ── GET /stickynote?client={slug} ────────────────────────────────────────
    def _get_stickynote(self, parsed):
        qs = parse_qs(parsed.query)
        slug = qs.get('client', [''])[0].strip()
        if not slug:
            self._json_response(400, {'error': 'Missing ?client= parameter'})
            return

        data = load_json(note_path(slug))
        if data is None:
            self._json_response(200, {'exists': False, 'client': slug})
        else:
            data['exists'] = True
            self._json_response(200, data)

    # ── POST /stickynote ─────────────────────────────────────────────────────
    def _post_stickynote(self):
        body = self._read_body()
        slug = body.get('slug', '').strip()
        if not slug:
            self._json_response(400, {'error': 'Missing slug field'})
            return

        body['updatedAt'] = datetime.now(timezone.utc).isoformat()
        save_json(note_path(slug), body)
        self._json_response(200, {'ok': True, 'slug': slug})

    # ── POST /stickynote/download ────────────────────────────────────────────
    def _post_download(self):
        body = self._read_body()
        slug = body.get('client', '').strip()
        if not slug:
            self._json_response(400, {'error': 'Missing client field'})
            return

        src = note_path(slug)
        if not os.path.exists(src):
            self._json_response(404, {'error': f'No sticky note found for {slug}'})
            return

        ts = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_name = f'{slug}_{ts}.json'
        backup_path = os.path.join(BACKUPS_DIR, backup_name)
        os.makedirs(BACKUPS_DIR, exist_ok=True)
        shutil.copy2(src, backup_path)

        self._json_response(200, {'ok': True, 'backup': backup_name, 'path': backup_path})

    def log_message(self, format, *args):
        print(f'  [{datetime.now().strftime("%H:%M:%S")}] {args[0]}')


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print()
    print('  ╭──────────────────────────────────────────────╮')
    print('    Wing Dashboard — Sticky Note Server')
    print(f'   Port: {PORT}')
    print(f'   Data: {STICKYNOTES_DIR}')
    print('  ╰──────────────────────────────────────────────╯')
    print()
    print('  Endpoints:')
    print('    GET  /stickynote?client={slug}  Read sticky note')
    print('    POST /stickynote                Save sticky note')
    print('    POST /stickynote/download       Backup to timestamped file')
    print()

    server = HTTPServer(('localhost', PORT), StickyHandler)
    print(f'  Listening on http://localhost:{PORT}')
    print('  Press Ctrl+C to stop.')
    print()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')
        server.server_close()


if __name__ == '__main__':
    main()
