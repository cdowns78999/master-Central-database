# How to Build a Digital Service Provider (DSP) for Music Distribution
## Full Technical Research — 2026-03-14

---

## 1. TECHNICAL ARCHITECTURE OVERVIEW

Building a music DSP (like DistroKid, TuneCore, CD Baby) requires these core systems:

### The Seven Pillars of a Music DSP

**Pillar 1: Content Ingestion Platform**
- Web app where artists/labels upload audio files + metadata
- Audio file validation (format, bitrate, sample rate, stereo check)
- Metadata intake forms (artist name, track title, album title, ISRC, UPC, genre, release date, contributors, lyrics, cover art)
- Cover art validation (minimum 3000x3000px, RGB, no URLs/social handles in image)
- Queue system for processing uploads asynchronously

**Pillar 2: Audio Transcoding Pipeline**
- Takes the uploaded master file and converts it to every format required by every store
- Spotify requires: FLAC (preferred) or WAV, 44.1kHz+, 24-bit preferred (16-bit accepted), stereo only
- Apple Music requires: Apple Digital Masters program — 24-bit/96kHz or 24-bit/48kHz source files, delivered as FLAC or WAV
- Amazon Music HD: lossless FLAC, up to 24-bit/192kHz
- General minimum: 16-bit/44.1kHz WAV or FLAC (CD quality)
- Transcoding stack: FFmpeg (open-source, handles all formats), or AWS Elemental MediaConvert (managed cloud service)
- Must preserve original quality — stores want the highest quality master, they handle final conversion to their streaming codecs (Ogg Vorbis for Spotify, AAC for Apple, etc.)

**Pillar 3: Metadata Management & DDEX Compliance (detailed in Section 3)**
- DDEX ERN (Electronic Release Notification) XML message generation
- Metadata normalization across different store requirements
- ISRC assignment/validation
- UPC/EAN barcode assignment
- Territory/rights management

**Pillar 4: Store Delivery Network**
- SFTP connections to each DSP (Spotify, Apple Music, Amazon, YouTube, TikTok, Deezer, Tidal, Pandora, etc.)
- Each store has its own SFTP endpoint, credentials, and folder structure requirements
- Batch packaging: XML metadata + audio files + cover art bundled per store's spec
- Delivery confirmation/acknowledgment processing
- Retry logic for failed deliveries

**Pillar 5: Royalty Collection & Accounting Engine**
- Ingest sales/streaming reports from every store (each in different formats)
- DDEX DSR (Digital Sales Reporting) standard helps normalize this, but many stores have proprietary formats
- Match reported streams/sales back to specific tracks and rights holders
- Calculate splits (artist %, label %, producer %, songwriter %)
- Currency conversion for international royalties
- Generate statements
- Process payments (bank transfers, PayPal, etc.)
- Tax withholding and 1099/W-8BEN compliance

**Pillar 6: Analytics Dashboard**
- Real-time (or near-real-time) streaming data from stores
- Per-track, per-album, per-territory breakdowns
- Revenue tracking and projections
- Playlist placement tracking
- Demographic data where available

**Pillar 7: Rights & Catalog Management**
- Track ownership and splits for every recording
- Publishing rights vs. master rights
- Content ID reference file management (YouTube)
- Takedown/update capabilities
- Catalog transfer between labels/distributors
- Territory-specific availability rules

---

## 2. THE PIPELINE: Upload → Encoding → Delivery to Stores

### Step-by-Step Flow

