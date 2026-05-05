# VR Language Barrier — Windows Audio Setup Guide

End-to-end setup for routing translated TTS audio (ElevenLabs Flash 2.5 output) into VRChat as your microphone, while still being able to hear yourself, your friends, and VRChat back through your headphones.

---

## 1. What you're installing (and why)

| Tool | Purpose | Required? |
|------|---------|-----------|
| **VB-Cable (the original)** | First virtual audio cable. The "wire" that carries translated TTS into VRChat as a fake mic. | YES |
| **Voicemeeter Banana** | Software mixer. Lets you blend real mic + TTS, route to multiple destinations (VRChat in, headphones out, recording), and add delay/EQ. | YES (recommended over plain VB-Cable for this build) |
| **VB-Cable A+B (optional 2nd & 3rd cables)** | Extra virtual cables if you want to split monitoring vs. send paths. | OPTIONAL |

Why both? VB-Cable alone is a single one-way pipe. Voicemeeter Banana lets you mix your **real mic** (for non-translated phrases, laughs, breathing) WITH the **TTS audio** and send the combined signal into VRChat. Without the mixer you have to choose one or the other.

---

## 2. Download links (official sources only)

1. **VB-Cable (original):** https://vb-audio.com/Cable/
   - Click **"Download VBCABLE Driver Pack"** (zip)
   - Free, donationware
2. **Voicemeeter Banana:** https://vb-audio.com/Voicemeeter/banana.htm
   - Click **"Download Voicemeeter Banana"** (installer .exe)
   - Free, donationware
3. **(Optional) VB-Cable A+B:** https://vb-audio.com/Cable/index.htm#DownloadCables
   - Only needed if you want a dedicated monitor return path

> Always download from `vb-audio.com` directly. There are scam mirrors on Google.

---

## 3. Install order (FOLLOW THIS EXACTLY)

