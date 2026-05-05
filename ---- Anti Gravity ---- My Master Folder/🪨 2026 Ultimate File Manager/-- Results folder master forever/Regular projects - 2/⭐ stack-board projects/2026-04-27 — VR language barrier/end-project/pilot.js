// pilot.js — agent A6 — 5-message pilot test harness with per-event yes/no feedback + tally summary

(function () {
  const EVENTS = [
    { id: 1, kind: "mic to subtitle",  payload: 'mic input "konnichiwa" -> subtitle "hello"' },
    { id: 2, kind: "chat overlay",     payload: 'chat overlay rendered: "good game" -> "bonne partie"' },
    { id: 3, kind: "gesture cue",      payload: 'gesture cue: wave detected -> "greeting" emoji ping' },
    { id: 4, kind: "sign glyph",       payload: 'sign glyph displayed: ASL "thanks" -> printed glyph card' },
    { id: 5, kind: "voice to sign",    payload: 'voice "thank you" -> avatar sign animation played' },
  ];

  function ensureMount() {
    let host = document.getElementById("pilotResults");
    if (!host) {
      host = document.createElement("div");
      host.id = "pilotResults";
      document.body.appendChild(host);
    }
    return host;
  }

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "style" && typeof attrs[k] === "object") Object.assign(n.style, attrs[k]);
        else if (k === "text") n.textContent = attrs[k];
        else n.setAttribute(k, attrs[k]);
      }
    }
    for (const kid of kids) if (kid != null) n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    return n;
  }

  function askFeedback(host, ev) {
    return new Promise((resolve) => {
      const row = el("div", {
        style: {
          margin: "8px 0",
          padding: "10px 12px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          fontFamily: "system-ui, sans-serif",
          background: "#f8fafc",
        },
      });
      row.appendChild(el("div", { style: { fontWeight: "600", marginBottom: "4px" } }, "Event " + ev.id + " — " + ev.kind));
      row.appendChild(el("div", { style: { fontSize: "13px", color: "#475569", marginBottom: "8px" } }, ev.payload));
      row.appendChild(el("div", { style: { fontSize: "13px", marginBottom: "6px" } }, "did this help?"));

      const btnRow = el("div", { style: { display: "flex", gap: "8px" } });
      const yes = el("button", { style: { padding: "6px 14px", cursor: "pointer", border: "1px solid #10b981", background: "#10b981", color: "#fff", borderRadius: "6px" } }, "yes");
      const no  = el("button", { style: { padding: "6px 14px", cursor: "pointer", border: "1px solid #ef4444", background: "#ef4444", color: "#fff", borderRadius: "6px" } }, "no");

      function pick(answer) {
        yes.disabled = true; no.disabled = true;
        yes.style.opacity = answer === "yes" ? "1" : "0.45";
        no.style.opacity  = answer === "no"  ? "1" : "0.45";
        row.appendChild(el("div", { style: { marginTop: "6px", fontSize: "12px", color: "#334155" } }, "recorded: " + answer));
        resolve(answer);
      }
      yes.addEventListener("click", () => pick("yes"));
      no.addEventListener("click",  () => pick("no"));

      btnRow.appendChild(yes); btnRow.appendChild(no);
      row.appendChild(btnRow);
      host.appendChild(row);
    });
  }

  function renderSummary(host, tally) {
    const total = tally.yes + tally.no;
    const pct = total ? Math.round((tally.yes / total) * 100) : 0;
    const box = el("div", {
      style: {
        marginTop: "14px",
        padding: "12px 14px",
        border: "2px solid #0f172a",
        borderRadius: "10px",
        background: "#0f172a",
        color: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      },
    });
    box.appendChild(el("div", { style: { fontWeight: "700", marginBottom: "6px" } }, "Pilot Summary"));
    box.appendChild(el("div", { style: { fontSize: "13px" } }, "yes: " + tally.yes + "  /  no: " + tally.no + "  /  total: " + total));
    box.appendChild(el("div", { style: { fontSize: "13px", marginTop: "4px" } }, "helpfulness: " + pct + "%"));
    host.appendChild(box);
  }

  async function runPilot() {
    const host = ensureMount();
    host.innerHTML = "";
    host.appendChild(el("div", {
      style: { fontWeight: "700", fontSize: "15px", marginBottom: "8px", fontFamily: "system-ui, sans-serif" },
    }, "VR Language Barrier — Pilot Session (5 events)"));

    const tally = { yes: 0, no: 0, log: [] };
    for (const ev of EVENTS) {
      const ans = await askFeedback(host, ev);
      if (ans === "yes") tally.yes++; else tally.no++;
      tally.log.push({ id: ev.id, kind: ev.kind, answer: ans });
    }
    renderSummary(host, tally);
    return tally;
  }

  if (typeof window !== "undefined") {
    window.runPilot = runPilot;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { runPilot };
  }
})();
