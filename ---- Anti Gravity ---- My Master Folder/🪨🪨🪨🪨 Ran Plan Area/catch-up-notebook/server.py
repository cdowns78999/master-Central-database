import json, os, string, random, threading, asyncio
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import websockets

DIR = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(DIR, "data.json")
HTML = os.path.join(DIR, "notebook.html")

DEFAULT = {
    "version": 1,
    "sections": [
        {"title": "Catch Up Plan For Business", "items": [
            {"text": "Pay everyone back and catch them up", "done": False, "indent": 0, "id": "b1"},
            {"text": "Who are the people", "done": False, "indent": 1, "id": "b2"},
            {"text": "What are the campaigns", "done": False, "indent": 1, "id": "b3"},
            {"text": "How much is owed", "done": False, "indent": 1, "id": "b4"},
            {"text": "How much total owed between everyone?", "done": False, "indent": 0, "id": "b5"},
            {"text": "Set up a great foundation per client with a good journey experience", "done": False, "indent": 0, "id": "b6"},
            {"text": "Lemi Vice - what does he need?", "done": False, "indent": 1, "id": "b7"},
            {"text": "Marc Antonix - what does he need", "done": False, "indent": 1, "id": "b8"}]},
        {"title": "Catch Up Plan For Life", "items": [
            {"text": "$12,775 due in 8 days", "done": False, "indent": 0, "id": "l1"},
            {"text": "Electric bill and a few others about to be cut off", "done": False, "indent": 0, "id": "l2"},
            {"text": "What bills are behind and how much?", "done": False, "indent": 0, "id": "l3"}]}
    ]
}

def load():
    if not os.path.exists(DATA):
        save(DEFAULT)
        return DEFAULT
    with open(DATA, "r", encoding="utf-8") as f:
        d = json.load(f)
    if "version" not in d:
        d["version"] = 1
    return d

def save(d):
    with open(DATA, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)

def uid():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))

def find_item(data, *, id=None, match=None):
    for sec in data["sections"]:
        for i, item in enumerate(sec["items"]):
            if id and item["id"] == id:
                return sec, i, item
            if match and match.lower() in item["text"].lower():
                return sec, i, item
    return None, None, None

# ── WebSocket layer ─────────────────────────────────────────────
ws_clients = set()
ws_loop = None  # set once the WS event loop starts

def broadcast(version):
    """Send version update to all connected WS clients (thread-safe)."""
    if not ws_loop or not ws_clients:
        return
    msg = json.dumps({"type": "update", "version": version})
    async def _push():
        stale = set()
        for c in list(ws_clients):
            try:
                await c.send(msg)
            except Exception:
                stale.add(c)
        ws_clients -= stale
    ws_loop.call_soon_threadsafe(asyncio.ensure_future, _push())

def process_ws_ops(ops):
    """Run batch ops from a WS message — same logic as /api/batch."""
    d = load()
    for op in ops:
        action = op.get("action")
        try:
            if action == "strike":
                sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                if not item: continue
                item["done"] = not item["done"]
            elif action == "add":
                si = op.get("section", 0)
                if si < 0 or si >= len(d["sections"]): continue
                new = {"text": op.get("text", ""), "done": False,
                       "indent": op.get("indent", 0), "id": uid()}
                items = d["sections"][si]["items"]
                after = op.get("after")
                if after:
                    for i, it in enumerate(items):
                        if it["id"] == after:
                            items.insert(i + 1, new); break
                    else:
                        items.append(new)
                else:
                    items.append(new)
            elif action == "delete":
                sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                if not item: continue
                sec["items"].pop(idx)
            elif action == "edit":
                sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                if not item: continue
                item["text"] = op.get("text", item["text"])
            elif action == "add-section":
                d["sections"].append({"title": op.get("title", "Untitled"), "items": []})
        except Exception:
            pass
    d["version"] = d.get("version", 0) + 1
    save(d)
    return d

async def ws_handler(ws):
    ws_clients.add(ws)
    try:
        async for raw in ws:
            try:
                msg = json.loads(raw)
                if "ops" in msg:
                    d = process_ws_ops(msg["ops"])
                    broadcast(d["version"])
            except json.JSONDecodeError:
                pass
    finally:
        ws_clients.discard(ws)

