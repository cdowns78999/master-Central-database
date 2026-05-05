document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const viewTitle = document.getElementById('current-view-title');
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const logoCircle = document.querySelector('.logo-circle');

    // Secret Spotify Reveal
    const spotifyNav = document.querySelector('.nav-item[data-view="Spotify Matrix"]');
    if (localStorage.getItem('spotifyUnlocked') === 'true' && spotifyNav) {
        spotifyNav.classList.remove('hidden');
    }

    if (logoCircle && spotifyNav) {
        logoCircle.addEventListener('click', () => {
            spotifyNav.classList.remove('hidden');
            localStorage.setItem('spotifyUnlocked', 'true');
            // Visual feedback - Spotify Green Pulse
            logoCircle.style.transition = 'all 0.5s ease';
            logoCircle.style.borderColor = '#1DB954';
            logoCircle.style.boxShadow = '0 0 40px rgba(29, 185, 84, 0.8)';

            // Auto-navigate to the new world after a brief delay
            setTimeout(() => {
                window.location.href = 'spotify.html';
            }, 800);
        });
    }

    // Initial render: Detect category from active nav item or body attribute
    const activeItem = document.querySelector('.nav-item.active');
    const initialView = activeItem ? activeItem.getAttribute('data-view') : "Top 20 Overall";
    renderView(initialView);
    // Initial render: Detect category from body attribute (for multi-page support)
    const pageCategory = document.body.getAttribute('data-page-category') || "Top 20 Overall";

    // Set active state in sidebar based on current page category
    navItems.forEach(item => {
        if (item.getAttribute('data-view') === pageCategory) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    renderView(pageCategory);

    // Navigation setup
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                // Let the browser handle the page transition
                return;
            }

            e.preventDefault();
            const view = item.getAttribute('data-view');
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            renderView(view);
        });
    });

    function renderView(category) {
        if (typeof mediaData === 'undefined' || !gridRoot) return;

        // Visual feedback
        gridRoot.style.opacity = '0';

        setTimeout(() => {
            gridRoot.innerHTML = '';
            viewTitle.textContent = category;

            const outlets = mediaData[category] || [];

            const grid = document.createElement('div');
            grid.className = 'outlet-grid';

            // Helper to wrap characters for reveal effects
            const wrapChars = (text) => {
                return text.split('').map((char, i) =>
                    `<span class="reveal-char" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
            };

            outlets.forEach((outlet, index) => {
                const reachContent = wrapChars(outlet.reach);
                const card = createOutletCard(outlet, index, `<span class="stardust-wrapper">${reachContent}</span>`);
                grid.appendChild(card);
            });

            gridRoot.appendChild(grid);
            gridRoot.style.opacity = '1';
        }, 200);
    }

    function createOutletCard(outlet, index, reachContent) {
        const row = document.createElement('div');
        row.className = 'selection-row';

        // Brand Styles
        const brandColor = outlet.color || '#2563eb';
        const photoId = outlet.pId;
        const unsplashUrl = photoId
            ? `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=400`
            : `https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400`;

        row.innerHTML = `
            <div class="selection-box" 
                 style="--brand-color: ${brandColor}; --brand-bg-img: url('${unsplashUrl}');"
                 title="${outlet.name}">
                <div class="selection-box-overlay"></div>
                <span class="selection-box-text">${outlet.name}</span>
            </div>

            <div class="divider-pipe"></div>
            <div class="selection-data">
                ${reachContent}
            </div>
        `;

        return row;
    }
});
