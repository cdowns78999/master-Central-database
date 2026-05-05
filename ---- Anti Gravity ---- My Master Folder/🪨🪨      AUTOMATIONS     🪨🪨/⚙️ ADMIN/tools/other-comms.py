"""
Other Comms — In-House Comms Scraper (Step 4 of COMMS SCRAPE)
Ahead Artist Solutions | Digital Coms Railroad

Catch-all scraper for remaining communication channels:
Messenger, Discord, and any other platforms. Normalizes
all exports into a unified comms format.

SETUP:
1. Export data from each platform:
   - Discord: Server Settings → Overview → download data (or bot export)
   - Messenger: Facebook → Settings → Download Your Info → Messages
   - Other: Manual export or API pull
2. Place export files in tools/imports/{platform}/
3. Run: python other-comms.py

UNIFIED FORMAT:
Every message across all platforms gets normalized to:
{
    "platform": "discord|messenger|other",
    "contact": "Name or ID",
    "date": "ISO timestamp",
    "text": "Message content",
    "channel": "Server/channel or thread name",
    "is_media": true/false,
    "source_file": "original filename"
}
"""

import os
import json
import csv
import re
from datetime import datetime
from pathlib import Path
from collections import defaultdict

# Config
SCRIPT_DIR = Path(__file__).parent
IMPORT_BASE = SCRIPT_DIR / 'imports'
OUTPUT_DIR = SCRIPT_DIR / 'exports' / 'unified'

# Supported platforms
PLATFORMS = ['discord', 'messenger', 'other']


def parse_discord_json(filepath):
    """Parse Discord data export (JSON format from data download)."""
    messages = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Discord data export has messages in channel folders
        if isinstance(data, list):
            for item in data:
                messages.append({
                    'platform': 'discord',
                    'contact': item.get('author', {}).get('name', item.get('author', 'Unknown')),
                    'date': item.get('timestamp', item.get('Timestamp', '')),
                    'date_display': '',
                    'text': item.get('content', item.get('Contents', '')),
                    'channel': item.get('channel', {}).get('name', filepath.parent.name),
                    'is_media': bool(item.get('attachments', [])),
                    'source_file': filepath.name,
                })
        elif isinstance(data, dict) and 'messages' in data:
            for item in data['messages']:
                messages.append({
                    'platform': 'discord',
                    'contact': item.get('author', {}).get('name', 'Unknown'),
                    'date': item.get('timestamp', ''),
                    'date_display': '',
                    'text': item.get('content', ''),
                    'channel': data.get('channel', {}).get('name', filepath.parent.name),
                    'is_media': bool(item.get('attachments', [])),
                    'source_file': filepath.name,
                })
    except (json.JSONDecodeError, KeyError) as e:
        print(f"  Warning: Could not parse {filepath.name}: {e}")

    return messages


def parse_discord_csv(filepath):
    """Parse Discord messages from CSV export (bot-generated)."""
    messages = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                messages.append({
                    'platform': 'discord',
                    'contact': row.get('Author', row.get('author', 'Unknown')),
                    'date': row.get('Date', row.get('date', row.get('Timestamp', ''))),
                    'date_display': '',
                    'text': row.get('Content', row.get('content', '')),
                    'channel': row.get('Channel', row.get('channel', '')),
                    'is_media': bool(row.get('Attachments', row.get('attachments', ''))),
                    'source_file': filepath.name,
                })
    except Exception as e:
        print(f"  Warning: Could not parse {filepath.name}: {e}")

    return messages


def parse_messenger_json(filepath):
    """Parse Facebook Messenger data export (JSON format)."""
    messages = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        msg_list = data.get('messages', [])
        thread_name = data.get('title', filepath.parent.name)

        for item in msg_list:
            # Messenger encodes text in latin-1 sometimes
            text = item.get('content', '')
            if isinstance(text, str):
                try:
                    text = text.encode('latin-1').decode('utf-8')
                except (UnicodeDecodeError, UnicodeEncodeError):
                    pass

            ts = item.get('timestamp_ms', 0)
            dt = datetime.fromtimestamp(ts / 1000) if ts else None

            messages.append({
                'platform': 'messenger',
                'contact': item.get('sender_name', 'Unknown'),
                'date': dt.isoformat() if dt else '',
                'date_display': dt.strftime('%Y-%m-%d %H:%M') if dt else '',
                'text': text,
                'channel': thread_name,
                'is_media': bool(item.get('photos') or item.get('videos') or item.get('audio_files') or item.get('files')),
                'source_file': filepath.name,
            })
    except (json.JSONDecodeError, KeyError) as e:
        print(f"  Warning: Could not parse {filepath.name}: {e}")

    return messages


def parse_generic_csv(filepath, platform='other'):
    """Parse a generic CSV file with standard columns."""
    messages = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            reader = csv.DictReader(f)
            for row in reader:
                messages.append({
                    'platform': platform,
                    'contact': row.get('Contact', row.get('contact', row.get('From', row.get('Author', 'Unknown')))),
                    'date': row.get('Date', row.get('date', row.get('Timestamp', ''))),
                    'date_display': row.get('Date', row.get('date', '')),
                    'text': row.get('Text', row.get('text', row.get('Content', row.get('Message', '')))),
                    'channel': row.get('Channel', row.get('channel', row.get('Thread', ''))),
                    'is_media': row.get('Media', row.get('is_media', 'No')).lower() in ('yes', 'true', '1'),
                    'source_file': filepath.name,
                })
    except Exception as e:
        print(f"  Warning: Could not parse {filepath.name}: {e}")

    return messages


