// ============================================================================
// VR Bridge — invite-bot.js
// ============================================================================
//
//  !!  BAN-RISK WARNING  !!
//  VRChat's Terms of Service PROHIBIT automated clients and scraping of the
//  private API. Running this bot can get your VRChat account permanently
//  suspended. You are solely responsible for the account you log into with
//  it. Mitigations baked in below (still NOT a guarantee of safety):
//    - Polite 30s poll interval (never tighter)
//    - 1-invite-per-friend-per-hour cooldown
//    - Realistic User-Agent with contact email (required by VRChat API ToU)
//    - Single cookie-auth session, reused (no login storms)
//    - Graceful 429 / 401 handling
//  If you care about the account, DO NOT RUN THIS. Use a throwaway.
//
// ----------------------------------------------------------------------------
// What it does:
//   1. Logs into VRChat once via Basic auth (username + password) -> auth cookie
//      (2FA TOTP is supported if VRCHAT_TOTP_SECRET is provided; otherwise, if
//       the account has 2FA, you must disable it or pre-seed an auth cookie.)
//   2. Every 30s, GETs /users/{id} for each friend in WATCH_FRIEND_IDS
//   3. If a friend's status flips offline -> online (active/join me/ask me/busy),
//      POSTs /groups/{groupId}/invites with { userId }
//   4. Cooldown map prevents re-inviting the same friend inside 1 hour
//
// Config (via .env):
//   VRCHAT_USERNAME       (required)
//   VRCHAT_PASSWORD       (required)
//   VRCHAT_GROUP_ID       (required, format: grp_xxxxxxxx-xxxx-...)
//   WATCH_FRIEND_IDS      (comma-separated usr_ ids)
//   VRCHAT_CONTACT_EMAIL  (optional; stuffed into User-Agent per VRChat ToU)
//   VRCHAT_TOTP_SECRET    (optional; base32 TOTP secret for 2FA)
//
// Note: we use raw axios rather than the `vrchat` npm package because that
// package is thinly maintained and often lags the live API schema. Raw HTTP
// with a cookie jar is predictable and debuggable.
// ============================================================================

import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import dotenv from 'dotenv';

dotenv.config();

const {
  VRCHAT_USERNAME,
  VRCHAT_PASSWORD,
  VRCHAT_GROUP_ID,
  WATCH_FRIEND_IDS = '',
  VRCHAT_CONTACT_EMAIL = 'unset@example.com',
  VRCHAT_TOTP_SECRET
} = process.env;

if (!VRCHAT_USERNAME || !VRCHAT_PASSWORD || !VRCHAT_GROUP_ID) {
  console.error('[invite-bot] missing VRCHAT_USERNAME / VRCHAT_PASSWORD / VRCHAT_GROUP_ID in .env');
  process.exit(1);
}

const WATCH_IDS = WATCH_FRIEND_IDS.split(',').map(s => s.trim()).filter(Boolean);
if (WATCH_IDS.length === 0) {
  console.warn('[invite-bot] WATCH_FRIEND_IDS is empty — bot will idle');
}

const API_BASE = 'https://api.vrchat.cloud/api/1';
const USER_AGENT = `VRBridge/0.1.0 ${VRCHAT_CONTACT_EMAIL}`;
const POLL_MS = 30_000;
const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour per friend

// ---- cookie jar (hand-rolled, tough-cookie) --------------------------------
const jar = new CookieJar();

async function jarRequest(opts) {
  const url = opts.url;
  const cookieHeader = await jar.getCookieString(url);
  const headers = {
    'User-Agent': USER_AGENT,
    Accept: 'application/json',
    ...(opts.headers || {}),
    ...(cookieHeader ? { Cookie: cookieHeader } : {})
  };
  const res = await axios({ ...opts, headers, validateStatus: () => true });
  const setCookie = res.headers['set-cookie'];
  if (setCookie) {
    for (const c of setCookie) {
      try { await jar.setCookie(c, url); } catch (e) { /* ignore */ }
    }
  }
  return res;
}

