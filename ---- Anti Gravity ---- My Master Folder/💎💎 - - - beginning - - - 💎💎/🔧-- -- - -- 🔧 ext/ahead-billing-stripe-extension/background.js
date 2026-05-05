// ── Background Service Worker — Stripe Extension ──
// Handles chrome.storage.local read/write and message relay

const PLATFORM = 'Stripe';
const PLATFORM_KEY = 'stripe';

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  // Fix 2: Store passoff data from dashboard bridge into chrome.storage.local
  if (msg.type === 'passoff_store') {
    chrome.storage.local.set({ passoff_billing_data: msg.data }, function() {
      console.log('[BG-' + PLATFORM_KEY + '] Stored passoff_billing_data in chrome.storage.local');
      sendResponse({ success: true });
    });
    return true; // async response
  }

  // Fix 1: Extension signals completion — write result to dashboard tab's localStorage
  if (msg.type === 'passoff_complete') {
    var resultData = msg.data;
    resultData.method = PLATFORM;

    // Find dashboard tab and inject the result into its localStorage
    chrome.tabs.query({}, function(tabs) {
      var dashboardTab = null;
      for (var i = 0; i < tabs.length; i++) {
        var url = tabs[i].url || '';
        if (url.indexOf('wingdashapp') !== -1 || url.indexOf('index.html') !== -1) {
          dashboardTab = tabs[i];
          break;
        }
      }
      if (dashboardTab) {
        chrome.scripting.executeScript({
          target: { tabId: dashboardTab.id },
          func: function(data) {
            localStorage.setItem('passoff_billing_result', JSON.stringify(data));
          },
          args: [resultData]
        }).then(function() {
          console.log('[BG-' + PLATFORM_KEY + '] Wrote passoff_billing_result to dashboard tab');
        }).catch(function(err) {
          console.warn('[BG-' + PLATFORM_KEY + '] Could not write to dashboard tab:', err);
        });
      }
    });

    // Also store in chrome.storage.local as fallback
    chrome.storage.local.set({ passoff_billing_result: resultData });

    sendResponse({ success: true });
    return true;
  }
});

console.log('[BG-' + PLATFORM_KEY + '] Service worker loaded');
