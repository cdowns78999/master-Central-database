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
  let clipStack = [];

  const fields = [
    "✌️ Set The Goal", "🟢 Set Their Phase Plan", "🟡 Contact Them", "🟡 Call Them",
    "🟡 Send Recap Email", "🟡 Update SIMS' Dash", "🟠 Follow Up", "🟣 Get Them To Purchase",
    "🔴 Get on: Group Weekly Call", "🔴 Get on: Weekly Personal Clal",
    "🔵 Report and Track Order", "🔵 Unique", "🔵 Problem"
  ];

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
      this.color = ['#4285F4', '#EA4335', '#FBBC05', '#AF52BF'][Math.floor(Math.random() * 4)];
      this.opacity = this.isForeground ? (0.4 + Math.random() * 0.4) : (0.2 + Math.random() * 0.3);
      this.angle = Math.random() * Math.PI * 2;
      this.velocity = 0.1 + Math.random() * 0.15;
      this.angleVel = (Math.random() - 0.5) * 0.02;
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
      const limit = 50;
      if (dist < limit) {
        const force = (limit - dist) / limit;
        this.offsetX += (dx / dist) * force * 1.2;
        this.offsetY += (dy / dist) * force * 1.2;
      }
      this.offsetX *= 0.94;
      this.offsetY *= 0.94;
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
    for (let i = 0; i < 100; i++) {
      const p = new Particle(i % 2 === 0);
      // Pre-simulate 250 frames (~4 seconds)
      for (let j = 0; j < 250; j++) p.update();
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

    fields.forEach((field, index) => {
      // Create glass card
      const card = document.createElement('div');
      card.className = 'field-card';
      card.id = `card-${index}`;

      // Create text label (top layer)
      const label = document.createElement('div');
      label.className = 'field-label';
      label.id = `label-${index}`;

      // Index display (1-9, 0)
      const displayIndex = (index + 1) % 10;
      label.innerHTML = `
        <span class="field-index">[${displayIndex}]</span>
        <span class="field-text">${field}</span>
      `;

      const handleAction = () => {
        clipStack.push(field);
        navigator.clipboard.writeText(clipStack.join('\n')).then(() => {
          card.classList.add('success');
          label.classList.add('success');
          setTimeout(() => {
            card.classList.remove('success');
            label.classList.remove('success');
          }, 450);
        });
      };

      card.onclick = handleAction;
      listArea.appendChild(card);
      fieldsContainer.appendChild(label);
    });
  };

  // Keyboard Shortcuts
  window.addEventListener('keydown', e => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
      const index = key === '0' ? 9 : parseInt(key) - 1;
      const card = document.getElementById(`card-${index}`);
      if (card) card.click();
    }
  });

  // Clear Button
  document.getElementById('clearBtn').addEventListener('click', () => {
    clipStack = [];
    navigator.clipboard.writeText('').then(() => {
      const btn = document.getElementById('clearBtn');
      const originalText = btn.innerText;
      btn.innerText = 'CLEARED';
      btn.style.background = 'rgba(255, 255, 255, 0.2)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1000);
    });
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', resize);
  resize();
  createParticles();
  renderFields();
  animate();
});