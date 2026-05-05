#!/usr/bin/env python3
"""Build cat-16, cat-17, cat-18 HTML pages for elijah project (worker 6/9)."""
import html
import os
from pathlib import Path

import sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path("C:\\Users\\chad\\OneDrive\\Documents\\GitHub\\master-Central-database\\---- Anti Gravity ---- My Master Folder\\\U0001faa8 2026 Ultimate File Manager\\-- Results folder master forever\\Regular projects - 2\\!! 2026-04-24 — ozzy skill")
TEMPLATE = ROOT / "music industry base" / "templates" / "category-page.template.html"
OUT_DIR = ROOT / "elijah" / "pages"

def esc(s: str) -> str:
    return html.escape(s, quote=True)

def card(topic, title, meta, quote, why, url):
    """Render a result-card as in research-curriculum.html."""
    safe_url = url if str(url).startswith("http") else "#"
    meta_html = ""
    if meta:
        parts = [p for p in meta if p]
        meta_html = '<span class="dot"></span>'.join(f'<span>{esc(p)}</span>' for p in parts)
    quote_html = f'<p class="result-quote">"{esc(quote)}"</p>' if quote else ""
    why_html = f'<p class="result-why"><strong>Why relevant</strong>{esc(why)}</p>' if why else ""
    return (
        '      <article class="result-card">\n'
        f'        <span class="topic-chip">{esc(topic)}</span>\n'
        f'        <h3>{esc(title)}</h3>\n'
        f'        <div class="result-meta">{meta_html or "<span>—</span>"}</div>\n'
        f'        {quote_html}\n'
        f'        {why_html}\n'
        f'        <a class="result-source" href="{esc(safe_url)}" target="_blank" rel="noopener">↗ source</a>\n'
        '      </article>'
    )

def render_outline(items):
    out = []
    for label, body in items:
        out.append(f'      <li><strong>{esc(label)}</strong>{esc(body)}</li>')
    return "\n".join(out)

def build_page(cat):
    tpl = TEMPLATE.read_text(encoding="utf-8")
    repl = {
        "TITLE_TAG": f"Cat {cat['id']} — {cat['title']}",
        "EYEBROW": f"Cat {cat['id']} · Music Business Education",
        "PAGE_TITLE": cat["title"],
        "PAGE_SUBTITLE": cat["subtitle"],
        "REGISTER_BTN_HREF": "#sources",
        "REGISTER_BTN_TEXT": "Open Source Bank",
        "EX_SECTION_HEADLINE": "Key Concepts — Reference Points",
        "EX_SECTION_META": "click any tile to open spec",
        "EX1_NAME": cat["ex"][0]["name"],
        "EX1_TAG": cat["ex"][0]["tag"].upper(),
        "EX1_BLURB": cat["ex"][0]["blurb"],
        "EX1_DIALOG_TAG": "Reference · Key Fact",
        "EX1_DIALOG_HEADLINE": "Why this matters",
        "EX1_DIALOG_BODY": cat["ex"][0]["body"],
        "EX1_DIALOG_BULLETS": cat["ex"][0]["bullets"],
        "EX2_NAME": cat["ex"][1]["name"],
        "EX2_TAG": cat["ex"][1]["tag"].upper(),
        "EX2_BLURB": cat["ex"][1]["blurb"],
        "EX2_DIALOG_TAG": "Reference · Key Fact",
        "EX2_DIALOG_HEADLINE": "Why this matters",
        "EX2_DIALOG_BODY": cat["ex"][1]["body"],
        "EX2_DIALOG_BULLETS": cat["ex"][1]["bullets"],
        "EX3_NAME": cat["ex"][2]["name"],
        "EX3_TAG": cat["ex"][2]["tag"].upper(),
        "EX3_BLURB": cat["ex"][2]["blurb"],
        "EX3_DIALOG_TAG": "Reference · Key Fact",
        "EX3_DIALOG_HEADLINE": "Why this matters",
        "EX3_DIALOG_BODY": cat["ex"][2]["body"],
        "EX3_DIALOG_BULLETS": cat["ex"][2]["bullets"],
        "ACADEMIC_HEADLINE": "Academic & Official Sources",
        "ACADEMIC_META": f"{len(cat['academic'])} cards",
        "ACADEMIC_CARDS_HTML": "\n".join(card(*c) for c in cat["academic"]),
        "MAINSTREAM_HEADLINE": "Mainstream Industry Press",
        "MAINSTREAM_META": f"{len(cat['mainstream'])} cards",
        "MAINSTREAM_CARDS_HTML": "\n".join(card(*c) for c in cat["mainstream"]),
        "BLOGS_HEADLINE": "Practitioner & Community Blogs",
        "BLOGS_META": f"{len(cat['blogs'])} cards",
        "BLOGS_CARDS_HTML": "\n".join(card(*c) for c in cat["blogs"]),
        "OUTLINE_HEADLINE": "Curriculum Outline",
        "OUTLINE_META": "key facts + watch-outs",
        "OUTLINE_ITEMS_HTML": render_outline(cat["outline"]),
    }
    out = tpl
    for k, v in repl.items():
        # Most fields need escaping; HTML chunks already escaped do not.
        if k.endswith("_HTML") or k in ("EX1_DIALOG_BULLETS", "EX2_DIALOG_BULLETS", "EX3_DIALOG_BULLETS"):
            out = out.replace("{{" + k + "}}", v)
        else:
            out = out.replace("{{" + k + "}}", esc(v))
    return out

