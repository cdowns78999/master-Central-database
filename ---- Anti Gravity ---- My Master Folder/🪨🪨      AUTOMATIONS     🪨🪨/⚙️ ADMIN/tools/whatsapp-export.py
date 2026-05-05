"""
WhatsApp Export — In-House Comms Scraper (Step 3 of COMMS SCRAPE)
Ahead Artist Solutions | Digital Coms Railroad

Parses WhatsApp chat export files (.txt or .zip) and organizes
messages by contact, date, and media attachments.

SETUP:
1. Open WhatsApp → Settings → Chats → Export Chat
2. Choose "Without Media" or "Include Media"
3. Save the .txt (or .zip) file to tools/imports/whatsapp/
4. Run: python whatsapp-export.py

Supports multiple export files — processes all .txt and .zip files
in the imports folder.
"""

import os
import re
import json
import csv
import zipfile
from datetime import datetime
from pathlib import Path
from collections import defaultdict

# Config
SCRIPT_DIR = Path(__file__).parent
IMPORT_DIR = SCRIPT_DIR / 'imports' / 'whatsapp'
OUTPUT_DIR = SCRIPT_DIR / 'exports' / 'whatsapp'

# WhatsApp export line patterns (handles multiple date formats)
# Format 1: [MM/DD/YY, HH:MM:SS] Contact: Message
# Format 2: MM/DD/YY, HH:MM - Contact: Message
# Format 3: DD/MM/YYYY, HH:MM - Contact: Message
PATTERNS = [
    re.compile(r'\[(\d{1,2}/\d{1,2}/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]\s+(.+?):\s+(.+)'),
    re.compile(r'(\d{1,2}/\d{1,2}/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\s*[-–]\s+(.+?):\s+(.+)'),
]

# System message patterns to skip
SYSTEM_PATTERNS = [
    'Messages and calls are end-to-end encrypted',
    'created group',
    'added you',
    'changed the subject',
    'changed this group',
    'left',
    'removed',
    'changed the group',
    'Your security code',
]


def parse_date(date_str, time_str):
    """Parse date and time strings into a datetime object."""
    combined = f"{date_str} {time_str}".strip()
    formats = [
        '%m/%d/%y %I:%M %p',
        '%m/%d/%y %H:%M',
        '%m/%d/%y %I:%M:%S %p',
        '%m/%d/%y %H:%M:%S',
        '%d/%m/%Y %I:%M %p',
        '%d/%m/%Y %H:%M',
        '%m/%d/%Y %I:%M %p',
        '%m/%d/%Y %H:%M',
        '%d/%m/%y %H:%M',
        '%d/%m/%y %I:%M %p',
    ]
    for fmt in formats:
        try:
            return datetime.strptime(combined, fmt)
        except ValueError:
            continue
    return None


def is_system_message(text):
    """Check if a message is a WhatsApp system message."""
    return any(pattern.lower() in text.lower() for pattern in SYSTEM_PATTERNS)


def is_media_message(text):
    """Check if a message is a media attachment."""
    media_markers = ['<Media omitted>', 'image omitted', 'video omitted',
                     'audio omitted', 'sticker omitted', 'document omitted',
                     '.jpg', '.png', '.mp4', '.opus', '.pdf']
    return any(marker.lower() in text.lower() for marker in media_markers)


def parse_export_file(filepath):
    """Parse a single WhatsApp export .txt file."""
    messages = []
    current_message = None

    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.rstrip('\n')
            if not line.strip():
                continue

            matched = False
            for pattern in PATTERNS:
                match = pattern.match(line)
                if match:
                    # Save previous multi-line message
                    if current_message:
                        messages.append(current_message)

                    date_str, time_str, contact, text = match.groups()
                    dt = parse_date(date_str, time_str)

                    if is_system_message(text):
                        current_message = None
                        matched = True
                        break

                    current_message = {
                        'date': dt.isoformat() if dt else f"{date_str} {time_str}",
                        'date_display': dt.strftime('%Y-%m-%d %H:%M') if dt else f"{date_str} {time_str}",
                        'contact': contact.strip(),
                        'text': text.strip(),
                        'is_media': is_media_message(text),
                        'source_file': filepath.name,
                    }
                    matched = True
                    break

            if not matched and current_message:
                # Continuation of previous message (multi-line)
                current_message['text'] += '\n' + line

        # Don't forget the last message
        if current_message:
            messages.append(current_message)

    return messages


def extract_from_zip(zip_path):
    """Extract .txt files from a WhatsApp export .zip."""
    extracted = []
    with zipfile.ZipFile(zip_path, 'r') as zf:
        for name in zf.namelist():
            if name.endswith('.txt'):
                extract_path = IMPORT_DIR / f"_extracted_{zip_path.stem}_{name}"
                with open(extract_path, 'wb') as f:
                    f.write(zf.read(name))
                extracted.append(extract_path)
    return extracted


