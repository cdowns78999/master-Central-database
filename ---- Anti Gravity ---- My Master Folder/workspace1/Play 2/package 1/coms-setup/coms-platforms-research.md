# Digital Communications Platform Research
> Source of truth for build-digital-coms.html checklist data
> Created: 2026-03-03

---

## General Communication Platforms

### Gmail
**What to do**: Set up a dedicated business Gmail account for Ahead Artist Solutions outreach and connect it to the dashboard
**What Claude did**: Documented setup steps, mapped to wing dashboard pills, identified API integration method
**Start goal**: Business Gmail active with professional signature and labels configured
**Finish goal**: Gmail integrated with Revio for unified inbox, auto-routing rules active, outreach templates loaded
**Setup steps**:
1. Create or designate business Gmail account (ahead@... or chad@...)
2. Enable Gmail API in Google Cloud Console
3. Create OAuth2 credentials for app access
4. Set up professional email signature with Ahead branding
5. Create label structure: Leads / Clients / Suppliers / Follow-Ups
6. Configure filters for auto-sorting inbound messages
7. Connect to Revio for unified inbox view
8. Load email templates for outreach sequences

**Integration method**: Gmail API (REST) via OAuth2 | IMAP/SMTP as fallback
**API available**: Yes - full Gmail API with send, read, label management
**Dashboard wing mapping**:
- LEFT > Clients: "Gmail Contacts" pill (imported contact lists)
- LEFT > Pipeline: "Email Outreach" pill (sent/pending/replied status)
- RIGHT > Suppliers: "Gmail Business" pill (vendor communications)
- RIGHT > Services: "Email Campaigns" pill (outreach service tracking)
**Star card usage**: Drag Gmail pill to star card to see email stats, recent threads, response rates

---

### WhatsApp
**What to do**: Set up WhatsApp Business for direct client messaging and quick supplier communication
**What Claude did**: Documented setup steps, identified WhatsApp Business API requirements, mapped to dashboard
**Start goal**: WhatsApp Business profile active with quick reply templates
**Finish goal**: WhatsApp integrated with Revio, broadcast lists configured, auto-responses active
**Setup steps**:
1. Download WhatsApp Business app (or upgrade existing account)
2. Set up business profile (name, description, address, hours)
3. Create quick reply templates for common responses
4. Set up auto-greeting and away messages
5. Create broadcast lists: Clients / Suppliers / Prospects
6. Configure labels for conversation categories
7. Connect to Revio for unified inbox management
8. Set up catalog if applicable for service listings

**Integration method**: WhatsApp Business API (requires Meta Business verification) | Manual via WhatsApp Business app
**API available**: Yes - WhatsApp Business Cloud API (free tier available, requires Meta developer account)
**Dashboard wing mapping**:
- LEFT > Clients: "WhatsApp Contacts" pill (client chat threads)
- LEFT > Pipeline: "DM Leads" pill (conversations in progress)
- RIGHT > Suppliers: "WhatsApp Groups" pill (vendor group chats)
**Star card usage**: Drag to star card for unread count, last message preview, response time metrics

---

### iMessage
**What to do**: Leverage iMessage for high-touch client communication on Apple ecosystem
**What Claude did**: Documented limitations (no public API), outlined manual workflow integration
**Start goal**: iMessage organized with client-specific threads pinned
**Finish goal**: iMessage threads tracked manually in dashboard, key conversations logged
**Setup steps**:
1. Organize existing iMessage threads by pinning key clients
2. Create contact groups in macOS Contacts for Clients / Suppliers
3. Set up Focus modes to filter business messages during work hours
4. Establish naming convention for group chats
5. Document key conversation threads in Obsidian vault
6. Set reminder system for follow-up messages
7. Use Shortcuts app to automate common message templates
8. Log important conversations in dashboard manually

**Integration method**: No public API - manual tracking via Shortcuts app automations
**API available**: No - Apple does not provide iMessage API for third-party apps
**Dashboard wing mapping**:
- LEFT > Clients: "iMessage VIP" pill (high-touch client threads)
- LEFT > Pipeline: "Text Follow-Ups" pill (pending reply tracking)
**Star card usage**: Manual entry - drag pill to see conversation log notes

---

