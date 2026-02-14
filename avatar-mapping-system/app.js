document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        currentPhase: 1,
        selections: {
            type: null,
            body: 'Athletic',
            parts: []
        }
    };

    // --- 3D ENGINE INITIALIZATION ---
    let scene, camera, renderer, avatarMesh, orbitParts = [];
    const container = document.getElementById('three-container');

    function init3D() {
        if (!container) return;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x0866FF, 1.5);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        // Base Avatar (Placeholder Mesh)
        createAvatar('Humanoid');

        animate();
    }

    function createAvatar(type) {
        if (avatarMesh) scene.remove(avatarMesh);

        let geometry;
        const material = new THREE.MeshPhongMaterial({
            color: type === 'Ethereal' ? 0x00ffff : 0x1877F2,
            wireframe: type === 'Synthetic',
            transparent: type === 'Ethereal',
            opacity: type === 'Ethereal' ? 0.6 : 1,
            shininess: 100
        });

        switch (type) {
            case 'Humanoid':
                geometry = new THREE.CapsuleGeometry(0.8, 1.5, 4, 8);
                break;
            case 'Cybernetic':
                geometry = new THREE.BoxGeometry(1.2, 2.2, 1.2);
                break;
            case 'Synthetic':
                geometry = new THREE.IcosahedronGeometry(1.2, 1);
                break;
            case 'Ethereal':
                geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
                break;
            default:
                geometry = new THREE.SphereGeometry(1, 32, 32);
        }

        avatarMesh = new THREE.Mesh(geometry, material);
        scene.add(avatarMesh);
        update3DScale();
    }

    function update3DScale() {
        if (!avatarMesh) return;
        const scales = {
            'Slim': 0.7,
            'Athletic': 1.0,
            'Heavy': 1.4,
            'Augmented': 1.2
        };
        const s = scales[state.selections.body] || 1;
        avatarMesh.scale.set(s, s, s);
    }

    function updateParts() {
        orbitParts.forEach(p => scene.remove(p));
        orbitParts = [];

        state.selections.parts.forEach((part, index) => {
            const geom = new THREE.OctahedronGeometry(0.2);
            const mat = new THREE.MeshPhongMaterial({ color: 0xF3425F, emissive: 0xF3425F, emissiveIntensity: 0.5 });
            const p = new THREE.Mesh(geom, mat);
            scene.add(p);
            orbitParts.push(p);
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        if (avatarMesh) {
            avatarMesh.rotation.y += 0.01;
        }

        orbitParts.forEach((p, i) => {
            const time = Date.now() * 0.002;
            const angle = (i / orbitParts.length) * Math.PI * 2 + time;
            p.position.x = Math.cos(angle) * 2;
            p.position.z = Math.sin(angle) * 2;
            p.position.y = Math.sin(time + i) * 0.5;
            p.rotation.x += 0.05;
            p.rotation.y += 0.05;
        });

        renderer.render(scene, camera);
    }

    // --- UI LOGIC ---
    const phaseCards = {
        1: document.getElementById('phase-1'),
        2: document.getElementById('phase-2'),
        3: document.getElementById('phase-3'),
        4: document.getElementById('phase-4')
    };

    const sidebarItems = document.querySelectorAll('.nav-item');
    const summaryType = document.getElementById('summary-type');
    const summaryDetails = document.getElementById('summary-details');

    init3D();

    // Phase 1 Archetype Selection
    const typeCards = document.querySelectorAll('#phase-1 .option-card');
    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selections.type = card.dataset.type;
            createAvatar(state.selections.type);
            updateSummary();
        });
    });

    function updateSummary() {
        if (summaryType) summaryType.textContent = state.selections.type || 'None Selected';
        if (summaryDetails) summaryDetails.textContent = state.selections.body || '-';
    }

    function switchPhase(newPhase) {
        if (newPhase < 1 || newPhase > 4) return;

        // Validation for moving forward
        if (newPhase > state.currentPhase) {
            if (state.currentPhase === 1 && !state.selections.type) {
                alert('Please select an archetype first.');
                return;
            }
        }

        // Hide current
        phaseCards[state.currentPhase].classList.add('hidden');
        sidebarItems[state.currentPhase - 1].classList.remove('active');

        // Show new
        state.currentPhase = newPhase;
        phaseCards[state.currentPhase].classList.remove('hidden');
        sidebarItems[state.currentPhase - 1].classList.add('active');

        // Load content
        if (state.currentPhase === 2) loadPhase2();
        if (state.currentPhase === 3) loadPhase3();
        if (state.currentPhase === 4) loadPhase4();

        // Scroll to top of feed
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Global navigation for sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetStep = parseInt(item.dataset.step);
            if (targetStep <= state.currentPhase || (targetStep === state.currentPhase + 1 && state.selections.type)) {
                switchPhase(targetStep);
            }
        });
    });

    // Handle buttons within cards
    document.querySelectorAll('.btn-next, #next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.currentPhase === 4) {
                alert('Configuration Exported to Cloud.');
            } else {
                switchPhase(state.currentPhase + 1);
            }
        });
    });

    document.querySelectorAll('.btn-back, #prev-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPhase(state.currentPhase - 1));
    });

    function loadPhase2() {
        const grid = document.querySelector('#phase-2 .grid-options');
        grid.innerHTML = '';
        const options = ['Slim', 'Athletic', 'Heavy', 'Augmented'];

        options.forEach(opt => {
            const card = document.createElement('div');
            card.className = 'option-card';
            if (state.selections.body === opt) card.classList.add('selected');
            card.innerHTML = `<h3>${opt}</h3><p style="font-size: 0.75rem; color: var(--secondary-text);">Proportion Spec.</p>`;
            card.addEventListener('click', () => {
                document.querySelectorAll('#phase-2 .option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                state.selections.body = opt;
                update3DScale();
                updateSummary();
            });
            grid.appendChild(card);
        });
    }

    function loadPhase3() {
        const grid = document.querySelector('#phase-3 .grid-options');
        grid.innerHTML = '';
        const options = ['Optical Units', 'Weapon Systems', 'Propulsion', 'Stealth Plating'];

        options.forEach(opt => {
            const card = document.createElement('div');
            card.className = 'option-card';
            if (state.selections.parts.includes(opt)) card.classList.add('selected');
            card.innerHTML = `<h3>${opt}</h3><p style="font-size: 0.75rem; color: var(--secondary-text);">Active Module</p>`;
            card.addEventListener('click', () => {
                if (state.selections.parts.includes(opt)) {
                    state.selections.parts = state.selections.parts.filter(p => p !== opt);
                    card.classList.remove('selected');
                } else {
                    state.selections.parts.push(opt);
                    card.classList.add('selected');
                }
                updateParts();
                updateSummary();
            });
            grid.appendChild(card);
        });
    }

    function loadPhase4() {
        const result = document.getElementById('render-result');
        const partsList = state.selections.parts.join(', ') || 'None';
        result.innerHTML = `
            <div class="render-summary">
                <div class="summary-item"><span class="summary-label">Archetype</span><span class="summary-value">${state.selections.type}</span></div>
                <div class="summary-item"><span class="summary-label">Body Scale</span><span class="summary-value">${state.selections.body}</span></div>
                <div class="summary-item"><span class="summary-label">Active Modules</span><span class="summary-value">${partsList}</span></div>
            </div>
        `;
    }

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

