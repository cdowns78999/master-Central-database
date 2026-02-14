const trainingVideos = [
    {
        title: "UE5 Path Tracing 2026",
        url: "https://www.youtube.com/watch?v=FpH2Z20W_eA", // Representative 2026 cinematic link
        desc: "Master high-fidelity path tracing for cinematic renders."
    },
    {
        title: "Matrix Rain Effect: Resolve",
        url: "https://www.youtube.com/watch?v=q5zGC-C6dKg",
        desc: "Fusion tutorial for digital rain and glitch effects."
    },
    {
        title: "Sound Collective NYC // Rich Furniss",
        url: "https://www.youtube.com/@SoundCollectiveNYC",
        desc: "Artist channel for Rich Furniss & NYC Matrix vibe."
    },
    {
        title: "Virtual Production Foundations",
        url: "https://www.youtube.com/watch?v=83R5-B1Zhlg",
        desc: "Introduction to LED volumes and tracking systems."
    }
];

// UI Helpers
function initApp() {
    // Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('hud-clock').innerText = now.toLocaleTimeString('en-US', { hour12: false });
    }, 1000);

    // Navigation
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.view);
        });
    });

    // Drawer Toggles
    const panel = document.getElementById('workflow-panel');
    document.getElementById('open-workflow').addEventListener('click', () => {
        panel.classList.remove('closed');
    });

    document.getElementById('close-drawer').addEventListener('click', () => {
        panel.classList.add('closed');
    });

    // Training Video Injection
    const videoGrid = document.getElementById('training-videos');
    videoGrid.innerHTML = trainingVideos.map(vid => `
        <div class="video-card">
            <div class="video-info">
                <strong>${vid.title}</strong>
                <p class="phase-desc">${vid.desc}</p>
                <div class="video-url">${vid.url}</div>
            </div>
            <div style="margin-top: 1rem">
                <a href="${vid.url}" target="_blank" class="view-btn" style="text-decoration: none; display: inline-block; width: 100%; text-align: center">OPEN FEED</a>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', initApp);
