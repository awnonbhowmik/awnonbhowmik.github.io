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

function sortPubs(pubs: CategorizedPublication[], key: SortKey): CategorizedPublication[] {
  return [...pubs].sort((a, b) => {
    if (key === 'citations') {
      const diff = (b.citations ?? 0) - (a.citations ?? 0);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
    const diff = (b.year ?? 0) - (a.year ?? 0);
    return diff !== 0 ? diff : (b.citations ?? 0) - (a.citations ?? 0);
  });
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

          {/* Venue */}
          {venueLine && (
            <p className="text-sm text-gray-500 italic mb-2">{venueLine}</p>
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
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
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
  const sorted = useMemo(() => sortPubs(pubs, sortKey), [pubs, sortKey]);

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
        {sorted.map((pub, i) => (
          <PublicationRow key={pub.id} pub={pub} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('citations');

  const journalList  = useMemo(() => buildJournalList(),  []);
  const preprintList = useMemo(() => buildPreprintList(), []);
  const allWorks     = useMemo(() => [...allJournalArticles, ...preprints], []);
  const stats        = useMemo(() => computeStats(allWorks), [allWorks]);

  return (
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
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
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

        {/* Stats */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-2">
            <StatCard value={stats.count}  label="Publications"     />
            <StatCard value={stats.total}  label="Total Citations"  />
            <StatCard value={stats.h}      label="h-index"          />
            <StatCard value={stats.i10}    label="i10-index"        />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Auto-synced {CITATIONS_LAST_UPDATED} via Semantic Scholar, OpenAlex &amp; Crossref · Google Scholar &amp; ResearchGate checked manually (no public API)
          </p>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">Sort by</span>
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

        {/* Tables */}
        <SectionTable title="Journal Articles" pubs={journalList}  sortKey={sortKey} />
        <SectionTable title="Preprints"         pubs={preprintList} sortKey={sortKey} />

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
  );
}
