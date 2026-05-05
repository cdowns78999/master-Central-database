# Discord Blueprint — Cafe Vismo Speed Dating

Server name: **Cafe Vismo — Speed Dating**
Vibe: French cafe. Warm amber, cream, espresso brown. Light moderation, strong community norms.

---

## Roles (top to bottom)

| Role             | Source              | Color        | Access                                         |
|------------------|---------------------|--------------|------------------------------------------------|
| `@Owner`         | Manual (Chad/Vismo) | `#0f172a`    | Everything                                     |
| `@Host`          | Patreon $30 tier    | `#92400e`    | Green room, host-only, theme-vote              |
| `@Front Row`     | Patreon $15 tier    | `#f59e0b`    | Front-row lounge, guaranteed seats             |
| `@Table`         | Patreon $5 tier     | `#fbbf24`    | Event channels, raffle eligibility             |
| `@Waitlist`      | Manual (form opt-in)| `#d97706`    | Lobby + waitlist-only announcements            |
| `@Verified`      | Reaction / onboarding| `#10b981`   | Speak in lobby                                 |
| `@Muted`         | Mod action          | `#ef4444`    | Read-only                                      |

Patreon → Discord role sync is **automatic** via the official Patreon Discord integration. Failed payments auto-strip roles.

---

## Channel structure

```
📢  announcements           (read-only · owner posts only)
👋  welcome-readme          (rules, code of conduct, how it works)
❓  help                    (support questions)

🧾  CAFE RESERVATIONS       ─────────────────────
    #table-reservations     (Table+ · event signups, RSVPs)
    #raffle-room            (Table+ · raffle draws happen here)
    #event-invites          (Table+ · world drop link posts)

🪑  FRONT ROW               ─────────────────────
    #front-row-lounge       (Front Row+ · pre-show chat)
    #theme-night-rsvps      (Front Row+ · special events)

🎙   HOST GREEN ROOM        ─────────────────────
    #host-green-room        (Host only · emcee coordination)
    #theme-vote             (Host only · upcoming world votes)
    #founder-call           (Host only · monthly Q&A)

💬  COMMUNITY               ─────────────────────
    #lobby                  (Verified+ · general chat)
    #post-event-recap       (Table+ · debrief after each event)
    #mutual-matches         (auto-DM results posted as aggregate stats)
    #vrchat-help            (VRChat setup, avatars, headset tips)

🔊  VOICE
    Cafe Patio              (Verified+ · hangout)
    Event Staging           (Table+ · pre-event huddle)
    Host Green Room VC      (Host only)
```

---

## Bot stack

| Bot              | Purpose                                 | Cost |
|------------------|-----------------------------------------|------|
| **Patreon**      | Auto role-sync from tier to Discord     | $0   |
| **GiveawayBot**  | Raffle draws (30 slots, split groups)   | $0   |
| **Carl-bot**     | Reaction roles, automod, welcome flow   | $0   |
| **MEE6** (opt)   | Leveling + engagement rewards           | $0 base |
| **Sesh**         | Event scheduling + RSVP reminders       | $0 base |

Keep the stack free-tier. Don't introduce paid bots until revenue is steady.

---

## GiveawayBot raffle config

**Command template (run weekly by host):**

```
!ggiveaway create
  prize: "Seat at Friday's La Barista event — Group A (15)"
  winners: 15
  duration: 48h
  requirement: role @Table
  channel: #raffle-room
```

Run **two** giveaways in parallel: `Group A (15)` and `Group B (15)`. Host tags each entrant's onboarding-form tags when assigning; 15+15 split is manually balanced to guarantee orientation / gender / vibe mix (see `onboarding-form.md`).

Front Row patrons are pre-seated (10 guaranteed), so the raffle fills the remaining 20 slots.

---

## Automated flows

**On Patreon subscribe:**
1. Patreon bot assigns tier role
2. Carl-bot welcome DM → link to onboarding form
3. User fills form → `@Verified` added manually by mod after review
4. Sesh reminder: "Friday event RSVP open in `#table-reservations`"

**On event day (Friday):**
1. 10:00 AM — Sesh reminder in `#announcements`
2. 12:00 PM — GiveawayBot draws Group A + Group B in `#raffle-room`
3. 2:00 PM — Host posts onboarding-form tags review in `#host-green-room`
4. 30 min before event — invite link drop in `#event-invites`
5. Post-event — aggregate stats post in `#mutual-matches` (never individual names)

---

## Moderation ground rules

- No NSFW anywhere (Patreon-safe)
- No unsolicited DMs between patrons outside the post-event reveal flow
- Pronouns in nickname encouraged, not required
- Code of conduct posted in `#welcome-readme`, reaction-gated for `@Verified`
- Report button visible in every channel (Carl-bot `/report`)
