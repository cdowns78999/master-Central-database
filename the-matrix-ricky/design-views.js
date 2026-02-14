const views = {
    linear: () => `
        <div class="stack-container">
            <div class="stack-item">
                <h2 class="hud-glitch">UNREAL ENGINE 5</h2>
                <p>L1: THE MATRIX ENGINE</p>
            </div>
            <div class="stack-item">
                <h2 class="hud-glitch">PULSAR VS</h2>
                <p>LIVE ENCODER / CAPTURE HUB</p>
            </div>
            <div class="stack-item">
                <h2 class="hud-glitch">DAVINCI RESOLVE</h2>
                <p>L1: THE MATRIX GRADE</p>
            </div>
            <div class="stack-item" style="border-style: dashed">
                <h2 class="hud-glitch">OUTPUTS</h2>
                <ul style="list-style: none; margin-top: 1rem; opacity: 0.8">
                    <li>PRE-RELEASE MP4</li>
                    <li>POST-RELEASE MP4</li>
                    <li>SAVED EFFECT PRESET</li>
                </ul>
            </div>
        </div>
    `,
    kanban: () => `
        <div class="kanban-grid" style="display: grid; grid-template-rows: auto auto; gap: 2rem">
            <div class="kanban-row" style="border: 1px solid var(--hud-border); padding: 1.5rem; border-radius: 10px">
                <h3 style="margin-bottom: 1rem; color: var(--hud-cyan)">TRACK A: GOAL 1 // FINISHED MP4</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem">
                    <div class="k-col"><h5>INPUT</h5><p>UE5 Level, GridTraveler Anims</p></div>
                    <div class="k-col"><h5>PROCESS</h5><p>Pulsar Capture, Resolve Edit</p></div>
                    <div class="k-col"><h5>OUTPUT</h5><p>Final MP4 Video Assets</p></div>
                </div>
            </div>
            <div class="kanban-row" style="border: 1px solid var(--hud-border); padding: 1.5rem; border-radius: 10px">
                <h3 style="margin-bottom: 1rem; color: var(--hud-cyan)">TRACK B: GOAL 2 // UNIQUE EFFECT</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem">
                    <div class="k-col"><h5>INPUT</h5><p>Resolve Nodes, Tutorials</p></div>
                    <div class="k-col"><h5>PROCESS</h5><p>Build Code/Grade Nodes</p></div>
                    <div class="k-col"><h5>OUTPUT</h5><p>Matrix_L1_Ricky Preset</p></div>
                </div>
            </div>
        </div>
    `,
    hub: () => `
        <div class="hub-spoke-view" style="display: flex; align-items: center; justify-content: center; height: 60vh; position: relative">
            <div class="hub-center" style="width: 200px; height: 200px; border: 2px solid var(--matrix-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; box-shadow: 0 0 30px var(--matrix-green); background: rgba(0, 255, 65, 0.1)">
                RESOLVE L1 HUB
            </div>
            <div class="spoke" style="position: absolute; left: 10%; top: 50%; border: 1px solid var(--hud-border); padding: 1rem">UE5 PLATES</div>
            <div class="spoke" style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); border: 1px solid var(--hud-border); padding: 1rem">PULSAR CAPTURE</div>
            <div class="spoke" style="position: absolute; right: 10%; top: 50%; border: 1px solid var(--hud-border); padding: 1rem">EFFECT PRESET</div>
            <div class="spoke" style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); border: 1px solid var(--hud-border); padding: 1rem">FINAL TIMELINES</div>
        </div>
    `,
    tile: () => `
        <div class="tile-path" style="display: flex; overflow-x: auto; gap: 1rem; padding: 2rem">
            ${['GAS STATION', 'COMMUTE', 'OFFICE', 'BLEACHERS', 'STUDIO'].map(t => `
                <div class="path-tile" style="min-width: 180px; aspect-ratio: 1; border: 1px solid var(--matrix-green); background: var(--glass); display: flex; align-items: center; justify-content: center; text-align: center; font-family: var(--font-heading); font-size: 0.8rem">
                    ${t}
                </div>
            `).join(' → ')}
        </div>
        <p style="text-align: center; opacity: 0.6; margin-top: 1rem">EACH TILE = ONE SHOT IN UE5 // SYSTEM SYNC ACROSS THE PATH</p>
    `,
    swimlane: () => `
        <table class="swimlane-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem">
            <tr>
                <th style="padding: 1rem; border: 1px solid var(--hud-border)">EXECUTOR (RICKY)</th>
                <td style="padding: 1rem; border: 1px solid var(--hud-border)">Build UE5 Level → Record Pulsar → Edit/Grade in Resolve</td>
            </tr>
            <tr>
                <th style="padding: 1rem; border: 1px solid var(--hud-border)">SYSTEM (AUTOMATION)</th>
                <td style="padding: 1rem; border: 1px solid var(--hud-border)">Project Structure → Encoder Presets → Resolve Templates</td>
            </tr>
            <tr>
                <th style="padding: 1rem; border: 1px solid var(--hud-border)">ARTIST (RICH)</th>
                <td style="padding: 1rem; border: 1px solid var(--hud-border)">Approve Mood → Approve Story → Final Sign-off</td>
            </tr>
        </table>
    `
};

function switchView(viewId) {
    const container = document.getElementById('main-view');
    if (views[viewId]) {
        container.innerHTML = views[viewId]();

        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewId);
        });
    }
}

// Initial view
document.addEventListener('DOMContentLoaded', () => switchView('linear'));
