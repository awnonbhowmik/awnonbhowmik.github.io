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
  allJournalArticles,
  CITATIONS_LAST_UPDATED,
  type Publication,
} from '@/app/data/publications';

// ── Types ─────────────────────────────────────────────────────

type SortKey = 'year' | 'citations';
type CitationScope = 'all' | 'journals';

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

const SCOPE_LABELS: Record<CitationScope, string> = {
  all: 'Include preprints',
  journals: 'Journals only',
};

type Row =
  | { type: 'year'; year: number }
  | { type: 'pub'; pub: CategorizedPublication; rank: number };

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

function sortedPubs(pubs: CategorizedPublication[], key: SortKey): CategorizedPublication[] {
  return [...pubs].sort((a, b) => {
    if (key === 'citations') {
      const diff = (b.citations ?? 0) - (a.citations ?? 0);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
    const diff = (b.year ?? 0) - (a.year ?? 0);
    return diff !== 0 ? diff : (b.citations ?? 0) - (a.citations ?? 0);
  });
}

function buildRows(pubs: CategorizedPublication[], key: SortKey): Row[] {
  const sorted = sortedPubs(pubs, key);
  if (key !== 'year') {
    return sorted.map((pub, i) => ({ type: 'pub', pub, rank: i + 1 }));
  }
  const rows: Row[] = [];
  let lastYear: number | null = null;
  let rank = 0;
  for (const pub of sorted) {
    const y = pub.year ?? 0;
    if (y !== lastYear) {
      rows.push({ type: 'year', year: y });
      lastYear = y;
    }
    rank++;
    rows.push({ type: 'pub', pub, rank });
  }
  return rows;
}

function computeStats(pubs: Publication[]) {
  const cites = pubs.map(p => p.citations ?? 0).sort((a, b) => b - a);
  const total = cites.reduce((s, c) => s + c, 0);
  let h = 0;
  for (let i = 0; i < cites.length; i++) {
    if (cites[i] >= i + 1) h = i + 1;
    else break;
  }
  const i10 = cites.filter(c => c >= 10).length;
  return { total, h, i10, count: pubs.length };
}

interface YearBucket { year: number; papers: number; citations: number }
interface CatBucket { key: string; label: string; papers: number; citations: number }
interface TopCitedWork { title: string; citations: number; year?: number }
interface CollaboratorBucket { name: string; papers: number }

function computeChartData(pubs: CategorizedPublication[]) {
  const byYear: Record<number, YearBucket> = {};
  const byCat: Record<string, CatBucket> = {};
  const presentYears: number[] = [];

  for (const p of pubs) {
    const y = p.year ?? 0;
    if (y > 0) presentYears.push(y);
    if (!byYear[y]) byYear[y] = { year: y, papers: 0, citations: 0 };
    byYear[y].papers++;
    byYear[y].citations += p.citations ?? 0;

    const ck = p.categoryKey;
    if (!byCat[ck]) byCat[ck] = { key: ck, label: CATEGORIES[ck]?.label ?? ck, papers: 0, citations: 0 };
    byCat[ck].papers++;
    byCat[ck].citations += p.citations ?? 0;
  }

  let years: YearBucket[] = [];
  if (presentYears.length > 0) {
    const minYear = Math.min(...presentYears);
    const maxYear = Math.max(...presentYears);
    years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
      const year = minYear + i;
      return byYear[year] ?? { year, papers: 0, citations: 0 };
    });
  }

  const cats = Object.values(byCat).sort((a, b) => b.citations - a.citations);
  return { years, cats };
}

function computeTopCitedWorks(pubs: Publication[], limit = 6): TopCitedWork[] {
  return pubs
    .map(p => ({ title: p.title, citations: p.citations ?? 0, year: p.year }))
    .sort((a, b) => b.citations - a.citations)
    .slice(0, limit);
}

