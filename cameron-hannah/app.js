/* ============================================
   CAMERON & HANNAH - WEB APP JAVASCRIPT
   Modern 3D Interactions & Effects
   ============================================ */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initParallax();
    initTiltCards();
    initTiles();
    initNavButtons();
    initRippleEffect();
    hideLoadingScreen();
});

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
    `;

    container.appendChild(particle);
}

/* ============================================
   3D PARALLAX EFFECT
   ============================================ */
function initParallax() {
    const container = document.getElementById('parallaxContainer');
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        mouseX = (e.clientX - centerX) / centerX;
        mouseY = (e.clientY - centerY) / centerY;
    });

    // Smooth animation loop
    function animate() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        const rotateY = targetX * 5;
        const rotateX = -targetY * 5;

        container.style.transform = `
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;

        requestAnimationFrame(animate);
    }

    animate();

    // Device orientation for mobile
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma === null || e.beta === null) return;

            mouseX = e.gamma / 45; // -1 to 1
            mouseY = (e.beta - 45) / 45; // Adjusted for typical phone holding angle
        });
    }
}

/* ============================================
   3D TILT CARDS
   ============================================ */
function initTiltCards() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('mouseenter', startTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(20px)
        scale(1.02)
    `;

    // Shine effect
    const shine = card.querySelector('.nav-card-inner');
    if (shine) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        shine.style.background = `
            radial-gradient(
                circle at ${percentX}% ${percentY}%,
                rgba(255, 255, 255, 0.1) 0%,
                var(--glass-bg) 50%
            )
        `;
    }
}

function startTilt(e) {
    e.currentTarget.style.transition = 'none';
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = '';

    const shine = card.querySelector('.nav-card-inner');
    if (shine) {
        shine.style.background = '';
    }
}

/* ============================================
   INTERACTIVE TILES
   ============================================ */
function initTiles() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        tile.addEventListener('mousemove', handleTileMove);
        tile.addEventListener('mouseleave', resetTile);
        tile.addEventListener('click', handleTileClick);
    });
}

function handleTileMove(e) {
    const tile = e.currentTarget;
    const rect = tile.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 8;
    const tiltY = (centerX - x) / 8;

    tile.style.setProperty('--tilt-x', tiltX);
    tile.style.setProperty('--tilt-y', tiltY);
    tile.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    tile.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
}

function resetTile(e) {
    const tile = e.currentTarget;
    tile.style.setProperty('--tilt-x', 0);
    tile.style.setProperty('--tilt-y', 0);
}

function handleTileClick(e) {
    const tile = e.currentTarget;
    const action = tile.dataset.action;

    // Add click animation
    tile.style.transform = 'scale(0.95)';
    setTimeout(() => {
        tile.style.transform = '';
    }, 150);

    // Handle different tile actions
    if (action) {
        switch (action) {
            case 'love':
                showToast('&#10084;', 'Love is in the air!');
                break;
            case 'joy':
                showToast('&#128522;', 'Spreading pure joy!');
                break;
            case 'magic':
                showToast('&#10024;', "You're absolutely magical!");
                createConfetti();
                break;
            case 'surprise':
                showModal();
                break;
        }
    }
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(icon, message) {
    let container = document.querySelector('.toast-container');

    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============================================
   MODAL SYSTEM
   ============================================ */
function showModal() {
    const modal = document.getElementById('surpriseModal') || document.getElementById('infoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/* ============================================
   CONFETTI EFFECT
   ============================================ */
function createConfetti() {
    const colors = ['#ff2d75', '#9333ea', '#00d4ff', '#ffd700', '#ffffff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }

    // Add confetti keyframes if not exists
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   NAV BUTTONS
   ============================================ */
function initNavButtons() {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;

            switch (action) {
                case 'theme':
                    toggleTheme();
                    break;
                case 'info':
                    const modal = document.getElementById('infoModal');
                    if (modal) modal.classList.add('active');
                    break;
            }
        });
    });
}

/* ============================================
   THEME TOGGLE
   ============================================ */
function toggleTheme() {
    document.body.classList.toggle('theme-light');

    // Save preference
    const isLight = document.body.classList.contains('theme-light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    showToast(isLight ? '&#9728;' : '&#127769;', isLight ? 'Light mode activated' : 'Dark mode activated');
}

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('theme-light');
    }
}
loadTheme();

/* ============================================
   RIPPLE EFFECT
   ============================================ */
function initRippleEffect() {
    const elements = document.querySelectorAll('.tile, .nav-btn, .modal-close');

    elements.forEach(el => {
        el.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

/* ============================================
   LOADING SCREEN
   ============================================ */
function hideLoadingScreen() {
    const loading = document.querySelector('.loading-screen');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 500);
    }
}

/* ============================================
   SMOOTH PAGE TRANSITIONS
   ============================================ */
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#') || href.startsWith('http')) return;

        e.preventDefault();

        // Fade out animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

/* ============================================
   GLOBAL MODAL FUNCTION (for onclick)
   ============================================ */
window.closeModal = closeModal;
window.showModal = showModal;
