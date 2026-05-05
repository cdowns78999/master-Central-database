# c-netlify-database — Support MD

Source of truth for `/c-netlify-database`. Mirrors the `/c-yesterday` pattern: a pre-rendered `## CACHED RENDER` block lives here ready to paste verbatim, plus auxiliary `## DATABASE`, `## ID CACHE`, `## SESSION LINKS`, and `## NOTES LOG` blocks for top-up + ID launch + cross-session marker maintenance.

---

cached_timestamp: 2026-04-24T00:00:00Z
newest_deploy_date: 2026-04-23
total_rows: 25
freshness_window_hours: 24

---

## CACHED RENDER

> Paste-ready. Zero parsing on default fire. Step 1 reads this block and prints it verbatim — no formatting work, no row math.

```
🟡 cached · newest 2026-04-23 · 25 deploys · last topped up 2026-04-24T00:00:00Z

╭─ 🟡 NETLIFY DEPLOY DATABASE ───────────────────────────────────────────────╮
│                                                                            │
│   #   name                              id (8ch)   date         flag       │
│   ──  ────────────────────────────────  ─────────  ──────────   ───────    │
│    1  cat-detective-1776954590           400d46ad   2026-04-23   🌐🌐       │
│    2  emma-the-star                      6d71e4c2   2026-04-23              │
│    3  ozzy-osbourne-family-tree          2695fba6   2026-04-22   🌐🌐       │
│    4  ozzy-legacy                        da7ca248   2026-04-22   🌐🌐       │
│    5  ozzy-contest                       8f447a42   2026-04-22   🌐🌐       │
│    6  numerology-chad-bekah              bc172c89   2026-04-21              │
│    7  behkah-app                         7424878e   2026-04-21   🌐🌐       │
│    8  bekah-for-you                      94c41942   2026-04-21   🌐🌐       │
│    9  avril-mean-as                      916312a9   2026-04-21   🌐🌐       │
│   10  ozzy-final                         1231e6eb   2026-04-21              │
│   11  bunnybear-warm-heart               8846f624   2026-04-21   🌐🌐       │
│   12  ladymilkymoo-warm-heart            95679c6b   2026-04-21              │
│   13  dandom-greece                      e81d4ef4   2026-04-20   🌐🌐       │
│   14  dandom                             0983d0f2   2026-04-20   🌐🌐       │
│   15  mike-is-a-blessing                 83d2b2ab   2026-04-20   🌐🌐       │
│   16  dream-maker-koi                    2afc84f7   2026-04-19   🌐🌐       │
│   17  young-ozzy                         69b7f9ec   2026-04-19   🌐🌐       │
│   18  koi-epk-dossier-621865             139e054f   2026-04-19   🌐🌐       │
│   19  little-koi-link-tree-1776618139    6cf1de40   2026-04-19   🌐🌐       │
│   20  samples-8-music-forms-1776604446   eb517fc9   2026-04-19   🌐🌐       │
│   21  koi-where-opera-stands-04428       680f099a   2026-04-19   🌐🌐       │
│   22  vespers-salon                      44a31643   2026-04-19   🌐🌐       │
│   23  koi-warm-heart                     e0dd8fb5   2026-04-19   🌐🌐       │
│   24  for-koi-603660                     8867513e   2026-04-19   🌐🌐       │
│   25  angel1-sample-3657                 815810ea   2026-04-19   🌐🌐       │
│                                                                            │
╰─ 🌐🌐 = 2+ chats touched this deploy · scroll: top 25 + grow ──────────────╯

╭─ 🔵 hi user — paste any id, i'll launch it ────────────────────╮
│                                                                │
│   want to open one of these deploys?                           │
│   paste the 8-char id (col 3) back at me and i'll:             │
│     1. resolve the full site name                              │
│     2. open the live URL in Chrome with cache bust             │
│     3. show its full Netlify dashboard URL too                 │
│                                                                │
│   shorthand: just type the id alone — no /command needed       │
│                                                                │
╰────────────────────────────────────────────────────────────────╯
```

---

## DATABASE

