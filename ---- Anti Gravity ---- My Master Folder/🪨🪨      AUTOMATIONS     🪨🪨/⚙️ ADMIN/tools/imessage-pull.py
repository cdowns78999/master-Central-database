"""
iMessage Pull — In-House Comms Scraper (Step 2 of COMMS SCRAPE)
Ahead Artist Solutions | Digital Coms Railroad

Accesses the local iMessage database (chat.db on macOS),
extracts conversation history, and parses by contact + thread.

REQUIREMENTS:
- macOS only (iMessage stores data in ~/Library/Messages/chat.db)
- Full Disk Access permission for Terminal/Python
- pip install (no external deps — uses sqlite3 built-in)

SETUP:
1. System Preferences → Privacy & Security → Full Disk Access
2. Add Terminal.app (or your Python IDE)
3. Run: python imessage-pull.py

NOTE: This reads your LOCAL iMessage database. No API needed.
"""

import os
import sqlite3
import json
import csv
from datetime import datetime, timedelta
from pathlib import Path

# Config
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / 'exports' / 'imessage'
CHAT_DB = Path.home() / 'Library' / 'Messages' / 'chat.db'

# iMessage stores dates as "Apple Cocoa Core Data timestamp"
# Seconds since 2001-01-01 00:00:00, sometimes in nanoseconds
APPLE_EPOCH = datetime(2001, 1, 1)


def apple_timestamp_to_datetime(ts):
    """Convert Apple timestamp to Python datetime."""
    if ts is None or ts == 0:
        return None
    # Nanoseconds (post-High Sierra) vs seconds
    if ts > 1e15:
        ts = ts / 1e9
    try:
        return APPLE_EPOCH + timedelta(seconds=ts)
    except (OverflowError, ValueError):
        return None


def connect_db():
    """Connect to the iMessage database."""
    if not CHAT_DB.exists():
        print(f"ERROR: iMessage database not found at {CHAT_DB}")
        print("This tool only works on macOS with iMessage enabled.")
        print("Make sure Full Disk Access is granted to your terminal.")
        exit(1)

    # Connect read-only
    conn = sqlite3.connect(f'file:{CHAT_DB}?mode=ro', uri=True)
    conn.row_factory = sqlite3.Row
    return conn


def get_contacts(conn):
    """Get all contacts/handles from the database."""
    cursor = conn.execute("""
        SELECT ROWID, id, service
        FROM handle
        ORDER BY id
    """)
    contacts = {}
    for row in cursor:
        contacts[row['ROWID']] = {
            'id': row['id'],  # phone number or email
            'service': row['service'],  # iMessage or SMS
        }
    return contacts


def get_chats(conn):
    """Get all chat threads."""
    cursor = conn.execute("""
        SELECT
            c.ROWID,
            c.chat_identifier,
            c.display_name,
            c.service_name,
            c.group_id
        FROM chat c
        ORDER BY c.ROWID
    """)
    chats = []
    for row in cursor:
        chats.append({
            'chat_id': row['ROWID'],
            'identifier': row['chat_identifier'],
            'display_name': row['display_name'] or '',
            'service': row['service_name'] or '',
            'group_id': row['group_id'] or '',
        })
    return chats


def get_messages(conn, limit=5000):
    """Pull messages with contact and chat info."""
    cursor = conn.execute("""
        SELECT
            m.ROWID,
            m.text,
            m.date,
            m.is_from_me,
            m.handle_id,
            m.service,
            h.id as contact_id,
            cmj.chat_id
        FROM message m
        LEFT JOIN handle h ON m.handle_id = h.ROWID
        LEFT JOIN chat_message_join cmj ON m.ROWID = cmj.message_id
        ORDER BY m.date DESC
        LIMIT ?
    """, (limit,))

    messages = []
    for row in cursor:
        dt = apple_timestamp_to_datetime(row['date'])
        messages.append({
            'message_id': row['ROWID'],
            'text': row['text'] or '',
            'date': dt.isoformat() if dt else '',
            'date_display': dt.strftime('%Y-%m-%d %H:%M') if dt else '',
            'is_from_me': bool(row['is_from_me']),
            'contact': row['contact_id'] or 'Unknown',
            'service': row['service'] or '',
            'chat_id': row['chat_id'],
        })

    return messages


