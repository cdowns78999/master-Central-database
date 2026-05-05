// ── Content Script: runs on wp-admin/post-new.php and post.php ──

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== 'pasteArticle') return;

  const article = msg.article;

  // ── Try Classic Editor first ──
  const classicTextarea = document.getElementById('content');
  const textTab = document.getElementById('content-html');
  const visualTab = document.getElementById('content-tmce');
  const titleField = document.getElementById('title');

  if (classicTextarea) {
    // Set title
    if (titleField && article.title) {
      titleField.value = article.title;
      titleField.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Switch to Text tab
    if (textTab) textTab.click();

    // Small delay to let the tab switch render
    setTimeout(() => {
      // Paste HTML
      classicTextarea.value = article.html;
      classicTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      classicTextarea.dispatchEvent(new Event('change', { bubbles: true }));

      // Switch to Visual tab to see it rendered
      setTimeout(() => {
        if (visualTab) visualTab.click();
      }, 300);

      showNotice('Article dropped in! Review and publish.');
    }, 200);

    return;
  }

  // ── Try Gutenberg Editor ──
  const gutenbergTitle = document.querySelector('.editor-post-title__input, .wp-block-post-title');
  if (gutenbergTitle) {
    // Set title
    if (article.title) {
      gutenbergTitle.textContent = article.title;
      gutenbergTitle.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Open code editor: Ctrl+Shift+Alt+M
    // Or use the "More tools" > "Code editor" menu
    const moreMenuBtn = document.querySelector('.edit-post-more-menu button, .interface-more-menu-dropdown button');
    if (moreMenuBtn) {
      moreMenuBtn.click();
      setTimeout(() => {
        // Look for "Code editor" option
        const menuItems = document.querySelectorAll('.components-menu-item__button, button[role="menuitem"]');
        for (const item of menuItems) {
          if (item.textContent.includes('Code editor')) {
            item.click();
            break;
          }
        }

        setTimeout(() => {
          const codeTextarea = document.querySelector('.editor-post-text-editor');
          if (codeTextarea) {
            codeTextarea.value = article.html;
            codeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            showNotice('Article dropped into Gutenberg code editor! Switch to Visual to review.');
          }
        }, 300);
      }, 200);
    }

    return;
  }

  showNotice('Could not find WordPress editor on this page.');
});

// ── Visual notice ──
function showNotice(msg) {
  const notice = document.createElement('div');
  notice.style.cssText = `
    position: fixed;
    top: 40px;
    right: 20px;
    background: #00a32a;
    color: #fff;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  notice.textContent = msg;
  document.body.appendChild(notice);
  setTimeout(() => notice.remove(), 4000);
}
