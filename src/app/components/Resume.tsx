'use client';

import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaUniversity,
  FaLaptopCode,
  FaChalkboardTeacher,
} from 'react-icons/fa';

export default function Resume() {
  const education = [
    {
      title: 'Doctor of Computer Science',
      institution: 'Cybersecurity & Information Assurance, Colorado Technical University',
      date: 'Mar 2025 - Feb 2030',
      icon: <FaUniversity size={30} />,
    },
    {
      title: 'Master of Science',
      institution: 'Data Analytics & Cybersecurity, Colorado State University Global Campus',
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
      title: 'Substitute Teacher',
      company: 'NYC Department of Education',
      date: 'Sep 2020 - Mar 2023',
      icon: <FaChalkboardTeacher size={30} />,
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
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold">Resume</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 relative">
        {/* Education Section */}
        <div>
          <h3 className="flex items-center text-3xl font-semibold text-[#149ddd] mb-6">
            <FaGraduationCap className="mr-2" /> Education
          </h3>
          {education.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-800 p-6 mb-8 rounded-lg shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="mr-4 text-[#149ddd]">{item.icon}</div>
              <div>
                <h4 className="text-xl font-semibold text-[#149ddd]">{item.title}</h4>
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
          <h3 className="flex items-center text-3xl font-semibold text-[#149ddd] mb-6">
            <FaBriefcase className="mr-2" /> Experience
          </h3>
          {experience.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-800 p-6 mb-8 rounded-lg shadow transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="mr-4 text-[#149ddd]">{item.icon}</div>
              <div>
                <h4 className="text-xl font-semibold text-[#149ddd]">{item.title}</h4>
                <p className="text-gray-300">{item.company}</p>
                <p className="flex items-center text-gray-400 mt-2">
                  <FaCalendarAlt className="mr-2" /> {item.date}
                </p>
              </div>
            </div>
          ))}
          {/* Subtle vertical divider for large screens */}
          <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-[#149ddd]/10 z-0"></div>
        </div>
      </div>
    </section>
  );
}