### Messenger
**What to do**: Set up Facebook Messenger for business page inquiries and lead capture
**What Claude did**: Documented Meta Business Suite integration, mapped to Revio connection
**Start goal**: Messenger auto-responses active on business page
**Finish goal**: Messenger integrated with Revio, leads auto-captured, conversation routing rules set
**Setup steps**:
1. Ensure Facebook Business Page is active and current
2. Enable Messenger for the business page
3. Set up instant replies and greeting text
4. Create FAQ auto-responses for common questions
5. Configure lead generation through Messenger ads (optional)
6. Connect Messenger to Revio for unified inbox
7. Set up conversation labels/tags
8. Create response templates for service inquiries

**Integration method**: Meta Graph API / Messenger Platform API | Revio native integration
**API available**: Yes - Messenger Platform API with webhooks, send API, templates
**Dashboard wing mapping**:
- LEFT > Clients: "Messenger Leads" pill (inbound inquiries)
- LEFT > Pipeline: "Social Inquiries" pill (Messenger + other social DMs)
- RIGHT > Services: "Messenger Campaigns" pill (ad-driven conversations)
**Star card usage**: Drag to star card for unread count, lead source tracking, conversion metrics

---

### Discord
**What to do**: Set up Discord server for community building, artist collaboration, and internal team comms
**What Claude did**: Documented server structure, bot integration options, mapped to dashboard
**Start goal**: Discord server live with role structure and key channels
**Finish goal**: Discord bot active for notifications, community engagement tracked in dashboard
**Setup steps**:
1. Create Ahead Artist Solutions Discord server
2. Set up role structure: Admin / Team / Clients / Artists / Community
3. Create channel categories: General / Projects / Support / Resources
4. Configure permissions per role
5. Set up welcome channel with onboarding flow
6. Add utility bots (MEE6 or Carl-bot for moderation)
7. Create webhook for dashboard notifications
8. Set up thread system for per-project discussions

**Integration method**: Discord Bot API (full control) | Webhooks (one-way notifications)
**API available**: Yes - Discord Bot API with full message, channel, member management
**Dashboard wing mapping**:
- LEFT > Clients: "Discord Members" pill (community member count)
- RIGHT > Suppliers: "Discord Channels" pill (vendor collaboration channels)
- RIGHT > Services: "Community Mgmt" pill (engagement metrics)
**Star card usage**: Drag to star card for member growth, active threads, notification feed

---

### VRChat
**What to do**: Establish VRChat presence for immersive client meetings and creative showcases
**What Claude did**: Documented VRChat world setup, event hosting, mapped to dashboard
**Start goal**: VRChat account active with branded world or meeting space bookmarked
**Finish goal**: Regular VRChat events scheduled, client meeting invites tracked in dashboard
**Setup steps**:
1. Create or verify VRChat account (Trust rank matters for features)
2. Identify or create branded meeting world
3. Set up friends list with clients and collaborators
4. Create event calendar for VRChat meetups
5. Document world IDs and invite links in Obsidian vault
6. Set up recording workflow for meeting capture
7. Create follow-up templates for post-VR meetings
8. Log VRChat sessions in dashboard

**Integration method**: VRChat API (unofficial, limited) | Manual tracking
**API available**: Partially - unofficial VRChat API exists for friend status, world info (not officially supported)
**Dashboard wing mapping**:
- LEFT > Clients: "VR Meetings" pill (scheduled/completed immersive sessions)
- RIGHT > Services: "VR Showcases" pill (creative demos and presentations)
**Star card usage**: Drag to star card for upcoming VR events, session history

---

### Local
**What to do**: Set up local networking channels for in-person business development
**What Claude did**: Documented local outreach strategy, event tracking, mapped to dashboard
**Start goal**: Local business directory compiled, first networking events identified
**Finish goal**: Local pipeline active with regular events, referral tracking in dashboard
**Setup steps**:
1. Compile local business directory (Chamber of Commerce, BNI groups, etc.)
2. Identify recurring networking events in your area
3. Create contact cards / QR code linking to Ahead portfolio
4. Set up event calendar with local meetups
5. Create follow-up workflow: event > connect > follow-up > pipeline
6. Track local referrals in Obsidian vault
7. Document in-person meeting notes
8. Log local leads into dashboard pipeline

