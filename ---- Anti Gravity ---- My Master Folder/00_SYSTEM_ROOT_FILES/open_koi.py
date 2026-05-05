import webbrowser, urllib.parse, time, os

base = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi"
v = int(time.time())

for sub in ["EPK-Example-VictorianGoth", "EPK-Example-VictorianGoth-UX-Prototype"]:
    path = os.path.join(base, sub, "index.html")
    url = "file:///" + urllib.parse.quote(path.replace("\\", "/"), safe="/:") + f"?v={v}"
    print(url)
    webbrowser.open(url)
