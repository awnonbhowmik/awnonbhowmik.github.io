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
        <div className="w-full lg:w-2/3 flex justify-center transition-transform hover:scale-105">
          <div className="rounded-full overflow-hidden shadow-lg">
            {/* Use the correct path for your image */}
            <Image
              src="./image_modified_high_contrast.webp" // Path relative to the public folder
              alt="Bee Logo"
              width={300}
              height={300}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        
        {/* Text Section */}
        <div className="w-full lg:w-3/4 space-y-6">
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am Awnon Bhowmik, a passionate researcher, educator, and developer. My primary expertise lies in Information Security and Data Analytics. I strive to push the boundaries of knowledge and innovation.
          </p>
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            With a decade of experience as a mathematics educator, I have instructed undergraduate students in a variety of mathematical topics, ranging from college algebra and precalculus to calculus and differential equations.
          </p>
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            As a programmer, I have developed software applications for financial & healthcare services. Currently working for the United States Postal Service (USPS), I am responsible for analyzing, designing, and developing software solutions to meet the organization's needs.
          </p>
            <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am a first-year doctoral student specializing in Cybersecurity and Information Assurance at Colorado Technical University. My research focuses on integrating data analytics and information security to advance security measures and explore innovative solutions for protecting digital assets in an ever-evolving technological landscape.
            </p>
        </div>
      </div>
    </section>
  );
}
