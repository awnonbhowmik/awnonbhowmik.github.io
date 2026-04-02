'use client';

import { useState, useMemo } from 'react';
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

interface CategorizedPublication extends Publication {
  category: string;
  categoryKey: string;
}

// ── Category config ───────────────────────────────────────────

const CATEGORIES: Record<string, { label: string; color: string; bg: string; border: string }> = {
  crypto:   { label: 'Applied Cryptography',              color: 'text-purple-400',  bg: 'bg-purple-950/40',  border: 'border-purple-700/50'  },
  cyber:    { label: 'Cybersecurity',                      color: 'text-red-400',     bg: 'bg-red-950/40',     border: 'border-red-700/50'     },
  epi:      { label: 'Epidemiology & Public Health',       color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-700/50' },
  env:      { label: 'Environmental Science',              color: 'text-teal-400',    bg: 'bg-teal-950/40',    border: 'border-teal-700/50'    },
  data:     { label: 'Data Analytics & Applied Statistics',color: 'text-blue-400',    bg: 'bg-blue-950/40',    border: 'border-blue-700/50'    },
  preprint: { label: 'Preprint',                           color: 'text-yellow-400',  bg: 'bg-yellow-950/40',  border: 'border-yellow-700/50'  },
};

const FILTER_LABELS: Record<string, string> = {
  all:       'All',
  crypto:    'Cryptography',
  cyber:     'Cybersecurity',
  epi:       'Epidemiology',
  env:       'Environmental',
  preprints: 'Preprints',
};

type Row =
  | { type: 'year'; year: number }
  | { type: 'pub';  pub: CategorizedPublication; rank: number };

// ── Data builders ─────────────────────────────────────────────

function buildJournalList(): CategorizedPublication[] {
  return [
    ...cryptographyArticles.map(p =>   ({ ...p, category: CATEGORIES.crypto.label, categoryKey: 'crypto' })),
    ...cybersecurityArticles.map(p =>  ({ ...p, category: CATEGORIES.cyber.label,  categoryKey: 'cyber'  })),
    ...epidemiologyArticles.map(p =>   ({ ...p, category: CATEGORIES.epi.label,    categoryKey: 'epi'    })),
    ...environmentalArticles.map(p =>  ({ ...p, category: CATEGORIES.env.label,    categoryKey: 'env'    })),
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
interface CatBucket  { key: string; label: string; papers: number; citations: number }

function computeChartData(pubs: CategorizedPublication[]) {
  const byYear: Record<number, YearBucket> = {};
  const byCat:  Record<string, CatBucket>  = {};

  for (const p of pubs) {
    const y = p.year ?? 0;
    if (!byYear[y]) byYear[y] = { year: y, papers: 0, citations: 0 };
    byYear[y].papers++;
    byYear[y].citations += p.citations ?? 0;

    const ck = p.categoryKey;
    if (!byCat[ck]) byCat[ck] = { key: ck, label: CATEGORIES[ck]?.label ?? ck, papers: 0, citations: 0 };
    byCat[ck].papers++;
    byCat[ck].citations += p.citations ?? 0;
  }

  const years = Object.values(byYear).sort((a, b) => a.year - b.year);
  const cats  = Object.values(byCat).sort((a, b) => b.citations - a.citations);
  return { years, cats };
}

// ── Chart colours per category key ───────────────────────────
const CAT_HEX: Record<string, string> = {
  crypto:   '#a78bfa', // purple-400
  cyber:    '#f87171', // red-400
  epi:      '#34d399', // emerald-400
  env:      '#2dd4bf', // teal-400
  data:     '#60a5fa', // blue-400
  preprint: '#facc15', // yellow-400
};

// ── Chart sub-components ──────────────────────────────────────

function CitationsByYearChart({ years }: { years: YearBucket[] }) {
  const W = 540, H = 140, PAD = { t: 10, r: 8, b: 30, l: 36 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const maxCites = Math.max(...years.map(y => y.citations), 1);
  const barW = Math.min(36, innerW / years.length - 6);

  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Citations by publication year</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Citations by year bar chart">
        {/* Y-axis grid lines + labels */}
        {[0, 0.25, 0.5, 0.75, 1].map(frac => {
          const val = Math.round(maxCites * frac);
          const y   = PAD.t + innerH * (1 - frac);
          return (
            <g key={frac}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y}
                stroke="#374151" strokeWidth={0.5} strokeDasharray={frac === 0 ? undefined : '3 3'} />
              <text x={PAD.l - 4} y={y + 4} textAnchor="end"
                fontSize={9} fill="#6b7280">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {years.map((b, i) => {
          const x      = PAD.l + (i + 0.5) * (innerW / years.length) - barW / 2;
          const barH   = (b.citations / maxCites) * innerH;
          const y      = PAD.t + innerH - barH;
          return (
            <g key={b.year}>
              <rect x={x} y={y} width={barW} height={barH}
                fill="#149ddd" fillOpacity={0.75} rx={2} />
              {/* Year label */}
              <text x={x + barW / 2} y={H - PAD.b + 12}
                textAnchor="middle" fontSize={9} fill="#6b7280">{b.year}</text>
              {/* Value on top if bar is tall enough */}
              {barH > 16 && (
                <text x={x + barW / 2} y={y + 11}
                  textAnchor="middle" fontSize={9} fill="#e5e7eb" fontWeight="600">
                  {b.citations}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CategoryBreakdownChart({ cats, total }: { cats: CatBucket[]; total: number }) {
  const barH = 14, gap = 10;
  const H    = cats.length * (barH + gap) - gap;
  const W    = 540, labelW = 160, valW = 36, barMaxW = W - labelW - valW - 8;

  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Citations by research area</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Citations by category">
        {cats.map((c, i) => {
          const y      = i * (barH + gap);
          const filled = total > 0 ? (c.citations / total) * barMaxW : 0;
          const hex    = CAT_HEX[c.key] ?? '#149ddd';
          return (
            <g key={c.key}>
              {/* Label */}
              <text x={0} y={y + barH - 2} fontSize={10} fill="#9ca3af"
                className="truncate">{c.label}</text>
              {/* Track */}
              <rect x={labelW} y={y} width={barMaxW} height={barH}
                fill="#1f2937" rx={3} />
              {/* Fill */}
              <rect x={labelW} y={y} width={filled} height={barH}
                fill={hex} fillOpacity={0.7} rx={3} />
              {/* Citation count */}
              <text x={labelW + barMaxW + 6} y={y + barH - 2}
                fontSize={10} fill="#9ca3af" textAnchor="start">
                {c.citations}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Co-author network ─────────────────────────────────────────

interface CoauthorNode { name: string; papers: number; x: number; y: number }
interface CoauthorEdge { target: string; papers: number }

function computeCoauthorGraph(pubs: Publication[]) {
  const counts: Record<string, number> = {};
  for (const p of pubs) {
    const coauthors = p.authors.filter(a => !a.toLowerCase().includes('bhowmik'));
    for (const a of coauthors) {
      counts[a] = (counts[a] ?? 0) + 1;
    }
  }
  const coauthors = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const n = coauthors.length;
  const cx = 200, cy = 190, r = 140;
  const nodes: CoauthorNode[] = coauthors.map(([name, papers], i) => ({
    name,
    papers,
    x: cx + r * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
    y: cy + r * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
  }));
  const edges: CoauthorEdge[] = coauthors.map(([name, papers]) => ({ target: name, papers }));
  return { nodes, edges, cx, cy };
}

function CoauthorNetworkChart({ pubs }: { pubs: Publication[] }) {
  const { nodes, edges, cx, cy } = computeCoauthorGraph(pubs);
  const maxPapers = Math.max(...nodes.map(n => n.papers), 1);

  // shorten long names for display
  const displayName = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return name;
    return parts[0][0] + '. ' + parts[parts.length - 1];
  };

  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Co-author network</p>
      <svg viewBox="0 0 400 380" className="w-full" aria-label="Co-author network graph">
        {/* Edges */}
        {edges.map(edge => {
          const node = nodes.find(n => n.name === edge.target);
          if (!node) return null;
          const opacity = 0.15 + 0.55 * (edge.papers / maxPapers);
          const strokeW = 0.8 + 2.2 * (edge.papers / maxPapers);
          return (
            <line key={edge.target}
              x1={cx} y1={cy} x2={node.x} y2={node.y}
              stroke="#149ddd" strokeWidth={strokeW} strokeOpacity={opacity} />
          );
        })}

        {/* Co-author nodes */}
        {nodes.map(node => {
          const nodeR = 5 + 7 * (node.papers / maxPapers);
          // label placement: push away from center
          const dx = node.x - cx, dy = node.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const lx = node.x + (dx / dist) * (nodeR + 8);
          const ly = node.y + (dy / dist) * (nodeR + 8);
          const anchor = dx > 10 ? 'start' : dx < -10 ? 'end' : 'middle';
          const hex = CAT_HEX.crypto; // neutral accent, could vary per coauthor later
          return (
            <g key={node.name}>
              <circle cx={node.x} cy={node.y} r={nodeR}
                fill={hex} fillOpacity={0.25} stroke={hex} strokeWidth={1.2} />
              <text x={lx} y={ly} textAnchor={anchor} fontSize={9.5} fill="#9ca3af"
                dominantBaseline="middle">
                {displayName(node.name)}
              </text>
            </g>
          );
        })}

        {/* Center node — Awnon */}
        <circle cx={cx} cy={cy} r={18} fill="#149ddd" fillOpacity={0.2}
          stroke="#149ddd" strokeWidth={2} />
        <text x={cx} y={cy - 1} textAnchor="middle" fontSize={9} fill="#149ddd"
          fontWeight="700" dominantBaseline="middle">Awnon</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={8} fill="#149ddd"
          dominantBaseline="middle">Bhowmik</text>
      </svg>
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
  if (pub.issue)  parts.push(`no.\u00a0${pub.issue}`);
  if (pub.pages)  parts.push(`pp.\u00a0${pub.pages}`);
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
    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded border ${cat.color} ${cat.bg} ${cat.border}`}>
      {cat.label}
    </span>
  );
}

function PublicationRow({ pub, rank }: { pub: CategorizedPublication; rank: number }) {
  const venueLine = formatVenueLine(pub);
  const isPreprint = pub.type === 'preprint';

  return (
    <div className="border-b border-gray-800 last:border-0 py-5 px-4 hover:bg-gray-800/30 transition-colors">
      <div className="flex gap-4 items-start">
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
            className="text-accent hover:text-white font-medium leading-snug transition-colors text-[15px] block mb-1"
          >
            {pub.title}
          </a>

          {/* Authors */}
          <p className="text-sm leading-relaxed mb-0.5">
            <AuthorList authors={pub.authors} />
          </p>

          {/* Venue — truncated on mobile, full on sm+ */}
          {venueLine && (
            <p className="text-sm text-gray-500 italic mb-2 truncate sm:whitespace-normal sm:overflow-visible">{venueLine}</p>
          )}

          {/* Badges + links */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge categoryKey={pub.categoryKey} />

            {isPreprint && (
              <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded border text-yellow-400 bg-yellow-950/40 border-yellow-700/50">
                Preprint
              </span>
            )}

            {pub.doi && !isPreprint && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 hover:text-accent border border-gray-700 hover:border-accent/40 rounded px-2 py-0.5 transition-colors"
              >
                DOI
              </a>
            )}

            {pub.arxivId && (
              <a
                href={`https://arxiv.org/abs/${pub.arxivId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 hover:text-accent border border-gray-700 hover:border-accent/40 rounded px-2 py-0.5 transition-colors"
              >
                arXiv:{pub.arxivId}
              </a>
            )}

            {isPreprint && pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 hover:text-accent border border-gray-700 hover:border-accent/40 rounded px-2 py-0.5 transition-colors"
              >
                {pub.venue === 'arXiv' ? `arXiv:${pub.arxivId}` : 'View Preprint'}
              </a>
            )}
          </div>
        </div>

        {/* Year + Citations */}
        <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5 min-w-[56px]">
          <span className="text-sm text-gray-500 font-mono tabular-nums">{pub.year}</span>
          {(pub.citations ?? 0) > 0 ? (
            <span className="flex items-center gap-1 text-sm text-accent" title="Cited by">
              <svg className="w-3.5 h-3.5 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
              </svg>
              <span className="font-semibold tabular-nums">{pub.citations}</span>
            </span>
          ) : (
            <span className="text-sm text-gray-700 tabular-nums">—</span>
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
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-accent uppercase tracking-widest">{title}</h2>
        <span className="text-gray-600 text-sm">
          {pubs.length} {pubs.length === 1 ? 'work' : 'works'}
        </span>
      </div>

      {/* Column header row */}
      <div className="hidden sm:flex gap-4 px-4 pb-1 text-[11px] text-gray-600 uppercase tracking-wider border-b border-gray-800 mb-1">
        <span className="w-6 shrink-0" />
        <span className="flex-1">Title / Authors / Venue</span>
        <span className="shrink-0 min-w-[56px] text-right">Year / Cited by</span>
      </div>

      <div className="rounded-lg border border-gray-800">
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
  const [sortKey,   setSortKey]   = useState<SortKey>('citations');
  const [filterKey, setFilterKey] = useState<string>('all');

  const journalList  = useMemo(() => buildJournalList(),  []);
  const preprintList = useMemo(() => buildPreprintList(), []);
  const allWorks     = useMemo(() => [...allJournalArticles, ...preprints], []);
  const stats        = useMemo(() => computeStats(allWorks), [allWorks]);
  const allCat       = useMemo(() => [...journalList, ...preprintList], [journalList, preprintList]);
  const chartData    = useMemo(() => computeChartData(allCat), [allCat]);

  const filteredJournals  = useMemo(() =>
    filterKey === 'all' || filterKey === 'preprints'
      ? journalList
      : journalList.filter(p => p.categoryKey === filterKey),
    [journalList, filterKey]);

  const filteredPreprints = useMemo(() =>
    filterKey === 'all' || filterKey === 'preprints'
      ? preprintList
      : preprintList.filter(p => p.categoryKey === filterKey),
    [preprintList, filterKey]);

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
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm text-justify">
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

          {/* External profile links */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              {
                href: 'https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en',
                label: 'Google Scholar',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                  </svg>
                ),
              },
              {
                href: 'https://www.researchgate.net/profile/Awnon-Bhowmik',
                label: 'ResearchGate',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.54 12.54 0 0 0-.198 1.284.82.82 0 0 1-.062.3.68.68 0 0 1-.14.22c-.048.047-.107.07-.177.07h-.01a.63.63 0 0 1-.226-.05.57.57 0 0 1-.186-.136 4.5 4.5 0 0 0-.7-.576 3.74 3.74 0 0 0-.852-.38 3.4 3.4 0 0 0-.95-.135c-.617 0-1.154.16-1.608.478a2.93 2.93 0 0 0-1.01 1.317 5.1 5.1 0 0 0-.332 1.888c0 .738.127 1.387.38 1.947.255.562.61.993 1.066 1.297.456.303.99.455 1.6.455.458 0 .877-.076 1.255-.228.378-.152.73-.39 1.06-.713.11-.11.22-.165.33-.165.147 0 .265.07.355.21.09.14.135.31.135.51 0 .2-.044.38-.132.54a3.5 3.5 0 0 1-.36.5 5.08 5.08 0 0 1-1.697 1.196 5.08 5.08 0 0 1-2.167.444c-.95 0-1.8-.224-2.545-.67a4.72 4.72 0 0 1-1.726-1.882 5.74 5.74 0 0 1-.622-2.712c0-1.03.218-1.943.653-2.735a4.74 4.74 0 0 1 1.818-1.86C9.32.224 10.24 0 11.296 0c.74 0 1.42.13 2.04.39.62.26 1.155.627 1.607 1.1.05.053.1.08.148.08.064 0 .118-.03.16-.09a.5.5 0 0 0 .065-.26c0-.05.005-.13.014-.24.01-.11.02-.19.033-.24.13-.616.36-1.1.69-1.45C16.383.1 16.84 0 17.415 0h2.17v24H0V0h19.586z"/>
                  </svg>
                ),
              },
              {
                href: 'https://orcid.org/0000-0001-5858-5417',
                label: 'ORCID',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.016 5.016-5.344 5.016h-3.9V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.275 3.9-3.722 0-2.484-1.541-3.722-3.9-3.722h-2.297z"/>
                  </svg>
                ),
              },
              {
                href: 'https://www.semanticscholar.org/author/Awnon-Bhowmik/1914790447',
                label: 'Semantic Scholar',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-30.2 365.8l-75-188.5h34.4l57.1 151.7 57.4-151.7H334l-75 188.5h-33.2z"/>
                  </svg>
                ),
              },
              {
                href: 'https://search.crossref.org/?q=awnon+bhowmik&from_ui=yes',
                label: 'Crossref',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.5 4A1.5 1.5 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 21.5 4h-19zm1 2h16v11h-16V6zm2 2v2h3.5v5h2V10H15V8H5.5zm7.5 0v2h1v3h-1v2h4v-2h-1v-3h1V8h-4z"/>
                  </svg>
                ),
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-accent border border-gray-700 hover:border-accent/60 rounded-lg px-4 py-2 transition-colors"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Stats + Charts */}
        <div className="mb-10 space-y-6">
          {/* Stat cards */}
          <div className="flex flex-wrap gap-3">
            <StatCard value={stats.count}  label="Publications"    />
            <StatCard value={stats.total}  label="Total Citations" />
            <StatCard value={stats.h}      label="h-index"         />
            <StatCard value={stats.i10}    label="i10-index"       />
          </div>

          {/* Visual charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <CitationsByYearChart years={chartData.years} />
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <CategoryBreakdownChart cats={chartData.cats} total={stats.total} />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <CoauthorNetworkChart pubs={allWorks} />
          </div>

          <p className="text-xs text-gray-600">
            Auto-synced {CITATIONS_LAST_UPDATED} via Semantic Scholar, OpenAlex &amp; Crossref · Google Scholar &amp; ResearchGate checked manually (no public API)
          </p>
        </div>

        {/* Filter + Sort controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Filter</span>
            {Object.entries(FILTER_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterKey(key)}
                className={`text-sm px-3 py-1 rounded border transition-colors ${
                  filterKey === key
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-gray-700 hidden sm:block" />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Sort</span>
            {(['citations', 'year'] as SortKey[]).map(key => (
              <button
                key={key}
                onClick={() => setSortKey(key)}
                className={`text-sm px-3 py-1 rounded border transition-colors capitalize ${
                  sortKey === key
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
          <SectionTable title="Journal Articles" pubs={filteredJournals}  sortKey={sortKey} />
        )}
        {filterKey !== 'preprints' && filteredJournals.length === 0 && (
          <p className="text-gray-600 text-sm mb-8">No journal articles match this filter.</p>
        )}
        {(filterKey === 'all' || filterKey === 'preprints') && (
          <SectionTable title="Preprints" pubs={filteredPreprints} sortKey={sortKey} />
        )}

        {/* Footer note */}
        <div className="border-t border-gray-800 pt-6 text-xs text-gray-600 space-y-1">
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
