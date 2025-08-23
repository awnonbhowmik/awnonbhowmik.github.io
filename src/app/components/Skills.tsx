'use client';
import { FaCode, FaCalculator, FaChartBar, FaLock } from 'react-icons/fa';

const skillData = [
  {
    icon: <FaCode className="text-4xl text-[#149ddd]" />,
    title: 'Programming',
    skills: [
      'C/C++',
      'HTML, CSS, JavaScript',
      'Java',
      'Python',
      'React & Next.js',
      'SQL',
    ],
  },
  {
    icon: <FaCalculator className="text-4xl text-[#149ddd]" />,
    title: 'Mathematics',
    skills: [
      'FORTRAN',
      'LaTeX',
      'Maple',
      'MATLAB',
      'Mathematica',
      'SageMath',
    ],
  },
  {
    icon: <FaChartBar className="text-4xl text-[#149ddd] mb-2" />,
    title: 'Data Analytics',
    skills: [
      'Excel',
      'Looker Studio',
      'Power BI',
      'R Programming',
      'SAS',
      'Tableau',
    ],
  },
  {
    icon: <FaLock className="text-4xl text-[#149ddd] mb-2" />,
    title: 'Cybersecurity',
    skills: [
      'Cloud Security',
      'Incident Response',
      'Network Security',
      'Penetration Testing',
      'Risk Management',
      'Web Application Security',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillData.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform"
            >
              {cat.icon}
              <h3 className="text-xl font-semibold mb-4 text-[#149ddd]">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[#149ddd] text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 bg-transparent hover:bg-[#149ddd]/10"
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
