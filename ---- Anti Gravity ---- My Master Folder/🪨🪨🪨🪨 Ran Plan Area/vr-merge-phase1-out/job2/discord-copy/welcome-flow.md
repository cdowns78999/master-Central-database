# Cafe Vismo — Welcome Flow Copy

All copy below is paste-ready. Replace `{...}` tokens before posting.

---

## 1. Carl-bot Welcome DM (auto-fires on join)

```
☕ Welcome to Cafe Vismo, {user.mention}.

You just walked into a tiny weekly speed-dating event that happens
every Friday night in VRChat. Here's the door:

  1. Read the Code of Conduct → #code-of-conduct
  2. React with ✅ on that pinned message
  3. That unlocks #welcome-readme — which tells you exactly how to
     get into Friday's event.

If you're a Patreon backer, link your Patreon to Discord under
User Settings → Connections so the bot can hand you your tier role
({Table Reservation $5} / {Front Row $15} / {Host $30}).

We try to keep this space warm. Please keep it that way too.

— The Vismo Hosts
```

---

## 2. `#welcome-readme` — Pinned Post

```
☕  CAFE VISMO — START HERE  ☕

We are a Patreon-gated weekly speed-dating event inside VRChat.
30 patrons / event · 5 rotations × 2 minutes · post-event reveal form.

────────────────────────────────────────────────
HOW TO ATTEND THIS WEEK
────────────────────────────────────────────────

1. Become a patron at any tier:
   • $5  Table Reservation — guaranteed seat at the next event
   • $15 Front Row         — seat + early-instance access + VIP ping
   • $30 Host              — all of the above + co-host shadowing

2. If you're FREE (no patron tier), enter the Wednesday raffle:
   → #raffle drops a 24h GiveawayBot — react with 🌹 to enter
   → 30 winners drawn Thu 7 PM, DM'd by Carl-bot

3. Fill out the onboarding form (one time):
   → tally.so/r/{onboarding-form-id}

4. Watch #invite-drops on Friday at 7:30 PM — the nonce-locked
   La Barista invite link drops there for @Verified only.

5. Friday 8:00 PM — bell rings. 5 rotations of 2 minutes each.

6. Saturday morning — fill the reveal form
   (yes / friend / no per partner)
   → tally.so/r/{reveal-form-id}

7. Saturday night — if you matched, Carl-bot DMs you the handle.
   Aggregate stats post in #mutual-matches (no names, ever).

────────────────────────────────────────────────
CHANNEL MAP
────────────────────────────────────────────────

📣  STARTING POINT     · #welcome-readme · #code-of-conduct · #announcements
🎟️  EVENTS             · #raffle · #invite-drops · #post-event · #mutual-matches
💬  COMMUNITY          · #general · #intros · #cafe-talk
👑  PATRON LOUNGES     · #vip-lounge · #host-table
🛟  HELP                · #questions · #report-an-issue
🛠️  STAFF (hidden)     · #staff-only

────────────────────────────────────────────────
NEED HELP?
────────────────────────────────────────────────
Ping @Host in #questions. We're around most evenings PT.
```

---

## 3. `#raffle` — Pinned Post

```
🌹  WEEKLY SPEED-DATING RAFFLE  🌹

Every Wednesday at 7:05 PM PT, GiveawayBot fires here with 30 free seats
for Friday's Cafe Vismo event.

  HOW TO ENTER
  ────────────
  1. React with 🌹 on the GiveawayBot embed below.
  2. That's it. Drawing closes Thursday 7:05 PM PT.
  3. 30 winners get auto-pinged + DM'd by Carl-bot with onboarding link.

  RULES
  ─────
  • You must be @Verified (i.e. you've reacted ✅ on #code-of-conduct).
  • One entry per Discord account. Alts get banned.
  • No-shows lose raffle eligibility for 2 cycles.
  • Patrons (any tier) skip the raffle — your seat is automatic.

  WHY 30?
  ───────
  La Barista holds 32. We keep 2 host seats. 5 rotations × 6 pairs is
  the cleanest math. We split into 2 groups of 15 if needed.

Good luck.
```

---

## 4. `#invite-drops` — Format Template

```
🚪  FRIDAY {YYYY-MM-DD} — INVITE LIVE  🚪

Instance:   La Barista (Friends+)
Region:     {US-W | US-E | EU}
Owner:      {host_handle}
Co-host:    {cohost_handle}
Open at:    {7:30 PM PT}
Bell at:    {8:00 PM PT}

VRChat join link →  {nonce-locked-link}

⚠️  This link is nonce-locked to @Verified members only.
    Do not share outside this channel. Sharing = ban.

Drop a 👋 in this thread when you've made it into the cafe so
the host can do a head-count before the bell.
```

---

## 5. `#post-event` — Sesh Auto-Post Template

```
🌙  REVEAL FORM IS LIVE  🌙

Tonight's event wrapped at 8:14 PM PT. Thank you, {attendee_count} of you,
for making it warm in there.

  → Fill the reveal form (yes / friend / no per partner):
     tally.so/r/{reveal-form-id}

  → Form closes Saturday 8:00 PM PT. Hard close.

Saturday night, if any of your reveals are mutual, Carl-bot will
slide into your DMs with a handle. Aggregate stats — never names —
will post in #mutual-matches.

Sleep on it. Be honest. See you Wednesday for the raffle.
```

---

## 6. `#mutual-matches` — Aggregate Post Template (zero names)

```
📊  {YYYY-MM-DD} EVENT — AGGREGATE RESULTS  📊

  Total attendees:    {total_attendees}
  Total rotations:    {total_rotations}
  Mutual matches:     {mutual_count}

  Match rate:         {(mutual_count*2 / total_attendees * 100).toFixed(1)}%

DMs went out tonight at {timestamp}. If you matched, check Carl-bot.
If you didn't, that doesn't mean nothing happened — sometimes the
right person was in the other group. Wednesday raffle resets the deck.
```
