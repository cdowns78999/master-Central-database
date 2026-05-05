# VRChat Avatar Creation Tools — Web Emulator Research
## 10 Deep Research Domains | Compiled 2026-03-21

---

# Research 1: Three.js 3D Editor / Blender-in-Browser Solutions

## Goal
Find existing web-based 3D editors that emulate Blender-like functionality for modeling, sculpting, and mesh manipulation.

## Best Existing Libraries & Tools

### 1. Three.js Built-in Editor
- **URL:** https://threejs.org/editor/
- **Source:** https://github.com/mrdoob/three.js/tree/dev/editor
- **Maturity:** Production-ready
- **Integration:** Easy — it IS Three.js
- **Client-side:** Fully client-side
- **Details:** Official Three.js editor with scene graph, material editing, geometry creation, import/export (glTF, OBJ, FBX, STL). Open source, forkable, extensible. Supports transform controls, orbit camera, and full scene manipulation. This is the strongest starting point for our project.

### 2. Clara.io
- **URL:** https://clara.io/
- **Maturity:** Production-ready (commercial)
- **Integration:** Hard (proprietary, cloud-based)
- **Client-side:** No — server-dependent
- **Details:** Full Maya/Max-class web modeling tool. Supports 30+ file formats including FBX, Collada, STL, OBJ, glTF. Powerful but closed-source and not embeddable. Useful as UX reference only.

### 3. ThreeGN (Geometry Nodes for Web)
- **URL:** https://threegn.app/
- **Maturity:** Experimental
- **Integration:** Medium
- **Client-side:** Yes
- **Details:** Port of Blender's Geometry Nodes system to Three.js. Procedural modeling in browser. Could be used for parametric avatar part generation.

### 4. ShadowEditor
- **URL:** https://github.com/tengge1/ShadowEditor
- **Maturity:** Beta
- **Integration:** Medium — requires Go/MongoDB backend
- **Client-side:** Partial (needs server for persistence)
- **Details:** Full 3D scene editor with Three.js. Supports lights, materials, animation timeline, scene import/export. Cross-platform.

### 5. Spline
- **URL:** https://spline.design/
- **Maturity:** Production-ready (commercial)
- **Integration:** Hard (proprietary)
- **Client-side:** No
- **Details:** Polished web 3D editor with real-time collaboration. Not open source but excellent UX reference for what's possible in-browser.

### 6. Threepipe
- **URL:** https://github.com/repalash/threepipe
- **Maturity:** Beta
- **Integration:** Medium
- **Client-side:** Yes
- **Details:** Next-gen toolkit for web 3D. Editor for creating/editing/configuring/exporting 3D scenes. Automatic resource disposal, post-processing, plugin system.

## Recommended Approach
Fork the **official Three.js editor** as the foundation. It gives us scene manipulation, transform controls, material editing, and glTF import/export out of the box. Layer our VRChat-specific features on top: VRM import, bone visualization, expression editing, component-based part swapping.

```javascript
// Three.js editor is importable — key entry point:
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
```

---

# Research 2: VRM Web Viewers and Editors

## Goal
Find libraries for loading, rendering, and editing VRM avatar models in browser.

## Best Existing Libraries & Tools

### 1. @pixiv/three-vrm (PRIMARY RECOMMENDATION)
- **URL:** https://github.com/pixiv/three-vrm
- **NPM:** `@pixiv/three-vrm`
- **Version:** 3.5.1
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Fully client-side
- **Stars:** 1.8K+ | Dependents: 1.1K+
- **Details:** The definitive VRM library for Three.js. Monorepo with modular packages:
  - `@pixiv/three-vrm` — Main package, VRM loading + rendering
  - `@pixiv/three-vrm-springbone` — Spring bone physics (hair/cloth simulation)
  - `@pixiv/three-vrm-materials-mtoon` — MToon toon shader
  - `@pixiv/three-vrm-node-constraint` — Bone constraints
  - Supports WebGL AND WebGPU rendering
  - Full expression/blendshape control
  - LookAt (eye tracking) system
  - Humanoid bone mapping

```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

loader.load('/avatar.vrm', (gltf) => {
  const vrm = gltf.userData.vrm;
  VRMUtils.removeUnnecessaryVertices(gltf.scene);
  VRMUtils.removeUnnecessaryJoints(gltf.scene);
  scene.add(vrm.scene);

  // Access expressions
  vrm.expressionManager.setValue('happy', 1.0);

  // Access humanoid bones
  const head = vrm.humanoid.getNormalizedBoneNode('head');

  // Update physics each frame
  const clock = new THREE.Clock();
  function animate() {
    const delta = Math.min(clock.getDelta(), 0.05); // Clamp to prevent explosion
    vrm.update(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
});
```

### 2. VRM Specification (for custom editing)
- **URL:** https://github.com/vrm-c/vrm-specification
- **Details:** VRM 1.0 spec defines editable parameters:
  - **Expressions (formerly BlendShapes):** Neutral, A, I, U, E, O, Blink, Joy, Angry, Sorrow, Fun, LookUp/Down/Left/Right, Blink_L/R
  - **Materials:** MToon shader properties (color, shade, rim, outline)
  - **Spring Bones:** Stiffness, gravity, drag, collision
  - **Humanoid:** Standard bone mapping (55 bones defined)
  - **Meta:** Author, license, usage permissions
  - **LookAt:** Eye gaze parameters
  - VRM is glTF 2.0 with extensions — everything is JSON-editable

