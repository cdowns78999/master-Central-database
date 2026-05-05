# VR Speed Dating (Cafe Vismo) — Operational Runbook

**Cadence:** Weekly. Wed raffle drop → Sat match DMs.
**Capacity target:** 30 patrons / event (15+15 split).
**Venue:** La Barista (VRChat free world) — Phase 1.

---

## WED — T-48h · Raffle Drop

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 7:00 PM | Host | Pin event-week banner in `#announcements` | Pin visible top of channel | If Carl-bot pin fails, manual pin |
| 7:05 PM | Host | Run `gstart 24h 30 winners Speed Dating Slot — 🌹 react to enter` in `#raffle` | GiveawayBot embed posts, ends Thu 7:05 PM | If bot offline, restart Carl-bot, re-fire `gstart`; never extend past 24h |
| 7:10 PM | Bot (Patreon) | Auto-syncs `@Verified` role to active patrons | Role shows on patron list | Manual role-add via Discord admin |
| 7:15 PM | Host | DMs `@Front-Row` + `@Host` tier patrons via Carl-bot template "Reserved seat — confirm by Thu 5 PM" | DM delivered; reaction tally in tracker | If Carl-bot DM blocked, ping in `#vip-lounge` instead |

**Success of phase:** raffle live, VIP confirmations rolling in.

---

## THU — T-24h · Group Balancing

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 7:05 PM | Bot | GiveawayBot ends raffle, posts 30 winners in `#raffle` | Embed shows "Winners: @user1 @user2 ..." | If <30 entrants, host pulls from waitlist DMs |
| 7:30 PM | Host | Export Tally onboarding sheet → balance into 2 groups of 15 by orientation/age range | CSV saved as `events/{date}/groups.csv` | Manual eyeball balance if Tally export errors |
| 8:00 PM | Host | DMs each winner the Tally onboarding form link (if not already filled) | "Form complete" status in Tally dashboard | Re-DM at T-12h for non-responders; auto-bump first waitlister at T-6h |
| 9:00 PM | Host | Posts confirmed roster (handles only, no PII) in `#staff-only` | Roster pinned in staff channel | — |

**Success of phase:** 2 balanced groups locked, all 30 patrons have completed Tally intake.

---

## FRI — T-30min · Invite Drop

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 7:00 PM | Host | Spawn La Barista instance (Friends+, region: US-W) | Instance ID copied | If region full, retry US-E; never use Public |
| 7:15 PM | Host | Launch ceiling timer + bell prop, audio-check ambient jazz playlist | All 4 staff confirm audio in staff voice channel | Mute jazz if mic clipping, fallback to Lofi cafe loop |
| 7:25 PM | Co-host | Verify Trusted-rank, ready as instance owner backup | Co-host in instance | If primary host crashes, co-host promotes |
| 7:30 PM | Host | Drops nonce-locked invite link in `#invite-drops` channel (visible to `@Verified` only) | Carl-bot reaction count climbing | If link fails, regen nonce; post fresh link, ping `@Verified` once |
| 7:50 PM | All | Patrons join cafe lobby, ambient warm-up chat | 25+ in instance by 7:55 PM | If <20, hold start 5 min and ping stragglers in `#general` |

**Success of phase:** instance full, audio clean, timer/bell tested.

---

## FRI — T+0 to T+14 · 5 Rotations

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 8:00 PM | Host | Rings bell, announces "Rotation 1 — 2 minutes — find your starting table" | All pairs at tables, ceiling timer counting down from 2:00 | If pair missing, host fills with co-host swap |
| 8:02 PM | Host | Bell · "Rotate clockwise to next table" | Pairs visibly shifted | If someone disconnects mid-rotation, host slots a 1:1 with co-host until they rejoin |
| 8:04 PM | Host | Bell · Rotation 2 | Timer reset, pairs reshuffled | Same as above |
| 8:06 PM | Host | Bell · Rotation 3 | — | — |
| 8:08 PM | Host | Bell · Rotation 4 | — | — |
| 8:10 PM | Host | Bell · Rotation 5 (final) | — | — |
| 8:12 PM | Host | Bell · "Rotations complete — stay for free chat or rejoin Discord" | Free-chat phase begins | — |
| 8:14 PM | Bot (Sesh) | Auto-posts Tally reveal-form link in `#post-event` with 36-hour deadline | Embed live, link tested | Manual post by host if Sesh delays |

**Success of phase:** 5 rotations done in ~14 min, reveal form is live.

---

## SAT AM — Reveal-Form Close

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 8:00 AM | Host | Reminder DM (Carl-bot template) to anyone who hasn't filled reveal form | Tally response count climbing | One reminder only — no spam |
| 12:00 PM | Host | Manually verify Tally response count >= 80% of 30 attendees | 24+ responses confirmed | If <80%, send final 2 PM warning |
| 8:00 PM | System | Tally form closes (configured deadline: Sat 8 PM) | Form submissions disabled | If a patron emails late, host has discretion to re-open for 30 min once |

**Success of phase:** form locked with majority of responses captured.

---

## SAT PM — Match Script Run

| Time | Actor | Action | Success signal | Fallback |
|------|-------|--------|----------------|----------|
| 9:00 PM | Host | Pulls Tally CSV/API export, drops into `events/{date}/reveal.json` | File exists, valid JSON | If Tally API hiccups, manual CSV download |
| 9:05 PM | System | `node match-script.js events/{date}/reveal.json` runs | Console prints `MATCHES: N · MUTUALS: N` and writes `events/{date}/dm-payload.json` | If script throws, host inspects offending row, re-runs after fix |
| 9:15 PM | Host | Iterates payload → Carl-bot DM-template fires per matched patron | Carl-bot logs DM-sent count = match count | If Carl-bot rate-limits, batch in 10s with 5-second sleep |
| 9:30 PM | Host | Posts aggregate-stats embed in `#mutual-matches` (zero names) | Embed shows `total_attendees · total_rotations · mutual_count` | Hard rule: no handles, no PII |
| 10:00 PM | Host | Updates `events/{date}/recap.md` with attendance + match rate + retention notes | File saved | — |

**Success of phase:** matches sent, public stats posted, recap logged. Cycle resets Wednesday.

---

## Universal Failure Triggers

- **Host crash:** co-host promotes to instance owner, host re-joins via invite from co-host.
- **Discord outage:** fall back to VRChat in-world voice + post-event email blast for reveal form.
- **Patreon sync stale:** manual `@Verified` add for any patron showing in Patreon admin but not Discord; resync within 24h.
- **Hostile attendee:** instant kick (host whitelist tool), document in `events/{date}/incidents.md`, ban from future raffles.

---

## File Layout (per event)

```
events/
  2026-05-01/
    groups.csv         # Thu balancing
    reveal.json        # Sat AM Tally export
    dm-payload.json    # Sat PM script output
    incidents.md       # any escalations
    recap.md           # post-event notes
```
