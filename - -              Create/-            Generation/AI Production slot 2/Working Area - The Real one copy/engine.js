/**
 * Return To Grace | Engine.js
 * High-Fidelity Data Orchestration & Interaction Logic
 */

const CONFIG = {
    particleCount: 70,
    accentColor: 'rgba(76, 201, 240, 1)',
    stonePalette: {
        bg: '#0c0f13',
        card: '#14181e',
        surface: '#1a1f27',
        press: '#5eb5c9',
        spotify: '#4aba70',
        social: '#c975a8',
        other: '#d4a54a'
    }
};

class CampaignEngine {
    constructor() {
        this.data = null;
        this.particles = [];
        this.init();
    }

    async init() {
        console.log("💎 Engine: Initializing God-Mode...");
        this.setupBackground();
        await this.loadData();
        this.renderShell();
    }

    setupBackground() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.particles = Array.from({ length: CONFIG.particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                s: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                o: Math.random() * 0.3 + 0.1
            }));
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.fillStyle = `rgba(76, 201, 240, ${p.o})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        window.onresize = resize;
        resize(); animate();
    }

    async loadData() {
        // Mock data for now, will connect to data.json later
        this.data = {
            clients: [
                {
                    id: 'client_01',
                    name: 'Global Beats Sync',
                    status: 'Active',
                    metrics: { revenue: '$1.2M', launches: 8 }
                },
                {
                    id: 'client_02',
                    name: 'Lumina PR Audit',
                    status: 'Standby',
                    metrics: { revenue: '$450K', launches: 3 }
                }
            ]
        };
    }

    renderShell() {
        console.log("💎 Engine: Rendering Tactical UI...");
        const sidebar = document.getElementById('sidebar-content');
        if (sidebar) {
            sidebar.innerHTML = `
                <div class="phase-section">
                    <h2 class="phase-title" style="font-size: 0.75rem; color: var(--primary); text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;">
                        Navigation
                        <div style="flex-grow: 1; height: 1px; background: linear-gradient(to right, rgba(76, 201, 240, 0.3), transparent);"></div>
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${['Full Launch List', 'Weekly Sports Map', 'Campaign Staging'].map(item => `
                            <div class="mini-btn" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: var(--transition);">
                                <div style="width: 6px; height: 6px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 8px var(--primary);"></div>
                                <span style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px;">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
}

// Global hook
window.engine = new CampaignEngine();
