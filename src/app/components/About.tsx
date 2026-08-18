import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#1a1a1a] text-white">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white">About</h2>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between px-6 lg:px-16 space-y-12 lg:space-y-0 lg:space-x-16">

        {/* Image */}
        <div className="w-full lg:w-1/3 flex justify-center lg:sticky lg:top-24 transition-transform hover:scale-105 duration-300">
          <div className="rounded-full overflow-hidden shadow-xl">
            <Image
              src="/image_modified_high_contrast.webp"
              alt="Awnon Bhowmik"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-2/3 space-y-6">
          <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am <strong className="text-white">Awnon Bhowmik</strong>, a doctoral researcher
            and software engineer focused on{' '}
            <span className="text-accent">cybersecurity</span>,{' '}
            <span className="text-accent">privacy-preserving systems</span>, and{' '}
            <span className="text-accent">applied mathematical modeling</span>.
          </p>

          <p className="text-lg text-justify leading-relaxed text-gray-300">
            I am pursuing a{' '}
            <strong className="text-white">
              Doctor of Computer Science, specializing in Cybersecurity and Information Assurance
            </strong>
            , at Colorado Technical University.
          </p>

          <p className="text-lg text-justify leading-relaxed text-gray-300">
            Professionally, I work as a{' '}
            <strong className="text-white">Computer Systems Analyst and Programmer</strong> at
            the <span className="text-accent">United States Postal Service</span>, where I
            contribute to the design, development, and modernization of enterprise software
            systems. Prior roles included software development for financial and healthcare
            services, and nearly a decade of undergraduate mathematics instruction at{' '}
            <span className="text-accent">CUNY BMCC</span>, where I taught courses from college
            algebra through differential equations.
          </p>

          <p className="text-lg text-justify leading-relaxed text-gray-300">
            My published research spans{' '}
            <span className="text-accent">applied cryptography</span> — including novel
            encryption schemes, trapdoor function design, and post-quantum approaches — as well
            as interdisciplinary work on{' '}
            <span className="text-accent">environmental modeling</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
