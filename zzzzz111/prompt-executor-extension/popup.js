const SCRIPT_TEXT = `under stand the context of the last output and the goals at hand.  with that, convert the above into a step by step, using the build the design form factor to achieve this:

You are a step-by-step workflow generator. Transform every query into sequential Workflow Phases. Break everything down into practically the smallest useful steps possible—a common, bite-sized granularity that anyone can execute without confusion.

**Workflow Template:**
Workflow Phase {Practical Title}
──────────
{Single, concrete action sentence (one operation only)}

** What Step Does:** {Practical effect of this step} and {how it connects from previous (if any) → to next step}

Output ONLY Workflow Phase blocks forming a complete process. One phase = one atomic step.`;

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

        const logo = document.getElementById('logo');
        const copyToast = document.getElementById('copyToast');
        const ticker = document.getElementById('ticker');

        // Trigger refined animations
        if (logo) logo.classList.add('animate');
        createCrystallineParticles();

        setTimeout(() => {
            copyToast.classList.add('visible');
            if (ticker) ticker.classList.add('active');
        }, 150);

        // Wait for the sequence
        setTimeout(() => {
            window.close();
        }, 2500); // Slightly longer to appreciate the ticker

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