### 3. VRoid Studio (Desktop Reference)
- **URL:** https://vroid.com/en/studio
- **Maturity:** Production-ready
- **Client-side:** Desktop app (not web)
- **Details:** Free avatar creation tool by pixiv. Slider-based face/body/hair editing. Exports VRM. Our web tool should emulate this workflow.

## VRM Editable Parameters (Browser-Accessible)
Since VRM is glTF + JSON extensions, ALL of these can be edited client-side:
- Expression weights and bindings
- Material colors, textures, shader parameters
- Spring bone physics settings
- Bone transforms and constraints
- Meta information (author, permissions)
- LookAt settings
- First-person rendering layers

## Recommended Approach
Use **@pixiv/three-vrm** as the core VRM engine. Build a parameter editor UI that reads/writes VRM extension data directly. For expression editing, create sliders that map to `vrm.expressionManager.setValue()`. For material editing, access `vrm.materials` and modify MToon properties.

---

# Research 3: glTF/glb Web Manipulation Libraries

## Goal
Find libraries for loading, editing, combining, and exporting glTF/glb models in browser.

## Best Existing Libraries & Tools

### 1. glTF-Transform (PRIMARY RECOMMENDATION)
- **URL:** https://gltf-transform.dev/
- **GitHub:** https://github.com/donmccurdy/glTF-Transform
- **NPM:** `@gltf-transform/core`
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes (WebIO for browser)
- **License:** MIT
- **Details:** The gold standard for glTF manipulation. 27+ transformation functions:
  - **Geometry:** weld, unweld, simplify, reorder, quantize, dequantize
  - **Compression:** Draco, Meshoptimizer, WebP, KTX2
  - **Organization:** join (mesh merging), flatten, partition, instance, dedup
  - **Animation:** resample keyframes
  - **Materials:** 22 Khronos extensions, 4 vendor extensions
  - Works on both Node.js and browser via WebIO

```javascript
import { WebIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { join, weld, simplify, dedup } from '@gltf-transform/functions';

const io = new WebIO().registerExtensions(ALL_EXTENSIONS);

// Load a model in browser
const document = await io.read('avatar.glb');

// Merge meshes
await document.transform(join());

// Simplify geometry
await document.transform(simplify({ ratio: 0.5 }));

// Remove duplicates
await document.transform(dedup());

// Export as GLB binary
const glb = await io.writeBinary(document);

// Trigger download
const blob = new Blob([glb], { type: 'model/gltf-binary' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'avatar.glb';
a.click();
```

### 2. Three.js GLTFExporter
- **URL:** https://threejs.org/docs/#examples/en/exporters/GLTFExporter
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes
- **Details:** Built into Three.js addons. Exports scenes to glTF/GLB format. Handles meshes, materials, textures, animations, skinned meshes.

```javascript
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const exporter = new GLTFExporter();
exporter.parse(scene, (result) => {
  // result is ArrayBuffer for binary (.glb)
  const blob = new Blob([result], { type: 'application/octet-stream' });
  saveAs(blob, 'avatar.glb');
}, (error) => console.error(error), { binary: true });
```

### 3. glTF-js-utils
- **URL:** https://github.com/wnayes/glTF-js-utils
- **Maturity:** Beta
- **Integration:** Medium
- **Client-side:** Yes
- **Details:** Programmatic glTF creation. Good for generating models from scratch.

### 4. loaders.gl (by Uber/vis.gl)
- **URL:** https://loaders.gl/
- **Maturity:** Production-ready
- **Integration:** Medium
- **Client-side:** Yes
- **Details:** Framework-agnostic loader suite. postProcessGLTF() for traversal/manipulation. GLTFScenegraph for API access.

### 5. meshoptimizer / gltfpack
- **URL:** https://meshoptimizer.org/
- **NPM:** `meshoptimizer`
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes (WASM)
- **Details:** Mesh compression and simplification. WASM module works in browser. Supports EXT_meshopt_compression for glTF. Simplification at ~20M triangles/sec.

## Recommended Approach
Use **glTF-Transform** for all model manipulation (merging parts, editing materials, simplification). Use **Three.js GLTFExporter** for scene-to-file export. Use **meshoptimizer** WASM for runtime mesh simplification when needed.

---

# Research 4: Web-Based Rigging Solutions

## Goal
Find browser-based rigging tools, auto-rigging APIs, and skeleton assignment solutions.

## Best Existing Libraries & Tools

### 1. Mixamo (Web-Based Auto-Rigging)
- **URL:** https://www.mixamo.com/
- **Maturity:** Production-ready
- **Integration:** Medium (requires Adobe account, server-side processing)
- **Client-side:** No — cloud API
- **Details:** Upload mesh, auto-rig with humanoid skeleton, download rigged FBX/glTF. Industry standard for years. Free with Adobe account. Limitation: requires server-side processing, not embeddable.

