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

interface ExperienceRole {
  title: string;
  date: string;
  bullets: string[];
}

interface ExperienceEntry {
  organization: string;
  icon: React.ReactNode;
  roles: ExperienceRole[];
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
      'Invited to set Olympiad questions for the 2014 and 2015 events',
    ],
  },
];

const experience: ExperienceEntry[] = [
  {
    organization: 'Varsity Tutors',
    icon: <FaChalkboardTeacher size={28} />,
    roles: [
      {
        title: 'Mathematics Tutor',
        date: 'Jun 2026 – Present',
        bullets: [
          'Provide individualized mathematics instruction from elementary mathematics through calculus and differential equations.',
          'Communicate complex mathematical concepts in a clear and understandable manner.',
          'Develop personalized lesson plans and practice problems to address students\' needs.',
          'Track student progress and adjust teaching strategies accordingly.',
        ],
      },
      {
        title: 'Mathematics & Science Tutor',
        date: 'Dec 2015 – Jan 2018',
        bullets: [
          'Tutored students from fifth grade through undergraduate level in mathematics and science.',
          'Reviewed curriculum topics and assisted with homework, projects, and test preparation.',
          'Helped students strengthen their understanding of key concepts covered in class.',
        ],
      },
    ],
  },
  {
    organization: 'United States Postal Service',
    icon: <FaLaptopCode size={28} />,
    roles: [
      {
        title: 'Computer Systems Analyst — Programmer',
        date: 'Jan 2024 – Present',
        bullets: [
          'Design, develop, and maintain enterprise software supporting national postal operations and internal business workflows.',
          'Modernize mission-critical applications with an emphasis on maintainability, reliability, and operational continuity.',
          'Translate business and operational requirements into implementable software changes through analysis, design reviews, and cross-team collaboration.',
          'Participate in build and deployment workflows using Jenkins, Application Lifecycle Management, and the Advanced Distribution Management System.',
          'Conduct code reviews and uphold coding standards and security best practices.',
        ],
      },
      {
        title: 'Computer Systems Analyst — Associate Programmer',
        date: 'Jun 2023 – Dec 2023',
        bullets: [
          'Supported software analysis and development across USPS operational workflows during onboarding into enterprise systems and delivery processes.',
          'Participated in requirement interpretation, solution design discussions, and implementation support for production-oriented applications.',
          'Assisted with onboarding documentation and environment setup guidance for new team members.',
        ],
      },
    ],
  },
  {
    organization: 'New York City Department of Education',
    icon: <FaChalkboardTeacher size={28} />,
    roles: [
      {
        title: 'Substitute Teacher',
        date: 'Sep 2020 – May 2023',
        bullets: [
          'Delivered instructional and classroom-management processes for assigned teachers.',
          'Followed the curriculum and lesson plans provided by the regular teacher.',
          'Supervised students in classrooms, hallways, and cafeterias.',
          'Recorded attendance and documented daily notes.',
        ],
      },
    ],
  },
  {
    organization: 'SS&C Technologies',
    icon: <FaLaptopCode size={28} />,
    roles: [
      {
        title: 'Application Developer',
        date: 'Mar 2017 – Mar 2023',
        bullets: [
          'Built enterprise Java applications for healthcare and financial services.',
          'Implemented Spring Boot and JPA service layers, reducing batch processing time by 20%.',
          'Reduced issue recurrence by 25% via performance tuning and JUnit/Postman testing.',
        ],
      },
    ],
  },
  {
    organization: 'The Garden School',
    icon: <FaChalkboardTeacher size={28} />,
    roles: [
      {
        title: 'Guest Teacher — Mathematics & Life Science',
        date: 'Sep 2022',
        bullets: [
          'Taught seventh-grade Algebra and Life Science and eighth-grade Algebra.',
          'Assigned and evaluated homework and assessments and provided constructive feedback.',
        ],
      },
    ],
  },
  {
    organization: 'University of Central Florida',
    icon: <FaChalkboardTeacher size={28} />,
    roles: [
      {
        title: 'Graduate Teaching Grader',
        date: 'Jan 2022 – May 2022',
        bullets: [
          'Assisted a faculty member with the non-instructional aspects of course teaching.',
          'Graded quizzes and tests and provided feedback to students.',
          'Held virtual office hours and entered grades into WebcoursesUCF.',
        ],
      },
      {
        title: 'Graduate Teaching Assistant — Mathematics Assistance & Learning Lab',
        date: 'Jan 2022 – May 2022',
        bullets: [
          'Assisted students with ALEKS, WebAssign, and other learning platforms.',
          'Answered questions during open-lab sessions and delivered short lectures when requested.',
          'Recommended supplementary videos, books, and online resources.',
          'Performed proctoring duties during examinations.',
        ],
      },
    ],
  },
  {
    organization: 'CUNY Borough of Manhattan Community College',
    icon: <FaChalkboardTeacher size={28} />,
    roles: [
      {
        title: 'Mathematics Tutor',
        date: 'Mar 2014 – Aug 2021',
        bullets: [
          'Tutored approximately 30 students per semester across the Math Lab, ASAP, and Summer Immersion programs.',
          'Supported algebra, quantitative reasoning, calculus, differential equations, and physics.',
          'Served as a liaison between professors and students and provided progress updates.',
        ],
      },
      {
        title: 'Adjunct College Lab Instructor — Calculus I (Maple)',
        date: 'Sep 2017 – Aug 2019',
        bullets: [
          'Taught Calculus I laboratory sessions using Maple and Desmos.',
          'Provided visual explanations of theory and evaluated student progress.',
          'Tracked assignments, attendance, and test scores.',
        ],
      },
      {
        title: 'Lead Supplemental Instructor',
        date: 'Jan 2017 – Aug 2019',
        bullets: [
          'Facilitated biweekly small-group study sessions alongside regular course attendance.',
          'Prepared structured supplemental instruction covering challenging course material.',
          'Helped students develop effective study skills and maximize academic potential.',
        ],
      },
    ],
  },
  {
    organization: 'CUNY York College',
    icon: <FaLaptopCode size={28} />,
    roles: [
      {
        title: 'College Assistant — Computer Lab',
        date: 'Sep 2019 – Mar 2020',
        bullets: [
          'Patched software and installed updates to address security vulnerabilities.',
          'Replaced malfunctioning hardware components.',
          'Supported computer-lab operations and assisted non-technical users.',
        ],
      },
    ],
  },
];

