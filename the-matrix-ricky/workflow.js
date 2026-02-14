const workflowPhases = [
    { id: 1, title: "Create L1 Project Folder", desc: "Create dedicated 'L1_THE_MATRIX_RICKY' project folder on Ricky's drive." },
    { id: 2, title: "Install Core Tools", desc: "Install UE5, Pulsar, and DaVinci Resolve on Ricky's machine." },
    { id: 3, title: "Create UE5 Project", desc: "Open UE5 and create a cinematic project named 'L1_THE_MATRIX_RICKY'." },
    { id: 4, title: "Set UE5 Project Settings", desc: "Lock frame rate (24fps), resolution (1080p), and color settings." },
    { id: 5, title: "Import Base Environment Assets", desc: "Add NYC-style street/rooftop/corridor assets to the L1 project." },
    { id: 6, title: "Build First Matrix Level Map", desc: "Create scene 'L1_MATRIX_CITY_01' with imported pieces." },
    { id: 7, title: "Add GridTraveler Character", desc: "Add tile-based character class into the project level." },
    { id: 8, title: "Configure Grid Size And Speed", desc: "Tune TileSize and MoveSpeed for deliberate pace." },
    { id: 9, title: "Snap Start Position To Grid", desc: "Ensure character movement begins cleanly aligned." },
    { id: 10, title: "Place Cinematic Cameras", desc: "Add CineCameraActors along the character's path." },
    { id: 11, title: "Set Camera Lens And Filmback", desc: "Achieve Matrix-style wide or medium look." },
    { id: 12, title: "Create Simple Camera Cut Track", desc: "Establish timeline structure inside UE5 Level Sequence." },
    { id: 13, title: "Add Character Movement To Sequence", desc: "Record step-by-step motion along tiles." },
    { id: 14, title: "Test Play And Adjust Pacing", desc: "Align movement rhythm with track tempo." },
    { id: 15, title: "Configure UE5 Render Settings", desc: "Prep Movie Render Queue output format/codec." },
    { id: 16, title: "Render First Test Clip", desc: "Produce the first raw plate for piping." },
    { id: 17, title: "Install Or Open Pulsar Encoder", desc: "Bring up the transport layer on the same machine." },
    { id: 18, title: "Select UE5 As Pulsar Source", desc: "Link live UE5 viewport into the encoder." },
    { id: 19, title: "Set Pulsar Output Profile", desc: "Configure edit-friendly quality (bitrate/res)." },
    { id: 20, title: "Record Live Camera Test", desc: "Create real-time capture path for Resolve." },
    { id: 21, title: "Save Pulsar Recording To L1 Folder", desc: "Keep all encoded clips in the project tree." },
    { id: 22, title: "Open DaVinci Resolve Project", desc: "Launch the finishing hub: 'L1_THE_MATRIX_RICKY_GRADE'." },
    { id: 23, title: "Set Resolve Project Settings", desc: "Align timing and color spaces for ingested clips." },
    { id: 24, title: "Import UE5 And Pulsar Clips", desc: "Bring both source types into Media Pool." },
    { id: 25, title: "Create L1 Matrix Timeline", desc: "Set up dedicated 'L1_MATRIX_LOOK_01' timeline." },
    { id: 26, title: "Apply Base Matrix Grade", desc: "Establish core green-tinted aesthetic." },
    { id: 27, title: "Add Matrix Code Effect Node", desc: "Implement falling code/glitch signature effect." },
    { id: 28, title: "Convert Effect To Preset Or Macro", desc: "Goal 2: Build reusable plugin-like asset." },
    { id: 29, title: "Apply Preset To Second Clip", desc: "Confirm effect transfers across different sources." },
    { id: 30, title: "Render Final L1 Test MP4", desc: "Goal 1: Complete end-to-end video chain." },
    { id: 31, title: "Create Pre-Release Timeline", desc: "Combine story content with visual system." },
    { id: 32, title: "Edit Pre-Release Structure", desc: "Shape narrative (Hook/Explain/Showcase)." },
    { id: 33, title: "Render Pre-Release MP4", desc: "Produce final YouTube campaign asset." },
    { id: 34, title: "Create Post-Release Timeline", desc: "Add performance and BTS elements." },
    { id: 35, title: "Edit Post-Release Story", desc: "Build results and reactions narrative." },
    { id: 36, title: "Render Post-Release MP4", desc: "Close the loop for the release cycle." },
    { id: 37, title: "Document Plugin Workflow Steps", desc: "Convert effect build into a text checklist." },
    { id: 38, title: "Save Versioned Preset Copies", desc: "Expand toolbox (Soft/Heavy/Mono variant)." },
    { id: 39, title: "Organize Final Assets In L1 Folder", desc: "Consolidate into single navigable system." }
];

function initWorkflow() {
    const container = document.getElementById('workflow-steps');
    const savedStates = JSON.parse(localStorage.getItem('matrix_workflow_ricky') || '{}');

    container.innerHTML = workflowPhases.map(phase => `
        <div class="workflow-phase" id="phase-${phase.id}">
            <div class="phase-title">
                <span>PHASE ${String(phase.id).padStart(2, '0')}: ${phase.title}</span>
                <input type="checkbox" class="phase-checkbox" 
                    ${savedStates[phase.id] ? 'checked' : ''} 
                    onchange="togglePhase(${phase.id})">
            </div>
            <div class="phase-desc">${phase.desc}</div>
        </div>
    `).join('');

    updateProgress();
}

function togglePhase(id) {
    const savedStates = JSON.parse(localStorage.getItem('matrix_workflow_ricky') || '{}');
    savedStates[id] = !savedStates[id];
    localStorage.setItem('matrix_workflow_ricky', JSON.stringify(savedStates));
    updateProgress();
}

function updateProgress() {
    const savedStates = JSON.parse(localStorage.getItem('matrix_workflow_ricky') || '{}');
    const completedCount = Object.values(savedStates).filter(Boolean).length;
    const progress = (completedCount / workflowPhases.length) * 100;

    document.getElementById('total-progress').style.width = `${progress}%`;
    document.getElementById('progress-percent').innerText = `${Math.round(progress)}%`;
}

document.addEventListener('DOMContentLoaded', initWorkflow);
