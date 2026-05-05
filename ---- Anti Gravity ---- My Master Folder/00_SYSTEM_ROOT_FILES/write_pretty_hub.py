import sys, os
sys.stdout.reconfigure(encoding='utf-8')

OUT = r"C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\Koi\TRUE MASTER\pretty.html"

HTML = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>KOI // PRETTY HUB</title>
<style>
  :root{
    --bg:#1a1d28;
    --bg2:#22263312;
    --panel:#232735;
    --panel2:#2a2f40;
    --line:#343a4f;
    --ink:#eef0f7;
    --ink-dim:#9aa1b8;
    --accent:#a78bfa;
    --accent2:#22d3ee;
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}

  /* HEADER */
  .topbar{
    display:flex;align-items:center;justify-content:space-between;
    padding:18px 28px;border-bottom:1px solid var(--line);
    background:linear-gradient(180deg,#1f2231 0%,#1a1d28 100%);
    position:sticky;top:0;z-index:5;
  }
  .wordmark{
    font-weight:800;letter-spacing:.18em;font-size:14px;text-transform:uppercase;
    display:flex;align-items:center;gap:10px;
  }
  .wordmark .dot{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px var(--accent)}
  .back{
    font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-dim);
    padding:8px 14px;border:1px solid var(--line);border-radius:999px;transition:.15s;
  }
  .back:hover{color:var(--ink);border-color:var(--accent);background:#2a2f40}

  /* SUBTITLE */
  .subtitle{
    text-align:center;padding:28px 24px 10px;color:var(--ink-dim);font-size:14px;letter-spacing:.04em;
  }
  .subtitle b{color:var(--ink);font-weight:600}

  /* CAT PILL ROW */
  .cat-strip{
    display:flex;flex-wrap:wrap;gap:8px;justify-content:center;
    padding:8px 24px 22px;
  }
  .pill{
    font-size:11px;letter-spacing:.14em;text-transform:uppercase;
    padding:7px 14px;border-radius:999px;
    background:#262b3d;border:1px solid var(--line);color:var(--ink-dim);
    cursor:default;user-select:none;transition:.15s;
  }
  .pill:hover{color:var(--ink);border-color:#4a5170;background:#2c3247}

  /* CARD GRID */
  .grid{
    display:grid;
    grid-template-columns:repeat(5,minmax(220px,1fr));
    gap:16px;
    padding:14px 28px 36px;
    max-width:1480px;margin:0 auto;
  }
  @media (max-width:1200px){ .grid{grid-template-columns:repeat(3,1fr)} }
  @media (max-width:780px){ .grid{grid-template-columns:repeat(2,1fr)} }
  @media (max-width:520px){ .grid{grid-template-columns:1fr} }

  .card{
    display:flex;flex-direction:column;
    background:var(--panel);
    border:1px solid var(--line);
    border-radius:14px;overflow:hidden;
    min-height:280px;
    transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    position:relative;
  }
  .card:hover{
    transform:translateY(-4px);
    box-shadow:0 18px 40px -18px rgba(167,139,250,.45), 0 0 0 1px rgba(167,139,250,.35);
    border-color:rgba(167,139,250,.5);
  }
  .thumb{
    width:100%;height:148px;display:block;
    background-size:cover;background-position:center;
    filter:brightness(.78) saturate(1.05);
    transition:filter .18s ease, transform .25s ease;
  }
  .card:hover .thumb{ filter:brightness(1.05) saturate(1.15); transform:scale(1.03) }

  .card-body{
    padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;flex:1;
  }
  .label-mini{
    font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-dim);
  }
  .label-big{
    font-size:15px;font-weight:700;letter-spacing:.04em;line-height:1.25;color:var(--ink);
  }
  .label-big .num{color:var(--accent2);font-weight:600;margin-right:4px}
  .vibe{
    font-size:12px;color:var(--ink-dim);line-height:1.45;margin-top:auto;
  }
  .cta{
    margin-top:10px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;
    color:var(--accent);display:inline-flex;align-items:center;gap:6px;
  }
  .cta::after{content:"\2192";transition:transform .18s}
  .card:hover .cta::after{transform:translateX(4px)}

  /* FOOTER */
  .foot{
    text-align:center;padding:24px 24px 40px;color:var(--ink-dim);font-size:12px;letter-spacing:.06em;
    border-top:1px solid var(--line);max-width:1480px;margin:0 auto;
  }
  .foot b{color:var(--ink);font-weight:600;letter-spacing:.12em}
</style>
</head>
<body>

  <header class="topbar">
    <div class="wordmark"><span class="dot"></span> KOI // PRETTY HUB</div>
    <a class="back" href="dashboard.html">&larr; Back to Dashboard</a>
  </header>

  <p class="subtitle">Pick a sample to preview. Each is a complete HTML implementation styled per a community design inspiration.</p>

  <nav class="cat-strip" aria-label="Decorative category strip">
    <span class="pill">1 &middot; Streaming</span>
    <span class="pill">2 &middot; Branding</span>
    <span class="pill">3 &middot; Management</span>
    <span class="pill">4 &middot; Labels</span>
    <span class="pill">5 &middot; Distro</span>
    <span class="pill">6 &middot; Sync</span>
    <span class="pill">7 &middot; Royalties</span>
    <span class="pill">8 &middot; Publishing</span>
    <span class="pill">9 &middot; Touring</span>
  </nav>

  <section class="grid" aria-label="Sample previews">

    <a class="card" href="pretty-sample-1.html">
      <span class="thumb" style="background-image:url('https://picsum.photos/seed/locker/400/200')"></span>
      <div class="card-body">
        <span class="label-mini">html test 1</span>
        <span class="label-big"><span class="num">01</span>LOCKER</span>
        <span class="vibe">Fortnite Item Shop &middot; cyan-glow KOI hero.</span>
        <span class="cta">Preview</span>
      </div>
    </a>

    <a class="card" href="pretty-sample-2.html">
      <span class="thumb" style="background-image:url('https://picsum.photos/seed/discovery/400/200')"></span>
      <div class="card-body">
        <span class="label-mini">html test 2</span>
        <span class="label-big"><span class="num">02</span>DISCOVERY</span>
        <span class="vibe">Layered noir grid &middot; gold trending highlights.</span>
        <span class="cta">Preview</span>
      </div>
    </a>

    <a class="card" href="pretty-sample-3.html">
      <span class="thumb" style="background-image:url('https://picsum.photos/seed/web3console/400/200')"></span>
      <div class="card-body">
        <span class="label-mini">html test 3</span>
        <span class="label-big"><span class="num">03</span>WEB3 CONSOLE</span>
        <span class="vibe">Violet Web3 console &middot; giant stat hero.</span>
        <span class="cta">Preview</span>
      </div>
    </a>

    <a class="card" href="pretty-sample-4.html">
      <span class="thumb" style="background-image:url('https://picsum.photos/seed/glassmorph/400/200')"></span>
      <div class="card-body">
        <span class="label-mini">html test 4</span>
        <span class="label-big"><span class="num">04</span>GLASSMORPH</span>
        <span class="vibe">Frosted glass stack &middot; soft pastel calm.</span>
        <span class="cta">Preview</span>
      </div>
    </a>

    <a class="card" href="pretty-sample-5.html">
      <span class="thumb" style="background-image:url('https://picsum.photos/seed/neonarcade/400/200')"></span>
      <div class="card-body">
        <span class="label-mini">html test 5</span>
        <span class="label-big"><span class="num">05</span>NEON ARCADE</span>
        <span class="vibe">Magenta arcade marquee &middot; headliner energy.</span>
        <span class="cta">Preview</span>
      </div>
    </a>

  </section>

  <footer class="foot">
    Featured artists in every sample: <b>KOI</b> (primary) &middot; <b>ELIJAH OSBOURNE</b> (secondary) &middot; pick a winner to ship.
  </footer>

</body>
</html>
"""

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write(HTML)

size = os.path.getsize(OUT)
with open(OUT, "r", encoding="utf-8") as f:
    lines = sum(1 for _ in f)

print(f"WROTE: {OUT}")
print(f"BYTES: {size}")
print(f"LINES: {lines}")
