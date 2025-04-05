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
      description: `
- Contributed 50+ answers to the community.
- Learned about numerous books and problem-solving techniques.
- Received positive feedback from users and moderators.
- Helped students and professionals with their math questions.
- Earned the "Enthusiast" badge.`,
    },
    {
      title: 'Quora',
      description: `
- Contributed around 3,500 answers in math and CS.
- Named Top Writer in Calculus, Integration, and more.
- Featured in Quora Digest multiple times.
- Over 4,000 followers from around the globe.
- Recognized by subject-matter experts.`,
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
            <h3 className="text-2xl font-semibold text-blue-400 text-center">{item.title}</h3>
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
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">{item.title}</h3>
            <p className="text-gray-300 whitespace-pre-line">{item.description.trim()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
