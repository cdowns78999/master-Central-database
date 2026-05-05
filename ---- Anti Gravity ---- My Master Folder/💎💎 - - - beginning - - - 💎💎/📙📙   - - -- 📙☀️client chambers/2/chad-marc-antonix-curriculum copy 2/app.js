/* ══════════════════════════════════════════════════════════════
   MARC ANTONIX — APP LOGIC (V2)
   4 specialized renderers, modal takeover, drag/drop, Chart.js graph
   ══════════════════════════════════════════════════════════════ */

// ── Utility: escape HTML attributes ──
function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
    const contentRoot = document.getElementById('content-root');
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const pageCategory = document.body.getAttribute('data-page-category') || 'Home';

    // ── Set active nav state based on current page ──
    navItems.forEach(item => {
        if (item.getAttribute('data-view') === pageCategory) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // ── Route to correct renderer ──
    if (pageCategory === 'Home') {
        renderHome();
    } else {
        const starNum = pageCategory.replace('Star ', '');
        const starKey = 'star-' + starNum;
        switch (starNum) {
            case '1': renderStar1(starKey); break;
            case '2': renderStar2(starKey); break;
            case '3': renderStar3(starKey); break;
            case '4': renderStar4(starKey); break;
            case '5': renderStar5(starKey); break;
        }
    }

    // ══════════════════════════════════════
    // RENDER: Home — 4 Star Preview Cards
    // ══════════════════════════════════════
    function renderHome() {
        if (!contentRoot || typeof curriculumData === 'undefined') return;

        const stars = curriculumData.stars;
        let html = '';

        html += '<div class="section-header"><div class="section-dot"></div><span class="section-title">Your Proposals</span></div>';
        html += '<div class="star-cards-grid">';

        const typeLabels = {
            'presentation': 'Presentation',
            'website-engine': 'Website Engine',
            'sales-proposal': 'Sales Proposal',
            'research': 'Research'
        };

        let starIndex = 0;
        for (const key in stars) {
            const star = stars[key];
            starIndex++;

            // Type-aware meta counts
            let metaLabel = '';
            if (star.type === 'presentation' && star.subTiles) {
                metaLabel = star.subTiles.length + ' Sub-Tiles';
            } else if (star.type === 'website-engine' && star.frames) {
                metaLabel = star.frames.length + ' Site Frames';
            } else if (star.type === 'sales-proposal' && star.offerStack) {
                metaLabel = star.offerStack.length + ' Offers';
            } else if (star.type === 'research' && star.phases) {
                const phaseCount = star.phases.length;
                const stepCount = star.phases.reduce((sum, p) => sum + p.steps.length, 0);
                metaLabel = phaseCount + ' Phases \u00b7 ' + stepCount + ' Steps';
            }

            html += `
                <a href="${star.file}" class="star-card" data-star="${starIndex}" style="text-decoration:none;">
                    <span class="star-num">${starIndex}</span>
                    <div class="star-icon">${star.icon}</div>
                    <h3>${star.title}</h3>
                    <p>${star.tagline}</p>
                    <div style="margin-top:16px;display:flex;gap:16px;align-items:center;">
                        <span style="font-size:0.55rem;text-transform:uppercase;letter-spacing:1.5px;font-weight:800;color:var(--text-ghost);">${metaLabel}</span>
                        <span style="font-size:0.5rem;text-transform:uppercase;letter-spacing:1px;font-weight:700;color:var(--text-ghost);opacity:0.5;">${typeLabels[star.type] || ''}</span>
                    </div>
                    <span class="star-tag">Star ${starIndex}</span>
                </a>
            `;
        }

        html += '</div>';

        contentRoot.classList.add('fade-out');
        setTimeout(() => {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');
        }, 150);
    }

    // ══════════════════════════════════════
    // RENDER: Star 1 — Presentation (3 Sub-Tiles)
    // ══════════════════════════════════════
    function renderStar1(starKey) {
        if (!contentRoot || typeof curriculumData === 'undefined') return;
        const star = curriculumData.stars[starKey];
        if (!star) return;

        const accent = star.color;
        let html = '';

        html += `
            <div class="section-header">
                <div class="section-dot" style="background:${accent};"></div>
                <span class="section-title">Talking Points</span>
            </div>
            <div class="sub-tiles-grid">
        `;

        star.subTiles.forEach(tile => {
            const isGraph = tile.key === 'transition-graph';
            html += `
                <div class="sub-tile" data-tile="${tile.key}">
                    <div class="sub-tile-icon">${tile.icon}</div>
                    <h3 class="sub-tile-title">${tile.title}</h3>
                    <p class="sub-tile-desc">${tile.description}</p>
                    ${isGraph ? '<div class="transition-graph"><canvas id="transitionChart"></canvas></div>' : ''}
                </div>
            `;
        });

        html += '</div>';

        contentRoot.classList.add('fade-out');
        setTimeout(() => {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');

            // Render Chart.js graph if available
            const graphTile = star.subTiles.find(t => t.graphData);
            if (graphTile && typeof Chart !== 'undefined') {
                setTimeout(() => renderTransitionChart(graphTile.graphData), 100);
            }
        }, 150);
    }

    // ══════════════════════════════════════
    // RENDER: Star 2 — Website Engine (2 Preview Frames)
    // ══════════════════════════════════════
    function renderStar2(starKey) {
        if (!contentRoot || typeof curriculumData === 'undefined') return;
        const star = curriculumData.stars[starKey];
        if (!star) return;

        const accent = star.color;
        let html = '';

        html += `
            <div class="section-header">
                <div class="section-dot" style="background:${accent};"></div>
                <span class="section-title">Interactive Sites</span>
            </div>
            <div class="preview-frames-grid">
        `;

        star.frames.forEach(frame => {
            html += `
                <div class="preview-frame" onclick="openSiteModal('${escapeAttr(frame.key)}')">
                    <div class="preview-frame-header">
                        <span class="preview-frame-dot" style="background:${accent};"></span>
                        <span class="preview-frame-label">${frame.previewLabel}</span>
                    </div>
                    <p class="preview-frame-desc">${frame.previewDescription}</p>
                    <div class="preview-frame-meta">
                        <span>${frame.pageCount} pages</span>
                        <span class="preview-frame-cta">Open Full Site &rarr;</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        contentRoot.classList.add('fade-out');
        setTimeout(() => {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');
        }, 150);
    }

    // ══════════════════════════════════════
    // RENDER: Star 3 — Sales Proposal
    // ══════════════════════════════════════
    function renderStar3(starKey) {
        if (!contentRoot || typeof curriculumData === 'undefined') return;
        const star = curriculumData.stars[starKey];
        if (!star) return;

        const accent = star.color;
        let html = '';

        // Wrench handler badge
        html += `
            <div class="handler-badge">
                <span class="handler-wrench">&#x1f527;</span>
                <span class="handler-text">Handled by ${star.handler}</span>
            </div>
        `;

        // Dropzone
        html += `
            <div class="section-header">
                <div class="section-dot" style="background:${accent};"></div>
                <span class="section-title">Asset Drop Zone</span>
            </div>
            <div class="dropzone" id="dropzone">
                <div class="dropzone-inner">
                    <div class="dropzone-icon">&#x1f4c2;</div>
                    <p class="dropzone-label">Drop a Dropbox link or image here</p>
                    <p class="dropzone-hint">or paste a URL below</p>
                    <input type="text" class="dropzone-input" id="dropzoneInput" placeholder="Paste Dropbox or image URL...">
                </div>
                <div class="dropzone-preview" id="dropzonePreview"></div>
            </div>
        `;

        // Offer Stack
        html += `
            <div class="section-header">
                <div class="section-dot" style="background:${accent};"></div>
                <span class="section-title">Offer Stack</span>
            </div>
            <div class="offer-stack">
        `;

        star.offerStack.forEach((row, i) => {
            html += `
                <div class="offer-row">
                    <div class="offer-row-num">${i + 1}</div>
                    <div class="offer-row-info">
                        <div class="offer-row-service">${row.service}</div>
                        <div class="offer-row-deliverable">${row.deliverable}</div>
                    </div>
                    <div class="offer-row-pricing">
                        <div class="offer-row-price">${row.price}</div>
                        <div class="offer-row-detail">${row.detail}</div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        contentRoot.classList.add('fade-out');
        setTimeout(() => {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');
            initDropzone();
        }, 150);
    }

    // ══════════════════════════════════════
    // RENDER: Star 4 — Research (Phase Cards)
    // ══════════════════════════════════════
    function renderStar4(starKey) {
        if (!contentRoot || typeof curriculumData === 'undefined') return;
        const star = curriculumData.stars[starKey];
        if (!star) return;

        let html = '';
        const accent = star.color;

        // ── Benchmark Cards (top — big numbers, chad31 style) ──
        if (star.benchmarks && star.benchmarks.length > 0) {
            html += `
                <div class="section-header">
                    <div class="section-dot" style="background:${accent};"></div>
                    <span class="section-title">Key Benchmarks</span>
                </div>
                <div class="benchmark-grid">
            `;
            star.benchmarks.forEach(bench => {
                html += `
                    <div class="bench-card">
                        <div class="bench-value" style="color:${accent};">${bench.value}</div>
                        <div class="bench-label">${bench.label}</div>
                        <div class="bench-source">${bench.source}</div>
                    </div>
                `;
            });
            html += '</div>';
        }

        // ── Pre-Launch Checklist (reminders as a strip) ──
        if (star.reminders && star.reminders.length > 0) {
            html += `
                <div class="section-header">
                    <div class="section-dot" style="background:${accent};"></div>
                    <span class="section-title">Pre-Launch Checklist</span>
                </div>
                <div class="s4-checklist">
            `;
            star.reminders.forEach(r => {
                html += '<div class="s4-checklist-item"><span class="s4-check-dot" style="background:' + accent + ';"></span><span class="s4-check-text">' + r + '</span></div>';
            });
            html += '</div>';
        }

        // ── Phase Cards (the playbook — chad31 design + visuals) ──
        star.phases.forEach(phase => {
            var phaseIcon = phase.icon || '';
            html += `
                <div class="section-header">
                    <div class="section-dot" style="background:${accent};"></div>
                    <span class="section-title">${phaseIcon ? '<span class="s4-phase-icon">' + phaseIcon + '</span> ' : ''}${phase.label}: ${phase.title}</span>
                </div>
            `;

            phase.steps.forEach(step => {
                // Format body text: \n → <br>, style bullets
                var formattedBody = step.body
                    .replace(/\n/g, '<br>')
                    .replace(/\u2022/g, '<span style="color:' + accent + ';font-weight:800;">\u2022</span>');

                html += `
                    <div class="s4-step-card">
                        <div class="s4-step-header">
                            <span class="s4-step-num" style="background:${accent}15;color:${accent};">${phase.label.replace('Phase ', '')}</span>
                            <h3 class="s4-step-title">${step.heading}</h3>
                        </div>
                        <div class="s4-step-body">${formattedBody}</div>
                `;

                // ── VISUAL: 3 Inputs Grid (Phase 1, step 2) ──
                if (step.heading === 'The 3 Inputs That Determine Ranking') {
                    html += `
                        <div class="s4-visual-grid s4-3col">
                            <div class="s4-visual-card">
                                <div class="s4-visual-icon" style="background:rgba(245,158,11,0.1);color:#f59e0b;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                                </div>
                                <div class="s4-visual-label">Velocity</div>
                                <div class="s4-visual-desc">How fast streams accelerate</div>
                            </div>
                            <div class="s4-visual-card">
                                <div class="s4-visual-icon" style="background:rgba(59,130,246,0.1);color:#3b82f6;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                                </div>
                                <div class="s4-visual-label">Sharing</div>
                                <div class="s4-visual-desc">How often listeners share</div>
                            </div>
                            <div class="s4-visual-card">
                                <div class="s4-visual-icon" style="background:rgba(30,215,96,0.1);color:#1ed760;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                </div>
                                <div class="s4-visual-label">Discovery</div>
                                <div class="s4-visual-desc">% of brand-new listeners</div>
                            </div>
                        </div>
                    `;
                }

                // ── VISUAL: Save Rate Meter (Phase 4, save rate step) ──
                if (step.heading === 'The Save Rate Benchmark') {
                    html += `
                        <div class="s4-meter-wrap">
                            <div class="s4-meter-bar">
                                <div class="s4-meter-zone s4-meter-avg" style="width:30%;">
                                    <span>2-4%</span>
                                </div>
                                <div class="s4-meter-zone s4-meter-good" style="width:30%;">
                                    <span>5-8%</span>
                                </div>
                                <div class="s4-meter-zone s4-meter-viral" style="width:40%;">
                                    <span>10%+</span>
                                </div>
                            </div>
                            <div class="s4-meter-labels">
                                <span>Average</span>
                                <span>Algo Boost</span>
                                <span style="color:${accent};font-weight:800;">Viral 50 Zone</span>
                            </div>
                        </div>
                    `;
                }

                // ── VISUAL: Algorithm Cascade Flow (Phase 5, cascade step) ──
                if (step.heading.includes('Release Radar') && step.heading.includes('Viral 50')) {
                    html += `
                        <div class="s4-cascade-flow">
                            <div class="s4-cascade-node">
                                <div class="s4-cascade-dot" style="background:#1ed760;"></div>
                                <div class="s4-cascade-name">Release Radar</div>
                                <div class="s4-cascade-day">Day 1</div>
                            </div>
                            <div class="s4-cascade-arrow">\u2192</div>
                            <div class="s4-cascade-node">
                                <div class="s4-cascade-dot" style="background:#3b82f6;"></div>
                                <div class="s4-cascade-name">Discover Weekly</div>
                                <div class="s4-cascade-day">Day 3-4</div>
                            </div>
                            <div class="s4-cascade-arrow">\u2192</div>
                            <div class="s4-cascade-node">
                                <div class="s4-cascade-dot" style="background:#a855f7;"></div>
                                <div class="s4-cascade-name">Radio & Autoplay</div>
                                <div class="s4-cascade-day">Day 3-7</div>
                            </div>
                            <div class="s4-cascade-arrow">\u2192</div>
                            <div class="s4-cascade-node s4-cascade-target">
                                <div class="s4-cascade-dot" style="background:${accent};"></div>
                                <div class="s4-cascade-name">Viral 50</div>
                                <div class="s4-cascade-day">Day 2-7</div>
                            </div>
                        </div>
                    `;
                }

                // ── VISUAL: 10 Commandments Grid (Phase 6, commandments step) ──
                if (step.heading.includes('10 Commandments')) {
                    var commandments = [
                        'Velocity > Volume',
                        'One territory first',
                        'Hook fast, keep short',
                        'Canvas = mandatory',
                        'Pre-saves = Day 1 ammo',
                        '72-hour spike window',
                        'Save rate \u2265 5%',
                        'Don\u2019t break the chain',
                        'TikTok is #1 driver',
                        'Never stop pushing'
                    ];
                    html += '<div class="s4-visual-grid s4-5col">';
                    commandments.forEach(function(cmd, i) {
                        html += '<div class="s4-cmd-card"><span class="s4-cmd-num" style="color:' + accent + ';">' + (i + 1) + '</span><span class="s4-cmd-text">' + cmd + '</span></div>';
                    });
                    html += '</div>';
                }

                // Source link bar
                if (step.link && !step.link.includes('[LINK SLOT]')) {
                    html += `
                        <div class="s4-source-bar">
                            <span class="s4-source-dot" style="background:${accent};"></span>
                            <a href="${escapeAttr(step.link)}" target="_blank" rel="noopener" class="s4-source-link">${step.sourceText || step.link}</a>
                        </div>
                    `;
                }

                html += '</div>';
            });
        });

        contentRoot.classList.add('fade-out');
        setTimeout(() => {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');
        }, 150);
    }

    // ══════════════════════════════════════
    // RENDER: Star 5 — SoundCloud Growth Playbook
    // ══════════════════════════════════════
    function renderStar5(starKey) {
        if (!contentRoot || typeof curriculumData === 'undefined') return;
        var star = curriculumData.stars[starKey];
        if (!star) return;

        var html = '';
        var accent = star.color;

        // ── Benchmark Cards (top — big numbers, chad31 style) ──
        if (star.benchmarks && star.benchmarks.length > 0) {
            html += '<div class="section-header">';
            html += '<div class="section-dot" style="background:' + accent + ';"></div>';
            html += '<span class="section-title">Key Benchmarks</span>';
            html += '</div>';
            html += '<div class="benchmark-grid">';
            star.benchmarks.forEach(function(bench) {
                html += '<div class="bench-card">';
                html += '<div class="bench-value" style="color:' + accent + ';">' + bench.value + '</div>';
                html += '<div class="bench-label">' + bench.label + '</div>';
                html += '<div class="bench-source">' + bench.source + '</div>';
                html += '</div>';
            });
            html += '</div>';
        }

        // ── Pre-Launch Checklist (reminders as a strip) ──
        if (star.reminders && star.reminders.length > 0) {
            html += '<div class="section-header">';
            html += '<div class="section-dot" style="background:' + accent + ';"></div>';
            html += '<span class="section-title">SoundCloud Checklist</span>';
            html += '</div>';
            html += '<div class="s5-checklist">';
            star.reminders.forEach(function(r) {
                html += '<div class="s5-checklist-item"><span class="s5-check-dot" style="background:' + accent + ';"></span><span class="s5-check-text">' + r + '</span></div>';
            });
            html += '</div>';
        }

        // ── Phase Cards (the playbook — chad31 design + visuals) ──
        star.phases.forEach(function(phase) {
            var phaseIcon = phase.icon || '';
            html += '<div class="section-header">';
            html += '<div class="section-dot" style="background:' + accent + ';"></div>';
            html += '<span class="section-title">' + (phaseIcon ? '<span class="s5-phase-icon">' + phaseIcon + '</span> ' : '') + phase.label + ': ' + phase.title + '</span>';
            html += '</div>';

            phase.steps.forEach(function(step) {
                // Format body text: \n → <br>, style bullets
                var formattedBody = step.body
                    .replace(/\n/g, '<br>')
                    .replace(/\u2022/g, '<span style="color:' + accent + ';font-weight:800;">\u2022</span>');

                html += '<div class="s5-step-card">';
                html += '<div class="s5-step-header">';
                html += '<span class="s5-step-num" style="background:' + accent + '15;color:' + accent + ';">' + phase.label.replace('Phase ', '') + '</span>';
                html += '<h3 class="s5-step-title">' + step.heading + '</h3>';
                html += '</div>';
                html += '<div class="s5-step-body">' + formattedBody + '</div>';

                // ── VISUAL 1: Algo Signals Grid (3-col) — triggers on "3 Signals" ──
                if (step.heading.includes('3 Signals')) {
                    html += '<div class="s5-visual-grid s5-3col">';
                    html += '<div class="s5-visual-card">';
                    html += '<div class="s5-visual-icon" style="background:rgba(255,85,0,0.1);color:#ff5500;">';
                    html += '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>';
                    html += '</div>';
                    html += '<div class="s5-visual-label">Reposts</div>';
                    html += '<div class="s5-visual-desc">The #1 social signal on SC</div>';
                    html += '</div>';
                    html += '<div class="s5-visual-card">';
                    html += '<div class="s5-visual-icon" style="background:rgba(59,130,246,0.1);color:#3b82f6;">';
                    html += '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
                    html += '</div>';
                    html += '<div class="s5-visual-label">Completion Rate</div>';
                    html += '<div class="s5-visual-desc">% who play to the end</div>';
                    html += '</div>';
                    html += '<div class="s5-visual-card">';
                    html += '<div class="s5-visual-icon" style="background:rgba(30,215,96,0.1);color:#1ed760;">';
                    html += '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>';
                    html += '</div>';
                    html += '<div class="s5-visual-label">First 48hrs</div>';
                    html += '<div class="s5-visual-desc">Initial engagement window</div>';
                    html += '</div>';
                    html += '</div>';
                }

                // ── VISUAL 2: Completion Rate Meter — triggers on "Recommendation Algorithm" ──
                if (step.heading.includes('Recommendation Algorithm')) {
                    html += '<div class="s5-meter-wrap">';
                    html += '<div class="s5-meter-bar">';
                    html += '<div class="s5-meter-zone s5-meter-suppressed" style="width:30%;"><span>&lt;30%</span></div>';
                    html += '<div class="s5-meter-zone s5-meter-healthy" style="width:35%;"><span>50-70%</span></div>';
                    html += '<div class="s5-meter-zone s5-meter-boost" style="width:35%;"><span>80%+</span></div>';
                    html += '</div>';
                    html += '<div class="s5-meter-labels">';
                    html += '<span>Suppressed</span>';
                    html += '<span>Healthy</span>';
                    html += '<span style="color:' + accent + ';font-weight:800;">Algo Boost</span>';
                    html += '</div>';
                    html += '</div>';
                }

                // ── VISUAL 3: Discovery Cascade Flow (5 nodes) — triggers on "Buzzing Playlists" ──
                if (step.heading.includes('Buzzing Playlists')) {
                    html += '<div class="s5-cascade-flow">';
                    html += '<div class="s5-cascade-node">';
                    html += '<div class="s5-cascade-dot" style="background:#3b82f6;"></div>';
                    html += '<div class="s5-cascade-name">Upload</div>';
                    html += '<div class="s5-cascade-day">Day 1</div>';
                    html += '</div>';
                    html += '<div class="s5-cascade-arrow">\u2192</div>';
                    html += '<div class="s5-cascade-node">';
                    html += '<div class="s5-cascade-dot" style="background:#a855f7;"></div>';
                    html += '<div class="s5-cascade-name">The Upload</div>';
                    html += '<div class="s5-cascade-day">Editorial</div>';
                    html += '</div>';
                    html += '<div class="s5-cascade-arrow">\u2192</div>';
                    html += '<div class="s5-cascade-node">';
                    html += '<div class="s5-cascade-dot" style="background:#1ed760;"></div>';
                    html += '<div class="s5-cascade-name">Buzzing</div>';
                    html += '<div class="s5-cascade-day">Algorithmic</div>';
                    html += '</div>';
                    html += '<div class="s5-cascade-arrow">\u2192</div>';
                    html += '<div class="s5-cascade-node">';
                    html += '<div class="s5-cascade-dot" style="background:#f59e0b;"></div>';
                    html += '<div class="s5-cascade-name">New & Hot</div>';
                    html += '<div class="s5-cascade-day">Momentum</div>';
                    html += '</div>';
                    html += '<div class="s5-cascade-arrow">\u2192</div>';
                    html += '<div class="s5-cascade-node s5-cascade-target">';
                    html += '<div class="s5-cascade-dot" style="background:' + accent + ';"></div>';
                    html += '<div class="s5-cascade-name">Top 50</div>';
                    html += '<div class="s5-cascade-day">Chart</div>';
                    html += '</div>';
                    html += '</div>';
                }

                // ── VISUAL 4: SoundCloud Commandments (10 mini cards, 5-col) — triggers on "Commandments" ──
                if (step.heading.includes('Commandments')) {
                    var scCommandments = [
                        'Lossless upload only',
                        'Tag #SCFIRST',
                        'Complete all metadata',
                        'Tue/Wed upload timing',
                        '48hr repost burst',
                        'Completion rate > 50%',
                        'RepostExchange bursts',
                        'Optimize your profile',
                        'New & Hot first',
                        'Front-load everything'
                    ];
                    html += '<div class="s5-visual-grid s5-5col">';
                    scCommandments.forEach(function(cmd, i) {
                        html += '<div class="s5-cmd-card"><span class="s5-cmd-num" style="color:' + accent + ';">' + (i + 1) + '</span><span class="s5-cmd-text">' + cmd + '</span></div>';
                    });
                    html += '</div>';
                }

                // Source link bar
                if (step.link) {
                    html += '<div class="s5-source-bar">';
                    html += '<span class="s5-source-dot" style="background:' + accent + ';"></span>';
                    html += '<a href="' + escapeAttr(step.link) + '" target="_blank" rel="noopener" class="s5-source-link">' + (step.sourceText || step.link) + '</a>';
                    html += '</div>';
                }

                html += '</div>';
            });
        });

        contentRoot.classList.add('fade-out');
        setTimeout(function() {
            contentRoot.innerHTML = html;
            contentRoot.classList.remove('fade-out');
        }, 150);
    }

    // ══════════════════════════════════════
    // CHART.JS: Transition Graph (Star 1)
    // ══════════════════════════════════════
    function renderTransitionChart(graphData) {
        const canvas = document.getElementById('transitionChart');
        if (!canvas) return;

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: graphData.line1.map(p => p.x),
                datasets: [
                    {
                        label: "Int'l Playlisting",
                        data: graphData.line1.map(p => p.y),
                        borderColor: '#1ed760',
                        backgroundColor: 'rgba(30,215,96,0.1)',
                        borderWidth: 2,
                        pointRadius: 6,
                        pointBackgroundColor: '#1ed760',
                        pointBorderColor: '#1ed760',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Spotify Ads',
                        data: graphData.line2.map(p => p.y),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        borderWidth: 2,
                        pointRadius: 6,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#3b82f6',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255,255,255,0.6)',
                            font: { family: 'Inter', size: 11 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
                        grid: { color: 'rgba(255,255,255,0.04)' }
                    },
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            color: 'rgba(255,255,255,0.4)',
                            font: { size: 11 },
                            callback: function(v) { return v + '%'; }
                        },
                        grid: { color: 'rgba(255,255,255,0.04)' }
                    }
                }
            }
        });
    }

    // ══════════════════════════════════════
    // DRAG/DROP: Dropzone (Star 3)
    // ══════════════════════════════════════
    function initDropzone() {
        const dropzone = document.getElementById('dropzone');
        const preview = document.getElementById('dropzonePreview');
        const input = document.getElementById('dropzoneInput');
        if (!dropzone) return;

        dropzone.addEventListener('dragover', e => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', e => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            const text = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
            if (text) {
                renderDropPreview(text, preview);
            }
        });

        if (input) {
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && input.value.trim()) {
                    renderDropPreview(input.value.trim(), preview);
                    input.value = '';
                }
            });
        }
    }

    function renderDropPreview(url, container) {
        if (!container) return;
        const safeUrl = escapeAttr(url);
        container.innerHTML =
            '<img src="' + safeUrl + '" alt="Dropped asset" class="dropzone-image" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">' +
            '<a href="' + safeUrl + '" target="_blank" rel="noopener" class="dropzone-link" style="display:none;">' + safeUrl + '</a>';
    }
});