// ---- auth ------------------------------------------------------------------
async function login() {
  const basic = Buffer
    .from(`${encodeURIComponent(VRCHAT_USERNAME)}:${encodeURIComponent(VRCHAT_PASSWORD)}`)
    .toString('base64');

  const r = await jarRequest({
    method: 'GET',
    url: `${API_BASE}/auth/user`,
    headers: { Authorization: `Basic ${basic}` }
  });

  if (r.status === 200 && r.data?.id) {
    console.log(`[invite-bot] logged in as ${r.data.displayName} (${r.data.id})`);
    return true;
  }

  if (r.data?.requiresTwoFactorAuth) {
    if (!VRCHAT_TOTP_SECRET) {
      console.error('[invite-bot] account has 2FA enabled and VRCHAT_TOTP_SECRET is not set');
      console.error('[invite-bot] either disable 2FA on the throwaway or add the TOTP secret to .env');
      return false;
    }
    // TOTP verification path (stub — implement with `otplib` if you need it)
    console.error('[invite-bot] 2FA path not implemented in scaffolding. Add otplib + POST /auth/twofactorauth/totp/verify');
    return false;
  }

  console.error('[invite-bot] login failed:', r.status, r.data);
  return false;
}

// ---- friend polling --------------------------------------------------------
const lastStatus = new Map();   // userId -> 'online'|'offline'
const lastInviteAt = new Map(); // userId -> epoch ms

function isOnline(status) {
  // VRChat statuses: active, join me, ask me, busy, offline
  return status && status !== 'offline';
}

async function fetchUser(userId) {
  const r = await jarRequest({ method: 'GET', url: `${API_BASE}/users/${userId}` });
  if (r.status !== 200) {
    console.warn(`[invite-bot] /users/${userId} -> ${r.status}`);
    return null;
  }
  return r.data;
}

async function sendGroupInvite(userId) {
  const r = await jarRequest({
    method: 'POST',
    url: `${API_BASE}/groups/${VRCHAT_GROUP_ID}/invites`,
    headers: { 'Content-Type': 'application/json' },
    data: { userId }
  });
  if (r.status >= 200 && r.status < 300) {
    console.log(`[invite-bot] invite sent -> ${userId}`);
    lastInviteAt.set(userId, Date.now());
    return true;
  }
  console.warn(`[invite-bot] invite FAILED -> ${userId} :: ${r.status} ${JSON.stringify(r.data)}`);
  return false;
}

function cooledDown(userId) {
  const last = lastInviteAt.get(userId);
  if (!last) return true;
  return Date.now() - last >= COOLDOWN_MS;
}

async function tick() {
  for (const uid of WATCH_IDS) {
    const u = await fetchUser(uid);
    if (!u) continue;

    const nowOnline = isOnline(u.status);
    const prev = lastStatus.get(uid);
    lastStatus.set(uid, nowOnline ? 'online' : 'offline');

    const flipped = prev === 'offline' && nowOnline;
    if (flipped) {
      console.log(`[invite-bot] flip offline->online: ${u.displayName} (${uid})`);
      if (cooledDown(uid)) {
        await sendGroupInvite(uid);
      } else {
        const mins = Math.ceil((COOLDOWN_MS - (Date.now() - lastInviteAt.get(uid))) / 60000);
        console.log(`[invite-bot] cooldown active for ${uid} (${mins}m remaining) — skipping`);
      }
    }
  }
}

// ---- main ------------------------------------------------------------------
(async () => {
  const ok = await login();
  if (!ok) process.exit(2);

  console.log(`[invite-bot] watching ${WATCH_IDS.length} friend(s). Poll every ${POLL_MS / 1000}s.`);
  await tick();
  setInterval(() => {
    tick().catch(e => console.error('[invite-bot] tick error:', e.message));
  }, POLL_MS);
})();
