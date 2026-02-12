// ============================================
// Avatar Trainer - Base Script
// ============================================

console.log('Avatar Trainer loaded');

// ============================================
// Password Protection System
// ============================================

function checkGlobalPassword(input, event) {
    if (event.key === 'Enter') {
        if (input.value.toLowerCase() === 'fuckk') {
            localStorage.setItem('avatar_trainer_unlocked', 'true');
            window.location.href = 'step3.html';
        } else {
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
                input.value = '';
            }, 400);
        }
    }
}

// Check persistent state on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('avatar_trainer_unlocked') === 'true') {
        document.body.classList.remove('locked');
        const overlay = document.getElementById('pw-overlay');
        if (overlay) overlay.style.display = 'none';
    } else {
        const pwInput = document.getElementById('global-pw');
        if (pwInput) {
            setTimeout(() => pwInput.focus(), 100);
        }
    }

    // Init confetti particles
    initConfetti();
});

// ============================================
// Confetti Particle System
// ============================================

let particles = [];
let mouse = { x: -1000, y: -1000 };
const colors = ['#ff69b4', '#00bfff', '#ffd700', '#ff1493', '#00ff88', '#a855f7'];

class Particle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0.8 + Math.random() * 1.5;
        this.length = 4 + Math.random() * 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.3 + Math.random() * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = 0.2 + Math.random() * 0.4;
        this.angleVel = (Math.random() - 0.5) * 0.02;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update(width, height, mouse) {
        this.angle += this.angleVel;
        let targetX = Math.cos(this.angle) * this.velocity;
        let targetY = Math.sin(this.angle) * this.velocity;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const limit = 120;

        if (dist < limit) {
            const force = (limit - dist) / limit;
            this.offsetX += (dx / dist) * force * 2.5;
            this.offsetY += (dy / dist) * force * 2.5;
        }

        this.offsetX *= 0.92;
        this.offsetY *= 0.92;

        this.x += targetX + this.offsetX;
        this.y += targetY + this.offsetY;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const r = this.radius;
        const h = this.length;
        ctx.moveTo(-r, -h / 2);
        ctx.lineTo(-r, h / 2);
        ctx.arc(0, h / 2, r, Math.PI, 0);
        ctx.lineTo(r, -h / 2);
        ctx.arc(0, -h / 2, r, 0, Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

function initConfetti() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animFrameId;

    // Create particles
    const count = Math.min(80, (width * height) / 15000);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(width, height));
    }

    function drawFrame() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update(width, height, mouse);
            p.draw(ctx);
        });
        animFrameId = requestAnimationFrame(drawFrame);
    }

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    drawFrame();
}

// Toggle sidebar visibility
const toggleSidebarBtn = document.querySelector('.toggle-sidebar button');
const body = document.body;

if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', function() {
        body.classList.toggle('visible-sidebar');
    });
}

// Highlight current page in sidebar navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.link-item a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// ============================================
// Step 1 - Interactive Avatar Styling
// ============================================

const styleCards = document.querySelectorAll('.style-card');
const styleBtns = document.querySelectorAll('.style-btn');
const stylePreviews = document.querySelectorAll('.style-preview');

// Add spin animation to preview on card click
stylePreviews.forEach((preview, index) => {
    preview.addEventListener('click', function() {
        preview.style.animation = 'none';
        setTimeout(() => {
            preview.style.animation = 'spin-preview 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 10);
    });
});

// Button interaction: subtle glow burst on click
styleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create glow burst effect
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.8)';
        ripple.style.borderRadius = '50%';
        ripple.style.animation = 'ripple-burst 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        console.log('Selected style:', btn.textContent);
    });
});

