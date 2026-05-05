# JOB 4 — VR LANGUAGE BARRIER · RISK DOC

**Phase 1 Agent 4B output · 2026-04-27**
Scope: 3 critical risks identified in `VR-MERGE-PM-BRIEFS.md` Job 4 (lines 160–164). Each risk includes severity (1–5), likelihood (1–5), product impact, technical mitigation, policy/comms mitigation, monitoring signal, and kill-switch trigger. README disclosure template at end.

---

## RISK 1 · VRChat ToS Violation (Auto-Invite Bot)

**Risk statement:**
The `invite-bot.js` worker authenticates against `api.vrchat.cloud` with a real user's credentials, polls `/users/{id}` every 30s, and POSTs `/groups/{groupId}/invites` on offline→online flips. VRChat's Terms of Service and API Terms of Use prohibit "automated tools," "scripts," and "scraping" of the private API. The account running the bot can be permanently suspended without warning. There is no public, sanctioned automation tier for this endpoint.

**Severity: 5 / 5**
Account loss is total, irreversible, and contagious — VRChat has banned linked alts in the past. If the bot is run on Chad's main, the loss includes years of friends, groups, avatars, and group ownership. If run on a throwaway, severity drops but product credibility takes a hit ("the bridge got banned again").

**Likelihood: 3 / 5**
VRChat actively detects and bans automation, but enforcement is uneven. Bots that respect rate limits (30s+ poll, single session, realistic User-Agent) frequently survive months. Bots that hit `/groups/.../invites` are higher-risk than read-only scrapers because they generate visible spam complaints from invitees. Likelihood scales with WATCH_FRIEND_IDS count and how often friends report invites as unwanted.

**Product impact:**
- Bot dies → online-detection UX dies → Job 4 PATH step 2 (Yuki logs on, bot invites her) breaks
- Translation pipeline still works in a manually-shared instance, but the "magic" of presence-aware auto-invite is gone
- If a paying user's account gets banned, refund + reputation damage
- Public-launch risk: if VRChat issues a formal C&D after release, the product can't ship

**Mitigation — technical:**
1. **Throwaway-only enforcement:** README + onboarding wizard refuses to start if `VRCHAT_USERNAME` matches a saved "main account" pattern. Add a one-time prompt: "Type the word THROWAWAY to confirm this is not your main account."
2. **Conservative poll floor:** lock `POLL_MS` minimum at 30_000 in code (already done — keep it). Reject overrides below 30s.
3. **User-Agent honesty:** keep `VRBridge/0.1.0 <contact-email>` format per VRChat's API ToU — gives them a person to contact before banning.
4. **Cooldown is per-friend AND per-bot:** add a global floor of 1 invite per 60s across the whole bot (not just per-friend) to prevent burst spikes when 5 friends log on simultaneously.
5. **Status-flip dampening:** require a status to be stable for 2 polls (60s) before counting as "online" — kills false flips from VRChat status-API jitter.
6. **Graceful 401/403/429 handling:** on first 403 from `/groups/.../invites`, halt the bot, log "ToS-likely block — see README," and require manual restart.
7. **No DM, no friend-request automation, ever:** scope strictly to group invites for users who already accepted a friend request manually.

**Mitigation — policy / comms:**
1. **README "Known Risks" section** must be the FIRST H2 after the title — not buried.
2. **Pre-launch outreach:** email `support@vrchat.com` describing the project, the rate-limit posture, and asking for a sanctioned path. Document the response (or non-response) in `policy-correspondence.md`. Even a non-response shifts the conversation from "we hid" to "we asked."
3. **Onboarding consent flow:** user must check three boxes before the bot starts:
   - "I understand this may violate VRChat ToS."
   - "I am running this on a throwaway account I am willing to lose."
   - "I will not share generated invite links publicly."
4. **Public framing:** in marketing/landing copy, lead with the *translation bridge* (which is fully ToS-clean — it's just audio routing on the user's PC) and treat the invite-bot as an optional "convenience worker" the user opts into. Never headline the bot.
5. **Throwaway recipe:** ship a 1-page guide on creating a Steam alt + VRChat alt + group co-ownership transfer so users can adopt the bot without risking a main.