export default function Resume() {
  const renderEducationCard = (edu: EducationEntry, key: string | number) => (
    <div key={key} className="min-w-0 bg-gray-800 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg motion-safe:transition-shadow">
      <div className="text-accent mb-3" aria-hidden="true">{edu.icon}</div>
      <h4 className="text-lg font-semibold leading-snug break-words text-white">{edu.degree}</h4>
      <p className="text-accent text-sm leading-relaxed break-words mt-0.5">{edu.field}</p>
      <p className="text-gray-300 leading-relaxed break-words mt-1">{edu.institution}</p>
      <p className="flex items-start text-gray-400 text-sm leading-relaxed mt-2">
        <FaCalendarAlt className="mr-2 mt-0.5 shrink-0" aria-hidden="true" />
        <span className="min-w-0">{edu.date}</span>
      </p>
      {edu.honors && edu.honors.length > 0 && (
        <ul className="mt-3 space-y-1">
          {edu.honors.map((h, i) => (
            <li key={i} className="flex gap-2 text-[15px] sm:text-base text-gray-400 leading-relaxed">
              <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">—</span>
              <span className="min-w-0 break-words">{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderExperienceCard = (exp: ExperienceEntry, key: string | number) => {
    const hasRoleTimeline = exp.roles.length > 1;

    return (
      <div key={key} className="min-w-0 bg-gray-800 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg motion-safe:transition-shadow">
        <div className="text-accent mb-3" aria-hidden="true">{exp.icon}</div>
        <h4 className="text-lg font-semibold leading-snug break-words text-white mb-4">{exp.organization}</h4>

        <ol>
          {exp.roles.map((role, roleIndex) => (
            <li
              key={`${role.title}-${role.date}`}
              className={hasRoleTimeline ? 'relative pl-6 pb-6 last:pb-0' : 'relative'}
            >
              {hasRoleTimeline && (
                <>
                  <span
                    className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-gray-800"
                    aria-hidden="true"
                  />
                  {roleIndex < exp.roles.length - 1 && (
                    <span
                      className="absolute left-1 top-4 -bottom-2 w-px bg-accent/50"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
              <h5 className="font-semibold leading-snug break-words text-gray-100">{role.title}</h5>
              <p className={`flex items-start text-gray-400 text-sm leading-relaxed mt-1 ${role.bullets.length > 0 ? 'mb-3' : ''}`}>
                <FaCalendarAlt className="mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0">{role.date}</span>
              </p>
              {role.bullets.length > 0 && (
                <ul className="space-y-2">
                  {role.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-2 text-[15px] sm:text-base text-gray-400 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0" aria-hidden="true">—</span>
                      <span className="min-w-0 break-words">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <section id="resume" aria-labelledby="resume-heading" className="py-12 sm:py-16 bg-[#1a1a1a] text-white">
      <div className="text-center mb-10 sm:mb-14 px-4">
        <h2 id="resume-heading" className="text-3xl sm:text-4xl font-bold">Resume</h2>
      </div>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 space-y-10 sm:space-y-12">
        <div>
          <h3 className="flex items-center text-lg sm:text-xl font-semibold text-accent uppercase tracking-[0.14em] sm:tracking-widest mb-5">
            <FaGraduationCap className="mr-2 shrink-0" aria-hidden="true" /> Education
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {education.map((edu, index) => renderEducationCard(edu, `education-${index}`))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center text-lg sm:text-xl font-semibold text-accent uppercase tracking-[0.14em] sm:tracking-widest mb-5">
            <FaBriefcase className="mr-2 shrink-0" aria-hidden="true" /> Experience
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {experience.map((exp, index) => renderExperienceCard(exp, `experience-${index}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
