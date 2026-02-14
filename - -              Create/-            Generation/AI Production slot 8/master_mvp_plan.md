# Master MVP Plan: Automatic Blog Poster Dashboard

This document serves as the final technical blueprint for the Automatic Blog Poster Dashboard. It consolidates the "Apple-premium" design language, modular floating control architecture, and automated workflow logic into a single, comprehensive plan for production-ready development.

---

## 1. Design & Aesthetics

### Visual Identity
- **Theme**: Ultra-clean "Light Blue" glassmorphism
- **Background**: Ambient `<canvas>` particle system with soft, moving light blue orbs (alpha 0.05-0.1)
- **Typography**: Apple-style sans-serif (Outfit or SF Pro)

### Tile Component (The "Watch")
- **Shape**: 56px radius squircle (super-ellipse)
- **Material**: `backdrop-filter: blur(20px)` with a semi-transparent white background (`rgba(255, 255, 255, 0.7)`)
- **Hardware Cues**: 3D-effect borders, a side "Digital Crown" (input/scroll aesthetic), and a side button
- **Interactive States**: Hover transitions involving `scale(1.02)` and `translateY(-8px)` with soft pulse-glow shadows

---

## 2. Interface Architecture

### Floating Control Layer
Instead of internal menus, the system uses **"External Floating Controls"** to minimize tile clutter:

#### Top Control (Spawning)
- A floating **+** button above each tile
- On click, it reveals a directional cross (Up, Down, Left, Right)
- Selection spawns a new tile exactly 100px away in the chosen grid direction

#### Bottom Control (Modes)
- A three-pill floating menu (**LINK**, **COPY**, **WEBHOOK**)
- Active mode updates the tile's central iconography and input placeholders

#### Central Execution
- The tile core houses a single text input and a prominent **EXECUTE** button

---

## 3. Core Functionality

### Mode Behaviors

| Mode     | Input Type         | Action                                                                 |
|----------|-------------------|------------------------------------------------------------------------|
| LINK     | URL               | Opens the target URL in a new browser tab                             |
| COPY     | Data/Text         | Syncs input content to the system clipboard with "Copied" toast feedback |
| WEBHOOK  | Make.com Hook     | Triggers an asynchronous POST request to an automation platform        |

### Webhook Intelligence
- **Payload**: Automatically bundles `source`, `timestamp`, and `input_value` into a JSON body
- **Visual Feedback**: The button enters a "Triggering" pulse animation during fetch, providing distinct **Color-Shift** confirmation (Green for Success, Red for Error)

---

## 4. System Logic

### Grid & Collision
- **Coordinate System**: Tracks occupied tiles using a `Set` of `"row,col"` keys (e.g., `100,100`)
- **Collision Prevention**: Prevents spawning overlap by checking the occupied set before placing a new node
- **Auto-Camera**: Triggers `scrollIntoView({ behavior: 'smooth' })` when a new tile is spawned to keep the workflow centered

### Animations
- **Spawn**: Scale-in + Blur-to-focus transition (0.8s cubic-bezier)
- **Mode Toggle**: Smooth cross-fade of placeholders and button text
- **Expansion**: "Steve Jobs gentle system" where arrows float outward with high-momentum easing

---

## 5. Technology Stack

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox/Grid, Glassmorphism)
- **Core**: ES6+ JavaScript (Fetch API, Clipboard API, Canvas API)
- **Scalability**: Designed as a single-file application capable of being wrapped in Electron or deployed as a static web dashboard

---

## 6. Implementation Checklist

### Phase 1: Foundation
- [ ] Create particle canvas background system with light blue orbs
- [ ] Build base tile component with squircle shape and glassmorphism
- [ ] Add Digital Crown and side button decorative elements
- [ ] Implement grid coordinate system with collision detection

### Phase 2: Floating Controls
- [ ] Build floating + button above tiles
- [ ] Create directional arrow expansion menu
- [ ] Design three-pill mode selector (LINK, COPY, WEBHOOK)
- [ ] Position mode pills below tiles with glassmorphic styling

### Phase 3: Core Functionality
- [ ] Implement LINK mode with URL validation and tab opening
- [ ] Implement COPY mode with clipboard API and success feedback
- [ ] Implement WEBHOOK mode with fetch API and visual states
- [ ] Add mode switching logic with placeholder updates

