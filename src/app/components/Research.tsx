'use client';

import {
  FaShieldAlt,
  FaUserShield,
  FaChartLine,
  FaCalculator,
  FaCogs,
  FaSquareRootAlt,
} from 'react-icons/fa';
import Image from 'next/image';

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
        <h2 className="text-4xl font-bold text-white">Research</h2>
      </div>

      {/* Research Overview */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 space-y-12 lg:space-y-0 lg:space-x-16">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center transition-transform hover:scale-105 duration-300">
          <div className="rounded-full overflow-hidden shadow-xl">
            <Image
              src="/research.webp"
              alt="Research Overview"
              width={300}
              height={300}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        {/* Text Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <p className="text-lg text-gray-300 text-justify leading-relaxed">
            I am currently pursuing a <strong className='text-[#149ddd]'>Doctorate in Cybersecurity and Information Assurance</strong> at <strong className='text-[#149ddd]'>Colorado Technical University</strong>. My research seeks to <strong>bridge the gap between data analytics and information security</strong>, focusing on how <span className='text-[#149ddd]'>data-driven approaches</span> can enhance the detection and prevention of cyber threats. I explore the use of <span className='text-[#149ddd]'>machine learning models</span> for predictive threat analysis and apply <strong className='text-[#149ddd]'>differential privacy</strong> techniques to safeguard sensitive data. My goal is to contribute to the development of <strong className='text-[#149ddd]'>efficient, secure, and privacy-preserving systems</strong> in an ever-evolving digital landscape.
          </p>
          <p className="text-lg text-gray-300 text-justify leading-relaxed mt-4">
            In addition to my work in cybersecurity, I integrate my <span className='text-[#149ddd]'>mathematical skills</span> to develop algorithms for <span className='text-[#149ddd]'>hybrid cryptosystems</span>, and I have authored several research papers since 2020 in the fields of <span className='text-[#149ddd]'>cryptography</span> and <span className='text-[#149ddd]'>data science</span>. My academic contributions also extend to <strong className='text-[#149ddd]'>data-driven research</strong>, where I have demonstrated my ability to handle and analyze large datasets. Beyond cybersecurity, I have a keen interest in the socio-environmental challenges posed by issues like <strong className='text-[#149ddd]'>microplastics</strong>, and I have published research on their <strong className='text-[#149ddd]'>impact on public health</strong>, showcasing my interdisciplinary approach to solving complex real-world problems.
          </p>
        </div>
      </div>

      {/* Research Areas */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-12">
        {researchAreas.map((area, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4 text-[#149ddd] transition-transform hover:scale-110">{area.icon}</div>
            <h3 className="text-3xl font-semibold text-[#149ddd] mb-2">{area.title}</h3>
            <p className="text-gray-300">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
