// ============================================================
// PROJECTS DATA  —  awnonbhowmik.github.io
// ============================================================

export type ProjectStatus = 'completed' | 'in-progress';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  technologies: string[];
  outcome: string;
  status: ProjectStatus;
  year?: number;
  links?: ProjectLink[];
}

const projects: Project[] = [
  // ── 1. EpsilonLab ─────────────────────────────────────────
  {
    id: 'epsilon-lab',
    title: 'EpsilonLab — Interactive Differential Privacy Simulator',
    summary:
      'An interactive browser-based simulator that makes differential privacy mechanisms and ' +
      'composition easier to explore. Built for lectures and independent study, it runs privacy ' +
      'computations client-side through WebAssembly and supports shareable experiment states.',
    technologies: [
      'TypeScript',
      'Next.js',
      'WebAssembly',
      'Differential Privacy',
      'ChaCha20 RNG',
    ],
    outcome:
      'A serverless teaching tool with real-time Laplace and Gaussian mechanism visualizations.',
    status: 'in-progress',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/epsilon-lab',
      },
    ],
  },

  // ── 2. Selmer-Inspired Elliptic Curve Generation ──────────
  {
    id: 'ecc-selmer',
    title: 'Selmer-Inspired Elliptic Curve Generation',
    summary:
      'A research implementation for generating cryptographic elliptic curves from arithmetic-geometry ' +
      'descent methods without opaque seeds. It produces audit-traceable parameters and validates ' +
      'candidate curves against group-order, cofactor, twist-security, and embedding-degree requirements.',
    technologies: [
      'Python',
      'Elliptic Curve Cryptography',
      'Arithmetic Geometry',
      'Selmer Theory',
      'Number Theory',
    ],
    outcome:
      'Published as arXiv preprint arXiv:2510.02383 with a companion implementation notebook.',
    status: 'completed',
    year: 2025,
    links: [
      {
        label: 'arXiv Preprint',
        url: 'https://arxiv.org/abs/2510.02383',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/ECC-Selmer',
      },
    ],
  },

  // ── 3. Intrusion Detection System ─────────────────────────
  {
    id: 'intrusion-detection-system',
    title: 'Network Intrusion Detection System',
    summary:
      'A deployable Python system for detecting port scans, brute-force attempts, and anomalous ' +
      'network activity in real time. It combines traffic monitoring, automated email and SMS ' +
      'alerts, a Flask log interface, and containerized deployment.',
    technologies: [
      'Python',
      'Flask',
      'Docker',
      'Network Monitoring',
      'Unit Testing',
    ],
    outcome:
      'A working IDS with automated alerts, web-based monitoring, and unit-test coverage.',
    status: 'completed',
    year: 2024,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/Intrusion-Detection-System',
      },
    ],
  },
];

export default projects;
