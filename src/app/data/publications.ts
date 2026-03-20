// ============================================================
// PUBLICATIONS DATA  —  awnonbhowmik.github.io
// ============================================================
// To add a new entry: copy an existing entry, change the id,
// and update all fields. Set placeholder: true if the entry
// still needs information filled in, and add a note explaining
// what is missing.
// ============================================================

export type PublicationType = 'journal' | 'conference' | 'manuscript' | 'dissertation';
export type PublicationStatus = 'published' | 'in-press' | 'under-review' | 'in-progress';

export interface Publication {
  id: string;
  type: PublicationType;
  title: string;
  authors: string[];
  venue?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year?: number;
  doi?: string;
  url?: string;
  status: PublicationStatus;
  tags?: string[];
  note?: string;
  placeholder?: boolean;
}

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Applied Cryptography
// ──────────────────────────────────────────────────────────────
export const cryptographyArticles: Publication[] = [
  {
    id: 'peerj-adaptive-2021',
    type: 'journal',
    title: 'An adaptive cryptosystem on a Finite Field',
    authors: ['Awnon Bhowmik', 'Unnikrishnan Menon'],
    venue: 'PeerJ Computer Science',
    year: 2021,
    doi: '10.7717/peerj-cs.637',
    url: 'https://doi.org/10.7717/peerj-cs.637',
    status: 'published',
    tags: ['cryptography', 'finite fields', 'Galois field', 'trapdoor functions'],
  },
  {
    id: 'ijca-ntru-2020',
    type: 'journal',
    title: 'Enhancing the NTRU Cryptosystem',
    authors: ['Awnon Bhowmik', 'Unnikrishnan Menon'],
    venue: 'International Journal of Computer Applications',
    volume: '176',
    issue: '29',
    pages: '46–53',
    year: 2020,
    doi: '10.5120/ijca2020920320',
    url: 'https://doi.org/10.5120/ijca2020920320',
    status: 'published',
    tags: ['cryptography', 'NTRU', 'lattice-based cryptography', 'post-quantum'],
  },
  {
    id: 'ijca-dragon-2020',
    type: 'journal',
    title: 'Dragon Crypto — An Innovative Cryptosystem',
    authors: ['Awnon Bhowmik', 'Unnikrishnan Menon'],
    venue: 'International Journal of Computer Applications',
    volume: '176',
    issue: '29',
    pages: '37–41',
    year: 2020,
    doi: '10.5120/ijca2020920331',
    url: 'https://doi.org/10.5120/ijca2020920331',
    status: 'published',
    tags: ['cryptography', 'fractal geometry', 'dragon curve', 'trapdoor functions'],
  },
  {
    id: 'ijca-mes-2020',
    type: 'journal',
    title: 'MES — Modern Encryption Standard',
    authors: ['Awnon Bhowmik'],
    venue: 'International Journal of Computer Applications',
    volume: '176',
    issue: '36',
    pages: '21–27',
    year: 2020,
    doi: '10.5120/ijca2020920479',
    url: 'https://doi.org/10.5120/ijca2020920479',
    status: 'published',
    tags: ['cryptography', 'block cipher', 'number theory', 'AES alternative'],
  },
  {
    id: 'ijmsc-coordinate-2020',
    type: 'journal',
    title: 'An encoding schematic based on coordinate transformations',
    authors: ['Awnon Bhowmik'],
    venue: 'International Journal of Mathematical Sciences and Computing',
    volume: '6',
    issue: '6',
    year: 2020,
    doi: '10.5815/ijmsc.2020.06.02',
    url: 'https://doi.org/10.5815/ijmsc.2020.06.02',
    status: 'published',
    tags: ['cryptography', 'coordinate transformations', 'encoding'],
  },
  {
    id: 'ijmsc-improved-coord-2023',
    type: 'journal',
    title: 'An Improved Security Schematic based on Coordinate Transformation',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan'],
    venue: 'International Journal of Mathematical Sciences and Computing',
    volume: '9',
    issue: '2',
    year: 2023,
    doi: '10.5815/ijmsc.2023.02.01',
    url: 'https://doi.org/10.5815/ijmsc.2023.02.01',
    status: 'published',
    tags: ['cryptography', 'coordinate transformation', 'key generation'],
  },
  {
    id: 'ijmsc-trapdoor-2024',
    type: 'journal',
    title: 'An Unorthodox Trapdoor Function',
    authors: ['Awnon Bhowmik'],
    venue: 'International Journal of Mathematical Sciences and Computing',
    volume: '10',
    issue: '1',
    year: 2024,
    doi: '10.5815/ijmsc.2024.01.04',
    url: 'https://doi.org/10.5815/ijmsc.2024.01.04',
    status: 'published',
    tags: ['cryptography', 'trapdoor functions', 'one-way functions'],
  },
];

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Cybersecurity & Security Engineering
// ──────────────────────────────────────────────────────────────
export const cybersecurityArticles: Publication[] = [
  {
    id: 'ijmsc-fintech-2024',
    type: 'journal',
    title: 'Raising Digital Security Awareness in the FinTech Sector: Case Studies and Defense Mechanisms',
    authors: ['Awnon Bhowmik'],
    venue: 'International Journal of Mathematical Sciences and Computing',
    volume: '10',
    issue: '3',
    year: 2024,
    doi: '10.5815/ijmsc.2024.03.03',
    url: 'https://doi.org/10.5815/ijmsc.2024.03.03',
    status: 'published',
    tags: ['cybersecurity', 'FinTech', 'security awareness', 'defense mechanisms'],
  },
];

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Epidemiology & Public Health
// ──────────────────────────────────────────────────────────────
export const epidemiologyArticles: Publication[] = [
  {
    id: 'nipah-bangladesh-2025',
    type: 'journal',
    title: 'Nipah virus outbreak trends in Bangladesh during the period 2001 to 2024: a brief review',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan', 'Md. Mehedi Hasan Redoy', 'Goutam Saha'],
    venue: 'Science in One Health',
    volume: '4',
    pages: '100103',
    year: 2025,
    doi: '10.1016/j.soh.2024.100103',
    url: 'https://doi.org/10.1016/j.soh.2024.100103',
    status: 'published',
    tags: ['epidemiology', 'Nipah virus', 'public health', 'Bangladesh', 'disease surveillance'],
  },
  {
    id: 'hiv-bangladesh-2025',
    type: 'journal',
    title: 'Trends, Challenges, and Socioeconomic Impacts of HIV in Bangladesh: A Data-Driven Analysis (2000–2024)',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan', 'Mrinal Saha', 'Goutam Saha'],
    venue: 'Sexes',
    volume: '6',
    issue: '3',
    pages: '34',
    year: 2025,
    doi: '10.3390/sexes6030034',
    url: 'https://doi.org/10.3390/sexes6030034',
    status: 'published',
    tags: ['epidemiology', 'HIV', 'public health', 'Bangladesh', 'data-driven analysis'],
  },
];

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Environmental Science
// ──────────────────────────────────────────────────────────────
export const environmentalArticles: Publication[] = [
  {
    id: 'pollutants-microplastics-animals-2024',
    type: 'journal',
    title: 'Microplastics in Animals: The Silent Invasion',
    authors: ['Awnon Bhowmik', 'Goutam Saha', 'Suvash C. Saha'],
    venue: 'Pollutants',
    volume: '4',
    issue: '4',
    pages: '490–497',
    year: 2024,
    doi: '10.3390/pollutants4040033',
    url: 'https://doi.org/10.3390/pollutants4040033',
    status: 'published',
    tags: ['microplastics', 'environmental science', 'public health'],
  },
  {
    id: 'microplastics-water-2025',
    type: 'journal',
    title: 'Microplastics in Our Waters: Insights from a Configurative Systematic Review of Water Bodies and Drinking Water Sources',
    authors: ['Awnon Bhowmik', 'Goutam Saha'],
    venue: 'Microplastics',
    volume: '4',
    issue: '2',
    pages: '24',
    year: 2025,
    doi: '10.3390/microplastics4020024',
    url: 'https://doi.org/10.3390/microplastics4020024',
    status: 'published',
    tags: ['microplastics', 'water quality', 'systematic review', 'environmental science'],
  },
  {
    id: 'pollutants-rural-2026',
    type: 'journal',
    title: 'Microplastics in the Rural Environment: Sources, Transport, and Impacts',
    authors: ['Awnon Bhowmik', 'Goutam Saha'],
    venue: 'Pollutants',
    volume: '6',
    issue: '1',
    pages: '3',
    year: 2026,
    doi: '10.3390/pollutants6010003',
    url: 'https://doi.org/10.3390/pollutants6010003',
    status: 'published',
    tags: ['microplastics', 'rural environment', 'environmental transport'],
  },
  {
    id: 'pollutants-river-transport-2026',
    type: 'journal',
    title: 'Analytical Modeling of Microplastic Transport in Rivers: Incorporating Sinking, Removal, and Multi-Phase Dynamics',
    authors: ['Goutam Saha', 'Amit Kumar Saha', 'Awnon Bhowmik'],
    venue: 'Pollutants',
    volume: '6',
    issue: '1',
    pages: '18',
    year: 2026,
    doi: '10.3390/pollutants6010018',
    url: 'https://doi.org/10.3390/pollutants6010018',
    status: 'published',
    tags: ['microplastics', 'mathematical modeling', 'river transport', 'environmental modeling'],
  },
];

