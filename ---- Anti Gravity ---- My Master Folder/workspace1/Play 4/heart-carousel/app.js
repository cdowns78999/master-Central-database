document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const heartContainers = document.querySelectorAll('.heart-container');
    const hearts = document.querySelectorAll('.heart');

    let currentIndex = 0;

    function updateCarousel(index) {
        // Update Body Theme for Background Juice
        document.body.className = `theme-${index}`;

        // Update Buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        navButtons[index].classList.add('active');

        // Update Hearts
        heartContainers.forEach(container => container.classList.remove('active'));
        heartContainers[index].classList.add('active');

        currentIndex = index;
    }

    function pokeHeart(index) {
        const heart = heartContainers[index].querySelector('.heart');

        // Trigger poke animation
        heart.classList.remove('poked');
        void heart.offsetWidth; // Trigger reflow
        heart.classList.add('poked');

        // Play visual feedback
        console.log(`Poked Heart ${index}: ${heart.classList[1]}`);

        // Ensure carousel is updated to this heart
        if (currentIndex !== index) {
            updateCarousel(index);
        }
    }

    // Nav Button Event Listeners
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            updateCarousel(index);
            pokeHeart(index);
        });
    });

    // Heart Click Event Listeners (Direct Poke)
    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            pokeHeart(currentIndex);
        });
    });

    // Keyboard Navigation (Arrow Keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            let next = (currentIndex + 1) % heartContainers.length;
            updateCarousel(next);
            pokeHeart(next);
        } else if (e.key === 'ArrowLeft') {
            let prev = (currentIndex - 1 + heartContainers.length) % heartContainers.length;
            updateCarousel(prev);
            pokeHeart(prev);
        }
    });

    // Initial state
    updateCarousel(0);
});
