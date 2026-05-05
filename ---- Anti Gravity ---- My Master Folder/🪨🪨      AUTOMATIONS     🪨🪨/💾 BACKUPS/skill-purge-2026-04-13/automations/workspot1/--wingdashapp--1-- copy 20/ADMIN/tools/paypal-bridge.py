#!/usr/bin/env python3
"""
PayPal Bridge Server — Ahead Artist Solutions
Runs on port 3002, bridges Wing Dashboard <-> Chrome Extension <-> PayPal

Endpoints:
  POST /bridge   — accepts payment data, formats for Chrome extension
  POST /complete — receives PayPal confirmation link after payment created
  GET  /status   — returns completed payments (polled by dashboard)

Zero external dependencies — Python stdlib only.
"""

import sys
import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime
from pathlib import Path

# Fix Windows emoji-path encoding
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

PORT = 3002
HOST = '127.0.0.1'

# In-memory store for completed payments
completed_payments = []
pending_payments = []

# Path to payment card results
SCRIPT_DIR = Path(__file__).resolve().parent
RESULTS_DIR = SCRIPT_DIR.parent.parent / 'data' / 'results' / 'payments'


class PayPalBridgeHandler(BaseHTTPRequestHandler):
    """HTTP request handler for the PayPal bridge server."""

    def _set_cors_headers(self):
        """Set CORS headers for browser access."""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_json(self, status, data):
        """Send a JSON response."""
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self._set_cors_headers()
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self):
        """Read and parse the JSON request body."""
        length = int(self.headers.get('Content-Length', 0))
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode('utf-8'))

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        """Handle GET requests."""
        if self.path == '/status':
            self._handle_status()
        elif self.path == '/health':
            self._send_json(200, {'status': 'ok', 'port': PORT, 'pending': len(pending_payments), 'completed': len(completed_payments)})
        elif self.path == '/':
            self._send_json(200, {
                'name': 'PayPal Bridge — Ahead Artist Solutions',
                'version': '1.0.0',
                'endpoints': ['/bridge', '/complete', '/status', '/health']
            })
        else:
            self._send_json(404, {'error': 'Not found'})

    def do_POST(self):
        """Handle POST requests."""
        if self.path == '/bridge':
            self._handle_bridge()
        elif self.path == '/complete':
            self._handle_complete()
        else:
            self._send_json(404, {'error': 'Not found'})

    def _handle_bridge(self):
        """
        POST /bridge
        Accepts payment data from the dashboard, formats it for the Chrome extension's
        localStorage format, and returns the formatted data + target PayPal URL.

        Expected body:
        {
            "client": "Artist Name",
            "paymentType": "invoice" | "subscription",
            "data": { "mode": "...", "fields": [...] }
        }
        """
        try:
            body = self._read_body()
        except Exception as e:
            self._send_json(400, {'error': f'Invalid JSON: {e}'})
            return

        client = body.get('client', '')
        payment_type = body.get('paymentType', 'invoice')
        passoff_data = body.get('data', {})

        if not client:
            self._send_json(400, {'error': 'Missing client name'})
            return

        # Determine target PayPal URL
        if payment_type == 'subscription':
            target_url = 'https://www.paypal.com/billing/plans'
        else:
            target_url = 'https://www.paypal.com/invoice/create'

        # Format the localStorage payload (passoff_billing_data)
        local_storage_payload = {
            'mode': passoff_data.get('mode', payment_type),
            'fields': passoff_data.get('fields', [])
        }

        # Track as pending
        pending_entry = {
            'client': client,
            'paymentType': payment_type,
            'targetUrl': target_url,
            'localStoragePayload': local_storage_payload,
            'sentAt': datetime.utcnow().isoformat() + 'Z',
            'status': 'pending'
        }
        pending_payments.append(pending_entry)

        print(f'[BRIDGE] Payment data received for {client} ({payment_type})')
        print(f'[BRIDGE] Target: {target_url}')
        print(f'[BRIDGE] Fields: {len(local_storage_payload["fields"])}')

        self._send_json(200, {
            'success': True,
            'client': client,
            'paymentType': payment_type,
            'targetUrl': target_url,
            'localStoragePayload': local_storage_payload,
            'message': f'Data formatted for {payment_type}. Open {target_url} with the Chrome extension active.'
        })

    def _handle_complete(self):
        """
        POST /complete
        Called when a PayPal payment/invoice/subscription is created.
        Receives the PayPal link/confirmation and updates records.

        Expected body:
        {
            "client": "Artist Name",
            "paypalUrl": "https://www.paypal.com/invoice/...",
            "confirmationId": "INV-XXXXX" (optional)
        }
        """
        try:
            body = self._read_body()
        except Exception as e:
            self._send_json(400, {'error': f'Invalid JSON: {e}'})
            return

        client = body.get('client', '')
        paypal_url = body.get('paypalUrl', '')

        if not client or not paypal_url:
            self._send_json(400, {'error': 'Missing client or paypalUrl'})
            return

        confirmation_id = body.get('confirmationId', '')
        completed_at = datetime.utcnow().isoformat() + 'Z'

        # Move from pending to completed
        found_pending = False
        for i, p in enumerate(pending_payments):
            if p['client'].lower() == client.lower() and p['status'] == 'pending':
                p['status'] = 'complete'
                p['paypalUrl'] = paypal_url
                p['confirmationId'] = confirmation_id
                p['completedAt'] = completed_at
                found_pending = True
                break

        completed_entry = {
            'client': client,
            'paypalUrl': paypal_url,
            'confirmationId': confirmation_id,
            'completedAt': completed_at
        }
        completed_payments.append(completed_entry)

        # Try to save a payment result file
        try:
            RESULTS_DIR.mkdir(parents=True, exist_ok=True)
            safe_name = client.replace(' ', '_').lower()
            result_file = RESULTS_DIR / f'{safe_name}_{int(datetime.utcnow().timestamp())}.json'
            result_data = {
                'client': client,
                'paypalUrl': paypal_url,
                'confirmationId': confirmation_id,
                'completedAt': completed_at,
                'source': 'paypal-bridge'
            }
            result_file.write_text(json.dumps(result_data, indent=2, ensure_ascii=False), encoding='utf-8')
            print(f'[COMPLETE] Saved result to {result_file}')
        except Exception as e:
            print(f'[COMPLETE] Warning: could not save result file: {e}')

        print(f'[COMPLETE] Payment confirmed for {client}: {paypal_url}')

        self._send_json(200, {
            'success': True,
            'client': client,
            'paypalUrl': paypal_url,
            'completedAt': completed_at,
            'message': f'Payment link saved for {client}'
        })

    def _handle_status(self):
        """
        GET /status
        Returns all completed payments (for dashboard polling).
        After returning, clears the completed list so they're not sent again.
        """
        data = {
            'pending': len(pending_payments),
            'completed': list(completed_payments)
        }

        # Clear completed after sending (dashboard has them now)
        completed_payments.clear()

        self._send_json(200, data)

    def log_message(self, format, *args):
        """Override to add timestamp and prefix."""
        ts = datetime.now().strftime('%H:%M:%S')
        print(f'[{ts}] {args[0]}')


def main():
    print('=' * 50)
    print('  PayPal Bridge Server — Ahead Artist Solutions')
    print('=' * 50)
    print(f'  Host:    {HOST}')
    print(f'  Port:    {PORT}')
    print(f'  Results: {RESULTS_DIR}')
    print()
    print('  Endpoints:')
    print('    POST /bridge   — format payment data for extension')
    print('    POST /complete — receive PayPal confirmation')
    print('    GET  /status   — poll for completed payments')
    print('    GET  /health   — server health check')
    print()
    print('  Waiting for connections...')
    print('=' * 50)

    server = HTTPServer((HOST, PORT), PayPalBridgeHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n[SHUTDOWN] PayPal Bridge Server stopped.')
        server.server_close()


if __name__ == '__main__':
    main()
