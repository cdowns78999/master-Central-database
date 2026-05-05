async function performCopy() {
    const btn = document.getElementById('copyBtn');
    const status = document.getElementById('status');
    const includeHtml = document.getElementById('includeHtml').checked;
    const includeText = document.getElementById('includeText').checked;

    btn.disabled = true;
    btn.textContent = 'Copying...';

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Basic check for restricted URLs
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
            throw new Error('Cannot copy content from browser internal pages.');
        }

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (includeHtml, includeText) => {
                let content = '';

                if (includeHtml) {
                    const doctype = document.doctype
                        ? `<!DOCTYPE ${document.doctype.name}>\n`
                        : '';
                    content += doctype + document.documentElement.outerHTML;

                    if (includeText) {
                        content += '\n\n';
                    }
                }

                if (includeText) {
                    content += '=== TEXT ===\n';
                    content += document.body.innerText;
                }

                return content;
            },
            args: [includeHtml, includeText]
        });

        const pageContent = results[0].result;

        // Use standard clipboard API
        await navigator.clipboard.writeText(pageContent);

        btn.textContent = 'Copied!';
        btn.style.background = '#28a745';

        status.textContent = 'Content copied to clipboard!';
        status.className = 'success';

        // Auto-close after a brief moment
        setTimeout(() => {
            window.close();
        }, 1000);

    } catch (error) {
        console.error('Copy failed:', error);
        status.textContent = 'Failed: ' + error.message;
        status.className = 'error';
        status.style.display = 'block';
        btn.textContent = 'Copy Page';
        btn.disabled = false;
    }
}

// Auto-trigger on popup open
document.addEventListener('DOMContentLoaded', performCopy);

// Still allow manual click just in case
document.getElementById('copyBtn').addEventListener('click', performCopy);
