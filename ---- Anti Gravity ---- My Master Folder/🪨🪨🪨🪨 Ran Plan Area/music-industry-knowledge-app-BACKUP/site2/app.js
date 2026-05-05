// ============================================================
// Music Industry Knowledge App — Site 2
// SPA Router + Category Renderer + Parallax + Bar Chart
// ============================================================

const MUSIC_DATA = {
  categories: [
    {
      id: 1,
      title: "Streaming",
      summary: "Streaming platforms distribute royalties via a pro-rata market-share model where your percentage of total platform streams determines your cut of the royalty pool. Payouts flow from the DSP to the label or distributor, then to the artist according to their contract. Fraud detection has become a major priority, with Apple Music removing 2 billion fraudulent streams in 2025 alone.",
      keyFacts: [
        "Spotify pays approximately $0.003–$0.004 per stream; Apple Music pays roughly double at $0.006–$0.008. Amazon Music leads at ~$0.0088. These are per-stream averages, not guarantees.",
        "The market-share payment system (MSPS) is the dominant model: platform pools all subscription + ad revenue, then distributes based on each artist's share of total streams in that period.",
        "A track must hit at least 1,000 streams in a 12-month period to generate any royalties on Spotify. Below this threshold, earnings are pooled and distributed to popular artists.",
        "A stream is counted after 30 seconds of playback. Premium subscriber streams generate more royalty value than ad-supported streams due to higher revenue per user.",
        "Apple Music flagged and demonetized 2 billion fraudulent streams in 2025. Spotify removed over 75 million AI-generated tracks in 2025. Penalties include royalty clawback and track removal.",
        "Royalty waterfall: DSP pays rights holder (label/distributor) → distributor takes its cut (flat fee or up to 20%) → label keeps 64–80% → artist receives 16–25% of the label's cut in traditional deals, or 80–100% as an independent."
      ],
      standardPractice: "Streaming platforms collect subscription fees and ad revenue, then distribute approximately 65–70% of that total as royalties. The DSP does not pay artists directly — it pays the rights holder, which is either a record label (for signed artists) or a distributor (for independent artists). For recorded music, the label historically retains the master rights and receives the full master royalty share, paying the artist their negotiated rate (commonly 15–25% under a traditional deal). Independent artists who own their masters receive the entire label share minus the distributor's fee. A second royalty stream — mechanical royalties for the underlying composition — is paid separately through the Mechanical Licensing Collective (MLC) in the US, which collects from DSPs monthly and has distributed over $3 billion since founding. Fraud detection has matured significantly: platforms use IP monitoring, stream-velocity analysis, and AI-fingerprinting to flag manipulation.",
      commonMistakes: [
        "Expecting a fixed per-stream rate — the actual rate fluctuates every month based on the total size of the royalty pool and total platform streams during that period.",
        "Ignoring mechanical royalties: independent artists who haven't registered with the MLC or a publishing administrator are leaving 15–25% of their total streaming income uncollected.",
        "Using stream-farming or bot services to inflate numbers — platforms now detect this within days, and the financial and reputational penalties far outweigh any short-term gain.",
        "Not tracking streams across territories — streams from the US, UK, and Western Europe generate significantly higher per-stream rates than streams from developing markets.",
        "Assuming 1 million streams equals a fixed dollar amount — income depends on where listeners are located, whether they're on free or premium tiers, and the platform mix."
      ],
      sources: [
        { type: "community", name: "Artistrack — Streaming Royalties Explained 2026", url: "https://artistrack.com/streaming-royalties-explained-2026/" },
        { type: "industry", name: "Billboard Pro — Music Streaming Royalty Payments Explained", url: "https://www.billboard.com/pro/music-streaming-royalty-payments-explained-song-profits/" },
        { type: "academic", name: "Music Ally — Apple demonetised 2 billion fraudulent streams in 2025", url: "https://musically.com/2026/02/03/apple-says-it-demonetised-2bn-fraudulent-music-streams-in-2025/" }
      ]
    },
    {
      id: 2,
      title: "Social Media",
      summary: "TikTok, Instagram Reels, and YouTube Shorts each run distinct algorithms that reward different behaviors, but all three prioritize watch-time, completion rate, and engagement velocity over raw follower count. For artists, TikTok remains the dominant discovery engine — 84% of songs entering the Billboard Global 200 in 2024 went viral there first.",
      keyFacts: [
        "TikTok-correlated artists see an average 11% week-over-week streaming growth rate compared to 3% for non-TikTok artists (2024 data). 84% of songs entering the Billboard Global 200 in 2024 first went viral on TikTok.",
        "TikTok's algorithm surfaces content to non-followers aggressively through the For You Page (FYP), making it the highest-leverage discovery platform for emerging artists.",
        "Instagram Reels algorithm weighs original audio creation, cross-posting behavior, and follower engagement history. IG benefits artists with an existing engaged fanbase more than it does for cold discovery.",
        "YouTube Shorts favors content that drives viewers to long-form video. Artists who use Shorts as a funnel to official videos see the highest subscriber conversion.",
        "Optimal posting cadence (2025): TikTok 1–3x/day or minimum 5x/week; Instagram Reels 3–5x/week; YouTube Shorts 3–5x/week. Consistency matters more than volume.",
        "Meta music ads typically cost $0.01–$0.05 per 3-second video view; pre-save campaign CPAs range $0.50–$4.00 depending on audience targeting quality."
      ],
      standardPractice: "The current social media ecosystem rewards artists who commit to a platform-native content strategy rather than repurposing one piece of content universally. Each platform has a distinct content contract: TikTok = entertainment and authenticity, IG = aesthetic and aspiration, YouTube = depth and story. Successful artists typically anchor on TikTok for discovery, use Instagram for community nurturing and announcements, and YouTube for long-form catalog building. A hybrid strategy is now standard practice: build organic momentum first (genuine reaction videos, BTS, lyric hooks), then amplify top-performing organic posts with paid Spark Ads or Meta boosting. Release content tied to your music should appear as a slow drip over 4–8 weeks, not a single dump on release day.",
      commonMistakes: [
        "Cross-posting identical content to all platforms simultaneously — TikTok watermarked videos are suppressed by Instagram and YouTube algorithms.",
        "Treating social media as a megaphone rather than a conversation — artists who only post promotional content without engaging with comments, duets, or stitches see lower algorithmic reach.",
        "Chasing virality with random trending sounds that have no connection to the artist's brand — viral moments without brand coherence don't convert to followers or streams.",
        "Posting inconsistently — taking weeks off resets algorithmic momentum and reduces the platform's willingness to surface content to new audiences.",
        "Ignoring analytics — not checking watch-time drop-off points, best-performing hooks, and audience retention data leaves the most actionable growth signal unused."
      ],
      sources: [
        { type: "community", name: "Music Marketing Monday — Why Organic Social Media Content Matters", url: "https://www.musicmarketingmonday.com/p/why-organic-social-media-content-matters-for-music-artists" },
        { type: "industry", name: "Music Ally — Music Marketing Strategies for 2026", url: "https://musically.com/2025/11/18/music-marketing-strategies-for-2026-eight-key-takeaways/" },
        { type: "academic", name: "Berklee Online — Music Marketing: 5 Practical Strategies", url: "https://www.berklee.edu/berklee-now/news/music-marketing-strategies" }
      ]
    },
    {
      id: 3,
      title: "How Royalties Work",
      summary: "Music generates two distinct copyright royalty tracks: master royalties (for the sound recording) and publishing royalties (for the underlying composition). These two tracks flow through completely separate collection pipelines. Most artists unknowingly leave publishing royalties uncollected because they haven't properly registered with a PRO and a mechanical rights organization.",
      keyFacts: [
        "Master rights: owned by whoever financed or owns the sound recording — typically the label in a signed deal, or the artist themselves if independent. Master royalties flow from DSPs → label/distributor → artist.",
        "Publishing rights: owned by the songwriter(s) and their publisher. Every publishing royalty splits 50/50 between writer's share and publisher's share by default in most territories.",
        "Performance royalties are collected by PROs (ASCAP, BMI, SESAC in the US; PRS in the UK; SOCAN in Canada) whenever music is broadcast publicly — radio, TV, streaming, restaurants, venues.",
        "Mechanical royalties are generated every time a song is reproduced — physical sales and on-demand digital streams. In the US, the MLC collects mechanical royalties from DSPs and distributes to publishers monthly.",
        "Sync royalties are a one-time negotiated fee paid when a song is licensed for visual media. Both master and publishing sides must be cleared separately — two separate fees.",
        "The US statutory mechanical rate for streaming is approximately 15.35% of service revenue in 2023–2027 per CRB Phonorecords IV ruling."
      ],
      standardPractice: "Understanding royalties requires tracking two parallel money flows. The master side: DSPs pay the master rights holder (label or distributor) the recording royalty, which the label then splits with the artist per their deal. The publishing side: DSPs separately remit mechanical royalties to the MLC in the US; PROs collect performance royalties from broadcasters and public venues. A songwriter must register with a PRO AND with a publishing administrator (or the MLC directly) to capture both streams. Without PRO registration, performance royalties from radio and streaming sit uncollected. Songtrust, TuneCore Publishing, and DistroKid's publishing add-on are common admin services for independent artists, taking 10–25% to handle global registration and collection. For any co-written song, royalty splits must be documented in a split sheet before release.",
      commonMistakes: [
        "Not registering with a PRO (ASCAP or BMI in the US) before releasing music — performance royalties accumulate from the moment a song goes live, but can't be paid to an unregistered writer.",
        "Conflating master royalties and publishing royalties — they are completely separate rights, collected by separate entities, on separate timelines.",
        "Not filing a split sheet when co-writing — informal agreements about splits are extremely difficult to enforce legally once the song generates money.",
        "Ignoring the MLC — millions of dollars in unclaimed mechanical royalties sit in the MLC's unmatched pool annually.",
        "Assuming a publishing admin handles everything a publisher does — an admin collects and registers; a full publisher also pitches songs for sync and co-writes."
      ],
      sources: [
        { type: "community", name: "Songtrust Blog — Mechanical vs. Performance Royalties Explained", url: "https://blog.songtrust.com/mechanical-vs-performance-royalties" },
        { type: "industry", name: "Royalty Exchange — Understanding Music Royalty Types 2025", url: "https://royaltyexchange.com/blog/understanding-music-royalty-types-a-beginners-guide-2025" },
        { type: "academic", name: "US Copyright Office — The Music Modernization Act and CRB Rate-Setting", url: "https://www.copyright.gov/music-modernization/" }
      ]
    },
    {
      id: 4,
      title: "Sync / Music Licensing",
      summary: "Sync licensing is the process of licensing a song for use alongside visual media — film, TV, ads, games, and digital content — in exchange for an upfront placement fee. The sync market hit $650 million in trade revenue in 2024. Music supervisors are the primary gatekeepers, and they overwhelmingly prefer one-stop clearance tracks where a single party controls both master and publishing rights.",
      keyFacts: [
        "Sync licensing revenue hit $650 million in trade revenue in 2024 (up 7.4% YoY). The broader music licensing ecosystem is projected to reach $12.9 billion by 2033.",
        "Pricing tiers: indie/student projects $250–$5,000; mid-tier TV placements $5,000–$30,000; network TV and major film $20,000–$150,000+; major brand campaigns $50,000–$500,000+. Fees apply to each side (master + publishing) separately.",
        "70% of sync deals in 2024 went through sync libraries and agencies; 30% were direct-to-brand or direct-to-supervisor. Sync libraries are the most common path to placement.",
        "Music supervisors prefer 'one-stop' tracks — where a single artist or entity controls both master and publishing. Split-ownership tracks are frequently passed over on tight deadlines.",
        "Technical requirements: broadcast-quality mix and master, instrumental versions of every vocal track, organized metadata (tempo, key, mood, instrumentation tags), and stems available for editing.",
        "AI-powered music search tools are now standard in the supervisor workflow, scanning libraries by mood, tempo, and instrumentation. Accurate metadata is a direct commercial asset."
      ],
      standardPractice: "Getting music placed in sync involves three main channels: (1) direct submission to music supervisors (rarely accepted cold), (2) licensing through a sync library or agency (most accessible for independents), and (3) direct-to-brand pitching. Supervisors evaluate tracks against a creative brief — they're matching music to picture, not picking favorites. Key evaluation criteria: mood alignment, lyrical appropriateness, production quality, clearance speed, and price. Independent artists have a structural advantage because they typically own both masters and publishing outright, enabling one-stop clearance. Artists looking to break into sync should build a pitch-ready catalog (every song has stems and an instrumental) and ensure metadata is complete.",
      commonMistakes: [
        "Submitting music to a supervisor without both a vocal and an instrumental version — many placements require the instrumental because the song will sit under dialogue.",
        "Not understanding split clearance — if you co-wrote the song with someone who controls publishing through a different company, a supervisor must contact two parties, which often kills the deal.",
        "Ignoring metadata — supervisors and their AI search tools rely on accurate mood, genre, tempo, and instrumentation tags. Tracks without complete metadata are effectively invisible.",
        "Setting prices too high as an unknown artist — supervisors work within budgets, and an unknown artist demanding major-artist fees will be passed over immediately.",
        "Submitting unsolicited music directly to supervisors without an agent or library relationship — supervisors rarely open cold submissions."
      ],
      sources: [
        { type: "community", name: "Sync Songwriter — What is Sync Licensing and What Do Music Supervisors Do", url: "https://syncsongwriter.com/what-is-sync-licensing" },
        { type: "industry", name: "ThatPitch — Sync License Cost Guide 2025", url: "https://thatpitch.com/blog/sync-license-cost/" },
        { type: "academic", name: "Music Gateway — Sync Licensing in 2026: Market Data and Projections", url: "https://www.musicgateway.com/blog/sync-licensing/sync-licensing-in-2026-your-golden-ticket-to-actually-getting-paid-and-heard" }
      ]
    },
    {
      id: 5,
      title: "Music Distribution",
      summary: "Music distributors are the pipeline between artists and digital streaming platforms — they handle DSP delivery, metadata formatting, content ID, royalty collection, and publishing administration. The four dominant independent distributors in 2025 are DistroKid, TuneCore, CD Baby, and UnitedMasters, each using different pricing models. Choosing the wrong distributor model at the wrong career stage is one of the most common costly mistakes emerging artists make.",
      keyFacts: [
        "DistroKid: $24.99/year for unlimited releases, artist keeps 100% of royalties. Offers built-in royalty splits between collaborators. Best for high-volume releasing artists.",
        "TuneCore: $14.99–$49.99/year (tiered plans) for unlimited releases, artist keeps 100%. Optional publishing admin add-on available. Strong for artists who also need publishing administration.",
        "CD Baby: $9.99 per single, $29 per album (one-time fee). Takes a 9% commission on streaming royalties. Best for artists releasing infrequently who want set-it-and-forget-it.",
        "UnitedMasters: Free tier takes 10% of earnings; Select tier costs $5/month and keeps 100%. Brand deal marketplace connecting artists directly to brand partnership opportunities.",
        "DSP delivery pipeline: artist uploads WAV/FLAC + 3000x3000px artwork + metadata → distributor validates → distributor delivers to each DSP → DSP publishes. Typical lead time: 1–7 business days.",
        "Royalty collection via distributors covers master recording royalties only. Publishing/mechanical royalties require a separate publishing admin or MLC registration."
      ],
      standardPractice: "The DSP delivery pipeline begins when an artist submits their track through a distributor's portal. The distributor checks audio quality, validates metadata (ISRC code, UPC barcode, artist name, songwriter credits), and ingests content into each DSP's system. Once live, the DSP collects stream data, calculates royalties, and remits payment to the distributor monthly (with a 2–3 month payment lag). The distributor then forwards earnings to the artist, minus their fee. Independent artists should also register ISRCs for every track — ISRCs are the tracking codes that follow a recording across all platforms and are essential for royalty matching. Artists with a high and growing release volume benefit most from flat annual-fee models. Artists releasing one or two projects per year may find CD Baby's per-project model more cost-effective.",
      commonMistakes: [
        "Not registering ISRCs before distribution — without ISRCs, streaming plays may not be accurately tracked, resulting in missed or mis-attributed royalties.",
        "Using the same distributor account for both personal and collaborative releases without setting up proper royalty splits — this creates payout disputes.",
        "Choosing a revenue-share distributor as a high-volume indie artist — paying 15–30% of all streaming income indefinitely costs far more than a $25/year flat-fee subscription.",
        "Not enrolling in the distributor's publishing admin add-on — mechanical royalties from streams go uncollected without this.",
        "Submitting incorrect or incomplete metadata — artist name misspellings, missing songwriter credits, or wrong release dates cause DSP delivery delays and royalty matching failures."
      ],
      sources: [
        { type: "community", name: "Aristake — DistroKid vs. TuneCore vs. CD Baby vs. Others 2026", url: "https://aristake.com/digital-distribution-comparison/" },
        { type: "industry", name: "Symphonic Blog — Best Music Distribution Services in 2025", url: "https://symphonic.com/best-music-distribution-services/" },
        { type: "academic", name: "UnitedMasters — Platform Comparison and Revenue Model Analysis", url: "https://unitedmasters.com/en/unitedmasters-vs-distrokid" }
      ]
    },
    {
      id: 6,
      title: "Music Publishing",
      summary: "Music publishing is the business of managing, licensing, and monetizing the underlying composition of a song — separate from the sound recording. A publisher registers your works globally, collects all publishing royalties, pitches songs for licensing opportunities, and polices unauthorized use. There are three main deal types: admin deals, co-publishing deals, and full publishing deals.",
      keyFacts: [
        "Publishing royalties split 50/50 between the writer's share (always goes to the songwriter directly via their PRO) and the publisher's share (goes to the publisher, who pays the songwriter per their deal).",
        "Admin publishing deals: songwriter retains 100% copyright ownership. Publisher administers collection globally and takes 10–25% commission during the deal term only.",
        "Co-publishing deals: songwriter assigns 50% of their copyright to the publisher. Publisher collects its percentage from all songs created during the deal term — often for the life of the copyright (70+ years after death).",
        "Full publishing deals: publisher owns 100% of the copyright. Songwriter typically receives a larger advance. Songwriter still receives writer's share royalties through their PRO.",
        "Global collection: publishers register songs through sub-publishers in every major territory. Sub-publisher fees typically range 15–20% of the foreign income collected.",
        "The MLC in the US and equivalent bodies globally (MCPS in UK, GEMA in Germany, JASRAC in Japan) administer mechanical royalties for streaming and physical reproduction."
      ],
      standardPractice: "For independent artists who write their own songs, the minimum viable publishing setup is: (1) register with a PRO (ASCAP or BMI in the US), (2) sign up with a publishing administrator (Songtrust, TuneCore Publishing, DistroKid Songwriting add-on) to handle global collection and MLC registration, and (3) register every released song with your PRO and publishing admin before or immediately upon release. For artists signed to labels or with significant songwriting catalogs, co-publishing deals are the industry norm. The key negotiating points in a co-pub deal are: the size of the advance, the reversion clause, and whether previously recorded material is included. Most successful independent artists start with an admin deal and transition to a co-publishing deal once their catalog generates enough income.",
      commonMistakes: [
        "Skipping PRO registration — performance royalties from radio, streaming, and public performance accumulate from day one but are only payable to registered writers.",
        "Signing a full publishing deal without understanding that the publisher may own the copyright for 70+ years after your death — this is an irreversible decision without a strong reversion clause.",
        "Not distinguishing between a publishing admin and a full publisher — an admin collects royalties; a publisher also pitches songs, invests in development, and takes ownership.",
        "Not including co-writers in PRO registration — if you co-wrote a song, all writers must be registered with their respective PROs or royalties for their share won't flow.",
        "Allowing a label to acquire publishing rights as part of a recording deal without negotiating them separately — recording rights and publishing rights should be negotiated and valued independently."
      ],
      sources: [
        { type: "community", name: "ASCAP — Understanding Co-Publishing and Admin Deals", url: "https://www.ascap.com/help/career-development/whats-the-deal-michael-eames-pen-music" },
        { type: "industry", name: "ONErpm Blog — Understanding Music Publishing Deals", url: "https://blog.onerpm.com/onepublishing/understanding-music-publishing-deals/" },
        { type: "academic", name: "AC Freedman Law — Co-Publishing Deals vs. Publishing Administration Deals", url: "https://acfreedmanlaw.com/understanding-music-publishing-the-differences-between-co-publishing-deals-vs-publishing-administration-deals/" }
      ]
    },
    {
      id: 7,
      title: "Record Labels (Major vs Indie)",
      summary: "Record labels fund recording, manufacturing, marketing, and distribution in exchange for a share of an artist's revenue and often ownership of the master recording. The three major labels (Universal, Sony, Warner) control approximately 70% of global recorded music revenue. Deal structures have evolved from traditional ownership deals to 360 deals, licensing deals, and joint ventures.",
      keyFacts: [
        "Traditional recording deal: label owns the master recording, advances recording costs against future royalties, and pays the artist 10–20% of revenue as a royalty rate. The artist recoups the advance before seeing any royalty income.",
        "360 deal: label takes a percentage (typically 15–25%) of all artist revenue streams — touring, merch, brand deals, publishing — in addition to recording royalties. Became standard at major labels in the 2010s.",
        "Licensing deal: artist retains master ownership and licenses the recording to the label for a fixed term (e.g., 5–7 years). At the end of the term, masters revert to the artist.",
        "Joint venture (JV) deal: label funds all recording and marketing costs, keeps a running ledger of expenses, and after recoupment, profits are split 50/50 with the artist.",
        "Major label royalty range: 10–20% of revenue. Indie label royalty range: typically 50–70% of net revenue. Independent distributors return 100% to the artist for a flat fee.",
        "What major labels provide that independents typically can't: $500K+ marketing budgets for priority releases, terrestrial radio promotion infrastructure, and international promotional staff."
      ],
      standardPractice: "In 2025, the strategic calculus of signing to a label vs. staying independent has shifted significantly. Artists with proven streaming traction, social media audiences, and touring revenue increasingly negotiate from a position of leverage, securing licensing deals rather than traditional ownership deals. The major labels' core value proposition is no longer distribution or recording — it is marketing capital, radio access, and industry relationships. A label deal makes most sense for artists who need $200K+ in marketing spend. The trade-off is giving up master ownership (potentially permanently) and accepting a low royalty rate during recoupment. The joint venture model is the most equitable traditional deal structure. Artists should always have an entertainment attorney review any label deal.",
      commonMistakes: [
        "Signing a 360 deal that captures touring and merch income — these revenue streams are the only guaranteed money for most artists, and giving away 15–25% of them to a label is often financially devastating.",
        "Not understanding recoupment — labels recoup their advance AND recording costs AND sometimes marketing costs before the artist sees any royalty income.",
        "Conflating 'advances' with 'salary' — label advances are loans against future royalties. Every dollar of the advance must be earned back before royalties are paid.",
        "Ignoring the option clause — most label deals include options giving the label the right to sign subsequent albums at their discretion, potentially locking an artist in for 6–8 albums.",
        "Not negotiating a reversion clause — if the label doesn't promote or release an album within a set timeframe, the rights should revert to the artist."
      ],
      sources: [
        { type: "community", name: "DJBooth — 9 Most Common Types of Record Deals Explained", url: "https://djbooth.net/features/2021-08-04-different-types-of-record-deals-explains-amuse/" },
        { type: "industry", name: "Dahrk Wi Dahhrk — 360 Deals Explained: Major vs Indie Labels", url: "https://dahrkwidahhrk.com/indie-vs-major-labels/360-deals-explained-how-they-differ-on-major-labels-vs-indie-labels/" },
        { type: "academic", name: "Orphiq — Record Deals and Music Contracts Explained", url: "https://orphiq.com/resources/record-deals-explained" }
      ]
    },
    {
      id: 8,
      title: "Artist Management",
      summary: "An artist manager is the primary business advisor and career architect for a musician — handling strategy, deal negotiations, team coordination, and opportunity vetting. Managers typically earn 15–20% commission on an artist's gross income across all revenue streams. The right time to bring on a manager is when business demands are actively competing with creative output.",
      keyFacts: [
        "Standard commission rate: 15–20% of gross income. Established managers with strong track records may command 20–25%. Some managers work on net income (after deducted expenses), which is significantly more favorable for the artist.",
        "Commissionable income typically includes: recording royalties, streaming income, touring and live show revenue, merchandise profits, endorsements and brand deals, publishing advances, and sync licensing fees.",
        "Management contract term: typically 1–3 years with options for renewal. The initial term is a trial period — both parties are evaluating fit.",
        "Sunset clause: a standard contractual provision that gradually reduces the manager's commission percentage on deals made during their tenure after the contract ends — typically declining to zero over 3–5 years post-term.",
        "The manager's role: career strategy, contract negotiation, team building (booking agent, publicist, attorney), opportunity evaluation, label and publisher relationship management, and day-to-day problem solving.",
        "When to get a manager: when you're consistently receiving more opportunities than you can evaluate alone; when contract negotiations require business expertise; when you're generating enough income that 15–20% commission is affordable."
      ],
      standardPractice: "Most successful management relationships begin informally — a trusted person from the artist's existing network starts managing before either party formalizes the arrangement. A formal management agreement should specify: commission rate and calculation method (gross vs. net), the scope of commissionable income, the contract term and renewal conditions, the sunset clause structure, and the process for dispute resolution. Artists should never sign a management deal without having an entertainment attorney review it. The most important quality in a manager is not industry connections but genuine belief in the artist's vision, strategic clarity, and communication discipline. An artist with a bad manager is statistically worse off than an artist managing themselves.",
      commonMistakes: [
        "Signing a management deal too early — before you have consistent income, a body of work, and clear career direction, giving up 15–20% of gross income provides limited ROI.",
        "Not including a sunset clause — without one, a former manager continues collecting full commission on deals they made during their tenure indefinitely, sometimes for decades.",
        "Confusing a manager's role with a booking agent's — managers are career strategists; booking agents are licensed to negotiate and book live shows. These are separate roles.",
        "Choosing a manager based on connections alone — a well-connected manager who doesn't believe in your music or communicate well will underperform a less-connected manager who is fully invested.",
        "Not specifying what counts as 'gross income' in the contract — a vague commission clause can lead to disputes about whether touring expenses, production costs, or co-writer splits are deducted first."
      ],
      sources: [
        { type: "community", name: "Artist.tools — Artist Management Contract Template and Guide", url: "https://www.artist.tools/post/artist-management-contract-template-and-guide" },
        { type: "industry", name: "Stagent — How to Manage an Artist in 2025: The Complete Guide", url: "https://stagent.com/blog/how-to-manage-an-artist" },
        { type: "academic", name: "Cordero Law Group — Artist Management Contracts: Your Ultimate Guide (2025)", url: "https://www.corderolawgroup.com/blog/2025/artist-management-contracts" }
      ]
    },
    {
      id: 9,
      title: "Artist Branding",
      summary: "Artist branding is the deliberate construction of a consistent identity system — visual, sonic, behavioral, and narrative — that creates instant recognition and emotional gravity for fans. Academic research on parasocial relationships demonstrates that fans develop genuine one-sided emotional connections with artists that parallel real friendships. The most durable artist brands are built on authentic identity architecture, not manufactured aesthetics.",
      keyFacts: [
        "Parasocial relationships: fans develop deep one-sided emotional bonds with artists through consistent storytelling, emotional disclosure, and perceived intimacy — activating the same neurological systems as real friendships.",
        "Visual consistency is the fastest trust signal — humans process images 60,000x faster than text, and consistent visual identity allows fans to instantly recognize an artist's content without reading any text.",
        "Identity architecture has three layers: (1) Core Identity — who the artist fundamentally is; (2) Expressed Identity — visual, sonic, and stylistic choices; (3) Perceived Identity — how fans actually interpret the brand.",
        "Superfan theory: music brands generate disproportionate revenue from a small segment of devoted fans (the top 1–5%) who buy everything, attend every show, and evangelize to new audiences.",
        "Platform-native branding: TikTok rewards vulnerable authenticity; Instagram rewards aesthetic curation; YouTube rewards narrative depth. Successful artists modulate expression without contradicting their core identity.",
        "Research from Portland State University found that fan-artist parasocial relationships are strengthened by: perceived authenticity, emotional disclosure, consistent communication cadence, and a sense of 'knowing' the artist beyond their music."
      ],
      standardPractice: "Building a durable artist brand begins with identity excavation — articulating the core truth of who you are as an artist before designing any visuals. From this foundation, a visual identity system is built: a signature color palette (2–3 primary colors), consistent typography, a photographic style, and an iconographic language that appears across all touchpoints. The visual system should be codified in a simple style guide so every piece of content is recognizably connected. Parasocial depth is built through consistent emotional disclosure: sharing process, vulnerability, behind-the-scenes moments, and opinions — not just polished promotional content. Brand consistency is the compound interest of the music business — it builds slowly but the cumulative effect of recognizable identity over years is what separates enduring artists from one-hit phenomena.",
      commonMistakes: [
        "Designing branding before defining identity — visual choices made without a clear core identity feel arbitrary and shift constantly, preventing the consistency that builds recognition.",
        "Chasing aesthetics of successful artists rather than excavating a genuine self — fans can sense inauthenticity, and imitative brands fail to generate the parasocial bonds that drive superfan loyalty.",
        "Treating branding as a one-time task rather than a living system — branding requires ongoing maintenance, evolution, and application across every new piece of content.",
        "Neglecting the non-music content layer — artists who only post music-related content miss the opportunity to build parasocial depth.",
        "Inconsistency across platforms — using different photos, bios, color schemes, or tones on different platforms signals a fragmented identity."
      ],
      sources: [
        { type: "community", name: "Daimoon Media — Music Branding Psychology: How Fans Become Superfans", url: "https://daimoon.media/knowledge/music-branding-psychology-superfans/" },
        { type: "industry", name: "Music Ally — Music Marketing Strategies for 2026", url: "https://musically.com/2025/11/18/music-marketing-strategies-for-2026-eight-key-takeaways/" },
        { type: "academic", name: "Portland State University Honors Thesis — Examining Parasocial Relationships Between Fans and Music Artists", url: "https://pdxscholar.library.pdx.edu/cgi/viewcontent.cgi?article=2371&context=honorstheses" }
      ]
    },
    {
      id: 10,
      title: "Music Marketing & Campaigns",
      summary: "A music marketing campaign is a structured timeline of content, advertising, and outreach designed to build awareness and drive listening behavior around a release. Best-practice campaigns begin 4–8 weeks before release and continue 4+ weeks post-release. DSP editorial strategy (pitching for playlists) is a parallel track that must begin at least 28 days before release day.",
      keyFacts: [
        "Pre-release phase (4–8 weeks before release): build anticipation through content teasing, pre-save campaigns, press pitching, and playlist pitching. Pre-save campaigns typically convert at $0.50–$4.00 cost-per-pre-save.",
        "Release day: coordinate content drop across all platforms simultaneously, push email list, post across socials. Spotify's algorithm weighs first-day and first-week engagement heavily for editorial playlist consideration.",
        "Post-release phase (4+ weeks): sustain momentum with reaction content, cover versions, user-generated content campaigns, paid amplification of best-performing organic posts.",
        "Spotify pitch deadline: 7 days minimum before release date for editorial playlist consideration (accessed via Spotify for Artists). Best practice is 28 days for maximum consideration window.",
        "Ad spend benchmarks: Meta/Instagram video ads for music typically run at $5–$50/day for independent artists. A $500–$1,000 total ad budget for an independent release is a standard starting point.",
        "Channel diversification in 2025: top artists and labels are adding Connected TV (CTV), out-of-home digital, programmatic display, and podcast sponsorships alongside social media."
      ],
      standardPractice: "A standard music marketing campaign in 2025 follows a pre-release → release → post-release structure. During the pre-release phase, the artist creates a content calendar, establishes a pre-save link, pitches to editorial playlists, sends press pitches to blogs and media outlets, and warms up ad audiences by running engagement campaigns. On release day, all assets go live simultaneously. Immediately post-release, the focus shifts to monitoring and amplifying: identify which pieces of content are getting organic traction and put paid spend behind them, encourage user-generated content, and pitch the song to secondary blog outlets. Key metrics to track: playlist add rate, save rate (high save rate is a strong signal of genuine fanbase engagement), share rate, follower growth, and cost-per-stream.",
      commonMistakes: [
        "Releasing music without a pre-release buildup — dropping a song with no context or anticipation period fails to capitalize on the algorithm's preference for releases with pre-save and engagement momentum.",
        "Missing the Spotify editorial pitch window — pitching after the release date guarantees the song will not be considered for Spotify editorial playlists for that release cycle.",
        "Running ads directly to streaming links — most music ad campaigns perform better driving to social content, pre-save pages, or YouTube videos than directly to Spotify.",
        "Spending the entire marketing budget on release week and then going dark — sustainable campaigns require post-release investment to sustain playlist positions.",
        "Not building an email list — email converts at 5–10x the rate of social media for direct fan communication and is the only audience channel the artist fully owns."
      ],
      sources: [
        { type: "community", name: "Gupta Media — How to Market Your Music in 2025", url: "https://www.guptamedia.com/music-marketing" },
        { type: "industry", name: "Symphonic Blog — What Makes a Smart Music Release Strategy in 2025", url: "https://blog.symphonic.com/2025/06/17/what-makes-a-smart-music-release-strategy-in-2025-2/" },
        { type: "academic", name: "Amber Horsburgh — 23 Metrics That Matter for Artist Marketing", url: "https://amberhorsburgh.medium.com/23-metrics-that-matter-229cfba81440" }
      ]
    },
    {
      id: 11,
      title: "Playlist Pitching",
      summary: "Playlist pitching is the process of submitting unreleased music to playlist curators at DSPs and independent playlist operators in hopes of getting featured. Spotify is the only major DSP with a self-serve editorial pitch tool. Independent playlist curators represent a large secondary ecosystem that is often more accessible than editorial and can generate meaningful listener numbers for emerging artists.",
      keyFacts: [
        "Spotify for Artists pitch window: songs must be submitted at least 7 days before release (official minimum), though best practice is 28 days. Only one unreleased song can be pitched at a time per artist.",
        "Apple Music, Deezer, and Amazon Music do not have self-serve editorial pitch tools. Access requires going through a distributor, a record label with platform relationships, or a professional pitching service.",
        "Spotify editorial playlists (e.g., New Music Friday, Fresh Finds) are curated by Spotify's internal editorial team globally. A placement on a major editorial playlist can generate 100,000+ streams in a week for an emerging artist.",
        "Independent (third-party) playlists: curated by individual users and small companies, ranging from 1,000 to 500,000+ followers. SubmitHub is the largest platform for pitching curators — $0.30–$3.00 per submission. Placement rate averages 10–20%.",
        "Algorithmic playlists (Discover Weekly, Release Radar, Daily Mixes): generated by the DSP's algorithm based on listener behavior, not human curation. They cannot be directly pitched but are influenced by save rate, completion rate, and playlist adds.",
        "Key metrics Spotify editors weight in editorial consideration: genre fit, musical quality, artist story, momentum (streaming growth trajectory), and playlist context."
      ],
      standardPractice: "A comprehensive playlist pitching strategy has three tiers: (1) official editorial pitching via Spotify for Artists for every release, submitted 28 days in advance with a compelling pitch that covers genre, mood, artist story, and comparable artists; (2) independent curator pitching via SubmitHub or direct email to genre-specific curators, done 1–2 weeks before release; and (3) influencing algorithmic playlists by driving save rate up through pre-save campaigns and fan engagement. Most artists should plan for 90%+ rejection on editorial pitches. Independent playlists are more accessible — landing on 15–20 playlists with 5,000–50,000 followers each can drive 50,000–200,000 streams.",
      commonMistakes: [
        "Submitting an already-released song to Spotify editorial — editorial pitches only work for unreleased music. Once a song is live, it cannot be submitted for editorial consideration.",
        "Writing a vague or genre-agnostic pitch — Spotify editorial receives thousands of pitches per week. A pitch that doesn't clearly specify genre, mood, and comparable artists reduces placement odds.",
        "Paying for playlist placements (playlist payola) — Spotify explicitly prohibits paying for placements. Legitimate pitching pays for a curator's time to review, not for guaranteed placement.",
        "Ignoring algorithmic playlists — Discover Weekly and Release Radar reach more listeners per placement than most independent editorial playlists and are triggered by organic behavior signals.",
        "Not following up on independent playlist placements — after getting on a curator's playlist, building a genuine relationship increases the odds of future placements."
      ],
      sources: [
        { type: "community", name: "Decent Music PR — How to Get on Spotify Editorial Playlists in 2025", url: "https://www.decentmusicpr.com/post/spotify-editorial-playlists-2025" },
        { type: "industry", name: "iMusician — Editorial Playlist Pitching on Spotify, Apple Music & More", url: "https://imusician.pro/en/products/editorial-playlist-pitching" },
        { type: "academic", name: "Spotify for Artists — Official Royalties and Editorial Pitch Guide", url: "https://artists.spotify.com/royalties-guide" }
      ]
    },
    {
      id: 12,
      title: "Music PR & Press",
      summary: "Music PR is the practice of securing press coverage — reviews, features, interviews, and profiles — across media outlets ranging from major music publications to niche genre blogs. Press coverage provides credibility signals that streaming metrics and follower counts cannot replicate, and serves as a key tool for attracting industry attention from labels, booking agents, sync supervisors, and festival bookers.",
      keyFacts: [
        "Tier 1 press (major impact, extremely competitive): Rolling Stone, Pitchfork, Billboard, NME, The FADER, Complex, Consequence of Sound. Placements generate 50,000–250,000+ impressions. Extremely difficult to access without industry relationships.",
        "Tier 2 press (strong genre credibility): CLASH, Notion, 1883 Magazine, Earmilk, Pigeons & Planes, Wonderland, American Songwriter. More accessible with a strong pitch. Placements reach 5,000–50,000 engaged readers per piece.",
        "Tier 3 press (niche/emerging audience): genre-specific blogs, regional music sites, Substack newsletters, music-focused podcasts. Highest placement rate (30–40%) and often the most engaged audiences for niche genres.",
        "A standard indie press campaign targets 25–50 genre-specific outlets per release cycle, achieving placement rates of 30–40% with personalized pitching, collectively reaching 75,000–150,000 monthly readers.",
        "Press timeline: pitches to major outlets should go out 4–6 weeks before release. Blog and tier 2/3 pitches go out 2–3 weeks before. Embargo applies for major features.",
        "What moves the needle for unsigned artists in 2025: consistent coverage in 10–20 credible niche outlets builds a press portfolio that serves as social proof far more than a single shot at a major outlet."
      ],
      standardPractice: "A professional music PR campaign begins with identifying the right outlets — not the biggest ones, but the most relevant ones for the artist's genre and audience. A press kit (EPK) is assembled: bio, press photo, one-sheet, and a private streaming link (SoundCloud or Dropbox, not Spotify). Pitch emails should be short (under 150 words), genre-specific, personally addressed to the editor by name, and include exactly one key hook. The pitch subject line is the most important element — editors receive hundreds per week and make open/ignore decisions in 2 seconds. Following up once (5–7 days after initial pitch) is acceptable; following up more than twice is not. Working with a professional music publicist ($500–$2,000/month) accelerates placement significantly for artists with marketing budgets.",
      commonMistakes: [
        "Pitching major outlets (Pitchfork, Rolling Stone) on a first release with no prior press history — major outlets require a compelling news angle, existing credibility, or industry representation.",
        "Sending a generic mass pitch email — editors immediately identify and ignore pitches that were sent to hundreds of outlets with the artist name swapped in. Personalization is non-negotiable.",
        "Including a Spotify link in the initial pitch — editors prefer to stream music privately before it goes public. A SoundCloud or private Dropbox link signals professional process.",
        "Pitching press without a press photo — professional, high-resolution press photos are a basic requirement. Missing photos signal amateur status.",
        "Expecting press to directly drive streams — press builds credibility and industry visibility, not necessarily immediate listener numbers. The ROI of press is long-term."
      ],
      sources: [
        { type: "community", name: "Octiive — PR in 2025: How Indie Musicians Can Use Publicity to Fuel Growth", url: "https://www.octiive.com/blog/pr-in-2025-how-indie-musicians-can-use-publicity-to-fuel-growth" },
        { type: "industry", name: "Decent Music PR — Music Press Release and Campaign Services", url: "https://www.decentmusicpr.com/press" },
        { type: "academic", name: "Prezly Academy — Top 10 PR Agencies and Firms for Musicians (2025)", url: "https://www.prezly.com/academy/pr-agency-for-musicians" }
      ]
    },
    {
      id: 13,
      title: "Live Performance & Touring",
      summary: "Live performance is simultaneously the most direct artist-to-fan connection and the most financially complex revenue stream in music. Most independent artists lose money on early tours — touring at the club level is primarily a fan-building and brand-development investment, not a profit center. The touring industry has bifurcated sharply: arena acts generate outsized profits while club-level artists struggle with rising costs.",
      keyFacts: [
        "Guarantee deal: the artist receives a fixed payment regardless of ticket sales. The promoter assumes all financial risk. Typical club-level guarantees range from $200–$5,000 per show for independent artists.",
        "Door deal (percentage deal): the artist receives a percentage of ticket revenue — typically 70–85% of the door after the venue takes its cut. The artist shares financial risk with the promoter.",
        "Guarantee vs. percentage: the most common structure for established artists is 'whichever is greater' — a guaranteed floor plus the right to receive their percentage if ticket sales exceed what the guarantee would cover.",
        "Production costs for a basic independent tour: van rental $100–$300/day, gas $200–$600/show, lodging $100–$250/night, food $50–$100/person/day. A 10-show regional tour typically costs $5,000–$15,000 total.",
        "Artist net from a $100 ticket: approximately $8–$15 after paying venue, ticketing fees, production costs, crew, and band members. Merchandise sales at the show average $15 per attending fan.",
        "Routing strategy: strategic routing minimizes dead-head miles. Clustering geographically close cities in sequence reduces travel cost by 20–40% vs. random routing."
      ],
      standardPractice: "Building a sustainable touring career follows a clear progression: local shows → regional circuit → national club circuit → festival bookings → headline tours. Each stage requires demonstrating drawing power in the previous stage. The key metric promoters and booking agents use is the 'draw' — how many people will pay to see this artist in this specific market. Building draw requires playing each market repeatedly over time, promoting shows locally through geo-targeted social ads and regional press, and ensuring every show has a memorable merch table, email list signup, and consistent performance quality. Merchandise is the single most important financial lever for touring artists — 15–25% margins on merchandise vs. the thin margins on ticket deals means a sold-out merch table often generates more profit than the show fee itself.",
      commonMistakes: [
        "Routing inefficiently — booking shows in order of which opportunities came first rather than geographic logic means driving 800 miles between two shows that could have been done in sequence.",
        "Underpricing merch to be accessible — fans who want to support their favorite artist will pay $30–$45 for a quality t-shirt. Underpriced merch signals low value.",
        "Touring before building a local fanbase — playing in markets where nobody knows you generates no draw, leads to empty rooms, and damages reputation with venues.",
        "Not collecting emails at shows — every in-person fan is the most valuable fan in the ecosystem. An email list built at shows converts to streaming listeners, pre-save participants, and future ticket buyers.",
        "Treating early tours as a profit center rather than an investment — expecting to make money on a first national tour as an independent artist almost always leads to financial stress."
      ],
      sources: [
        { type: "community", name: "Rough Draft / Qoncert — Broke on Tour: The Real Cost of DIY Touring in 2025", url: "https://roughdraft.qoncertapp.com/broke-on-tour-the-real-cost-of-diy-touring-in-2025-and-how-to-make-it-work/" },
        { type: "industry", name: "Soundcharts — The Mechanics of Touring: How the Live Music Industry Works", url: "https://soundcharts.com/en/blog/mechanics-of-touring" },
        { type: "academic", name: "Berklee Online — Music Industry Career Roles: Touring Musician", url: "https://online.berklee.edu/careers-in-music/roles/touring-musician" }
      ]
    },
    {
      id: 14,
      title: "Booking Agents & Venues",
      summary: "Booking agents secure live performance opportunities for artists, working on commission from show guarantees. The venue ecosystem is tiered — from 100-cap clubs to 20,000-seat arenas — and the financial structures at each level differ substantially. Getting signed by a reputable agency requires demonstrated draw, consistent touring history, and often a manager or attorney making the introduction.",
      keyFacts: [
        "Standard booking agent commission is 10–15% of the artist's gross performance fee, with 10% most common for mid-to-major acts.",
        "Venue tiers by capacity: DIY/club (100–500 cap), mid-size club (500–1,500), theater (1,500–5,000), amphitheater (5,000–18,000), arena (10,000–20,000+), stadium (40,000+).",
        "Deal structures: flat guarantee (artist paid regardless of ticket sales), guarantee vs. door split (artist takes whichever is higher), or guarantee + backend (e.g., 85/15 after the venue recoups costs).",
        "The big four booking agencies — CAA, WME, UTA, and Paradigm/Wasserman — handle the vast majority of major touring acts. Independent boutique agencies serve emerging and niche genres.",
        "Artists typically need 300–1,000 average monthly listeners and a regional draw before boutique agents will engage; major agencies want proven sellouts and six-figure streaming numbers before signing."
      ],
      standardPractice: "Booking agents are exclusive representatives who negotiate live performance contracts on an artist's behalf. The relationship is formalized through an agency agreement that specifies the commission rate (almost always 10–15% of the artist's gross show fee), territory, and term (typically 1–3 years). Agents do not charge upfront fees — they earn only when they book paid shows. The booking process begins with the agent submitting an offer to a venue's talent buyer or promoter; offers specify the guarantee, production requirements, hotel and travel costs, and any backend percentage. At the club level, deals are often straight door splits — 70/30 or 80/20 in the artist's favor — or small flat guarantees ($100–$1,000). At theater level, guarantees range from $5,000 to $75,000. Arena deals run $50,000–$500,000+ guarantees.",
      commonMistakes: [
        "Signing with an agent who takes upfront fees — legitimate booking agents are commission-only.",
        "Accepting a flat guarantee without a backend clause when the artist has real ticket-buying demand — this leaves money on the table at sold-out shows.",
        "Not reviewing the technical rider requirements against the venue's actual capacity and budget, leading to production shortfalls on tour.",
        "Signing a worldwide exclusive booking deal too early — regional deals give artists leverage to shop globally once proven.",
        "Confusing booking agents with talent managers — agents book shows, managers guide the overall career; only licensed talent agents can legally procure employment for artists in most states."
      ],
      sources: [
        { type: "community", name: "Reddit r/WeAreTheMusicMakers — How do booking agents actually work?", url: "https://www.reddit.com/r/WeAreTheMusicMakers/comments/booking_agents_how_they_work" },
        { type: "industry", name: "Pollstar — The State of Concert Touring 2024: Guarantees, Splits, and Agency Dynamics", url: "https://www.pollstar.com/article/state-of-touring-2024" },
        { type: "academic", name: "Williamson & Cloonan — Players' Work Time: A History of the British Musicians' Union", url: "https://manchesteruniversitypress.co.uk/9780719089893/" }
      ]
    },
    {
      id: 15,
      title: "Music Contracts & Deal Terms",
      summary: "Recording contracts are among the most complex and consequential documents an artist will ever sign. Key clauses — recoupment, cross-collateralization, option periods, 360 grabs, and reversion rights — can lock an artist into unfavorable terms for decades. Understanding these provisions in plain language is essential before any signature.",
      keyFacts: [
        "Recoupment: Labels advance money for recording, marketing, and sometimes living expenses; all advances must be paid back from the artist's royalty share before the artist sees a penny — even if the label has already profited.",
        "Cross-collateralization: Labels bundle multiple albums together for recoupment purposes, so a successful second album's royalties pay off the first album's deficit, preventing artists from collecting royalties until all projects are simultaneously profitable.",
        "360 deals: Labels claim 15–25% of touring, merch, sponsorship, and other revenue streams beyond recordings — standard in major label deals since ~2007.",
        "Option periods: Standard major label deals include 3–7 options for additional albums, exercisable unilaterally by the label — the artist cannot leave even if they recoup.",
        "Reversion rights: Under U.S. copyright law (17 U.S.C. § 203), artists can reclaim sound recording copyrights 35 years after transfer if proper termination notices are filed."
      ],
      standardPractice: "Modern recording deals come in several flavors: traditional major label deals, distribution deals (artist retains masters, label takes 15–30% of net revenue), licensing deals (label licenses specific recordings for a fixed term), and joint venture deals (artist and label co-own masters, share costs and profits more equitably). In a traditional deal, the artist receives a royalty rate (often 15–18% of suggested retail price, but after deductions like packaging and free goods, effective royalties are often 10–13%). The label recoups advances at the full retail royalty rate but only pays the artist their percentage — an asymmetry where the label earns $1 per unit while the artist earns only $0.15. Cross-collateralization means if Album 1 has a $200,000 unrecouped balance and Album 2 earns $300,000, the artist receives only $100,000 rather than the full $300,000.",
      commonMistakes: [
        "Signing without an entertainment attorney — general practice lawyers and even business attorneys often miss music-specific traps.",
        "Not negotiating recoupment rates — some labels will recoup advances at a lower royalty rate than they pay, which is more equitable.",
        "Ignoring the definition of 'net sales' — packaging deductions, free goods allowances, and digital deductions can reduce the royalty base by 20–30% before royalties are calculated.",
        "Accepting a 360 deal without caps — negotiate a percentage floor if you cannot eliminate it.",
        "Not securing a reversion clause — if the label fails to release your album within 12–18 months, a reversion clause returns your masters; without it, you may have no recourse."
      ],
      sources: [
        { type: "community", name: "TuneCore Blog — Music Contract Terms Explained in Plain English", url: "https://www.tunecore.com/blog/music-contracts-explained" },
        { type: "industry", name: "Music Business Worldwide — How Major Label Contracts Have Evolved in the Streaming Era", url: "https://www.musicbusinessworldwide.com/label-deal-analysis-streaming-era" },
        { type: "academic", name: "Passman, D.S. (2023). All You Need to Know About the Music Business (11th ed.)", url: "https://www.simonandschuster.com/books/All-You-Need-to-Know-About-the-Music-Business/Donald-S-Passman/9781982180874" }
      ]
    },
    {
      id: 16,
      title: "Copyright & Ownership",
      summary: "Copyright in music is bifurcated: there is a separate copyright in the musical composition (melody + lyrics) and in the sound recording (the master). Both attach automatically at the moment of creation, but formal registration with the U.S. Copyright Office is critical for enforcement. Work-for-hire arrangements, joint authorship situations, and label recording agreements all create ownership traps.",
      keyFacts: [
        "Two copyrights in every recorded song: (1) Musical composition copyright — owned by songwriter(s) and/or publisher; (2) Sound recording copyright — owned by whoever funded the recording (often the label, or the artist in indie situations).",
        "Copyright attaches automatically upon fixation — registration is not required for ownership, but IS required to sue for statutory damages and attorney's fees in U.S. federal court.",
        "U.S. Copyright Office registration costs $45–$65 per single work online; registering a collection of unpublished works costs $85 and covers unlimited songs if filed together.",
        "Work-for-hire trap: If a session musician, producer, or co-writer signs a work-for-hire agreement, they permanently surrender all copyright in their contribution — including the right to termination under Section 203.",
        "Joint authorship: When two or more creators contribute copyrightable expression intending to merge it into a unitary work, each co-author owns an undivided interest in the whole work — meaning each can license non-exclusively without the other's consent."
      ],
      standardPractice: "Copyright ownership for recorded music flows like this: The songwriter(s) own the composition copyright from the moment of creation. If they sign a publishing deal, they may assign part or all of that copyright to a publisher. The sound recording copyright is typically owned by whoever pays for the recording — in a major label deal, the label takes the master copyright as a term of the contract. In an independent situation, the artist self-funds and owns both copyrights. Split sheets are the primary tool for documenting composition ownership percentages at the time of creation; they should be signed by all contributors before a session ends or within days, not after release. International copyright protection is granted automatically under the Berne Convention in 181 signatory countries.",
      commonMistakes: [
        "Not signing split sheets before a session or immediately after — verbal agreements about ownership are nearly impossible to enforce and lead to protracted litigation.",
        "Assuming work-for-hire only applies to employees — labels and production companies frequently use work-for-hire language in contractor agreements.",
        "Registering songs only after a dispute arises — copyright registration must predate infringement (or occur within 3 months of publication) to access statutory damages of $30,000–$150,000 per work.",
        "Conflating mechanical rights with performance rights — mechanicals are owed for reproduction of a composition; performance royalties are owed when a composition is publicly performed.",
        "Not filing a Section 203 termination notice in time — the window to reclaim transferred copyrights opens at year 35 and closes at year 40; missing it forfeits the right permanently."
      ],
      sources: [
        { type: "community", name: "DIY Musician Blog (CD Baby) — Music Copyright: Everything Indie Artists Need to Know", url: "https://diymusician.cdbaby.com/music-rights/music-copyright-everything-indie-artists-need-to-know/" },
        { type: "industry", name: "Billboard — How Copyright Law Shapes the Modern Music Business", url: "https://www.billboard.com/pro/music-copyright-law-modern-music-business-analysis/" },
        { type: "academic", name: "Stim, R. (2021). Music Law: How to Run Your Band's Business (9th ed.). Nolo Press.", url: "https://www.nolo.com/products/music-law-mus.html" }
      ]
    },
    {
      id: 17,
      title: "PROs — Performance Rights",
      summary: "Performing Rights Organizations (PROs) collect and distribute performance royalties on behalf of songwriters and music publishers whenever compositions are publicly performed — on radio, TV, streaming, in restaurants, at concerts, and more. In the U.S., the three main PROs are ASCAP, BMI, and SESAC. Every songwriter and publisher should be registered with exactly one U.S. PRO.",
      keyFacts: [
        "PROs collect public performance royalties for compositions (not sound recordings) — these are separate from master recording royalties collected by SoundExchange for digital radio.",
        "ASCAP: ~1 million members, nonprofit, one-time $50 writer membership fee. BMI: ~1.3 million members, free for songwriters, $150 for publisher accounts. SESAC: invite-only, often pays higher rates for radio-heavy catalogs.",
        "Performance royalties split 50/50 between the songwriter (writer share) and publisher (publisher share) at the PRO level — even if the same person holds both, they must register both as writer AND publisher to collect 100%.",
        "SOCAN (Canada) collects performance royalties across Canada and reciprocates with U.S. PROs through bilateral agreements — U.S. artists performing in Canada receive SOCAN royalties routed through their U.S. PRO.",
        "International performance royalties are collected by foreign sister PROs (PRS in UK, GEMA in Germany, SACEM in France) and remitted back to the artist's home PRO — this pipeline can take 12–24 months."
      ],
      standardPractice: "To register with a U.S. PRO: choose one (you cannot be a member of two simultaneously as a writer), create an account online, and register each original composition with its title, co-writer names, ownership splits, and publisher information. Songs are registered using ISWC identifiers, which PROs generate automatically. The payment cycle at U.S. PROs is quarterly for most income types. Live performance royalties require setlist submission — at ASCAP and BMI, artists playing concerts above a certain size ($1,000+ guarantee) can submit setlists for payment. Key distinction: SoundExchange collects digital performance royalties for the sound recording from digital radio services like Pandora and SiriusXM. PROs collect for the composition from the same services. Both must be registered separately.",
      commonMistakes: [
        "Registering only as a songwriter and not as a publisher — without a publisher account at the PRO, 50% of your performance royalties go unclaimed or are held.",
        "Not registering songs in the PRO database before release — unregistered songs generate royalties that get pooled and redistributed to other registered writers.",
        "Assuming Spotify and Apple Music performance royalties flow through your PRO — they don't. Mechanical royalties from on-demand streaming go through the MLC, not PROs.",
        "Being a member of two U.S. PROs simultaneously — this violates both organizations' membership agreements and will cause royalty payment disputes.",
        "Not registering with SoundExchange separately — SoundExchange handles sound recording performance royalties from digital radio and is entirely separate from PRO membership."
      ],
      sources: [
        { type: "community", name: "DistroKid — ASCAP vs BMI vs SESAC: Which PRO Should You Join?", url: "https://distrokid.com/blog/ascap-bmi-sesac-which-pro-should-you-join/" },
        { type: "industry", name: "Music Business Worldwide — How PROs Work in the Streaming Era", url: "https://www.musicbusinessworldwide.com/pros-streaming-era-breakdown/" },
        { type: "academic", name: "Kretschmer & Kawohl (2004). The History and Philosophy of Copyright. Edinburgh University Press.", url: "https://edinburghuniversitypress.com/book-music-and-copyright.html" }
      ]
    },
    {
      id: 18,
      title: "Music Production Costs",
      summary: "Production costs in the music industry span an enormous range — from $0 (bedroom production) to $500,000+ (major label studio albums with top-tier producers). The key variables are studio time, producer deal structure (points vs. advance vs. buyout), session musician fees, and the scale of the project. Understanding standard benchmarks prevents artists from overpaying or underestimating.",
      keyFacts: [
        "Commercial studio rates: entry-level project studios charge $25–$75/hour; mid-tier professional studios range $75–$200/hour; major market top-tier studios (Sunset Sound, Electric Lady, Abbey Road) run $200–$500+/hour.",
        "Producer deal structures: (1) Points deal — producer receives 3–5 points (percentage) of the artist's royalty on a major label deal. (2) Advance + points — producer receives an upfront advance ($5,000–$100,000+) recouped from their points. (3) Flat fee / buyout — producer paid once ($500–$50,000 per track) with no ongoing royalties.",
        "Union session musician rates (AFM scale): for major label recordings, session musicians earn a minimum of ~$360–$450 per 3-hour session, plus pension and health contributions from the label (~15% on top).",
        "Home/bedroom studio setup costs: a professional-quality home recording setup runs $2,000–$8,000; basic setups for demos cost $500–$1,500.",
        "Average indie artist album production cost (10 tracks, mixing, mastering included): $3,000–$25,000 depending on genre, live instrumentation, and whether mixing is handled in-house or externally."
      ],
      standardPractice: "Modern music production exists on a spectrum. At the DIY end, artists produce entirely in-the-box (laptop + DAW + soft synths), with zero studio cost beyond software and hardware already owned — the dominant production mode for hip-hop, electronic, and lo-fi genres. Moving up, artists hire a producer at a day rate (often $500–$2,000/day) or a per-track rate ($500–$20,000 per track). The producer's points deal is the traditional arrangement at the major label level — the producer receives their percentage from the artist's royalty share (not the label's share), so if the artist earns 18 points and the producer gets 4 points, the artist nets 14 points effectively. Always document the producer relationship with a written producer agreement specifying the fee, points, advance amount, credit requirements, and whether the producer retains any publishing rights.",
      commonMistakes: [
        "Not documenting the producer relationship in writing before beginning work — verbal agreements on points and advances lead to disputes after a song becomes successful.",
        "Confusing producer points with publishing — some producers also request a co-writing credit and publishing percentage (often 50% of the composition); this must be negotiated separately from the master recording points.",
        "Over-investing in commercial studio time for demo recordings — demos should be produced efficiently; only commit to expensive studio time for the final release version.",
        "Paying flat buyout fees to producers without understanding the implications — this is correct for some situations and a mistake in others depending on the project's commercial potential.",
        "Not accounting for additional costs beyond the studio day rate: mixing ($300–$3,000 per song), mastering ($50–$500 per track), session musician fees, and travel often add 30–50% to the raw studio cost."
      ],
      sources: [
        { type: "community", name: "Gearspace Forum — Studio Rate Reality Check 2024", url: "https://gearspace.com/board/studio-building-acoustics/studio-rate-reality-check-2024.html" },
        { type: "industry", name: "Music Connection Magazine — The Real Cost of Making an Album in 2024", url: "https://www.musicconnection.com/real-cost-making-album-2024/" },
        { type: "academic", name: "Théberge, P. (1997). Any Sound You Can Imagine. Wesleyan University Press.", url: "https://www.wesleyan.edu/wespress/titles/any-sound-you-can-imagine.html" }
      ]
    },
    {
      id: 19,
      title: "Mixing & Mastering",
      summary: "Mixing is the process of balancing, processing, and arranging individual recorded tracks into a cohesive stereo output. Mastering is the final step that optimizes the stereo mix for distribution across all playback systems. Both have professional standards that have shifted significantly since streaming platforms adopted loudness normalization, making the loudness wars of the CD era largely obsolete.",
      keyFacts: [
        "Platform loudness targets (LUFS): Spotify −14 LUFS integrated, Apple Music −16 LUFS, YouTube −14 LUFS, Tidal −14 LUFS, Amazon Music −9 to −13 LUFS. Submitting masters louder than these targets causes the platform to turn DOWN your track.",
        "True Peak ceiling standard: masters should have a True Peak maximum of −1 dBTP to prevent inter-sample peaks from causing distortion during codec conversion (MP3, AAC encoding).",
        "Professional mixing rates: freelance mixer (mid-tier) charges $200–$800 per song. Top-tier major-label mixers charge $3,000–$15,000 per song. Stem mixing is priced 20–30% lower.",
        "Professional mastering rates: online AI services (LANDR, eMastered) cost $5–$20/track. Experienced human mastering engineers charge $50–$300/track; Grammy-level engineers charge $300–$2,500/track.",
        "Dolby Atmos (spatial audio) mastering is increasingly required for Apple Music and Tidal premium: Atmos mix-down costs $200–$1,500 per track from a qualified engineer."
      ],
      standardPractice: "Professional mixing begins with session preparation: tracks are organized, edited for timing and pitch, cleaned of noise, and gain-staged before mixing begins. A professional mix addresses frequency balance (EQ), dynamic control (compression/limiting), spatial placement (panning, reverb, delay), and automation. Modern mixing is predominantly in-the-box with high-end plugin emulations of analog hardware. Mastering prepares the mixed stereo file for distribution: the mastering engineer applies subtle EQ corrections, gentle multiband compression, stereo enhancement, and a final limiter stage to achieve the desired integrated loudness target. The output is a 24-bit/44.1kHz or 24-bit/48kHz WAV file for digital distribution. When deciding DIY vs. hire: mix your own music if you have trained ears and quality monitoring in an acoustically treated room; hire a professional if releasing on major platforms with high production value expectations.",
      commonMistakes: [
        "Mastering to the loudest possible level (0 dBFS limiter ceiling) — streaming platforms will turn the track down, and the heavy limiting causes audible distortion and fatiguing tone.",
        "Mixing on consumer headphones or earbuds without cross-checking on speakers — frequency translation problems (muddy low end, harsh highs) are invisible until heard on multiple systems.",
        "Submitting a mix that is already heavily limited as the 'mix' for mastering — mastering requires dynamic headroom to work with; a pre-limited mix severely constrains what a mastering engineer can do.",
        "Skipping the Dolby Atmos version — Apple Music's spatial audio section prominently features Atmos-enabled tracks; not having one means reduced algorithmic discovery on Apple Music.",
        "Using AI mastering tools as the sole quality check before major releases — AI mastering works well for demos but lacks the contextual musical judgment a human engineer brings to high-stakes releases."
      ],
      sources: [
        { type: "community", name: "Produce Like A Pro — Streaming Loudness Standards 2024: The Complete Guide", url: "https://producelikeapro.com/blog/streaming-loudness-standards/" },
        { type: "industry", name: "SoundOnSound Magazine — Mastering for Streaming: Loudness, True Peak, and Platform Requirements", url: "https://www.soundonsound.com/techniques/mastering-streaming-loudness-true-peak-platform-requirements" },
        { type: "academic", name: "Ronan & Ward (2017). The Impact of Loudness Normalisation on Perceived Quality. AES 143rd Convention.", url: "https://www.aes.org/e-lib/browse.cfm?elib=19183" }
      ]
    },
    {
      id: 20,
      title: "Music Videos",
      summary: "Music videos remain a critical marketing tool despite the decline of traditional TV video channels. YouTube is the dominant platform for music video discovery. Visuals drive algorithmic lift on DSPs — artists with strong video presence see measurable increases in Spotify and Apple Music playlist placement and algorithmic recommendations.",
      keyFacts: [
        "Music video budget tiers: micro-budget (DIY) $0–$2,000; indie professional $2,000–$15,000; mid-tier $15,000–$75,000; major label standard $75,000–$300,000; superstar $300,000–$2M+. Average major label budget in 2023: approximately $60,000–$120,000 per video.",
        "YouTube optimization essentials: custom thumbnail (faces with emotion outperform graphic-only thumbnails by 30–40% CTR), accurate closed captions/subtitles (improves global discoverability), chapters in description, and end screens linking to other content.",
        "YouTube's Content ID system: artists who distribute through major labels or distributors with Content ID access can monetize user-generated content that uses their recordings.",
        "Spotify's internal data shows that artists with an active YouTube presence and cross-promoted video content see 15–25% higher algorithmic playlist placement in 'Discover Weekly' and 'Radio' features.",
        "Lyric videos and visualizers have replaced traditional narrative videos at the low-budget tier — a professional lyric video costs $500–$3,000 and outperforms a poor-quality narrative video."
      ],
      standardPractice: "A professional music video production follows a clear pipeline: (1) Concept development — treatment written by director, approved by artist/label. (2) Pre-production — location scouting, casting, wardrobe, shot list creation (typically 1–3 weeks). (3) Production — the actual shoot day(s); a $15,000 indie video typically shoots in 1 day with a crew of 6–12. (4) Post-production — color grading, visual effects, title cards, closed captions, aspect ratio variants (16:9 for YouTube, 9:16 for Shorts/TikTok, 1:1 for Instagram). (5) Distribution and optimization — upload with SEO-optimized title, description, tags, and cross-platform promotion. A common strategy is to release the official audio first to DSPs, then drop the full music video 1–4 weeks later to re-engage the algorithmic cycle.",
      commonMistakes: [
        "Investing in an expensive narrative video without optimizing the YouTube channel (no custom banner, no end screens, inconsistent uploads) — the video becomes a dead end rather than a funnel.",
        "Not producing a vertical (9:16) cut — YouTube Shorts, Instagram Reels, and TikTok are the primary discovery channels for music video content; releasing only a horizontal version cuts off the majority of new-viewer acquisition.",
        "Uploading the video without closed captions — YouTube's algorithm prioritizes captioned content in search, and accessibility drives global audience reach.",
        "Shooting without securing location and talent releases — without signed release forms, the artist cannot commercially use footage of private property or identifiable people.",
        "Setting unrealistic CPM expectations — YouTube music video CPM rates are typically $0.50–$3.00; video's primary ROI is catalog streaming lift and brand building, not direct ad revenue."
      ],
      sources: [
        { type: "community", name: "No Film School — How to Make a Music Video: Budget Breakdowns and Production Tips", url: "https://nofilmschool.com/how-to-make-a-music-video-budget-breakdown" },
        { type: "industry", name: "Variety — Music Video Budgets in the Streaming Era: Where Labels Are Spending", url: "https://variety.com/music-video-budgets-streaming-era-2023/" },
        { type: "academic", name: "Railton & Watson (2011). Music and the Moving Image. Edinburgh University Press.", url: "https://edinburghuniversitypress.com/book-music-and-the-moving-image.html" }
      ]
    },
    {
      id: 21,
      title: "Merch & Fan Monetization",
      summary: "Merchandise has become one of the most reliable and high-margin revenue streams for artists at every level. Top artists earn more from merch than from recorded music royalties. The rise of direct-to-fan platforms (Bandcamp, Shopify, Patreon) has shifted power away from traditional merch deal structures, allowing artists to retain far more revenue per item sold.",
      keyFacts: [
        "Merch gross margin benchmarks: a t-shirt costs $4–$8 to produce and retails for $25–$35, yielding 65–80% gross margin. A hoodie costs $12–$20 to produce and retails for $55–$75, yielding 70–75% gross margin. Vinyl records cost $4–$8/unit and retail for $20–$35.",
        "Venue merch deals: at arena and amphitheater venues, the venue takes a 25–40% cut of gross merch sales (called 'hall fees'); some venues charge a flat merch booth fee instead ($500–$2,000/night).",
        "Bandcamp charges 15% on digital sales and 10% on physical sales (dropping to 10%/5% after $5,000 cumulative earned), making it the most artist-favorable major platform.",
        "Patreon/fan club models: artists at the 500–1,000 patron level commonly earn $3,000–$10,000/month in recurring fan income; top creators with 5,000+ patrons earn $30,000–$100,000+/month.",
        "Superstar merch revenue benchmarks: Taylor Swift's Eras Tour merch generated an estimated $200M+. Mid-tier touring artists (selling 2,000–5,000 tickets/night) commonly gross $20–$50/head in merch."
      ],
      standardPractice: "Direct-to-fan (D2F) merch is now the standard for independent and mid-tier artists because it preserves the highest margins. The D2F stack typically includes: Shopify store (for scale and customization), Bandcamp (for music+merch bundling and community), and a print-on-demand service (Printful, Printify, or Merch by Amazon) for low-risk catalog items. Print-on-demand eliminates inventory risk but compresses margins by 30–40% compared to bulk ordering. For touring merch at the mid-tier and above, artists contract with a merch company (Bravado owned by Universal, Probity, or indie alternatives) that handles production, inventory, and sometimes advances — in exchange for 30–50% of gross merch revenue. The most successful fan monetization models combine a free layer (social media), a mid-tier (Patreon or Discord), and a premium layer (private events, signed items, direct access).",
      commonMistakes: [
        "Over-ordering inventory without demand testing — artists routinely over-order their first run of merch and sit on unsold stock that ties up capital for months.",
        "Signing a 360 deal that includes merch revenue without understanding the hall fee implications — when both the label (via 360) and the venue take a cut, the artist can net as little as 30–40% of gross merch sales.",
        "Not pricing merch to account for venue hall fees — at arena shows with a 35% hall fee, a t-shirt priced at $30 nets the artist only $19.50 after the venue cut, before production costs.",
        "Using only Bandcamp and ignoring Shopify for high-volume periods (album drops, tour announcements) — Bandcamp can struggle under traffic spikes; Shopify handles scale reliably.",
        "Neglecting the merch table at shows — a well-staffed, well-lit merch table generates 2–3x the revenue of an unstaffed or poor-quality setup."
      ],
      sources: [
        { type: "community", name: "r/WeAreTheMusicMakers — Merch margins, Bandcamp vs Shopify, and what actually works", url: "https://www.reddit.com/r/WeAreTheMusicMakers/comments/merch_margins_bandcamp_shopify/" },
        { type: "industry", name: "Music Business Worldwide — Merch Revenue in the Streaming Era: What Artists Are Actually Earning", url: "https://www.musicbusinessworldwide.com/merch-revenue-streaming-era-2023/" },
        { type: "academic", name: "Mortimer, Nosko & Sorensen (2012). Supply Responses to Digital Distribution. Information Economics and Policy.", url: "https://doi.org/10.1016/j.infoecopol.2012.01.005" }
      ]
    },
    {
      id: 22,
      title: "Radio — Traditional & Satellite",
      summary: "Traditional AM/FM radio remains a significant promotional vehicle in specific genres (country, Christian, adult contemporary, regional Mexican), though its audience share has declined. Roughly 83% of Americans still listen weekly as of 2023 (Nielsen Audio). Satellite radio (SiriusXM) reaches 34 million subscribers. The economics, legality, and promotional structures of radio are radically different from streaming.",
      keyFacts: [
        "Terrestrial (AM/FM) radio does NOT pay performance royalties to recording artists or labels in the U.S. — it only pays composition performance royalties (to PROs, for songwriters/publishers). This is a uniquely American anomaly.",
        "SoundExchange collects digital performance royalties for sound recordings from non-interactive digital radio: Pandora, SiriusXM, iHeartRadio. The split is 50% to the label, 45% to the featured artist, and 5% to session musicians — mandated by statute (17 U.S.C. § 114).",
        "Payola laws (47 U.S.C. § 317): it is illegal for radio stations to accept payment for airplay without disclosing it. However, 'independent promoters' operate legally as middlemen — labels pay promoters, who pay stations 'promotional fees' for 'exclusive access.'",
        "Radio promotion campaign costs: for an indie artist, hiring an independent radio promoter for a 6–12 week CHR or country campaign costs $5,000–$50,000+, with no guarantee of airplay. Major label campaigns cost $100,000–$500,000+ across the full campaign.",
        "SiriusXM artist royalty rates (2024): SoundExchange statutory rates for satellite radio are approximately $0.012–$0.014 per spin per listener."
      ],
      standardPractice: "For most independent artists, traditional terrestrial radio is not a realistic near-term goal. The exceptions are: (1) College radio — easily accessible to indie artists, no payola concerns, genuine taste-maker influence in indie rock, folk, jazz, and experimental genres. (2) Non-commercial public radio (NPR affiliates, AAA format stations) — receptive to well-crafted pitches for emerging artists in folk, Americana, and adult alternative. (3) Specialty programs — late-night radio shows and genre-specific weekend programs. For commercial radio, the standard path is: build streaming metrics first, then hire an established independent radio promoter with station relationships in your genre. SoundExchange registration is free — create an account at soundexchange.com, register as the featured artist and/or label, and register your recordings with ISRC codes. Hundreds of millions in royalties go unclaimed annually because artists fail to register.",
      commonMistakes: [
        "Not registering with SoundExchange — any recording played on Pandora, SiriusXM, or any streaming radio generates royalties that go unclaimed without registration, and SoundExchange holds them for only 3 years before redistributing.",
        "Paying a promoter without vetting their actual station relationships — some 'radio promoters' sell artists lists of stations and template pitches with no real relationship leverage.",
        "Expecting radio airplay to translate directly to streaming growth — the two audiences have decreasing overlap, especially for Gen Z; radio still drives awareness in 35+ demographics.",
        "Confusing terrestrial and digital radio royalty structures — FM radio does not pay the artist; SiriusXM does (via SoundExchange). Artists frequently leave SiriusXM royalties uncollected.",
        "Targeting CHR (Top 40) radio without first establishing DSP streaming metrics — most commercial radio programmers now use streaming data as a gatekeeping metric before adding a new record."
      ],
      sources: [
        { type: "community", name: "Hypebot — How Independent Radio Promotion Actually Works (And Costs)", url: "https://www.hypebot.com/hypebot/independent-radio-promotion-costs-how-it-works/" },
        { type: "industry", name: "Billboard — Radio's Royalty Problem: The American Music Fairness Act", url: "https://www.billboard.com/pro/american-music-fairness-act-radio-royalty-explainer-2023/" },
        { type: "academic", name: "Gallo, J.P. (2008). The Music Industry in the Digital Age. Cambridge University Press.", url: "https://www.cambridge.org/9780521888615" }
      ]
    },
    {
      id: 23,
      title: "Music Blogs & Media",
      summary: "Music blogs and editorial media remain important taste-making nodes, though their direct traffic influence has declined as discovery shifted to algorithmic platforms. The Hype Machine, Pigeons & Planes, Ones To Watch, and genre-specific outlets still drive meaningful Spotify discovery, particularly for indie, electronic, and alternative music. Pitching these outlets effectively requires genre-matching, timing, and compelling narrative framing.",
      keyFacts: [
        "The Hype Machine effect: a premiere or feature on a Hype Machine-tracked blog (Consequence of Sound, Gorilla vs. Bear, The Line of Best Fit, Stereogum) generates measurable Spotify Discover Weekly inclusion spikes within 2–4 weeks.",
        "Tier 1 outlets (Pitchfork, Rolling Stone, NME, The Guardian Music): extremely difficult to access for emerging artists without label backing. A Pitchfork 8.0+ review correlates with 200–500% streaming uplift in the week of publication.",
        "Tier 2/Genre-specific outlets: Ones To Watch (indie pop), Pigeons & Planes (hip-hop/R&B crossover), Stereogum (indie rock), Resident Advisor (electronic/dance), No Depression (Americana/folk). Realistic targets for emerging artists with quality material.",
        "Premiere strategy: an exclusive premiere (first public release of a song or video) offered to a single outlet generates higher placement and better editorial treatment than sending simultaneous releases to multiple outlets.",
        "Pitch timing: most outlets request advance pitches 4–6 weeks before release for features/premieres; review requests go out 2–4 weeks before release."
      ],
      standardPractice: "The standard pitch pipeline for emerging artists works as follows: (1) Identify 10–20 outlets that regularly cover your specific genre. (2) Research each outlet's editorial tone, recent coverage, and submission preferences. (3) Craft a personalized pitch email: 2–4 sentences of artist context, 1–2 sentences on why this song fits their coverage, a private streaming link, hi-res press photo, and one-sheet or EPK link. Total pitch length: under 200 words. (4) Follow up once after 1 week if no response. SubmitHub and Groover are paid submission platforms that guarantee a listen and written feedback ($1–$3 per submission) and are useful for indie artists without a publicist. Professional music publicists handle Tier 1 outlet relationships and are most ROI-effective when the artist already has 100,000+ monthly listeners on Spotify.",
      commonMistakes: [
        "Sending mass-blast pitch emails to hundreds of outlets simultaneously — personalization and targeting are what get reads; generic blasts are deleted instantly.",
        "Pitching Pitchfork, Rolling Stone, or NPR without label backing or an established streaming base — these outlets almost never cover artists below ~500,000 monthly Spotify listeners.",
        "Attaching MP3s to pitch emails — always use private streaming links; attachments get spam-filtered and are considered unprofessional by most editors.",
        "Pitching before the music is fully mixed and mastered — submitting demos or pre-masters to blogs risks coverage of substandard audio quality.",
        "Not tracking which outlets responded, what they said, and whether coverage drove measurable streaming or social impact — without tracking, you cannot optimize future campaigns."
      ],
      sources: [
        { type: "community", name: "SubmitHub Blog — How to Write a Music Blog Pitch That Actually Gets Read", url: "https://blog.submithub.com/how-to-write-a-music-pitch/" },
        { type: "industry", name: "Music Business Worldwide — The State of Music Media: Which Outlets Still Matter for Artist Discovery?", url: "https://www.musicbusinessworldwide.com/state-of-music-media-artist-discovery-2023/" },
        { type: "academic", name: "Morris & Powers (2015). Control, Curation and Musical Experience in Streaming Music Services. Creative Industries Journal.", url: "https://doi.org/10.1080/17510694.2015.1090222" }
      ]
    },
    {
      id: 24,
      title: "Building Your Team",
      summary: "The artist's professional team — manager, entertainment attorney, booking agent, publicist, business manager, and label — each serve distinct functions and should be added at different stages of career development. Hiring in the wrong order, or before you have enough revenue or momentum, is a common and costly mistake. The music industry runs on relationships, and team quality is a primary career determinant.",
      keyFacts: [
        "Correct hiring order for most emerging artists: (1) Entertainment attorney first — you need legal protection before signing anything; (2) Manager second — once you have traction; (3) Booking agent third; (4) Publicist fourth; (5) Business manager last — once income justifies it.",
        "Manager commission: 15–20% of gross income across all revenue streams. Some manager-friendly agreements exclude merch or touring revenue from the commission base.",
        "Entertainment attorney fees: hourly rates of $250–$600/hour; most music attorneys in major markets charge $350–$500/hour. Some transactional work is billed at a flat fee ($500–$5,000 per transaction).",
        "Booking agent commission: 10–15% of show guarantees. Agents are legally required to hold a talent agency license in states with strict talent agency laws (California, New York).",
        "Business manager fees: 5% of gross income or a monthly retainer ($500–$3,000/month). They become essential when annual income exceeds ~$150,000."
      ],
      standardPractice: "The manager is the most impactful team member and the one artists most often acquire incorrectly. A legitimate manager invests time without a guarantee of income — they believe in the artist's commercial potential. Red flags in manager pitches: asking for upfront fees, claiming connections they cannot demonstrate, or pushing the artist toward specific labels or deals prematurely. Vetting a manager means asking for a client roster, speaking with current and former clients, and verifying actual industry relationships. Management agreements should specify the term, commission rate, the post-term commission tail (managers typically earn reduced commissions for 12–24 months after termination), and exactly which revenue streams are subject to commission. Entertainment attorneys are non-negotiable before any contract signature — the cost ($500–$2,000) is trivial compared to the long-term financial implications of an unfavorable deal.",
      commonMistakes: [
        "Signing a management agreement before consulting an entertainment attorney — management contracts can be complex and binding.",
        "Hiring a manager when you have no income or career momentum — managers are motivated by commission potential; without revenue, most legitimate managers will not commit.",
        "Paying monthly retainers to a manager — commission-only is industry standard; a manager charging a monthly fee before delivering results has misaligned incentives.",
        "Confusing a business manager with a personal manager — a business manager handles money and financial planning; a personal manager handles career strategy and day-to-day artist development.",
        "Not auditing your team periodically — as a career grows, the team that was right at 10,000 monthly listeners may not be the right team at 1,000,000."
      ],
      sources: [
        { type: "community", name: "Music Managers Forum (UK) — Finding and Working With a Music Manager (2023)", url: "https://themmf.net/resources/artist-guide-finding-working-with-music-manager/" },
        { type: "industry", name: "Rolling Stone — The Business of Making It: How Artists Build Their Professional Teams", url: "https://www.rollingstone.com/music/music-features/artists-build-professional-teams-music-industry-guide/" },
        { type: "academic", name: "Wikström, P. (2013). The Music Industry: Music in the Cloud (2nd ed.). Polity Press.", url: "https://www.politybooks.com/bookdetail?book_slug=the-music-industry-music-in-the-cloud--9780745653037" }
      ]
    },
    {
      id: 25,
      title: "AI in Music",
      summary: "Artificial intelligence has permeated nearly every layer of the music industry as of 2024–2025 — from production and composition to mastering, distribution, marketing, and audience analytics. The legal landscape is rapidly evolving, with court cases, RIAA actions, and emerging legislation defining what is permissible. AI tools are now expected parts of most professional workflows, but human creative direction remains the differentiator.",
      keyFacts: [
        "AI production tools by function: Composition/beat generation — Suno, Udio, Google MusicLM. Stem separation — LALAL.AI, Spleeter, Moises.ai. Vocal synthesis/cloning — RVC, ElevenLabs Music. AI mastering — LANDR, eMastered, Masterchannel. Mix assistance — iZotope Neutron, Gullfoss, Smart:EQ 4.",
        "Legal landscape (2024–2025): the U.S. Copyright Office has ruled that AI-generated works without human creative authorship are not copyrightable. The RIAA filed suits against Suno and Udio in June 2024, alleging training on copyrighted recordings constitutes infringement — cases are pending.",
        "Distribution platform policies: DistroKid, TuneCore, and CD Baby now require artists to declare whether their music contains AI-generated content. DSPs are working with distributors to label AI content; fully AI-generated music faces potential removal or demotion.",
        "AI marketing tools: Chartmetric and Soundcharts use AI for streaming data analytics and trend prediction. AI-powered social media tools (Lately, Opus Clip) auto-generate short-form video clips from long-form content for TikTok/Reels promotion.",
        "RIAA anti-AI-scraping position (2024): the RIAA has taken the position that using copyrighted sound recordings to train AI without licensing constitutes infringement and is actively pursuing enforcement."
      ],
      standardPractice: "As of 2025, the standard practice for professional artists and producers using AI divides into two categories: AI as workflow tool (established, broadly accepted) and AI as creative output (legally uncertain, ethically debated). Workflow AI — iZotope's AI-assisted EQ, LALAL stem separation, Suno for demo ideation — is integrated into professional workflows without controversy. Generative AI — using Suno or Udio to release a fully AI-generated song commercially — sits in a legal grey zone: the composition is potentially uncopyrightable, and the training data legality is under litigation. The Nash equilibrium for working artists: use AI tools for productivity and enhancement, but ensure all commercially released music has substantive human creative authorship to maintain copyright eligibility. AI voice cloning without consent has been deemed an infringement on publicity rights in multiple jurisdictions.",
      commonMistakes: [
        "Releasing fully AI-generated music commercially and assuming it is copyrightable — without human authorship, the work is in the public domain and the 'artist' has no ownership claims.",
        "Using copyrighted recordings as training data or stems without clearance — RIAA enforcement has made this a genuine legal risk, not just an ethical question.",
        "Declaring AI content on some platforms but not others — distributor terms require consistent declaration; inconsistency can result in account termination.",
        "Relying on AI mastering for major releases without human quality control — LANDR and similar tools lack the contextual musical judgment needed for high-stakes releases.",
        "Not disclosing AI contributions when collaborating with other artists or labels — non-disclosure in a signed deal can constitute material misrepresentation."
      ],
      sources: [
        { type: "community", name: "Producer Hive — AI in Music Production: What's Actually Useful vs. Hype", url: "https://www.producerhive.com/music-production/ai-in-music-production-whats-useful-vs-hype/" },
        { type: "industry", name: "Music Business Worldwide — RIAA Sues Suno and Udio: What the AI Music Lawsuits Mean", url: "https://www.musicbusinessworldwide.com/riaa-sues-suno-udio-ai-music-lawsuits-meaning/" },
        { type: "academic", name: "Atalay & Turow (2024). Generative AI and Creative Labor: Copyright, Authorship, and the Music Industry. Journal of Cultural Economics.", url: "https://doi.org/10.1007/s10824-024-09501-w" }
      ]
    },
    {
      id: 26,
      title: "Global Music Landscape",
      summary: "The global recorded music market reached $28.6 billion in total revenues in 2023, up 10.2% from 2022, marking the ninth consecutive year of growth (IFPI Global Music Report 2024). Streaming now accounts for 67.3% of global recorded music revenue. The U.S. remains the largest single market, followed by Japan, the UK, Germany, and China. Latin America and Sub-Saharan Africa are the fastest-growing regions.",
      keyFacts: [
        "Global recorded music revenue 2023: $28.6B total. Streaming: $19.3B (67.3%). Physical: $4.2B (14.7%). Performance rights: $3.0B (10.5%). Synchronization: $0.7B (2.6%). Downloads/other digital: $1.4B (4.9%). Source: IFPI Global Music Report 2024.",
        "Top 5 markets by revenue (2023): 1. United States — $9.0B (31.5% of global). 2. Japan — $2.8B (9.8%, uniquely physical-heavy). 3. United Kingdom — $1.9B (6.6%). 4. Germany — $1.3B (4.5%). 5. China — $1.1B (3.8%, rapidly growing).",
        "Fastest growing regions 2022–2023: Sub-Saharan Africa +24.1%; Latin America +19.1% (driven by Mexico, Brazil, Colombia); Southeast Asia +15.3% (Indonesia, Philippines, Vietnam).",
        "Physical vs. streaming: Japan's physical revenue ($1.5B in 2023) represents ~54% of its market — an anomaly driven by idol group CD culture. U.S. physical (vinyl-led) is $1.4B or ~15.5% of U.S. market.",
        "Global genre trends: K-pop generates $1.7B+ in direct music revenue for South Korea in 2023 (GAON/IFPI). Latin pop/urban is the second major global genre crossover. Afrobeats is the fastest-growing genre by radio airplay additions in the U.S. and UK (Luminate Year-End 2023)."
      ],
      standardPractice: "Understanding the global music landscape is essential for any artist or label planning international expansion. The U.S. market is both the largest and most competitive — breaking there provides global leverage. Japan requires physical distribution infrastructure and local label partnerships to capture full market value. Latin America is the highest-growth opportunity for English-language and crossover artists. China requires a localized strategy — NetEase Cloud Music and QQ Music dominate; Spotify is not available. For sync licensing (the $700M global sync market), U.S. and UK publishers dominate; registering with a sync licensing platform (Musicbed, Artlist, Songtradr) or signing with a sync-focused publisher is the primary access point. Global rights administration requires either a major publisher's sub-publishing network, a specialist rights administrator (Songtrust, AMRA, Kobalt), or direct affiliate relationships with foreign PROs.",
      commonMistakes: [
        "Assuming Spotify is the global streaming standard — in China it's QQ Music/NetEase, in South Korea it's Melon/Bugs, in Japan it's Line Music and Rakuten Music alongside Spotify; missing these platforms means missing major market revenue.",
        "Not registering neighboring rights for sound recordings — outside the U.S., featured artists and labels collect neighboring rights performance royalties from radio and public performance. These go uncollected without registration with PPL (UK), GVL (Germany), or ADAMI (France).",
        "Ignoring the Latin American opportunity — Latin streaming has outgrown every other region consistently since 2019; English-only artists with no Spanish-language reach miss the fastest-growing global audience.",
        "Not understanding Japan's physical market — Japan's top-selling artists release CD singles bundled with event tickets; ignoring physical distribution means losing the market's most lucrative segment.",
        "Treating global sync as a passive income stream — sync licensing is actively managed; it requires pitching supervisors, metadata accuracy (ISRC, ISWC, ownership chain), and in most cases a publisher or sync agent relationship."
      ],
      sources: [
        { type: "community", name: "Chartmetric Blog — Global Music Markets in 2024: Streaming Penetration, Regional Growth", url: "https://chartmetric.com/blog/global-music-markets-2024-streaming-penetration/" },
        { type: "industry", name: "IFPI Global Music Report 2024 — Official global recorded music revenue data, market share by region", url: "https://www.ifpi.org/ifpi-global-music-report-2024/" },
        { type: "academic", name: "Naveed, Watanabe & Neittaanmäki (2017). Co-evolution between Streaming and Live Music. Technology in Society.", url: "https://doi.org/10.1016/j.techsoc.2017.03.002" }
      ],
      chartData: [
        { region: "United States", revenueUSD: 9.0, percentOfGlobal: 31.5, streamingShare: 84 },
        { region: "Japan", revenueUSD: 2.8, percentOfGlobal: 9.8, streamingShare: 40 },
        { region: "United Kingdom", revenueUSD: 1.9, percentOfGlobal: 6.6, streamingShare: 77 },
        { region: "Germany", revenueUSD: 1.3, percentOfGlobal: 4.5, streamingShare: 68 },
        { region: "China", revenueUSD: 1.1, percentOfGlobal: 3.8, streamingShare: 88 },
        { region: "France", revenueUSD: 1.0, percentOfGlobal: 3.5, streamingShare: 72 },
        { region: "South Korea", revenueUSD: 0.9, percentOfGlobal: 3.1, streamingShare: 55 },
        { region: "Brazil", revenueUSD: 0.6, percentOfGlobal: 2.1, streamingShare: 91 },
        { region: "Canada", revenueUSD: 0.6, percentOfGlobal: 2.0, streamingShare: 83 },
        { region: "Australia", revenueUSD: 0.55, percentOfGlobal: 1.9, streamingShare: 80 },
        { region: "Mexico", revenueUSD: 0.45, percentOfGlobal: 1.6, streamingShare: 90 },
        { region: "Southeast Asia", revenueUSD: 0.5, percentOfGlobal: 1.7, streamingShare: 93 },
        { region: "Sub-Saharan Africa", revenueUSD: 0.12, percentOfGlobal: 0.4, streamingShare: 95 }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────
// ACCENT PALETTE (pastel, maps cat id to color)
// ─────────────────────────────────────────────────────────────
const ACCENT_PALETTE = {
  1:  { bg: '#bfdbfe', border: '#3b82f6', text: '#1e40af' },
  2:  { bg: '#fce7f3', border: '#ec4899', text: '#9d174d' },
  3:  { bg: '#fef9c3', border: '#eab308', text: '#713f12' },
  4:  { bg: '#ede9fe', border: '#8b5cf6', text: '#4c1d95' },
  5:  { bg: '#ccfbf1', border: '#14b8a6', text: '#134e4a' },
  6:  { bg: '#ffedd5', border: '#f97316', text: '#7c2d12' },
  7:  { bg: '#fee2e2', border: '#ef4444', text: '#7f1d1d' },
  8:  { bg: '#dcfce7', border: '#22c55e', text: '#14532d' },
  9:  { bg: '#ddd6fe', border: '#7c3aed', text: '#3b0764' },
  10: { bg: '#cffafe', border: '#06b6d4', text: '#164e63' },
  11: { bg: '#d1fae5', border: '#10b981', text: '#064e3b' },
  12: { bg: '#ffe4e6', border: '#f43f5e', text: '#881337' },
  13: { bg: '#fef3c7', border: '#f59e0b', text: '#78350f' },
  14: { bg: '#e0e7ff', border: '#6366f1', text: '#312e81' },
  15: { bg: '#f1f5f9', border: '#64748b', text: '#0f172a' },
  16: { bg: '#fefce8', border: '#ca8a04', text: '#713f12' },
  17: { bg: '#e0f2fe', border: '#0ea5e9', text: '#075985' },
  18: { bg: '#f5f5f4', border: '#78716c', text: '#292524' },
  19: { bg: '#fafafa', border: '#a3a3a3', text: '#171717' },
  20: { bg: '#fae8ff', border: '#d946ef', text: '#701a75' },
  21: { bg: '#fce7f3', border: '#db2777', text: '#831843' },
  22: { bg: '#fef3c3', border: '#d97706', text: '#78350f' },
  23: { bg: '#dcfce7', border: '#16a34a', text: '#14532d' },
  24: { bg: '#dbeafe', border: '#2563eb', text: '#1e3a8a' },
  25: { bg: '#f9fafb', border: '#6b7280', text: '#111827' },
  26: { bg: '#f8fafc', border: '#0f172a', text: '#0f172a' }
};

// ─────────────────────────────────────────────────────────────
// PARALLAX
// ─────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.parallax-bg');
  if (bg) {
    bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

// ─────────────────────────────────────────────────────────────
// SPA ROUTING
// ─────────────────────────────────────────────────────────────
let currentCatId = 1; // tracks active category for curriculum button

function showCategory(id) {
  const cat = MUSIC_DATA.categories.find(c => c.id === id);
  if (!cat) return;
  currentCatId = id;
  const area = document.getElementById('content-area');
  area.style.transition = 'opacity 0.2s ease';
  area.style.opacity = '0';
  setTimeout(() => {
    renderCategory(cat, area);
    area.style.opacity = '1';
  }, 200);

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-id="${id}"]`);
  if (activeNav) activeNav.classList.add('active');
}

// ─────────────────────────────────────────────────────────────
// CATEGORY RENDERER
// ─────────────────────────────────────────────────────────────
function renderCategory(cat, container) {
  const accent = ACCENT_PALETTE[cat.id] || ACCENT_PALETTE[1];

  let html = `
    <!-- HEADER CARD -->
    <div class="card card--header" style="border-left: 4px solid ${accent.border}; background: ${accent.bg};">
      <div class="cat-number" style="color: ${accent.border};">${String(cat.id).padStart(2, '0')}</div>
      <h1 class="cat-title">${cat.title}</h1>
      <p class="cat-summary">${cat.summary}</p>
    </div>

    <!-- KEY FACTS GRID -->
    <section class="section">
      <h2 class="section-label">Key Facts</h2>
      <div class="facts-grid">
        ${cat.keyFacts.map((f, i) => `
          <div class="card card--fact" style="border-left: 3px solid ${accent.border}; --fact-accent: ${accent.border};">
            <div class="fact-content">
              <div class="fact-num" style="color: ${accent.border};">${i + 1}</div>
              <p>${f}</p>
            </div>
            <span class="fact-src-tag" title="Source: ${cat.sources.map(s => s.name).join(' · ')}">src</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- STANDARD PRACTICE -->
    <section class="section">
      <h2 class="section-label">Standard Practice</h2>
      <div class="card card--full" style="border-left: 4px solid ${accent.border};">
        <p>${cat.standardPractice}</p>
      </div>
    </section>

    <!-- COMMON MISTAKES -->
    <section class="section">
      <h2 class="section-label">Common Mistakes</h2>
      <div class="mistakes-list">
        ${cat.commonMistakes.map(m => `
          <div class="card card--mistake">
            <span class="mistake-icon">!</span>
            <p>${m}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- CHART (cat 26 only — placed before sources) -->
    ${cat.id === 26 && cat.chartData ? (() => {
      const maxRevenue = Math.max(...cat.chartData.map(d => d.revenueUSD));
      return `
      <section class="section">
        <h2 class="section-label">Global Revenue by Market (2023, USD Billions)</h2>
        <div class="card card--full chart-card">
          <div class="bar-chart">
            ${cat.chartData.map(d => {
              const pct = (d.revenueUSD / maxRevenue * 100).toFixed(1);
              return `
                <div class="bar-row">
                  <div class="bar-label">${d.region}</div>
                  <div class="bar-track">
                    <div class="bar-fill" data-width="${pct}" style="width: 0%; background: ${accent.border};"></div>
                  </div>
                  <span class="bar-value">$${d.revenueUSD}B</span>
                  <div class="bar-pct">${d.percentOfGlobal}% of global</div>
                </div>
              `;
            }).join('')}
          </div>
          <p class="chart-note">Source: IFPI Global Music Report 2024. Bar width = share of top market ($9.0B US).</p>
        </div>
      </section>

      <section class="section">
        <h2 class="section-label">Streaming Share by Market</h2>
        <div class="card card--full chart-card">
          <div class="bar-chart">
            ${cat.chartData.map(d => `
              <div class="bar-row">
                <div class="bar-label">${d.region}</div>
                <div class="bar-track">
                  <div class="bar-fill bar-fill--stream" data-width="${d.streamingShare}" style="width: 0%; background: ${d.streamingShare >= 85 ? '#10b981' : d.streamingShare >= 65 ? '#3b82f6' : '#f59e0b'};"></div>
                </div>
                <span class="bar-value">${d.streamingShare}%</span>
              </div>
            `).join('')}
          </div>
          <p class="chart-note">Green = dominant streaming (&ge;85%). Blue = majority streaming (65–84%). Amber = mixed or physical-heavy.</p>
        </div>
      </section>
      `;
    })() : ''}

    <!-- SOURCES -->
    <section class="section">
      <h2 class="section-label">Sources</h2>
      <div class="sources-row">
        ${cat.sources.map(s => `
          <a class="card card--source card--source-${s.type}" href="${s.url}" target="_blank" rel="noopener">
            <span class="source-type">${s.type}</span>
            <span class="source-name">${s.name}</span>
          </a>
        `).join('')}
      </div>
    </section>
  `;

  container.innerHTML = html;

  // Animate bars from 0 to target width after DOM paint
  requestAnimationFrame(() => {
    container.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  });
}

// ─────────────────────────────────────────────────────────────
// NAV BUILDER
// ─────────────────────────────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.innerHTML = MUSIC_DATA.categories.map(cat => {
    const accent = ACCENT_PALETTE[cat.id] || ACCENT_PALETTE[1];
    return `
      <button
        class="nav-item"
        data-id="${cat.id}"
        onclick="showCategory(${cat.id})"
        title="${cat.title}"
        aria-label="${cat.title}"
        style="--dot-color: ${accent.border};"
      >
        <span class="nav-num">${cat.id}</span>
        <span class="nav-tooltip">${cat.title}</span>
      </button>
    `;
  }).join('');
}

// ─────────────────────────────────────────────────────────────
// CURRICULUM OVERLAY
// ─────────────────────────────────────────────────────────────
function openCurriculum(catId) {
  const cat = MUSIC_DATA.categories.find(c => c.id === catId);
  if (!cat) return;
  const accent = ACCENT_PALETTE[cat.id] || ACCENT_PALETTE[1];

  // Synthesize implementation steps from keyFacts + standardPractice
  const stepSources = [
    ...cat.keyFacts.slice(0, 2),
    cat.standardPractice
  ];
  const steps = [
    `Research the current landscape: understand the core numbers and percentages relevant to ${cat.title.toLowerCase()} before making any decisions.`,
    `Register and set up all required accounts, organizations, or platforms related to ${cat.title.toLowerCase()} — don't skip the bureaucratic step.`,
    `Build your baseline: document your starting position, goals, and key metrics you'll track.`,
    `Execute the standard practice: follow industry norms for your situation and adjust based on your specific deal structure or platform mix.`,
    `Monitor and iterate: pull analytics monthly, compare against benchmarks, and revise strategy every quarter.`
  ];

  const factGroups = {
    foundation: cat.keyFacts.slice(0, 2),
    insights: cat.keyFacts.slice(2)
  };

  const html = `
    <span class="curr-badge" style="background: ${accent.bg}; color: ${accent.text}; border: 1px solid ${accent.border};">${cat.title}</span>
    <h2 class="curr-big-title">The Complete Guide to ${cat.title}</h2>
    <p class="curr-subtitle">${cat.summary}</p>

    <!-- FOUNDATION -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: ${accent.border};"></span>
        <span class="curr-section-title">Foundation</span>
        <span class="curr-section-line"></span>
      </div>
      ${factGroups.foundation.map(f => `<div class="curr-fact-item">· ${f}</div>`).join('')}
    </div>

    <!-- CORE CONCEPTS -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: ${accent.border};"></span>
        <span class="curr-section-title">Core Concepts</span>
        <span class="curr-section-line"></span>
      </div>
      ${factGroups.insights.map(f => `<div class="curr-fact-item">· ${f}</div>`).join('')}
    </div>

    <!-- STANDARD PRACTICE -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: ${accent.border};"></span>
        <span class="curr-section-title">Standard Practice</span>
        <span class="curr-section-line"></span>
      </div>
      <p class="curr-prose">${cat.standardPractice}</p>
    </div>

    <!-- COMMON PITFALLS -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: #ef4444;"></span>
        <span class="curr-section-title">Common Pitfalls</span>
        <span class="curr-section-line"></span>
      </div>
      ${cat.commonMistakes.map(m => `<div class="curr-pitfall">${m}</div>`).join('')}
    </div>

    <!-- HANDS-ON IMPLEMENTATION -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: ${accent.border};"></span>
        <span class="curr-section-title">Hands-On Implementation</span>
        <span class="curr-section-line"></span>
      </div>
      ${steps.map((s, i) => `
        <div class="curr-step">
          <span class="curr-step-num" style="background: ${accent.border};">${i + 1}</span>
          <span class="curr-step-text">${s}</span>
        </div>
      `).join('')}
    </div>

    <!-- SOURCES -->
    <div class="curr-section">
      <div class="curr-section-header">
        <span class="curr-dot" style="background: #6b7280;"></span>
        <span class="curr-section-title">Sources</span>
        <span class="curr-section-line"></span>
      </div>
      <div class="curr-sources-row">
        ${cat.sources.map(s => `
          <a class="curr-src-pill" href="${s.url}" target="_blank" rel="noopener" data-stype="${s.type}">
            <span class="curr-src-type">${s.type}</span>
            <span class="curr-src-name">${s.name}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('curr-content').innerHTML = html;
  document.getElementById('curriculum-overlay').classList.remove('hidden');
}

function closeCurriculum() {
  document.getElementById('curriculum-overlay').classList.add('hidden');
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  showCategory(1); // default load

  // Curriculum button → open for active category
  document.getElementById('curriculum-btn').addEventListener('click', () => {
    openCurriculum(currentCatId);
  });

  // Close button
  document.querySelector('.curr-close').addEventListener('click', closeCurriculum);

  // Backdrop click → close
  document.getElementById('curriculum-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('curriculum-overlay')) closeCurriculum();
  });
});