def organize_by_contact(messages):
    """Group messages by contact."""
    by_contact = {}
    for msg in messages:
        contact = msg['contact']
        if contact not in by_contact:
            by_contact[contact] = {
                'contact': contact,
                'message_count': 0,
                'sent': 0,
                'received': 0,
                'first_date': msg['date'],
                'last_date': msg['date'],
                'messages': [],
            }

        entry = by_contact[contact]
        entry['message_count'] += 1
        if msg['is_from_me']:
            entry['sent'] += 1
        else:
            entry['received'] += 1

        # Track date range
        if msg['date'] and (not entry['first_date'] or msg['date'] < entry['first_date']):
            entry['first_date'] = msg['date']
        if msg['date'] and (not entry['last_date'] or msg['date'] > entry['last_date']):
            entry['last_date'] = msg['date']

        # Store message (text truncated for overview)
        entry['messages'].append({
            'date': msg['date_display'],
            'from_me': msg['is_from_me'],
            'text': msg['text'][:500] if msg['text'] else '',
        })

    return by_contact


def organize_by_thread(messages, chats):
    """Group messages by chat thread."""
    chat_map = {c['chat_id']: c for c in chats}
    by_thread = {}

    for msg in messages:
        chat_id = msg['chat_id']
        if chat_id not in by_thread:
            chat_info = chat_map.get(chat_id, {})
            by_thread[chat_id] = {
                'chat_id': chat_id,
                'identifier': chat_info.get('identifier', 'Unknown'),
                'display_name': chat_info.get('display_name', ''),
                'message_count': 0,
                'messages': [],
            }

        entry = by_thread[chat_id]
        entry['message_count'] += 1
        entry['messages'].append({
            'date': msg['date_display'],
            'contact': msg['contact'],
            'from_me': msg['is_from_me'],
            'text': msg['text'][:500] if msg['text'] else '',
        })

    return by_thread


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
        writer.writerow(['Date', 'Contact', 'From Me', 'Service', 'Text'])
        for m in messages:
            writer.writerow([
                m['date_display'],
                m['contact'],
                'Yes' if m['is_from_me'] else 'No',
                m['service'],
                m['text'][:300],
            ])
    print(f"Exported: {filepath}")
    return filepath


def main():
    print("=" * 50)
    print("  iMessage Pull — Ahead Artist Solutions")
    print("  Digital Coms Railroad / Step S1-1")
    print("=" * 50)

    # Connect
    print("\nConnecting to iMessage database...")
    conn = connect_db()
    print("Connected.")

    # Get contacts
    contacts = get_contacts(conn)
    print(f"Found {len(contacts)} contacts/handles.")

    # Get chats
    chats = get_chats(conn)
    print(f"Found {len(chats)} chat threads.")

    # Get messages
    print("\nPulling messages (last 5000)...")
    messages = get_messages(conn, limit=5000)
    print(f"Pulled {len(messages)} messages.")

    if not messages:
        print("No messages found.")
        conn.close()
        return

    # Organize
    by_contact = organize_by_contact(messages)
    by_thread = organize_by_thread(messages, chats)
    print(f"Organized: {len(by_contact)} contacts, {len(by_thread)} threads.")

    # Export
    timestamp = datetime.now().strftime('%Y-%m-%d--%H-%M')

    export_json(list(by_contact.values()), f'imessage-by-contact--{timestamp}.json')
    export_json(list(by_thread.values()), f'imessage-by-thread--{timestamp}.json')
    export_csv(messages, f'imessage-messages--{timestamp}.csv')

    # Contact summary
    export_json({
        'total_messages': len(messages),
        'total_contacts': len(by_contact),
        'total_threads': len(by_thread),
        'top_contacts': sorted(
            [{'contact': k, 'count': v['message_count'], 'sent': v['sent'], 'received': v['received']}
             for k, v in by_contact.items()],
            key=lambda x: x['count'], reverse=True
        )[:20],
        'exported_at': timestamp,
    }, f'imessage-summary--{timestamp}.json')

    conn.close()

    # Summary
    print(f"\n{'=' * 50}")
    print(f"  iMESSAGE PULL COMPLETE")
    print(f"  Messages: {len(messages)}")
    print(f"  Contacts: {len(by_contact)}")
    print(f"  Threads: {len(by_thread)}")
    print(f"  Exports in: {OUTPUT_DIR}")
    print(f"{'=' * 50}")


if __name__ == '__main__':
    main()
