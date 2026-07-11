'use client';

import {
  FaShieldAlt,
  FaBrain,
  FaChartBar,
  FaCode,
  FaCalculator,
  FaFileAlt,
} from 'react-icons/fa';

const specializations = [
  {
    icon: <FaShieldAlt className="text-3xl text-accent" />,
    title: 'Cybersecurity',
    skills: [
      'Network Security',
      'Penetration Testing',
      'Intrusion Detection',
      'Threat Modeling',
      'Kali Linux',
      'Wireshark',
      'Nmap',
      'Burp Suite',
      'Metasploit',
      'Nikto',
      'Ubuntu Server',
    ],
  },
  {
    icon: <FaBrain className="text-3xl text-accent" />,
    title: 'Privacy-Preserving Machine Learning',
    skills: [
      'Differential Privacy',
      'Federated Learning',
      'Adversarial ML',
      'scikit-learn',
      'PyTorch',
      'diffprivlib',
      'Privacy-Utility Tradeoff',
      'Membership Inference Defense',
    ],
  },
  {
    icon: <FaChartBar className="text-3xl text-accent" />,
    title: 'Data Analytics & Modeling',
    skills: [
      'Python (Pandas, NumPy)',
      'R Programming',
      'Statistical Modeling',
      'Matplotlib / Seaborn',
      'Tableau',
      'Power BI',
      'Looker Studio',
      'SAS',
      'Excel',
    ],
  },
  {
    icon: <FaCode className="text-3xl text-accent" />,
    title: 'Systems & Web Engineering',
    skills: [
      'Java / J2EE',
      'Python',
      'JavaScript / TypeScript',
      'Spring Boot',
      'Spring MVC',
      'Hibernate',
      'React / Next.js',
      'Node.js',
      'Tailwind CSS',
      'SQL',
      'REST APIs',
    ],
  },
  {
    icon: <FaCalculator className="text-3xl text-accent" />,
    title: 'Mathematical & Computational Methods',
    skills: [
      'Number Theory',
      'Abstract Algebra',
      'Finite Field Arithmetic',
      'Cryptographic Analysis',
      'MATLAB',
      'Mathematica',
      'SageMath',
      'Maple',
      'LaTeX',
      'FORTRAN',
    ],
  },
  {
    icon: <FaFileAlt className="text-3xl text-accent" />,
    title: 'Research & Scholarly Practice',
    skills: [
      'Academic Writing',
      'Peer-Reviewed Publication',
      'Systematic Review',
      'Research Methodology',
      'Technical Documentation',
      'LaTeX',
      'MDX / Markdown',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-12 sm:py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-10 sm:mb-14">
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold text-white">Technical Specializations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {specializations.map((cat) => (
            <div
              key={cat.title}
              className="min-w-0 bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex flex-col hover:shadow-xl motion-safe:transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0" aria-hidden="true">{cat.icon}</div>
                <h3 className="min-w-0 break-words text-lg font-semibold leading-snug text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-accent/40 text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
