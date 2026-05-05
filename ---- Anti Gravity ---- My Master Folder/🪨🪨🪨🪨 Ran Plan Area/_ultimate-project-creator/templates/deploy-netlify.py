#!/usr/bin/env python3
"""
deploy-netlify.py — push the UFM dashboard + jobs to Netlify.

Behavior:
  1. Pre-flight: checks netlify CLI, dashboard HTML, jobs/ folder, assets/.
  2. Build: inventories files to deploy, computes size, writes a temporary
     .netlifyignore at UFM_ROOT to exclude stage/backup/results folders.
  3. Deploy: creates or reuses a Netlify site and runs `netlify deploy`.
     Default is a draft/preview URL. Pass --prod for production.
  4. Parses the deployed URL from netlify's output and opens it in Chrome.
  5. Prints a final summary box.

Usage:
  python deploy-netlify.py
  python deploy-netlify.py --site-name my-custom-name
  python deploy-netlify.py --dry-run
  python deploy-netlify.py --prod

Exit codes:
  0 — success
  1 — pre-flight failure (missing dashboard, jobs/, assets/, etc.)
  2 — netlify command failed during deploy
  3 — netlify CLI not installed
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import re
import subprocess
import sys
import webbrowser

# Windows consoles default to cp1252 and choke on the emoji used in print lines.
# Re-encode stdout/stderr as UTF-8 when possible (Python 3.7+).
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[attr-defined]
    except Exception:
        pass

UFM_ROOT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨 2026 Ultimate File Manager"

DASHBOARD_FILENAME = "the big dashboard.html"  # misspelled on purpose — matches real file
JOBS_DIRNAME = "jobs"
ASSETS_DIRNAME = "assets"
DASHBOARD_CSS_REL = os.path.join(ASSETS_DIRNAME, "dashboard.css")

NETLIFY_STATE_REL = os.path.join(".netlify", "state.json")
NETLIFYIGNORE_NAME = ".netlifyignore"

# Folders/files that must never ship to the public site.
IGNORE_PATTERNS = [
    "-- Results folder master forever/",
    "-- back upppp dashboard/",
    "1. Big Part/",
    "2.  Project plan - add to project/",
    "3.  MIDDLE - master 'project job' holder/",
    "4. fill in the gaps  between 'step phrases'/",
    "5. Fill in the fields ' last touches/",
    "6. [Final results in 'final result folder/",
    ".git/",
    ".DS_Store",
    "__pycache__/",
    NETLIFY_STATE_REL.replace("\\", "/"),  # keep Netlify state local, don't deploy
]


# ───────────────────────────── pre-flight ─────────────────────────────

def check_netlify_cli() -> bool:
    """Return True if `netlify --version` runs cleanly."""
    try:
        result = subprocess.run(
            ["netlify", "--version"],
            capture_output=True,
            text=True,
            check=False,
            shell=(sys.platform == "win32"),  # Windows resolves .cmd shims via shell
        )
    except FileNotFoundError:
        return False
    return result.returncode == 0


def preflight() -> int:
    """Run all pre-deploy checks. Return 0 if ok, else an error exit code."""
    if not check_netlify_cli():
        print("ERROR: netlify CLI not found on PATH.", file=sys.stderr)
        print("       install hint: npm install -g netlify-cli", file=sys.stderr)
        print("       then:          netlify login", file=sys.stderr)
        return 3

    dashboard_path = os.path.join(UFM_ROOT, DASHBOARD_FILENAME)
    if not os.path.isfile(dashboard_path):
        print(f"ERROR: dashboard HTML missing: {dashboard_path}", file=sys.stderr)
        return 1

    jobs_dir = os.path.join(UFM_ROOT, JOBS_DIRNAME)
    if not os.path.isdir(jobs_dir):
        print(f"ERROR: jobs/ folder missing: {jobs_dir}", file=sys.stderr)
        return 1

    has_html = any(fn.lower().endswith(".html") for fn in os.listdir(jobs_dir))
    if not has_html:
        print(f"ERROR: jobs/ folder contains no .html files: {jobs_dir}", file=sys.stderr)
        return 1

    css_path = os.path.join(UFM_ROOT, DASHBOARD_CSS_REL)
    if not os.path.isfile(css_path):
        print(f"ERROR: dashboard CSS missing: {css_path}", file=sys.stderr)
        return 1

    return 0


# ───────────────────────────── build ─────────────────────────────

def should_ignore(rel_posix: str) -> bool:
    """Mirror .netlifyignore rules for local file-tree inventory."""
    for pat in IGNORE_PATTERNS:
        p = pat.rstrip("/")
        if rel_posix == p or rel_posix.startswith(p + "/"):
            return True
        # bare filename patterns (e.g. .DS_Store)
        if "/" not in pat and os.path.basename(rel_posix) == pat:
            return True
    return False


def inventory_deploy_files() -> tuple[list[str], int]:
    """Walk UFM_ROOT and return (relative-paths, total-bytes) that will deploy."""
    files: list[str] = []
    total = 0
    for dirpath, dirnames, filenames in os.walk(UFM_ROOT):
        # Prune ignored directories in-place so we don't descend into them.
        pruned: list[str] = []
        for d in dirnames:
            full = os.path.join(dirpath, d)
            rel = os.path.relpath(full, UFM_ROOT).replace("\\", "/")
            if should_ignore(rel + "/"):
                continue
            pruned.append(d)
        dirnames[:] = pruned

        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, UFM_ROOT).replace("\\", "/")
            if should_ignore(rel):
                continue
            try:
                total += os.path.getsize(full)
            except OSError:
                pass
            files.append(rel)
    return files, total


def write_netlifyignore() -> str:
    """Drop a .netlifyignore at UFM_ROOT. Return the path for cleanup."""
    path = os.path.join(UFM_ROOT, NETLIFYIGNORE_NAME)
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("# auto-written by deploy-netlify.py — removed after deploy\n")
        for pat in IGNORE_PATTERNS:
            fh.write(pat + "\n")
    return path


def remove_netlifyignore(path: str) -> None:
    try:
        if os.path.isfile(path):
            os.remove(path)
    except OSError:
        pass


def print_file_tree(files: list[str], total_bytes: int) -> None:
    print(f"\n📦 deploy inventory — {len(files)} files, {total_bytes / 1024:.1f} KB")
    top_buckets: dict[str, int] = {}
    for rel in files:
        top = rel.split("/", 1)[0] if "/" in rel else "(root)"
        top_buckets[top] = top_buckets.get(top, 0) + 1
    for bucket, count in sorted(top_buckets.items()):
        print(f"   {bucket}  ({count})")


# ───────────────────────────── deploy ─────────────────────────────

def netlify_state_exists() -> bool:
    return os.path.isfile(os.path.join(UFM_ROOT, NETLIFY_STATE_REL))


def run_netlify(args: list[str]) -> tuple[int, str, str]:
    """Run a netlify subcommand inside UFM_ROOT. Captures stdout + stderr separately."""
    try:
        result = subprocess.run(
            ["netlify", *args],
            cwd=UFM_ROOT,
            capture_output=True,
            text=True,
            check=False,
            shell=(sys.platform == "win32"),
        )
    except FileNotFoundError:
        return 127, "", "netlify CLI not found"
    return result.returncode, result.stdout or "", result.stderr or ""


def init_site(site_name: str | None) -> tuple[int, str, str]:
    """Create + link a new Netlify site. `netlify sites:create` is non-interactive when --name is given."""
    args = ["sites:create"]
    if site_name:
        args += ["--name", site_name]
    # `--with-ci` and friends are optional; keeping this minimal for robustness.
    return run_netlify(args)


def parse_deployed_url(stdout: str) -> str | None:
    """
    Netlify prints variations like:
      Website Draft URL:   https://xxx--site.netlify.app
      Website URL:         https://site.netlify.app
      Live Draft URL:      https://...
    Grab the first URL after any of those labels.
    """
    patterns = [
        r"(?:Website|Live)\s+Draft\s+URL:\s*(https?://\S+)",
        r"Website\s+URL:\s*(https?://\S+)",
        r"Live\s+URL:\s*(https?://\S+)",
        r"Deploy\s+URL:\s*(https?://\S+)",
    ]
    for pat in patterns:
        m = re.search(pat, stdout, re.IGNORECASE)
        if m:
            return m.group(1).strip().rstrip(".,)")
    # Last-ditch fallback: any netlify.app URL in the output.
    m = re.search(r"https?://[A-Za-z0-9\-]+(?:--[A-Za-z0-9\-]+)?\.netlify\.app\S*", stdout)
    if m:
        return m.group(0).rstrip(".,)")
    return None


def parse_site_name(stdout: str) -> str | None:
    # From sites:create: "Admin URL: https://app.netlify.com/sites/{name}"
    m = re.search(r"Admin URL:\s*https?://app\.netlify\.com/sites/([A-Za-z0-9\-]+)", stdout)
    if m:
        return m.group(1)
    # From state.json after linking.
    state_path = os.path.join(UFM_ROOT, NETLIFY_STATE_REL)
    if os.path.isfile(state_path):
        try:
            import json
            with open(state_path, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            return data.get("siteId") or data.get("name")
        except Exception:
            return None
    return None


def open_in_chrome(url: str) -> None:
    """Prefer Chrome specifically; fall back to webbrowser.open."""
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


# ───────────────────────────── main ─────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description="Deploy UFM dashboard to Netlify.")
    parser.add_argument("--site-name", default=None, help="override auto-generated site name (new sites only)")
    parser.add_argument("--dry-run", action="store_true", help="build + validate but don't push")
    parser.add_argument("--prod", action="store_true", help="deploy to production (default is draft/preview URL)")
    args = parser.parse_args()

    # ── pre-flight
    pf = preflight()
    if pf != 0:
        return pf

    # ── build inventory
    files, total_bytes = inventory_deploy_files()
    if not files:
        print("ERROR: inventory came back empty — refusing to deploy.", file=sys.stderr)
        return 1
    print_file_tree(files, total_bytes)

    # ── from here on, we own the .netlifyignore file — always clean it up
    ignore_path = write_netlifyignore()
    exit_code = 0
    deployed_url: str | None = None
    site_name_used: str | None = None

    try:
        if args.dry_run:
            print("\n🧪 --dry-run: skipping `netlify deploy`. Inventory + .netlifyignore validated.")
            print(f"   .netlifyignore written at: {ignore_path}")
            return 0

        # ── ensure site is linked
        if not netlify_state_exists():
            print("\n🔗 no .netlify/state.json — creating a new Netlify site...")
            rc, out, err = init_site(args.site_name)
            if rc != 0:
                print("ERROR: `netlify sites:create` failed.", file=sys.stderr)
                if "ENOTFOUND" in err or "corrupt" in err.lower():
                    print("       recovery hint: try `netlify unlink` then re-run.", file=sys.stderr)
                sys.stderr.write(err)
                return 2
            site_name_used = parse_site_name(out) or args.site_name
            print(out.strip())
        else:
            site_name_used = parse_site_name("")  # read from state.json

        # ── actual deploy
        timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        deploy_args = [
            "deploy",
            f"--dir={UFM_ROOT}",
            f"--message=/ultimate-project-creator deploy {timestamp}",
        ]
        if args.prod:
            deploy_args.append("--prod")

        print(f"\n🚀 running: netlify {' '.join(deploy_args)}")
        rc, out, err = run_netlify(deploy_args)
        # netlify prints info lines on stderr sometimes — don't fail purely on stderr content
        sys.stdout.write(out)
        if err.strip():
            sys.stderr.write(err)
        if rc != 0:
            print("\nERROR: `netlify deploy` failed.", file=sys.stderr)
            if "not linked" in (out + err).lower() or "corrupt" in (out + err).lower():
                print("       recovery hint: `netlify unlink` then `netlify link` (or delete `.netlify/` and re-run).", file=sys.stderr)
            exit_code = 2
            return exit_code

        deployed_url = parse_deployed_url(out) or parse_deployed_url(err)
        if not deployed_url:
            print("WARNING: deploy succeeded but no URL could be parsed from netlify output.", file=sys.stderr)

        # ── open in Chrome
        if deployed_url:
            open_in_chrome(deployed_url)

        # ── final box
        kind = "PROD URL" if args.prod else "preview URL"
        url_str = deployed_url or "(URL not parsed — check netlify output above)"
        size_kb = total_bytes / 1024
        print("")
        print("╭─────────────────────────────────────────────────────────────╮")
        print("│ ✅ NETLIFY DEPLOY COMPLETE                                  │")
        print("├─────────────────────────────────────────────────────────────┤")
        print(f"│   site name:   {site_name_used or '(unknown)'}")
        print(f"│   {kind}:  {url_str}")
        print(f"│   deployed:    {len(files)} files, {size_kb:.1f} KB")
        print("│   opened in Chrome")
        print("╰─────────────────────────────────────────────────────────────╯")
        return 0

    finally:
        remove_netlifyignore(ignore_path)


if __name__ == "__main__":
    sys.exit(main())