```
ARTIST UPLOADS
    │
    ▼
[1] INGESTION
    - Audio file received (WAV or FLAC, 16-24 bit, 44.1-192kHz)
    - Metadata form captured (title, artist, ISRC, UPC, credits, etc.)
    - Cover art uploaded (3000x3000px minimum, JPEG/PNG)
    - Files stored in cloud storage (S3 or equivalent)
    │
    ▼
[2] VALIDATION
    - Audio: check format, bit depth, sample rate, stereo channels
    - Audio: check for clipping, silence, corruption
    - Metadata: required fields present, proper formatting
    - ISRC: valid format (CC-XXX-YY-NNNNN), no duplicates
    - UPC/EAN: valid check digit, not already in use
    - Cover art: dimensions, format, content policy compliance
    │
    ▼
[3] TRANSCODING (if needed)
    - Most stores want the original high-res master
    - Some stores require specific formats
    - Generate preview clips (30-second samples) if needed
    - Store all versions in cloud storage with content-addressed naming
    │
    ▼
[4] DDEX XML GENERATION
    - Generate NewReleaseMessage XML per DDEX ERN 4.3 standard
    - One message per release (single, EP, album)
    - Contains: MessageHeader, ResourceList, ReleaseList, DealList
    - Each store may need slightly different deal terms in the XML
    │
    ▼
[5] BATCH PACKAGING
    - Create delivery batch per store
    - Folder structure (typical):
      /BatchID_YYYYMMDD/
        /resources/
          track1.flac
          track2.flac
          cover.jpg
        /metadata/
          release.xml (DDEX ERN NewReleaseMessage)
    - Some stores use flat structure, some hierarchical
    │
    ▼
[6] DELIVERY VIA SFTP
    - Connect to store's SFTP endpoint
    - Upload batch to designated inbox folder
    - Some stores use cloud storage (S3 buckets) instead of SFTP
    - Spotify, Apple, Amazon each have their own endpoint
    - Wait for store's acknowledgment/processing confirmation
    │
    ▼
[7] STORE PROCESSING
    - Store validates the DDEX XML against their schemas
    - Store ingests audio files
    - Store converts to their streaming codec:
      * Spotify: Ogg Vorbis (96/160/320kbps) + AAC for web
      * Apple Music: AAC (256kbps) + Apple Lossless (ALAC)
      * Amazon: varies by tier
      * YouTube: Opus codec
    - Store publishes to their catalog on the release date
    │
    ▼
[8] LIVE ON STORES
    - Track appears in store search/browse
    - ISRC links the same recording across all platforms
    - Streams begin generating royalty data
    │
    ▼
[9] ROYALTY REPORTING (weeks to months later)
    - Stores generate sales/usage reports
    - Reports arrive via SFTP or API in DDEX DSR format (or proprietary)
    - Your system ingests, parses, matches to catalog
    - Calculates revenue per track per rights holder
    - Generates artist/label statements
    - Processes payments
```

---

## 3. DDEX — THE STANDARD FOR MUSIC METADATA DELIVERY

### What DDEX Is
- **Digital Data Exchange** — an international standards body
- Founded by major labels, DSPs, and collecting societies
- Creates XML-based standards for communicating music data between companies
- FREE to implement (requires a DDEX Implementation Licence — no cost)
- You get a **DPID** (DDEX Party Identifier) when you register — this uniquely identifies your company in all DDEX messages

### DDEX Charter Members (the big players who run it)
Amazon, Apple, ASCAP, BMI, GEMA, Google, Kobalt, Meta, Pandora, PPL, PRS for Music, SACEM, SCPP, SOCAN, Sony Music, SoundExchange, Spotify, Universal Music Group, Warner Music Group

### The 10 DDEX Standard Families

| Standard | What It Does |
|----------|-------------|
| **ERN** (Electronic Release Notification) | THE main one — communicates release metadata + deal terms from distributor to store |
| **DSR** (Digital Sales Reporting) | How stores report back streams/sales/revenue to distributors |
| **MEAD** (Media Enrichment and Description) | Rich metadata beyond core supply chain data |
| **PIE** (Party Identification and Enrichment) | Identifies and describes business parties |
| **Catalogue Transfers** | Moving catalog data between partners |
| **Claim Detail Message** | Communicates ownership claims |
| **Musical Work Data and Rights** | Publishing/songwriting metadata |
| **Bulk Works and Recordings Metadata** | Bulk metadata transfers |
| **Recording Data and Rights** | Recording-level metadata and rights |
| **Recording Information Notification** | Notifies about recording info changes |

### ERN (Electronic Release Notification) — Deep Dive

**Current version:** ERN 4.3.2 (latest, recommended for new implementations)
**Legacy version:** ERN 3.8.2 (still widely used, but being phased out)

**The NewReleaseMessage XML structure:**