**Integration method**: Manual entry + calendar API integration
**API available**: N/A - manual process with calendar sync
**Dashboard wing mapping**:
- LEFT > Clients: "Local Leads" pill (in-person contacts)
- LEFT > Pipeline: "Local Pipeline" pill (referral-to-close tracking)
- RIGHT > Inventory: "Event Calendar" pill (upcoming local events)
**Star card usage**: Drag to star card for local lead count, upcoming events, referral sources

---

## Focus Applications (Core 4)

### Manis
**What to do**: Set up Manis for automated lead generation — monthly lead batches delivered to your pipeline
**What Claude did**: Documented account setup, lead criteria configuration, first batch delivery, mapped to all wings
**Start goal**: Manis account active, lead criteria defined, first 100-lead batch generated
**Finish goal**: Monthly lead delivery automated, leads flowing into pipeline, quality scoring active
**Setup steps**:
1. Create Manis account and complete onboarding
2. Define ideal client profile (ICP): industry, size, location, revenue
3. Set lead criteria filters: job title, company type, tech stack
4. Configure first batch: 100 leads to start
5. Review and approve first batch quality
6. Set up monthly delivery schedule (100/200/500 leads)
7. Export format: CSV with name, email, company, LinkedIn, phone
8. Import leads into dashboard pipeline as "Identified" stage
9. Create Manis-specific follow-up sequence templates
10. Set up lead scoring rules based on engagement

**Integration method**: Manis platform export (CSV/API) | Direct pipeline injection
**API available**: Platform-dependent - check Manis dashboard for API/webhook options
**Dashboard wing mapping**:
- LEFT > Clients: "Manis Leads" pill (generated lead lists), "Lead Quality" pill (scoring metrics)
- LEFT > Pricing: "Manis Tiers" pill (subscription plan details, cost per lead)
- LEFT > Projects: "Lead Gen Campaigns" pill (active batch campaigns)
- LEFT > Pipeline: "Identified" stage pill (new Manis leads enter here)
- RIGHT > Suppliers: "Manis" vendor pill (supplier entry)
- RIGHT > Services: "Lead Generation" service pill
- RIGHT > Inventory: "Manis Subscription" pill (plan status, API keys)
**Star card usage**: Drag to star card for lead count, batch status, cost metrics, quality score breakdown

---

### Social Sweep
**What to do**: Set up Social Sweep for relationship management — activate your existing network for business growth
**What Claude did**: Documented full setup including social imports, contact enrichment, search configuration
**Start goal**: Social Sweep connected to primary social accounts, initial contact scan complete
**Finish goal**: Full network mapped, relationship scoring active, introduction workflows running
**Setup steps**:
1. Create Social Sweep account
2. Connect social accounts: LinkedIn, Instagram, Twitter/X, email
3. Import calendar contacts for meeting history
4. Run initial contact database scan and enrichment
5. Review enriched contact profiles for accuracy
6. Set up search queries: "Who do I know that..." templates
7. Create introduction request workflows
8. Configure monthly relationship health reports
9. Set up opportunity alerts for network matches
10. Export key contacts to dashboard

**Integration method**: Social Sweep platform + API for contact data | OAuth connections to social platforms
**API available**: Platform-dependent - check for API access in account settings
**Dashboard wing mapping**:
- LEFT > Clients: "Network Contacts" pill (enriched contact database)
- LEFT > Pricing: "Social Sweep Plans" pill (subscription tiers)
- LEFT > Projects: "Relationship Campaigns" pill (active outreach)
- LEFT > Pipeline: "Contacted" stage pill (Social Sweep-identified warm leads)
- RIGHT > Suppliers: "Social Sweep" vendor pill
- RIGHT > Services: "Relationship Mgmt" service pill
- RIGHT > Inventory: "Social Sweep Sub" pill (account status)
**Star card usage**: Drag to star card for network size, relationship scores, introduction opportunities

---

### Revio
**What to do**: Set up Revio to consolidate all social media inboxes into one unified conversation hub
**What Claude did**: Documented inbox connections, routing rules, auto-response setup, mapped to dashboard
**Start goal**: Revio connected to primary social inboxes, all DMs flowing into one view
**Finish goal**: All inboxes unified, routing rules active, conversation scoring and auto-responses running
**Setup steps**:
1. Create Revio account and complete setup wizard
2. Connect inboxes: Instagram DMs, Facebook Messenger, Twitter/X DMs
3. Connect email inboxes: Gmail, Outlook (if applicable)
4. Connect WhatsApp Business (if available in Revio)
5. Set up conversation routing rules: leads vs. support vs. general
6. Create auto-response templates for after-hours and common queries
7. Configure conversation labels and tags
8. Set up team assignment rules (if multi-user)
9. Enable conversation analytics and response time tracking
10. Test with inbound messages across all connected platforms