> Raw pipe-delimited data. Used by Step 3 (prepend) and Step 4 (full seed) to rebuild the CACHED RENDER block.

| # | name | id | url | created | flag |
|---|------|------|-----|---------|------|
| 1 | cat-detective-1776954590 | 400d46ad-319b-437e-9a5e-f5be9bd619a8 | https://cat-detective-1776954590.netlify.app | 2026-04-23 | 🌐🌐 |
| 2 | emma-the-star | 6d71e4c2-661a-4bca-933c-b03bb55712cb | https://emma-the-star.netlify.app | 2026-04-23 |  |
| 3 | ozzy-osbourne-family-tree | 2695fba6-7026-4d6a-b371-b7274127cd3e | https://ozzy-osbourne-family-tree.netlify.app | 2026-04-22 | 🌐🌐 |
| 4 | ozzy-legacy | da7ca248-da7b-4fd7-aba5-be5f592a8032 | https://ozzy-legacy.netlify.app | 2026-04-22 | 🌐🌐 |
| 5 | ozzy-contest | 8f447a42-07d1-45a0-9900-941d48a739ad | https://ozzy-contest.netlify.app | 2026-04-22 | 🌐🌐 |
| 6 | numerology-chad-bekah | bc172c89-8ae3-425c-8633-8e0a68d8a407 | https://numerology-chad-bekah.netlify.app | 2026-04-21 |  |
| 7 | behkah-app | 7424878e-5386-4370-8871-9addc2ed6464 | https://behkah-app.netlify.app | 2026-04-21 | 🌐🌐 |
| 8 | bekah-for-you | 94c41942-fd22-4528-9cdc-f85f9ec15b6f | https://bekah-for-you.netlify.app | 2026-04-21 | 🌐🌐 |
| 9 | avril-mean-as | 916312a9-fb6b-4429-9144-7ee5f357b014 | https://avril-mean-as.netlify.app | 2026-04-21 | 🌐🌐 |
| 10 | ozzy-final | 1231e6eb-68f1-4a80-8b3d-b4106dc8d1ca | https://ozzy-final.netlify.app | 2026-04-21 |  |
| 11 | bunnybear-warm-heart | 8846f624-9416-40f3-a568-d9d83314998c | https://bunnybear-warm-heart.netlify.app | 2026-04-21 | 🌐🌐 |
| 12 | ladymilkymoo-warm-heart | 95679c6b-386f-4219-a661-ea4c0cdd50ca | https://ladymilkymoo-warm-heart.netlify.app | 2026-04-21 |  |
| 13 | dandom-greece | e81d4ef4-1924-4c6a-96af-6024377ce0a3 | https://dandom-greece.netlify.app | 2026-04-20 | 🌐🌐 |
| 14 | dandom | 0983d0f2-8442-4e8b-b09d-1154d4cc5554 | https://dandom.netlify.app | 2026-04-20 | 🌐🌐 |
| 15 | mike-is-a-blessing | 83d2b2ab-a701-40be-abc2-52d3c5fab7dd | https://mike-is-a-blessing.netlify.app | 2026-04-20 | 🌐🌐 |
| 16 | dream-maker-koi | 2afc84f7-7813-4df5-943d-ffd2027674bf | https://dream-maker-koi.netlify.app | 2026-04-19 | 🌐🌐 |
| 17 | young-ozzy | 69b7f9ec-c03c-4b1c-89d4-9d3a374e8f12 | https://young-ozzy.netlify.app | 2026-04-19 | 🌐🌐 |
| 18 | koi-epk-dossier-621865 | 139e054f-c139-4805-80ef-60467c38aa6c | https://koi-epk-dossier-621865.netlify.app | 2026-04-19 | 🌐🌐 |
| 19 | little-koi-link-tree-1776618139 | 6cf1de40-f937-45d5-b623-5c5344f916cd | https://little-koi-link-tree-1776618139.netlify.app | 2026-04-19 | 🌐🌐 |
| 20 | samples-8-music-forms-1776604446 | eb517fc9-e70f-406f-a2a0-431933888d86 | https://samples-8-music-forms-1776604446.netlify.app | 2026-04-19 | 🌐🌐 |
| 21 | koi-where-opera-stands-04428 | 680f099a-3a02-4951-868e-6eb7e3d1c9ed | https://koi-where-opera-stands-04428.netlify.app | 2026-04-19 | 🌐🌐 |
| 22 | vespers-salon | 44a31643-bb08-44ef-82eb-f9a7427e76a5 | https://vespers-salon.netlify.app | 2026-04-19 | 🌐🌐 |
| 23 | koi-warm-heart | e0dd8fb5-30fc-450a-9c07-dc111214d772 | https://koi-warm-heart.netlify.app | 2026-04-19 | 🌐🌐 |
| 24 | for-koi-603660 | 8867513e-25c0-4d04-9578-b03fab82637c | https://for-koi-603660.netlify.app | 2026-04-19 | 🌐🌐 |
| 25 | angel1-sample-3657 | 815810ea-ed55-445c-8114-2d0634b39a31 | https://angel1-sample-3657.netlify.app | 2026-04-19 | 🌐🌐 |

