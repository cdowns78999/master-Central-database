const PROMPT_WORKFLOW = `under stand the context of the last output and the goals at hand.  with that, convert the above into a step by step, using the build the design form factor to achieve this:

You are a step-by-step workflow generator. Transform every query into sequential Workflow Phases. Break everything down into practically the smallest useful steps possible—a common, bite-sized granularity that anyone can execute without confusion.

**Workflow Template:**
Workflow Phase {Practical Title}
──────────
{Single, concrete action sentence (one operation only)}

** What Step Does:** {Practical effect of this step} and {how it connects from previous (if any) → to next step}

Output ONLY Workflow Phase blocks forming a complete process. One phase = one atomic step.`;

const PROMPT_TONE = "Adopt a more practical, senseable tone, without losing the spirit of the thoughtfulness of the article";

const PROMPT_VIDEO_PICKER = `Identify the top 10 highest-impact videos for the current project context. 
Focus on: Production quality, hook strength, and retention potential. 
Output as a numbered list with a 1-sentence "Why this works" for each video.`;

const PROMPT_TOPIC_SCOUT = `Extract the top 20 distinct content topics and hooks from the current research set. 
Group them by: Beginner, Advanced, and Viral/Controversial. 
One hook per line. Output only the hooks.`;

const STEPS = [
    "✌️ Set The Goal", "🟢 Set Their Phase Plan", "🟡 Contact Them", "🟡 Call Them",
    "🟡 Send Recap Email", "🟡 Update SIMS' Dash", "🟠 Follow Up", "🟣 Get Them To Purchase",
    "🔴 Get on: Group Weekly Call", "🔴 Get on: Weekly Personal Clal",
    "🔵 Report and Track Order", "🔵 Unique", "🔵 Problem"
];

let clipStack = [];

function updateTicker(msg) {
    const ticker = document.getElementById('ticker');
    if (ticker) ticker.textContent = msg + " • " + msg + " • ";
}

async function performCopy(text, msg) {
    try {
        await navigator.clipboard.writeText(text);
        updateTicker(msg);
        setTimeout(() => window.close(), 2500);
    } catch (err) {
        updateTicker("FAILED TO SYNC");
    }
}

async function performBigCopy() {
    updateTicker("EXTRACTING...");
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || tab.url.startsWith('chrome://')) throw new Error('RESTRICTED');

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const doctype = document.doctype ? `<!DOCTYPE ${document.doctype.name}>\n` : '';
                return doctype + document.documentElement.outerHTML + '\n\n=== TEXT ===\n' + document.body.innerText;
            }
        });

        await navigator.clipboard.writeText(results[0].result);
        updateTicker("PAGE SYNCED");
        setTimeout(() => window.close(), 2500);
    } catch (err) {
        updateTicker("SYNC ERROR");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    document.getElementById('btn-prompt')?.addEventListener('click', () => performCopy(PROMPT_WORKFLOW, "WORKFLOW GEN READY"));
    document.getElementById('btn-tone')?.addEventListener('click', () => performCopy(PROMPT_TONE, "TONE SYNCED"));
    document.getElementById('btn-sync')?.addEventListener('click', performBigCopy);

    // Phase 2
    document.getElementById('btn-vids')?.addEventListener('click', () => performCopy(PROMPT_VIDEO_PICKER, "10-VIDEO SCOUT ENGAGED"));
    document.getElementById('btn-topics')?.addEventListener('click', () => performCopy(PROMPT_TOPIC_SCOUT, "20-TOPIC MAPPING READY"));

    // Steps Logic
    const btnSteps = document.getElementById('btn-steps');
    const stepList = document.getElementById('step-list');

    btnSteps?.addEventListener('click', () => {
        stepList.classList.toggle('open');
    });

    STEPS.forEach((step, i) => {
        const item = document.createElement('div');
        item.className = 'step-item';
        item.innerHTML = `<span>[${(i + 1) % 10}]</span> ${step}`;
        item.addEventListener('click', () => {
            clipStack.push(step);
            navigator.clipboard.writeText(clipStack.join('\n'));
            updateTicker(`ITEM ADDED: ${step.toUpperCase()}`);
        });
        stepList.appendChild(item);
    });
});
