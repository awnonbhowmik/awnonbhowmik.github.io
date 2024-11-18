import { FaShieldAlt, FaUserShield, FaChartLine, FaCalculator, FaCogs, FaSquareRootAlt } from 'react-icons/fa';

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
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Research Interests</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {researchAreas.map((area, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            <div className="mb-4 text-white">{area.icon}</div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">{area.title}</h3>
            <p className="text-gray-300">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