```xml
<NewReleaseMessage xmlns="http://ddex.net/xml/ern/43">

  <!-- 1. MESSAGE HEADER -->
  <MessageHeader>
    <MessageId>MSG-2026-0314-001</MessageId>
    <MessageSender>
      <PartyId>DPID-YOUR-COMPANY</PartyId>
      <PartyName>Your Distribution Co</PartyName>
    </MessageSender>
    <MessageRecipient>
      <PartyId>DPID-SPOTIFY</PartyId>
      <PartyName>Spotify AB</PartyName>
    </MessageRecipient>
    <MessageCreatedDateTime>2026-03-14T12:00:00Z</MessageCreatedDateTime>
  </MessageHeader>

  <!-- 2. RESOURCE LIST (the actual audio files + art) -->
  <ResourceList>
    <SoundRecording>
      <SoundRecordingId>
        <ISRC>US-ABC-26-00001</ISRC>
      </SoundRecordingId>
      <ResourceReference>A1</ResourceReference>
      <ReferenceTitle>
        <TitleText>Track Title Here</TitleText>
      </ReferenceTitle>
      <Duration>PT3M45S</Duration>
      <SoundRecordingDetailsByTerritory>
        <TerritoryCode>Worldwide</TerritoryCode>
        <DisplayArtist>
          <PartyName>Artist Name</PartyName>
          <ArtistRole>MainArtist</ArtistRole>
        </DisplayArtist>
        <Genre>Pop</Genre>
        <PLine>2026 Your Label</PLine>
      </SoundRecordingDetailsByTerritory>
      <TechnicalSoundRecordingDetails>
        <TechnicalResourceDetailsReference>T1</TechnicalResourceDetailsReference>
        <AudioCodecType>FLAC</AudioCodecType>
        <SamplingRate>44100</SamplingRate>
        <BitsPerSample>24</BitsPerSample>
        <NumberOfChannels>2</NumberOfChannels>
        <File>
          <FileName>track01.flac</FileName>
          <HashSum>
            <Algorithm>MD5</Algorithm>
            <HashSumValue>abc123...</HashSumValue>
          </HashSum>
        </File>
      </TechnicalSoundRecordingDetails>
    </SoundRecording>

    <Image>
      <!-- Cover art metadata -->
      <ResourceReference>A2</ResourceReference>
      <ImageDetailsByTerritory>
        <TerritoryCode>Worldwide</TerritoryCode>
      </ImageDetailsByTerritory>
      <TechnicalImageDetails>
        <File>
          <FileName>cover.jpg</FileName>
        </File>
      </TechnicalImageDetails>
    </Image>
  </ResourceList>

  <!-- 3. RELEASE LIST (how resources are grouped into releases) -->
  <ReleaseList>
    <Release>
      <ReleaseId>
        <ICPN>0123456789012</ICPN>  <!-- UPC/EAN barcode -->
      </ReleaseId>
      <ReferenceTitle>
        <TitleText>Album or Single Title</TitleText>
      </ReferenceTitle>
      <ReleaseType>Single</ReleaseType>
      <ReleaseDetailsByTerritory>
        <TerritoryCode>Worldwide</TerritoryCode>
        <DisplayArtist>
          <PartyName>Artist Name</PartyName>
        </DisplayArtist>
        <Genre>Pop</Genre>
        <ReleaseDate>2026-04-01</ReleaseDate>
      </ReleaseDetailsByTerritory>
      <ResourceGroup>
        <ResourceGroupContentItem>
          <SequenceNumber>1</SequenceNumber>
          <ResourceType>SoundRecording</ResourceType>
          <ReleaseResourceReference>A1</ReleaseResourceReference>
        </ResourceGroupContentItem>
      </ResourceGroup>
    </Release>
  </ReleaseList>

  <!-- 4. DEAL LIST (commercial terms — what the store can do with it) -->
  <DealList>
    <ReleaseDeal>
      <DealReleaseReference>R1</DealReleaseReference>
      <Deal>
        <DealTerms>
          <CommercialModelType>SubscriptionModel</CommercialModelType>
          <CommercialModelType>AdvertisementSupportedModel</CommercialModelType>
          <Usage>
            <UseType>OnDemandStream</UseType>
            <UseType>PermanentDownload</UseType>
          </Usage>
          <TerritoryCode>Worldwide</TerritoryCode>
          <ValidityPeriod>
            <StartDate>2026-04-01</StartDate>
          </ValidityPeriod>
        </DealTerms>
      </Deal>
    </ReleaseDeal>
  </DealList>

</NewReleaseMessage>
```

