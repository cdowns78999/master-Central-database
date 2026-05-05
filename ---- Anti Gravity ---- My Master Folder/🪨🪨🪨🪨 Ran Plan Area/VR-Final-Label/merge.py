"""Merge section partials into index.html + dedupe link/script tags."""
import sys, re
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

root = Path(__file__).parent
idx_path = root / "index.html"
html = idx_path.read_text(encoding='utf-8')

sections = ["p1", "p2", "p3", "p3-5", "p4", "p5", "p5-5", "p6", "p7", "p8", "p9"]

for pid in sections:
    partial_path = root / "sections" / f"{pid}.html"
    if not partial_path.exists():
        print(f"MISSING: {partial_path}")
        continue
    partial = partial_path.read_text(encoding='utf-8')
    marker = f"<!-- MERGE:sections/{pid}.html -->"
    if marker in html:
        html = html.replace(marker, partial)
        print(f"merged  {pid}")
    else:
        print(f"MARKER NOT FOUND for {pid}")

# Dedupe <link rel="stylesheet" href="..."> by href (keep first)
seen_links = set()
def dedup_link(m):
    tag = m.group(0)
    href_m = re.search(r'href=["\']([^"\']+)["\']', tag)
    if not href_m:
        return tag
    href = href_m.group(1)
    if href in seen_links:
        return ""  # drop duplicate
    seen_links.add(href)
    return tag
html = re.sub(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', dedup_link, html)

# Dedupe <script src="..."> by src (keep first)
seen_scripts = set()
def dedup_script(m):
    tag = m.group(0)
    src_m = re.search(r'src=["\']([^"\']+)["\']', tag)
    if not src_m:
        return tag
    src = src_m.group(1)
    if src in seen_scripts:
        return ""
    seen_scripts.add(src)
    return tag
html = re.sub(r'<script[^>]+src=["\'][^"\']+["\'][^>]*></script>', dedup_script, html)

# Remove empty lines left by dedupe
html = re.sub(r'\n\s*\n\s*\n+', '\n\n', html)

idx_path.write_text(html, encoding='utf-8')
print(f"\nfinal index.html: {len(html)} bytes")
print(f"unique stylesheets linked: {len(seen_links)}")
print(f"unique scripts linked: {len(seen_scripts)}")
print(f"stylesheets: {sorted(seen_links)}")
print(f"scripts: {sorted(seen_scripts)}")
