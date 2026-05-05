"""
Nerd Status Bar — gathers live system data and renders a formatted status line.

Usage:
  python nerd-status.py              # render status bar
  python nerd-status.py --json       # raw JSON data only
"""
import json, subprocess, os, sys
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

DIR = Path(__file__).parent
CONFIG = DIR / "nerd-config.json"

DEFAULT_CONFIG = {
    "active": True,
    "theme": "pipes",
    "widgets": ["model", "branch", "cwd", "time", "git-status"],
    "compact": False
}


def load_config():
    if CONFIG.exists():
        try:
            return json.loads(CONFIG.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, ValueError):
            pass
    return DEFAULT_CONFIG.copy()


def get_git_branch():
    try:
        r = subprocess.run(['git', 'branch', '--show-current'],
                           capture_output=True, text=True, timeout=2)
        return r.stdout.strip() or None
    except Exception:
        return None


def get_git_dirty():
    try:
        r = subprocess.run(['git', 'status', '--porcelain'],
                           capture_output=True, text=True, timeout=2)
        if r.returncode != 0:
            return None
        return bool(r.stdout.strip())
    except Exception:
        return None


def get_cwd():
    cwd = os.getcwd().replace('\\', '/')
    home = os.path.expanduser('~').replace('\\', '/')
    if cwd.startswith(home):
        cwd = '~' + cwd[len(home):]
    parts = cwd.split('/')
    if len(parts) > 3:
        cwd = '..' + '/' + '/'.join(parts[-2:])
    return cwd


def get_network():
    try:
        r = subprocess.run(['netsh', 'wlan', 'show', 'interfaces'],
                           capture_output=True, text=True, timeout=3)
        for line in r.stdout.splitlines():
            if 'SSID' in line and 'BSSID' not in line:
                return line.split(':', 1)[1].strip()
    except Exception:
        pass
    return None


def get_memory():
    try:
        r = subprocess.run(
            ['powershell', '-NoProfile', '-Command',
             '(Get-CimInstance Win32_OperatingSystem | '
             'Select-Object @{N="pct";E={[math]::Round(($_.TotalVisibleMemorySize - $_.FreePhysicalMemory) / $_.TotalVisibleMemorySize * 100)}}).pct'],
            capture_output=True, text=True, timeout=5
        )
        pct = r.stdout.strip()
        if pct:
            return f"{pct}%"
    except Exception:
        pass
    return None


def gather():
    data = {}
    data['model'] = 'opus 4.6'
    data['branch'] = get_git_branch()
    dirty = get_git_dirty()
    if dirty is not None:
        data['git-status'] = 'dirty' if dirty else 'clean'
    else:
        data['git-status'] = None
    data['cwd'] = get_cwd()
    now = datetime.now()
    h = now.hour % 12 or 12
    data['time'] = f"{h}:{now.strftime('%M %p')}"
    data['date'] = now.strftime('%b %d')
    data['os'] = 'Win11'
    data['network'] = get_network()
    data['memory'] = get_memory()
    return data


def render(config, data):
    theme = config.get('theme', 'pipes')
    enabled = config.get('widgets', DEFAULT_CONFIG['widgets'])
    compact = config.get('compact', False)

    # Widget icons and labels
    icons = {
        'model':      '\U0001f916',  # robot
        'branch':     '\U0001f33f',  # herb
        'cwd':        '\U0001f4c1',  # folder
        'time':       '\U0001f550',  # clock
        'date':       '\U0001f4c5',  # calendar
        'os':         '\U0001f4bb',  # laptop
        'git-status': '',
        'network':    '\U0001f4f6',  # signal
        'memory':     '\U0001f9e0',  # brain
    }

    status_icons = {'clean': '\u2714', 'dirty': '\u25cf'}  # check, bullet

    segments = []
    for w in enabled:
        val = data.get(w)
        if val is None:
            continue
        icon = icons.get(w, '')
        if w == 'git-status':
            sym = status_icons.get(val, val)
            segments.append(f"{sym} {val}")
        elif compact:
            segments.append(str(val))
        else:
            segments.append(f"{icon} {val}" if icon else str(val))

    # Theme separators
    seps = {
        'powerline':  ' \ue0b1 ',
        'pipes':      ' \u2502 ',
        'dots':       ' \u00b7 ',
        'arrows':     ' \u25b8 ',
        'dashes':     ' \u2500 ',
        'minimal':    '  ',
    }
    sep = seps.get(theme, seps['pipes'])

    bar = sep.join(segments)

    # Wrap based on theme
    caps = {
        'powerline':  ('\ue0b6', '\ue0b4'),
        'pipes':      ('\u2502', '\u2502'),
        'dots':       ('\u00b7', '\u00b7'),
        'arrows':     ('\u25b8', '\u25c2'),
        'dashes':     ('\u2500', '\u2500'),
        'minimal':    ('', ''),
    }
    left, right = caps.get(theme, ('', ''))
    return f"  {left} {bar} {right}"


if __name__ == '__main__':
    config = load_config()
    if not config.get('active', True):
        sys.exit(0)
    data = gather()
    if '--json' in sys.argv:
        print(json.dumps(data, indent=2))
    else:
        print(render(config, data))