**Key ERN concepts:**
- **ResourceGroups** are MANDATORY — resources must be organized hierarchically
- **Release Profiles** define the type of release (AudioAlbumMusicOnly, AudioSingle, etc.) and constrain which fields are required
- Messages are delivered via **SFTP** (Part 3 choreography) or **Web Services** (Part 4 choreography)
- Each message must reference a specific release profile version (e.g., `commonreleasetypes/14/AudioAlbumMusicOnly`)
- DDEX provides a **free online validator**: https://ddex-validator.ddex.net/
- DDEX also has an **open-source ERN validator on GitHub**: https://github.com/ddexnet/ern-validator-api (Java/Spring/XSLT)

### Delivery Choreography (How Batches Are Sent)

**SFTP-based delivery (most common):**
1. Distributor connects to store's SFTP server
2. Uploads batch folder containing XML + audio + art files
3. Store's system detects new batch, begins validation
4. Store sends acknowledgment (success/failure) back via SFTP or email
5. On success, content enters the store's processing pipeline

**Web Services delivery (newer, less common):**
1. REST/SOAP API calls to register and upload content
2. More real-time than SFTP batch processing
3. Spotify and some newer stores moving toward this

---

## 4. CONTENT DELIVERY NETWORKS & INGESTION PIPELINES

### How Stores Accept Content

**Each store operates its own ingestion system.** There is NO single universal API. You must establish a separate delivery pipeline to each store.

**Spotify:**
- SFTP-based delivery (primary)
- Accepts FLAC (preferred) or WAV
- 44.1kHz minimum, 24-bit preferred
- WAV must use format code 0x0001 (WAVE_FORMAT_PCM), not 0xFFFE
- WAV must contain valid fmt and data subchunks
- Spotify internally converts to Ogg Vorbis (96/160/320kbps) and AAC
- Audio above 24-bit gets reduced to max 44.1kHz/24-bit FLAC
- Has a provider/partner program — you must apply and be approved to deliver directly

**Apple Music / iTunes:**
- Uses Apple's **iTunes Connect / Transporter** system
- Requires Apple Digital Masters certification for high-res delivery
- Accepts WAV and FLAC
- Has its own XML metadata format (historically proprietary, now DDEX-aligned)
- Delivers via Apple's dedicated content delivery tools
- Must be an approved content provider

**Amazon Music:**
- SFTP-based delivery
- Accepts standard DDEX ERN messages
- Supports HD and Ultra HD tiers (up to 24-bit/192kHz)

**YouTube / YouTube Music:**
- Content ID system for rights management
- YouTube CMS (Content Management System) for music partners
- Reference audio files uploaded for Content ID matching
- Sound recordings + music videos delivered separately
- Art tracks (static image + audio) auto-generated
- YouTube Data API (v3) available for programmatic upload

**TikTok:**
- Newer store with its own delivery system
- Accepts content from approved distributors
- Growing rapidly as a music platform

**Deezer, Tidal, Pandora, etc.:**
- Each has SFTP or API delivery endpoints
- Most accept DDEX ERN messages
- Each has store-specific quirks and requirements

### Cloud Infrastructure for Your Pipeline

**Recommended AWS stack:**
- **S3**: Store all audio masters, transcoded files, and metadata
- **SQS/SNS**: Queue system for async processing jobs
- **Lambda or ECS**: Run transcoding, validation, DDEX XML generation
- **MediaConvert**: Managed transcoding (usage-based billing)
- **Transfer Family**: Managed SFTP for receiving files from artists
- **CloudFront**: CDN if you serve any audio previews
- **RDS/Aurora**: Metadata database, catalog, rights management
- **ElasticSearch**: Catalog search
- **EventBridge**: Orchestrate the delivery pipeline

**Alternative: Google Cloud**
- Cloud Storage, Pub/Sub, Cloud Run, BigQuery for analytics
- Transcoder API for media processing
- Cloud CDN for delivery

---

## 5. LICENSING, ROYALTY COLLECTION & PAYMENT SPLITTING

### The Royalty Flow

