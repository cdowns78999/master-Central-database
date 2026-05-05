import sys
sys.stdout.reconfigure(encoding='utf-8')

OUT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi\TRUE MASTER\pretty-sample-4.html"

HTML = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>KOI // STUDIO — Glassmorph Sample 4</title>
<style>
  /* ---------- base ---------- */
  *,*::before,*::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  :root {
    --ink: #1f2330;
    --ink-soft: #4b5167;
    --ink-mute: #8a90a6;
    --hairline: rgba(31, 35, 48, 0.08);
    --glass: rgba(255, 255, 255, 0.58);
    --glass-strong: rgba(255, 255, 255, 0.72);
    --glass-dim: rgba(255, 255, 255, 0.42);
    --radius-lg: 24px;
    --radius-md: 18px;
    --radius-sm: 12px;
    --shadow-soft:
      0 1px 0 rgba(255,255,255,0.6) inset,
      0 24px 60px rgba(36, 42, 80, 0.10),
      0 6px 18px rgba(36, 42, 80, 0.06);
    --shadow-lift:
      0 1px 0 rgba(255,255,255,0.7) inset,
      0 36px 80px rgba(36, 42, 80, 0.16),
      0 12px 28px rgba(36, 42, 80, 0.10);
    --pill: 999px;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                 Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    color: var(--ink);
    line-height: 1.6;
    min-height: 100vh;
    background:
      linear-gradient(135deg, #ffe4e6 0%, #fde7d3 35%, #e0e7ff 100%);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* ---------- background blobs (the things glass blurs over) ---------- */
  .bg-blobs {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.78;
  }
  .blob.b1 {
    width: 520px; height: 520px;
    background: #ffb4c2;
    top: -120px; left: -120px;
  }
  .blob.b2 {
    width: 620px; height: 620px;
    background: #c4b5fd;
    bottom: -180px; right: -160px;
  }
  .blob.b3 {
    width: 380px; height: 380px;
    background: #fcd5a3;
    top: 38%; left: 42%;
    opacity: 0.55;
  }

  /* ---------- back-to-hub link ---------- */
  .back-link {
    position: fixed;
    top: 18px; left: 22px;
    z-index: 50;
    font-size: 12px;
    letter-spacing: 0.06em;
    color: var(--ink-soft);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: var(--pill);
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--hairline);
    transition: all 180ms ease;
  }
  .back-link:hover {
    color: var(--ink);
    background: rgba(255,255,255,0.78);
    transform: translateY(-1px);
  }

  /* ---------- shell ---------- */
  .shell {
    position: relative;
    z-index: 1;
    max-width: 1240px;
    margin: 0 auto;
    padding: 80px 36px 96px;
  }

  /* ---------- header ---------- */
  .topbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 6px 28px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--hairline);
  }
  .wordmark {
    font-weight: 500;
    font-size: 22px;
    letter-spacing: 0.02em;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .wordmark .dot {
    display: inline-block;
    width: 9px; height: 9px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff7a90, #b794f6);
    box-shadow: 0 0 12px rgba(183, 148, 246, 0.5);
  }
  .wordmark .slash { color: var(--ink-mute); margin: 0 2px; }
  .subtitle {
    margin-top: 6px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .topbar-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .cog {
    width: 38px; height: 38px;
    border-radius: 50%;
    display: grid; place-items: center;
    background: var(--glass);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--hairline);
    color: var(--ink-soft);
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease;
  }
  .cog:hover { transform: rotate(45deg); background: var(--glass-strong); }

  /* ---------- main grid ---------- */
  .layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 28px;
    align-items: start;
  }
  @media (max-width: 980px) {
    .layout { grid-template-columns: 1fr; }
    .insights { order: 2; }
  }

  /* ---------- card stack ---------- */
  .stack {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .card {
    position: relative;
    background: var(--glass);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid rgba(255,255,255,0.55);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    padding: 26px 28px;
    transition: transform 320ms cubic-bezier(.2,.7,.2,1),
                box-shadow 320ms ease;
    overflow: hidden;
  }
  .card::after {
    content: "";
    position: absolute; inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 40%);
  }
  .card:hover {
    transform: translateY(-3px) rotate(-0.6deg);
    box-shadow: var(--shadow-lift);
  }

  .card.focus {
    background: var(--glass-strong);
    padding: 32px 34px;
  }
  .card.dim {
    background: var(--glass-dim);
  }

  /* ---------- card head ---------- */
  .card-head {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 20px;
    align-items: center;
  }
  .avatar {
    width: 78px; height: 78px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255,255,255,0.85);
    box-shadow: 0 10px 24px rgba(36, 42, 80, 0.18);
    background: #eee;
  }
  .card.focus .avatar { width: 96px; height: 96px; }

  .name-block { min-width: 0; }
  .name {
    font-weight: 500;
    font-size: 22px;
    letter-spacing: 0.01em;
    margin: 0;
    line-height: 1.25;
  }
  .card.focus .name { font-size: 28px; }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 6px;
    font-size: 13px;
    color: var(--ink-soft);
  }
  .meta-row .sep {
    color: var(--ink-mute);
    opacity: 0.6;
  }
  .pin {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--ink-soft);
  }
  .pin svg { opacity: 0.7; }

  .status-pill {
    align-self: start;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: var(--pill);
    font-weight: 500;
    white-space: nowrap;
  }
  .status-pill.primary {
    background: linear-gradient(135deg, rgba(255,122,144,0.18), rgba(183,148,246,0.18));
    color: #b04a78;
    border: 1px solid rgba(176, 74, 120, 0.18);
  }
  .status-pill.secondary {
    background: rgba(255,255,255,0.55);
    color: var(--ink-soft);
    border: 1px solid var(--hairline);
  }

  /* ---------- centerpiece stat ---------- */
  .centerpiece {
    margin: 24px 0 4px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
  }
  .centerpiece .label {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .centerpiece .value {
    font-weight: 500;
    font-size: 44px;
    letter-spacing: -0.02em;
    color: var(--ink);
    line-height: 1.1;
  }
  .card.focus .centerpiece .value { font-size: 56px; }
  .centerpiece .value .suffix {
    font-size: 16px;
    color: var(--ink-mute);
    margin-left: 6px;
    letter-spacing: 0.04em;
  }
  .centerpiece .trend {
    font-size: 12px;
    color: #2f8f6e;
    background: rgba(47, 143, 110, 0.10);
    padding: 4px 10px;
    border-radius: var(--pill);
    letter-spacing: 0.04em;
  }

  /* ---------- mini metric row ---------- */
  .metric-row {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1px solid var(--hairline);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  @media (max-width: 600px) {
    .metric-row { grid-template-columns: repeat(2, 1fr); gap: 16px 0; }
  }
  .metric {
    padding: 0 18px;
    border-right: 1px solid var(--hairline);
  }
  .metric:last-child { border-right: none; }
  .metric:first-child { padding-left: 0; }
  .metric .m-label {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 6px;
  }
  .metric .m-value {
    font-size: 17px;
    font-weight: 500;
    color: var(--ink);
    letter-spacing: -0.005em;
  }
  .metric .m-sub {
    font-size: 11px;
    color: var(--ink-mute);
    margin-top: 2px;
  }

  /* ---------- right insights panel ---------- */
  .insights {
    position: sticky;
    top: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .panel {
    background: var(--glass);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid rgba(255,255,255,0.55);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    padding: 22px 22px;
    transition: transform 320ms cubic-bezier(.2,.7,.2,1), box-shadow 320ms ease;
  }
  .panel:hover {
    transform: translateY(-2px) rotate(0.5deg);
    box-shadow: var(--shadow-lift);
  }
  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .panel-title {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-mute);
    font-weight: 500;
  }
  .panel-date {
    font-size: 11px;
    color: var(--ink-mute);
  }
  .stat-line {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--hairline);
  }
  .stat-line:last-child { border-bottom: none; }
  .stat-line .sl-label {
    font-size: 13px;
    color: var(--ink-soft);
  }
  .stat-line .sl-value {
    font-weight: 500;
    color: var(--ink);
    font-size: 15px;
    letter-spacing: -0.005em;
  }
  .sparkline {
    margin-top: 12px;
    width: 100%;
    height: 64px;
    display: block;
  }
  .spark-foot {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--ink-mute);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ---------- footer ---------- */
  .foot {
    margin-top: 36px;
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
</style>
</head>
<body>

  <a class="back-link" href="pretty.html">&larr; back to PRETTY hub</a>

  <div class="bg-blobs" aria-hidden="true">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>
  </div>

  <div class="shell">

    <!-- HEADER -->
    <header class="topbar">
      <div>
        <div class="wordmark">
          <span class="dot"></span>
          KOI <span class="slash">//</span> STUDIO
        </div>
        <div class="subtitle">Artist roster &middot; April rotation</div>
      </div>
      <div class="topbar-right">
        <button class="cog" aria-label="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.86.07 1.83-.66 2.41"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- LAYOUT -->
    <div class="layout">

      <!-- LEFT: card stack -->
      <main class="stack">

        <!-- KOI focus card -->
        <article class="card focus">
          <div class="card-head">
            <img class="avatar" alt="KOI"
                 src="https://picsum.photos/seed/koi-glass/240/240" />
            <div class="name-block">
              <h2 class="name">KOI</h2>
              <div class="meta-row">
                <span>Future R&amp;B / Electronic Pop</span>
                <span class="sep">&middot;</span>
                <span>Signature: &ldquo;Velvet Hours&rdquo;</span>
                <span class="sep">&middot;</span>
                <span class="pin">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Los Angeles
                </span>
              </div>
            </div>
            <span class="status-pill primary">Primary</span>
          </div>

          <div class="centerpiece">
            <div>
              <div class="label">Monthly listeners</div>
              <div class="value">2,400,000<span class="suffix">/ mo</span></div>
            </div>
            <span class="trend">&uarr; 18.4% vs Mar</span>
          </div>

          <div class="metric-row">
            <div class="metric">
              <div class="m-label">Engagement</div>
              <div class="m-value">62.1%</div>
              <div class="m-sub">save / play ratio</div>
            </div>
            <div class="metric">
              <div class="m-label">Top market</div>
              <div class="m-value">Los Angeles</div>
              <div class="m-sub">14% of streams</div>
            </div>
            <div class="metric">
              <div class="m-label">Avg track length</div>
              <div class="m-value">3:24</div>
              <div class="m-sub">across catalog</div>
            </div>
            <div class="metric">
              <div class="m-label">Active playlists</div>
              <div class="m-value">487</div>
              <div class="m-sub">editorial &amp; user</div>
            </div>
          </div>
        </article>

        <!-- ELIJAH dim card -->
        <article class="card dim">
          <div class="card-head">
            <img class="avatar" alt="Elijah Osbourne"
                 src="https://picsum.photos/seed/elijah-glass/200/200" />
            <div class="name-block">
              <h2 class="name">Elijah Osbourne</h2>
              <div class="meta-row">
                <span>Indie Folk / Singer-Songwriter</span>
                <span class="sep">&middot;</span>
                <span>Signature: &ldquo;Pacific Standard&rdquo;</span>
                <span class="sep">&middot;</span>
                <span class="pin">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Portland
                </span>
              </div>
            </div>
            <span class="status-pill secondary">Secondary</span>
          </div>

          <div class="centerpiece">
            <div>
              <div class="label">Monthly listeners</div>
              <div class="value">185,000<span class="suffix">/ mo</span></div>
            </div>
            <span class="trend">&uarr; 4.2% vs Mar</span>
          </div>

          <div class="metric-row">
            <div class="metric">
              <div class="m-label">Engagement</div>
              <div class="m-value">48.7%</div>
              <div class="m-sub">save / play ratio</div>
            </div>
            <div class="metric">
              <div class="m-label">Top market</div>
              <div class="m-value">Portland</div>
              <div class="m-sub">9% of streams</div>
            </div>
            <div class="metric">
              <div class="m-label">Avg track length</div>
              <div class="m-value">4:12</div>
              <div class="m-sub">across catalog</div>
            </div>
            <div class="metric">
              <div class="m-label">Active playlists</div>
              <div class="m-value">96</div>
              <div class="m-sub">editorial &amp; user</div>
            </div>
          </div>
        </article>

        <!-- Filler card 1 -->
        <article class="card dim">
          <div class="card-head">
            <img class="avatar" alt="Mira Lune"
                 src="https://picsum.photos/seed/mira-glass/200/200" />
            <div class="name-block">
              <h2 class="name" style="font-size:19px;">Mira Lune</h2>
              <div class="meta-row">
                <span>Dream Pop / Synthwave</span>
                <span class="sep">&middot;</span>
                <span>Signature: &ldquo;Saltwater&rdquo;</span>
                <span class="sep">&middot;</span>
                <span class="pin">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Brooklyn
                </span>
              </div>
            </div>
            <span class="status-pill secondary">Watch</span>
          </div>
          <div class="centerpiece">
            <div>
              <div class="label">Monthly listeners</div>
              <div class="value" style="font-size:32px;">62,400<span class="suffix">/ mo</span></div>
            </div>
            <span class="trend">&uarr; 11.0% vs Mar</span>
          </div>
        </article>

        <!-- Filler card 2 -->
        <article class="card dim">
          <div class="card-head">
            <img class="avatar" alt="Atlas River"
                 src="https://picsum.photos/seed/atlas-glass/200/200" />
            <div class="name-block">
              <h2 class="name" style="font-size:19px;">Atlas River</h2>
              <div class="meta-row">
                <span>Alt R&amp;B / Soul</span>
                <span class="sep">&middot;</span>
                <span>Signature: &ldquo;North Window&rdquo;</span>
                <span class="sep">&middot;</span>
                <span class="pin">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Atlanta
                </span>
              </div>
            </div>
            <span class="status-pill secondary">Dev</span>
          </div>
          <div class="centerpiece">
            <div>
              <div class="label">Monthly listeners</div>
              <div class="value" style="font-size:32px;">28,900<span class="suffix">/ mo</span></div>
            </div>
            <span class="trend">&uarr; 6.8% vs Mar</span>
          </div>
        </article>

      </main>

      <!-- RIGHT: insights -->
      <aside class="insights">

        <section class="panel">
          <div class="panel-head">
            <span class="panel-title">Today</span>
            <span class="panel-date">Apr 25</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Streams (24h)</span>
            <span class="sl-value">312,408</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">New saves</span>
            <span class="sl-value">+1,847</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Playlist adds</span>
            <span class="sl-value">+34</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Press mentions</span>
            <span class="sl-value">3</span>
          </div>

          <svg class="sparkline" viewBox="0 0 320 64" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#b794f6" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#b794f6" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="sparkLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stop-color="#ff7a90" />
                <stop offset="100%" stop-color="#7c6cf0" />
              </linearGradient>
            </defs>
            <path d="M0,46 L24,40 L48,44 L72,32 L96,36 L120,28 L144,30 L168,22 L192,26 L216,18 L240,20 L264,12 L288,16 L320,8 L320,64 L0,64 Z"
                  fill="url(#sparkFill)" />
            <path d="M0,46 L24,40 L48,44 L72,32 L96,36 L120,28 L144,30 L168,22 L192,26 L216,18 L240,20 L264,12 L288,16 L320,8"
                  fill="none" stroke="url(#sparkLine)" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="spark-foot">
            <span>00:00</span>
            <span>now</span>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <span class="panel-title">Insights</span>
            <span class="panel-date">Live</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Roster size</span>
            <span class="sl-value">4 active</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Combined listeners</span>
            <span class="sl-value">2.68M</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Top mover</span>
            <span class="sl-value">KOI</span>
          </div>
          <div class="stat-line">
            <span class="sl-label">Next release</span>
            <span class="sl-value">May 09</span>
          </div>
        </section>

      </aside>

    </div>

    <div class="foot">KOI &middot; Studio &middot; Glassmorph sample 4</div>

  </div>

</body>
</html>
"""

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)

# verify
size = os.path.getsize(OUT)
with open(OUT, "r", encoding="utf-8") as f:
    lines = f.read().count("\n") + 1
print(f"WROTE: {OUT}")
print(f"BYTES: {size}")
print(f"LINES: {lines}")
