# Wing Dashboard App — Setup & Feed System

## Folder Structure

```
--wingdashapp--1--/
├── index.html              ← the app
├── setup.md                ← this file
├── data/
│   ├── feeds/              ← live JSON that pills consume
│   │   ├── gmail.json      ← Gmail pill → starred contacts
│   │   └── (future feeds — one per pill)
│   └── config/             ← app settings
│       └── slot-prefs.json ← pinned slots, custom order (future)
├── pages/left/             ← sub-pages (clients, pipeline, etc)
└── pages/right/            ← sub-pages (ai-tools, comms, etc)
```

## How Feeds Work

Every pill in the wing dashboard can load real data from a JSON file.

**The flow:**
1. A scraper runs (e.g. `gmail-scrape.py` in `ADMIN/tools/`)
2. It pulls data from the source (Gmail API, etc)
3. It auto-deploys a JSON file to `data/feeds/`
4. On page load, the dashboard fetches that JSON
5. The pill's submenu shows real names instead of `{ slot N }` placeholders

**No manual copy step.** Scrapers write directly to `data/feeds/`.

## Feed JSON Format

Every feed file follows this shape:

```json
{
  "updated": "2026-03-08T02:50:00",
  "count": 20,
  "contacts": [
    {
      "name": "Marc Antonix",
      "email": "marc@example.com",
      "subject": "Re: Q1 Campaign",
      "thread_url": "https://mail.google.com/mail/u/0/#inbox/abc123",
      "date": "2026-03-07"
    }
  ]
}
```

The key fields the dashboard needs from each contact:
- `name` — displayed in the submenu slot
- `url` or `thread_url` — opened on click (window.open)

Other fields are source-specific and can vary per feed.

## Slot Display Logic

- **4 visible** in the submenu overlay, rest behind "+N more"
- **Default order:** alphabetical by name (until recency data exists)
- **Future:** most-recently-clicked 4 float to the top
- **Future:** `data/config/slot-prefs.json` for pinned/custom order

## Adding a New Feed

1. **Build the scraper** in `ADMIN/tools/` (copy gmail-scrape.py as template)
2. **Export JSON** to `data/feeds/{pill-label-lowercase}.json`
3. **Add a feed loader** in index.html (search for `loadGmailContacts` and copy the pattern)
4. **Key the cache** to the pill's exact label text (e.g. `'WhatsApp'`, `'Discord'`)

### Feed loader template (add to index.html):

```javascript
(function loadWhatsAppContacts() {
    fetch('data/feeds/whatsapp.json?t=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data && data.contacts && data.contacts.length) {
                var sorted = data.contacts.slice().sort(function(a, b) {
                    return (a.name || '').localeCompare(b.name || '');
                });
                _submenuCache['WhatsApp'] = sorted.map(function(c) {
                    return { name: c.name || c.email, url: c.thread_url, lastUsed: 0 };
                });
            }
        })
        .catch(function() {});
})();
```

## Current Feeds

| Feed File | Pill | Scraper | Status |
|-----------|------|---------|--------|
| gmail.json | Gmail | gmail-scrape.py | Built — needs OAuth credentials |
| whatsapp.json | WhatsApp | whatsapp-export.py | Scraper exists, feed not wired yet |
| imessage.json | iMessage | imessage-pull.py | Scraper exists, feed not wired yet |

## Archive vs Live

- **Live:** `data/feeds/` — what the dashboard reads (latest only, overwritten each run)
- **Archive:** `ADMIN/tools/exports/` — timestamped dumps (never overwritten, history preserved)

Both are written by the same scraper in one run.

## CORS Note

The dashboard runs on `file://` protocol locally. `fetch()` may be blocked by CORS on some browsers. If feeds don't load:
- Use a local server: `python -m http.server 8000` from this folder
- Or open in a browser that allows file:// fetch (most Chromium-based do)
