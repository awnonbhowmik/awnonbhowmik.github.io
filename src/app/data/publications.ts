// ============================================================
// PUBLICATIONS DATA  —  awnonbhowmik.github.io
// ============================================================
// To add a new entry: copy an existing entry, change the id,
// and update all fields. Set placeholder: true if the entry
// still needs information filled in, and add a note explaining
// what is missing.
// ============================================================

export type PublicationType = 'journal' | 'preprint';

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
  arxivId?: string;     // arXiv paper ID, e.g. '2008.12645'
  tags?: string[];
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
    volume: '7',
    pages: 'e637',
    year: 2021,
    doi: '10.7717/peerj-cs.637',
    url: 'https://doi.org/10.7717/peerj-cs.637',
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
    arxivId: '2008.12645',
    tags: ['cryptography', 'fractal geometry', 'dragon curve', 'trapdoor functions'],
  },
  {
    id: 'ijca-mes-2020',
    type: 'journal',
    title: 'MES — Modern Encryption Standard',
    authors: ['Awnon Bhowmik', 'Unnikrishnan Menon'],
    venue: 'International Journal of Computer Applications',
    volume: '176',
    issue: '36',
    pages: '21–27',
    year: 2020,
    doi: '10.5120/ijca2020920479',
    url: 'https://doi.org/10.5120/ijca2020920479',
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
    pages: '9–14',
    year: 2020,
    doi: '10.5815/ijmsc.2020.06.02',
    url: 'https://doi.org/10.5815/ijmsc.2020.06.02',
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
    pages: '1–9',
    year: 2023,
    doi: '10.5815/ijmsc.2023.02.01',
    url: 'https://doi.org/10.5815/ijmsc.2023.02.01',
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
    pages: '31–38',
    year: 2024,
    doi: '10.5815/ijmsc.2024.01.04',
    url: 'https://doi.org/10.5815/ijmsc.2024.01.04',
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
    pages: '26–36',
    year: 2024,
    doi: '10.5815/ijmsc.2024.03.03',
    url: 'https://doi.org/10.5815/ijmsc.2024.03.03',
    tags: ['cybersecurity', 'FinTech', 'security awareness', 'defense mechanisms'],
  },
  {
    id: 'nbcms-blockchain-ecc-2025',
    type: 'journal',
    title: 'Integrating Blockchain and ECC for Secure Authentication: Comprehensive Survey for IoT & WSN Environment',
    authors: ['S. Mukherjee', 'G. Mukherjee', 'Awnon Bhowmik'],
    venue: 'News Bulletin of Calcutta Mathematical Society',
    volume: '48',
    issue: '4–6',
    pages: '1–17',
    year: 2025,
    url: 'https://www.researchgate.net/publication/393729816_Integrating_Blockchain_and_ECC_for_Secure_Authentication_Comprehensive_Survey_for_IoT_WSN_Environment_News_Bulletin_Calcutta_Mathematical_Society',
    tags: ['cybersecurity', 'blockchain', 'elliptic curve cryptography', 'IoT', 'authentication'],
  },
];

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Epidemiology & Public Health
// ──────────────────────────────────────────────────────────────
export const epidemiologyArticles: Publication[] = [
  {
    id: 'dengue-bangladesh-2026',
    type: 'journal',
    title:
      'Two Decades of Dengue in Bangladesh (2001–2024): Epidemiologic Trends, Geographic Spread and Climatic Drivers',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan', 'Goutam Saha', 'Huaiping Zhu'],
    venue: 'Tropical Medicine & International Health',
    volume: '31',
    issue: '7',
    pages: '772–795',
    year: 2026,
    doi: '10.1111/tmi.70136',
    url: 'https://doi.org/10.1111/tmi.70136',
    tags: [
      'epidemiology',
      'dengue',
      'Bangladesh',
      'geographic spread',
      'climatic drivers',
      'narrative review',
    ],
  },
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
    tags: ['epidemiology', 'HIV', 'public health', 'Bangladesh', 'data-driven analysis'],
  },
];

