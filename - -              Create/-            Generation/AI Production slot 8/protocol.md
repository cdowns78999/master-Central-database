# Protocol: 'Baller' Artist Dashboard (Ground Up)

## 1. Technical Architecture
The dashboard is structured as a hierarchical data-visualizer for high-level artist management.

### System Slots:
- **Task Management Tier**: Global task tracking with 2-state logic (To-Do / Done).
- **Crown Console Tier**:
    - **Report Module**: URL-based persistence for offboarding and data links.
    - **Campaign Module (Master Logic)**: Drag-and-drop Kanban for Active/Closed songs.
    - **Control Module**: System settings and Data Persistence (JSON).

## 2. Logical Mappings
- **Serialization**: Every interaction updates a central `dashboardState` object.
- **Drag Logic**: Native HTML5 Drag and Drop API with CSS state indicators (`.over`).
- **Persistence**: JSON-based serialization for cold storage (Upload/Download).

## 3. Aesthetic Specifications
- **Background**: `#010c1a` with triple-radial gradients and cursor-reactive particles.
- **Glass System**: `rgba(255,255,255,0.03)` with `blur(25px)` and `border-color: rgba(255,255,255,0.1)`.
- **Status Colors**: 
    - Active/Power: `#4cc9f0` (Apple Blue)
    - Action/Pink: `#ff5d8f` (Cyber Pink)
    - Success/Green: `#34c759` (Bio Green)
