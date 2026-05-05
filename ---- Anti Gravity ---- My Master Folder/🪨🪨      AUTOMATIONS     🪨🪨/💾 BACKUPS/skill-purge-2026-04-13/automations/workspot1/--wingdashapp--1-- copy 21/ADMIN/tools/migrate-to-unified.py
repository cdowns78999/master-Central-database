#!/usr/bin/env python3
"""
migrate-to-unified.py — One-time migration script.
Copies existing files from ADMIN/{homebases,presentations,payment-cards}/{slug}/
into the new unified structure: ADMIN/clients/{slug}/{web-app,presentations,payments}/

Keeps old folders intact (safety). Creates client.json metadata in each client folder.

Usage:
    python migrate-to-unified.py          # dry run (preview only)
    python migrate-to-unified.py --go     # actually copy files
"""

import sys
import os
import shutil
import json
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ADMIN_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))

# Map old type folders to new unified subfolders
TYPE_MAP = {
    'homebases':     'web-app',
    'presentations': 'presentations',
    'payment-cards': 'payments',
}

DRY_RUN = '--go' not in sys.argv


def migrate():
    print()
    print('  +--------------------------------------------------+')
    print('    Unified Client Folder Migration')
    print(f'    ADMIN root: {ADMIN_ROOT}')
    print(f'    Mode: {"DRY RUN (add --go to execute)" if DRY_RUN else "LIVE — copying files"}')
    print('  +--------------------------------------------------+')
    print()

    # Collect all client slugs across all type folders
    all_slugs = set()
    for type_folder in TYPE_MAP:
        type_path = os.path.join(ADMIN_ROOT, type_folder)
        if not os.path.isdir(type_path):
            continue
        for entry in os.listdir(type_path):
            full = os.path.join(type_path, entry)
            if os.path.isdir(full):
                all_slugs.add(entry)

    if not all_slugs:
        print('  No client folders found. Nothing to migrate.')
        return

    print(f'  Found {len(all_slugs)} client(s): {", ".join(sorted(all_slugs))}')
    print()

    copied = 0
    skipped = 0

    for slug in sorted(all_slugs):
        client_dir = os.path.join(ADMIN_ROOT, 'clients', slug)
        print(f'  [{slug}]')

        # Create unified folder structure
        for sub in ['web-app', 'presentations', 'payments', 'proposals']:
            dest = os.path.join(client_dir, sub)
            if not DRY_RUN:
                os.makedirs(dest, exist_ok=True)

        # Copy files from each type folder
        for type_folder, unified_sub in TYPE_MAP.items():
            # Check both flat and subfolder patterns
            # homebases/{slug}/web-app/ → clients/{slug}/web-app/
            # presentations/{slug}/ → clients/{slug}/presentations/
            # payment-cards/{slug}/ → clients/{slug}/payments/
            src_base = os.path.join(ADMIN_ROOT, type_folder, slug)
            if not os.path.isdir(src_base):
                continue

            # Walk all files recursively under the source
            for root, dirs, files in os.walk(src_base):
                rel = os.path.relpath(root, src_base)
                # For homebases, files are in web-app/ subfolder
                # For others, files are directly in the slug folder
                if type_folder == 'homebases' and rel == '.':
                    # Skip the root of homebases — files are in web-app/ subfolder
                    continue

                if type_folder == 'homebases':
                    # rel will be "web-app" — map to unified web-app/
                    dest_dir = os.path.join(client_dir, rel)
                else:
                    if rel == '.':
                        dest_dir = os.path.join(client_dir, unified_sub)
                    else:
                        dest_dir = os.path.join(client_dir, unified_sub, rel)

                for f in files:
                    src_file = os.path.join(root, f)
                    dest_file = os.path.join(dest_dir, f)

                    if os.path.exists(dest_file):
                        print(f'    SKIP (exists): {os.path.relpath(dest_file, ADMIN_ROOT)}')
                        skipped += 1
                        continue

                    print(f'    COPY: {os.path.relpath(src_file, ADMIN_ROOT)} → {os.path.relpath(dest_file, ADMIN_ROOT)}')
                    if not DRY_RUN:
                        os.makedirs(dest_dir, exist_ok=True)
                        shutil.copy2(src_file, dest_file)
                    copied += 1

        # Write client.json if it doesn't exist
        meta_path = os.path.join(client_dir, 'client.json')
        if not os.path.exists(meta_path):
            meta = {
                'name': slug.replace('-', ' ').title(),
                'slug': slug,
                'id': '',
                'created': datetime.now().isoformat(),
                'updated': datetime.now().isoformat(),
                'migrated': True
            }
            print(f'    CREATE: clients/{slug}/client.json')
            if not DRY_RUN:
                with open(meta_path, 'w', encoding='utf-8') as mf:
                    mf.write(json.dumps(meta, indent=2))

        print()

    print(f'  Summary: {copied} file(s) copied, {skipped} skipped')
    if DRY_RUN:
        print('  (Dry run — no files were actually copied. Run with --go to execute.)')
    else:
        print('  Migration complete. Old folders left intact.')
    print()


if __name__ == '__main__':
    migrate()
