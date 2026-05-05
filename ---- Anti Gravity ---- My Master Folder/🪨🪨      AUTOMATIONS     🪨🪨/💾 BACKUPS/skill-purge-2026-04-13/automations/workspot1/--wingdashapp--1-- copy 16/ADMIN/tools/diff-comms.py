"""
diff-comms.py — Daily Comms Diff
Wing Dashboard | Ahead Artist Solutions | Digital Coms Railroad

Compares the latest comms snapshot against the previous day's snapshot to find
what changed. Outputs a structured change feed for the Wing Dashboard.

INPUT:
  exports/snapshots/snapshot-latest.json         (today's snapshot)
  exports/snapshots/snapshot-{YYYY-MM-DD}.json   (yesterday, or second-most-recent)

OUTPUT:
  data/feeds/comms-changes.json  (relative to dashboard root --wingdashapp--1--)

Run AFTER snapshot-comms.py each day.
"""

import sys
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

# Fix Windows console encoding for emoji paths and output
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR    = Path(__file__).parent
SNAPSHOTS_DIR = SCRIPT_DIR / 'exports' / 'snapshots'

# Dashboard root is 3 levels up: ADMIN/tools/ → ADMIN/ → --wingdashapp--1--/
DASHBOARD_ROOT  = SCRIPT_DIR.parent.parent
FEEDS_DIR       = DASHBOARD_ROOT / 'data' / 'feeds'
OUTPUT_FILE     = FEEDS_DIR / 'comms-changes.json'


