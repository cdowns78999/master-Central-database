#!/usr/bin/env python3
"""
outbox-server.py — Wing Dashboard Outbox Server
=================================================
HTTP server (port 3003) that manages the tee-up -> go flow for all 4 comms channels.

Endpoints:
  GET  /outbox           -> returns all queued messages across all 4 channels
  POST /outbox/add       -> adds a message to a channel's queue
  POST /outbox/send      -> triggers send for a single channel
  POST /outbox/send-all  -> fires all channels in order: gmail -> imessage -> whatsapp -> other
  GET  /outbox/status    -> returns sent-log for all channels

CORS enabled for localhost:3000.

Usage:
  python outbox-server.py
"""

import sys
import os
import json
import subprocess
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timezone

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ROOT   = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR  = os.path.join(APP_ROOT, 'data', 'feeds')

PORT = 3003

CHANNELS = ['gmail', 'imessage', 'whatsapp', 'other']

SEND_SCRIPTS = {
    'gmail':    os.path.join(SCRIPT_DIR, 'gmail-send.py'),
    'imessage': os.path.join(SCRIPT_DIR, 'imessage-send.py'),
    'whatsapp': os.path.join(SCRIPT_DIR, 'whatsapp-send.py'),
    'other':    os.path.join(SCRIPT_DIR, 'other-comms-send.py'),
}


# ── File helpers ──────────────────────────────────────────────────────────────
def outbox_path(channel):
    return os.path.join(FEEDS_DIR, f'outbox-{channel}.json')


def sent_log_path(channel):
    return os.path.join(FEEDS_DIR, f'sent-log-{channel}.json')


def load_json(path):
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            return data if isinstance(data, list) else []
        except (json.JSONDecodeError, ValueError):
            return []


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ── Request handler ───────────────────────────────────────────────────────────
class OutboxHandler(BaseHTTPRequestHandler):

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
        if self.path == '/outbox':
            self._get_outbox()
        elif self.path == '/outbox/status':
            self._get_status()
        else:
            self._json_response(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path == '/outbox/add':
            self._post_add()
        elif self.path == '/outbox/send':
            self._post_send()
        elif self.path == '/outbox/send-all':
            self._post_send_all()
        else:
            self._json_response(404, {'error': 'Not found'})

    # ── GET /outbox ───────────────────────────────────────────────────────────
    def _get_outbox(self):
        result = {}
        for ch in CHANNELS:
            result[ch] = load_json(outbox_path(ch))
        self._json_response(200, result)

    # ── GET /outbox/status ────────────────────────────────────────────────────
    def _get_status(self):
        result = {}
        for ch in CHANNELS:
            result[ch] = load_json(sent_log_path(ch))
        self._json_response(200, result)

    # ── POST /outbox/add ──────────────────────────────────────────────────────
    def _post_add(self):
        body = self._read_body()
        channel = body.get('channel', '').strip().lower()
        if channel not in CHANNELS:
            self._json_response(400, {'error': f'Invalid channel. Use: {CHANNELS}'})
            return

        entry = {
            'to':          body.get('to', '').strip(),
            'message':     body.get('message', '').strip(),
            'threadId':    body.get('threadId', '').strip(),
            'contactName': body.get('contactName', '').strip(),
            'queuedAt':    datetime.now(timezone.utc).isoformat(),
        }

        if not entry['to'] or not entry['message']:
            self._json_response(400, {'error': 'Missing required fields: to, message'})
            return

        path = outbox_path(channel)
        queue = load_json(path)
        queue.append(entry)
        save_json(path, queue)

        self._json_response(200, {'ok': True, 'channel': channel, 'queued': len(queue)})

    # ── POST /outbox/send ─────────────────────────────────────────────────────
    def _post_send(self):
        body = self._read_body()
        channel = body.get('channel', '').strip().lower()
        if channel not in CHANNELS:
            self._json_response(400, {'error': f'Invalid channel. Use: {CHANNELS}'})
            return

        result = self._run_send_script(channel)
        self._json_response(200, result)

    # ── POST /outbox/send-all ─────────────────────────────────────────────────
    def _post_send_all(self):
        results = {}
        for ch in CHANNELS:
            queue = load_json(outbox_path(ch))
            if not queue:
                results[ch] = {'status': 'empty', 'output': 'No messages queued'}
                continue
            results[ch] = self._run_send_script(ch)
        self._json_response(200, results)

    # ── Run a send script ─────────────────────────────────────────────────────
    def _run_send_script(self, channel):
        script = SEND_SCRIPTS.get(channel)
        if not script or not os.path.exists(script):
            return {'status': 'error', 'output': f'Send script not found: {script}'}

        try:
            result = subprocess.run(
                [sys.executable, script],
                capture_output=True,
                text=True,
                timeout=120,
                cwd=SCRIPT_DIR,
            )
            output = (result.stdout or '') + (result.stderr or '')
            return {
                'status': 'done' if result.returncode == 0 else 'error',
                'returncode': result.returncode,
                'output': output.strip(),
            }
        except subprocess.TimeoutExpired:
            return {'status': 'error', 'output': 'Script timed out after 120s'}
        except Exception as e:
            return {'status': 'error', 'output': str(e)}

    def log_message(self, format, *args):
        print(f'  [{datetime.now().strftime("%H:%M:%S")}] {args[0]}')


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print()
    print('  ╭──────────────────────────────────────────────╮')
    print('    Wing Dashboard — Outbox Server')
    print(f'   Port: {PORT}')
    print(f'   Feeds: {FEEDS_DIR}')
    print('  ╰──────────────────────────────────────────────╯')
    print()
    print('  Endpoints:')
    print('    GET  /outbox           All queued messages')
    print('    POST /outbox/add       Add a message to queue')
    print('    POST /outbox/send      Send one channel')
    print('    POST /outbox/send-all  Send all channels')
    print('    GET  /outbox/status    Sent logs')
    print()

    server = HTTPServer(('localhost', PORT), OutboxHandler)
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
