# VR Speed Dating — Cafe Vismo

A Patreon-gated speed-dating event series inside VRChat, themed around the French cafe world **La Barista**, evolving into the custom-commissioned **Cafe Vismo**.

## The Insight

VR has both a **trust problem** and a **loneliness problem**. No one is stacking the right infrastructure to solve both at once. This project does.

## The Stack (at a glance)

| # | Tool         | Role                        | Cost to us           |
|---|--------------|-----------------------------|----------------------|
| 1 | VRChat       | Venue + avatars + voice     | $0 (free platform)   |
| 2 | Patreon      | Payment gate + tiers        | ~11% effective cut   |
| 3 | GiveawayBot  | Raffle / slot selection     | $0 (open-source)     |
| 4 | La Barista   | French cafe VRChat world    | Free → $200-500 custom |

See `stack-visual.txt` for the full 4-column business-model comparison.

## Core Mechanics

- **Patreon:** $5/mo "Table Reservation" tier → weekly event access
- **Discord:** role-gated by Patreon tier via auto-sync
- **Raffle:** 30 slots per event, split 15 + 15 for group balance (GiveawayBot)
- **Venue:** La Barista VRChat world, invite-only nonce-locked instance
- **Format:** 5 rotations × 2-minute rounds, emceed by host
- **Reveal:** mutual yes/no/friend via DM after event

## Economics

- Breakeven: **~3 patrons**
- 100 patrons = ~$445/mo net
- 1000 patrons = ~$4,450/mo net

## Files in this folder

| File                          | What it is                                           |
|-------------------------------|------------------------------------------------------|
| `stack-visual.txt`            | 4-column business-model comparison (centerpiece)     |
| `patreon-tiers.md`            | 3-tier copy + pricing + benefit matrix               |
| `discord-blueprint.md`        | Server structure, roles, bot stack, raffle config    |
| `onboarding-form.md`          | Pre-event intake form spec                           |
| `event-run-of-show.md`        | Minute-by-minute event playbook                      |
| `vrchat-world-plan.md`        | La Barista launch + Cafe Vismo custom brief          |
| `index.html`                  | Landing page: waitlist + 3 tier buttons              |

## Constraints (non-negotiable)

- **Patreon-safe** — no NSFW content anywhere in the funnel
- **French-cafe aesthetic** — warm amber, cream, espresso brown
- **Patreon auto-syncs Discord roles** — no manual access management
- **Raffle must be group-balanced** (15A + 15B) to guarantee orientation / gender mix
- All specs live in markdown; landing page is a single-file HTML
