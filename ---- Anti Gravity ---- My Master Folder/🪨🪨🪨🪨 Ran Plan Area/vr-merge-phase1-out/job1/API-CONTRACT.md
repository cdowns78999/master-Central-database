# VR-MERGE Job 1 — Backend API Contract

**Stack:** Node.js 20 + Express 4 + Multer + node-cron + PayPal SDK + (eventual) DistroKid API
**Base URL:** `https://api.vr-merge.local` (dev: `http://localhost:3001`)
**Content-Type:** `application/json` unless noted (multipart for uploads)
**Auth model:** Bearer JWT in `Authorization: Bearer <token>` header for all routes EXCEPT `/api/onboarding/submit` (public). Admin-only routes additionally require `X-Admin-Key` header validated against `process.env.ADMIN_KEY`.

---

## 1. POST `/api/onboarding/submit`

Public. Creates a new artist record from the onboarding form. Returns the artist ID + a signed JWT for subsequent calls.

### Request

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "stage_name": "string (required, 1-80 chars)",
  "real_name": "string (required, 1-120 chars)",
  "email": "string (required, RFC5322 email)",
  "phone": "string (optional, E.164 format)",
  "bio": "string (required, 1-1000 chars)",
  "spotify_cover_url": "string (required, https://open.spotify.com/track/...)",
  "song_title": "string (required, 1-120 chars)",
  "genre": "string (required, enum: pop|rock|hip-hop|country|rnb|electronic|other)",
  "payout_method": "string (required, enum: paypal|bank)",
  "payout_recipient": "string (required, email if paypal | account ref if bank)",
  "consent_50_50_split": "boolean (required, must be true)",
  "consent_distribution": "boolean (required, must be true)"
}
```

### Response 201

```json
{
  "ok": true,
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "next_step": "upload_vocal",
  "upload_url": "/api/upload/vocal"
}
```

### Errors

| Code | Reason |
|------|--------|
| 400 | `INVALID_BODY` — missing/malformed fields, returns `{ok:false, error, fields:[]}` |
| 400 | `INVALID_SPOTIFY_URL` — not an `open.spotify.com/track/` URL |
| 409 | `EMAIL_EXISTS` — email already onboarded |
| 422 | `CONSENT_REQUIRED` — either consent flag is false |
| 500 | `SERVER_ERROR` |

---

## 2. POST `/api/upload/vocal`

Authenticated. Accepts a single WAV vocal stem via multipart/form-data. Triggers async mix pipeline and returns a job ID. Frontend polls `/api/mix-status/:artistId`.

### Request

Headers:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Multipart fields:
- `vocal` (file, required) — WAV only, mime `audio/wav` or `audio/x-wav`, max 200 MB, expected 44.1 kHz / 16- or 24-bit, mono or stereo
- `artist_id` (text, required)
- `take_label` (text, optional) — e.g. "Take 3 — final"

Multer config:
```js
multer({
  storage: diskStorage({ destination: './uploads/vocals', filename: (req,f,cb)=>cb(null,`${req.body.artist_id}_${Date.now()}.wav`) }),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req,file,cb)=> /^audio\/(wav|x-wav)$/.test(file.mimetype) ? cb(null,true) : cb(new Error('WAV_ONLY'))
})
```

### Response 202

```json
{
  "ok": true,
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "mix_job_id": "mix_01HK7ZA1B2C3D4E5F6G7H8J9K",
  "status": "queued",
  "poll_url": "/api/mix-status/art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "estimated_seconds": 180
}
```

### Errors

| Code | Reason |
|------|--------|
| 400 | `WAV_ONLY` — mime not WAV |
| 400 | `FILE_TOO_LARGE` — >200 MB |
| 401 | `UNAUTHORIZED` |
| 404 | `ARTIST_NOT_FOUND` |
| 415 | `UNSUPPORTED_MEDIA_TYPE` |
| 500 | `UPLOAD_FAILED` |

---

## 3. GET `/api/mix-status/:artistId`

Authenticated. Polled by frontend every 2-3s while the mix job runs. Returns current progress and final mix URL when complete.

### Request

Headers:
```
Authorization: Bearer <token>
```

Path params:
- `artistId` (string, required)

### Response 200

```json
{
  "ok": true,
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "mix_job_id": "mix_01HK7ZA1B2C3D4E5F6G7H8J9K",
  "status": "processing",
  "progress_pct": 47,
  "stage": "stem_alignment",
  "stages_total": 5,
  "stages_completed": 2,
  "started_at": "2026-04-27T14:22:01.000Z",
  "updated_at": "2026-04-27T14:23:18.000Z",
  "estimated_remaining_seconds": 96,
  "mix_url": null,
  "error": null
}
```

When `status === "complete"`:
```json
{
  "ok": true,
  "status": "complete",
  "progress_pct": 100,
  "mix_url": "https://cdn.vr-merge.local/mixes/art_01HK7Z..._final.wav",
  "mix_duration_seconds": 184,
  "mastered": true,
  "ready_for_distrokid": true
}
```

### Status enum
`queued | processing | complete | failed | cancelled`

### Stage enum
`stem_alignment | tempo_match | mix_render | master | finalize`

### Errors

| Code | Reason |
|------|--------|
| 401 | `UNAUTHORIZED` |
| 404 | `ARTIST_NOT_FOUND` or `MIX_JOB_NOT_FOUND` |
| 500 | `SERVER_ERROR` |

---

## 4. POST `/api/distrokid/push`

Authenticated + admin-gated. Submits the finalized mix + metadata to DistroKid for distribution to Spotify/Apple Music/etc.

### DistroKid integration assumptions (to be confirmed when API access granted)

- **Auth model:** OAuth2 client-credentials flow. Server holds `DISTROKID_CLIENT_ID` + `DISTROKID_CLIENT_SECRET` in env. Token endpoint: `POST https://api.distrokid.com/oauth/token`. Token cached server-side until `expires_in` elapses.
- **Upload endpoint (assumed):** `POST https://api.distrokid.com/v1/releases` with bearer token.
- **Required DK fields:** artist name, song title, genre, ISRC (we generate or DK assigns), release date (>= today + 7 days), explicit flag, language, primary artist, featured artists, songwriter, producer, cover art (3000x3000 JPG min), audio file (WAV 16-bit/44.1kHz min).
- **Webhook (assumed):** DK calls back to `/api/distrokid/webhook` with `release_id` + `status` once approved/live.

