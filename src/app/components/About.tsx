'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#1a1a1a] text-white">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">About Me</h2>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 space-y-12 lg:space-y-0 lg:space-x-16">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center transition-transform hover:scale-105 duration-300">
          <div className="rounded-full overflow-hidden shadow-xl">
            <Image
              src="/image_modified_high_contrast.webp"
              alt="Bee Logo"
              width={300}
              height={300}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        
        {/* Text Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am <strong className="text-blue-400">Awnon Bhowmik</strong>, a passionate researcher, educator, and developer. My primary expertise lies in <span className="text-blue-400">Information Security</span> and <span className="text-blue-400">Data Analytics</span>. I strive to push the boundaries of knowledge and innovation.
          </p>
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            With a decade of experience as a mathematics educator, I have instructed undergraduate students in a variety of mathematical topics, ranging from college algebra and precalculus to calculus and differential equations.
          </p>
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            As a programmer, I have developed software applications for <span className="text-blue-400">financial</span> and <span className="text-blue-400">healthcare services</span>. Currently working for the <span className="text-blue-400">United States Postal Service (USPS)</span>, I am responsible for analyzing, designing, and developing software solutions to meet the organization&apos;s needs.
          </p>
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am a first-year doctoral student specializing in <span className="text-blue-400">Cybersecurity and Information Assurance</span> at Colorado Technical University. My research focuses on integrating data analytics and information security to advance security measures and explore innovative solutions for protecting digital assets in an ever-evolving technological landscape.
          </p>
        </div>
      </div>
    </section>
  );
}
