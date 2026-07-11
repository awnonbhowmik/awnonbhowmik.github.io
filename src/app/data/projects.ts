// ============================================================
// PROJECTS DATA  —  awnonbhowmik.github.io
// ============================================================

export type ProjectCategory =
  | 'privacy-security'
  | 'cryptography'
  | 'systems'
  | 'fullstack'
  | 'data-ml'
  | 'mathematical-modeling';

export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  summary: string;
  problem: string;
  approach: string;
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
    category: 'privacy-security',
    title: 'EpsilonLab — Interactive Differential Privacy Simulator',
    summary:
      'A browser-based teaching and research tool for differential privacy, featuring real-time ' +
      'mechanism visualization, sequential composition analysis, and a client-side WebAssembly ' +
      'computation engine. Designed for use in lectures, independent study, and LMS integration.',
    problem:
      'Differential privacy is mathematically rigorous but often poorly understood in practice. ' +
      'Existing tools either require local installation or lack the interactivity needed to build ' +
      'intuition about privacy budgets, mechanism tradeoffs, and composition behavior.',
    approach:
      'Built with Next.js and TypeScript for the interface, with all privacy computations ' +
      'delegated to a WebAssembly module running client-side — no server or database required. ' +
      'Supports Laplace and Gaussian mechanisms with real-time parameter tuning, 13 curated demo ' +
      'presets, sequential composition visualization, and Classroom Pack PDF generation. ' +
      'Includes an embed mode for Canvas, Blackboard, and Moodle integration.',
    technologies: [
      'TypeScript',
      'Next.js',
      'WebAssembly',
      'Tailwind CSS',
      'Differential Privacy',
      'ChaCha20 RNG',
    ],
    outcome:
      'Fully functional interactive simulator deployable as a standalone static site. ' +
      'Supports classroom use, independent research exploration, and shareable URL-encoded states ' +
      'for reproducible demonstrations.',
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
    category: 'cryptography',
    title: 'Selmer-Inspired Elliptic Curve Generation',
    summary:
      'A research implementation and preprint introducing a framework for constructing cryptographic ' +
      'elliptic curves using descent methods from arithmetic geometry, producing audit-traceable ' +
      'parameters without reliance on opaque seeds.',
    problem:
      'Standard elliptic curve parameter generation often relies on seed-based methods that offer ' +
      'limited transparency into why specific curves were selected, raising concerns about potential ' +
      'backdoor construction. A principled, structure-driven approach with complete audit trails is ' +
      'preferable for high-assurance cryptographic deployments.',
    approach:
      'Adapts Selmer\'s descent theory — using binary quartics and ternary cubics with classical ' +
      'invariants — to deterministically yield candidate curve parameters. Local solubility checks ' +
      'filter candidates before conversion to short-Weierstrass form over prime fields. Each curve ' +
      'is validated against standard cryptographic criteria: group-order analysis, cofactor constraints, ' +
      'twist security, and embedding-degree bounds. The pipeline operates as a Las Vegas algorithm ' +
      'with full audit trail output, and is designed to be compatible with constant-time implementations.',
    technologies: [
      'Python',
      'Jupyter Notebook',
      'Elliptic Curve Cryptography',
      'Arithmetic Geometry',
      'Selmer Theory',
      'Number Theory',
    ],
    outcome:
      'Proof-of-concept implementation published as arXiv preprint arXiv:2510.02383 (2025). ' +
      'Companion Jupyter notebook available on GitHub.',
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
    category: 'privacy-security',
    title: 'Network Intrusion Detection System',
    summary:
      'A Python-based host and network monitoring system that detects port scans, brute-force ' +
      'attempts, and anomalous traffic in real time, with automated email and SMS alerting, ' +
      'a web-based log interface, and Docker deployment support.',
    problem:
      'Many intrusion detection tools are either heavyweight enterprise products or limited ' +
      'proof-of-concept scripts. A self-contained, deployable system bridging research-grade ' +
      'detection logic with operational features — alerting, logging, containerization — ' +
      'is useful for both security research and small-scale deployments.',
    approach:
      'Captures live network traffic and monitors process and file system activity for ' +
      'suspicious signatures. Detection heuristics target port scanning patterns and brute-force ' +
      'behavior. Automated alerts are dispatched via SMTP and Twilio SMS. A Flask web interface ' +
      '(port 5000) provides log viewing and event management. Packaged with Docker for portable ' +
      'deployment and includes a PyInstaller build for standalone executable distribution.',
    technologies: [
      'Python',
      'Flask',
      'Docker',
      'Network Monitoring',
      'SMTP / Twilio',
      'PyInstaller',
      'Unit Testing',
    ],
    outcome:
      'Fully operational IDS with containerized deployment, automated alerting pipeline, ' +
      'web-based monitoring interface, and unit test coverage.',
    status: 'completed',
    year: 2024,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/Intrusion-Detection-System',
      },
    ],
  },

  // ── 4. Key-Logger Detection Tool ──────────────────────────
  {
    id: 'keylogger-detection',
    category: 'privacy-security',
    title: 'Keylogger Detection Tool',
    summary:
      'A host-based security monitoring tool that detects potential keylogging activity through ' +
      'real-time surveillance of processes, sensitive file system directories, and network connections, ' +
      'with configurable alerting and structured event logging.',
    problem:
      'Keyloggers operate silently by design and are difficult to detect with conventional ' +
      'antivirus heuristics alone. A behavioral monitoring approach — watching for suspicious ' +
      'process signatures, unauthorized file access, and anomalous outbound connections — ' +
      'provides complementary detection coverage.',
    approach:
      'Monitors running processes for known keylogger behavioral signatures, watches ' +
      'configurable sensitive directories for unauthorized access patterns, and flags ' +
      'unusual outbound network traffic. Alerting is handled via SMTP email and Twilio SMS. ' +
      'Events are written to a structured log file for post-incident analysis. ' +
      'Configurable through `config.py`; deployable via Docker or as a standalone PyInstaller executable.',
    technologies: [
      'Python',
      'Process Monitoring',
      'File System Surveillance',
      'Network Monitoring',
      'Docker',
      'SMTP / Twilio',
      'MIT License',
    ],
    outcome:
      'Deployable host-based detection tool with configurable monitoring scope, ' +
      'multi-channel alerting, and comprehensive audit logging.',
    status: 'completed',
    year: 2024,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/Key-Logger-Detection-Tool',
      },
    ],
  },

  // ── 5. Breaking RSA with Shor's Algorithm ─────────────────
  {
    id: 'shors-algorithm',
    category: 'cryptography',
    title: "Breaking RSA with Shor's Algorithm",
    summary:
      "A Python implementation of Shor's quantum factoring algorithm, demonstrating the " +
      'theoretical mechanism by which sufficiently capable quantum computers can break ' +
      'RSA encryption by efficiently factoring large composite integers.',
    problem:
      'RSA security rests on the computational intractability of integer factorization for ' +
      'classical computers. Shor\'s algorithm achieves polynomial-time factoring on a quantum ' +
      'computer, making it a critical reference point for understanding post-quantum cryptography ' +
      'and the urgency of lattice-based and other quantum-resistant alternatives.',
    approach:
      'Implements the quantum period-finding subroutine and classical post-processing steps ' +
      'of Shor\'s algorithm in Python, illustrating how the algorithm reduces integer factorization ' +
      'to order-finding in a cyclic group and applies the quantum Fourier transform to extract ' +
      'the period efficiently.',
    technologies: [
      'Python',
      'Quantum Computing',
      'Number Theory',
      'Cryptanalysis',
      'Post-Quantum Relevance',
    ],
    outcome:
      'Working Python implementation demonstrating the factoring pipeline and its implications ' +
      'for classical public-key cryptosystems. Relevant context for post-quantum cryptography research.',
    status: 'completed',
    year: 2019,
    links: [
      {
        label: 'GitHub',
        url: "https://github.com/awnonbhowmik/Shor-s-Algorithm",
      },
    ],
  },

  // ── 6. Personal Academic Website ─────────────────────────
  {
    id: 'academic-portfolio-site',
    category: 'fullstack',
    title: 'Personal Academic Website',
    summary:
      'This website — a statically generated academic portfolio built with Next.js and TypeScript, ' +
      'featuring a blog system with MDX, LaTeX/KaTeX rendering, and a secure contact form.',
    problem:
      'Academic researchers need a professional web presence serving both scholarly audiences ' +
      '(publications, research, CV) and general visitors, without relying on institutional infrastructure.',
    approach:
      'Built with Next.js (static export), TypeScript, and Tailwind CSS. The blog system uses MDX ' +
      'with KaTeX for mathematical notation. The contact form includes rate limiting, HTML sanitization, ' +
      'and EmailJS integration. Deployed to Netlify.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'MDX',
      'KaTeX',
      'EmailJS',
      'React',
    ],
    outcome:
      'Production site serving as primary academic and professional web presence. Source code open on GitHub.',
    status: 'in-progress',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/awnonbhowmik/awnonbhowmik.github.io',
      },
      {
        label: 'Live Site',
        url: 'https://awnon.netlify.app',
      },
    ],
  },
];

export default projects;