// ══════════════════════════════════════
// SITE MODAL TAKEOVER (Star 2)
// ══════════════════════════════════════
function openSiteModal(frameKey) {
    if (typeof curriculumData === 'undefined') return;
    const star = curriculumData.stars['star-2'];
    if (!star) return;

    const frame = star.frames.find(f => f.key === frameKey);
    if (!frame) return;

    // Build modal
    let modalHtml = '<div class="site-modal active" id="siteModal" onclick="if(event.target===this)closeSiteModal()">';
    modalHtml += '<div class="site-modal-content">';
    modalHtml += '<button class="site-modal-close" onclick="closeSiteModal()">\u2715</button>';

    if (frameKey === 'epk') {
        // EPK: single scrollable page — no tab nav
        modalHtml += '<div class="site-modal-body epk-body" id="siteModalBody">';
        modalHtml += buildEPKSkeleton();
        modalHtml += '</div>';
    } else {
        // Website: globe + grid dashboard — no tab nav
        modalHtml += '<div class="site-modal-body epk-body" id="siteModalBody">';
        modalHtml += buildWebsiteSkeleton();
        modalHtml += '</div>';
    }

    modalHtml += '</div></div>';

    // Inject
    var existing = document.getElementById('siteModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';

    // Initialize globe for website frame
    if (frameKey === 'website') {
        initWebsiteGlobe();
    }
}

function closeSiteModal() {
    var modal = document.getElementById('siteModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(function() { modal.remove(); }, 300);
    }
    document.body.style.overflow = '';
}

function switchModalPage(el, slug) {
    document.querySelectorAll('.site-modal-nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.site-modal-section').forEach(s => {
        s.style.display = s.dataset.slug === slug ? 'block' : 'none';
    });
}

function buildEPKSkeleton() {
    // Lucide SVG icons (identical to KenzDean source)
    var svgTrending = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>';
    var svgMusic = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
    var svgAward = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>';
    var svgDownload = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>';
    var svgMail = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>';

    return '' +
        // ── Header (fixed nav — identical to KenzDean) ──
        '<div class="epk-header">' +
            '<div class="epk-header-inner">' +
                '<span class="epk-logo">MARC ANTONIX</span>' +
                '<nav class="epk-nav">' +
                    '<span class="epk-nav-link">About</span>' +
                    '<span class="epk-nav-link active">Press Kit</span>' +
                '</nav>' +
            '</div>' +
        '</div>' +

        // ── Main content area (pt-24 pb-16) ──
        '<main style="padding-top:96px;padding-bottom:64px;">' +
        '<div class="epk-container">' +

        // ── Hero (text-center mb-12 sm:mb-16) ──
        '<div style="text-align:center;margin-bottom:64px;">' +
            '<h1 style="font-size:3.75rem;font-weight:700;letter-spacing:-0.025em;color:#f8fafc;margin-bottom:16px;line-height:1;">Press Kit</h1>' +
            '<p style="font-size:1.25rem;color:#94a3b8;max-width:672px;margin:0 auto;line-height:1.625;">Official media resources and assets for press, publications, and promotional use</p>' +
        '</div>' +

        // ── Stats Grid (grid-cols-3 gap-6 mb-16) ──
        '<div class="epk-stats-grid">' +
            '<div class="epk-stat-card">' +
                '<div class="epk-stat-icon">' + svgTrending + '</div>' +
                '<div>' +
                    '<p class="epk-stat-value">3.75M+</p>' +
                    '<p class="epk-stat-label">Total Streams</p>' +
                '</div>' +
            '</div>' +
            '<div class="epk-stat-card">' +
                '<div class="epk-stat-icon">' + svgMusic + '</div>' +
                '<div>' +
                    '<p class="epk-stat-value">127K</p>' +
                    '<p class="epk-stat-label">Monthly Listeners</p>' +
                '</div>' +
            '</div>' +
            '<div class="epk-stat-card">' +
                '<div class="epk-stat-icon">' + svgAward + '</div>' +
                '<div>' +
                    '<p class="epk-stat-value">Major Co-Signs</p>' +
                    '<p class="epk-stat-label">Afrojack \u00b7 Don Diablo \u00b7 Fedde Le Grand</p>' +
                '</div>' +
            '</div>' +
        '</div>' +

        // ── Official Bio Card (mb-16) ──
        '<div class="epk-bio-card">' +
            '<div class="epk-bio-header">' +
                '<h3>Official Bio</h3>' +
                '<button class="epk-btn-outline">' + svgDownload + ' Download TXT</button>' +
            '</div>' +
            '<p class="epk-bio-text">Marc Antonix is an American electronic music producer and DJ from San Antonio, Texas, now based in Los Angeles. Supported by industry heavyweights including Afrojack, Don Diablo, Bingo Players, Fedde Le Grand, and Morgan Page, Marc has become an unshakable name in the evolving world of electronica.\n\nEach Marc Antonix track pairs cinematic bass elements with adrenaline-pumping euphoric drops while adorning ethereal melodies with haunting, angelic vocals \u2014 combining production mastery with a refreshing new take on house music. With over 3.75 million Spotify streams and 127K monthly listeners, his sound continues to reach new audiences worldwide.\n\nNotably, his remix of Heidi Montag\u2019s \u201cI\u2019ll Do It\u201d topped the U.S. iTunes chart with fan support. Recent releases include \u201c4AM\u201d with KATTASTROPHIX and \u201cVisions\u201d \u2014 cementing his trajectory as one of EDM\u2019s most exciting emerging voices heading into 2026.</p>' +
        '</div>' +

        // ── Press Photos (mb-16) ──
        '<div style="margin-bottom:64px;">' +
        '<h2 class="epk-section-title">Press Photos</h2>' +
        '<div class="epk-photos-grid">' +
            '<div class="epk-photo-card">' +
                '<div class="epk-photo-img"><img src="https://i.scdn.co/image/ab67616100005174c52f07dbae2484cb7ce7499e" alt="Marc Antonix - Official Artist Photo"></div>' +
                '<div class="epk-photo-info">' +
                    '<h3>Artist Photo</h3>' +
                    '<p>Official artist portrait for press and promotional use</p>' +
                    '<button class="epk-btn-outline" style="width:100%;">' + svgDownload + ' Download High-Res</button>' +
                '</div>' +
            '</div>' +
            '<div class="epk-photo-card">' +
                '<div class="epk-photo-img aspect-3-4"><img src="https://i.scdn.co/image/ab67616100005174c52f07dbae2484cb7ce7499e" alt="Marc Antonix - Studio" style="object-position:center top;"></div>' +
                '<div class="epk-photo-info">' +
                    '<h3>In Studio \u2014 Los Angeles</h3>' +
                    '<p>Marc Antonix in the studio, Los Angeles</p>' +
                    '<button class="epk-btn-outline" style="width:100%;">' + svgDownload + ' Download High-Res</button>' +
                '</div>' +
            '</div>' +
            '<div class="epk-photo-card">' +
                '<div class="epk-photo-img"><img src="https://i.scdn.co/image/ab67616100005174c52f07dbae2484cb7ce7499e" alt="Marc Antonix - Cover Art" style="filter:hue-rotate(20deg) saturate(1.2);"></div>' +
                '<div class="epk-photo-info">' +
                    '<h3>Release Cover Art</h3>' +
                    '<p>Official single artwork for press and promotional use</p>' +
                    '<button class="epk-btn-outline" style="width:100%;">' + svgDownload + ' Download High-Res</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '</div>' +

        // ── Press Inquiries CTA ──
        '<div class="epk-cta-card">' +
            '<div class="epk-cta-icon">' + svgMail + '</div>' +
            '<h2>Press Inquiries</h2>' +
            '<p>For interviews, features, and media requests</p>' +
            '<button class="epk-btn-primary">Contact Press Team</button>' +
        '</div>' +

        '</div>' + // close epk-container
        '</main>' +

        // ── Footer ──
        '<div class="epk-footer" style="margin-top:0;">' +
            '<div class="epk-container">' +
                '<p>\u00a9 2026 Marc Antonix. All rights reserved.</p>' +
            '</div>' +
        '</div>';
}

function buildWebsiteSkeleton() {
    // Lucide SVGs for sections
    var svgMapPin = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
    var svgDisc = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
    var svgZap = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
    var svgPlay = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    var svgExternalLink = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>';
    var svgChevDown = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

    return '' +
        // ── Header (sticky nav bar) ──
        '<div class="epk-header">' +
            '<div class="epk-header-inner">' +
                '<span class="epk-logo">MARC ANTONIX</span>' +
                '<nav class="epk-nav">' +
                    '<span class="epk-nav-link active">Home</span>' +
                    '<span class="epk-nav-link">Shows</span>' +
                    '<span class="epk-nav-link">Releases</span>' +
                    '<span class="epk-nav-link">Socials</span>' +
                '</nav>' +
            '</div>' +
        '</div>' +

        // ══════════════════════════════════════
        // HOMEPAGE HERO — Bold, clean, guides down
        // ══════════════════════════════════════
        '<div class="ws-home-hero">' +
            '<div class="ws-home-inner">' +
                '<div class="ws-home-badge">' + svgZap + ' ARTIST</div>' +
                '<h1 class="ws-home-name">Marc<br>Antonix</h1>' +
                '<p class="ws-home-tagline">Electronic Music Producer & DJ</p>' +
                '<div class="ws-home-details">' +
                    '<span class="ws-home-chip">' + svgMapPin + ' Los Angeles, CA</span>' +
                    '<span class="ws-home-chip">' + svgDisc + ' EDM / House</span>' +
                '</div>' +
                '<div class="ws-home-scroll-cue">' +
                    '<span>Show History</span>' +
                    svgChevDown +
                '</div>' +
            '</div>' +
        '</div>' +

        // ══════════════════════════════════════
        // SHOW HISTORY — Globe + Grid (existing)
        // ══════════════════════════════════════
        '<div class="ws-section" id="ws-shows">' +

        // ── Dashboard Header ──
        '<div class="ws-header">' +
            '<p class="ws-header-mono">SHOW_SURVEILLANCE_v1.0</p>' +
            '<h1>Show History</h1>' +
            '<p>Global monitoring of verified performance nodes and venue coordinates.</p>' +
        '</div>' +

        // ── Globe Visualization ──
        '<div class="ws-globe-container" id="websiteGlobe"></div>' +

        // ── Surveillance Table ──
        '<div class="ws-table-wrapper">' +
        '<table class="ws-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Venue_Name</th>' +
                    '<th>Date_Window</th>' +
                    '<th>City_Coord</th>' +
                    '<th>Protocol_Status</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                '<tr>' +
                    '<td>AVALON Hollywood</td>' +
                    '<td>2025\u201111\u201108</td>' +
                    '<td>LOS ANGELES, CA</td>' +
                    '<td><span class="ws-status-indicator"></span>VERIFIED</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Sherry Bar &amp; Lounge</td>' +
                    '<td>2024\u201110\u201112</td>' +
                    '<td>MIAMI BEACH, FL</td>' +
                    '<td><span class="ws-status-indicator"></span>VERIFIED</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Academy LA</td>' +
                    '<td>2023\u201110\u201120</td>' +
                    '<td>LOS ANGELES, CA</td>' +
                    '<td><span class="ws-status-indicator"></span>VERIFIED</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>The Venue ATX</td>' +
                    '<td>2022\u201112\u201131</td>' +
                    '<td>AUSTIN, TX</td>' +
                    '<td><span class="ws-status-indicator"></span>VERIFIED</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>The Venue ATX</td>' +
                    '<td>2022\u201109\u201103</td>' +
                    '<td>AUSTIN, TX</td>' +
                    '<td><span class="ws-status-indicator"></span>VERIFIED</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
        '</div>' +

        '</div>' + // close ws-shows section

        // ══════════════════════════════════════
        // RELEASES
        // ══════════════════════════════════════
        '<div class="ws-section" id="ws-releases">' +
            '<div class="ws-header">' +
                '<p class="ws-header-mono">RELEASE_CATALOG</p>' +
                '<h1>Releases</h1>' +
                '<p>Official discography and streaming links.</p>' +
            '</div>' +
            '<div class="ws-releases-grid">' +
                '<div class="ws-release-card">' +
                    '<div class="ws-release-art">[Cover Art]</div>' +
                    '<div class="ws-release-info">' +
                        '<h3>[Single Title]</h3>' +
                        '<p class="ws-release-meta">Single \u00b7 2025</p>' +
                        '<div class="ws-release-links">' +
                            '<span class="ws-release-link">' + svgPlay + ' Spotify</span>' +
                            '<span class="ws-release-link">' + svgPlay + ' Apple Music</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ws-release-card">' +
                    '<div class="ws-release-art">[Cover Art]</div>' +
                    '<div class="ws-release-info">' +
                        '<h3>[Single Title]</h3>' +
                        '<p class="ws-release-meta">Single \u00b7 2024</p>' +
                        '<div class="ws-release-links">' +
                            '<span class="ws-release-link">' + svgPlay + ' Spotify</span>' +
                            '<span class="ws-release-link">' + svgPlay + ' Apple Music</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ws-release-card">' +
                    '<div class="ws-release-art">[Cover Art]</div>' +
                    '<div class="ws-release-info">' +
                        '<h3>[EP Title]</h3>' +
                        '<p class="ws-release-meta">EP \u00b7 4 Tracks \u00b7 2023</p>' +
                        '<div class="ws-release-links">' +
                            '<span class="ws-release-link">' + svgPlay + ' Spotify</span>' +
                            '<span class="ws-release-link">' + svgPlay + ' Apple Music</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        // ══════════════════════════════════════
        // SOCIALS
        // ══════════════════════════════════════
        '<div class="ws-section" id="ws-socials">' +
            '<div class="ws-header">' +
                '<p class="ws-header-mono">SOCIAL_NETWORK</p>' +
                '<h1>Socials</h1>' +
                '<p>Connect everywhere.</p>' +
            '</div>' +
            '<div class="ws-socials-grid">' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x1f3b5;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>Spotify</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x1f4f8;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>Instagram</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x1f426;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>X / Twitter</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x1f3ac;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>YouTube</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x2601;&#xfe0f;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>SoundCloud</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
                '<a class="ws-social-card" href="#" target="_blank" rel="noopener">' +
                    '<div class="ws-social-icon">&#x1f3b6;</div>' +
                    '<div class="ws-social-info">' +
                        '<h3>TikTok</h3>' +
                        '<p>[Link TBD]</p>' +
                    '</div>' +
                    '<span class="ws-social-arrow">' + svgExternalLink + '</span>' +
                '</a>' +
            '</div>' +
        '</div>' +

        // ══════════════════════════════════════
        // MORE
        // ══════════════════════════════════════
        '<div class="ws-section" id="ws-more">' +
            '<div class="ws-header">' +
                '<p class="ws-header-mono">MORE_INFO</p>' +
                '<h1>More</h1>' +
                '<p>Booking, management, and press inquiries.</p>' +
            '</div>' +
            '<div class="ws-more-grid">' +
                '<div class="ws-more-card">' +
                    '<h3>Booking</h3>' +
                    '<p>[Contact TBD]</p>' +
                '</div>' +
                '<div class="ws-more-card">' +
                    '<h3>Management</h3>' +
                    '<p>[Contact TBD]</p>' +
                '</div>' +
                '<div class="ws-more-card">' +
                    '<h3>Press</h3>' +
                    '<p>[Contact TBD]</p>' +
                '</div>' +
            '</div>' +
        '</div>' +

        // ── Footer ──
        '<div class="ws-footer">' +
            '<p>\u00a9 2026 Marc Antonix. All rights reserved.</p>' +
        '</div>';
}

// ══════════════════════════════════════
// GLOBE.GL: Website Show History (Star 2)
// ══════════════════════════════════════
function initWebsiteGlobe() {
    var container = document.getElementById('websiteGlobe');
    if (!container) return;

    var showPoints = [
        { lat: 34.1017, lng: -118.3254, name: 'AVALON Hollywood', city: 'LOS ANGELES, CA' },
        { lat: 25.7907, lng: -80.1300, name: 'Sherry Bar & Lounge', city: 'MIAMI BEACH, FL' },
        { lat: 34.0383, lng: -118.2653, name: 'Academy LA', city: 'LOS ANGELES, CA' },
        { lat: 30.2672, lng: -97.7431, name: 'The Venue ATX', city: 'AUSTIN, TX' }
    ];

    function createGlobe() {
        if (typeof Globe === 'undefined') return;
        var w = container.offsetWidth;
        var h = container.offsetHeight;
        var globe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .backgroundColor('rgba(0,0,0,0)')
            .showAtmosphere(true)
            .atmosphereColor('#3b82f6')
            .atmosphereAltitude(0.15)
            .pointsData(showPoints)
            .pointLat('lat')
            .pointLng('lng')
            .pointColor(function() { return '#3b82f6'; })
            .pointAltitude(0.06)
            .pointRadius(0.5)
            .pointLabel(function(d) {
                return '<div style="color:#fff;font-family:Courier New,monospace;font-size:12px;padding:4px 8px;background:rgba(0,0,0,0.7);border-radius:4px;border:1px solid rgba(59,130,246,0.3);">' +
                    d.name + '<br><span style="color:#888;">' + d.city + '</span></div>';
            })
            .width(w)
            .height(h)
            (container);

        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        globe.controls().enableZoom = true;

        // Focus on North America (where all venues are)
        globe.pointOfView({ lat: 32, lng: -100, altitude: 2.5 }, 1000);

        // Resize handler
        var resizeOb = new ResizeObserver(function() {
            globe.width(container.offsetWidth);
            globe.height(container.offsetHeight);
        });
        resizeOb.observe(container);
    }

    // Load globe.gl dynamically if not already present
    if (typeof Globe !== 'undefined') {
        createGlobe();
    } else {
        var script = document.createElement('script');
        script.src = '//unpkg.com/globe.gl';
        script.onload = function() {
            setTimeout(createGlobe, 100);
        };
        document.head.appendChild(script);
    }
}

// ══════════════════════════════════════
// DATA OVERLAY
// ══════════════════════════════════════
function toggleOverlay() {
    var overlay = document.getElementById('dataOverlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// Close overlay/modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modal = document.getElementById('siteModal');
        if (modal) { closeSiteModal(); return; }
        var overlay = document.getElementById('dataOverlay');
        if (overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    }
});

// Close overlay on backdrop click
document.addEventListener('click', function(e) {
    var overlay = document.getElementById('dataOverlay');
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});