def bullets(items):
    return "".join(f"<li>{esc(s)}</li>" for s in items)

# ============================================================
# CAT 16 — Copyright & Ownership
# ============================================================
cat16 = {
    "id": 16,
    "title": "Copyright & Ownership",
    "subtitle": "Copyright in music is bifurcated: there is a separate copyright in the musical composition (melody + lyrics) and in the sound recording (the master).",
    "ex": [
        {
            "name": "Two-Copyright Rule",
            "tag": "Bifurcated Ownership",
            "blurb": "Every recorded song carries two distinct copyrights — the composition (writers/publisher) and the sound recording (label or artist).",
            "body": "Two copyrights live inside every recorded song. The composition copyright belongs to the songwriter(s) and any publisher; the sound recording (master) copyright belongs to whoever funded the session. In a major label deal the label takes the master; in an indie release the artist owns both. Each copyright is licensed and monetized through different organizations.",
            "bullets": bullets([
                "Composition copyright = melody + lyrics, owned by writer(s) / publisher.",
                "Sound recording (master) copyright = the specific recorded performance, owned by whoever paid.",
                "PROs collect on the composition; SoundExchange collects on the master.",
                "Split sheets must document composition ownership before the session ends.",
            ]),
        },
        {
            "name": "Automatic Fixation",
            "tag": "Registration Still Critical",
            "blurb": "Copyright attaches the moment a song is recorded or written down — but registration is required to sue for statutory damages.",
            "body": "U.S. copyright attaches automatically upon fixation: the second the song is recorded or written down, you own the copyright. But to sue infringers for statutory damages and attorney's fees in federal court, you must register with the U.S. Copyright Office before the infringement (or within three months of publication). Without registration you can still sue for actual damages — but those are usually too small to make litigation viable.",
            "bullets": bullets([
                "Fixation = ownership; registration = enforceability.",
                "Statutory damages run $30,000–$150,000 per work for willful infringement.",
                "Register within 3 months of publication to preserve full remedies.",
                "Use the eCO (electronic Copyright Office) system at copyright.gov.",
            ]),
        },
        {
            "name": "Registration Fees",
            "tag": "$45–$85 Filings",
            "blurb": "Single-work online registration runs $45–$65; an unpublished collection costs $85 and covers unlimited songs filed together.",
            "body": "Registration is cheap relative to its leverage. A single-work online filing is $45–$65; a group of unpublished works can be filed together for $85, regardless of how many songs are in the batch. Publishers commonly batch-register at album milestones; labels file Form SR for sound recordings, while Form PA covers the composition only. International protection is automatic in the 181 Berne Convention countries.",
            "bullets": bullets([
                "Online single-work filing: $45–$65.",
                "Unpublished-collection filing: $85, unlimited songs in one batch.",
                "Form SR = sound recording, Form PA = composition, Form SR can cover both if same owner.",
                "Berne Convention grants automatic protection in 181 signatory countries.",
            ]),
        },
    ],
    "academic": [
        ("Copyright Office", "What Musicians Should Know about Copyright", ["U.S. Copyright Office", "copyright.gov", "2024"], "", "Official primer from the U.S. Copyright Office on the two-copyright structure and registration mechanics.", "https://www.copyright.gov/engage/musicians/"),
        ("Statutory Damages", "What Are Statutory Damages", ["Copyright Alliance", "copyrightalliance.org"], "", "Authoritative explainer on the statutory-damages regime that drives early registration.", "https://copyrightalliance.org/faqs/statutory-damages-why-do-they-matter/"),
        ("Copyright Office", "Fees | U.S. Copyright Office", ["U.S. Copyright Office", "copyright.gov"], "", "Official, current fee schedule for single-work and group filings.", "https://www.copyright.gov/about/fees.html"),
        ("Copyright Office", "Sound Recordings as Works Made for Hire", ["U.S. Copyright Office", "copyright.gov"], "", "Government-issued analysis on whether sound recordings can be works made for hire.", "https://www.copyright.gov/docs/regstat52500.html"),
        ("Federal Statute", "17 U.S. Code § 412 — Registration as Prerequisite to Certain Remedies", ["Cornell Legal Information Institute", "law.cornell.edu"], "", "The statute that makes pre-infringement registration a prerequisite for statutory damages.", "https://www.law.cornell.edu/uscode/text/17/412"),
        ("Copyright Office", "Termination of Transfers and Licenses Under 17 U.S.C. § 203", ["U.S. Copyright Office", "copyright.gov"], "", "Official guidance on the 35-year termination window — critical for long-term ownership planning.", "https://www.copyright.gov/docs/203.html"),
        ("Treatise", "Stim, R. — Music Law: How to Run Your Band's Business (9th ed.)", ["Nolo Press", "Stim, R.", "2021"], "", "Standard practitioner treatise; chapters 1–4 cover copyright fundamentals for working musicians.", "https://www.nolo.com/products/music-law-mus.html"),
    ],
    "mainstream": [
        ("Industry Press", "How Copyright Law Shapes the Modern Music Business", ["Billboard Pro", "billboard.com", "2023"], "", "Industry-grade analysis tying copyright doctrine to current label and streaming economics.", "https://www.billboard.com/pro/music-copyright-law-modern-music-business-analysis/"),
    ],
    "blogs": [
        ("Indie Education", "Music Copyright: Everything Indie Artists Need to Know", ["DIY Musician (CD Baby)", "diymusician.cdbaby.com"], "", "Plain-language indie-artist primer on the two-copyright structure and registration.", "https://diymusician.cdbaby.com/music-rights/music-copyright-everything-indie-artists-need-to-know/"),
        ("Licensing", "Music Licensing 101 — Master vs. Composition Copyright", ["Soundscape", "soundscape.io"], "", "Side-by-side breakdown of the master copyright versus the composition copyright.", "https://soundscape.io/blog/music-licensing-101-music-copyright/"),
        ("Practitioner", "Register Your Copyrights Early or Say Goodbye to Statutory Damages", ["Jaburg Wilk", "jaburgwilk.com"], "", "Litigator's view on why early registration is the single most leveraged copyright move.", "https://www.jaburgwilk.com/news-publications/one-of-the-important-benefits-that-come-from-registering-copyrighted-works-early-is-the-ability-to-seek-statutory-damages-and-attorneys-fees-from-a-copyright-infringer-in-a-lawsuit-it-is-only"),
        ("Consumer Legal", "How Much Does It Cost to Get a Copyright?", ["LegalZoom", "legalzoom.com"], "", "Cost-focused walkthrough of single-work and group registration filings.", "https://www.legalzoom.com/articles/how-much-does-it-cost-to-get-a-copyright"),
        ("Studio Practice", "Recording Studios & Works For Hire: US Law", ["Frederick Recording Studio", "frederickrecordingstudio.com"], "", "Studio-side perspective on work-for-hire language and ownership traps.", "https://frederickrecordingstudio.com/post-707/"),
        ("Publisher Help", "What Does it Mean When a Song is a 'Work For Hire'?", ["Songtrust", "songtrust.com"], "", "Publisher-help explainer on work-for-hire's effect on termination rights.", "https://help.songtrust.com/knowledge/what-does-it-mean-when-a-song-is-a-work-for-hire"),
        ("Practitioner", "Co-Creators at Odds: Joint Copyright Authorship and Ownership", ["Crown LLP", "crownllp.com"], "", "Litigator's framing of joint-authorship doctrine and the unitary-work test.", "https://crownllp.com/blog/co-creators-at-odds-a-bit-about-joint-copyright-authorship-and-ownership/"),
        ("Legal Reference", "Copyright Ownership: The Joint Authorship Doctrine", ["FindLaw", "findlaw.com"], "", "Legal-reference summary of the joint-authorship test and accounting duties.", "https://corporate.findlaw.com/intellectual-property/copyright-ownership-the-joint-authorship-doctrine.html"),
        ("Songwriter Education", "Everything You Need to Know About a Split Sheet", ["Icon Collective", "iconcollective.edu"], "", "Practical split-sheet template + workflow used in modern songwriter sessions.", "https://www.iconcollective.edu/songwriter-split-sheet"),
        ("Publisher Help", "The Ultimate Split Sheet For Professional Songwriters", ["Songtrust", "songtrust.com"], "", "Publisher's split-sheet template and field-by-field guidance.", "https://www.songtrust.com/en/the-ultimate-split-sheet-for-songwriters"),
        ("Practitioner", "Split Sheets: Why You Need Them and How to Use", ["Orphiq", "orphiq.com"], "", "Practical 'how to actually use' walkthrough of split sheets in working sessions.", "https://orphiq.com/resources/split-sheets"),
        ("Practitioner", "Song Split Agreements: Protect Your Rights", ["Creative Intell", "blog.creativeintell.com"], "", "Contract-side discussion of converting split sheets into enforceable agreements.", "https://blog.creativeintell.com/song-split-agreement-how-to-protect-your-rights"),
        ("Practitioner", "Why Written Contracts Are Required to Own Collaborator Rights", ["Music Contracts", "musiccontracts.com"], "", "Why oral or implied agreements rarely transfer collaborator rights cleanly.", "https://www.musiccontracts.com/blog/2024/7/24/artist-advice-why-written-contracts-are-legally-required-in-order-to-own-the-rights-of-the-collaborators-you-hire"),
        ("Royalties Education", "Mechanical Royalties vs. Performance Royalties: What's the Difference?", ["Royalty Exchange", "royaltyexchange.com"], "", "Clean side-by-side of mechanicals (reproduction) vs. performance (broadcast).", "https://royaltyexchange.com/blog/mechanical-and-performance-royalties-whats-the-difference"),
        ("PRO Official", "What is the Difference Between Performing Right, Mechanical and Sync Royalties?", ["BMI", "bmi.com"], "", "Source-of-record from a major U.S. PRO on the three distinct royalty streams.", "https://www.bmi.com/faq/entry/what_is_the_difference_between_performing_right_royalties_mechanical_r"),
        ("Practitioner", "'A Second Bite at the Apple': Section 203 Recapture Rights", ["Morgan Lewis", "morganlewis.com", "2024"], "", "Recent case-driven look at how Section 203 termination is being litigated today.", "https://www.morganlewis.com/pubs/2024/10/a-second-bite-at-the-apple-copyright-case-highlights-section-203-recapture-rights"),
    ],
    "outline": [
        ("Two copyrights per song. ", "Composition (writer/publisher) and sound recording (label or artist) are separate, separately licensed, and separately collected."),
        ("Fixation grants ownership; registration grants remedies. ", "Without registration you cannot reach statutory damages or attorney's fees in federal court."),
        ("Registration fees are trivial. ", "$45–$65 per single work online; $85 for an unpublished group filing of unlimited songs."),
        ("Work-for-hire is a permanent surrender. ", "A signed work-for-hire agreement extinguishes both ownership and Section 203 termination rights."),
        ("Avoid: skipping split sheets at the session. ", "Verbal agreements about ownership shares are nearly impossible to enforce after a hit."),
        ("Avoid: registering only after a dispute. ", "Late registration locks you out of statutory damages worth $30,000–$150,000 per work."),
        ("Avoid: missing the Section 203 window. ", "The 35-to-40-year termination window is permanent — miss it and the rights stay transferred."),
    ],
}

