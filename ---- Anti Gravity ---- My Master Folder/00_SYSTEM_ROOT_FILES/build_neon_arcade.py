import sys
sys.stdout.reconfigure(encoding='utf-8')

OUT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi\TRUE MASTER\pretty-sample-5.html"

HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NEON ARCADE — KOI TONIGHT ONLY</title>
<style>
  /* ============================================================
     NEON ARCADE — Tokyo Game Center / Fortnite Festival rave
     ============================================================ */
  :root{
    --magenta:#ff2bd6;
    --magenta-2:#ff61e6;
    --lime:#c6ff00;
    --lime-2:#a4ff3f;
    --cyan:#00f0ff;
    --cyan-2:#5cf6ff;
    --bg:#1a0033;
    --bg-2:#0d001a;
    --white:#ffffff;
  }

  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{
    font-family:'Bebas Neue','Oswald','Impact','Arial Narrow Bold',sans-serif;
    background:var(--bg);
    color:#fff;
    min-height:100vh;
    overflow-x:hidden;
    position:relative;
    letter-spacing:0.04em;
  }

  /* diagonal scanlines on the background */
  body::before{
    content:"";
    position:fixed;inset:0;
    background:
      repeating-linear-gradient(
        45deg,
        rgba(255,43,214,0.04) 0 2px,
        transparent 2px 14px
      );
    pointer-events:none;
    z-index:1;
  }

  /* CRT overlay (1px lines, 2% opacity) */
  body::after{
    content:"";
    position:fixed;inset:0;
    background:repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.02) 0 1px,
      transparent 1px 3px
    );
    pointer-events:none;
    z-index:9999;
    mix-blend-mode:overlay;
  }

  /* central pulsing radial gradient */
  .pulse{
    position:fixed;inset:0;
    background:radial-gradient(circle at 50% 45%,
      rgba(255,43,214,0.25) 0%,
      rgba(0,240,255,0.08) 30%,
      rgba(26,0,51,0) 60%);
    animation:pulseGlow 5s ease-in-out infinite;
    transform-origin:center center;
    pointer-events:none;
    z-index:0;
  }
  @keyframes pulseGlow{
    0%,100%{transform:scale(1);opacity:0.85;}
    50%{transform:scale(1.05);opacity:1;}
  }

  /* tiny exit link, top-left */
  .exit-link{
    position:fixed;
    top:14px;left:18px;
    z-index:50;
    color:var(--lime);
    text-decoration:none;
    font-size:12px;
    letter-spacing:0.18em;
    padding:4px 8px;
    border:1px solid var(--lime);
    border-radius:3px;
    text-shadow:
      0 0 4px var(--lime),
      0 0 8px rgba(198,255,0,0.6),
      0 0 12px rgba(198,255,0,0.4);
    box-shadow:
      0 0 6px rgba(198,255,0,0.5),
      inset 0 0 6px rgba(198,255,0,0.2);
    transition:all 0.2s ease;
  }
  .exit-link:hover{
    background:rgba(198,255,0,0.15);
    box-shadow:0 0 12px var(--lime),inset 0 0 8px rgba(198,255,0,0.4);
  }

  /* ===== TOP MARQUEE ===== */
  .marquee{
    position:relative;
    z-index:5;
    overflow:hidden;
    border-top:1px solid rgba(255,43,214,0.3);
    border-bottom:1px solid rgba(255,43,214,0.3);
    background:linear-gradient(180deg,rgba(255,43,214,0.08),rgba(0,0,0,0.4));
    margin-top:48px;
    padding:14px 0;
  }
  .marquee-track{
    display:inline-block;
    white-space:nowrap;
    animation:scroll 22s linear infinite;
    font-size:36px;
    color:var(--magenta-2);
    text-shadow:
      0 0 4px var(--magenta),
      0 0 12px var(--magenta),
      0 0 24px rgba(255,43,214,0.6),
      0 0 48px rgba(255,43,214,0.3);
    letter-spacing:0.2em;
  }
  @keyframes scroll{
    from{transform:translateX(0);}
    to{transform:translateX(-50%);}
  }

  /* ===== MAIN STAGE ===== */
  .stage{
    position:relative;
    z-index:5;
    max-width:1280px;
    margin:0 auto;
    padding:48px 32px 80px;
    display:grid;
    grid-template-columns:2fr 1fr;
    gap:32px;
  }

  /* ===== KOI HEADLINER PANEL ===== */
  .headliner{
    position:relative;
    border:2px solid var(--magenta);
    background:linear-gradient(180deg,rgba(40,0,60,0.85),rgba(20,0,40,0.95));
    padding:36px 28px 32px;
    border-radius:8px;
    text-align:center;
    box-shadow:
      0 0 0 2px rgba(255,43,214,0.4),
      0 0 18px var(--magenta),
      0 0 36px rgba(0,240,255,0.5),
      0 0 56px rgba(198,255,0,0.35),
      0 0 80px rgba(255,255,255,0.18),
      inset 0 0 40px rgba(255,43,214,0.2);
    transition:all 0.3s ease;
    animation:headlinerHum 4s ease-in-out infinite;
  }
  @keyframes headlinerHum{
    0%,100%{
      box-shadow:
        0 0 0 2px rgba(255,43,214,0.4),
        0 0 18px var(--magenta),
        0 0 36px rgba(0,240,255,0.5),
        0 0 56px rgba(198,255,0,0.35),
        0 0 80px rgba(255,255,255,0.18),
        inset 0 0 40px rgba(255,43,214,0.2);
    }
    50%{
      box-shadow:
        0 0 0 2px rgba(255,43,214,0.6),
        0 0 28px var(--magenta),
        0 0 52px rgba(0,240,255,0.7),
        0 0 80px rgba(198,255,0,0.5),
        0 0 110px rgba(255,255,255,0.3),
        inset 0 0 60px rgba(255,43,214,0.32);
    }
  }
  .headliner:hover{animation-duration:1.2s;}

  .billing-tag{
    display:inline-block;
    font-size:13px;letter-spacing:0.4em;
    color:var(--cyan-2);
    text-shadow:0 0 6px var(--cyan),0 0 12px var(--cyan);
    border:1px solid var(--cyan);
    padding:4px 14px;border-radius:3px;
    margin-bottom:14px;
    background:rgba(0,240,255,0.08);
  }

  .koi-name{
    font-size:clamp(96px,14vw,200px);
    line-height:0.9;
    color:#fff;
    letter-spacing:0.12em;
    text-shadow:
      0 0 4px #fff,
      0 0 12px var(--magenta),
      0 0 28px var(--magenta),
      0 0 56px rgba(255,43,214,0.7),
      0 0 96px rgba(255,43,214,0.4);
    margin-bottom:8px;
  }

  .signature-track{
    font-size:28px;
    color:var(--lime);
    letter-spacing:0.15em;
    text-shadow:
      0 0 4px var(--lime),
      0 0 12px var(--lime),
      0 0 24px rgba(198,255,0,0.6),
      0 0 40px rgba(198,255,0,0.35);
    margin-top:8px;margin-bottom:18px;
  }

  .signature-track::before,.signature-track::after{
    content:"♪ ";opacity:0.7;
  }

  .stat-row{
    display:flex;justify-content:center;gap:32px;
    margin:18px 0 22px;
    flex-wrap:wrap;
  }
  .stat{
    text-align:center;
  }
  .stat-num{
    font-size:38px;
    color:var(--magenta-2);
    text-shadow:
      0 0 4px var(--magenta),
      0 0 10px var(--magenta),
      0 0 22px rgba(255,43,214,0.6),
      0 0 36px rgba(255,43,214,0.3);
  }
  .stat-label{
    font-size:11px;letter-spacing:0.3em;
    color:rgba(255,255,255,0.7);
    margin-top:2px;
  }

  .koi-photo{
    display:block;
    width:100%;
    max-width:520px;
    margin:8px auto 18px;
    aspect-ratio:4/3;
    object-fit:cover;
    border:1px solid rgba(255,43,214,0.5);
    filter:saturate(1.4) hue-rotate(15deg) contrast(1.05);
    box-shadow:
      0 0 18px rgba(255,43,214,0.4),
      0 0 36px rgba(0,240,255,0.25);
  }

  /* ===== ELIJAH PANEL ===== */
  .co-headliner{
    position:relative;
    border:2px solid var(--lime);
    background:linear-gradient(180deg,rgba(20,40,0,0.85),rgba(10,25,0,0.95));
    padding:24px 18px;
    border-radius:8px;
    text-align:center;
    box-shadow:
      0 0 0 2px rgba(198,255,0,0.4),
      0 0 14px var(--lime),
      0 0 28px rgba(0,240,255,0.4),
      0 0 44px rgba(255,43,214,0.25),
      inset 0 0 28px rgba(198,255,0,0.2);
    align-self:start;
    transition:all 0.3s ease;
  }
  .co-headliner:hover{
    box-shadow:
      0 0 0 2px rgba(198,255,0,0.65),
      0 0 22px var(--lime),
      0 0 44px rgba(0,240,255,0.5),
      0 0 70px rgba(255,43,214,0.35),
      inset 0 0 40px rgba(198,255,0,0.32);
  }

  .co-billing{
    display:inline-block;
    font-size:11px;letter-spacing:0.32em;
    color:var(--magenta-2);
    text-shadow:0 0 6px var(--magenta);
    border:1px solid var(--magenta);
    padding:3px 10px;border-radius:3px;
    margin-bottom:12px;
    background:rgba(255,43,214,0.08);
  }
  .co-name{
    font-size:48px;line-height:0.95;
    color:#fff;
    text-shadow:
      0 0 4px #fff,
      0 0 12px var(--lime),
      0 0 24px var(--lime),
      0 0 40px rgba(198,255,0,0.5);
    margin-bottom:6px;
  }
  .co-track{
    font-size:18px;
    color:var(--magenta-2);
    text-shadow:
      0 0 4px var(--magenta),
      0 0 10px var(--magenta),
      0 0 18px rgba(255,43,214,0.5);
    margin:8px 0 12px;
    letter-spacing:0.1em;
  }
  .co-track::before,.co-track::after{content:"♪ ";opacity:0.7;}

  .co-photo{
    width:100%;
    aspect-ratio:1/1;
    object-fit:cover;
    border:1px solid rgba(198,255,0,0.5);
    filter:saturate(1.4) hue-rotate(15deg) contrast(1.05);
    box-shadow:
      0 0 14px rgba(198,255,0,0.4),
      0 0 28px rgba(0,240,255,0.25);
    margin:8px 0 12px;
  }

  .co-meta{
    font-size:13px;color:rgba(255,255,255,0.75);
    letter-spacing:0.16em;
    margin-top:6px;
  }
  .co-meta span{display:block;margin:2px 0;}
  .co-stat-num{
    color:var(--lime);
    text-shadow:0 0 6px var(--lime),0 0 14px rgba(198,255,0,0.5);
    font-size:22px;
    margin-top:6px;
  }

  /* ===== SETLIST ROW ===== */
  .setlist{
    grid-column:1 / -1;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
    margin-top:8px;
  }
  .set-card{
    border:1px solid var(--cyan);
    background:rgba(0,30,40,0.6);
    padding:18px 14px;
    border-radius:6px;
    text-align:center;
    box-shadow:
      0 0 8px rgba(0,240,255,0.5),
      0 0 18px rgba(0,240,255,0.3),
      inset 0 0 14px rgba(0,240,255,0.15);
    transition:all 0.25s ease;
  }
  .set-card:hover{
    box-shadow:
      0 0 14px var(--cyan),
      0 0 28px rgba(0,240,255,0.5),
      inset 0 0 22px rgba(0,240,255,0.3);
    transform:translateY(-2px);
  }
  .set-num{
    font-size:14px;letter-spacing:0.3em;
    color:var(--cyan-2);
    text-shadow:0 0 4px var(--cyan),0 0 10px var(--cyan);
  }
  .set-title{
    font-size:22px;
    margin-top:6px;
    color:#fff;
    text-shadow:0 0 4px var(--cyan),0 0 10px rgba(0,240,255,0.6);
    letter-spacing:0.06em;
  }
  .set-time{
    font-size:11px;letter-spacing:0.24em;
    color:rgba(255,255,255,0.6);
    margin-top:6px;
  }

  /* ===== NEON BUTTONS (yuhomyan style) ===== */
  .button-row{
    grid-column:1 / -1;
    display:flex;justify-content:center;gap:24px;
    margin-top:8px;
    flex-wrap:wrap;
  }
  .neon-btn{
    position:relative;
    background:transparent;
    border:2px solid currentColor;
    padding:16px 32px;
    font:inherit;
    font-size:18px;letter-spacing:0.28em;
    cursor:pointer;
    border-radius:4px;
    text-transform:uppercase;
    transition:all 0.3s ease;
    text-shadow:
      0 0 4px currentColor,
      0 0 10px currentColor,
      0 0 22px currentColor;
    box-shadow:
      inset 0 0 6px rgba(255,255,255,0.1),
      0 0 6px currentColor,
      0 0 14px currentColor,
      0 0 28px currentColor,
      0 0 48px rgba(255,255,255,0.2);
  }
  .neon-btn.magenta{color:var(--magenta-2);}
  .neon-btn.lime{color:var(--lime);}
  .neon-btn.cyan{color:var(--cyan-2);}

  .neon-btn:hover{
    background:rgba(255,255,255,0.06);
    transform:translateY(-2px) scale(1.04);
    filter:saturate(1.5) brightness(1.15);
    box-shadow:
      inset 0 0 14px rgba(255,255,255,0.25),
      0 0 14px currentColor,
      0 0 28px currentColor,
      0 0 56px currentColor,
      0 0 90px currentColor;
    animation:btnPulse 0.8s ease-in-out infinite;
  }
  @keyframes btnPulse{
    0%,100%{filter:saturate(1.4) brightness(1.1);}
    50%{filter:saturate(1.7) brightness(1.3);}
  }

  /* footer-ish info row */
  .show-info{
    grid-column:1 / -1;
    text-align:center;
    margin-top:6px;
    font-size:13px;letter-spacing:0.34em;
    color:rgba(255,255,255,0.55);
  }
  .show-info b{
    color:var(--cyan-2);
    text-shadow:0 0 4px var(--cyan),0 0 10px var(--cyan);
    font-weight:normal;
  }

  /* responsive */
  @media (max-width:880px){
    .stage{grid-template-columns:1fr;padding:32px 18px 60px;}
    .setlist{grid-template-columns:repeat(2,1fr);}
    .marquee-track{font-size:26px;}
    .koi-name{font-size:84px;}
  }
