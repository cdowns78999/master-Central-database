/* ========================================
   OBS Ticker Builder — app.js
   ======================================== */

// ---- DATA ----

const LISTS = {
  A: {
    label: 'A-List',
    themes: {
      granturismo: {
        name: 'Gran Turismo',
        font: "'Orbitron', sans-serif",
        bg: '#000',
        tickers: [
          { title: 'Race Lap', tag: 'fast · bold', speed: 4, color: '#ff2d2d', sep: '///', items: ['POLE POSITION', 'NURBURGRING', 'TURBO BOOST', '300KM/H', 'FINAL LAP', 'PIT STOP', 'CHECKERED FLAG', 'DRIFT KING'] },
          { title: 'Garage', tag: 'medium · clean', speed: 2, color: '#00d4ff', sep: '|', items: ['GTR R35', 'SUPRA MK4', 'PORSCHE 911', 'FERRARI 488', 'MCLAREN P1', 'LAMBO SVJ', 'ASTON MARTIN', 'BMW M4'] },
          { title: 'Speedometer', tag: 'crawl · glow', speed: 1, color: '#ffd000', sep: '\u25C6', items: ['\u26A1 TURBO', '\u{1F3CE}\uFE0F RACE DAY', '\u{1F3C1} FINISH LINE', '\u2699\uFE0F ENGINE', '\u{1F527} TUNED', '\u{1F4A8} NITRO', '\u{1F3C6} CHAMPION'] },
          { title: 'Track Names', tag: 'slow · mono', speed: 3, color: '#66ff66', sep: '\u25B8', items: ['MONZA', 'SUZUKA', 'LAGUNA SECA', 'SPA', 'SILVERSTONE', 'INTERLAGOS', 'MONACO', 'DAYTONA'] }
        ]
      },
      japanesefood: {
        name: 'Japanese Food',
        font: "'Noto Sans JP', sans-serif",
        bg: '#0a0000',
        tickers: [
          { title: 'Sushi Bar', tag: 'smooth · warm', speed: 2, color: '#ff6b35', sep: '\u{1F363}', items: ['\u{1F363} SALMON NIGIRI', 'TUNA SASHIMI', 'UNAGI ROLL', 'TAMAGO', 'HAMACHI', 'OMAKASE', 'MISO SOUP'] },
          { title: 'Ramen Shop', tag: 'medium · neon', speed: 3, color: '#ffdd00', sep: '\u2022', items: ['TONKOTSU', 'SHOYU', 'MISO RAMEN', 'CHASHU', 'AJITAMA EGG', 'NORI', 'NARUTO', 'GYOZA'] },
          { title: 'Izakaya', tag: 'slow · cozy', speed: 1, color: '#ff8fa0', sep: '\u273F', items: ['\u{1F376} SAKE', 'YAKITORI', 'EDAMAME', 'KARAAGE', 'TEMPURA', 'TAKOYAKI', 'OKONOMIYAKI'] },
          { title: 'Matcha', tag: 'fast · zen', speed: 4, color: '#7fff7f', sep: '\u2500', items: ['MATCHA LATTE', 'SENCHA', 'GYOKURO', 'HOJICHA', 'GENMAICHA', 'WAGASHI', 'MOCHI', 'DANGO'] }
        ]
      },
      cyberpunk: {
        name: 'Cyberpunk',
        font: "'Orbitron', sans-serif",
        bg: '#05000a',
        tickers: [
          { title: 'Neon Wire', tag: 'fast · glitch', speed: 4, color: '#ff00ff', sep: '//', items: ['NEURAL LINK', 'CHROME ARM', 'NIGHT CITY', 'NETRUNNER', 'ICE BREAKER', 'CYBER DECK', 'BLACKWALL'] },
          { title: 'Data Feed', tag: 'crawl · matrix', speed: 1, color: '#00ff88', sep: '\u2588', items: ['0xDEAD', 'SYS://RUN', 'DECRYPT', 'NODE_47', 'PACKET_LOSS', 'ROOT_ACCESS', 'FIREWALL', 'OVERCLOCK'] },
          { title: 'Synth Wave', tag: 'medium · glow', speed: 2, color: '#00d4ff', sep: '\u25C8', items: ['RETROWAVE', 'SYNTHWAVE', 'VAPORWAVE', 'OUTRUN', 'GRID RIDER', 'NEON SUNSET', 'CHROME HEART'] },
          { title: 'Corp News', tag: 'slow · clean', speed: 3, color: '#ffaa00', sep: '\u25AA', items: ['ARASAKA CORP', 'MILITECH INC', 'TRAUMA TEAM', 'NIGHT CORP', 'BIOTECHNICA', 'ORBITAL AIR', 'PETROCHEM'] }
        ]
      },
      retro: {
        name: 'Retro Arcade',
        font: "'Orbitron', sans-serif",
        bg: '#050010',
        tickers: [
          { title: 'High Score', tag: 'fast · pixel', speed: 4, color: '#ff0', sep: '\u2605', items: ['HIGH SCORE', '1UP', 'GAME OVER', 'INSERT COIN', 'PLAYER ONE', 'BONUS STAGE', 'POWER UP', 'COMBO x99'] },
          { title: 'Classics', tag: 'medium · retro', speed: 2, color: '#ff4444', sep: '\u25CF', items: ['PAC-MAN', 'GALAGA', 'DONKEY KONG', 'SPACE INVADERS', 'TETRIS', 'FROGGER', 'ASTEROIDS', 'CENTIPEDE'] },
          { title: 'Pixel Art', tag: 'slow · chill', speed: 1, color: '#88ffff', sep: '\u2591', items: ['\u2588\u2588 PIXEL', '\u2593\u2593 ART', '\u2592\u2592 MODE', '\u2591\u2591 ON', '8-BIT', '16-BIT', 'SPRITE', 'TILEMAP'] },
          { title: 'Boss Fight', tag: 'fast · intense', speed: 3, color: '#ff8800', sep: '\u26A0', items: ['BOSS FIGHT', 'FINAL FORM', 'SHIELD DOWN', 'CRITICAL HIT', 'DODGE ROLL', 'HEAL UP', 'RAGE MODE'] }
        ]
      }
    }
  },

  B: {
    label: 'B-List',
    themes: {
      valentine: {
        name: 'Valentine',
        font: "'Pacifico', cursive",
        bg: '#1a0010',
        tickers: [
          { title: 'Love Notes', tag: 'slow · dreamy', speed: 1, color: '#ff6b9d', sep: '\u2764', items: ['Be Mine', 'XOXO', 'Love You', 'Sweet Heart', 'Kiss Me', 'Forever Yours', 'My Valentine'] },
          { title: 'Candy Hearts', tag: 'medium · sweet', speed: 2, color: '#ff9ec6', sep: '\u2661', items: ['CUTE', 'HUG ME', 'TRUE LOVE', 'BE MINE', 'ANGEL', 'DREAM', 'BABE', 'HONEY'] },
          { title: 'Rose Garden', tag: 'crawl · elegant', speed: 1, color: '#ff4477', sep: '\u{1F339}', items: ['\u{1F339} Red Roses', '\u{1F33A} Hibiscus', '\u{1F337} Tulips', '\u{1F33B} Sunflower', '\u{1F338} Cherry Blossom', '\u2728 Sparkle', '\u{1F49D} Heart Box'] },
          { title: 'Date Night', tag: 'fast · fun', speed: 3, color: '#ffaacc', sep: '\u2726', items: ['Dinner Date', 'Movie Night', 'Stargazing', 'Slow Dance', 'Picnic', 'Love Letters', 'Chocolate'] }
        ]
      },
      pinkglam: {
        name: 'Pink Glam',
        font: "'Pacifico', cursive",
        bg: '#10000a',
        tickers: [
          { title: 'Glam Squad', tag: 'medium · glitter', speed: 2, color: '#ff69b4', sep: '\u2727', items: ['\u2728 SLAY', 'QUEEN', 'ICONIC', 'GLAM', 'FIERCE', 'STUNNING', 'GORGEOUS', 'FABULOUS'] },
          { title: 'Beauty Bar', tag: 'slow · soft', speed: 1, color: '#ffb6c1', sep: '\u2022', items: ['LIPGLOSS', 'HIGHLIGHT', 'CONTOUR', 'BLUSH', 'MASCARA', 'BROW GAME', 'GLOW UP', 'FLAWLESS'] },
          { title: 'Sparkle', tag: 'fast · pop', speed: 4, color: '#ff1493', sep: '\u2736', items: ['\u{1F48E} DIAMOND', '\u2728 SPARKLE', '\u{1F451} CROWN', '\u{1F31F} STAR', '\u{1F4AB} DIZZY', '\u{1F49C} PURPLE', '\u{1F49B} GOLD'] },
          { title: 'Aesthetic', tag: 'medium · vibe', speed: 3, color: '#dda0dd', sep: '\u223C', items: ['soft girl', 'coquette', 'dollette', 'balletcore', 'cottagecore', 'fairycore', 'angelcore'] }
        ]
      },
      cottagecore: {
        name: 'Cottagecore',
        font: "'Pacifico', cursive",
        bg: '#080804',
        tickers: [
          { title: 'Garden', tag: 'crawl · dreamy', speed: 1, color: '#a8d8a8', sep: '\u{1F33F}', items: ['\u{1F33F} Rosemary', '\u{1F33B} Sunflowers', '\u{1F343} Sage', 'Lavender', 'Honeysuckle', 'Wildflowers', 'Fern'] },
          { title: 'Baking', tag: 'slow · warm', speed: 2, color: '#e8c07a', sep: '\u2022', items: ['Sourdough', 'Honey Cake', 'Scones', 'Jam Tarts', 'Apple Pie', 'Shortbread', 'Cinnamon Rolls'] },
          { title: 'Cozy', tag: 'medium · soft', speed: 2, color: '#d4a0a0', sep: '\u2767', items: ['Linen Dress', 'Tea Time', 'Rainy Day', 'Candlelight', 'Old Books', 'Wool Socks', 'Pressed Flowers'] },
          { title: 'Woodland', tag: 'slow · earthy', speed: 1, color: '#8fbc8f', sep: '\u{1F344}', items: ['\u{1F344} Mushrooms', '\u{1F98B} Butterflies', '\u{1F41D} Honeybees', '\u{1F407} Bunny', '\u{1F98C} Deer', 'Acorns', 'Pinecones'] }
        ]
      },
      y2k: {
        name: 'Y2K',
        font: "'Inter', sans-serif",
        bg: '#08000f',
        tickers: [
          { title: 'Cyber Babe', tag: 'fast · chrome', speed: 4, color: '#c0c0ff', sep: '\u2606', items: ['\u{1F4F1} FLIP PHONE', 'LOW RISE', 'JUICY', 'BABY TEE', 'BUTTERFLY', 'BEDAZZLED', 'PLATFORM', 'VELOUR'] },
          { title: 'Pop Princess', tag: 'medium · bubbly', speed: 3, color: '#ff88cc', sep: '\u2665', items: ['BRITNEY', 'DESTINY', 'TLC', 'AALIYAH', 'NSYNC', 'SPICE GIRLS', 'BACKSTREET', 'PINK'] },
          { title: 'Tech', tag: 'slow · retro', speed: 1, color: '#88ffcc', sep: '>>>', items: ['AOL', 'AIM', 'MSN', 'MYSPACE', 'LIMEWIRE', 'NAPSTER', 'GEOCITIES', 'NEOPETS'] },
          { title: 'Bling', tag: 'fast · shiny', speed: 4, color: '#ffd700', sep: '\u2730', items: ['\u{1F48E} BLING', '\u2728 ICY', '\u{1F451} BOSS', 'CHROME', 'HOLOGRAPHIC', 'METALLIC', 'IRIDESCENT'] }
        ]
      }
    }
  }
};

