# Client Database — Config

## Paths

- **Client Data**: `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`
- **Board State**: `C:\Users\chad\.claude\skills\dashboard\data\board.json`
- **Mapper HTML**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\- -         💲💲  MAPPER UPDATE\🚧🚧 41-MAPPER--Finalized.html`

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | auto | Unique ID (timestamp-based) |
| name | string | yes | Client/artist name |
| contact | string | no | Email, phone, or handle |
| status | enum | yes | urgent, active, watching, happy |
| stage | enum | yes | LEFT, CENTER, RIGHT |
| notes | string | no | Free-text notes |
| buttons | array | no | Mapper button IDs assigned |
| history | array | auto | Log of status/stage changes |
| created | string | auto | ISO timestamp |
| updated | string | auto | ISO timestamp |

## Validation Rules

- **name** must be non-empty
- **status** must be one of: urgent, active, watching, happy
- **stage** must be one of: LEFT, CENTER, RIGHT
- **id** auto-generated on create, never modified
- **history** append-only — never delete entries

## Status → Stage Mapping (Defaults)

| Status | Default Stage |
|--------|---------------|
| urgent | LEFT |
| active | CENTER |
| watching | CENTER |
| happy | RIGHT |

## Operations

- **Create**: Add to clients.json + add tile to board.json
- **Edit**: Update clients.json + log to history[] + update timestamp
- **Stage Change**: Update clients.json stage + move tile in board.json
- **Status Change**: Update clients.json status + log to history[]
