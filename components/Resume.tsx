import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaUniversity, FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa';
import {FaCode } from 'react-icons/fa6';

export default function Resume() {
  const education = [
    {
      title: 'Doctor of Computer Science',
      institution: 'Cybersecurity & Information Assurance, Colorado Technical University',
      date: 'Mar 2025 - May 2030',
      icon: <FaUniversity size={30} />,
    },
    {
      title: 'Master of Science',
      institution: 'Data Analytics, Colorado State University Global Campus',
      date: 'Aug 2023 - Mar 2025',
      icon: <FaUniversity size={30} />,
    },
    {
      title: 'Bachelor of Science',
      institution: 'Mathematics & Computer Science, CUNY York College',
      date: 'Jan 2018 - Dec 2019',
      icon: <FaUniversity size={30} />,
    },
    {
      title: 'Associate of Science',
      institution: 'Mathematics, CUNY BMCC',
      date: 'Jan 2014 - Aug 2015',
      icon: <FaUniversity size={30} />,
    },
  ];

  const experience = [
    {
      title: 'Computer Systems Analyst - Programmer',
      company: 'United States Postal Service (USPS)',
      date: 'Jan 2024 - Present',
      icon: <FaLaptopCode size={30} />,
    },
    {
      title: 'Computer Systems Analyst - Associate Programmer',
      company: 'United States Postal Service (USPS)',
      date: 'Jun 2023 - Dec 2023',
      icon: <FaLaptopCode size={30} />,
    },
    {
      title: 'Application Developer',
      company: 'SS&C Technologies',
      date: 'Mar 2017 - Mar 2023',
      icon: <FaCode size={30} />,
    },
    {
      title: 'Mathematics Educator',
      company: 'CUNY BMCC',
      date: 'Mar 2014 - Aug 2021',
      icon: <FaChalkboardTeacher size={30} />,
    },
  ];

  return (
    <section id="resume" className="py-16 bg-[#1a1a1a] text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Resume</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-16">
        {/* Education Section */}
        <div>
          <h3 className="flex items-center text-3xl font-semibold text-blue-400 mb-6">
            <FaGraduationCap className="mr-2" /> Education
          </h3>
          {education.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-800 p-6 mb-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <div className="text-blue-400 mr-4">{item.icon}</div>
              <div>
                <h4 className="text-xl font-semibold text-blue-400">{item.title}</h4>
                <p className="text-gray-300">{item.institution}</p>
                <p className="flex items-center text-gray-400 mt-2">
                  <FaCalendarAlt className="mr-2" /> {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div>
          <h3 className="flex items-center text-3xl font-semibold text-blue-400 mb-6">
            <FaBriefcase className="mr-2" /> Experience
          </h3>
          {experience.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-800 p-6 mb-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <div className="text-blue-400 mr-4">{item.icon}</div>
              <div>
                <h4 className="text-xl font-semibold text-blue-400">{item.title}</h4>
                <p className="text-gray-300">{item.company}</p>
                <p className="flex items-center text-gray-400 mt-2">
                  <FaCalendarAlt className="mr-2" /> {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