const BORDERS = [
  { id: 'none',     label: 'None' },
  { id: 'solid',    label: 'Solid' },
  { id: 'glow',     label: 'Glow' },
  { id: 'double',   label: 'Double' },
  { id: 'dashed',   label: 'Dashed' },
  { id: 'gradient', label: 'Gradient' }
];

// ---- STATE ----

let currentList = 'A';
let currentTheme = null;
let currentBorder = 'none';

// ---- INIT ----

document.addEventListener('DOMContentLoaded', () => {
  renderListNav();
  renderBorderButtons();
  selectList('A');
});

// ---- LIST NAV ----

function renderListNav() {
  const nav = document.getElementById('list-nav-btns');
  nav.innerHTML = '';
  for (const key of Object.keys(LISTS)) {
    const btn = document.createElement('button');
    btn.className = 'list-btn';
    btn.textContent = LISTS[key].label;
    btn.dataset.list = key;
    btn.addEventListener('click', () => selectList(key));
    nav.appendChild(btn);
  }
}

function selectList(key) {
  currentList = key;
  document.querySelectorAll('.list-btn').forEach(b => b.classList.toggle('active', b.dataset.list === key));
  renderThemeButtons();
  const firstTheme = Object.keys(LISTS[key].themes)[0];
  selectTheme(firstTheme);
}

