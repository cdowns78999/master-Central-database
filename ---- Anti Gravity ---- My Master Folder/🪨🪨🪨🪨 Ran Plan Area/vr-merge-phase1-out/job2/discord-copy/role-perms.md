# Cafe Vismo — Role Permissions

4 roles. Stack from bottom (least) to top (most). Patreon-sync handles tier roles automatically; @Verified is the reaction-gate role; @Host is hand-assigned.

---

## @Verified  (color: `#9aa6b2` slate-gray)

**How earned:** React ✅ on the pinned `#code-of-conduct` post. Carl-bot reaction-role auto-grants.

**Allow:**
- View Channels: STARTING POINT (all), EVENTS (all), COMMUNITY (all), HELP (all)
- Send Messages: COMMUNITY (#general, #intros, #cafe-talk), HELP (#questions, #report-an-issue)
- Read Message History: same as above
- Add Reactions: everywhere they can read
- Use External Emojis / Stickers: yes
- Speak / Stream in voice: in cafe-lobby voice channels only

**Deny:**
- Send Messages: STARTING POINT, EVENTS, PATRON LOUNGES, STAFF
- View Channels: PATRON LOUNGES, STAFF
- Mention @everyone / @here / roles
- Manage Threads, Manage Messages, Manage Channels

---

## @Table-Reservation  (color: `#2baac1` cafe-teal · Patreon $5 tier)

**How earned:** Patreon connection synced via Discord-Patreon bot. Auto-applied/removed on payment status change.

**Inherits from:** @Verified

**Adds:**
- View Channels: PATRON LOUNGES → #vip-lounge **read-only**
- Send Messages: same as @Verified (no new write channels)
- Reaction-priority on `#raffle` (still enters raffle but seat is *also* guaranteed each event — host pulls patron list first)
- Cosmetic: tier name color + role-icon ☕

**Deny:** Same as @Verified plus #host-table, #staff-only.

---

## @Front-Row  (color: `#ff7f54` cafe-orange · Patreon $15 tier)

**How earned:** Patreon $15 tier syncs.

**Inherits from:** @Table-Reservation

**Adds:**
- Send Messages: #vip-lounge (full write access)
- View Channels: #host-table **read-only** (can shadow host conversations)
- Early invite: 15-minute pre-drop ping in #invite-drops before main @Verified ping
- Custom emoji slot in tier (cosmetic)
- Vote weight ×2 in monthly world-tour polls

**Deny:** Send Messages in #host-table, #staff-only. No instance-owner privileges.

---

## @Host  (color: `#0f172a` near-black · Patreon $30 tier OR hand-assigned staff)

**How earned:** Patreon $30 tier OR direct staff appointment by lead host (max 4 staff hosts at any time).

**Inherits from:** @Front-Row

**Adds:**
- View + Send Messages: #host-table, #staff-only
- Manage Messages: COMMUNITY, HELP, EVENTS (delete spam, pin posts)
- Manage Threads: anywhere they can read
- Mute Members (voice): in event voice channels
- Move Members (voice): pull attendees into private voice for CoC arbitration
- Kick Members: yes (final-call authority during events)
- VRChat: instance-owner / co-host privileges in La Barista bookings
- Bot commands: `gstart`, `greroll`, Carl-bot DM-template firing, Sesh schedule edits

**Deny:**
- Ban Members (lead host only — keep escalation point clear)
- Manage Roles, Manage Server, Administrator (lead-host-only roles)
- Cannot self-grant @Host (must be applied by lead host)

---

## Channel Override Cheat-Sheet

| Channel              | @Verified | @Table-Reservation | @Front-Row | @Host |
|---------------------|-----------|---------------------|------------|-------|
| #welcome-readme     | R         | R                   | R          | RW+M  |
| #code-of-conduct    | R         | R                   | R          | RW+M  |
| #announcements      | R         | R                   | R          | RW+M  |
| #raffle             | R+react   | R+react+priority    | R+react    | RW+M  |
| #invite-drops       | R         | R                   | R+early    | RW+M  |
| #post-event         | R         | R                   | R          | RW+M  |
| #mutual-matches     | R         | R                   | R          | RW+M  |
| #general            | RW        | RW                  | RW         | RW+M  |
| #intros             | RW        | RW                  | RW         | RW+M  |
| #cafe-talk          | RW        | RW                  | RW         | RW+M  |
| #vip-lounge         | —         | R                   | RW         | RW+M  |
| #host-table         | —         | —                   | R          | RW+M  |
| #questions          | RW        | RW                  | RW         | RW+M  |
| #report-an-issue    | RW (private thread) | RW (private thread) | RW (private thread) | RW+M |
| #staff-only         | —         | —                   | —          | RW+M  |

Legend: `R` read · `RW` read+write · `M` manage messages/threads · `—` hidden.