### 2. UniRig (SIGGRAPH 2025 — AI Auto-Rigging)
- **URL:** https://github.com/VAST-AI-Research/UniRig
- **Maturity:** Experimental/Research
- **Integration:** Hard (requires GPU server)
- **Client-side:** NO — requires CUDA GPU, Python 3.11, 8GB+ VRAM
- **Details:** State-of-the-art AI rigging. GPT-like transformer for skeleton prediction + Bone-Point Cross Attention for skinning weights. 215% improvement over prior methods. Supports .obj, .fbx, .glb, .vrm input. Outputs rigged models. Could be deployed as a backend API for our web app.

### 3. AccuRIG 2
- **URL:** https://actorcore.reallusion.com/auto-rig
- **Maturity:** Production-ready
- **Integration:** Hard (desktop app)
- **Client-side:** No — desktop only
- **Details:** Free auto-rigging tool. Analyzes geometry without manual marker placement. Deep integration with Reallusion's motion library. Not web-based but could inform our UX.

### 4. Three.js Skeleton/Bone System (DIY)
- **URL:** https://threejs.org/docs/#api/en/objects/Skeleton
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes
- **Details:** Three.js has full skeleton/bone/skinned-mesh support. Can create skeletons programmatically, assign skin weights, visualize bones. For VRChat avatars, we'd use a standard humanoid skeleton template.

```javascript
import * as THREE from 'three';

// Create bones programmatically
const bones = [];
const rootBone = new THREE.Bone();
rootBone.position.y = 0;
bones.push(rootBone);

const spineBone = new THREE.Bone();
spineBone.position.y = 1;
rootBone.add(spineBone);
bones.push(spineBone);

// Create skeleton
const skeleton = new THREE.Skeleton(bones);

// Create skinned mesh
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8, 4);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.SkinnedMesh(geometry, material);

// Assign skin weights (4 bones per vertex max)
const skinIndices = new Float32Array(geometry.attributes.position.count * 4);
const skinWeights = new Float32Array(geometry.attributes.position.count * 4);
// ... assign per-vertex weights
geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

mesh.add(rootBone);
mesh.bind(skeleton);
```

### 5. Wiggle Bones (Three.js)
- **URL:** https://wiggle.three.tools/
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes
- **Details:** Makes rigged objects move softly with spring physics. Good for secondary motion (hair, tails, accessories).

### 6. Tripo AI Auto-Rigging
- **URL:** https://www.tripo3d.ai/
- **Maturity:** Production-ready (commercial API)
- **Integration:** Medium (API-based)
- **Client-side:** No — cloud service
- **Details:** One-click AI rigging for production-ready characters. Could be integrated as an API call from our web app.

### 7. Krikey AI
- **URL:** https://www.krikey.ai/
- **Maturity:** Production-ready (commercial)
- **Integration:** Medium
- **Client-side:** No — cloud service
- **Details:** Custom character upload, auto-rigging, AI animation, lip sync.

## Recommended Approach
For our project, **pre-rigged components** are the smartest path. Since VRChat avatars follow a standard humanoid skeleton:
1. Store avatar parts (heads, bodies, arms, legs) as pre-rigged glTF files with matching bone names
2. Use **Three.js Skeleton system** to combine them at runtime
3. For custom mesh rigging, offer **Mixamo integration** (upload to Mixamo API, get rigged model back)
4. Optionally deploy **UniRig** as a backend API for AI auto-rigging of custom uploads

---

# Research 5: Web-Based Avatar Customization Systems

## Goal
Find existing avatar customizer web apps with component-based systems, slider editors, and clothing systems.

## Best Existing Libraries & Tools

### 1. Ready Player Me (Sunsetting Jan 2026)
- **URL:** https://readyplayer.me/
- **Maturity:** Was production-ready — SUNSETTING Jan 31, 2026
- **Integration:** N/A (shutting down)
- **Client-side:** Hybrid (web iframe + cloud processing)
- **Details:** Was the standard for web avatar creation. Slider-based customization, clothing system, cross-platform export (glTF/VRM). Their shutdown creates a market opportunity. Key critique: "similar-looking facial structures, limited clothing variety, lack of nuanced controls."

### 2. Avatar SDK / MetaPerson
- **URL:** https://avatarsdk.com/ | https://metaperson.avatarsdk.com/
- **GitHub:** https://github.com/avatarsdk/samples-js
- **Maturity:** Production-ready
- **Integration:** Medium (requires API key, server-side auth)
- **Client-side:** Hybrid (JS frontend + cloud processing)
- **Details:** Photo-to-avatar AI generation. Configurable styles from cartoon to photorealistic. JavaScript SDK with OAuth 2.0 auth. MetaPerson Creator offers web-based customization iframe. Drop-in Ready Player Me replacement.

```javascript
// Avatar SDK JavaScript wrapper pattern
const avatarSdk = new AvatarSDK({ clientId: 'xxx', clientSecret: 'xxx' });
const avatar = await avatarSdk.createAvatar(photoBlob, {
  style: 'cartoon',
  exportFormat: 'glb'
});
const modelUrl = await avatarSdk.getAvatarUrl(avatar.id);
```

