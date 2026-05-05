# VR Bridge — Chosen Path (Gate Doc)

**Date:** 2026-04-13
**Status:** LOCKED — decision made before any code changes

---

## Decision

**OSC LAN Bridge** — a small PC-side service that speaks OSC over the local Wi-Fi to VRChat running on the Meta Quest standalone. No APK install on the headset, no world-embed dependency.

Flow:

```
Input (text / STT / TTS trigger on PC)
        │
        ▼
  PC OSC sender ──► LAN (192.168.x.x:9000) ──► Quest (VRChat app) ──► Chatbox / avatar params
```

Quest enables OSC via **Radial Menu → Options → OSC → Enabled**. The bridge pushes to the Quest's LAN IP on port 9000 (VRChat's default receive port).

---

## Why this beats the other two paths

### vs. Companion Android APK (e.g. ScrapW/Chatbox, VRCCB)
- APK companions still end up sending **OSC over LAN** to a VRChat host — they don't actually run *inside* the Quest's VRChat process. You'd be building a phone keyboard, not a Quest bridge.
- Sideloading onto Quest is possible but fragile across Meta OS updates, and the app can't read VRChat state from another app's sandbox.
- Adds a second device (phone) to the hot path for zero gain over a direct PC bridge.

### vs. VRChat World Embed
- VRChat worlds can't execute arbitrary network code — Udon is sandboxed, no outbound sockets, no OSC receive from arbitrary endpoints.
- Ties the bridge to a specific world; user leaves the world, bridge dies.
- Content moderation / world-upload churn is a permanent tax.

### vs. OSC LAN Bridge (chosen)
- VRChat on Quest **natively supports OSC input over LAN** — this is the officially sanctioned extension surface.
- All three surveyed tools (TTS-Voice-Wizard, VRCSTT/HeyImKyu, MaurerKrisztian/vrc-tts-osc) converge on OSC as the delivery mechanism — proven pattern with reference implementations.
- PC does the heavy lifting (STT, TTS, routing); Quest just receives. No Quest-side install, no Meta policy risk.
- Same bridge works for PCVR and Quest — one codebase, two targets.

---

## Reference tools surveyed

| Tool | Platform | Delivery | Quest support |
|------|----------|----------|---------------|
| VRCWizard/TTS-Voice-Wizard | Windows / .NET | OSC chatbox + avatar text | Via LAN OSC only |
| HeyImKyu/VRCSTT | Windows / WPF | OSC chatbox (Azure STT) | Via LAN OSC only |
| MaurerKrisztian/vrc-tts-osc | Windows / Python | Virtual audio cable + OSC text | PC-tethered (virtual mic won't cross to Quest) |

Takeaway: every serious tool lands on OSC. The ones that also use virtual audio cables (vrc-tts-osc) lose Quest compatibility because virtual mics don't cross the LAN. **Pure OSC = Quest-compatible.**

---

## Top 3 Risks

1. **Quest IP drift.** Home router can reassign the Quest's LAN IP on reboot. Bridge needs either a discovery step (mDNS / broadcast) or a UI field the user re-pastes after reboots. Without this, "it just stopped working" is the #1 support ticket.

2. **VRChat OSC port collisions.** Port 9000 gets held by zombie VRChat processes, other OSC tools (VRCOSC, TaSTT), or SlimeVR. Bridge must detect bind failures cleanly and surface a readable error — not silently drop messages.

3. **Quest OSC toggle resets.** Users report the Radial Menu OSC toggle occasionally resets after VRChat updates or avatar changes. Bridge can't detect this remotely (no handshake), so we need a visible "last successful send" heartbeat in the UI so users know when the Quest-side switch has flipped off.

---

## Next step

Only after this doc is accepted: scaffold the PC-side OSC sender (Node or Python), target `udp://<quest-ip>:9000`, start with `/chatbox/input` as the proof-of-life message.
