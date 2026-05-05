/* ═══════════════════════════════════════════════════════════════
   LABEL DATABASE — 77 Unique Labels
   Big Genre Split: BASS vs HOUSE
   Source: RESEARCH-REPORT.md (March 21, 2026)
   Type: major | major-backed | independent
   ═══════════════════════════════════════════════════════════════ */

const labelData = {

    "Bass": [
        { name: "Monstercat", sub: "Bass / Multi-genre", founded: 2011, roster: 200, country: "Canada", type: "major-backed", tags: ["bass","dubstep","diverse"], color: "#111111", assoc: "Largest indie EDM label", sourceTrack: "Alone", sourceChart: "Spotify Viral 50", followers: 9500000, avgStreams: 2500000, streamGrade: "A", releases2025: 200, releasesLast6: 100, releasePace: "weekly", artists: [
            { name: "Tokyo Machine", release: "FIGHT", instagram: "@tokyomachine", listeners: 1800000, reach: 3500000, trend: "steady" },
            { name: "Bishu", release: "Bomb", instagram: "@bishumusic", listeners: 200000, reach: 500000, trend: "up" },
            { name: "Kayzo", release: "Earthquake", instagram: "@kayzomusic", listeners: 600000, reach: 1500000, trend: "steady" },
            { name: "Pixel Terror", release: "Elysium", instagram: "@pixelterror", listeners: 300000, reach: 700000, trend: "up" }
        ] },
        { name: "Dim Mak Records", sub: "Bass / Electro", founded: 1996, roster: 100, country: "United States", type: "independent", tags: ["bass","electro"], color: "#fbbf24", assoc: "Steve Aoki", sourceTrack: "Turbulence", sourceChart: "Beatport Top 100", followers: 2500000, avgStreams: 1800000, streamGrade: "A", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Steve Aoki", release: "Mu5t D13", instagram: "@steveaoki", listeners: 5500000, reach: 25000000, trend: "steady" },
            { name: "Autoerotique", release: "Asphyxiation", instagram: "@autoerotique", listeners: 150000, reach: 400000, trend: "steady" },
            { name: "Max Styler", release: "Knock Me Down", instagram: "@maxstyler", listeners: 250000, reach: 600000, trend: "up" },
            { name: "Valentino Khan", release: "Lick It", instagram: "@valentinokhan", listeners: 1200000, reach: 3000000, trend: "up" }
        ] },
        { name: "NCS", sub: "Multi-Genre", founded: 2011, roster: 100, country: "United Kingdom", type: "major-backed", tags: ["free","diverse","youtube"], color: "#111111", assoc: "NoCopyrightSounds", sourceTrack: "Fade", sourceChart: "Spotify Viral 50", followers: 35000000, avgStreams: 15000000, streamGrade: "S", releases2025: 180, releasesLast6: 90, releasePace: "weekly", artists: [
            { name: "Elektronomia", release: "Limitless", instagram: "@elektronomia", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Tobu", release: "Candyland", instagram: "@tobuofficial", listeners: 3000000, reach: 6000000, trend: "steady" },
            { name: "Alan Walker", release: "Faded", instagram: "@alanwalkermusic", listeners: 30000000, reach: 80000000, trend: "up" },
            { name: "Jim Yosef", release: "Link", instagram: "@jimyosef", listeners: 1500000, reach: 3000000, trend: "steady" }
        ] },
        { name: "Subsidia", sub: "Bass", founded: 2020, roster: 80, country: "United States", type: "independent", tags: ["bass","dubstep","excision"], color: "#dc2626", assoc: "Excision (3 sub-labels)", avgStreams: 250000, streamGrade: "B", releases2025: 100, releasesLast6: 50, releasePace: "weekly", artists: [
            { name: "Excision", release: "Decimate", instagram: "@excisionofficial", listeners: 1500000, reach: 5000000, trend: "up" },
            { name: "Sullivan King", release: "Venomous", instagram: "@sullivankingmusic", listeners: 800000, reach: 2500000, trend: "up" },
            { name: "Wooli", release: "Mammoth", instagram: "@woolimusic", listeners: 500000, reach: 1500000, trend: "up" },
            { name: "PhaseOne", release: "Crash & Burn", instagram: "@phaseoneau", listeners: 300000, reach: 800000, trend: "up" }
        ] },
        { name: "Mad Decent", sub: "Bass / Trap", founded: 2006, roster: 60, country: "United States", type: "major-backed", tags: ["bass","trap"], color: "#22c55e", assoc: "Diplo", sourceTrack: "Lean On", sourceChart: "Billboard Hot Dance", followers: 3500000, avgStreams: 3000000, streamGrade: "A", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "Diplo", release: "Don't Forget My Love", instagram: "@diplo", listeners: 18000000, reach: 40000000, trend: "steady" },
            { name: "DJ Snake", release: "Disco Maghreb", instagram: "@djsnake", listeners: 15000000, reach: 35000000, trend: "steady" },
            { name: "Juelz", release: "Inferno", instagram: "@juelzmusic", listeners: 100000, reach: 300000, trend: "up" },
            { name: "Baauer", release: "Planet's Mad", instagram: "@baauer", listeners: 1000000, reach: 2500000, trend: "steady" }
        ] },
        { name: "Bassrush", sub: "Bass", founded: 2001, roster: 60, country: "United States", type: "major-backed", tags: ["bass","dubstep","insomniac"], color: "#f97316", assoc: "Insomniac's bass division", avgStreams: 60000, streamGrade: "C", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Svdden Death", release: "Behemoth", instagram: "@svddendeath", listeners: 700000, reach: 2000000, trend: "up" },
            { name: "Marauda", release: "Avoidable Cause", instagram: "@maraudadubstep", listeners: 400000, reach: 1200000, trend: "up" },
            { name: "Level Up", release: "Backup", instagram: "@levelupdj", listeners: 150000, reach: 400000, trend: "up" },
            { name: "Calcium", release: "Lockjaw", instagram: "@calciumdubstep", listeners: 200000, reach: 500000, trend: "up" }
        ] },
        { name: "Never Say Die", sub: "Bass / Dubstep", founded: 2009, roster: 50, country: "United Kingdom", type: "independent", tags: ["dubstep","bass","heavy"], color: "#ef4444", assoc: "SKisM, Trampa, MUST DIE!", avgStreams: 300000, streamGrade: "B", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "SKisM", release: "Like This", instagram: "@skism", listeners: 300000, reach: 800000, trend: "steady" },
            { name: "Trampa", release: "Rocket Fuel", instagram: "@trampamusic", listeners: 250000, reach: 700000, trend: "steady" },
            { name: "Must Die!", release: "Chaos", instagram: "@mustdiemusic", listeners: 350000, reach: 900000, trend: "steady" },
            { name: "Eptic", release: "Watch Out", instagram: "@eptic", listeners: 800000, reach: 2000000, trend: "up" }
        ] },
        { name: "UKF", sub: "Drum & Bass / Dubstep", founded: 2009, roster: 50, country: "United Kingdom", type: "independent", tags: ["dnb","dubstep","media"], color: "#2563eb", assoc: "Media/label hybrid, 15M+ YT", avgStreams: 1500000, streamGrade: "A", releases2025: 70, releasesLast6: 35, releasePace: "weekly", artists: [
            { name: "Sub Focus", release: "Vibration", instagram: "@subfocus", listeners: 1000000, reach: 3000000, trend: "steady" },
            { name: "Netsky", release: "Snitch", instagram: "@netskymusic", listeners: 1500000, reach: 4000000, trend: "steady" },
            { name: "Dimension", release: "Offender", instagram: "@dimension_uk", listeners: 800000, reach: 2000000, trend: "up" },
            { name: "Kanine", release: "Pull Up", instagram: "@kanineuk", listeners: 100000, reach: 250000, trend: "up" }
        ] },
        { name: "Circus Records", sub: "Bass / Dubstep", founded: 2010, roster: 45, country: "United Kingdom", type: "independent", tags: ["dubstep","bass"], color: "#e11d48", assoc: "Doctor P, Flux Pavilion", avgStreams: 400000, streamGrade: "B", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Flux Pavilion", release: "Endless Fantasy", instagram: "@fluxpavilion", listeners: 1500000, reach: 4000000, trend: "steady" },
            { name: "Doctor P", release: "The Pit", instagram: "@doctorpofficial", listeners: 400000, reach: 1000000, trend: "steady" },
            { name: "Funtcase", release: "Fire", instagram: "@funtcaseuk", listeners: 200000, reach: 600000, trend: "down" },
            { name: "Cookie Monsta", release: "Ruff", instagram: "@cookiemonstauk", listeners: 200000, reach: 500000, trend: "down" }
        ] },
        { name: "WAKAAN", sub: "Experimental Bass", founded: 2015, roster: 40, country: "United States", type: "independent", tags: ["experimental","bass","weird"], color: "#a855f7", assoc: "Liquid Stranger", avgStreams: 80000, streamGrade: "C", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "Liquid Stranger", release: "Psychonaut", instagram: "@liquidstranger", listeners: 600000, reach: 2000000, trend: "up" },
            { name: "LUZCID", release: "Soundscape", instagram: "@luzcid", listeners: 100000, reach: 300000, trend: "steady" },
            { name: "Space Jesus", release: "Space Boss", instagram: "@spacejesusofficial", listeners: 200000, reach: 500000, trend: "down" },
            { name: "Champagne Drip", release: "Starshine", instagram: "@champagnedrip", listeners: 150000, reach: 400000, trend: "up" }
        ] },
        { name: "Proximity", sub: "Future Bass / Electronic", founded: 2012, roster: 40, country: "United States", type: "major-backed", tags: ["future bass","chill"], color: "#6366f1", assoc: "YouTube powerhouse", sourceTrack: "Faded", sourceChart: "Spotify Viral 50", followers: 15000000, avgStreams: 4000000, streamGrade: "A", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "San Holo", release: "find your way", instagram: "@sanholobeam", listeners: 3000000, reach: 7000000, trend: "steady" },
            { name: "ILLENIUM", release: "Shivering", instagram: "@illeniummusic", listeners: 7000000, reach: 15000000, trend: "steady" },
            { name: "Said The Sky", release: "Treading Water", instagram: "@saidthesky", listeners: 1500000, reach: 3500000, trend: "steady" },
            { name: "William Black", release: "Remedy", instagram: "@williamblackmusic", listeners: 800000, reach: 2000000, trend: "up" }
        ] },
        { name: "Deadbeats", sub: "Bass", founded: 2016, roster: 35, country: "Canada", type: "independent", tags: ["bass","experimental"], color: "#111827", assoc: "Zeds Dead", avgStreams: 350000, streamGrade: "B", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Zeds Dead", release: "Alive", instagram: "@zedsdead", listeners: 2000000, reach: 5000000, trend: "steady" },
            { name: "GRiZ", release: "Vibe Check", instagram: "@grizmusic", listeners: 2500000, reach: 5500000, trend: "up" },
            { name: "PEEKABOO", release: "Wrecking Ball", instagram: "@peekaboobeats", listeners: 300000, reach: 800000, trend: "up" },
            { name: "1788-L", release: "Pulsar IV", instagram: "@1788.l", listeners: 200000, reach: 500000, trend: "up" }
        ] },
        { name: "Disciple", sub: "Dubstep", founded: 2014, roster: 30, country: "United States", type: "independent", tags: ["dubstep","riddim","heavy"], color: "#7c3aed", assoc: "Virtual Riot, Barely Alive", avgStreams: 400000, streamGrade: "B", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Virtual Riot", release: "German Engineering", instagram: "@virtualriotmusic", listeners: 1200000, reach: 3500000, trend: "up" },
            { name: "Barely Alive", release: "Cyber Bully", instagram: "@barelyalive", listeners: 300000, reach: 800000, trend: "steady" },
            { name: "Modestep", release: "Higher", instagram: "@modestep", listeners: 500000, reach: 1500000, trend: "steady" },
            { name: "Bandlez", release: "Scream", instagram: "@bandlezmusic", listeners: 80000, reach: 200000, trend: "steady" }
        ] },
        { name: "Kannibalen Records", sub: "Bass / Electro", founded: 2011, roster: 30, country: "Canada", type: "independent", tags: ["bass","electro","dark"], color: "#0f172a", assoc: "Black Tiger Sex Machine", avgStreams: 90000, streamGrade: "C", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Apashe", release: "Renaissance", instagram: "@apashemusic", listeners: 2000000, reach: 5000000, trend: "up" },
            { name: "Black Tiger Sex Machine", release: "Zombie", instagram: "@blacktigersexmachine", listeners: 500000, reach: 1500000, trend: "steady" },
            { name: "Kai Wachi", release: "Demons", instagram: "@kaiwachimusic", listeners: 400000, reach: 1000000, trend: "up" },
            { name: "Dabin", release: "Rings", instagram: "@iamdabin", listeners: 600000, reach: 1500000, trend: "up" }
        ] },
        { name: "Trap Nation", sub: "Trap / Bass", founded: 2012, roster: 30, country: "United States", type: "major-backed", tags: ["trap","bass","youtube"], color: "#ec4899", assoc: "YouTube network", sourceTrack: "Roses", sourceChart: "Spotify Viral 50", followers: 20000000, avgStreams: 5000000, streamGrade: "A", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Fairlane", release: "Uncover", instagram: "@fairlanemusic", listeners: 800000, reach: 1500000, trend: "up" },
            { name: "Nurko", release: "Disappearing Now", instagram: "@nurkomusic", listeners: 1200000, reach: 2500000, trend: "up" },
            { name: "Rynx", release: "Want You", instagram: "@rynxmusic", listeners: 300000, reach: 600000, trend: "steady" },
            { name: "Convex", release: "Drift", instagram: "@convexmusic", listeners: 200000, reach: 400000, trend: "steady" }
        ] },
        { name: "Big Beat Records", sub: "Electronic / Dance", founded: 1987, roster: 30, country: "United States", type: "major-backed", tags: ["electronic","dance"], color: "#2563eb", assoc: "Atlantic subsidiary", sourceTrack: "Something Just Like This", sourceChart: "Billboard Hot Dance", followers: 500000, avgStreams: 3000000, streamGrade: "A", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "Galantis", release: "Alien", instagram: "@galantis", listeners: 12000000, reach: 20000000, trend: "steady" },
            { name: "Oliver Heldens", release: "Aquarius", instagram: "@oliverheldens", listeners: 10000000, reach: 18000000, trend: "steady" },
            { name: "Skrillex", release: "Supersonic", instagram: "@skrillex", listeners: 18000000, reach: 35000000, trend: "up" },
            { name: "Cash Cash", release: "Ride or Die", instagram: "@cashcash", listeners: 5000000, reach: 9000000, trend: "down" }
        ] },
        { name: "Owsla", sub: "Bass / Electronic", founded: 2011, roster: 25, country: "United States", type: "major-backed", tags: ["bass","electronic"], color: "#111111", assoc: "Skrillex", sourceTrack: "Bangarang", sourceChart: "Billboard Hot Dance", followers: 2400000, avgStreams: 800000, streamGrade: "B", releases2025: 5, releasesLast6: 2, releasePace: "sporadic", artists: [
            { name: "Skrillex", release: "Bangarang", instagram: "@skrillex", listeners: 18000000, reach: 35000000, trend: "up" },
            { name: "Valentino Khan", release: "Lick It", instagram: "@valentinokhan", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Josh Pan", release: "give it to me", instagram: "@joshpan", listeners: 200000, reach: 400000, trend: "steady" },
            { name: "Getter", release: "Visceral", instagram: "@getterofficial", listeners: 800000, reach: 2000000, trend: "down" }
        ] },
        { name: "Rottun Recordings", sub: "Dubstep", founded: 2009, roster: 25, country: "United States", type: "independent", tags: ["dubstep","heavy"], color: "#b91c1c", assoc: "Excision's original label", avgStreams: 8000, streamGrade: "D", releases2025: 8, releasesLast6: 4, releasePace: "sporadic", artists: [
            { name: "Excision", release: "Apex", instagram: "@excisionofficial", listeners: 3000000, reach: 8000000, trend: "up" },
            { name: "Dion Timmer", release: "Down With Me", instagram: "@diontimmer", listeners: 1000000, reach: 2500000, trend: "steady" },
            { name: "PhaseOne", release: "Transcendency", instagram: "@phaseoneau", listeners: 600000, reach: 1500000, trend: "up" },
            { name: "Sullivan King", release: "Thrones of Blood", instagram: "@sullivanking", listeners: 1500000, reach: 4000000, trend: "up" }
        ] },
        { name: "Gud Vibrations", sub: "Bass", founded: 2017, roster: 25, country: "United States", type: "independent", tags: ["bass"], color: "#06b6d4", assoc: "NGHTMRE & Slander", avgStreams: 250000, streamGrade: "B", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "NGHTMRE", release: "Another Dimension", instagram: "@nghtmre", listeners: 2000000, reach: 5000000, trend: "steady" },
            { name: "Slander", release: "Walk On Water", instagram: "@slanderofficial", listeners: 3000000, reach: 7000000, trend: "up" },
            { name: "Spag Heddy", release: "Zoom", instagram: "@spagheddy", listeners: 500000, reach: 1200000, trend: "steady" },
            { name: "Wavedash", release: "Dummo Loop", instagram: "@wavedashmusic", listeners: 300000, reach: 700000, trend: "up" }
        ] },
        { name: "Lowly", sub: "Chill / Electronic", founded: 2016, roster: 25, country: "United States", type: "independent", tags: ["chill","lo-fi"], color: "#14b8a6", assoc: "Chill network", sourceTrack: "Are We Still Friends", sourceChart: "Apple Music Electronic", followers: 3000000, avgStreams: 500000, streamGrade: "B", releases2025: 35, releasesLast6: 18, releasePace: "biweekly", artists: [
            { name: "Shallou", release: "Magical Thinking", instagram: "@shallou", listeners: 2500000, reach: 4000000, trend: "steady" },
            { name: "Melvv", release: "Paradise", instagram: "@melvvmusic", listeners: 300000, reach: 500000, trend: "steady" },
            { name: "Chet Porter", release: "Bummed", instagram: "@chetporter", listeners: 500000, reach: 900000, trend: "up" },
            { name: "Tails", release: "Habits", instagram: "@tailsmusic", listeners: 200000, reach: 400000, trend: "steady" }
        ] },
        { name: "Deep Dark & Dangerous", sub: "Deep Dubstep", founded: 2014, roster: 20, country: "United Kingdom", type: "independent", tags: ["deep dubstep","140","dark"], color: "#1e293b", assoc: "Truth", avgStreams: 40000, streamGrade: "C", releases2025: 20, releasesLast6: 10, releasePace: "monthly", artists: [
            { name: "Truth", release: "Hollow World", instagram: "@truthdubstep", listeners: 100000, reach: 250000, trend: "steady" },
            { name: "Ternion Sound", release: "Coalesce", instagram: "@ternionsound", listeners: 50000, reach: 120000, trend: "up" },
            { name: "Khiva", release: "Closer", instagram: "@khivamusic", listeners: 40000, reach: 80000, trend: "up" },
            { name: "Causa", release: "Resurgence", instagram: "@causamusic", listeners: 30000, reach: 60000, trend: "steady" }
        ] },
        { name: "Ophelia Records", sub: "Melodic Bass", founded: 2018, roster: 20, country: "United States", type: "independent", tags: ["melodic","bass"], color: "#3b82f6", assoc: "Seven Lions", sourceTrack: "Rush Over Me", sourceChart: "Beatport Top 100", followers: 600000, avgStreams: 2000000, streamGrade: "A", releases2025: 45, releasesLast6: 22, releasePace: "weekly", artists: [
            { name: "Seven Lions", release: "Beyond the Veil", instagram: "@sevenlionsmusic", listeners: 4000000, reach: 10000000, trend: "up" },
            { name: "Crystal Skies", release: "Gravity", instagram: "@crystalskiesmusic", listeners: 500000, reach: 1000000, trend: "up" },
            { name: "Jason Ross", release: "Atlas", instagram: "@jasonrossofficial", listeners: 1000000, reach: 2500000, trend: "up" },
            { name: "Trivecta", release: "Sail Away", instagram: "@trivectamusic", listeners: 600000, reach: 1200000, trend: "up" }
        ] },
        { name: "Bitbird", sub: "Future Bass / Organic", founded: 2016, roster: 20, country: "Netherlands", type: "independent", tags: ["future bass","organic"], color: "#10b981", assoc: "San Holo", sourceTrack: "Light", sourceChart: "Spotify Viral 50", followers: 600000, avgStreams: 500000, streamGrade: "B", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "San Holo", release: "bb u ok?", instagram: "@sanholobeats", listeners: 5000000, reach: 10000000, trend: "steady" },
            { name: "Taska Black", release: "In Your Eyes", instagram: "@taskablack", listeners: 1000000, reach: 2000000, trend: "steady" },
            { name: "Duskus", release: "Blossom", instagram: "@duskusmusic", listeners: 300000, reach: 500000, trend: "steady" },
            { name: "Heimanu", release: "Soluna", instagram: "@heimanumusic", listeners: 200000, reach: 400000, trend: "up" }
        ] },
        { name: "Foreign Family Collective", sub: "Chill / Electronic", founded: 2015, roster: 20, country: "United States", type: "independent", tags: ["chill","electronic"], color: "#0ea5e9", assoc: "ODESZA", sourceTrack: "A Moment Apart", sourceChart: "Apple Music Electronic", followers: 500000, avgStreams: 2000000, streamGrade: "A", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "ODESZA", release: "The Last Goodbye", instagram: "@odesza", listeners: 12000000, reach: 22000000, trend: "up" },
            { name: "Jai Wolf", release: "The Cure To Loneliness", instagram: "@jaiwolfx", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Golden Features", release: "Sisyphus", instagram: "@goldenfeatures", listeners: 800000, reach: 1500000, trend: "steady" },
            { name: "Ford.", release: "The Color of Nothing", instagram: "@ford", listeners: 500000, reach: 1000000, trend: "up" }
        ] },
        { name: "Dharma Worldwide", sub: "Big Room / Electro", founded: 2017, roster: 20, country: "Netherlands", type: "independent", tags: ["big room","electro"], color: "#b91c1c", assoc: "KSHMR", sourceTrack: "Secrets", sourceChart: "Beatport Top 100", followers: 600000, avgStreams: 400000, streamGrade: "B", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "KSHMR", release: "The World We Left Behind", instagram: "@kshmr", listeners: 7000000, reach: 15000000, trend: "steady" },
            { name: "Yves V", release: "Higher", instagram: "@yvesv", listeners: 1500000, reach: 3000000, trend: "steady" },
            { name: "Mariana Bo", release: "Aeris", instagram: "@marianabo", listeners: 1000000, reach: 2500000, trend: "up" },
            { name: "Jeremy Oceans", release: "Underwater", instagram: "@jeremyoceans", listeners: 500000, reach: 1000000, trend: "steady" }
        ] },
        { name: "KSHMR / Dharma", sub: "Big Room", founded: 2017, roster: 15, country: "United States", type: "independent", tags: ["big room","indian"], color: "#dc2626", assoc: "KSHMR", sourceTrack: "Power", sourceChart: "1001Tracklists", followers: 4000000, avgStreams: 400000, streamGrade: "B", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "KSHMR", release: "Power", instagram: "@kshmr", listeners: 7000000, reach: 15000000, trend: "steady" },
            { name: "Yves V", release: "Higher", instagram: "@yvesv", listeners: 1500000, reach: 3000000, trend: "steady" },
            { name: "Mariana Bo", release: "Aeris", instagram: "@marianabo", listeners: 1000000, reach: 2500000, trend: "up" },
            { name: "Jeremy Oceans", release: "Underwater", instagram: "@jeremyoceans", listeners: 500000, reach: 1000000, trend: "steady" }
        ] },
        { name: "Seeking Blue", sub: "Melodic / Progressive", founded: 2020, roster: 15, country: "United States", type: "independent", tags: ["melodic","progressive"], color: "#3b82f6", assoc: "Jason Ross", sourceTrack: "Only For You", sourceChart: "Beatport Top 100", followers: 150000, avgStreams: 50000, streamGrade: "C", releases2025: 35, releasesLast6: 18, releasePace: "biweekly", artists: [
            { name: "Jason Ross", release: "Atlas", instagram: "@jasonrossofficial", listeners: 1000000, reach: 2500000, trend: "up" },
            { name: "Blanke", release: "Catalyst", instagram: "@blankemusic", listeners: 500000, reach: 1200000, trend: "up" },
            { name: "Trivecta", release: "The Way Back", instagram: "@trivectamusic", listeners: 600000, reach: 1200000, trend: "up" },
            { name: "Gem & Tauri", release: "Falling Into Place", instagram: "@gemandtauri", listeners: 100000, reach: 200000, trend: "up" }
        ] },
        { name: "Counter Records", sub: "Organic / Downtempo", founded: 2016, roster: 15, country: "United Kingdom", type: "major-backed", tags: ["organic","downtempo"], color: "#64748b", assoc: "Ninja Tune arm", sourceTrack: "Dissolve", sourceChart: "Apple Music Electronic", followers: 200000, avgStreams: 300000, streamGrade: "B", releases2025: 20, releasesLast6: 10, releasePace: "monthly", artists: [
            { name: "Bonobo", release: "Fragments", instagram: "@si_bonobo", listeners: 5000000, reach: 8000000, trend: "steady" },
            { name: "Maribou State", release: "Hallucinating Love", instagram: "@mariboustate", listeners: 2000000, reach: 3500000, trend: "up" },
            { name: "Rival Consoles", release: "Now Is", instagram: "@rivalconsoles", listeners: 500000, reach: 800000, trend: "steady" },
            { name: "Pot\u00e9", release: "A Tenuous Tale", instagram: "@potejah", listeners: 200000, reach: 400000, trend: "up" }
        ] }
    ],

    "House": [
        { name: "Sony Music / RCA", sub: "Dance Pop", founded: 1900, roster: 500, country: "United States", type: "major", tags: ["pop","dance","major"], color: "#111111", assoc: "Major label", sourceTrack: "Don't You Worry Child", sourceChart: "Billboard Hot Dance", followers: 15000000, avgStreams: 45000000, streamGrade: "S", releases2025: 300, releasesLast6: 150, releasePace: "weekly", artists: [
            { name: "Kygo", release: "Whatever", instagram: "@kygomusic", listeners: 28000000, reach: 55000000, trend: "steady" },
            { name: "Alesso", release: "Words", instagram: "@alesso", listeners: 18000000, reach: 35000000, trend: "up" },
            { name: "Regard", release: "Ride It", instagram: "@regard", listeners: 15000000, reach: 25000000, trend: "steady" },
            { name: "Sigala", release: "Melody", instagram: "@sigalamusic", listeners: 14000000, reach: 22000000, trend: "steady" }
        ] },
        { name: "Columbia Records", sub: "Dance Pop", founded: 1887, roster: 400, country: "United States", type: "major", tags: ["pop","dance","legacy"], color: "#dc2626", assoc: "Oldest US label", sourceTrack: "Electricity", sourceChart: "Billboard Hot Dance", followers: 7000000, avgStreams: 50000000, streamGrade: "S", releases2025: 250, releasesLast6: 125, releasePace: "weekly", artists: [
            { name: "Calvin Harris", release: "Desire", instagram: "@calvinharris", listeners: 45000000, reach: 80000000, trend: "steady" },
            { name: "Fisher", release: "Freaks", instagram: "@followthefishtv", listeners: 8000000, reach: 18000000, trend: "up" },
            { name: "Diplo", release: "Don't Forget My Love", instagram: "@diplo", listeners: 18000000, reach: 40000000, trend: "steady" },
            { name: "Mark Ronson", release: "Too Much", instagram: "@iammarkronson", listeners: 20000000, reach: 30000000, trend: "steady" }
        ] },
        { name: "Atlantic Records", sub: "Dance / Pop", founded: 1947, roster: 400, country: "United States", type: "major", tags: ["pop","dance","major"], color: "#0ea5e9", assoc: "Major label", sourceTrack: "Happier", sourceChart: "Billboard Hot Dance", followers: 8000000, avgStreams: 35000000, streamGrade: "S", releases2025: 250, releasesLast6: 125, releasePace: "weekly", artists: [
            { name: "Galantis", release: "Alien", instagram: "@galantis", listeners: 14000000, reach: 25000000, trend: "steady" },
            { name: "Skrillex", release: "Rumble", instagram: "@skrillex", listeners: 20000000, reach: 40000000, trend: "up" },
            { name: "Clean Bandit", release: "Everything But You", instagram: "@cleanbandit", listeners: 22000000, reach: 38000000, trend: "down" },
            { name: "Charli XCX", release: "360", instagram: "@charli_xcx", listeners: 45000000, reach: 70000000, trend: "up" }
        ] },
        { name: "Interscope Records", sub: "Dance / Electronic", founded: 1990, roster: 350, country: "United States", type: "major", tags: ["electronic","pop","major"], color: "#111111", assoc: "Major label", sourceTrack: "Scary Monsters", sourceChart: "Billboard Hot Dance", followers: 6500000, avgStreams: 30000000, streamGrade: "S", releases2025: 200, releasesLast6: 100, releasePace: "weekly", artists: [
            { name: "Lady Gaga", release: "Disease", instagram: "@ladygaga", listeners: 45000000, reach: 120000000, trend: "up" },
            { name: "Swedish House Mafia", release: "Ray of Solar", instagram: "@swedishhousemafia", listeners: 12000000, reach: 25000000, trend: "steady" },
            { name: "Gwen Stefani", release: "Slow Clap", instagram: "@gwenstefani", listeners: 18000000, reach: 35000000, trend: "steady" },
            { name: "will.i.am", release: "Let's Go", instagram: "@iamwill", listeners: 10000000, reach: 25000000, trend: "down" }
        ] },
        { name: "Spinnin' Records", sub: "Dance / House", founded: 1999, roster: 300, country: "Netherlands", type: "major-backed", tags: ["dance","house","mainstream"], color: "#111111", assoc: "Largest indie dance label", sourceTrack: "Tattoo", sourceChart: "Billboard Hot Dance", followers: 12000000, avgStreams: 8000000, streamGrade: "A", releases2025: 250, releasesLast6: 125, releasePace: "weekly", artists: [
            { name: "Sam Feldt", release: "Post Malone", instagram: "@samfeldtmusic", listeners: 10000000, reach: 18000000, trend: "steady" },
            { name: "Lucas & Steve", release: "Letters", instagram: "@lucasandsteve", listeners: 7000000, reach: 12000000, trend: "up" },
            { name: "Timmy Trumpet", release: "Turn Up the Volume", instagram: "@timmytrumpet", listeners: 10000000, reach: 20000000, trend: "steady" },
            { name: "Afrojack", release: "Sober", instagram: "@afrojack", listeners: 12000000, reach: 22000000, trend: "steady" }
        ] },
        { name: "Armada Music", sub: "Trance / Progressive", founded: 2003, roster: 200, country: "Netherlands", type: "major-backed", tags: ["trance","progressive"], color: "#2563eb", assoc: "Armin van Buuren", sourceTrack: "Blah Blah Blah", sourceChart: "Billboard Hot Dance", followers: 8500000, avgStreams: 4000000, streamGrade: "A", releases2025: 300, releasesLast6: 150, releasePace: "weekly", artists: [
            { name: "Armin van Buuren", release: "Come Around Again", instagram: "@arminvanbuuren", listeners: 22000000, reach: 50000000, trend: "steady" },
            { name: "Above & Beyond", release: "Gratitude", instagram: "@aboveandbeyond", listeners: 6000000, reach: 14000000, trend: "steady" },
            { name: "Andrew Rayel", release: "Everything Everything", instagram: "@andrewrayel", listeners: 3000000, reach: 7000000, trend: "up" },
            { name: "AVIRA", release: "Weightless", instagram: "@iamavira", listeners: 1500000, reach: 3000000, trend: "up" }
        ] },
        { name: "Ultra Records", sub: "Dance / Electronic", founded: 1995, roster: 150, country: "United States", type: "major-backed", tags: ["dance","electronic"], color: "#fbbf24", assoc: "Major indie", sourceTrack: "Body", sourceChart: "Billboard Hot Dance", followers: 3200000, avgStreams: 5000000, streamGrade: "A", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Steve Aoki", release: "Hit Em Hard", instagram: "@steveaoki", listeners: 10000000, reach: 30000000, trend: "down" },
            { name: "Sofi Tukker", release: "Original Sin", instagram: "@sofitukker", listeners: 8000000, reach: 15000000, trend: "up" },
            { name: "Flosstradamus", release: "Soundclash", instagram: "@flosstradamus", listeners: 2000000, reach: 5000000, trend: "down" },
            { name: "Deorro", release: "Bailar", instagram: "@deorro", listeners: 6000000, reach: 12000000, trend: "steady" }
        ] },
        { name: "Ultra Music", sub: "Dance / Pop", founded: 1995, roster: 100, country: "United States", type: "major-backed", tags: ["dance","pop"], color: "#fbbf24", assoc: "Ultra Records arm", sourceTrack: "Titanium", sourceChart: "Billboard Hot Dance", followers: 4000000, avgStreams: 4500000, streamGrade: "A", releases2025: 100, releasesLast6: 50, releasePace: "weekly", artists: [
            { name: "Emma Muscat", release: "I Am What I Am", instagram: "@emmamuscat", listeners: 1500000, reach: 4000000, trend: "up" },
            { name: "Shaun Frank", release: "No Future", instagram: "@shaunfrank", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Felix Cartal", release: "Happy Hour", instagram: "@felixcartal", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Nicky Romero", release: "Toulouse", instagram: "@nickyromero", listeners: 8000000, reach: 16000000, trend: "steady" }
        ] },
        { name: "Astralwerks", sub: "Electronic / Indie Dance", founded: 1993, roster: 80, country: "United States", type: "major-backed", tags: ["electronic","indie"], color: "#6366f1", assoc: "Capitol subsidiary", sourceTrack: "Clarity", sourceChart: "Billboard Hot Dance", followers: 950000, avgStreams: 3000000, streamGrade: "A", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "RUFUS DU SOL", release: "Inhale/Exhale", instagram: "@rufusdusol", listeners: 8000000, reach: 16000000, trend: "steady" },
            { name: "Porter Robinson", release: "Knock Yourself Out", instagram: "@porterrobinson", listeners: 6000000, reach: 14000000, trend: "up" },
            { name: "ZHU", release: "Dreamland", instagram: "@zhu", listeners: 5000000, reach: 10000000, trend: "steady" },
            { name: "ODESZA", release: "The Last Goodbye", instagram: "@odesza", listeners: 10000000, reach: 20000000, trend: "steady" }
        ] },
        { name: "Defected Records", sub: "House / Tech House", founded: 1999, roster: 80, country: "United Kingdom", type: "independent", tags: ["house","tech house","classic"], color: "#6366f1", assoc: "Simon Dunmore", avgStreams: 2500000, streamGrade: "A", releases2025: 150, releasesLast6: 75, releasePace: "weekly", artists: [
            { name: "John Summit", release: "Where You Are", instagram: "@johnsummit", listeners: 8000000, reach: 16000000, trend: "up" },
            { name: "Dom Dolla", release: "Miracle Maker", instagram: "@domdolla", listeners: 7000000, reach: 14000000, trend: "up" },
            { name: "Dennis Ferrer", release: "Hey Hey", instagram: "@dennisferrer", listeners: 2000000, reach: 3500000, trend: "steady" },
            { name: "Low Steppa", release: "Runnin'", instagram: "@lowsteppa", listeners: 1000000, reach: 2500000, trend: "steady" }
        ] },
        { name: "Toolroom Records", sub: "Tech House", founded: 2003, roster: 60, country: "United Kingdom", type: "independent", tags: ["tech house","house"], color: "#10b981", assoc: "Mark Knight", avgStreams: 1500000, streamGrade: "A", releases2025: 150, releasesLast6: 75, releasePace: "weekly", artists: [
            { name: "Mark Knight", release: "All Night", instagram: "@djmarkknight", listeners: 2000000, reach: 5000000, trend: "steady" },
            { name: "Martin Ikin", release: "Hooked", instagram: "@martinikin", listeners: 1500000, reach: 3000000, trend: "up" },
            { name: "Leftwing:Kody", release: "I Feel It", instagram: "@leftwingkody", listeners: 1000000, reach: 2500000, trend: "steady" },
            { name: "Maxinne", release: "Work", instagram: "@maxinnemusic", listeners: 500000, reach: 1500000, trend: "up" }
        ] },
        { name: "Black Hole Recordings", sub: "Trance", founded: 1997, roster: 60, country: "Netherlands", type: "independent", tags: ["trance","uplifting"], color: "#111111", assoc: "Tiesto origins", sourceTrack: "Adagio For Strings", sourceChart: "Beatport Top 100", followers: 400000, avgStreams: 300000, streamGrade: "B", releases2025: 120, releasesLast6: 60, releasePace: "weekly", artists: [
            { name: "Ruben de Ronde", release: "Midnight", instagram: "@rubenderondeofficial", listeners: 350000, reach: 500000, trend: "steady" },
            { name: "Robbie Seed", release: "Eternal Flame", instagram: "@robbieseedmusic", listeners: 80000, reach: 120000, trend: "up" },
            { name: "Dennis Sheperd", release: "Memoria", instagram: "@dennissheperd", listeners: 200000, reach: 300000, trend: "steady" },
            { name: "Dan Thompson", release: "Spectrum", instagram: "@danthompsonmusic", listeners: 60000, reach: 100000, trend: "up" }
        ] },
        { name: "Revealed Recordings", sub: "Big Room / Progressive", founded: 2010, roster: 50, country: "Netherlands", type: "major-backed", tags: ["big room","progressive"], color: "#dc2626", assoc: "Hardwell", sourceTrack: "Spaceman", sourceChart: "Beatport Top 100", followers: 4200000, avgStreams: 3000000, streamGrade: "A", releases2025: 100, releasesLast6: 50, releasePace: "weekly", artists: [
            { name: "Hardwell", release: "INTO THE UNKNOWN", instagram: "@hardwell", listeners: 10000000, reach: 25000000, trend: "up" },
            { name: "Maddix", release: "Ecstasy", instagram: "@maddix", listeners: 3000000, reach: 6000000, trend: "up" },
            { name: "Olly James", release: "Earthquake", instagram: "@ollyjamesmusic", listeners: 800000, reach: 2000000, trend: "up" },
            { name: "Thomas Gold", release: "Pump Up the Jam", instagram: "@thomasgold", listeners: 2000000, reach: 4000000, trend: "steady" }
        ] },
        { name: "Kompakt", sub: "Minimal / Techno", founded: 1998, roster: 50, country: "Germany", type: "independent", tags: ["minimal","techno","cologne"], color: "#ec4899", assoc: "Michael Mayer", avgStreams: 150000, streamGrade: "B", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "Michael Mayer", release: "& Live", instagram: "@michael_mayer_dj", listeners: 100000, reach: 200000, trend: "steady" },
            { name: "The Field", release: "Infinite Moment", instagram: "@thefield_official", listeners: 250000, reach: 350000, trend: "steady" },
            { name: "Robag Wruhme", release: "Venq Tolep", instagram: "@robagwruhme", listeners: 150000, reach: 250000, trend: "steady" },
            { name: "GAS", release: "Rausch", instagram: "@gas", listeners: 200000, reach: 250000, trend: "steady" }
        ] },
        { name: "STMPD RCRDS", sub: "Progressive House", founded: 2016, roster: 45, country: "Netherlands", type: "major-backed", tags: ["progressive","big room"], color: "#ef4444", assoc: "Martin Garrix", sourceTrack: "In The Name Of Love", sourceChart: "Spotify Viral 50", followers: 2800000, avgStreams: 4000000, streamGrade: "A", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Martin Garrix", release: "Breakaway", instagram: "@martingarrix", listeners: 30000000, reach: 65000000, trend: "steady" },
            { name: "Matisse & Sadko", release: "Into You", instagram: "@matisseandsadko", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Dyro", release: "Surrounded", instagram: "@dyromusic", listeners: 1500000, reach: 3000000, trend: "steady" },
            { name: "TV Noise", release: "Think About You", instagram: "@tvnoise", listeners: 600000, reach: 1500000, trend: "up" }
        ] },
        { name: "Suara", sub: "Tech House / Techno", founded: 2007, roster: 45, country: "Spain", type: "independent", tags: ["tech house","techno"], color: "#d946ef", assoc: "Coyu", avgStreams: 200000, streamGrade: "B", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Coyu", release: "Profound Pleasure", instagram: "@coyumusic", listeners: 200000, reach: 400000, trend: "steady" },
            { name: "Reinier Zonneveld", release: "Things We Might Have Said", instagram: "@reinierzonneveld", listeners: 1500000, reach: 2500000, trend: "up" },
            { name: "Monika Kruse", release: "Changes", instagram: "@monikakruse", listeners: 150000, reach: 300000, trend: "steady" },
            { name: "Ramiro Lopez", release: "Modula", instagram: "@ramirolopez", listeners: 100000, reach: 200000, trend: "steady" }
        ] },
        { name: "Drumcode", sub: "Techno", founded: 1996, roster: 40, country: "Sweden", type: "independent", tags: ["techno","dark"], color: "#111111", assoc: "Adam Beyer", avgStreams: 800000, streamGrade: "B", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Adam Beyer", release: "Tribal Generation", instagram: "@realadambeyer", listeners: 2800000, reach: 4000000, trend: "steady" },
            { name: "Amelie Lens", release: "Stay With Me", instagram: "@amelielens", listeners: 4500000, reach: 7000000, trend: "up" },
            { name: "ANNA", release: "Razor", instagram: "@djanna", listeners: 1800000, reach: 3000000, trend: "up" },
            { name: "Enrico Sangiuliano", release: "Biomorph", instagram: "@enricosangiuliano", listeners: 2200000, reach: 3500000, trend: "steady" }
        ] },
        { name: "Dirtybird", sub: "Tech House", founded: 2005, roster: 40, country: "United States", type: "independent", tags: ["tech house","booty"], color: "#f59e0b", assoc: "Claude VonStroke", avgStreams: 400000, streamGrade: "B", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "Claude VonStroke", release: "Flubblebuddy", instagram: "@claudevonstroke", listeners: 500000, reach: 1200000, trend: "steady" },
            { name: "Walker & Royce", release: "My Own Jungle", instagram: "@walkerandroyce", listeners: 350000, reach: 700000, trend: "steady" },
            { name: "John Summit", release: "Where You Are", instagram: "@johnsummit", listeners: 5000000, reach: 9000000, trend: "up" },
            { name: "VNSSA", release: "Tuff Titties", instagram: "@vnssa_official", listeners: 250000, reach: 500000, trend: "up" }
        ] },
        { name: "Anjunabeats", sub: "Trance / Progressive", founded: 2000, roster: 40, country: "United Kingdom", type: "independent", tags: ["trance","progressive"], color: "#3b82f6", assoc: "Above & Beyond", sourceTrack: "Sun & Moon", sourceChart: "Beatport Top 100", followers: 2100000, avgStreams: 700000, streamGrade: "B", releases2025: 70, releasesLast6: 35, releasePace: "weekly", artists: [
            { name: "Above & Beyond", release: "Gratitude", instagram: "@aboveandbeyond", listeners: 3500000, reach: 8000000, trend: "steady" },
            { name: "ilan Bluestone", release: "Paid For Love", instagram: "@ilanbluestone", listeners: 800000, reach: 1500000, trend: "steady" },
            { name: "Andrew Bayer", release: "Nobody Told Me", instagram: "@andrewbayer", listeners: 400000, reach: 700000, trend: "steady" },
            { name: "Gareth Emery", release: "Elise", instagram: "@garethemery", listeners: 1200000, reach: 2500000, trend: "steady" }
        ] },
        { name: "Insomniac Records", sub: "House / Techno", founded: 2014, roster: 40, country: "United States", type: "major-backed", tags: ["house","techno"], color: "#a855f7", assoc: "Insomniac Events", sourceTrack: "Losing It", sourceChart: "Billboard Hot Dance", followers: 1200000, avgStreams: 1200000, streamGrade: "A", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Cloonee", release: "Feel the Groove", instagram: "@cloonee", listeners: 4000000, reach: 8000000, trend: "up" },
            { name: "Noizu", release: "Summer 91", instagram: "@noizu", listeners: 3000000, reach: 6000000, trend: "steady" },
            { name: "Miane", release: "Don't Haha", instagram: "@miane", listeners: 1500000, reach: 3000000, trend: "up" },
            { name: "Dr. Fresch", release: "Gangsta Gangsta", instagram: "@drfresch", listeners: 1000000, reach: 2500000, trend: "steady" }
        ] },
        { name: "Musical Freedom", sub: "Progressive / Electro", founded: 2009, roster: 35, country: "Netherlands", type: "major-backed", tags: ["progressive","electro"], color: "#111111", assoc: "Tiesto", sourceTrack: "The Business", sourceChart: "Billboard Hot Dance", followers: 1500000, avgStreams: 2500000, streamGrade: "A", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Tiesto", release: "10:35", instagram: "@tiesto", listeners: 30000000, reach: 60000000, trend: "up" },
            { name: "MOTi", release: "House of Now", instagram: "@djmoti", listeners: 2000000, reach: 4000000, trend: "steady" },
            { name: "Mike Williams", release: "Feels Like Yesterday", instagram: "@mikewilliamsdj", listeners: 3000000, reach: 5000000, trend: "steady" },
            { name: "Curbi", release: "Spiritual", instagram: "@curbiofficial", listeners: 1500000, reach: 3000000, trend: "up" }
        ] },
        { name: "Turbo Recordings", sub: "Tech House / Techno", founded: 1998, roster: 35, country: "Canada", type: "independent", tags: ["tech house","techno"], color: "#ef4444", assoc: "Tiga", avgStreams: 120000, streamGrade: "B", releases2025: 20, releasesLast6: 10, releasePace: "monthly", artists: [
            { name: "Tiga", release: "Planet E", instagram: "@tigaofficial", listeners: 400000, reach: 700000, trend: "steady" },
            { name: "Duke Dumont", release: "The Power", instagram: "@dukedumont", listeners: 5000000, reach: 8000000, trend: "steady" },
            { name: "Pusse", release: "Voila", instagram: "@pussemusic", listeners: 50000, reach: 100000, trend: "steady" },
            { name: "Clarian", release: "Modular Cowboy", instagram: "@clarian", listeners: 30000, reach: 60000, trend: "steady" }
        ] },
        { name: "Anjunadeep", sub: "Deep House / Organic", founded: 2005, roster: 35, country: "United Kingdom", type: "independent", tags: ["deep house","organic"], color: "#0ea5e9", assoc: "Above & Beyond (deep arm)", sourceTrack: "Northern Soul", sourceChart: "Beatport Top 100", followers: 1900000, avgStreams: 600000, streamGrade: "B", releases2025: 70, releasesLast6: 35, releasePace: "weekly", artists: [
            { name: "Ben Bohmer", release: "Bloom", instagram: "@benbohmermusic", listeners: 3000000, reach: 5000000, trend: "up" },
            { name: "Marsh", release: "Eu Topos", instagram: "@marshmusic", listeners: 700000, reach: 1200000, trend: "up" },
            { name: "Yotto", release: "Hyperfall", instagram: "@yotto", listeners: 900000, reach: 1500000, trend: "steady" },
            { name: "Nox Vahn", release: "Rising", instagram: "@noxvahn", listeners: 300000, reach: 500000, trend: "up" }
        ] },
        { name: "Enhanced Music", sub: "Trance / Progressive", founded: 2008, roster: 35, country: "United Kingdom", type: "independent", tags: ["trance","progressive"], color: "#8b5cf6", assoc: "Tritonal", sourceTrack: "Now Or Never", sourceChart: "Beatport Top 100", followers: 500000, avgStreams: 300000, streamGrade: "B", releases2025: 80, releasesLast6: 40, releasePace: "weekly", artists: [
            { name: "Tritonal", release: "Painting Skies", instagram: "@tritonalmusic", listeners: 1000000, reach: 2000000, trend: "steady" },
            { name: "Farius", release: "Along The Way", instagram: "@fariusmusic", listeners: 300000, reach: 500000, trend: "up" },
            { name: "Disco Fries", release: "Born Ready", instagram: "@discofries", listeners: 200000, reach: 400000, trend: "steady" },
            { name: "Kapera", release: "Feel It", instagram: "@kapera", listeners: 100000, reach: 200000, trend: "up" }
        ] },
        { name: "Sola", sub: "Tech House", founded: 2016, roster: 35, country: "United Kingdom", type: "independent", tags: ["tech house","underground"], color: "#14b8a6", assoc: "Solardo", avgStreams: 500000, streamGrade: "B", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Solardo", release: "Be Somebody", instagram: "@solardo", listeners: 1200000, reach: 2500000, trend: "up" },
            { name: "Eli Brown", release: "Desire", instagram: "@elibrownbeats", listeners: 1500000, reach: 2800000, trend: "up" },
            { name: "DONT BLINK", release: "ACID", instagram: "@dontblinkmusic", listeners: 1000000, reach: 2000000, trend: "up" },
            { name: "Biscits", release: "Sundown", instagram: "@biscits", listeners: 800000, reach: 1500000, trend: "up" }
        ] },
        { name: "mau5trap", sub: "Progressive / Electro", founded: 2007, roster: 30, country: "Canada", type: "major-backed", tags: ["progressive","electro"], color: "#111111", assoc: "deadmau5", sourceTrack: "Strobe", sourceChart: "Beatport Top 100", followers: 1800000, avgStreams: 1500000, streamGrade: "A", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "deadmau5", release: "When the Summer Dies", instagram: "@deadmau5", listeners: 10000000, reach: 25000000, trend: "steady" },
            { name: "Rezz", release: "Sacrificial", instagram: "@officialrezz", listeners: 3000000, reach: 8000000, trend: "up" },
            { name: "No Mana", release: "Strangers", instagram: "@nomana", listeners: 300000, reach: 800000, trend: "up" },
            { name: "ATTLAS", release: "Out Here", instagram: "@attlasmusic", listeners: 500000, reach: 1200000, trend: "steady" }
        ] },
        { name: "Protocol Recordings", sub: "Progressive House", founded: 2012, roster: 30, country: "Netherlands", type: "major-backed", tags: ["progressive","electro"], color: "#111111", assoc: "Nicky Romero", sourceTrack: "Toulouse", sourceChart: "Beatport Top 100", followers: 1200000, avgStreams: 600000, streamGrade: "B", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Nicky Romero", release: "Midnight Sun", instagram: "@nickyromero", listeners: 5000000, reach: 12000000, trend: "steady" },
            { name: "Deniz Koyu", release: "Ruby", instagram: "@denizkoyu", listeners: 400000, reach: 700000, trend: "steady" },
            { name: "Stadiumx", release: "Howl At The Moon", instagram: "@stadiumx", listeners: 600000, reach: 1000000, trend: "steady" },
            { name: "Thomas Gold", release: "Pump Up the Jam", instagram: "@thomasgold", listeners: 800000, reach: 1500000, trend: "down" }
        ] },
        { name: "Heldeep Records", sub: "Future House / House", founded: 2015, roster: 30, country: "Netherlands", type: "independent", tags: ["future house","groovy"], color: "#eab308", assoc: "Oliver Heldens", sourceTrack: "Gecko", sourceChart: "Shazam Electronic", followers: 700000, avgStreams: 500000, streamGrade: "B", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Oliver Heldens", release: "Aquarius", instagram: "@oliverheldens", listeners: 8000000, reach: 15000000, trend: "steady" },
            { name: "Zonderling", release: "Crazy For You", instagram: "@zonderling", listeners: 500000, reach: 900000, trend: "steady" },
            { name: "Mesto", release: "Give Me Love", instagram: "@mestomusic", listeners: 2000000, reach: 3500000, trend: "steady" },
            { name: "Firebeatz", release: "Sky High", instagram: "@firebeatz", listeners: 700000, reach: 1200000, trend: "steady" }
        ] },
        { name: "Hot Creations", sub: "Tech House", founded: 2010, roster: 30, country: "United Kingdom", type: "independent", tags: ["tech house","groovy"], color: "#f97316", assoc: "Jamie Jones", avgStreams: 350000, streamGrade: "B", releases2025: 35, releasesLast6: 18, releasePace: "biweekly", artists: [
            { name: "Jamie Jones", release: "My Paradise", instagram: "@jamiejones", listeners: 800000, reach: 1500000, trend: "steady" },
            { name: "Patrick Topping", release: "Watch Me", instagram: "@patricktopping", listeners: 1500000, reach: 2800000, trend: "up" },
            { name: "Richy Ahmed", release: "The Drums", instagram: "@richyahmed", listeners: 300000, reach: 600000, trend: "steady" },
            { name: "wAFF", release: "Groovejet", instagram: "@wafflife", listeners: 150000, reach: 300000, trend: "steady" }
        ] },
        { name: "Relief Records", sub: "Tech House", founded: 1996, roster: 30, country: "United States", type: "independent", tags: ["tech house","chicago"], color: "#22c55e", assoc: "Green Velvet", avgStreams: 200000, streamGrade: "B", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Green Velvet", release: "Aw Yeah", instagram: "@greenvelvet", listeners: 600000, reach: 1000000, trend: "steady" },
            { name: "Shiba San", release: "Okay", instagram: "@shibasanmusic", listeners: 700000, reach: 1200000, trend: "steady" },
            { name: "Riva Starr", release: "No Man's Land", instagram: "@rivastarr", listeners: 400000, reach: 700000, trend: "steady" },
            { name: "Latmun", release: "Get Down", instagram: "@latmun", listeners: 200000, reach: 350000, trend: "steady" }
        ] },
        { name: "Afterlife", sub: "Melodic Techno", founded: 2016, roster: 30, country: "Italy", type: "independent", tags: ["melodic techno","progressive"], color: "#8b5cf6", assoc: "Tale Of Us", avgStreams: 900000, streamGrade: "B", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "Tale Of Us", release: "Endless", instagram: "@taleofus", listeners: 4000000, reach: 7000000, trend: "up" },
            { name: "Anyma", release: "Running", instagram: "@anyma", listeners: 7000000, reach: 15000000, trend: "up" },
            { name: "Kevin de Vries", release: "Dance With Me", instagram: "@kevindevries", listeners: 2000000, reach: 3500000, trend: "up" },
            { name: "Colyn", release: "Resolve", instagram: "@colynmusic", listeners: 1500000, reach: 2500000, trend: "up" }
        ] },
        { name: "Silk Music", sub: "Progressive / Deep", founded: 2008, roster: 30, country: "United States", type: "independent", tags: ["progressive","deep"], color: "#d946ef", assoc: "Melodic progressive", sourceTrack: "Waterfall", sourceChart: "Beatport Hype 100", followers: 150000, avgStreams: 60000, streamGrade: "C", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Shingo Nakamura", release: "Thousands of Sounds", instagram: "@shingonakamura", listeners: 300000, reach: 400000, trend: "steady" },
            { name: "Marsh", release: "Eu Sei", instagram: "@marshmusic", listeners: 250000, reach: 400000, trend: "up" },
            { name: "Vintage & Morelli", release: "Ascension", instagram: "@vintageandmorelli", listeners: 80000, reach: 120000, trend: "steady" },
            { name: "Sundriver", release: "Northern Lights", instagram: "@sundrivermusic", listeners: 50000, reach: 70000, trend: "steady" }
        ] },
        { name: "Tomorrowland Music", sub: "Multi-Genre", founded: 2021, roster: 30, country: "Belgium", type: "major-backed", tags: ["festival","mainstream"], color: "#eab308", assoc: "Festival label", sourceTrack: "The Hymn", sourceChart: "1001Tracklists", followers: 18000000, avgStreams: 2000000, streamGrade: "A", releases2025: 60, releasesLast6: 30, releasePace: "weekly", artists: [
            { name: "Dimitri Vegas & Like Mike", release: "Sentado", instagram: "@dvlm", listeners: 10000000, reach: 25000000, trend: "steady" },
            { name: "Charlotte de Witte", release: "Overdrive", instagram: "@charlottedewittemusic", listeners: 5000000, reach: 12000000, trend: "up" },
            { name: "Lost Frequencies", release: "Where Are You Now", instagram: "@lostfrequencies", listeners: 15000000, reach: 28000000, trend: "steady" },
            { name: "Vintage Culture", release: "In the Dark", instagram: "@vintageculture", listeners: 8000000, reach: 16000000, trend: "up" }
        ] },
        { name: "Hexagon", sub: "Future House", founded: 2015, roster: 25, country: "Netherlands", type: "independent", tags: ["future house","bass house"], color: "#f97316", assoc: "Don Diablo", sourceTrack: "On My Mind", sourceChart: "Beatport Top 100", followers: 800000, avgStreams: 400000, streamGrade: "B", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Don Diablo", release: "Algorhythm", instagram: "@dondiablo", listeners: 6000000, reach: 15000000, trend: "steady" },
            { name: "Jordan Jay", release: "Elevate", instagram: "@jordanjaymusic", listeners: 80000, reach: 150000, trend: "up" },
            { name: "Mariana Bo", release: "Shiva", instagram: "@marianabo", listeners: 500000, reach: 1500000, trend: "up" },
            { name: "Dastic", release: "Saint", instagram: "@dasticmusic", listeners: 800000, reach: 1200000, trend: "up" }
        ] },
        { name: "Truesoul", sub: "Techno", founded: 2004, roster: 25, country: "Sweden", type: "independent", tags: ["techno","deep"], color: "#1e293b", assoc: "Adam Beyer (deep arm)", avgStreams: 300000, streamGrade: "B", releases2025: 15, releasesLast6: 8, releasePace: "monthly", artists: [
            { name: "Adam Beyer", release: "Pressure Point", instagram: "@realadambeyer", listeners: 1200000, reach: 2500000, trend: "steady" },
            { name: "Wehbba", release: "Systematic", instagram: "@wehbba", listeners: 300000, reach: 450000, trend: "up" },
            { name: "Bart Skils", release: "Shadowplay", instagram: "@bartskils", listeners: 250000, reach: 400000, trend: "up" },
            { name: "Layton Giordani", release: "Phase II", instagram: "@laytongiordani", listeners: 400000, reach: 700000, trend: "up" }
        ] },
        { name: "Terminal M", sub: "Techno", founded: 2008, roster: 25, country: "Germany", type: "independent", tags: ["techno","peak time"], color: "#dc2626", assoc: "Monika Kruse", avgStreams: 150000, streamGrade: "B", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "Monika Kruse", release: "Changes", instagram: "@monikakruse", listeners: 150000, reach: 300000, trend: "steady" },
            { name: "Pig&Dan", release: "Growler", instagram: "@piganddan", listeners: 300000, reach: 500000, trend: "steady" },
            { name: "Pleasurekraft", release: "Tarantula", instagram: "@pleasurekraft", listeners: 250000, reach: 400000, trend: "steady" },
            { name: "Luigi Madonna", release: "Demolition", instagram: "@luigimadonna", listeners: 200000, reach: 350000, trend: "steady" }
        ] },
        { name: "Axtone", sub: "Progressive House", founded: 2005, roster: 25, country: "Sweden", type: "independent", tags: ["progressive","house"], color: "#f97316", assoc: "Axwell", sourceTrack: "Barricade", sourceChart: "Beatport Top 100", followers: 350000, avgStreams: 400000, streamGrade: "B", releases2025: 20, releasesLast6: 10, releasePace: "monthly", artists: [
            { name: "Shapov", release: "Future Rave", instagram: "@shapov", listeners: 300000, reach: 450000, trend: "up" },
            { name: "Magnificence", release: "Cobra", instagram: "@magnificenceofficial", listeners: 150000, reach: 250000, trend: "steady" },
            { name: "Klahr", release: "Ritual", instagram: "@klahrmusic", listeners: 80000, reach: 100000, trend: "up" },
            { name: "NEW_ID", release: "Visions", instagram: "@new_id_music", listeners: 120000, reach: 200000, trend: "up" }
        ] },
        { name: "Repopulate Mars", sub: "Tech House", founded: 2017, roster: 25, country: "United States", type: "independent", tags: ["tech house","funky"], color: "#ea580c", assoc: "Lee Foss", avgStreams: 250000, streamGrade: "B", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Lee Foss", release: "Play", instagram: "@leefoss", listeners: 200000, reach: 350000, trend: "steady" },
            { name: "MK", release: "Lies", instagram: "@marckinchen", listeners: 3000000, reach: 5000000, trend: "steady" },
            { name: "Anabel Englund", release: "Waiting For You", instagram: "@anabelenglund", listeners: 500000, reach: 800000, trend: "up" },
            { name: "Eli Brown", release: "Desire", instagram: "@elibrownbeats", listeners: 600000, reach: 1000000, trend: "up" }
        ] },
        { name: "Colorize", sub: "Progressive / Deep", founded: 2013, roster: 20, country: "United Kingdom", type: "independent", tags: ["progressive","deep"], color: "#f43f5e", assoc: "Enhanced sub-label", sourceTrack: "Afterglow", sourceChart: "Beatport Hype 100", followers: 90000, avgStreams: 50000, streamGrade: "C", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Boxer", release: "Waterfall", instagram: "@boxermusic", listeners: 30000, reach: 50000, trend: "up" },
            { name: "Dezza", release: "Evolve", instagram: "@dezzamusic", listeners: 60000, reach: 90000, trend: "up" },
            { name: "Lycoriscoris", release: "Stardust", instagram: "@lycoriscoris", listeners: 40000, reach: 60000, trend: "steady" },
            { name: "Farius", release: "Along the Way", instagram: "@fariusmusic", listeners: 100000, reach: 180000, trend: "up" }
        ] },
        { name: "Knee Deep In Sound", sub: "Tech House / Techno", founded: 2014, roster: 20, country: "United States", type: "independent", tags: ["tech house","techno"], color: "#0ea5e9", assoc: "Hot Since 82", avgStreams: 350000, streamGrade: "B", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Hot Since 82", release: "Buggin'", instagram: "@hotsince82", listeners: 2000000, reach: 3500000, trend: "steady" },
            { name: "Loco Dice", release: "Get Comfy", instagram: "@locodice", listeners: 500000, reach: 900000, trend: "steady" },
            { name: "Enzo Siragusa", release: "No Time To Wait", instagram: "@enzosiragusa", listeners: 200000, reach: 350000, trend: "steady" },
            { name: "Detlef", release: "Backfire", instagram: "@detlef_music", listeners: 300000, reach: 500000, trend: "up" }
        ] },
        { name: "Confession", sub: "Bass House", founded: 2016, roster: 20, country: "United States", type: "independent", tags: ["bass house","tech house"], color: "#1e293b", assoc: "Tchami", sourceTrack: "Adieu", sourceChart: "Beatport Top 100", followers: 450000, avgStreams: 300000, streamGrade: "B", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Tchami", release: "Born Again", instagram: "@tchami", listeners: 2500000, reach: 5000000, trend: "steady" },
            { name: "Malaa", release: "Cash Money", instagram: "@malaa", listeners: 1500000, reach: 3000000, trend: "steady" },
            { name: "Dustycloud", release: "BTTF", instagram: "@dustycloudmusic", listeners: 200000, reach: 350000, trend: "up" },
            { name: "Habstrakt", release: "Infinite", instagram: "@habstrakt", listeners: 800000, reach: 1500000, trend: "up" }
        ] },
        { name: "SIZE Records", sub: "Progressive / Tech", founded: 2003, roster: 20, country: "Sweden", type: "independent", tags: ["progressive","tech"], color: "#64748b", assoc: "Steve Angello", sourceTrack: "Yeah", sourceChart: "Beatport Top 100", followers: 300000, avgStreams: 350000, streamGrade: "B", releases2025: 12, releasesLast6: 6, releasePace: "monthly", artists: [
            { name: "Steve Angello", release: "Rejoice", instagram: "@steveangello", listeners: 2500000, reach: 5000000, trend: "steady" },
            { name: "Corey James", release: "Sine", instagram: "@coreyjamesofficial", listeners: 100000, reach: 180000, trend: "up" },
            { name: "Third Party", release: "Veins", instagram: "@thirdpartymusic", listeners: 250000, reach: 400000, trend: "steady" },
            { name: "Magnificence", release: "Lights Out", instagram: "@magnificenceofficial", listeners: 150000, reach: 250000, trend: "steady" }
        ] },
        { name: "Future House Music", sub: "Future House", founded: 2014, roster: 20, country: "Netherlands", type: "independent", tags: ["future house","bass house"], color: "#22c55e", assoc: "YouTube label", sourceTrack: "Badam", sourceChart: "Spotify Viral 50", followers: 4500000, avgStreams: 80000, streamGrade: "C", releases2025: 50, releasesLast6: 25, releasePace: "weekly", artists: [
            { name: "Keanu Silva", release: "Fine Day", instagram: "@keanusilva", listeners: 700000, reach: 1200000, trend: "steady" },
            { name: "Curbi", release: "Shinai", instagram: "@curbiofficial", listeners: 500000, reach: 800000, trend: "steady" },
            { name: "Mike Williams", release: "Wait For You", instagram: "@mikewilliamsdj", listeners: 1000000, reach: 2000000, trend: "steady" },
            { name: "Bougenvilla", release: "Deeper Love", instagram: "@bougenvillamusic", listeners: 100000, reach: 150000, trend: "steady" }
        ] },
        { name: "Elliptical Sun", sub: "Progressive Trance", founded: 2013, roster: 20, country: "United States", type: "independent", tags: ["progressive","trance"], color: "#f59e0b", assoc: "Melodic label", sourceTrack: "Parallels", sourceChart: "Beatport Top 100", followers: 80000, avgStreams: 8000, streamGrade: "D", releases2025: 40, releasesLast6: 20, releasePace: "biweekly", artists: [
            { name: "Rasi", release: "Dawn", instagram: "@rasimusic", listeners: 20000, reach: 30000, trend: "steady" },
            { name: "Rodrigo Deem", release: "Afterglow", instagram: "@rodrigodeem", listeners: 25000, reach: 40000, trend: "steady" },
            { name: "Paul Arcane", release: "Wilderness", instagram: "@paularcane", listeners: 15000, reach: 25000, trend: "up" },
            { name: "Michael Mashkov", release: "Equinox", instagram: "@michaelmashkov", listeners: 10000, reach: 15000, trend: "up" }
        ] },
        { name: "Armind", sub: "Trance", founded: 2003, roster: 20, country: "Netherlands", type: "major-backed", tags: ["trance","uplifting"], color: "#3b82f6", assoc: "Armin sub-label", sourceTrack: "This Is What It Feels Like", sourceChart: "Beatport Top 100", followers: 300000, avgStreams: 90000, streamGrade: "C", releases2025: 30, releasesLast6: 15, releasePace: "biweekly", artists: [
            { name: "Armin van Buuren", release: "Feel Again", instagram: "@arminvanbuuren", listeners: 14000000, reach: 40000000, trend: "steady" },
            { name: "Rising Star", release: "Clear Blue Moon", instagram: "@arminvanbuuren", listeners: 14000000, reach: 40000000, trend: "steady" },
            { name: "Super8 & Tab", release: "Reformation", instagram: "@super8andtab", listeners: 200000, reach: 350000, trend: "steady" },
            { name: "AVAO", release: "Dimensions", instagram: "@avaomusic", listeners: 50000, reach: 80000, trend: "up" }
        ] },
        { name: "Zerothree", sub: "Progressive House", founded: 2013, roster: 15, country: "United States", type: "independent", tags: ["progressive","house"], color: "#06b6d4", assoc: "Lane 8", sourceTrack: "Rise", sourceChart: "Beatport Top 100", followers: 120000, avgStreams: 70000, streamGrade: "C", releases2025: 35, releasesLast6: 18, releasePace: "biweekly", artists: [
            { name: "Lane 8", release: "Reviver", instagram: "@lane8music", listeners: 1500000, reach: 2500000, trend: "up" },
            { name: "Anderholm", release: "Threads", instagram: "@anderholmmusic", listeners: 40000, reach: 60000, trend: "up" },
            { name: "Massane", release: "Visage 4", instagram: "@massanemusic", listeners: 200000, reach: 350000, trend: "up" },
            { name: "Kidnap", release: "Skin", instagram: "@kidnapmusic", listeners: 150000, reach: 250000, trend: "steady" }
        ] },
        { name: "Statement!", sub: "Trance / Progressive", founded: 2017, roster: 15, country: "Netherlands", type: "major-backed", tags: ["trance","progressive"], color: "#8b5cf6", assoc: "Armin sub-label", sourceTrack: "Wild Wild Son", sourceChart: "1001Tracklists", followers: 100000, avgStreams: 60000, streamGrade: "C", releases2025: 25, releasesLast6: 12, releasePace: "biweekly", artists: [
            { name: "Armin van Buuren", release: "Computers Take Over", instagram: "@arminvanbuuren", listeners: 14000000, reach: 40000000, trend: "steady" },
            { name: "AVIRA", release: "Voltage", instagram: "@avira", listeners: 150000, reach: 250000, trend: "up" },
            { name: "Davey Asprey", release: "Fallout", instagram: "@daveyasprey", listeners: 80000, reach: 130000, trend: "up" },
            { name: "THRESH3HOLD", release: "Altered State", instagram: "@thresh3hold", listeners: 30000, reach: 50000, trend: "up" }
        ] },
        { name: "Pandra", sub: "Melodic House", founded: 2019, roster: 10, country: "Germany", type: "independent", tags: ["melodic","house"], color: "#a855f7", assoc: "Indie melodic", sourceTrack: "Echoes", sourceChart: "Beatport Hype 100", followers: 40000, avgStreams: 4000, streamGrade: "D", releases2025: 8, releasesLast6: 4, releasePace: "sporadic", artists: [
            { name: "Township Rebellion", release: "Utopia", instagram: "@townshiprebellion", listeners: 200000, reach: 350000, trend: "up" },
            { name: "Innellea", release: "Something More", instagram: "@innellea", listeners: 500000, reach: 800000, trend: "up" },
            { name: "Kevin de Vries", release: "Dance With Me", instagram: "@kevindevries", listeners: 400000, reach: 700000, trend: "up" },
            { name: "Colyn", release: "Amor", instagram: "@colynmusic", listeners: 300000, reach: 500000, trend: "up" }
        ] },
        { name: "Gemstone Records", sub: "Future Rave / House", founded: 2022, roster: 10, country: "Netherlands", type: "independent", tags: ["future rave","big room"], color: "#ec4899", assoc: "Morten", sourceTrack: "Element", sourceChart: "1001Tracklists", followers: 200000, avgStreams: 3000, streamGrade: "D", releases2025: 15, releasesLast6: 8, releasePace: "monthly", artists: [
            { name: "Morten", release: "No Good", instagram: "@mortenofficial", listeners: 600000, reach: 1000000, trend: "up" },
            { name: "David Guetta", release: "Titanium FR Remix", instagram: "@davidguetta", listeners: 55000000, reach: 120000000, trend: "steady" },
            { name: "Mathame", release: "For Every Forever", instagram: "@mathamemusic", listeners: 300000, reach: 500000, trend: "up" },
            { name: "JASTED", release: "Control", instagram: "@jastedmusic", listeners: 50000, reach: 80000, trend: "up" }
        ] }
    ],

    "All Labels": []
};

// Build "All Labels" combined
labelData["All Labels"] = [
    ...labelData["Bass"],
    ...labelData["House"]
];
