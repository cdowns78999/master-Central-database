# VRM Viewer Technology Stack — Avatar Trainer Step 3

## Overview
Live 3D avatar viewer powered by **Three.js** + **@pixiv/three-vrm**, no build tools required. Uses ES module importmap for clean CDN-only setup.

---

## 1. Core Library: @pixiv/three-vrm v3
- **Official VRM loader** for Three.js developed by Pixiv
- Loads `.vrm` files (VRM 0.0 and 1.0 compatible)
- Exposes VRM humanoid bone structure for posing
- Handles mesh visibility for outfit switching
- **CDN URL**: `https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js`

---

## 2. Three.js 0.180.0
- **3D graphics engine** for WebGL rendering
- Canvas-based, GPU-accelerated 3D scene
- **Module CDN**: `https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js`
- **OrbitControls addon**: `https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/addons/controls/OrbitControls.js`
- **GLTFLoader addon**: `https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/addons/loaders/GLTFLoader.js`

---

## 3. Sample Avatar (CC0 License)
- **AvatarSample_B.vrm** from ChatVRM-js GitHub
- **URL**: `https://raw.githubusercontent.com/josephrocca/ChatVRM-js/main/avatars/AvatarSample_B.vrm`
- Free to use for testing and demos
- No download required — loaded on-demand via fetch

---

## 4. Setup Pattern: Import Map + Module Script

### Import Map (in `<head>`)
```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
    "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js"
  }
}
</script>
```

### Module Script (after DOM elements)
```html
<script type="module" src="vrm-viewer.js"></script>
```

**Why this approach?**
- No npm install or build step
- Works in any browser with ES module support
- Alias-based import paths (`three/addons/` → jsDelivr URLs)
- No webpack/bundler overhead

---

## 5. Humanoid Bone Access for Pose Control

The loaded VRM exposes a `humanoid` object with named bone nodes:

```js
const bone = vrm.humanoid.getNormalizedBoneNode('head');
if (bone) {
  bone.rotation.z = radians; // Tilt head
  bone.rotation.x = radians; // Nod
  bone.rotation.y = radians; // Turn
}
```

**Common bone names** (runtime inspection via `vrm.scene.traverse()`):
- `head`, `neck`
- `leftShoulder`, `leftArm`, `leftForeArm`, `leftHand`
- `rightShoulder`, `rightArm`, `rightForeArm`, `rightHand`
- `spine`, `chest`
- `leftHip`, `leftLeg`, `leftFoot`
- `rightHip`, `rightLeg`, `rightFoot`

---

## 6. Mesh Visibility for Outfit Switching

Access scene mesh nodes and toggle visibility:

```js
vrm.scene.traverse(obj => {
  if (obj.isMesh) {
    console.log(obj.name); // Log all mesh names
    obj.visible = false; // Hide by name match
  }
});
```

**Runtime workflow:**
1. On VRM load, log all mesh names to browser console
2. Define outfit configs with exact mesh names
3. Toggle `mesh.visible` per outfit preset

**Example** (after inspecting sample avatar):
```js
const OUTFITS = {
  default: { show: ['Body', 'Hair', 'Skirt'] },
  formal:  { show: ['Body', 'Hair', 'Jacket', 'Pants'] }
};
```

---

## 7. Camera Control: OrbitControls + Presets

**OrbitControls** provides mouse drag rotation:
- Left-click + drag → rotate around target
- Scroll → zoom in/out
- Middle-click + drag → pan

**Preset positions** (camera lookups):
```js
// Front view
camera.position.set(0, 1.3, 3);
controls.target.set(0, 1.0, 0);

// Side view
camera.position.set(3, 1.3, 0);
controls.target.set(0, 1.0, 0);

// Top-down view
camera.position.set(0, 4, 1);
controls.target.set(0, 1.0, 0);

controls.update(); // Re-calculate camera matrix
```

**Field of View (FOV)** adjustment:
```js
camera.fov = 30; // Wider (more zoom)
camera.fov = 120; // Tighter (less zoom)
camera.updateProjectionMatrix();
```

---

## 8. Lighting Control

**DirectionalLight** for main fill:
```js
const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(1, 1, 1);
scene.add(light);

// Update color (hex value)
light.color.set(0xff69b4); // Pink

// Update intensity (0–2 typical range)
light.intensity = 0.8;
```

**AmbientLight** for secondary fill (prevents completely dark shadows):
```js
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
```

---

## 9. Animation Loop

Three.js uses `renderer.setAnimationLoop()` for continuous rendering:

```js
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta(); // Time since last frame (seconds)
  controls.update(); // Update mouse drag state
  if (vrm) vrm.update(delta); // Update VRM animations & bone rotations
  renderer.render(scene, camera); // Draw to canvas
});
```

**Key calls:**
- `vrm.update(delta)` — applies pose changes and animations
- `renderer.render()` — draws one frame to canvas

---

## 10. Canvas Sizing & Responsive

```js
function onResize() {
  const container = document.getElementById('play-viewport');
  const w = container.clientWidth;
  const h = container.clientHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize);
```

**CSS for canvas element:**
```css
#play-viewport canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
```

---

## Summary: Key Integrations

| Feature | Method |
|---------|--------|
| **Load VRM** | `GLTFLoader` + `VRMLoaderPlugin` |
| **Pose bones** | `vrm.humanoid.getNormalizedBoneNode(name)` |
| **Outfit switch** | `obj.visible` toggle by mesh name |
| **Camera angles** | `camera.position` + `controls.target` |
| **Zoom** | `camera.fov` adjustment |
| **Light color** | `light.color.set(hex)` |
| **Light strength** | `light.intensity` value |
| **Frame sync** | `renderer.setAnimationLoop()` + `clock.getDelta()` |

---

## Testing Checklist

- [ ] Canvas renders inside `#play-viewport`
- [ ] Avatar sample loads and displays
- [ ] Mouse drag (OrbitControls) spins avatar
- [ ] Camera presets (Front/Side/Top) reposition view
- [ ] FOV slider zooms in/out
- [ ] Light color picker updates scene brightness/tone
- [ ] Intensity slider dims/brightens main light
- [ ] Pose sliders move individual bones (head, arms, legs)
- [ ] Responsive: canvas resizes on window resize
- [ ] Console logs mesh names for outfit configuration

---

## References

- VRM Spec: https://github.com/vrm-c/vrm-specification
- Three.js Docs: https://threejs.org/docs/
- @pixiv/three-vrm: https://github.com/pixiv/three-vrm
- ChatVRM-js (sample avatar source): https://github.com/josephrocca/ChatVRM-js
