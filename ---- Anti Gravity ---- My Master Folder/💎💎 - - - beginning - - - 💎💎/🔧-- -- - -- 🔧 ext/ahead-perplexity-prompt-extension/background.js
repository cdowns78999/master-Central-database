// Ahead Prompt Dropper — Background Service Worker
// Handles extension icon click to toggle panel on Perplexity pages

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.includes('perplexity.ai')) {
    await chrome.tabs.sendMessage(tab.id, { action: 'toggle_panel' });
  } else {
    // Open Perplexity if not on it
    await chrome.tabs.create({ url: 'https://www.perplexity.ai/' });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'prompt_copied') {
    console.log('[Ahead] Prompt copied:', msg.promptId);
    sendResponse({ ok: true });
  }

  if (msg.action === 'article_drop') {
    chrome.storage.local.set({
      ahead_article_drop: {
        type: 'completed-article',
        timestamp: Date.now(),
        content: msg.content
      }
    }, () => {
      console.log('[Ahead] Article dropped into storage');
      sendResponse({ ok: true });
    });
    return true;
  }

  if (msg.action === 'press_release_drop') {
    chrome.storage.local.set({
      ahead_press_release_drop: {
        type: 'press-release',
        timestamp: Date.now(),
        client: msg.client,
        sections: msg.sections
      }
    }, () => {
      console.log('[Ahead] Press release dropped into storage');
      sendResponse({ ok: true });
    });
    return true;
  }
});
