/* ═══════════════════════════════════════════════════════════════
   LABEL FINDER v4 — app.js
   Data-first buttons: grade, releases, top artist, reach
   Field tags: sub-genre, country, year, roster
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Flatten all labels into one array ──
    var allLabels = labelData['All Labels'];

    // ── Filter map for sidebar ──
    var filterMap = {
        all: function () { return allLabels; },
        bass: function () {
            return allLabels.filter(function (l) {
                var s = (l.sub + ' ' + l.tags.join(' ')).toLowerCase();
                return /bass|dubstep|trap|drum/.test(s);
            });
        },
        house: function () {
            return allLabels.filter(function (l) {
                var s = (l.sub + ' ' + l.tags.join(' ')).toLowerCase();
                return /house|dance/.test(s);
            });
        },
        techno: function () {
            return allLabels.filter(function (l) {
                var s = (l.sub + ' ' + l.tags.join(' ')).toLowerCase();
                return /techno|minimal/.test(s);
            });
        },
        progressive: function () {
            return allLabels.filter(function (l) {
                var s = (l.sub + ' ' + l.tags.join(' ')).toLowerCase();
                return /progressive|trance/.test(s);
            });
        },
        melodic: function () {
            return allLabels.filter(function (l) {
                var s = (l.sub + ' ' + l.tags.join(' ')).toLowerCase();
                return /melodic|organic|chill|deep/.test(s);
            });
        },
        riddim: function () { return []; }
    };

    var viewTitles = {
        all: 'ALL LABELS',
        bass: 'BASS / DUBSTEP',
        house: 'HOUSE / TECH HOUSE',
        techno: 'TECHNO',
        progressive: 'PROGRESSIVE',
        melodic: 'MELODIC',
        riddim: 'RIDDIM'
    };

    // ── State ──
    var currentView = 'all';
    var currentSort = null;
    var heroVisible = true;
    var logoGenre = 'bass'; // toggles between bass/house on logo click

    // ── DOM refs ──
    var gridRoot = document.getElementById('gridRoot');
    var sectionTitle = document.getElementById('sectionTitle');
    var labelCount = document.getElementById('labelCount');
    var searchInput = document.getElementById('searchInput');
    var hoverCard = document.getElementById('hoverCard');
    var heroOverlay = document.getElementById('heroOverlay');

    // ══════════════════════════════════════════
    // HELPER FUNCTIONS
    // ══════════════════════════════════════════

    function fmtNum(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return Math.round(n / 1000) + 'K';
        return String(n);
    }

    function topArtist(label) {
        if (!label.artists || !label.artists.length) return '\u2014';
        var top = label.artists.reduce(function (a, b) {
            return (a.listeners || 0) > (b.listeners || 0) ? a : b;
        });
        return top.name;
    }

    function totalReach(label) {
        if (!label.artists) return 0;
        return label.artists.reduce(function (sum, a) { return sum + (a.reach || 0); }, 0);
    }

    function topArtistListeners(label) {
        if (!label.artists || !label.artists.length) return 0;
        return Math.max.apply(null, label.artists.map(function (a) { return a.listeners || 0; }));
    }

    function trendArrow(t) {
        if (t === 'up') return '<span class="trend-up">\u2191</span>';
        if (t === 'down') return '<span class="trend-down">\u2193</span>';
        return '<span class="trend-steady">\u2192</span>';
    }

    // ── Abbreviation helpers for compact field tags ──
    function abbrevType(t) {
        if (t === 'independent') return 'indpndnt';
        if (t === 'major-backed') return 'mjr-bkd';
        return t;
    }

    function abbrevCountry(c) {
        var map = {
            'United States': 'US', 'United Kingdom': 'UK', 'Netherlands': 'NL',
            'Canada': 'CA', 'Sweden': 'SE', 'Germany': 'DE', 'Italy': 'IT',
            'Spain': 'ES', 'Belgium': 'BE'
        };
        return map[c] || c.substring(0, 3);
    }

    // ── Sort labels ──
    function sortLabels(labels, sortKey) {
        var arr = labels.slice();
        if (sortKey === 'roster') arr.sort(function (a, b) { return (b.roster || 0) - (a.roster || 0); });
        else if (sortKey === 'year') arr.sort(function (a, b) { return (a.founded || 9999) - (b.founded || 9999); });
        else if (sortKey === 'az') arr.sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
        else if (sortKey === 'reach') arr.sort(function (a, b) { return totalReach(b) - totalReach(a); });
        else if (sortKey === 'relevance') arr.sort(function (a, b) { return (b.avgStreams || 0) - (a.avgStreams || 0); });
        else if (sortKey === 'releases') arr.sort(function (a, b) { return (b.releases2025 || 0) - (a.releases2025 || 0); });
        else if (sortKey === 'topartist') arr.sort(function (a, b) { return topArtistListeners(b) - topArtistListeners(a); });
        return arr;
    }

    // ── Search filter ──
    function filterBySearch(labels, query) {
        if (!query) return labels;
        var q = query.toLowerCase();
        return labels.filter(function (l) {
            var haystack = [
                l.name, l.sub, l.country, l.type, l.assoc || '',
                (l.tags || []).join(' ')
            ].join(' ').toLowerCase();
            return haystack.indexOf(q) !== -1;
        });
    }

    // ══════════════════════════════════════════
    // RENDER
    // ══════════════════════════════════════════

    function render() {
        var baseLabels = filterMap[currentView]();
        var query = searchInput.value.trim();
        var filtered = filterBySearch(baseLabels, query);
        if (currentSort) filtered = sortLabels(filtered, currentSort);

        // Update section title + count
        sectionTitle.textContent = viewTitles[currentView] || 'ALL LABELS';
        labelCount.textContent = filtered.length + ' labels';

        if (currentView === 'riddim' && !query) {
            gridRoot.innerHTML = '<div style="font-family: \'JetBrains Mono\', monospace; font-size: 0.7rem; color: #cbd5e0; padding: 40px 0;">// coming soon</div>';
            return;
        }

        var html = '';
        filtered.forEach(function (label, idx) {
            var color = label.color || '#111827';
            var grade = label.streamGrade || 'C';
            var avgStr = label.avgStreams ? fmtNum(label.avgStreams) : '\u2014';
            var rel2025 = label.releases2025 || 0;
            var topName = topArtist(label);
            var reach = totalReach(label);

            html += '<div class="selection-row" data-idx="' + idx + '">';

            // ── Label pill ──
            var stickerClass = label.type === 'major' ? 'major' : label.type === 'major-backed' ? 'major-backed' : 'independent';
            var stickerText = label.type === 'major' ? 'MAJOR' : label.type === 'major-backed' ? 'BACKED' : 'INDIE';

            html += '  <div class="selection-box-wrap">';
            html += '    <div class="selection-box" style="--brand-color: ' + color + ';">';
            html += '      <div class="selection-box-overlay"></div>';
            html += '      <div class="selection-box-text">' + label.name.toLowerCase() + '</div>';
            html += '      <span class="type-sticker ' + stickerClass + '">' + stickerText + '</span>';
            html += '    </div>';
            html += '  </div>';

            // ── 4 Data Buttons ──
            html += '  <div class="action-bar">';

            // Button 1: Stream grade + avg streams
            html += '    <div class="data-btn grade-' + grade + '">' + grade + ': ' + avgStr + ' (yr)</div>';

            // Button 2: Release count
            html += '    <div class="data-btn">' + rel2025 + ' in 2025</div>';

            // Button 3: Top artist name (hover triggers card)
            html += '    <div class="data-btn artist-btn" data-artist-idx="' + idx + '">' + topName + '</div>';

            // Button 4: Total social reach
            html += '    <div class="data-btn">' + fmtNum(reach) + ' reach</div>';

            html += '  </div>';

            // ── 4 Field Tags (underline accent, abbreviated) ──
            html += '  <div class="field-bar">';
            if (label.sub) html += '<div class="field-tag">' + label.sub.substring(0, 10) + '</div>';
            else html += '<div class="field-tag">\u2014</div>';
            if (label.country) html += '<div class="field-tag">' + abbrevCountry(label.country) + '</div>';
            else html += '<div class="field-tag">\u2014</div>';
            if (label.founded) html += '<div class="field-tag">' + label.founded + '</div>';
            else html += '<div class="field-tag">\u2014</div>';
            if (label.roster) html += '<div class="field-tag">r:' + label.roster + '</div>';
            else html += '<div class="field-tag">\u2014</div>';
            html += '  </div>';

            html += '</div>';
        });

        gridRoot.innerHTML = html;

        // Store filtered labels for hover card access
        gridRoot._filteredLabels = filtered;
    }

    // ══════════════════════════════════════════
    // ARTIST HOVER CARD — button 3 only
    // ══════════════════════════════════════════

    var hoverTimeout = null;
    var currentHoverPill = null;

    function showHoverCard(pill, label) {
        clearTimeout(hoverTimeout);
        currentHoverPill = pill;

        var color = label.color || '#111827';
        var artists = label.artists || [];
        var show = artists.slice(0, 4);

        var html = '<div class="hover-card-header">' + label.name + '</div>';
        html += '<div class="hover-card-sub">recent artists</div>';

        show.forEach(function (a) {
            var initial = a.name.charAt(0).toUpperCase();
            html += '<div class="hover-artist-row">';
            html += '  <div class="hover-artist-avatar" style="background: ' + color + ';">' + initial + '</div>';
            html += '  <div class="hover-artist-info">';
            html += '    <div class="hover-artist-top">';
            html += '      <span class="hover-artist-name">' + a.name + '</span>';
            html += '      <span class="hover-artist-listeners">' + fmtNum(a.listeners || 0) + ' ' + trendArrow(a.trend) + '</span>';
            html += '    </div>';
            html += '    <div class="hover-artist-meta">' + (a.instagram || '') + ' \u00b7 "' + (a.release || '') + '"</div>';
            html += '  </div>';
            html += '</div>';
        });

        hoverCard.innerHTML = html;

        // Position below the button
        var rect = pill.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;
        hoverCard.style.left = (rect.left + scrollX) + 'px';
        hoverCard.style.top = (rect.bottom + scrollY + 8) + 'px';
        hoverCard.classList.add('visible');
    }

    function hideHoverCard() {
        hoverTimeout = setTimeout(function () {
            hoverCard.classList.remove('visible');
            currentHoverPill = null;
        }, 150);
    }

    // Artist hover card triggers on button 3 (artist-btn) hover
    gridRoot.addEventListener('mouseenter', function (e) {
        var btn = e.target.closest('.artist-btn');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-artist-idx'), 10);
        var labels = gridRoot._filteredLabels;
        if (!labels || !labels[idx]) return;
        showHoverCard(btn, labels[idx]);
    }, true);

    gridRoot.addEventListener('mouseleave', function (e) {
        var btn = e.target.closest('.artist-btn');
        if (btn) hideHoverCard();
    }, true);

    hoverCard.addEventListener('mouseenter', function () {
        clearTimeout(hoverTimeout);
    });
    hoverCard.addEventListener('mouseleave', function () {
        hideHoverCard();
    });

    // ══════════════════════════════════════════
    // SIDEBAR NAVIGATION
    // ══════════════════════════════════════════

    var navItems = document.querySelectorAll('.nav-item[data-view]');

    function switchView(view) {
        currentView = view;
        searchInput.value = '';

        // Update active nav
        navItems.forEach(function (n) {
            n.classList.toggle('active', n.getAttribute('data-view') === view);
        });

        // Fade transition
        gridRoot.classList.add('fading');
        setTimeout(function () {
            render();
            gridRoot.classList.remove('fading');
        }, 250);
    }

    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var view = item.getAttribute('data-view');
            if (heroVisible) dismissHero();
            switchView(view);
        });
    });

    // ── Logo click → toggle Bass/House genre view ──
    document.getElementById('logoBtn').addEventListener('click', function () {
        if (heroVisible) dismissHero();
        if (logoGenre === 'bass') {
            logoGenre = 'house';
            switchView('house');
        } else {
            logoGenre = 'bass';
            switchView('bass');
        }
    });

    // ══════════════════════════════════════════
    // SORT BUTTONS
    // ══════════════════════════════════════════

    var sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-sort');
            if (currentSort === key) {
                currentSort = null;
                btn.classList.remove('active');
            } else {
                currentSort = key;
                sortBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            }
            // Fade re-render
            gridRoot.classList.add('fading');
            setTimeout(function () {
                render();
                gridRoot.classList.remove('fading');
            }, 250);
        });
    });

    // ══════════════════════════════════════════
    // SEARCH INPUT
    // ══════════════════════════════════════════

    searchInput.addEventListener('input', function () {
        render();
    });

    // ══════════════════════════════════════════
    // HERO — char-by-char reveal, one-time only
    // ══════════════════════════════════════════

    function animateHero() {
        var text = 'What label are you looking for?';
        var heroText = document.getElementById('heroText');
        heroText.innerHTML = '';
        text.split('').forEach(function (char, i) {
            var span = document.createElement('span');
            span.className = 'hero-char';
            span.style.animationDelay = (i * 0.06) + 's';
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            heroText.appendChild(span);
        });
    }

    function dismissHero() {
        heroVisible = false;
        heroOverlay.classList.add('fade-out');
        setTimeout(function () {
            heroOverlay.style.display = 'none';
        }, 600);
    }

    heroOverlay.addEventListener('click', function () {
        dismissHero();
        switchView('all');
    });

    // ══════════════════════════════════════════
    // INIT
    // ══════════════════════════════════════════

    animateHero();
    render();

})();
