const toolData = {
    ue5: {
        title: "Unreal Engine 5",
        subtitle: "The Father's Journey: Tile-Travel System",
        color: "#1ed760",
        layers: [
            {
                name: "Concept: Tile Travel 'With Tiles'",
                content: "Think of each tile as one life step: work, kid’s game, late‑night edit, random errand. The path is a sequence of tiles the dad “travels” while something precious (the photos) risks slipping out along the way. Drive a UE5 character smoothly from tile to tile instead of free‑moving, like walking along a designed emotional path."
            },
            {
                name: "UE5 C++: Grid/Tile Travel Logic",
                instructions: [
                    "Snap starting position to grid using 'FMath::RoundToFloat'.",
                    "Handle smooth interpolation toward the next Tile center.",
                    "Lock input during movement to enforce deliberate narrative pacing.",
                    "Use 'AddMovementInput' for character-system compatibility."
                ],
                code: `// GridTraveler.h
UPROPERTY(EditAnywhere, Category="Grid")
float TileSize = 200.f;

// Start movement logic
void AGridTraveler::StartMoveInDirection(const FVector& Direction) {
    if (bIsMoving) return;
    TargetLocation = GetActorLocation() + Direction * TileSize;
    bIsMoving = true;
}`
            }
        ],
        deepArchitecture: {
            title: "Full C++ Implementation (The Path)",
            items: [
                "Class: AGridTraveler : public ACharacter",
                "Metaphor: 'Life Locked' grid movement.",
                "System: Precision snapping and input component binding."
            ],
            code: `// GridTraveler.cpp snippet
void AGridTraveler::Tick(float DeltaTime) {
    if (!bIsMoving) return;
    
    FVector ToTarget = TargetLocation - GetActorLocation();
    float DistanceToMove = MoveSpeed * DeltaTime;

    if (ToTarget.Size() <= DistanceToMove) {
        SetActorLocation(TargetLocation);
        bIsMoving = false;
        GetCharacterMovement()->StopMovementImmediately();
    } else {
        AddMovementInput(ToTarget.GetSafeNormal(), 1.0f);
    }
}`
        }
    },
    pulsar: {
        title: "Pulsar VS",
        subtitle: "AI-Generated Virtual Environments",
        color: "#9d50bb",
        layers: [
            {
                name: "Core Features",
                content: "AI-powered tool from Emergent to generate infinite virtual environments from text prompts. Sets are Unreal Engine quality and editable."
            },
            {
                name: "How to Code (Prompt Engineering)",
                instructions: [
                    "Structure prompts using [Subject] + [Context] + [Action] + [Style].",
                    "Use 'Negative Prompts' to eliminate motion blur or geometry warping.",
                    "Chain prompts for iterative world-building.",
                    "Integrate with camera tracking systems via chatbot."
                ],
                code: "Prompt: 'Lush prehistoric jungle, photorealistic, 8k, cinematic lighting --style Unreal5 --action crane_pan'"
            }
        ],
        deepArchitecture: {
            title: "AI Synthesis Pipeline",
            items: [
                "Model: Latent Diffusion v2.",
                "Engine: Real-time volumetric synthesis.",
                "API: Emergent Cloud Integration."
            ],
            json: "{\n  'prompt_complexity': 0.85,\n  'render_mode': 'path_traced',\n  'ai_agent': 'emergent-v2'\n}"
        }
    },
    resolve: {
        title: "DaVinci Resolve",
        subtitle: "Hollywood Post-Production & VFX",
        color: "#ff4b2b",
        layers: [
            {
                name: "Core Features",
                content: "A 5-in-1 solution for editing, color, audio, and VFX. The 'Fusion' page uses a powerful node-based system for procedural effects."
            },
            {
                name: "How to Code (Python/Lua Scripting)",
                instructions: [
                    "Access 'resolve' for timeline automation.",
                    "Use 'fusion' for node-based scripting.",
                    "Enables custom macros for studio workflows.",
                    "Synchronize metadata across production logs."
                ],
                code: `import DaVinciResolveScript as dvr
resolve = dvr.scriptapp('Resolve')
project = resolve.GetProjectManager().GetCurrentProject()`
            }
        ],
        deepArchitecture: {
            title: "Post-Production Architecture",
            items: [
                "CUDA/Metal Acceleration for 8K playback.",
                "FPGA-integrated Fairlight audio engine.",
                "Node Tree procedural geometry generation."
            ],
            json: "{\n  'api_version': '18.6',\n  'platform': 'Win64',\n  'gpu_count': 2\n}"
        }
    }
};

function drillDown(toolId) {
    const data = toolData[toolId];
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');

    let html = \`
        <div class="deep-card" style="--ue5-primary: \${data.color}">
            <div class="deep-header">
                <h2>\${data.title}</h2>
                <p class="subtitle" style="text-align: left">\${data.subtitle}</p>
            </div>
            
            <div class="info-layer">
                <h3>\${data.layers[0].name}</h3>
                <p>\${data.layers[0].content}</p>
            </div>

            <div class="code-layer" style="margin-top: 2rem">
                <h3>\${data.layers[1].name}</h3>
                <ul class="instruction-list">
                    \${data.layers[1].instructions.map(inst => \`<li>\${inst}</li>\`).join('')}
                </ul>
                <div class="code-block">\${data.layers[1].code}</div>
            </div>

            <div style="margin-top: 3rem; text-align: center">
                <button class="nav-btn" onclick="drillDeeper('\${toolId}')">EXPLORE FULL ARCHITECTURE</button>
            </div>
        </div>
    \`;

    content.innerHTML = html;
    overlay.classList.add('active');
}

function closeDrill() {
    document.getElementById('overlay').classList.remove('active');
}

function drillDeeper(toolId) {
    const data = toolData[toolId];
    const arch = data.deepArchitecture;
    const content = document.getElementById('overlay-content');

    let html = \`
        <div class="deep-card" style="--ue5-primary: \${data.color}">
            <div class="deep-header">
                <h2>L3: \${arch.title}</h2>
                <button class="nav-btn-small" onclick="drillDown('\${toolId}')">← BACK TO OVERVIEW</button>
            </div>
            
            <div class="info-layer">
                <ul class="instruction-list">
                    \${arch.items.map(item => \`<li>\${item}</li>\`).join('')}
                </ul>
            </div>

            <div class="code-layer" style="margin-top: 2rem">
                <h3>The Deep Source</h3>
                <div class="code-block" style="color: #66d9ef">\${arch.code || JSON.stringify(JSON.parse(arch.json), null, 2)}</div>
            </div>
        </div>
    \`;

    content.innerHTML = html;
}