### 3. VRoid Studio (Desktop — UX Reference)
- **URL:** https://vroid.com/en/studio
- **Maturity:** Production-ready
- **Integration:** Desktop only (not embeddable)
- **Client-side:** Desktop app
- **Details:** The gold standard for VRM avatar creation. Slider-based face morphing, body proportions, hair design, clothing editor. Free. Exports VRM. This is what our web tool should emulate.

### 4. Genies
- **URL:** https://genies.com/
- **Maturity:** Production-ready (commercial)
- **Integration:** Hard (proprietary ecosystem)
- **Client-side:** No
- **Details:** Full avatar ecosystem with fashion, props, experiences. Not open/embeddable.

### 5. Meta Avatars
- **URL:** Meta's internal system
- **Maturity:** Production-ready
- **Integration:** Not available (Meta-only)
- **Details:** Advanced parametric controls: jawlines, cheek fullness, facial depth, shoulder/hip/bicep sizing. Great UX reference for slider design.

### 6. Component-Based Avatar Systems (DIY Pattern)
The standard architecture for web avatar customizers:

```
┌─────────────────────────────────────┐
│         Avatar Customizer           │
├─────────────────────────────────────┤
│  Category Tabs:                     │
│  [Head] [Body] [Hair] [Clothes]     │
├─────────────────────────────────────┤
│  Component Grid:                    │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│  │ A │ │ B │ │ C │ │ D │  ← swap  │
│  └───┘ └───┘ └───┘ └───┘          │
├─────────────────────────────────────┤
│  Sliders:                           │
│  Eye Size    ████████░░  0.8        │
│  Nose Width  ████░░░░░░  0.4        │
│  Jaw Shape   ██████░░░░  0.6        │
├─────────────────────────────────────┤
│  Color Pickers:                     │
│  Skin: [■] Hair: [■] Eyes: [■]     │
├─────────────────────────────────────┤
│  3D Preview (Three.js viewport)     │
│  ┌───────────────────────────┐      │
│  │    Rotate / Zoom / Pan    │      │
│  │      [Avatar Model]       │      │
│  └───────────────────────────┘      │
├─────────────────────────────────────┤
│  [Export VRM]  [Export GLB]  [Save]  │
└─────────────────────────────────────┘
```

## Recommended Approach
Build a **component-based system** inspired by VRoid Studio's UX:
1. Pre-made avatar parts stored as glTF components (heads, bodies, hair, clothes)
2. Each component has morph targets for slider-based customization
3. Color pickers modify material properties in real-time
4. Three.js viewport with orbit controls for preview
5. Export via GLTFExporter (for glb) or custom VRM writer (for VRM)

---

# Research 6: WebGL Performance Optimization for High-Poly Models

## Goal
Find techniques for handling VRChat-level models (70K+ triangles) in browser.

## Key Techniques & Tools

### 1. Level of Detail (LOD)
- **Three.js Built-in:** `THREE.LOD` class
- **React Three Fiber:** Drei's `<Detailed />` component
- **Maturity:** Production-ready
- **Impact:** 30-40% FPS improvement in complex scenes

```javascript
import * as THREE from 'three';

const lod = new THREE.LOD();
lod.addLevel(highPolyMesh, 0);    // Full detail at distance 0
lod.addLevel(medPolyMesh, 50);    // Medium detail at distance 50
lod.addLevel(lowPolyMesh, 100);   // Low detail at distance 100
scene.add(lod);
```

### 2. Meshoptimizer (WASM)
- **URL:** https://meshoptimizer.org/
- **NPM:** `meshoptimizer`
- **Maturity:** Production-ready
- **Client-side:** Yes (WASM)
- **Details:** Runtime mesh simplification at ~20M triangles/sec. `meshopt_simplifySloppy` for fast decimation. Works directly on Three.js BufferGeometry index buffers.

```javascript
import { MeshoptSimplifier } from 'meshoptimizer';

await MeshoptSimplifier.ready;

const [newIndices, error] = MeshoptSimplifier.simplify(
  indices,
  positions,
  3, // vertex stride
  targetIndexCount,
  targetError
);
geometry.setIndex(new THREE.BufferAttribute(newIndices, 1));
```

### 3. Instanced Rendering
- **Three.js:** `THREE.InstancedMesh`
- **Maturity:** Production-ready
- **Details:** Render thousands of identical objects in a single draw call. Useful for particle effects, repeated decorations.

```javascript
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
  matrix.setPosition(x, y, z);
  instancedMesh.setMatrixAt(i, matrix);
}
```

### 4. Draw Call Reduction
- Merge meshes sharing materials using `BufferGeometryUtils.mergeGeometries()`
- Use texture atlases to reduce material count
- Batch similar objects

### 5. WebAssembly Mesh Processing
- **Emscripten:** Compile C/C++ mesh algorithms to WASM
- **Details:** Near-native performance for mesh operations. WebAssembly's stack-based VM compiles to machine code. Useful for heavy operations: decimation, Boolean operations, UV unwrapping.