---

## ID CACHE

> 8char-prefix → full UUID + name + url. Used by Step 5 (ID launch handler) for O(1) lookup. Mirrors c-yesterday's `## UUID CACHE` pattern.

```
400d46ad: 400d46ad-319b-437e-9a5e-f5be9bd619a8 | cat-detective-1776954590 | https://cat-detective-1776954590.netlify.app
6d71e4c2: 6d71e4c2-661a-4bca-933c-b03bb55712cb | emma-the-star | https://emma-the-star.netlify.app
2695fba6: 2695fba6-7026-4d6a-b371-b7274127cd3e | ozzy-osbourne-family-tree | https://ozzy-osbourne-family-tree.netlify.app
da7ca248: da7ca248-da7b-4fd7-aba5-be5f592a8032 | ozzy-legacy | https://ozzy-legacy.netlify.app
8f447a42: 8f447a42-07d1-45a0-9900-941d48a739ad | ozzy-contest | https://ozzy-contest.netlify.app
bc172c89: bc172c89-8ae3-425c-8633-8e0a68d8a407 | numerology-chad-bekah | https://numerology-chad-bekah.netlify.app
7424878e: 7424878e-5386-4370-8871-9addc2ed6464 | behkah-app | https://behkah-app.netlify.app
94c41942: 94c41942-fd22-4528-9cdc-f85f9ec15b6f | bekah-for-you | https://bekah-for-you.netlify.app
916312a9: 916312a9-fb6b-4429-9144-7ee5f357b014 | avril-mean-as | https://avril-mean-as.netlify.app
1231e6eb: 1231e6eb-68f1-4a80-8b3d-b4106dc8d1ca | ozzy-final | https://ozzy-final.netlify.app
8846f624: 8846f624-9416-40f3-a568-d9d83314998c | bunnybear-warm-heart | https://bunnybear-warm-heart.netlify.app
95679c6b: 95679c6b-386f-4219-a661-ea4c0cdd50ca | ladymilkymoo-warm-heart | https://ladymilkymoo-warm-heart.netlify.app
e81d4ef4: e81d4ef4-1924-4c6a-96af-6024377ce0a3 | dandom-greece | https://dandom-greece.netlify.app
0983d0f2: 0983d0f2-8442-4e8b-b09d-1154d4cc5554 | dandom | https://dandom.netlify.app
83d2b2ab: 83d2b2ab-a701-40be-abc2-52d3c5fab7dd | mike-is-a-blessing | https://mike-is-a-blessing.netlify.app
2afc84f7: 2afc84f7-7813-4df5-943d-ffd2027674bf | dream-maker-koi | https://dream-maker-koi.netlify.app
69b7f9ec: 69b7f9ec-c03c-4b1c-89d4-9d3a374e8f12 | young-ozzy | https://young-ozzy.netlify.app
139e054f: 139e054f-c139-4805-80ef-60467c38aa6c | koi-epk-dossier-621865 | https://koi-epk-dossier-621865.netlify.app
6cf1de40: 6cf1de40-f937-45d5-b623-5c5344f916cd | little-koi-link-tree-1776618139 | https://little-koi-link-tree-1776618139.netlify.app
eb517fc9: eb517fc9-e70f-406f-a2a0-431933888d86 | samples-8-music-forms-1776604446 | https://samples-8-music-forms-1776604446.netlify.app
680f099a: 680f099a-3a02-4951-868e-6eb7e3d1c9ed | koi-where-opera-stands-04428 | https://koi-where-opera-stands-04428.netlify.app
44a31643: 44a31643-bb08-44ef-82eb-f9a7427e76a5 | vespers-salon | https://vespers-salon.netlify.app
e0dd8fb5: e0dd8fb5-30fc-450a-9c07-dc111214d772 | koi-warm-heart | https://koi-warm-heart.netlify.app
8867513e: 8867513e-25c0-4d04-9578-b03fab82637c | for-koi-603660 | https://for-koi-603660.netlify.app
815810ea: 815810ea-ed55-445c-8114-2d0634b39a31 | angel1-sample-3657 | https://angel1-sample-3657.netlify.app
```

