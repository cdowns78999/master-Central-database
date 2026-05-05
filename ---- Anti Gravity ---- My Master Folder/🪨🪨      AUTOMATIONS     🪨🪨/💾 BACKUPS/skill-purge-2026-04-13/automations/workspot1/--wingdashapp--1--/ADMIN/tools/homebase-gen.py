#!/usr/bin/env python3
"""
homebase-gen.py — Generate a Home Base page for a client.
Reads the template from ADMIN/templates/homebase-template.html,
replaces tokens, writes to ADMIN/homebases/{client_slug}/index.html.

Usage:
    python homebase-gen.py "Client Name"
    python homebase-gen.py "Client Name" --force
    python homebase-gen.py "Client Name" --campaigns '[{"name":"...","type":"...","service":"...","date":"..."}]'
    python homebase-gen.py "Client Name" --campaigns campaigns.json --force
"""

import sys
import os
import re
import json
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


def detect_badge_type(campaign_type):
    """Map campaign type string to a badge data-type for CSS styling."""
    t = campaign_type.strip().lower()
    if 'spotify' in t:
        return 'spotify'
    elif 'soundcloud' in t or 'stream' in t:
        return 'soundcloud'
    elif 'youtube' in t:
        return 'youtube'
    elif 'press' in t or 'article' in t or 'blog' in t:
        return 'press'
    elif 'social' in t or 'instagram' in t or 'tiktok' in t:
        return 'social'
    elif 'package' in t:
        return 'package'
    else:
        return 'other'


def detect_service(campaign):
    """Determine the service type for button rendering."""
    # Explicit service field takes priority
    service = campaign.get('service', '').strip().lower()
    if service in ('spotify', 'soundcloud', 'youtube', 'press', 'package'):
        return service
    # Fall back to type detection
    ctype = campaign.get('type', '').strip().lower()
    if 'spotify' in ctype:
        return 'spotify'
    elif 'soundcloud' in ctype or 'stream' in ctype:
        return 'soundcloud'
    elif 'youtube' in ctype:
        return 'youtube'
    elif 'press' in ctype or 'article' in ctype or 'blog' in ctype:
        return 'press'
    elif 'package' in ctype:
        return 'package'
    return 'soundcloud'  # safe default


def format_campaign_date(date_str):
    """Try to format a date string nicely."""
    try:
        dt = datetime.strptime(date_str, '%Y-%m-%d')
        return dt.strftime('%b %d, %Y')
    except (ValueError, TypeError):
        return date_str or ''


# ── Service-specific button sets ──
SUPPLIER_DROPDOWN = (
    '<div class="hb-supplier-wrap">'
    '<button class="hb-supplier-btn state-none" data-state="none">Not Contacted</button>'
    '<div class="hb-supplier-menu" style="display:none;">'
    '<div class="hb-supplier-opt" data-val="none">Not Contacted Yet</div>'
    '<div class="hb-supplier-opt" data-val="contacted">Contacted</div>'
    '</div></div>'
)

PRESS_PREVIEW_DROPDOWN = (
    '<div class="hb-press-preview-wrap">'
    '<button class="hb-action-btn hb-press-preview-btn">Preview Articles &#9660;</button>'
    '<div class="hb-press-preview-menu" style="display:none;">'
    '<div class="hb-press-preview-opt" data-count="1">Preview 1 Article</div>'
    '<div class="hb-press-preview-opt" data-count="2">Preview 2 Articles</div>'
    '<div class="hb-press-preview-opt" data-count="3">Preview 3 Articles</div>'
    '</div></div>'
)