### 6. Texture Optimization
- Use compressed textures (KTX2, Basis Universal)
- Resize textures to power-of-2 dimensions
- Use texture atlases
- `@gltf-transform/functions` provides texture compression utilities

### 7. Geometry Compression
- **Draco:** Google's mesh compression (built into Three.js)
- **Meshopt:** Alternative with faster decompression
- **Quantization:** Reduce vertex attribute precision

## VRChat Model Performance Budget
| Metric | Excellent | Good | Medium | Poor |
|--------|-----------|------|--------|------|
| Triangles | <10K | <18K | <32K | <70K |
| Materials | 1 | 2-4 | 4-8 | 8+ |
| Bones | <75 | <150 | <256 | 256+ |
| PhysBone Components | <8 | <16 | <32 | 32+ |

## Recommended Approach
1. **Import:** Load models with DracoLoader for compressed assets
2. **Runtime LOD:** Generate LOD levels using meshoptimizer WASM
3. **Material batching:** Merge materials where possible using texture atlases
4. **Lazy loading:** Only load high-detail when user zooms in
5. **Progressive rendering:** Show low-poly preview first, stream high-poly async

---

# Research 7: Web-Based Texture Painting / UV Editing

## Goal
Find browser-based texture painting tools comparable to VRoid's painting features.

## Best Existing Libraries & Tools

### 1. PaintCube (COMMERCIAL — Best-in-Class Web Painter)
- **URL:** https://paintcube.co/
- **Maturity:** Production-ready
- **Integration:** Hard (proprietary, SaaS)
- **Client-side:** Yes (web-based)
- **Pricing:** $5-$20/month after 7-day trial
- **Details:** Full-featured web texture painter. Features:
  - Paint directly on 3D models in UV space
  - Layer system for organizing texture information
  - Material system for customizing model appearance
  - Export finished textures for game engines
  - Works on any device with a browser
  - Tools: Paint, Stamp, Project, Erase, Eyedropper

### 2. Chameleon.js (OPEN SOURCE)
- **URL:** https://github.com/tomtung/chameleon.js
- **Demo:** https://experiments.withgoogle.com/chameleonjs
- **Maturity:** Experimental (Google Experiments project)
- **Integration:** Easy (open source, Three.js based)
- **Client-side:** Fully client-side
- **License:** Open source
- **Details:**
  - HTML5 + Three.js + TypeScript
  - Automatic UV generation on-the-fly (no pre-existing UVs needed)
  - Drag-and-drop OBJ import
  - Color selection, background reset
  - Perspective/orthographic camera modes
  - Export as ZIP (OBJ + texture image)
  - **Limitations:** Performance degrades on high-poly models, smart brush partially implemented, can't paint on non-visible faces

### 3. Three.js Texture Projection (DIY)
- **URL:** https://discourse.threejs.org/t/projecting-texture-onto-mesh-and-applying-result-to-mesh-texture/75779
- **Maturity:** DIY/Community solutions
- **Integration:** Medium
- **Client-side:** Yes
- **Details:** Technique uses raycasting to find UV coordinates at paint position, then writes to an offscreen canvas mapped to the texture. Multiple community implementations available.

```javascript
// Conceptual texture painting in Three.js
const raycaster = new THREE.Raycaster();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function paint(event, mesh) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(mesh);
  if (intersects.length > 0) {
    const uv = intersects[0].uv;
    const x = uv.x * canvas.width;
    const y = (1 - uv.y) * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    mesh.material.map.needsUpdate = true;
  }
}
```

### 4. Deep Paint
- **Maturity:** Experimental
- **Client-side:** Yes
- **Details:** Artistic 3D painting tool. Relaxed visual style. Less feature-complete than PaintCube.

## Recommended Approach
Start with the **Chameleon.js** approach (open source, Three.js based) and enhance it:
1. Use Three.js raycasting for UV-space painting
2. Implement a canvas-based layer system
3. Support brush types: solid, airbrush, eraser, stamp
4. Use offscreen canvas as texture source, update `material.map.needsUpdate = true` each frame
5. Export textures as PNG alongside the model

---

# Research 8: PhysBones / Physics Simulation in Browser

## Goal
Find solutions for simulating VRChat PhysBones (hair, cloth, accessories) in browser.

## Best Existing Libraries & Tools

### 1. @pixiv/three-vrm-springbone (PRIMARY RECOMMENDATION)
- **URL:** https://github.com/pixiv/three-vrm (packages/three-vrm-springbone)
- **NPM:** `@pixiv/three-vrm-springbone`
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Fully client-side
- **Details:** VRM Spring Bone implementation for Three.js. This IS the web equivalent of PhysBones for VRM:
  - Verlet integration for stable physics simulation
  - Stiffness, gravity, drag, collision response
  - Adjustable collider radii
  - Scales with VRM model
  - Delta-time clamping prevents physics explosion on tab switch

```javascript
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

// Spring bones are automatically loaded with VRM
loader.load('avatar.vrm', (gltf) => {
  const vrm = gltf.userData.vrm;

  // Spring bones update automatically with vrm.update(delta)
  function animate() {
    const delta = Math.min(clock.getDelta(), 0.05); // IMPORTANT: clamp delta
    vrm.update(delta); // Updates spring bones, expressions, lookAt
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Access spring bone manager for customization
  const springBoneManager = vrm.springBoneManager;
  // Modify stiffness, gravity, etc. per joint group
});
```

