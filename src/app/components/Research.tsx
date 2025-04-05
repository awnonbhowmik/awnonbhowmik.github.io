'use client';

import {
  FaShieldAlt,
  FaUserShield,
  FaChartLine,
  FaCalculator,
  FaCogs,
  FaSquareRootAlt,
} from 'react-icons/fa';

export default function Research() {
  const researchAreas = [
    {
      title: 'Information Security',
      description: 'Securing systems from threats.',
      icon: <FaShieldAlt size={40} />,
    },
    {
      title: 'Security & Privacy',
      description: 'Ensuring data protection and privacy compliance.',
      icon: <FaUserShield size={40} />,
    },
    {
      title: 'Data Analytics',
      description: 'Interpreting data to drive decision-making.',
      icon: <FaChartLine size={40} />,
    },
    {
      title: 'Computational Mathematics',
      description: 'Solving problems using mathematical models.',
      icon: <FaCalculator size={40} />,
    },
    {
      title: 'Mathematical Modeling',
      description: 'Predicting behaviors with mathematical models.',
      icon: <FaCogs size={40} />,
    },
    {
      title: 'Number Theory',
      description: 'Exploring properties of numbers.',
      icon: <FaSquareRootAlt size={40} />,
    },
  ];

  return (
    <section id="research" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-white">Research Interests</h2>
      </div>

      {/* Research Overview */}
      <div className="container mx-auto text-justify mb-12 px-4">
        <p className="text-lg text-gray-300 leading-relaxed">
          I am currently pursuing a <strong className='text-blue-400'>Doctorate in Cybersecurity and Information Assurance</strong> at <strong className='text-blue-400'>Colorado Technical University</strong>. My research seeks to <strong>bridge the gap between data analytics and information security</strong>, focusing on how <span className='text-blue-400'>data-driven approaches</span> can enhance the detection and prevention of cyber threats. I explore the use of <span className='text-blue-400'>machine learning models</span> for predictive threat analysis and apply <strong className='text-blue-400'>differential privacy</strong> techniques to safeguard sensitive data. My goal is to contribute to the development of <strong className='text-blue-400'>efficient, secure, and privacy-preserving systems</strong> in an ever-evolving digital landscape.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          In addition to my work in cybersecurity, I integrate my <span className='text-blue-400'>mathematical skills</span> to develop algorithms for <span className='text-blue-400'>hybrid cryptosystems</span>, and I have authored several research papers since 2020 in the fields of <span className='text-blue-400'>cryptography</span> and <span className='text-blue-400'>data science</span>. My academic contributions also extend to <strong className='text-blue-400'>data-driven research</strong>, where I have demonstrated my ability to handle and analyze large datasets. Beyond cybersecurity, I have a keen interest in the socio-environmental challenges posed by issues like <strong className='text-blue-400'>microplastics</strong>, and I have published research on their <strong className='text-blue-400'>impact on public health</strong>, showcasing my interdisciplinary approach to solving complex real-world problems.
        </p>
      </div>

      <div className="container mx-auto text-center mb-12 px-4">
        <p className="mt-2 text-gray-400 text-lg">
          Areas where curiosity meets applied knowledge.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {researchAreas.map((area, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4 text-blue-400">{area.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">{area.title}</h3>
            <p className="text-gray-300">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
