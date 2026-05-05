#!/usr/bin/env python3
"""
launch-preview.py — start a fresh local preview of the UFM dashboard.

Behavior:
  1. Kills any `python -m http.server` processes holding ports 3000-3020.
  2. Finds the first free port in 3000-3020.
  3. Starts `python -m http.server {port} --directory "{UFM_ROOT}"` as a
     detached background subprocess (survives this script exiting).
  4. Opens Chrome to the dashboard URL with a ?v= cache-buster.
  5. Prints the preview URL.

Usage:
  python launch-preview.py

Exit codes:
  0 — success (server launched, browser opened)
  1 — no free port in the 3000-3020 range
  2 — failed to start http.server
"""

import os
import socket
import subprocess
import sys
import time
import webbrowser

UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"

PORT_RANGE_START = 3000
PORT_RANGE_END = 3020  # inclusive
DASHBOARD_PATH = "the%20big%20dashboard.html"  # misspelled on purpose — matches real file


def pids_on_port(port: int) -> list[str]:
    """Return PIDs listening on `port` using netstat on Windows."""
    try:
        out = subprocess.run(
            ["netstat", "-ano"],
            capture_output=True,
            text=True,
            check=False,
        ).stdout
    except FileNotFoundError:
        return []

    pids: set[str] = set()
    needle = f":{port} "
    for line in out.splitlines():
        if needle not in line:
            continue
        # Only care about listening sockets so we don't kill random TIME_WAIT entries.
        if "LISTENING" not in line:
            continue
        parts = line.split()
        if not parts:
            continue
        pid = parts[-1]
        if pid.isdigit():
            pids.add(pid)
    return list(pids)


def kill_pid(pid: str) -> None:
    subprocess.run(
        ["taskkill", "/PID", pid, "/F"],
        capture_output=True,
        text=True,
        check=False,
    )


def kill_previous_preview_servers() -> None:
    for port in range(PORT_RANGE_START, PORT_RANGE_END + 1):
        for pid in pids_on_port(port):
            kill_pid(pid)


def port_is_free(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.25)
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            return False
    return True


def first_free_port() -> int | None:
    for port in range(PORT_RANGE_START, PORT_RANGE_END + 1):
        if port_is_free(port):
            return port
    return None


def start_server(port: int) -> subprocess.Popen:
    """Launch python -m http.server detached so it outlives this script."""
    creationflags = 0
    if sys.platform == "win32":
        # DETACHED_PROCESS (0x00000008) | CREATE_NEW_PROCESS_GROUP (0x00000200)
        creationflags = 0x00000008 | 0x00000200

    return subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--directory", UFM_ROOT],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        stdin=subprocess.DEVNULL,
        close_fds=True,
        creationflags=creationflags,
    )


def wait_for_server(port: int, timeout_s: float = 3.0) -> bool:
    """Poll briefly for the server to start accepting connections."""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(0.25)
            try:
                sock.connect(("127.0.0.1", port))
                return True
            except OSError:
                time.sleep(0.1)
    return False


def open_in_chrome(url: str) -> None:
    """Prefer Chrome specifically; fall back to default browser."""
    chrome_candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    ]
    for chrome_path in chrome_candidates:
        if os.path.isfile(chrome_path):
            subprocess.Popen(
                [chrome_path, url],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                close_fds=True,
            )
            return
    webbrowser.open(url)


def main() -> int:
    kill_previous_preview_servers()

    port = first_free_port()
    if port is None:
        print(
            f"ERROR: no free port in {PORT_RANGE_START}-{PORT_RANGE_END}",
            file=sys.stderr,
        )
        return 1

    try:
        start_server(port)
    except Exception as exc:  # noqa: BLE001 — surface any launch failure
        print(f"ERROR: failed to start http.server on port {port}: {exc}", file=sys.stderr)
        return 2

    if not wait_for_server(port):
        print(
            f"ERROR: http.server on port {port} did not start accepting connections",
            file=sys.stderr,
        )
        return 2

    cache_bust = int(time.time())
    clean_url = f"http://localhost:{port}/{DASHBOARD_PATH}"
    bust_url = f"{clean_url}?v={cache_bust}"

    open_in_chrome(bust_url)

    print(f"✅ preview at {clean_url}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