```
CONSUMER STREAMS A SONG
        │
        ▼
DSP (Spotify, Apple, etc.) logs the stream
        │
        ▼
DSP generates monthly/quarterly sales reports
(DDEX DSR format or proprietary CSV/TSV)
        │
        ▼
Reports sent to YOUR distribution company via SFTP
        │
        ▼
YOUR SYSTEM ingests and parses reports
        │
        ▼
Match each line item to your catalog
(by ISRC, UPC, or store-specific ID)
        │
        ▼
Apply revenue splits per contract:
  - Artist: X%
  - Label: Y%
  - Producer: Z%
  - Your distribution fee: N%
        │
        ▼
Generate statements per rights holder
        │
        ▼
Process payments (monthly/quarterly)
via bank transfer, PayPal, wire
```

### DDEX DSR (Digital Sales Reporting)

**What it is:** The standard format stores use to report streams/sales back to distributors.

**11 DSR Profiles (you implement the ones relevant to your business):**

| Profile | Purpose |
|---------|---------|
| Part 3 | Basic Audio Profile (musical works reporting) |
| Part 4 | User Generated Content Profile |
| Part 5 | Audio-visual Profile |
| Part 6 | Royalty Reporting Profile |
| Part 7 | Radio Broadcast Profile |
| Part 9 | Financial Reporting to Record Companies |
| Part 10 | Masterlist Profile |
| Part 11 | Basic Audio Profile for Mechanical Licensing Collective |

**DSR is a flat-file format** (not XML) — tab-separated values with header records defining the report structure. DDEX provides an open-source Python library for parsing/validating DSR files: https://github.com/ddexnet/dsrf

**Reality check:** Not all stores use DDEX DSR. Many send proprietary CSV/Excel reports. Your system must handle BOTH standardized and custom report formats.

### Payment Splitting Architecture

**Database schema needs:**
- Tracks table (ISRC, title, master owner, status)
- Releases table (UPC, title, release date, tracks)
- Contracts table (rights holder, track/release, split %, territory, term dates)
- Royalty Reports table (store, period, track, streams, revenue)
- Statements table (rights holder, period, amount, status)
- Payments table (rights holder, amount, method, date, status)

**Key complexity:**
- Splits can change over time (new deals, transfers)
- Territory-specific splits (different % in US vs. EU)
- Minimum payout thresholds ($10-$50 typically)
- Currency conversion (stores report in local currency)
- Tax withholding (US W-8BEN for international, 1099 for domestic)
- Advances and recoupment tracking
- Disputed ownership / conflicting claims

### Licensing You Need

**As a distributor, you do NOT need mechanical licenses** — you are distributing on behalf of artists/labels who grant you distribution rights. However:

