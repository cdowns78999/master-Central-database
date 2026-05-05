// ── Pass Off Claude Max Extension 2 — Stripe ──
// Self-contained billing field builder for Stripe pages

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
      ? 'Customer / Item / Amount / Memo'
      : 'Product / Description / Price / Cycle';
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
      const customer = parts[0] || '';
      const item = parts[1] || '';
      const amount = parts[2] || '';
      const memo = parts[3] || '';
      STATE.fields = [
        { label: 'CUSTOMER NAME', value: customer },
        { label: 'LINE ITEM DESCRIPTION', value: item },
        { label: 'AMOUNT', value: amount },
        { label: 'MEMO', value: memo || `${item} for ${customer} — Ahead Artist Solutions` }
      ];
    } else {
      const product = parts[0] || '';
      const desc = parts[1] || '';
      const price = parts[2] || '';
      const cycle = parts[3] || 'Monthly';
      STATE.fields = [
        { label: 'PRODUCT NAME', value: `${desc} — ${product}` },
        { label: 'DESCRIPTION', value: `${desc} services for ${product} provided by Ahead Artist Solutions` },
        { label: 'PRICE', value: `${price} USD` },
        { label: 'BILLING PERIOD', value: cycle }
      ];
    }

    showReadyScreen();
  }

  // ── Render: "Ready to fire?" ──
  function showReadyScreen() {
    const isInv = STATE.mode === 'invoice';
    const summary = isInv
      ? STATE.fields[0].value + ' — ' + STATE.fields[1].value
      : STATE.fields[0].value;

    // Check if we're already on the right page
    const targetUrl = isInv
      ? 'https://dashboard.stripe.com/invoices/create'
      : 'https://dashboard.stripe.com/subscriptions/create';
    const alreadyThere = window.location.href.includes(
      isInv ? '/invoices/create' : '/subscriptions/create'
    );

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
      <div id="passoff-status">${alreadyThere ? 'click to see form guide' : 'takes you to stripe + loads guide'}</div>
    `;
    bindClose();
    panel.querySelector('#passoff-fire').addEventListener('click', () => {
      // Save data so it survives navigation
      saveState();
      if (alreadyThere) {
        // Already on the right page — just show the guide
        showFormGuide();
      } else {
        // Navigate to the correct Stripe page — data will reload from localStorage
        window.location.href = targetUrl;
      }
    });
    panel.querySelector('#passoff-back').addEventListener('click', () => showInput(STATE.mode));
  }

  // ── Render: Form Guide (mini Stripe mockup) ──
  function showFormGuide() {
    const isInv = STATE.mode === 'invoice';
    const f = STATE.fields;
    let mockup = '';

    if (isInv) {
      mockup = `
        <div class="pp-mock">
          <div class="pp-mock-title">Stripe — New Invoice</div>

          <div class="pp-mock-section">Customer</div>
          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(f[0].value)}">
            <div class="pp-mock-label">Customer name</div>
            <div class="pp-mock-value">${escapeHtml(f[0].value)}</div>
          </div>

          <div class="pp-mock-section">Line Items</div>
          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(f[1].value)}">
            <div class="pp-mock-label">Description</div>
            <div class="pp-mock-value">${escapeHtml(f[1].value)}</div>
          </div>
          <div class="pp-mock-row">
            <div class="pp-mock-dimmed pp-grow">Qty: 1</div>
            <div class="pp-mock-field pp-hot pp-small" data-value="${escapeAttr(f[2].value)}">
              <div class="pp-mock-label">Amount</div>
              <div class="pp-mock-value">${escapeHtml(f[2].value)}</div>
            </div>
          </div>

          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(f[3].value)}">
            <div class="pp-mock-label">Memo</div>
            <div class="pp-mock-value pp-mock-desc">${escapeHtml(f[3].value)}</div>
          </div>

          <div class="pp-mock-dimmed">Total: ${escapeHtml(f[2].value)}</div>
          <div class="pp-mock-btn">Send Invoice →</div>
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
      panel.querySelectorAll('.pp-hot').forEach(el => {
        el.addEventListener('click', () => copyField(el, el.dataset.value));
      });
      panel.querySelector('#passoff-done').addEventListener('click', () => sendCompletionSignal());
      panel.querySelector('#passoff-another').addEventListener('click', showMenu);

    } else {
      // Subscription — paged guide
      const cycleRaw = f[3].value.toLowerCase();
      let cyclePeriod = 'Months';
      if (cycleRaw.includes('week')) cyclePeriod = 'Weeks';
      else if (cycleRaw.includes('year') || cycleRaw.includes('annual')) cyclePeriod = 'Years';
      const priceClean = f[2].value.replace(' USD','');

      STATE.subPages = [
        `<div class="pp-mock">
          <div class="pp-mock-title">Step 1 of 4</div>
          <div class="pp-mock-step">
            <div class="pp-step-num">1</div>
            <div class="pp-step-label">Create product</div>
          </div>
          <div class="pp-mock-dimmed">Select an existing product</div>
          <div class="pp-mock-dimmed">or "Add a new product"</div>
          <div class="pp-mock-step-spacer"></div>
          <div class="pp-mock-dimmed">Then choose <b>Recurring</b> pricing</div>
          <div class="pp-mock-btn">Next →</div>
        </div>`,

        `<div class="pp-mock">
          <div class="pp-mock-title">Step 2 of 4</div>
          <div class="pp-mock-step">
            <div class="pp-step-num">2</div>
            <div class="pp-step-label">Product details</div>
          </div>
          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(f[0].value)}">
            <div class="pp-mock-label">Product name</div>
            <div class="pp-mock-value">${escapeHtml(f[0].value)}</div>
          </div>
          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(f[1].value)}">
            <div class="pp-mock-label">Description</div>
            <div class="pp-mock-value pp-mock-desc">${escapeHtml(f[1].value)}</div>
          </div>
          <div class="pp-mock-btn">Next →</div>
        </div>`,

        `<div class="pp-mock">
          <div class="pp-mock-title">Step 3 of 4</div>
          <div class="pp-mock-step">
            <div class="pp-step-num">3</div>
            <div class="pp-step-label">Set pricing</div>
          </div>
          <div class="pp-mock-dimmed">Currency: USD</div>
          <div class="pp-mock-field pp-hot" data-value="${escapeAttr(priceClean)}">
            <div class="pp-mock-label">Price $</div>
            <div class="pp-mock-value">${escapeHtml(priceClean)}</div>
          </div>
          <div class="pp-mock-row">
            <div class="pp-mock-dimmed pp-grow">every 1</div>
            <div class="pp-mock-dimmed pp-grow">${cyclePeriod}</div>
          </div>
          <div class="pp-mock-dimmed">Recurring — no end date</div>
          <div class="pp-mock-btn">Next →</div>
        </div>`,

        `<div class="pp-mock">
          <div class="pp-mock-title">Step 4 of 4</div>
          <div class="pp-mock-step">
            <div class="pp-step-num">4</div>
            <div class="pp-step-label">Review and create</div>
          </div>
          <div class="pp-mock-dimmed">Product: ${escapeHtml(f[0].value)}</div>
          <div class="pp-mock-dimmed">Price: ${escapeHtml(priceClean)} USD / ${cyclePeriod.toLowerCase()}</div>
          <div class="pp-mock-dimmed">Billing: Recurring</div>
          <div class="pp-mock-step-spacer"></div>
          <div class="pp-mock-dimmed">Verify → Create subscription</div>
          <div class="pp-mock-btn">Create Subscription →</div>
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
    const prevDisabled = i === 0 ? 'pp-arrow-disabled' : '';
    const nextDisabled = i === total - 1 ? 'pp-arrow-disabled' : '';

    panel.innerHTML = `
      <div id="passoff-header">
        <span>subscription</span> guide
        <button id="passoff-clear" title="Reset">↺</button><button id="passoff-close" title="Close">✕</button>
      </div>
      <div id="passoff-body">
        ${content}
      </div>
      <div id="passoff-pager">
        <button class="pp-arrow ${prevDisabled}" id="pp-prev">&larr;</button>
        <span class="pp-page-dots">${Array.from({length: total}, (_,j) =>
          `<span class="pp-dot ${j === i ? 'pp-dot-active' : ''}"></span>`
        ).join('')}</span>
        <button class="pp-arrow ${nextDisabled}" id="pp-next">&rarr;</button>
      </div>
      <div id="passoff-actions">
        ${i === total - 1 ? '<button id="passoff-done">Done — Return to Dashboard</button>' : ''}
        <button id="passoff-another">+ Another</button>
      </div>
      <div id="passoff-status">click highlighted fields to copy</div>
    `;

    bindClose();

    panel.querySelector('#pp-prev').addEventListener('click', () => {
      if (STATE.subPage > 0) { STATE.subPage--; showSubPage(); }
    });
    panel.querySelector('#pp-next').addEventListener('click', () => {
      if (STATE.subPage < STATE.subPages.length - 1) { STATE.subPage++; showSubPage(); }
    });

    panel.querySelectorAll('.pp-hot').forEach(el => {
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
    row.classList.add('pp-copied');
    setTimeout(() => row.classList.remove('pp-copied'), 1200);
  }

  // ── Fix 1: Send completion signal back to dashboard ──
  function sendCompletionSignal() {
    const resultData = {
      client: STATE.fields[0] ? STATE.fields[0].value : '',
      method: 'Stripe',
      paymentType: STATE.mode,
      status: 'complete',
      completedAt: new Date().toISOString(),
      fieldsCopied: STATE.fields.length,
      payUrl: null
    };

    // Send to background service worker for relay to dashboard
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ type: 'passoff_complete', data: resultData }, function() {
        console.log('[Stripe] Completion signal sent');
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
        <div class="pp-mock-dimmed" style="text-align:center;padding:20px 0;font-size:1.1em;">Done! Returning to dashboard.</div>
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
