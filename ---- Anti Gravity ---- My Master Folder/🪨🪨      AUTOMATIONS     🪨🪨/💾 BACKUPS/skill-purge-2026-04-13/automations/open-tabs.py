import webbrowser
import time
import os

BASE = os.path.join(
    os.environ.get("USERPROFILE", "C:\\Users\\chad"),
    "OneDrive", "Documents", "GitHub", "master-Central-database",
    "---- Anti Gravity ---- My Master Folder",
    "\U0001faa8\U0001faa8      AUTOMATIONS     \U0001faa8\U0001faa8"
)

TABS = [
    os.path.join(BASE, "\U0001f527 WORK", "railroad-control-panel.html"),
    os.path.join(BASE, "\U0001f527 WORK", "build-digital-coms.html"),
    os.path.join(BASE, "\u2699\ufe0f ADMIN", "green spread folder base", "green-spreadsheets-TEMPLATE.html"),
    os.path.join(BASE, "\u2699\ufe0f ADMIN", "self operation", "claude-doesnt-stoppp-ppotsssss.html"),
    os.path.join(BASE, "workspot1", "--wingdashapp--1--", "index.html"),
    os.path.join(BASE, "\U0001f9e0\U0001f9e0\U0001f9e0 triple-brain-build-dashboard copy.html"),
    os.path.join(BASE, "\u2699\ufe0f ADMIN", "Engine Running.html"),
]

opened = 0
for i, path in enumerate(TABS):
    if not os.path.exists(path):
        print(f"  SKIP (not found): {os.path.basename(path)}")
        continue
    url = "file:///" + path.replace("\\", "/").replace(" ", "%20")
    if i == 0:
        webbrowser.open(url)
    else:
        webbrowser.open_new_tab(url)
    opened += 1
    time.sleep(0.4)

print(f"Opened {opened} tabs.")
