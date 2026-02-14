// vrm-viewer.js — ES module for Three.js + VRM avatar viewer
// Imports via importmap: three, three/addons/*, @pixiv/three-vrm

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

const SAMPLE_VRM_URL = 'https://raw.githubusercontent.com/josephrocca/ChatVRM-js/main/avatars/AvatarSample_B.vrm';

let renderer, camera, scene, controls, currentVRM, clock, light;

export function initVRMViewer() {
    const canvas = document.getElementById('vrm-canvas');
    const container = document.getElementById('play-viewport');

    if (!canvas || !container) {
        console.error('Canvas or container not found');
        return;
    }

    // Initialize clock for animation delta time
    clock = new THREE.Clock();

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0.1);

    // Setup scene
    scene = new THREE.Scene();

    // Setup camera
    camera = new THREE.PerspectiveCamera(
        30,
        container.clientWidth / container.clientHeight,
        0.1,
        20
    );
    camera.position.set(0, 1.3, 3);

    // Setup lighting
    light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Setup OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();

    // Load sample VRM
    loadVRM(SAMPLE_VRM_URL);

    // Hide loading spinner when VRM loads (handled by CSS on .loaded class)
    setTimeout(() => {
        const loadingDiv = document.querySelector('.vrm-loading');
        if (loadingDiv && currentVRM) {
            loadingDiv.classList.add('loaded');
        }
    }, 2000);

    // Animation loop
    renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        controls.update();
        if (currentVRM) {
            currentVRM.update(delta);
        }
        renderer.render(scene, camera);
    });

    // Handle window resize
    window.addEventListener('resize', onResize);

    console.log('VRM Viewer initialized');
}

function loadVRM(url) {
    const loader = new GLTFLoader();
    loader.register(parser => new VRMLoaderPlugin(parser));

    loader.load(
        url,
        (gltf) => {
            if (currentVRM) {
                scene.remove(currentVRM.scene);
                VRMUtils.deepDispose(currentVRM.scene);
            }

            const vrm = gltf.userData.vrm;

            // Optimize geometry
            VRMUtils.removeUnnecessaryVertices(gltf.scene);
            VRMUtils.combineSkeletons(gltf.scene);

            scene.add(vrm.scene);
            currentVRM = vrm;

            // Face camera (rotate 180°)
            vrm.scene.rotation.y = Math.PI;

            // Log mesh names for outfit configuration
            console.log('VRM loaded. Mesh names:');
            vrm.scene.traverse(obj => {
                if (obj.isMesh) {
                    console.log(`  - ${obj.name}`);
                }
            });

            // Expose for external control (script.js)
            window.vrmInstance = vrm;

            // Mark as loaded for CSS
            const loadingDiv = document.querySelector('.vrm-loading');
            if (loadingDiv) {
                loadingDiv.classList.add('loaded');
            }

            console.log('VRM ready for interaction');
        },
        undefined,
        (err) => {
            console.error('VRM load error:', err);
            const loadingDiv = document.querySelector('.vrm-loading');
            if (loadingDiv) {
                loadingDiv.textContent = 'Failed to load avatar';
                loadingDiv.classList.add('error');
            }
        }
    );
}

/**
 * Set bone rotation for pose control
 * @param {string} boneName - VRM humanoid bone name (e.g., 'head', 'leftArm')
 * @param {string} axis - 'x', 'y', or 'z'
 * @param {number} radians - Rotation value in radians
 */
export function setPoseBone(boneName, axis, radians) {
    if (!currentVRM) return;

    try {
        const bone = currentVRM.humanoid.getNormalizedBoneNode(boneName);
        if (bone) {
            bone.rotation[axis] = radians;
        }
    } catch (e) {
        console.warn(`Bone ${boneName} not found:`, e);
    }
}

/**
 * Set camera angle to preset position
 * @param {string} preset - 'front', 'side', or 'top'
 */
export function setCameraAngle(preset) {
    if (!controls || !camera) return;

    switch (preset) {
        case 'front':
            camera.position.set(0, 1.3, 3);
            controls.target.set(0, 1.0, 0);
            break;
        case 'side':
            camera.position.set(3, 1.3, 0);
            controls.target.set(0, 1.0, 0);
            break;
        case 'top':
            camera.position.set(0, 4, 1);
            controls.target.set(0, 1.0, 0);
            break;
    }

    controls.update();
}

/**
 * Set light color
 * @param {string} hexColor - Hex color (e.g., '#ff69b4')
 */
export function setLightColor(hexColor) {
    if (light) {
        try {
            light.color.set(hexColor);
        } catch (e) {
            console.warn('Invalid color:', hexColor);
        }
    }
}

/**
 * Set light intensity
 * @param {number} value - Intensity 0-100 (maps to 0-2.0 for Three.js)
 */
export function setLightIntensity(value) {
    if (light) {
        light.intensity = (value / 100) * 2.0;
    }
}

/**
 * Set camera field of view
 * @param {number} fov - Field of view angle (30-120)
 */
export function setCameraFOV(fov) {
    if (camera) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
    }
}

/**
 * Reset all pose bones to default
 */
export function resetPose() {
    if (!currentVRM) return;

    try {
        const bones = [
            'head', 'neck',
            'leftShoulder', 'leftArm', 'leftForeArm',
            'rightShoulder', 'rightArm', 'rightForeArm',
            'spine', 'chest',
            'leftHip', 'leftLeg',
            'rightHip', 'rightLeg'
        ];

        bones.forEach(boneName => {
            const bone = currentVRM.humanoid.getNormalizedBoneNode(boneName);
            if (bone) {
                bone.rotation.set(0, 0, 0);
            }
        });
    } catch (e) {
        console.warn('Reset pose error:', e);
    }
}

/**
 * Handle window resize event
 */
function onResize() {
    const container = document.getElementById('play-viewport');
    if (!container || !renderer || !camera) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

/**
 * Expose functions on window for script.js access
 */
window.setPoseBone = setPoseBone;
window.setCameraAngle = setCameraAngle;
window.setLightColor = setLightColor;
window.setLightIntensity = setLightIntensity;
window.setCameraFOV = setCameraFOV;
window.resetPose = resetPose;

/**
 * Auto-initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVRMViewer);
} else {
    // DOM already loaded
    initVRMViewer();
}