# ============================================================
# CAT 17 — PROs (Performance Rights Organizations)
# ============================================================
cat17 = {
    "id": 17,
    "title": "PROs — Performance Rights Organizations",
    "subtitle": "Performing Rights Organizations (PROs) collect and distribute performance royalties on behalf of songwriters and music publishers whenever compositions are publicly performed — on radio, TV, streaming, in restaurants, at concerts, and more.",
    "ex": [
        {
            "name": "Composition vs. Master",
            "tag": "PROs Cover Compositions Only",
            "blurb": "PROs collect public performance royalties for the composition — not the sound recording. Master performance royalties go to SoundExchange.",
            "body": "PROs (ASCAP, BMI, SESAC, GMR) license the composition: when a song is publicly performed, the writer and publisher get paid through their PRO. The sound recording's performance royalty — owed by digital radio services like Pandora and SiriusXM — is collected separately by SoundExchange. Both streams come from the same broadcast, but they pay different rights holders and require different registrations.",
            "bullets": bullets([
                "PRO = composition performance royalty (writers + publishers).",
                "SoundExchange = sound recording digital performance royalty (artists + labels).",
                "Terrestrial AM/FM in the U.S. pays only the composition side, not the master.",
                "International sister societies (PRS, GEMA, SACEM) reciprocate through bilateral agreements.",
            ]),
        },
        {
            "name": "Choosing Your PRO",
            "tag": "ASCAP / BMI / SESAC / GMR",
            "blurb": "Three primary U.S. PROs (plus invite-only GMR). Pick exactly one — dual writer membership violates both organizations' rules.",
            "body": "ASCAP is a nonprofit with ~1M members and a $50 writer fee. BMI is free for songwriters and represents ~1.3M members; publisher accounts cost $150. SESAC is invite-only, smaller, and often pays higher rates for radio-heavy catalogs. Global Music Rights (GMR) is invite-only and concentrates on major legacy catalogs. You can be a member of only one U.S. PRO at a time as a writer — switching requires resignation and re-affiliation.",
            "bullets": bullets([
                "ASCAP — nonprofit, ~1M members, $50 writer fee, $50 publisher fee.",
                "BMI — for-profit, ~1.3M members, free writer registration, $150 publisher.",
                "SESAC — invite-only, smaller catalog, often higher per-spin rates.",
                "GMR — invite-only, focused on major legacy catalogs.",
            ]),
        },
        {
            "name": "50/50 Writer + Publisher",
            "tag": "Register Both Sides",
            "blurb": "Performance royalties split 50/50 between writer and publisher shares — to collect 100% you must register as both.",
            "body": "PROs always split a song's performance royalty 50/50 between the writer share and the publisher share. If you have no publisher account, the publisher share goes unclaimed or held. Self-administering writers form a publishing entity (often a sole-proprietor publishing company) and register both as writer AND as publisher to capture both halves of every performance royalty.",
            "bullets": bullets([
                "Writer share = 50% of performance royalty, paid directly to the songwriter.",
                "Publisher share = 50%, paid to the publisher (or to a self-pub entity).",
                "Without publisher registration, half of every payment is held or pooled.",
                "Self-administered writers commonly set up a sole-prop publisher to claim both shares.",
            ]),
        },
    ],
    "academic": [
        ("PRO Official", "SOCAN International Royalties", ["SOCAN", "socan.com"], "", "Source-of-record on Canada's PRO and how reciprocal agreements route U.S. artists' Canadian royalties.", "https://www.socan.com/about/international-royalties/"),
        ("PRO Official", "Understanding International Royalties — SOCAN Words and Music", ["SOCAN Magazine", "socanmagazine.ca"], "", "SOCAN's own explainer of the international royalty pipeline and timing.", "https://www.socanmagazine.ca/socan-academy/socan-academy-x-international-royalties/"),
        ("PRO Official", "Collecting ASCAP International Royalties", ["ASCAP", "ascap.com"], "", "ASCAP's official guidance on how international performance royalties flow back to U.S. members.", "https://www.ascap.com/help/royalties-and-payment/payment/international"),
        ("PRO Official", "What's an ISWC?", ["ASCAP", "ascap.com"], "", "ASCAP's official explanation of ISWC codes and why they're required for international tracking.", "https://www.ascap.com/help/registering-your-music/iswc-number-work-codes-faq"),
        ("Academic", "Kretschmer & Kawohl — The History and Philosophy of Copyright (Music and Copyright)", ["Edinburgh University Press", "Frith & Marshall (eds.)", "2004"], "", "Academic chapter situating PROs inside the longer history of music copyright collection.", "https://edinburghuniversitypress.com/book-music-and-copyright.html"),
    ],
    "mainstream": [
        ("Industry Press", "How PROs Work in the Streaming Era: An Updated Breakdown", ["Music Business Worldwide", "musicbusinessworldwide.com", "2023"], "", "Industry-grade update on how PROs operate inside DSP-driven royalty flows.", "https://www.musicbusinessworldwide.com/pros-streaming-era-breakdown/"),
        ("Industry Data", "BMI vs ASCAP vs SESAC: Which PRO is Right for You?", ["Soundcharts", "soundcharts.com"], "", "Data-driven side-by-side of the three main U.S. PROs from a major industry analytics platform.", "https://soundcharts.com/en/blog/bmi-vs-ascap"),
    ],
    "blogs": [
        ("Distributor Education", "ASCAP vs BMI vs SESAC: Which PRO Should You Join?", ["DistroKid", "distrokid.com/blog"], "", "Distributor-side education aimed at indie writers comparing the three U.S. PROs.", "https://distrokid.com/blog/ascap-bmi-sesac-which-pro-should-you-join/"),
        ("Practitioner", "SoundExchange Guide: Collect Digital Performance Royalties", ["Zach Bornheimer Music", "zachbornheimermusic.com"], "", "Walks through how SoundExchange complements PRO membership for the master royalty stream.", "https://zachbornheimermusic.com/music-business/soundexchange-explained-digital-radio-royalties-made-simple/"),
        ("Industry Education", "BMI, SESAC, and ASCAP: What's the Difference?", ["Live365", "live365.com"], "", "Broadcaster-side explainer of how the three PROs interact with radio licensing.", "https://live365.com/blog/ascap-bmi-sesac-and-soundexchange-whats-the-difference/"),
        ("Licensing", "Comparing BMI vs. ASCAP vs. SESAC: Choosing The Right PRO", ["Cloud Cover Music", "cloudcovermusic.com"], "", "Licensing-side comparison framing PRO choice from the catalog-licensee perspective.", "https://cloudcovermusic.com/music-licensing-guide/bmi-vs-ascap-vs-sesac"),
        ("Songwriter Education", "Songwriters! Registering With ASCAP or BMI Is Not Enough To Get Paid", ["Ari's Take", "aristake.com"], "", "Plain-spoken explanation of why you must also register as publisher.", "https://aristake.com/songwriter-royalties/"),
        ("Distributor Education", "Everything You Need To Know About Registering with PROs", ["Symphonic", "blog.symphonic.com", "2024"], "", "Distributor's step-by-step on PRO registration mechanics for catalog rollouts.", "https://blog.symphonic.com/2024/09/09/everything-you-need-to-know-about-registering-with-pros-4/"),
        ("Royalties Education", "Collect Global Music Royalties: Worldwide Music Income", ["Zach Bornheimer Music", "zachbornheimermusic.com"], "", "How global royalties flow back through your home PRO from foreign sister societies.", "https://zachbornheimermusic.com/music-business/global-royalties-how-to-collect-internationally/"),
        ("Practitioner", "How to Register Your Songs with a PRO Step-by-Step", ["Wisseloord Academy", "wisseloord.org"], "", "Step-by-step registration walkthrough from a working studio's education arm.", "https://wisseloord.org/academy/how-to-register-your-songs-with-a-pro-step-by-step"),
        ("Songwriter Education", "BMI ASCAP: My Essential 2026 Guide to Music Royalties", ["Playhouse Sound", "playhousesound.com"], "", "Updated 2026 walkthrough of writer-and-publisher registration mechanics.", "https://playhousesound.com/step-by-step-guide-to-registering-with-bmi-or-ascap/"),
        ("Publisher Help", "Understanding Unallocated Royalties", ["Songtrust", "blog.songtrust.com"], "", "Publisher-side explainer on black-box and unallocated royalties when songs aren't registered.", "https://blog.songtrust.com/unclaimed-unallocated-and-black-box-royalties"),
        ("Publisher Help", "Royalties You're Missing Out On", ["Songtrust", "blog.songtrust.com"], "", "Catalog-side rundown of royalty streams writers commonly leave on the table.", "https://blog.songtrust.com/royalties-you-are-missing-even-with-a-pro"),
        ("Practitioner", "The MLC (Mechanical Licensing Collective) Explained", ["Orphiq", "orphiq.com"], "", "Why on-demand streaming mechanicals route through the MLC, not your PRO.", "https://orphiq.com/resources/mlc-mechanical-licensing-collective"),
        ("Royalties Education", "Performance vs Mechanical Royalties: Music Income Explained", ["Zach Bornheimer Music", "zachbornheimermusic.com"], "", "Side-by-side framing of the two different royalty streams generated by streaming.", "https://zachbornheimermusic.com/music-business/performance-royalties-vs-mechanical-royalties-whats-the-difference/"),
        ("Practitioner", "Can I Be a Member of Two PROs at Once? (The One IPI Rule)", ["AudioBulb Music", "audiobulbmusic.com"], "", "Explains the One-IPI rule and why dual membership creates payment disputes.", "https://audiobulbmusic.com/member-of-two-pros-at-once-rules/"),
        ("Career Education", "ASCAP vs BMI: What's the Difference?", ["Careers in Music", "careersinmusic.com"], "", "Side-by-side comparison framed for early-career songwriters making the choice.", "https://www.careersinmusic.com/ascap-vs-bmi/"),
        ("Practitioner", "SoundExchange and Digital Performance Royalties", ["Orphiq", "orphiq.com"], "", "Why SoundExchange is a separate registration from your PRO and what it covers.", "https://orphiq.com/resources/soundexchange-digital-royalties"),
        ("Royalties Education", "Music Royalties — How to Get Your Share (SoundExchange + ASCAP/BMI + HFA)", ["Ari's Take", "aristake.com"], "", "End-to-end map of every royalty body a writer/artist needs to register with.", "https://aristake.com/what-is-soundexchange-ascap-bmi-pros-hfa-mechanicals-and-how-to-get-all-your-royalties/"),
    ],
    "outline": [
        ("PROs collect on the composition. ", "Performance royalties for the composition flow through ASCAP, BMI, SESAC, or GMR — never SoundExchange."),
        ("Pick one U.S. PRO. ", "ASCAP (nonprofit, $50), BMI (free writer / $150 publisher), SESAC or GMR (invite-only)."),
        ("Royalties split 50/50. ", "Writer share and publisher share — register both sides to collect the full 100% of every performance."),
        ("International pipeline runs 12–24 months. ", "Foreign sister PROs (PRS, GEMA, SACEM) collect locally and remit to your home PRO using ISWC metadata."),
        ("Avoid: registering only as a writer. ", "Without a publisher account, 50% of your performance royalties go unclaimed or held."),
        ("Avoid: assuming Spotify mechanicals flow through PROs. ", "On-demand streaming mechanicals route through the MLC in the U.S., not ASCAP/BMI/SESAC."),
        ("Avoid: skipping SoundExchange. ", "SoundExchange is entirely separate and covers digital sound-recording performance royalties."),
    ],
}

