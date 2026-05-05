---
name: dashboard--client-database
description: Client data management — store, retrieve, and organize artist/client records
---

# dashboard--client-database

The data layer. This is where client records live. Every other personality
pulls from here when it needs client info.

## Usage

```
/dashboard--client-database
```

## Instructions

### Step 0: Read Config

Read `C:\Users\chad\.claude\skills\dashboard--client-database\config.md` for database path and field definitions.
Read `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json` for current client records.

### Step 1: Header

Print:
```
  ─── client database ──────────────
```

### Step 2: Menu

Use **AskUserQuestion**:
- Question: "What are we doing?"
- Options:
  1. "View All Clients" — description: "list every client record"
  2. "Search Client" — description: "find a specific client by name"
  3. "Add New Client" — description: "create a new client record"
  4. "Edit Client" — description: "update an existing client's info"

### Step 3a: View All

Read `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`.

Display client list as a clean grid:
```
  Name              Status      Last Action     Stage
  ─────────────────────────────────────────────────────
  Artist Name       active      invoice sent    CENTER
  Artist Name 2     urgent      waiting reply   LEFT
```

If no clients exist, show "No clients in the database yet."

### Step 3b: Search

Ask: "Client name or keyword?"
Search through clients.json for matching records (case-insensitive match on name, contact, notes).
Return matching records in the same grid format as View All.

### Step 3c: Add New

Collect fields via **AskUserQuestion** or text input:
- Client name (required)
- Contact info (email, phone, or handle)
- Status: urgent / active / watching / happy
- Notes (optional)
- Assigned mapper buttons (optional — from 41-MAPPER--Finalized.html)

Build the record using the data schema below.
Save to `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`.
Also add a tile entry to `C:\Users\chad\.claude\skills\dashboard\data\board.json` in the correct column.

Confirm:
```
  ✓ [Client Name] added to database (status: active, stage: LEFT)
```

### Step 3d: Edit

Ask which client to edit → show current record → ask what to change → update → confirm.

Before any edit:
1. Read current clients.json
2. Log the change to the client's history[] array
3. Update the `updated` timestamp
4. Save back to clients.json

If stage changes, also update board.json tile position.

### Data Schema

Each client record:
```json
{
  "id": "unique-id",
  "name": "",
  "contact": "",
  "status": "urgent | active | watching | happy",
  "stage": "LEFT | CENTER | RIGHT",
  "notes": "",
  "buttons": [],
  "history": [],
  "created": "",
  "updated": ""
}
```

- **id**: Generated unique identifier (timestamp-based)
- **name**: Client/artist name
- **contact**: Email, phone, or handle
- **status**: Current urgency level
- **stage**: Current pipeline position (LEFT/CENTER/RIGHT)
- **notes**: Free-text notes
- **buttons**: Array of mapper button IDs assigned to this client
- **history**: Array of `{ date, action, detail }` log entries — auto-populated on status/stage changes
- **created**: ISO timestamp when record was created
- **updated**: ISO timestamp of last modification

### Important Notes

- This is the SINGLE SOURCE OF TRUTH for client data
- All other personalities read from here — never duplicate client records
- Status changes auto-log to history[]
- Stage changes must also update board.json
- Always read the latest clients.json before any write operation
