'use client';

const communityContributions = [
  {
    title: 'Quora',
    url: 'https://www.quora.com/profile/Awnon-Bhowmik',
    points: [
      '3,500+ answers contributed in mathematics and computer science',
      'Top Writer in Calculus, Integration, Linear Algebra, and related subjects',
      'Featured in Quora Digest; over 4,000 followers worldwide',
      'Recognized as a subject-matter authority by platform and community',
    ],
  },
  {
    title: 'Mathematics Stack Exchange',
    url: 'https://math.stackexchange.com',
    points: [
      'Active contributor with 50+ answers in undergraduate and graduate mathematics',
      'Provided explanations across analysis, algebra, number theory, and discrete mathematics',
      'Received consistent positive feedback from students and researchers',
    ],
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 bg-[#1a1a1a] text-gray-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Community & Scholarly Outreach</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed text-justify">
            Public contributions to mathematics and computer science education across online
            scholarly communities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityContributions.map((item) => (
            <div
              key={item.title}
              className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-accent mb-3">{item.title}</h3>
              <ul className="space-y-2">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                    <span className="text-accent mt-1 shrink-0">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 border border-accent text-accent px-4 py-1.5 rounded text-sm hover:bg-accent hover:text-white transition-colors"
                >
                  View Profile
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
