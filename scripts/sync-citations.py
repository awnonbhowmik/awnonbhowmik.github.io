#!/usr/bin/env python3
"""
sync-citations.py

Fetches citation counts for every publication from:
  1. Google Scholar  via `scholarly`  (primary — broadest coverage)
  2. Semantic Scholar, OpenAlex, Crossref  via REST APIs  (fallback / cross-check)

Uses max(GS, S2, OpenAlex, Crossref) per paper. Only updates a value if the
result is HIGHER than what is currently in the file — this preserves any
manually entered counts that APIs haven't caught up to yet.

If Google Scholar blocks the request (CAPTCHA / rate-limit), the script falls
back gracefully to the three REST APIs and logs a warning.  The existing
citation counts are never lowered.

Usage:
  pip install scholarly httpx
  python scripts/sync-citations.py
"""

import re
import sys
import time
from datetime import date
from pathlib import Path
from difflib import SequenceMatcher

try:
    import httpx
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'httpx'])
    import httpx

DATA_FILE = Path(__file__).resolve().parent.parent / 'src/app/data/publications.ts'
GS_AUTHOR_ID = 'nEdZAFkAAAAJ'
DELAY_S = 1.2   # seconds between DOI-based API calls


# ── Google Scholar ────────────────────────────────────────────────────────────

def fetch_gs_citations() -> dict[str, int]:
    """
    Returns {normalised_title: citation_count} for every publication on the
    Google Scholar profile.  Returns an empty dict (gracefully) if scholarly
    is not installed or if Scholar blocks the request.
    """
    try:
        from scholarly import scholarly as _scholarly
    except ImportError:
        print('  [GS] scholarly not installed — skipping Google Scholar.')
        print('       Run: pip install scholarly')
        return {}

    try:
        print('  [GS] Fetching author profile…')
        author = _scholarly.search_author_id(GS_AUTHOR_ID)
        author = _scholarly.fill(author, sections=['publications'])
        result: dict[str, int] = {}
        for pub in author.get('publications', []):
            title = pub.get('bib', {}).get('title', '').strip()
            cites = pub.get('num_citations', 0) or 0
            if title:
                result[title.lower()] = cites
        print(f'  [GS] Retrieved {len(result)} publications.')
        return result
    except Exception as exc:
        # MaxTriesExceededException, CaptchaError, network errors, etc.
        print(f'  [GS] ⚠  Scholar blocked or failed: {exc}')
        print('  [GS] Falling back to API sources only for this run.')
        return {}


def match_gs(title: str, gs_data: dict[str, int]) -> int:
    """
    Returns the GS citation count for the publication whose title best matches
    `title`.  Uses exact match first, then fuzzy with a 0.85 similarity
    threshold to handle minor formatting differences.
    """
    if not gs_data:
        return 0
    key = title.lower().strip()
    if key in gs_data:
        return gs_data[key]
    best_score, best_count = 0.0, 0
    for gs_title, count in gs_data.items():
        score = SequenceMatcher(None, key, gs_title).ratio()
        if score > best_score:
            best_score, best_count = score, count
    return best_count if best_score >= 0.85 else 0


# ── REST API helpers ──────────────────────────────────────────────────────────

_HEADERS = {'User-Agent': 'awnonbhowmik-site-citation-sync/2.0 (mailto:awnonbhowmik@gmail.com)'}


def fetch_semantic_scholar(doi: str, client: httpx.Client) -> int:
    try:
        r = client.get(
            f'https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}?fields=citationCount',
            headers=_HEADERS,
        )
        return r.json().get('citationCount', 0) if r.is_success else 0
    except Exception:
        return 0


def fetch_openalex(doi: str, client: httpx.Client) -> int:
    try:
        r = client.get(
            f'https://api.openalex.org/works/https://doi.org/{doi}?select=cited_by_count',
            headers=_HEADERS,
        )
        return r.json().get('cited_by_count', 0) if r.is_success else 0
    except Exception:
        return 0