### Request

Headers:
```
Authorization: Bearer <token>
X-Admin-Key: <admin-key>
Content-Type: application/json
```

Body:
```json
{
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "song_title": "Long Gone",
  "primary_artist": "Maya",
  "featured_artists": [],
  "songwriter": "Maya Doe",
  "producer": "VR-MERGE",
  "genre": "pop",
  "explicit": false,
  "language": "en",
  "release_date": "2026-05-15",
  "isrc": null,
  "mix_url": "https://cdn.vr-merge.local/mixes/art_01HK7Z..._final.wav",
  "cover_art_url": "https://cdn.vr-merge.local/covers/art_01HK7Z....jpg",
  "platforms": ["spotify","apple_music","amazon","youtube_music","tidal"]
}
```

### Response 200

```json
{
  "ok": true,
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "distrokid_release_id": "dk_rel_9X7Y2N3M",
  "status": "submitted",
  "estimated_live_date": "2026-05-15",
  "submitted_at": "2026-04-27T14:35:00.000Z"
}
```

### Errors

| Code | Reason |
|------|--------|
| 400 | `INVALID_RELEASE_DATE` — must be >= today + 7 days |
| 400 | `MIX_NOT_READY` — mix job not complete |
| 401 | `UNAUTHORIZED` |
| 403 | `ADMIN_REQUIRED` |
| 404 | `ARTIST_NOT_FOUND` |
| 502 | `DISTROKID_API_ERROR` — upstream failure, includes `dk_error` payload |
| 500 | `SERVER_ERROR` |

---

## 5. POST `/api/payout/payload`

Authenticated + admin-gated. Constructs and (when triggered by the 15th-of-month cron) executes the 50/50 PayPal/Bank payout for a given artist + period. Manually invocable for one-off corrections.

### Cron schedule
```js
// Runs 09:00 UTC on the 15th of every month
cron.schedule('0 9 15 * *', runMonthlyPayoutBatch);
```

