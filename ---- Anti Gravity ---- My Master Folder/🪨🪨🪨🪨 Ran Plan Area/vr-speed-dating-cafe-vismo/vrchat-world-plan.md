# VRChat World Plan — La Barista → Cafe Vismo

Two phases: **launch in an existing world** (La Barista), **commission a custom one** (Cafe Vismo) once revenue is steady.

---

## Phase 1 — La Barista (launch venue)

### Why La Barista
- Public, free, already built by a VRChat creator.
- French cafe aesthetic — warm amber lights, espresso tones, small two-seat tables.
- Low-poly enough to run on Quest standalone (critical for patron-accessibility).
- Seating naturally supports 2-person rotations.

### Instance management

- **Instance type:** `Invite+` (also called nonce-locked).
- Host spawns the instance, grabs the `vrchat://` deep-link, posts in `#event-invites`.
- Patrons click the link in Discord, auto-accept invite, spawn into the same instance.
- Non-patrons **cannot** join without the nonce even if they know the world name.

### Setup checklist

```
[ ] Verify La Barista is still public on VRChat (world ID bookmarked)
[ ] Host account has Trusted rank (required for Invite+ instance creation)
[ ] Test audio source — confirm cafe music loads for all joiners
[ ] Map out the 15 table positions for Group A vs Group B rotations
[ ] Pre-position host's "emcee" avatar accessory (clipboard, bell prop)
[ ] Assign a Trusted co-host as backup instance owner (if host disconnects)
```

### Rotation mechanics in the cafe

La Barista has **~15 two-seat tables** (confirm in a walkthrough). Group A sits on the left side, Group B on the right. Each rotation, Group A shifts one table clockwise. Host rings a bell at the counter to signal shuffle.

---

## Phase 2 — Cafe Vismo (custom commission)

Once ~50 patrons are stable, commission a custom world.

### Why commission
- Brand identity — the world IS the product.
- Feature control — custom timer clock, bell prop, nameplate tag display, reveal-room mechanics.
- Future-proof — extensible for theme nights (Autumn Cafe, Valentine's edition, etc.).
- Commission economics — one-time $200-500 is 4-6 months of Patreon-fee savings at 100 patrons.

### Commission brief (for the world builder)

**Theme:** French-cafe-meets-cozy-speakeasy. Warm amber (`#f59e0b`), cream (`#fef3c7`), espresso brown (`#7c2d12`), candlelight accents.

**Must-have features:**
1. **15 tables of 2 seats** arranged for easy clockwise rotation (no navigation puzzles).
2. **Central emcee platform** with bell trigger — host presses a button, audio bell plays for everyone in the instance.
3. **Ceiling timer** showing rotation countdown (2:00 → 0:00), synced across all clients.
4. **Nameplate tag display** — when a player sits, their onboarding-form tags float above their head for their table partner only.
5. **Reveal room** — a separate upstairs lounge where patrons can linger after rotations for the open Q&A.
6. **Audio zone gating** — voices carry between tables at a short radius (can't eavesdrop on the next table over).
7. **Background music layer** — low-volume French jazz / piano loop, independent of table audio.
8. **Quest-compatible** — poly budget respects Quest standalone performance targets.

**Nice-to-have:**
- Seasonal re-skinning hooks (swap textures for Autumn / Valentine's / Holiday)
- Photo booth corner for post-event group screenshot
- Optional "cafe cat" NPC for atmosphere

### Commission vendor options

| Vendor type           | Typical range | Notes                                         |
|-----------------------|---------------|-----------------------------------------------|
| Solo VRChat creator   | $200-500      | Best for MVP — find via VRChat Creator Discord |
| Established studio    | $800-2000     | Overkill until >200 patrons                   |
| Fiverr / generic Unity| $150-400      | Risk — often not VRChat-optimized             |

**Recommendation:** solo creator from the VRChat Creator Discord. Post a brief in `#commissions-wanted`, pick a creator whose existing worlds match the aesthetic.

### Timeline

- Week 1-2: Brief + creator sourcing
- Week 3-6: Build + iterate
- Week 7: QA test event (host + staff only)
- Week 8: Soft-launch with existing patrons
- Week 9: Full swap — all events now in Cafe Vismo

---

## Risks + mitigations

| Risk                                           | Mitigation                                       |
|------------------------------------------------|--------------------------------------------------|
| La Barista taken down / set private            | Backup venue pre-scouted (2-3 public cafe worlds)|
| Host loses instance (disconnect)               | Co-host assigned as backup instance owner        |
| Too many patrons for one instance (cap ~40)    | Split into parallel instances with 2 co-hosts    |
| Audio zone bleed (overhearing other tables)    | Test audio zones pre-event, adjust radius       |
| Quest patron performance drops                 | Limit avatar complexity, fallback avatar policy  |
