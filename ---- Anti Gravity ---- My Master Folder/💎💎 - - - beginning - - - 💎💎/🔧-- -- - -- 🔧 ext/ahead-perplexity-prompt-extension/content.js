// Ahead Prompt Dropper — Content Script
// Injects prompt panel on Perplexity.ai pages

(function() {
  'use strict';

  let panelVisible = false;
  let panel = null;
  let currentCategory = 'write-article';
  let articleReady = null;
  let pressReleaseReady = null;

  // Check for completed article from Claude skill
  function checkForArticle() {
    chrome.storage.local.get('ahead_article_drop', (result) => {
      if (result.ahead_article_drop) {
        try {
          const data = typeof result.ahead_article_drop === 'string'
            ? JSON.parse(result.ahead_article_drop)
            : result.ahead_article_drop;
          if (data && data.content) {
            articleReady = data;
            if (panel) {
              panel.innerHTML = buildPanelHTML();
              wireEvents();
            }
          }
        } catch(e) { /* ignore parse errors */ }
      }
    });
    chrome.storage.local.get('ahead_press_release_drop', (result2) => {
      if (result2.ahead_press_release_drop) {
        try {
          const data = typeof result2.ahead_press_release_drop === 'string'
            ? JSON.parse(result2.ahead_press_release_drop)
            : result2.ahead_press_release_drop;
          if (data && data.sections) {
            pressReleaseReady = data;
            if (panel) {
              panel.innerHTML = buildPanelHTML();
              wireEvents();
            }
          }
        } catch(e) { /* ignore */ }
      }
    });
  }

  // Poll for article every 2 seconds when panel is visible
  setInterval(() => {
    if (panelVisible) checkForArticle();
  }, 2000);

  // ── Prompt Library ──────────────────────────────
  const PROMPTS = {
    'write-article': {
      label: 'Write Article',
      code: 'c-u-write-article',
      icon: '✍️',
      items: [
        {
          id: 'wa-research',
          title: 'Deep Research Draft',
          prompt: 'Research and write a comprehensive, well-structured article about [TOPIC]. Include current data, expert perspectives, and actionable insights. Use clear headers, short paragraphs, and a compelling intro. Target 1500-2000 words. Cite sources inline.',
          description: 'Full research article with sources'
        },
        {
          id: 'wa-seo',
          title: 'SEO-Optimized Post',
          prompt: 'Write an SEO-optimized blog post about [TOPIC]. Include a compelling H1 title with the primary keyword, 3-5 H2 subheadings, meta description (155 chars), and natural keyword placement. Use short sentences, bullet points where helpful, and end with a clear CTA. Target 1200 words.',
          description: 'Blog post built for search ranking'
        },
        {
          id: 'wa-linkedin',
          title: 'LinkedIn Article',
          prompt: 'Write a professional LinkedIn article about [TOPIC]. Open with a bold hook or surprising stat. Use a conversational but authoritative tone. Include 2-3 personal insights or industry observations. End with a thought-provoking question to drive engagement. Target 800-1000 words.',
          description: 'Professional thought leadership piece'
        },
        {
          id: 'wa-press',
          title: 'Press Release',
          prompt: 'Write a press release about [TOPIC/ANNOUNCEMENT]. Follow AP style: dateline, strong lead paragraph (who/what/when/where/why), supporting quotes, background context, boilerplate, and media contact. Keep it under 500 words. Professional and newsworthy tone.',
          description: 'AP-style press release format'
        },
        {
          id: 'wa-opinion',
          title: 'Opinion / Editorial',
          prompt: 'Write a persuasive opinion piece about [TOPIC]. Take a clear stance in the opening. Support with 3 strong arguments backed by evidence. Address one counterargument. Use confident, direct language. Close with a memorable call to action. Target 1000 words.',
          description: 'Persuasive editorial with clear stance'
        },
        {
          id: 'wa-howto',
          title: 'How-To Guide',
          prompt: 'Write a step-by-step how-to guide about [TOPIC]. Start with what the reader will achieve. List prerequisites if any. Number each step clearly with detailed instructions. Include pro tips in callout boxes. Add a troubleshooting section at the end. Target 1500 words.',
          description: 'Step-by-step instructional guide'
        }
      ]
    }
  };

  // ── Build Panel ─────────────────────────────────
  function createPanel() {
    if (panel) return;

    panel = document.createElement('div');
    panel.id = 'ahead-prompt-panel';
    panel.innerHTML = buildPanelHTML();
    document.body.appendChild(panel);

    // Wire up events
    wireEvents();
  }

  function buildPanelHTML() {
    const cat = PROMPTS[currentCategory];

    return `
      <div class="ap-header">
        <span class="ap-brand"><span class="ap-blue">ahead</span> prompt dropper</span>
        <button class="ap-close" id="ap-close-btn">✕</button>
      </div>
      <div class="ap-category-bar">
        ${Object.entries(PROMPTS).map(([key, val]) => `
          <button class="ap-cat-btn ${key === currentCategory ? 'ap-cat-active' : ''}" data-cat="${key}">
            ${val.icon} ${val.label}
          </button>
        `).join('')}
      </div>
      ${articleReady ? `
        <div class="ap-article-drop">
          <div class="ap-article-header">🔥 ARTICLE READY</div>
          <div class="ap-article-body" id="ap-article-body">${escapeHtml(articleReady.content)}</div>
          <div class="ap-article-actions">
            <button class="ap-article-copy-btn" id="ap-article-copy">📋 COPY ARTICLE</button>
            <span class="ap-article-copied" id="ap-article-copied">✓ COPIED — paste into Perplexity</span>
          </div>
          <button class="ap-article-clear" id="ap-article-clear">dismiss</button>
        </div>
      ` : ''}
      ${pressReleaseReady ? `
        <div class="ap-pr-drop">
          <div class="ap-pr-header">📰 PRESS RELEASE READY</div>
          <div class="ap-pr-client">${escapeHtml(pressReleaseReady.client || 'Client')}</div>
          <div class="ap-pr-sections">
            <div class="ap-pr-section" data-section="highlights">
              <div class="ap-pr-section-label">1. Highlights</div>
              <div class="ap-pr-section-text" id="ap-pr-highlights">${escapeHtml(pressReleaseReady.sections.highlights)}</div>
              <div class="ap-pr-section-actions">
                <button class="ap-pr-copy-btn" data-section="highlights">📋 copy highlights</button>
                <span class="ap-pr-copied" id="ap-pr-copied-highlights">✓ copied</span>
              </div>
            </div>
            <div class="ap-pr-section" data-section="about_song">
              <div class="ap-pr-section-label">2. About the Song</div>
              <div class="ap-pr-section-text" id="ap-pr-about-song">${escapeHtml(pressReleaseReady.sections.about_song)}</div>
              <div class="ap-pr-section-actions">
                <button class="ap-pr-copy-btn" data-section="about_song">📋 copy about song</button>
                <span class="ap-pr-copied" id="ap-pr-copied-about_song">✓ copied</span>
              </div>
            </div>
            <div class="ap-pr-section" data-section="about_artist">
              <div class="ap-pr-section-label">3. About the Artist</div>
              <div class="ap-pr-section-text" id="ap-pr-about-artist">${escapeHtml(pressReleaseReady.sections.about_artist)}</div>
              <div class="ap-pr-section-actions">
                <button class="ap-pr-copy-btn" data-section="about_artist">📋 copy about artist</button>
                <span class="ap-pr-copied" id="ap-pr-copied-about_artist">✓ copied</span>
              </div>
            </div>
          </div>
          <button class="ap-pr-clear" id="ap-pr-clear">dismiss</button>
        </div>
      ` : ''}
      <div class="ap-prompt-list" id="ap-prompt-list">
        ${cat.items.map(item => `
          <div class="ap-prompt-card" data-id="${item.id}">
            <div class="ap-prompt-title">${item.title}</div>
            <div class="ap-prompt-desc">${item.description}</div>
            <div class="ap-prompt-text" id="text-${item.id}">${escapeHtml(item.prompt)}</div>
            <div class="ap-prompt-actions">
              <button class="ap-copy-btn" data-id="${item.id}">📋 copy</button>
              <span class="ap-copied-msg" id="copied-${item.id}">✓ copied</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="ap-footer">
        <span class="ap-code">${cat.code}</span>
        <span class="ap-count">${cat.items.length} prompts</span>
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Events ──────────────────────────────────────
  function wireEvents() {
    // Close button
    panel.querySelector('#ap-close-btn').addEventListener('click', () => togglePanel(false));

    // Category tabs
    panel.querySelectorAll('.ap-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.cat;
        panel.innerHTML = buildPanelHTML();
        wireEvents();
      });
    });

    // Copy buttons
    panel.querySelectorAll('.ap-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const cat = PROMPTS[currentCategory];
        const item = cat.items.find(p => p.id === id);
        if (!item) return;

        try {
          await navigator.clipboard.writeText(item.prompt);

          // Show copied state
          btn.style.display = 'none';
          const msg = panel.querySelector(`#copied-${id}`);
          msg.style.display = 'inline-block';

          // Flash the card
          const card = btn.closest('.ap-prompt-card');
          card.classList.add('ap-card-copied');

          // Notify background
          chrome.runtime.sendMessage({ action: 'prompt_copied', promptId: id });

          // Reset after 2s
          setTimeout(() => {
            btn.style.display = 'inline-block';
            msg.style.display = 'none';
            card.classList.remove('ap-card-copied');
          }, 2000);
        } catch (err) {
          // Fallback copy
          const ta = document.createElement('textarea');
          ta.value = item.prompt;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);

          btn.textContent = '✓ copied';
          setTimeout(() => { btn.textContent = '📋 copy'; }, 2000);
        }
      });
    });

    // Click on prompt text to expand/collapse
    panel.querySelectorAll('.ap-prompt-text').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('ap-text-expanded');
      });
    });

    // Article copy
    const artCopyBtn = panel.querySelector('#ap-article-copy');
    if (artCopyBtn) {
      artCopyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(articleReady.content);
          artCopyBtn.style.display = 'none';
          panel.querySelector('#ap-article-copied').style.display = 'block';
          // Clear from storage after copy
          setTimeout(() => {
            chrome.storage.local.remove('ahead_article_drop');
          }, 5000);
        } catch(e) {
          const ta = document.createElement('textarea');
          ta.value = articleReady.content;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          artCopyBtn.textContent = '✓ COPIED';
        }
      });
    }

    // Article dismiss
    const artClearBtn = panel.querySelector('#ap-article-clear');
    if (artClearBtn) {
      artClearBtn.addEventListener('click', () => {
        articleReady = null;
        chrome.storage.local.remove('ahead_article_drop');
        panel.innerHTML = buildPanelHTML();
        wireEvents();
      });
    }

    // Press release section copy buttons
    panel.querySelectorAll('.ap-pr-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const section = btn.dataset.section;
        const text = pressReleaseReady.sections[section];
        if (!text) return;

        try {
          await navigator.clipboard.writeText(text);
          btn.style.display = 'none';
          const msg = panel.querySelector(`#ap-pr-copied-${section}`);
          msg.style.display = 'inline-block';
          btn.closest('.ap-pr-section').classList.add('ap-pr-section-copied');

          setTimeout(() => {
            btn.style.display = 'inline-block';
            msg.style.display = 'none';
            btn.closest('.ap-pr-section').classList.remove('ap-pr-section-copied');
          }, 2500);
        } catch(e) {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = '✓ copied';
          setTimeout(() => { btn.textContent = `📋 copy ${section.replace('_', ' ')}`; }, 2000);
        }
      });
    });

    // Press release section text expand/collapse
    panel.querySelectorAll('.ap-pr-section-text').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('ap-pr-text-expanded');
      });
    });

    // Press release dismiss
    const prClearBtn = panel.querySelector('#ap-pr-clear');
    if (prClearBtn) {
      prClearBtn.addEventListener('click', () => {
        pressReleaseReady = null;
        chrome.storage.local.remove('ahead_press_release_drop');
        panel.innerHTML = buildPanelHTML();
        wireEvents();
      });
    }
  }

  // ── Toggle ──────────────────────────────────────
  function togglePanel(show) {
    if (show === undefined) show = !panelVisible;

    if (show && !panel) createPanel();

    if (panel) {
      panel.style.display = show ? 'flex' : 'none';
      panelVisible = show;
    }
  }

  // ── Message Listener ────────────────────────────
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'toggle_panel') {
      togglePanel();
      sendResponse({ ok: true });
    }
  });

  // Listen for article drops from background
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && (changes.ahead_article_drop || changes.ahead_press_release_drop)) {
      checkForArticle();
    }
  });

  // ── Auto-init: create panel VISIBLE ─────────────
  createPanel();
  togglePanel(true);
  checkForArticle();

})();