def start_ws_server():
    global ws_loop
    async def _run():
        global ws_loop
        ws_loop = asyncio.get_running_loop()
        async with websockets.serve(ws_handler, "127.0.0.1", 3010):
            await asyncio.Future()  # run forever
    asyncio.run(_run())

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def ok_json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.cors()
        self.end_headers()
        self.wfile.write(body)

    def err(self, code, msg):
        self.ok_json({"error": msg}, code)

    def body(self):
        return json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))))

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/data":
            self.ok_json(load())
        elif path == "/api/version":
            self.ok_json({"version": load().get("version", 1)})
        elif path == "/" or path == "":
            with open(HTML, "rb") as f:
                html = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.cors()
            self.end_headers()
            self.wfile.write(html)
        else:
            self.err(404, "not found")

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/data":
            d = self.body()
            if "version" not in d:
                d["version"] = load().get("version", 0) + 1
            save(d)
            broadcast(d.get("version", 0))
            self.ok_json(d)

        elif path == "/api/strike":
            b = self.body()
            d = load()
            sec, idx, item = find_item(d, id=b.get("id"), match=b.get("match"))
            if not item:
                return self.err(404, "not found")
            item["done"] = not item["done"]
            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json(d)

        elif path == "/api/add":
            b = self.body()
            d = load()
            si = b.get("section", 0)
            if si < 0 or si >= len(d["sections"]):
                return self.err(400, "invalid section index")
            new = {"text": b.get("text", ""), "done": False, "indent": b.get("indent", 0), "id": uid()}
            items = d["sections"][si]["items"]
            after = b.get("after")
            if after:
                for i, it in enumerate(items):
                    if it["id"] == after:
                        items.insert(i + 1, new)
                        break
                else:
                    items.append(new)
            else:
                items.append(new)
            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json(d)

        elif path == "/api/delete":
            b = self.body()
            d = load()
            sec, idx, item = find_item(d, id=b.get("id"), match=b.get("match"))
            if not item:
                return self.err(404, "not found")
            sec["items"].pop(idx)
            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json(d)

        elif path == "/api/edit":
            b = self.body()
            d = load()
            sec, idx, item = find_item(d, id=b.get("id"), match=b.get("match"))
            if not item:
                return self.err(404, "not found")
            item["text"] = b.get("text", item["text"])
            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json(d)

        elif path == "/api/add-section":
            b = self.body()
            d = load()
            d["sections"].append({"title": b.get("title", "Untitled"), "items": []})
            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json(d)

        elif path == "/api/batch":
            b = self.body()
            ops = b.get("ops", [])
            d = load()
            errors = []
            for oi, op in enumerate(ops):
                action = op.get("action")
                try:
                    if action == "strike":
                        sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                        if not item:
                            errors.append({"op": oi, "action": action, "error": "not found"})
                            continue
                        item["done"] = not item["done"]

                    elif action == "add":
                        si = op.get("section", 0)
                        if si < 0 or si >= len(d["sections"]):
                            errors.append({"op": oi, "action": action, "error": "invalid section index"})
                            continue
                        new = {"text": op.get("text", ""), "done": False, "indent": op.get("indent", 0), "id": uid()}
                        items = d["sections"][si]["items"]
                        after = op.get("after")
                        if after:
                            for i, it in enumerate(items):
                                if it["id"] == after:
                                    items.insert(i + 1, new)
                                    break
                            else:
                                items.append(new)
                        else:
                            items.append(new)

                    elif action == "delete":
                        sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                        if not item:
                            errors.append({"op": oi, "action": action, "error": "not found"})
                            continue
                        sec["items"].pop(idx)

                    elif action == "edit":
                        sec, idx, item = find_item(d, id=op.get("id"), match=op.get("match"))
                        if not item:
                            errors.append({"op": oi, "action": action, "error": "not found"})
                            continue
                        item["text"] = op.get("text", item["text"])

                    elif action == "add-section":
                        d["sections"].append({"title": op.get("title", "Untitled"), "items": []})

                    else:
                        errors.append({"op": oi, "action": action, "error": "unknown action"})
                except Exception as e:
                    errors.append({"op": oi, "action": action, "error": str(e)})

            d["version"] = d.get("version", 0) + 1
            save(d)
            broadcast(d["version"])
            self.ok_json({"data": d, "errors": errors})

        else:
            self.err(404, "not found")

if __name__ == "__main__":
    # Start WebSocket server in a daemon thread
    ws_thread = threading.Thread(target=start_ws_server, daemon=True)
    ws_thread.start()
    print("WebSocket server running at ws://localhost:3010", flush=True)

    s = HTTPServer(("127.0.0.1", 3009), H)
    print("Notebook server running at http://localhost:3009", flush=True)
    s.serve_forever()
