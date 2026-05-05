/* =========================================================
   VR BRIDGE — client-side logic
   - tabs
   - server health ping
   - voice: MediaRecorder -> /realtime-token -> WebSocket
   - invites: poll /invite-status every 5s
========================================================= */

const SERVER = "http://localhost:3000";
const WATCHLIST_KEY = "vrbridge.watchlist";
const PAUSED_KEY    = "vrbridge.paused";

/* -------- DOM handles -------- */
const $ = (id) => document.getElementById(id);

const els = {
  serverDot:        $("serverDot"),
  serverStatusText: $("serverStatusText"),

  // tabs
  tabs:       document.querySelectorAll(".tab"),
  tabPanels:  document.querySelectorAll(".tab-panel"),

  // voice
  micBtn:           $("micBtn"),
  micLabel:         $("micLabel"),
  langPicker:       $("langPicker"),
  latencyDisplay:   $("latencyDisplay"),
  youSaid:          $("youSaid"),
  translated:       $("translated"),
  voiceLog:         $("voiceLog"),

  // invites
  groupId:          $("groupId"),
  pauseBtn:         $("pauseBtn"),
  addFriendForm:    $("addFriendForm"),
  friendInput:      $("friendInput"),
  watchList:        $("watchList"),
  inviteLog:        $("inviteLog"),
};

/* -------- state -------- */
const state = {
  serverOnline: false,
  recording: false,
  mediaRecorder: null,
  mediaStream: null,
  ws: null,
  lastSpeakAt: 0,
  watchlist: loadWatchlist(),
  paused: localStorage.getItem(PAUSED_KEY) === "1",
  invitePollTimer: null,
};

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initVoice();
  initInvites();

  pingServer();
  setInterval(pingServer, 15000);

  renderWatchlist();
  renderPauseBtn();
  startInvitePolling();
});

/* =========================================================
   TABS
========================================================= */
function initTabs() {
  els.tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      els.tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      els.tabPanels.forEach(p => {
        p.classList.toggle("active", p.id === `tab-${target}`);
      });
    });
  });
}

/* =========================================================
   SERVER HEALTH
========================================================= */
async function pingServer() {
  try {
    const res = await fetch(`${SERVER}/health`, { method: "GET" });
    if (!res.ok) throw new Error("bad status");
    state.serverOnline = true;
    els.serverDot.className = "dot ok";
    els.serverStatusText.textContent = "Local server connected · localhost:3000";
  } catch (e) {
    state.serverOnline = false;
    els.serverDot.className = "dot err";
    els.serverStatusText.textContent = "⚠ Local server not running — see tutorial";
  }
}

/* =========================================================
   VOICE
========================================================= */
function initVoice() {
  els.micBtn.addEventListener("click", () => {
    if (state.recording) stopRecording();
    else startRecording();
  });
}

async function startRecording() {
  if (!state.serverOnline) {
    logVoice("Server offline — can't start.");
    return;
  }

  try {
    const tokenRes = await fetch(`${SERVER}/realtime-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetLang: els.langPicker.value }),
    });
    if (!tokenRes.ok) throw new Error("token fetch failed");
    const { token, wsUrl } = await tokenRes.json();

    // connect to OpenAI Realtime via WebSocket (the URL/protocol is server-supplied)
    if (wsUrl) {
      try {
        state.ws = new WebSocket(wsUrl, token ? ["realtime", `openai-insecure-api-key.${token}`] : undefined);
        state.ws.addEventListener("message", onRealtimeMessage);
        state.ws.addEventListener("error", () => logVoice("WebSocket error."));
        state.ws.addEventListener("close", () => logVoice("WebSocket closed."));
      } catch (err) {
        logVoice("WS connect failed: " + err.message);
      }
    }

    state.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mediaRecorder = new MediaRecorder(state.mediaStream, { mimeType: pickMime() });

    state.mediaRecorder.addEventListener("dataavailable", (e) => {
      if (e.data && e.data.size > 0 && state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(e.data);
      }
    });

    state.mediaRecorder.start(250); // 250ms chunks
    state.lastSpeakAt = performance.now();
    state.recording = true;
    els.micBtn.classList.add("recording");
    els.micLabel.textContent = "LISTENING…";
    logVoice("Recording started.");
  } catch (err) {
    logVoice("Mic error: " + err.message);
    stopRecording();
  }
}

function stopRecording() {
  try { state.mediaRecorder && state.mediaRecorder.stop(); } catch (e) {}
  if (state.mediaStream) state.mediaStream.getTracks().forEach(t => t.stop());
  try { state.ws && state.ws.close(); } catch (e) {}

  state.mediaRecorder = null;
  state.mediaStream = null;
  state.ws = null;
  state.recording = false;

  els.micBtn.classList.remove("recording");
  els.micLabel.textContent = "TAP TO SPEAK";
  logVoice("Recording stopped.");
}

function pickMime() {
  const opts = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", ""];
  for (const o of opts) {
    if (!o || MediaRecorder.isTypeSupported(o)) return o || undefined;
  }
  return undefined;
}

function onRealtimeMessage(ev) {
  let msg;
  try { msg = JSON.parse(ev.data); } catch { return; }

  // accept a small variety of shapes so it survives server tweaks
  if (msg.type === "transcript" || msg.type === "input") {
    els.youSaid.textContent = msg.text || msg.transcript || "—";
  } else if (msg.type === "translation" || msg.type === "output") {
    els.translated.textContent = msg.text || msg.translation || "—";
    const ms = Math.round(performance.now() - state.lastSpeakAt);
    updateLatency(ms);
    state.lastSpeakAt = performance.now();
    logVoice(`Translated (${ms}ms)`);
  } else if (msg.type === "error") {
    logVoice("Error: " + (msg.message || "unknown"));
  }
}

function updateLatency(ms) {
  const pill = els.latencyDisplay;
  if (ms < 800) {
    pill.textContent = `✅ ${ms}ms`;
    pill.className = "latency-pill";
  } else if (ms < 1600) {
    pill.textContent = `⚠️ ${ms}ms`;
    pill.className = "latency-pill warn";
  } else {
    pill.textContent = `⚠️ ${ms}ms`;
    pill.className = "latency-pill err";
  }
}

function logVoice(msg) { appendLog(els.voiceLog, msg); }

/* =========================================================
   INVITES
========================================================= */
function initInvites() {
  els.addFriendForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = els.friendInput.value.trim();
    if (!raw) return;
    if (state.watchlist.includes(raw)) {
      logInvite(`Already watching ${raw}`);
      els.friendInput.value = "";
      return;
    }
    state.watchlist.push(raw);
    saveWatchlist();
    renderWatchlist();
    logInvite(`Added ${raw}`);
    els.friendInput.value = "";
    pushWatchlistToServer();
  });

  els.pauseBtn.addEventListener("click", () => {
    state.paused = !state.paused;
    localStorage.setItem(PAUSED_KEY, state.paused ? "1" : "0");
    renderPauseBtn();
    fetch(`${SERVER}/invite-control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paused: state.paused }),
    }).catch(() => {});
    logInvite(state.paused ? "Paused." : "Resumed.");
  });
}

