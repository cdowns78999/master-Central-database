document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const progressBars = document.querySelectorAll('.progress-bar');
    let currentSlide = 0;
    const slideDuration = 5000; // 5 seconds per slide
    let slideTimer;

    function resetTimer() {
        if (slideTimer) clearInterval(slideTimer);
        const startTime = Date.now();

        slideTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed / slideDuration) * 100;

            if (progress >= 100) {
                nextSlide();
            } else {
                const fill = progressBars[currentSlide].querySelector('.progress-fill');
                if (fill) fill.style.width = `${progress}%`;
            }
        }, 16);
    }

    function showSlide(index) {
        // Clear all progress
        progressBars.forEach((bar, i) => {
            const fill = bar.querySelector('.progress-fill');
            if (i < index) {
                fill.style.width = '100%';
                bar.classList.add('filled');
                bar.classList.remove('active');
            } else if (i === index) {
                fill.style.width = '0%';
                bar.classList.add('active');
                bar.classList.remove('filled');
            } else {
                fill.style.width = '0%';
                bar.classList.remove('active', 'filled');
            }
        });

        // Toggle slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        currentSlide = index;
        resetTimer();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        } else {
            // Loop back to start (optional, or stay at end)
            showSlide(0);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Tap Handling
    document.querySelector('.tap-left').addEventListener('click', prevSlide);
    document.querySelector('.tap-right').addEventListener('click', nextSlide);

    // Initial Start
    showSlide(0);
});