### 2. Wiggle Bones (Three.js)
- **URL:** https://wiggle.three.tools/
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes
- **Details:** Blender's wiggle bones ported to Three.js. Makes rigged objects move softly with spring-damper physics. Works on root bone to affect all child bones.

### 3. Cannon-es (General Physics)
- **URL:** https://pmndrs.github.io/cannon-es/docs/
- **NPM:** `cannon-es`
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes (pure JavaScript)
- **Details:** Lightweight 3D physics engine. Good for cloth simulation, collision detection. Easy API inspired by Three.js. Maintained fork of cannon.js.

### 4. Rapier (WASM Physics)
- **URL:** https://rapier.rs/
- **NPM:** `@dimforge/rapier3d`
- **Maturity:** Production-ready
- **Integration:** Medium
- **Client-side:** Yes (Rust compiled to WASM)
- **Details:** Highest-performance web physics engine. 2-5x faster than cannon-es. WASM-based with JavaScript bindings. Excellent for complex physics scenes.

### 5. Physijs (Three.js Plugin)
- **URL:** https://chandlerprall.github.io/Physijs/
- **Maturity:** Beta (aging)
- **Integration:** Easy
- **Client-side:** Yes (Web Worker)
- **Details:** Physics plugin for Three.js. Runs simulation in separate thread via Web Worker. Based on ammo.js (Bullet physics port).

### 6. Three.js Cloth Simulation (DIY)
- **URL:** https://tympanus.net/codrops/2020/02/11/how-to-create-a-physics-based-3d-cloth-with-cannon-js-and-three-js/
- **Details:** Tutorial for cloth simulation combining Cannon.js + Three.js. Particle-based approach with distance constraints.

## VRChat PhysBones vs Web Equivalents
| PhysBone Feature | Web Equivalent | Library |
|------------------|----------------|---------|
| Spring bones | VRM SpringBone | @pixiv/three-vrm-springbone |
| Collision | Sphere/Capsule colliders | three-vrm-springbone |
| Gravity | Per-chain gravity | three-vrm-springbone |
| Stiffness | Per-chain stiffness | three-vrm-springbone |
| Grab interaction | Raycasting + drag | Custom (Three.js) |
| Stretch limits | Constraint system | Custom (cannon-es/rapier) |

## Recommended Approach
Use **@pixiv/three-vrm-springbone** for all VRM avatar physics — it's the native solution and matches VRChat's spring bone behavior. For additional cloth/physics that aren't covered by spring bones, add **cannon-es** for ease of use or **Rapier** for performance-critical scenarios.

---

# Research 9: FBX/VRM/glTF Conversion in Browser

## Goal
Find client-side format conversion libraries. Can we convert between FBX, VRM, glb in browser without a server?

## Best Existing Libraries & Tools

### 1. Three.js FBXLoader (FBX → Three.js Scene)
- **URL:** https://threejs.org/docs/#examples/en/loaders/FBXLoader
- **Maturity:** Production-ready
- **Integration:** Easy
- **Client-side:** Yes
- **Details:** Loads FBX files (v7.0+ ASCII, v6400+ binary) into Three.js scene graph. Once loaded, can be exported to glTF/GLB via GLTFExporter.
- **Limitation:** No FBX export (proprietary Autodesk format)

```javascript
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// FBX → glTF conversion pipeline (client-side)
const fbxLoader = new FBXLoader();
fbxLoader.load('character.fbx', (fbxScene) => {
  // fbxScene is now a Three.js Object3D — export to GLB
  const exporter = new GLTFExporter();
  exporter.parse(fbxScene, (glb) => {
    const blob = new Blob([glb], { type: 'model/gltf-binary' });
    saveAs(blob, 'character.glb');
  }, { binary: true });
});
```

### 2. Three.js GLTFExporter (Scene → glTF/GLB)
- **URL:** https://threejs.org/docs/#examples/en/exporters/GLTFExporter
- **Maturity:** Production-ready
- **Client-side:** Yes
- **Details:** Exports any Three.js scene to glTF or GLB. Handles skinned meshes, animations, materials, textures.

### 3. VRM → glTF (Native — Zero Conversion Needed)
- **Details:** VRM IS glTF. VRM files are `.glb` files with VRM-specific extensions. GLTFLoader reads them directly. The extension data is accessible via `gltf.parser.json.extensions`.

### 4. glTF → VRM (Custom Extension Writer)
- **Maturity:** DIY
- **Client-side:** Yes
- **Details:** Since VRM is glTF + extensions, converting glTF to VRM means adding the VRM extension JSON data (humanoid bone mapping, expressions, spring bones, meta). Use glTF-Transform to add custom extensions, then rename to .vrm.