SERVICE_BUTTONS = {
    'spotify': [
        SUPPLIER_DROPDOWN,
        '<button class="hb-action-btn">Latest Report</button>',
        '<button class="hb-action-btn">Last Report</button>',
        '<button class="hb-action-btn">Playlist Link</button>',
    ],
    'soundcloud': [
        SUPPLIER_DROPDOWN,
        '<button class="hb-action-btn">Latest Report</button>',
        '<button class="hb-action-btn">Last Report</button>',
        '<button class="hb-action-btn">Track Link</button>',
    ],
    'youtube': [
        SUPPLIER_DROPDOWN,
        '<button class="hb-action-btn">Latest Report</button>',
        '<button class="hb-action-btn">Last Report</button>',
        '<button class="hb-action-btn">Video Link</button>',
    ],
    'press': [
        SUPPLIER_DROPDOWN,
        '<button class="hb-action-btn hb-pressrelease-btn">Press Release</button>',
        PRESS_PREVIEW_DROPDOWN,
        '<button class="hb-action-btn">Coverage Report</button>',
    ],
    'package': [
        SUPPLIER_DROPDOWN,
        '<button class="hb-action-btn">Latest Report</button>',
        '<button class="hb-action-btn">Last Report</button>',
        '<button class="hb-action-btn">Deliverables</button>',
    ],
}


def build_action_buttons(service):
    """Generate the action buttons HTML for a campaign row."""
    buttons = SERVICE_BUTTONS.get(service, SERVICE_BUTTONS['soundcloud'])
    return '\n                        '.join(buttons)


def build_campaigns_html(campaigns):
    """Generate HTML rows for a list of campaign dicts."""
    if not campaigns:
        return '<div class="hb-campaigns-empty">No campaigns yet</div>'

    rows = []
    for c in campaigns:
        name = c.get('name', 'Untitled Campaign')
        ctype = c.get('type', 'Other')
        date = c.get('date', '')
        service = detect_service(c)
        badge_type = detect_badge_type(ctype)
        formatted_date = format_campaign_date(date)
        action_html = build_action_buttons(service)

        row = (
            f'<div class="hb-campaign-row" data-service="{service}">\n'
            f'                    <div class="hb-campaign-status"></div>\n'
            f'                    <span class="hb-campaign-name">{name}</span>\n'
            f'                    <div class="hb-campaign-actions">\n'
            f'                        {action_html}\n'
            f'                    </div>\n'
            f'                    <span class="hb-campaign-badge" data-type="{badge_type}">{ctype}</span>\n'
            f'                    <span class="hb-campaign-date">{formatted_date}</span>\n'
            f'                </div>'
        )
        rows.append(row)

    return '\n                '.join(rows)


def parse_campaigns_arg(arg):
    """Parse campaigns from a JSON string or a file path."""
    if not arg:
        return None

    # Try as JSON string first
    try:
        data = json.loads(arg)
        if isinstance(data, list):
            return data
    except (json.JSONDecodeError, TypeError):
        pass

    # Try as file path
    if os.path.isfile(arg):
        with open(arg, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data

    print(f'  [ERROR] Could not parse campaigns: {arg}')
    sys.exit(1)


def generate(client_name, campaigns=None, force=False):
    client_slug = sanitize_slug(client_name)
    client_dir = os.path.join(HOMEBASES_DIR, client_slug)

    # Check if already exists
    output_path = os.path.join(client_dir, 'index.html')
    if os.path.isfile(output_path) and not force:
        print(f'  [EXISTS] Home Base already exists for "{client_name}"')
        print(f'  Path: {output_path}')
        print(f'  Use --force to overwrite.')
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

    # Replace campaigns placeholder
    campaigns_html = build_campaigns_html(campaigns)
    html = html.replace('{{CAMPAIGNS_HTML}}', campaigns_html)

    # Write output
    os.makedirs(client_dir, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

    action = 'OVERWRITTEN' if force and os.path.isfile(output_path) else 'CREATED'
    print(f'  [{action}] Home Base for "{client_name}"')
    print(f'  Path: {output_path}')
    if campaigns:
        print(f'  Campaigns: {len(campaigns)} baked in')
    return output_path


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python homebase-gen.py "Client Name" [--campaigns JSON] [--force]')
        sys.exit(1)

    client_name = sys.argv[1].strip()
    if not client_name:
        print('Error: Client name cannot be empty')
        sys.exit(1)

    # Parse optional args
    force = '--force' in sys.argv
    campaigns = None

    if '--campaigns' in sys.argv:
        idx = sys.argv.index('--campaigns')
        if idx + 1 < len(sys.argv):
            campaigns = parse_campaigns_arg(sys.argv[idx + 1])

    path = generate(client_name, campaigns=campaigns, force=force)
    print(f'\n  Result: {path}')
