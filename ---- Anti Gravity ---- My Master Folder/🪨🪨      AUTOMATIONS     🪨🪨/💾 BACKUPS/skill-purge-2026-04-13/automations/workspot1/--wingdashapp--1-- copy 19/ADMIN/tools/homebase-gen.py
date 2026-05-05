#!/usr/bin/env python3
"""
homebase-gen.py — Generate a Home Base page for a client.
Reads the template from ADMIN/templates/homebase-template.html,
replaces tokens, writes to ADMIN/homebases/{client_slug}/index.html.

Usage:
    python homebase-gen.py "Client Name"
"""

import sys
import os
import re
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
TEMPLATE_PATH = os.path.join(ADMIN_ROOT, 'templates', 'homebase-template.html')
HOMEBASES_DIR = os.path.join(ADMIN_ROOT, 'homebases')


def sanitize_slug(name):
    """Lowercase, replace spaces with hyphens, strip non-alphanumeric chars."""
    name = name.strip().lower()
    name = re.sub(r'\s+', '-', name)
    name = re.sub(r'[^a-z0-9\-]', '', name)
    return name or 'unknown'


def generate(client_name):
    client_slug = sanitize_slug(client_name)
    client_dir = os.path.join(HOMEBASES_DIR, client_slug)

    # Check if already exists
    output_path = os.path.join(client_dir, 'index.html')
    if os.path.isfile(output_path):
        print(f'  [EXISTS] Home Base already exists for "{client_name}"')
        print(f'  Path: {output_path}')
        return output_path

    # Read template
    if not os.path.isfile(TEMPLATE_PATH):
        print(f'  [ERROR] Template not found: {TEMPLATE_PATH}')
        sys.exit(1)

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    # Replace tokens
    timestamp = datetime.now().strftime('%B %d, %Y %I:%M %p')
    html = template.replace('{{CLIENT_NAME}}', client_name)
    html = html.replace('{{TIMESTAMP}}', timestamp)

    # Write output
    os.makedirs(client_dir, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'  [CREATED] Home Base for "{client_name}"')
    print(f'  Path: {output_path}')
    return output_path


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python homebase-gen.py "Client Name"')
        sys.exit(1)

    client_name = sys.argv[1].strip()
    if not client_name:
        print('Error: Client name cannot be empty')
        sys.exit(1)

    path = generate(client_name)
    print(f'\n  Result: {path}')