// ---- THEME BUTTONS ----

function renderThemeButtons() {
  const container = document.getElementById('theme-btns');
  container.innerHTML = '';
  const themes = LISTS[currentList].themes;
  for (const key of Object.keys(themes)) {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.textContent = themes[key].name;
    btn.dataset.theme = key;
    btn.addEventListener('click', () => selectTheme(key));
    container.appendChild(btn);
  }
}

function selectTheme(key) {
  currentTheme = key;
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === key));
  renderPreviews();
}

// ---- BORDER BUTTONS ----

function renderBorderButtons() {
  const container = document.getElementById('border-btns');
  container.innerHTML = '';
  for (const b of BORDERS) {
    const btn = document.createElement('button');
    btn.className = 'border-btn';
    btn.textContent = b.label;
    btn.dataset.border = b.id;
    btn.addEventListener('click', () => selectBorder(b.id));
    container.appendChild(btn);
  }
  selectBorder('none');
}

function selectBorder(id) {
  currentBorder = id;
  document.querySelectorAll('.border-btn').forEach(b => b.classList.toggle('active', b.dataset.border === id));
  renderPreviews();
}

// ---- RENDER PREVIEWS ----

function renderPreviews() {
  const grid = document.getElementById('preview-grid');
  grid.innerHTML = '';
  const theme = LISTS[currentList].themes[currentTheme];
  if (!theme) return;

  theme.tickers.forEach((ticker, i) => {
    const card = document.createElement('div');
    card.className = `preview-card border-${currentBorder}`;
    card.style.setProperty('--border-color', ticker.color);
    card.style.setProperty('--border-color2', shiftHue(ticker.color, 60));

    // Build repeated items for seamless scroll (duplicate the set)
    const segment = ticker.items.map(item =>
      `<span class="ticker-item" style="color:${ticker.color}">${esc(item)}</span><span class="ticker-sep" style="color:${ticker.color}">${esc(ticker.sep)}</span>`
    ).join('');
    const doubled = segment + segment;

    card.innerHTML = `
      <div class="card-header">
        <span class="card-title">${esc(ticker.title)}</span>
        <span class="card-tag">${esc(ticker.tag)}</span>
      </div>
      <div class="ticker-viewport speed-${ticker.speed}">
        <div class="ticker-track">${doubled}</div>
      </div>
      <div class="copy-section">
        <div class="copy-tabs">
          <button class="copy-tab active" data-tab="css" data-card="${i}">CSS</button>
          <button class="copy-tab" data-tab="html" data-card="${i}">HTML</button>
        </div>
        <div class="copy-box">
          <pre id="code-${i}">${esc(generateCSS(ticker, theme))}</pre>
          <button class="copy-btn" data-card="${i}">COPY</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Wire up copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = document.getElementById(`code-${btn.dataset.card}`);
      navigator.clipboard.writeText(pre.textContent).then(() => {
        btn.textContent = 'COPIED';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1500);
      });
    });
  });

  // Wire up tabs
  document.querySelectorAll('.copy-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const cardIdx = tab.dataset.card;
      const ticker = theme.tickers[cardIdx];
      const siblings = tab.parentElement.querySelectorAll('.copy-tab');
      siblings.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      const pre = document.getElementById(`code-${cardIdx}`);
      if (tab.dataset.tab === 'css') {
        pre.textContent = generateCSS(ticker, theme);
      } else {
        pre.textContent = generateHTML(ticker, theme);
      }
    });
  });
}

// ---- CODE GENERATORS ----

function generateCSS(ticker, theme) {
  const speeds = { 1: '35s', 2: '22s', 3: '14s', 4: '9s' };
  const borderCSS = getBorderCSS(ticker.color);

  return `/* OBS Browser Source — Custom CSS */
body {
  background-color: rgba(0, 0, 0, 0);
  margin: 0;
  overflow: hidden;
}
.ticker-viewport {
  height: 56px;
  overflow: hidden;
  background: ${theme.bg};
  display: flex;
  align-items: center;${borderCSS}
}
.ticker-track {
  display: inline-flex;
  white-space: nowrap;
  animation: scroll ${speeds[ticker.speed]} linear infinite;
  will-change: transform;
}
.ticker-item {
  font-family: ${theme.font};
  font-size: 18px;
  font-weight: 700;
  color: ${ticker.color};
  padding: 0 4px;
  line-height: 56px;
}
.ticker-sep {
  color: ${ticker.color};
  opacity: 0.35;
  padding: 0 12px;
  font-size: 12px;
  line-height: 56px;
}
@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`;
}

function generateHTML(ticker, theme) {
  const items = ticker.items.map(item =>
    `    <span class="ticker-item">${item}</span>\n    <span class="ticker-sep">${ticker.sep}</span>`
  ).join('\n');
  const doubled = items + '\n' + items;

  return `<!-- OBS Browser Source — HTML -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="ticker-viewport">
    <div class="ticker-track">
${doubled}
    </div>
  </div>
</body>
</html>`;
}

function getBorderCSS(color) {
  if (currentBorder === 'none') return '';
  const c = color;
  const c2 = shiftHue(c, 60);
  switch (currentBorder) {
    case 'solid':
      return `\n  border-top: 3px solid ${c};\n  border-bottom: 3px solid ${c};`;
    case 'glow':
      return `\n  border-top: 2px solid ${c};\n  border-bottom: 2px solid ${c};\n  box-shadow: 0 0 10px ${c}, inset 0 0 10px rgba(0,0,0,0.5);`;
    case 'double':
      return `\n  border-top: 4px double ${c};\n  border-bottom: 4px double ${c};`;
    case 'dashed':
      return `\n  border-top: 2px dashed ${c};\n  border-bottom: 2px dashed ${c};`;
    case 'gradient':
      return `\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  border-image: linear-gradient(90deg, ${c}, ${c2}) 1;`;
    default: return '';
  }
}

// ---- UTILS ----

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function shiftHue(hex, deg) {
  // Simple hue shift for gradient borders
  let r = parseInt(hex.slice(1, 3), 16) || 0;
  let g = parseInt(hex.slice(3, 5), 16) || 0;
  let b = parseInt(hex.slice(5, 7), 16) || 0;
  // Rotate RGB crudely
  const shift = deg / 360;
  const temp = r;
  r = Math.round(r * (1 - shift) + b * shift);
  b = Math.round(b * (1 - shift) + g * shift);
  g = Math.round(g * (1 - shift) + temp * shift);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}