**Monitoring signal:**
- HTTP 401 on a request that previously returned 200 (cookie revoked) → likely manual ban
- HTTP 403 on `/groups/.../invites` while `/users/me` still returns 200 → endpoint-scoped ban or rate-limit
- HTTP 429 with `Retry-After` > 600s → soft-block, escalating
- Sustained ≥3 consecutive 5xx from the API → outage, not a ban; back off
- Surface all four signals in a `/invite-status` endpoint with a 7-day rolling history

**Kill-switch trigger:**
- Auto: any single 401 OR any single 403 on `/groups/.../invites` → bot halts, requires manual restart with explicit `--i-have-read-the-ban-warning` flag
- Manual: `/invite-control` POST `{ action: "stop" }` from the dashboard
- Project-wide: if any user reports a ban traceable to the bot, ship a v1.x release that disables the bot by default and requires explicit opt-in via env var (`VRCHAT_BOT_OPT_IN=I_ACCEPT_BAN_RISK=true`)

---

## RISK 2 · Quest IP Churn Breaks OSC After Reboot

**Risk statement:**
The chosen-path doc locks in OSC-over-LAN: PC sends UDP to `udp://<quest-ip>:9000`. Home routers running DHCP rotate Quest IPs on reboot, on lease expiry (typically 24h), and after Wi-Fi power-cycles. The bridge has no automatic re-discovery — user pastes the IP once, and silently breaks the next time the Quest reboots. Worst-case symptom: "it just stopped working" with no error message because UDP sends to a stale IP succeed at the socket level.

**Severity: 4 / 5**
Doesn't lose data, doesn't burn an account, but kills the product for users who can't debug network issues. Becomes the #1 support ticket (already flagged as such in `chosen-path.md` line 59). Each broken session = a non-renewing user.

**Likelihood: 5 / 5**
Will happen to every user, eventually. Median home router DHCP lease is 24h–7d. Quest reboots after every Meta OS update (monthly). Quest also gets a new IP after a Wi-Fi router reboot, which users do far more often than they admit.

**Product impact:**
- Translation works, audio routes, but Quest receives nothing → silent failure
- User assumes the *whole product* is broken, not just OSC routing
- Loss of trust on the "magic" demo (avatar speaking the other language) is unrecoverable in the moment
- Drives churn even on free tier; on paid tier, drives refunds

**Mitigation — technical:**
1. **Primary: mDNS / Bonjour / zeroconf publisher on PC + browser on Quest companion APK.** PC publishes `_vrbridge._udp.local` on its own LAN IP. Quest APK browses for it on launch. (See `quest-apk-blueprint.md` for the IP-discovery section.)
   - Use `bonjour-service` npm package on the PC side, or `mdns-responder` on Linux. macOS/Windows have native mDNS resolvers post-Win10.
2. **Secondary: auto re-resolve on send failure.** When a UDP send hits ENETUNREACH or no return ACK in 5s on a heartbeat OSC message (e.g., `/avatar/parameters/HeartbeatPing`), bridge fires mDNS browse cycle and updates target IP. Re-resolve is opportunistic — happens before user even notices.
3. **Tertiary: paste-in fallback.** Settings panel field for manual IP, persisted in `localStorage`. If both mDNS attempts fail in 30s, bridge surfaces a banner: "Quest IP not auto-detected. Open VRChat → Radial → OSC → Settings, find the IP under your network info, paste it here." Field accepts and validates `xxx.xxx.xxx.xxx` format.
4. **Heartbeat indicator:** a "last successful OSC send: 12s ago" pill in the bridge UI, green when <60s, amber 60–300s, red >300s. Already flagged in `chosen-path.md` line 63 as the "visible heartbeat" requirement.
5. **DHCP reservation guide:** README appendix on setting a static DHCP reservation for the Quest in the user's router admin panel — most consumer routers support it; one-time setup, permanent fix.

**Mitigation — policy / comms:**
1. **Tutorial video:** 90-second clip showing the heartbeat indicator going red, the user clicking "re-detect," and the indicator going green again. Ships as part of the onboarding flow.
2. **In-app status messaging:** never say "broken" or "error" — say "looking for Quest…" and show a spinner. Failure mode framed as a discovery step, not a defect.
3. **FAQ entry "My Quest disconnected after reboot":** top three sections — auto-detect (90% of cases), paste IP (8%), DHCP reservation (2%).
4. **Discord support channel:** if shipping with a Discord, dedicate a `#quest-network` channel with pinned IP-discovery walkthrough.

