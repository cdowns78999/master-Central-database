const SCREENS = {
    home: `<!-- REFINED HOME SCREEN (SLOT 6) -->
<div class="screen-animation-fade" style="padding-top: 10px;">
    
    <!-- User Header -->
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px;">
        <div class="user-info">
            <p style="color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.5px; margin-bottom: 4px;">Welcome back,</p>
            <h1 style="font-size: 1.8rem; font-family: 'Outfit';">Chad Downs</h1>
        </div>
        <div class="profile-glow" style="width: 50px; height: 50px; border-radius: 50%; border: 2.5px solid var(--accent-cyan); overflow: hidden; padding: 2px; background: rgba(0, 242, 255, 0.1);">
            <img src="https://ui-avatars.com/api/?name=Chad+Downs&background=00F2FF&color=0B011D&bold=true" alt="Chad" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
        </div>
    </header>

    <!-- Search Glass -->
    <div class="glass-medium" style="display: flex; align-items: center; padding: 15px 20px; border-radius: var(--radius-md); margin-bottom: 35px;">
        <svg style="width: 20px; height: 20px; color: var(--text-ghost); margin-right: 15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span style="color: var(--text-ghost); font-size: 1rem;">Search movies, actors...</span>
    </div>

    <!-- Category Pills -->
    <div class="scroll-hide" style="display: flex; gap: 12px; overflow-x: auto; margin-bottom: 35px; padding-bottom: 5px;">
        <div style="background: var(--accent-cyan); color: var(--bg-void); padding: 10px 24px; border-radius: var(--radius-pill); font-weight: 800; font-size: 0.85rem; box-shadow: 0 10px 20px rgba(0, 242, 255, 0.3);">Featured</div>
        <div class="glass-thin" style="padding: 10px 22px; border-radius: var(--radius-pill); color: var(--text-muted); font-size: 0.85rem;">Music</div>
        <div class="glass-thin" style="padding: 10px 22px; border-radius: var(--radius-pill); color: var(--text-muted); font-size: 0.85rem;">Movies</div>
        <div class="glass-thin" style="padding: 10px 22px; border-radius: var(--radius-pill); color: var(--text-muted); font-size: 0.85rem;">Sports</div>
    </div>

    <!-- Trending Section -->
    <h2 style="font-size: 1.4rem; margin-bottom: 25px; display: flex; align-items: center; gap: 10px;">
        Trending Now <span style="width: 8px; height: 8px; background: var(--accent-pink); border-radius: 50%; box-shadow: 0 0 10px var(--accent-pink);"></span>
    </h2>

    <!-- Hero Card -->
    <div class="glass-medium" style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 220px; cursor: pointer;" onclick="app.load('detail')">
        <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(11, 1, 29, 0.95) 20%, transparent 80%);"></div>
        <div style="position: absolute; inset: 0; padding: 25px; display: flex; flex-direction: column; justify-content: center;">
            <div style="background: linear-gradient(90deg, var(--accent-pink), #8E2DE2); padding: 5px 12px; border-radius: 8px; width: fit-content; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; box-shadow: 0 5px 15px rgba(255, 0, 222, 0.3);">Selling Fast</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 4px; line-height: 1.1;">Doctor<br>Strange</h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 15px;">In the Multiverse of Madness</p>
            <div style="font-family: 'Outfit'; font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan);">$18.00</div>
        </div>
    </div>

    <!-- Grid Cards -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
        <div class="glass-medium" style="height: 160px; border-radius: var(--radius-md); padding: 18px; position: relative; overflow: hidden;">
            <img src="https://images.unsplash.com/photo-1514525253361-bee8d40d9091?q=80&w=500" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3;">
            <h4 style="position: relative; font-size: 1.1rem; font-family: 'Outfit';">Music<br>Festivals</h4>
            <p style="position: relative; color: var(--accent-cyan); font-size: 0.75rem; font-weight: 800; margin-top: 8px;">24 EVENTS</p>
        </div>
        <div class="glass-medium" style="height: 160px; border-radius: var(--radius-md); padding: 18px; position: relative; overflow: hidden;">
            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=500" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3;">
            <h4 style="position: relative; font-size: 1.1rem; font-family: 'Outfit';">Live<br>Sports</h4>
            <p style="position: relative; color: var(--accent-pink); font-size: 0.75rem; font-weight: 800; margin-top: 8px;">12 EVENTS</p>
        </div>
    </div>
    <div style="height: 40px;"></div>
</div>`,

    detail: `<!-- REFINED DETAIL SCREEN -->
<div class="screen-animation-fade">
    <div style="height: 380px; margin: calc(var(--safe-top) * -1) -25px 0 -25px; position: relative; overflow: hidden; border-radius: 0 0 50px 50px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
        <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover;">
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
    <div style="position: relative; height: 480px; display: flex; justify-content: center; perspective: 1000px;">
        <div class="glass-medium" style="position: absolute; width: 80%; height: 400px; border-radius: 40px; transform: rotate(-8deg) translateY(20px); opacity: 0.2;"></div>
        <div class="glass-medium" style="position: absolute; width: 80%; height: 400px; border-radius: 40px; transform: rotate(8deg) translateY(20px); opacity: 0.2;"></div>
        <div style="position: relative; width: 90%; height: 460px; border-radius: 40px; overflow: hidden; background: #FFF; box-shadow: 0 40px 80px rgba(0,0,0,0.7); z-index: 10;">
            <div style="height: 62%; overflow: hidden; position: relative;"><img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000" style="width: 100%; height: 100%; object-fit: cover;"></div>
            <div style="height: 38%; background: #FFF; padding: 22px; color: #111;">
                <div style="display: flex; justify-content: space-between; border-bottom: 2px dashed #EEE; padding-bottom: 15px; margin-bottom: 20px;">
                    <div><span style="color: var(--primary); font-weight: 800; font-size: 0.65rem; text-transform: uppercase;">Date:</span><p style="font-weight: 800; font-size: 0.95rem;">April 23</p></div>
                    <div><span style="color: var(--primary); font-weight: 800; font-size: 0.65rem; text-transform: uppercase;">Row:</span><p style="font-weight: 800; font-size: 0.95rem;">2</p></div>
                    <div><span style="color: var(--primary); font-weight: 800; font-size: 0.65rem; text-transform: uppercase;">Seats:</span><p style="font-weight: 800; font-size: 0.95rem;">9, 10</p></div>
                </div>
                <div style="text-align: center;"><div style="width: 100%; height: 40px; background-image: repeating-linear-gradient(90deg, #111, #111 2px, transparent 2px, transparent 6px);"></div><p style="font-weight: 800; color: #777; letter-spacing: 5px; font-size: 0.8rem; margin-top: 8px;">0987654321</p></div>
            </div>
            <div style="position: absolute; top: 62%; left: -15px; width: 30px; height: 30px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%);"></div>
            <div style="position: absolute; top: 62%; right: -15px; width: 30px; height: 30px; background: var(--bg-void); border-radius: 50%; transform: translateY(-50%);"></div>
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
