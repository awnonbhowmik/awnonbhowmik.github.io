'use client';

import {
  cryptographyArticles,
  cybersecurityArticles,
  epidemiologyArticles,
  environmentalArticles,
  // manuscripts,      // uncomment when ready to publish
  // dissertationEntry, // uncomment when ready to publish
  type Publication,
} from '@/app/data/publications';

// ── Helpers ──────────────────────────────────────────────────

function formatAuthors(authors: string[]): string {
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(' and ');
  return authors.slice(0, -1).join(', ') + ', and ' + authors[authors.length - 1];
}

function formatCitation(pub: Publication): string {
  const parts: string[] = [];
  if (pub.venue) parts.push(pub.venue);
  if (pub.volume) parts.push(`vol. ${pub.volume}`);
  if (pub.issue) parts.push(`no. ${pub.issue}`);
  if (pub.pages) parts.push(`pp. ${pub.pages}`);
  return parts.join(', ');
}

// ── Publication Item ──────────────────────────────────────────

function PublicationItem({ pub }: { pub: Publication }) {
  const isPlaceholder = pub.placeholder === true;

  return (
    <li className={`pb-5 border-b border-gray-700 last:border-0 last:pb-0 ${isPlaceholder ? 'opacity-60' : ''}`}>
      {isPlaceholder && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 border border-yellow-400/50 rounded px-2 py-0.5 mb-2">
          Placeholder — needs content
        </span>
      )}
      <p className="text-base leading-snug">
        <span className="text-gray-400">{formatAuthors(pub.authors)}. </span>
        {pub.url && !isPlaceholder ? (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-accent transition-colors"
          >
            &ldquo;{pub.title}.&rdquo;
          </a>
        ) : (
          <span className="text-white font-medium">&ldquo;{pub.title}.&rdquo;</span>
        )}
        {' '}
        <span className="text-gray-400 italic">{formatCitation(pub)}</span>
        {pub.year && <span className="text-gray-400">, {pub.year}</span>}
        {pub.doi && !isPlaceholder && (
          <>
            {'. '}
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm hover:underline"
            >
              DOI:{pub.doi}
            </a>
          </>
        )}
      </p>
      {pub.note && isPlaceholder && (
        <p className="text-xs text-yellow-400/70 mt-1">{pub.note}</p>
      )}
    </li>
  );
}

// ── Publication Group ─────────────────────────────────────────

function PublicationGroup({
  heading,
  pubs,
  note,
}: {
  heading: string;
  pubs: Publication[];
  note?: string;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow flex flex-col">
      <h3 className="text-lg font-semibold text-accent uppercase tracking-widest mb-1">
        {heading}
      </h3>
      {note && <p className="text-sm text-gray-400 mb-4">{note}</p>}
      <ul className="space-y-5 mt-3">
        {pubs.map((pub) => (
          <PublicationItem key={pub.id} pub={pub} />
        ))}
      </ul>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────

export default function Publications() {
  return (
    <section id="publications" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">Selected Publications</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Peer-reviewed journal articles across applied cryptography, cybersecurity, epidemiology, and environmental science.
            Full profile on{' '}
            <a
              href="https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google Scholar
            </a>{' '}
            and{' '}
            <a
              href="https://www.researchgate.net/profile/Awnon-Bhowmik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              ResearchGate
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applied Cryptography */}
          <PublicationGroup
            heading="Applied Cryptography"
            pubs={cryptographyArticles}
            note="Research on cryptosystem design, trapdoor functions, and novel encryption schemes."
          />

          {/* Cybersecurity */}
          <PublicationGroup
            heading="Cybersecurity"
            pubs={cybersecurityArticles}
          />

          {/* Epidemiology */}
          <PublicationGroup
            heading="Epidemiology & Public Health"
            pubs={epidemiologyArticles}
            note="Data-driven analyses of infectious disease trends and public health outcomes."
          />

          {/* Environmental Science */}
          <PublicationGroup
            heading="Environmental Science"
            pubs={environmentalArticles}
            note="Interdisciplinary work on microplastic transport modeling and environmental risk."
          />
        </div>

        {/* Manuscripts in Progress — uncomment when ready to publish
        <PublicationGroup
          heading="Manuscripts in Progress"
          pubs={manuscripts}
          note="Work stemming from current doctoral research. Status will be updated as submissions advance."
        />
        */}

        {/* Doctoral Dissertation — uncomment when ready to publish
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-accent uppercase tracking-widest mb-4 pb-2 border-b border-accent/20">
            Doctoral Dissertation
          </h3>
          <div className={`pb-4 ${dissertationEntry.placeholder ? 'opacity-60' : ''}`}>
            {dissertationEntry.placeholder && (
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-yellow-400 border border-yellow-400/50 rounded px-2 py-0.5 mb-2">
                Placeholder — needs content
              </span>
            )}
            <p className="text-base leading-snug">
              <span className="text-gray-400">{dissertationEntry.authors[0]}. </span>
              <span className="text-white font-medium">
                &ldquo;{dissertationEntry.title}.&rdquo;
              </span>{' '}
              <span className="text-gray-400 italic">{dissertationEntry.venue}</span>
              {dissertationEntry.year && (
                <span className="text-gray-400">
                  {' '}(expected {dissertationEntry.year})
                </span>
              )}
              {'. '}
              <span className="text-xs font-semibold uppercase tracking-widest text-accent border border-accent/40 rounded px-2 py-0.5 ml-1">
                In Progress
              </span>
            </p>
            {dissertationEntry.note && dissertationEntry.placeholder && (
              <p className="text-xs text-yellow-400/70 mt-1">{dissertationEntry.note}</p>
            )}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
