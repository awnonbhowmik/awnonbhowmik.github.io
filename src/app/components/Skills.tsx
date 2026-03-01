'use client';
import { FaCode, FaDatabase, FaChartBar, FaShieldAlt } from 'react-icons/fa';


const skillCategories = [
  {
    icon: <FaCode className="text-3xl text-accent" />,
    title: "Programming",
    skills: [
      "Java", "Python", "JavaScript", "C++", "C", "SQL", "FORTRAN", "MASM x86",
      "Spring Boot", "Spring MVC", "Hibernate", "Tkinter", "ReactJS", "NextJS", "Node.js", "Bootstrap", "Tailwind CSS"
    ],
  },
  {
    icon: <FaChartBar className="text-3xl text-accent" />,
    title: "Mathematics",
    skills: [
      "Mathematica", "Maple", "MATLAB", "LaTeX", "GeoGebra", "Desmos", "SageMath"
    ],
  },
  {
    icon: <FaDatabase className="text-3xl text-accent" />,
    title: "Data Analytics",
    skills: [
      "Excel", "Tableau", "Power BI", "Looker Studio", "R Programming", "SAS", "Pandas", "NumPy", "Matplotlib", "Seaborn"
    ],
  },
  {
    icon: <FaShieldAlt className="text-3xl text-accent" />,
    title: "Cybersecurity",
    skills: [
      "Ubuntu", "Kali Linux", "Wireshark", "NMap", "Nikto", "Burp Suite", "Metasploit", "Penetration Testing", "Network Security"
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform"
            >
              {cat.icon}
              <h3 className="text-2xl font-semibold mb-4 text-accent">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-accent text-white px-3 py-1 rounded-full text-sm font-medium bg-transparent transition-colors duration-200 hover:bg-accent/10 hover:text-accent"
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
