# 03 — WebGL Carousel Recipe (Three.js)

## Intro

Goal: a cover-flow style 3D photo showcase where iPad-proportion (16:9)
plane meshes are arranged on a gentle cylinder, textured with photos, lit by a
dark gradient background plane, accented with a razor-thin yellow line, and
driven by mouse drag with inertia. Hover adds a soft shader-based glow.

The dominant production pattern in 2025 isn't "one giant cylinder mesh" — it's
**N independent planes positioned on a ring**, each carrying its own texture +
uniforms. This is the exact approach Codrops + kekkorider use in the OGL
circular gallery, and the same approach works 1:1 in Three.js with a CDN
build. We combine that arrangement with a Codrops 2025 inertia model
(target/current lerp with velocity decay) and an edge-distance shader for the
accent line + hover glow.

## Key Technique

Three layered ideas:

1. **Ring arrangement by angle.** Each plane sits at angle `i * (2π / N)` on a
   cylinder of radius `R`. Position uses `(sin, 0, cos)`; each plane rotates
   `Y` by its angle so its face points at the camera's axis. This creates the
   cover-flow curve without any custom geometry — just PlaneGeometry +
   MeshBasicMaterial-with-ShaderMaterial.
2. **Drag inertia = target + current + velocity.** Mouse delta writes to a
   `target` rotation. The render loop lerps `current → target` (ease ~0.08),
   and on release a decaying `velocity` keeps feeding `target` until it falls
   under a threshold. This is the feel used across Codrops 2021/2025
   tutorials.
3. **Shader does the polish.** One ShaderMaterial per plane handles:
   photo texture with aspect-preserving UVs, a thin yellow border via
   `smoothstep` on distance-to-edge, a hover glow driven by a `uHover` uniform
   that's lerped per-plane, and a subtle vignette. The background is a second
   full-screen plane (behind camera frustum) with a radial dark gradient in
   fragment.

## Code Snippet (working, CDN-ready)

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;height:100%;background:#05060a;overflow:hidden;cursor:grab}
  body.drag{cursor:grabbing} canvas{display:block}
</style></head><body>
<script type="importmap">
{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js"}}
</script>
<script type="module">
import * as THREE from 'three';

const PHOTOS = [/* 8–16 image URLs */];
const N = PHOTOS.length, RADIUS = 4.2, TILE_W = 2.4, TILE_H = TILE_W*9/16;

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 0.2, 7.5);

// --- background gradient plane ---
const bgMat = new THREE.ShaderMaterial({
  uniforms:{ uRes:{value:new THREE.Vector2(innerWidth,innerHeight)} },
  vertexShader:`void main(){gl_Position=vec4(position.xy,0.999,1.0);}`,
  fragmentShader:`
    uniform vec2 uRes; void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      float d = distance(uv, vec2(0.5,0.55));
      vec3 a = vec3(0.04,0.05,0.09), b = vec3(0.005,0.005,0.012);
      gl_FragColor = vec4(mix(a,b, smoothstep(0.0,0.9,d)), 1.0);
    }`,
  depthTest:false, depthWrite:false
});
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), bgMat));

// --- tile shader (photo + thin yellow edge + hover glow) ---
const tileFrag = `
  precision highp float;
  uniform sampler2D uTex; uniform vec2 uImgSize, uPlaneSize;
  uniform float uHover; varying vec2 vUv;
  void main(){
    // aspect-preserving cover UVs
    vec2 r = vec2(
      min((uPlaneSize.x/uPlaneSize.y)/(uImgSize.x/uImgSize.y),1.0),
      min((uPlaneSize.y/uPlaneSize.x)/(uImgSize.y/uImgSize.x),1.0));
    vec2 uv = vUv * r + (1.0 - r) * 0.5;
    vec3 col = texture2D(uTex, uv).rgb;

    // distance to nearest edge in plane UV space
    float edge = min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y));

    // razor-thin yellow accent line (~1.5px at 1080p)
    float line = smoothstep(0.006, 0.004, edge) - smoothstep(0.004, 0.002, edge);
    col = mix(col, vec3(1.0, 0.85, 0.15), line);

    // soft hover glow (inner bloom from edge, gated by uHover)
    float glow = smoothstep(0.22, 0.0, edge) * uHover * 0.35;
    col += vec3(1.0, 0.88, 0.25) * glow;

    // vignette
    float v = smoothstep(0.85, 0.2, length(vUv - 0.5));
    col *= mix(0.78, 1.0, v);
    gl_FragColor = vec4(col, 1.0);
  }`;
