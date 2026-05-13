'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import {
  cryptographyArticles,
  cybersecurityArticles,
  epidemiologyArticles,
  environmentalArticles,
  preprints,
  type Publication,
} from '@/app/data/publications';

// ── Types ─────────────────────────────────────────────────────


interface CategorizedPublication extends Publication {
  category: string;
  categoryKey: string;
}

// ── Category config ───────────────────────────────────────────

const CATEGORIES: Record<string, { label: string; color: string; bg: string; border: string }> = {
  crypto: { label: 'Applied Cryptography', color: 'text-purple-400', bg: 'bg-purple-950/40', border: 'border-purple-700/50' },
  cyber: { label: 'Cybersecurity', color: 'text-red-400', bg: 'bg-red-950/40', border: 'border-red-700/50' },
  epi: { label: 'Epidemiology & Public Health', color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-700/50' },
  env: { label: 'Environmental Science', color: 'text-teal-400', bg: 'bg-teal-950/40', border: 'border-teal-700/50' },
  data: { label: 'Data Analytics & Applied Statistics', color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-700/50' },
  preprint: { label: 'Preprint', color: 'text-yellow-400', bg: 'bg-yellow-950/40', border: 'border-yellow-700/50' },
};

const FILTER_LABELS: Record<string, string> = {
  all: 'All',
  crypto: 'Cryptography',
  cyber: 'Cybersecurity',
  epi: 'Epidemiology',
  env: 'Environmental',
  preprints: 'Preprints',
};


// ── Data builders ─────────────────────────────────────────────

function buildJournalList(): CategorizedPublication[] {
  return [
    ...cryptographyArticles.map(p => ({ ...p, category: CATEGORIES.crypto.label, categoryKey: 'crypto' })),
    ...cybersecurityArticles.map(p => ({ ...p, category: CATEGORIES.cyber.label, categoryKey: 'cyber' })),
    ...epidemiologyArticles.map(p => ({ ...p, category: CATEGORIES.epi.label, categoryKey: 'epi' })),
    ...environmentalArticles.map(p => ({ ...p, category: CATEGORIES.env.label, categoryKey: 'env' })),
  ];
}

function buildPreprintList(): CategorizedPublication[] {
  return preprints.map(p => {
    const tags = p.tags ?? [];
    let categoryKey = 'preprint';
    if (tags.some(t => ['cryptograph', 'cipher', 'elliptic', 'chaotic'].some(k => t.includes(k)))) {
      categoryKey = 'crypto';
    } else if (tags.some(t => ['epidemiol', 'mortality', 'health'].some(k => t.includes(k)))) {
      categoryKey = 'epi';
    }
    return { ...p, category: CATEGORIES[categoryKey]?.label ?? 'Preprint', categoryKey };
  });
}




function matchesSearch(pub: Publication, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    pub.title,
    pub.venue ?? '',
    pub.authors.join(' '),
    pub.doi ?? '',
    pub.arxivId ?? '',
    String(pub.year ?? ''),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

// ── Formatting helpers ────────────────────────────────────────

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((name, i) => (
        <span key={i}>
          {i > 0 && <span className="text-gray-600">, </span>}
          <span className={name.toLowerCase().includes('bhowmik') ? 'text-white font-semibold' : 'text-gray-400'}>
            {name}
          </span>
        </span>
      ))}
    </>
  );
}

function formatVenueLine(pub: Publication): string {
  const parts: string[] = [];
  if (pub.venue) parts.push(pub.venue);
  if (pub.volume) parts.push(`vol.\u00a0${pub.volume}`);
  if (pub.issue) parts.push(`no.\u00a0${pub.issue}`);
  if (pub.pages) parts.push(`pp.\u00a0${pub.pages}`);
  return parts.join(', ');
}

// ── Sub-components ────────────────────────────────────────────


function CategoryBadge({ categoryKey }: { categoryKey: string }) {
  const cat = CATEGORIES[categoryKey];
  if (!cat) return null;
  return (
    <span className={`inline-flex h-6 items-center text-[11px] font-medium px-2.5 rounded border whitespace-nowrap ${cat.color} ${cat.bg} ${cat.border}`}>
      {cat.label}
    </span>
  );
}

