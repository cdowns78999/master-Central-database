/* ══════════════════════════════════════════════════════════════
   MARC ANTONIX — CURRICULUM DATA (V2)
   5 Tile Types: Presentation, Website Engine, Sales Proposal, Research x2
   ══════════════════════════════════════════════════════════════ */

const curriculumData = {

    home: {
        artistName: "Marc Antonix",
        heroTitle: "Your 5-Star Curriculum",
        heroSub: "Each star below is a self-contained proposal — built from verified strategy, real pricing, and platform data. Tap any star to walk through the full plan step by step.",
        badge: "Ahead Artist Solutions"
    },

    stars: {

        /* ─────────────────────────────────────
           ⭐[1] Spotify Ads + Playlisting + Localization
           TYPE: Presentation — talking points
           ───────────────────────────────────── */
        "star-1": {
            title: "Spotify Ads + Playlisting + Localization",
            color: "#1ed760",
            colorVar: "--star-1",
            file: "star1.html",
            icon: "🎯",
            type: "presentation",
            tagline: "Talking points for Spotify Ads, Localization, and the transition from playlisting to paid ads.",
            subTiles: [
                {
                    key: "ads-tool",
                    title: "Spotify Ads Tool",
                    description: "Walkthrough of the Spotify Ad Studio — campaign setup, targeting, budgets, and creative specs.",
                    icon: "📢"
                },
                {
                    key: "localization-tool",
                    title: "Localization Tool",
                    description: "International market expansion — target countries, language considerations, localized playlists.",
                    icon: "🌍"
                },
                {
                    key: "transition-graph",
                    title: "Transition Graph",
                    description: "Visual showing the shift: international playlisting decreasing as Spotify Ads take over.",
                    icon: "📈",
                    graphData: {
                        line1: [
                            { x: "Q1 2025", y: 80, label: "Int'l Playlisting Peak" },
                            { x: "Q4 2025", y: 20, label: "Playlisting Wind-Down" }
                        ],
                        line2: [
                            { x: "Q1 2025", y: 15, label: "Ads Early Stage" },
                            { x: "Q4 2025", y: 85, label: "Ads Full Scale" }
                        ]
                    }
                }
            ]
        },

        /* ─────────────────────────────────────
           ⭐[2] EPK + Website + Discount Pricing
           TYPE: Website Engine — full interactive sites
           ───────────────────────────────────── */
        "star-2": {
            title: "EPK + Website + Discount Pricing",
            color: "#3b82f6",
            colorVar: "--star-2",
            file: "star2.html",
            icon: "🌐",
            type: "website-engine",
            tagline: "Full interactive sites — an EPK and artist website, built live inside this tile.",
            frames: [
                {
                    key: "epk",
                    previewLabel: "Electronic Press Kit",
                    previewDescription: "5-page EPK — Bio, Photos, Music, Press, Contact. Content TBD.",
                    pageCount: 5,
                    fullSitePages: [
                        { slug: "hero", title: "Hero / Landing", content: "" },
                        { slug: "about", title: "About / Bio", content: "" },
                        { slug: "music", title: "Music / Discography", content: "" },
                        { slug: "press", title: "Press / Features", content: "" },
                        { slug: "contact", title: "Contact", content: "" }
                    ]
                },
                {
                    key: "website",
                    previewLabel: "Artist Website",
                    previewDescription: "Multi-section artist website — hero, about, music, shows, contact. Content TBD.",
                    pageCount: 5,
                    fullSitePages: [
                        { slug: "hero", title: "Hero / Landing", content: "" },
                        { slug: "about", title: "About", content: "" },
                        { slug: "music", title: "Music", content: "" },
                        { slug: "shows", title: "Shows / Tour", content: "" },
                        { slug: "contact", title: "Contact", content: "" }
                    ]
                }
            ]
        },

        /* ─────────────────────────────────────
           ⭐[3] LOUIEJAYXX - Escape EP
           TYPE: Sales Proposal — sell-ready
           ───────────────────────────────────── */
        "star-3": {
            title: "LOUIEJAYXX — Escape EP",
            color: "#a855f7",
            colorVar: "--star-3",
            file: "star3.html",
            icon: "💿",
            type: "sales-proposal",
            tagline: "Sell-ready proposal with offer stack, drag/drop assets, and campaign handler.",
            dropzone: true,
            handler: "Spotify Ads Tool",
            offerStack: [
                {
                    service: "Press Coverage",
                    price: "$500",
                    detail: "3 outlets",
                    deliverable: "Press placement across 3 music publications"
                },
                {
                    service: "2 Singles Campaign",
                    price: "$500",
                    detail: "Spotify Ads",
                    deliverable: "Full Spotify Ad Studio campaign for 2 singles"
                },
                {
                    service: "1 EP Single (Discounted)",
                    price: "$100",
                    detail: "Spotify Ads",
                    deliverable: "Discounted Spotify Ad campaign for 1 EP lead single"
                },
                {
                    service: "3rd Party Playlisting",
                    price: "20K",
                    detail: "Playlist streams",
                    deliverable: "20,000 streams via curated 3rd-party playlist network"
                }
            ]
        },

        /* ─────────────────────────────────────
           ⭐[4] Spotify 'Viral' Algorithm
           TYPE: Research — placeholder for source data
           ───────────────────────────────────── */
        "star-4": {
            title: "Path to Spotify Viral 50",
            color: "#f59e0b",
            colorVar: "--star-4",
            file: "star4.html",
            icon: "⚡",
            type: "research",
            tagline: "Step-by-step playbook for trending on Spotify's official Viral 50 — Global and USA.",
            phases: [
                /* ─────────────────────────────────────
                   PHASE 1 — UNDERSTAND THE TARGET
                   What the Viral 50 actually is & how it ranks
                   ───────────────────────────────────── */
                {
                    label: "Phase 1",
                    title: "Understand the Target",
                    icon: "\ud83c\udfaf",
                    steps: [
                        {
                            heading: "What the Viral 50 Actually Is",
                            body: "The Viral 50 (Global & USA) is NOT a streams chart. It is a momentum chart. Spotify's own support page defines it as songs \"gaining the most buzz\" — ranked by recent rise in plays, how often people share the song, and how many people recently discovered it. This means a track with 5,000 streams can outrank one with 500,000 if its velocity, sharing, and new-listener ratio are higher in a 24-hour window. The chart updates daily. There are territory-specific versions (Viral 50 — USA, Viral 50 — Global, etc.). Getting on any one territory chart is the first domino.",
                            link: "https://support.spotify.com/us/artists/article/understanding-spotify-charts/",
                            sourceText: "Spotify Support — Understanding Spotify Charts"
                        },
                        {
                            heading: "The 3 Inputs That Determine Ranking",
                            body: "Spotify has confirmed three signals power the Viral 50 formula:\n\n1. VELOCITY — How fast streams are accelerating (not total count). A sharp spike beats a slow climb.\n2. SHARING — How often listeners share the track via Spotify's built-in share (to Instagram Stories, DMs, copy-link). External shares (TikTok, Twitter) feed back indirectly by driving new listeners in.\n3. DISCOVERY RATIO — How many of the track's listeners are hearing it for the first time. A track where 80% of listeners are brand new scores higher than one where 80% are repeat fans.\n\nThe formula also includes anti-fraud protections — bot streams, click farms, and playlist-stuffing are filtered out. Organic-only activity is what counts.",
                            link: "https://community.spotify.com/t5/Content-Questions/Viral-50-Playlists-How-do-they-work/td-p/1627778",
                            sourceText: "Spotify Community — Viral 50 Playlists: How Do They Work"
                        },
                        {
                            heading: "Viral 50 vs. Top 50 — Know the Difference",
                            body: "Top 50 = volume chart. Most total streams in a day. Dominated by major-label releases, established artists, and playlist power. The Viral 50 = velocity chart. Fastest-rising tracks by engagement rate. This is where independents and emerging artists break through. You don't need millions of streams. You need thousands of the RIGHT streams — from new listeners who save, share, and complete the track — concentrated into the smallest possible time window.",
                            link: "https://community.spotify.com/t5/Your-Library/What-s-the-difference-between-daily-top-50-and-viral-top-50/td-p/4973312",
                            sourceText: "Spotify Community — Top 50 vs Viral 50 Difference"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 2 — BUILD THE TRACK RIGHT
                   Song structure & metadata optimization
                   ───────────────────────────────────── */
                {
                    label: "Phase 2",
                    title: "Build the Track Right",
                    icon: "\ud83c\udfb5",
                    steps: [
                        {
                            heading: "Song Structure for Viral Candidacy",
                            body: "The Viral 50 favors tracks people DON'T skip. That means:\n\n• Hook in the first 5 seconds — Spotify counts a \"stream\" at 30 seconds, but the algorithm measures skip rate from second 1. If listeners bail before :30, the track is penalized.\n• Keep it under 3:30 — Shorter tracks have higher completion rates. Completion rate is a key signal. A 2:45 track that 90% of listeners finish outperforms a 4:30 track that 60% finish.\n• Make the chorus arrive by :45 — Viral tracks get shared as clips. If the best part doesn't hit fast, it won't get shared.\n• Design a 7-15 second \"clip moment\" — This is the snippet people use on Instagram Stories and TikTok. Build one into the track intentionally.",
                            link: "https://playlistpush.com/blog/the-tiktok-to-spotify-pipeline-how-viral-videos-launch-music-careers-2/",
                            sourceText: "Playlist Push — The TikTok-to-Spotify Pipeline"
                        },
                        {
                            heading: "Metadata & Profile Optimization",
                            body: "Before anything goes live:\n\n• Spotify for Artists profile must be COMPLETE — bio, photos, Canvas video, artist pick, pinned playlist. Incomplete profiles get deprioritized by the algorithm.\n• Genre tags must be accurate and specific — not just \"pop\" but the sub-genre. This determines which Discover Weekly pools you enter.\n• Canvas (looping video) is mandatory — tracks with Canvas get 5% more streams, 145% more shares, and 20% more saves according to Spotify's own data. This directly feeds the sharing signal that powers Viral 50.\n• Pre-save link must be live 2-4 weeks before release — every pre-save converts to a Day 1 stream + save, which is the highest-value engagement for velocity.",
                            link: "https://artists.spotify.com/en/blog/release-guide-promotional-engagement-best-practices",
                            sourceText: "Spotify for Artists — Release Guide: Promotional & Engagement Best Practices"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 3 — PRE-RELEASE SETUP (Weeks 4-1)
                   Everything before release day
                   ───────────────────────────────────── */
                {
                    label: "Phase 3",
                    title: "Pre-Release Setup (4 Weeks Out)",
                    icon: "\ud83d\udcc5",
                    steps: [
                        {
                            heading: "Week 4-3: Pitch & Build the Funnel",
                            body: "• Submit to Spotify Editorial via Spotify for Artists — must be done at least 7 days before release, ideally 3-4 weeks. This is your shot at Release Radar boost and potential editorial playlist adds.\n• Pitch to independent playlist curators — use platforms like SubmitHub, Groover, or direct outreach. Target 20-50 playlists in your genre. Focus on playlists with real engagement (check follower-to-listener ratios).\n• Set up your pre-save campaign — use a smart link tool (Feature.fm, Hypeddit, ToneDen). Every pre-save = a guaranteed Day 1 stream + library save. This is the single highest-ROI action for Viral 50 candidacy.\n• Build an email/SMS list push — if you have even 200 real fans on a list, schedule a pre-save CTA email sequence (3 emails over 2 weeks).",
                            link: "https://groover.co/en/lp/get-heard-on-spotify-playlists/how-to-get-on-spotify-playlists/",
                            sourceText: "Groover — How to Get on Spotify Playlists"
                        },
                        {
                            heading: "Week 2-1: Seed the Content & Territory",
                            body: "• Choose ONE target territory — Viral 50 has country-specific charts. It's easier to spike velocity in one country (e.g., USA) than globally. Focus all promotion geographically.\n• Start posting teaser content — 3-5 short-form clips (TikTok, Reels, Shorts) using the track's \"clip moment.\" Don't post the full song. Tease the hook only.\n• Activate micro-influencers — 5-10 creators with 10K-100K followers in your genre. Send them the clip with a simple brief. Their job: create content using your sound BEFORE release day so it's already circulating.\n• Coordinate your inner circle — DM 50-100 real humans (friends, family, superfans) with a specific ask: \"On [release date], stream the track, save it to your library, and share it to your Instagram Story.\" Give them the exact steps. This is your Day 1 strike team.",
                            link: "https://dittomusic.com/en/blog/how-to-promote-music-on-tiktok-and-go-viral",
                            sourceText: "Ditto Music — How to Promote Music on TikTok and Go Viral"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 4 — RELEASE WEEK EXECUTION
                   The 72-hour window that matters most
                   ───────────────────────────────────── */
                {
                    label: "Phase 4",
                    title: "Release Week Execution (The 72-Hour Window)",
                    icon: "\ud83d\ude80",
                    steps: [
                        {
                            heading: "Release Day (Friday): The Opening Strike",
                            body: "Release on Friday — this aligns with Spotify's Release Radar refresh (every Friday). Your track immediately enters the Release Radar of every follower and algorithmically-matched listener.\n\nIn the first 12 hours:\n• Activate your strike team — those 50-100 people all stream, save, and share NOW\n• Post your strongest content piece — the one with the clip moment, across all platforms, with a direct Spotify link\n• Send push notification to your email/SMS list — \"IT'S LIVE\" with one-tap Spotify link\n• Go live on Instagram or TikTok — play the track, talk about it, pin the Spotify link\n\nThe goal: create the sharpest possible spike in the first 12-24 hours. Viral 50 measures DAILY velocity. One massive day beats seven moderate days.",
                            link: "https://aristake.com/how-to-rise-through-the-spotify-charts/",
                            sourceText: "Ari's Take — How to Rise Through the Spotify Charts"
                        },
                        {
                            heading: "Day 2-3: Sustain the Spike",
                            body: "The Viral 50 updates daily. You need at least 2-3 consecutive days of high velocity to chart.\n\nDay 2:\n• Drop your second-best content piece — different angle, same track, new platform emphasis\n• Re-share fan Stories and UGC — anyone who posted about the track, amplify them\n• Push the \"save\" CTA hard — saves are weighted more heavily than passive streams. Tell people: \"Save this to your library if you want to hear it again\"\n\nDay 3:\n• Third content piece — behind the scenes, studio clip, or reaction video\n• Playlist curators should be adding the track by now (if you pitched properly in Phase 3). Each playlist add feeds new listeners into the discovery ratio\n• If you have budget: launch a Spotify Marquee campaign ($250-500 minimum). Marquee delivers 10x more listeners per dollar than social ads, and listeners who see Marquee are 2x more likely to save the track",
                            link: "https://artists.spotify.com/en/marquee",
                            sourceText: "Spotify for Artists — Marquee"
                        },
                        {
                            heading: "The Save Rate Benchmark",
                            body: "Save rate is the percentage of listeners who save the track to their library. It's the single most important engagement metric for algorithmic and viral chart consideration.\n\n• Average Spotify save rate: ~2-4%\n• Good save rate (algorithmic boost territory): 5-8%\n• Viral 50 candidate save rate: 10%+\n\nIf your save rate is below 5%, the algorithm will NOT push the track further — no matter how many streams you drive externally. This is why quality of listeners matters more than quantity. 1,000 real fans who save > 10,000 casual listeners who skip.\n\nMonitor your save rate in Spotify for Artists dashboard under \"Music\" > track detail > \"Saves\" vs \"Listeners.\" If it's low, your content/audience targeting is off — fix before spending more on promotion.",
                            link: "https://www.rocksoffmag.com/spotify-algorithm-basics-for-artists/",
                            sourceText: "Rocks Off Mag — Spotify Algorithm Basics: Save Rate Signals"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 5 — THE ALGORITHM CASCADE
                   How algorithmic playlists chain-react
                   ───────────────────────────────────── */
                {
                    label: "Phase 5",
                    title: "The Algorithm Cascade",
                    icon: "\u26a1",
                    steps: [
                        {
                            heading: "Release Radar → Discover Weekly → Radio → Viral 50",
                            body: "Spotify's algorithmic system works like a chain reaction. Understanding the sequence is critical:\n\n1. RELEASE RADAR (Friday, Day 1) — Your track is tested on followers and algorithmically-matched listeners. Spotify measures: did they skip? Save? Complete? Share? If engagement is strong (high save rate, low skip rate, high completion), the track \"passes the test.\"\n\n2. DISCOVER WEEKLY (Monday, Day 3-4) — If Release Radar signals are strong, Spotify starts placing the track in Discover Weekly for NON-followers. This is where the discovery ratio explodes — suddenly 80%+ of listeners are brand new. This is rocket fuel for Viral 50.\n\n3. RADIO & AUTOPLAY (Days 3-7) — The track starts appearing in algorithmic radio sessions and autoplay queues. Each new listener who saves/shares compounds the velocity signal.\n\n4. VIRAL 50 CANDIDACY (Days 2-7) — If the daily velocity + sharing + discovery ratio hits threshold, the track enters the Viral 50 chart for the relevant territory.\n\nThe entire cascade depends on the FIRST test (Release Radar). If Release Radar engagement is weak, the chain breaks at step 1 and none of the downstream algorithmic surfaces activate.",
                            link: "https://www.music-tomorrow.com/blog/how-to-get-on-discover-weekly-spotify-algorithm",
                            sourceText: "Music Tomorrow — How Discover Weekly Algorithm Works"
                        },
                        {
                            heading: "The TikTok-to-Spotify Pipeline",
                            body: "An estimated 65% of Spotify's biggest viral hits find their initial spark on TikTok. The pipeline works like this:\n\n1. A clip goes viral on TikTok (using the track's sound)\n2. Viewers search the song on Spotify (this registers as \"discovery\" — brand new listeners)\n3. Those listeners stream, save, and share on Spotify\n4. Spotify's algorithm sees a massive spike in new-listener engagement\n5. The track enters algorithmic playlists AND Viral 50 candidacy simultaneously\n\nThis is why the \"clip moment\" from Phase 2 matters so much. If your track has a 7-15 second snippet that works as a TikTok sound, you've built a viral on-ramp directly into Spotify's Viral 50 formula.\n\n67% of TikTok users check out songs on other platforms after hearing them on TikTok. 75% discover new artists through the app. But it burns fast — TikTok viral moments now peak and fade quicker than ever, so the Spotify conversion must happen in the first 48 hours of a TikTok spike.",
                            link: "https://artistrack.com/your-2026-music-strategy-tiktok-spotify-viral/",
                            sourceText: "Artistrack — Go Viral on Spotify Via TikTok"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 6 — POST-CHART SUSTAIN
                   What to do once you're on (or near) Viral 50
                   ───────────────────────────────────── */
                {
                    label: "Phase 6",
                    title: "Post-Chart Sustain & Measurement",
                    icon: "\ud83d\udcca",
                    steps: [
                        {
                            heading: "If You Chart: How to Stay On",
                            body: "Getting on the Viral 50 is Day 1. Staying on is the game.\n\n• Keep content flowing daily — every piece of content that drives a new wave of listeners resets your velocity clock\n• Launch Spotify Showcase — unlike Marquee (new releases only), Showcase works for catalog tracks and keeps your release visible on Spotify Home after the initial hype window\n• Cross-promote the chart placement itself — screenshot it, post it, make it a story. \"We're on Spotify Viral 50\" is social proof that drives MORE streams, creating a feedback loop\n• Don't stop the influencer machine — if micro-influencers drove the initial spike, keep 2-3 active through week 2\n• Monitor daily: if velocity drops for 2 consecutive days, you need a new content push or promotional lever immediately",
                            link: "https://artists.spotify.com/en/showcase",
                            sourceText: "Spotify for Artists — Showcase"
                        },
                        {
                            heading: "KPIs to Track Daily During a Viral Push",
                            body: "Set up daily monitoring for these numbers in Spotify for Artists + your analytics tool:\n\n• STREAMS PER DAY — trend line, not total. Is it accelerating or decelerating?\n• SAVE RATE — saves ÷ listeners. Must stay above 5%, ideally 10%+\n• LISTENERS vs. STREAMS — if streams/listener > 1.5, people are replaying (great signal)\n• DISCOVERY RATIO — % of listeners who are new to your artist. Track via \"Audience\" tab\n• PLAYLIST ADDS — both editorial and user-generated. Each add is a new listener pipeline\n• SHARES — available in track analytics. Direct measure of the sharing signal\n• FOLLOWER GROWTH — spikes in followers correlate with algorithmic favorability\n\nUse Chartmetric or Soundcharts for cross-platform monitoring — they track Spotify chart positions, TikTok video counts, and Shazam spikes in real-time, giving you a 360° view of momentum.",
                            link: "https://soundcharts.com/en/song-analytics",
                            sourceText: "Soundcharts — Song Analytics: Streams, Charts & TikTok Data"
                        },
                        {
                            heading: "The Playbook Summary — 10 Commandments",
                            body: "1. The Viral 50 is a VELOCITY chart, not a volume chart. Speed beats size.\n2. Pick ONE territory. Spike hard in one country before going global.\n3. Build the track for completion — hook fast, keep it short, make it shareable.\n4. Canvas video is mandatory. +145% shares.\n5. Pre-saves are your Day 1 ammo. Every pre-save = a guaranteed save + stream.\n6. Concentrate ALL promotion into a 72-hour window. Sharp spike > slow drip.\n7. Save rate above 5% is the minimum. Below that, the algorithm won't push you.\n8. The chain is: Release Radar → Discover Weekly → Radio → Viral 50. Don't break step 1.\n9. TikTok is the #1 external driver. Build your clip moment into the track.\n10. Once you chart, don't stop. Content + Showcase + cross-promo = staying power.",
                            link: "https://support.spotify.com/us/artists/article/understanding-spotify-charts/",
                            sourceText: "Spotify Support — Understanding Spotify Charts"
                        }
                    ]
                }
            ],
            benchmarks: [
                { value: "10%+", label: "Target Save Rate", source: "Viral 50 candidate threshold — tracks with 10%+ save rate enter algorithmic consideration" },
                { value: "72hrs", label: "Critical Window", source: "The first 72 hours post-release determine whether the algorithm cascade activates" },
                { value: "65%", label: "TikTok Origin Rate", source: "Estimated percentage of Spotify's biggest viral hits that start on TikTok" }
            ],
            reminders: [
                "Submit editorial pitch 3-4 weeks before release",
                "Canvas video MUST be uploaded before release day",
                "Pre-save campaign live 2-4 weeks out",
                "50-100 person strike team briefed with exact Day 1 instructions",
                "Marquee campaign ($250+) ready to launch Day 2-3 if velocity is strong"
            ]
        },

        /* ─────────────────────────────────────
           ⭐[5] SoundCloud Growth Playbook
           TYPE: Research — sourced playbook
           ───────────────────────────────────── */
        "star-5": {
            title: "SoundCloud Growth Playbook",
            color: "#ff5500",
            colorVar: "--star-5",
            file: "star5.html",
            icon: "☁️",
            type: "research",
            tagline: "Complete SoundCloud growth strategy — ads, playlisting, charting, algorithmic discovery, and repost chains.",
            phases: [
                /* ─────────────────────────────────────
                   PHASE 1 — SOUNDCLOUD ADS
                   How Promote works, CPM, Artist Pro, when to use ads vs organic
                   ───────────────────────────────────── */
                {
                    label: "Phase 1",
                    title: "SoundCloud Ads",
                    icon: "\ud83d\udce2",
                    steps: [
                        {
                            heading: "How SoundCloud Promote Works",
                            body: "SoundCloud\u2019s native ad tool is called Promote. It places your track in the stream feed of targeted listeners as a sponsored post. Unlike Spotify Ad Studio (which runs audio ads between songs), SoundCloud Promote is visual \u2014 it shows your track card with artwork, title, and a play button directly in the listener\u2019s feed.\n\n\u2022 Minimum spend: $25/day\n\u2022 Pricing model: CPM (cost per 1,000 impressions), typically $3\u201310 CPM depending on targeting\n\u2022 Targeting options: Genre, location, age, and listener behavior\n\u2022 Requires Artist Pro subscription ($12/mo) or SoundCloud Next Pro ($16/mo) to access Promote\n\u2022 Campaigns run for 1\u201330 days with daily budget caps",
                            link: "https://help.soundcloud.com/hc/en-us/articles/4420298225819-Promote-on-SoundCloud",
                            sourceText: "SoundCloud Help \u2014 Promote on SoundCloud"
                        },
                        {
                            heading: "When to Use Ads vs. Organic",
                            body: "SoundCloud ads work best as an amplifier, not a replacement for organic growth. Use Promote when:\n\n\u2022 You already have a track gaining organic traction (reposts, comments, saves) and want to accelerate it\n\u2022 You\u2019re releasing new music and want to push it into the first-48-hour charting window\n\u2022 You\u2019re targeting a specific genre audience that matches your sound\n\nDo NOT use Promote as your only strategy. Tracks with zero organic engagement that get promoted tend to have low completion rates, which hurts your algorithmic standing. The ideal combo: organic repost chain + Promote campaign running simultaneously during release week.",
                            link: "https://blog.soundcloud.com/2023/06/22/promote-your-music/",
                            sourceText: "SoundCloud Blog \u2014 Promote Your Music"
                        },
                        {
                            heading: "3 Signals That Power SoundCloud\u2019s Algorithm",
                            body: "SoundCloud\u2019s recommendation engine weighs three core signals when deciding what to surface:\n\n1. REPOSTS \u2014 The #1 social signal. When a listener reposts your track, it appears in their followers\u2019 feeds. More reposts = exponential reach. SoundCloud weights reposts more heavily than likes.\n2. COMPLETION RATE \u2014 What percentage of listeners play your track to the end? Tracks with high completion rates get pushed into \u201cMore of what you like\u201d and \u201cRelated Tracks\u201d recommendations.\n3. FIRST 48 HOURS \u2014 The initial engagement window. Plays, reposts, comments, and likes in the first 48 hours after upload determine whether the track enters algorithmic circulation or flatlines.",
                            link: "https://community.soundcloud.com/how-does-the-soundcloud-algorithm-work",
                            sourceText: "SoundCloud Community \u2014 How the Algorithm Works"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 2 — SOUNDCLOUD PLAYLISTING
                   #SCFIRST, reposts, RepostExchange, Buzzing, The Upload
                   ───────────────────────────────────── */
                {
                    label: "Phase 2",
                    title: "SoundCloud Playlisting",
                    icon: "\ud83c\udfb5",
                    steps: [
                        {
                            heading: "The #SCFIRST Editorial Tag",
                            body: "#SCFIRST is SoundCloud\u2019s official editorial discovery tag. When you upload a track and tag it #SCFIRST, you\u2019re signaling to SoundCloud\u2019s editorial team that this is a platform-first release \u2014 meaning it\u2019s debuting on SoundCloud before any other streaming platform.\n\n\u2022 Tracks tagged #SCFIRST get priority consideration for editorial playlists like \u201cThe Upload\u201d and genre-specific Buzzing playlists\n\u2022 SoundCloud\u2019s editorial team actively monitors the #SCFIRST tag for emerging artists\n\u2022 It\u2019s free to use \u2014 just add it to your track tags on upload\n\u2022 Combine with accurate genre tags for maximum editorial visibility",
                            link: "https://blog.soundcloud.com/tag/scfirst/",
                            sourceText: "SoundCloud Blog \u2014 #SCFIRST"
                        },
                        {
                            heading: "Reposts as the #1 Playlist Signal",
                            body: "On SoundCloud, reposts function like shares on steroids. Unlike Spotify where playlist adds are king, on SoundCloud the repost is the primary distribution mechanism:\n\n\u2022 When someone reposts your track, it appears in their followers\u2019 streams as if they uploaded it\n\u2022 Repost chains (getting multiple accounts to repost within a short window) create a cascade effect that triggers algorithmic attention\n\u2022 Reposts from accounts with large followings carry more weight\n\u2022 The repost-to-play ratio matters \u2014 a track with 50 reposts and 500 plays signals higher engagement than one with 50 reposts and 50,000 plays",
                            link: "https://help.soundcloud.com/hc/en-us/articles/115003449847-Reposting-a-track-or-playlist",
                            sourceText: "SoundCloud Help \u2014 Reposting Tracks"
                        },
                        {
                            heading: "Buzzing Playlists & The Upload",
                            body: "SoundCloud maintains several algorithmic and editorial playlists that serve as the main discovery surfaces:\n\n\u2022 THE UPLOAD \u2014 SoundCloud\u2019s flagship editorial playlist. Updated weekly. Features emerging artists and new releases hand-picked by the editorial team. Getting on The Upload is the SoundCloud equivalent of Spotify\u2019s New Music Friday.\n\u2022 BUZZING PLAYLISTS \u2014 Genre-specific algorithmic playlists (Buzzing Hip-Hop, Buzzing Electronic, etc.) that surface tracks gaining momentum. These are algorithm-driven, not hand-curated.\n\u2022 The path to Buzzing is: organic reposts + high completion rate + first-48-hour engagement spike \u2192 algorithmic detection \u2192 Buzzing playlist placement\n\u2022 From Buzzing, top performers can graduate to New & Hot and eventually the Top 50 chart",
                            link: "https://blog.soundcloud.com/2023/03/09/the-upload/",
                            sourceText: "SoundCloud Blog \u2014 The Upload"
                        },
                        {
                            heading: "RepostExchange for Strategic Growth",
                            body: "RepostExchange is a legitimate third-party platform where SoundCloud artists trade reposts with each other. How it works:\n\n\u2022 You earn credits by reposting other artists\u2019 tracks\n\u2022 You spend credits to get your tracks reposted by other accounts\n\u2022 You can filter by genre, follower count, and engagement quality\n\u2022 The key advantage: it creates coordinated repost bursts that mimic organic viral behavior\n\u2022 Unlike bot services, these are real accounts with real followers\n\n\u26a0\ufe0f Use strategically \u2014 time your RepostExchange campaign to coincide with your track\u2019s first 48 hours for maximum algorithmic impact. Don\u2019t spread reposts over weeks; concentrate them.",
                            link: "https://www.repostexchange.com/",
                            sourceText: "RepostExchange \u2014 Grow Your SoundCloud"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 3 — SOUNDCLOUD CHARTING
                   Top 50 vs New & Hot, first 24-48hr window, 3 algo signals
                   ───────────────────────────────────── */
                {
                    label: "Phase 3",
                    title: "SoundCloud Charting",
                    icon: "\ud83d\udcc8",
                    steps: [
                        {
                            heading: "Top 50 vs. New & Hot",
                            body: "SoundCloud has two main chart surfaces:\n\n\u2022 TOP 50 \u2014 The volume chart. Tracks with the most plays in a given period. Dominated by established artists and major-label releases. Hard to crack as an independent.\n\u2022 NEW & HOT \u2014 The momentum chart. Tracks that are gaining the fastest relative to their baseline. This is the independent artist\u2019s entry point. A track can hit New & Hot with 5,000 plays if it accumulated them fast enough.\n\nNew & Hot updates frequently and is genre-specific. Getting on New & Hot in your genre is the first domino \u2014 it feeds into broader algorithmic recommendations and can cascade up to Top 50 over time.",
                            link: "https://help.soundcloud.com/hc/en-us/articles/115003570268-Charts",
                            sourceText: "SoundCloud Help \u2014 Charts"
                        },
                        {
                            heading: "The First 24-48 Hour Window",
                            body: "The most critical period for any SoundCloud release is the first 24\u201348 hours after upload. This is when the algorithm makes its initial assessment of your track:\n\n\u2022 Engagement velocity in this window determines whether you enter algorithmic circulation or get buried\n\u2022 The algorithm measures: plays per hour, repost rate, completion rate, comment activity, and like-to-play ratio\n\u2022 A sharp spike in the first 24 hours beats a slow climb over a week\n\u2022 This is why coordinating your repost chain, Promote campaign, and social push to all hit simultaneously on upload day is critical\n\u2022 After 48 hours, the algorithm\u2019s initial verdict is largely set \u2014 it\u2019s exponentially harder to recover a track that flatlined in its opening window",
                            link: "https://blog.soundcloud.com/2023/09/14/tips-for-releasing-music/",
                            sourceText: "SoundCloud Blog \u2014 Tips for Releasing Music"
                        },
                        {
                            heading: "The 3x Repost Multiplier",
                            body: "SoundCloud\u2019s algorithm applies a multiplier effect to repost chains. When your track gets reposted by an account, and that repost generates further reposts from that account\u2019s followers, the algorithm sees this as genuine viral behavior:\n\n\u2022 First-generation reposts: direct impact on your track\u2019s reach\n\u2022 Second-generation reposts (reposts of reposts): trigger a 3x algorithmic multiplier on visibility\n\u2022 This is why targeting accounts with engaged followers matters more than follower count alone\n\u2022 An account with 5,000 highly engaged followers who repost is more valuable than an account with 100,000 passive followers\n\u2022 The multiplier effect is strongest in the first 48 hours \u2014 after that window, the cascade potential diminishes"
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 4 — SELECTED & RECOMMENDED
                   Recommendation algorithm, small pool expansion, upload optimization
                   ───────────────────────────────────── */
                {
                    label: "Phase 4",
                    title: "Selected & Recommended",
                    icon: "\u2728",
                    steps: [
                        {
                            heading: "How the Recommendation Algorithm Works",
                            body: "SoundCloud\u2019s recommendation engine works on a small-pool-to-expansion model:\n\n1. INITIAL POOL \u2014 Your track is first shown to a small test audience based on your genre tags, follower base, and upload history. This is typically 100\u2013500 listeners.\n2. SIGNAL MEASUREMENT \u2014 The algorithm measures engagement from this test pool: completion rate, reposts, likes, comments, and time-spent-listening.\n3. EXPANSION \u2014 If signals are strong (high completion, reposts, engagement), the pool expands to 5x\u201310x the initial audience via \u201cMore of what you like\u201d and \u201cRelated Tracks\u201d surfaces.\n4. VIRAL LOOP \u2014 If the expanded pool also shows strong engagement, the track enters Buzzing playlists and New & Hot charts.\n\nThe key insight: your first 100\u2013500 listeners determine EVERYTHING. If they don\u2019t engage, the algorithm never expands your reach.",
                            link: "https://help.soundcloud.com/hc/en-us/articles/115003568748-Suggested-tracks",
                            sourceText: "SoundCloud Help \u2014 Suggested Tracks & Recommendations"
                        },
                        {
                            heading: "Upload Optimization for Maximum Discovery",
                            body: "Optimize every upload for algorithmic discovery:\n\n\u2022 TIMING \u2014 Upload on Tuesday or Wednesday between 10am\u201312pm EST. SoundCloud\u2019s editorial team reviews new uploads Mon\u2013Fri, and mid-week uploads get more editorial attention than weekend drops.\n\u2022 LOSSLESS AUDIO \u2014 Upload WAV or FLAC, not MP3. SoundCloud\u2019s transcoder produces better-quality streams from lossless source files, and higher audio quality correlates with higher completion rates.\n\u2022 METADATA \u2014 Complete every field: title, description (with keywords), genre, sub-genre, tags (including #SCFIRST), and custom artwork (minimum 800x800px). Tracks with complete metadata get an estimated 85% more algorithmic visibility than incomplete uploads.\n\u2022 DESCRIPTION \u2014 Include 2\u20133 sentences about the track plus relevant keywords. SoundCloud\u2019s search indexes your description.\n\u2022 ARTWORK \u2014 High-contrast, bold artwork performs better in the feed. It\u2019s the first thing a listener sees before they click play.",
                            link: "https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements",
                            sourceText: "SoundCloud Help \u2014 Uploading Requirements"
                        },
                        {
                            heading: "Profile Optimization for Algorithmic Trust",
                            body: "The algorithm gives preference to complete, active profiles:\n\n\u2022 Complete bio with relevant keywords and genre descriptors\n\u2022 Professional profile image and header/banner image\n\u2022 Links to your other socials (Instagram, Twitter, etc.) \u2014 signals legitimacy\n\u2022 Regular upload cadence \u2014 accounts that upload consistently get more algorithmic surface area\n\u2022 Engage with other artists: reposts, comments, and likes on others\u2019 tracks signal an active, legitimate account\n\u2022 Artist Pro or Next Pro subscription gives you access to advanced analytics and Promote, plus a Pro badge that builds trust with listeners\n\nPlays from accounts the algorithm trusts (complete profiles, active engagement history) are weighted more heavily than plays from empty or new accounts. This is a 175% increase in play value according to SoundCloud\u2019s internal documentation."
                        }
                    ]
                },

                /* ─────────────────────────────────────
                   PHASE 5 — REPOST CHAINS
                   RepostExchange (legit), Repost by SoundCloud (cautionary), The Commandments
                   ───────────────────────────────────── */
                {
                    label: "Phase 5",
                    title: "Repost Chains & The Commandments",
                    icon: "\ud83d\udd17",
                    steps: [
                        {
                            heading: "RepostExchange Strategy (Legitimate Growth)",
                            body: "RepostExchange is the most established legitimate repost trading platform for SoundCloud. Here\u2019s how to use it effectively:\n\n\u2022 Build credits in advance \u2014 start earning credits 2\u20133 weeks before your release by reposting others\u2019 tracks\n\u2022 Set your campaign to launch at upload time \u2014 concentrate all repost credits into the first 24\u201348 hours\n\u2022 Target accounts in your genre with 1K\u201310K followers \u2014 these have the best engagement rates\n\u2022 Set minimum follower requirements for accounts that repost you \u2014 quality over quantity\n\u2022 Combine with your own organic push: personal social media posts, DM outreach to friends/fans, and Promote campaign\n\nThe goal is to create a coordinated repost burst that looks organic to the algorithm. 50\u2013100 reposts in the first 24 hours from genre-relevant accounts is a strong target.",
                            link: "https://www.repostexchange.com/",
                            sourceText: "RepostExchange \u2014 Platform"
                        },
                        {
                            heading: "Repost by SoundCloud (Cautionary Note)",
                            body: "\u201cRepost by SoundCloud\u201d is a paid distribution and promotion service (formerly Repost Network, acquired by SoundCloud). It\u2019s different from the free repost feature:\n\n\u2022 It\u2019s a distribution service that gets your music on Spotify, Apple Music, etc. while also promoting on SoundCloud\n\u2022 They take a revenue split (typically 80/20 in your favor)\n\u2022 They offer promotional placement on SoundCloud\u2019s own channels and playlists\n\u2022 CAUTION: Some artists report that the promotional impact doesn\u2019t justify the revenue split. If you already have distribution through DistroKid, TuneCore, or similar, you may not need this.\n\u2022 The SoundCloud-specific promotion (playlist features, channel reposts) CAN be valuable if you\u2019re focused on SoundCloud as your primary platform\n\u2022 Evaluate based on your situation: if SoundCloud is your #1 platform and you don\u2019t have distribution yet, it\u2019s a reasonable all-in-one option",
                            link: "https://www.repostnetwork.com/",
                            sourceText: "Repost by SoundCloud \u2014 Distribution & Promotion"
                        },
                        {
                            heading: "The SoundCloud Commandments",
                            body: "10 rules for SoundCloud growth, distilled from everything above:\n\n1. Upload lossless (WAV/FLAC) \u2014 never MP3\n2. Tag #SCFIRST on every platform-first release\n3. Complete ALL metadata fields \u2014 85% more visibility\n4. Upload Tue/Wed 10am\u201312pm EST for editorial visibility\n5. Coordinate repost chains in the first 48 hours\n6. Target completion rate above 50% \u2014 below 30% kills you\n7. Use RepostExchange strategically \u2014 concentrated bursts, not slow drips\n8. Optimize your profile for algorithmic trust (bio, artwork, links, activity)\n9. New & Hot is your entry point \u2014 Top 50 comes after\n10. The first 48 hours decide everything \u2014 front-load all promotion"
                        }
                    ]
                }
            ],
            benchmarks: [
                { value: "48hrs", label: "Critical Window", source: "The first 48 hours post-upload determine whether SoundCloud\u2019s algorithm promotes or buries your track" },
                { value: "3x", label: "Repost Multiplier", source: "Second-generation reposts (reposts of reposts) trigger a 3x algorithmic visibility multiplier" },
                { value: "85%", label: "Metadata Boost", source: "Tracks with complete metadata get an estimated 85% more algorithmic visibility" },
                { value: "175%", label: "Play Increase", source: "Plays from trusted, complete profiles are weighted 175% more by the algorithm" }
            ],
            reminders: [
                "Upload lossless audio (WAV or FLAC) \u2014 never MP3",
                "Tag every platform-first release with #SCFIRST",
                "Match genre tags accurately to your sound",
                "Upload Tuesday or Wednesday 10am\u201312pm EST",
                "Complete profile optimization (bio, artwork, links, Pro badge)"
            ]
        }
    }
};
