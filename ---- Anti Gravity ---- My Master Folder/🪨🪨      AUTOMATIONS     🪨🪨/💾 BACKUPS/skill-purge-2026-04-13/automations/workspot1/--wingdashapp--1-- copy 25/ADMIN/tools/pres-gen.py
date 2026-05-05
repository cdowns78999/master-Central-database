#!/usr/bin/env python3
"""
pres-gen.py — Generate a presentation page for a client.
Calls Claude API for tile content, reads the template from
ADMIN/templates/presentation-template.html, injects content,
saves to ADMIN/presentations/{client_slug}/P{N}.html.

Usage:
    python pres-gen.py "Client Name" --tiles 4 --focus "Campaign overview"
    python pres-gen.py "Client Name" --tiles 6 --focus "Q1 results" --media "https://youtube.com/watch?v=xxx,https://dropbox.com/img.png"

Environment:
    ANTHROPIC_API_KEY — required for Claude API call
"""

import sys
import os
import re
import json
import argparse
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
TEMPLATE_PATH = os.path.join(ADMIN_ROOT, 'templates', 'presentation-template.html')
PRESENTATIONS_DIR = os.path.join(ADMIN_ROOT, 'presentations')


def sanitize_slug(name):
    """Lowercase, replace spaces with hyphens, strip non-alphanumeric chars."""
    name = name.strip().lower()
    name = re.sub(r'\s+', '-', name)
    name = re.sub(r'[^a-z0-9\-]', '', name)
    return name or 'unknown'


def get_next_slot(client_dir):
    """Find the next available P{N} slot (P1-P8)."""
    existing = []
    if os.path.isdir(client_dir):
        for f in os.listdir(client_dir):
            m = re.match(r'^P(\d+)\.html$', f)
            if m:
                existing.append(int(m.group(1)))
    for n in range(1, 9):
        if n not in existing:
            return n
    return None  # All 8 slots full


def call_claude_api(client_name, tile_count, focus_text):
    """Call Claude API to generate presentation tile content."""
    try:
        import urllib.request
        import urllib.error
    except ImportError:
        print('  [ERROR] urllib not available')
        sys.exit(1)

    api_key = os.environ.get('ANTHROPIC_API_KEY', '')
    if not api_key:
        # Try reading from localStorage proxy or config
        config_path = os.path.join(ADMIN_ROOT, 'tools', 'api-key.txt')
        if os.path.isfile(config_path):
            with open(config_path, 'r') as f:
                api_key = f.read().strip()

    if not api_key:
        print('  [ERROR] ANTHROPIC_API_KEY not set. Set it as environment variable or in ADMIN/tools/api-key.txt')
        sys.exit(1)

    focus = f' Focus on: {focus_text}.' if focus_text else ' Cover the campaign overview — goals, strategy, and key results.'

    prompt = (
        f'Generate a professional presentation card in HTML for an artist services company called "Ahead Artist Solutions". '
        f'The presentation is for a client named "{client_name}".{focus} '
        f'Structure: Start with a small uppercase label in #727272 showing "AHEAD ARTIST SOLUTIONS", '
        f'then an h1 with the client name in #ffffff font-weight 700, '
        f'then a thin 60px divider line with background #1DB954 and height 2px, '
        f'then a short overview paragraph in #b3b3b3, '
        f'then {tile_count} key points as styled cards — each card gets background rgba(255,255,255,0.03), '
        f'border 1px solid rgba(255,255,255,0.1), border-radius 12px, padding 1rem 1.25rem. '
        f'Each card has a small green dot (color #1DB954) before the title, title in #ffffff font-weight 600, description in #b3b3b3. '
        f'All styles must be inline. Return ONLY the inner HTML (no doctype, no head, no body tags).'
    )

    payload = json.dumps({
        'model': 'claude-sonnet-4-20250514',
        'max_tokens': 2500,
        'messages': [{'role': 'user', 'content': prompt}]
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01'
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read())
            if 'content' in result and len(result['content']) > 0:
                return result['content'][0].get('text', '')
            return ''
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f'  [API ERROR] {e.code}: {body}')
        sys.exit(1)


def build_media_html(media_urls):
    """Build media grid HTML from a list of URLs."""
    if not media_urls:
        return ''

    items = []
    for url in media_urls:
        url = url.strip()
        if not url:
            continue
        # YouTube embed
        yt_match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]+)', url)
        if yt_match:
            vid_id = yt_match.group(1)
            items.append(f'<div class="media-item"><iframe src="https://www.youtube.com/embed/{vid_id}" allowfullscreen></iframe></div>')
        # Image extensions
        elif re.search(r'\.(png|jpg|jpeg|gif|webp|svg)(\?|$)', url, re.I):
            items.append(f'<div class="media-item"><img src="{url}" alt="Media"></div>')
        # Generic iframe (Dropbox, etc.)
        else:
            items.append(f'<div class="media-item"><iframe src="{url}" allowfullscreen></iframe></div>')

    if not items:
        return ''

    return '<div class="media-grid">' + ''.join(items) + '</div>'


def generate(client_name, tile_count=4, focus_text='', media_urls=None):
    client_slug = sanitize_slug(client_name)
    client_dir = os.path.join(PRESENTATIONS_DIR, client_slug)

    # Find next slot
    slot = get_next_slot(client_dir)
    if slot is None:
        print(f'  [FULL] All 8 presentation slots are full for "{client_name}"')
        return None

    # Read template
    if not os.path.isfile(TEMPLATE_PATH):
        print(f'  [ERROR] Template not found: {TEMPLATE_PATH}')
        sys.exit(1)

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    # Generate content via Claude API
    print(f'  [API] Generating presentation content for "{client_name}" ({tile_count} tiles)...')
    content = call_claude_api(client_name, tile_count, focus_text)

    if not content:
        print('  [ERROR] No content returned from API')
        sys.exit(1)

    # Clean up content (strip markdown fences if present)
    content = re.sub(r'^```html?\s*', '', content, flags=re.MULTILINE)
    content = re.sub(r'\s*```\s*$', '', content, flags=re.MULTILINE)

    # Build media HTML
    media_html = build_media_html(media_urls) if media_urls else ''

    # Replace tokens
    timestamp = datetime.now().strftime('%B %d, %Y %I:%M %p')
    html = template.replace('{{CLIENT_NAME}}', client_name)
    html = html.replace('{{TIMESTAMP}}', timestamp)
    html = html.replace('{{SLOT_NUMBER}}', f'P{slot}')
    html = html.replace('{{CONTENT}}', content)
    html = html.replace('{{MEDIA}}', media_html)

    # Write output
    os.makedirs(client_dir, exist_ok=True)
    filename = f'P{slot}.html'
    output_path = os.path.join(client_dir, filename)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'  [CREATED] Presentation P{slot} for "{client_name}"')
    print(f'  Path: {output_path}')
    return output_path


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate a client presentation')
    parser.add_argument('client', help='Client name')
    parser.add_argument('--tiles', type=int, default=4, help='Number of tiles (default: 4)')
    parser.add_argument('--focus', default='', help='Focus topic for the presentation')
    parser.add_argument('--media', default='', help='Comma-separated media URLs')

    args = parser.parse_args()

    media_urls = [u.strip() for u in args.media.split(',') if u.strip()] if args.media else None

    path = generate(args.client, args.tiles, args.focus, media_urls)
    if path:
        print(f'\n  Result: {path}')
