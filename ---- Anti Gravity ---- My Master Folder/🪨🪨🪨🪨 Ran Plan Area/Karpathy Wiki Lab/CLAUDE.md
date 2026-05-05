# Karpathy Wiki Lab — Schema & Rules

This file is the **rulebook** that tells Claude how to turn raw sources into an organized, cross-linked markdown wiki. Based on Andrej Karpathy's "LLM Wiki" pattern (April 2026) and extended with a **Pinecone vector database** for deep semantic retrieval.

---

## Purpose

Turn the messy pile of files in `sources/` into a curated wiki in `wiki/`. The wiki should **compound** over time — each new source gets merged into the existing structure, not just appended.

---

## The Three-Layer Architecture

1. **`sources/`** — raw material: transcripts, PDFs, articles, notes
2. **`wiki/`** — compiled markdown articles (what you read)
3. **Pinecone** — vector index for semantic search across BOTH raw sources AND wiki articles

---

## Wiki Article Rules

- One article = one topic or entity
- File name = `kebab-case-topic.md`
- Frontmatter required:

```yaml
---
title: Topic Name
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [source1.txt, source2.pdf]
tags: [tag1, tag2]
---
```

- Body structure:
  - `## Summary` — 2-3 sentences
  - `## Key points` — bulleted
  - `## Details` — free-form, the meat
  - `## Links` — wiki-style `[[other-article]]` references
  - `## Sources` — list of source files this article draws from

---

## Processing Rules

When a new source arrives, Claude should:

1. **Read** the source end-to-end
2. **Identify** topics and entities
3. **For each topic**: check if an article already exists in `wiki/`
   - If yes → merge new info, bump `updated:` date, append to `sources:`
   - If no  → create a new article
4. **Cross-link** related articles with `[[like-this]]` syntax
5. **Update** any article that gains new relationships

---

## Chunking & Pinecone

- Long sources (>2000 words) get chunked by section
- Each chunk is embedded and stored in Pinecone (dimensions: 1536, metric: cosine)
- The wiki article is the **human-readable** layer
- Pinecone is the **deep recall** layer for semantic queries
- Free tier: 1 Starter index, ~100K vectors — plenty for personal niches

---

## The Niche

This lab is scoped to **ONE niche at a time**. Define it in `sources/NICHE.md` so Claude knows what to focus on and what to ignore.

---

## What NOT To Do

- ❌ Don't delete existing articles without flagging in the log
- ❌ Don't dump raw source text into wiki articles — compile, don't copy
- ❌ Don't create articles shorter than the summary rule
- ❌ Don't break cross-links when renaming

---

## Inspired by

- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (April 2026)
- [coleam00/claude-memory-compiler](https://github.com/coleam00/claude-memory-compiler)