# ── Snapshot loading ──────────────────────────────────────────────────────────
def load_json(path):
    """Load a JSON file and return parsed content."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def find_previous_snapshot(latest_date_str):
    """
    Find the snapshot to diff against:
    1. Try yesterday: snapshot-{today - 1 day}.json
    2. Fall back to second-most-recent .json in snapshots dir
    3. If none found, return None (everything will be treated as "new")
    """
    # Try yesterday first
    try:
        latest_dt  = datetime.strptime(latest_date_str, '%Y-%m-%d')
        yesterday  = (latest_dt - timedelta(days=1)).strftime('%Y-%m-%d')
        yesterday_path = SNAPSHOTS_DIR / f'snapshot-{yesterday}.json'
        if yesterday_path.exists():
            print(f"  Using previous snapshot: snapshot-{yesterday}.json")
            return load_json(yesterday_path)
    except (ValueError, Exception) as e:
        print(f"  Warning: could not parse date '{latest_date_str}': {e}")

    # Fall back: scan for all dated snapshot files, pick second-most-recent
    candidates = sorted(
        [p for p in SNAPSHOTS_DIR.glob('snapshot-????-??-??.json')],
        reverse=True  # most-recent first
    )
    if len(candidates) >= 2:
        prev_path = candidates[1]   # index 0 = latest, index 1 = previous
        print(f"  Fallback: using second-most-recent snapshot: {prev_path.name}")
        return load_json(prev_path)

    print("  No previous snapshot found — all threads will be marked as 'new'.")
    return None


# ── Thread indexing ───────────────────────────────────────────────────────────
def index_threads(snapshot):
    """
    Build a lookup dict keyed by (channel, threadId).
    Falls back to (channel, contactEmail) for channels without threadIds.
    Returns: {(channel, key): thread_obj}
    """
    index = {}
    channels = snapshot.get('channels', {})
    for channel, threads in channels.items():
        for t in threads:
            # Primary key: threadId if present, otherwise contactEmail
            key = t.get('threadId') or t.get('contactEmail', '')
            if key:
                index[(channel, key)] = t
    return index


# ── Diff logic ────────────────────────────────────────────────────────────────
def compute_diff(latest_snapshot, previous_snapshot):
    """
    Compare latest vs previous snapshot.
    Returns a list of change objects sorted newest-first by timestamp.

    Change types:
      new_thread  — present in latest, absent in previous
      new_reply   — same threadId, messageCount increased
      resolved    — present in previous, absent in latest
    """
    latest_index   = index_threads(latest_snapshot)
    previous_index = index_threads(previous_snapshot) if previous_snapshot else {}

    changes = []

    # ── Scan latest for new + replied ─────────────────────────────────────────
    for (channel, key), thread in latest_index.items():
        prev_thread = previous_index.get((channel, key))

        if prev_thread is None:
            # Didn't exist before → new thread
            changes.append({
                'type':         'new_thread',
                'channel':      channel,
                'contactName':  thread.get('contactName', ''),
                'contactEmail': thread.get('contactEmail', ''),
                'subject':      thread.get('subject', ''),
                'snippet':      thread.get('lastMessageSnippet', ''),
                'timestamp':    thread.get('lastMessageTimestamp', ''),
                'threadId':     thread.get('threadId', key),
            })
        else:
            # Existed before — check if message count went up
            prev_count   = prev_thread.get('messageCount', 0)
            latest_count = thread.get('messageCount', 0)
            if latest_count > prev_count:
                changes.append({
                    'type':         'new_reply',
                    'channel':      channel,
                    'contactName':  thread.get('contactName', ''),
                    'contactEmail': thread.get('contactEmail', ''),
                    'subject':      thread.get('subject', ''),
                    'snippet':      thread.get('lastMessageSnippet', ''),
                    'timestamp':    thread.get('lastMessageTimestamp', ''),
                    'threadId':     thread.get('threadId', key),
                })

    # ── Scan previous for resolved (gone from latest) ─────────────────────────
    for (channel, key), thread in previous_index.items():
        if (channel, key) not in latest_index:
            changes.append({
                'type':         'resolved',
                'channel':      channel,
                'contactName':  thread.get('contactName', ''),
                'contactEmail': thread.get('contactEmail', ''),
                'subject':      thread.get('subject', ''),
                'snippet':      thread.get('lastMessageSnippet', ''),
                'timestamp':    thread.get('lastMessageTimestamp', ''),
                'threadId':     thread.get('threadId', key),
            })

    # Sort by timestamp descending (most recent change first), resolved last
    type_order = {'new_reply': 0, 'new_thread': 1, 'resolved': 2}
    changes.sort(key=lambda c: (type_order.get(c['type'], 9), -(parse_ts(c['timestamp']))))

    return changes


def parse_ts(ts_str):
    """Parse ISO timestamp to epoch int for sorting. Returns 0 on failure."""
    if not ts_str:
        return 0
    try:
        dt = datetime.fromisoformat(ts_str)
        return int(dt.timestamp())
    except (ValueError, TypeError):
        return 0


# ── Output ────────────────────────────────────────────────────────────────────
def build_output(changes, snapshot_date):
    """Build the final comms-changes.json structure."""
    n_new      = sum(1 for c in changes if c['type'] == 'new_thread')
    n_replied  = sum(1 for c in changes if c['type'] == 'new_reply')
    n_resolved = sum(1 for c in changes if c['type'] == 'resolved')

    return {
        'generated': datetime.now(tz=timezone.utc).isoformat(),
        'date':      snapshot_date,
        'summary': {
            'new':      n_new,
            'replied':  n_replied,
            'resolved': n_resolved,
        },
        'changes': changes,
    }


def save_output(output):
    """Write comms-changes.json to dashboard data/feeds/."""
    FEEDS_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {OUTPUT_FILE}")


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print("=" * 55)
    print("  diff-comms.py — Daily Comms Diff")
    print("  Wing Dashboard | Ahead Artist Solutions")
    print("=" * 55)

    # ── Load latest snapshot ──────────────────────────────────────────────────
    latest_path = SNAPSHOTS_DIR / 'snapshot-latest.json'
    if not latest_path.exists():
        print(f"\nERROR: No latest snapshot found at {latest_path}")
        print("Run snapshot-comms.py first.")
        sys.exit(1)

    print(f"\n[Loading snapshots]")
    print(f"  Latest: {latest_path.name}")
    latest_snapshot = load_json(latest_path)
    snapshot_date   = latest_snapshot.get('date', datetime.now().strftime('%Y-%m-%d'))

    # ── Load previous snapshot ────────────────────────────────────────────────
    previous_snapshot = find_previous_snapshot(snapshot_date)

    # ── Compute diff ──────────────────────────────────────────────────────────
    print(f"\n[Computing diff]")
    changes = compute_diff(latest_snapshot, previous_snapshot)

    # ── Build + save output ───────────────────────────────────────────────────
    print(f"\n[Saving output]")
    output = build_output(changes, snapshot_date)
    save_output(output)

    # ── Summary ───────────────────────────────────────────────────────────────
    n_new      = output['summary']['new']
    n_replied  = output['summary']['replied']
    n_resolved = output['summary']['resolved']
    total      = n_new + n_replied + n_resolved

    print(f"\n{'=' * 55}")
    print(f"  DIFF COMPLETE — {snapshot_date}")
    print(f"  Changes: {total} total")
    print(f"{'=' * 55}")
    print(f"\n  🔍 Diff complete — {n_new} new, {n_replied} replied, {n_resolved} resolved")


if __name__ == '__main__':
    main()