// Hover glow effect on cards
styleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 32px rgba(255, 105, 180, 0.4), inset 0 0 16px rgba(255, 105, 180, 0.1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// CTA text interaction
const ctaText = document.querySelector('.cta-text');
if (ctaText) {
    ctaText.addEventListener('click', function() {
        console.log('Navigating to next step...');
        // Later: link to step 2
    });

    ctaText.addEventListener('mouseenter', function() {
        this.style.color = '#ffff99';
    });

    ctaText.addEventListener('mouseleave', function() {
        this.style.color = '#ffd700';
    });
}

// ============================================
// Mood Orb - 3D Avatar Spinner
// ============================================

function initMoodOrb(containerId, config = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Mood orb container "${containerId}" not found`);
        return;
    }

    const defaultConfig = {
        autoSpin: true,
        spinSpeed: 1,
        mouseDrag: true,
        colors: ['#ff69b4', '#00bfff', '#ffd700'],
        ...config
    };

    console.log('Initializing Mood Orb with config:', defaultConfig);

    // Placeholder: when globe logic is provided, it will be inserted here
    // Expected: the globe library will populate container with a 3D mesh
    // and expose methods like:
    // - startRotation(speed)
    // - stopRotation()
    // - setColor(colorArray)
    // - onDragRotate(callback)

    return {
        config: defaultConfig,
        container: container,
        // Stub methods for later integration
        rotate: function(axis, speed) {
            console.log(`Rotating ${axis} at speed ${speed}`);
        },
        setGradient: function(colors) {
            console.log('Setting gradient colors:', colors);
        },
        enableDrag: function() {
            if (defaultConfig.mouseDrag) {
                console.log('Mouse drag enabled for mood orb');
            }
        }
    };
}

// Placeholder for future 3D viewer integration
window.Avatar3DViewer = {
    init: function() {
        console.log('3D Viewer ready for initialization');
    },
    initMoodOrb: initMoodOrb,
    selectStyle: function(styleName) {
        console.log('Loading 3D style:', styleName);
    }
};

// Auto-initialize mood orb on Step 1 page
document.addEventListener('DOMContentLoaded', function() {
    const moodOrbContainer = document.getElementById('mood-orb');
    if (moodOrbContainer) {
        window.Avatar3DViewer.initMoodOrb('mood-orb', {
            autoSpin: true,
            spinSpeed: 0.5,
            mouseDrag: true
        });
    }
});

// ============================================
// Step 2 - VRChat Tutorial System
// ============================================

const tutorialSteps = [
    {
        title: 'Install VCC',
        one: 'Download from vrchat.com, run installer, accept terms, VCC finds Unity Hub',
        two: 'First launch guides Unity setup; requires Unity 2022.3 LTS, VCC manages install',
        links: [
            { label: 'VRChat Creator Companion', url: 'https://vcc.docs.vrchat.com/' }
        ]
    },
    {
        title: 'VCC + Unity Setup',
        one: 'Open VCC > Settings > Unity tab, install Unity 2022.3.x via Unity Hub, wait',
        two: 'Click "New Project" > Avatar template, choose folder, VCC auto-installs SDK',
        links: [
            { label: 'Unity Hub Download', url: 'https://unity.com/download' }
        ]
    },
    {
        title: 'Install VRoid Studio',
        one: 'Download free from vroid.pixiv.net or Steam, run installer',
        two: 'No 3D modeling needed — sliders-based anime avatar creator',
        links: [
            { label: 'VRoid Studio', url: 'https://vroid.pixiv.net/' }
        ]
    },
    {
        title: 'Create Your Avatar',
        one: 'Start from default base, use Face/Hair/Body/Outfit tabs to customize',
        two: 'Keep polygon count under VRChat limits; use Auto-Reduce if needed',
        links: [
            { label: 'VRChat Avatar Limits', url: 'https://docs.vrchat.com/docs/avatars' }
        ]
    },
    {
        title: 'Export VRM',
        one: 'Camera/Export tab > Export as VRM, fill name/author/license fields',
        two: 'Choose low-reduce level if prompted, save .vrm somewhere accessible',
        links: [
            { label: 'VRM Format', url: 'https://github.com/vrm-c/vrm-specification' }
        ]
    },
    {
        title: 'Import to Unity',
        one: 'Open project via VCC; drag .vrm into Assets folder in Unity',
        two: 'Unity imports VRM; verify model + textures appear in Assets panel',
        links: [
            { label: 'VRM Unity Support', url: 'https://github.com/pixiv/three-vrm' }
        ]
    },
    {
        title: 'Place in Scene',
        one: 'Drag avatar from Assets into Hierarchy panel; appears in scene viewport',
        two: 'Inspector > Rig tab: set Animation Type to Humanoid, click Apply',
        links: [
            { label: 'Unity Rigging', url: 'https://docs.unity3d.com/Manual/ConfiguringtheAvatar.html' }
        ]
    },
    {
        title: 'VRC Avatar Descriptor',
        one: 'Select avatar root, Add Component > search VRC Avatar Descriptor',
        two: 'Set View Position (eye-height dot) between eyes; check SDK panel for errors',
        links: [
            { label: 'VRC SDK Docs', url: 'https://docs.vrchat.com/docs/sdk-base' }
        ]
    },
    {
        title: 'Build and Upload',
        one: 'VRChat SDK > Show Control Panel (top menu); sign in to VRChat account',
        two: 'Set avatar name/description, click "Build and Publish for Windows", wait for confirmation',
        links: [
            { label: 'Publishing Avatars', url: 'https://docs.vrchat.com/docs/uploading-your-first-avatar' }
        ]
    },
    {
        title: 'Use in VRChat',
        one: 'Launch VRChat, open Avatars menu (Action Menu or desktop shortcut)',
        two: 'Find avatar under "My Avatars", click to equip, test in mirror world or home world',
        links: [
            { label: 'VRChat Guide', url: 'https://docs.vrchat.com/' }
        ]
    }
];

let activeStep = 0;

function renderTutorialNav(steps) {
    const navEl = document.getElementById('tutorial-nav');
    if (!navEl) return;

    navEl.innerHTML = '';
    steps.forEach((step, index) => {
        const btn = document.createElement('button');
        btn.className = 'tutorial-step-btn' + (index === activeStep ? ' active' : '');
        btn.textContent = `${index + 1}. ${step.title}`;
        btn.onclick = function() {
            activeStep = index;
            renderTutorialNav(steps);
            renderTutorialPanel(index);
        };
        navEl.appendChild(btn);
    });
}

function renderTutorialPanel(index) {
    const panelEl = document.getElementById('tutorial-panel');
    if (!panelEl) return;

    const step = tutorialSteps[index];
    let resourcesHtml = '';

    if (step.links && step.links.length > 0) {
        resourcesHtml = `
            <div class="tutorial-resources">
                <span class="res-label">Resources</span>
                ${step.links.map(link => `
                    <a href="${link.url}" target="_blank" class="res-link">↗ ${link.label}</a>
                `).join('')}
            </div>
        `;
    }

    panelEl.innerHTML = `
        <div class="tutorial-segment">
            <div class="segment-number">ONE</div>
            <div class="segment-content">
                ${step.one}
                ${resourcesHtml}
            </div>
        </div>
        <div class="tutorial-segment">
            <div class="segment-number">TWO</div>
            <div class="segment-content">
                ${step.two}
            </div>
        </div>
    `;
}

// ============================================
// Step 3 - Avatar Playground
// ============================================

const playgroundState = {
    currentMode: 'pose'
};

function setPlaygroundMode(mode) {
    playgroundState.currentMode = mode;
    renderPlayControls(mode);

    // Update active nav button
    const navBtns = document.querySelectorAll('.play-nav-btn');
    navBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });
}

function renderPlayControls(mode) {
    const controlsEl = document.getElementById('play-controls');
    if (!controlsEl) return;

    let html = '';

    switch(mode) {
        case 'pose':
            html = `
                <div class="play-control-group">
                    <label>Head Tilt</label>
                    <input type="range" min="-45" max="45" value="0" class="play-slider" data-bone="head" data-axis="z">
                </div>
                <div class="play-control-group">
                    <label>Arm Angle</label>
                    <input type="range" min="0" max="180" value="0" class="play-slider" data-bone="leftArm" data-axis="z">
                </div>
                <div class="play-control-group">
                    <label>Leg Spread</label>
                    <input type="range" min="0" max="90" value="0" class="play-slider" data-bone="leftLeg" data-axis="z">
                </div>
            `;
            break;
        case 'outfit':
            html = `
                <div class="play-control-group">
                    <label>Top</label>
                    <select class="play-select">
                        <option>T-Shirt</option>
                        <option>Hoodie</option>
                        <option>Jacket</option>
                    </select>
                    <p style="font-size: 11px; color: #888; margin-top: 4px;">Preview Only</p>
                </div>
                <div class="play-control-group">
                    <label>Bottom</label>
                    <select class="play-select">
                        <option>Jeans</option>
                        <option>Shorts</option>
                        <option>Skirt</option>
                    </select>
                </div>
                <div class="play-control-group">
                    <label>Shoes</label>
                    <select class="play-select">
                        <option>Sneakers</option>
                        <option>Boots</option>
                        <option>Sandals</option>
                    </select>
                </div>
                <div class="play-control-group">
                    <label>Accessories</label>
                    <select class="play-select">
                        <option>None</option>
                        <option>Hat</option>
                        <option>Glasses</option>
                    </select>
                </div>
            `;
            break;
        case 'camera':
            html = `
                <div class="play-camera-presets">
                    <button class="play-preset-btn" onclick="setCameraPreset('front')">Front</button>
                    <button class="play-preset-btn" onclick="setCameraPreset('side')">Side</button>
                    <button class="play-preset-btn" onclick="setCameraPreset('top')">Top</button>
                </div>
                <div class="play-control-group">
                    <label>FOV</label>
                    <input type="range" min="30" max="120" value="75" class="play-slider" data-control="fov">
                </div>
            `;
            break;
        case 'lighting':
            html = `
                <div class="play-control-group">
                    <label>Light Color</label>
                    <input type="color" value="#ffffff" class="play-color-input" data-control="lightColor">
                </div>
                <div class="play-control-group">
                    <label>Intensity</label>
                    <input type="range" min="0" max="100" value="80" class="play-slider" data-control="lightIntensity">
                </div>
            `;
            break;
        case 'reset':
            html = `
                <button class="play-reset-btn" onclick="confirmReset()">Reset to Default</button>
            `;
            break;
    }

    controlsEl.innerHTML = html;

    // Wire up event listeners after HTML is injected
    wirePlayControls(mode);
}

function wirePlayControls(mode) {
    if (mode === 'pose') {
        const sliders = document.querySelectorAll('.play-slider[data-bone]');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const bone = slider.getAttribute('data-bone');
                const axis = slider.getAttribute('data-axis');
                const value = (parseFloat(e.target.value) * Math.PI) / 180;
                if (window.setPoseBone) {
                    window.setPoseBone(bone, axis, value);
                }
            });
        });
    } else if (mode === 'camera') {
        const fovSlider = document.querySelector('.play-slider[data-control="fov"]');
        if (fovSlider) {
            fovSlider.addEventListener('input', (e) => {
                if (window.setCameraFOV) {
                    window.setCameraFOV(parseFloat(e.target.value));
                }
            });
        }
    } else if (mode === 'lighting') {
        const colorInput = document.querySelector('.play-color-input[data-control="lightColor"]');
        const intensitySlider = document.querySelector('.play-slider[data-control="lightIntensity"]');

        if (colorInput) {
            colorInput.addEventListener('input', (e) => {
                if (window.setLightColor) {
                    window.setLightColor(e.target.value);
                }
            });
        }

        if (intensitySlider) {
            intensitySlider.addEventListener('input', (e) => {
                if (window.setLightIntensity) {
                    window.setLightIntensity(parseFloat(e.target.value));
                }
            });
        }
    }
}

function setCameraPreset(preset) {
    if (window.setCameraAngle) {
        window.setCameraAngle(preset);
    }
}

function confirmReset() {
    if (confirm('Reset all settings to default?')) {
        if (window.resetPose) {
            window.resetPose();
        }
        console.log('Avatar reset');
        setPlaygroundMode('pose');
    }
}

function initAvatarPlayground(container, config = {}) {
    // Stub for Three.js integration
    console.log('Avatar playground initialized', config);
}

// ============================================
// Desktop-Only Overlay
// ============================================

function dismissDesktopOverlay() {
    const overlay = document.getElementById('desktop-overlay');
    if (overlay) {
        overlay.classList.add('dismissed');
    }
}

// ============================================
// Theme Toggle System
// ============================================

function applyTheme(theme) {
    document.body.classList.toggle('theme-light', theme === 'light');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains('theme-light');
    const next = isLight ? 'dark' : 'light';
    localStorage.setItem('avatar_trainer_theme', next);
    applyTheme(next);
}

// ============================================
// Initialization on DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Restore persisted theme
    const savedTheme = localStorage.getItem('avatar_trainer_theme') || 'dark';
    applyTheme(savedTheme);

    // Initialize tutorial if on Step 2
    if (document.getElementById('tutorial-nav')) {
        renderTutorialNav(tutorialSteps);
        renderTutorialPanel(0);
    }

    // Initialize playground if on Step 3
    if (document.getElementById('play-nav')) {
        setPlaygroundMode('pose');
        initAvatarPlayground(document.getElementById('play-viewport'));
    }

    // Auto-hide desktop overlay on desktop widths
    const overlay = document.getElementById('desktop-overlay');
    if (overlay && window.innerWidth >= 768) {
        overlay.style.display = 'none';
    }
});