function PublicationRow({ pub, rank }: { pub: CategorizedPublication; rank: number }) {
  const venueLine = formatVenueLine(pub);
  const isPreprint = pub.type === 'preprint';
  const rowTone = rank % 2 === 0 ? 'sm:bg-gray-900/35' : 'sm:bg-gray-900/15';
  const metaLinkClass = 'inline-flex h-6 items-center whitespace-nowrap text-[11px] text-gray-300 hover:text-accent border border-gray-600 hover:border-accent/40 rounded px-2.5 transition-colors';

  return (
    <div className={`border-b border-gray-800 last:border-0 py-4 sm:py-5 px-4 sm:px-5 ${rowTone} hover:bg-gray-800/60 transition-colors`}>
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Rank */}
        <span className="hidden sm:block text-gray-700 text-sm font-mono pt-0.5 w-6 shrink-0 text-right select-none">
          {rank}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-white font-medium leading-snug transition-colors text-[15px] sm:text-[17px] block mb-1"
          >
            {pub.title}
          </a>

          {/* Authors */}
          <p className="text-[13px] sm:text-sm leading-relaxed mb-0.5">
            <AuthorList authors={pub.authors} />
          </p>

          {/* Venue — truncated on mobile, full on sm+ */}
          {venueLine && (
            <p className="text-[13px] sm:text-sm text-gray-400 italic mb-1.5 leading-relaxed">{venueLine}</p>
          )}

          {/* Badges + links */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <CategoryBadge categoryKey={pub.categoryKey} />

            {isPreprint && (
              <span className="inline-flex h-6 items-center text-[11px] font-medium px-2.5 rounded border whitespace-nowrap text-yellow-400 bg-yellow-950/40 border-yellow-700/50">
                Preprint
              </span>
            )}

            {pub.doi && !isPreprint && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className={metaLinkClass}
              >
                DOI
              </a>
            )}

            {pub.arxivId && (
              <a
                href={`https://arxiv.org/abs/${pub.arxivId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={metaLinkClass}
              >
                arXiv:{pub.arxivId}
              </a>
            )}

            {isPreprint && pub.url && !pub.arxivId && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className={metaLinkClass}
              >
                View Preprint
              </a>
            )}
          </div>
        </div>

        {/* Year */}
        <div className="shrink-0 flex flex-col items-end gap-1 pt-0.5 min-w-[48px]">
          <span className="text-[13px] sm:text-sm text-gray-300 font-mono tabular-nums">{pub.year}</span>
        </div>
      </div>
    </div>
  );
}

function SectionTable({
  title,
  pubs,
}: {
  title: string;
  pubs: CategorizedPublication[];
}) {
  const sorted = useMemo(() => [...pubs].sort((a, b) => {
    const diff = (b.year ?? 0) - (a.year ?? 0);
    return diff !== 0 ? diff : a.title.localeCompare(b.title);
  }), [pubs]);

  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-gray-700/80">
        <h2 className="text-lg font-semibold text-accent uppercase tracking-widest">{title}</h2>
        <span className="text-gray-500 text-sm">
          {pubs.length} {pubs.length === 1 ? 'work' : 'works'}
        </span>
      </div>

      {/* Column header row */}
      <div className="hidden sm:flex gap-4 px-4 pb-1 text-[11px] text-gray-600 uppercase tracking-wider border-b border-gray-800 mb-1">
        <span className="w-6 shrink-0" />
        <span className="flex-1">Title / Authors / Venue</span>
        <span className="shrink-0 min-w-[48px] text-right">Year</span>
      </div>

      <div className="rounded-xl border border-gray-800 overflow-hidden">
        {sorted.map((pub, i) => (
          <PublicationRow key={pub.id} pub={pub} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [filterKey, setFilterKey] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get('filter') ?? 'all';
    return candidate in FILTER_LABELS ? candidate : 'all';
  });
  const [searchTerm, setSearchTerm] = useState<string>(
    () => typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q') ?? ''
  );

  const journalList = useMemo(() => buildJournalList(), []);
  const preprintList = useMemo(() => buildPreprintList(), []);

  useEffect(() => {
    const next = new URLSearchParams();
    if (filterKey !== 'all') next.set('filter', filterKey);
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) next.set('q', trimmedSearch);

    const query = next.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  }, [filterKey, searchTerm]);

  const filteredJournals = useMemo(() =>
    filterKey === 'all' || filterKey === 'preprints'
      ? journalList.filter(p => matchesSearch(p, searchTerm))
      : journalList.filter(p => p.categoryKey === filterKey && matchesSearch(p, searchTerm)),
    [journalList, filterKey, searchTerm]);

  const filteredPreprints = useMemo(() =>
    filterKey === 'all' || filterKey === 'preprints'
      ? preprintList.filter(p => matchesSearch(p, searchTerm))
      : preprintList.filter(p => p.categoryKey === filterKey && matchesSearch(p, searchTerm)),
    [preprintList, filterKey, searchTerm]);

  return (
    <>
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 max-w-6xl py-16">

          {/* Back nav */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-accent hover:text-white border border-accent/60 hover:border-accent px-3 py-1.5 rounded-full transition-colors group text-sm"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Page header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs uppercase tracking-[0.22em] mb-5">
              Research Output
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">Publications</h1>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-[15px] max-w-3xl mx-auto">
              Peer-reviewed journal articles and preprints spanning applied cryptography, cybersecurity,
              epidemiology, and environmental science.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-accent">{journalList.length + preprintList.length}</h3>
              <p className="text-gray-400">Total Works</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-accent">{journalList.length}</h3>
              <p className="text-gray-400">Journal Articles</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-accent">{preprintList.length}</h3>
              <p className="text-gray-400">Preprints</p>
            </div>
          </div>

          {/* Filter controls */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8 bg-gray-800/35 border border-gray-700 rounded-xl p-4">
            {/* Search */}
            <div className="flex flex-col gap-1.5 min-w-0 md:flex-1 md:max-w-[420px]">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Title, author, venue, DOI..."
                className="w-full bg-gray-900/70 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-accent/70"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Filter</span>
              {Object.entries(FILTER_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilterKey(key)}
                  className={`text-sm px-3 py-1 rounded border transition-colors ${filterKey === key
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tables */}
          {filterKey !== 'preprints' && filteredJournals.length > 0 && (
            <SectionTable title="Journal Articles" pubs={filteredJournals} />
          )}
          {filterKey !== 'preprints' && filteredJournals.length === 0 && (
            <p className="text-gray-500 text-sm mb-8">No journal articles match the current filter/search.</p>
          )}
          {(filterKey === 'all' || filterKey === 'preprints') && (
            filteredPreprints.length > 0 ? (
              <SectionTable title="Preprints" pubs={filteredPreprints} />
            ) : (
              <p className="text-gray-500 text-sm mb-8">No preprints match the current filter/search.</p>
            )
          )}

          {/* Footer note */}
          <div className="border-t border-gray-700/90 pt-6 text-xs text-gray-400">
            <p>
              Papers published in both a journal and as a preprint appear once under Journal Articles,
              with an arXiv link shown inline.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
