# Deep Dive: VRoid Studio for VRChat Avatar Creation

> Research compiled March 2026. Covers VRoid Studio v2.x workflow, XWear/XAvatar ecosystem, conversion pipelines, optimization, and community resources.

---

## Table of Contents

1. [What is VRoid Studio?](#1-what-is-vroid-studio)
2. [Full Workflow: VRoid Studio to VRChat](#2-full-workflow-vroid-studio-to-vrchat)
3. [VRM vs XAvatar Format](#3-vrm-vs-xavatar-format)
4. [VRM to Unity Conversion Pipeline](#4-vrm-to-unity-conversion-pipeline)
5. [Customization Techniques](#5-customization-techniques)
6. [XWear System](#6-xwear-system)
7. [Limitations](#7-limitations-what-vroid-cannot-do)
8. [Enhancing VRoid Models in Blender](#8-enhancing-vroid-models-in-blender)
9. [Performance Optimization](#9-performance-optimization)
10. [Community Resources](#10-community-resources)
11. [Wolfchan and Official Freebies](#11-wolfchan-and-official-freebies)
12. [Best Tutorials and Guides](#12-best-tutorials-and-guides)
13. [Quick Reference Cheat Sheet](#13-quick-reference-cheat-sheet)

---

## 1. What is VRoid Studio?

VRoid Studio is a **free** 3D avatar creation tool by pixiv. It runs on Windows, macOS, and iPad. No 3D modeling experience is required --- the interface uses sliders, presets, and a painting-style workflow to create anime-style humanoid characters.

**Key facts:**
- Completely free (no paid tier)
- Exports to VRM format (open standard for humanoid avatars)
- As of v2.0+, supports XWear/XAvatar format for VRChat-ready dress-up
- Available on Steam or direct download from [vroid.com/en/studio](https://vroid.com/en/studio)
- v2.7.0 (Dec 2025) added the Closet feature for quick access to favorite models/outfits

---

## 2. Full Workflow: VRoid Studio to VRChat

There are now **two paths** from VRoid Studio to VRChat. The modern XWear path is simpler; the traditional VRM path gives more control.

### Path A: XWear/Dress-Up Method (Recommended for Beginners)

1. **Open VRoid Studio** --- pick a preset avatar or start from scratch
2. **Customize** --- adjust face, hair, body, clothing using the editors
3. **Dress-Up Feature** --- load an XAvatar base model (like Wolfchan), swap XWear outfits onto it
4. **Export as XAvatar** --- File > Export > XAvatar (this bundles avatar + outfit, VRChat-ready)
5. **Import to Unity** --- open a VRChat avatar project in VCC/Unity, import the XAvatar
6. **Upload via VRChat SDK** --- configure avatar settings, test in-editor, upload to VRChat

### Path B: Traditional VRM Pipeline (More Control)

1. **Create avatar in VRoid Studio** --- customize everything
2. **Export as VRM** --- File > Export > VRM (choose VRM 0.x for widest compatibility)
3. **Set up Unity project** via VRChat Creator Companion (VCC)
   - VCC installs Unity 2022.3.22f1 automatically
   - Creates avatar project with VRChat SDK pre-loaded
4. **Install VRM Converter for VRChat** in the Unity project
5. **Import VRM** --- drag the .vrm file into Unity's Assets panel
6. **Convert** --- select the VRM, click VRM0 > Duplicate and Convert for VRChat > Duplicate and Convert
7. **Import MToon shader** --- VRoid models use MToon10; without it you get transparency/dark eye issues
8. **Configure avatar** --- set viewpoint, lip sync, eye tracking in the VRChat SDK inspector
9. **Build & Upload** --- test locally, then upload to VRChat

### Prerequisites

| Tool | Purpose | Where to Get It |
|------|---------|-----------------|
| VRoid Studio | Create the avatar | [vroid.com](https://vroid.com/en/studio) or Steam |
| VRChat Creator Companion (VCC) | Manage Unity projects + SDK | [vcc.docs.vrchat.com](https://vcc.docs.vrchat.com/) |
| Unity 2022.3.22f1 | Build environment | Auto-installed by VCC |
| VRM Converter for VRChat | Convert VRM to VRChat avatar | [OpenUPM](https://openupm.com/packages/jp.pokemori.vrm-converter-for-vrchat/) |
| VRChat account (New User rank+) | Upload permission | [vrchat.com](https://vrchat.com) |

---

## 3. VRM vs XAvatar Format

### VRM (Virtual Reality Model)

- **Open standard** for humanoid 3D avatars
- Two versions: VRM 0.x (legacy, widest support) and VRM 1.0 (newer spec)
- Works across many apps beyond VRChat (VSeeFace, cluster, etc.)
- Requires conversion for VRChat (VRM Converter for VRChat in Unity)
- You control the full Unity pipeline --- add custom shaders, components, animations

**Use VRM when:**
- You want maximum compatibility across platforms
- You plan to do heavy customization in Unity/Blender
- You need fine-grained control over shaders, physics, expressions

### XAvatar

- **VRoid's proprietary format** designed for the Dress-Up/XWear ecosystem
- Bundles avatar + outfit data together
- Can be exported directly for VRChat upload
- Supports auto-fitting (clothing adjusts to body type automatically)
- Works with XWear outfit files for easy costume swapping

**Use XAvatar when:**
- You want the fastest path to VRChat
- You plan to use XWear community outfits
- You want non-technical outfit swapping
- You don't need deep Unity customization

### Conversion Between Formats

- VRM files can be converted to XAvatar within VRoid Studio's dress-up feature
- XAvatar files can be exported as VRM from VRoid Studio
- Both formats can coexist --- edit in dress-up mode, export as either

---

## 4. VRM to Unity Conversion Pipeline

### Step-by-Step (Traditional Path)

#### 1. Create VCC Project
```
VRChat Creator Companion > Create New Project > Avatar
```
This generates a Unity project with VRChat SDK 3.x pre-installed.

#### 2. Install Required Packages
- **UniVRM** (VRM importer/exporter for Unity) --- [github.com/vrm-c/UniVRM](https://github.com/vrm-c/UniVRM)
- **VRM Converter for VRChat** --- adds the conversion menu items

#### 3. Import Your VRM
- Drag and drop `.vrm` file into Unity's `Assets` folder
- Unity processes and creates a prefab

#### 4. Convert to VRChat Avatar
- Select the imported VRM prefab
- Menu: VRM0 > Duplicate and Convert for VRChat > Duplicate and Convert
- Save the converted prefab with a descriptive name

#### 5. Shader Setup (Critical)
VRoid models use **MToon10** shader. Without importing it:
- Eyes may appear dark or transparent
- Skin may render incorrectly
- Materials will show pink (missing shader)

Ensure MToon is imported via UniVRM package.

#### 6. Configure VRChat Components
- Set **View Position** (where the camera sits relative to the avatar's head)
- Configure **Lip Sync** (visemes for mouth movement)
- Set up **Eye Tracking** (eye bone references)
- Add **PhysBones** for hair/clothing physics (replaces old Dynamic Bones)

#### 7. Build and Test
- Use VRChat SDK control panel > Build & Test
- Preview in VRChat before uploading
- Upload when satisfied

### Common Pitfalls
- **Pink materials** = missing MToon shader. Import UniVRM/MToon package
- **Avatar too small/large** = scale issue. Check model scale in Unity inspector
- **No lip sync** = visemes not configured. Use the VRChat SDK lip sync setup
- **Hair passes through body** = PhysBones not configured. Set up collision on hair bones

---

## 5. Customization Techniques

### Hair Editor

Hair is VRoid Studio's most powerful (and most polygon-hungry) feature.

**Basics:**
- Draw hair strands directly on the head guide mesh --- each stroke creates a hair "chunk"
- Each chunk has adjustable parameters: thickness, smoothness, cross-section, length
- Use the **Retouch tool** to reshape individual strands after drawing
- Extend hair length by stroking from the tip outward

**Advanced Techniques:**
- **Multiple materials** --- create a secondary hair material for highlights, mesh streaks, or gradient tips. Assign different materials to different hair groups
- **Hair bounce (Spring Bones)** --- set bounce parameters per-chunk for realistic physics. Front bangs can have less bounce, long back hair more
- **Cross-section control** --- adjust how "flat" or "round" each strand is. Flat = ribbon-like, round = thick rope
- **Smoothness** --- lower smoothness = fewer polygons but blockier look. Find the sweet spot for your poly budget

**Polygon Management:**
Hair is typically the biggest polygon consumer. Reduce by:
- Lowering smoothness on individual hair groups
- Reducing cross-section complexity
- Merging small decorative strands into larger ones

### Face Editor

- Adjust facial features with sliders: eye size/position, nose shape, mouth width, jaw line, etc.
- Paint custom iris textures, skin details, makeup, scars, etc.
- Create custom eye highlights and pupil shapes via the texture editor
- Each facial feature can be fine-tuned independently

### Body Editor

- Height, proportions, chest, waist, limbs all adjustable via sliders
- Skin color and texture painting available
- Body type affects how XWear clothing auto-fits

### Clothing / Outfit Editor

**Using Templates:**
- Start from built-in clothing templates (shirts, jackets, skirts, pants, shoes)
- Layer multiple templates for complex outfits
- Each template has adjustable parameters (length, tightness, collar style)

**Texture Painting:**
- Paint directly on the 3D model (World mode) or on the UV unwrap (UV mode)
- World mode: brush size stays consistent on the 3D surface
- UV mode: brush size stays consistent on the flat texture map
- Use layers for non-destructive editing
- Import external textures (PNG) as overlays

**Pro Tips:**
- Start with a template close to your vision, then paint over it
- Use UV mode for precise pattern work (stripes, logos, text)
- Use World mode for organic details (wrinkles, shading, weathering)
- Export textures to edit in Photoshop/GIMP for advanced work, then re-import

---

## 6. XWear System

### What is XWear?

XWear is VRoid Studio's outfit/accessory format, introduced in v2.0.0 (Nov 2024). It enables:
- Loading VRChat-ready outfits into VRoid Studio
- Swapping costumes on any compatible base model
- Auto-fitting clothing to different body types
- Exporting dressed-up avatars directly for VRChat

### How the Dress-Up Feature Works

1. **Load a base model** --- either a VRoid-created model, an XAvatar, or a VRM
2. **Add Costume** --- import an XWear file (outfit or accessory)
3. **Auto-fit** --- the system automatically adjusts the outfit to match the model's body shape
4. **Manual adjustments** --- fine-tune fit with position, rotation, and scale controls
5. **Export** --- save as XAvatar (for VRChat) or VRM (for other platforms)

### Where to Get XWear Outfits

- **BOOTH marketplace** --- [booth.pm](https://booth.pm/en/search/vroid) has 53,000+ VRoid items. Many VRChat outfits can be converted to XWear
- **Official VRoid presets** --- 23+ preset avatars with outfits built into VRoid Studio (A-Z alphabet series)
- **Community creators** on VRoid Hub
- **Designer collaborations** --- e.g., JOTARO SAITO kimono collection for XWear

### Converting VRChat Outfits to XWear (XWear Packager)

If you buy a VRChat outfit on BOOTH that comes as a UnityPackage (not XWear), you can convert it:

1. **Install XWear Packager** --- download from VRoid website, install via VCC
2. **Create a Unity project** with VRChat SDK
3. **Import the outfit** --- Assets > Import Package > Custom Package (or drag-drop)
4. **Open XWear Packager** --- VRoid menu in Unity toolbar
5. **Drag the outfit GameObject** into the "Export target" field
6. **Choose type** --- "Set up as a costume" (full outfit) or "Set up as an accessory" (hat, glasses, etc.)
7. **Fill license info** --- item name, creator name, license URL
8. **Export** --- generates an .xwear file you can load in VRoid Studio

### Converting VRoid Outfits to XWear

If you made an outfit in VRoid Studio's clothing editor:
1. Open the outfit in VRoid Studio
2. Use the built-in conversion tool to export as XWear
3. The XWear file can then be loaded onto any compatible base model

### Closet Feature (v2.7.0, Dec 2025)

The Closet lets you bookmark frequently used base models, costumes, and accessories for quick access. No more hunting through folders every time --- add your favorites to the Closet and they're always one click away.

### SpringBone Preservation

When exporting XAvatar/XWear, you can retain VRM SpringBone physics data. This means hair bounce, clothing sway, and accessory jiggle carry over to VRChat.

---

## 7. Limitations (What VRoid CANNOT Do)

### Hard Limitations

| Limitation | Detail |
|-----------|--------|
| **Humanoid only** | Cannot create non-humanoid avatars (animals, robots, abstract shapes). Strictly anime-style human base mesh |
| **No custom topology** | You cannot modify the underlying mesh structure. What VRoid generates is what you get |
| **No custom rigging** | The skeleton/rig is fixed. Cannot add extra bones for wings, tails, extra limbs, etc. |
| **Anime aesthetic only** | The art style is locked to anime/manga. Cannot create realistic, stylized-western, or other art styles |
| **Limited accessory system** | Built-in accessories are minimal (glasses, cat ears, bunny ears). No complex props like weapons, bags, or mechanical parts |
| **No non-human body parts** | Horns, tails, animal ears (beyond preset cat/bunny), wings --- all require external tools (Blender) |
| **Single outfit at a time** | Cannot layer arbitrary clothing combinations. Templates can overlay but there are limits |
| **Cubemap/multi-UV export** | Models using Cubemap materials or multi-UV materials cannot be exported as VRM (known issue) |

### Practical Limitations

- **High polygon output** --- VRoid models tend to export with very high polygon counts (50K-100K+), especially with complex hairstyles. Requires optimization for VRChat
- **Texture bloat** --- default textures are 2048x2048 or 4096x4096 per material, which is often overkill
- **Limited clothing physics** --- physics on clothing is basic compared to purpose-built VRChat avatars
- **No animation tools** --- cannot create or preview custom animations/gestures within VRoid Studio
- **No blend shape editor** --- facial expressions use preset blend shapes. Custom expressions require Unity/Blender work
- **Material count** --- VRoid models often export with many separate materials, which hurts VRChat performance (each material = a draw call)

### Workarounds

Most limitations can be overcome by exporting to Blender:
- Add tails, wings, animal features as separate meshes
- Retopologize for lower poly counts
- Merge materials and create texture atlases
- Add custom bones and rigging
- Create custom blend shapes/expressions

---

## 8. Enhancing VRoid Models in Blender

### Required Tools

| Tool | Purpose |
|------|---------|
| **Blender** (3.x or 4.x) | 3D editing |
| **VRM Add-on for Blender** | Import/export VRM files |
| **CATS Blender Plugin** | VRChat-specific optimization (unofficial fork by Team Neoneko for Blender 4.x+) |
| **Material Combiner** | Texture atlas creation (addon for CATS) |

### Import Workflow

1. Install VRM Add-on for Blender: Edit > Preferences > Add-ons > search "VRM"
2. File > Import > VRM (.vrm)
3. The model imports with armature, meshes, materials, and blend shapes intact

### Common Enhancements

#### Adding Custom Accessories (Tails, Wings, Horns)
1. Model or import the accessory mesh
2. Position it on the avatar
3. Parent it to the appropriate bone (e.g., tail to spine, horns to head)
4. Weight paint for smooth deformation
5. Merge into the main mesh if needed for performance

#### Retopology / Polygon Reduction
1. Select the mesh you want to optimize
2. Add a **Decimate** modifier
3. Set ratio (0.5 = half the polygons)
4. **CATS Smart Decimation** is better --- preserves shape keys (blend shapes)
5. Target: under 32K polygons for PC, under 15K-20K for Quest

#### Merging Meshes
1. Select all mesh objects (hair, body, clothing, etc.)
2. Object > Join (Ctrl+J)
3. Rename the merged mesh to "Body"
4. This reduces skinned mesh renderer count to 1 (critical for VRChat performance)

#### Texture Atlas Creation
1. Use CATS > Material Combiner or Shotariya's Material Combiner
2. Select all materials to combine
3. Set atlas resolution (1024x1024 or 2048x2048)
4. Generate --- this merges all textures into one image and remaps UVs
5. Reduces material/draw call count dramatically

#### Texture Resizing
- VRoid exports at 2048 or 4096 per texture
- Resize to 1024x1024 for most uses (512 for Quest)
- Keep texture dimensions as powers of 2 (256, 512, 1024, 2048)

#### Custom Blend Shapes / Shape Keys
1. In Edit Mode, sculpt the desired expression
2. Save as a new shape key
3. These carry over to Unity as VRChat visemes or gesture expressions

### Export from Blender

- **For Unity/VRChat**: Export as FBX (preserves rigging, textures, shape keys)
- **For VRM-compatible apps**: Export as VRM using the VRM add-on
- **For re-import to VRoid Studio**: Not supported. Blender edits are one-way

---

## 9. Performance Optimization

### VRChat Performance Ranking System

VRChat rates every avatar on a performance scale. Your goal is **Good** or better.

| Rank | Triangles (PC) | Triangles (Quest) | Materials | Mesh Renderers | PhysBones Components |
|------|----------------|-------------------|-----------|-----------------|---------------------|
| Excellent | < 32,000 | < 7,500 | 1 | 1 | 4 |
| Good | < 70,000 | < 10,000 | 2 | 2 | 8 |
| Medium | < 70,000 | < 15,000 | 4 | 4 | 16 |
| Poor | > 70,000 | > 20,000 | 8+ | 8+ | 32+ |

*Note: VRChat SDK warns at 70K triangles (PC) and 20K (Quest). All disabled components still count.*

### VRoid-Specific Optimization Steps

#### In VRoid Studio (Before Export)

1. **Reduce Hair Polygons** --- the biggest win
   - Lower smoothness on each hair group
   - Reduce cross-section complexity
   - Combine thin decorative strands into fewer, thicker ones
   - Check polygon count: top menu > polygon counter
2. **Export Settings** --- when exporting VRM:
   - Enable "Reduce Polygons"
   - Enable "Reduce Materials"
   - Enable "Reduce Bones"
   - These settings merge and simplify automatically
3. **Simplify Clothing** --- use simpler clothing templates. Layered outfits multiply polygon count

#### In Blender (After Export)

1. **Decimate** --- use CATS Smart Decimation to halve polygon count without losing shape keys
2. **Merge Meshes** --- join all meshes into one "Body" mesh
3. **Create Texture Atlas** --- combine all materials into 1-2 atlas textures
4. **Resize Textures** --- downscale from 4096 to 1024 (or 512 for Quest)
5. **Merge by Distance** --- removes duplicate vertices at merge seams
6. **Remove hidden geometry** --- delete faces inside the body that will never be seen

#### In Unity (Final Pass)

1. **Texture Compression** --- set textures to DXT1 (opaque) or DXT5 (transparent)
2. **Texture Size Override** --- enforce max 1024 or 2048 in import settings
3. **PhysBones** --- keep PhysBone component count low. Merge chains where possible
4. **Single Skinned Mesh Renderer** --- if you didn't merge in Blender, use the VRChat SDK's mesh merge tools
5. **Remove unused blend shapes** --- VRoid exports many you'll never use

### Quick Optimization Targets

| Component | Target (PC Good) | Target (Quest Good) |
|-----------|-------------------|---------------------|
| Triangles | < 70,000 | < 10,000 |
| Materials | 2 or fewer | 1 |
| Mesh Renderers | 1-2 | 1 |
| Texture Size | 2048x2048 max | 1024x1024 max |
| PhysBones | 8 or fewer | 0 (Quest has no physics) |
| Bones | < 150 | < 90 |

---

## 10. Community Resources

### Marketplaces

| Platform | What's There | Link |
|----------|-------------|------|
| **BOOTH** | 53,000+ VRoid items: textures, outfits, accessories, hair presets, full models | [booth.pm/en/search/vroid](https://booth.pm/en/search/vroid) |
| **VRoid Hub** | Community-uploaded models (some downloadable, check license) | [hub.vroid.com](https://hub.vroid.com/en/models) |
| **Live3D** | Curated collection of 100+ free VRoid models | [live3d.io/vroid_model](https://live3d.io/vroid_model) |

### Key Resources on BOOTH

Search tags to find what you need:
- `vroid` --- general VRoid items
- `vroid texture` --- skin, eye, clothing textures
- `vroid asset` --- 2,334+ 3D model assets
- `xwear` --- XWear-format outfits ready for dress-up feature
- `VRChat` + `vroid` --- items specifically designed for VRChat use

**Price range:** Many items are free. Paid items typically 100-2000 JPY ($0.70 - $14 USD).

### Tools and Plugins

| Tool | What It Does | Link |
|------|-------------|------|
| **CATS Blender Plugin** | One-click VRChat optimization (decimate, merge, atlas) | [github.com/teamneoneko/Cats-Blender-Plugin](https://github.com/teamneoneko/Cats-Blender-Plugin) (unofficial maintained fork) |
| **VRM Add-on for Blender** | Import/export VRM in Blender | Included in Blender's add-on repository |
| **UniVRM** | Unity VRM importer | [github.com/vrm-c/UniVRM](https://github.com/vrm-c/UniVRM) |
| **VRM Converter for VRChat** | Convert VRM to VRChat avatar in Unity | [OpenUPM](https://openupm.com/packages/jp.pokemori.vrm-converter-for-vrchat/) |
| **XWear Packager** | Convert VRChat outfits to XWear format | Download from [vroid.com](https://vroid.com/en) |
| **Material Combiner** | Texture atlas addon for CATS | Bundled with CATS plugin |

### Communities

- **VRoid Steam Community** --- [steamcommunity.com/app/1486350](https://steamcommunity.com/app/1486350)
- **VRoid FAQ / Knowledge Base** --- [vroid.pixiv.help](https://vroid.pixiv.help/hc/en-us)
- **VRChat Discord** --- large community with avatar-help channels
- **Reddit r/VRoid** and **r/VRChat** --- tips, showcases, troubleshooting

---

## 11. Wolfchan and Official Freebies

### Wolfchan

Released **December 4, 2025**, Wolfchan is VRoid Project's newest original VRChat-ready 3D model.

**Free version (XAvatar):**
- Download from the official VRoid Project BOOTH shop
- Compatible with VRoid Studio's Dress-Up/XWear feature
- Can be customized: swap hairstyles, change outfits, adjust colors
- Export directly to VRChat
- Fully free, no strings attached

**Paid version (4,000 JPY / ~$27 USD):**
- Includes UnityPackage (pre-configured for VRChat)
- FBX data (for Blender/3D editing)
- PSD texture files (for Photoshop editing)
- Useful if you want to make deep modifications outside VRoid Studio

**Wolfchan variants on VRoid Hub:**
- Cyber-China version available
- Community has created additional outfit variants

### Other Official Freebies

**23 Preset Avatars (A-Z Series):**
- Added to VRoid Studio to celebrate XWear's stable release
- Characters A through Z, each with unique designs
- Hairstyles, faces, and outfits all created in VRoid Studio
- Available on the avatar selection screen in VRoid Studio (data downloads on first select)
- Can be dressed up with XWear outfits and uploaded to VRChat
- Follow standard VRoid Studio Terms of Use

**Built-in Presets:**
- VRoid Studio ships with dozens of preset hairstyles, faces, eye designs, and clothing templates
- All usable for free, even commercially (check terms)
- New presets added in v2.3.0 (Jul 2025) with 3D thumbnails

### VRoid Hub Free Models

Beyond official releases, VRoid Hub hosts thousands of community models. Many are marked as downloadable and free to use --- always check the license conditions set by each creator for:
- Commercial use permissions
- Modification permissions
- Redistribution permissions
- Credit requirements

---

## 12. Best Tutorials and Guides

### Video Tutorials (YouTube)

| Creator | Best For | Notes |
|---------|---------|-------|
| **Only Virtual RAE** | Complete beginner walkthrough | Creates a full VTuber model in ~30 minutes. Great foundation |
| **Argama Witch** | In-depth VRoid Studio deep dives | Detailed explanations of every editor |
| **Suvidriel** | Advanced VRoid techniques | Good for leveling up after basics |
| **VTanjo3D** | Hair creation specifically | Best tutorial for understanding VRoid's complex hair system |

### Written Guides

| Guide | Link | Focus |
|-------|------|-------|
| **VRoid Official FAQ** | [vroid.pixiv.help](https://vroid.pixiv.help/hc/en-us/articles/4405597663385-Getting-Started-with-VRoid) | Getting started, every editor explained |
| **VRoid Basic Tutorials** | [vroid.pixiv.help/basic-tutorials](https://vroid.pixiv.help/hc/en-us/sections/360002629313-Basic-Tutorials) | Step-by-step basics |
| **VIVE Blog: VRChat Avatar 2025** | [blog.vive.com](https://blog.vive.com/us/how-to-make-a-vrchat-avatar-in-2025-beginners-guide/) | End-to-end workflow for 2025 |
| **VRChat Official: First Avatar** | [creators.vrchat.com](https://creators.vrchat.com/avatars/creating-your-first-avatar/) | Unity/SDK setup and upload |
| **VR Me Up: VRM Optimization** | [vrmeup.com](https://vrmeup.com/devlog/devlog_8_manual_optimization_vrm_avatars_using_blender.html) | Blender optimization for VRM/VRoid |
| **Sleepmode: VRoid VRChat Optimization** | [sleepmodeau.github.io](https://sleepmodeau.github.io/posts/vroid-vrchat-optimisation-guide/) | Practical optimization walkthrough |
| **VRChat Avatar Optimization Notes** | [hackmd.io](https://hackmd.io/@kurikotw/AvatarOptimize_ENG) | Ultimate optimization reference |

### Courses

- **Class Central** lists 40+ VRoid Studio courses (mix of free and paid)
- Search [classcentral.com/subject/vroid-studio](https://www.classcentral.com/subject/vroid-studio) for current listings

---

## 13. Quick Reference Cheat Sheet

### Fastest Path to VRChat (Under 1 Hour)

```
1. Download VRoid Studio (free, Steam or vroid.com)
2. Pick a preset avatar (A-Z series or Wolfchan)
3. Customize to taste (hair color, eyes, outfit)
4. Export as XAvatar
5. Open VCC > Create Avatar Project > Open in Unity
6. Import XAvatar
7. Configure VRChat SDK settings (viewpoint, lip sync)
8. Build & Upload
9. Launch VRChat > Select your avatar
```

### Format Decision Tree

```
Want to swap outfits easily?     --> XAvatar + XWear
Want maximum platform compat?    --> VRM
Want deep Blender/Unity edits?   --> VRM (then FBX after Blender)
Want fastest VRChat upload?      --> XAvatar
```

### Optimization Priority List

```
1. Hair polygon reduction (biggest impact)
2. Merge all meshes into one
3. Create texture atlas (reduce materials to 1-2)
4. Resize textures to 1024x1024
5. Remove unused blend shapes
6. Limit PhysBones to 8 or fewer
7. Delete hidden internal geometry
```

### Key File Formats

| Extension | What It Is |
|-----------|-----------|
| `.vrm` | Universal humanoid avatar format |
| `.vroid` | VRoid Studio project file (editable) |
| `.xavatar` | VRoid dress-up avatar (avatar + outfit bundle) |
| `.xwear` | VRoid dress-up outfit/accessory file |
| `.xroid` | VRoid internal format |
| `.fbx` | 3D model exchange format (Blender, Unity) |
| `.unitypackage` | Unity asset bundle (common on BOOTH) |

---

## Sources

- [VRoid Studio Official](https://vroid.com/en/studio)
- [VRoid FAQ / Knowledge Base](https://vroid.pixiv.help/hc/en-us)
- [VRChat Creator Documentation](https://creators.vrchat.com/)
- [VRChat Creator Companion](https://vcc.docs.vrchat.com/)
- [VIVE Blog: How to Make a VRChat Avatar in 2025](https://blog.vive.com/us/how-to-make-a-vrchat-avatar-in-2025-beginners-guide/)
- [UniVRM (GitHub)](https://github.com/vrm-c/UniVRM)
- [VRM Converter for VRChat (OpenUPM)](https://openupm.com/packages/jp.pokemori.vrm-converter-for-vrchat/)
- [CATS Blender Plugin (Team Neoneko fork)](https://github.com/teamneoneko/Cats-Blender-Plugin)
- [VRoid Wolfchan Announcement](https://vroid.com/en/news/5lVnsa89JKysSHBF7GJb3X)
- [XWear Stable Release / 23 New Presets](https://vroid.com/en/news/331gGTRqNMtXSucMr0tXc8)
- [VRoid Closet Feature (v2.7.0)](https://vroid.pixiv.help/hc/en-us/articles/52924741495065--v2-7-0-Added-the-Closet-feature-Dec-4th-2025)
- [BOOTH Marketplace](https://booth.pm/en/search/vroid)
- [VRoid Hub](https://hub.vroid.com/en/models)
- [VRChat Performance Ranking System](https://creators.vrchat.com/avatars/avatar-performance-ranking-system/)
- [VRChat Avatar Optimization Tips](https://creators.vrchat.com/avatars/avatar-optimizing-tips/)
- [VR Me Up: Manual VRM Optimization in Blender](https://vrmeup.com/devlog/devlog_8_manual_optimization_vrm_avatars_using_blender.html)
- [Sleepmode: VRoid VRChat Optimization Guide](https://sleepmodeau.github.io/posts/vroid-vrchat-optimisation-guide/)
- [Live3D: How to Find Free VRoid Models](https://live3d.io/blog/how-to-find-free-vroid-vrm-models-to-use)
