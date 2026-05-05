# Deep Dive: Blender for VRChat Avatar Creation

> Research compiled March 2026. Covers workflows, tools, export settings, and practical guidance for going from zero to a VRChat-ready avatar using Blender.

---

## Table of Contents

1. [The Big Picture: What the Pipeline Looks Like](#1-the-big-picture)
2. [Best Blender Version (Right Now)](#2-best-blender-version)
3. [Essential Addons](#3-essential-addons)
4. [Full Workflow: Zero to VRChat-Ready FBX](#4-full-workflow)
5. [FBX Export Settings That Actually Work](#5-fbx-export-settings)
6. [Bone / Rig Requirements](#6-rig-requirements)
7. [Weight Painting (VRChat-Specific Tips)](#7-weight-painting)
8. [Viseme Setup (Lip Sync)](#8-viseme-setup)
9. [Eye Tracking & Blinking Setup](#9-eye-tracking)
10. [Performance Ranks & Optimization Targets](#10-performance-ranks)
11. [Common Beginner Mistakes](#11-common-mistakes)
12. [How Long Does It Realistically Take?](#12-timeline)
13. [Template & Starter Files](#13-templates)
14. [Best YouTube Channels & Tutorials](#14-tutorials)
15. [Quick-Reference Checklists](#15-checklists)

---

## 1. The Big Picture

The avatar pipeline has two major stages:

```
BLENDER (modeling, rigging, shape keys, weight painting)
   |
   v  Export as .FBX
   |
UNITY + VRChat SDK (import FBX, configure avatar descriptor, upload)
```

**Software you need (all free):**
- **Blender** -- 3D modeling, rigging, weight painting, shape keys
- **Unity** -- VRChat uses Unity 2022.3.22f1 (installed automatically by Creator Companion)
- **VRChat Creator Companion (VCC)** -- installs Unity, the VRChat SDK, and manages projects
- **A VRChat account** with a trust level that allows avatar uploads (New User rank or above)

You do ALL your 3D work in Blender, export an FBX, then bring it into Unity where you configure the VRChat-specific components (avatar descriptor, lip sync mode, eye look settings, PhysBones) and upload.

---

## 2. Best Blender Version

**Recommendation as of March 2026: Blender 4.5 or Blender 5.0**

| Version | Status |
|---------|--------|
| Blender 4.5 | Stable, well-supported by all major VRChat addons |
| Blender 5.0 | Supported by latest Cats Plugin (5.0.x.x releases) and Avatar Toolkit |
| Blender 4.2-4.4 | Work fine, but addon support is strongest on 4.5+ |
| Blender 3.x and below | Avoid -- most VRChat addons have dropped support |

**Rule of thumb:** Use the latest stable release. If a specific addon you need hasn't updated yet, drop back to 4.5. Always check the addon's GitHub releases page for version compatibility before installing.

---

## 3. Essential Addons

### Cats Blender Plugin (Community Fork)

**Status:** The original by absolute-quantum has been abandoned since 2022. Team Neoneko maintained an active fork until **February 7, 2026**, when Neoneko ceased operations and archived all repos. The last release supports Blender 5.0.

- **Repo (archived):** https://github.com/teamneoneko/Cats-Blender-Plugin
- **Last release:** v5.0.2.3 (for Blender 5.0)
- **Still usable?** Yes -- you can still download and install archived releases. No new updates will come.

**What it does:**
- One-click model import and cleanup (fix model, combine meshes)
- Automatic viseme generation from 3 base shape keys
- Eye tracking bone setup
- Bone merging, decimation, atlas tools
- Supports MMD, XNALara, Mixamo, DAZ, Rigify models

### Avatar Toolkit (Successor to Cats)

**Status:** Neoneko's original Avatar Toolkit was also archived Feb 2026, BUT there is an **active fork by RinaDev** that continues development.

- **Active fork:** https://github.com/RinaDev-xyz/Avatar-Toolkit-rinadev
- **Website:** https://avatartoolkit.xyz/

**What it does:**
- Modern codebase built for current Blender versions
- Mesh joining, vertex merging automation
- Eye tracking setup and viseme configuration
- Bone name conversion across platforms (VRChat, ChilloutVR, Resonite)
- PMX import, UV tools

### Material Combiner

Combines multiple materials/textures into a single atlas to reduce draw calls. Huge for performance optimization.

- **Repo:** https://github.com/Grim-es/material-combiner-addon
- Generates normal maps, specular maps, and other atlas types
- Lets you control per-texture size in the final atlas
- Was integrated into Cats as the atlas tool

### Other Useful Addons

| Addon | Purpose |
|-------|---------|
| **Rigify** (built into Blender) | Generate production-quality rigs. Can be converted to VRChat-compatible rigs |
| **Immersive Scaler** | Fix avatar proportions for VRChat (triazo/immersive_scaler on GitHub) |
| **Pumkin's Avatar Tools** (Unity side) | Test weight painting with pose editor sliders in Unity |
| **VRCFury** (Unity side) | Advanced avatar components, PhysBones management |
| **Modular Avatar** (Unity side) | Non-destructive avatar modification in Unity |

---

## 4. Full Workflow: Zero to VRChat-Ready FBX

### Phase 1: Modeling (Blender)

1. **Start with a concept** -- sketch or reference images
2. **Block out the body** -- use box modeling or sculpting. Start SIMPLE
3. **Model the head** -- eyes, mouth topology matter most (you need proper edge loops around the mouth for visemes and around the eyes for blinking)
4. **Retopologize** if you sculpted -- keep poly count under control (aim for under 32K tris for Excellent, under 70K for Good)
5. **UV unwrap** the entire model
6. **Texture** -- paint or apply textures. Aim for few material slots (4 for Excellent, 8 for Good)

### Phase 2: Rigging (Blender)

1. **Create an armature** with the required VRChat humanoid bone hierarchy (see Section 6)
2. **Position bones** inside the mesh in edit mode, following the model's anatomy
3. **Parent the mesh to the armature** using Automatic Weights (Ctrl+P > With Automatic Weights)
4. **Refine weight painting** manually (see Section 7)
5. **Add eye bones** (LeftEye, RightEye) parented to the Head bone
6. **Add finger bones** if you want full IK (at minimum: Thumb, Index, Middle for each hand)
7. **Test in Pose mode** -- move every bone and check for deformation issues

### Phase 3: Shape Keys (Blender)

1. **Create base mouth shape keys:** vrc.v_aa (open mouth), vrc.v_oh (rounded lips), vrc.v_ch (forward lips)
2. **Use Cats/Avatar Toolkit** to auto-generate the remaining 12 viseme shape keys from these 3
3. **Create blink shape keys:** Blink, Blink_L, Blink_R (eyelid close)
4. **Optional but recommended:** Create expressions for Avatars 3.0 (happy, sad, angry, surprised, etc.)

### Phase 4: Pre-Export Checks (Blender)

1. Apply all transforms: Select model > Ctrl+A > All Transforms
2. Ensure model faces forward along -Y in Blender (which becomes +Z in Unity)
3. Model should be standing upright at world origin
4. Scale: 1 Blender unit = 1 meter (average avatar height ~1.5-1.8 units tall)
5. Check normals: Edit Mode > Mesh > Normals > Recalculate Outside
6. Delete any loose vertices, duplicate faces, or non-manifold geometry
7. Combine meshes where possible (fewer skinned meshes = better performance)

### Phase 5: Export FBX (Blender)

See Section 5 for exact settings.

### Phase 6: Unity Setup

1. Open VRChat Creator Companion > Create new Avatar project
2. Drag FBX into the Assets folder
3. Select the FBX > Inspector > Rig tab > Animation Type: **Humanoid** > Configure
4. Map any bones Unity didn't auto-detect
5. Drag the model into the scene
6. Add **VRC Avatar Descriptor** component
7. Configure: View Position (between the eyes), Lip Sync (Viseme Blend Shape), Eye Look settings
8. Build & Test locally, then Upload

---

## 5. FBX Export Settings That Actually Work

In Blender: File > Export > FBX (.fbx)

### Critical Settings

| Setting | Value | Why |
|---------|-------|-----|
| **Selected Objects** | Checked | Export only what you need |
| **Forward** | -Z Forward | Matches Unity's coordinate system |
| **Up** | Y Up | Matches Unity's coordinate system |
| **Apply Scalings** | FBX Units Scale | Prevents PhysBones scale bugs |
| **Apply Transform** | Checked | Bakes transforms so Unity reads them correctly |
| **Add Leaf Bones** | **UNCHECKED** | Leaf bones are useless in Unity and add clutter/hurt performance |
| **Smoothing** | Face | Avoids blendshape normal issues (see gotchas below) |
| **Bake Animation** | Unchecked (unless exporting animations) | Keeps file clean |

### Gotchas

1. **Leaf Bones:** Blender adds extra "leaf bones" at the end of every bone chain by default. **Turn this OFF.** They serve no purpose in Unity and can confuse the humanoid rig auto-mapper.

2. **Scale 100x Bug:** Blender's default FBX export produces objects at 100x scale in Unity. Using "FBX Units Scale" for Apply Scalings fixes this. Your model should show Scale 1,1,1 in Unity's inspector.

3. **Rotation -90:** If your model appears rotated -90 degrees in Unity, you forgot to Apply Transform before export, or didn't check the Apply Transform box in the exporter.

4. **Blendshape Normals:** If your avatar looks pixelated or has weird shadows when using blendshapes, check Unity's FBX import settings: Model tab > enable "Legacy Blend Shape Normals". Also in Blender, set Smoothing to "Face" not "Normals Only" when exporting.

5. **Vertex Colors:** Quest shaders check vertex colors. If you're using albedo maps for color, make sure all vertex colors are set to white, or delete vertex color layers entirely.

6. **Mesh Read/Write:** In Unity, if you disable Read/Write on any mesh, VRChat can't count triangles and your avatar gets auto-ranked as Very Poor.

---

## 6. Rig Requirements

VRChat uses Unity's Humanoid rig system. Your armature must follow a specific hierarchy.

### Required Bone Hierarchy

```
Hips (root -- no parent, or parented to a single root/Armature bone)
├── Spine
│   └── Chest  (required by VRChat even though Unity marks it optional)
│       ├── Neck  (required by VRChat)
│       │   └── Head
│       │       ├── LeftEye (optional but needed for eye tracking)
│       │       └── RightEye (optional but needed for eye tracking)
│       ├── Left Shoulder
│       │   └── Left Upper Arm
│       │       └── Left Lower Arm
│       │           └── Left Hand
│       │               ├── Left Thumb Proximal > Intermediate > Distal
│       │               ├── Left Index Proximal > Intermediate > Distal
│       │               ├── Left Middle Proximal > Intermediate > Distal
│       │               ├── Left Ring Proximal > Intermediate > Distal
│       │               └── Left Little Proximal > Intermediate > Distal
│       └── Right Shoulder
│           └── (mirrors left side)
├── Left Upper Leg
│   └── Left Lower Leg
│       └── Left Foot
│           └── Left Toes (optional)
└── Right Upper Leg
    └── (mirrors left side)
```

### Key Rules

- **Hips** must be the ancestor of all other humanoid bones
- **Chest** and **Neck** are marked optional in Unity's Mecanim but are **REQUIRED by VRChat** for IK to work
- **Shoulders** and **Neck** must both be children of **Chest** (not Spine)
- For **full IK** (crouching, foot placement): you need at minimum Thumb, Index, and Middle finger bones mapped
- If your model has no fingers, add unweighted dummy bones to the end of the Hand bones
- **UpperChest** is optional. If using SDK2, leave it blank. SDK3 handles it fine
- All bones should be in a **T-pose** or **A-pose** (T-pose preferred for weight painting accuracy)

### Bone Naming

Unity's auto-mapper works best with standard naming. Cats/Avatar Toolkit can rename bones automatically. Common conventions:
- `Hips`, `Spine`, `Chest`, `Neck`, `Head`
- `Left_Shoulder`, `Left_UpperArm`, `Left_LowerArm`, `Left_Hand`
- `Left_UpperLeg`, `Left_LowerLeg`, `Left_Foot`
- `LeftEye`, `RightEye`

---

## 7. Weight Painting (VRChat-Specific Tips)

### The Basics

Weight painting controls how much each bone influences each vertex. Bad weight painting = weird stretching, clipping, and broken deformations.

### Workflow

1. **Start with Automatic Weights** -- Parent mesh to armature with Ctrl+P > Automatic Weights. This gives you a decent starting point
2. **Go to Pose Mode** and start posing the skeleton -- bend elbows, knees, rotate the spine, tilt the head
3. **When something looks wrong**, switch to Weight Paint mode while the pose is still active. The mesh will show the current deformation, making it much easier to see your fixes in real-time
4. **Paint corrections** using a mix of Add, Subtract, and Blur brushes

### VRChat-Specific Tips

| Tip | Details |
|-----|---------|
| **Overlap at joints** | The forearm should have a little influence past the elbow into the upper arm, and vice versa. This creates smooth bending instead of sharp creases |
| **Use Mirror X** | Enable it in weight paint mode for symmetrical models. Saves half your work |
| **Weight Gradient Tool** | Apply smooth gradients across areas like the torso for natural deformation |
| **Normalize All** | After painting, use Weights > Normalize All to ensure each vertex's weights sum to 1.0 |
| **Clean up** | Weights > Clean with a threshold of 0.01 to remove tiny, meaningless weights that waste performance |
| **Corrective Smooth** | As a LAST RESORT, add a Corrective Smooth modifier after the Armature modifier. Fix weights properly first |
| **Test every bone** | Rotate every single bone to extreme positions. Shoulders and hips are the hardest areas |
| **Check fingers** | If you have finger bones, verify that finger weights don't bleed into the palm or wrist |

### Common Weight Painting Problems

| Problem | Cause | Fix |
|---------|-------|-----|
| Mesh stretches to infinity when you move a bone | Vertices not assigned to any bone group | Paint those vertices to the nearest bone |
| Parts of the mesh don't move at all | Zero weight on all bones | Assign weights to the appropriate bone |
| Clipping through body when posing | Overlapping weights between opposing bones | Clean up the boundary between bone groups |
| Weird spikes or spears | Single vertices weighted to wrong bone | Use vertex select in weight paint mode to find and fix them |

---

## 8. Viseme Setup (Lip Sync)

VRChat uses the Oculus LipSync library which expects **15 shape keys** for full lip sync.

### The 15 VRChat Viseme Shape Keys

| # | Shape Key Name | Sound | Description |
|---|---------------|-------|-------------|
| 0 | `vrc.v_sil` | (silence) | Mouth at rest while mic is active. **IMPORTANT:** Must move at least 1 vertex slightly, or Unity will delete it on import |
| 1 | `vrc.v_PP` | p, b, m | Lips pressed together |
| 2 | `vrc.v_FF` | f, v | Lower lip tucked under upper teeth |
| 3 | `vrc.v_TH` | th | Tongue between teeth |
| 4 | `vrc.v_DD` | d, t, n | Tongue tip behind upper teeth, mouth slightly open |
| 5 | `vrc.v_kk` | k, g | Back of tongue raised |
| 6 | `vrc.v_CH` | ch, sh, j | Lips pushed forward, teeth close |
| 7 | `vrc.v_SS` | s, z | Teeth together, lips slightly parted |
| 8 | `vrc.v_nn` | n, ng | Relaxed mouth, slight opening |
| 9 | `vrc.v_RR` | r | Slightly open, lips rounded |
| 10 | `vrc.v_aa` | a (as in "father") | Wide open mouth |
| 11 | `vrc.v_E` | e (as in "bed") | Mid-open, lips spread |
| 12 | `vrc.v_ih` | i (as in "sit") | Slight open, lips spread |
| 13 | `vrc.v_oh` | o (as in "go") | Rounded lips, medium open |
| 14 | `vrc.v_ou` | u (as in "boot") | Tight rounded lips |

**Names are case-sensitive in Unity.**

### How to Create Them

**Method 1: Manual (most control)**
1. Select your mesh in Blender
2. Go to the Shape Keys panel (Object Data Properties > Shape Keys)
3. Create a Basis shape key first (the default/rest shape)
4. Add each of the 15 shape keys above, sculpting the mouth shape for each

**Method 2: Semi-Automatic with Cats/Avatar Toolkit (recommended)**
1. Create just 3 base shape keys:
   - **Mouth A** (open mouth, "ah" sound) -- this becomes the base for vrc.v_aa
   - **Mouth O** (rounded lips, "oh" sound) -- base for vrc.v_oh
   - **Mouth CH** (lips pushed forward, "ch/sh" sound) -- base for vrc.v_CH
2. Open Cats > Visemes panel
3. Assign the 3 shape keys in the dropdowns
4. Click "Create Visemes" -- Cats generates all 15 by blending your 3 base shapes

**Critical rule:** Your tongue, teeth, and face mesh must all be **combined into one mesh** for visemes to work. Shape keys only work per-mesh-object.

### Alternative: Jaw Bone Lip Sync

If you don't want to deal with 15 shape keys, VRChat also supports jaw-bone-based lip sync where a single jaw bone opens and closes. This is simpler but much less expressive. Set Lip Sync mode to "Jaw Flap Bone" in the Avatar Descriptor.

---

## 9. Eye Tracking & Blinking Setup

### Eye Tracking (Simulated Look-Around)

VRChat's Avatars 3.0 includes simulated eye movement out of the box -- your avatar's eyes will naturally look around at nearby players without any hardware.

**In Blender:**
1. Create two eye bones: `LeftEye` and `RightEye`
2. Parent both to the `Head` bone
3. Position each bone at the center/pivot point of the corresponding eye mesh
4. Bone's local Y-axis should point forward (out of the face)

**In Unity:**
1. In the FBX Rig tab > Humanoid > Configure, map `LeftEye` and `RightEye` to their slots
2. On the VRC Avatar Descriptor, enable **Eye Look**
3. Set Eye rotation limits (how far the eyes can rotate up/down/left/right)
4. Adjust "Confidence" and "Excitement" sliders to control how much the eyes move

### Eye Blinking

**In Blender:**
1. Create shape keys:
   - `Blink` (or `blink`) -- both eyes closed
   - Optionally: `Blink_L` (left eye only) and `Blink_R` (right eye only) for winking
2. Sculpt the eyelids closed for each shape key

**In Unity:**
1. In the VRC Avatar Descriptor > Eye Look > Eyelid Type: **Blendshapes**
2. Assign the Blink shape keys to the corresponding slots
3. VRChat will automatically trigger blink animations at random intervals

### Critical Requirements

- Eye tracking/blinking ONLY works if the **Avatar Descriptor component is on the model GameObject itself** (not on a parent empty)
- The eye bones must be correctly mapped in Unity's Humanoid rig configuration
- Blendshape normals must be configured correctly or blinking will cause visual artifacts

### Hardware Eye Tracking (Advanced)

For headsets with eye tracking hardware (Pimax, Quest Pro, etc.):
- Use **VRCFaceTracking** (OSC app): https://github.com/benaclejames/VRCFaceTracking
- Requires additional shape keys for gaze direction and eyelid positions
- Uses OSC parameters to drive blendshapes in real-time
- This is an advanced topic beyond beginner scope

---

## 10. Performance Ranks & Optimization Targets

VRChat rates every avatar on a performance scale. Many public worlds and events **block Very Poor avatars**. Aim for **Good** at minimum.

### PC Performance Rank Limits

| Metric | Excellent | Good | Medium | Poor | Very Poor |
|--------|-----------|------|--------|------|-----------|
| **Triangles** | 32,000 | 70,000 | 70,000 | 70,000 | >70,000 |
| **Texture Memory (VRAM)** | 40 MB | 75 MB | 110 MB | 150 MB | >150 MB |
| **Skinned Meshes** | 1 | 2 | 8 | 16 | >16 |
| **Material Slots** | 4 | 8 | 16 | 32 | >32 |
| **PhysBones Components** | 4 | 8 | 16 | 32 | >32 |
| **PhysBones Transforms** | 16 | 64 | 128 | 256 | >256 |
| **PhysBones Colliders** | 4 | 8 | 16 | 32 | >32 |
| **Particle Systems** | 0 | 4 | 8 | 16 | >16 |

### Quest/Android Limits (Much Stricter)

| Metric | Target |
|--------|--------|
| Triangles | 10,000 (hard limit for display) |
| SDK upload warning | 20,000 |
| Materials | As few as possible (1-2 ideal) |
| Texture size | 1024x1024 max recommended |
| Shaders | Must use VRChat mobile-compatible shaders |

### Optimization Tips

1. **Combine meshes** -- fewer skinned meshes = better rank. Aim for 1-2 meshes total
2. **Atlas textures** -- use Material Combiner to merge multiple materials into one texture atlas
3. **Reduce triangles** -- use Blender's Decimate modifier carefully, or manually retopologize
4. **Compress textures** -- downsize textures to 1024x1024 or 2048x2048 max
5. **Limit PhysBones** -- only add physics to things that really need to move (hair, tail, ears)
6. **Use Crunch compression** in Unity on textures to reduce VRAM usage
7. **Check your rank** in the SDK before uploading -- the build panel shows your exact stats

---

## 11. Common Beginner Mistakes

### In Blender

| Mistake | What Happens | Fix |
|---------|------------|-----|
| **Not applying transforms** before export | Model is rotated, scaled wrong, or offset in Unity | Always Ctrl+A > All Transforms before export |
| **Leaving leaf bones enabled** in FBX export | Extra useless bones appear in Unity, confuse auto-mapper | Uncheck "Add Leaf Bones" in FBX export |
| **Wrong axis settings** on export | Model faces wrong direction or is sideways in Unity | Set -Z Forward, Y Up |
| **Model not at world origin** | Avatar spawns offset from its collision capsule | Move model to 0,0,0 in Blender |
| **Separate meshes for body parts** | Multiple skinned meshes tank performance | Combine into 1-2 meshes (Join: Ctrl+J) |
| **Too many materials** | Exceeds Good rank material limit | Atlas textures using Material Combiner |
| **Forgetting to recalculate normals** | Dark spots, inside-out faces in Unity | Edit Mode > Mesh > Normals > Recalculate Outside |
| **Unweighted vertices** | Parts of mesh stretch to infinity or don't move | Check for zero-weight verts and assign them |
| **Empty shape keys** | Unity deletes them on import (especially vrc.v_sil) | Move at least 1 vertex slightly in every shape key |
| **Non-manifold geometry** | Holes, rendering artifacts, weight painting issues | Blender: Select > All by Trait > Non-Manifold, then fix |

### In Unity

| Mistake | What Happens | Fix |
|---------|------------|-----|
| **Animation Type not set to Humanoid** | VRChat can't use the rig | FBX Inspector > Rig > Animation Type: Humanoid |
| **Avatar Descriptor on parent object** | Eye tracking and blinking don't work | Put Avatar Descriptor directly on the model |
| **Not configuring humanoid bone mapping** | IK breaks, T-pose issues | Click Configure in Rig tab, verify all bones are mapped |
| **Forgetting viseme assignment** | No lip sync | Avatar Descriptor > Lip Sync > Viseme Blend Shape > assign all 15 |
| **Wrong Unity version** | Upload fails or content doesn't load | Use exactly Unity 2022.3.22f1 via Creator Companion |

---

## 12. How Long Does It Realistically Take?

### Complete Beginner (Never Used Blender)

| Phase | Time |
|-------|------|
| Learning Blender basics (navigation, modeling tools) | 1-2 weeks (a few hours/day) |
| Modeling a simple humanoid character | 2-4 weeks |
| UV unwrapping and texturing | 1-2 weeks |
| Rigging (creating armature, basic weight painting) | 1-2 weeks |
| Shape keys (visemes, blink) | 2-4 days |
| Unity setup and first upload | 1-2 days |
| **Total for a simple custom avatar from scratch** | **6-12 weeks** |

### With Some 3D Experience

| Phase | Time |
|-------|------|
| Modeling | 1-2 weeks |
| Rigging + weight painting | 3-7 days |
| Shape keys + texturing | 2-4 days |
| Unity upload | A few hours |
| **Total** | **2-4 weeks** |

### Using a Pre-Made Base / Editing an Existing Avatar

| Phase | Time |
|-------|------|
| Customizing mesh (colors, accessories) | 1-3 days |
| Adjusting weights if needed | A few hours |
| Unity setup and upload | 1-2 hours |
| **Total** | **1-5 days** |

### Realistic Advice

- **Start by modifying an existing avatar**, not building from scratch. Buy or download a base model, take it apart, learn how it works
- Your FIRST from-scratch avatar will probably look rough. That's fine. You'll learn the most from making mistakes
- The hardest parts to learn are weight painting and getting the FBX export right
- Each subsequent avatar gets dramatically faster. Avatar #3 might take 1/3 the time of avatar #1

---

## 13. Template & Starter Files

### Official VRChat Template

- **VRChat Avatar Template Project**: https://github.com/vrchat-community/template-avatar
- Download as zip or use via Creator Companion
- Pre-configured Unity project with SDK already installed
- Includes a sample avatar you can study

### Pre-Made Base Meshes

| Resource | What It Is | Link |
|----------|-----------|------|
| **VRChat Base Rig** (Shunaka) | Free Blender armature template with correct bone hierarchy | https://shunaka.gumroad.com/l/CbdBI |
| **Soap Cats** (IronicSoap) | Free/paid VRChat avatar base with full rig | https://ironicsoap.gumroad.com/l/SoapCats |
| **VRCMods** | Community uploads -- free avatars, models, animations | https://vrcmods.com/ |
| **Booth.pm** | Japanese marketplace with tons of VRChat avatar bases (many free) | https://booth.pm/ (search "VRChat avatar base") |
| **Jinxxy** | Avatar assets and bases | https://jinxxy.com/ |
| **Gumroad** | Many creators sell avatar bases here | Search "VRChat avatar base" |

### Recommended Starting Approach

1. Download a free base like the VRChat Base Rig or Soap Cats
2. Open it in Blender, study the bone hierarchy and weight painting
3. Modify it (change proportions, add accessories, retexture)
4. Upload it to VRChat to understand the full pipeline
5. THEN start your own model from scratch, using what you learned

---

## 14. Best YouTube Channels & Tutorials

### Dedicated VRChat Avatar Creation

| Creator | Focus | Notes |
|---------|-------|-------|
| **Rainhet Chaneru** | Full Blender-to-VRChat avatar tutorials | Long-form, thorough explanations. Covers modeling, Unity, VTuber setup. Has a paid comprehensive course on Gumroad |
| **Tupper** | VRChat avatar tutorials, optimization talks | Recommended by VRChat community. Focuses on practical avatar work |
| **VRChat Official** | SDK guides, Creator Companion setup | Official channel -- good for Unity/SDK-side setup |

### General Blender Skills (Apply to Avatar Work)

| Creator | Focus | Notes |
|---------|-------|-------|
| **Blender Guru** (Andrew Price) | Blender fundamentals, donut tutorial | The classic starting point for learning Blender |
| **Grant Abbitt** | Beginner Blender tutorials, character modeling | Very approachable, great for fundamentals |
| **Royal Skies LLC** | Blender tutorials including character work | Good weight painting and rigging tutorials |
| **Dikko** | Character modeling and topology | Excellent for understanding face/body topology for animation |

### Specific Tutorial Resources

| Resource | What It Covers |
|----------|---------------|
| **VRChat Creation Docs** (creators.vrchat.com) | Official documentation -- always check here first |
| **VRC School** (vrc.school) | Structured guides for avatars and worlds |
| **VRCLibrary** (vrclibrary.com) | Community wiki with avatar creation compendium |
| **The VRChat Content Creation Compendium** (Steam Guide) | Comprehensive community guide |
| **awesome-vrchat** (GitHub: madjin/awesome-vrchat) | Curated list of all VRChat creation resources |

### Suggested Learning Path

1. **Week 1-2:** Blender Guru's Donut Tutorial (learn the interface)
2. **Week 3-4:** Grant Abbitt's character modeling basics
3. **Week 5:** Rainhet's VRChat avatar tutorial (end-to-end process)
4. **Week 6:** Follow VRChat's official "Creating Your First Avatar" guide with a pre-made model
5. **Week 7+:** Start your own model, referencing Tupper's optimization tips

---

## 15. Quick-Reference Checklists

### Pre-Export Checklist (Blender)

```
[ ] Model is at world origin (0, 0, 0)
[ ] Model is upright and facing -Y (Blender's default forward)
[ ] Scale is correct (1 unit = 1 meter, avatar ~1.5-1.8 units tall)
[ ] All transforms applied (Ctrl+A > All Transforms)
[ ] Normals recalculated and facing outward
[ ] No loose vertices, duplicate faces, or non-manifold geometry
[ ] All meshes combined into 1-2 objects (body + optional transparent mesh)
[ ] Armature follows VRChat humanoid hierarchy
[ ] Weight painting tested on ALL bones in Pose mode
[ ] Shape keys created: 15 visemes + blink shapes
[ ] No empty shape keys (vrc.v_sil has at least 1 vertex moved)
[ ] Materials count checked (aim for 4-8 max)
[ ] Poly count checked (aim for under 70K tris, ideally under 32K)
[ ] UV maps are clean with no overlapping (unless intentional)
[ ] Vertex colors are white or deleted (for Quest compatibility)
```

### FBX Export Checklist

```
[ ] Selected Objects: ON (select mesh + armature first)
[ ] Forward: -Z Forward
[ ] Up: Y Up
[ ] Apply Scalings: FBX Units Scale
[ ] Apply Transform: ON
[ ] Add Leaf Bones: OFF
[ ] Smoothing: Face
[ ] Bake Animation: OFF (unless exporting anims)
```

### Unity Import Checklist

```
[ ] Unity version: 2022.3.22f1 (via Creator Companion)
[ ] FBX Rig tab: Animation Type = Humanoid
[ ] Configure: all required bones mapped
[ ] Model tab: Legacy Blend Shape Normals = ON (if blendshape visual issues)
[ ] Avatar Descriptor: on the model GameObject directly
[ ] Lip Sync: Viseme Blend Shape, all 15 assigned
[ ] Eye Look: enabled, eye bones assigned, rotation limits set
[ ] View Position: set to between the eyes, slightly forward
[ ] Performance Rank: checked in build panel (aim for Good or better)
[ ] Test locally before uploading
```

---

## Sources & Links

- [VRChat Official Creator Docs](https://creators.vrchat.com/)
- [Creating Your First Avatar](https://creators.vrchat.com/avatars/creating-your-first-avatar/)
- [VRChat Rig Requirements](https://creators.vrchat.com/avatars/rig-requirements/)
- [Performance Ranking System](https://creators.vrchat.com/avatars/avatar-performance-ranking-system/)
- [Avatar Optimization Tips](https://creators.vrchat.com/avatars/avatar-optimizing-tips/)
- [Cats Blender Plugin (Neoneko fork, archived)](https://github.com/teamneoneko/Cats-Blender-Plugin)
- [Avatar Toolkit (RinaDev fork, active)](https://github.com/RinaDev-xyz/Avatar-Toolkit-rinadev)
- [Material Combiner Addon](https://github.com/Grim-es/material-combiner-addon)
- [VRCFaceTracking](https://github.com/benaclejames/VRCFaceTracking)
- [VRChat Template Avatar Project](https://github.com/vrchat-community/template-avatar)
- [awesome-vrchat (curated resource list)](https://github.com/madjin/awesome-vrchat)
- [VRCLibrary Avatar Creation Compendium](https://vrclibrary.com/wiki/books/the-vrchat-creation-compendium/page/custom-avatar-creation-blender)
- [VRC School - Avatar Rigs](https://vrc.school/docs/Unity-Animations/Avatar-Rigs/)
- [Immersive Scaler (proportions tool)](https://github.com/triazo/immersive_scaler)
- [VRChat Base Rig (Shunaka)](https://shunaka.gumroad.com/l/CbdBI)
- [Blender to Unity Export Guide](https://www.immersivelimit.com/tutorials/blender-to-unity-export-correct-scale-rotation)
- [Mastering 3D Model Export for VRChat](https://www.homestyler.com/article/mastering-d-model-export-for-vrchat)
- [VIVE Blog - How to Make a VRChat Avatar in 2025](https://blog.vive.com/us/how-to-make-a-vrchat-avatar-in-2025-beginners-guide/)
- [VRChat Visemes Wiki](https://wiki.vrchat.com/wiki/Visemes)
