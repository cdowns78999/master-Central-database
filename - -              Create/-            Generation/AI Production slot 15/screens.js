const SCREENS = {
    home: `<!-- HOME SCREEN (HANDY v15) -->
<div class="screen-mount" style="padding-top: 10px;">
    
    <header style="margin-bottom: 30px;">
        <p style="color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.5px; margin-bottom: 4px;">SYSTEM STATUS: ONLINE</p>
        <h1 style="font-size: 2.2rem; font-family: 'Outfit'; font-weight: 900;">Daily Protocol</h1>
    </header>

    <!-- ACTIVE CARDS (Ticket Style) -->
    <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Main Card: THIS WEEK -->
        <div class="glass-medium" style="position: relative; border-radius: var(--radius-lg); padding: 25px; min-height: 180px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--accent-cyan); background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(0, 0, 0, 0.4));">
            <div style="position: absolute; top: 0; right: 0; padding: 10px 15px; background: var(--accent-cyan); color: var(--bg-void); font-family: 'JetBrains Mono'; font-weight: 800; font-size: 0.65rem; border-bottom-left-radius: 15px; box-shadow: 0 0 20px var(--accent-cyan);">ACTIVE CYCLE</div>
            
            <div>
                <p style="color: var(--accent-cyan); font-family: 'JetBrains Mono'; font-size: 0.7rem; font-weight: 900; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Protocol: Temporal_Sync</p>
                <h3 style="font-size: 2.2rem; line-height: 1.1; font-family: 'Outfit'; font-weight: 900;">THIS WEEK</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 5px;">Managing all primary objectives</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 25px;">
                <div style="display: flex; gap: 8px;">
                    <span style="padding: 6px 12px; background: rgba(0, 242, 255, 0.1); border-radius: 12px; font-size: 0.7rem; font-family: 'JetBrains Mono'; border: 1px solid rgba(0, 242, 255, 0.2); color: var(--accent-cyan); font-weight: 800;">72% DONE</span>
                    <span style="padding: 6px 12px; background: rgba(255,255,255,0.05); border-radius: 12px; font-size: 0.7rem; font-family: 'JetBrains Mono'; border: 1px solid rgba(255,255,255,0.1);">14 TASKS</span>
                </div>
                <div style="font-family: 'JetBrains Mono'; font-size: 0.55rem; opacity: 0.3; letter-spacing: 3px;">#CW-2026-X</div>
            </div>

            <!-- Punch Holes (From Slot 6 Reference) -->
            <div style="position: absolute; top: 50%; left: -12px; width: 24px; height: 24px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%); border: 1px solid rgba(255,255,255,0.05);"></div>
            <div style="position: absolute; top: 50%; right: -12px; width: 24px; height: 24px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%); border: 1px solid rgba(255,255,255,0.05);"></div>
            
            <!-- Perforation Line -->
            <div style="position: absolute; top: 50%; left: 12px; right: 12px; border-top: 2px dashed rgba(255,255,255,0.1); transform: translateY(-50%); pointer-events: none;"></div>
        </div>

        <!-- Secondary Card -->
        <div class="glass-medium" style="position: relative; border-radius: var(--radius-lg); padding: 25px; min-height: 160px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--accent-vibrant);">
            <div>
                <p style="color: var(--accent-vibrant); font-family: 'JetBrains Mono'; font-size: 0.65rem; font-weight: 800; margin-bottom: 8px; text-transform: uppercase;">Protocol: UI_Vanguard</p>
                <h3 style="font-size: 1.5rem; line-height: 1.2;">Port Handby Dashboard Logic</h3>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px;">
                <div style="display: flex; gap: 8px;">
                    <span style="padding: 4px 10px; background: rgba(255,255,255,0.05); border-radius: 10px; font-size: 0.65rem; font-family: 'JetBrains Mono'; border: 1px solid rgba(255,255,255,0.1);">+120 XP</span>
                </div>
                <div style="font-family: 'JetBrains Mono'; font-size: 0.5rem; opacity: 0.2; letter-spacing: 2px;">#TRK-4412-B</div>
            </div>

            <!-- Punch Holes -->
            <div style="position: absolute; top: 50%; left: -10px; width: 20px; height: 20px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%);"></div>
            <div style="position: absolute; top: 50%; right: -10px; width: 20px; height: 20px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%);"></div>
        </div>

    </div>

    <!-- Analytics Glass -->
    <div class="glass-thin" style="margin-top: 30px; border-radius: var(--radius-md); padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
            <h4 style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Weekly Output</h4>
            <p style="font-size: 1.5rem; font-weight: 900; color: var(--accent-cyan);">84% OPTIMAL</p>
        </div>
        <div style="width: 50px; height: 50px; background: rgba(0, 242, 255, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 24px; height: 24px; color: var(--accent-cyan);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
    </div>

    <div style="height: 100px;"></div>
</div>`,

    map: `<div class="screen-mount" style="display: flex; align-items: center; justify-content: center;">
        <h2 style="opacity: 0.2;">MAP SURVEILLANCE OFFLINE</h2>
    </div>`,

    wizard: `<!-- REFINED WIZARD SCREEN (SLOT 15) -->
<div class="screen-mount" style="padding-top: 10px;">
    <header style="margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
            <p style="color: var(--accent-vibrant); font-family: 'JetBrains Mono'; font-size: 0.65rem; font-weight: 800; margin-bottom: 4px; text-transform: uppercase;">Build_Protocol // v15.0</p>
            <h1 style="font-size: 2.22rem; font-family: 'Outfit'; font-weight: 900;">New Objective</h1>
        </div>
        <div class="glass-thin" style="padding: 10px 15px; border-radius: 15px; text-align: right;">
            <p style="font-size: 0.55rem; color: var(--text-muted);">STEP</p>
            <p style="font-size: 1.1rem; font-weight: 900; color: var(--accent-vibrant);">02<span style="font-size: 0.7rem; opacity: 0.3;">/04</span></p>
        </div>
    </header>

    <div style="margin-bottom: 35px;">
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 20px; color: var(--text-main);">1. Select Execution Date</p>
        
        <!-- Elevation Check Date Selector -->
        <div class="scroll-hide" style="display: flex; gap: 20px; overflow-x: auto; padding: 20px 0; align-items: center; justify-content: flex-start;">
            <div class="glass-medium" style="min-width: 75px; height: 100px; padding: 20px 10px; text-align: center; border-radius: 24px; transition: var(--transition-smooth); opacity: 0.5;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">MON</span>
                <p style="font-size: 1.4rem; font-weight: 900; margin-top: 5px;">25</p>
            </div>
            
            <!-- Active State: 20% Larger (Elevation Check) -->
            <div class="active-glow" style="min-width: 90px; height: 120px; padding: 25px 10px; text-align: center; border-radius: 28px; transform: scale(1.0); z-index: 10; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 15px 40px rgba(75, 76, 237, 0.4);">
                <span style="font-size: 0.75rem; color: white; font-weight: 800; text-transform: uppercase;">TUE</span>
                <p style="font-size: 1.8rem; font-weight: 900; color: white; margin-top: 5px;">26</p>
                <div style="width: 5px; height: 5px; background: white; border-radius: 50%; margin: 8px auto 0;"></div>
            </div>

            <div class="glass-medium" style="min-width: 75px; height: 100px; padding: 20px 10px; text-align: center; border-radius: 24px; transition: var(--transition-smooth); opacity: 0.5;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">WED</span>
                <p style="font-size: 1.4rem; font-weight: 900; margin-top: 5px;">27</p>
            </div>

            <div class="glass-medium" style="min-width: 75px; height: 100px; padding: 20px 10px; text-align: center; border-radius: 24px; transition: var(--transition-smooth); opacity: 0.5;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">THU</span>
                <p style="font-size: 1.4rem; font-weight: 900; margin-top: 5px;">28</p>
            </div>
        </div>
    </div>

    <div style="margin-bottom: 35px;">
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 20px; color: var(--text-main);">2. Objective Description</p>
        <div class="glass-medium" style="border-radius: var(--radius-md); padding: 5px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <input type="text" placeholder="Scanning input for keywords..." style="width: 100%; background: transparent; border: none; padding: 18px; color: white; font-family: 'Inter'; font-size: 1rem; outline: none;">
        </div>
    </div>

    <button style="width: 100%; height: 75px; background: linear-gradient(135deg, var(--accent-vibrant), var(--primary)); border: none; border-radius: 25px; color: white; font-weight: 900; font-size: 1.2rem; letter-spacing: 2px; box-shadow: 0 15px 30px rgba(255, 0, 204, 0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;" onclick="app.load('home')">
        INITIALIZE
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
    </button>
    
    <div style="height: 100px;"></div>
</div>`,

    focus: `<div class="screen-mount" style="display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center;">
            <div style="width: 150px; height: 150px; border: 2px dashed var(--accent-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; animation: rotate 10s linear infinite;">
                 <svg style="width: 60px; height: 60px; color: var(--accent-cyan);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <h2 style="font-family: 'Outfit'; font-weight: 900; color: var(--accent-cyan);">CHAMBER CALIBRATING</h2>
            <p style="font-family: 'JetBrains Mono'; font-size: 0.7rem; color: var(--text-muted); margin-top: 10px;">ALIGNING NEURAL VECTORS...</p>
        </div>
    </div>`,

    profile: `<div class="screen-mount" style="padding-top: 10px;">
         <header style="margin-bottom: 40px; text-align: center;">
            <div style="width: 120px; height: 120px; background: linear-gradient(45deg, var(--accent-cyan), var(--primary)); border-radius: 50%; margin: 0 auto 20px; border: 4px solid var(--bg-void); box-shadow: 0 0 30px var(--primary-glow); display: flex; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; inset: -5px; border: 2px solid var(--accent-cyan); border-radius: 50%; opacity: 0.3;"></div>
                <img src="https://ui-avatars.com/api/?name=Chad+Downs&background=00F2FF&color=0B011D&bold=true" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            </div>
            <h1 style="font-size: 2.22rem; font-family: 'Outfit'; font-weight: 900;">CHAD_DOWNS</h1>
            <p style="font-family: 'JetBrains Mono'; color: var(--accent-cyan); font-size: 0.75rem; font-weight: 900; letter-spacing: 2px;">COMMANDER_LEVEL_42</p>
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="glass-medium" style="padding: 25px; border-radius: var(--radius-lg); text-align: center; border-bottom: 3px solid var(--accent-cyan);">
                <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 800;">TASKS_SYNCED</span>
                <p style="font-size: 1.8rem; font-weight: 900; margin-top: 8px;">152</p>
            </div>
            <div class="glass-medium" style="padding: 25px; border-radius: var(--radius-lg); text-align: center; border-bottom: 3px solid var(--accent-vibrant);">
                <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 800;">STREAK_VAL</span>
                <p style="font-size: 1.8rem; font-weight: 900; margin-top: 8px; color: var(--accent-vibrant);">12</p>
            </div>
        </div>

        <div class="glass-thin" style="margin-top: 25px; border-radius: var(--radius-md); padding: 20px; display: flex; align-items: center; gap: 15px;">
            <div style="width: 45px; height: 45px; background: rgba(255, 203, 5, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                 <svg style="width: 24px; height: 24px; color: var(--rank-color);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-2 5h4l-2-5zM12 2l3 7h-6l3-7zM2 10l5 3v-6l-5 3zM22 10l-5 3v-6l5 3z"/></svg>
            </div>
            <div>
                <h4 style="font-size: 0.8rem; font-family: 'Outfit'; font-weight: 800;">Elite Tier Unlocked</h4>
                <p style="font-size: 0.65rem; color: var(--text-muted);">Season 04 Rewards Active</p>
            </div>
        </div>
    </div>`
};
