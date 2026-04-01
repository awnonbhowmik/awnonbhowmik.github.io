#!/usr/bin/env node
/**
 * sync-citations.mjs
 *
 * Fetches citation counts for every publication that has a DOI from:
 *   - Semantic Scholar  (api.semanticscholar.org)
 *   - OpenAlex          (api.openalex.org)
 *   - Crossref          (api.crossref.org)
 *
 * Stores max(S2, OpenAlex, Crossref) per paper. Only updates a value if the
 * API result is HIGHER than what is currently in the file — this preserves
 * any manual overrides entered from Google Scholar or ResearchGate, which
 * have no public API and cannot be queried programmatically.
 *
 * Usage:
 *   node scripts/sync-citations.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '../src/app/data/publications.ts');

// Pause between batches to avoid rate-limit responses
const DELAY_MS = 1200;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Fetch helpers ─────────────────────────────────────────────

async function fetchSemanticScholar(doi) {
  try {
    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/DOI:${encodeURIComponent(doi)}?fields=citationCount`,
      { headers: { 'User-Agent': 'awnonbhowmik-site-citation-sync/1.0' } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.citationCount ?? 0;
  } catch {
    return 0;
  }
}

async function fetchOpenAlex(doi) {
  try {
    const res = await fetch(
      `https://api.openalex.org/works/https://doi.org/${encodeURIComponent(doi)}?select=cited_by_count`,
      { headers: { 'User-Agent': 'awnonbhowmik-site-citation-sync/1.0 (mailto:awnonbhowmik@gmail.com)' } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.cited_by_count ?? 0;
  } catch {
    return 0;
  }
}

async function fetchCrossref(doi) {
  try {
    const res = await fetch(
      `https://api.crossref.org/works/${encodeURIComponent(doi)}?mailto=awnonbhowmik@gmail.com`,
      { headers: { 'User-Agent': 'awnonbhowmik-site-citation-sync/1.0' } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.message?.['is-referenced-by-count'] ?? 0;
  } catch {
    return 0;
  }
}

async function fetchMaxCitations(doi) {
  const [s2, oa, cr] = await Promise.all([
    fetchSemanticScholar(doi),
    fetchOpenAlex(doi),
    fetchCrossref(doi),
  ]);
  const maxCount = Math.max(s2, oa, cr);
  return { maxCount, s2, oa, cr };
}

// ── Parse publications from the TypeScript source ─────────────

function extractPublications(content) {
  // Extract every { id: '...', ..., doi: '...', ... } block
  const publications = [];
  const lines = content.split('\n');

  let currentId = null;
  let currentDoi = null;
  let currentCitations = null;

  for (const line of lines) {
    const idMatch = line.match(/^\s+id:\s*'([^']+)'/);
    if (idMatch) {
      // Save previous entry if it had a DOI
      if (currentId && currentDoi) {
        publications.push({ id: currentId, doi: currentDoi, citations: currentCitations ?? 0 });
      }
      currentId = idMatch[1];
      currentDoi = null;
      currentCitations = null;
      continue;
    }

    const doiMatch = line.match(/^\s+doi:\s*'([^']+)'/);
    if (doiMatch && currentId) {
      // Skip arXiv DOIs (10.48550/arXiv.*) — no citations indexed there
      const doi = doiMatch[1];
      if (!doi.startsWith('10.48550/arXiv')) {
        currentDoi = doi;
      }
      continue;
    }

    const citMatch = line.match(/^\s+citations:\s*(\d+)/);
    if (citMatch && currentId) {
      currentCitations = parseInt(citMatch[1], 10);
      continue;
    }
  }

  // Flush last entry
  if (currentId && currentDoi) {
    publications.push({ id: currentId, doi: currentDoi, citations: currentCitations ?? 0 });
  }

  return publications;
}

// ── Update citations in the file ──────────────────────────────

function updateCitationsInFile(content, id, newCount) {
  const lines = content.split('\n');
  let insideBlock = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`id: '${id}'`)) {
      insideBlock = true;
      continue;
    }

    // Stop scanning if we hit a new block's id field
    if (insideBlock && lines[i].match(/^\s+id:\s*'/)) {
      break;
    }

    if (insideBlock && lines[i].match(/^\s+citations:\s*\d+/)) {
      lines[i] = lines[i].replace(/citations:\s*\d+/, `citations: ${newCount}`);
      break;
    }
  }

  return lines.join('\n');
}

function updateLastSynced(content) {
  const today = new Date().toISOString().split('T')[0];
  return content.replace(
    /export const CITATIONS_LAST_UPDATED = '[^']*'/,
    `export const CITATIONS_LAST_UPDATED = '${today}'`
  );
}

// ── Main ──────────────────────────────────────────────────────

async function main() {
  console.log('Reading publications data…');
  let content = readFileSync(DATA_FILE, 'utf8');

  const publications = extractPublications(content);
  console.log(`Found ${publications.length} publications with trackable DOIs.\n`);

  let totalChanged = 0;

  for (let i = 0; i < publications.length; i++) {
    const { id, doi, citations: current } = publications[i];
    process.stdout.write(`  [${i + 1}/${publications.length}] ${id} … `);

    const { maxCount, s2, oa, cr } = await fetchMaxCitations(doi);

    const shouldUpdate = maxCount > current;
    console.log(
      `${maxCount} citations (S2:${s2} OA:${oa} CR:${cr})` +
      (shouldUpdate ? `  ← updating from ${current}` : current > maxCount ? `  (keeping manual ${current})` : '')
    );

    if (shouldUpdate) {
      content = updateCitationsInFile(content, id, maxCount);
      totalChanged++;
    }

    // Polite delay to avoid hammering APIs
    if (i < publications.length - 1) await sleep(DELAY_MS);
  }

  content = updateLastSynced(content);
  writeFileSync(DATA_FILE, content, 'utf8');

  console.log(`\nDone. ${totalChanged} citation(s) updated. CITATIONS_LAST_UPDATED set to today.`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
