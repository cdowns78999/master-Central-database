/* ═══════════════════════════════════════════════════════════════
   LABEL FINDER v2 — app.js
   Interaction logic: phases, row rendering, search, sort,
   hover cards, genre toggle, sidebar nav
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ───────────────────────────────────────────────────────────
       DOM REFS
       ─────────────────────────────────────────────────────────── */
    var phaseHero       = document.getElementById('phaseHero');
    var phaseCategories = document.getElementById('phaseCategories');
    var phaseLabels     = document.getElementById('phaseLabels');

    var heroText        = document.getElementById('heroText');
    var genreGrid       = document.getElementById('genreGrid');
    var labelsGrid      = document.getElementById('labelsGrid');
    var labelsTitle     = document.getElementById('labelsTitle');

    var searchBar       = document.getElementById('searchBar');
    var searchBarLabels = document.getElementById('searchBarLabels');
    var searchScopeLabels = document.getElementById('searchScopeLabels');

    var sortRow         = document.getElementById('sortRow');
    var logoCircle      = document.getElementById('logoCircle');

    var sideB           = document.getElementById('sideB');
    var sideH           = document.getElementById('sideH');
    var sideA           = document.getElementById('sideA');
    var sideR           = document.getElementById('sideR');

    var genreSwitch     = document.getElementById('genreSwitch');

    var hoverCard       = document.getElementById('hoverCard');
    var hoverTimeout    = null;

    var posLaunch       = document.getElementById('posLaunchSidebar');

    /* ───────────────────────────────────────────────────────────
       STATE
       ─────────────────────────────────────────────────────────── */
    var currentGenre    = 'Bass';
    var currentSort     = 'roster';
    var searchScope     = 'all';       // 'all' | 'category'
    var heroUsed        = false;
    var currentPhaseId  = 'phaseHero';

    /* ───────────────────────────────────────────────────────────
       PHASE SYSTEM
       ─────────────────────────────────────────────────────────── */
    function showPhase(targetId, callback) {
        var phases = [phaseHero, phaseCategories, phaseLabels];
        var current = null;

        phases.forEach(function (p) {
            if (p && p.classList.contains('visible')) current = p;
        });

        function revealTarget() {
            phases.forEach(function (p) {
                if (p) {
                    p.classList.remove('visible', 'fading-in', 'fading-out');
                    p.style.display = 'none';
                }
            });

            var target = document.getElementById(targetId);
            if (!target) return;

            target.style.display = '';
            target.classList.add('fading-in');

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    target.classList.remove('fading-in');
                    target.classList.add('visible');
                    currentPhaseId = targetId;
                    if (typeof callback === 'function') callback();
                });
            });
        }

        if (current && current.id !== targetId) {
            current.classList.add('fading-out');
            current.classList.remove('visible');
            setTimeout(revealTarget, 500);
        } else {
            revealTarget();
        }
    }

    /* ───────────────────────────────────────────────────────────
       HERO (phase 1)
       ─────────────────────────────────────────────────────────── */
    function wrapChars(text, accentWords) {
        var words = text.split(' ');
        var charIndex = 0;
        var result = [];

        words.forEach(function (word, wi) {
            var isAccent = false;
            if (accentWords && accentWords.length) {
                accentWords.forEach(function (aw) {
                    if (word.toLowerCase() === aw.toLowerCase()) isAccent = true;
                });
            }

            var spans = '';
            for (var c = 0; c < word.length; c++) {
                var cls = 'reveal-char' + (isAccent ? ' accent' : '');
                spans += '<span class="' + cls + '" style="--char-index: ' + charIndex + '">' + word[c] + '</span>';
                charIndex++;
            }
            result.push(spans);
            charIndex++; // count space
        });

        return result.join(' ');
    }

    function initHero() {
        if (!heroText) return;

        heroText.innerHTML = wrapChars('label finder', ['label', 'finder']);

        setTimeout(function () {
            heroText.classList.add('revealed');
        }, 500);

        // Click anywhere or keydown exits hero — one-time only
        function exitHero() {
            if (heroUsed) return;
            heroUsed = true;
            document.removeEventListener('click', exitHero);
            document.removeEventListener('keydown', exitHero);
            goToCategories();
        }

        document.addEventListener('click', exitHero);
        document.addEventListener('keydown', exitHero);
    }

    /* ───────────────────────────────────────────────────────────
       GENRE VIEW (phase 2)
       ─────────────────────────────────────────────────────────── */
    function goToCategories() {
        showPhase('phaseCategories', function () {
            renderGenre(currentGenre);
        });
    }

    function renderGenre(genre, filterQuery) {
        if (!genreGrid) return;

        var labels = labelData[genre] || [];

        if (filterQuery && filterQuery.trim() !== '') {
            labels = filterLabels(labels, filterQuery);
        }

        labels = sortLabels(labels, currentSort);

        genreGrid.innerHTML = '';
        renderRows(labels, genreGrid, 'row-item');
    }

    /* ───────────────────────────────────────────────────────────
       LABELS VIEW (phase 3)
       ─────────────────────────────────────────────────────────── */
    function goToLabels(category) {
        showPhase('phaseLabels', function () {
            if (labelsTitle) {
                labelsTitle.textContent = category || 'All Labels';
            }
            renderLabels(category);
        });
    }

    function renderLabels(category, filterQuery) {
        if (!labelsGrid) return;

        var labels;
        if (category === 'All Labels' || !category) {
            // Merge all genres into one list
            labels = [];
            var keys = Object.keys(labelData);
            keys.forEach(function (k) {
                if (Array.isArray(labelData[k])) {
                    labelData[k].forEach(function (l) {
                        // Avoid duplicates by name
                        var exists = false;
                        labels.forEach(function (ex) {
                            if (ex.name === l.name) exists = true;
                        });
                        if (!exists) labels.push(l);
                    });
                }
            });
        } else {
            labels = labelData[category] || [];
        }

        if (filterQuery && filterQuery.trim() !== '') {
            labels = filterLabels(labels, filterQuery);
        }

        labels = sortLabels(labels, currentSort);

        labelsGrid.innerHTML = '';
        renderRows(labels, labelsGrid, 'row-item');
    }

    /* ───────────────────────────────────────────────────────────
       SHARED ROW RENDERER
       ─────────────────────────────────────────────────────────── */
    function renderRows(labels, container, rowClass) {
        labels.forEach(function (label, i) {
            // 1. Type badge
            // 2. Sub-genre badge
            // 3. Location badge (country + est. year)
            // 4. Roster badge
            var badges =
                '<span class="badge type-' + typeCls(label.type) + '" style="--pill-i:0">' + label.type + '</span>' +
                '<span class="badge sub-genre" style="--pill-i:1">' + label.sub + '</span>' +
                '<span class="badge location" style="--pill-i:2">' + label.country + ' · est. ' + label.founded + '</span>' +
                '<span class="badge roster" style="--pill-i:3">roster: ' + label.roster + '</span>';

            // Detail expand (tags + assoc + sourceTrack as pill badges)
            var tagBadges = label.tags.map(function (t, ti) {
                return '<span class="badge sub-genre" style="--pill-i:' + ti + '">' + t + '</span>';
            }).join('');

            var detailHtml = '<div class="row-detail">' +
                tagBadges +
                (label.assoc ? '<span class="badge location" style="--pill-i:' + label.tags.length + '">' + label.assoc + '</span>' : '') +
                (label.sourceTrack ? '<span class="badge roster" style="--pill-i:' + (label.tags.length + 1) + '">"' + label.sourceTrack + '"</span>' : '') +
                '</div>';

            var row = document.createElement('div');
            row.className = rowClass;
            row.innerHTML =
                '<div class="label-row-inner">' +
                    '<div class="selection-box" style="--brand-color: ' + (label.color || '#2563eb') + ';">' +
                        '<div class="selection-box-overlay"></div>' +
                        '<span class="selection-box-text">' + label.name.toLowerCase() + '</span>' +
                    '</div>' +
                    '<div class="badge-bar">' + badges + '</div>' +
                '</div>' +
                detailHtml;

            // Store label data on the row element for hover card
            row._labelData = label;

            row.querySelector('.label-row-inner').addEventListener('click', function () {
                row.classList.toggle('expanded');
            });

            container.appendChild(row);

            setTimeout(function () {
                row.classList.add('shown');
            }, 50 * (i + 1));
        });

        // Attach hover events after render
        setTimeout(function () {
            attachHoverEvents(container);
        }, 100);
    }

    function typeCls(type) {
        if (type === 'major') return 'major';
        if (type === 'major-backed') return 'major-backed';
        return 'independent';
    }

    /* ───────────────────────────────────────────────────────────
       SORTING
       ─────────────────────────────────────────────────────────── */
    function sortLabels(labels, method) {
        var sorted = labels.slice();
        switch (method) {
            case 'roster':
                sorted.sort(function (a, b) { return (b.roster || 0) - (a.roster || 0); });
                break;
            case 'year':
                sorted.sort(function (a, b) { return (a.founded || 9999) - (b.founded || 9999); });
                break;
            case 'az':
                sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
                break;
            case 'reach':
                sorted.sort(function (a, b) { return (b.followers || 0) - (a.followers || 0); });
                break;
        }
        return sorted;
    }

    /* ───────────────────────────────────────────────────────────
       SEARCH / FILTER
       ─────────────────────────────────────────────────────────── */
    function filterLabels(labels, query) {
        var q = query.toLowerCase().trim();
        if (!q) return labels;

        return labels.filter(function (l) {
            if (l.name.toLowerCase().indexOf(q) !== -1) return true;
            if (l.sub.toLowerCase().indexOf(q) !== -1) return true;
            if (l.country.toLowerCase().indexOf(q) !== -1) return true;
            if (l.type.toLowerCase().indexOf(q) !== -1) return true;
            if (l.assoc && l.assoc.toLowerCase().indexOf(q) !== -1) return true;

            var tagMatch = false;
            l.tags.forEach(function (t) {
                if (t.toLowerCase().indexOf(q) !== -1) tagMatch = true;
            });
            return tagMatch;
        });
    }

    // Genre page search bar
    if (searchBar) {
        searchBar.addEventListener('input', function () {
            renderGenre(currentGenre, searchBar.value);
        });
    }

    // Labels page search bar
    if (searchBarLabels) {
        searchBarLabels.addEventListener('input', function () {
            var cat = (searchScope === 'all') ? 'All Labels' : currentGenre;
            renderLabels(cat, searchBarLabels.value);
        });
    }

    // Labels search scope toggle
    if (searchScopeLabels) {
        searchScopeLabels.addEventListener('click', function () {
            searchScope = (searchScope === 'all') ? 'category' : 'all';
            searchScopeLabels.textContent = searchScope === 'all' ? 'scope: all' : 'scope: ' + currentGenre.toLowerCase();
            // Re-run current search
            var cat = (searchScope === 'all') ? 'All Labels' : currentGenre;
            renderLabels(cat, searchBarLabels ? searchBarLabels.value : '');
        });
    }

    /* ───────────────────────────────────────────────────────────
       SORT CONTROLS
       ─────────────────────────────────────────────────────────── */
    if (sortRow) {
        var sortOptions = sortRow.querySelectorAll('span[data-sort]');

        sortOptions.forEach(function (opt) {
            opt.addEventListener('click', function () {
                var method = opt.getAttribute('data-sort');
                currentSort = method;

                // Update active class
                sortOptions.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');

                // Fade out current rows, re-sort, fade in
                var activeContainer = null;
                if (currentPhaseId === 'phaseCategories' && genreGrid) {
                    activeContainer = genreGrid;
                } else if (currentPhaseId === 'phaseLabels' && labelsGrid) {
                    activeContainer = labelsGrid;
                }

                if (activeContainer) {
                    var rows = activeContainer.querySelectorAll('.row-item');
                    rows.forEach(function (r) { r.classList.remove('shown'); });

                    setTimeout(function () {
                        if (currentPhaseId === 'phaseCategories') {
                            renderGenre(currentGenre, searchBar ? searchBar.value : '');
                        } else {
                            var cat = (searchScope === 'all') ? 'All Labels' : currentGenre;
                            renderLabels(cat, searchBarLabels ? searchBarLabels.value : '');
                        }
                    }, 350);
                }
            });
        });
    }

    /* ───────────────────────────────────────────────────────────
       LOGO CIRCLE — GENRE TOGGLE
       ─────────────────────────────────────────────────────────── */
    function toggleGenre() {
        currentGenre = (currentGenre === 'Bass') ? 'House' : 'Bass';

        // Update hidden genre switch buttons if they exist
        if (genreSwitch) {
            var btns = genreSwitch.querySelectorAll('button');
            btns.forEach(function (b) {
                b.classList.remove('active');
                if (b.textContent.trim().toLowerCase() === currentGenre.toLowerCase()) {
                    b.classList.add('active');
                }
            });
        }

        // Update scope label if visible
        if (searchScopeLabels && searchScope === 'category') {
            searchScopeLabels.textContent = 'scope: ' + currentGenre.toLowerCase();
        }
    }

    if (logoCircle) {
        logoCircle.addEventListener('click', function () {
            if (!heroUsed) {
                // From hero → go to genre view
                heroUsed = true;
                document.removeEventListener('click', function () {});
                document.removeEventListener('keydown', function () {});
                toggleGenre();
                goToCategories();
                return;
            }

            if (currentPhaseId === 'phaseLabels') {
                // On labels page → switch genre and go to genre view
                toggleGenre();
                goToCategories();
            } else if (currentPhaseId === 'phaseCategories') {
                // On genre view → fade rows, toggle, re-render
                toggleGenre();
                if (genreGrid) {
                    var rows = genreGrid.querySelectorAll('.row-item');
                    rows.forEach(function (r) { r.classList.remove('shown'); });

                    setTimeout(function () {
                        renderGenre(currentGenre, searchBar ? searchBar.value : '');
                    }, 350);
                }
            }
        });
    }

    /* ───────────────────────────────────────────────────────────
       SIDEBAR NAV
       ─────────────────────────────────────────────────────────── */
    if (sideB) {
        sideB.addEventListener('click', function () {
            if (currentGenre !== 'Bass') toggleGenre();
            else if (currentPhaseId !== 'phaseCategories') { /* already Bass, just navigate */ }
            currentGenre = 'Bass';
            goToCategories();
        });
    }

    if (sideH) {
        sideH.addEventListener('click', function () {
            if (currentGenre !== 'House') toggleGenre();
            else if (currentPhaseId !== 'phaseCategories') { /* already House, just navigate */ }
            currentGenre = 'House';
            goToCategories();
        });
    }

    if (sideA) {
        sideA.addEventListener('click', function () {
            goToLabels('All Labels');
        });
    }

    if (sideR) {
        sideR.addEventListener('click', function () {
            goToLabels('All Labels');
            setTimeout(function () {
                if (labelsTitle) labelsTitle.textContent = 'Riddim (Coming Soon)';
            }, 100);
        });
    }

    /* ───────────────────────────────────────────────────────────
       HOVER PROFILE CARD
       ─────────────────────────────────────────────────────────── */
    function formatListeners(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
        return String(n);
    }

    function trendArrow(t) {
        if (t === 'up') return '<span class="hover-card-trend up">&#8593;</span>';
        if (t === 'down') return '<span class="hover-card-trend down">&#8595;</span>';
        return '<span class="hover-card-trend steady">&#8594;</span>';
    }

    function showHoverCard(label, anchor) {
        if (!label.artists || !label.artists.length) return;

        var html = label.artists.map(function (a) {
            return '<div class="hover-artist">' +
                '<div class="hover-avatar" style="background:' + (label.color || '#4da6ff') + ';">' + a.name.charAt(0) + '</div>' +
                '<div class="hover-info">' +
                    '<div class="hover-name">' + a.name + '</div>' +
                    '<div class="hover-meta">' + a.instagram + ' &middot; &ldquo;' + a.release + '&rdquo;</div>' +
                '</div>' +
                '<div class="hover-listeners">' + formatListeners(a.listeners) + trendArrow(a.trend) + '</div>' +
            '</div>';
        }).join('');

        hoverCard.innerHTML =
            '<div class="hover-header">' + label.name + '</div>' +
            '<div class="hover-sub">recent artists</div>' + html;

        var rect = anchor.getBoundingClientRect();
        hoverCard.style.left = rect.left + 'px';
        hoverCard.style.top = (rect.bottom + window.scrollY + 8) + 'px';
        hoverCard.classList.add('visible');
    }

    function hideHoverCard() {
        hoverCard.classList.remove('visible');
    }

    function attachHoverEvents(container) {
        var boxes = container.querySelectorAll('.selection-box');
        boxes.forEach(function (box) {
            box.addEventListener('mouseenter', function () {
                clearTimeout(hoverTimeout);
                var row = box.closest('.row-item');
                if (!row || !row._labelData) return;
                showHoverCard(row._labelData, box);
            });
            box.addEventListener('mouseleave', function () {
                hoverTimeout = setTimeout(hideHoverCard, 150);
            });
        });
    }

    if (hoverCard) {
        hoverCard.addEventListener('mouseenter', function () {
            clearTimeout(hoverTimeout);
        });
        hoverCard.addEventListener('mouseleave', function () {
            hoverTimeout = setTimeout(hideHoverCard, 150);
        });
    }

    /* ───────────────────────────────────────────────────────────
       POS LAUNCH
       ─────────────────────────────────────────────────────────── */
    if (posLaunch) {
        posLaunch.addEventListener('click', function () {
            if (typeof POS !== 'undefined') POS.toggle(true);
        });
    }

    /* ───────────────────────────────────────────────────────────
       INIT
       ─────────────────────────────────────────────────────────── */
    initHero();

});
