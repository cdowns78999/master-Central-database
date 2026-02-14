const SCREENS = {
    home: `<!-- REFINED HOME SCREEN (SLOT 6) -->
<!-- REFINED HOME SCREEN (SLOT 6) -->
<div class="screen-animation-fade" style="padding-top: 30px;">
    
    <!-- Main Title Field -->
    <h1 style="font-size: 2.4rem; font-family: 'Outfit'; margin-bottom: 35px; line-height: 1.2; letter-spacing: -0.5px;">
        'Live Your Dreams'<br>Road Map <span style="display: inline-block; width: 10px; height: 10px; background: var(--accent-pink); border-radius: 50%; box-shadow: 0 0 15px var(--accent-pink); margin-left: 5px;"></span>
    </h1>

    <!-- Hero Card -->
    <div class="glass-medium" style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 220px; cursor: pointer;" onclick="app.load('detail')">
        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;">
        <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.95) 0%, rgba(75, 76, 237, 0.7) 50%, rgba(255, 0, 222, 0.6) 100%);"></div>
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at top right, var(--accent-cyan) 0%, transparent 60%); opacity: 0.3;"></div>
        <div style="position: absolute; inset: 0; padding: 25px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size: 2.2rem; font-family: 'Outfit'; font-weight: 800; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">Goals of The Week</h3>
        </div>
    </div>

    <!-- 2-Column Roadmap Layout -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px; align-items: start;">
        
        <!-- LEFT COLUMN: Dynamic Goals Stack (Vertical) -->
        <div id="goals-mount" style="display: flex; flex-direction: column; gap: 20px;"></div>

        <!-- RIGHT COLUMN: Permanent Recap Card -->
        <div class="glass-medium active-glow"
             style="min-height: 160px; border-radius: var(--radius-md); padding: 18px; position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26, 11, 46, 0.8) 0%, rgba(255, 0, 222, 0.3) 100%);"></div>
            <h4 style="position: relative; font-size: 1.1rem; font-family: 'Outfit'; font-weight: 800; color: white; margin-bottom: 10px;">Recap of<br>Call</h4>

            <!-- 🗓️ DATE SLOTS (4 SPOTS) - VISIBLE & INTERACTIVE -->
            <div id="recap-dates-mount" class="recap-dates-container" style="position: relative;">
                <div class="recap-date-slot" onclick="app.selectRecapDate(0, this)">MM/DD</div>
                <div class="recap-date-slot" onclick="app.selectRecapDate(1, this)">MM/DD</div>
                <div class="recap-date-slot" onclick="app.selectRecapDate(2, this)">MM/DD</div>
                <div class="recap-date-slot" onclick="app.selectRecapDate(3, this)">MM/DD</div>
            </div>

            <!-- 📋 RECAP TASK ROLLOUT (Tucked under Recap Card) -->
            <div id="recap-task-rollout" class="recap-task-rollout">
                <div class="recap-task-header">
                    <span class="recap-task-label">Focus Tasks</span>
                    <span class="recap-task-count">0/3</span>
                </div>
                <div class="recap-task-row">
                    <div class="task-dot"></div>
                    <input type="text" placeholder="What needs to happen..." class="task-input">
                </div>
                <div class="recap-task-row">
                    <div class="task-dot"></div>
                    <input type="text" placeholder="Next priority..." class="task-input">
                </div>
                <div class="recap-task-row">
                    <div class="task-dot"></div>
                    <input type="text" placeholder="Final action..." class="task-input">
                </div>
            </div>
        </div>
    </div>

    <div style="height: 40px;"></div>
</div>`,

    detail: `<!-- REFINED DETAIL SCREEN -->
<div class="screen-animation-fade">
    <div style="height: 380px; margin: calc(var(--safe-top) * -1) -25px 0 -25px; position: relative; overflow: hidden; border-radius: 0 0 50px 50px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="absolute; top: 30px; left: 25px; width: 45px; height: 45px; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1.5px solid rgba(255,255,255,0.2);" onclick="app.load('home')">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </div>
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 60px 20px 30px; background: linear-gradient(transparent, rgba(11, 1, 29, 1)); text-align: center;">
            <h1 style="font-size: 2.6rem; font-family: 'Outfit'; margin-bottom: 5px;">Doctor Strange</h1>
            <p style="color: var(--text-muted); font-size: 1rem; letter-spacing: 0.5px;">In the Multiverse of Madness</p>
        </div>
    </div>
    <div style="margin: 25px 0; padding: 0 10px; text-align: center;">
        <p style="color: var(--text-muted); line-height: 1.6; font-size: 1rem;">Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse... <b style="color: var(--accent-cyan);">read more</b></p>
    </div>
    <div class="scroll-hide" style="display: flex; gap: 15px; overflow-x: auto; padding: 10px 0 30px; align-items: center; justify-content: center;">
        <div class="glass-medium" style="min-width: 70px; padding: 18px 10px; text-align: center; border-radius: 24px;"><span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">Thu</span><p style="font-size: 1.2rem; font-weight: 800; margin-top: 5px;">21</p></div>
        <div class="active-glow" style="min-width: 80px; padding: 25px 10px; text-align: center; border-radius: 28px; transform: scale(1.1); z-index: 10;"><span style="font-size: 0.7rem; color: white; font-weight: 800; text-transform: uppercase;">Sat</span><p style="font-size: 1.6rem; font-weight: 800; color: white; margin-top: 5px;">23</p></div>
        <div class="glass-medium" style="min-width: 70px; padding: 18px 10px; text-align: center; border-radius: 24px;"><span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase;">Sun</span><p style="font-size: 1.2rem; font-weight: 800; margin-top: 5px;">24</p></div>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 40px;">
        <div class="glass-thin" style="padding: 12px 22px; border-radius: 15px; font-weight: 800; border: 1.5px solid rgba(0, 242, 255, 0.2);">16:00</div>
        <div style="background: var(--accent-cyan); color: var(--bg-void); padding: 12px 22px; border-radius: 15px; font-weight: 800; box-shadow: 0 0 20px rgba(0, 242, 255, 0.4);">18:00</div>
        <div class="glass-thin" style="padding: 12px 22px; border-radius: 15px; font-weight: 800; border: 1.5px solid rgba(0, 242, 255, 0.2);">20:00</div>
    </div>
    <button style="width: 100%; height: 75px; background: linear-gradient(135deg, var(--accent-pink), var(--primary)); border: none; border-radius: 35px; color: white; font-weight: 800; font-size: 1.2rem; letter-spacing: 2px; box-shadow: 0 15px 30px rgba(255, 0, 222, 0.3); cursor: pointer;" onclick="app.load('ticket')">RESERVATION</button>
</div>`,

    ticket: `<!-- REFINED TICKET SCREEN -->
<div class="screen-animation-fade">
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-top: 10px;">
        <div style="width: 45px; height: 45px; background: rgba(255,255,255,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="app.load('detail')">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </div>
        <h2 style="font-size: 1.4rem; font-family: 'Outfit';">Mobile Ticket</h2>
        <div style="width: 45px; height: 45px; background: rgba(255,255,255,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center;"><svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></div>
    </header>
    <div style="padding: 20px; display: flex; justify-content: center; align-items: center; height: 400px;">
        <div class="glass-medium active-glow" 
             style="width: 100%; height: 200px; border-radius: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.3s ease;"
             onclick="app.addGoal()"
             onmousedown="this.style.transform='scale(0.95)'"
             onmouseup="this.style.transform='scale(1)'">
            <h1 style="font-family: 'Outfit'; font-size: 3rem; font-weight: 800; letter-spacing: 5px; color: white;">ADD</h1>
        </div>
    </div>
</div>`,

    profile: `<!-- REFINED PROFILE SCREEN -->
<div class="screen-animation-fade">
    <div style="text-align: center; margin-bottom: 40px; padding-top: 20px;">
        <div style="width: 120px; height: 120px; margin: 0 auto 20px; border-radius: 50%; border: 4px solid var(--accent-cyan); padding: 5px; position: relative;">
            <img src="https://ui-avatars.com/api/?name=Chad+Downs&background=00F2FF&color=0B011D&bold=true" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
        </div>
        <h1 style="font-size: 2.2rem; font-family: 'Outfit';">Chad Downs</h1>
        <p style="color: var(--accent-pink); font-weight: 800; font-size: 0.85rem; text-transform: uppercase;">Elite Member</p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 35px;">
        <div class="glass-medium" style="padding: 22px; border-radius: var(--radius-lg); text-align: center;"><span style="color: var(--text-ghost); font-size: 0.7rem; font-weight: 800;">Tickets</span><p style="font-size: 1.8rem; font-weight: 800; margin-top: 8px;">12</p></div>
        <div class="glass-medium" style="padding: 22px; border-radius: var(--radius-lg); text-align: center;"><span style="color: var(--text-ghost); font-size: 0.7rem; font-weight: 800;">Points</span><p style="font-size: 1.8rem; font-weight: 800; margin-top: 8px; color: var(--accent-cyan);">2.4k</p></div>
    </div>
</div>`
};