const tileVert = `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;

const loader = new THREE.TextureLoader();
const geo = new THREE.PlaneGeometry(TILE_W, TILE_H, 1, 1);
const tiles = [];

PHOTOS.forEach((url, i) => {
  const mat = new THREE.ShaderMaterial({
    vertexShader: tileVert, fragmentShader: tileFrag,
    uniforms:{
      uTex:{value:null},
      uImgSize:{value:new THREE.Vector2(1,1)},
      uPlaneSize:{value:new THREE.Vector2(TILE_W, TILE_H)},
      uHover:{value:0}
    }
  });
  loader.load(url, tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    mat.uniforms.uTex.value = tex;
    mat.uniforms.uImgSize.value.set(tex.image.width, tex.image.height);
  });
  const m = new THREE.Mesh(geo, mat);
  const a = (i / N) * Math.PI * 2;
  m.position.set(Math.sin(a)*RADIUS, 0, Math.cos(a)*RADIUS);
  m.rotation.y = a;                      // face outward from ring center
  m.userData = { baseAngle:a, hoverTarget:0 };
  scene.add(m); tiles.push(m);
});

// --- drag inertia ---
const state = { current:0, target:0, vel:0, dragging:false, lastX:0 };
addEventListener('pointerdown', e => { state.dragging=true; state.lastX=e.clientX; state.vel=0; document.body.classList.add('drag'); });
addEventListener('pointerup',   () => { state.dragging=false; document.body.classList.remove('drag'); });
addEventListener('pointermove', e => {
  if (state.dragging){
    const dx = e.clientX - state.lastX; state.lastX = e.clientX;
    const d = dx * 0.005;
    state.target += d; state.vel = d;
  }
  // hover picking
  const ndc = new THREE.Vector2((e.clientX/innerWidth)*2-1, -(e.clientY/innerHeight)*2+1);
  const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(tiles)[0];
  tiles.forEach(t => t.userData.hoverTarget = (hit && hit.object===t) ? 1 : 0);
});

// --- loop ---
function tick(){
  if (!state.dragging){ state.target += state.vel; state.vel *= 0.92;
    if (Math.abs(state.vel)<0.0002) state.vel = 0; }
  state.current += (state.target - state.current) * 0.08;

  // rotate whole ring; keep planes facing outward (they rotate with group
  // implicitly because we re-derive position each frame from baseAngle)
  tiles.forEach(t => {
    const a = t.userData.baseAngle + state.current;
    t.position.set(Math.sin(a)*RADIUS, 0, Math.cos(a)*RADIUS);
    t.rotation.y = a;
    const u = t.material.uniforms.uHover;
    u.value += (t.userData.hoverTarget - u.value) * 0.12;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  bgMat.uniforms.uRes.value.set(innerWidth, innerHeight);
});
</script></body></html>
```

## Why It Feels 3D

- **Real perspective projection.** The camera is pulled back on +Z; tiles on
  the far side of the ring are literally further from the camera, so
  foreshortening and scale attenuation are free. No manual `scale` math.
- **Face-outward rotation.** Each tile's `rotation.y = baseAngle + offset`
  keeps it perpendicular to the ring radius, giving that cover-flow "page
  turning past you" feel as the ring spins.
