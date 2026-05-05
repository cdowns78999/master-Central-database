"""
LESSON 3: POST requests — sending DATA to the server.

GET  = "give me something"       (visiting a URL)
POST = "here's some data, do something with it"  (submitting a form, saving a file)

This is exactly what your dashboard does:
  fetch('/save', { method: 'POST', body: JSON.stringify({ client: 'Marc', html: '...' }) })

The browser SENDS json, the server READS it, does work, sends back a result.

Run this server, then open 3-test-page.html in your browser to see it in action.
"""

import json
from http.server import HTTPServer, BaseHTTPRequestHandler

# We'll store messages here (in memory — gone when server stops)
messages = []

class MyHandler(BaseHTTPRequestHandler):

    def _cors(self):
        """Allow the browser to talk to us from a file:// or different origin."""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        """Browser sends this first to check if POST is allowed (CORS preflight)."""
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_GET(self):
        """GET /messages — return all stored messages as JSON."""
        self.send_response(200)
        self._cors()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(messages).encode())

    def do_POST(self):
        """POST /send — receive a message, store it, confirm."""

        # Step 1: Read the body (the data the client sent)
        length = int(self.headers.get('Content-Length', 0))
        raw_body = self.rfile.read(length)
        data = json.loads(raw_body)

        # Step 2: Do something with it
        name = data.get('name', 'Anonymous')
        text = data.get('message', '')
        messages.append({'name': name, 'message': text})

        print(f'  → Received message from {name}: "{text}"')

        # Step 3: Send back confirmation
        self.send_response(200)
        self._cors()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            'success': True,
            'total_messages': len(messages)
        }).encode())

    def log_message(self, format, *args):
        pass  # Suppress default logs

server = HTTPServer(('0.0.0.0', 4444), MyHandler)
print('Server running on http://localhost:4444')
print()
print('  GET  /messages  → see all messages')
print('  POST /send      → send a new message')
print()
print('Open 3-test-page.html in your browser to try it!')
print('Press Ctrl+C to stop')
server.serve_forever()
