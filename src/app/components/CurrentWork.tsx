'use client';

import { FaFlask, FaFileAlt, FaCode, FaPenSquare } from 'react-icons/fa';

const currentFocus = [
  {
    icon: <FaFlask size={22} className="text-accent" />,
    label: 'Doctoral Dissertation',
    description:
      'Conducting doctoral research at the intersection of cybersecurity and privacy-preserving machine learning ' +
      'within the Doctor of Computer Science program (Cybersecurity and Information Assurance) at Colorado Technical University. ' +
      'The work is grounded in formal mathematical methods and evaluated against practical deployment constraints, ' +
      'with a focus on developing systems that provide rigorous privacy guarantees while remaining operationally effective ' +
      'in real security environments.',
  },
  {
    icon: <FaFileAlt size={22} className="text-accent" />,
    label: 'Manuscripts in Development',
    description:
      'Preparing multiple journal submissions in differential privacy and applied cryptography, ' +
      'building on a peer-reviewed publication record active since 2020. ' +
      'Current manuscripts extend prior work on encryption scheme design and privacy-utility analysis, ' +
      'targeting venues in information security and theoretical computer science. ' +
      'Each submission undergoes careful alignment with ongoing doctoral research before submission.',
  },
  {
    icon: <FaCode size={22} className="text-accent" />,
    label: 'Software Engineering',
    description:
      'Working as a Computer Systems Analyst and Programmer at the United States Postal Service, ' +
      'contributing to the design, development, and modernization of enterprise software systems supporting national operations. ' +
      'Current engineering focus includes privacy-sensitive software architecture and the integration of ' +
      'applied cryptographic tooling into production-grade systems — work that directly informs and complements ' +
      'ongoing research interests.',
  },
  {
    icon: <FaPenSquare size={22} className="text-accent" />,
    label: 'Technical Writing & Community',
    description:
      'Publishing research-informed technical content on this site, covering topics in mathematics, ' +
      'cryptography, and cybersecurity. Maintaining an active presence as a contributor to ' +
      'Mathematics Stack Exchange and Quora, with over 3,500 answers spanning undergraduate and graduate ' +
      'mathematics and computer science. Recognized as a Top Writer on Quora in calculus, linear algebra, ' +
      'and related subjects, with a following of 4,000+ readers worldwide.',
  },
];

export default function CurrentWork() {
  return (
    <section id="current-work" className="py-16 bg-[#1a1a1a] text-white">
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
