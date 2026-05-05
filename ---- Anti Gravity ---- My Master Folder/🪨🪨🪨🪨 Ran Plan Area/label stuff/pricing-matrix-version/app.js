/* ═══════════════════════════════════════════════════════════════
   LABEL FINDER — App Logic
   Big Genre Switch (Bass / House), pill badges,
   type column, search, sort, row expand
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    var phaseHero = document.getElementById('phaseHero');
    var phaseCategories = document.getElementById('phaseCategories');
    var phaseLabels = document.getElementById('phaseLabels');
    var heroText = document.getElementById('heroText');
    var heroClick = document.getElementById('heroClick');
    var categoryList = document.getElementById('categoryList');
    var labelList = document.getElementById('labelList');
    var labelViewTitle = document.getElementById('labelViewTitle');
    var catTitle = document.getElementById('catTitle');
    var backBtn = document.getElementById('backToCategories');
    var logoBack = document.getElementById('logoBack');
    var navItems = document.querySelectorAll('.nav-item[data-cat]');
    var genreSwitchBtns = document.querySelectorAll('.genre-switch-btn');

    var searchBar = document.getElementById('searchBar');
    var searchScope = document.getElementById('searchScope');
    var searchBarLabels = document.getElementById('searchBarLabels');
    var searchScopeLabels = document.getElementById('searchScopeLabels');

    var sortRow = document.getElementById('sortRow');
    var sortOptions = sortRow.querySelectorAll('span[data-sort]');

    var currentPhase = 'hero';
    var currentGenre = 'Bass';
    var currentCategory = '';
    var currentSort = 'roster';
    var searchScopeMode = 'all';
    var heroShown = false; // hero only shows once

    // ─── Character wrapper for hero text reveal ───
    function wrapChars(text, accentWords) {
        accentWords = accentWords || [];
        var charIndex = 0;
        return text.split('').map(function(char) {
            var isAccent = accentWords.some(function(w) {
                var idx = text.toLowerCase().indexOf(w.toLowerCase());
                return idx > -1 && charIndex >= idx && charIndex < idx + w.length;
            });
            var cls = isAccent ? 'reveal-char accent' : 'reveal-char';
            var span = '<span class="' + cls + '" style="--char-index: ' + charIndex + '">' +
                (char === ' ' ? '&nbsp;' : char) + '</span>';
            charIndex++;
            return span;
        }).join('');
    }

    // ─── Phase transitions ───
    function showPhase(targetId, callback) {
        var phases = [phaseHero, phaseCategories, phaseLabels];
        var target = document.getElementById(targetId);

        phases.forEach(function(p) {
            if (p.classList.contains('visible')) {
                p.classList.add('fading-out');
                p.classList.remove('visible');
            }
        });

        setTimeout(function() {
            phases.forEach(function(p) {
                p.classList.remove('fading-out');
                p.style.display = 'none';
            });

            target.style.display = 'block';
            target.classList.add('fading-in');

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    target.classList.remove('fading-in');
                    target.classList.add('visible');
                    if (callback) callback();
                });
            });
        }, 500);
    }

    // ─── Sorting ───
    function sortLabels(labels, method) {
        var sorted = labels.slice();
        switch (method) {
            case 'roster':
                sorted.sort(function(a, b) { return (b.roster || 0) - (a.roster || 0); });
                break;
            case 'year':
                sorted.sort(function(a, b) { return (a.founded || 9999) - (b.founded || 9999); });
                break;
            case 'az':
                sorted.sort(function(a, b) { return a.name.localeCompare(b.name); });
                break;
            case 'reach':
                sorted.sort(function(a, b) { return (b.followers || 0) - (a.followers || 0); });
                break;
        }
        return sorted;
    }

    // ─── Search filtering ───
    function filterLabels(labels, query) {
        if (!query) return labels;
        var q = query.toLowerCase();
        return labels.filter(function(l) {
            return l.name.toLowerCase().includes(q) ||
                l.sub.toLowerCase().includes(q) ||
                l.tags.some(function(t) { return t.toLowerCase().includes(q); }) ||
                l.country.toLowerCase().includes(q) ||
                (l.assoc && l.assoc.toLowerCase().includes(q)) ||
                (l.type && l.type.toLowerCase().includes(q));
        });
    }

    function getAllLabels() {
        return (labelData['All Labels'] || []).slice();
    }

    // ─── Type badge HTML ───
    function typeBadge(type) {
        var cls = type === 'major' ? 'major' : type === 'major-backed' ? 'major-backed' : 'independent';
        return '<span class="label-type ' + cls + '">' + type + '</span>';
    }

    // ─── PHASE 1: Hero Question ───
    function initHero() {
        var question = 'What label are you looking for?';
        heroText.innerHTML = wrapChars(question, ['label']);

        setTimeout(function() {
            heroText.classList.add('revealed');
            heroRevealed = true;
        }, 500);

        heroClick.addEventListener('click', goToCategories);
        document.addEventListener('keydown', function heroKey(e) {
            if (currentPhase === 'hero') {
                document.removeEventListener('keydown', heroKey);
                goToCategories();
            }
        });
    }

    // ─── PHASE 2: Genre View (Bass / House switch) ───
    function goToCategories() {
        if (currentPhase === 'categories') return;
        currentPhase = 'categories';
        currentCategory = '';
        navItems.forEach(function(n) { n.classList.remove('current'); });
        searchBar.value = '';

        showPhase('phaseCategories', function() {
            renderGenre(currentGenre);
        });
    }

    function renderGenre(genre, filterQuery) {
        categoryList.innerHTML = '';
        catTitle.textContent = genre;

        var labels;
        if (filterQuery) {
            labels = filterLabels(getAllLabels(), filterQuery);
        } else {
            labels = (labelData[genre] || []).slice();
        }

        labels = sortLabels(labels, currentSort);
        renderRows(labels, categoryList, 'category-row');
    }

    // Genre switch buttons
    genreSwitchBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var genre = btn.dataset.genre;
            currentGenre = genre;
            genreSwitchBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            // Update nav
            navItems.forEach(function(n) {
                n.classList.toggle('current', n.dataset.cat === genre);
            });

            // Fade out current rows, re-render
            var rows = categoryList.querySelectorAll('.category-row.shown');
            rows.forEach(function(r, i) {
                setTimeout(function() { r.classList.remove('shown'); }, 15 * i);
            });
            setTimeout(function() {
                renderGenre(genre, searchBar.value.trim());
            }, 15 * rows.length + 150);
        });
    });

    // ─── PHASE 3: Direct nav label view (sidebar A, R) ───
    function goToLabels(category) {
        currentPhase = 'labels';
        currentCategory = category;

        navItems.forEach(function(n) {
            n.classList.toggle('current', n.dataset.cat === category);
        });

        searchBarLabels.value = '';
        searchBarLabels.placeholder = 'search ' + category.toLowerCase() + '...';
        updateScopeDisplay();

        showPhase('phaseLabels', function() {
            renderLabels(category);
        });
    }

    function renderLabels(category, filterQuery) {
        labelViewTitle.textContent = category;
        labelList.innerHTML = '';

        var labels;
        if (searchScopeMode === 'all' && filterQuery) {
            labels = getAllLabels();
        } else {
            labels = (labelData[category] || getAllLabels()).slice();
        }

        if (filterQuery) {
            labels = filterLabels(labels, filterQuery);
        }
        labels = sortLabels(labels, currentSort);
        renderRows(labels, labelList, 'label-row');
    }

    // ─── Shared row renderer ───
    function renderRows(labels, container, rowClass) {
        labels.forEach(function(label, i) {
            var dataPills =
                '<span class="data-pill roster" style="--pill-i:0">roster: ' + label.roster + '</span>' +
                '<span class="data-pill year" style="--pill-i:1">est. ' + label.founded + '</span>' +
                '<span class="data-pill country" style="--pill-i:2">' + label.country + '</span>' +
                '<span class="data-pill sub-genre" style="--pill-i:3">' + label.sub + '</span>';

            var tagPills = label.tags.map(function(t) {
                return '<span class="data-pill sub-genre">' + t + '</span>';
            }).join('');
            var detailHtml = '<div class="selection-detail" style="display:flex;flex-wrap:wrap;gap:4px;background:rgba(0,0,0,0.025);padding:4px 8px;border-radius:12px;">' +
                tagPills +
                (label.assoc ? '<span class="data-pill year">' + label.assoc + '</span>' : '') +
                (label.sourceTrack ? '<span class="data-pill roster">"' + label.sourceTrack + '"</span>' : '') +
                '</div>';

            var row = document.createElement('div');
            row.className = rowClass;
            row.innerHTML =
                '<div class="selection-row has-type" style="cursor:pointer;">' +
                    '<div class="selection-box" style="--brand-color: ' + (label.color || '#2563eb') + ';">' +
                        '<div class="selection-box-overlay"></div>' +
                        '<span class="selection-box-text">' + label.name.toLowerCase() + '</span>' +
                    '</div>' +
                    typeBadge(label.type) +
                    '<div class="selection-data">' + dataPills + '</div>' +
                '</div>' +
                detailHtml;

            row.querySelector('.selection-row').addEventListener('click', function() {
                row.classList.toggle('expanded');
            });

            container.appendChild(row);

            setTimeout(function() {
                row.classList.add('shown');
            }, 50 * (i + 1));
        });
    }

    // ─── Sort controls ───
    sortOptions.forEach(function(opt) {
        opt.addEventListener('click', function() {
            currentSort = opt.dataset.sort;
            sortOptions.forEach(function(o) { o.classList.remove('sort-active'); });
            opt.classList.add('sort-active');

            var rows = labelList.querySelectorAll('.label-row.shown');
            rows.forEach(function(r, i) {
                setTimeout(function() { r.classList.remove('shown'); }, 15 * i);
            });
            setTimeout(function() {
                renderLabels(currentCategory, searchBarLabels.value.trim());
            }, 15 * rows.length + 150);
        });
    });

    // ─── Search — genre page ───
    searchBar.addEventListener('input', function(e) {
        var q = e.target.value.trim();
        var rows = categoryList.querySelectorAll('.category-row.shown');
        rows.forEach(function(r, i) {
            setTimeout(function() { r.classList.remove('shown'); }, 10 * i);
        });
        setTimeout(function() {
            renderGenre(currentGenre, q);
        }, 10 * rows.length + 100);
    });

    // ─── Search — labels page ───
    searchBarLabels.addEventListener('input', function(e) {
        var q = e.target.value.trim();
        var rows = labelList.querySelectorAll('.label-row.shown');
        rows.forEach(function(r, i) {
            setTimeout(function() { r.classList.remove('shown'); }, 10 * i);
        });
        setTimeout(function() {
            renderLabels(currentCategory, q);
        }, 10 * rows.length + 100);
    });

    // ─── Search scope toggle ───
    function updateScopeDisplay() {
        var scopeText = searchScopeMode === 'all' ? 'all' : currentCategory.toLowerCase();
        searchScopeLabels.innerHTML = '// scope: <span class="scope-active">' + scopeText + '</span>';
    }

    searchScopeLabels.addEventListener('click', function() {
        searchScopeMode = searchScopeMode === 'all' ? 'category' : 'all';
        updateScopeDisplay();
        var q = searchBarLabels.value.trim();
        if (q) renderLabels(currentCategory, q);
    });

    // ─── Back Navigation ───
    backBtn.addEventListener('click', function() {
        var rows = labelList.querySelectorAll('.label-row.shown, .category-row.shown');
        rows.forEach(function(row, i) {
            setTimeout(function() { row.classList.remove('shown'); }, 20 * i);
        });
        setTimeout(function() {
            goToCategories();
        }, 20 * rows.length + 200);
    });

    // Logo circle = toggle between Bass / House (no hero return)
    logoBack.addEventListener('click', function() {
        // Toggle genre
        currentGenre = currentGenre === 'Bass' ? 'House' : 'Bass';

        // Update genre switch buttons
        genreSwitchBtns.forEach(function(b) {
            b.classList.toggle('active', b.dataset.genre === currentGenre);
        });

        // Update nav highlight
        navItems.forEach(function(n) {
            n.classList.toggle('current', n.dataset.cat === currentGenre);
        });

        if (currentPhase === 'labels') {
            // Go to genre view first
            var rows = labelList.querySelectorAll('.label-row.shown, .category-row.shown');
            rows.forEach(function(row, i) {
                setTimeout(function() { row.classList.remove('shown'); }, 15 * i);
            });
            setTimeout(function() {
                goToCategories();
                setTimeout(function() { renderGenre(currentGenre); }, 600);
            }, 15 * rows.length + 200);
        } else if (currentPhase === 'categories') {
            // Just switch genre in place
            var catRows = categoryList.querySelectorAll('.category-row.shown');
            catRows.forEach(function(r, i) {
                setTimeout(function() { r.classList.remove('shown'); }, 15 * i);
            });
            setTimeout(function() {
                renderGenre(currentGenre);
            }, 15 * catRows.length + 150);
        } else {
            // From hero, go straight to categories
            goToCategories();
        }
    });

    // ─── Sidebar nav ───
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var cat = item.dataset.cat;

            if (cat === 'Bass' || cat === 'House') {
                // Switch genre on the categories page
                currentGenre = cat;
                genreSwitchBtns.forEach(function(b) {
                    b.classList.toggle('active', b.dataset.genre === cat);
                });

                if (currentPhase !== 'categories') {
                    goToCategories();
                    setTimeout(function() { renderGenre(cat); }, 600);
                } else {
                    var rows = categoryList.querySelectorAll('.category-row.shown');
                    rows.forEach(function(r, i) {
                        setTimeout(function() { r.classList.remove('shown'); }, 15 * i);
                    });
                    setTimeout(function() { renderGenre(cat); }, 15 * rows.length + 150);
                }

                navItems.forEach(function(n) { n.classList.toggle('current', n.dataset.cat === cat); });
            } else if (cat === 'All Labels') {
                goToLabels('All Labels');
            } else if (cat === 'Riddim') {
                // Placeholder — future genre
                goToLabels('All Labels');
                setTimeout(function() {
                    labelViewTitle.textContent = 'Riddim (Coming Soon)';
                }, 600);
            }
        });
    });

    // ─── POS launch from sidebar ───
    var posLaunch = document.getElementById('posLaunchSidebar');
    if (posLaunch) {
        posLaunch.addEventListener('click', function() {
            if (typeof POS !== 'undefined') POS.toggle(true);
        });
    }

    // ─── Hover Profile Card ───
    var hoverCard = document.getElementById('hoverCard');
    var hoverTimeout = null;

    function formatListeners(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
        return String(n);
    }

    function trendArrow(t) {
        if (t === 'up') return '<span class="hover-card-trend up">\u2191</span>';
        if (t === 'down') return '<span class="hover-card-trend down">\u2193</span>';
        return '<span class="hover-card-trend steady">\u2192</span>';
    }

    function showHoverCard(label, anchor) {
        if (!label.artists || label.artists.length === 0) return;

        var artistsHtml = label.artists.map(function(a) {
            var bgColor = label.color || '#4da6ff';
            return '<div class="hover-card-artist">' +
                '<div class="hover-card-avatar" style="background:' + bgColor + ';">' + a.name.charAt(0) + '</div>' +
                '<div class="hover-card-info">' +
                    '<div class="hover-card-name">' + a.name + '</div>' +
                    '<div class="hover-card-meta">' + a.instagram + ' \u00b7 "' + a.release + '"</div>' +
                '</div>' +
                '<div class="hover-card-listeners">' + formatListeners(a.listeners) + trendArrow(a.trend) + '</div>' +
            '</div>';
        }).join('');

        hoverCard.innerHTML =
            '<div class="hover-card-header">' + label.name + '</div>' +
            '<div class="hover-card-sub">recent artists</div>' +
            artistsHtml;

        // Position below the anchor
        var rect = anchor.getBoundingClientRect();
        hoverCard.style.left = rect.left + 'px';
        hoverCard.style.top = (rect.bottom + window.scrollY + 8) + 'px';
        hoverCard.classList.add('visible');
    }

    function hideHoverCard() {
        hoverCard.classList.remove('visible');
    }

    // Attach hover events to selection-box elements inside rows
    function attachHoverEvents(container) {
        var boxes = container.querySelectorAll('.selection-box');
        boxes.forEach(function(box) {
            box.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                var row = box.closest('.label-row, .category-row');
                if (!row) return;
                var labelName = box.querySelector('.selection-box-text').textContent;

                // Find label in data
                var allLabels = getAllLabels();
                var match = allLabels.find(function(l) {
                    return l.name.toLowerCase() === labelName;
                });
                if (match) showHoverCard(match, box);
            });

            box.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(hideHoverCard, 150);
            });
        });
    }

    // Re-attach after each render
    var origRenderRows = renderRows;
    renderRows = function(labels, container, rowClass) {
        origRenderRows(labels, container, rowClass);
        setTimeout(function() { attachHoverEvents(container); }, 100);
    };

    // Keep card visible when hovering the card itself
    hoverCard.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
    });
    hoverCard.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(hideHoverCard, 150);
    });

    // ─── Initialize ───
    initHero();
});
