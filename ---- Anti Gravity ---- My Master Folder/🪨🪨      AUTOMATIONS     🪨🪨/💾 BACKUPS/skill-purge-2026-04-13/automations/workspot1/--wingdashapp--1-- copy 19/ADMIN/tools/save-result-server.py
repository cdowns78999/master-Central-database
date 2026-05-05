#!/usr/bin/env python3
"""
save-result-server.py — File operation server for Wing Dashboard ADMIN folder protocol.
Runs on localhost:3003. Provides check/save/list endpoints so the dashboard JS
can read and write files under ADMIN/ without localStorage.

Endpoints:
  POST /check  — check if a folder/file exists, return boolean + listing
  POST /save   — save HTML content to a path under ADMIN/
  POST /list   — list files in a client folder
  GET  /health — simple health check
"""

import sys
import os
import json
import re
import glob
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ──────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))

PORT = 3003


def sanitize_slug(name):
    """Lowercase, replace spaces with hyphens, strip non-alphanumeric chars."""
    name = name.strip().lower()
    name = re.sub(r'\s+', '-', name)
    name = re.sub(r'[^a-z0-9\-]', '', name)
    return name or 'unknown'


class AdminHandler(BaseHTTPRequestHandler):
    """Handle file operation requests for ADMIN folder protocol."""

    def _cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _json_response(self, code, data):
        self.send_response(code)
        self._cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def _read_body(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length)
        return json.loads(body) if body else {}

    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == '/health':
            self._json_response(200, {'status': 'ok', 'port': PORT, 'admin_root': ADMIN_ROOT})
            return

        # Serve static files from ADMIN root
        # Strip query string and decode URL
        from urllib.parse import unquote, urlparse
        parsed = urlparse(self.path)
        clean_path = unquote(parsed.path).lstrip('/')

        # Security: block path traversal above ADMIN root
        file_path = os.path.normpath(os.path.join(ADMIN_ROOT, clean_path))
        if not file_path.startswith(os.path.normpath(ADMIN_ROOT)):
            self._json_response(403, {'error': 'Forbidden'})
            return

        if os.path.isfile(file_path):
            # Determine content type
            ext = os.path.splitext(file_path)[1].lower()
            content_types = {
                '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
                '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml', '.txt': 'text/plain', '.pdf': 'application/pdf'
            }
            ctype = content_types.get(ext, 'application/octet-stream')
            try:
                with open(file_path, 'rb') as f:
                    data = f.read()
                self.send_response(200)
                self._cors_headers()
                self.send_header('Content-Type', ctype + '; charset=utf-8' if ctype.startswith('text') else ctype)
                self.send_header('Content-Length', str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self._json_response(500, {'error': str(e)})
        else:
            self._json_response(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path == '/check':
            self._handle_check()
        elif self.path == '/save':
            self._handle_save()
        elif self.path == '/list':
            self._handle_list()
        else:
            self._json_response(404, {'error': 'Not found'})

    def _handle_check(self):
        """Check if a folder/file exists under ADMIN/.
        Body: { "type": "homebases|presentations|payment-cards", "client": "Client Name" }
        Returns: { "exists": bool, "path": str, "files": [...] }
        """
        try:
            data = self._read_body()
            rtype = data.get('type', '')
            client = data.get('client', '')

            if not rtype or not client:
                self._json_response(400, {'error': 'Missing type or client'})
                return

            client_slug = sanitize_slug(client)
            subfolder = data.get('subfolder', '')
            if subfolder and '..' not in subfolder:
                folder_path = os.path.join(ADMIN_ROOT, rtype, client_slug, subfolder)
            else:
                folder_path = os.path.join(ADMIN_ROOT, rtype, client_slug)

            exists = os.path.isdir(folder_path)
            files = []
            if exists:
                files = sorted([
                    f for f in os.listdir(folder_path)
                    if os.path.isfile(os.path.join(folder_path, f))
                ])

            self._json_response(200, {
                'exists': exists,
                'path': folder_path.replace('\\', '/'),
                'clientSlug': client_slug,
                'files': files
            })

        except Exception as e:
            self._json_response(500, {'error': str(e)})

    def _handle_save(self):
        """Save HTML content to ADMIN/{type}/{client_slug}/{filename}.
        Body: { "type": "homebases|presentations|payment-cards",
                "client": "Client Name",
                "filename": "index.html" or "P1.html" etc.,
                "html": "<html>..." }
        Returns: { "success": true, "path": "...", "filename": "..." }
        """
        try:
            data = self._read_body()
            rtype = data.get('type', '')
            client = data.get('client', '')
            filename = data.get('filename', 'index.html')
            html = data.get('html', '')

            if not rtype or not client or not html:
                self._json_response(400, {'error': 'Missing type, client, or html'})
                return

            # Security: prevent path traversal
            if '..' in rtype or '..' in client or '..' in filename:
                self._json_response(400, {'error': 'Invalid path component'})
                return

            client_slug = sanitize_slug(client)
            subfolder = data.get('subfolder', '')
            if subfolder and '..' not in subfolder:
                folder_path = os.path.join(ADMIN_ROOT, rtype, client_slug, subfolder)
            else:
                folder_path = os.path.join(ADMIN_ROOT, rtype, client_slug)
            os.makedirs(folder_path, exist_ok=True)

            filepath = os.path.join(folder_path, filename)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html)

            rel_path = os.path.relpath(filepath, ADMIN_ROOT).replace('\\', '/')

            print(f'  [SAVED] {rel_path}  ({len(html)} bytes)')

            self._json_response(200, {
                'success': True,
                'path': filepath.replace('\\', '/'),
                'relativePath': rel_path,
                'filename': filename
            })

        except Exception as e:
            print(f'  [ERROR] {e}')
            self._json_response(500, {'error': str(e)})

    def _handle_list(self):
        """List files in ADMIN/{type}/{client_slug}/.
        Body: { "type": "homebases|presentations|payment-cards", "client": "Client Name" }
        Returns: { "files": [...], "count": N }
        """
        try:
            data = self._read_body()
            rtype = data.get('type', '')
            client = data.get('client', '')

            if not rtype or not client:
                self._json_response(400, {'error': 'Missing type or client'})
                return

            client_slug = sanitize_slug(client)
            folder_path = os.path.join(ADMIN_ROOT, rtype, client_slug)

            if not os.path.isdir(folder_path):
                self._json_response(200, {'files': [], 'count': 0, 'path': folder_path.replace('\\', '/')})
                return

            files = sorted([
                f for f in os.listdir(folder_path)
                if os.path.isfile(os.path.join(folder_path, f))
            ])

            self._json_response(200, {
                'files': files,
                'count': len(files),
                'path': folder_path.replace('\\', '/')
            })

        except Exception as e:
            self._json_response(500, {'error': str(e)})

    def log_message(self, format, *args):
        """Suppress default access logs — we print our own."""
        pass


if __name__ == '__main__':
    # Ensure type folders exist
    for folder in ['homebases', 'presentations', 'payment-cards', 'templates']:
        os.makedirs(os.path.join(ADMIN_ROOT, folder), exist_ok=True)

    print()
    print('  +--------------------------------------------------+')
    print(f'    Wing Dashboard — ADMIN File Server')
    print(f'    Port: {PORT}')
    print(f'    ADMIN root: {ADMIN_ROOT}')
    print('  +--------------------------------------------------+')
    print()
    print('  Endpoints:')
    print('    POST /check  — check if client folder exists')
    print('    POST /save   — save HTML to client folder')
    print('    POST /list   — list files in client folder')
    print('    GET  /health — server health check')
    print()
    print('  Waiting for requests...')
    print()

    server = HTTPServer(('0.0.0.0', PORT), AdminHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')
        server.server_close()
