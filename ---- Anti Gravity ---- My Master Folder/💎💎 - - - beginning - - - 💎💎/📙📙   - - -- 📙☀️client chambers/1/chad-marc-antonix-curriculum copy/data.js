/* ══════════════════════════════════════════════════════════════
   MARC ANTONIX — CURRICULUM DATA (V2)
   4 Tile Types: Presentation, Website Engine, Sales Proposal, Research
   ══════════════════════════════════════════════════════════════ */

const curriculumData = {

    home: {
        artistName: "Marc Antonix",
        heroTitle: "Your 4-Star Curriculum",
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
        }
    }
};
