# Wireframe Failure Map — VRChat Avatar Web Emulator Suite

> **Created:** 2026-03-21
> **Purpose:** Comprehensive failure scenario mapping for building web-based emulators of 5 VRChat avatar creation tools inside a single web app. This is the safety net for the entire build.
> **Status:** Master reference document — update as new scenarios are discovered during development.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SINGLE WEB APPLICATION                         │
│                                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ Blender  │ │  VRoid   │ │ Booth.pm │ │Unity+SDK │ │   Tafi   ││
│  │ Emulator │ │ Emulator │ │ Emulator │ │ Emulator │ │ Emulator ││
│  │          │ │          │ │          │ │          │ │          ││
│  │Three.js  │ │three-vrm │ │glb+comp  │ │scene ed  │ │modular   ││
│  │glTF/glb  │ │VRM format│ │system    │ │JSON cfg  │ │glb parts ││
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              SHARED LAYER                                    │  │
│  │  • WebGL renderer  • IndexedDB storage  • File I/O bridge   │  │
│  │  • Cross-tab state sync  • Export pipeline  • Undo system    │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Tech stack per emulator:**
1. **Blender** → Three.js + glTF/glb (3D modeling/sculpting/rigging)
2. **VRoid Studio** → three-vrm + VRM format (anime avatar creator)
3. **Booth.pm** → glb models + component system (marketplace/pre-made bases)
4. **Unity + VRChat SDK** → web-based scene editor + JSON configs (assembly/config/upload)
5. **Tafi** → modular glb parts + web configurator (component-based builder)

---

## TABLE OF CONTENTS