**Monitoring signal:**
- Time since last OSC ACK > 60s → amber state
- Three consecutive heartbeat fails (>180s) → red state, automatic re-discover triggered
- mDNS browse cycle returning zero results 3 times in a row → fallback to paste-in UI
- Optional telemetry (opt-in): record IP-change frequency per anonymized session ID to validate that mDNS catches >95% of churn events

**Kill-switch trigger:**
- N/A — there's nothing to kill. This is a recoverable failure mode. Kill-switch concept doesn't apply.
- Soft equivalent: if mDNS infrastructure on a user's network is broken (some corporate / locked-down routers block multicast), bridge falls back permanently to paste-in mode and surfaces a one-time "advanced mode" indicator.

---

## RISK 3 · API Key Exposure (Server CORS Audit)

**Risk statement:**
The bridge keeps OpenAI Realtime + ElevenLabs API keys server-side in `.env`, and exposes thin proxy endpoints (`/realtime-token`, `/tts`) to the browser. A misconfigured CORS policy, a forgotten dev-mode `Access-Control-Allow-Origin: *`, or a `console.log(process.env)` left in code can expose the raw keys to any visitor of the public landing page or to a malicious browser extension running on the user's machine. OpenAI Realtime keys can drain $1k+ in hours; ElevenLabs character credits drain similarly.

**Severity: 5 / 5**
Direct financial loss. OpenAI doesn't refund unauthorized usage automatically. Recovery requires key rotation, billing dispute, and rebuilding trust with users whose installs may have leaked.

**Likelihood: 2 / 5**
Low if the audit is done right. Goes to 4/5 if the team treats `localhost:3000` as "private" without realizing browser extensions and curl-from-CSRF can both reach it from the same machine, or if a hosted variant gets shipped without a tighter CORS lockdown.

**Product impact:**
- Single leak event = bridge bricked until keys rotate (every running install needs update)
- Public trust loss if the bridge is positioned as "we keep your keys safe"
- Potential personal financial liability for Chad if his keys are the ones leaking through a public proxy

**Mitigation — technical:**
1. **Strict CORS allowlist:** `app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true }))`. Reject `*`. Reject Origin headers not in the allowlist with 403 (not 200-with-empty).
2. **Helmet + CSP:** `helmet({ contentSecurityPolicy: { directives: { connectSrc: ["'self'", 'wss://api.openai.com', 'https://api.elevenlabs.io'] }}})`. Blocks data exfiltration to attacker domains via injected scripts.
3. **Token-mint pattern, not key-relay:** `/realtime-token` issues short-lived (1h) ephemeral OpenAI Realtime session tokens via the `client_secret` flow; never returns the master key. Same pattern is documented by OpenAI as the recommended browser-side path. ElevenLabs has a similar signed-URL pattern for streaming.
4. **Server-side audit checklist** (run before every release):
   - `grep -r "Access-Control-Allow-Origin" server/` → must show only allowlist entries
   - `grep -r "process.env" client/` → must return zero hits
   - `grep -r "console.log.*process.env" .` → zero hits
   - Build a `/health` response that echoes `keysLoaded: true/false` only, never the keys themselves
   - Smoke test: `curl -H "Origin: https://evil.com" http://localhost:3000/realtime-token` → must 403
5. **Rate-limit per IP and per session:** `express-rate-limit` capped at e.g. 30 requests / min on `/tts` and 5 / hour on `/realtime-token`. Limits bleed-through if a key proxy leaks.
6. **Key rotation playbook:** `ROTATION.md` with exact steps to revoke + reissue OpenAI + ElevenLabs keys, redeploy, force all clients to re-auth. 15-minute MTTR target.
7. **No persistent disk logging of request bodies:** logs scrub `Authorization` headers. Use `pino` with serializer redaction.
8. **`.env` in `.gitignore` enforced** + pre-commit hook (e.g., `gitleaks` or `trufflehog`) blocks accidental key commits.

