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
    <section id="skills" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">Technical Specializations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                {cat.icon}
                <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
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