1. **Close VRChat, Discord, OBS, browsers playing audio, Spotify** — anything holding the audio device open.
2. **Install VB-Cable first**
   - Unzip the driver pack
   - Right-click `VBCABLE_Setup_x64.exe` → **Run as administrator**
   - Click **Install Driver**
   - **Reboot Windows** (mandatory — driver won't bind cleanly without it)
3. **Install Voicemeeter Banana second**
   - Run `VoicemeeterProSetup.exe` as administrator
   - Click **Install** → **Reboot Windows again**
4. **(Optional) Install VB-Cable A+B last**
   - Same drill: right-click `VBCABLE_A_Setup_x64.exe` and `VBCABLE_B_Setup_x64.exe` → Run as admin → reboot

> Two reboots minimum. The Windows audio stack is fussy about new virtual devices appearing.

---

## 4. Confirm devices appeared

After the reboots, open **Settings → System → Sound → All sound devices** (or `mmsys.cpl` for the classic panel). You should see:

**Playback (output) tab:**
- `CABLE Input (VB-Audio Virtual Cable)` — this is the **destination** you write TO
- `VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)` — Voicemeeter's main input bus
- `VoiceMeeter Aux Input (VB-Audio VoiceMeeter AUX VAIO)` — Voicemeeter's secondary input bus
- (optional) `CABLE-A Input`, `CABLE-B Input`

**Recording (input) tab:**
- `CABLE Output (VB-Audio Virtual Cable)` — this is the **source** you read FROM
- `VoiceMeeter Output (VB-Audio VoiceMeeter VAIO)` — Voicemeeter's main output (B1)
- `VoiceMeeter Aux Output (VB-Audio VoiceMeeter AUX VAIO)` — Voicemeeter's secondary output (B2)
- (optional) `CABLE-A Output`, `CABLE-B Output`

If any of these are missing → the driver didn't bind. Reboot one more time. Still missing → uninstall via Programs & Features, reboot, reinstall.

---

## 5. Routing diagram (the whole pipeline)

```
+------------------+        +------------------------------+
|  Real microphone |  -->   | Voicemeeter Banana           |
|  (USB / XLR)     |        |   HARDWARE INPUT 1           |
+------------------+        |   (assign your real mic)     |
                            +------------------------------+
                                       |
                                       |  (only when you want
                                       |   raw voice — laughs,
                                       |   sighs, music, etc.)
                                       v
+----------------------------+   +-------------+
|  Browser tab @ localhost   |   |  Voicemeeter|
|  3000 (VR Bridge UI)       |   |  Banana     |
|                            |   |  Mixing Bus |
|  ElevenLabs TTS plays      |   |             |
|  through:                  |   |  B1 = main  |
|  "VoiceMeeter Aux Input"   |--->|  bus output |
|  (set in Win sound mixer)  |   |             |
+----------------------------+   +-------------+
                                       |
                                       v
                            +------------------------------+
                            | VoiceMeeter Output B1        |
                            | (VAIO main, virtual mic)     |
                            +------------------------------+
                                       |
                                       v   patch-cable trick:
                            +------------------------------+
                            | Windows: set the system audio|
                            | "listen to" routing so B1 -> |
                            | CABLE Input                  |
                            |                              |
                            | OR (cleaner): set VRChat mic |
                            | DIRECTLY to "VoiceMeeter     |
                            | Output" — skip CABLE entirely|
                            +------------------------------+
                                       |
                                       v
                            +------------------------------+
                            |  VRChat                      |
                            |  Settings -> Audio -> Voice  |
                            |  Input = "VoiceMeeter Output"|
                            |  (your friends hear the      |
                            |   translated Japanese audio) |
                            +------------------------------+

MONITOR PATH (so YOU can hear what's going out):
   Voicemeeter A1 (hardware out)  -->  your physical headphones
   (Master section, A1 button lit on each strip you want to hear)

VRCHAT GAME AUDIO BACK TO YOU:
   Windows default playback = "VoiceMeeter Input" (VAIO)
   So VRChat -> Voicemeeter -> A1 -> headphones
   (you hear Yuki, world ambience, etc. as normal)
```

**Plain English version of the diagram:**
1. Real mic plugs into Voicemeeter as Hardware Input 1
2. Browser plays TTS audio out to "VoiceMeeter Aux Input" (per-app override in Windows Sound mixer)
3. Voicemeeter mixes both, sends out **B1 = VoiceMeeter Output**
4. VRChat reads its mic from **VoiceMeeter Output** → friends hear the translated voice
5. You hear yourself + VRChat through Voicemeeter A1 → physical headphones

---

## 6. Windows per-app audio override (the magic step most people miss)

This is how you tell **only the browser** to play into Voicemeeter while everything else stays normal.

1. Open **Settings → System → Sound → Volume mixer**
2. Find the entry for your browser (Chrome / Edge / Firefox) — make sure the localhost:3000 tab is open and a TTS clip has played at least once so it appears
3. Under **Output device** for that browser, change from "Default" to **VoiceMeeter Aux Input (VAIO AUX)**
4. Now only the browser routes to Voicemeeter. Spotify, Discord, YouTube — all unaffected.

---

## 7. Voicemeeter Banana settings (one-time)

Open Voicemeeter Banana. You'll see 3 hardware input strips, 2 virtual input strips, and 3 output buses (A1/A2/A3 hardware + B1/B2 virtual).

**Hardware Input 1 (real mic):**
- Click `1` at top → **Select KS: <your mic name>** (Kernel Streaming = lowest latency)
- Buttons enabled: **A1** (so you can hear yourself), **B1** (so VRChat hears you when you talk normally)
- Set fader to ~ -6 dB

**Virtual Input "VoiceMeeter AUX" (the one your browser plays into):**
- Buttons enabled: **A1** (so you hear the translation in your headphones), **B1** (so VRChat hears the translation)
- Set fader to 0 dB

**Hardware Out A1:**
- Click `A1` at top right → **Select KS: <your headphones>**

**Master section:**
- B1 = the "VoiceMeeter Output" virtual mic that VRChat will read

That's it. Save settings: **Menu → Save settings on exit**.

---

## 8. VRChat audio settings to change

1. Launch VRChat
2. Open the quick menu → **Settings → Audio & Voice**
3. **Microphone** dropdown → select **VoiceMeeter Output** (NOT "CABLE Output", NOT your real mic)
4. Verify the green VU meter moves when you speak AND when a TTS clip plays
5. **Voice volume**: 100% (default)
6. Optional but recommended: **Voice Echo Cancellation = OFF** (it can chew up the synthesized TTS waveform)
7. Optional: **Noise Suppression = LOW** (HIGH can also degrade TTS)

---

## 9. Quick smoke test (do this BEFORE talking to a real friend)

1. Run server: `npm start` in `VR Bridge\` folder
2. Open `http://localhost:3000` in browser
3. In Windows volume mixer, route the browser to "VoiceMeeter Aux Input" (step 6)
4. Open VRChat → join a private instance solo → mirror world is best
5. Click **Tap to Speak** in the browser, say "hello, this is a test"
6. Watch the avatar's mouth in the mirror move when the JP audio plays
7. Open **OBS or Audacity** → set input to "VoiceMeeter Output" → record 5s → confirm both your real voice AND the TTS show up

---

## 10. Troubleshooting

### "VRChat hears my real voice, not the translated audio"
- Cause: VRChat mic is still set to your real microphone, OR the browser isn't routed to Voicemeeter Aux.
- Fix:
  1. VRChat → Settings → Audio → Microphone = **VoiceMeeter Output** (not Default, not your mic name)
  2. Windows → Volume Mixer → browser app → Output = **VoiceMeeter Aux Input**
  3. In Voicemeeter, confirm the **B1 button is green/lit** on the AUX virtual input strip

### "VRChat hears the translation but NOT my real voice"
- Cause: Real mic strip's B1 button isn't enabled.
- Fix: In Voicemeeter, click `B1` on Hardware Input 1 (it should glow). Save settings.

### "No audio at all — VRChat green VU meter is dead"
- Cause: Voicemeeter isn't running, or Windows is muting the virtual device.
- Fix:
  1. Voicemeeter Banana must be RUNNING (look for the icon in system tray)
  2. Right-click speaker icon → Sound settings → Recording tab → right-click "VoiceMeeter Output" → **Properties → Levels = 100, not muted**
  3. Restart Voicemeeter (Menu → Restart Audio Engine)

### "Feedback loop — I hear myself echoing"
- Cause: Voicemeeter A1 is sending to a speaker that your real mic is picking up.
- Fix:
  1. Wear headphones, not speakers
  2. OR: on Hardware Input 1 (real mic), DISABLE the A1 button (you stop monitoring yourself)
  3. OR: lower the A1 fader on the mic strip
  4. Verify VRChat's "Voice Echo Cancellation" is **off** in your test instance — sometimes it tries to cancel TTS as if it were echo

### "Robot/glitchy/skipping TTS audio"
- Cause: Sample rate mismatch between the browser, Voicemeeter, and VRChat.
- Fix: Set EVERY device (mic, headphones, CABLE Input/Output, VoiceMeeter Input/Output, VoiceMeeter Aux) to the **SAME sample rate** — `48000 Hz, 16-bit` is the safest. Open each device's Properties → Advanced tab → set explicitly. Restart Voicemeeter audio engine.

### "Latency is way over 2 seconds"
- Cause: Voicemeeter system buffer set too high, or MME instead of WDM/KS.
- Fix:
  1. Voicemeeter Menu → **System Settings (Right-Click on the menu)** → Buffer **WDM = 256, KS = 256, ASIO = 256**
  2. Use **KS** for both your mic input and headphone output (not MME)
  3. Sample rate = 48000

### "Discord / OBS broke after install"
- Cause: They auto-grabbed VoiceMeeter Output as their default mic.
- Fix: In Discord → User Settings → Voice & Video → Input Device = your **REAL mic name** (not Voicemeeter unless you want translated audio in Discord too).

### "I want translated audio in Discord too"
- Set Discord input = VoiceMeeter Output. Done. Same trick.

### "I uninstalled VB-Cable and now Windows audio is broken"
- Cause: Stale driver registration.
- Fix: Run the official `VBCABLE_ControlPanel.exe` → Menu → "Uninstall driver", reboot, then reinstall fresh. If still broken: Device Manager → Sound, video and game controllers → remove any orphan "VB-Audio" entries, reboot.

---

## 11. Daily startup checklist (after setup is done)

1. Boot Voicemeeter Banana (set it to auto-start: Menu → System Tray → "Run on Windows Startup")
2. Confirm system tray shows Voicemeeter icon active
3. `npm start` in VR Bridge folder
4. Open `http://localhost:3000`
5. Confirm Volume Mixer still has browser → VoiceMeeter Aux Input (Windows usually remembers, but Chrome updates can reset it)
6. Launch VRChat → confirm mic dropdown still shows VoiceMeeter Output
7. Smoke test in mirror world before joining friends

---

## 12. Optional power moves

- **Voicemeeter Macro Buttons:** assign a hotkey to mute the real mic strip (B1 off) so ONLY translated audio goes through during a long speech turn. Press again to re-enable real mic for laughs.
- **OBS recording:** add an Audio Input Capture source set to "VoiceMeeter Output" — perfect clean recording of your translated VRChat sessions for content / debugging.
- **Compressor on the AUX strip:** Voicemeeter Banana has a built-in compressor — set it to 4:1, threshold around -18 dB. Smooths out ElevenLabs volume swings.