```javascript
// Conceptual glTF → VRM conversion
import { WebIO } from '@gltf-transform/core';

const io = new WebIO();
const doc = await io.read('model.glb');
const root = doc.getRoot();

// Add VRM extension data
root.setExtras({
  ...root.getExtras(),
  // VRM extension JSON would go here
});

// Export as .vrm (which is just .glb with extensions)
const vrm = await io.writeBinary(doc);
```

### 5. Thirdrez (Browser FBX → glTF)
- **URL:** https://thirdrez.com/convert/fbx-to-gltf
- **Maturity:** Production-ready
- **Integration:** Hard (proprietary web app)
- **Client-side:** Yes (WASM-powered)
- **Details:** Free browser-based converter. Files never leave device. Uses WebAssembly.

### 6. Customuse File Converter
- **URL:** https://customuse.com/free-tools/file-converter
- **Maturity:** Production-ready
- **Client-side:** Yes (WebGL + JavaScript)
- **Details:** Converts GLB, GLTF, OBJ, FBX, STL in browser. 100% client-side, files never uploaded.

### 7. Aspose.CAD for JavaScript
- **URL:** https://products.aspose.com/cad/javascript-net/
- **Maturity:** Production-ready (commercial)
- **Integration:** Medium
- **Client-side:** Yes (.NET compiled to WASM)
- **Details:** FBX to GLTF conversion via JavaScript API. Commercial license required.

## Conversion Matrix — What's Possible Client-Side

| From → To | glTF/GLB | VRM | FBX | OBJ |
|-----------|----------|-----|-----|-----|
| **glTF/GLB** | ✅ Native | ✅ Add extensions | ❌ No open exporter | ✅ OBJExporter |
| **VRM** | ✅ Native (is glTF) | ✅ Native | ❌ No open exporter | ✅ OBJExporter |
| **FBX** | ✅ FBXLoader→GLTFExporter | ✅ FBXLoader→add ext | ❌ Proprietary | ✅ FBXLoader→OBJExporter |
| **OBJ** | ✅ OBJLoader→GLTFExporter | ✅ OBJLoader→add ext | ❌ No open exporter | ✅ Native |

## Key Limitation
**FBX export is not possible client-side** — FBX is Autodesk's proprietary format with no open-source writer. All conversion paths lead TO glTF/GLB, which is fine because VRChat's pipeline accepts glTF/GLB via Unity import.

## Recommended Approach
1. Accept FBX, OBJ, VRM, glTF/GLB as input formats (all loadable in Three.js client-side)
2. Use Three.js loaders to import into scene graph
3. All editing happens on the Three.js scene
4. Export as GLB (universal) or VRM (with custom extension writer)
5. Never try to export FBX — redirect users to glTF/GLB pipeline

---

# Research 10: Export Pipeline — Web to Unity Bridge

## Goal
Find the best way to export from a web app into Unity-ready format for VRChat SDK upload.

## The VRChat Avatar Upload Pipeline
```
┌──────────────────────────────────────────────────┐
│  OUR WEB APP                                      │
│  1. User creates/customizes avatar in browser     │
│  2. Export as .glb or .vrm file                   │
│  3. Download to local machine                     │
└──────────────┬───────────────────────────────────┘
               │ .glb / .vrm file
               ▼
┌──────────────────────────────────────────────────┐
│  UNITY + VRCHAT SDK                               │
│  4. User opens Unity project with VRChat SDK      │
│  5. Drag-drop .glb/.vrm into Assets folder        │
│  6. Unity imports model (auto-converts glb)       │
│  7. Configure VRChat avatar descriptor            │
│  8. Build & Publish to VRChat                     │
└──────────────────────────────────────────────────┘
```

## Key Tools & Methods

### 1. GLB Export (Primary — Simplest Path)
- **Library:** Three.js GLTFExporter
- **Details:** Export avatar as `.glb` file. Unity imports glTF natively since Unity 2023+. For older Unity versions, use UniGLTF or glTFast plugins.
- **VRChat Compatibility:** VRChat SDK uses Unity 2022.3 LTS. UniGLTF (part of UniVRM) handles glb import.

```javascript
// Complete client-side export pipeline
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

function exportAvatar(scene, filename = 'avatar.glb') {
  const exporter = new GLTFExporter();
  const options = {
    binary: true,           // GLB format
    animations: scene.animations || [],
    includeCustomExtensions: true
  };

  exporter.parse(scene, (result) => {
    const blob = new Blob([result], { type: 'model/gltf-binary' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, (error) => {
    console.error('Export failed:', error);
  }, options);
}
```

### 2. VRM Export (Preferred for VRChat)
- **Details:** VRM is the preferred format for VRChat avatars. It includes humanoid mapping, expressions, spring bones, and meta information — all the data VRChat needs.
- **Unity Import:** UniVRM package imports .vrm files directly into Unity with all VRM data intact.
- **Implementation:** Build VRM extension JSON, attach to glTF document, export as .vrm

### 3. VRChat Creator Companion (VCC)
- **URL:** https://vcc.docs.vrchat.com/
- **Details:** Official tool for setting up Unity projects with VRChat SDK. Handles SDK installation, package management, and project configuration.
- **Our Role:** Generate files that VCC+Unity can import cleanly.

