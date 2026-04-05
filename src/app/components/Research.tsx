'use client';

import Image from 'next/image';
import {
  FaShieldAlt,
  FaLock,
  FaBrain,
  FaNetworkWired,
  FaProjectDiagram,
  FaBalanceScale,
} from 'react-icons/fa';

const researchAreas = [
  {
    icon: <FaShieldAlt size={36} />,
    title: 'Privacy-Preserving Threat Detection',
    description:
      'Applying differential privacy and privacy-preserving machine learning techniques to ' +
      'cybersecurity problems, balancing formal mathematical guarantees with real-world utility.',
  },
  {
    icon: <FaLock size={36} />,
    title: 'Differential Privacy Theory',
    description:
      'Analyzing (ε, δ)-differential privacy mechanisms in the context of classification and anomaly ' +
      'detection tasks. Characterizing the privacy-utility tradeoff across varying privacy budgets and threat models.',
  },
  {
    icon: <FaBrain size={36} />,
    title: 'Adversarial Robustness',
    description:
      'Studying the robustness properties of privacy-preserving models under adversarial ' +
      'conditions and their implications for secure system design.',
  },
  {
    icon: <FaNetworkWired size={36} />,
    title: 'Applied Cryptography',
    description:
      'Designing and analyzing novel cryptographic constructions, including hybrid cryptosystems, ' +
      'trapdoor functions, and encryption schemes grounded in number theory and algebraic structures.',
  },
  {
    icon: <FaProjectDiagram size={36} />,
    title: 'Mathematical Modeling',
    description:
      'Applying analytical and computational models to complex systems — from cryptographic algorithm ' +
      'design to environmental transport dynamics — using formal mathematical frameworks.',
  },
  {
    icon: <FaBalanceScale size={36} />,
    title: 'Governance & Compliance Alignment',
    description:
      'Examining how formal privacy frameworks — differential privacy, federated learning — map to ' +
      'regulatory requirements such as GDPR and sector-specific data protection standards.',
  },
];

export default function Research() {
  return (
    <section id="research" className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">Research Focus</h2>
        </div>

        {/* Dissertation Overview — image + text */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16 space-y-12 lg:space-y-0 lg:space-x-16">
          {/* Image */}
          <div className="w-full lg:w-1/3 flex justify-center transition-transform hover:scale-105 duration-300">
            <div className="rounded-full overflow-hidden shadow-xl">
              <Image
                src="/research.webp"
                alt="Research overview"
                width={300}
                height={300}
                className="rounded-full"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-2/3 space-y-6">
            <p className="text-lg text-gray-300 text-justify leading-relaxed">
              My doctoral work investigates the application of{' '}
              <span className="text-accent">differential privacy</span> and{' '}
              <span className="text-accent">privacy-preserving machine learning</span> to
              problems in cybersecurity. The research is grounded in formal mathematical
              methods and evaluated against practical deployment constraints.
            </p>

            <p className="text-lg text-gray-300 text-justify leading-relaxed">
              A central question in this work is the tension between{' '}
              <span className="text-accent">formal privacy guarantees</span> and{' '}
              <span className="text-accent">operational utility</span>: when and how
              theoretical frameworks translate into systems that remain effective in real
              environments. This line of inquiry draws on probability theory, statistical
              learning, and algorithm design.
            </p>

            <p className="text-lg text-gray-300 text-justify leading-relaxed">
              Alongside my dissertation work, I maintain an active program in{' '}
              <span className="text-accent">applied cryptography</span>, with peer-reviewed
              publications on novel encryption schemes, trapdoor function design, and
              post-quantum approaches to cryptosystem construction. My published work also
              extends to{' '}
              <span className="text-accent">mathematical modeling</span>, including
              interdisciplinary contributions to environmental transport dynamics.
            </p>

            <p className="text-lg text-gray-300 text-justify leading-relaxed">
              This agenda also includes{' '}
              <span className="text-accent">adversarial robustness</span> and governance:
              evaluating how privacy-preserving systems hold up under attack and how formal
              privacy frameworks map to regulatory requirements such as{' '}
              <span className="text-accent">GDPR</span>.
            </p>
          </div>
        </div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area) => (
            <div
              key={area.title}
              className="flex flex-col items-start bg-gray-800 p-7 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 text-accent">{area.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-justify">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