# ============================================================
# CAT 18 — Music Production Costs
# ============================================================
cat18 = {
    "id": 18,
    "title": "Music Production Costs",
    "subtitle": "Production costs in the music industry span an enormous range — from $0 (bedroom production) to $500,000+ (major label studio albums with top-tier producers).",
    "ex": [
        {
            "name": "Studio Rate Tiers",
            "tag": "$25 — $500+ Per Hour",
            "blurb": "Project studios run $25–$75/hour, mid-tier rooms $75–$200/hour, and top-tier major-market studios $200–$500+/hour with full-day blocks.",
            "body": "Studio rates fall into roughly three tiers. Project / entry-level rooms charge $25–$75/hour. Mid-tier professional rooms run $75–$200/hour. Top-tier major-market studios — Sunset Sound, Electric Lady, Abbey Road — run $200–$500+/hour and almost always require block booking ($1,500–$5,000/day minimums). The big-room rate buys access to the room's signal chain, console, and acoustics — not just hours.",
            "bullets": bullets([
                "Entry-level / project studio: $25–$75/hour.",
                "Mid-tier professional: $75–$200/hour.",
                "Top-tier major market: $200–$500+/hour, often with $1,500–$5,000/day minimums.",
                "Block booking is the norm at the top tier — not hourly metering.",
            ]),
        },
        {
            "name": "Producer Deal Structures",
            "tag": "Points / Advance / Buyout",
            "blurb": "Three standard producer deal shapes: points (3–5%), advance + points ($5K–$100K+ recouped), or flat buyout ($500–$50,000 per track).",
            "body": "At the major label level, producers usually take 3–5 'points' — a percentage of the artist's royalty, paid after recoupment. The advance + points version pays the producer an upfront fee ($5,000–$100,000+) recoupable from their points before ongoing royalties begin. The flat buyout shape is common for indie and work-for-hire situations: $500–$50,000 per track, with no ongoing royalty participation. Some producers also negotiate a publishing split if they wrote the beat — that's separate from the master points and must be papered.",
            "bullets": bullets([
                "Points deal: 3–5 points of artist royalty, paid after recoupment.",
                "Advance + points: $5K–$100K+ recoupable from points.",
                "Flat buyout: $500–$50,000/track, no ongoing royalty.",
                "Beat-makers may also request publishing — negotiate that separately.",
            ]),
        },
        {
            "name": "Union Session Scale",
            "tag": "AFM ~$360–$450 / 3-hr Session",
            "blurb": "Major label recordings using union players pay AFM scale: roughly $360–$450 per 3-hour session, plus ~15% pension and health on top.",
            "body": "When a major label records under an AFM agreement, session musicians earn union scale — roughly $360–$450 for a standard 3-hour session, with the label contributing an additional ~15% to pension and health funds. Non-union sessions are negotiated freely, but using union players unlocks AFM trust funds (Sound Recording Special Payments Fund, Music Performance Trust Fund) that pay residuals years later when recordings continue to earn.",
            "bullets": bullets([
                "AFM scale: ~$360–$450 per 3-hour session for major label projects.",
                "Add ~15% on top for pension + health contributions.",
                "Non-union sessions are freely negotiated — no scale floor.",
                "AFM trust funds pay residuals on commercially released recordings.",
            ]),
        },
    ],
    "academic": [
        ("Academic", "Théberge, P. — Any Sound You Can Imagine: Making Music/Consuming Technology", ["Wesleyan University Press", "Théberge, P.", "1997"], "", "Foundational academic work on production economics and the home-studio shift; Part III covers production costs.", "https://www.wesleyan.edu/wespress/titles/any-sound-you-can-imagine.html"),
    ],
    "mainstream": [
        ("Industry Press", "The Real Cost of Making an Album in 2024", ["Music Connection Magazine", "musicconnection.com", "2024"], "", "Trade-magazine breakdown of current album production budgets across tiers.", "https://www.musicconnection.com/real-cost-making-album-2024/"),
    ],
    "blogs": [
        ("Practitioner Forum", "Studio Rate Reality Check 2024: What Are People Actually Charging?", ["Gearspace (Gearslutz)", "gearspace.com", "2024"], "", "Working-engineer thread on actual studio rates being charged in 2024.", "https://gearspace.com/board/studio-building-acoustics/studio-rate-reality-check-2024.html"),
        ("Consumer Pricing", "2025 Average Recording Studio Cost (with Price Factors)", ["Thumbtack", "thumbtack.com", "2025"], "", "Aggregated marketplace data on 2025 studio rates across tiers.", "https://www.thumbtack.com/p/recording-studio-prices"),
        ("Studio Operator", "Guide to Recording Studio Rates: Pricing & Packages", ["ProStudioTime", "prostudiotime.com"], "", "Studio-operator framing of how rates are structured into hourly, day, and package pricing.", "https://www.prostudiotime.com/blog/understanding-recording-studio-rates"),
        ("Practitioner", "How Do Producer and Songwriter Splits Work", ["Ari's Take", "aristake.com"], "", "Working-musician walkthrough of producer points and writer splits.", "https://aristake.com/producer-splits/"),
        ("Practitioner", "Music Producer Agreements: Points, Royalties, and Master Ownership", ["Agarunov Law", "agarunovlaw.com"], "", "Attorney-side breakdown of how producer agreements are structured today.", "https://agarunovlaw.com/articles/music-producer-agreement-guide.html"),
        ("Union Official", "Recording | Nashville Musicians Association", ["Nashville Musicians Association (AFM Local)", "nashvillemusicians.org"], "", "Official AFM local rates and scale for recording sessions.", "https://www.nashvillemusicians.org/recording"),
        ("Practitioner", "Session Musician Rates: What to Charge", ["Orphiq", "orphiq.com"], "", "Practical rate guidance for session players in non-union and union contexts.", "https://orphiq.com/resources/session-musician-rates"),
        ("Home Studio", "Home Recording Studio Cost: What You Need to Know", ["Girl on the Beat", "girlonthebeat.com", "2024"], "", "Itemized 2024 cost breakdown for building a professional home studio.", "https://girlonthebeat.com/home-recording-studio-cost/"),
        ("Practitioner", "How Much Does a Home Recording Studio Cost", ["Soundscape Mastering", "soundscapemastering.com"], "", "Practitioner pricing reference for entry, mid, and pro home setups.", "https://soundscapemastering.com/how-much-does-a-home-recording-studio-cost/"),
        ("Marketplace Data", "Music Production Cost and Prices", ["Twine", "twine.net"], "", "Marketplace pricing data on indie album production costs across genres.", "https://www.twine.net/blog/music-production-cost-and-prices/"),
        ("Studio Pricing", "How Much Does Music Production Cost? 2026 Pricing Guide", ["AM World Group", "amworldgroup.com", "2026"], "", "Updated 2026 pricing reference for full-album production projects.", "https://amworldgroup.com/pricing/music-production-cost"),
        ("Industry Education", "The Economics of Sound: What It Really Costs to Make a Record Today", ["Gearnews", "gearnews.com"], "", "Modern economics of producing a record — covers DIY through major studios.", "https://www.gearnews.com/economics-of-sound-studio/"),
        ("Royalties Education", "The Costs Of Recording An Album... And How To Pay For It", ["Royalty Exchange", "royaltyexchange.com"], "", "How artists fund production costs — points-deal arithmetic, advances, and recoupment.", "https://royaltyexchange.com/blog/the-costs-of-recording-an-album-and-how-to-pay-for-it"),
        ("Practitioner", "Producer Agreement Essentials: What Every Artist Should Know", ["Orphiq", "orphiq.com"], "", "Checklist of producer-agreement clauses every artist should paper before tracking.", "https://orphiq.com/resources/producer-agreement-essentials"),
        ("Attorney Practitioner", "5 Things to Look for in a Music Producer Agreement", ["Lawyer Drummer", "lawyerdrummer.com"], "", "Working entertainment attorney's checklist for reviewing producer agreements.", "https://lawyerdrummer.com/2018/12/5-things-look-music-producer-agreement/"),
        ("Practitioner", "When Should A Producer Get A Publishing Split?", ["Disc Makers", "blog.discmakers.com"], "", "When beat-making producers should also receive a composition share.", "https://blog.discmakers.com/2020/11/should-a-producer-get-a-publishing-split/"),
        ("Indie Education", "Should My Producer Get Publishing and Songwriting Credit?", ["DIY Musician (CD Baby)", "diymusician.cdbaby.com"], "", "Indie-artist framing of when to extend writer credit to a producer.", "https://diymusician.cdbaby.com/music-rights/does-my-producer-deserve-publishing-and-songwriting-credit/"),
        ("Songwriter Education", "What is a Demo in Music?: A Songwriter's Guide", ["Better Songs", "bettersongs.com"], "", "Guidance on producing demos efficiently versus committing to release-grade tracking.", "https://bettersongs.com/what-is-a-demo-in-music/"),
        ("Studio Education", "Demo vs. Final Track: Key Differences in Music Production", ["Nashville Tracks", "nashvilletracks.com"], "", "Studio-side guidance on the demo-vs-master decision and budget allocation.", "https://nashvilletracks.com/blog/blog/what-is-the-difference-between-a-demo-and-a-final-track"),
        ("Attorney Practitioner", "Producer Royalties: How Should Your Music Producer Be Paid?", ["Lawyer Drummer", "lawyerdrummer.com"], "", "Attorney's framing of buyout vs. royalty participation for different project tiers.", "https://lawyerdrummer.com/2020/09/producer-royalties-what-to-pay-your-producer/"),
        ("Royalties Education", "Royalties or Licensing Fees? Monetizing Music Explained", ["Zach Bornheimer Music", "zachbornheimermusic.com"], "", "Royalty vs. one-time licensing fee tradeoff for producer payment structures.", "https://zachbornheimermusic.com/music-business/royalties-vs-one-time-licensing-fees-whats-better/"),
        ("Practitioner", "Understanding Music Production Fees: What to Expect and Budget For", ["How To Make Electronic Music", "howtomakeelectronicmusic.org"], "", "Itemized add-on cost breakdown beyond the headline studio rate.", "https://www.howtomakeelectronicmusic.org/blog/music-production-fees/"),
    ],
    "outline": [
        ("Studio rates ladder cleanly. ", "Project ($25–$75/hr), mid-tier ($75–$200/hr), top-tier ($200–$500+/hr with day-block minimums)."),
        ("Three producer deal shapes. ", "Points (3–5%), advance + points ($5K–$100K recoupable), or flat buyout ($500–$50K/track)."),
        ("AFM union scale floor. ", "Major-label union sessions pay ~$360–$450 per 3-hour session plus ~15% pension/health."),
        ("Indie album budget range. ", "Most indie albums (10 tracks, mix + master) land between $3,000 and $25,000 all-in."),
        ("Avoid: undocumented producer relationships. ", "Verbal deals on points and advances become disputes the moment a song works."),
        ("Avoid: confusing producer points with publishing. ", "Beat-makers may also seek a composition share — paper that separately from master points."),
        ("Avoid: forgetting the 30–50% in extras. ", "Mixing, mastering, session players, MIDI, vocal editing, and travel routinely add 30–50% to the studio bill."),
    ],
}

# ============================================================
# WRITE
# ============================================================
for cat in (cat16, cat17, cat18):
    out_path = OUT_DIR / f"cat-{cat['id']}.html"
    out_path.write_text(build_page(cat), encoding="utf-8")
    print(f"WROTE: {out_path}")
