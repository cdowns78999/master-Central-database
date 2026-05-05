/**
 * EQUILIBRIUM MASTER MAPPING DATABASE
 * ----------------------------------
 * This data structure serves as the foundation for the 1-Click Apply workflow.
 * It maps high-level "Strategic Plans" to the granular "Timeline Blocks"
 * required by the campaign kit dashboard.
 */

const EQUILIBRIUM_DB = {
    // 1. Plan Categories
    categories: ["Marquee-Only", "Showcase-Only"],

    // 2. Plan Hierarchies (Templates)
    plans: {
        "marquee_large": {
            name: "Large Scale Marquee",
            category: "Marquee-Only",
            badge: "Scale Up",
            totalBudget: "$3.5k – $5k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Marquee", target: "Super Listeners", action: "Splash Strike", timing: "7 Days", budgetRange: [500, 750], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Large-scale Marquee strike targeting Super Listeners to capture Day 1 momentum." },
                { id: 2, title: "Phase 2: Single 2", tool: "Marquee", target: "Moderate Listeners", action: "Splash Strike", timing: "10 Days", budgetRange: [750, 1000], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Sustain momentum with Single 2 targeting moderate segments." },
                { id: 3, title: "Phase 3: Single 3", tool: "Marquee", target: "Light Listeners", action: "Splash Strike", timing: "14 Days", budgetRange: [900, 1300], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Broadening reach with Single 3 to prime casual listeners for the EP." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Marquee", target: "All Segments", action: "Splash Strike", timing: "14 Days", budgetRange: [1350, 2000], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Maximum budget deployment on EP drop for long-term LTV and chart impact." }
            ]
        },
        "marquee_original": {
            name: "Equilibrium Marquee",
            category: "Marquee-Only",
            badge: "Original",
            totalBudget: "$2.7k – $3.9k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Marquee", target: "Super Listeners", action: "Splash Strike", timing: "7 Days", budgetRange: [400, 600], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Standard strategic Marquee for Single 1." },
                { id: 2, title: "Phase 2: Single 2", tool: "Marquee", target: "Moderate Listeners", action: "Splash Strike", timing: "10 Days", budgetRange: [600, 800], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Standard strategic Marquee for Single 2." },
                { id: 3, title: "Phase 3: Single 3", tool: "Marquee", target: "Light Listeners", action: "Splash Strike", timing: "14 Days", budgetRange: [700, 1000], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Standard strategic Marquee for Single 3." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Marquee", target: "All Segments", action: "Splash Strike", timing: "14 Days", budgetRange: [1000, 1500], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Full Marquee campaign for EP release." }
            ]
        },
        "marquee_affordable": {
            name: "Entry Level Marquee",
            category: "Marquee-Only",
            badge: "Affordable",
            totalBudget: "$2k – $3k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Marquee", target: "Super Listeners", action: "Splash Strike", timing: "7 Days", budgetRange: [300, 450], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Cost-effective Marquee for early momentum." },
                { id: 2, title: "Phase 2: Single 2", tool: "Marquee", target: "Moderate Listeners", action: "Splash Strike", timing: "10 Days", budgetRange: [450, 600], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Balanced approach for Single 2." },
                { id: 3, title: "Phase 3: Single 3", tool: "Marquee", target: "Light Listeners", action: "Splash Strike", timing: "14 Days", budgetRange: [550, 750], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Priming audience for EP launch." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Marquee", target: "All Segments", action: "Splash Strike", timing: "14 Days", budgetRange: [700, 1200], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Focused spend for EP release sustainability." }
            ]
        },
        "marquee_micro": {
            name: "Micro Marquee",
            category: "Marquee-Only",
            badge: "Experimental",
            totalBudget: "$1k – $1.5k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Marquee", target: "Super Listeners", action: "Splash Strike", timing: "7 Days", budgetRange: [100, 200], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Minimum viable Marquee for new artists." },
                { id: 2, title: "Phase 2: Single 2", tool: "Marquee", target: "Moderate Listeners", action: "Splash Strike", timing: "10 Days", budgetRange: [200, 300], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Experimental reach on second single." },
                { id: 3, title: "Phase 3: Single 3", tool: "Marquee", target: "Light Listeners", action: "Splash Strike", timing: "14 Days", budgetRange: [300, 400], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Building core listeners for EP." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Marquee", target: "All Segments", action: "Splash Strike", timing: "14 Days", budgetRange: [400, 600], impact: "8x LIFT", theme: "theme-purple", icon: "🎯", phase: "Release Week", desc: "Entry-level blast for album drop." }
            ]
        },
        "showcase_large": {
            name: "Large Scale Showcase",
            category: "Showcase-Only",
            badge: "Scale Up",
            totalBudget: "$2.8k – $4.3k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Showcase", target: "Super Listeners", action: "Wave Strategy", timing: "7 Days", budgetRange: [400, 650], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Broad discovery wave for Single 1." },
                { id: 2, title: "Phase 2: Single 2", tool: "Showcase", target: "Moderate Listeners", action: "Wave Strategy", timing: "10 Days", budgetRange: [650, 900], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Deepening engagement with second track." },
                { id: 3, title: "Phase 3: Single 3", tool: "Showcase", target: "Light Listeners", action: "Wave Strategy", timing: "14 Days", budgetRange: [800, 1200], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Broad market penetration before drop." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Showcase", target: "All Segments", action: "Wave Strategy", timing: "14 Days", budgetRange: [950, 1550], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Catalog-wide discovery boost for EP release." }
            ]
        },
        "showcase_original": {
            name: "Equilibrium Showcase",
            category: "Showcase-Only",
            badge: "Original",
            totalBudget: "$2.2k – $3.3k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Showcase", target: "Super Listeners", action: "Wave Strategy", timing: "7 Days", budgetRange: [300, 500], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Standard Showcase discovery." },
                { id: 2, title: "Phase 2: Single 2", tool: "Showcase", target: "Moderate Listeners", action: "Wave Strategy", timing: "10 Days", budgetRange: [500, 700], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Engagement lift for Single 2." },
                { id: 3, title: "Phase 3: Single 3", tool: "Showcase", target: "Light Listeners", action: "Wave Strategy", timing: "14 Days", budgetRange: [600, 900], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Building warm audiences." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Showcase", target: "All Segments", action: "Wave Strategy", timing: "14 Days", budgetRange: [800, 1200], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Sustain strategy for full EP." }
            ]
        },
        "showcase_affordable": {
            name: "Entry Level Showcase",
            category: "Showcase-Only",
            badge: "Affordable",
            totalBudget: "$1.7k – $2.5k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Showcase", target: "Super Listeners", action: "Wave Strategy", timing: "7 Days", budgetRange: [250, 400], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Efficient Showcase discovery." },
                { id: 2, title: "Phase 2: Single 2", tool: "Showcase", target: "Moderate Listeners", action: "Wave Strategy", timing: "10 Days", budgetRange: [400, 550], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Moderate reach for second single." },
                { id: 3, title: "Phase 3: Single 3", tool: "Showcase", target: "Light Listeners", action: "Wave Strategy", timing: "14 Days", budgetRange: [450, 700], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Pre-release audience building." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Showcase", target: "All Segments", action: "Wave Strategy", timing: "14 Days", budgetRange: [600, 900], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "EP launch discovery support." }
            ]
        },
        "showcase_micro": {
            name: "Micro Showcase",
            category: "Showcase-Only",
            badge: "Experimental",
            totalBudget: "$0.9k – $1.4k",
            phases: [
                { id: 1, title: "Phase 1: Single 1", tool: "Showcase", target: "Super Listeners", action: "Wave Strategy", timing: "7 Days", budgetRange: [100, 200], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Low-cost discovery test." },
                { id: 2, title: "Phase 2: Single 2", tool: "Showcase", target: "Moderate Listeners", action: "Wave Strategy", timing: "10 Days", budgetRange: [200, 300], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Building data on second track." },
                { id: 3, title: "Phase 3: Single 3", tool: "Showcase", target: "Light Listeners", action: "Wave Strategy", timing: "14 Days", budgetRange: [250, 400], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Small scale intent build." },
                { id: 4, title: "Phase 4: EP Drop", tool: "Showcase", target: "All Segments", action: "Wave Strategy", timing: "14 Days", budgetRange: [350, 500], impact: "31x DEPTH", theme: "theme-blue", icon: "🌊", phase: "Release Week", desc: "Experimental EP release discovery." }
            ]
        }
    },

    // 3. Field Definitions & Mapping
    fields: {
        tool: {
            "Marquee": { icon: "🎞️", context: "Full Screen Release Ad", benchmark: "16% Conv" },
            "Showcase": { icon: "🖼️", context: "Sponsored Recommendation", benchmark: "10% Conv" },
            "Discovery Mode": { icon: "🌱", context: "Radio & Autoplay Seeding", benchmark: "Algorithmic" },
            "Playlist Pitch": { icon: "📋", context: "Editorial Curator Submission", benchmark: "Placement" }
        },
        target: {
            "Super Listeners": { desc: "Your most loyal fans" },
            "Moderate Listeners": { desc: "Listen 2-3x monthly" },
            "Light Listeners": { desc: "Listen occasionally" },
            "Previously Active": { desc: "Former fans to revive" },
            "Programmed": { desc: "Algorithmic reach" },
            "Potential": { desc: "New release prospects" },
            "All Segments": { desc: "Full audience reach" },
            "Cold Audiences": { desc: "Expanding your reach" },
            "Light & Moderate": { desc: "Mid-tier fan growth" },
            "Active Listeners": { desc: "Current engaged base" },
            "Rotating Segments": { desc: "Multi-layer coverage" },
            "Spotify Editors": { desc: "Pitching for curators" }
        },
        action: {
            "Splash Strike": { desc: "High-impact day 1" },
            "Wave Strategy": { desc: "Sustained momentum" },
            "Algorithmic Seeding": { desc: "Long-term growth" },
            "Intentional Strike": { desc: "Conversion focused" },
            "New Music Push": { desc: "Content awareness" },
            "Repeat Strike": { desc: "Sustain momentum" },
            "Perpetual Loop": { desc: "Infinite discovery" },
            "Velocity Strike": { desc: "Building hype fast" },
            "Editorial Pitch": { desc: "Strategic submission" },
            "Depth Deepening": { desc: "Retention focused" },
            "Sustain Seeding": { desc: "Maintaining traction" }
        },
        impact: {
            "8x LIFT": { desc: "Conversion spike" },
            "31x DEPTH": { desc: "Stream recurrence" },
            "3x SAVES": { desc: "Library growth" },
            "∞ REACH": { desc: "Brand awareness" },
            "∞ ALGO YIELD": { desc: "Passive discovery" },
            "30x STREAMS": { desc: "Massive volume boost" },
            "PLACEMENT": { desc: "Editorial approval" },
            "440% LIFT": { desc: "Discovery engine" },
            "6x STREAMS": { desc: "Consistent lift" }
        }
    }
};

// Exporting for use in both frontend files via message passing
if (typeof module !== 'undefined') module.exports = EQUILIBRIUM_DB;