// ──────────────────────────────────────────────────────────────
// MANUSCRIPTS IN PROGRESS
// ──────────────────────────────────────────────────────────────
export const manuscripts: Publication[] = [
  {
    id: 'manuscript-dp-ids',
    type: 'manuscript',
    title:
      '[PLACEHOLDER — Working title of dissertation manuscript, e.g., "Privacy-Preserving Intrusion Detection with Differential Privacy: A Privacy-Utility Analysis"]',
    authors: ['Awnon Bhowmik'],
    venue:
      '[PLACEHOLDER — Target venue, e.g., "IEEE Transactions on Information Forensics and Security"]',
    status: 'in-progress',
    tags: ['differential privacy', 'intrusion detection', 'privacy-preserving machine learning'],
    note: 'Update title, venue, and status as dissertation work progresses.',
    placeholder: true,
  },
];

// ──────────────────────────────────────────────────────────────
// DISSERTATION
// ──────────────────────────────────────────────────────────────
export const dissertationEntry: Publication = {
  id: 'dissertation-ctu-2030',
  type: 'dissertation',
  title:
    '[PLACEHOLDER — Official dissertation title once confirmed with committee]',
  authors: ['Awnon Bhowmik'],
  venue: 'Colorado Technical University',
  year: 2030,
  status: 'in-progress',
  tags: [
    'differential privacy',
    'cybersecurity',
    'intrusion detection',
    'adversarial machine learning',
    'privacy-preserving machine learning',
  ],
  note: 'Update with official title once finalized with dissertation committee.',
  placeholder: true,
};

// ──────────────────────────────────────────────────────────────
// CONVENIENCE AGGREGATES
// ──────────────────────────────────────────────────────────────
export const allJournalArticles: Publication[] = [
  ...cryptographyArticles,
  ...cybersecurityArticles,
  ...epidemiologyArticles,
  ...environmentalArticles,
];

export const allPublications: Publication[] = [
  ...allJournalArticles,
  ...manuscripts,
  dissertationEntry,
];
