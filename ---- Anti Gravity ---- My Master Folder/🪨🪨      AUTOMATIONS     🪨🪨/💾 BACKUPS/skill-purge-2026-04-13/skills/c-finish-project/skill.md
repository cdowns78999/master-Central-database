---
name: c-finish-project
description: Launch the catch-up notebook server and fire up the parallel job runner
---

# /c-finish-project

Starts the notebook server, then launches `/c-sub-agent-main-job` for parallel work.

## Step 1 — Start the notebook server

Run in background (do NOT block):

```bash
source ~/.bashrc && cd "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\catch-up-notebook" && python server.py
```

Use `run_in_background: true` on the Bash tool.

Then confirm it's alive:

```bash
curl -s http://localhost:3009/api/version
```

- If it returns JSON with a version number → server is up
- If it fails → tell Chad to start it manually and move on

**Do NOT test every endpoint.** Just the one health check above.

## Step 2 — Open notebook in Chrome

```bash
source ~/.bashrc && python -c "import webbrowser, time; webbrowser.open('http://localhost:3009/?v=' + str(int(time.time())))"
```

## Step 3 — Launch job runner

Run the `/c-sub-agent-main-job` skill via the Skill tool. This will ask Chad what jobs to run and manage them in the 3x2 grid.

**Notebook sync is automatic.** The job runner skill detects the notebook server (localhost:3009) and syncs every job status change — launch, complete, fail — directly to the HTML. Chad sees tasks appear, update, and get struck through in real-time without any manual steps. The grid (terminal) and the notebook (browser) stay in lockstep.

## Live notebook commands

While jobs are running, Chad can ask you to update the notebook in real-time. Use these endpoints on `localhost:3009`:

| Action | Endpoint | Body |
|--------|----------|------|
| Strike through | `POST /api/strike` | `{"match": "partial text"}` or `{"id": "b1"}` |
| Add item | `POST /api/add` | `{"section": 0, "text": "new task", "indent": 0}` |
| Delete item | `POST /api/delete` | `{"match": "partial text"}` or `{"id": "b1"}` |
| Edit item | `POST /api/edit` | `{"match": "old text", "text": "new text"}` |
| Add section | `POST /api/add-section` | `{"title": "Section Name"}` |

Use `curl -s -X POST -H "Content-Type: application/json" -d '...' http://localhost:3009/api/...` for all writes.

Section indexes: 0 = Catch Up Plan For Business, 1 = Catch Up Plan For Life (or check with `GET /api/data`).

### Batch endpoint

`POST /api/batch` — send multiple operations in a single request.

Body: `{"ops": [{"action": "strike|add|delete|edit|add-section", ...fields...}]}`

Each object in the `ops` array uses the same fields as its individual endpoint (match, id, text, section, indent, title).

Example — strike one item and add another in one call:

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{
  "ops": [
    {"action": "strike", "match": "file taxes"},
    {"action": "add", "section": 0, "text": "review Q2 invoice", "indent": 0}
  ]
}' http://localhost:3009/api/batch
```

Use this instead of multiple individual calls — one request, one round-trip.

### WebSocket connection

Persistent connection on port 3010: `ws://localhost:3010`

Send ops directly over the socket using the same format as batch:

```json
{"ops": [{"action": "strike", "match": "file taxes"}]}
```

Persistent connection, no TCP handshake per message — fastest possible path.

## Rules

- Server runs in background — never block on it
- One health check only — no endpoint testing marathons
- Notebook commands are instant — one curl per action
- Always confirm the action landed by reading the response
- Prefer batch endpoint for 2+ simultaneous updates
- Use WebSocket when available for lowest latency
- Fall back to individual HTTP endpoints if WS is down
