# Avatar Fashion Webhook Plan
## 3-Step Pipeline — Onboarding App Card

---

## STACK
- WH1 Image Gen → Pollinations.ai (FREE, no API key, just a URL)
- WH2 Vision Analysis → Gemini Pro API (Chad's existing key)
- WH3 Live Apply → Three.js in-browser (no API, fully local)
- Avatar format → GLB/GLTF (web native, Three.js zero-config)
- File bundling → JSZip (client-side, no server)

---

## CARD LAYOUT
- Top: Three.js GLB avatar viewer — base humanoid, orbit controls, "waiting" idle state
- Below viewer: 3 banner buttons in a row, each opens an overlay panel on the same page
- Progress indicator: Step 1 / Step 2 / Step 3 — fills as each completes

---

## WEBHOOK 1 — Generate Fashion Image
**Service:** Pollinations.ai (free, no key)
**URL pattern:** `https://image.pollinations.ai/prompt/{encoded-prompt}?width=512&height=512&nologo=true`

Steps:
1. User clicks "🎨 Generate Fashion Image" banner
2. Overlay opens: prompt input box + Generate button
3. User types fashion idea (e.g. "dark cyberpunk streetwear, silver chains, oversized jacket")
4. On submit: fetch from Pollinations URL with encoded prompt
5. Generated image renders in overlay (just an <img> tag pointing to the URL)
6. "Use This" button → saves image URL to app state, marks Step 1 ✅, closes overlay

---

## WEBHOOK 2 — Convert Image to Avatar Files
**Services:** Canvas API (color extraction) + Gemini Pro Vision API (style analysis) + Pollinations.ai (texture gen)

Steps:
1. User clicks "🔄 Convert to Avatar Files" banner
2. Overlay shows the Step 1 image (or manual upload fallback)
3. Canvas API draws image → k-means clustering → extracts 6 dominant hex colors
4. Gemini Pro Vision API reads image → returns JSON:
   - silhouette type (baggy / fitted / layered)
   - material descriptors (leather / mesh / soft fabric / metallic)
   - vibe tags (cyberpunk / pastel / streetwear / formal)
   - dominant colors (confirmed from canvas extraction)
5. Style manifest JSON built from steps 3+4
6. Pollinations.ai generates flat texture PNGs from manifest:
   - outfit_front.png → body mesh texture
   - hair_texture.png → hair mesh texture
7. JSZip bundles: outfit_front.png · hair_texture.png · style-manifest.json
8. "Use These Files" → carries bundle to Step 3 state, marks Step 2 ✅

---

## WEBHOOK 3 — Apply to Avatar (Live)
**Service:** Three.js + GLTFLoader (all local, no API)

Steps:
1. User clicks "✨ Apply to Your Avatar" banner
2. Overlay confirms files from Step 2 are ready (or manual zip upload)
3. Three.js loads base GLB humanoid avatar into the card viewer
4. outfit_front.png → THREE.TextureLoader loads it → applied as diffuse map on body mesh material
5. hair_texture.png → applied as diffuse map on hair mesh material
6. Avatar viewer LIVE updates — textures appear on the model instantly
7. Pose preset buttons: Idle / T-Pose / Arms Out
8. OrbitControls: rotate, zoom, pan
9. "Download Avatar" button → exports final GLB with textures embedded via GLTFExporter

---

## DATA FLOW BETWEEN STEPS
```
WH1: prompt string → Pollinations URL → image URL (saved to app state)
WH2: image URL → canvas hex[] + Gemini JSON → style-manifest.json + texture PNGs (saved to app state)
WH3: texture PNGs → Three.js material swap → live avatar update → GLB export
```

---

## COST
- WH1: $0 (Pollinations free)
- WH2: ~$0.001 per Gemini vision call + $0 Pollinations texture gen
- WH3: $0 (all local Three.js)
- Total per run: essentially free

---

## NOTES
- Gemini key lives in a config input on the page (user pastes once, stored in localStorage)
- No server needed — entire pipeline runs client-side
- GLB base avatar: use a free CC0 humanoid (e.g. from ReadyPlayerMe or Mixamo export)
- Texture swap is 4 lines of Three.js — standard practice, reliable
