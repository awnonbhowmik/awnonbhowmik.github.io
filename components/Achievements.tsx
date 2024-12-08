export default function Achievements() {
  const achievements = [
    {
      title: 'Ernesto Malave Merit Scholarship',
      description: 'University Student Senate (USS) of CUNY, 2015',
    },
    {
      title: 'Guttman Transfer Scholarship',
      description: 'Stella and Charles Guttman Foundation, 2015',
    },
    {
      title: 'Inter-University Math Olympiad Champion',
      description: 'University of Dhaka, July 2011',
    },
    {
      title: "Dean's List Achievements",
      description: "Consistently made the Dean's List on four separate occasions",
    },
  ];

  const impacts = [
    {
      title: 'Mathematics Stack Exchange',
      description: `
        - Contributed 50+ answers to the community.
        - Used this platform to learn about numerous books and problem-solving techniques.
        - Received positive feedback from users and moderators.
        - Helped students and professionals with their mathematical queries.
        - Received the "Enthusiast" badge.
      `,
    },
    {
      title: 'Quora',
      description: `
        - Contributed about 3500 answers related to mathematics and computer science.
        - Dubbed Top Writer in Calculus, Integration, and other topics numerous times.
        - Answers featured in Quora Digest multiple times.
        - Impacting people worldwide, with a following of over 4000.
        - Praised by experts in mathematics.
      `,
    },
  ];

  return (
    <section id="achievements" className="py-16 bg-[#1a1a1a] text-gray-300">
      {/* Achievements Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Achievements</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-blue-400 text-center">{item.title}</h3>
            <p className="text-center text-gray-300 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Broader Impacts Section */}
      <div className="max-w-5xl mx-auto text-center mt-16 mb-12">
        <h2 className="text-4xl font-bold text-white">Broader Impacts</h2>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {impacts.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-blue-400">{item.title}</h3>
            <p className="text-gray-300 mt-2 whitespace-pre-line">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
