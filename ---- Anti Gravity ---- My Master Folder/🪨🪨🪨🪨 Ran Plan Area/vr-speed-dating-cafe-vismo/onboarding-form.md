# Onboarding Form Spec — Pre-Event Intake

Every patron fills this once after subscribing. Host uses tags to balance the 15+15 raffle split.

Platform: **Tally** or **Google Forms** (free). Embed link in `#welcome-readme` and Carl-bot welcome DM.

---

## Section 1 — The basics

1. **Discord username** *(required, text)*
   Placeholder: `@yourname`

2. **Age** *(required, number, min 21)*
   Helper text: *We're a 21+ community. We do not share this; it's used for age-gating only.*

3. **Pronouns** *(required, short text)*
   Placeholder: `she/her · he/him · they/them · ...`

4. **Orientation** *(required, multi-select, private)*
   Options: `Straight · Gay · Lesbian · Bi · Pan · Queer · Ace-spectrum · Prefer not to say`
   Helper: *Used for group-balancing only. Never displayed publicly.*

---

## Section 2 — The vibe

5. **Pick 5 tags that describe you** *(required, multi-select, limit 5)*
   ```
   🎨 creative    📚 bookish      🎮 gamer        🎧 music-nerd
   🏞  outdoorsy   🧘 quiet        ⚡ chaotic      🌙 night-owl
   🍳 foodie      ✈️  traveler     🎭 performer    🧠 philosopher
   💻 techy       🌱 plant-parent  🐈 pet-person   🏋️  athlete
   📺 tv-obsessed 🎬 film-buff    🎲 tabletop     ☕ coffee-snob
   ```

6. **Your current vibe in one sentence** *(optional, short text)*
   Placeholder: `"New to VR, curious, bad at small talk but good at follow-up."`

7. **What are you hoping for?** *(required, single select)*
   - Romantic connection
   - Friendship / platonic
   - Open to either
   - Just here for the vibes / community

---

## Section 3 — Dealbreakers (private)

8. **Hard dealbreakers** *(optional, multi-select)*
   Options: `Smoker · Heavy drinker · No pets ever · Religious-specific · Kids-must-have · Kids-must-not-have · Long-distance-only-please-no · Other (text)`

9. **Topics you'd rather skip in small talk** *(optional, short text)*
   Placeholder: `Work-stress, exes, politics — anything you'd rather not get asked about in a 2-minute round.`

---

## Section 4 — Logistics

10. **Headset / VR setup** *(required, single select)*
    - Quest 2 / 3 / Pro
    - PCVR (Index, Vive, Rift S, etc.)
    - Desktop mode (no headset)
    - Mobile VRChat
    - Other

11. **Timezone** *(required, dropdown)*
    Standard timezone list. Used for event scheduling.

12. **VRChat username** *(required, short text)*
    Helper: *So we can invite you to the instance.*

13. **Consent to DM-based match reveal** *(required, checkbox)*
    > I consent to receiving a post-event DM with mutual-match results (yes / no / friend).

14. **Community agreement** *(required, checkbox)*
    > I've read the code of conduct and agree to keep interactions respectful, non-NSFW, and free of unsolicited DMs outside the reveal flow.

---

## Host-side usage

After submission, host tags each entrant in a private spreadsheet:

| Discord | Age | Pronouns | Orientation | Hoping-for | Tags (5) | Timezone | Notes |
|---------|-----|----------|-------------|------------|----------|----------|-------|
| ...     | ... | ...      | ...         | ...        | ...      | ...      | ...   |

**Group-balance rule:** For a 15+15 raffle, host ensures each group has:
- Balanced orientation mix (no group with zero same-orientation matches)
- Mixed "hoping for" intent (don't put all friendship-seekers in one group)
- Age range within ~10 years per group where possible
- Mixed tag variety (avoid a group of all `gamer + quiet`)

---

## Privacy

- Age and orientation are **never displayed publicly**.
- Tags and vibe-sentence are the only fields shown during events (on a round intro card).
- Form responses stored in a private Google Sheet; only Chad + Vismo have access.
- Patron can request deletion at any time via `#help` channel.
