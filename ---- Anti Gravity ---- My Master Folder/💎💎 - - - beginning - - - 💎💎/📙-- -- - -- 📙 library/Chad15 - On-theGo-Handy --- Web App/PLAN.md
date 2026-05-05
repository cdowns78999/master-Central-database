# 🎬 PROJECT MASTER OPS: REPLICATION PROTOCOL (SLOT 6)
## OBJECTIVE: 1:1 VISUAL FIDELITY & MODULAR SCALABILITY

This document serves as the **Absolute Truth** for the development of the Premium Movie/Bike Web App. We are moving away from ad-hoc coding and moving into a **System-First Architecture**. 

---

## 🏗️ PHASE 0: THE BASE SYSTEM (The Foundation)
**CRITICAL: Nothing is built until the Base System is locked.**

The Base System consists of three "Core Pillars" that every subsequent page MUST inherit. No local styles allowed; if a card needs a glow, it uses the System Glow.

### Pillar 1: The Design Token Vault (`style.css`)
We will define a rigid set of CSS Variables. 
- **The Color Stack:** Every hex code from the assets sheet (e.g., `#242C3B`, `#37B6E9`, `#4B4CED`).
- **The Glass Matrix:** A set of 3 utility classes: `.glass-thin`, `.glass-medium`, `.glass-thick`. 
- **The Glow Engine:** Pre-calculated box-shadows and radial-gradient backgrounds for buttons and active states.
- **The Typography Scale:** Explicit `rem` values for titles, sub-headers, and button labels to match the Figma hierarchy exactly.

### Pillar 2: The Master App Shell (`index.html`)
- **The Frame:** The "Phone" container that handles the 844px height and iOS safe areas.
- **The Navigator:** The dynamic loading script (The "App Engine") that pulls files from `/screens/`.
- **The Persistent Nav:** The bottom tab bar, perfectly centered with the "High Shadow" floating button.

### Pillar 3: The Data Backbone (`data.json`)
- All text, image URLs, and prices are separated from the code.
- This allows us to "replicate" the app for different themes (Movie vs. Bike) just by swapping the JSON.

---

## 🛠️ PHASE 1: SEQUENTIAL CONSTRUCTION (1-by-1)
**RULE: We do not move to the next screen until the current one is "Figma Perfect."**

### BUILD 1: The "Home" Portal (`/screens/home.html`)
- **Vertical Hierarchy:** Large Header -> Search Utility -> Category Pills -> Trending Grid.
- **Goal:** Match the spacing (white space) between cards exactly as seen in the screenshot.
- **Notes:** Focus on the "Trending" badge's pink-to-purple gradient.

### BUILD 2: The "Detail" Dashboard (`/screens/detail.html`)
- **Layering:** The Hero Image with the absolute-positioned "Back" button.
- **Interaction:** The Date/Time selector. We must code the "Sat 23" state to be 20% larger than its neighbors (Elevation check).
- **Notes:** The "Reservation" button must have the specific "Button Glow" shadow from the Base System.

### BUILD 3: The "Ticket" Masterpiece (`/screens/ticket.html`)
- **Depth Check:** This is the most complex layer. We use CSS `z-index` and `transform: rotate(-5deg)` to stack the background cards.
- **The Mask:** Creating the semi-circle "cutouts" at the bottom of the movie poster section.
- **Notes:** Ensure the barcode line-spacing is human-readable and sharp.

### BUILD 4: The "Profile/Search" Utility (`/screens/profile.html`)
- Cleanest screen. Focus on form input states.
- Reusing the "Search-Bar" from the Home screen Base System.

---

## 🧪 THE "COLOR TWEAK" LOG (Internal Notes)
- **Deepening the Void:** If the background feels too flat, we will add a 15% opacity radial gradient over the Base BG.
- **Cyan Saturation:** The cyan in the "Find" icon needs to be `#00F2FF`, not a generic cyan.
- **Blur Performance:** In Chrome, we use 25px blur; for iOS, we must use `-webkit-backdrop-filter` for the same visual density.

---

## 🚦 EXECUTION COMMANDS
1. **Command 1:** Initialize Base Style System (Variables + Utilities).
2. **Command 2:** Initialize Master Shell (Notch handling + Nav).
3. **Command 3:** Build Home Screen (Build 1).
4. **Command 4:** ...and so on.

**SYSTEM READY. WAITING FOR INITIALIZATION.**
