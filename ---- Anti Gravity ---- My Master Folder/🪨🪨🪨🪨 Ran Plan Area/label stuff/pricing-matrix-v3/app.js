/* ═══════════════════════════════════════════════════════════════
   LABEL FINDER — app.js
   Sidebar nav, label rows, hover cards, search, sort
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
    var expandedRow = null;
    var heroVisible = true;

    // ── DOM refs ──
    var gridRoot = document.getElementById('gridRoot');
    var sectionTitle = document.getElementById('sectionTitle');
    var labelCount = document.getElementById('labelCount');
    var searchInput = document.getElementById('searchInput');
    var hoverCard = document.getElementById('hoverCard');
    var heroOverlay = document.getElementById('heroOverlay');

    // ── Stardust char wrapper ──
    function wrapChars(text) {
        return text.split('').map(function (char, i) {
            return '<span class="reveal-char" style="--char-index: ' + i + '">' +
                (char === ' ' ? '&nbsp;' : char) + '</span>';
        }).join('');
    }

    // ── Format listeners ──
    function fmtListeners(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
        return String(n);
    }

    // ── Format streams (for relevance button) ──
    function fmtStreams(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return Math.round(n / 1000) + 'K';
        return String(n);
    }

    // ── Trend arrow ──
    function trendArrow(t) {
        if (t === 'up') return '<span class="trend-up">\u2191</span>';
        if (t === 'down') return '<span class="trend-down">\u2193</span>';
        return '<span class="trend-steady">\u2192</span>';
    }

    // ── Compute total reach for a label ──
    function totalReach(label) {
        if (!label.artists) return 0;
        return label.artists.reduce(function (sum, a) { return sum + (a.reach || 0); }, 0);
    }

    // ── Sort labels ──
    function sortLabels(labels, sortKey) {
        var arr = labels.slice();
        if (sortKey === 'roster') arr.sort(function (a, b) { return (b.roster || 0) - (a.roster || 0); });
        else if (sortKey === 'year') arr.sort(function (a, b) { return (a.founded || 9999) - (b.founded || 9999); });
        else if (sortKey === 'az') arr.sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
        else if (sortKey === 'reach') arr.sort(function (a, b) { return totalReach(b) - totalReach(a); });
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

    // ── Build data text for a label ──
    function buildDataText(label) {
        var parts = [];
        if (label.type) parts.push(label.type);
        if (label.sub) parts.push(label.sub);
        if (label.country) parts.push(label.country);
        if (label.founded) parts.push('est. ' + label.founded);
        if (label.roster) parts.push('roster: ' + label.roster);
        return parts.join(' \u00b7 ');
    }

    // ── Build detail line text ──
    function buildDetailText(label) {
        var parts = [];
        if (label.tags && label.tags.length) {
            parts.push('// tags: ' + label.tags.join(' \u00b7 '));
        }
        if (label.assoc) {
            parts.push('// ' + label.assoc);
        }
        if (label.sourceTrack) {
            parts.push('"\u200B' + label.sourceTrack + '"');
        }
        return parts.join(' ');
    }

    // ── Render rows ──
    function render() {
        var baseLabels = filterMap[currentView]();
        var query = searchInput.value.trim();
        var filtered = filterBySearch(baseLabels, query);
        if (currentSort) filtered = sortLabels(filtered, currentSort);

        expandedRow = null;

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
            var dataText = buildDataText(label);
            var detailText = buildDetailText(label);

            html += '<div class="selection-row" data-idx="' + idx + '" style="display:flex;align-items:center;">';
            html += '  <div class="selection-box-wrap">';
            var stickerClass = label.type === 'major' ? 'major' : label.type === 'major-backed' ? 'major-backed' : 'independent';
            var stickerText = label.type === 'major' ? 'MAJOR' : label.type === 'major-backed' ? 'BACKED' : 'INDIE';
            html += '    <div class="selection-box" style="--brand-color: ' + color + ';" data-label-idx="' + idx + '">';
            html += '      <div class="selection-box-overlay"></div>';
            html += '      <div class="selection-box-text">' + label.name.toLowerCase() + '</div>';
            html += '      <span class="type-sticker ' + stickerClass + '">' + stickerText + '</span>';
            html += '    </div>';
            html += '  </div>';
            html += '  <div class="action-bar">';
            html += '    <div class="action-btn main-btn style-1 relevance-btn" data-rel-idx="' + idx + '" title="Relevance Score">' + (label.streamGrade || '?') + ': ' + fmtStreams(label.avgStreams || 0) + ' avg (yr)</div>';
            html += '    <div class="action-btn main-btn style-1 releases-btn" data-releases-idx="' + idx + '" title="2025 Releases">2025 releases</div>';
            html += '    <div class="action-btn main-btn style-1 artist-btn" data-artist-idx="' + idx + '" title="View top artists">top 4 artists</div>';
            html += '    <div class="action-btn main-btn style-1 coming-soon" title="Coming soon">social media</div>';
            html += '  </div>';
            html += '  <div class="action-bar field-bar">';
            if (label.sub) html += '<div class="action-btn field-tag">' + label.sub + '</div>';
            if (label.country) html += '<div class="action-btn field-tag">' + label.country + '</div>';
            if (label.founded) html += '<div class="action-btn field-tag">est. ' + label.founded + '</div>';
            if (label.roster) html += '<div class="action-btn field-tag">roster: ' + label.roster + '</div>';
            html += '</div>';
            html += '</div>';
        });

        gridRoot.innerHTML = html;

        // Store filtered labels for hover card access
        gridRoot._filteredLabels = filtered;
    }

    // ── Info card (RIGHT side) — shows on row hover ──
    var infoCard = document.getElementById('infoCard');
    var infoTimeout = null;

    function showInfoCard(row, label) {
        clearTimeout(infoTimeout);

        var html = '<div class="info-card-header">' + label.name + '</div>';
        html += '<div class="info-card-sub">label details</div>';

        html += '<div class="info-row"><span class="info-label">Type</span><span class="info-value">' + (label.type || '—') + '</span></div>';
        html += '<div class="info-row"><span class="info-label">Sub-Genre</span><span class="info-value">' + (label.sub || '—') + '</span></div>';
        html += '<div class="info-row"><span class="info-label">Country</span><span class="info-value">' + (label.country || '—') + '</span></div>';
        html += '<div class="info-row"><span class="info-label">Founded</span><span class="info-value">' + (label.founded || '—') + '</span></div>';
        html += '<div class="info-row"><span class="info-label">Roster</span><span class="info-value">~' + (label.roster || '—') + '</span></div>';
        if (label.followers) {
            html += '<div class="info-row"><span class="info-label">Reach</span><span class="info-value">' + fmtListeners(label.followers) + '</span></div>';
        }
        if (label.sourceTrack) {
            html += '<div class="info-row"><span class="info-label">Chart Track</span><span class="info-value">"' + label.sourceTrack + '"</span></div>';
        }

        if (label.tags && label.tags.length) {
            html += '<div class="info-tags">';
            label.tags.forEach(function(t) {
                html += '<span class="info-tag">' + t + '</span>';
            });
            html += '</div>';
        }

        if (label.assoc) {
            html += '<div class="info-assoc">// ' + label.assoc + '</div>';
        }

        infoCard.innerHTML = html;

        // Position to the RIGHT of the row
        var rect = row.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;
        infoCard.style.left = (rect.right + scrollX + 12) + 'px';
        infoCard.style.top = (rect.top + scrollY - 20) + 'px';
        infoCard.classList.add('visible');
    }

    function hideInfoCard() {
        infoTimeout = setTimeout(function() {
            infoCard.classList.remove('visible');
        }, 150);
    }

    // Row hover → show info card to the right
    gridRoot.addEventListener('mouseenter', function(e) {
        var row = e.target.closest('.selection-row');
        if (!row) return;
        var idx = parseInt(row.getAttribute('data-idx'), 10);
        var labels = gridRoot._filteredLabels;
        if (!labels || !labels[idx]) return;
        showInfoCard(row, labels[idx]);
    }, true);

    gridRoot.addEventListener('mouseleave', function(e) {
        var row = e.target.closest('.selection-row');
        if (row) hideInfoCard();
    }, true);

    infoCard.addEventListener('mouseenter', function() { clearTimeout(infoTimeout); });
    infoCard.addEventListener('mouseleave', function() { hideInfoCard(); });

    // ── Artist hover card (BELOW pill) — shows on pill hover ──
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
            html += '      <a href="https://open.spotify.com/search/' + encodeURIComponent(a.name) + '" target="_blank" class="hover-artist-name" style="text-decoration:none;color:inherit;">' + a.name + ' <span style="font-size:0.5rem;opacity:0.4;color:#4da6ff;">&#8599;</span></a>';
            html += '      <span class="hover-artist-listeners">' + fmtListeners(a.listeners || 0) + ' ' + trendArrow(a.trend) + '</span>';
            html += '    </div>';
            html += '    <div class="hover-artist-meta"><a href="https://instagram.com/' + (a.instagram || '').replace('@','') + '" target="_blank" style="color:inherit;text-decoration:none;">' + (a.instagram || '') + '</a> \u00b7 "' + (a.release || '') + '"</div>';
            html += '  </div>';
            html += '</div>';
        });

        hoverCard.innerHTML = html;

        // Position below the pill
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

    // Artist hover card triggers on "top 4 artists" button hover
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

    // ── Relevance Score hover card ──
    var relevanceCard = document.getElementById('relevanceCard');
    var relTimeout = null;

    function streamBarWidth(grade) {
        if (grade === 'S') return '100%';
        if (grade === 'A') return '75%';
        if (grade === 'B') return '50%';
        if (grade === 'C') return '25%';
        return '10%';
    }

    function showRelevanceCard(btn, label) {
        clearTimeout(relTimeout);
        var avgStr = label.avgStreams ? fmtListeners(label.avgStreams) : '—';
        var grade = label.streamGrade || 'C';
        var r2025 = label.releases2025 || 0;
        var rLast6 = label.releasesLast6 || 0;
        var pace = label.releasePace || 'unknown';

        var html = '<div class="rel-header">' + label.name + '</div>';
        html += '<div class="rel-sub">relevance score (yearly avg)</div>';

        // 1/2 — Avg Streams
        html += '<div class="rel-metric">';
        html += '  <div class="rel-metric-label">avg streams per track</div>';
        html += '  <div class="rel-metric-row">';
        html += '    <div class="rel-grade ' + grade + '">' + grade + '</div>';
        html += '    <div class="rel-bar"><div class="rel-bar-fill ' + grade + '" style="width:' + streamBarWidth(grade) + '"></div></div>';
        html += '    <div class="rel-value">' + avgStr + ' <a href="https://open.spotify.com/search/' + encodeURIComponent(label.name) + '" target="_blank" style="color:#4da6ff;text-decoration:none;font-size:0.5rem;opacity:0.5;">\u2197</a></div>';
        html += '  </div>';
        html += '</div>';

        // 2/2 — Release Frequency (3-source verification)
        html += '<div class="rel-metric">';
        html += '  <div class="rel-metric-label">release frequency</div>';
        html += '<div class="rel-freq-row">';
        html += '  <span class="rel-freq-label">2025 total</span>';
        html += '  <span class="rel-freq-value">around ' + r2025;
        if (label.releases2025src) {
            html += ' <a href="https://www.beatport.com/search?q=' + encodeURIComponent(label.name) + '&type=labels" target="_blank" style="color:#4da6ff;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:3px;" title="Beatport: ' + label.releases2025src.beatport + '">BP</a>';
            html += ' <a href="https://open.spotify.com/search/' + encodeURIComponent(label.name) + '" target="_blank" style="color:#10b981;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Spotify: ' + label.releases2025src.spotify + '">SP</a>';
            html += ' <a href="https://www.discogs.com/search/?q=' + encodeURIComponent(label.name) + '&type=label" target="_blank" style="color:#f59e0b;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Discogs: ' + label.releases2025src.discogs + '">DC</a>';
        }
        html += '</span></div>';
        html += '<div class="rel-freq-row">';
        html += '  <span class="rel-freq-label">last 6 months</span>';
        html += '  <span class="rel-freq-value">around ' + rLast6;
        if (label.releasesLast6src) {
            html += ' <a href="https://www.beatport.com/search?q=' + encodeURIComponent(label.name) + '&type=labels" target="_blank" style="color:#4da6ff;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:3px;" title="Beatport: ' + label.releasesLast6src.beatport + '">BP</a>';
            html += ' <a href="https://open.spotify.com/search/' + encodeURIComponent(label.name) + '" target="_blank" style="color:#10b981;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Spotify: ' + label.releasesLast6src.spotify + '">SP</a>';
            html += ' <a href="https://www.discogs.com/search/?q=' + encodeURIComponent(label.name) + '&type=label" target="_blank" style="color:#f59e0b;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Discogs: ' + label.releasesLast6src.discogs + '">DC</a>';
        }
        html += '</span></div>';
        html += '  <span class="rel-pace">' + pace + '</span>';
        html += '</div>';

        relevanceCard.innerHTML = html;

        var rect = btn.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;
        relevanceCard.style.left = (rect.left + scrollX) + 'px';
        relevanceCard.style.top = (rect.bottom + scrollY + 8) + 'px';
        relevanceCard.classList.add('visible');
    }

    function hideRelevanceCard() {
        relTimeout = setTimeout(function() {
            relevanceCard.classList.remove('visible');
        }, 150);
    }

    gridRoot.addEventListener('mouseenter', function(e) {
        var btn = e.target.closest('.relevance-btn');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-rel-idx'), 10);
        var labels = gridRoot._filteredLabels;
        if (!labels || !labels[idx]) return;
        showRelevanceCard(btn, labels[idx]);
    }, true);

    gridRoot.addEventListener('mouseleave', function(e) {
        var btn = e.target.closest('.relevance-btn');
        if (btn) hideRelevanceCard();
    }, true);

    relevanceCard.addEventListener('mouseenter', function() { clearTimeout(relTimeout); });
    relevanceCard.addEventListener('mouseleave', function() { hideRelevanceCard(); });

    // ── 2025 Releases hover card ──
    var releasesCard = document.getElementById('releasesCard');
    var releasesTimeout = null;

    function paceColor(pace) {
        if (pace === 'weekly') return '#4da6ff';
        if (pace === 'biweekly') return '#10b981';
        if (pace === 'monthly') return '#f59e0b';
        if (pace === 'quarterly') return '#ef4444';
        return 'rgba(255,255,255,0.3)';
    }

    function showReleasesCard(btn, label) {
        clearTimeout(releasesTimeout);
        var r2025 = label.releases2025 || 0;
        var rLast6 = label.releasesLast6 || 0;
        var pace = label.releasePace || 'unknown';
        var perMonth = r2025 > 0 ? Math.round(r2025 / 12) : 0;
        var perWeek = r2025 > 0 ? (r2025 / 52).toFixed(1) : '0';

        var html = '<div class="rel-header">' + label.name + '</div>';
        html += '<div class="rel-sub">2025 release activity</div>';

        // Big number
        html += '<div style="text-align:center;margin:12px 0 16px;">';
        html += '  <div style="font-family:Outfit,sans-serif;font-weight:900;font-size:2.2rem;color:#4da6ff;line-height:1;">~' + r2025 + '</div>';
        html += '  <div style="font-family:\'JetBrains Mono\',monospace;font-size:0.5rem;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:1.5px;margin-top:4px;">around total releases in 2025</div>';
        if (label.releases2025src) {
            html += '  <div style="margin-top:6px;">';
            html += '    <a href="https://www.beatport.com/search?q=' + encodeURIComponent(label.name) + '&type=labels" target="_blank" style="color:#4da6ff;text-decoration:none;font-size:0.5rem;opacity:0.5;margin-right:4px;" title="Beatport: ' + label.releases2025src.beatport + '">BP</a>';
            html += '    <a href="https://open.spotify.com/search/' + encodeURIComponent(label.name) + '" target="_blank" style="color:#10b981;text-decoration:none;font-size:0.5rem;opacity:0.5;margin-right:4px;" title="Spotify: ' + label.releases2025src.spotify + '">SP</a>';
            html += '    <a href="https://www.discogs.com/search/?q=' + encodeURIComponent(label.name) + '&type=label" target="_blank" style="color:#f59e0b;text-decoration:none;font-size:0.5rem;opacity:0.5;" title="Discogs: ' + label.releases2025src.discogs + '">DC</a>';
            html += '  </div>';
        }
        html += '</div>';

        // Breakdown
        html += '<div class="rel-freq-row"><span class="rel-freq-label">last 6 months</span><span class="rel-freq-value">around ' + rLast6;
        if (label.releasesLast6src) {
            html += ' <a href="https://www.beatport.com/search?q=' + encodeURIComponent(label.name) + '&type=labels" target="_blank" style="color:#4da6ff;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:3px;" title="Beatport: ' + label.releasesLast6src.beatport + '">BP</a>';
            html += ' <a href="https://open.spotify.com/search/' + encodeURIComponent(label.name) + '" target="_blank" style="color:#10b981;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Spotify: ' + label.releasesLast6src.spotify + '">SP</a>';
            html += ' <a href="https://www.discogs.com/search/?q=' + encodeURIComponent(label.name) + '&type=label" target="_blank" style="color:#f59e0b;text-decoration:none;font-size:0.45rem;opacity:0.5;margin-left:2px;" title="Discogs: ' + label.releasesLast6src.discogs + '">DC</a>';
        }
        html += '</span></div>';
        html += '<div class="rel-freq-row"><span class="rel-freq-label">per month avg</span><span class="rel-freq-value">~' + perMonth + '</span></div>';
        html += '<div class="rel-freq-row"><span class="rel-freq-label">per week avg</span><span class="rel-freq-value">~' + perWeek + '</span></div>';

        // Pace badge
        html += '<div style="text-align:center;margin-top:10px;">';
        html += '  <span class="rel-pace" style="border-color:' + paceColor(pace) + ';color:' + paceColor(pace) + ';">' + pace + ' releases</span>';
        html += '</div>';

        releasesCard.innerHTML = html;

        var rect = btn.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var scrollX = window.scrollX || window.pageXOffset;
        releasesCard.style.left = (rect.left + scrollX) + 'px';
        releasesCard.style.top = (rect.bottom + scrollY + 8) + 'px';
        releasesCard.classList.add('visible');
    }

    function hideReleasesCard() {
        releasesTimeout = setTimeout(function() {
            releasesCard.classList.remove('visible');
        }, 150);
    }

    gridRoot.addEventListener('mouseenter', function(e) {
        var btn = e.target.closest('.releases-btn');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-releases-idx'), 10);
        var labels = gridRoot._filteredLabels;
        if (!labels || !labels[idx]) return;
        showReleasesCard(btn, labels[idx]);
    }, true);

    gridRoot.addEventListener('mouseleave', function(e) {
        var btn = e.target.closest('.releases-btn');
        if (btn) hideReleasesCard();
    }, true);

    releasesCard.addEventListener('mouseenter', function() { clearTimeout(releasesTimeout); });
    releasesCard.addEventListener('mouseleave', function() { hideReleasesCard(); });

    // ── Sidebar navigation ──
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

    // ── Logo click → hero doesn't return, just go to All ──
    document.getElementById('logoBtn').addEventListener('click', function () {
        if (heroVisible) dismissHero();
        switchView('all');
    });

    // ── Sort buttons ──
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

    // ── Search input ──
    searchInput.addEventListener('input', function () {
        render();
    });

    // ── Hero ──
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

    // ── Init ──
    animateHero();
    render();

})();
