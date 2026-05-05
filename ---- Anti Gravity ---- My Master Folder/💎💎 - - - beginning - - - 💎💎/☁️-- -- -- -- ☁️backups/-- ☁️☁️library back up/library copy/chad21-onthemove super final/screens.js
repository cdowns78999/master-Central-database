const SCREENS = {
    home: `
    <div class="screen-animation-fade" style="padding-top: 30px;">
        <h1 style="font-size: 2.4rem; font-family: 'Outfit'; margin-bottom: 35px; line-height: 1.2; letter-spacing: -0.5px;">
            'Live Your Dreams'<br>Road Map <span onclick="app.toggleCommandCenter()" style="display: inline-block; width: 10px; height: 10px; background: var(--accent-pink); border-radius: 50%; box-shadow: 0 0 15px var(--accent-pink); margin-left: 5px; cursor: pointer;"></span>
        </h1>

        <!-- 🏗️ COMMAND CENTER -->
        <div class="command-center">
            <h4 style="font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px;">Command Console</h4>
            <textarea id="bulk-task-input" class="command-textarea" placeholder="Paste tasks here... (one per line)"></textarea>
            <div class="command-controls">
                <select id="target-selection" class="command-select"></select>
                <button class="btn-add" onclick="app.processBulkTasks()">+ AUTO-ADD</button>
                <button class="btn-clear" onclick="app.clearActiveCard()">CLEAR CARD</button>
                <button class="btn-clear" onclick="app.clearAllCards()" style="background: rgba(255, 0, 0, 0.1); border-color: rgba(255, 0, 0, 0.3); color: #ff4444;">CLEAR ALL</button>
            </div>
        </div>

        <div class="glass-medium" style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 220px; cursor: pointer;" onclick="app.load('detail')">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;">
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.95) 0%, rgba(75, 76, 237, 0.7) 50%, rgba(255, 0, 222, 0.6) 100%);"></div>
            <div style="position: absolute; inset: 0; padding: 25px; display: flex; flex-direction: column; justify-content: center;">
                <h3 class="editable-title" contenteditable="true" onblur="app.saveTitle('vision', this.innerText)" style="font-size: 2.2rem; font-family: 'Outfit'; font-weight: 800; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">Weekly Vision</h3>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px; align-items: start;">
            <!-- LEFT: Recap Column -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="glass-medium active-glow recap-card" id="recap-main-card" style="min-height: 140px; border-radius: var(--radius-md); padding: 16px; position: relative; overflow: hidden; cursor: pointer;" onclick="app.toggleWhisperSheet()">
                    <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;">
                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.85) 0%, rgba(255, 0, 222, 0.3) 100%);"></div>

                    <div style="position: relative; display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4 class="dblclick-edit" ondblclick="app.enableEdit(this)" onblur="app.saveTitle('recap', this.innerText); this.contentEditable='false';" style="font-size: 1.1rem; color: white; cursor: default;">Recap of<br>Call</h4>

                        <div class="whisper-carousel">
                            <div class="whisper-cycle-dot" onclick="event.stopPropagation(); app.cycleWhisperDate()"></div>
                            <div id="whisper-slots-mount"></div>
                        </div>
                    </div>

                    <div id="whisper-task-sheet" class="recap-task-rollout">
                        <!-- Tasks hydrated via app.js -->
                    </div>
                </div>
            </div>

            <!-- RIGHT: Week Tiles Stack -->
            <div id="weeks-mount" style="display: flex; flex-direction: column; gap: 15px;"></div>
        </div>
        <div style="height: 40px;"></div>
    </div>`,

    detail: `<div class="screen-animation-fade">
        <div style="height: 380px; margin: calc(var(--safe-top) * -1) -25px 0 -25px; position: relative; overflow: hidden; border-radius: 0 0 50px 50px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 30px; left: 25px; width: 45px; height: 45px; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1.5px solid rgba(255,255,255,0.2);" onclick="app.load('home')">
                <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 60px 20px 30px; background: linear-gradient(transparent, rgba(11, 1, 29, 1)); text-align: center;">
                <h1 style="font-size: 2.6rem;">Focus Protocol</h1>
                <p style="color: var(--text-muted);">Deep Work & Strategic Planning</p>
            </div>
        </div>
        <div style="margin: 25px 0; padding: 0 10px; text-align: center;">
            <p style="color: var(--text-muted); line-height: 1.6;">Maintain the protocol to ensure maximum efficiency in the upcoming sprint...</p>
        </div>
        <button style="width: 100%; height: 75px; background: linear-gradient(135deg, var(--accent-pink), var(--primary)); border: none; border-radius: 35px; color: white; font-weight: 800; font-size: 1.2rem; cursor: pointer;" onclick="app.load('home')">BACK TO HUB</button>
    </div>`,

    ticket: `<div class="screen-animation-fade">
        <h2 style="font-size: 2rem; text-align: center; margin-top: 50px;">New Recap Entry</h2>
        <div style="padding: 40px 20px;">
           <div class="glass-medium" style="padding: 30px; border-radius: 25px; text-align: center;">
               <p style="color: var(--text-muted); margin-bottom: 20px;">Add a new weekly milestone or call recap.</p>
               <button class="active-glow" style="padding: 15px 40px; border-radius: 20px; color: white; border: none; font-weight: 800; cursor: pointer;" onclick="app.addRecap()">CREATE NOW</button>
           </div>
        </div>
    </div>`,

    profile: `<div class="screen-animation-fade">
        <div style="text-align: center; margin-top: 40px;">
            <div style="width: 120px; height: 120px; margin: 0 auto 20px; border-radius: 50%; border: 4px solid var(--accent-cyan); padding: 5px; position: relative;">
                <img src="https://ui-avatars.com/api/?name=Chad+Downs&background=00F2FF&color=0B011D&bold=true" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            </div>
            <h1 style="font-size: 2.2rem;">Chad Downs</h1>
            <p style="color: var(--accent-pink); font-weight: 800; text-transform: uppercase;">Strategic Lead</p>
        </div>
    </div>`
};