### 4. VPM Package Format
- **URL:** https://vcc.docs.vrchat.com/vpm/packages/
- **Details:** VRChat Package Manager format compatible with Unity Package Manager. We could theoretically generate .unitypackage files from the browser, but this is complex and unnecessary — direct model file import is simpler.

### 5. UniVRM (Unity VRM Importer)
- **URL:** https://github.com/vrm-c/UniVRM
- **Details:** Official Unity package for importing/exporting VRM files. Handles all VRM extensions, spring bones, expressions, materials. Users install this in their VRChat Unity project.

## What We Should Generate From Browser

| Export Format | Contents | Unity Import Method | VRChat Ready? |
|--------------|----------|-------------------|---------------|
| `.vrm` | Model + VRM extensions | UniVRM package | ✅ Yes |
| `.glb` | Model + animations | UniGLTF / glTFast | ⚠️ Needs VRM setup |
| `.vrm` + textures ZIP | Model + separate textures | UniVRM + manual | ✅ Yes |

## Export Checklist for VRChat Compatibility
- [ ] Humanoid skeleton with standard bone naming (Hips, Spine, Chest, Head, etc.)
- [ ] Model in T-pose or A-pose
- [ ] Triangle count within VRChat limits (< 70K for PC, < 20K for Quest)
- [ ] Materials using VRChat-compatible shaders (Standard, MToon, or Toon Lit)
- [ ] Proper UV mapping with no overlapping
- [ ] Bone count within limits (< 256 for PC)
- [ ] Spring bone data for dynamic elements
- [ ] Expression/blendshape data for face animations
- [ ] Eye bone configuration for eye tracking
- [ ] Viewpoint position set correctly
- [ ] VRM meta information (author, permissions, etc.)

## Recommended Approach
1. **Primary export:** `.vrm` file with all VRM extensions baked in
2. **Secondary export:** `.glb` for users who want to do manual setup in Unity
3. **Include instructions:** Generate a README with the download explaining how to import into Unity + VRChat SDK
4. **Provide a pre-configured Unity project template** (optional future feature) that users can download with VRChat SDK already set up
5. **DO NOT attempt to generate .unitypackage files** — too complex, too fragile, and Unity handles model import well enough

---

# Summary Matrix — All 10 Research Areas

| # | Domain | Primary Tool | Maturity | Client-Side? | Difficulty |
|---|--------|-------------|----------|-------------|------------|
| 1 | 3D Editor | Three.js Editor | Production | ✅ Yes | Easy |
| 2 | VRM Engine | @pixiv/three-vrm | Production | ✅ Yes | Easy |
| 3 | glTF Manipulation | glTF-Transform | Production | ✅ Yes | Easy |
| 4 | Rigging | Pre-rigged parts + Mixamo API | Production | ⚠️ Hybrid | Medium |
| 5 | Avatar Customizer | Custom (VRoid-inspired) | DIY | ✅ Yes | Medium |
| 6 | Performance | meshoptimizer WASM + LOD | Production | ✅ Yes | Medium |
| 7 | Texture Painting | Chameleon.js pattern + DIY | Experimental | ✅ Yes | Hard |
| 8 | Physics/SpringBone | three-vrm-springbone | Production | ✅ Yes | Easy |
| 9 | Format Conversion | Three.js Loaders + Exporters | Production | ✅ Yes | Easy |
| 10 | Export to Unity | GLB/VRM download | Production | ✅ Yes | Easy |

---

# Recommended Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (100% Client-Side)           │
├─────────────────────────────────────────────────────────┤
│  Framework:     Vanilla JS or React                      │
│  3D Engine:     Three.js (r170+)                         │
│  VRM Support:   @pixiv/three-vrm v3.5+                   │
│  glTF SDK:      @gltf-transform/core + functions         │
│  Physics:       three-vrm-springbone + cannon-es          │
│  Mesh Optim:    meshoptimizer (WASM)                     │
│  UI:            Custom sliders, color pickers, tabs       │
│  Export:        GLTFExporter → .glb / custom → .vrm      │
├─────────────────────────────────────────────────────────┤
│                    OPTIONAL BACKEND                       │
├─────────────────────────────────────────────────────────┤
│  Auto-Rigging:  UniRig API or Mixamo API                 │
│  AI Avatars:    Avatar SDK API                           │
│  Storage:       User's local filesystem (download)       │
└─────────────────────────────────────────────────────────┘
```

## NPM Packages to Install
```bash
npm install three
npm install @pixiv/three-vrm
npm install @gltf-transform/core
npm install @gltf-transform/extensions
npm install @gltf-transform/functions
npm install meshoptimizer
npm install cannon-es        # optional, for advanced physics
```

## Key Architectural Decisions
1. **Fully client-side** — no server required for core functionality
2. **Component-based avatar system** — pre-rigged parts with morph targets
3. **VRM as primary format** — it's glTF + standardized avatar extensions
4. **Export VRM directly** — users import into Unity with UniVRM
5. **Progressive complexity** — start with part-swapping, add painting/rigging later

---

*Research compiled from 20+ web searches, GitHub repositories, npm registries, and technical documentation. All libraries verified for 2025-2026 compatibility.*