</style>
</head>
<body>

  <div class="pulse"></div>

  <a class="exit-link" href="pretty.html">&#8617; EXIT</a>

  <!-- TOP MARQUEE -->
  <div class="marquee">
    <div class="marquee-track">
      KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot;&nbsp;
      KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot; KOI &middot; TONIGHT ONLY &middot;&nbsp;
    </div>
  </div>

  <main class="stage">

    <!-- KOI HEADLINER -->
    <section class="headliner">
      <span class="billing-tag">&#9733; HEADLINER &#9733;</span>
      <h1 class="koi-name">KOI</h1>
      <img class="koi-photo" src="https://picsum.photos/seed/koi-neon/800/600" alt="KOI live">
      <p class="signature-track">VELVET HOURS</p>
      <div class="stat-row">
        <div class="stat">
          <div class="stat-num">2,400,000</div>
          <div class="stat-label">MONTHLY LISTENERS</div>
        </div>
        <div class="stat">
          <div class="stat-num">LOS ANGELES</div>
          <div class="stat-label">HOME BASE</div>
        </div>
        <div class="stat">
          <div class="stat-num">FUTURE R&amp;B</div>
          <div class="stat-label">GENRE / ELECTRONIC POP</div>
        </div>
      </div>
    </section>

    <!-- ELIJAH CO-HEADLINER -->
    <aside class="co-headliner">
      <span class="co-billing">CO-HEADLINER</span>
      <h2 class="co-name">ELIJAH<br>OSBOURNE</h2>
      <img class="co-photo" src="https://picsum.photos/seed/elijah-neon/400/400" alt="Elijah Osbourne">
      <p class="co-track">PACIFIC STANDARD</p>
      <div class="co-meta">
        <span>INDIE FOLK / SINGER-SONGWRITER</span>
        <span>PORTLAND</span>
        <div class="co-stat-num">185,000</div>
        <span style="font-size:10px;opacity:0.7;">MONTHLY LISTENERS</span>
      </div>
    </aside>

    <!-- TONIGHT'S SETLIST -->
    <section class="setlist">
      <div class="set-card">
        <div class="set-num">SET 01</div>
        <div class="set-title">DOORS OPEN</div>
        <div class="set-time">19:00</div>
      </div>
      <div class="set-card">
        <div class="set-num">SET 02</div>
        <div class="set-title">ELIJAH OSBOURNE</div>
        <div class="set-time">20:15</div>
      </div>
      <div class="set-card">
        <div class="set-num">SET 03</div>
        <div class="set-title">KOI &mdash; HEADLINE</div>
        <div class="set-time">22:00</div>
      </div>
      <div class="set-card">
        <div class="set-num">SET 04</div>
        <div class="set-title">AFTER-HOURS</div>
        <div class="set-time">00:30</div>
      </div>
    </section>

    <!-- NEON BUTTONS -->
    <div class="button-row">
      <button class="neon-btn magenta">BUY TICKET</button>
      <button class="neon-btn lime">LISTEN NOW</button>
      <button class="neon-btn cyan">ADD TO LOCKER</button>
    </div>

    <p class="show-info">
      &#9670; <b>ARCADE HALL</b> &middot; ONE NIGHT &middot; ALL AGES &middot; DOORS 19:00 &diams;
    </p>

  </main>

</body>
</html>
"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)

import os
size = os.path.getsize(OUT)
lines = HTML.count("\n") + 1
print(f"WROTE: {OUT}")
print(f"BYTES: {size}")
print(f"LINES: {lines}")
