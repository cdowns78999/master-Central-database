document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const topCanvas = document.getElementById('top-particle-canvas');
    const topCtx = topCanvas.getContext('2d');
    const listArea = document.getElementById('listArea');
    const textArea = document.getElementById('textArea');

    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Slot state: true for available, false for taken
    let slots = [
        { label: "Monday 10AM", available: true },
        { label: "Monday 2PM", available: true },
        { label: "Tuesday 11AM", available: true },
        { label: "Tuesday 3PM", available: true },
        { label: "Wednesday 10AM", available: true },
        { label: "Thursday 1PM", available: true },
        { label: "Friday 11AM", available: true }
    ];

    // Load state from storage
    chrome.storage.local.get(['callSlots'], (result) => {
        if (result.callSlots) {
            slots = result.callSlots;
        }
        renderFields();
    });

    class Particle {
        constructor(isForeground) {
            this.isForeground = isForeground;
            this.init();
        }
        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = 0.5 + Math.random() * 0.7;
            this.length = 2 + Math.random() * 3;
            this.color = ['#00f2ff', '#ffffff', '#444444'][Math.floor(Math.random() * 3)];
            this.opacity = this.isForeground ? (0.4 + Math.random() * 0.4) : (0.2 + Math.random() * 0.3);
            this.angle = Math.random() * Math.PI * 2;
            this.velocity = 0.08 + Math.random() * 0.12;
            this.angleVel = (Math.random() - 0.5) * 0.015;
            this.offsetX = 0;
            this.offsetY = 0;
        }
        update() {
            this.angle += this.angleVel;
            let targetX = Math.cos(this.angle) * this.velocity;
            let targetY = Math.sin(this.angle) * this.velocity;
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const limit = 60;
            if (dist < limit) {
                const force = (limit - dist) / limit;
                this.offsetX += (dx / dist) * force * 1.5;
                this.offsetY += (dy / dist) * force * 1.5;
            }
            this.offsetX *= 0.95;
            this.offsetY *= 0.95;
            this.x += targetX + this.offsetX;
            this.y += targetY + this.offsetY;
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }
        draw(targetCtx) {
            targetCtx.save();
            targetCtx.translate(this.x, this.y);
            targetCtx.rotate(this.angle + Math.PI / 2);
            targetCtx.globalAlpha = this.opacity;
            targetCtx.fillStyle = this.color;
            targetCtx.beginPath();
            const r = this.radius;
            const h = this.length;
            targetCtx.moveTo(-r, -h / 2);
            targetCtx.lineTo(-r, h / 2);
            targetCtx.arc(0, h / 2, r, Math.PI, 0);
            targetCtx.lineTo(r, -h / 2);
            targetCtx.arc(0, -h / 2, r, 0, Math.PI);
            targetCtx.fill();
            targetCtx.restore();
        }
    }

    const resize = () => {
        width = canvas.width = topCanvas.width = window.innerWidth;
        height = canvas.height = topCanvas.height = window.innerHeight;
    };

    const createParticles = () => {
        particles = [];
        for (let i = 0; i < 80; i++) {
            const p = new Particle(i % 3 === 0);
            for (let j = 0; j < 200; j++) p.update();
            particles.push(p);
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        topCtx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw(p.isForeground ? topCtx : ctx);
        });
        requestAnimationFrame(animate);
    };

    const renderFields = () => {
        listArea.innerHTML = '';
        const fieldsContainer = document.getElementById('fieldsContainer');
        fieldsContainer.innerHTML = '';

        slots.forEach((slot, index) => {
            const card = document.createElement('div');
            card.className = `field-card ${slot.available ? 'available' : 'taken'}`;

            const label = document.createElement('div');
            label.className = 'field-label';
            label.innerHTML = `
        <span class="field-text">${slot.label}</span>
        <span class="status-emoji">${slot.available ? '✅' : '❌'}</span>
      `;

            card.onclick = () => {
                slots[index].available = !slots[index].available;
                chrome.storage.local.set({ callSlots: slots });
                renderFields();
            };

            listArea.appendChild(card);
            fieldsContainer.appendChild(label);
        });
    };

    // Copy Availability Logic
    document.getElementById('copyBtn').onclick = () => {
        let text = "📅 CALL AVAILABILITY THIS WEEK:\n\n";
        slots.forEach(slot => {
            text += `${slot.available ? '✅' : '❌'} ${slot.label}\n`;
        });

        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalText = btn.innerText;
            btn.innerText = 'COPIED TO CLIPBOARD!';
            btn.style.background = '#4ade80';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
            }, 1500);
        });
    };

    // Reset Logic
    document.getElementById('resetBtn').onclick = () => {
        slots = slots.map(s => ({ ...s, available: true }));
        chrome.storage.local.set({ callSlots: slots });
        renderFields();
    };

    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    animate();
});