function renderPauseBtn() {
  els.pauseBtn.textContent = state.paused ? "▶ RESUME" : "⏸ PAUSE";
  els.pauseBtn.classList.toggle("paused", state.paused);
}

function renderWatchlist(serverStates = {}) {
  els.watchList.innerHTML = "";
  if (state.watchlist.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No friends watched yet — add a usr_ ID above.";
    els.watchList.appendChild(li);
    return;
  }
  state.watchlist.forEach(id => {
    const li = document.createElement("li");
    const online = !!serverStates[id];
    li.innerHTML = `
      <span class="friend-meta">
        <span class="online ${online ? "live" : ""}"></span>
        <span>${escapeHtml(id)}</span>
      </span>
      <button class="remove" data-id="${escapeHtml(id)}" title="Remove">✕</button>
    `;
    li.querySelector(".remove").addEventListener("click", () => {
      state.watchlist = state.watchlist.filter(x => x !== id);
      saveWatchlist();
      renderWatchlist(serverStates);
      logInvite(`Removed ${id}`);
      pushWatchlistToServer();
    });
    els.watchList.appendChild(li);
  });
}

function loadWatchlist() {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveWatchlist() {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
}

function pushWatchlistToServer() {
  fetch(`${SERVER}/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: state.watchlist }),
  }).catch(() => {});
}

function startInvitePolling() {
  if (state.invitePollTimer) clearInterval(state.invitePollTimer);
  pollInviteStatus();
  state.invitePollTimer = setInterval(pollInviteStatus, 5000);
}

async function pollInviteStatus() {
  if (!state.serverOnline) return;
  try {
    const res = await fetch(`${SERVER}/invite-status`);
    if (!res.ok) throw new Error("bad status");
    const data = await res.json();

    // group id
    if (data.groupId) els.groupId.textContent = data.groupId;

    // online map
    const online = data.online || {};
    renderWatchlist(online);

    // last invites
    if (Array.isArray(data.lastInvites)) {
      els.inviteLog.innerHTML = "";
      if (data.lastInvites.length === 0) {
        appendLog(els.inviteLog, "No invites sent yet.", { plainEmpty: true });
      } else {
        data.lastInvites.slice(-10).reverse().forEach(inv => {
          appendLog(els.inviteLog, `${inv.target || inv.id || "?"} → ${inv.result || "sent"}`, { ts: inv.at });
        });
      }
    }
  } catch (e) {
    // quiet — health ping already surfaces offline state
  }
}

function logInvite(msg) { appendLog(els.inviteLog, msg); }

/* =========================================================
   HELPERS
========================================================= */
function appendLog(ul, msg, opts = {}) {
  if (!ul) return;
  if (opts.plainEmpty) {
    ul.innerHTML = "";
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = msg;
    ul.appendChild(li);
    return;
  }
  // clear "empty" placeholders when a real entry lands
  const empty = ul.querySelector("li.empty");
  if (empty) empty.remove();

  const li = document.createElement("li");
  const ts = opts.ts ? new Date(opts.ts) : new Date();
  const hh = String(ts.getHours()).padStart(2, "0");
  const mm = String(ts.getMinutes()).padStart(2, "0");
  const ss = String(ts.getSeconds()).padStart(2, "0");
  li.innerHTML = `<span class="ts">${hh}:${mm}:${ss}</span>${escapeHtml(msg)}`;
  ul.prepend(li);
  // trim to 30
  while (ul.children.length > 30) ul.removeChild(ul.lastChild);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}