### Phase 4: Interactions & Animations
- [ ] Add tile spawn animation with scale-in and blur transition
- [ ] Implement hover states with elevation and glow
- [ ] Create expansion pulse-glow animation
- [ ] Add auto-scroll behavior when spawning new tiles

### Phase 5: Polish & Testing
- [ ] Ensure backdrop-filter works across browsers
- [ ] Test webhook payload structure
- [ ] Verify collision detection edge cases
- [ ] Optimize particle count for performance

---

## 7. File Structure

```
automatic-blog-poster-dashboard/
├── index.html              # Single-file application
└── README.md              # Usage documentation
```

---

## 8. Key Design Principles

1. **Minimal Clutter**: All controls float outside the tile to preserve clean watch-face aesthetic
2. **Instant Feedback**: Every action provides immediate visual confirmation
3. **Smooth Motion**: All transitions use Apple-grade easing curves
4. **Scalable Grid**: Infinite expansion in all four directions
5. **Mode Clarity**: Active mode is always visible via floating pills

---

## 9. User Flow

1. **Initial State**: User sees single watch tile with floating + button and mode pills
2. **Expansion**: Click + to reveal directional arrows, select direction to spawn new tile
3. **Configuration**: Click mode pill (LINK/COPY/WEBHOOK) to set tile behavior
4. **Execution**: Enter data in input field, click action button to execute
5. **Feedback**: Receive visual confirmation (tab opens, "COPIED" message, or webhook status)
6. **Growth**: Repeat process to build custom dashboard grid

---

## 10. Advanced Features (Future Roadmap)

- **Persistence**: LocalStorage support to save dashboard state
- **Templates**: Pre-configured tile sets for common workflows
- **Themes**: Dark mode and custom color schemes
- **Export**: Generate shareable dashboard configurations
- **Analytics**: Track most-used tiles and execution history
- **Keyboard Shortcuts**: Power-user navigation and execution
- **Tile Labels**: Custom naming for workflow clarity
- **Drag & Drop**: Reorder tiles after placement

---

## 11. Performance Targets

- **Initial Load**: < 100ms
- **Tile Spawn**: < 300ms animation
- **Particle Render**: 60 FPS at 1080p
- **Memory**: < 50MB for 20-tile dashboard
- **Webhook Response**: < 2s feedback display

---

## 12. Browser Compatibility

- **Chrome**: Full support (v90+)
- **Safari**: Full support with `-webkit-backdrop-filter` (v14+)
- **Firefox**: Full support (v103+ for backdrop-filter)
- **Edge**: Full support (Chromium-based)

---

## 13. Development Notes

### CSS Variables Used
```css
--bg-color: #050505
--watch-frame: #1c1c1e
--watch-screen: #000000
--accent-color: #0a84ff (Light Blue)
--text-color: #f5f5f7
--tile-size: 240px
--gap: 80px
--transition-smooth: all 0.7s cubic-bezier(0.22, 1, 0.36, 1)
--glass: rgba(255, 255, 255, 0.03)
--glass-border: rgba(255, 255, 255, 0.1)
```

### JavaScript Architecture
- **State Management**: Lightweight, using DOM dataset attributes and a single `occupied` Set
- **Event Handling**: Inline onclick for simplicity (can be refactored to event delegation)
- **Canvas Rendering**: requestAnimationFrame loop for 60 FPS particle motion
- **API Integration**: Fetch with no-cors mode for webhook flexibility

---

## 14. Security Considerations

- **URL Validation**: Sanitize user input before opening links
- **CORS Handling**: Webhook mode uses `no-cors` for Make.com compatibility
- **XSS Prevention**: All user input is treated as plain text, not HTML
- **Data Privacy**: No external tracking or analytics by default

---

## 15. Deployment Options

### Static Hosting
- **Netlify/Vercel**: Deploy single HTML file
- **GitHub Pages**: Host from repository
- **AWS S3**: Static site hosting

### Desktop Application
- **Electron**: Wrap in native app shell
- **Tauri**: Rust-based lightweight alternative

### Mobile
- **PWA**: Add manifest.json for installable web app
- **Responsive**: Touch-optimized for tablet/mobile use

---

## Conclusion

This master plan provides a complete blueprint for building a production-ready Automatic Blog Poster Dashboard. The architecture prioritizes visual elegance, functional clarity, and technical simplicity—creating a tool that feels like a premium Apple product while remaining accessible as a single-file web application.

**Next Step**: Execute implementation following the Phase 1-5 checklist, ensuring each feature meets the aesthetic and functional standards outlined above.
