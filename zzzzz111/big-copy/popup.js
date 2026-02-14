async function performCopy() {
    const btn = document.getElementById('copyBtn');
    const ticker = document.getElementById('ticker');
    const copyToast = document.getElementById('copyToast');
    const includeHtml = document.getElementById('includeHtml').checked;
    const includeText = document.getElementById('includeText').checked;

    btn.disabled = true;
    btn.style.opacity = '0.3';

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
            throw new Error('RESTRICTED');
        }

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (includeHtml, includeText) => {
                let content = '';
                if (includeHtml) {
                    const doctype = document.doctype ? `<!DOCTYPE ${document.doctype.name}>\n` : '';
                    content += doctype + document.documentElement.outerHTML;
                    if (includeText) content += '\n\n';
                }
                if (includeText) {
                    content += '=== TEXT ===\n' + document.body.innerText;
                }
                return content;
            },
            args: [includeHtml, includeText]
        });

        const pageContent = results[0].result;
        await navigator.clipboard.writeText(pageContent);

        // Success Sequence
        if (copyToast) copyToast.classList.add('visible');
        if (ticker) ticker.classList.add('active');

        setTimeout(() => {
            window.close();
        }, 2200);

    } catch (error) {
        console.error('Copy failed:', error);
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.innerHTML = '<span>RETRY</span>';
    }
}

document.getElementById('copyBtn').addEventListener('click', performCopy);
// Optional auto-trigger if desired, but user might want to choose when to "Big Copy"
// document.addEventListener('DOMContentLoaded', performCopy);
