'use client';

import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaUniversity,
  FaLaptopCode,
  FaChalkboardTeacher,
} from 'react-icons/fa';

interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  date: string;
  icon: React.ReactNode;
  honors?: string[];
}

interface ExperienceEntry {
  title: string;
  organization: string;
  date: string;
  icon: React.ReactNode;
  bullets: string[];
}

const education: EducationEntry[] = [
  {
    degree: 'Doctor of Computer Science',
    field: 'Specialization: Cybersecurity and Information Assurance',
    institution: 'Colorado Technical University',
    date: 'Mar 2025 – Feb 2030 (expected)',
    icon: <FaUniversity size={28} />,
    honors: [
      'Dissertation: Privacy-Preserving Cybersecurity Threat Detection',
    ],
  },
  {
    degree: 'Master of Science',
    field: 'Data Analytics and Cybersecurity',
    institution: 'Colorado State University Global Campus',
    date: 'Aug 2023 – Mar 2025',
    icon: <FaUniversity size={28} />,
    honors: [
      "Dean's List — graduated with highest honors, GPA 4.0",
    ],
  },
  {
    degree: 'Bachelor of Science',
    field: 'Mathematics and Computer Science',
    institution: 'CUNY York College',
    date: 'Jan 2018 – Dec 2019',
    icon: <FaUniversity size={28} />,
    honors: [
      "Dean's List",
    ],
  },
  {
    degree: 'Associate of Science',
    field: 'Mathematics',
    institution: 'CUNY Borough of Manhattan Community College',
    date: 'Jan 2014 – Aug 2015',
    icon: <FaUniversity size={28} />,
    honors: [
      "Dean's List — three occasions; perfect GPA in major coursework",
      'Ernesto Malave Merit Scholarship, University Student Senate of CUNY, 2015',
      'Guttman Transfer Scholarship, Stella and Charles Guttman Foundation, 2015',
    ],
  },
  {
    degree: 'Bachelor of Science — Pure Mathematics',
    field: 'Did not complete',
    institution: 'University of Dhaka, Bangladesh',
    date: '2009 – 2012',
    icon: <FaUniversity size={28} />,
    honors: [
      'University Math Olympiad Champion, 2011',
    ],
  },
];

const experience: ExperienceEntry[] = [
  {
    title: 'Computer Systems Analyst — Programmer',
    organization: 'United States Postal Service',
    date: 'Jan 2024 – Present',
    icon: <FaLaptopCode size={28} />,
    bullets: [
      'Design, develop, and maintain enterprise software supporting national postal operations.',
      'Modernize mission-critical applications to improve reliability and maintainability.',
    ],
  },
  {
    title: 'Computer Systems Analyst — Associate Programmer',
    organization: 'United States Postal Service',
    date: 'Jun 2023 – Dec 2023',
    icon: <FaLaptopCode size={28} />,
    bullets: [
      'Supported software analysis and development across USPS operational workflows.',
      'Translated business requirements into deliverables through active design reviews.',
    ],
  },
  {
    title: 'Application Developer',
    organization: 'SS&C Technologies',
    date: 'Mar 2017 – Mar 2023',
    icon: <FaLaptopCode size={28} />,
    bullets: [
      'Built enterprise Java applications for healthcare and financial services.',
      'Implemented Spring Boot and JPA service layers, reducing batch processing time by 20%.',
      'Reduced issue recurrence by 25% via performance tuning and JUnit/Postman testing.',
    ],
  },
  {
    title: 'Substitute Teacher',
    organization: 'NYC Department of Education',
    date: 'Sep 2020 – Mar 2023',
    icon: <FaChalkboardTeacher size={28} />,
    bullets: [
      'Delivered STEM and mathematics instruction across New York City public schools.',
    ],
  },
  {
    title: 'Mathematics Educator',
    organization: 'CUNY Borough of Manhattan Community College',
    date: 'Mar 2014 – Aug 2021',
    icon: <FaChalkboardTeacher size={28} />,
    bullets: [
      'Taught college algebra, precalculus, calculus, and differential equations for seven years.',
    ],
  },
];

export default function Resume() {
  return (
    <section id="resume" className="py-16 bg-[#1a1a1a] text-white">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold">Resume</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 relative">

        {/* Education */}
        <div>
          <h3 className="flex items-center text-xl font-semibold text-accent mb-6 uppercase tracking-widest">
            <FaGraduationCap className="mr-2" /> Education
          </h3>
          <div className="space-y-6">
            {education.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="text-accent mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold text-white">{item.degree}</h4>
                <p className="text-accent text-sm mt-0.5">{item.field}</p>
                <p className="text-gray-300 mt-1">{item.institution}</p>
                <p className="flex items-center text-gray-500 text-sm mt-2">
                  <FaCalendarAlt className="mr-2 shrink-0" /> {item.date}
                </p>
                {item.honors && item.honors.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {item.honors.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                        <span className="text-accent shrink-0 mt-0.5">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="flex items-center text-xl font-semibold text-accent mb-6 uppercase tracking-widest">
            <FaBriefcase className="mr-2" /> Experience
          </h3>
          <div className="space-y-6">
            {experience.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="text-accent mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <p className="text-gray-300 mt-0.5">{item.organization}</p>
                <p className="flex items-center text-gray-500 text-sm mt-2 mb-4">
                  <FaCalendarAlt className="mr-2 shrink-0" /> {item.date}
                </p>
                <ul className="space-y-2">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Subtle vertical divider for large screens */}
          <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-accent/10 z-0" />
        </div>

      </div>
    </section>
  );
}
