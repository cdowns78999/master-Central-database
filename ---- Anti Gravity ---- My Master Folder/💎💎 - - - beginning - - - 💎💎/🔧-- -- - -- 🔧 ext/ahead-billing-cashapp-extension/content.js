// ── Pass Off Claude Max Extension 4 — Cash App ──
// Self-contained billing field builder for Cash App pages

(function () {
  const STORAGE_KEY = 'passoff_billing_data';
  const STATE = { mode: null, fields: [], subPages: [], subPage: 0 };

  // ── Inject panel ──
  const panel = document.createElement('div');
  panel.id = 'passoff-panel';
  document.body.appendChild(panel);

  // ── On load: check chrome.storage.local first, then localStorage, then show menu ──
  async function init() {
    // Fix 2: Check chrome.storage.local first (cross-origin bridge from dashboard)
    try {
      const stored = await new Promise((resolve) => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(STORAGE_KEY, (result) => resolve(result[STORAGE_KEY] || null));
        } else {
          resolve(null);
        }
      });
      if (stored && stored.fields && stored.fields.length > 0) {
        STATE.mode = stored.mode;
        STATE.fields = stored.fields;
        // Clear from chrome.storage after loading (one-time use)
        if (chrome.storage && chrome.storage.local) {
          chrome.storage.local.remove(STORAGE_KEY);
        }
        panel.classList.add('open');
        showFormGuide();
        return;
      }
    } catch { /* fall through */ }

    // Existing: check localStorage (same-origin navigation)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        STATE.mode = data.mode;
        STATE.fields = data.fields;
        panel.classList.add('open');
        showFormGuide();
        return;
      } catch { /* fall through to menu */ }
    }
    showMenu();
    panel.classList.add('open');
  }

  // ── Save state to localStorage ──
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mode: STATE.mode,
      fields: STATE.fields
    }));
  }

  // ── Clear saved state ──
  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Render: Main Menu ──
  function showMenu() {
    clearState();
    STATE.mode = null;
    STATE.fields = [];
    panel.innerHTML = `
      <div id="passoff-header">
        <span>ahead</span> billing
        <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        <button class="passoff-menu-btn" data-mode="invoice">Invoice</button>
        <button class="passoff-menu-btn" data-mode="subscription">Subscription</button>
      </div>
      <div id="passoff-status">ahead artist solutions</div>
    `;
    bindClose();
    panel.querySelectorAll('.passoff-menu-btn').forEach(b => {
      b.addEventListener('click', () => showInput(b.dataset.mode));
    });
  }

  // ── Render: Input Screen ──
  function showInput(mode) {
    STATE.mode = mode;
    const isInv = mode === 'invoice';
    const placeholder = isInv
      ? 'To / For / Amount / Note'
      : 'To / Plan / Amount / Frequency';
    const example = isInv
      ? 'DJ Nova / Beat License / $200 / Thanks!'
      : 'DJ Nova / Monthly Mgmt / $150 / Monthly';

    panel.innerHTML = `
      <div id="passoff-header">
        <span>${isInv ? 'invoice' : 'subscription'}</span>
        <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        <div id="passoff-input-hint">${placeholder}</div>
        <input id="passoff-input" type="text" placeholder="${example}" spellcheck="false" />
        <button id="passoff-go">Go</button>
        <button id="passoff-back">&larr; Back</button>
      </div>
      <div id="passoff-status">paste your info, hit go</div>
    `;
    bindClose();
    const input = panel.querySelector('#passoff-input');
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') parseAndConfirm();
    });
    panel.querySelector('#passoff-go').addEventListener('click', parseAndConfirm);
    panel.querySelector('#passoff-back').addEventListener('click', showMenu);
  }

  // ── Parse input → "Ready to fire?" ──
  function parseAndConfirm() {
    const raw = panel.querySelector('#passoff-input').value.trim();
    if (!raw) return;

    const parts = raw.split('/').map(s => s.trim());

    if (STATE.mode === 'invoice') {
      const to = parts[0] || '';
      const forDesc = parts[1] || '';
      const amount = parts[2] || '';
      const note = parts[3] || '';
      STATE.fields = [
        { label: 'TO', value: to },
        { label: 'FOR', value: forDesc },
        { label: 'AMOUNT', value: amount },
        { label: 'NOTE', value: note || `${forDesc} for ${to} — Ahead Artist Solutions` }
      ];
    } else {
      const to = parts[0] || '';
      const plan = parts[1] || '';
      const amount = parts[2] || '';
      const frequency = parts[3] || 'Monthly';
      STATE.fields = [
        { label: 'TO', value: to },
        { label: 'PLAN / SERVICE', value: plan },
        { label: 'AMOUNT', value: amount },
        { label: 'FREQUENCY', value: frequency }
      ];
    }

    showReadyScreen();
  }

  // ── Render: "Ready to fire?" ──
  function showReadyScreen() {
    const isInv = STATE.mode === 'invoice';
    const summary = isInv
      ? STATE.fields[0].value + ' — ' + STATE.fields[1].value
      : STATE.fields[0].value + ' — ' + STATE.fields[1].value;

    // Check if we're already on the right page
    const targetUrl = isInv
      ? 'https://cash.app/'
      : 'https://cash.app/';
    const alreadyThere = window.location.href.includes('cash.app');

    panel.innerHTML = `
      <div id="passoff-header">
        <span>${isInv ? 'invoice' : 'subscription'}</span>
        <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        <div id="passoff-ready-summary">${escapeHtml(summary)}</div>
        <button id="passoff-fire">${alreadyThere ? 'Ready to fire?' : 'Ready to fire? →'}</button>
        <button id="passoff-back">&larr; Edit</button>
      </div>
      <div id="passoff-status">${alreadyThere ? 'click to see form guide' : 'takes you to cash app + loads guide'}</div>
    `;
    bindClose();
    panel.querySelector('#passoff-fire').addEventListener('click', () => {
      // Save data so it survives navigation
      saveState();
      if (alreadyThere) {
        // Already on the right page — just show the guide
        showFormGuide();
      } else {
        // Navigate to the correct Cash App page — data will reload from localStorage
        window.location.href = targetUrl;
      }
    });
    panel.querySelector('#passoff-back').addEventListener('click', () => showInput(STATE.mode));
  }

  // ── Render: Form Guide (mini Cash App mockup) ──
  function showFormGuide() {
    const isInv = STATE.mode === 'invoice';
    const f = STATE.fields;
    let mockup = '';

    if (isInv) {
      mockup = `
        <div class="ca-mock">
          <div class="ca-mock-title">Cash App — New Invoice</div>

          <div class="ca-mock-section">Recipient</div>
          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[0].value)}">
            <div class="ca-mock-label">To ($cashtag or name)</div>
            <div class="ca-mock-value">${escapeHtml(f[0].value)}</div>
          </div>

          <div class="ca-mock-section">Details</div>
          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[1].value)}">
            <div class="ca-mock-label">For (description)</div>
            <div class="ca-mock-value">${escapeHtml(f[1].value)}</div>
          </div>

          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[2].value)}">
            <div class="ca-mock-label">Amount</div>
            <div class="ca-mock-value">${escapeHtml(f[2].value)}</div>
          </div>

          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[3].value)}">
            <div class="ca-mock-label">Note</div>
            <div class="ca-mock-value ca-mock-desc">${escapeHtml(f[3].value)}</div>
          </div>

          <div class="ca-mock-dimmed">Total: ${escapeHtml(f[2].value)}</div>
          <div class="ca-mock-btn">Request →</div>
        </div>`;

      panel.innerHTML = `
        <div id="passoff-header">
          <span>form</span> guide
          <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
        </div>
        <div id="passoff-body">
          ${mockup}
        </div>
        <div id="passoff-actions">
          <button id="passoff-done">Done — Return to Dashboard</button>
          <button id="passoff-another">+ Another</button>
        </div>
        <div id="passoff-status">click a highlighted field to copy</div>
      `;

      bindClose();
      panel.querySelectorAll('.ca-hot').forEach(el => {
        el.addEventListener('click', () => copyField(el, el.dataset.value));
      });
      panel.querySelector('#passoff-done').addEventListener('click', () => sendCompletionSignal());
      panel.querySelector('#passoff-another').addEventListener('click', showMenu);

    } else {
      // Subscription — paged guide
      const frequencyRaw = f[3].value.toLowerCase();
      let frequencyLabel = 'Monthly';
      if (frequencyRaw.includes('week')) frequencyLabel = 'Weekly';
      else if (frequencyRaw.includes('year') || frequencyRaw.includes('annual')) frequencyLabel = 'Yearly';
      else if (frequencyRaw.includes('month')) frequencyLabel = 'Monthly';

      STATE.subPages = [
        `<div class="ca-mock">
          <div class="ca-mock-title">Step 1 of 4</div>
          <div class="ca-mock-step">
            <div class="ca-step-num">1</div>
            <div class="ca-step-label">Set up recurring</div>
          </div>
          <div class="ca-mock-dimmed">Open Cash App</div>
          <div class="ca-mock-dimmed">Navigate to Payments</div>
          <div class="ca-mock-dimmed">Select "Set up recurring" or equivalent</div>
          <div class="ca-mock-step-spacer"></div>
          <div class="ca-mock-dimmed">Then choose frequency: <b>${frequencyLabel}</b></div>
          <div class="ca-mock-btn">Next →</div>
        </div>`,

        `<div class="ca-mock">
          <div class="ca-mock-title">Step 2 of 4</div>
          <div class="ca-mock-step">
            <div class="ca-step-num">2</div>
            <div class="ca-step-label">Set up recipient</div>
          </div>
          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[0].value)}">
            <div class="ca-mock-label">To ($cashtag or name)</div>
            <div class="ca-mock-value">${escapeHtml(f[0].value)}</div>
          </div>
          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[1].value)}">
            <div class="ca-mock-label">Plan / Service</div>
            <div class="ca-mock-value">${escapeHtml(f[1].value)}</div>
          </div>
          <div class="ca-mock-btn">Next →</div>
        </div>`,

        `<div class="ca-mock">
          <div class="ca-mock-title">Step 3 of 4</div>
          <div class="ca-mock-step">
            <div class="ca-step-num">3</div>
            <div class="ca-step-label">Set amount & frequency</div>
          </div>
          <div class="ca-mock-field ca-hot" data-value="${escapeAttr(f[2].value)}">
            <div class="ca-mock-label">Amount</div>
            <div class="ca-mock-value">${escapeHtml(f[2].value)}</div>
          </div>
          <div class="ca-mock-dimmed">Frequency: <b>${frequencyLabel}</b></div>
          <div class="ca-mock-dimmed">Recurring payment</div>
          <div class="ca-mock-btn">Next →</div>
        </div>`,

        `<div class="ca-mock">
          <div class="ca-mock-title">Step 4 of 4</div>
          <div class="ca-mock-step">
            <div class="ca-step-num">4</div>
            <div class="ca-step-label">Review & confirm</div>
          </div>
          <div class="ca-mock-dimmed">To: ${escapeHtml(f[0].value)}</div>
          <div class="ca-mock-dimmed">Plan: ${escapeHtml(f[1].value)}</div>
          <div class="ca-mock-dimmed">Amount: ${escapeHtml(f[2].value)} / ${frequencyLabel.toLowerCase()}</div>
          <div class="ca-mock-dimmed">Recurring: Unlimited</div>
          <div class="ca-mock-step-spacer"></div>
          <div class="ca-mock-dimmed">Verify details → Confirm</div>
          <div class="ca-mock-btn">Confirm →</div>
        </div>`
      ];
      STATE.subPage = 0;
      showSubPage();
    }
  }

  // ── Render: Subscription paged guide ──
  function showSubPage() {
    const i = STATE.subPage;
    const total = STATE.subPages.length;
    const content = STATE.subPages[i];
    const prevDisabled = i === 0 ? 'ca-arrow-disabled' : '';
    const nextDisabled = i === total - 1 ? 'ca-arrow-disabled' : '';

    panel.innerHTML = `
      <div id="passoff-header">
        <span>subscription</span> guide
        <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        ${content}
      </div>
      <div id="passoff-pager">
        <button class="ca-arrow ${prevDisabled}" id="ca-prev">&larr;</button>
        <span class="ca-page-dots">${Array.from({length: total}, (_,j) =>
          `<span class="ca-dot ${j === i ? 'ca-dot-active' : ''}"></span>`
        ).join('')}</span>
        <button class="ca-arrow ${nextDisabled}" id="ca-next">&rarr;</button>
      </div>
      <div id="passoff-actions">
        ${i === total - 1 ? '<button id="passoff-done">Done — Return to Dashboard</button>' : ''}
        <button id="passoff-another">+ Another</button>
      </div>
      <div id="passoff-status">click highlighted fields to copy</div>
    `;

    bindClose();

    panel.querySelector('#ca-prev').addEventListener('click', () => {
      if (STATE.subPage > 0) { STATE.subPage--; showSubPage(); }
    });
    panel.querySelector('#ca-next').addEventListener('click', () => {
      if (STATE.subPage < STATE.subPages.length - 1) { STATE.subPage++; showSubPage(); }
    });

    panel.querySelectorAll('.ca-hot').forEach(el => {
      el.addEventListener('click', () => copyField(el, el.dataset.value));
    });

    const doneBtn = panel.querySelector('#passoff-done');
    if (doneBtn) doneBtn.addEventListener('click', () => sendCompletionSignal());
    panel.querySelector('#passoff-another').addEventListener('click', showMenu);
  }

  // ── Copy field value ──
  async function copyField(row, value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    row.classList.add('ca-copied');
    setTimeout(() => row.classList.remove('ca-copied'), 1200);
  }

  // ── Fix 1: Send completion signal back to dashboard ──
  function sendCompletionSignal() {
    const resultData = {
      client: STATE.fields[0] ? STATE.fields[0].value : '',
      method: 'Cash App',
      paymentType: STATE.mode,
      status: 'complete',
      completedAt: new Date().toISOString(),
      fieldsCopied: STATE.fields.length,
      payUrl: null
    };

    // Send to background service worker for relay to dashboard
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ type: 'passoff_complete', data: resultData }, function() {
        console.log('[CashApp] Completion signal sent');
      });
    }

    // Clear local state
    clearState();
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(STORAGE_KEY);
    }

    // Show brief confirmation then collapse
    panel.innerHTML = `
      <div id="passoff-header">
        <span>done</span>
        <button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        <div class="ca-mock-dimmed" style="text-align:center;padding:20px 0;font-size:1.1em;">Done! Returning to dashboard.</div>
      </div>
      <div id="passoff-status">completed</div>
    `;
    bindClose();
    setTimeout(() => { panel.classList.remove('open'); }, 2000);
  }

  function bindClose() {
    const c = panel.querySelector('#passoff-close');
    if (c) c.addEventListener('click', () => panel.classList.remove('open'));
    const r = panel.querySelector('#passoff-clear');
    if (r) r.addEventListener('click', () => { clearState(); showMenu(); });
  }

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Boot ──
  init();
})();
