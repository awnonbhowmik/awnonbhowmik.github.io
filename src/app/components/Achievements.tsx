'use client';

export default function Achievements() {
  const achievements = [
    {
      title: "Dean's List - CSU Global",
      description: "Maintained a GPA of 4.0 throughout. Graduated with the highest honors.",
    },
    {
      title: "Dean's List - CUNY York College",
      description: "Graduated with Dean's List honors.",
    },
    {
      title: "Dean's List - CUNY BMCC",
      description: "Consistently made the Dean's List on three occasions. Maintained a perfect GPA of 4.0 in major coursework.",
    },
    {
      title: 'Ernesto Malave Merit Scholarship',
      description: 'University Student Senate (USS) of CUNY, 2015.',
    },
    {
      title: 'Guttman Transfer Scholarship',
      description: 'Stella and Charles Guttman Foundation, 2015.',
    },
    {
      title: 'University Math Olympiad Champion',
      description: 'University of Dhaka, July 2011.',
    },
  ];

  const impacts = [
    {
      title: 'Mathematics Stack Exchange',
      points: [
        '50+ answers contributed',
        'Learned about new books & techniques',
        'Positive feedback from users',
        'Helped with math questions',
        'Earned "Enthusiast" badge',
      ],
    },
    {
      title: 'Quora',
      points: [
        '3,500+ answers in math & CS',
        'Top Writer in Calculus, Integration, Algebra, etc.',
        'Featured in Quora Digest',
        '4,000+ followers worldwide',
        'Recognized by experts',
      ],
    },
  ];

  const competitive = [
    {
      title: 'LeetCode',
      url: 'https://leetcode.com/u/awnonbhowmik/',
      stats: [
        'Rank: 3,903,674',
        'Solved: 15',
        'Languages: C++, Python',
        'Skills: DP, Backtracking, Greedy, Hash Table, Array, String',
        'Recent: Two Sum, Max Subarray, Container With Most Water',
      ],
    },
    {
      title: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/awnonbhowmik256',
      badges: ['Problem Solving', 'C++', 'Java', 'Python', 'C language'],
      certifications: [
        'Python (Basic)', 'C++ (Basic)', 'Problem Solving (Basic)', 'Problem Solving (Intermediate)',
        'Java (Basic)', 'SQL (Basic)', 'SQL (Intermediate)'
      ],
    },
  ];

  return (
    <section id="achievements" className="py-16 bg-[#1a1a1a] text-gray-300">
      {/* Achievements Section */}
      <div className="max-w-5xl mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-white">Achievements</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-[#149ddd] text-center">{item.title}</h3>
            <p className="text-center mt-2 text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Broader Impacts Section */}
      <div className="max-w-5xl mx-auto text-center mt-20 mb-12 px-4">
        <h2 className="text-4xl font-bold text-white">Broader Impacts</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {impacts.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-[#149ddd] mb-2">{item.title}</h3>
            <ul className="list-disc list-inside text-gray-300 pl-6">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Competitive Programming Section */}
      <div className="max-w-5xl mx-auto text-center mt-20 mb-12 px-4">
        <h2 className="text-4xl font-bold text-white">Competitive Programming</h2>
        {/* <p className="text-gray-400 text-lg mt-2">Online coding platforms and achievements</p> */}
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* LeetCode Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold text-[#149ddd] text-left mb-2">{competitive[0].title}</h3>
          <ul className="list-disc list-inside text-gray-300 pl-6 mb-4">
            {(competitive[0].stats ?? []).map((stat, i) => (
              <li key={i}>{stat}</li>
            ))}
          </ul>
          <a href={competitive[0].url} target="_blank" rel="noopener noreferrer" className="text-[#149ddd] underline text-center hover:text-blue-500 transition-colors">View Profile</a>
        </div>
        {/* HackerRank Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105 flex flex-col justify-between">
          <h3 className="text-2xl font-semibold text-[#149ddd] mb-2">{competitive[1].title}</h3>
          <div className="mb-4">
            <div className="font-semibold text-[#149ddd] mb-1">Badges:</div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {(competitive[1].badges ?? []).map((badge, i) => (
                <span key={i} className="border border-[#149ddd] text-white px-3 py-1 rounded-full text-xs font-semibold shadow bg-transparent hover:bg-[#149ddd]/10">
                  {badge}
                </span>
              ))}
            </div>
            <div className="font-semibold text-[#149ddd] mb-1">Certifications:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {(competitive[1].certifications ?? []).map((cert, i) => (
                <span key={i} className="border border-[#149ddd] text-white px-3 py-1 rounded text-xs font-semibold shadow bg-transparent hover:bg-[#149ddd]/10">
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <a href={competitive[1].url} target="_blank" rel="noopener noreferrer" className="text-[#149ddd] underline text-center hover:text-blue-500 transition-colors">View Profile</a>
        </div>
      </div>
    </section>
  );
}
