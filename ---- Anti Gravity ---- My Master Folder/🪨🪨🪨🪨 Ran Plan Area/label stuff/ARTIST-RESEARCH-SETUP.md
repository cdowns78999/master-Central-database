# Artist Research Setup — Per Label, Per Artist
### Created March 21, 2026

---

## OBJECTIVE
For each of the 77 labels in our database, find the **last 4 artists to release on that label** and collect their full social media profile data — matching the Social Climate Organizer (SCO) field spec from the Wing Dashboard.

---

## FIELDS TO COLLECT PER ARTIST

### Identity
- **Artist Name** (stage name)
- **Label** (which of our 77 labels)
- **Recent Release** (song title + release date)
- **Spotify Artist ID** (for profile pic population)

### Social Media Handles
- **Instagram** handle
- **YouTube** channel handle
- **TikTok** handle
- **Facebook** page handle
- **Spotify** artist URI

### SCO Stats (per platform where active)
- **Followers** (count)
- **Posts** (count, where available)
- **Engagement** (% rate estimate)
- **Growth** (monthly %, estimate)
- **Trend** (up / down / steady)

### Aggregated Hero Stats
- **Total Reach** (combined followers across platforms)
- **Platform Score** (0-100, based on presence across platforms)
- **Activity Level** (High / Medium / Low based on release frequency)

---

## SCOPE

| Side | Labels | Artists Needed |
|------|--------|---------------|
| Bass | 28 | 112 (28 × 4) |
| House | 49 | 196 (49 × 4) |
| **Total** | **77** | **308** |

---

## DATA FORMAT

Each artist entry follows this structure:
```
{
  artist: "Artist Name",
  label: "Label Name",
  recentRelease: { title: "Song", date: "2025-MM" },
  spotify: { id: "spotify_id", uri: "spotify:artist:ID" },
  socials: {
    instagram: { handle: "@handle", followers: 000000 },
    youtube: { handle: "@handle", followers: 000000 },
    tiktok: { handle: "@handle", followers: 000000 },
    facebook: { handle: "pagename", followers: 000000 }
  },
  totalReach: 000000,
  platformScore: 85,
  activityLevel: "High",
  trend: "up"
}
```

---

## SOURCE PRIORITY
1. Spotify "latest release" section per label search
2. Beatport recent releases per label
3. Label's own social media (often features new releases)
4. Cross-reference with known artist rosters

---

## OUTPUT FILES
- `ARTIST-RESEARCH-PLAN.md` — execution plan
- `ARTIST-RESEARCH-RESULTS.md` — full results presentation
- `artist-data.txt` — raw data dump for programmatic use
