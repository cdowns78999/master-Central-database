#!/usr/bin/env python3
"""
payment-gen.py — Generate a payment card HTML for a client.
Reads the template from ADMIN/templates/payment-card-template.html,
replaces tokens, saves to ADMIN/payment-cards/{client_slug}/{card-slug}.html.

Usage:
    python payment-gen.py "Client Name" --service "Marketing Campaign" --amount "$500.00" --type invoice
    python payment-gen.py "Client Name" --service "Monthly Retainer" --amount "$1500.00" --type subscription --cycle Monthly
"""

import sys
import os
import re
import argparse
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
TEMPLATE_PATH = os.path.join(ADMIN_ROOT, 'templates', 'payment-card-template.html')
PAYMENT_DIR = os.path.join(ADMIN_ROOT, 'payment-cards')


def sanitize_slug(name):
    """Lowercase, replace spaces with hyphens, strip non-alphanumeric chars."""
    name = name.strip().lower()
    name = re.sub(r'\s+', '-', name)
    name = re.sub(r'[^a-z0-9\-]', '', name)
    return name or 'unknown'


def generate(client_name, service, amount, payment_type='invoice', billing_cycle=''):
    client_slug = sanitize_slug(client_name)
    service_slug = sanitize_slug(service) if service else 'payment'
    client_dir = os.path.join(PAYMENT_DIR, client_slug)

    # Read template
    if not os.path.isfile(TEMPLATE_PATH):
        print(f'  [ERROR] Template not found: {TEMPLATE_PATH}')
        sys.exit(1)

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    # Build timestamp
    now = datetime.now()
    timestamp = now.strftime('%B %d, %Y') + ' \u00b7 ' + now.strftime('%I:%M %p')

    # Build billing cycle line
    billing_html = ''
    if payment_type == 'subscription' and billing_cycle:
        billing_html = (
            '<div style="font-size:0.7rem;color:#a5b4fc;margin-top:4px;display:flex;align-items:center;gap:6px;">'
            '<span style="width:6px;height:6px;border-radius:50%;background:#6366f1;display:inline-block;"></span>'
            f'Billing Cycle: {billing_cycle}'
            '</div>'
        )

    # Replace tokens
    html = template.replace('{{CLIENT_NAME}}', client_name)
    html = html.replace('{{SERVICE}}', service or 'Service')
    html = html.replace('{{AMOUNT}}', amount or '$0.00')
    html = html.replace('{{PAYMENT_TYPE}}', payment_type)
    html = html.replace('{{BILLING_CYCLE}}', billing_html)
    html = html.replace('{{TIMESTAMP}}', timestamp)
    html = html.replace('{{CARD_ID}}', str(int(now.timestamp() * 1000)))

    # Write output
    os.makedirs(client_dir, exist_ok=True)

    # Filename: service-slug + timestamp
    ts_short = now.strftime('%Y%m%d-%H%M%S')
    filename = f'{service_slug}-{ts_short}.html'
    output_path = os.path.join(client_dir, filename)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'  [CREATED] Payment Card for "{client_name}" — {service}')
    print(f'  Path: {output_path}')
    return output_path


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate a payment card')
    parser.add_argument('client', help='Client name')
    parser.add_argument('--service', default='', help='Service name')
    parser.add_argument('--amount', default='$0.00', help='Payment amount (e.g. $500.00)')
    parser.add_argument('--type', dest='payment_type', default='invoice', choices=['invoice', 'subscription'], help='Payment type')
    parser.add_argument('--cycle', default='', help='Billing cycle (Monthly, Quarterly, Yearly)')

    args = parser.parse_args()
    path = generate(args.client, args.service, args.amount, args.payment_type, args.cycle)
    if path:
        print(f'\n  Result: {path}')
