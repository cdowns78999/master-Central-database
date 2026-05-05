# VR Bridge

VRChat voice translator + auto-invite-on-online companion app.

Speak into your real mic &rarr; speech-to-text &rarr; translate &rarr; text-to-speech &rarr; virtual audio cable &rarr; VRChat hears your translated voice as its microphone input. A separate bot watches a list of friends and auto-invites them to your group the moment they come online.

---

## Pipeline

```
mic -> STT -> translate -> TTS -> VB-Cable -> VRChat
VRChat API -> invite-bot.js -> group.invite
```

---

## Install Flow

### 1. Install VB-Cable (Virtual Audio Cable)
Link: https://vb-audio.com/Cable/

- Creates a fake microphone/speaker pair so apps can pipe audio to each other.
- Install, reboot, confirm `CABLE Input` and `CABLE Output` appear in Windows Sound settings.
- Route: VR Bridge TTS sends to `CABLE Input`, VRChat reads from `CABLE Output` as its mic.

### 2. Install Voicemeeter Banana
Link: https://vb-audio.com/Voicemeeter/

- Acts as a software mixer so you can blend your real mic with the translated voice.
- Hardware Input 1 = your real mic. Virtual Input (VAIO) = `CABLE Output`.
- A1 output = headphones (monitoring). B1 output = VRChat mic bus.
- In VRChat audio settings, set input device to **Voicemeeter Out B1**.

### 3. Get OpenAI API key (free $5 trial)
Link: https://platform.openai.com/api-keys

- Powers Whisper STT and GPT translation.
- Create a new secret key, copy it once.
- Paste into `.env`:

```
OPENAI_API_KEY=sk-...
```

### 4. Get ElevenLabs API key (10k free chars/mo)
Link: https://elevenlabs.io

- High-quality TTS voice for the translated output.
- Sign up, open **Profile &rarr; API Key**, copy the key.
- Paste into `.env`:

```
ELEVENLABS_API_KEY=...
```

### 5. VRChat login + Group ID

- Open your VRChat group in the browser. URL looks like `vrchat.com/home/group/grp_abc123...` — the `grp_...` portion is your Group ID.
- Find each friend's User ID (starts with `usr_...`) from their profile URL.
- Add to `.env`:

```
VRCHAT_USERNAME=your_vrc_username
VRCHAT_PASSWORD=your_vrc_password
VRCHAT_GROUP_ID=grp_abc123-...
WATCH_FRIEND_IDS=usr_111...,usr_222...,usr_333...
```

2FA-enabled accounts will prompt for a code the first time the bot logs in.

### 6. Launch

```
npm install
npm start
```

Open http://localhost:3000 for the voice translator UI.

For auto-invite-on-online, run in a **second terminal**:

```
npm run invite-bot
```

Keep both running together.

---

## Ban Risk Disclosure

**WARNING: Automation uses the unofficial VRChat API.** VRChat does not publicly support third-party automation of invites, friend actions, or presence polling.

This tool is rate-limited to **1 invite per friend per hour** to stay conservative, but any automation carries risk.

**Use at your own risk.** It can result in account warnings, suspension, or a full ban. By running VR Bridge, you accept this risk.

---

## Third-Party Services Used

- **VB-Audio VB-Cable** — https://vb-audio.com/Cable/ (virtual audio routing)
- **VB-Audio Voicemeeter Banana** — https://vb-audio.com/Voicemeeter/ (software mixer)
- **OpenAI** — https://platform.openai.com (Whisper STT + GPT translation)
- **ElevenLabs** — https://elevenlabs.io (TTS)
- **VRChat** — https://vrchat.com (target platform, unofficial API)

---

## Prior Art

VR Bridge stands on the shoulders of existing community tools that figured out the VRChat unofficial-API patterns:

- **VRCX** — https://github.com/vrcx-team/VRCX — the canonical VRChat companion app. Friend tracking, world history, auto-invite patterns.
- **vrc-invite-bot** — community invite-bot implementations showing the group.invite flow via the unofficial API.
- **VRChatAutoInviteGroup** — prior projects that auto-invite friends to a group when they come online (same core concept this app builds on).

Credit to those maintainers for surfacing the API behaviors this project relies on.
