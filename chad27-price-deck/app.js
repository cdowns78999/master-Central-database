document.addEventListener('DOMContentLoaded', () => {
    const gridRoot = document.getElementById('grid-root');
    const viewTitle = document.getElementById('current-view-title');
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const logoCircle = document.querySelector('.logo-circle');
    const pageCategory = document.body.getAttribute('data-page-category') || "Top 20 Overall";

    // Secret Spotify Reveal
    const spotifyNav = document.querySelector('.nav-item[data-view="Spotify Matrix"]');
    if (localStorage.getItem('spotifyUnlocked') === 'true' && spotifyNav) {
        spotifyNav.classList.remove('hidden');
    }

    // Logo Circle Navigation (The Magic Toggle)
    if (logoCircle && spotifyNav) {
        // Initial visual state for Spotify page
        if (pageCategory === "Spotify Matrix") {
            logoCircle.style.borderColor = '#1DB954';
            logoCircle.style.boxShadow = '0 0 20px rgba(29, 185, 84, 0.5)';
        }

        logoCircle.addEventListener('click', () => {
            if (pageCategory === "Spotify Matrix") {
                // Return to Blue World
                logoCircle.style.transition = 'all 0.5s ease';
                logoCircle.style.borderColor = '#4da6ff';
                logoCircle.style.boxShadow = '0 0 40px rgba(77, 166, 255, 0.8)';

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            } else {
                // Enter Green World
                spotifyNav.classList.remove('hidden');
                localStorage.setItem('spotifyUnlocked', 'true');

                // Visual feedback - Spotify Green Pulse
                logoCircle.style.transition = 'all 0.5s ease';
                logoCircle.style.borderColor = '#1DB954';
                logoCircle.style.boxShadow = '0 0 40px rgba(29, 185, 84, 0.8)';

                setTimeout(() => {
                    window.location.href = 'spotify.html';
                }, 800);
            }
        });
    }

    // Initial render: Detect category from active nav item or body attribute
    const activeItem = document.querySelector('.nav-item.active');
    const initialView = activeItem ? activeItem.getAttribute('data-view') : "Top 20 Overall";
    renderView(initialView);

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
                // Determine label: Spotify/SoundCloud/YouTube/Press Pkgs are "price", rest are "monthly"
                const isPrice = ["Spotify Matrix", "Press Packages", "YouTube Matrix", "SoundCloud Matrix"].includes(category);
                const label = isPrice ? "price" : "monthly";

                // Clinical reach cleanup: remove " monthly" if it exists in the data
                const cleanReach = outlet.reach.replace(/\s*monthly\s*$/i, '');

                const reachContent = wrapChars(cleanReach);
                const card = createOutletCard(outlet, index, `<span class="stardust-wrapper">${reachContent}</span>`, label);
                grid.appendChild(card);
            });

            gridRoot.appendChild(grid);
            gridRoot.style.opacity = '1';
        }, 200);
    }

    function createOutletCard(outlet, index, reachContent, label) {
        const row = document.createElement('div');
        row.className = 'selection-row';
        if (outlet.url) {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => {
                window.open(outlet.url, '_blank');
            });
        }

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
            <div class="selection-data" data-label="${label}">
                ${reachContent}
            </div>
        `;

        return row;
    }
});