- You need **distribution agreements** with each artist/label (your terms of service)
- You need **content provider agreements** with each store (Spotify, Apple, etc.)
- You should register as an **ISRC manager** with your national ISRC agency (in the US: RIAA's ISRC system)
- You need a **DDEX Implementation Licence** (free) and a **DPID** (DDEX Party ID)
- Consider joining **Merlin Network** — they negotiate deals with DSPs on behalf of indie distributors and labels
- You MAY need to register with collecting societies (ASCAP, BMI, SESAC in US) depending on your model

---

## 6. STORE APIs — WHAT'S AVAILABLE FOR DSP PARTNERS

### Critical Truth: Content Delivery ≠ Public APIs

**The Spotify Web API, Apple Music API, and Amazon Music API are CONSUMER-FACING APIs.** They let you search catalogs, control playback, manage playlists. They do NOT let you upload or deliver music.

**Content delivery to stores happens through PRIVATE PARTNER INTEGRATIONS:**

**Spotify:**
- Must apply to become an approved distributor/content provider
- Get SFTP credentials and delivery specifications
- No public API for content ingestion
- Spotify closed its direct upload program — all music must come through approved distributors
- Platinum Preferred Partner status available (like Revelator, DistroKid, etc.)

**Apple Music / iTunes:**
- Must become an approved Content Provider
- Uses Apple Transporter tool for delivery
- Apple has its own content specification documentation
- Relationship managed through Apple's Music Publishing team

**Amazon Music:**
- Must become an approved delivery partner
- SFTP-based delivery with DDEX ERN messages
- Amazon for Artists provides analytics (separate from delivery)

**YouTube:**
- Content ID partnership required for music rights management
- YouTube CMS for managing sound recordings
- YouTube Data API (v3) for programmatic video upload
- Must be approved as a music partner to access Content ID

**General pattern for ALL stores:**
1. Apply to become a content provider / delivery partner
2. Sign their content provider agreement
3. Receive SFTP credentials or API access
4. Implement their specific delivery format (mostly DDEX ERN-based, with store-specific extensions)
5. Start delivering test batches
6. Get approved for production delivery
7. Begin live content delivery

---

## 7. REAL EXAMPLES OF INDIE DSPs THAT LAUNCHED SUCCESSFULLY

### Tier 1: Major Independent Distributors

**DistroKid** (founded 2013, Philip Kaplan)
- Now the world's LARGEST music distributor by upload volume
- 40,000+ songs uploaded to Spotify daily
- Business model: flat annual fee ($22.99/yr) for unlimited uploads — revolutionary when launched
- Artist keeps 100% of royalties (DistroKid makes money on subscriptions, not commission)
- Built as a lean tech company, not a traditional music company
- Key differentiator: speed — uploads go live in hours, not weeks
- One of the first to fully automate the distribution pipeline

**TuneCore** (founded 2005)
- Pioneer of DIY distribution
- Per-release pricing model (single: ~$9.99, album: ~$29.99/year)
- Artist keeps 100% of royalties
- Acquired by Believe in 2015
- Handles royalty collection, publishing administration, sync licensing

**CD Baby** (founded 1998, Derek Sivers)
- One of the oldest indie distributors
- One-time fee model (no annual renewals)
- Takes 9% commission on streaming revenue
- Full-service: distribution + publishing + sync licensing
- Now owned by Downtown Music (SESAC family)

**Ditto Music** (founded 2005, UK)
- Flat annual fee model
- Strong presence in UK/EU market
- Offers record label services on top of distribution

### Tier 2: White-Label / B2B Platforms (Build Your Own Distributor)

**Revelator**
- Offers a complete white-label distribution platform
- API-first architecture — you can build your own front-end on their infrastructure
- Handles: catalog management, rights management, distribution delivery, royalty accounting, global payments
- Spotify Platinum Preferred Provider
- Merlin board member
- Target: companies that want to become distributors without building the entire stack

**AudioSalad** (SESAC company)
- White-label distribution platform for labels and distributors
- Clients include: Merge Records, ATO Records, Hopeless Records, Stones Throw
- Delivers to Spotify, Apple Music, Amazon, YouTube, TikTok, Beatport, etc.
- Full catalog management, analytics, and delivery tools

**Label Engine**
- Distribution + royalty management platform for labels
- 26M+ tracks distributed, $1B+ in royalties processed
- Point-and-click royalty management
- Used by electronic music labels primarily (Beatport-focused)

**FUGA** (now part of Downtown Music)
- B2B distribution technology platform
- Used by major independent labels worldwide
- Offers: Music Distribution, Physical Distribution, Marketing Services, Audio Visual Services, Neighbouring Rights
- White-label capabilities

### Tier 3: Newer / Niche Entrants

**Amuse** (founded 2015, Sweden)
- Mobile-first distribution (upload from your phone)
- Free tier with basic distribution
- Pro tier with faster delivery and more features
- Also operates as a record label (signs artists discovered through their platform)

**Symphonic Distribution** (founded 2006)
- Full-service distribution for indie labels
- Strong Latin American market presence
- Offers distribution, marketing, and analytics

**Believe / TuneCore**
- Believe is a publicly traded French company (Euronext Paris)
- Operates at major-label scale while serving independent artists
- TuneCore (DIY) and Believe (label services) serve different tiers
- Technology platform handles everything from self-distribution to full label services

### What They All Have In Common (Technical Patterns)

1. **Cloud-native architecture** — all run on AWS, GCP, or Azure
2. **DDEX ERN compliance** — all generate DDEX XML for store delivery
3. **SFTP delivery pipelines** — all maintain SFTP connections to 50+ stores
4. **Async processing** — uploads trigger background jobs for validation, transcoding, packaging, delivery
5. **Multi-tenant SaaS** — one platform serves thousands of artists/labels
6. **Royalty matching engine** — ingest reports from dozens of stores in different formats
7. **Payment processing** — integrated with Stripe, PayPal, bank transfer systems

---

## 8. PRACTICAL STEPS TO BUILD YOUR OWN DSP

### Phase 1: Foundation (Months 1-3)
- Register for DDEX Implementation Licence (free) → get your DPID
- Register as an ISRC manager (if assigning ISRCs to artists)
- Choose your cloud provider (AWS recommended for media workloads)
- Build your database schema (tracks, releases, artists, contracts, rights)
- Build your upload/ingestion web app
- Build audio validation service

### Phase 2: DDEX & Delivery (Months 3-6)
- Implement DDEX ERN 4.3 XML generation
- Use the DDEX validator (https://ddex-validator.ddex.net/) to verify your XML output
- Apply to stores as a content provider (START EARLY — this can take months)
  - Spotify, Apple Music, Amazon Music are hardest to get approved
  - Smaller stores (Deezer, Tidal, Pandora) may be easier to start with
- Build SFTP delivery pipeline
- Test deliveries to each approved store
- Build delivery monitoring and retry logic

### Phase 3: Royalty Engine (Months 6-9)
- Build report ingestion system (DDEX DSR + proprietary formats)
- Build royalty matching and calculation engine
- Build payment splitting logic
- Build artist/label statement generation
- Integrate payment processing (Stripe Connect, PayPal Payouts, or Tipalti)

### Phase 4: Polish & Scale (Months 9-12)
- Analytics dashboard
- Real-time streaming data integration
- Mobile app
- Marketing tools (pre-save links, smart links)
- Customer support system
- Scale testing with increasing volume

### The Shortcut: White-Label

Instead of building everything from scratch, you can use a white-label platform:
- **Revelator** — API-first, full white-label, already connected to all major stores
- **AudioSalad** — established white-label platform with label clients
- **Label Engine** — royalty-focused with distribution built in
- **FUGA** — enterprise-grade B2B platform

This lets you focus on your brand, artist relationships, and unique features while the heavy infrastructure (store connections, DDEX compliance, royalty processing) is handled by the platform.

---

## 9. KEY IDENTIFIERS IN MUSIC DISTRIBUTION

| Identifier | What It Identifies | Format | Who Assigns It |
|-----------|-------------------|--------|---------------|
| **ISRC** | A specific sound recording | CC-XXX-YY-NNNNN (e.g., US-ABC-26-00001) | ISRC Manager (you, as distributor) |
| **UPC/EAN** | A release (album/single/EP) | 12-13 digit barcode | GS1 or your barcode provider |
| **ISWC** | A musical composition/work | T-000.000.000-0 | Collecting societies |
| **DPID** | A company in DDEX messages | Alphanumeric | DDEX (free with implementation licence) |
| **IPI** | A songwriter/publisher | 9-11 digit number | CISAC/collecting societies |
| **ISNI** | A person or organization | 16 digits | ISNI International Authority |

---

## 10. COST ESTIMATES

| Component | Monthly Cost (Starting) | At Scale |
|-----------|----------------------|----------|
| Cloud hosting (AWS) | $500-2,000 | $5,000-50,000 |
| SFTP infrastructure | $200-500 | $1,000-5,000 |
| Storage (audio files) | $100-500 | $2,000-20,000 |
| Payment processing | 1-3% of payouts | 1-3% of payouts |
| DDEX licence | Free | Free |
| ISRC registration | ~$100 one-time | - |
| UPC barcodes | $250+ (batch of 100) | Volume pricing |
| White-label platform (if used) | $2,000-10,000 | Revenue share |
| Development team | $15,000-50,000 | $50,000-200,000 |

---

## KEY RESOURCES & LINKS

- **DDEX Standards**: https://ddex.net/standards/
- **DDEX Knowledge Base**: https://kb.ddex.net
- **DDEX Implementation Licence**: https://dpid.ddex.net/register
- **DDEX ERN Validator**: https://ddex-validator.ddex.net/
- **DDEX ERN Validator (GitHub)**: https://github.com/ddexnet/ern-validator-api
- **DDEX DSR Parser (Python, GitHub)**: https://github.com/ddexnet/dsrf
- **DDEX Data Dictionary (ERN 4.3)**: https://service.ddex.net/dd/DD-ERN-43/
- **Spotify Audio Format Specs**: https://support.spotify.com/artists/article/audio-file-formats
- **YouTube Data API**: https://developers.google.com/youtube/v3
- **AWS Media Services**: https://aws.amazon.com/media/
- **Revelator (White-Label)**: https://www.revelator.com
- **AudioSalad (White-Label)**: https://www.audiosalad.com
- **Label Engine**: https://www.label-engine.com