**Integration method**: Revio platform with OAuth connections to each social platform
**API available**: Platform-dependent - Revio may offer API/webhooks for CRM integration
**Dashboard wing mapping**:
- LEFT > Clients: "DM Contacts" pill (all social conversation contacts)
- LEFT > Pricing: "Revio Costs" pill (subscription pricing)
- LEFT > Projects: "Inbox Campaigns" pill (active DM outreach)
- LEFT > Pipeline: "Contacted" stage pill (Revio-managed conversations moving through funnel)
- RIGHT > Suppliers: "Revio" vendor pill
- RIGHT > Services: "Social Inbox" service pill
- RIGHT > Inventory: "Revio Account" pill (connected inboxes, status)
**Star card usage**: Drag to star card for unread count across all platforms, response time, conversion rate

---

### Alley
**What to do**: Set up Alley to identify anonymous website visitors and convert them into leads
**What Claude did**: Documented pixel installation, alert configuration, lead capture workflow, mapped to dashboard
**Start goal**: Alley pixel installed on website, first visitor identifications coming in
**Finish goal**: 500+ weekly visitor IDs flowing into pipeline, alert rules active, leads auto-routed
**Setup steps**:
1. Create Alley account and get tracking pixel code
2. Install Alley pixel on all website pages (header script tag)
3. Verify pixel is firing correctly (check Alley dashboard)
4. Configure visitor identification thresholds
5. Set up alert rules: notify on repeat visitors, high-intent pages
6. Configure lead export: name, email, company, visit history
7. Set up webhook or export to push leads into pipeline
8. Create follow-up sequences for identified visitors
9. Set up weekly visitor report delivery
10. Monitor and refine identification accuracy

**Integration method**: JavaScript pixel (tracking) + Alley API/webhook for lead data
**API available**: Yes - Alley provides API for lead retrieval and webhook for real-time notifications
**Dashboard wing mapping**:
- LEFT > Clients: "Website Visitors" pill (identified visitor list)
- LEFT > Pricing: "Alley Pricing" pill (subscription costs)
- LEFT > Projects: "Visitor ID Setup" pill (pixel installation project)
- LEFT > Pipeline: "Identified" stage pill (Alley visitors enter pipeline here)
- RIGHT > Suppliers: "Alley" vendor pill
- RIGHT > Services: "Visitor ID" service pill
- RIGHT > Inventory: "Alley Pixel" pill (pixel status, API keys)
**Star card usage**: Drag to star card for weekly visitor count, identification rate, top pages, lead quality

---

## Wing Pre-fill Summary

When the coms overlay completes all 4 setup steps, `prefillWingData()` injects these pills:

| Wing | Section | Pre-filled Pills |
|------|---------|-----------------|
| LEFT | Clients | Manis Leads, Network Contacts, DM Contacts, Website Visitors, Gmail Contacts, Local Leads |
| LEFT | Pricing | Manis Tiers, Social Sweep Plans, Revio Costs, Alley Pricing |
| LEFT | Projects | Lead Gen Campaigns, Relationship Campaigns, Inbox Campaigns, Visitor ID Setup |
| LEFT | Pipeline | Identified (Alley/Manis) > Contacted (Revio/Social Sweep) > Qualified (Manis scoring) > Closed |
| RIGHT | Suppliers | Manis, Social Sweep, Revio, Alley (as vendor entries) |
| RIGHT | Services | Lead Generation, Relationship Mgmt, Social Inbox, Visitor ID |
| RIGHT | Inventory | Manis Sub, Social Sweep Sub, Revio Account, Alley Pixel |

## Star Card Drop Zone — 3D Matrix Usage

When a coms pill is dragged to the star card, it transforms into a detail view showing:
- **Platform stats**: subscriber count, lead volume, response rates
- **Cost breakdown**: monthly cost, cost per lead/contact
- **Pipeline position**: where this platform's leads sit in the funnel
- **Quick actions**: "View leads", "Send follow-up", "Check status"
- **Cross-platform links**: how this platform connects to others (e.g., Manis leads → Revio follow-up → Alley retargeting)