1. [Emulator 1: Blender (Three.js + glTF/glb)](#emulator-1-blender)
2. [Emulator 2: VRoid Studio (three-vrm + VRM)](#emulator-2-vroid-studio)
3. [Emulator 3: Booth.pm (glb + Component System)](#emulator-3-boothpm)
4. [Emulator 4: Unity + VRChat SDK (Scene Editor + JSON)](#emulator-4-unity--vrchat-sdk)
5. [Emulator 5: Tafi (Modular glb + Web Configurator)](#emulator-5-tafi)
6. [Cross-Emulator Failures (System-Wide)](#cross-emulator-failures)
7. [Final Step Checklist](#final-step-checklist)

---

# EMULATOR 1: BLENDER

**Implementation:** Three.js + glTF/glb
**Real tool capabilities:** Full 3D modeling, sculpting, rigging, weight painting, shape keys, UV mapping, texture painting, FBX export

---

## 1A. File Format Issues

```
[SCENARIO] FBX import/export not natively supported in browser
  ├── [CAUSE] glTF/glb is the web standard. FBX is Autodesk's proprietary binary
  │   format. No browser-native FBX parser exists with full fidelity.
  ├── [IMPACT] Critical — FBX is THE handoff format between Blender and Unity for
  │   VRChat. Every avatar pipeline ends with an FBX export.
  ├── [PREVENTION] Build or integrate a JS-based FBX exporter (fbx-writer-js or
  │   similar). Accept that only a subset of FBX features will be supported.
  │   Document which FBX features are covered.
  └── [SOLUTION] Provide a server-side conversion endpoint using Python (Blender
      headless or Assimp) as a fallback. User uploads glb → server returns FBX.
```

```
[SCENARIO] glTF 2.0 does not support all Blender data types
  ├── [CAUSE] glTF spec lacks: shape key drivers, constraints, modifiers, custom
  │   properties, vertex groups as weight paint data (only joint weights),
  │   armature-level IK chains, particle systems, grease pencil data.
  ├── [IMPACT] High — users who model in our emulator and export glTF will lose
  │   data that a real Blender file (.blend) would preserve.
  ├── [PREVENTION] Store extra data as glTF extensions (custom extras field).
  │   Define a proprietary extension schema for our app's internal format.
  └── [SOLUTION] Maintain a parallel JSON sidecar file that stores all non-glTF
      data. On re-import, merge the sidecar back in.
```

```
[SCENARIO] Coordinate system mismatch between Three.js and Blender/Unity
  ├── [CAUSE] Blender uses Z-up, right-handed. Unity uses Y-up, left-handed.
  │   Three.js uses Y-up, right-handed. Every conversion is a potential rotation/
  │   scale bug. The classic FBX 100x scale bug happens when "Apply Scalings" is
  │   wrong.
  ├── [IMPACT] High — avatars may appear rotated 90 degrees, upside down, or at
  │   100x scale when moving between emulator tabs or exporting.
  ├── [PREVENTION] Normalize ALL internal data to Three.js convention (Y-up,
  │   right-handed, meters). Convert on import, convert on export. Never store
  │   mixed coordinate data.
  └── [SOLUTION] Add a "Fix Orientation" button that applies standard transforms.
      Show a preview grid with axis labels so users can visually verify.
```

```
[SCENARIO] Blend file (.blend) import requested but impossible
  ├── [CAUSE] .blend is Blender's native format — a complex binary with DNA
  │   introspection. No JavaScript parser can fully decode it.
  ├── [IMPACT] Medium — many users will want to import existing Blender projects.
  │   They'll expect to drag in a .blend file and have it work.
  ├── [PREVENTION] Clearly communicate that the emulator works with glTF/glb,
  │   not .blend files. Provide instructions for exporting glTF from real Blender.
  └── [SOLUTION] Offer a server-side .blend → glTF converter using headless
      Blender. Or integrate a WASM build of a minimal .blend parser for geometry
      extraction only (no modifiers, no simulations).
```

```
[SCENARIO] Shape key / morph target data loss during format conversion
  ├── [CAUSE] glTF supports morph targets but only for position, normal, and
  │   tangent attributes. Blender shape keys can drive UV coordinates, vertex
  │   colors, and custom attributes — all lost in glTF.
  ├── [IMPACT] High — VRChat visemes (vrc.v_aa, vrc.v_oh, vrc.v_ch, etc.) are
  │   shape keys. If they don't survive round-trip, lip sync breaks.
  ├── [PREVENTION] Validate that all 15 VRChat viseme shape keys + blink keys
  │   are present and functional after every save/load cycle. Run automated
  │   morph target integrity checks.
  └── [SOLUTION] Store shape key metadata in the glTF extras field. Rebuild any
      lost UV-based shape keys from the stored metadata on load.
```

```
[SCENARIO] Texture format incompatibilities
  ├── [CAUSE] Blender supports EXR, HDR, TIFF, PSD, DDS, and many formats that
  │   browsers cannot decode. glTF only supports PNG and JPEG (and KTX2 with
  │   extensions).
  ├── [IMPACT] Medium — imported textures in exotic formats will fail silently
  │   or display as magenta/missing.
  ├── [PREVENTION] Auto-convert all imported textures to PNG on load. Show a
  │   warning listing which textures were converted and any quality loss.
  └── [SOLUTION] Use a client-side image decoder library (sharp-wasm or similar)
      for EXR/HDR/TIFF. For PSD, use psd.js. Convert everything to PNG/JPEG
      before storing.
```

---

## 1B. Rendering Issues

```
[SCENARIO] Blender's Cycles/EEVEE shaders cannot be replicated in WebGL
  ├── [CAUSE] Cycles is a path-traced renderer. EEVEE uses screen-space
  │   reflections, volumetrics, bloom, SSAO, and other features that WebGL 2.0
  │   does not natively support. Three.js has approximations but not equivalence.
  ├── [IMPACT] High — the emulator will never look like real Blender. Users who
  │   expect Cycles-quality rendering will be disappointed immediately.
  ├── [PREVENTION] Don't try to replicate Cycles. Use Three.js PBR materials
  │   (MeshStandardMaterial / MeshPhysicalMaterial) and clearly label the
  │   viewport as "Preview" not "Render." Add a disclaimer.
  └── [SOLUTION] Offer a "render preview" mode using Three.js post-processing
      (bloom, SSAO, tone mapping) to get closer to EEVEE. Accept the gap.
```

```
[SCENARIO] Wireframe/edit mode rendering performance
  ├── [CAUSE] Real Blender renders wireframes via OpenGL with GPU-accelerated
  │   line drawing, selection highlighting, and vertex/edge/face display modes.
  │   Three.js wireframe rendering is limited — no true edge display, no partial
  │   selection highlighting without custom shaders.
  ├── [IMPACT] High — edit mode IS the core experience of a modeling tool. If
  │   wireframe rendering is slow or ugly, the emulator feels broken.
  ├── [PREVENTION] Write custom WebGL shaders for wireframe overlay. Use
  │   EdgesGeometry + LineSegments for clean wireframe. Implement selection
  │   highlighting via color-picking (render object IDs to an offscreen buffer).
  └── [SOLUTION] Limit edit mode to meshes under 50K vertices for smooth
      interaction. Show a warning when approaching the limit. Offer a
      "simplified edit view" that hides edge display for complex models.
```

```
[SCENARIO] Weight paint visualization missing or inaccurate
  ├── [CAUSE] Blender renders weight paint as a color gradient overlay on the
  │   mesh surface in real-time. Three.js has no built-in weight paint
  │   visualization — must be implemented via vertex colors + custom shaders.
  ├── [IMPACT] High — weight painting is essential for VRChat avatars. Bad
  │   weights = limbs detaching, faces deforming wrong, clothing clipping.
  ├── [PREVENTION] Build a custom vertex color shader that reads skin weight
  │   data and renders the blue→green→yellow→red gradient. Update in real-time
  │   as weights change.
  └── [SOLUTION] If real-time weight viz is too slow, offer a "bake weight
      colors" button that applies the gradient as a static vertex color layer
      for visual inspection.
```

```
[SCENARIO] Normal map / bump map rendering differences
  ├── [CAUSE] Three.js normal map implementation differs subtly from Blender's
  │   (tangent space conventions, green channel direction). Models may appear
  │   to have inverted bumps or incorrect surface detail.
  ├── [IMPACT] Medium — visual quality issue, not a data integrity issue.
  ├── [PREVENTION] Auto-detect and correct normal map green channel direction
  │   on import. Provide a "flip green channel" toggle in material settings.
  └── [SOLUTION] Document the expected normal map format (OpenGL vs DirectX
      convention) and provide a conversion utility.
```

---

## 1C. Performance Issues

```
[SCENARIO] High-poly sculpting crashes the browser tab
  ├── [CAUSE] Real Blender sculpting handles 10M+ polygon meshes using
  │   multi-resolution and GPU compute. Browsers have hard memory limits per
  │   tab (~2-4 GB on most browsers). A 5M poly mesh with normals, UVs, and
  │   colors can exceed 1 GB of GPU memory.
  ├── [IMPACT] Critical — the browser tab crashes with no warning, losing
  │   unsaved work. Users lose trust in the tool immediately.
  ├── [PREVENTION] Hard cap polygon count at a safe threshold (500K for sculpt
  │   mode, 200K for edit mode). Show a real-time polygon counter with
  │   color-coded warning levels. Auto-save every 60 seconds to IndexedDB.
  └── [SOLUTION] Implement level-of-detail: sculpt on a decimated proxy,
      auto-subdivide only the area under the brush. Use octree spatial
      partitioning. Add "out of memory" detection via performance.memory API
      and warn before crashing.
```

```
[SCENARIO] Real-time deformation (skinning) too slow for complex rigs
  ├── [CAUSE] VRChat avatars can have 256+ bones (PC Good rank allows 256).
  │   Three.js GPU skinning supports max 4 bone influences per vertex by
  │   default. Blender allows unlimited influences.
  ├── [IMPACT] High — if skinning is slow, posing and animation preview will
  │   lag, making rigging workflow unusable.
  ├── [PREVENTION] Limit bone influences to 4 per vertex (matches VRChat's
  │   requirement anyway). Use GPU skinning exclusively. Batch draw calls.
  └── [SOLUTION] For rigs over 200 bones, switch to a simplified preview mode
      that only deforms the mesh near the selected bone. Full deformation runs
      only on explicit "preview" button press.
```

```
[SCENARIO] Undo/redo system runs out of memory
  ├── [CAUSE] Each undo step for a mesh operation stores a full copy of the
  │   modified geometry. 50 undo steps on a 100K poly mesh = ~500 MB of undo
  │   history stored in RAM.
  ├── [IMPACT] High — either undo doesn't work (terrible UX) or it eats all
  │   memory and causes a crash.
  ├── [PREVENTION] Implement delta-based undo (store only the changed vertices,
  │   not the full mesh). Cap undo history at 30 steps. Use a ring buffer —
  │   oldest undo steps get dropped first.
  └── [SOLUTION] Persist undo history to IndexedDB in compressed form. When
      memory pressure is detected, offload old undo steps to disk and keep
      only the last 10 in RAM.
```

```
[SCENARIO] Mobile devices cannot run the Blender emulator at all
  ├── [CAUSE] Mobile GPUs have dramatically lower fill rate, VRAM (typically
  │   2-4 GB shared), and WebGL limits. Touch input doesn't map to Blender's
  │   mouse+keyboard workflow.
  ├── [IMPACT] Medium — loss of mobile audience, but Blender-level modeling on
  │   mobile was never realistic.
  ├── [PREVENTION] Detect mobile via user agent and WebGL capabilities. Show a
  │   clear message: "This tool requires a desktop browser with WebGL 2.0."
  └── [SOLUTION] Offer a "view only" mode on mobile — users can rotate/inspect
      models but not edit them. Full editing requires desktop.
```

---

## 1D. Feature Parity Gaps

```
[SCENARIO] Boolean operations (union, difference, intersection) not available
  ├── [CAUSE] Blender's boolean system uses exact arithmetic and BSP trees. No
  │   production-quality JS boolean library exists for meshes. CSG.js exists but
  │   is slow, imprecise, and fails on complex geometry.
  ├── [IMPACT] High — boolean operations are fundamental to modeling workflows
  │   (cutting holes, merging shapes, creating complex forms).
  ├── [PREVENTION] Use Manifold (Google's WASM boolean engine) or integrate a
  │   WASM build of libigl/CGAL for boolean operations.
  └── [SOLUTION] Offer boolean operations as a "beta" feature with known
      limitations. Warn that complex booleans may produce non-manifold geometry
      that needs manual cleanup.
```

```
[SCENARIO] No modifier stack (Mirror, Subdivision Surface, Array, etc.)
  ├── [CAUSE] Blender's modifier stack is a non-destructive pipeline where
  │   modifiers are applied in order. Implementing the full modifier system in
  │   JS is essentially rebuilding Blender's core.
  ├── [IMPACT] Critical — modifiers are how 90% of modeling is done. Mirror
  │   modifier alone is used in virtually every avatar build. Subdivision
  │   Surface controls final quality.
  ├── [PREVENTION] Implement the top 5 critical modifiers only: Mirror,
  │   Subdivision Surface, Solidify, Decimate, Armature. Skip everything else.
  └── [SOLUTION] For unsupported modifiers, show "Apply in Blender first"
      guidance. Provide a server-side "apply modifiers" endpoint using headless
      Blender.
```

```
[SCENARIO] No UV unwrapping tools
  ├── [CAUSE] Blender's UV unwrapping uses LSCM (Least Squares Conformal Maps)
  │   and ABF++ algorithms. These are computationally expensive and not
  │   implemented in any browser library.
  ├── [IMPACT] High — UV mapping is required for texturing, which is required
  │   for every avatar. Without UV tools, users can't texture their models.
  ├── [PREVENTION] Implement basic UV projection (box, cylindrical, spherical,
  │   planar) in JS. For smart UV unwrap, use a WASM build of xatlas or
  │   UVAtlas.
  └── [SOLUTION] Accept that auto-UV quality will be lower than Blender's.
      Provide a manual UV editor (2D canvas with island manipulation) for
      fine-tuning. Offer server-side xatlas unwrapping as a fallback.
```

```
[SCENARIO] No sculpt brushes with dynamic topology
  ├── [CAUSE] Blender's dyntopo sculpting creates and removes vertices in
  │   real-time based on brush size and detail level. This requires
  │   high-performance spatial indexing (BVH trees), real-time remeshing,
  │   and GPU-accelerated mesh updates — all extremely difficult in WebGL.
  ├── [IMPACT] High — sculpting is one of Blender's signature workflows.
  │   Without it, the "Blender" label feels misleading.
  ├── [PREVENTION] Implement static sculpt brushes only (grab, smooth, inflate,
  │   flatten) that deform existing vertices without adding/removing geometry.
  └── [SOLUTION] Label the tool as "Mesh Editor" not "Sculpt Tool." Offer a
      vertex displacement painting system that approximates sculpting feel
      without dynamic topology.
```

```
[SCENARIO] No animation timeline or keyframe system
  ├── [CAUSE] Blender has a full animation system with keyframes, curves,
  │   drivers, NLA strips, and graph editor. Building this in the browser is
  │   a separate project-scale effort.
  ├── [IMPACT] Medium — for VRChat avatars, animation is mostly done in Unity's
  │   animator, not Blender. Shape key creation doesn't require a timeline.
  ├── [PREVENTION] Skip the full animation system. Implement only a simple
  │   "pose mode" slider that lets users test shape keys and bone deformation.
  └── [SOLUTION] For users who need animation, direct them to export and use
      real Blender or Unity. Our emulator focuses on modeling + rigging.
```

```
[SCENARIO] Cats Blender Plugin / Avatar Toolkit features missing
  ├── [CAUSE] These addons provide one-click fixes (fix model, combine meshes,
  │   auto-generate visemes, eye tracking setup, bone merging). They're Python
  │   scripts that depend on Blender's internal API.
  ├── [IMPACT] High — these addons are used by 80%+ of VRChat avatar creators.
  │   Their absence means users must do manually what Cats does automatically.
  ├── [PREVENTION] Reimplement the most critical Cats functions as JavaScript:
  │   combine meshes, generate visemes from 3 base shapes, fix bone names,
  │   decimate to target poly count, merge bones.
  └── [SOLUTION] Build a "VRChat Prep" toolbar in the Blender emulator that
      replicates the top 10 Cats functions. This is achievable — most are
      mesh/bone manipulation algorithms, not Blender-API-dependent.
```

---

## 1E. Export/Import Bridge Failures

```
[SCENARIO] Exported glTF/glb loses bone hierarchy when imported into Unity
  ├── [CAUSE] Unity's humanoid rig auto-mapper expects specific bone naming
  │   conventions (Hips, Spine, Chest, Neck, Head, etc.). If our emulator uses
  │   different names or hierarchy, Unity fails to map them.
  ├── [IMPACT] Critical — if the rig doesn't import correctly into Unity, the
  │   entire avatar pipeline breaks. No rig = no VRChat upload.
  ├── [PREVENTION] Enforce VRChat-standard bone naming in our emulator. Provide
  │   a bone name validator that checks against the required hierarchy before
  │   export. Auto-rename bones to match Unity's humanoid convention.
  └── [SOLUTION] Include a "bone name conversion table" in the export. Ship a
      Unity editor script (.cs) alongside the exported file that auto-maps
      non-standard bone names to humanoid slots.
```

```
[SCENARIO] glb file too large for practical download/transfer
  ├── [CAUSE] Uncompressed glb with high-res textures (4096x4096 per material
  │   slot, 4-8 material slots) can easily exceed 100 MB. Draco compression
  │   helps geometry but not textures.
  ├── [IMPACT] Medium — slow downloads, storage issues, and Unity import times.
  ├── [PREVENTION] Apply Draco mesh compression. Auto-resize textures to 2048
  │   max on export (with option to keep 4096). Use KTX2/Basis Universal for
  │   GPU-compressed textures. Show file size estimate before export.
  └── [SOLUTION] Offer "optimized export" vs "full quality export" options.
      Optimized compresses textures to JPEG quality 85, applies Draco, targets
      sub-30 MB.
```

```
[SCENARIO] Weight paint data doesn't transfer correctly to Unity via glTF
  ├── [CAUSE] glTF stores joint weights as vec4 (4 influences max) normalized
  │   to sum to 1.0. If our emulator allows >4 influences or doesn't normalize,
  │   Unity will read incorrect weights.
  ├── [IMPACT] High — incorrect weights = body parts deforming wrong, limbs
  │   stretching, face collapsing during expressions.
  ├── [PREVENTION] Enforce 4-influence limit. Auto-normalize weights on every
  │   paint stroke. Run a weight validation pass before export that flags any
  │   vertex with >4 influences or weights not summing to 1.0.
  └── [SOLUTION] Add a "clean weights" function that strips the lowest-influence
      bones and renormalizes. Run automatically on export.
```

---

## 1F. UX Friction

```
[SCENARIO] Keyboard shortcuts don't match real Blender
  ├── [CAUSE] Blender has hundreds of keyboard shortcuts (G=grab, S=scale,
  │   R=rotate, Tab=edit mode, etc.). Browser shortcuts conflict (Ctrl+S,
  │   Ctrl+Z, Ctrl+W, F5, F11, etc.).
  ├── [IMPACT] High — Blender users have muscle memory. If shortcuts don't
  │   match, every action feels wrong. If browser shortcuts intercept, users
  │   accidentally close tabs or refresh the page.
  ├── [PREVENTION] Intercept keyboard events and preventDefault() for all
  │   Blender shortcuts. Map the top 50 Blender shortcuts exactly. Use
  │   event.preventDefault() on Ctrl+S, Ctrl+Z, etc.
  └── [SOLUTION] Provide a shortcut customization panel. Ship with "Blender
      defaults" and "Web defaults" presets. Show a shortcut cheat sheet on
      first load.
```

```
[SCENARIO] No right-click context menu (browser hijacks it)
  ├── [CAUSE] Right-click is fundamental in Blender (context menu, confirm
  │   action, vertex select in some configurations). The browser's native
  │   context menu will appear instead.
  ├── [IMPACT] Medium — breaks the modeling workflow rhythm.
  ├── [PREVENTION] Suppress browser context menu via contextmenu event
  │   preventDefault(). Implement a custom right-click menu that matches
  │   Blender's context options.
  └── [SOLUTION] Already solved by event prevention. Just make sure it works
      across all browsers including Safari.
```

```
[SCENARIO] Three-button mouse navigation missing on trackpad users
  ├── [CAUSE] Blender relies heavily on middle-mouse-button (orbit),
  │   Shift+MMB (pan), Ctrl+MMB (zoom). Trackpad users don't have MMB.
  ├── [IMPACT] Medium — significant portion of users (especially laptop users)
  │   will be unable to navigate the 3D viewport.
  ├── [PREVENTION] Implement trackpad gesture support: two-finger drag = orbit,
  │   two-finger pinch = zoom, Shift+two-finger = pan. Also support Alt+LMB
  │   orbit (Maya-style) as a fallback.
  └── [SOLUTION] Add a navigation mode toggle: "Blender" (MMB), "Maya"
      (Alt+LMB), "Trackpad" (two-finger gestures).
```

---

## 1G. Data Persistence

```
[SCENARIO] Browser storage quota exceeded — work lost
  ├── [CAUSE] IndexedDB has browser-imposed storage limits. Chrome allows ~60%
  │   of free disk space per origin, but Safari limits to ~1 GB. Firefox has
  │   similar limits. A complex avatar project with textures can easily hit
  │   500 MB+.
  ├── [IMPACT] Critical — if save fails, user loses their work. Silent failures
  │   are the worst case.
  ├── [PREVENTION] Check available storage via navigator.storage.estimate()
  │   before saving. Warn when approaching 80% of quota. Offer "download
  │   project as .zip" as a primary save method, with IndexedDB as secondary.
  └── [SOLUTION] Implement cloud storage integration (Google Drive, Dropbox) as
      an alternative persistence layer. Show a clear error message if IndexedDB
      write fails, and immediately offer a download fallback.
```

```
[SCENARIO] IndexedDB data cleared by browser "clear site data"
  ├── [CAUSE] Users (or IT policies) clearing browser data, or using private/
  │   incognito mode where IndexedDB is ephemeral.
  ├── [IMPACT] Critical — all saved projects vanish with no warning.
  ├── [PREVENTION] Warn users on first visit: "Your work is stored in this
  │   browser. Export your projects regularly." Prompt for export after every
  │   major session. Check for persistent storage via navigator.storage.persist().
  └── [SOLUTION] Implement mandatory cloud backup or auto-download of project
      files at configurable intervals.
```

---

# EMULATOR 2: VROID STUDIO

**Implementation:** three-vrm + VRM format
**Real tool capabilities:** Slider-based anime avatar creation, hair drawing/painting, clothing templates, texture painting, VRM/XAvatar export

---

## 2A. File Format Issues

```
[SCENARIO] VRM 0.x vs VRM 1.0 spec incompatibility
  ├── [CAUSE] VRM has two major spec versions with different extension schemas.
  │   VRM 0.x uses VRMC_vrm_0 extensions; VRM 1.0 uses VRMC_vrm. The bone
  │   mapping, spring bone format, material properties, and expression system
  │   all changed between versions.
  ├── [IMPACT] High — if we support only one version, we lose compatibility
  │   with half the VRM ecosystem. VRChat's VRM Converter expects VRM 0.x.
  ├── [PREVENTION] Support both VRM 0.x and 1.0 import. Default export to
  │   VRM 0.x (widest VRChat compatibility). Offer VRM 1.0 export as option.
  └── [SOLUTION] Use @pixiv/three-vrm which supports both specs. Add version
      detection on import and auto-convert between versions internally.
```

```
[SCENARIO] XAvatar/XWear format cannot be handled in browser
  ├── [CAUSE] XAvatar is VRoid Studio's proprietary format. There is no public
  │   spec or parser. The format bundles avatar + outfit data in a way that
  │   only VRoid Studio can read natively.
  ├── [IMPACT] High — XWear is the recommended beginner path to VRChat. Users
  │   who create XWear outfits in our emulator can't use them in real VRoid.
  ├── [PREVENTION] Don't attempt XAvatar/XWear format. Work exclusively with
  │   VRM. Clearly communicate that our emulator exports VRM, not XAvatar.
  └── [SOLUTION] Provide VRM export and document the conversion path: export
      VRM from our emulator → import into real VRoid Studio → export as
      XAvatar if needed.
```

```
[SCENARIO] MToon shader properties lost during VRM round-trip
  ├── [CAUSE] VRM models use MToon shader with anime-specific properties:
  │   outline width/color, shade color, emission, rim lighting, UV animation.
  │   If our three-vrm renderer doesn't preserve all MToon parameters during
  │   save, the model will look different when re-imported.
  ├── [IMPACT] High — MToon is the visual identity of VRoid models. Losing
  │   shade colors or outlines makes the avatar look wrong.
  ├── [PREVENTION] Use three-vrm's MToonMaterial class which maps all MToon
  │   properties. Validate that every MToon parameter round-trips correctly by
  │   running automated export→import→compare tests.
  └── [SOLUTION] Store the full MToon parameter set in the VRM extensions block
      exactly as the spec requires. Don't approximate — preserve exact values.
```

```
[SCENARIO] Spring bone (hair/clothing physics) data format mismatch
  ├── [CAUSE] VRM spring bones define physics parameters (stiffness, gravity,
  │   drag, collision spheres) that differ between VRM 0.x and 1.0. Three-vrm
  │   handles both but the internal representation may lose precision.
  ├── [IMPACT] Medium — hair and clothing physics will feel different (stiffer,
  │   floatier, or clipping through body) when the model is used in VRChat.
  ├── [PREVENTION] Preserve spring bone parameters with full floating-point
  │   precision. Test physics behavior in our emulator against real VRM viewers
  │   (VSeeFace, VRoid Hub) as reference.
  └── [SOLUTION] Provide a physics preview mode with adjustable simulation
      speed so users can tune spring bone parameters visually. Include presets
      that match known-good VRChat configurations.
```

---

## 2B. Rendering Issues

```
[SCENARIO] MToon shader rendering differs from VRoid Studio's renderer
  ├── [CAUSE] VRoid Studio uses its own rendering engine. three-vrm's MToon
  │   implementation in WebGL will have differences in: shadow mapping, outline
  │   rendering (screen-space vs world-space width), shade color blending, and
  │   light response. Anti-aliasing differences are also visible.
  ├── [IMPACT] High — the avatar will look "off" compared to VRoid Studio.
  │   Colors may be darker, outlines thicker/thinner, shadows in wrong places.
  ├── [PREVENTION] Calibrate three-vrm's MToon against VRoid Studio screenshots
  │   with known lighting. Adjust default light intensity and shadow parameters
  │   to match as closely as possible.
  └── [SOLUTION] Offer a "VRoid Preview" lighting preset that approximates
      VRoid Studio's default scene lighting. Add side-by-side comparison
      screenshots in the docs.
```

```
[SCENARIO] Anime outline rendering broken or ugly at certain camera angles
  ├── [CAUSE] MToon outlines use inverted-hull or screen-space techniques. At
  │   extreme zoom or at mesh edges, outlines can flicker, disappear, or
  │   appear double-thick. Three.js back-face outlines behave differently
  │   from Unity's or VRoid's implementation.
  ├── [IMPACT] Medium — cosmetic issue but highly visible. Anime-style users
  │   care deeply about outline quality.
  ├── [PREVENTION] Use the three-vrm built-in outline pass. Test at zoom levels
  │   from 0.1x to 10x. Clamp outline width to prevent zero-width or
  │   infinite-width at extreme distances.
  └── [SOLUTION] Offer outline width override in emulator settings. Allow
      users to switch between "screen-space" and "world-space" outline modes.
```

```
[SCENARIO] Hair transparency / alpha sorting artifacts
  ├── [CAUSE] VRoid hair uses semi-transparent planes layered on top of each
  │   other. WebGL alpha sorting is notoriously broken — overlapping transparent
  │   objects render in wrong order, causing hair to appear inside-out or to
  │   flicker as the camera moves.
  ├── [IMPACT] High — hair is the most visually prominent feature of anime
  │   avatars. Broken hair transparency makes the whole avatar look bad.
  ├── [PREVENTION] Use alpha-to-coverage (MSAA) instead of alpha blending for
  │   hair materials. Sort transparent objects per-frame by camera distance.
  │   Use OIT (Order-Independent Transparency) if supported.
  └── [SOLUTION] Provide an "opaque hair" rendering mode that uses alpha cutoff
      instead of blending. Less pretty but avoids sorting issues entirely.
```

---

## 2C. Performance Issues

```
[SCENARIO] VRoid models with detailed hair exceed browser poly budgets
  ├── [CAUSE] VRoid Studio hair is the biggest polygon consumer. A detailed
  │   hairstyle can have 50K-100K polygons on its own. The full model with
  │   body + clothing + hair can exceed 100K triangles.
  ├── [IMPACT] Medium — the model will load and render but interaction (orbit,
  │   zoom, parameter editing) will lag on mid-range hardware.
  ├── [PREVENTION] Show a real-time polygon counter during hair editing. Warn
  │   when total model exceeds 70K tris (VRChat's "Good" PC threshold).
  │   Offer auto-decimation.
  └── [SOLUTION] Implement a "hair simplification" slider that reduces strand
      count and cross-section complexity in real-time. Map it to VRoid's
      "smoothness" parameter.
```

```
[SCENARIO] Texture painting on 3D model is laggy in browser
  ├── [CAUSE] VRoid allows painting directly on the avatar surface (world mode)
  │   and on UV maps (UV mode). Real-time 3D texture painting requires GPU
  │   readback (reading from the 3D surface to determine UV coordinates) and
  │   writing to a 2D canvas — both are expensive in WebGL.
  ├── [IMPACT] High — texture painting is core to VRoid's workflow (custom
  │   irises, skin details, clothing patterns). Laggy painting = unusable tool.
  ├── [PREVENTION] Use a render-target approach: render the model with UV
  │   coordinates as colors, read the pixel under the brush to get UV coords,
  │   paint to a 2D canvas at those coords. Batch GPU readbacks. Paint at
  │   half resolution and upscale.
  └── [SOLUTION] Prioritize UV mode painting (2D canvas, no GPU readback
      needed) and make world mode painting a "beta" feature. UV painting can
      be highly performant as it's just 2D canvas operations.
```

---

## 2D. Feature Parity Gaps

```
[SCENARIO] No procedural hair drawing system
  ├── [CAUSE] VRoid's hair editor lets you draw individual hair strands on a
  │   guide mesh, each with adjustable thickness, smoothness, cross-section,
  │   and physics parameters. This is a complex 3D drawing system with custom
  │   mesh generation — far beyond any existing browser tool.
  ├── [IMPACT] Critical — hair creation is VRoid's killer feature. Without it,
  │   the emulator is just a VRM viewer with sliders, not a VRoid emulator.
  ├── [PREVENTION] Build a simplified hair strand system: user draws paths on
  │   the head mesh, system generates ribbon geometry along the path. Support
  │   width, color, and basic spring bone parameters. This won't match VRoid's
  │   quality but provides the core experience.
  └── [SOLUTION] Offer pre-made hair presets (10-20 common styles) that users
      can swap and color-customize. For custom hair, direct them to real VRoid.
```

```
[SCENARIO] Slider-based face/body customization not as granular as real VRoid
  ├── [CAUSE] VRoid has ~100+ facial sliders and ~30+ body sliders, each
  │   controlling morph targets with carefully sculpted blend shapes. Recreating
  │   all these morph targets for our emulator requires significant 3D art work.
  ├── [IMPACT] High — if our sliders feel limited compared to VRoid, users will
  │   just use real VRoid instead.
  ├── [PREVENTION] Import VRoid's morph target data from a reference VRM file
  │   and map sliders to those existing blend shapes. This preserves VRoid's
  │   full customization range without recreating the art.
  └── [SOLUTION] Ship with a "base model" that includes all standard VRoid
      morph targets. Users start from this base and adjust sliders. For
      features we can't match, clearly label them as "available in VRoid
      Studio."
```

```
[SCENARIO] No XWear outfit swapping system
  ├── [CAUSE] XWear is VRoid's proprietary outfit format. It handles auto-fitting
  │   of clothing to different body shapes, clothing layering, and collision
  │   avoidance. The format spec is not public.
  ├── [IMPACT] High — XWear is the modern recommended path for VRChat avatar
  │   creation via VRoid. Missing it means missing VRoid's biggest UX advantage.
  ├── [PREVENTION] Build an equivalent component-swapping system using VRM
  │   accessories and bone-weighted clothing meshes. Won't be compatible with
  │   real XWear files but provides similar UX.
  └── [SOLUTION] Implement a "wardrobe" system that lets users swap clothing
      meshes attached to the same skeleton. Auto-refit via bone weight transfer
      from the base body to the clothing mesh.
```

```
[SCENARIO] No Closet / favorite models feature
  ├── [CAUSE] VRoid v2.7 added "Closet" for managing multiple avatars and
  │   outfits. This is a local file management system tied to VRoid's internal
  │   project format.
  ├── [IMPACT] Low — this is a convenience feature, not a creation feature.
  ├── [PREVENTION] Implement a simple project gallery in IndexedDB. Each saved
  │   avatar is a project card with a thumbnail.
  └── [SOLUTION] Standard web app project management. Gallery view with
      create/load/delete/duplicate.
```

---

## 2E. Export/Import Bridge Failures

```
[SCENARIO] VRM exported from our emulator fails in VRM Converter for VRChat
  ├── [CAUSE] VRM Converter for VRChat expects specific extension data, bone
  │   naming, and material configurations. If our VRM export is missing any
  │   required field or uses a non-standard value, the converter will error or
  │   produce a broken avatar.
  ├── [IMPACT] Critical — this is the primary pipeline to VRChat. If it breaks,
  │   the emulator is useless for its stated purpose.
  ├── [PREVENTION] Test exports against VRM Converter for VRChat in Unity as
  │   part of the build pipeline. Validate every VRM export against the official
  │   VRM JSON schema. Use the VRM validator tool from vrm-c/UniVRM.
  └── [SOLUTION] Maintain a test suite of known-good VRM files that pass
      through VRM Converter. Diff our exports against these references. Fix
      any deviations.
```

```
[SCENARIO] Viseme shape keys not recognized by VRChat after VRM conversion
  ├── [CAUSE] VRChat expects specific viseme blend shape names (vrc.v_aa,
  │   vrc.v_ch, vrc.v_dd, vrc.v_e, vrc.v_ff, vrc.v_ih, vrc.v_kk, vrc.v_nn,
  │   vrc.v_oh, vrc.v_ou, vrc.v_pp, vrc.v_rr, vrc.v_sil, vrc.v_ss, vrc.v_th).
  │   VRM uses its own expression system (Aa, Ih, Ou, Ee, Oh). The VRM
  │   Converter maps between them — if our VRM's expressions are malformed,
  │   the mapping fails.
  ├── [IMPACT] High — no lip sync = avatar's mouth doesn't move when talking.
  │   This is immediately noticeable and ruins the social experience.
  ├── [PREVENTION] Ensure our VRM export includes properly formatted VRM
  │   expression data (Aa, Ih, Ou, Ee, Oh at minimum). Test the full
  │   expression→viseme mapping pipeline end-to-end.
  └── [SOLUTION] Include a "VRChat viseme preview" in the emulator that plays
      through all 15 viseme shapes so users can verify before exporting.
```

```
[SCENARIO] Exported VRM has incorrect eye bone orientation for eye tracking
  ├── [CAUSE] VRChat's eye tracking requires LeftEye and RightEye bones to be
  │   oriented correctly (looking forward in the default pose). If bone
  │   orientation is off, eyes will look in wrong directions during tracking.
  ├── [IMPACT] Medium — eye tracking is optional but expected. Broken eye
  │   tracking is creepy (eyes looking sideways or rolling).
  ├── [PREVENTION] Validate eye bone orientation on export. Check that eye bones
  │   have correct rest pose (looking forward along the avatar's face normal).
  └── [SOLUTION] Add an "eye tracking test" mode that simulates VRChat's eye
      look behavior. Users can verify eyes follow a target object correctly.
```

---

## 2F. UX Friction

```
[SCENARIO] Slider-heavy interface feels different from VRoid's native UI
  ├── [CAUSE] VRoid Studio has a polished native app UI with custom widgets,
  │   tabbed sections, preview panels, and context-sensitive controls. A web
  │   recreation will use HTML/CSS controls that feel different.
  ├── [IMPACT] Medium — doesn't break functionality but reduces trust and
  │   comfort for VRoid users switching to our emulator.
  ├── [PREVENTION] Study VRoid Studio's layout carefully. Replicate the tab
  │   structure (Face, Hair, Body, Outfit). Use custom-styled sliders that
  │   match VRoid's visual language as closely as legally permissible.
  └── [SOLUTION] Focus on functionality over visual mimicry. Make the controls
      intuitive for VRoid users without being a pixel-perfect copy (which
      would raise trademark concerns).
```

```
[SCENARIO] No pen/stylus pressure sensitivity for hair drawing
  ├── [CAUSE] VRoid's hair editor responds to pen pressure (thickness varies
  │   with pressure). The Pointer Events API supports pressure but many
  │   browsers and devices report inaccurate or no pressure data.
  ├── [IMPACT] Medium — hair drawing without pressure feels flat and
  │   unresponsive for artists using tablets.
  ├── [PREVENTION] Use the Pointer Events API with pressure detection. Provide
  │   a "simulate pressure" toggle for devices that don't report it. Use
  │   stroke speed as a fallback pressure proxy.
  └── [SOLUTION] Offer both pressure-sensitive and fixed-width brush modes.
      Width slider as manual override.
```

---

## 2G. Data Persistence

```
[SCENARIO] VRM files too large for IndexedDB on Safari
  ├── [CAUSE] A VRM with 4K textures for body, face, hair, and clothing can
  │   exceed 100 MB. Safari's IndexedDB limit is approximately 1 GB total per
  │   origin. Storing 10+ avatars exceeds this.
  ├── [IMPACT] High — Safari users (including all iOS users) hit storage walls
  │   quickly.
  ├── [PREVENTION] Compress textures to WebP before storing in IndexedDB. Offer
  │   File System Access API (Chrome) for direct disk storage. Default save
  │   mechanism should be "download VRM file" not "save to browser."
  └── [SOLUTION] Implement tiered storage: IndexedDB for active project only,
      file downloads for archival. Cloud storage for cross-device access.
```

---

# EMULATOR 3: BOOTH.PM

**Implementation:** glb models + component system
**Real tool capabilities:** Marketplace browsing, pre-made avatar base purchasing, clothing/accessory ecosystem, .unitypackage delivery

---

## 3A. File Format Issues

```
[SCENARIO] .unitypackage files cannot be parsed in browser
  ├── [CAUSE] Booth avatar bases are distributed as .unitypackage files (tar.gz
  │   archives containing Unity-serialized assets, YAML scene files, meta files,
  │   prefabs, and FBX models). There is no browser-side .unitypackage parser.
  ├── [IMPACT] Critical — this is how every Booth avatar is delivered. If users
  │   can't import .unitypackage files, the Booth emulator is fundamentally
  │   broken.
  ├── [PREVENTION] Build a .unitypackage importer: unpack the tar.gz (pako.js
  │   or fflate), parse the YAML asset files, extract FBX models and textures,
  │   convert FBX→glTF using a server-side bridge.
  └── [SOLUTION] Two-tier approach: (1) Server-side .unitypackage→glb converter
      for full fidelity. (2) Client-side extraction of textures and metadata
      only, with pre-converted glb models hosted in our own asset library.
```

```
[SCENARIO] Poiyomi / lilToon shader properties lost in conversion to WebGL
  ├── [CAUSE] 90%+ of Booth avatars use Poiyomi Toon or lilToon shaders. These
  │   are Unity-specific shaders with hundreds of properties (emission maps,
  │   outline settings, rim lighting, dissolve effects, audio link, UV
  │   distortion, backface rendering). None of this maps to standard PBR or
  │   even MToon.
  ├── [IMPACT] Critical — the avatar will look completely different in our
  │   emulator vs Unity. Colors, effects, outlines, glow — all wrong or missing.
  ├── [PREVENTION] Build a Poiyomi→WebGL material converter that maps the most
  │   common Poiyomi properties to Three.js custom shaders. Cover: base color,
  │   shade color, outline, emission, normal map, metallic/smoothness. Accept
  │   that advanced features (audio link, dissolve, UV distortion) won't work.
  └── [SOLUTION] Create a "Poiyomi Lite" WebGL shader that handles the top 20
      most-used properties. For advanced properties, show a badge: "This effect
      is only visible in Unity." Provide a property list so users know what
      they're missing.
```

```
[SCENARIO] Avatar base includes Unity-specific components that have no web equivalent
  ├── [CAUSE] Booth avatars come pre-configured with VRChat components:
  │   PhysBones, Contact Receivers/Senders, Expression Menus, FX Layers,
  │   Animator Controllers. These are Unity C# components serialized in YAML.
  │   No web equivalent exists.
  ├── [IMPACT] High — the avatar loads as a static model without physics,
  │   expressions, or interactivity. The "fully configured" aspect of Booth
  │   avatars is lost.
  ├── [PREVENTION] Parse the YAML to extract PhysBone configurations and
  │   convert to VRM spring bone parameters. Extract expression menu data and
  │   convert to a web-friendly JSON format. Accept that FX layers and
  │   Animator Controllers cannot be replicated.
  └── [SOLUTION] Show extracted configuration data as a readable summary:
      "This avatar has 12 PhysBones, 8 expression toggles, face tracking
      support." Users understand what the avatar includes even if we can't
      simulate all features.
```

---

## 3B. Rendering Issues

```
[SCENARIO] Avatar looks nothing like the Booth product page screenshots
  ├── [CAUSE] Booth screenshots are taken in Unity with Poiyomi/lilToon shaders,
  │   specific lighting setups, post-processing, and sometimes in VRChat itself.
  │   Our WebGL renderer with approximated materials will look different.
  ├── [IMPACT] High — users will feel misled. "This doesn't look like what I
  │   bought" is a trust-destroying moment.
  ├── [PREVENTION] Include the Booth product page screenshots alongside the 3D
  │   preview with a label: "Product images are from Unity. Web preview is an
  │   approximation." Calibrate lighting to minimize the gap.
  └── [SOLUTION] Offer a "Unity preview" button that shows the original product
      screenshots in a lightbox, alongside the 3D preview for reference.
```

```
[SCENARIO] Multiple material slots cause excessive draw calls in browser
  ├── [CAUSE] Booth avatars commonly have 8-20 material slots (body, face,
  │   hair, eyes, clothing layers, accessories). Each material slot = 1 draw
  │   call in Three.js. 20 draw calls on a complex model with shadows = lag.
  ├── [IMPACT] Medium — preview performance degrades with material-heavy
  │   avatars. Not a crash, but noticeably laggy rotation/zoom.
  ├── [PREVENTION] Implement automatic material atlasing: combine textures and
  │   remap UVs to reduce draw calls. Offer "merged preview" vs "per-material
  │   preview" toggles.
  └── [SOLUTION] LOD system: show a simplified single-material preview by
      default. Load full multi-material version on demand ("Show full detail").
```

---

## 3C. Performance Issues

```
[SCENARIO] Booth avatars with 100K+ triangles render slowly
  ├── [CAUSE] Many popular Booth bases (Selestia: 107K tris, with shape keys)
  │   exceed VRChat's "Good" threshold. With morph targets, the effective
  │   memory footprint is multiplied (base mesh + N morph target deltas).
  ├── [IMPACT] Medium — viewport interaction (orbit, zoom) drops below 30 FPS
  │   on mid-range hardware.
  ├── [PREVENTION] Auto-decimate imported models to a preview LOD (30K tris)
  │   for viewport interaction. Show full detail only on "high quality preview"
  │   toggle. Use frustum culling and instanced rendering where possible.
  └── [SOLUTION] Implement progressive mesh loading: show a low-poly version
      immediately, stream full-detail mesh in the background.
```

```
[SCENARIO] Loading multiple avatar bases simultaneously for comparison
  ├── [CAUSE] Users want to compare 3-5 avatar bases side by side before
  │   choosing. Each base is 50-100 MB with textures. Loading 5 simultaneously
  │   = 250-500 MB GPU memory + 500 MB system RAM.
  ├── [IMPACT] Medium — comparison browsing is a key marketplace UX. Slow
  │   loading or crashes defeat the purpose.
  ├── [PREVENTION] Load only one full-quality model at a time. Use thumbnail
  │   renders (pre-captured snapshots) for comparison grid. Full 3D preview on
  │   click/hover.
  └── [SOLUTION] Implement a "compare" mode that loads 2 models max side by
      side, using reduced-quality textures (1024px instead of 4096px).
```

---

## 3D. Feature Parity Gaps

```
[SCENARIO] Cannot replicate Booth's purchase/download system
  ├── [CAUSE] Booth.pm is a marketplace with payments (JPY), creator accounts,
  │   download tokens, and DRM-free file delivery. We cannot replicate the
  │   commercial transaction infrastructure.
  ├── [IMPACT] High — the "marketplace" aspect of Booth is its core identity.
  │   Without it, we're just a 3D model viewer.
  ├── [PREVENTION] Don't try to replicate the marketplace. Instead, build a
  │   "component library" where users can browse and preview pre-loaded avatar
  │   bases and parts. Link to real Booth pages for purchasing.
  └── [SOLUTION] Curate a library of free/open-source avatar bases and
      components. For paid content, provide deep links to Booth product pages
      with preview images.
```

```
[SCENARIO] Clothing compatibility system ("fitted for X base") not possible
  ├── [CAUSE] Booth clothing items are made for specific avatar bases (e.g.,
  │   "fitted for Kikyo" or "fitted for Shinra"). The fitting is done via
  │   precise bone weight painting and shape keys that match the base body.
  │   This is a per-base, per-clothing manual art process.
  ├── [IMPACT] High — the clothing ecosystem is Booth's biggest value-add.
  │   8,000+ items for Kikyo alone. Without compatibility data, clothing
  │   doesn't fit properly.
  ├── [PREVENTION] For our component system, build fitting presets for the top
  │   5 most popular bases (Kikyo, Shinra, Selestia, Manuka, Komano). Use
  │   bone weight transfer algorithms to auto-fit clothing meshes to base
  │   body shapes.
  └── [SOLUTION] Implement a "smart fit" system: when a user loads a clothing
      item and a base body, auto-transfer bone weights from the body to the
      clothing mesh using nearest-surface-point mapping. Won't be perfect but
      gets 80% there.
```

```
[SCENARIO] Cannot run VRCFury / Modular Avatar prefabs
  ├── [CAUSE] VRCFury and Modular Avatar are Unity editor plugins that modify
  │   the avatar at build time (add PhysBones, merge components, apply toggles).
  │   They're C# code running inside Unity's editor. No web equivalent.
  ├── [IMPACT] Medium — many Booth items ship as VRCFury or Modular Avatar
  │   prefabs for one-click installation. Users can't use these in our emulator.
  ├── [PREVENTION] Parse VRCFury/Modular Avatar prefab files to extract the
  │   underlying configuration (what bones get PhysBones, what meshes get
  │   toggled). Display this as readable metadata.
  └── [SOLUTION] Show a "Unity Required" badge on items that include VRCFury/
      Modular Avatar prefabs. Provide the extracted configuration as a setup
      guide for when users move to real Unity.
```

---

## 3E. Export/Import Bridge Failures

```
[SCENARIO] Components assembled in our Booth emulator don't align when imported to Unity
  ├── [CAUSE] Our component system may use different pivot points, scales, or
  │   bone orientations than the original Booth assets. When the user exports
  │   and imports into Unity, pieces may be offset, rotated, or scaled wrong.
  ├── [IMPACT] High — the whole point is assembling a working avatar. If it
  │   falls apart in Unity, we've wasted the user's time.
  ├── [PREVENTION] Use the original asset's coordinate system and pivot points
  │   without modification. Store original transform data and re-apply on
  │   export. Test every export in Unity as part of QA.
  └── [SOLUTION] Include a ".cs setup script" with the export that automatically
      repositions components in Unity to match the emulator's assembly.
```

```
[SCENARIO] Texture resolution downgraded during component assembly
  ├── [CAUSE] Multiple high-res textures (4096x4096) for body + clothing + hair
  │   + accessories can exceed WebGL's max texture memory. The emulator may
  │   auto-downscale textures to fit, and then export the downscaled versions.
  ├── [IMPACT] High — users get worse textures than what they paid for.
  ├── [PREVENTION] Keep original texture files separate from the preview
  │   textures. Preview uses downscaled, export bundles originals. Never
  │   modify the original imported texture data.
  └── [SOLUTION] Two-pass export: preview quality (fast, smaller files) and
      original quality (slow, full-size textures from the stored originals).
```

---

## 3F. UX Friction

```
[SCENARIO] Language barrier — Booth content is primarily in Japanese
  ├── [CAUSE] Booth.pm is a Japanese marketplace. Product names, descriptions,
  │   setup guides, and compatibility lists are in Japanese. Our emulator
  │   inherits this problem.
  ├── [IMPACT] Medium — English-speaking users can't read product details or
  │   setup instructions.
  ├── [PREVENTION] For our curated component library, translate descriptions
  │   and compatibility data to English. Use machine translation as a starting
  │   point and review for accuracy.
  └── [SOLUTION] Integrate a translation layer (browser's built-in translation
      API or a translation service) for user-imported content.
```

```
[SCENARIO] Users expect to search/browse like Booth but our library is limited
  ├── [CAUSE] Booth has 38,000+ VRChat-related items. Our curated library will
  │   have maybe 50-200 free/demo items. The browsing experience will feel
  │   empty by comparison.
  ├── [IMPACT] Medium — manages expectations. Users coming from Booth will be
  │   underwhelmed by our catalog size.
  ├── [PREVENTION] Be upfront: "This is a preview library, not a marketplace.
  │   Visit Booth.pm for the full catalog." Include search by category, tag,
  │   and compatibility.
  └── [SOLUTION] Allow users to import their own purchased Booth assets (via
      .unitypackage upload or glb drag-and-drop). The library is for discovery;
      imported assets are for real work.
```

---

## 3G. Data Persistence

```
[SCENARIO] Assembled avatar configurations not saved between sessions
  ├── [CAUSE] Users spend time fitting clothing, adjusting colors, and
  │   positioning accessories. If the browser is closed without explicit save,
  │   all assembly work is lost.
  ├── [IMPACT] High — re-doing assembly work is tedious. Users expect auto-save.
  ├── [PREVENTION] Auto-save assembly state to IndexedDB every 30 seconds.
  │   Store the bill-of-materials (which components are loaded, their
  │   transforms, and material overrides) as a lightweight JSON — not the
  │   full model data.
  └── [SOLUTION] Implement "save as project" that exports a JSON manifest +
      references to the model files. Quick to save, quick to reload.
```

---

# EMULATOR 4: UNITY + VRCHAT SDK

**Implementation:** Web-based scene editor + JSON configs
**Real tool capabilities:** Avatar descriptor setup, PhysBones, expression menus, FX layers, animator controllers, build validation, upload to VRChat servers

---

## 4A. File Format Issues

```
[SCENARIO] Unity scene files (.unity) and prefabs (.prefab) cannot be parsed
  ├── [CAUSE] Unity scenes and prefabs are serialized in a custom YAML format
  │   with Unity-specific object references (fileID, guid). Parsing them
  │   requires understanding Unity's serialization system, asset database,
  │   and component architecture.
  ├── [IMPACT] Critical — the entire Unity experience is built around scenes
  │   and prefabs. Without parsing them, we can't load existing Unity projects.
  ├── [PREVENTION] Build a Unity YAML parser that extracts: GameObject hierarchy,
  │   Transform data, component types and their serialized properties. Focus
  │   on VRChat-specific components only (VRC Avatar Descriptor, PhysBone,
  │   Contact, Expression Menu).
  └── [SOLUTION] Accept that we can't load arbitrary Unity projects. Instead,
      import individual assets (FBX/glb models) and provide our own web-based
      configuration interface for VRChat components. The "Unity emulator" is
      really a "VRChat avatar configurator."
```

```
[SCENARIO] Animator Controller (.controller) files cannot be interpreted
  ├── [CAUSE] Unity Animator Controllers are state machines with transitions,
  │   conditions, blend trees, and layer weights. They're serialized in Unity's
  │   YAML with internal references. FX layers for VRChat are critical (they
  │   control expression toggles, gesture animations, etc.).
  ├── [IMPACT] High — FX layers are how advanced VRChat avatar features work
  │   (toggle clothing, change colors, play animations via gestures). Without
  │   them, the avatar is static.
  ├── [PREVENTION] Build a simplified state machine editor in the browser.
  │   Support the subset needed for VRChat: states with motion clips, bool/int
  │   parameter transitions, layer weight control. Export as JSON that can be
  │   converted back to Unity .controller format.
  └── [SOLUTION] For complex FX layers, generate the .controller YAML
      programmatically from our JSON config. Ship a Unity editor script that
      imports our JSON and builds the Animator Controller in Unity.
```

```
[SCENARIO] VRChat SDK validation rules not fully replicated
  ├── [CAUSE] The VRChat SDK runs validation checks in Unity before upload:
  │   bone count, triangle count, material count, mesh renderer count, particle
  │   limits, PhysBone limits, etc. These rules change with each SDK version.
  ├── [IMPACT] High — if we don't validate, users will configure an avatar in
  │   our emulator that fails SDK validation when they try to upload in Unity.
  ├── [PREVENTION] Maintain a JSON copy of VRChat's validation rules (scraped
  │   from SDK source and docs). Run these checks in our emulator before export.
  │   Update the rules when the SDK updates.
  └── [SOLUTION] Show VRChat performance rank estimation (Excellent, Good,
      Medium, Poor, Very Poor) in real-time as users configure. Flag issues
      early.
```

---

## 4B. Rendering Issues

```
[SCENARIO] VRChat's Standard Lite / Toon Standard shaders not available in WebGL
  ├── [CAUSE] VRChat ships proprietary shaders (Standard Lite for Quest, Toon
  │   Standard for mobile-compatible rendering). These are Unity shaders
  │   compiled for specific render pipelines and cannot run in WebGL.
  ├── [IMPACT] Medium — our preview won't match what the avatar looks like
  │   in VRChat. But since most avatars use Poiyomi/lilToon anyway (not
  │   VRChat's built-in shaders), this affects a minority of users.
  ├── [PREVENTION] Build WebGL approximations of Standard Lite and Toon
  │   Standard. Match the key parameters: color, texture, metallicness,
  │   smoothness, emission.
  └── [SOLUTION] Focus shader effort on Poiyomi/lilToon approximation (much
      higher usage) rather than VRChat's built-in shaders.
```

```
[SCENARIO] Scene lighting in our editor doesn't match Unity's default lighting
  ├── [CAUSE] Unity uses a specific default skybox, ambient light mode (skybox
  │   ambient), and directional light configuration. VRChat worlds have their
  │   own lighting. Our web editor will have different default lighting.
  ├── [IMPACT] Medium — the avatar will look different in our preview vs Unity
  │   vs VRChat. This causes confusion about material colors and quality.
  ├── [PREVENTION] Replicate Unity's default lighting setup: directional light
  │   at rotation (50, -30, 0), intensity 1, color #FFF4D6, ambient intensity
  │   0.5-1.0 with a neutral grey skybox. Match color space (Linear).
  └── [SOLUTION] Offer lighting presets: "Unity Default," "VRChat Indoor,"
      "VRChat Outdoor," "Neutral Studio." Help users preview under different
      conditions.
```

```
[SCENARIO] PhysBone simulation doesn't match VRChat's actual physics
  ├── [CAUSE] VRChat's PhysBone system uses a specific spring simulation with
  │   custom gravity, stiffness, and collision detection algorithms. Our web
  │   simulation will use a generic spring bone implementation (from three-vrm
  │   or custom) that behaves differently.
  ├── [IMPACT] Medium — hair and clothing physics will feel different between
  │   our preview and VRChat. Not a data issue but a trust issue.
  ├── [PREVENTION] Study VRChat's PhysBone documentation and match parameters
  │   as closely as possible. Use the same parameter names and ranges. Test
  │   with reference avatars that have known PhysBone configurations.
  └── [SOLUTION] Label our physics preview as "approximate." Provide parameter
      ranges with tooltips: "In VRChat, this value will feel approximately
      [description]."
```

---

## 4C. Performance Issues

```
[SCENARIO] Scene editor with multiple components becomes unresponsive
  ├── [CAUSE] A fully configured VRChat avatar can have: mesh renderers, 12+
  │   PhysBones with colliders, contact receivers/senders, expression menu
  │   references, animator controllers, and audio sources. Rendering all
  │   component gizmos (bones, colliders, contact spheres) simultaneously in
  │   WebGL is expensive.
  ├── [IMPACT] Medium — the editor becomes laggy when all visualization layers
  │   are active, making configuration tedious.
  ├── [PREVENTION] Toggle component visualization layers independently. Default
  │   to showing only the currently-selected component type. Use simple
  │   primitives (lines, wireframe spheres) for gizmos, not full meshes.
  └── [SOLUTION] Implement an "inspect mode" that disables 3D rendering and
      shows component data as a clean form/tree view. Users configure
      components in form mode and preview in 3D mode separately.
```

```
[SCENARIO] Expression menu tree becomes too deep/complex for web UI
  ├── [CAUSE] VRChat expression menus support nested sub-menus up to 3 levels
  │   deep, with up to 8 controls per menu. Advanced avatars have 30-50+
  │   expression parameters and complex toggle trees.
  ├── [IMPACT] Low — UI complexity, not a performance issue. But deeply nested
  │   menus are harder to build and navigate in a web UI.
  ├── [PREVENTION] Build a tree editor (collapsible nested lists) for expression
  │   menus. Support drag-and-drop reordering. Limit to VRChat's actual
  │   constraints (3 levels, 8 per menu, 256 total memory bits).
  └── [SOLUTION] Provide templates for common expression menu setups (clothing
      toggles, color swaps, emote wheel). Users can start from a template and
      modify.
```

---

## 4D. Feature Parity Gaps

```
[SCENARIO] Cannot actually upload to VRChat from the browser
  ├── [CAUSE] VRChat upload requires: (1) Unity SDK authentication with VRChat
  │   credentials, (2) Unity's asset bundling system to create the .vrca file,
  │   (3) Upload to VRChat's API endpoint with authentication tokens. This
  │   pipeline is Unity-specific and not exposed as a public API.
  ├── [IMPACT] Critical — the final step of the entire pipeline cannot happen
  │   in our emulator. Users must still use Unity for the actual upload.
  ├── [PREVENTION] Be upfront: our emulator is a "configurator" that prepares
  │   everything for Unity. It does NOT replace the Unity upload step. Provide
  │   a one-click export that generates a ready-to-upload Unity project.
  └── [SOLUTION] Generate a .unitypackage or a structured project folder that
      users can open in Unity. Include a one-click "Build & Upload" script
      that runs automatically when the project opens. Minimize the Unity
      interaction to literally one click.
```

```
[SCENARIO] Cannot build avatar asset bundles (.vrca) outside Unity
  ├── [CAUSE] .vrca files are Unity asset bundles compiled for specific
  │   platforms (PC/Windows, Android/Quest). The build process requires Unity's
  │   BuildPipeline API, which only runs inside Unity Editor.
  ├── [IMPACT] Critical — no asset bundle = no upload. This is a hard technical
  │   wall.
  ├── [PREVENTION] Don't try to build asset bundles in the browser. Instead,
  │   offer a cloud build service: user sends their configured avatar data to
  │   a server running headless Unity, which builds and uploads on their behalf.
  └── [SOLUTION] Cloud build pipeline: (1) User exports avatar config from our
      web emulator, (2) Config is sent to a server with Unity installed,
      (3) Server builds .vrca for PC and Quest, (4) Server uploads to VRChat
      using user's auth token. This requires VRChat API access and user
      authentication — significant infrastructure.
```

```
[SCENARIO] No "Build & Test" local preview
  ├── [CAUSE] Unity's "Build & Test" launches a local VRChat client instance
  │   with the avatar loaded. This requires the VRChat desktop client installed
  │   locally. Cannot replicate in browser.
  ├── [IMPACT] Medium — users can't test their avatar in a VRChat-like
  │   environment before uploading. They have to trust our preview.
  ├── [PREVENTION] Build the best possible web preview: show the avatar from
  │   multiple angles, with animation playback, expression testing, physics
  │   simulation, and mirror mode (like VRChat's mirror).
  └── [SOLUTION] Implement a "VRChat Mirror" preview mode that mimics VRChat's
      in-game mirror. Play idle animation, respond to mouse-simulated head
      tracking, show expression menu toggles. Not a replacement but the best
      web approximation.
```

```
[SCENARIO] Humanoid rig configuration/bone mapping not possible in browser
  ├── [CAUSE] Unity's humanoid rig mapper is a complex UI that analyzes the
  │   skeleton hierarchy, auto-maps bones to humanoid slots, and lets users
  │   manually reassign misidentified bones. It requires understanding of
  │   Unity's Avatar system.
  ├── [IMPACT] High — incorrect bone mapping = broken avatar (wrong limbs
  │   moving, T-pose issues, no IK tracking).
  ├── [PREVENTION] Build a web-based bone mapper: display the skeleton as an
  │   interactive tree, auto-map bones by name matching (Hips→Hips, Head→Head,
  │   LeftUpperArm→Left Upper Arm), show a human silhouette with slots that
  │   users can drag-assign.
  └── [SOLUTION] Use heuristic bone mapping: match by name patterns (case-
      insensitive, multiple naming conventions), then by hierarchy position
      (the bone 3 levels below root on the left side is probably LeftUpperArm).
      Show confidence scores and let users correct mistakes.
```

---

## 4E. Export/Import Bridge Failures

```
[SCENARIO] Generated Unity project has wrong SDK version or missing packages
  ├── [CAUSE] Our export generates a Unity project targeting a specific SDK
  │   version. If VRChat updates their SDK (which happens every few months),
  │   our generated project may be incompatible.
  ├── [PREVENTION] Track the current VRChat SDK version in our app config.
  │   Update the export template when SDK changes. Show a warning if our
  │   template is outdated.
  ├── [IMPACT] High — wrong SDK version = Unity errors on project open,
  │   potentially losing the user's configuration.
  └── [SOLUTION] Generate a VCC-compatible project manifest (vpm-manifest.json)
      that lets VCC auto-update SDK packages when the project is opened. This
      way VCC handles version management, not us.
```

```
[SCENARIO] PhysBone/Contact/Expression configs don't survive the web→Unity bridge
  ├── [CAUSE] Our JSON config format for VRChat components must be converted to
  │   Unity serialized YAML. Any field missed, renamed, or formatted wrong
  │   means the component won't load in Unity.
  ├── [IMPACT] High — users configure PhysBones, contacts, and expressions in
  │   our editor, export to Unity, and find them missing. All configuration
  │   work wasted.
  ├── [PREVENTION] Maintain a tested mapping between every VRChat component
  │   property and its Unity YAML serialization. Automated round-trip tests:
  │   generate YAML, import into Unity (headless), verify components loaded.
  └── [SOLUTION] Ship a Unity editor script that reads our JSON config and
      applies it to the avatar in Unity. This avoids YAML serialization
      entirely — the script creates components programmatically.
```

---

## 4F. UX Friction

```
[SCENARIO] Users expect Unity's full editor but get a stripped-down web tool
  ├── [CAUSE] Unity is a full game engine IDE with project management, asset
  │   browser, inspector, hierarchy, scene view, game view, console, animation
  │   timeline, and hundreds of menus. Our web "emulator" will have maybe 10%
  │   of this surface area.
  ├── [IMPACT] High — experienced Unity users will feel constrained. Beginners
  │   won't know the difference but may be confused by tutorials that reference
  │   Unity features we don't have.
  ├── [PREVENTION] Don't pretend to be Unity. Label the tool as "VRChat Avatar
  │   Configurator" not "Unity Editor." Focus the UI entirely on avatar-specific
  │   tasks. Remove all non-avatar Unity features.
  └── [SOLUTION] Design a purpose-built UI that's simpler and more guided than
      Unity. Step-by-step wizard: (1) Import model, (2) Configure rig,
      (3) Set view position, (4) Add PhysBones, (5) Build expression menu,
      (6) Validate, (7) Export. This is actually better UX than Unity for the
      specific task of avatar setup.
```

```
[SCENARIO] SDK validation messages don't match real SDK wording
  ├── [CAUSE] Our validation checks may use different thresholds, different
  │   wording, or miss edge cases that the real SDK catches. Users who look
  │   up error messages online won't find help for our custom messages.
  ├── [IMPACT] Low — minor friction. Causes confusion when cross-referencing
  │   with VRChat documentation.
  ├── [PREVENTION] Mirror the exact wording and thresholds from VRChat's SDK
  │   source code. VRChat SDK is partially open-source on GitHub.
  └── [SOLUTION] Link each validation message to the relevant VRChat
      documentation page.
```

---

## 4G. Data Persistence

```
[SCENARIO] Complex avatar configurations lost when browser crashes during editing
  ├── [CAUSE] Configuring an avatar with PhysBones, expressions, and FX layers
  │   can take 1-2 hours. If the browser crashes or the tab is accidentally
  │   closed during this process, everything is lost.
  ├── [IMPACT] High — 1-2 hours of tedious configuration work lost. User won't
  │   return.
  ├── [PREVENTION] Auto-save entire configuration state to IndexedDB every 15
  │   seconds. On page load, check for recovered sessions and offer to restore.
  └── [SOLUTION] Implement "configuration snapshots" that let users manually
      save named checkpoints. Auto-save runs in parallel.
```

---

# EMULATOR 5: TAFI

**Implementation:** Modular glb parts + web configurator
**Real tool capabilities:** Component-based avatar building (400+ parts), morph-based customization, auto-refitting, auto-optimization for PC+Quest, direct VRChat upload

---

## 5A. File Format Issues

```
[SCENARIO] Tafi's proprietary component format cannot be reverse-engineered
  ├── [CAUSE] Tafi uses its Astra SDK engine with proprietary mesh formats,
  │   morph systems, and auto-refit algorithms. These are not documented or
  │   publicly available. The component data never leaves Tafi's ecosystem
  │   as editable files.
  ├── [IMPACT] High — we cannot use actual Tafi components. Our emulator must
  │   use our own component library built with standard glb files.
  ├── [PREVENTION] Build our own modular component system using standard glb
  │   parts. Don't try to replicate Tafi's proprietary library. Instead,
  │   create a Tafi-like experience with open formats.
  └── [SOLUTION] Create/curate a library of CC0/open-license modular avatar
      parts (bodies, hair, clothing, accessories) in glb format. Organize
      them by the same categories Tafi uses (body, skin, hair, eyes, clothing).
```

```
[SCENARIO] Morph target system incompatible between our components and Tafi's
  ├── [CAUSE] Tafi uses Daz 3D's morph system (Genesis platform) with named
  │   morphs for body shape, facial features, and species blending. Our glb
  │   components will have different morph target names and ranges.
  ├── [IMPACT] Medium — no cross-compatibility with real Tafi. But since Tafi
  │   doesn't export files anyway (direct upload only), this is expected.
  ├── [PREVENTION] Define our own morph naming convention that covers the same
  │   customization dimensions: body_height, body_weight, face_jaw_width,
  │   face_eye_size, etc.
  └── [SOLUTION] Standardize on a morph target schema documented in our project.
      All component creators must follow this schema for parts to be compatible.
```

---

## 5B. Rendering Issues

```
[SCENARIO] Component seams visible where body parts meet
  ├── [CAUSE] When assembling modular glb parts (torso connects to arms, head
  │   connects to neck), the mesh edges may not align perfectly. Differences
  │   in vertex positions, normals, or UVs at seam boundaries cause visible
  │   gaps, dark lines, or texture discontinuities.
  ├── [IMPACT] High — visible seams make the avatar look broken. This is the
  │   #1 problem in any modular avatar system.
  ├── [PREVENTION] Enforce a standardized boundary specification: all components
  │   must have identical vertex positions and normals at connection points.
  │   Define "connection rings" — specific vertex loops with exact coordinates
  │   that all components must match.
  └── [SOLUTION] Implement seam welding: automatically merge vertices within a
      tolerance threshold at connection points. Smooth normals across the seam.
      Apply a seam-blending shader (lerp between materials at the boundary).
```

```
[SCENARIO] Mixed art styles between components look incoherent
  ├── [CAUSE] Tafi has a unified art style (stylized, low-poly, Fortnite-esque)
  │   because all components are made by the same team. Our open component
  │   library will have contributions from different creators with different
  │   art styles, detail levels, and color palettes.
  ├── [IMPACT] Medium — functional but visually jarring. A realistic hair piece
  │   on a stylized body looks wrong.
  ├── [PREVENTION] Establish art style guidelines for component creators: poly
  │   density range, texture style (cel-shaded vs PBR), color palette rules.
  │   Tag components by art style and only show compatible parts together.
  └── [SOLUTION] Implement a "style filter" that adjusts rendering (outline
      width, shade threshold, color saturation) to unify disparate components
      visually. Not perfect but reduces visual clash.
```

---

## 5C. Performance Issues

```
[SCENARIO] Auto-refitting (adjusting clothing to body shape) is too slow in real-time
  ├── [CAUSE] Tafi's Astra engine handles auto-refit natively at runtime. In
  │   our web implementation, refitting requires: transferring bone weights,
  │   projecting clothing mesh onto body surface, resolving intersections, and
  │   updating normals. This is expensive geometry processing.
  ├── [IMPACT] High — if changing body shape takes 5+ seconds to update clothing,
  │   the interactive slider experience is ruined.
  ├── [PREVENTION] Pre-compute refit data: for each body morph, pre-calculate
  │   clothing vertex offsets and store as a displacement map or morph target
  │   delta. Apply displacements instantly via GPU. This requires upfront
  │   preprocessing per clothing item but enables real-time adjustment.
  └── [SOLUTION] Use a simplified refit algorithm: scale clothing bones to match
      body bone transforms (no mesh-level projection). Less accurate but
      real-time. Show "refitting..." progress for complex cases.
```

```
[SCENARIO] Too many components loaded simultaneously exceed GPU budget
  ├── [CAUSE] A fully dressed avatar might have: body mesh + head mesh + hair
  │   mesh + shirt + pants + shoes + accessories (hat, glasses, watch, necklace).
  │   Each is a separate draw call with its own textures. 10+ meshes with 4K
  │   textures = significant GPU load.
  ├── [IMPACT] Medium — viewport lag when the avatar has many accessories
  │   equipped.
  ├── [PREVENTION] Merge equipped components into a single mesh before
  │   rendering. Atlas textures automatically. This reduces draw calls from
  │   10+ to 1-2.
  └── [SOLUTION] Implement LOD: show merged single-mesh version during
      interaction, show individual components only when editing a specific part.
```

---

## 5D. Feature Parity Gaps

```
[SCENARIO] No direct upload to VRChat (same as real Tafi's key feature)
  ├── [CAUSE] Real Tafi uploads directly to VRChat via a proprietary API
  │   integration. We don't have access to VRChat's upload API from a web
  │   browser, and we can't replicate Tafi's partnership deal.
  ├── [IMPACT] Critical — Tafi's entire value proposition is "build and upload
  │   without Unity." Without upload, our emulator is just a dress-up game.
  ├── [PREVENTION] Acknowledge this limitation upfront. Position our emulator as
  │   "build and preview" with export to Unity for upload. OR invest in the
  │   cloud build pipeline described in Emulator 4 (Section 4D).
  └── [SOLUTION] Cloud build service: user finalizes avatar in our emulator →
      we send configured glb to server → server imports into Unity, configures
      VRChat components, builds, and uploads → user gets their avatar in VRChat.
      This is the killer feature if we can build it.
```

```
[SCENARIO] Auto-optimization for Quest (polygon reduction, material merging) not available
  ├── [CAUSE] Tafi automatically generates PC and Quest versions simultaneously
  │   using Astra's decimation system. Our emulator would need to implement
  │   mesh decimation, texture atlasing, and material merging in the browser.
  ├── [IMPACT] High — Quest compatibility is a major concern for VRChat users.
  │   Many VRChat players are on Quest and can't see "Very Poor" avatars.
  ├── [PREVENTION] Implement browser-based mesh decimation using a WASM port
  │   of meshoptimizer or simplify.js. Auto-merge materials and atlas textures.
  │   Target VRChat Quest "Medium" rank: 15K tris, 2 materials, 75 bones.
  └── [SOLUTION] Show side-by-side PC/Quest preview. Let users manually adjust
      decimation level. Export both versions. Include VRChat performance rank
      estimation for both platforms.
```

```
[SCENARIO] Rarity/premium item system cannot be replicated
  ├── [CAUSE] Tafi's business model includes paid premium components gated by
  │   rarity. Replicating this requires a payment system, content licensing,
  │   and DRM.
  ├── [IMPACT] Low — our emulator isn't a commercial product. All components
  │   in our library should be free to use.
  ├── [PREVENTION] Use only CC0/open-license components. Don't build a payment
  │   system. If users want premium content, direct them to real Tafi.
  └── [SOLUTION] Community contribution model: users can upload and share
      components they've created, building the library organically.
```

---

## 5E. Export/Import Bridge Failures

```
[SCENARIO] Assembled avatar has too many bones/materials for VRChat after component merging
  ├── [CAUSE] Each component may have its own skeleton with additional bones
  │   (jewelry bone chains, hat bones, cape bones). Combining 10 components
  │   can result in 500+ bones and 20+ materials — far exceeding VRChat limits.
  ├── [IMPACT] High — avatar gets ranked "Very Poor" and is hidden from most
  │   other players on Quest. May fail SDK validation entirely.
  ├── [PREVENTION] Show real-time VRChat performance rank as components are
  │   added. Warn when approaching thresholds. Offer automatic bone merging
  │   and material atlasing.
  └── [SOLUTION] "Optimize for VRChat" button: auto-merge bones below a
      threshold, combine materials into atlas, decimate mesh. Show before/after
      stats and visual comparison.
```

```
[SCENARIO] Morph targets don't transfer correctly from web configurator to FBX/glTF
  ├── [CAUSE] Body shape morphs applied in our configurator need to be baked
  │   into the mesh geometry on export. If morph deltas are applied incorrectly
  │   or only partially, the exported model won't match the preview.
  ├── [IMPACT] High — the avatar looks different in Unity than it did in our
  │   emulator. Body proportions, face shape, etc. are wrong.
  ├── [PREVENTION] Bake all active morph targets into the base mesh before
  │   export. Verify by reimporting the exported file and comparing against
  │   the preview.
  └── [SOLUTION] Export both baked mesh AND morph target data. This lets users
      further adjust in Unity/Blender if needed.
```

---

## 5F. UX Friction

```
[SCENARIO] Component browsing is slower than Tafi's native app
  ├── [CAUSE] Tafi loads components from local storage (fast). Our web emulator
  │   loads components over the network (slow). Browsing 400+ components with
  │   3D previews requires significant bandwidth.
  ├── [IMPACT] Medium — slow browsing discourages exploration. Users settle for
  │   the first few options they see.
  ├── [PREVENTION] Use 2D thumbnail images for browsing, not 3D previews. Load
  │   3D preview only on click/hover. Lazy-load component categories. Cache
  │   thumbnails aggressively.
  └── [SOLUTION] Implement a CDN-backed asset library. Use progressive loading:
      thumbnails → low-res 3D → full-res 3D. Pre-cache popular categories.
```

```
[SCENARIO] 3-slot avatar limit doesn't apply but users expect it
  ├── [CAUSE] Real Tafi limits users to 3 upload slots. Our emulator has no
  │   such limit (we're not uploading directly). This mismatch may confuse
  │   users who switch between real Tafi and our emulator.
  ├── [IMPACT] Low — actually a positive difference. More freedom for users.
  ├── [PREVENTION] No prevention needed. Document that our emulator has
  │   unlimited saves.
  └── [SOLUTION] If users ask about slot limits, explain that the limit is a
      Tafi platform restriction, not a technical one.
```

---

## 5G. Data Persistence

```
[SCENARIO] Component library updates break saved avatar configurations
  ├── [CAUSE] If we update a component (fix a mesh bug, improve textures),
  │   saved avatars referencing the old version may break: component IDs change,
  │   attachment points shift, morph targets renamed.
  ├── [IMPACT] High — users' saved work stops loading correctly after an update.
  ├── [PREVENTION] Version all components. Saved configurations reference
  │   specific versions. Never delete old versions — keep them accessible.
  │   New versions are additive.
  └── [SOLUTION] Implement a "migration" system: when loading an old config
      with outdated component versions, offer to upgrade each component. Show
      what changed. Let users roll back individual components.
```

---

# CROSS-EMULATOR FAILURES

**These scenarios affect the shared infrastructure and the interactions between the 5 emulator tabs.**

---

## 6A. Cross-Emulator Compatibility

```
[SCENARIO] Model created in Blender emulator doesn't load correctly in Unity emulator tab
  ├── [CAUSE] Internal data format differences between emulators: Blender
  │   emulator stores models as Three.js objects, Unity emulator expects a
  │   different component structure. Coordinate systems, material formats,
  │   and bone hierarchies may not align.
  ├── [IMPACT] Critical — the entire point of the unified app is seamless
  │   workflow between tools. If cross-tab transfer breaks, users must
  │   export/reimport manually (defeating the purpose).
  ├── [PREVENTION] Define a single internal data format (IDF) that all 5
  │   emulators use. Every emulator reads from and writes to this format.
  │   The IDF should be a superset of glTF with VRChat-specific extensions.
  └── [SOLUTION] Implement a "format bus" — a shared data layer that handles
      conversion between emulators. When switching tabs, the bus converts
      the model from the source emulator's view to the target emulator's
      view automatically.
```

```
[SCENARIO] VRoid model moved to Blender emulator loses anime-specific data
  ├── [CAUSE] VRM-specific data (spring bones, VRM expressions, MToon material
  │   properties) has no equivalent in the Blender emulator's data model.
  │   Moving to Blender discards this data; moving back to VRoid loses it
  │   permanently.
  ├── [IMPACT] High — users expect to move freely between tools without losing
  │   work. Losing spring bone configurations is hours of re-work.
  ├── [PREVENTION] Preserve VRM-specific data in the IDF even when the Blender
  │   emulator doesn't display or edit it. On transfer to VRoid, the data is
  │   still there. Clearly warn users: "Spring bone data will be hidden but
  │   preserved in the Blender editor."
  └── [SOLUTION] The IDF stores ALL data from all emulators. Each emulator
      shows only the data it can edit but never deletes data it doesn't
      understand. "Carry all, show relevant."
```

```
[SCENARIO] Tafi-assembled avatar cannot be disassembled in Blender emulator
  ├── [CAUSE] Tafi's component system assembles parts into a single avatar. If
  │   the assembly process merges meshes, welds vertices, or bakes morph
  │   targets, the result is a monolithic mesh — not separable back into parts.
  ├── [IMPACT] Medium — limits the edit-after-assembly workflow. Users can't
  │   modify individual pieces after assembling.
  ├── [PREVENTION] Keep component boundaries as metadata even after visual
  │   merging. Each vertex retains a "source component" tag. The Blender
  │   emulator can isolate and edit individual components using these tags.
  └── [SOLUTION] Implement "non-destructive assembly": components are displayed
      merged but stored separately. Editing one component in Blender emulator
      triggers a live-update in the Tafi view.
```

```
[SCENARIO] Booth base + VRoid clothing + Blender edits don't combine cleanly
  ├── [CAUSE] Each emulator may apply different transformations: Booth imports
  │   at one scale, VRoid at another, Blender edits may change the skeleton.
  │   Combining outputs from 3 different emulators creates compounding
  │   misalignment errors.
  ├── [IMPACT] High — the "mix and match across tools" use case is the app's
  │   killer scenario. If it fails, the unified approach has no advantage over
  │   separate tools.
  ├── [PREVENTION] Enforce a single skeleton standard across all emulators
  │   (VRChat humanoid rig). All models are normalized to the same scale,
  │   orientation, and bone hierarchy upon import. No emulator is allowed to
  │   modify the core skeleton without propagating changes to all tabs.
  └── [SOLUTION] Implement a "skeleton compatibility check" that runs when
      crossing between emulators. Flag and auto-fix: scale mismatches, bone
      name differences, hierarchy deviations.
```

---

## 6B. Browser Compatibility

```
[SCENARIO] Safari WebGL 2.0 limitations break rendering
  ├── [CAUSE] Safari's WebGL 2.0 support has known gaps: no GPU compute shaders,
  │   limited texture format support, lower max texture size (4096 vs 16384 on
  │   Chrome), inconsistent extension support (EXT_float_blend,
  │   OES_texture_float_linear), and slower shader compilation.
  ├── [IMPACT] High — Safari is the default browser on all Apple devices.
  │   Excluding Safari excludes all iPhone/iPad users and many Mac users.
  ├── [PREVENTION] Test on Safari regularly. Use feature detection for every
  │   WebGL extension. Provide fallback shaders for Safari-incompatible
  │   features. Limit texture sizes to 4096 max. Avoid compute shaders.
  └── [SOLUTION] Implement a "compatibility mode" for Safari that uses simpler
      shaders, lower texture resolutions, and disables features that cause
      crashes (shadow maps on older Safari, certain blend modes).
```

```
[SCENARIO] WebGL context lost during complex operations
  ├── [CAUSE] WebGL contexts can be lost if the GPU is overwhelmed, if the
  │   browser decides to reclaim GPU resources, or if the user's graphics
  │   driver crashes. This happens more on integrated GPUs, low-memory
  │   devices, and when multiple WebGL contexts exist.
  ├── [IMPACT] Critical — context loss means the 3D viewport goes blank. If
  │   not handled, the user must refresh the page and may lose work.
  ├── [PREVENTION] Listen for webglcontextlost and webglcontextrestored events.
  │   On context loss, show a "Recovering..." overlay. On restore, rebuild the
  │   scene from the last saved state. Minimize GPU resource usage to prevent
  │   context loss in the first place.
  └── [SOLUTION] Implement automatic context restoration: save scene state to
      CPU memory, recreate the renderer, reload textures and geometry. The
      user should see a brief flicker, not a crash.
```

```
[SCENARIO] Firefox WebGL performance significantly worse than Chrome
  ├── [CAUSE] Firefox's WebGL implementation uses ANGLE on Windows (same as
  │   Chrome) but has different shader compilation strategies and draw call
  │   batching. Some operations (large texture uploads, frequent uniform
  │   updates) are measurably slower.
  ├── [IMPACT] Medium — Firefox users get a degraded but functional experience.
  ├── [PREVENTION] Profile on Firefox as well as Chrome. Optimize for the
  │   slowest common denominator. Batch draw calls, minimize state changes,
  │   use VAOs.
  └── [SOLUTION] Detect Firefox and auto-enable performance optimizations:
      lower shadow resolution, disable anti-aliasing, use simpler shaders.
```

```
[SCENARIO] Mobile browser (Chrome Android, Safari iOS) cannot run the app at all
  ├── [CAUSE] Mobile browsers have: lower WebGL limits (max textures, max
  │   uniforms, max vertex attributes), less GPU memory (1-4 GB shared with
  │   system), touch-only input (no mouse/keyboard), smaller screens, and
  │   aggressive tab killing for memory reclamation.
  ├── [IMPACT] High — excludes all mobile users. But VRChat avatar creation on
  │   mobile was never a common use case.
  ├── [PREVENTION] Detect mobile and show a clear message: "This app requires a
  │   desktop browser. Mobile support coming in a future update."
  └── [SOLUTION] Build a mobile-optimized "viewer/configurator" that can: browse
      components (Booth/Tafi), adjust sliders (VRoid), and preview avatars —
      but not do full 3D modeling (Blender) or scene editing (Unity). Separate
      the creation tools from the configuration tools.
```

```
[SCENARIO] WebGPU not yet widely available but needed for advanced features
  ├── [CAUSE] WebGPU offers compute shaders, better performance, and more
  │   modern GPU access — features needed for real-time mesh operations,
  │   sculpting, and physics. As of March 2026, WebGPU is supported in Chrome
  │   and Edge but not Firefox or Safari (in progress).
  ├── [IMPACT] Medium — limits what advanced features we can build cross-browser.
  │   Chrome-only features reduce reach.
  ├── [PREVENTION] Build on WebGL 2.0 as the baseline. Use WebGPU as a
  │   progressive enhancement for users whose browsers support it. Feature-
  │   detect and gracefully degrade.
  └── [SOLUTION] Architecture the renderer with a backend abstraction:
      WebGLRenderer and WebGPURenderer share the same scene graph API. Switch
      at runtime based on browser support.
```

---

## 6C. Security / Licensing

```
[SCENARIO] Trademark infringement for using tool names (Blender, VRoid, Booth, Unity, Tafi)
  ├── [CAUSE] Using trademarked names in our product implies official
  │   endorsement or affiliation. Blender Foundation has trademark guidelines.
  │   Unity Technologies actively protects "Unity" trademark. Pixiv owns
  │   "VRoid" and "Booth." Tafi is a private company trademark.
  ├── [IMPACT] Critical — legal cease-and-desist orders could force the app
  │   offline. Lawsuits are expensive even if we win.
  ├── [PREVENTION] DO NOT use the original tool names as our emulator tab names.
  │   Use descriptive alternatives: "3D Modeler" (not Blender), "Anime Avatar
  │   Creator" (not VRoid), "Asset Library" (not Booth), "Avatar Configurator"
  │   (not Unity), "Component Builder" (not Tafi). Reference the original
  │   tools only in documentation as "compatible with" or "inspired by."
  └── [SOLUTION] Consult with an IP attorney before launch. Use clear
      disclaimers: "This tool is not affiliated with [Blender/VRoid/etc.]."
      Ensure no logos, icons, or visual elements from the original tools are
      used.
```

```
[SCENARIO] Booth avatar assets are copyrighted — redistribution is illegal
  ├── [CAUSE] Booth creators retain copyright on their avatar bases, clothing,
  │   and accessories. Most Booth licenses prohibit redistribution, commercial
  │   use of the model data, and modification for resale. Hosting these assets
  │   on our servers or distributing them through our app violates these terms.
  ├── [IMPACT] Critical — DMCA takedowns, legal action from Japanese creators,
  │   and potential criminal liability under Japanese copyright law.
  ├── [PREVENTION] NEVER host copyrighted Booth assets on our servers. Only
  │   host CC0/open-license content. For copyrighted assets, users must provide
  │   their own files (import from local disk). Our app processes them locally
  │   in the browser without server upload.
  └── [SOLUTION] All file processing happens client-side (browser only). No
      user files are uploaded to our servers. Include a prominent disclaimer:
      "You are responsible for ensuring you have the right to use any imported
      assets." Implement a local-only processing architecture.
```

```
[SCENARIO] VRChat ToS violation — using unofficial upload pathways
  ├── [CAUSE] VRChat's Terms of Service may prohibit uploading avatars through
  │   unofficial tools or APIs. Using VRChat's auth tokens in our cloud build
  │   service could violate their terms.
  ├── [IMPACT] High — VRChat could ban users who upload through our tool, or
  │   send us a cease-and-desist.
  ├── [PREVENTION] Do NOT interact with VRChat's APIs or authentication system
  │   directly. Our tool prepares files for Unity — the actual upload happens
  │   through the official VRChat SDK in Unity, which is the sanctioned method.
  └── [SOLUTION] If we build a cloud build service, ensure it uses the standard
      VRChat SDK upload flow (user logs into VRChat through Unity's SDK panel).
      No API reverse-engineering. No credential handling on our servers.
```

```
[SCENARIO] User uploads malicious 3D files (XSS via SVG textures, buffer overflows in parsers)
  ├── [CAUSE] glTF, VRM, and FBX files can contain embedded data (textures,
  │   scripts, URIs). A malicious file could include SVG textures with embedded
  │   JavaScript, buffer overflow payloads in binary data, or external URI
  │   references that leak user data.
  ├── [IMPACT] High — XSS attacks could steal user data, session tokens, or
  │   hijack the application.
  ├── [PREVENTION] Sanitize all imported files: reject SVG textures (convert to
  │   PNG), validate all binary data lengths before parsing, reject external
  │   URI references (data: and http:), run file parsing in a Web Worker
  │   (sandboxed from DOM).
  └── [SOLUTION] Implement Content Security Policy (CSP) headers that block
      inline scripts and restrict resource loading. Use DOMPurify for any
      user-provided text. Parse binary files with bounds checking.
```

```
[SCENARIO] GDPR/privacy concerns with user-created avatar data
  ├── [CAUSE] Avatars may contain personally identifiable features (face
  │   likenesses, real names in metadata, custom textures with personal photos).
  │   If we store any of this on our servers, GDPR applies.
  ├── [IMPACT] Medium — GDPR violations can result in significant fines.
  ├── [PREVENTION] Process everything client-side. If cloud storage is offered,
  │   implement proper consent flows, data deletion on request, and data
  │   processing agreements. Never analyze or use avatar content for any
  │   purpose beyond the user's explicit request.
  └── [SOLUTION] Implement a "privacy mode" that processes all files locally
      without any server communication. Make this the default. Cloud features
      are opt-in with clear consent.
```

---

## 6D. Shared Infrastructure Failures

```
[SCENARIO] Multiple emulator tabs consume too much memory simultaneously
  ├── [CAUSE] If a user has all 5 emulators loaded with models, each tab
  │   maintains its own Three.js scene, textures, and geometry in GPU memory.
  │   Combined memory could easily exceed 2 GB.
  ├── [IMPACT] High — browser becomes unresponsive or crashes. Other tabs and
  │   applications on the user's computer are affected.
  ├── [PREVENTION] Only keep the active emulator tab's 3D scene in GPU memory.
  │   When switching tabs, dispose of the previous tab's Three.js renderer and
  │   release GPU resources. Store scene state in CPU memory (IndexedDB) and
  │   rebuild on tab activation.
  └── [SOLUTION] Implement lazy loading: only the visible emulator is fully
      initialized. Other tabs show a cached screenshot of their last state.
      Full 3D rebuilds on tab switch (with a brief loading indicator).
```

```
[SCENARIO] Cross-tab data sync fails during simultaneous edits
  ├── [CAUSE] If the app architecture uses separate workers or iframes per
  │   emulator, synchronizing model state between them requires message
  │   passing. Race conditions can occur if two emulators modify the same
  │   data (e.g., Blender edits the mesh while Unity edits bone weights).
  ├── [IMPACT] Medium — data corruption where one emulator's changes overwrite
  │   another's.
  ├── [PREVENTION] Implement a single source of truth (SSOT) for the avatar
  │   data. All emulators read from and write to this central store. Use a
  │   mutex/lock system: only one emulator can write at a time. The active
  │   tab holds the write lock.
  └── [SOLUTION] Event-driven architecture: changes emit events, all emulators
      subscribe and update their views. Conflict resolution: last-write-wins
      with undo history for all changes.
```

```
[SCENARIO] App initialization takes too long — users leave before it loads
  ├── [CAUSE] Loading 5 emulators with Three.js, three-vrm, component
  │   libraries, shader compilations, and UI frameworks could take 10-30
  │   seconds on first visit. Shader compilation alone can take several
  │   seconds per shader.
  ├── [IMPACT] High — industry data shows 53% of users leave if a page takes
  │   more than 3 seconds to load.
  ├── [PREVENTION] Load only the landing page and one emulator initially.
  │   Lazy-load other emulators on demand. Pre-compile shaders during idle
  │   time. Use code splitting (dynamic import()). Compress all assets with
  │   Brotli. Cache aggressively with Service Worker.
  └── [SOLUTION] Show a meaningful loading screen with progress bar and
      preview content. Load the UI shell in <1 second, then progressively
      load 3D capabilities. "Start creating" button appears as soon as the
      first emulator is ready.
```

```
[SCENARIO] URL/routing — deep links to specific emulator states don't work
  ├── [CAUSE] Single-page apps with complex state (which emulator is active,
  │   which model is loaded, which tool is selected) need proper URL routing.
  │   Without it, users can't bookmark, share, or navigate back.
  ├── [IMPACT] Low — UX convenience issue.
  ├── [PREVENTION] Implement hash-based or pushState routing:
  │   /app#blender/model/123 routes to the Blender emulator with model 123
  │   loaded. Support browser back/forward buttons.
  └── [SOLUTION] Standard SPA routing with history API. Each emulator tab
      and major state change updates the URL.
```

---

# FINAL STEP CHECKLIST

## Pre-Launch Verification Procedure

Run this checklist against the finished app before release. Every item maps back to a specific failure scenario documented above.

---

### Phase 1: File Format Verification

- [ ] **FF-01** Import a glTF 2.0 file into Blender emulator — verify geometry, materials, textures load correctly
- [ ] **FF-02** Import a glb file into Blender emulator — verify same as FF-01
- [ ] **FF-03** Export from Blender emulator as glTF — reimport — verify round-trip fidelity (no data loss)
- [ ] **FF-04** Export from Blender emulator as glb — reimport — verify round-trip fidelity
- [ ] **FF-05** Import a VRM 0.x file into VRoid emulator — verify all VRM metadata (title, author, license)
- [ ] **FF-06** Import a VRM 1.0 file into VRoid emulator — verify same as FF-05
- [ ] **FF-07** Export a VRM from VRoid emulator — import into VRM Converter for VRChat in Unity — verify conversion succeeds
- [ ] **FF-08** Export a VRM from VRoid emulator — import into VSeeFace — verify model displays correctly
- [ ] **FF-09** Import a .unitypackage (Booth avatar) into Booth emulator — verify model extraction succeeds
- [ ] **FF-10** Import a FBX file via server-side converter — verify geometry, rig, and materials survive
- [ ] **FF-11** Verify all 15 VRChat viseme shape keys survive export from every emulator that supports them
- [ ] **FF-12** Verify blink shape keys (Blink, Blink_L, Blink_R) survive export
- [ ] **FF-13** Test coordinate system: export from each emulator, import into Unity — verify orientation is correct (no 90-degree rotation, no 100x scale)
- [ ] **FF-14** Verify VRM spring bone parameters round-trip: export → reimport → compare values

### Phase 2: Rendering Verification

- [ ] **RV-01** Compare Blender emulator rendering to real Blender screenshot — document differences
- [ ] **RV-02** Compare VRoid emulator rendering to real VRoid Studio screenshot — document differences
- [ ] **RV-03** Verify MToon shader rendering: base color, shade color, outline, emission all display
- [ ] **RV-04** Verify Poiyomi Lite shader: base color, shade, outline, emission, normal map render in Booth emulator
- [ ] **RV-05** Test alpha transparency sorting with VRoid hair — orbit 360 degrees — no sorting artifacts
- [ ] **RV-06** Test wireframe/edit mode in Blender emulator — verify selection highlighting, vertex/edge/face display
- [ ] **RV-07** Test weight paint visualization — verify gradient accuracy against known weight data
- [ ] **RV-08** Test PhysBone physics preview — verify spring behavior approximates VRChat's implementation
- [ ] **RV-09** Verify normal map rendering — test with OpenGL and DirectX format normal maps
- [ ] **RV-10** Test component seam rendering in Tafi emulator — verify no visible gaps at join points

### Phase 3: Performance Verification

- [ ] **PV-01** Load a 500K polygon model in Blender emulator — verify viewport stays above 30 FPS on mid-range hardware
- [ ] **PV-02** Load a 100K polygon VRoid model with hair — verify smooth interaction
- [ ] **PV-03** Load a Booth avatar with 20 material slots — verify acceptable frame rate
- [ ] **PV-04** Equip 10 components simultaneously in Tafi emulator — verify no crash
- [ ] **PV-05** Run the app for 30 minutes with active editing — verify no memory leak (track JS heap size)
- [ ] **PV-06** Test undo/redo 50 times in Blender emulator — verify memory stays within bounds
- [ ] **PV-07** Switch between all 5 emulator tabs rapidly (20 switches) — verify no crash or memory spike
- [ ] **PV-08** Test on minimum spec hardware: integrated GPU, 8 GB RAM, laptop — verify basic functionality
- [ ] **PV-09** Measure initial page load time — must be under 5 seconds on broadband
- [ ] **PV-10** Measure emulator tab switch time — must be under 3 seconds

### Phase 4: Feature Parity Verification

- [ ] **FP-01** Create a mesh from scratch in Blender emulator — verify: create primitive, edit vertices, extrude, subdivide
- [ ] **FP-02** Create a rig in Blender emulator — verify: add armature, assign bones, auto-weight, pose test
- [ ] **FP-03** Create viseme shape keys in Blender emulator — verify Cats-equivalent auto-generation from 3 base shapes
- [ ] **FP-04** Adjust all face/body sliders in VRoid emulator — verify morph targets respond correctly
- [ ] **FP-05** Paint a custom texture in VRoid emulator (UV mode) — verify texture applies to model
- [ ] **FP-06** Browse and preview components in Booth emulator — verify category filtering, search
- [ ] **FP-07** Assemble body + clothing + hair in Tafi emulator — verify seam-free result
- [ ] **FP-08** Configure VRC Avatar Descriptor in Unity emulator — verify: view position, lip sync mode, eye look
- [ ] **FP-09** Add PhysBones in Unity emulator — verify: parameter editing, collision sphere visualization
- [ ] **FP-10** Build expression menu in Unity emulator — verify: nested menus, toggle controls, parameter binding
- [ ] **FP-11** Run VRChat SDK validation in Unity emulator — verify performance rank estimation matches real SDK
- [ ] **FP-12** Verify bone mapping UI — import a model with non-standard bone names — verify auto-mapping + manual correction

### Phase 5: Export/Import Bridge Verification

- [ ] **EI-01** Export from Blender emulator → import into real Unity → verify rig is humanoid-compatible
- [ ] **EI-02** Export from VRoid emulator → convert with VRM Converter for VRChat → verify avatar works in VRChat
- [ ] **EI-03** Export from Booth emulator → import into real Unity → verify all components positioned correctly
- [ ] **EI-04** Export from Unity emulator → open generated project in real Unity → verify all VRChat components present
- [ ] **EI-05** Export from Tafi emulator → import into real Unity → verify merged mesh, materials, and morphs
- [ ] **EI-06** Full pipeline test: create in Blender emulator → configure in Unity emulator → export → upload to VRChat via real Unity → verify avatar works in-game
- [ ] **EI-07** Full pipeline test: customize in VRoid emulator → export VRM → convert in real Unity → upload → verify in-game
- [ ] **EI-08** Full pipeline test: assemble in Booth emulator → configure in Unity emulator → export → upload → verify in-game
- [ ] **EI-09** Full pipeline test: build in Tafi emulator → export → import to real Unity → upload → verify in-game
- [ ] **EI-10** Cross-emulator test: create base in Blender emulator → add VRoid hair → dress from Booth → configure in Unity emulator → export → verify in real Unity

### Phase 6: Cross-Emulator Compatibility Verification

- [ ] **CE-01** Transfer model from Blender emulator → VRoid emulator — verify geometry preserved
- [ ] **CE-02** Transfer model from VRoid emulator → Blender emulator — verify VRM data preserved (spring bones, expressions)
- [ ] **CE-03** Transfer model from Booth emulator → Unity emulator — verify all components transfer
- [ ] **CE-04** Transfer model from Tafi emulator → Blender emulator — verify component boundaries preserved
- [ ] **CE-05** Edit model in Blender emulator after assembling in Tafi emulator — verify edits don't break assembly
- [ ] **CE-06** Verify internal data format (IDF) preserves all metadata across tab switches
- [ ] **CE-07** Verify skeleton compatibility check runs between emulators — test with mismatched skeletons

### Phase 7: Browser Compatibility Verification

- [ ] **BC-01** Test full app in Chrome (latest stable) — verify all emulators functional
- [ ] **BC-02** Test full app in Firefox (latest stable) — verify all emulators functional
- [ ] **BC-03** Test full app in Safari (latest stable, macOS) — verify all emulators functional, note degradations
- [ ] **BC-04** Test full app in Edge (latest stable) — verify all emulators functional
- [ ] **BC-05** Test on Safari iOS (iPhone) — verify graceful degradation message
- [ ] **BC-06** Test on Chrome Android — verify graceful degradation message
- [ ] **BC-07** Verify WebGL context loss recovery — simulate context loss (WEBGL_lose_context extension) — verify auto-recovery
- [ ] **BC-08** Verify keyboard shortcut interception — Ctrl+S, Ctrl+Z, F5 should NOT trigger browser default actions
- [ ] **BC-09** Verify right-click context menu suppression — no browser context menu in viewport
- [ ] **BC-10** Verify trackpad navigation — two-finger orbit, pinch zoom, shift+two-finger pan

### Phase 8: Data Persistence Verification

- [ ] **DP-01** Save a project in each emulator — close browser — reopen — verify project loads correctly
- [ ] **DP-02** Fill IndexedDB to 80% capacity — verify warning is shown
- [ ] **DP-03** Exceed IndexedDB quota — verify graceful error message and download fallback
- [ ] **DP-04** Clear browser data — reopen app — verify no crash (just empty state)
- [ ] **DP-05** Test auto-save: make edits, kill browser process (Task Manager), reopen — verify recovery
- [ ] **DP-06** Export project as .zip — reimport — verify full state restoration
- [ ] **DP-07** Test in incognito mode — verify app works with ephemeral storage + appropriate warnings
- [ ] **DP-08** Update a component in the Tafi library — verify saved configurations using old version still load

### Phase 9: Security & Legal Verification

- [ ] **SL-01** Import a malicious glTF with SVG texture containing JavaScript — verify script does NOT execute
- [ ] **SL-02** Import a glTF with external URI references — verify external resources are NOT loaded
- [ ] **SL-03** Verify CSP headers block inline scripts and external resource loading
- [ ] **SL-04** Verify no copyrighted assets (Booth, Tafi, VRoid branded content) are bundled with the app
- [ ] **SL-05** Verify all bundled 3D assets have CC0 or compatible open licenses — document license for each
- [ ] **SL-06** Verify no trademarked names used as product names — only in "compatible with" documentation
- [ ] **SL-07** Verify no user data is transmitted to any server without explicit consent
- [ ] **SL-08** Verify all file processing happens client-side by default (network tab audit)
- [ ] **SL-09** Run a GDPR compliance review on any cloud/account features
- [ ] **SL-10** Have an IP attorney review all tool naming, marketing copy, and documentation

### Phase 10: UX Verification

- [ ] **UX-01** First-time user test: give the app to someone unfamiliar with 3D tools — can they create a basic avatar in under 30 minutes using Tafi emulator?
- [ ] **UX-02** VRoid user test: give the app to a VRoid Studio user — do they find the slider interface intuitive?
- [ ] **UX-03** Blender user test: give the app to a Blender user — do they find the keyboard shortcuts acceptable?
- [ ] **UX-04** Verify all error messages are user-friendly (no stack traces, no technical jargon)
- [ ] **UX-05** Verify loading indicators appear for every operation that takes >1 second
- [ ] **UX-06** Verify the app is usable at 1280x720 resolution (minimum supported)
- [ ] **UX-07** Verify the app is usable at 4K resolution (3840x2160) — no tiny text, no overflow
- [ ] **UX-08** Test with screen reader (VoiceOver, NVDA) — verify basic navigation accessibility
- [ ] **UX-09** Verify Ctrl+Z undo works in every emulator, in every editing state
- [ ] **UX-10** Verify tab switching preserves scroll position, selected tool, and editing state

---

## Failure Severity Summary

| Severity | Count | Description |
|----------|-------|-------------|
| **Critical** | 14 | App-breaking or legally dangerous — must fix before launch |
| **High** | 38 | Significant functionality or UX issues — should fix before launch |
| **Medium** | 24 | Noticeable issues with workarounds available — fix before v1.1 |
| **Low** | 6 | Minor convenience issues — backlog items |

### Critical Items (Must Fix)

1. FBX import/export not supported in browser (Blender)
2. .unitypackage parsing (Booth)
3. Poiyomi/lilToon shader conversion (Booth)
4. VRM export fails in VRM Converter for VRChat (VRoid)
5. Cannot upload to VRChat from browser (Unity)
6. Cannot build .vrca asset bundles outside Unity (Unity)
7. High-poly sculpting crashes browser (Blender)
8. Cross-tab model transfer breaks (Cross-Emulator)
9. Modifier stack missing (Blender)
10. No direct VRChat upload (Tafi)
11. Trademark infringement risk (Legal)
12. Booth asset copyright/redistribution (Legal)
13. VRChat ToS violation via unofficial upload (Legal)
14. WebGL context loss without recovery (Browser)

---

> **This document is a living reference.** As development proceeds, update failure statuses from "Open" to "Mitigated" or "Resolved" with the implementation details. Add new scenarios as they're discovered during testing.
