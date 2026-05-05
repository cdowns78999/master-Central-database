/**
 * WritingStandards — Sticky Note UI for WP Article Launcher
 * Self-contained JS module. All CSS injected via JS.
 * Usage: WritingStandards.init(containerElement)
 */
(function () {
  'use strict';

  const STYLE_ID = 'writing-standards-styles';
  const WP_BLUE = '#2271b1';
  const MUTED_GRAY = '#94a3b8';
  const YELLOW_BG = '#fef9c3';
  const PANEL_BG = '#fffef5';

  const STANDARDS_CONTENT = [
    {
      rule: 'RULE 1',
      title: 'THE FLOW',
      body: `Every article must read like a story, not a report.
The reader should feel pulled forward, sentence by sentence.
No dead paragraphs. No filler. Every line earns its place.`
    },
    {
      rule: 'RULE 2',
      title: 'THE STRUCTURE',
      body: `Follow the natural arc:`,
      list: [
        '→ Hook (why should I care?)',
        '→ Context (what\u2019s happening?)',
        '→ Depth (tell me more)',
        '→ Proof (show me the receipts)',
        '→ Close (leave me wanting more)'
      ]
    },
    {
      rule: 'RULE 3',
      title: 'HIGHLIGHTS FIRST',
      body: `Lead with the three strongest points.
Prioritize in this order:`,
      list: [
        '1. Cosigns, support, playlisting, press',
        '2. Performance stats (streams, growth, milestones)',
        '3. Story hooks (new era, comeback, debut, fan-favorite)'
      ]
    },
    {
      rule: 'RULE 4',
      title: 'THE VOICE',
      body: `Professional but not corporate. Confident but not cocky.
Write like a music journalist who genuinely respects the artist.
No hype clich\u00e9s. No \u201cbanger.\u201d No \u201cfire.\u201d No \u201cslaps.\u201d
Let the facts do the bragging.`
    },
    {
      rule: 'RULE 5',
      title: 'MESSY IN, CLEAN OUT',
      body: `Raw inputs will be messy, typo-filled, non-linear.
Your job: interpret, structure, elevate.
Preserve the user\u2019s specific phrases when they clearly care about them.
Everything else gets polished.`
    },
    {
      rule: 'RULE 6',
      title: 'INCREMENTAL BUILDING',
      body: `The article is a living document.
Each new input adds depth \u2014 never resets.
Shallow input = shallow first draft (that\u2019s OK).
More input = richer, deeper writing.
The article grows like a conversation.`
    },
    {
      rule: 'RULE 7',
      title: 'ABOUT THE SONG',
      body: '1\u20133 short paragraphs covering:',
      list: [
        '\u2022 Sound (genres, textures, energy, production)',
        '\u2022 Story/meaning (what it\u2019s about, what inspired it)',
        '\u2022 Context (where it fits in the catalog or era)',
        '\u2022 One \u201chook\u201d line (why this song matters right now)'
      ]
    },
    {
      rule: 'RULE 8',
      title: 'ABOUT THE ARTIST',
      body: '1\u20132 short paragraphs covering:',
      list: [
        '\u2022 Who they are and where they\u2019re from',
        '\u2022 Core sound and identity',
        '\u2022 Key career highlights',
        '\u2022 What this release represents'
      ]
    },
    {
      rule: 'RULE 9',
      title: 'LINKS AND MEDIA',
      body: `Embed links naturally \u2014 never dump a URL list.
Images get proper placement with context.
YouTube embeds get introduced, not just dropped.
Every media element should feel intentional.`
    },
    {
      rule: 'RULE 10',
      title: 'THE FINAL TEST',
      body: `Read it out loud. If it sounds like a robot wrote it, rewrite.
If a sentence doesn\u2019t move the story forward, cut it.
If you wouldn\u2019t send it to a journalist, it\u2019s not done.`
    }
  ];

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* ===== Paper-fold entrance ===== */
      @keyframes ws-paper-fold-in {
        0% {
          opacity: 0;
          transform: rotate(2deg) scale(0.7) perspective(400px) rotateY(-15deg);
        }
        60% {
          opacity: 1;
          transform: rotate(2deg) scale(1.03) perspective(400px) rotateY(2deg);
        }
        100% {
          opacity: 1;
          transform: rotate(2deg) scale(1) perspective(400px) rotateY(0deg);
        }
      }

      /* ===== Sticky Note (collapsed) ===== */
      .ws-sticky {
        position: absolute;
        bottom: 24px;
        right: 24px;
        width: 180px;
        padding: 14px 16px;
        background: ${YELLOW_BG};
        border-radius: 6px;
        box-shadow: 2px 3px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06);
        transform: rotate(2deg);
        cursor: pointer;
        user-select: none;
        z-index: 900;
        animation: ws-paper-fold-in 0.6s ease-out both;
        transition: box-shadow 0.25s ease, transform 0.25s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .ws-sticky:hover {
        box-shadow: 3px 5px 18px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08);
        transform: rotate(1deg) scale(1.03);
      }
      .ws-sticky-icon {
        font-size: 18px;
        margin-right: 6px;
      }
      .ws-sticky-label {
        font-size: 13px;
        font-weight: 600;
        color: #44403c;
        line-height: 1.4;
      }

      /* ===== Overlay backdrop ===== */
      .ws-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.8s ease-out;
      }
      .ws-overlay.ws-open {
        opacity: 1;
        pointer-events: auto;
      }

      /* ===== Expanded panel ===== */
      .ws-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 92vw;
        max-width: 600px;
        max-height: 80vh;
        background: ${PANEL_BG};
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.1);
        z-index: 9999;
        overflow-y: auto;
        padding: 36px 32px 32px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

        /* Start collapsed */
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                    opacity 0.8s ease-out;
      }
      .ws-panel.ws-open {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        pointer-events: auto;
      }

      /* Minimal scrollbar */
      .ws-panel::-webkit-scrollbar {
        width: 5px;
      }
      .ws-panel::-webkit-scrollbar-track {
        background: transparent;
      }
      .ws-panel::-webkit-scrollbar-thumb {
        background: #d4d0c8;
        border-radius: 10px;
      }
      .ws-panel::-webkit-scrollbar-thumb:hover {
        background: #b8b4ac;
      }
      /* Firefox */
      .ws-panel {
        scrollbar-width: thin;
        scrollbar-color: #d4d0c8 transparent;
      }

      /* ===== Close button ===== */
      .ws-close {
        position: sticky;
        top: 0;
        float: right;
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(0,0,0,0.06);
        border-radius: 50%;
        font-size: 18px;
        color: #78716c;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, color 0.2s ease;
        z-index: 1;
        margin-top: -4px;
        margin-right: -4px;
      }
      .ws-close:hover {
        background: rgba(0,0,0,0.12);
        color: #44403c;
      }

      /* ===== Panel header ===== */
      .ws-header-title {
        font-size: 20px;
        font-weight: 700;
        color: #1c1917;
        margin: 0 0 4px 0;
        letter-spacing: 0.3px;
      }
      .ws-header-sub {
        font-size: 13px;
        color: #78716c;
        margin: 0 0 20px 0;
        font-weight: 400;
      }
      .ws-divider {
        border: none;
        height: 2px;
        background: linear-gradient(90deg, #e7e5e4, #d6d3d1, #e7e5e4);
        margin: 0 0 28px 0;
      }

      /* ===== Rule blocks ===== */
      .ws-rule {
        margin-bottom: 26px;
      }
      .ws-rule-header {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin-bottom: 8px;
        padding-bottom: 5px;
        border-bottom: 1.5px solid #e7e5e4;
      }
      .ws-rule-num {
        font-size: 13px;
        font-weight: 700;
        color: ${WP_BLUE};
        white-space: nowrap;
        letter-spacing: 0.5px;
      }
      .ws-rule-title {
        font-size: 15px;
        font-weight: 700;
        color: #292524;
      }
      .ws-rule-body {
        font-size: 14px;
        line-height: 1.65;
        color: #44403c;
        white-space: pre-line;
        margin: 0;
      }
      .ws-rule-list {
        list-style: none;
        padding: 6px 0 0 4px;
        margin: 0;
      }
      .ws-rule-list li {
        font-size: 14px;
        line-height: 1.65;
        color: ${MUTED_GRAY};
        padding: 1px 0;
      }

      /* ===== Footer note ===== */
      .ws-footer {
        margin-top: 8px;
        padding-top: 20px;
        border-top: 2px solid #e7e5e4;
      }
      .ws-footer p {
        font-size: 12.5px;
        color: #a8a29e;
        text-align: center;
        margin: 0;
        font-style: italic;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);
  }

  function buildStickyNote() {
    const note = document.createElement('div');
    note.className = 'ws-sticky';
    note.innerHTML = `
      <span class="ws-sticky-icon">\u270F\uFE0F</span>
      <span class="ws-sticky-label">Chad\u2019s Writing<br>Standards</span>
    `;
    return note;
  }

  function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'ws-overlay';
    return overlay;
  }

  function buildPanel() {
    const panel = document.createElement('div');
    panel.className = 'ws-panel';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ws-close';
    closeBtn.innerHTML = '\u00D7';
    closeBtn.title = 'Close';
    panel.appendChild(closeBtn);

    // Header
    const title = document.createElement('h2');
    title.className = 'ws-header-title';
    title.textContent = 'CHAD\u2019S WRITING STANDARDS';
    panel.appendChild(title);

    const sub = document.createElement('p');
    sub.className = 'ws-header-sub';
    sub.textContent = 'Code of Conduct for Article Creation';
    panel.appendChild(sub);

    const divider = document.createElement('hr');
    divider.className = 'ws-divider';
    panel.appendChild(divider);

    // Rules
    STANDARDS_CONTENT.forEach(function (item) {
      const block = document.createElement('div');
      block.className = 'ws-rule';

      const header = document.createElement('div');
      header.className = 'ws-rule-header';

      const num = document.createElement('span');
      num.className = 'ws-rule-num';
      num.textContent = item.rule;

      const ttl = document.createElement('span');
      ttl.className = 'ws-rule-title';
      ttl.textContent = '\u2014 ' + item.title;

      header.appendChild(num);
      header.appendChild(ttl);
      block.appendChild(header);

      const body = document.createElement('p');
      body.className = 'ws-rule-body';
      body.textContent = item.body;
      block.appendChild(body);

      if (item.list) {
        const ul = document.createElement('ul');
        ul.className = 'ws-rule-list';
        item.list.forEach(function (line) {
          const li = document.createElement('li');
          li.textContent = line;
          ul.appendChild(li);
        });
        block.appendChild(ul);
      }

      panel.appendChild(block);
    });

    // Footer
    const footer = document.createElement('div');
    footer.className = 'ws-footer';
    const fp = document.createElement('p');
    fp.textContent = 'These standards apply to every article generated in this workspace. No exceptions.';
    footer.appendChild(fp);
    panel.appendChild(footer);

    return { panel: panel, closeBtn: closeBtn };
  }

  /* ===== Public API ===== */
  window.WritingStandards = {
    _initialized: false,
    _els: {},

    /**
     * Initialize the sticky note inside a container element.
     * @param {HTMLElement} containerEl — the parent to inject into
     */
    init: function (containerEl) {
      if (this._initialized) return;
      if (!containerEl) {
        console.warn('[WritingStandards] No container element provided.');
        return;
      }

      injectStyles();

      // Ensure the container can position the sticky
      var pos = window.getComputedStyle(containerEl).position;
      if (pos === 'static' || pos === '') {
        containerEl.style.position = 'relative';
      }

      var sticky = buildStickyNote();
      var overlay = buildOverlay();
      var result = buildPanel();
      var panel = result.panel;
      var closeBtn = result.closeBtn;

      containerEl.appendChild(sticky);
      document.body.appendChild(overlay);
      document.body.appendChild(panel);

      this._els = {
        sticky: sticky,
        overlay: overlay,
        panel: panel,
        closeBtn: closeBtn
      };

      var self = this;

      // Open
      sticky.addEventListener('click', function () {
        self.open();
      });

      // Close via X
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.close();
      });

      // Close via backdrop
      overlay.addEventListener('click', function () {
        self.close();
      });

      // Close via Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          self.close();
        }
      });

      this._initialized = true;
    },

    open: function () {
      var els = this._els;
      if (!els.panel) return;
      els.overlay.classList.add('ws-open');
      els.panel.classList.add('ws-open');
      els.panel.scrollTop = 0;
    },

    close: function () {
      var els = this._els;
      if (!els.panel) return;
      els.overlay.classList.remove('ws-open');
      els.panel.classList.remove('ws-open');
    },

    isOpen: function () {
      return this._els.panel ? this._els.panel.classList.contains('ws-open') : false;
    },

    destroy: function () {
      var els = this._els;
      if (els.sticky) els.sticky.remove();
      if (els.overlay) els.overlay.remove();
      if (els.panel) els.panel.remove();
      var styleEl = document.getElementById(STYLE_ID);
      if (styleEl) styleEl.remove();
      this._els = {};
      this._initialized = false;
    }
  };
})();
