import webbrowser, urllib.parse, time, sys, os
sys.stdout.reconfigure(encoding="utf-8")
p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")
url = "file:///" + urllib.parse.quote(p.replace("\\", "/")) + "?v=" + str(int(time.time()))
print(url)
webbrowser.open(url)