def parse_generic_txt(filepath, platform='other'):
    """Parse a generic text file — simple line-by-line with timestamps."""
    messages = []
    pattern = re.compile(r'(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?)\s*[-|]\s*(.+?):\s*(.+)')

    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            match = pattern.match(line.strip())
            if match:
                date_str, contact, text = match.groups()
                messages.append({
                    'platform': platform,
                    'contact': contact.strip(),
                    'date': date_str,
                    'date_display': date_str,
                    'text': text.strip(),
                    'channel': '',
                    'is_media': False,
                    'source_file': filepath.name,
                })

    return messages


def process_platform(platform):
    """Process all files for a given platform."""
    import_dir = IMPORT_BASE / platform
    if not import_dir.exists():
        return []

    messages = []

    # JSON files
    for f in import_dir.rglob('*.json'):
        print(f"  Parsing {platform}/{f.name}...")
        if platform == 'discord':
            messages.extend(parse_discord_json(f))
        elif platform == 'messenger':
            messages.extend(parse_messenger_json(f))
        else:
            # Try messenger format first, fall back to discord format
            msgs = parse_messenger_json(f)
            if not msgs:
                msgs = parse_discord_json(f)
            messages.extend(msgs)

    # CSV files
    for f in import_dir.rglob('*.csv'):
        print(f"  Parsing {platform}/{f.name}...")
        if platform == 'discord':
            messages.extend(parse_discord_csv(f))
        else:
            messages.extend(parse_generic_csv(f, platform))

    # TXT files
    for f in import_dir.rglob('*.txt'):
        print(f"  Parsing {platform}/{f.name}...")
        messages.extend(parse_generic_txt(f, platform))

    return messages


def normalize_dates(messages):
    """Ensure all messages have consistent date_display."""
    for msg in messages:
        if msg['date'] and not msg['date_display']:
            try:
                dt = datetime.fromisoformat(msg['date'].replace('Z', '+00:00'))
                msg['date_display'] = dt.strftime('%Y-%m-%d %H:%M')
            except (ValueError, TypeError):
                msg['date_display'] = msg['date'][:16]
    return messages


def build_unified_index(messages):
    """Build a unified index across all platforms."""
    by_contact = defaultdict(lambda: {
        'contact': '',
        'platforms': set(),
        'message_count': 0,
        'first_date': '',
        'last_date': '',
    })

    for msg in messages:
        contact = msg['contact']
        entry = by_contact[contact]
        entry['contact'] = contact
        entry['platforms'].add(msg['platform'])
        entry['message_count'] += 1

        if msg['date']:
            if not entry['first_date'] or msg['date'] < entry['first_date']:
                entry['first_date'] = msg['date']
            if not entry['last_date'] or msg['date'] > entry['last_date']:
                entry['last_date'] = msg['date']

    # Convert sets to lists for JSON
    for entry in by_contact.values():
        entry['platforms'] = list(entry['platforms'])

    return dict(by_contact)


def export_json(data, filename):
    """Export data to JSON."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False, default=str)
    print(f"Exported: {filepath}")


def export_csv(messages, filename):
    """Export unified message list to CSV."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Platform', 'Date', 'Contact', 'Channel', 'Text', 'Is Media', 'Source'])
        for m in messages:
            writer.writerow([
                m['platform'],
                m['date_display'],
                m['contact'],
                m['channel'],
                m['text'][:300],
                'Yes' if m['is_media'] else 'No',
                m['source_file'],
            ])
    print(f"Exported: {filepath}")


def main():
    print("=" * 50)
    print("  Other Comms — Ahead Artist Solutions")
    print("  Digital Coms Railroad / Step S1-3")
    print("  Unified Comms Scraper")
    print("=" * 50)

    # Create import directories
    for platform in PLATFORMS:
        (IMPORT_BASE / platform).mkdir(parents=True, exist_ok=True)

    # Process each platform
    all_messages = []
    platform_counts = {}

    for platform in PLATFORMS:
        print(f"\nProcessing: {platform}")
        messages = process_platform(platform)
        platform_counts[platform] = len(messages)
        all_messages.extend(messages)
        if messages:
            print(f"  → {len(messages)} messages")
        else:
            print(f"  → No files found in imports/{platform}/")

    # Normalize dates
    all_messages = normalize_dates(all_messages)

    # Sort by date
    all_messages.sort(key=lambda m: m.get('date', '') or '')

    if not all_messages:
        print(f"\nNo messages found. Place export files in:")
        for platform in PLATFORMS:
            print(f"  {IMPORT_BASE / platform}/")
        print("\nSupported formats: .json, .csv, .txt")
        print("Structure created — ready for imports.")
        return

    # Build unified index
    unified_index = build_unified_index(all_messages)

    # Export
    timestamp = datetime.now().strftime('%Y-%m-%d--%H-%M')

    export_json(all_messages, f'unified-messages--{timestamp}.json')
    export_json(list(unified_index.values()), f'unified-contacts--{timestamp}.json')
    export_csv(all_messages, f'unified-messages--{timestamp}.csv')

    # Summary
    export_json({
        'total_messages': len(all_messages),
        'total_contacts': len(unified_index),
        'platforms': platform_counts,
        'top_contacts': sorted(
            [{'contact': k, 'count': v['message_count'], 'platforms': v['platforms']}
             for k, v in unified_index.items()],
            key=lambda x: x['count'], reverse=True
        )[:20],
        'exported_at': timestamp,
    }, f'unified-summary--{timestamp}.json')

    print(f"\n{'=' * 50}")
    print(f"  UNIFIED COMMS EXPORT COMPLETE")
    print(f"  Total messages: {len(all_messages)}")
    print(f"  Contacts: {len(unified_index)}")
    for p, c in platform_counts.items():
        print(f"    {p}: {c}")
    print(f"  Exports in: {OUTPUT_DIR}")
    print(f"{'=' * 50}")


if __name__ == '__main__':
    main()