// ──────────────────────────────────────────────────────────────
// JOURNAL ARTICLES — Environmental Science
// ──────────────────────────────────────────────────────────────
export const environmentalArticles: Publication[] = [
  {
    id: 'microplastics-human-body-2026',
    type: 'journal',
    title:
      'Microplastics Across the Human Body: Occurrence, Detection Methodologies, and Distribution in Human Tissues, Organs, and Biological Fluids',
    authors: [
      'Hriddhi Sarker',
      'Umar Hasnain Monabbi',
      'Goutam Saha',
      'Awnon Bhowmik',
      'B. M. Rabby Hossain',
    ],
    venue: 'Microplastics',
    volume: '5',
    issue: '3',
    pages: '157',
    year: 2026,
    doi: '10.3390/microplastics5030157',
    url: 'https://doi.org/10.3390/microplastics5030157',
    tags: [
      'microplastics',
      'human health',
      'biological fluids',
      'human tissues',
      'detection methodologies',
    ],
  },
  {
    id: 'microplastics-one-health-fish-2026',
    type: 'journal',
    title:
      'Microplastics as Emerging One Health Threats: A Molecular and Ecotoxicological Review Across Aquatic Life with Emphasis on Fish',
    authors: ['Hriddhi Sarker', 'Goutam Saha', 'Awnon Bhowmik', 'Amlan Ganguly'],
    venue: 'Microplastics',
    volume: '5',
    issue: '2',
    pages: '102',
    year: 2026,
    doi: '10.3390/microplastics5020102',
    url: 'https://doi.org/10.3390/microplastics5020102',
    tags: ['microplastics', 'One Health', 'aquatic life', 'fish', 'ecotoxicology'],
  },
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
    tags: ['microplastics', 'mathematical modeling', 'river transport', 'environmental modeling'],
  },
];

// ──────────────────────────────────────────────────────────────
// PREPRINTS (arXiv / preprint servers — no published journal version)
// ──────────────────────────────────────────────────────────────
export const preprints: Publication[] = [
  {
    id: 'arxiv-dp-continual-counting-2026',
    type: 'preprint',
    title: 'Costs of Arbitrary Real Matrix Factorizations for Pure-DP Continual Counting',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan'],
    venue: 'arXiv',
    year: 2026,
    arxivId: '2607.28703',
    doi: '10.48550/arXiv.2607.28703',
    url: 'https://arxiv.org/abs/2607.28703',
    tags: ['differential privacy', 'continual counting', 'matrix mechanisms', 'functional analysis'],
  },
  {
    id: 'arxiv-selmer-ecc-2025',
    type: 'preprint',
    title: 'Selmer-Inspired Elliptic Curve Generation',
    authors: ['Awnon Bhowmik'],
    venue: 'arXiv',
    year: 2025,
    arxivId: '2510.02383',
    doi: '10.48550/arXiv.2510.02383',
    url: 'https://arxiv.org/abs/2510.02383',
    tags: ['cryptography', 'elliptic curves', 'number theory'],
  },
  {
    id: 'arxiv-chaotic-mappings-2022',
    type: 'preprint',
    title: 'A review of cryptosystems based on multi layer chaotic mappings',
    authors: ['Awnon Bhowmik', 'Emon Hossain', 'Mahmudul Hasan'],
    venue: 'arXiv',
    year: 2022,
    arxivId: '2208.06002',
    doi: '10.48550/arXiv.2208.06002',
    url: 'https://arxiv.org/abs/2208.06002',
    tags: ['cryptography', 'chaotic mappings', 'review'],
  },
  {
    id: 'arxiv-matrix-cipher-2022',
    type: 'preprint',
    title: 'Matrix Based Adaptive Short Block Cipher',
    authors: ['Awnon Bhowmik'],
    venue: 'arXiv',
    year: 2022,
    arxivId: '2212.12300',
    doi: '10.48550/arXiv.2212.12300',
    url: 'https://arxiv.org/abs/2212.12300',
    tags: ['cryptography', 'block cipher', 'matrix operations'],
  },
  {
    id: 'preprints-saarc-mortality-2025',
    type: 'preprint',
    title: 'Analyzing 30 Years of Mortality Dynamics in the SAARC Region During the Period 1990 to 2019',
    authors: ['Awnon Bhowmik', 'Mahmudul Hasan', 'Goutam Saha'],
    venue: 'Preprints.org',
    year: 2025,
    doi: '10.20944/preprints202508.1297.v1',
    url: 'https://www.preprints.org/manuscript/202508.1297/v1',
    tags: ['epidemiology', 'mortality', 'SAARC', 'public health', 'data-driven analysis'],
  },
];