- **Inertia, not snapping.** `current → target` lerp (ease 0.08) plus velocity
  decay (0.92/frame) mimics a heavy physical wheel. The eye reads smooth
  deceleration as mass, which is the single biggest "feels real" cue.
- **Per-plane hover uniform lerp.** `uHover` eases 0→1 instead of jumping;
  the glow swells rather than pops. Coupled with the thin yellow line, the
  hovered plane reads as "lit" without any post-processing pass.
- **Dark radial gradient background.** A fullscreen plane at `z=0.999` in
  clip-space gives you absolute control over the stage lighting mood and
  removes the "floating on white" feel.

## Tile / Nav Pattern Recommendations

- **Count + radius.** 8–12 tiles on `RADIUS = 4.2` reads as cover-flow.
  16+ tiles on `RADIUS = 6` reads as circular gallery. Below 6 tiles the ring
  looks like a hexagon — use an arc instead (map i∈[0,N) to angle ∈ [-0.6,
  0.6] rad) if you have 3–5 photos.
- **16:9 iPad frame.** Keep `TILE_H = TILE_W * 9/16`. If you want the iPad
  bezel look, render a second slightly larger dark plane behind each tile
  (`TILE_W * 1.04`) with rounded corners via `smoothstep` on SDF.
- **Snap-to-nearest on release.** After drag ends, compute the nearest
  `baseAngle` to `-state.current` and ease `state.target` to that; keeps a
  tile centered at front. Keeps drag feeling free but resting state feels
  intentional.
- **Keyboard/wheel parity.** Map `wheel.deltaY * 0.002` and arrow keys
  (`±2π/N`) into the same `state.target`. Accessibility + trackpad support in
  ~6 lines.
- **Texture hygiene.** Set `tex.colorSpace = SRGBColorSpace`, cap images at
  1600px on the long edge, and preload all before `tick()` to avoid pop-in.
- **Razor-line tuning.** The two `smoothstep` bands control line thickness;
  `(0.006, 0.004) - (0.004, 0.002)` lands near 1.5px at 1080p. Drop both by
  half for a hairline.
- **Accent swap.** Change the yellow to match brand by editing one vec3 in
  the shader (`vec3(1.0, 0.85, 0.15)`). Expose it as a uniform if you want
  per-tile theming.

## References

- [Codrops — Infinite Circular Gallery with OGL + GLSL (kekkorider, 2021)](https://tympanus.net/codrops/2021/02/23/creating-an-infinite-circular-gallery-using-webgl-with-ogl-and-glsl-shaders/) — source of the Media/Gallery class split, aspect-preserving UV ratio, and `scroll.current → scroll.target` lerp pattern.
- [Codrops — 3D Infinite Carousel with Reactive Gradients (2025)](https://tympanus.net/codrops/2025/11/11/building-a-3d-infinite-carousel-with-reactive-background-gradients/) — velocity + friction inertia model (`vX *= Math.pow(0.9, dt*60)`), perspective/preserve-3d stage.
- [addyosmani/threejs-coverflow (GitHub)](https://github.com/addyosmani/threejs-coverflow) — canonical Three.js cover-flow implementation with album planes.
- [jantepya/Carousel3D (GitHub)](https://github.com/jantepya/Carousel3D) — minimal Three.js carousel reference with camera/ring layout.
- [kekkorider/codrops-tutorial-ogl-image-carousel (GitHub)](https://github.com/kekkorider/codrops-tutorial-ogl-image-carousel) — full step-by-step commits of the OGL carousel build.
- [stemkoski — Three.js Glow Shader](https://stemkoski.github.io/Three.js/Shader-Glow.html) — reference for additive glow pass if you later want the halo outside the plane.
- [Codrops — Texture Recursion Infinite Slider (2022)](https://tympanus.net/codrops/2022/06/01/coding-an-infinite-slider-using-texture-recursion-with-three-js/) — alternate approach using a single long plane + texture wrap; useful if you move from ring to strip later.