def fetch_crossref(doi: str, client: httpx.Client) -> int:
    try:
        r = client.get(
            f'https://api.crossref.org/works/{doi}?mailto=awnonbhowmik@gmail.com',
            headers=_HEADERS,
        )
        msg = r.json().get('message', {}) if r.is_success else {}
        return msg.get('is-referenced-by-count', 0)
    except Exception:
        return 0


# ── Parse publications.ts ─────────────────────────────────────────────────────

def extract_publications(content: str) -> list[dict]:
    """
    Simple line-by-line state machine that extracts id, title, doi, and
    current citation count from each publication block.
    """
    pubs: list[dict] = []
    cur: dict = {}

    for line in content.splitlines():
        id_m = re.match(r"^\s+id:\s*'([^']+)'", line)
        if id_m:
            if cur.get('id') and (cur.get('doi') or cur.get('title')):
                pubs.append(cur)
            cur = {'id': id_m.group(1), 'title': '', 'doi': None, 'citations': 0}
            continue

        title_m = re.match(r"^\s+title:\s*'(.+?)',?\s*$", line)
        if title_m and cur.get('id'):
            cur['title'] = title_m.group(1)
            continue

        doi_m = re.match(r"^\s+doi:\s*'([^']+)'", line)
        if doi_m and cur.get('id'):
            doi = doi_m.group(1)
            # Skip arXiv DOIs — no citations indexed there
            if not doi.startswith('10.48550/arXiv'):
                cur['doi'] = doi
            continue

        cit_m = re.match(r'^\s+citations:\s*(\d+)', line)
        if cit_m and cur.get('id'):
            cur['citations'] = int(cit_m.group(1))
            continue

    # Flush last entry
    if cur.get('id') and (cur.get('doi') or cur.get('title')):
        pubs.append(cur)

    return pubs


def update_citations_in_file(content: str, pub_id: str, new_count: int) -> str:
    lines = content.splitlines()
    inside = False
    for i, line in enumerate(lines):
        if f"id: '{pub_id}'" in line:
            inside = True
            continue
        if inside and re.match(r"^\s+id:\s*'", line):
            break
        if inside and re.match(r'^\s+citations:\s*\d+', line):
            lines[i] = re.sub(r'citations:\s*\d+', f'citations: {new_count}', line)
            break
    return '\n'.join(lines)


def update_last_synced(content: str) -> str:
    today = date.today().isoformat()
    return re.sub(
        r"export const CITATIONS_LAST_UPDATED = '[^']*'",
        f"export const CITATIONS_LAST_UPDATED = '{today}'",
        content,
    )


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    print('Reading publications data…')
    content = DATA_FILE.read_text(encoding='utf-8')
    pubs = extract_publications(content)
    print(f'Found {len(pubs)} trackable publications.\n')

    # Fetch all GS data in one author-profile request
    gs_data = fetch_gs_citations()
    print()

    changed = 0

    with httpx.Client(timeout=20) as client:
        for i, pub in enumerate(pubs):
            pub_id   = pub['id']
            doi      = pub['doi']
            title    = pub['title']
            current  = pub['citations']

            print(f'  [{i + 1}/{len(pubs)}] {pub_id}', end=' … ')

            gs = match_gs(title, gs_data)

            s2 = oa = cr = 0
            if doi:
                s2 = fetch_semantic_scholar(doi, client)
                oa = fetch_openalex(doi, client)
                cr = fetch_crossref(doi, client)

            best = max(gs, s2, oa, cr)
            label = f'GS:{gs} S2:{s2} OA:{oa} CR:{cr} → max={best}'

            if best > current:
                print(f'{label}  ← updating from {current}')
                content = update_citations_in_file(content, pub_id, best)
                changed += 1
            elif current > best:
                print(f'{label}  (keeping manual {current})')
            else:
                print(label)

            if i < len(pubs) - 1:
                time.sleep(DELAY_S)

    content = update_last_synced(content)
    DATA_FILE.write_text(content, encoding='utf-8')
    print(f'\nDone. {changed} citation(s) updated. CITATIONS_LAST_UPDATED set to today.')


if __name__ == '__main__':
    main()
