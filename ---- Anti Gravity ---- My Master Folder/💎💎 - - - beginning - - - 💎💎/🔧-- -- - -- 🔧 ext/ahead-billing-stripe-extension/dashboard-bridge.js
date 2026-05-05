// ── Dashboard Bridge — Stripe Extension ──
// Runs on the dashboard origin. Relays passoff_billing_data to chrome.storage.local
// and injects a DOM marker so the dashboard can detect this extension.

(function() {
  var PLATFORM_KEY = 'stripe';

  // Fix 4: Inject DOM marker element so dashboard can detect extension is installed
  var marker = document.createElement('div');
  marker.id = 'passoff-ext-' + PLATFORM_KEY;
  marker.style.display = 'none';
  document.body.appendChild(marker);

  // Fix 2: Watch for passoff_billing_data writes in localStorage and relay to chrome.storage.local
  var lastSeen = '';

  function checkAndRelay() {
    try {
      var raw = localStorage.getItem('passoff_billing_data');
      if (raw && raw !== lastSeen) {
        lastSeen = raw;
        var data = JSON.parse(raw);
        if (data && data.fields) {
          chrome.runtime.sendMessage({ type: 'passoff_store', data: data }, function(resp) {
            if (resp && resp.success) {
              console.log('[Bridge-' + PLATFORM_KEY + '] Relayed passoff_billing_data to chrome.storage.local');
            }
          });
        }
      }
    } catch(e) {}
  }

  // Poll every 500ms for new data (MutationObserver doesn't watch localStorage)
  setInterval(checkAndRelay, 500);

  // Also listen for storage events (fires when another tab writes)
  window.addEventListener('storage', function(e) {
    if (e.key === 'passoff_billing_data' && e.newValue) {
      checkAndRelay();
    }
  });

  // Initial check
  checkAndRelay();

  console.log('[Bridge-' + PLATFORM_KEY + '] Dashboard bridge loaded');
})();
