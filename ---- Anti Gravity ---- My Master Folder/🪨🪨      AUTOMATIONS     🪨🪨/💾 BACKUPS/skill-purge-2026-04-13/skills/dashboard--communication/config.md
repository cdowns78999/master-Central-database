# Communication — Config

## Paths

- **Presets Data**: `C:\Users\chad\.claude\skills\dashboard--communication\data\presets.json`
- **Client Data**: `C:\Users\chad\.claude\skills\dashboard--client-database\data\clients.json`
- **Board State**: `C:\Users\chad\.claude\skills\dashboard\data\board.json`
- **Chrome Extension Reference**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\💎💎 - - - beginning - - - 💎💎\🔧-- -- - -- 🔧 ext\ahead-billing-paypal-extension`
- **Mapper HTML**: `C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\- -         💲💲  MAPPER UPDATE\🚧🚧 41-MAPPER--Finalized.html`

## Notification Settings

| Method | Description | Default |
|--------|-------------|---------|
| Banner | In-dashboard visual alert | enabled |
| Console | Console log message | enabled |
| Chrome | Chrome browser notification | disabled |

## Default N&N Rules

| Rule | Trigger | Action |
|------|---------|--------|
| stale-urgent | Tile in LEFT for 24h+ | Banner alert |
| abandoned-windup | Wind Up started but not completed | Console nudge |
| celebration | Tile reaches RIGHT | Banner + console |

## Extension Registry

| Extension | Pattern | Status | Creates |
|-----------|---------|--------|---------|
| ahead-billing-paypal | 3-file (manifest, content.js, styles.css) | reference | Billing tile in LEFT |

### Extension Trigger Pattern

Based on `ahead-billing-paypal-extension`:
1. Extension uses localStorage state machine
2. Fires event with client data payload
3. Dashboard catches event → creates tile
4. Tile auto-placed in LEFT column
5. Buttons auto-assigned based on extension type

## Wind Up Preset Schema

```json
{
  "name": "preset name",
  "button": "target mapper button",
  "fields": {
    "fieldName": {
      "source": "client-db | manual | auto | template",
      "auto": true | false,
      "value": "default value or template text",
      "rule": "calculation rule (for auto source)"
    }
  },
  "onComplete": "action description"
}
```

## Field Sources

| Source | Meaning | Auto? |
|--------|---------|-------|
| client-db | Pull from client record in clients.json | Yes |
| manual | User enters at runtime | No |
| auto | Calculated (e.g., +30 days) | Yes |
| template | Preset text value | Yes |
