const SCRIPT_TEXT = "Adopt a more practical, sensible tone, while maintaining a deep, warm, almost pseudo-spiritual 'i know im on the right path' essence of thoughtfulness of the article";

function createCrystallineParticles() {
    const container = document.querySelector('.container');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random trajectory from center
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.opacity = '1';
        particle.style.animation = `particleBurst ${0.8 + Math.random() * 0.5}s ease-out forwards`;

        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

async function execute() {
    try {
        await navigator.clipboard.writeText(SCRIPT_TEXT);

        const copyToast = document.getElementById('copyToast');
        const ticker = document.getElementById('ticker');

        // Trigger premium animations
        createCrystallineParticles();

        setTimeout(() => {
            copyToast.classList.add('visible');
            if (ticker) ticker.classList.add('active');
        }, 200);

        // Success sequence: wait for breathing dot then close
        setTimeout(() => {
            window.close();
        }, 2200);

    } catch (err) {
        console.error('Failed to copy: ', err);
        const copyToast = document.getElementById('copyToast');
        copyToast.textContent = 'c';

        // Sequence: Reveal -> Scale Up -> Close
        setTimeout(() => {
            copyToast.classList.add('error', 'visible');
        }, 400);

        setTimeout(() => {
            copyToast.classList.add('zooming');
        }, 1200);

        setTimeout(() => {
            window.close();
        }, 1800);
    }
}

// Small delay to ensure the popup is fully rendered before copying/closing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(execute, 150);
});
