#!/usr/bin/env python3
"""
push-server.py — Wing Dashboard Push Notification Server
=========================================================
HTTP server (port 3005) that manages Firebase push notifications.

Endpoints:
  GET  /push/status      -> health check
  POST /push/send        -> send a push notification to a client by slug
  POST /push/save-token  -> save an FCM token for a client slug
  GET  /push/history     -> returns full sent log

CORS enabled for all origins.

Usage:
  python push-server.py
"""

import sys
import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timezone

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
APP_ROOT     = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..'))
FEEDS_DIR    = os.path.join(APP_ROOT, 'data', 'feeds')
CLIENTS_DIR  = os.path.join(APP_ROOT, 'data', 'clients')
SA_PATH      = os.path.join(SCRIPT_DIR, 'firebase-service-account.json')
SENT_LOG     = os.path.join(FEEDS_DIR, 'sent-log-push.json')

PORT = 3005

# ── Firebase init (lazy — only if SA file exists) ────────────────────────────
_firebase_ready = False

def _init_firebase():
    global _firebase_ready
    if _firebase_ready:
        return True
    if not os.path.exists(SA_PATH):
        return False
    try:
        import firebase_admin
        from firebase_admin import credentials
        if not firebase_admin._apps:
            cred = credentials.Certificate(SA_PATH)
            firebase_admin.initialize_app(cred)
        _firebase_ready = True
        return True
    except Exception as e:
        print(f'  [Firebase init error] {e}')
        return False


# ── File helpers ──────────────────────────────────────────────────────────────
def load_json(path):
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            return data if isinstance(data, list) else []
        except (json.JSONDecodeError, ValueError):
            return []


def load_json_obj(path):
    if not os.path.exists(path):
        return {}
    with open(path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
        except (json.JSONDecodeError, ValueError):
            return {}


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def client_path(slug):
    return os.path.join(CLIENTS_DIR, f'{slug}.json')


def append_sent_log(entry):
    log = load_json(SENT_LOG)
    log.append(entry)
    save_json(SENT_LOG, log)


# ── Request handler ───────────────────────────────────────────────────────────
class PushHandler(BaseHTTPRequestHandler):

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
        if self.path == '/push/status':
            self._get_status()
        elif self.path == '/push/history':
            self._get_history()
        else:
            self._json_response(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path == '/push/send':
            self._post_send()
        elif self.path == '/push/save-token':
            self._post_save_token()
        else:
            self._json_response(404, {'error': 'Not found'})

    # ── GET /push/status ──────────────────────────────────────────────────────
    def _get_status(self):
        self._json_response(200, {'ok': True, 'port': PORT})

    # ── GET /push/history ─────────────────────────────────────────────────────
    def _get_history(self):
        self._json_response(200, load_json(SENT_LOG))

    # ── POST /push/send ───────────────────────────────────────────────────────
    def _post_send(self):
        body = self._read_body()
        slug  = body.get('slug', '').strip()
        title = body.get('title', '').strip()
        msg   = body.get('body', '').strip()
        url   = body.get('url', '').strip()

        if not slug or not title or not msg:
            self._json_response(400, {'status': 'error', 'error': 'Missing required fields: slug, title, body'})
            return

        # Guard: service account file
        if not os.path.exists(SA_PATH):
            self._json_response(500, {
                'status': 'error',
                'error': 'firebase-service-account.json not found — add your Firebase credentials first'
            })
            return

        # Load client
        cpath = client_path(slug)
        if not os.path.exists(cpath):
            self._json_response(404, {'status': 'error', 'error': f'Client not found: {slug}'})
            return

        client = load_json_obj(cpath)
        fcm_token = (
            client
            .get('communication', {})
            .get('push', {})
            .get('token', '')
        )

        if not fcm_token:
            self._json_response(400, {
                'status': 'error',
                'error': 'No push token for this client — they need to enable notifications on their homebase first'
            })
            return

        # Init Firebase
        if not _init_firebase():
            self._json_response(500, {'status': 'error', 'error': 'Firebase failed to initialize'})
            return

        # Send
        try:
            from firebase_admin import messaging

            message = messaging.Message(
                notification=messaging.Notification(title=title, body=msg),
                data={'url': url} if url else {},
                token=fcm_token,
            )
            message_id = messaging.send(message)

            entry = {
                'slug':      slug,
                'title':     title,
                'body':      msg,
                'url':       url,
                'sentAt':    datetime.now(timezone.utc).isoformat(),
                'messageId': message_id,
            }
            append_sent_log(entry)

            self._json_response(200, {'status': 'sent', 'messageId': message_id})

        except Exception as e:
            self._json_response(500, {'status': 'error', 'error': str(e)})

    # ── POST /push/save-token ─────────────────────────────────────────────────
    def _post_save_token(self):
        body  = self._read_body()
        slug  = body.get('slug', '').strip()
        token = body.get('token', '').strip()

        if not slug or not token:
            self._json_response(400, {'status': 'error', 'error': 'Missing required fields: slug, token'})
            return

        cpath = client_path(slug)
        if not os.path.exists(cpath):
            self._json_response(404, {'status': 'error', 'error': f'Client not found: {slug}'})
            return

        client = load_json_obj(cpath)

        # Ensure nested structure exists
        if 'communication' not in client:
            client['communication'] = {}
        if 'push' not in client['communication']:
            client['communication']['push'] = {}

        client['communication']['push']['token']        = token
        client['communication']['push']['tokenSavedAt'] = datetime.now(timezone.utc).isoformat()
        client['communication']['push']['enabled']      = True

        save_json(cpath, client)
        self._json_response(200, {'ok': True})

    def log_message(self, format, *args):
        print(f'  [{datetime.now().strftime("%H:%M:%S")}] {args[0]}')


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print()
    print('  ╭──────────────────────────────────────────────╮')
    print('    Wing Dashboard — Push Notification Server')
    print(f'   Port: {PORT}')
    print(f'   Feeds: {FEEDS_DIR}')
    print(f'   SA key: {SA_PATH}')
    print('  ╰──────────────────────────────────────────────╯')
    print()
    print('  Endpoints:')
    print('    GET  /push/status      Health check')
    print('    POST /push/send        Send a push notification')
    print('    POST /push/save-token  Save FCM token for a client')
    print('    GET  /push/history     Sent log')
    print()

    if not os.path.exists(SA_PATH):
        print('  ⚠  firebase-service-account.json not found.')
        print('     /push/send will return an error until you add it.')
        print()

    print('  Push server running on http://localhost:3005')
    print('  Press Ctrl+C to stop.')
    print()

    server = HTTPServer(('localhost', PORT), PushHandler)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')
        server.server_close()


if __name__ == '__main__':
    main()
