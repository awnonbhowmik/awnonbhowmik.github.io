import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import {
  cryptographyArticles,
  cybersecurityArticles,
  epidemiologyArticles,
  environmentalArticles,
  preprints,
} from '@/app/data/publications';
import { SITE_URL } from '@/lib/site';

const description =
  'Peer-reviewed articles and preprints by Awnon Bhowmik across cryptography, cybersecurity, epidemiology, environmental science, and applied mathematics.';

export const metadata: Metadata = {
  title: 'Publications | Awnon Bhowmik',
  description,
  keywords: [
    'Awnon Bhowmik publications',
    'cryptography research',
    'cybersecurity research',
    'applied mathematics publications',
    'environmental modeling',
  ],
  authors: [{ name: 'Awnon Bhowmik', url: SITE_URL }],
  alternates: { canonical: '/publications' },
  openGraph: {
    title: 'Publications | Awnon Bhowmik',
    description,
    url: '/publications',
    siteName: 'Awnon Bhowmik',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications | Awnon Bhowmik',
    description,
  },
};

const publications = [
  ...cryptographyArticles,
  ...cybersecurityArticles,
  ...epidemiologyArticles,
  ...environmentalArticles,
  ...preprints,
].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));

const publicationListStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/publications#publication-list`,
  name: 'Publications by Awnon Bhowmik',
  description,
  numberOfItems: publications.length,
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: publications.map((publication, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'ScholarlyArticle',
      '@id': publication.url ?? `${SITE_URL}/publications#${publication.id}`,
      name: publication.title,
      headline: publication.title,
      url: publication.url ?? `${SITE_URL}/publications#${publication.id}`,
      author: publication.authors.map((name) => ({
        '@type': 'Person',
        ...(name === 'Awnon Bhowmik' ? { '@id': `${SITE_URL}/#person` } : {}),
        name,
      })),
      datePublished: publication.year?.toString(),
      identifier:
        publication.doi || publication.arxivId
          ? [
              publication.doi ? `https://doi.org/${publication.doi}` : undefined,
              publication.arxivId ? `arXiv:${publication.arxivId}` : undefined,
            ].filter(Boolean)
          : undefined,
      isPartOf: publication.venue
        ? { '@type': 'Periodical', name: publication.venue }
        : undefined,
      pagination: publication.pages,
      volumeNumber: publication.volume,
      issueNumber: publication.issue,
      keywords: publication.tags,
      creativeWorkStatus: publication.type === 'preprint' ? 'Preprint' : 'Published',
    },
  })),
};

export default function PublicationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={publicationListStructuredData} />
      {children}
    </>
  );
}
