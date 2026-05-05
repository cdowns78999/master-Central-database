# Deep Dive: Unity + VRChat SDK Pipeline — The Complete Upload System

> Research compiled March 2026. Covers VRChat SDK 3.10.x, Unity 2022.3.22f1, and all current avatar systems.

---

## Table of Contents

1. [VRChat Creator Companion (VCC)](#1-vrchat-creator-companion-vcc)
2. [Required Unity Version](#2-required-unity-version)
3. [SDK Version and What's New](#3-sdk-version-and-whats-new)
4. [Step-by-Step Avatar Upload Process](#4-step-by-step-avatar-upload-process)
5. [Avatar Descriptor Setup](#5-avatar-descriptor-setup)
6. [PhysBones System](#6-physbones-system)
7. [Expression Menu System](#7-expression-menu-system)
8. [Contact System](#8-contact-system)
9. [FX Layer and Gesture Layer](#9-fx-layer-and-gesture-layer)
10. [Common Unity Errors and Fixes](#10-common-unity-errors-and-fixes)
11. [Performance Optimization](#11-performance-optimization)
12. [Testing Avatars Locally](#12-testing-avatars-locally)
13. [SDK Validation Warnings](#13-sdk-validation-warnings)
14. [Best Unity Plugins for VRChat](#14-best-unity-plugins-for-vrchat)
15. [Head Chop Component](#15-head-chop-component)

---

## 1. VRChat Creator Companion (VCC)

### What It Is

The VRChat Creator Companion (VCC) is the official all-in-one hub for VRChat content creation. It replaced the old manual SDK `.unitypackage` workflow. Instead of hunting for the right Unity version and importing SDKs by hand, VCC handles everything through the VRChat Package Manager (VPM).

### What It Does

- Installs and manages the correct Unity version
- Creates new avatar and world projects from templates
- Manages VRChat SDK packages (install, update, remove)
- Adds community packages (VRCFury, Modular Avatar, etc.)
- Keeps all your projects organized in one dashboard

### System Requirements

- Windows 10 or 11 (64-bit only)
- Unity Hub (VCC will prompt you to install if missing)
- A VRChat account with "New User" trust rank or higher

### How to Install

1. **Download VCC** from https://vrchat.com/home/download (direct link: https://vrchat.com/download/vcc)
2. **Run the installer** — installs to `%LOCALAPPDATA%\Programs` by default (e.g., `C:\Users\YourName\AppData\Local\Programs`)
3. **Launch VCC** — on first run, it checks for Unity Hub and Unity. If missing, it walks you through installing both
4. **Sign in** with your VRChat account

### Creating a New Avatar Project

1. Click **"New"** in the left navigation
2. Select the **"Avatar"** template (this pre-loads the Avatars 3.0 SDK)
3. Name your project and choose a folder
4. Click **"Create Project"**
5. VCC generates a clean Unity project with the SDK already wired in

### Managing Packages

- Open any project in VCC to see installed packages
- Click **"Manage Project"** to add/remove/update packages
- Community packages (like VRCFury, Modular Avatar) can be added via custom repository URLs
- VCC auto-detects when SDK updates are available

---

## 2. Required Unity Version

### Current Version (as of March 2026)

**Unity 2022.3.22f1** — This is the mandatory version. Do not deviate.

### Critical Rules

- **Do NOT upgrade** beyond 2022.3.22f1 — content uploaded from a newer version will fail to load in VRChat
- **Do NOT use older versions** — SDK features may break or be missing
- VCC will install this exact version for you via Unity Hub if you follow its setup flow
- If Unity Hub warns you about a security vulnerability (the October 2025 notice), you can **safely ignore** it for VRChat projects — the vulnerability does not apply to VRChat content creation

### How to Verify Your Version

1. Open Unity Hub
2. Go to **Installs** tab
3. Confirm `2022.3.22f1` is listed and active
4. If your project opens with a different version, close it, and re-open with the correct one via Unity Hub

### Historical Context

- SDK 3.4.2 and earlier used Unity 2019.4.31f1
- The migration to 2022 LTS happened with SDK 3.5.x
- All new projects should use 2022.3.22f1 exclusively

---

## 3. SDK Version and What's New

### Current SDK: 3.10.2 (Released February 5, 2026)

The latest SDK brings a large batch of fixes, UX improvements, and new Udon APIs.

### SDK Release Timeline (Recent)

| Version | Key Additions |
|---------|--------------|
| **3.10.2** | EventTiming.PostLateUpdate and FixedUpdate for delayed Udon events. Client log file reader in SDK. Many bug fixes |
| **3.10.1** | Critical avatar SDK bug fixes |
| **3.9.0** | Udon API for camera dolly, Auto Hold mode for pickups, Network ID Utility improvements, VRCCameraSettings APIs |
| **3.8.2** | Spawn radius setting for worlds, Item Unity layer matching, bug fixes |
| **3.8.1** | Toon Standard shader (mobile-compatible), Udon network events with parameters, Camera access and Network Debug Stats in Udon, Build & Test for iOS |
| **3.8.0** | Udon interface for VRChat+ Drone, PhysBones improvements, bug fixes |

### How to Update SDK

1. Open VCC
2. Click on your project
3. If an update is available, VCC shows a notification
4. Click **"Update"** next to the SDK package
5. Re-open Unity — the SDK auto-migrates

**Never manually import SDK .unitypackage files.** Always go through VCC.

---

## 4. Step-by-Step Avatar Upload Process

### Prerequisites

- VRChat account at "New User" trust rank or higher
- Steam/Meta accounts must be linked to a VRChat account first
- VCC installed with a project created from the Avatar template
- Your avatar model (FBX or .unitypackage from a creator)

### The Full Process

#### Step 1: Import Your Avatar

- **If .unitypackage**: Drag into Unity's Project window, or `Assets > Import Package > Custom Package`. Check all files, click Import
- **If FBX**: Drop the FBX into your `Assets` folder. Unity auto-imports it
- Open the included scene file, OR drag the avatar prefab from the Project window into the Hierarchy

#### Step 2: Verify the Rig

1. Select your avatar's FBX in the Project window
2. Go to the **Rig** tab in the Inspector
3. Set **Animation Type** to **Humanoid**
4. Click **Apply**
5. Click **Configure** to verify bone mapping — all required bones (hips, spine, head, arms, legs) should be auto-mapped. Fix any red/missing bones

#### Step 3: Add the VRC Avatar Descriptor

1. Select your avatar's root GameObject in the Hierarchy
2. Click **Add Component** in the Inspector
3. Search for **VRC Avatar Descriptor** and add it
4. Most purchased avatars already have this pre-configured

#### Step 4: Configure the Descriptor

- Set **View Position** (gray ball gizmo — should be between the eyes)
- Configure **Lip Sync** (usually auto-detected)
- Set up **Eye Look** if desired
- Assign **Playable Layers** if using custom animators
- Set **Expressions Menu** and **Expression Parameters**

(See Section 5 for full descriptor details)

#### Step 5: Log into the SDK

1. Go to `VRChat SDK > Show Control Panel` in Unity's top menu
2. Click the **Authentication** tab
3. Log in with your VRChat credentials
4. Wait for "Logged in as [username]" confirmation

#### Step 6: Review the Builder Panel

1. Click the **Builder** tab in the SDK Control Panel
2. Your avatar should appear in the list
3. Read the **Validations** section carefully:
   - **Red errors** = must fix before uploading
   - **Yellow warnings** = optional but recommended to fix
   - Some have **"Auto Fix"** buttons — use them
4. Common warnings: too many triangles, too many materials, missing components

#### Step 7: Fill in Upload Details

- **Avatar Name**: What it shows up as in your avatar list
- **Description**: Optional but useful
- **Visibility**: Private (only you) or Public
- **Content Warnings**: Check if applicable (violence, gore, etc.)
- **Thumbnail**: Upload an image or capture from the scene camera

#### Step 8: Build and Publish

- Click **"Build & Publish Your Avatar Online"**
- Unity compiles, bundles, and uploads to VRChat servers
- Progress bar shows in the bottom of the Unity window
- On success: **"Upload Succeeded!"** dialog appears

#### Step 9: Verify In-Game

1. Launch VRChat
2. Open your Launch Pad
3. Go to **Avatars > Uploaded**
4. Your new avatar should be listed
5. Select and equip it

### If Upload Fails

- Check the Unity Console (`Ctrl + Shift + C`) for red errors
- Common causes: wrong Unity version, VPN interference, firewall blocking, corrupted assets
- Try: disable VPN, restart Unity, re-import the avatar package

---

## 5. Avatar Descriptor Setup

The `VRC Avatar Descriptor` component is what turns a regular GameObject into a VRChat avatar. It requires an Animator component and a Humanoid rig.

### View Position

The view position determines where your eyes are in first-person VR. It shows as a **gray ball gizmo** in the Scene view.

**How to set it:**
1. Click **"Edit"** next to View Position in the descriptor
2. Move the handles so the ball sits **between and slightly behind the avatar's eyes**
3. Click the green **"Return"** button when done

**How VRChat uses it:**
- Plays the T-Pose controller
- Compares view position location to the head bone
- Saves the offset — this becomes your viewpoint during gameplay

**Tips:**
- Don't place it inside the head mesh — put it where actual eyes would look from
- If your avatar's eyes are large/stylized, center it in the pupils
- Incorrect placement = you'll feel too tall, too short, or off-center

### Lip Sync

Controls how the avatar's mouth moves when you speak. VRChat animates a built-in `Viseme` parameter (0-14) based on detected speech.

**Lip Sync Modes:**

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Viseme Blend Shapes** | Modifies mesh blend shapes matching viseme names | Most avatars — this is the standard |
| **Jaw Flap Bone** | Rotates a specified bone open/closed based on volume | Simple jaw-open models |
| **Jaw Flap Blend Shape** | Uses a single blend shape for open/close based on volume | Simple mouth rigs |
| **Viseme Parameter Only** | Sets the Viseme parameter (0-14) without controlling visuals | Custom animation setups |

**Setting up Viseme Blend Shapes (most common):**
1. Click **"Auto Detect!"** in the lip sync section — the SDK scans for blend shapes named `v_sil`, `v_aa`, `v_ch`, etc.
2. If auto-detect doesn't find them, manually assign a **Skinned Mesh Renderer** (usually the face/body mesh)
3. Map each viseme slot to the correct blend shape

**Standard viseme blend shape naming:** `vrc.v_sil`, `vrc.v_aa`, `vrc.v_ch`, `vrc.v_dd`, `vrc.v_e`, `vrc.v_ff`, `vrc.v_ih`, `vrc.v_kk`, `vrc.v_nn`, `vrc.v_oh`, `vrc.v_ou`, `vrc.v_pp`, `vrc.v_rr`, `vrc.v_ss`, `vrc.v_th`

### Eye Look / Eye Tracking

Controls how your avatar's eyes move when looking around. Disabled by default.

**Enabling:**
1. Click the **"Enable"** button in the Eye Look section
2. The section expands with General, Eyes, and Eyelids tabs

**General Tab — Behavior Sliders:**
- **Calm ←→ Excited**: How much the eyes dart around randomly
- **Shy ←→ Confident**: How much the eyes look at other players during conversation

**Eyes Tab — Bone Setup:**
1. Assign **Left Eye** and **Right Eye** bones (NOT the humanoid rig eye bones — use the actual eye mesh bones)
2. Set rotations for five states:
   - **Straight** (default — usually 0,0,0)
   - **Looking Up**
   - **Looking Down**
   - **Looking Left**
   - **Looking Right**
3. Use the **"Preview"** button to test each direction

**Eyelids Tab — Two Options:**

| Type | Setup |
|------|-------|
| **Blend Shapes** | Select a mesh, assign blink, looking-up, and looking-down blend shapes |
| **Bones** | Configure 4 bones (2 per eye, upper+lower lid) with rotations for Default, Closed, Looking Up, Looking Down (uses quaternions, not Euler) |

---

## 6. PhysBones System

PhysBones are VRChat's built-in physics system for secondary motion — hair, tails, ears, clothing, chains, plants, anything that should jiggle, sway, or bounce. They replaced Dynamic Bones (a paid Unity asset) with a free, more performant alternative.

### Core Component: VRCPhysBone

Add this to a bone in your avatar's hierarchy. The component affects that bone and all its children.

**Critical Warning:** Never put PhysBones on humanoid bones (hips, spine, chest, shoulders, arms, legs). This WILL break your avatar's locomotion.

### Version Selection

| Version | Behavior |
|---------|----------|
| **1.0** | Length stays fixed. Gravity competes as a force. Stiffness competes with pull |
| **1.1** | Length can stretch/squish. Gravity blends positioning. Stiffness uses absolute blending. **Recommended for new setups** |

### Forces (Core Properties)

| Property | What It Does | Range |
|----------|-------------|-------|
| **Pull** | How quickly bones return to their original position. Higher = less bouncy | 0–1 |
| **Spring** (Simplified mode) | Makes bones wigglier, carries velocity through | 0–1 |
| **Momentum** (Advanced mode) | Makes bones harder to start moving but allows wiggle once moving | 0–1 |
| **Stiffness** (Advanced mode) | Dampens overall bone movement toward rest position | 0–1 |
| **Gravity** | Pulls bones downward. Positive = down, negative = up | -1 to 1 |
| **Gravity Falloff** | Reduces gravity effect when bones are near rest position. 1.0 = no gravity at rest | 0–1 |
| **Immobile Type** | "All Motion" dampens all sources. "World" dampens only avatar movement | Dropdown |
| **Immobile** | How much motion from the avatar is dampened | 0–1 |

### Limits

Limits constrain how far bones can move from their rest rotation. Essential for preventing clipping.

| Limit Type | Behavior | Use Case |
|------------|----------|----------|
| **None** | No constraints | Free-moving chains |
| **Angle** | Restricts to a cone from the set direction | Hair, general purpose |
| **Hinge** | Single-axis movement (like a door hinge) | Tails, jaw bones |
| **Polar** | Hinge with adjustable width. Most expensive | Complex ear movement |

**Tip:** Limits are far more performant than using colliders to prevent clipping. Use limits first, colliders second.

### Collision

| Property | What It Does |
|----------|-------------|
| **Collision Radius** | Size of the collision sphere per bone (in meters). Bones connect via cylinders |
| **Allow Collision** | Dropdown: whose hand/finger colliders can interact (self, others, both) |
| **Colliders** | List of specific VRCPhysBoneCollider references for custom collision surfaces |

### Collider Component: VRCPhysBoneCollider

A separate component you add to bones/objects to create collision surfaces.

**Shapes:**
- **Sphere**: Defined by radius
- **Capsule**: Defined by height + radius
- **Plane**: Infinite X/Z plane, +Y facing

**Key Options:**
- **Inside Bounds**: Forces bones inward toward center (useful for keeping things inside a volume)
- **Bones As Spheres**: Ignores connecting cylinders, only checks sphere endpoints

### Stretch & Squish (Version 1.1 only)

| Property | What It Does |
|----------|-------------|
| **Stretch Motion** | How much movement elongates bones (0–1) |
| **Max Stretch** | Maximum stretch as multiplier of original length |
| **Max Squish** | Maximum compression as multiplier of original length |

**Note:** Collision always applies stretch/squish regardless of these settings.

### Grab & Pose

| Property | What It Does |
|----------|-------------|
| **Allow Grabbing** | Other players can grab PhysBone chains |
| **Allow Posing** | Other players can freeze bones in new positions (pull trigger while grabbing) |
| **Grab Movement** | 1.0 = instant snap to hand. 0.0 = uses force values for gradual pull |
| **Snap to Hand** | ON = snaps to hand center. OFF = maintains the offset from where you grabbed |

**Releasing poses:** Quick Action menu > Release Poses

### Generated Parameters

When you name a PhysBone parameter (e.g., "Hair"), these animator parameters auto-generate:

| Parameter | Type | Value |
|-----------|------|-------|
| `Hair_IsGrabbed` | Bool | True when being grabbed |
| `Hair_IsPosed` | Bool | True when frozen in a pose |
| `Hair_Angle` | Float | 0–1 representing 0–180 degrees from rest |
| `Hair_Stretch` | Float | 0–1 scale of stretch amount |
| `Hair_Squish` | Float | 0–1 scale of squish amount |

### Recommended Starter Values

These are starting points — always tune by testing in-game.

**Hair (long, flowing):**
| Property | Value |
|----------|-------|
| Pull | 0.5 |
| Spring | 0.8 |
| Stiffness | 0.4 |
| Gravity | 0.3 |
| Gravity Falloff | 1.0 (if modeled at rest) |
| Immobile | 0.75 |
| Limit Type | Angle, ~45° |

**Tail (medium weight):**
| Property | Value |
|----------|-------|
| Pull | 0.2 |
| Spring | 0.5 |
| Stiffness | 0.3 |
| Gravity | 0.01–0.1 |
| Immobile | 0.1 |
| Limit Type | Hinge or Angle, ~60° |

**Ears (short, stiff):**
| Property | Value |
|----------|-------|
| Pull | 0.6 |
| Spring | 0.4 |
| Stiffness | 0.7 |
| Gravity | 0 |
| Immobile | 0.5 |
| Limit Type | Angle, ~20–30° |

**General tuning philosophy:** Balance between floppy-enough-to-look-dynamic and rigid-enough-to-not-spaz-out during fast movement.

---

## 7. Expression Menu System

The Expression Menu lets you control your avatar's animations, toggles, and features through VRChat's radial menu (the circle menu you open in-game).

### Two Required Assets

1. **VRC Expression Parameters** — defines what parameters exist and how they sync
2. **VRC Expressions Menu** — defines the menu structure and controls

Both are assigned in the Avatar Descriptor under the **Expressions** section. Click "Customize" to assign your own.

### VRC Expression Parameters

**Creating:** Right-click in Project > Create > VRChat > Avatars > Expression Parameters

**Each parameter has:**

| Field | Purpose |
|-------|---------|
| **Name** | Must match exactly with animator controller parameter names |
| **Type** | `Int` (0–255 synced), `Float` (-1.0 to 1.0 in 1/127 steps), or `Bool` |
| **Default** | Value used on avatar reset or world rejoin (if not saved) |
| **Saved** | Whether the value persists between sessions |
| **Synced** | Whether other players see the value |

**Sync Cost:** Float and Int each cost 8 bits. Bool costs 1 bit. Maximum total: **256 bits** synced.

**Unsynced parameters** are free — they don't count toward the 256-bit limit but only exist locally.

### VRC Expressions Menu

**Creating:** Right-click in Project > Create > VRChat > Avatars > Expressions Menu

Each menu holds up to **8 controls** arranged in a circle.

### Control Types

#### 1. Button
- Activates a parameter temporarily while pressed (minimum 0.2 seconds)
- Good for: triggering one-shot animations, emotes

#### 2. Toggle
- Turns a parameter ON/OFF
- Bool: True when enabled, False when disabled
- Int/Float: Sets to the specified `Value` when ON, 0 when OFF
- Good for: clothing on/off, effects, accessories
- Uses **Playable Sync** (updates on-demand, not continuously)

#### 3. Sub Menu
- Opens another Expressions Menu (nested menus)
- Can optionally toggle a parameter while viewing the submenu
- Good for: organizing many controls into categories

#### 4. Two Axis Puppet
- Controls two Float parameters simultaneously with a joystick-like control
- Horizontal and Vertical axes, each mapped to a parameter
- Values range from -1.0 to 1.0
- Uses **IK Sync** when open (faster, more precise)
- Good for: ear/tail position control, directional effects

#### 5. Four Axis Puppet
- Four independent parameters (Up, Down, Left, Right)
- Each ranges from 0.0 to 1.0
- Good for: controlling four separate blend shapes or features independently

#### 6. Radial Puppet
- A single rotating dial
- Maps rotation to a Float parameter (0.0 to 1.0)
- Value is saved when you close the control
- Good for: hue shifts, opacity sliders, blend shape intensity, exclusive toggles (e.g., outfit selector)

### Sync Modes

| Mode | Used By | Behavior |
|------|---------|----------|
| **Playable Sync** | Button, Toggle | Updates on-demand, not continuous. Good for toggles |
| **IK Sync** | Puppet controls | Syncs live while the control is open. Faster/smoother |

### Gesture Parameters (Built-in)

VRChat provides gesture detection parameters automatically:

| Parameter | Type | Values |
|-----------|------|--------|
| `GestureLeft` | Int | 0=Neutral, 1=Fist, 2=Open, 3=Point, 4=Peace, 5=RockNRoll, 6=Gun, 7=Thumbs Up |
| `GestureRight` | Int | Same as above |
| `GestureLeftWeight` | Float | 0.0–1.0 (trigger pull amount during fist gesture) |
| `GestureRightWeight` | Float | Same as above |

These can be used in animator conditions to trigger different animations per hand gesture.

---

## 8. Contact System

Contacts enable **cross-avatar interaction** — headpats, boops, high-fives, and any touch-based response between players. The system uses two components: **Contact Senders** (the thing doing the touching) and **Contact Receivers** (the thing being touched).

### How It Works

1. Player A's **Contact Sender** (e.g., on their finger) enters Player B's **Contact Receiver** (e.g., on their head)
2. If both share at least one matching **Collision Tag**, the receiver fires
3. The receiver sets a parameter on Player B's avatar, which drives an animation (e.g., heart particles, ear wiggle)

### Contact Sender (VRCContactSender)

The simple component — it exists to be detected.

| Property | Purpose |
|----------|---------|
| **Root Transform** | The bone/object this sender follows (defaults to the GameObject it's on) |
| **Shape** | Sphere or Capsule |
| **Radius** | Size of the detection volume |
| **Height** | For capsules only |
| **Position/Rotation** | Local offset from root transform |
| **Collision Tags** | List of string tags — must match at least one tag on the receiver |

VRChat automatically creates senders on your avatar's finger/hand colliders based on the Avatar Descriptor's collider settings.

### Contact Receiver (VRCContactReceiver)

The complex component that processes interactions.

| Property | Purpose |
|----------|---------|
| **Root Transform** | What bone/object this receiver follows |
| **Shape** | Sphere or Capsule |
| **Allow Self** | Can you trigger your own receiver |
| **Allow Others** | Can other players trigger it |
| **Local Only** | Removes this receiver on other players' machines (useful for local-only effects) |
| **Collision Tags** | Must share at least one tag with the sender |
| **Parameter** | The animator parameter this receiver controls |

### Receiver Types

| Type | Behavior | Use Case |
|------|----------|----------|
| **Constant** | Parameter = 1.0 while a sender is inside, 0.0 otherwise | Sustained contact (headpat held down) |
| **On Enter** | Parameter = 1.0 for one frame when contact starts (requires minimum velocity) | Quick taps (boops) |
| **Proximity** | Parameter = 0.0–1.0 based on distance from receiver center | Gradual effects (glow as hand approaches) |

### Tag Matching

Both sender and receiver need at least one matching string tag for interaction. Example:
- Sender tags: `"Finger", "Hand"`
- Receiver tags: `"Finger", "Head"`
- Result: **Match** on "Finger" — interaction triggers

### Setting Up Headpats

1. Add a **VRCContactReceiver** to the head bone
2. Set Shape to Sphere, position it on top of the head
3. Set **Collision Tags** to `"Head"` (matches default finger senders)
4. Set **Receiver Type** to `Constant` or `Proximity`
5. Set **Parameter** to something like `HeadPat`
6. In your FX animator, create a layer that triggers an animation (heart particles, ear flatten) when `HeadPat > 0`

### Setting Up Boops (Nose)

1. Add a **VRCContactReceiver** to the head bone
2. Position it on the nose with a small radius
3. Set **Collision Tags** to `"Finger"`
4. Set **Receiver Type** to `OnEnter`
5. Set **Parameter** to `NoseBoop`
6. In your FX animator, trigger a quick reaction animation when `NoseBoop = true`

### Limitations

- You cannot change Contact Receiver/Sender values via animations at runtime
- If multiple receivers control the same parameter, the last enabled one wins
- Contacts have performance cost — use sparingly on mobile builds

### Community Prefabs

Packages like **Basic Dynamics** by Rafacasari provide pre-made prefab setups for Kiss, Boop, Headpat, High-Five, and Slap interactions that you can drop onto any avatar.

---

## 9. FX Layer and Gesture Layer

VRChat uses a **Playable Layer** system to combine multiple animator controllers. They stack in order:

**Base (Locomotion) → Additive → Gesture → Action → FX**

Later layers can override earlier ones when animating the same properties.

### All Five Layers Explained

#### Base (Locomotion)
- Animates the humanoid skeleton (excluding hands)
- Handles walking, running, jumping, falling, crouching
- Usually left at default unless you use a custom locomotion system (e.g., GoGo Loco)

#### Additive
- Applies skeletal animations **on top of** locomotion using additive blending
- Default: breathing animation
- Good for: idle breathing, subtle body movement overlays

#### Gesture
- Animates **humanoid hands** specifically
- Should use the `VRC_HandsOnly` avatar mask
- Commonly: copy the sample controller `vrc_AvatarV3HandsLayer` and edit it with your custom hand poses/facial expressions per gesture
- Can animate other transforms, but be careful of FX layer conflicts

#### Action
- Controls the full skeleton during **emotes**
- Defaults to weight 0 (off)
- Activated via `VRC Playable Layer Control` behavior, then blended back down when emote ends
- Good for: sitting emotes, dance moves, full-body poses

#### FX
- The **most important layer for customization**
- Animates **everything that ISN'T humanoid skeleton transforms**: material swaps, shader property changes, blend shapes, toggles, particle systems, object enable/disable
- Special property: material and blend shape animations in FX are **copied to your mirror clone** (other layers don't do this)
- This is where 90% of your custom avatar logic goes

### Critical Masking Rule

If your Gesture layer animates any transforms, those same transforms must be **DISABLED** in your FX layer mask. Otherwise, the FX layer (which runs later) will overwrite the Gesture layer's animations and you'll see nothing.

### Write Defaults

| Setting | Behavior |
|---------|----------|
| **Write Defaults ON** | Animated properties return to default when leaving a state |
| **Write Defaults OFF** | Changes persist after leaving a state. VRChat's recommendation |

**Best Practice:** Keep Write Defaults **OFF** on all states. VRChat's sample controllers use WD Off.

**Rules for WD Off:**
- Every property you want to control must be explicitly animated
- You may need "reset" animations that set properties back to their default state
- If you animate transforms in FX with WD Off, it overrides ALL transforms from other layers unless you apply proper avatar masks

**Mixing WD On/Off in the same controller will cause unpredictable behavior.** Pick one and stick with it.

### Where to Find Sample Controllers

`Packages/com.vrchat.avatars/Samples/AV3 Demo Assets/Animation/Controllers/`

Copy these as starting points — never edit the originals.

### Practical FX Layer Setup (Toggle Example)

1. Create a new Animator Controller
2. Create a new layer (e.g., "Hat Toggle")
3. Set layer weight to **1**
4. Add two states: "Hat On" and "Hat Off"
5. Create animation clips for each state (one enables the hat object, one disables it)
6. Add a Bool parameter (e.g., `HatToggle`)
7. Add transitions between states using the parameter as condition
8. Set transition duration to 0, exit time unchecked
9. Assign this controller to the FX layer in the Avatar Descriptor

---

## 10. Common Unity Errors and Fixes

### Error: "Build Was Blocked"

**Causes:**
- Outdated or mismatched SDK version
- Corrupted project files
- Wrong Unity version
- Firewall/antivirus blocking the upload

**Fix:**
- Ensure you're using VCC to manage the project (not manual SDK imports)
- Verify Unity version is exactly 2022.3.22f1
- Temporarily disable antivirus/firewall during upload
- Try a clean project if the current one is old/cluttered

### Error: Missing Scripts (Pink/Purple materials, broken components)

**Causes:**
- Old Dynamic Bones scripts (from pre-PhysBones era)
- Missing shader packages
- Imported package had dependencies not included

**Fix for Dynamic Bones:**
1. Import the **Dynamic Bones Stub** package
2. Select your avatar root
3. Go to `VRChat SDK > Utilities > Convert DynamicBones to PhysBones`

**Fix for missing shaders:**
- Re-import the shader package (lilToon, Poiyomi, etc.)
- Check if the shader package was meant for a different Unity version

### Error: "Avatar Validation Failed"

**Causes:**
- No VRCAvatarDescriptor on the avatar
- Polygon count exceeds platform limits
- Banned components (Quest doesn't allow certain PC-only components)
- Avatar Dynamics loops (circular references)
- Incorrect rigging

**Fix:**
- Open `Builder > Validations` in the SDK panel
- Read each red error — they tell you exactly what's wrong
- Use "Auto Fix" buttons when available

### Error: "Missing Credentials" on Upload

**Cause:** VPN interference

**Fix:** Turn off your VPN, then retry

### Error: Unity Crashes During Build

**Causes:**
- Lightmap baking on complex scenes
- Too many assets loaded
- Corrupted Library folder

**Fix:**
1. Close Unity
2. Delete the `Library` folder in your project directory
3. Re-open — Unity rebuilds the Library (takes a few minutes)

### Error: Avatar Looks Different In-Game vs Unity

**Causes:**
- Shaders not compatible with VRChat's rendering
- Write Defaults mismatch in animators
- FX layer overriding Gesture layer transforms

**Fix:**
- Use VRChat-compatible shaders (lilToon, Poiyomi, Standard)
- Ensure all animator states use the same WD setting
- Check FX layer masks

### General Diagnostic Process

1. Open Unity Console: `Ctrl + Shift + C`
2. **Red errors** = problems. **Yellow warnings** = usually ignorable
3. Click on an error to see the stack trace and which asset caused it
4. Google the exact error message — VRChat's community has seen almost everything

### Nuclear Option

If your project is ancient, full of random imported tools, or inexplicably broken: **Start a fresh project in VCC.** Import only what you need. This fixes a shocking number of issues.

---

## 11. Performance Optimization

### Performance Rank System

VRChat analyzes your avatar and assigns a rank: **Excellent → Good → Medium → Poor → Very Poor**.

Other players can configure their settings to hide avatars below a certain rank. **Aim for Good.** If you can't hit Good, Medium is acceptable.

### PC Performance Limits

| Metric | Excellent | Good | Medium | Poor |
|--------|-----------|------|--------|------|
| **Triangles** | 32,000 | 70,000 | 70,000 | 70,000 |
| **Texture Memory** | 40 MB | 75 MB | 110 MB | 150 MB |
| **Skinned Meshes** | 1 | 2 | 8 | 16 |
| **Material Slots** | 4 | 8 | 16 | 32 |
| **PhysBones Components** | 4 | 8 | 16 | 32 |
| **PhysBones Transforms** | 16 | 64 | 128 | 256 |
| **PhysBones Colliders** | 4 | 8 | 16 | 32 |
| **Animators** | 1 | 4 | 16 | 32 |
| **Bones** | 75 | 150 | 256 | 400 |
| **Particle Systems** | 0 | 4 | 8 | 16 |

**Exceeding the Poor column = Very Poor rank.** Anything beyond 70,000 triangles instantly drops you to Very Poor.

### Mobile/Quest Performance Limits

| Metric | Excellent | Good | Medium | Poor |
|--------|-----------|------|--------|------|
| **Triangles** | 7,500 | 10,000 | 15,000 | 20,000 |
| **Texture Memory** | 10 MB | 18 MB | 25 MB | 40 MB |
| **Skinned Meshes** | 1 | 1 | 2 | 2 |
| **Material Slots** | 1 | 1 | 2 | 4 |
| **PhysBones Components** | 0 | 4 | 6 | 8 |
| **PhysBones Transforms** | 0 | 16 | 32 | 64 |
| **Animators** | 1 | 1 | 1 | 2 |
| **Bones** | 75 | 90 | 150 | 150 |
| **Particle Systems** | 0 | 0 | 0 | 2 |

**Quest/Mobile:** Avatars exceeding Very Poor PhysBones limits get ALL PhysBones, Contacts, and Constraints stripped regardless of "Show Avatar" status. Max upload size: 10 MB compressed.

### Material Merging

Each material slot = one draw call = more CPU time. This is one of the biggest performance wins.

**Goal: 1 material.** 2 is acceptable if you need different shader variants.

**How to merge materials:**
1. **Texture Atlasing**: Combine multiple textures into a single atlas
2. **d4rkAvatarOptimizer**: Non-destructively merges materials on upload (see Section 14)
3. **Polytool**: Automatic material merging with texture atlassing

### Polygon Reduction

**Methods:**
1. **Blender Decimate Modifier**: Before importing to Unity
2. **lilNDMFMeshSimplifier**: Install via VCC, add the component to meshes. Reduces on upload
3. **Polytool**: Automatic mesh decimation/simplification in Unity

### Mesh Optimization

- **Target: 1 Skinned Mesh Renderer.** Skinned meshes are significantly more expensive than static meshes
- Merge all body/clothing meshes into one when possible
- Use d4rkAvatarOptimizer to auto-merge meshes on upload

### Texture Optimization

- Resize textures to the minimum acceptable resolution
- 2048x2048 is usually overkill — try 1024x1024 or 512x512 for non-critical textures
- Use **Crunch Compression** in Unity's texture import settings
- Body textures can usually go to 1K, accessories to 512

### Bone Reduction

- Remove unused bones (bones with no mesh weight influence)
- Polytool can automate this
- Merge bone chains that don't need individual PhysBones

### Shader Optimization

- Avoid transparency when possible (transparent materials are expensive)
- Use VRChat-optimized shaders: lilToon, Poiyomi, Standard
- d4rkAvatarOptimizer can inline shader constants for better GPU performance

---

## 12. Testing Avatars Locally

### Build & Test (Offline Testing)

You can test your avatar **without uploading** it to VRChat's servers.

**How to use it:**
1. Open the SDK Control Panel (`VRChat SDK > Show Control Panel`)
2. Go to the **Builder** tab
3. In the **"Offline Testing"** section, click **"Build & Test"**
4. Unity builds the avatar locally
5. Launch VRChat

**Finding your test avatar in-game:**
1. Open your Avatar menu
2. Go to the **"Other"** section
3. Your locally-built avatar appears here
4. Select it and click "Change"

**Key details:**
- The test avatar is **only visible to you**
- Everyone else sees whatever avatar you were wearing before switching
- You can iterate: make changes in Unity, click "Build & Test" again, re-select the avatar in-game

### Auto-Reload (--watch-avatars)

Add `--watch-avatars` as a VRChat launch option. When enabled:
- If you're wearing an avatar from the "Other" section
- And you click "Build & Test" again in Unity
- VRChat **automatically swaps** to the new build — no menu interaction needed

**Setting launch options:**
- **Steam**: Right-click VRChat > Properties > Launch Options
- **Standalone**: Add to the shortcut target

### Platform Testing

Build & Test works for Android/Quest builds too, letting you verify how your avatar looks on mobile before uploading.

### In-Editor Testing (Gesture Manager)

The **Gesture Manager** package (available via VCC or GitHub) lets you preview avatar animations directly in Unity's Play Mode:
- Simulates VRChat's expression menu
- Tests gesture-based animations
- Debug menu for parameter inspection
- No need to launch VRChat at all

---

## 13. SDK Validation Warnings

### Where to Find Them

In the SDK Control Panel > **Builder** tab > **Validations** section. Warnings and errors appear here before you can upload.

### Error vs Warning

| Color | Severity | Action Required |
|-------|----------|----------------|
| **Red** | Error | Must fix — blocks upload |
| **Yellow** | Warning | Optional — doesn't block upload but worth reviewing |

### Common Validation Errors

| Error | Meaning | Fix |
|-------|---------|-----|
| **"No Avatar Descriptor found"** | Missing VRCAvatarDescriptor component | Add one to the root GameObject |
| **"Avatar exceeds polygon limit"** | Too many triangles for the target platform | Reduce mesh poly count |
| **"Banned component found"** | Using a component not allowed on Quest/Mobile | Remove or replace the component |
| **"Avatar Dynamics loop detected"** | Circular PhysBone/Constraint references | Break the loop in your bone chain |
| **"Missing scripts detected"** | Referenced scripts no longer exist in project | Remove or reimport the missing scripts |
| **"Audio Source found"** | Avatar has audio sources (restricted for safety) | Remove audio sources or use VRChat's built-in systems |
| **"Avatar exceeds size limit"** | Built avatar is too large (Quest: 10 MB) | Optimize textures, reduce mesh complexity |

### Auto Fix Buttons

Some validation entries have an **"Auto Fix"** button. These apply safe, automatic corrections:
- Setting correct import settings on textures
- Removing empty/broken components
- Fixing obvious configuration issues

Always review what Auto Fix changed after clicking it.

### Common Validation Warnings (Yellow — Non-Blocking)

| Warning | Meaning | Recommendation |
|---------|---------|----------------|
| **"High polygon count"** | Above recommended but not blocked | Optimize if targeting Good/Medium rank |
| **"Too many material slots"** | Performance impact | Merge materials via atlasing |
| **"Multiple skinned mesh renderers"** | CPU overhead | Merge meshes if possible |
| **"PhysBones count high"** | May affect performance rank | Review if all PhysBones are necessary |

---

## 14. Best Unity Plugins for VRChat

### Tier 1: Essential (Pick One or Both)

#### Modular Avatar (MA)
**What it is:** A suite of non-destructive tools for modularizing avatars and distributing avatar components.

**Key Components:**
| Component | What It Does |
|-----------|-------------|
| **Merge Animator** | Adds animator controllers to avatar layers — drag-and-drop gimmick installation |
| **Menu Installer** | Automatically integrates menu items into the expression menu |
| **Merge Armature** | Merges outfit/accessory armatures into the avatar skeleton |
| **Bone Proxy** | Parents objects inside existing avatar bones without manual hierarchy editing |
| **Parameters** | Auto-manages expression parameter allocation |

**Install:** Via VCC or ALCOM (recommended). Add the repository URL in VCC settings.

**Best for:** Outfit/accessory creators who want their products to install via drag-and-drop. Clean, modular avatar setups.

#### VRCFury
**What it is:** A non-destructive tool suite that automates animation controllers, menus, and parameters. Makes copies of your work at upload time, leaving originals untouched.

**Key Components:**
| Component | What It Does |
|-----------|-------------|
| **Toggle** | Creates object/blend shape toggles without touching animation clips |
| **Armature Link** | Attaches props/accessories to specific avatar bones |
| **Full Controller** | Merges entire animator controllers into the avatar |
| **Blendshape Link** | Syncs blend shapes between clothing and body meshes |
| **SPS (Super Plug Shader)** | Haptic interaction system with auto-generated menu toggles |
| **Fix Write Defaults** | Auto-aligns WD across all animator states |
| **Direct Tree Optimizer** | Converts layers into a single direct blend tree for performance |
| **Bounding Box Fix** | Prevents meshes from disappearing at extreme view angles |
| **Cross-Eye Fix** | Fixes unwanted eye bone roll |
| **Anchor Override Fix** | Ensures consistent lighting across meshes |
| **Blendshape Optimizer** | Bakes non-animated blend shapes to reduce VRAM |
| **Security Pin** | PIN-protected toggles for restricted content |
| **Show In First Person** | Makes objects visible in first-person via constraints |
| **Advanced Visemes** | Animation clips or flipbooks as visemes |
| **Blink Controller** | Custom blink cycle with gesture conflict prevention |
| **MMD Compatibility** | Preserves blend shapes and disables hand anims for MMD worlds |
| **Parameter Compressor** | Squeezes synced parameters into fewer bits |

**Install:** Via VCC. Add `https://vrcfury.com/vcc` as a community repository.

**Best for:** Quick avatar customization, prefab distribution, solving Write Defaults nightmares.

### MA vs VRCFury — When to Use Which

| Situation | Use |
|-----------|-----|
| Installing outfits/accessories from creators | Either works — check what the creator supports |
| Making your own toggles quickly | VRCFury (no animation clips needed) |
| Building modular, distributable prefabs | Modular Avatar (industry standard for outfit creators) |
| Fixing Write Defaults chaos | VRCFury (automatic fix) |
| Advanced animator merging | Modular Avatar (more granular control) |
| Performance optimization (blend tree conversion) | VRCFury (Direct Tree Optimizer) |

**Compatibility note:** Both can coexist on the same avatar. VRCFury 1.1250.0+ is required for compatibility with certain MA components. Check for warnings in the console.

### Tier 2: Optimization

#### d4rkAvatarOptimizer
Non-destructive optimizer that runs on upload.

**Features:**
- Merges skinned meshes and materials automatically
- Inlines shader constants (replaces `uniform` with `static` values for faster GPU execution)
- Analyzes FX layers and suggests which can be merged/deleted
- Compatible with both Modular Avatar and VRCFury

**Install:** Add `https://d4rkc0d3r.github.io/vpm-repos/main.json` as a VCC repository.

#### Polytool
**Features:**
- Automatic mesh decimation/simplification
- Material merging with auto texture atlasing
- Automatic bone reduction

### Tier 3: Utility

| Tool | Purpose |
|------|---------|
| **Gesture Manager** | Preview avatar animations in Unity editor without launching VRChat |
| **Pumkin's Avatar Tools** | Toolbox for avatar setup — automates tedious tasks, quick setup helpers |
| **Avatars 3.0 Manager** | Merge multiple animators per layer, manage parameters |
| **EasyQuestSwitch** | Automates component changes when switching between PC and Quest builds |
| **VRCQuestTools** | Convert and test Quest versions of PC avatars |
| **Hai's Combo Gesture Expressions** | Visual tool for creating gesture-based expression setups |

---

## 15. Head Chop Component

### What It Is

`VRCHeadChop` is an optional avatar component that controls which parts of the avatar's head are visible in first-person view.

### The Problem It Solves

By default, VRChat scales the head bone to nearly 0 to prevent the head from clipping into the camera in first-person. But this also hides hair, ears, hats, glasses, and anything parented to the head bone.

### What It Affects

- **Only affects first-person view** for the user wearing the avatar
- Does NOT change how the avatar looks in mirrors or to other players
- This is purely a local visual adjustment

### How to Set It Up

1. Add the **VRC Head Chop** component to your avatar (any GameObject)
2. In **Target Bones**, add the bones you want to keep visible
3. Set each bone's **Scale Factor** to `1` (visible) or `0` (hidden)
4. Set **Apply Condition** per bone

### Component Fields

| Field | Purpose |
|-------|---------|
| **Target Bones** | List of bones to control |
| **Global Scale Factor** | Multiplier applied to all target bones. Animate between 0–1 to toggle visibility |

### Per-Bone Settings

| Setting | Options | Purpose |
|---------|---------|---------|
| **Transform** | Bone reference | Which bone to affect |
| **Scale Factor** | 0.0–1.0 | Individual visibility. Final scale = original * global * bone factor |
| **Apply Condition** | Always Apply / VR Only / Non VR Only | When to apply the scaling |

### Common Use Case: Keeping Hair Visible

Most avatars have hair bones as children of the head bone. When VRChat chops the head, the hair disappears too.

**Fix:**
1. Add VRCHeadChop to your avatar
2. Add each hair bone to the Target Bones list
3. Set Scale Factor to `1` for each
4. Optionally set Apply Condition to **"VR Only"** (desktop users don't need this since their camera sits further back)

### Other Use Cases

- **Keeping ears/horns visible** in first person
- **Hiding a hood** that clips into first-person view (set scale to 0)
- **Toggling visibility** via expression menu by animating the Global Scale Factor or the component's enabled state

### Limits

- Maximum **16 VRCHeadChop components** per avatar
- Maximum **32 bones** per component
- Once a bone is added, its position is locked — unaffected by parent scale/position/rotation changes
- Scaling a bone automatically scales its children

### Animator Control

The enabled/disabled state of the VRCHeadChop component can be controlled via animator — set up an expression toggle to let users decide whether hair/ears show in first person.

---

## Quick Reference: Full Upload Checklist

- [ ] VCC installed and updated
- [ ] Unity 2022.3.22f1 (exact version)
- [ ] SDK 3.10.x (latest via VCC)
- [ ] Avatar imported and in scene
- [ ] Rig set to Humanoid, bones mapped
- [ ] VRC Avatar Descriptor added
- [ ] View Position set (between the eyes)
- [ ] Lip Sync configured (Auto Detect)
- [ ] Eye Look enabled and configured (optional)
- [ ] PhysBones on hair/tail/ears (not on humanoid bones)
- [ ] Expression Menu and Parameters assigned
- [ ] FX Layer configured with toggles/animations
- [ ] Performance rank checked (aim for Good)
- [ ] Validations reviewed — all red errors fixed
- [ ] Build & Test successful locally
- [ ] Logged into SDK panel
- [ ] Name, description, thumbnail set
- [ ] Build & Publish clicked
- [ ] Verified in-game under Avatars > Uploaded

---

## Sources

- [VRChat Creator Companion Docs](https://vcc.docs.vrchat.com/)
- [VRChat Creator Docs — Getting Started](https://creators.vrchat.com/sdk/)
- [VRChat Creator Docs — Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)
- [VRChat SDK Releases](https://creators.vrchat.com/releases/)
- [VRChat Creator Docs — Creating Your First Avatar](https://creators.vrchat.com/avatars/creating-your-first-avatar/)
- [VRChat Creator Docs — PhysBones](https://creators.vrchat.com/common-components/physbones/)
- [VRChat Creator Docs — Expression Menu and Controls](https://creators.vrchat.com/avatars/expression-menu-and-controls/)
- [VRChat Creator Docs — Contacts](https://creators.vrchat.com/common-components/contacts/)
- [VRChat Creator Docs — Playable Layers](https://creators.vrchat.com/avatars/playable-layers/)
- [VRChat Creator Docs — Performance Ranks](https://creators.vrchat.com/avatars/avatar-performance-ranking-system/)
- [VRChat Creator Docs — Avatar Optimization Tips](https://creators.vrchat.com/avatars/avatar-optimizing-tips/)
- [VRChat Creator Docs — Head Chop](https://creators.vrchat.com/avatars/avatar-components/vrc-headchop/)
- [VRChat Creator Docs — SDK Troubleshooting](https://creators.vrchat.com/sdk/sdk-troubleshooting/)
- [VRC School — Avatar Descriptor](https://vrc.school/docs/Avatars/Avatar-Descriptor/)
- [VRC School — PhysBones](https://vrc.school/docs/Avatars/PhysBones/)
- [VRC School — Contacts](https://vrc.school/docs/Avatars/Contacts/)
- [VRC School — Playable Layers](https://vrc.school/docs/Avatars/Playable-Layers/)
- [VRC School — Expression Menu and Params](https://vrc.school/docs/Avatars/Expressions-Menu-Params/)
- [VRC School — Head Chop](https://vrc.school/docs/Avatars/HeadChop/)
- [VRC School — Write Defaults](https://vrc.school/docs/Unity-Animations/Write-Defaults/)
- [VRCFury](https://vrcfury.com/)
- [Modular Avatar](https://modular-avatar.nadena.dev/)
- [d4rkAvatarOptimizer](https://github.com/d4rkc0d3r/d4rkAvatarOptimizer)
- [VRChat Avatar Performance Optimization — DeepWiki](https://deepwiki.com/vrchat-community/creator-docs/3.4-avatar-performance-optimization)
- [VRChat Help Center — SDK Troubleshooting](https://help.vrchat.com/hc/en-us/articles/360062658873)
- [Conceptual Cosmos — How to Upload Avatars (2025)](https://www.conceptualcosmos.com/upload-avatar-to-vrchat/)
- [PhysBone Recommended Settings — GitHub](https://github.com/Z-ANESaber/Phys-Bone-Settings)
