import sys
sys.stdout.reconfigure(encoding='utf-8')

html = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>KOI // CONSOLE</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a14;
    --panel: #12121f;
    --panel-2: #181828;
    --panel-3: #1f1f33;
    --border: #2a2a44;
    --violet: #8b5cf6;
    --violet-2: #a78bfa;
    --cyan: #22d3ee;
    --green: #10b981;
    --text: #e2e8f0;
    --muted: #64748b;
  }
  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    top: -200px; left: 200px;
    width: 800px; height: 800px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  body::after {
    content: '';
    position: fixed;
    bottom: -300px; right: -100px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* HEADER */
  .topbar {
    position: relative;
    z-index: 10;
    height: 64px;
    background: rgba(18, 18, 31, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 28px 0 100px;
    gap: 24px;
  }
  .wordmark {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--text);
  }
  .wordmark .accent { color: var(--violet); }
  .wordmark .slash { color: var(--cyan); margin: 0 6px; }
  .search {
    flex: 1;
    max-width: 480px;
    margin: 0 auto;
    position: relative;
  }
  .search input {
    width: 100%;
    background: var(--panel-2);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 10px 14px 10px 38px;
    border-radius: 8px;
    font-size: 13px;
    outline: none;
    transition: border 0.2s;
  }
  .search input:focus { border-color: var(--violet); }
  .search::before {
    content: '⌕';
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    font-size: 16px;
  }
  .avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--violet), var(--cyan));
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: #0a0a14;
    border: 2px solid var(--panel);
  }

  /* LEFT RAIL */
  .rail {
    position: fixed;
    top: 0; left: 0;
    width: 80px;
    height: 100vh;
    background: #0d0d18;
    border-right: 1px solid var(--border);
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 0;
    gap: 8px;
  }
  .back-link {
    font-size: 9px;
    color: var(--muted);
    text-decoration: none;
    text-align: center;
    padding: 6px 4px;
    margin-bottom: 6px;
    line-height: 1.3;
    transition: color 0.2s;
    letter-spacing: 0.5px;
  }
  .back-link:hover { color: var(--cyan); }
  .rail-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--violet), #6d28d9);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800;
    color: #fff;
    font-size: 16px;
    margin-bottom: 14px;
    box-shadow: 0 0 18px rgba(139, 92, 246, 0.5);
  }
  .nav-btn {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 20px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    position: relative;
  }
  .nav-btn:hover {
    background: var(--panel-2);
    color: var(--text);
  }
  .nav-btn.active {
    background: rgba(139, 92, 246, 0.15);
    color: var(--violet-2);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 0 16px rgba(139, 92, 246, 0.35);
  }
  .nav-btn.active::before {
    content: '';
    position: absolute;
    left: -14px; top: 50%;
    transform: translateY(-50%);
    width: 3px; height: 24px;
    background: var(--violet);
    border-radius: 0 3px 3px 0;
    box-shadow: 0 0 10px var(--violet);
  }

  /* MAIN LAYOUT */
  .main-wrap {
    margin-left: 80px;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    padding: 24px 28px;
    position: relative;
    z-index: 1;
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, rgba(24, 24, 40, 0.95), rgba(18, 18, 31, 0.95));
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 60%; height: 100%;
    background: radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.18), transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: var(--violet-2);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 18px;
  }
  .hero-tag .pulse {
    width: 6px; height: 6px;
    background: var(--violet);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--violet);
    animation: pulse 1.6s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 28px;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .hero-img {
    width: 200px; height: 200px;
    border-radius: 16px;
    object-fit: cover;
    border: 2px solid rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
  }
  .hero-name {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: 4px;
    background: linear-gradient(135deg, #fff, var(--violet-2));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }
  .hero-meta {
    color: var(--muted);
    font-size: 12px;
    letter-spacing: 1.5px;
    margin-bottom: 22px;
    text-transform: uppercase;
  }
  .hero-meta .dot { color: var(--cyan); margin: 0 8px; }
  .stat-huge {
    font-family: 'Segoe UI', monospace;
    font-size: 84px;
    font-weight: 900;
    line-height: 1;
    color: var(--cyan);
    text-shadow:
      0 0 20px rgba(34, 211, 238, 0.6),
      0 0 40px rgba(34, 211, 238, 0.4),
      0 0 80px rgba(34, 211, 238, 0.2);
    letter-spacing: -3px;
    filter: drop-shadow(0 4px 16px rgba(34, 211, 238, 0.3));
  }
  .stat-huge-label {
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--muted);
    text-transform: uppercase;
    margin-top: 6px;
  }
  .signature-track {
    margin-top: 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(34, 211, 238, 0.06);
    border-left: 3px solid var(--cyan);
    border-radius: 6px;
    max-width: fit-content;
  }
  .signature-track .play {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--cyan);
    color: #0a0a14;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    font-weight: 700;
  }
  .signature-track .track-label {
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 1.5px;
  }
  .signature-track .track-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }

  /* CHART */
  .chart-block {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    position: relative;
    z-index: 1;
  }
  .chart-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }
  .chart-title {
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
  }
  .chart-trend {
    font-size: 11px;
    color: var(--green);
    font-weight: 600;
  }
  .bars {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    height: 130px;
  }
  .bar {
    flex: 1;
    background: linear-gradient(180deg, var(--violet), #5b21b6);
    border-radius: 6px 6px 2px 2px;
    position: relative;
    animation: grow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transform-origin: bottom;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
    min-height: 14px;
  }
  .bar:nth-child(1) { --h: 38%; animation-delay: 0.05s; }
  .bar:nth-child(2) { --h: 55%; animation-delay: 0.12s; }
  .bar:nth-child(3) { --h: 42%; animation-delay: 0.19s; }
  .bar:nth-child(4) { --h: 70%; animation-delay: 0.26s; }
  .bar:nth-child(5) { --h: 60%; animation-delay: 0.33s; }
  .bar:nth-child(6) { --h: 88%; animation-delay: 0.4s; background: linear-gradient(180deg, var(--cyan), #0891b2); box-shadow: 0 0 18px rgba(34, 211, 238, 0.5); }
  .bar:nth-child(7) { --h: 100%; animation-delay: 0.47s; background: linear-gradient(180deg, var(--cyan), #0891b2); box-shadow: 0 0 22px rgba(34, 211, 238, 0.6); }
  @keyframes grow {
    from { height: 0; opacity: 0; }
    to { height: var(--h); opacity: 1; }
  }
  .bar-label {
    position: absolute;
    bottom: -20px;
    left: 0; right: 0;
    text-align: center;
    font-size: 9px;
    color: var(--muted);
    letter-spacing: 1px;
  }

  /* METRIC STRIP */
  .metric-strip {
    margin-top: 24px;
    display: flex;
    gap: 16px;
  }
  .metric-tile {
    flex: 1;
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    transition: all 0.3s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .metric-tile::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--violet), var(--cyan));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .metric-tile:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.15);
  }
  .metric-tile:hover::after { opacity: 1; }
  .metric-icon {
    font-size: 18px;
    margin-bottom: 10px;
    color: var(--violet-2);
  }
  .metric-label {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .metric-value {
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.5px;
  }
  .metric-delta {
    font-size: 10px;
    color: var(--green);
    margin-top: 4px;
    font-weight: 600;
  }
  .metric-delta.down { color: #f87171; }

  /* RIGHT SIDEBAR */
  .compare {
    background: var(--panel-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.35);
    height: fit-content;
    position: sticky;
    top: 24px;
  }
  .compare-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34, 211, 238, 0.12);
    border: 1px solid rgba(34, 211, 238, 0.4);
    color: var(--cyan);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
  .compare-img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 16px;
    border: 1px solid var(--border);
  }
  .compare-name {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 1px;
    color: var(--text);
    margin-bottom: 4px;
  }
  .compare-genre {
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 18px;
  }
  .compare-stat {
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }
  .compare-stat:last-of-type { border-bottom: none; }
  .compare-stat-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .compare-stat-value {
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }
  .compare-stat.big .compare-stat-value {
    font-size: 26px;
    color: var(--violet-2);
    font-family: 'Segoe UI', monospace;
    text-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
  }
  .compare-track {
    margin-top: 16px;
    padding: 10px 12px;
    background: rgba(139, 92, 246, 0.08);
    border-left: 2px solid var(--violet);
    border-radius: 4px;
    font-size: 11px;
  }
  .compare-track .lbl {
    color: var(--muted);
    font-size: 8px;
    letter-spacing: 1.5px;
    display: block;
    margin-bottom: 2px;
  }

  .vs-divider {
    text-align: center;
    margin: 18px 0;
    position: relative;
  }
  .vs-divider::before {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 50%;
    height: 1px;
    background: var(--border);
  }
  .vs-divider span {
    background: var(--panel-2);
    padding: 0 12px;
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--cyan);
    position: relative;
    font-weight: 700;
  }
</style>
</head>
<body>

<!-- LEFT RAIL -->
<aside class="rail">
  <a href="pretty.html" class="back-link">← BACK<br>TO HUB</a>
  <div class="rail-logo">K</div>
  <button class="nav-btn active" title="Dashboard">▦</button>
  <button class="nav-btn" title="Artists">♪</button>
  <button class="nav-btn" title="Streams">⏵</button>
  <button class="nav-btn" title="Royalties">$</button>
  <button class="nav-btn" title="Analytics">⌬</button>
  <button class="nav-btn" title="Releases">◉</button>
  <button class="nav-btn" title="Tour">⌖</button>
  <button class="nav-btn" title="Settings">⚙</button>
</aside>

<!-- TOP BAR -->
<header class="topbar">
  <div class="wordmark">KOI<span class="slash">//</span><span class="accent">CONSOLE</span></div>
  <div class="search">
    <input type="text" placeholder="Search artists, tracks, royalty events...">
  </div>
  <div class="avatar">CD</div>
</header>

<!-- MAIN -->
<div class="main-wrap">

  <!-- HERO + METRICS -->
  <div>
    <section class="hero">
      <div class="hero-tag"><span class="pulse"></span>ACTIVE PROFILE</div>
      <div class="hero-grid">
        <img class="hero-img" src="https://picsum.photos/seed/koi-console/600/600" alt="KOI">
        <div>
          <div class="hero-name">KOI</div>
          <div class="hero-meta">FUTURE R&amp;B / ELECTRONIC POP <span class="dot">●</span> LOS ANGELES</div>
          <div class="stat-huge">2.4M</div>
          <div class="stat-huge-label">MONTHLY LISTENERS</div>
          <div class="signature-track">
            <div class="play">▶</div>
            <div>
              <div class="track-label">SIGNATURE TRACK</div>
              <div class="track-name">Velvet Hours</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-block">
        <div class="chart-head">
          <div class="chart-title">MONTHLY STREAMS TREND</div>
          <div class="chart-trend">▲ +28.4% vs last quarter</div>
        </div>
        <div class="bars">
          <div class="bar"><div class="bar-label">SEP</div></div>
          <div class="bar"><div class="bar-label">OCT</div></div>
          <div class="bar"><div class="bar-label">NOV</div></div>
          <div class="bar"><div class="bar-label">DEC</div></div>
          <div class="bar"><div class="bar-label">JAN</div></div>
          <div class="bar"><div class="bar-label">FEB</div></div>
          <div class="bar"><div class="bar-label">MAR</div></div>
        </div>
      </div>
    </section>

    <!-- METRIC STRIP -->
    <div class="metric-strip">
      <div class="metric-tile">
        <div class="metric-icon">⏵</div>
        <div class="metric-label">Total Streams</div>
        <div class="metric-value">48.2M</div>
        <div class="metric-delta">▲ +12.4%</div>
      </div>
      <div class="metric-tile">
        <div class="metric-icon">⌬</div>
        <div class="metric-label">Unique Listeners</div>
        <div class="metric-value">3.8M</div>
        <div class="metric-delta">▲ +6.1%</div>
      </div>
      <div class="metric-tile">
        <div class="metric-icon">⌖</div>
        <div class="metric-label">Top Country</div>
        <div class="metric-value">USA · 41%</div>
        <div class="metric-delta">▲ +2.0%</div>
      </div>
      <div class="metric-tile">
        <div class="metric-icon">◉</div>
        <div class="metric-label">Engagement Rate</div>
        <div class="metric-value">94.7%</div>
        <div class="metric-delta">▲ +0.8%</div>
      </div>
    </div>
  </div>

  <!-- RIGHT SIDEBAR: COMPARE -->
  <aside class="compare">
    <div class="compare-tag">▣ COMPARE</div>
    <img class="compare-img" src="https://picsum.photos/seed/elijah-console/300/300" alt="Elijah Osbourne">
    <div class="compare-name">ELIJAH OSBOURNE</div>
    <div class="compare-genre">INDIE FOLK · SINGER-SONGWRITER</div>

    <div class="compare-stat big">
      <div class="compare-stat-label">Monthly Listeners</div>
      <div class="compare-stat-value">185K</div>
    </div>
    <div class="compare-stat">
      <div class="compare-stat-label">Location</div>
      <div class="compare-stat-value">Portland</div>
    </div>
    <div class="compare-stat">
      <div class="compare-stat-label">Total Streams</div>
      <div class="compare-stat-value">2.1M</div>
    </div>
    <div class="compare-stat">
      <div class="compare-stat-label">Engagement</div>
      <div class="compare-stat-value">89.2%</div>
    </div>

    <div class="compare-track">
      <span class="lbl">SIGNATURE TRACK</span>
      Pacific Standard
    </div>

    <div class="vs-divider"><span>VS KOI</span></div>

    <div class="compare-stat">
      <div class="compare-stat-label">Listener Gap</div>
      <div class="compare-stat-value" style="color: var(--cyan);">−2.21M</div>
    </div>
  </aside>

</div>

</body>
</html>
"""

out_path = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi\TRUE MASTER\pretty-sample-3.html"

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)

import os
size = os.path.getsize(out_path)
lines = html.count('\n') + 1
print(f"WRITTEN: {out_path}")
print(f"LINES: {lines}")
print(f"BYTES: {size}")
print(f"EXISTS: {os.path.exists(out_path)}")
