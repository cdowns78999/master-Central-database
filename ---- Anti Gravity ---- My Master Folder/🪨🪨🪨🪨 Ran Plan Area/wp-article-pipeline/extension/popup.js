// ── Blog definitions ──
const BLOGS = {
  'Daily Beat': 'https://daily-beat.com/wp-admin/post-new.php',
  'By The Wavs': 'https://bythewavs.com/wp-admin/post-new.php',
  'Raver Rafting': 'https://raverrafting.com/wp-admin/post-new.php',
  'The Music Ninja': 'https://www.themusicninja.com/wp-admin/post-new.php',
  'EDM Joy': 'https://edmjoy.com/wp-admin/post-new.php',
  'Fresh New Tracks': 'https://freshnewtracks.com/wp-admin/post-new.php'
};

let selectedBlog = null;

// ── Load saved state ──
document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['wpArticle', 'selectedBlog']);

  // Restore selected blog
  if (data.selectedBlog && BLOGS[data.selectedBlog]) {
    selectBlog(data.selectedBlog);
  }

  // Check for captured article
  if (data.wpArticle && data.wpArticle.html) {
    showCaptured(data.wpArticle);
  }
});

// ── Blog picker buttons ──
document.querySelectorAll('.blog-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.textContent.trim();
    selectBlog(name);
    chrome.storage.local.set({ selectedBlog: name });
  });
});

function selectBlog(name) {
  selectedBlog = name;
  document.querySelectorAll('.blog-btn').forEach(b => {
    b.classList.toggle('selected', b.textContent.trim() === name);
  });
  updateSendBtn();
}

// ── Capture from current tab ──
document.getElementById('captureBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Try to grab from the emulator's localStorage
      const stored = localStorage.getItem('wp-article-capture');
      return stored ? JSON.parse(stored) : null;
    }
  }, (results) => {
    if (results && results[0] && results[0].result) {
      const article = results[0].result;
      chrome.storage.local.set({ wpArticle: article });
      showCaptured(article);
      chrome.action.setBadgeText({ text: '1' });
      chrome.action.setBadgeBackgroundColor({ color: '#00a32a' });
    } else {
      document.getElementById('captureTitle').textContent = 'No article found on this page';
      document.getElementById('captureStatus').className = 'status empty';
    }
  });
});

// ── Send to WordPress ──
document.getElementById('sendBtn').addEventListener('click', async () => {
  if (!selectedBlog || !BLOGS[selectedBlog]) return;

  const data = await chrome.storage.local.get(['wpArticle']);
  if (!data.wpArticle || !data.wpArticle.html) return;

  const wpUrl = BLOGS[selectedBlog];

  // Flash confirmation
  const flash = document.getElementById('sendFlash');
  flash.textContent = `Sending to ${selectedBlog}...`;
  flash.classList.add('visible');

  // Brief delay so user sees the confirmation
  await new Promise(r => setTimeout(r, 800));

  // Open WP in a new tab
  const tab = await chrome.tabs.create({ url: wpUrl });

  // Wait for the page to load, then inject
  chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
    if (tabId === tab.id && info.status === 'complete') {
      chrome.tabs.onUpdated.removeListener(listener);

      // Send the article data to the content script
      chrome.tabs.sendMessage(tab.id, {
        action: 'pasteArticle',
        article: data.wpArticle
      });
    }
  });

  // Hide flash after tab opens
  setTimeout(() => { flash.classList.remove('visible'); }, 1500);
});

// ── Clear ──
document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.storage.local.remove('wpArticle');
  document.getElementById('captureTitle').textContent = 'No article captured';
  document.getElementById('captureStatus').className = 'status empty';
  document.getElementById('sendBtn').disabled = true;
  chrome.action.setBadgeText({ text: '' });
});

// ── Helpers ──
function showCaptured(article) {
  const title = article.title || 'Untitled';
  const words = article.html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
  document.getElementById('captureTitle').textContent = `${title} (${words} words)`;
  document.getElementById('captureStatus').className = 'status ready';
  updateSendBtn();
}

function updateSendBtn() {
  const statusEl = document.getElementById('captureStatus');
  const hasArticle = statusEl.classList.contains('ready');
  const hasBlog = !!selectedBlog;
  document.getElementById('sendBtn').disabled = !(hasArticle && hasBlog);
}