---

## SESSION LINKS

> Maps each deploy → list of Claude Code chat session UUIDs that worked on it. 2+ entries = 🌐🌐 marker in DATABASE + CACHED RENDER. Maintained by the cross-session detector (runs alongside Step 2 top-up). Mirrors c-yesterday's NEW JOBS QUEUE concept.

```
cat-detective-1776954590: 98062256, c735c981, cc3af8de
emma-the-star: 533f29ec
ozzy-osbourne-family-tree: a9b59f69, c8482c97, c735c981
ozzy-legacy: a9b59f69, c8482c97
ozzy-contest: 3096c636, a9b59f69, e8c72a54
numerology-chad-bekah: a30a64b2
behkah-app: a30a64b2, bf5bb63a, c735c981
bekah-for-you: 0f12c475, c735c981
avril-mean-as: 0f12c475, c735c981
ozzy-final: 0f12c475
bunnybear-warm-heart: c735c981, fa42a01d
ladymilkymoo-warm-heart: fa42a01d
dandom-greece: c735c981, fc79a166
dandom: c735c981, fc79a166
mike-is-a-blessing: 18ace9a6, fa42a01d, c735c981, fc79a166
dream-maker-koi: 3d8fcd14, 98062256, b462a497
young-ozzy: 88a77937, a9b59f69, c735c981
koi-epk-dossier-621865: 56f320aa, 88a77937
little-koi-link-tree-1776618139: 36da6d8e, 56f320aa, 691f45df, 9366e416, b444cc66, b462a497, db3355bb
samples-8-music-forms-1776604446: 07eb1cc7, 36fea76f, 68242cf7, 691f45df, 9366e416, bbae333e, db3355bb
koi-where-opera-stands-04428: 07eb1cc7, 36da6d8e, 68242cf7, 691f45df, 9366e416, 9acf3d76, b444cc66, b462a497, c735c981, db3355bb, e2df50ac
vespers-salon: 07eb1cc7, 68242cf7, bbae333e, c735c981, f2c79f1f
koi-warm-heart: 6650324b, 73791f35, b444cc66, b462a497, c735c981
for-koi-603660: 07eb1cc7, 36da6d8e, 56f320aa, 6650324b, 68242cf7, 691f45df, 9366e416, b444cc66, b462a497, bbae333e, db3355bb, e2df50ac, f2c79f1f, f8bc267d
angel1-sample-3657: 6650324b, 7b3dab29, 88a77937, b444cc66, b462a497, c735c981, ea24179d
```

---

## NOTES LOG

> Token ledger entries — one line per fire. Mirrors c-yesterday Step 9.5.

```
[2026-04-24T00:00:00Z] fired · mode: seed · +25 rows · total 25 · ~1.2k tokens · under budget
[2026-04-24T00:30:00Z] fired · mode: enrich · +25 ids · +21 cross-session flags · ~3k tokens · under budget · cache: 0/25 hit (full enrich)
```
