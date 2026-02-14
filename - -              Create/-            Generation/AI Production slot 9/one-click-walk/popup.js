document.addEventListener('DOMContentLoaded', async () => {
    const tile = document.getElementById('copy-tile');
    const wordToCopy = 'walk';

    const copyWord = async () => {
        try {
            await navigator.clipboard.writeText(wordToCopy);

            // Visual feedback
            tile.classList.add('copied');
            const indicator = tile.querySelector('.indicator');
            indicator.style.transform = 'scale(1.2)';

            console.log(`Copied: ${wordToCopy}`);

            // Auto close after showing success for a brief moment
            setTimeout(() => {
                window.close();
            }, 800);

        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Copy immediately on open (1-click experience)
    copyWord();

    // Also copy on click just in case
    tile.addEventListener('click', copyWord);
});
