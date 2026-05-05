#!/usr/bin/env node
/**
 * VR Speed Dating — Match Script
 * Cafe Vismo · weekly event match resolver
 *
 * Reads Tally reveal-form responses (JSON or CSV-via-fetch),
 * pivots to {patron_id: [partner_choices]}, finds mutual yes/yes
 * and yes/friend pairs, and writes a DM-ready payload plus
 * aggregate stats for the public #mutual-matches post.
 *
 * USAGE:
 *   node match-script.js <reveal.json> [--out <dm-payload.json>]
 *   node match-script.js --tally <formId> --token <apiToken>
 *
 * REVEAL JSON SHAPE (per-row, one row per partner-rating):
 *   {
 *     "patron_id":   "alice#1234",
 *     "partner_id":  "bob#5678",
 *     "rotation":    1,
 *     "choice":      "yes" | "friend" | "no"
 *   }
 *
 * OUTPUTS:
 *   1. dm-payload.json  — array of {patron_id, matched_with: [{handle, type}]}
 *   2. stdout JSON      — aggregate stats {total_attendees, total_rotations, mutual_count}
 *   3. console summary  — "MATCHES: N · MUTUALS: N"
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------- CLI parsing ----------

function parseArgs(argv) {
  const args = { input: null, out: null, tallyFormId: null, tallyToken: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = argv[++i];
    else if (a === '--tally') args.tallyFormId = argv[++i];
    else if (a === '--token') args.tallyToken = argv[++i];
    else if (!args.input && !a.startsWith('--')) args.input = a;
  }
  return args;
}

// ---------- Loaders ----------

function loadFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  // Tally may wrap responses in {data: {responses: [...]}}; accept both.
  if (Array.isArray(parsed)) return parsed;
  if (parsed && Array.isArray(parsed.responses)) return parsed.responses;
  if (parsed && parsed.data && Array.isArray(parsed.data.responses)) return parsed.data.responses;
  throw new Error(`Unrecognized response shape in ${filePath}`);
}

async function loadFromTally(formId, token) {
  // Tally REST: GET https://api.tally.so/forms/{formId}/submissions
  const url = `https://api.tally.so/forms/${formId}/submissions`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Tally API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  // Submissions arrive with field-id keys; flatten to our row shape.
  const submissions = Array.isArray(json.submissions) ? json.submissions : [];
  const rows = [];
  for (const sub of submissions) {
    const fieldsByLabel = {};
    for (const f of sub.responses || []) {
      fieldsByLabel[(f.label || f.key || '').toLowerCase()] = f.value;
    }
    const patron = fieldsByLabel['patron_id'] || fieldsByLabel['your handle'] || fieldsByLabel['discord handle'];
    if (!patron) continue;
    // Reveal form repeats partner_id / choice / rotation per row inside one submission.
    const partners = fieldsByLabel['partners'] || fieldsByLabel['ratings'];
    if (Array.isArray(partners)) {
      for (const p of partners) {
        rows.push({
          patron_id: String(patron).trim(),
          partner_id: String(p.partner_id || p.handle || '').trim(),
          rotation: Number(p.rotation || 0),
          choice: String(p.choice || 'no').toLowerCase(),
        });
      }
    } else {
      rows.push({
        patron_id: String(patron).trim(),
        partner_id: String(fieldsByLabel['partner_id'] || '').trim(),
        rotation: Number(fieldsByLabel['rotation'] || 0),
        choice: String(fieldsByLabel['choice'] || 'no').toLowerCase(),
      });
    }
  }
  return rows;
}

// ---------- Core logic ----------

function normalizeRow(row) {
  return {
    patron_id: String(row.patron_id || '').trim(),
    partner_id: String(row.partner_id || '').trim(),
    rotation: Number(row.rotation || 0),
    choice: String(row.choice || 'no').toLowerCase(),
  };
}

function pivotByPatron(rows) {
  // Returns {patron_id: [{partner_id, rotation, choice}]}
  const map = {};
  for (const raw of rows) {
    const r = normalizeRow(raw);
    if (!r.patron_id || !r.partner_id) continue;
    if (!['yes', 'friend', 'no'].includes(r.choice)) continue;
    if (!map[r.patron_id]) map[r.patron_id] = [];
    map[r.patron_id].push({
      partner_id: r.partner_id,
      rotation: r.rotation,
      choice: r.choice,
    });
  }
  return map;
}

function findMutuals(pivot) {
  // Mutual rules:
  //   yes/yes       → 'romantic'
  //   yes/friend    → 'friend'
  //   friend/friend → 'friend'
  //   anything else → no match (no/no, no/yes, no/friend all drop)
  const matches = {}; // patron_id -> [{handle, type}]
  const seenPair = new Set();

  for (const a of Object.keys(pivot)) {
    for (const aChoice of pivot[a]) {
      const b = aChoice.partner_id;
      if (!pivot[b]) continue;

      const pairKey = [a, b].sort().join('||');
      if (seenPair.has(pairKey)) continue;

      const bChoice = pivot[b].find(c => c.partner_id === a);
      if (!bChoice) continue;

      const ac = aChoice.choice;
      const bc = bChoice.choice;
      let type = null;
      if (ac === 'yes' && bc === 'yes') type = 'romantic';
      else if ((ac === 'yes' && bc === 'friend') || (ac === 'friend' && bc === 'yes')) type = 'friend';
      else if (ac === 'friend' && bc === 'friend') type = 'friend';
      if (!type) continue;

      if (!matches[a]) matches[a] = [];
      if (!matches[b]) matches[b] = [];
      matches[a].push({ handle: b, type });
      matches[b].push({ handle: a, type });
      seenPair.add(pairKey);
    }
  }
  return matches;
}

function buildPayload(matches) {
  return Object.keys(matches)
    .sort()
    .map(patron_id => ({ patron_id, matched_with: matches[patron_id] }));
}

function buildStats(rows, payload) {
  const attendees = new Set();
  const rotations = new Set();
  for (const raw of rows) {
    const r = normalizeRow(raw);
    if (r.patron_id) attendees.add(r.patron_id);
    if (r.partner_id) attendees.add(r.partner_id);
    if (r.rotation) rotations.add(r.rotation);
  }
  // Each mutual pair appears twice in payload (once per side); divide by 2.
  let mutualPairs = 0;
  for (const entry of payload) mutualPairs += entry.matched_with.length;
  mutualPairs = Math.floor(mutualPairs / 2);
  return {
    total_attendees: attendees.size,
    total_rotations: rotations.size,
    mutual_count: mutualPairs,
  };
}

// ---------- Main ----------

async function main() {
  const args = parseArgs(process.argv);
  let rows;
  if (args.tallyFormId && args.tallyToken) {
    rows = await loadFromTally(args.tallyFormId, args.tallyToken);
  } else if (args.input) {
    rows = loadFromFile(args.input);
  } else {
    console.error('Usage: node match-script.js <reveal.json> [--out <out.json>]');
    console.error('   or: node match-script.js --tally <formId> --token <apiToken>');
    process.exit(2);
  }

  const pivot = pivotByPatron(rows);
  const matches = findMutuals(pivot);
  const payload = buildPayload(matches);
  const stats = buildStats(rows, payload);

  const outPath = args.out
    || (args.input ? path.join(path.dirname(args.input), 'dm-payload.json') : 'dm-payload.json');
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');

  const totalDms = payload.length;
  console.log(`MATCHES: ${totalDms} · MUTUALS: ${stats.mutual_count}`);
  console.log(JSON.stringify(stats, null, 2));
  console.log(`payload → ${outPath}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('FATAL:', err.message);
    process.exit(1);
  });
}

module.exports = {
  pivotByPatron,
  findMutuals,
  buildPayload,
  buildStats,
  normalizeRow,
};
