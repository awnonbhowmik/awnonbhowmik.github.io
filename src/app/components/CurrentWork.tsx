'use client';

import { FaFlask, FaFileAlt, FaCode, FaPenSquare } from 'react-icons/fa';

const currentFocus = [
  {
    icon: <FaFlask size={22} className="text-accent" />,
    label: 'Doctoral Dissertation',
    description:
      'Doctoral research at the intersection of cybersecurity and privacy-preserving machine learning, ' +
      'conducted within the Doctor of Computer Science program (Cybersecurity and Information Assurance) ' +
      'at Colorado Technical University.',
  },
  {
    icon: <FaFileAlt size={22} className="text-accent" />,
    label: 'Manuscripts in Development',
    description:
      'Preparing journal submissions in differential privacy and applied cryptography, ' +
      'building on peer-reviewed work published since 2020.',
  },
  {
    icon: <FaCode size={22} className="text-accent" />,
    label: 'Software Engineering',
    description:
      'Enterprise software development, systems analysis, and application modernization at the ' +
      'United States Postal Service. Current focus on privacy-sensitive software architecture ' +
      'and applied cryptographic tooling.',
  },
  {
    icon: <FaPenSquare size={22} className="text-accent" />,
    label: 'Technical Writing & Community',
    description:
      'Publishing research-informed technical content on this blog. Active contributor to ' +
      'Mathematics Stack Exchange and Quora, with 3,500+ answers in mathematics and computer science.',
  },
];

export default function CurrentWork() {
  return (
    <section id="current-work" className="py-16 bg-[#141414] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">Current Work</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Active research, engineering, and scholarly focus as of early 2026.
          </p>
        </div>

        {/* Focus items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentFocus.map((item) => (
            <div
              key={item.label}
              className="flex gap-5 p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="shrink-0 mt-1">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-accent mb-1">{item.label}</h3>
                <p className="text-gray-300 leading-relaxed text-justify">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