function computeTopCollaborators(pubs: Publication[], limit = 8): CollaboratorBucket[] {
  const counts: Record<string, number> = {};
  for (const p of pubs) {
    for (const author of p.authors) {
      if (!author.toLowerCase().includes('bhowmik')) {
        counts[author] = (counts[author] ?? 0) + 1;
      }
    }
  }

  return Object.entries(counts)
    .map(([name, papers]) => ({ name, papers }))
    .sort((a, b) => b.papers - a.papers)
    .slice(0, limit);
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

// ── Chart colours per category key ───────────────────────────
const CAT_HEX: Record<string, string> = {
  crypto: '#a78bfa', // purple-400
  cyber: '#f87171', // red-400
  epi: '#34d399', // emerald-400
  env: '#2dd4bf', // teal-400
  data: '#60a5fa', // blue-400
  preprint: '#facc15', // yellow-400
};

// ── Chart sub-components ──────────────────────────────────────

function CitationsByYearChart({ years }: { years: YearBucket[] }) {
  const maxCites = Math.max(...years.map(y => y.citations), 1);
  const chartHeight = 160;
  const n = years.length;
  const chartMinWidth = Math.max(320, n * 64);

  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Citations by publication year</p>

      {years.length === 0 && <p className="text-sm text-gray-300">No citation data yet.</p>}

      <div className="relative overflow-x-auto pb-1">
        <div style={{ minWidth: `${chartMinWidth}px` }}>
          <div
            className="grid items-end"
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, n)}, minmax(0, 1fr))`,
              minHeight: '192px',
            }}
          >
            {years.map(bucket => {
              const hasCitations = bucket.citations > 0;
              const height = hasCitations ? Math.round((bucket.citations / maxCites) * chartHeight) : 0;
              return (
                <div key={bucket.year} className="flex flex-col items-center justify-end h-full">
                  <span className={`text-sm font-semibold tabular-nums mb-1 ${hasCitations ? 'text-white' : 'text-gray-500'}`}>
                    {bucket.citations}
                  </span>
                  {hasCitations ? (
                    <div
                      className="w-full max-w-[52px] bg-accent/85 rounded-t-md"
                      style={{ height: `${height}px` }}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="w-full max-w-[52px] h-0" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="grid mt-2"
            style={{ gridTemplateColumns: `repeat(${Math.max(1, n)}, minmax(0, 1fr))` }}
          >
            {years.map(bucket => (
              <span key={`label-${bucket.year}`} className="text-sm text-gray-300 tabular-nums text-center">
                {bucket.year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBreakdownChart({ cats, total }: { cats: CatBucket[]; total: number }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Citations by research area</p>

      {cats.length === 0 && <p className="text-sm text-gray-300">No category data yet.</p>}

      <div className="space-y-3">
        {cats.map(cat => {
          const width = total > 0 ? Math.max(8, (cat.citations / total) * 100) : 0;
          const color = CAT_HEX[cat.key] ?? '#149ddd';
          return (
            <div key={cat.key}>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="text-sm sm:text-[15px] text-gray-200 truncate">{cat.label}</p>
                <span className="text-sm font-semibold text-white tabular-nums shrink-0">{cat.citations}</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopCitedWorksChart({ works }: { works: TopCitedWork[] }) {
  const maxCites = Math.max(...works.map(w => w.citations), 1);

  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Top cited works</p>
      <div className="space-y-3">
        {works.length === 0 && <p className="text-sm text-gray-300">No citation data yet.</p>}

        {works.map((work, idx) => {
          const width = Math.max(6, (work.citations / maxCites) * 100);
          return (
            <div key={`${work.title}-${idx}`}>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="text-sm sm:text-[15px] text-gray-200 leading-snug truncate">
                  {work.title}
                </p>
                <span className="text-sm font-semibold text-white tabular-nums shrink-0">
                  {work.citations}
                </span>
              </div>
              <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-accent/90 rounded-full" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopCollaboratorsChart({ collaborators }: { collaborators: CollaboratorBucket[] }) {
  const maxPapers = Math.max(...collaborators.map(c => c.papers), 1);

  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Top collaborators</p>
      <div className="space-y-3">
        {collaborators.length === 0 && <p className="text-sm text-gray-300">No collaborator data yet.</p>}

        {collaborators.map((person, idx) => {
          const width = Math.max(8, (person.papers / maxPapers) * 100);
          return (
            <div key={`${person.name}-${idx}`}>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="text-sm sm:text-[15px] text-gray-200 truncate">{person.name}</p>
                <span className="text-sm font-semibold text-white tabular-nums shrink-0">{person.papers}</span>
              </div>
              <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: CAT_HEX.env }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 min-w-[96px]">
      <span className="text-2xl font-bold text-accent">{value}</span>
      <span className="text-xs text-gray-400 mt-1 text-center leading-tight">{label}</span>
    </div>
  );
}

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

        {/* Year + Citations */}
        <div className="shrink-0 flex flex-col items-end gap-1 pt-0.5 min-w-[60px] sm:min-w-[66px]">
          <span className="text-[13px] sm:text-sm text-gray-300 font-mono tabular-nums">{pub.year}</span>
          {(pub.citations ?? 0) > 0 ? (
            <span className="flex items-center gap-1 text-[13px] sm:text-sm text-accent" title="Cited by">
              <svg className="w-3.5 h-3.5 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z" />
              </svg>
              <span className="font-semibold tabular-nums">{pub.citations}</span>
            </span>
          ) : (
            <span className="text-[13px] sm:text-sm text-gray-500 tabular-nums">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTable({
  title,
  pubs,
  sortKey,
}: {
  title: string;
  pubs: CategorizedPublication[];
  sortKey: SortKey;
}) {
  const rows = useMemo(() => buildRows(pubs, sortKey), [pubs, sortKey]);

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
        <span className="shrink-0 min-w-[56px] text-right">Year / Cited by</span>
      </div>

      <div className="rounded-xl border border-gray-800 overflow-hidden">
        {rows.map((row) =>
          row.type === 'year' ? (
            <div key={`year-${row.year}`} className="px-4 py-2 bg-gray-800/50 border-b border-gray-800">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{row.year}</span>
            </div>
          ) : (
            <PublicationRow key={row.pub.id} pub={row.pub} rank={row.rank} />
          )
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('citations');
  const [filterKey, setFilterKey] = useState<string>('all');
  const [citationScope, setCitationScope] = useState<CitationScope>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [urlStateReady, setUrlStateReady] = useState(false);

  const journalList = useMemo(() => buildJournalList(), []);
  const preprintList = useMemo(() => buildPreprintList(), []);
  const allWorks = useMemo(() => [...allJournalArticles, ...preprints], []);
  const allCat = useMemo(() => [...journalList, ...preprintList], [journalList, preprintList]);

  const analyticsPubs = useMemo(
    () => (citationScope === 'journals' ? allJournalArticles : allWorks),
    [citationScope, allWorks]
  );
  const analyticsCategorized = useMemo(
    () => (citationScope === 'journals' ? journalList : allCat),
    [citationScope, journalList, allCat]
  );

  const stats = useMemo(() => computeStats(analyticsPubs), [analyticsPubs]);
  const chartData = useMemo(() => computeChartData(analyticsCategorized), [analyticsCategorized]);
  const topCitedWorks = useMemo(() => computeTopCitedWorks(analyticsPubs), [analyticsPubs]);
  const topCollaborators = useMemo(() => computeTopCollaborators(analyticsPubs), [analyticsPubs]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSortKey(params.get('sort') === 'year' ? 'year' : 'citations');

    const candidateFilter = params.get('filter') ?? 'all';
    setFilterKey(candidateFilter in FILTER_LABELS ? candidateFilter : 'all');

    setCitationScope(params.get('scope') === 'journals' ? 'journals' : 'all');
    setSearchTerm(params.get('q') ?? '');
    setUrlStateReady(true);
  }, []);

  useEffect(() => {
    if (!urlStateReady) return;

    const next = new URLSearchParams();
    if (sortKey !== 'citations') next.set('sort', sortKey);
    if (filterKey !== 'all') next.set('filter', filterKey);
    if (citationScope !== 'all') next.set('scope', citationScope);
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) next.set('q', trimmedSearch);

    const query = next.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  }, [sortKey, filterKey, citationScope, searchTerm, urlStateReady]);

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
        <div className="container mx-auto px-4 max-w-5xl py-16">

          {/* Back nav */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center text-accent hover:text-white border border-accent/40 hover:border-accent px-3 py-1.5 rounded transition-colors group text-sm"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Publications</h1>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
              <div className="lg:col-span-8 xl:col-span-9">
                <p className="text-gray-400 w-full leading-relaxed text-sm sm:text-[15px] text-left">
                  Peer-reviewed journal articles and preprints spanning applied cryptography, cybersecurity,
                  epidemiology, and environmental science. Citation counts are automatically synced daily
                  from{' '}
                  <a href="https://www.semanticscholar.org/author/Awnon-Bhowmik/1914790447" target="_blank"
                    rel="noopener noreferrer" className="text-accent hover:underline">Semantic Scholar</a>,{' '}
                  <a href="https://openalex.org/authors/A5007002383" target="_blank"
                    rel="noopener noreferrer" className="text-accent hover:underline">OpenAlex</a>, and{' '}
                  <a href="https://search.crossref.org/?q=awnon+bhowmik&from_ui=yes" target="_blank"
                    rel="noopener noreferrer" className="text-accent hover:underline">Crossref</a>{' '}
                  (max of all three).{' '}
                  <a href="https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en" target="_blank"
                    rel="noopener noreferrer" className="text-accent hover:underline">Google Scholar</a>{' '}
                  and{' '}
                  <a href="https://www.researchgate.net/profile/Awnon-Bhowmik" target="_blank"
                    rel="noopener noreferrer" className="text-accent hover:underline">ResearchGate</a>{' '}
                  are checked manually and override automated counts when higher.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard value={stats.count} label="Publications" />
                  <StatCard value={stats.total} label="Total Citations" />
                  <StatCard value={stats.h} label="h-index" />
                  <StatCard value={stats.i10} label="i10-index" />
                </div>
              </div>

              {/* External profile links */}
              <div className="mt-5 lg:mt-0 lg:col-span-4 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {[
                  {
                    href: 'https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en',
                    label: 'Google Scholar',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://www.researchgate.net/profile/Awnon-Bhowmik',
                    label: 'ResearchGate',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.54 12.54 0 0 0-.198 1.284.82.82 0 0 1-.062.3.68.68 0 0 1-.14.22c-.048.047-.107.07-.177.07h-.01a.63.63 0 0 1-.226-.05.57.57 0 0 1-.186-.136 4.5 4.5 0 0 0-.7-.576 3.74 3.74 0 0 0-.852-.38 3.4 3.4 0 0 0-.95-.135c-.617 0-1.154.16-1.608.478a2.93 2.93 0 0 0-1.01 1.317 5.1 5.1 0 0 0-.332 1.888c0 .738.127 1.387.38 1.947.255.562.61.993 1.066 1.297.456.303.99.455 1.6.455.458 0 .877-.076 1.255-.228.378-.152.73-.39 1.06-.713.11-.11.22-.165.33-.165.147 0 .265.07.355.21.09.14.135.31.135.51 0 .2-.044.38-.132.54a3.5 3.5 0 0 1-.36.5 5.08 5.08 0 0 1-1.697 1.196 5.08 5.08 0 0 1-2.167.444c-.95 0-1.8-.224-2.545-.67a4.72 4.72 0 0 1-1.726-1.882 5.74 5.74 0 0 1-.622-2.712c0-1.03.218-1.943.653-2.735a4.74 4.74 0 0 1 1.818-1.86C9.32.224 10.24 0 11.296 0c.74 0 1.42.13 2.04.39.62.26 1.155.627 1.607 1.1.05.053.1.08.148.08.064 0 .118-.03.16-.09a.5.5 0 0 0 .065-.26c0-.05.005-.13.014-.24.01-.11.02-.19.033-.24.13-.616.36-1.1.69-1.45C16.383.1 16.84 0 17.415 0h2.17v24H0V0h19.586z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://orcid.org/0000-0001-5858-5417',
                    label: 'ORCID',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.016 5.016-5.344 5.016h-3.9V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.275 3.9-3.722 0-2.484-1.541-3.722-3.9-3.722h-2.297z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://www.semanticscholar.org/author/Awnon-Bhowmik/1914790447',
                    label: 'Semantic Scholar',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-30.2 365.8l-75-188.5h34.4l57.1 151.7 57.4-151.7H334l-75 188.5h-33.2z" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://search.crossref.org/?q=awnon+bhowmik&from_ui=yes',
                    label: 'Crossref',
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.5 4A1.5 1.5 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 21.5 4h-19zm1 2h16v11h-16V6zm2 2v2h3.5v5h2V10H15V8H5.5zm7.5 0v2h1v3h-1v2h4v-2h-1v-3h1V8h-4z" />
                      </svg>
                    ),
                  },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center sm:justify-start gap-2 text-sm text-gray-300 hover:text-accent border border-gray-700 hover:border-accent/60 rounded-lg px-4 py-2.5 transition-colors"
                  >
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats + Charts */}
          <div className="mb-10 space-y-6">
            {/* Visual charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <CitationsByYearChart years={chartData.years} />
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <CategoryBreakdownChart cats={chartData.cats} total={stats.total} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-5">
                <TopCitedWorksChart works={topCitedWorks} />
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-5">
                <TopCollaboratorsChart collaborators={topCollaborators} />
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Auto-synced {CITATIONS_LAST_UPDATED} via Semantic Scholar, OpenAlex &amp; Crossref · Google Scholar &amp; ResearchGate checked manually (no public API)
            </p>
          </div>

          {/* Filter + Sort controls */}
          <div className="flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center mb-8">
            {/* Search */}
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Title, author, venue, DOI..."
                className="w-full xl:max-w-[420px] bg-gray-900/70 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-accent/70"
              />
            </div>

            {/* Citation scope */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Citation scope</span>
              {(Object.keys(SCOPE_LABELS) as CitationScope[]).map(scope => (
                <button
                  key={scope}
                  onClick={() => setCitationScope(scope)}
                  className={`text-sm px-3 py-1 rounded border transition-colors ${citationScope === scope
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                    }`}
                >
                  {SCOPE_LABELS[scope]}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2">
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

            {/* Sort */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Sort</span>
              {(['citations', 'year'] as SortKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setSortKey(key)}
                  className={`text-sm px-3 py-1 rounded border transition-colors capitalize ${sortKey === key
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                    }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Tables */}
          {filterKey !== 'preprints' && filteredJournals.length > 0 && (
            <SectionTable title="Journal Articles" pubs={filteredJournals} sortKey={sortKey} />
          )}
          {filterKey !== 'preprints' && filteredJournals.length === 0 && (
            <p className="text-gray-500 text-sm mb-8">No journal articles match the current filter/search.</p>
          )}
          {(filterKey === 'all' || filterKey === 'preprints') && (
            filteredPreprints.length > 0 ? (
              <SectionTable title="Preprints" pubs={filteredPreprints} sortKey={sortKey} />
            ) : (
              <p className="text-gray-500 text-sm mb-8">No preprints match the current filter/search.</p>
            )
          )}

          {/* Footer note */}
          <div className="border-t border-gray-700/90 pt-6 text-xs text-gray-400 space-y-1">
            <p>
              Papers published in both a journal and as a preprint appear once under Journal Articles,
              with an arXiv link shown inline. Citation counts reflect the published version where applicable.
            </p>
            <p>
              To update citation counts, run the sync script or manually edit{' '}
              <code className="font-mono text-gray-500">src/app/data/publications.ts</code>.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