### Request

Headers:
```
Authorization: Bearer <token>
X-Admin-Key: <admin-key>
Content-Type: application/json
```

Body:
```json
{
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "period": "2026-03",
  "gross_revenue": 1240.50,
  "label_share": 620.25,
  "artist_share": 620.25,
  "payout_method": "paypal",
  "recipient_email_or_acct": "maya@example.com",
  "scheduled_for": "2026-04-15T09:00:00.000Z",
  "status": "scheduled",
  "dry_run": false
}
```

(Body must validate against `payout-schema.json`.)

### Response 200

```json
{
  "ok": true,
  "payout_id": "pay_01HK8AB2C3D4E5F6G7H8J9K0L",
  "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
  "period": "2026-03",
  "amount": 620.25,
  "method": "paypal",
  "status": "executed",
  "paypal_batch_id": "PYPL_BATCH_9X7Y2N",
  "executed_at": "2026-04-15T09:00:14.000Z",
  "label_retained": 620.25
}
```

### Errors

| Code | Reason |
|------|--------|
| 400 | `SCHEMA_INVALID` — body fails JSON Schema (returns Ajv errors array) |
| 400 | `SPLIT_MISMATCH` — `label_share + artist_share !== gross_revenue` |
| 401 | `UNAUTHORIZED` |
| 403 | `ADMIN_REQUIRED` |
| 404 | `ARTIST_NOT_FOUND` |
| 409 | `ALREADY_PAID` — payout for `artist_id+period` already executed |
| 502 | `PAYPAL_API_ERROR` |
| 500 | `SERVER_ERROR` |

---

## 6. GET `/api/artist/:id`

Authenticated. Returns the full artist record — used by the dashboard view + admin tools.

### Request

Headers:
```
Authorization: Bearer <token>
```

Path params:
- `id` (string, required)

### Response 200

```json
{
  "ok": true,
  "artist": {
    "artist_id": "art_01HK7Z8X9Y2N3M4P5Q6R7S8T9V",
    "stage_name": "Maya",
    "real_name": "Maya Doe",
    "email": "maya@example.com",
    "phone": "+15555550123",
    "bio": "Pop singer-songwriter from Austin...",
    "spotify_cover_url": "https://open.spotify.com/track/example",
    "song_title": "Long Gone",
    "genre": "pop",
    "payout_method": "paypal",
    "payout_recipient": "maya@example.com",
    "headshot_url": "https://cdn.vr-merge.local/headshots/art_01HK7Z....jpg",
    "vocal_upload_url": "https://cdn.vr-merge.local/vocals/art_01HK7Z....wav",
    "mix_url": "https://cdn.vr-merge.local/mixes/art_01HK7Z..._final.wav",
    "mix_status": "complete",
    "distrokid_release_id": "dk_rel_9X7Y2N3M",
    "distrokid_status": "live",
    "payouts": [
      {
        "payout_id": "pay_01HK8AB2C3D4E5F6G7H8J9K0L",
        "period": "2026-03",
        "amount": 620.25,
        "status": "executed",
        "executed_at": "2026-04-15T09:00:14.000Z"
      }
    ],
    "created_at": "2026-04-27T14:20:00.000Z",
    "updated_at": "2026-04-27T14:35:00.000Z"
  }
}
```

### Errors

| Code | Reason |
|------|--------|
| 401 | `UNAUTHORIZED` |
| 403 | `FORBIDDEN` — token does not own this artist record (and not admin) |
| 404 | `ARTIST_NOT_FOUND` |
| 500 | `SERVER_ERROR` |

---

## Global error envelope

All errors return:
```json
{
  "ok": false,
  "error": "ERROR_CODE",
  "message": "human-readable message",
  "fields": ["optional array of field paths for validation errors"],
  "request_id": "req_01HK..."
}
```

## Rate limits
- `/api/onboarding/submit`: 5 req / IP / hour
- `/api/upload/vocal`: 3 req / artist / hour
- `/api/mix-status/:artistId`: 60 req / token / minute (polling)
- All others: 30 req / token / minute

## Headers always returned
- `X-Request-Id` — ULID per request
- `X-RateLimit-Remaining`
- `X-Server-Time` — ISO8601
