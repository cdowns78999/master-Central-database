#!/usr/bin/env python
"""
serve-stack-board.py
--------------------
Local preview server for the ⭐ stack-board projects index page + tile sub-pages.

Behavior (modeled on /koi-quick):
  1. Kill any process on ports 3000–3020
  2. Pick the first free port in 3000–3020
  3. Start `python -m http.server <port>` rooted at the star folder
  4. Open http://localhost:<port>/index.html?v=<timestamp> in Chrome via `start`
  5. Print the URL clearly
  6. Run in background (Popen detached) — Ctrl+C the launcher to stop
"""

import os
import socket
import subprocess
import sys
import time

# Force stdout/stderr to UTF-8 so emoji-laden paths print cleanly on Windows
# (default code page is cp1252 which can't encode 🪨 ⭐ etc.).
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# ---- LOCKED PATH (the ⭐ stack-board projects star folder) ------------------
STAR_FOLDER = (
    r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database"
    r"\---- Anti Gravity ---- My Master Folder"
    r"\🪨 2026 Ultimate File Manager"
    r"\-- Results folder master forever"
    r"\Regular projects - 2"
    r"\⭐ stack-board projects"
)

PORT_RANGE = range(3000, 3021)  # 3000–3020 inclusive


def port_in_use(port: int) -> bool:
    """True if something is listening on 127.0.0.1:<port>."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.25)
        try:
            s.connect(("127.0.0.1", port))
            return True
        except (ConnectionRefusedError, socket.timeout, OSError):
            return False


def kill_port(port: int) -> None:
    """Kill any PID bound to <port> using netstat + taskkill (Windows stdlib only)."""
    try:
        out = subprocess.check_output(
            ["netstat", "-ano", "-p", "TCP"],
            stderr=subprocess.DEVNULL,
            text=True,
        )
    except Exception:
        return
    pids = set()
    needle = f":{port} "
    for line in out.splitlines():
        if needle in line and "LISTENING" in line:
            parts = line.split()
            if parts:
                pid = parts[-1]
                if pid.isdigit():
                    pids.add(pid)
    for pid in pids:
        subprocess.call(
            ["taskkill", "/F", "/PID", pid],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )


def main() -> int:
    if not os.path.isdir(STAR_FOLDER):
        print(f"[ERROR] Star folder not found:\n  {STAR_FOLDER}")
        return 1

    print("=" * 64)
    print(" stack-board local preview")
    print("=" * 64)
    print(f" root: {STAR_FOLDER}")

    # --- Step 1: kill anything on 3000–3020 ----------------------------------
    print(" cleaning ports 3000-3020 ...")
    for p in PORT_RANGE:
        if port_in_use(p):
            kill_port(p)
    # tiny grace for sockets to release
    time.sleep(0.4)

    # --- Step 2: pick the first free port ------------------------------------
    chosen = None
    for p in PORT_RANGE:
        if not port_in_use(p):
            chosen = p
            break
    if chosen is None:
        print("[ERROR] No free port in 3000-3020.")
        return 2

    # --- Step 3: start `python -m http.server <port>` (background, detached) -
    #
    # CREATE_NEW_PROCESS_GROUP + DETACHED_PROCESS so the server outlives this
    # launcher and won't die when the parent shell window closes.
    DETACHED_PROCESS = 0x00000008
    CREATE_NEW_PROCESS_GROUP = 0x00000200
    flags = DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP

    server_proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(chosen)],
        cwd=STAR_FOLDER,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=flags,
        close_fds=True,
    )

    # wait briefly for the listener to come up
    for _ in range(20):
        if port_in_use(chosen):
            break
        time.sleep(0.1)

    ts = int(time.time())
    url = f"http://localhost:{chosen}/index.html?v={ts}"

    # --- Step 4: open in Chrome via `start` ----------------------------------
    # Use cmd's `start` so it goes through the OS shell and respects defaults.
    # Try Chrome explicitly first; fall back to default browser.
    try:
        subprocess.Popen(
            ["cmd", "/c", "start", "", "chrome", url],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except Exception:
        subprocess.Popen(
            ["cmd", "/c", "start", "", url],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

    # --- Step 5: print the URL clearly ---------------------------------------
    print("-" * 64)
    print(f" PORT     : {chosen}")
    print(f" URL      : {url}")
    print(f" SERVER   : PID {server_proc.pid} (detached, survives this shell)")
    print("-" * 64)
    print(" stop with:")
    print(f"   taskkill /F /PID {server_proc.pid}")
    print(" or just rerun this script — it kills 3000-3020 first.")
    print("=" * 64)
    return 0


if __name__ == "__main__":
    sys.exit(main())