def organize_by_contact(messages):
    """Group messages by contact."""
    by_contact = defaultdict(lambda: {
        'contact': '',
        'message_count': 0,
        'media_count': 0,
        'first_date': '',
        'last_date': '',
        'messages': [],
    })

    for msg in messages:
        contact = msg['contact']
        entry = by_contact[contact]
        entry['contact'] = contact
        entry['message_count'] += 1
        if msg['is_media']:
            entry['media_count'] += 1

        if not entry['first_date'] or msg['date'] < entry['first_date']:
            entry['first_date'] = msg['date']
        if not entry['last_date'] or msg['date'] > entry['last_date']:
            entry['last_date'] = msg['date']

        entry['messages'].append({
            'date': msg['date_display'],
            'text': msg['text'][:500],
            'is_media': msg['is_media'],
        })

    return dict(by_contact)


def organize_by_date(messages):
    """Group messages by date (day)."""
    by_date = defaultdict(list)
    for msg in messages:
        day = msg['date_display'][:10] if msg['date_display'] else 'unknown'
        by_date[day].append({
            'contact': msg['contact'],
            'text': msg['text'][:300],
            'is_media': msg['is_media'],
        })
    return dict(by_date)


def export_json(data, filename):
    """Export data to JSON."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False, default=str)
    print(f"Exported: {filepath}")
    return filepath


def export_csv(messages, filename):
    """Export flat message list to CSV."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filepath = OUTPUT_DIR / filename
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Date', 'Contact', 'Text', 'Is Media', 'Source File'])
        for m in messages:
            writer.writerow([
                m['date_display'],
                m['contact'],
                m['text'][:300],
                'Yes' if m['is_media'] else 'No',
                m['source_file'],
            ])
    print(f"Exported: {filepath}")
    return filepath


def main():
    print("=" * 50)
    print("  WhatsApp Export — Ahead Artist Solutions")
    print("  Digital Coms Railroad / Step S1-2")
    print("=" * 50)

    # Ensure import directory exists
    IMPORT_DIR.mkdir(parents=True, exist_ok=True)

    # Find export files
    txt_files = list(IMPORT_DIR.glob('*.txt'))
    zip_files = list(IMPORT_DIR.glob('*.zip'))

    # Extract zips
    for zf in zip_files:
        print(f"Extracting: {zf.name}")
        extracted = extract_from_zip(zf)
        txt_files.extend(extracted)

    # Filter out extracted temp files that are empty
    txt_files = [f for f in txt_files if f.exists() and f.stat().st_size > 0]

    if not txt_files:
        print(f"\nNo WhatsApp export files found in: {IMPORT_DIR}")
        print("To add exports:")
        print("  1. Open WhatsApp → chat → Export Chat")
        print("  2. Save .txt or .zip files to:")
        print(f"     {IMPORT_DIR}")
        print("  3. Run this script again")
        return

    print(f"\nFound {len(txt_files)} export file(s).")

    # Parse all files
    all_messages = []
    for txt_file in txt_files:
        if txt_file.name.startswith('_extracted_'):
            print(f"Parsing (from zip): {txt_file.name}")
        else:
            print(f"Parsing: {txt_file.name}")
        messages = parse_export_file(txt_file)
        all_messages.extend(messages)
        print(f"  → {len(messages)} messages")

    if not all_messages:
        print("No messages parsed. Check file format.")
        return

    # Sort by date
    all_messages.sort(key=lambda m: m['date'] or '')

    print(f"\nTotal messages: {len(all_messages)}")

    # Organize
    by_contact = organize_by_contact(all_messages)
    by_date = organize_by_date(all_messages)
    media_count = sum(1 for m in all_messages if m['is_media'])

    print(f"Contacts: {len(by_contact)}")
    print(f"Days with messages: {len(by_date)}")
    print(f"Media attachments: {media_count}")

    # Export
    timestamp = datetime.now().strftime('%Y-%m-%d--%H-%M')

    export_json(list(by_contact.values()), f'whatsapp-by-contact--{timestamp}.json')
    export_json(by_date, f'whatsapp-by-date--{timestamp}.json')
    export_csv(all_messages, f'whatsapp-messages--{timestamp}.csv')

    # Summary
    export_json({
        'total_messages': len(all_messages),
        'total_contacts': len(by_contact),
        'total_days': len(by_date),
        'media_attachments': media_count,
        'source_files': [f.name for f in txt_files],
        'top_contacts': sorted(
            [{'contact': k, 'count': v['message_count'], 'media': v['media_count']}
             for k, v in by_contact.items()],
            key=lambda x: x['count'], reverse=True
        )[:20],
        'exported_at': timestamp,
    }, f'whatsapp-summary--{timestamp}.json')

    # Cleanup extracted temp files
    for f in txt_files:
        if f.name.startswith('_extracted_'):
            f.unlink()

    print(f"\n{'=' * 50}")
    print(f"  WHATSAPP EXPORT COMPLETE")
    print(f"  Messages: {len(all_messages)}")
    print(f"  Contacts: {len(by_contact)}")
    print(f"  Media: {media_count}")
    print(f"  Exports in: {OUTPUT_DIR}")
    print(f"{'=' * 50}")


if __name__ == '__main__':
    main()