**Mitigation — policy / comms:**
1. **Threat-model doc** (`SECURITY.md`) published before launch: scope = browser extensions, CSRF on localhost, supply-chain compromise of npm deps, public-deploy variant. Out-of-scope = local user with admin rights (can read `.env` directly; that's expected).
2. **Responsible-disclosure mailbox:** `security@<project-domain>` published in README. PGP key optional for v1.
3. **Public-deploy variant guard:** if anyone forks the project and deploys it to a public domain, the README's first warning is "DO NOT do this without rewriting CORS, adding per-user auth, and key-mint backend." Add a startup check: if `NODE_ENV=production` AND `process.env.PUBLIC_DEPLOY_OVERRIDE !== "I_HAVE_REWRITTEN_AUTH"`, the server refuses to bind to `0.0.0.0` — only `127.0.0.1`.

**Monitoring signal:**
- Any 403 returned by `/realtime-token` or `/tts` with an Origin header outside allowlist → log + alert
- Daily OpenAI usage exceeds rolling 7-day average + 3σ → alert
- ElevenLabs character credit drop >10% in 1h → alert
- Any commit to the repo containing strings matching `sk-[A-Za-z0-9]{20,}` or known ElevenLabs key prefixes → CI block (gitleaks)

**Kill-switch trigger:**
- Auto: rolling 1h spend on OpenAI > $10 → server stops accepting new `/realtime-token` requests; existing sessions allowed to finish
- Manual: `node scripts/kill.js` revokes all live sessions, returns 503 from token endpoint, logs reason
- Catastrophic: if leak confirmed → rotate keys, invalidate all client `localStorage`, force all clients to a "key rotation in progress" page, push v1.0.x patch within 24h

---

## TRANSPARENT README DISCLOSURE TEMPLATE

Drop this verbatim into the project README under an H2 titled **"Known Risks — Read Before Use"**. Place it ABOVE the install instructions, not below. Keep the bold, the warnings, and the "I understand" box.

```markdown
## Known Risks — Read Before Use

**This project ships with three risks that are real, documented, and your responsibility to accept.** This is not a disclaimer in legalese — it's an honest list of things that can go wrong.

### 1. The auto-invite bot may violate VRChat's Terms of Service.
VRChat prohibits automated clients. Running `invite-bot.js` can — and does, sometimes — get accounts permanently banned. Mitigations baked in (30-second polite poll, 1-hour cooldown, single session, contactable User-Agent) reduce the risk but do not eliminate it.

> **Use a throwaway account.** Not your main. Not the one with your friends and groups and avatars. A throwaway you are willing to lose. We refuse to help recover banned accounts.

### 2. Your Quest's IP address will change, and OSC will silently break.
Home routers reassign IPs on reboot. The bridge auto-detects the Quest via mDNS — when that fails, you'll see a red heartbeat indicator and a "re-detect" button. If your router blocks multicast (rare, but real on locked-down corporate networks), set a DHCP reservation; the README appendix shows how.

### 3. API keys live on your machine. Treat them like your debit card PIN.
The bridge keeps OpenAI and ElevenLabs keys server-side. They never reach the browser. CORS is locked to localhost. But: anyone with admin rights on your computer can read your `.env` file. Don't share screenshots of your terminal that include `.env`. Don't commit `.env` to git (it's gitignored, but still). Rotate keys monthly. If you see an unexpected charge, rotate immediately — `ROTATION.md` walks the steps.

---

**By installing this project, you confirm:**

- [ ] I am running the invite-bot on a throwaway VRChat account I am willing to lose.
- [ ] I have my own OpenAI and ElevenLabs accounts and accept responsibility for usage charges.
- [ ] I will not redistribute my `.env` file or the API keys it contains.

If you can't check all three, don't install this. Ask a friend who can to run it for you, or wait for a hosted version.
```

---

## SUMMARY TABLE

| # | Risk                          | Sev | Lik | Impact      | Kill-switch                       |
|---|-------------------------------|-----|-----|-------------|-----------------------------------|
| 1 | VRChat ToS — auto-invite bot  | 5   | 3   | account ban | 401/403 → halt, opt-in restart    |
| 2 | Quest IP churn — OSC silent   | 4   | 5   | UX broken   | N/A — recoverable, fall back paste-in |
| 3 | API key exposure — CORS audit | 5   | 2   | $$ leak     | rolling spend > $10/h auto-pause  |

**Composite risk priority:**
1. Risk 1 (sev × lik = 15) → start here, ban-prevention work pays off most
2. Risk 2 (sev × lik = 20) → highest math but lowest blast — recoverable
3. Risk 3 (sev × lik = 10) → cheapest to mitigate (CORS audit + token mint), do it once and it stays mitigated

Order of execution for Phase 5 hardening: **CORS audit first** (cheapest, biggest financial protection) → **mDNS + heartbeat** (UX win) → **bot consent flow + throwaway enforcement** (last line of defense for the riskiest feature).
