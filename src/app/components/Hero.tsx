'use client';

import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaResearchgate, FaGraduationCap } from 'react-icons/fa';

export default function Hero() {
  const typedWordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = ['Researcher', 'Data Analyst', 'Engineer', 'Educator'];
    let wordIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 90;
    const erasingSpeed = 65;
    const delayBetweenWords = 1800;
    const el = typedWordsRef.current;

    function type() {
      if (!el) return;
      if (letterIndex < words[wordIndex].length) {
        el.textContent = words[wordIndex].substring(0, letterIndex + 1);
        letterIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(erase, delayBetweenWords);
      }
    }

    function erase() {
      if (!el) return;
      if (letterIndex > 0) {
        el.textContent = words[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, erasingSpeed);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
      }
    }

    type();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#1a1a1a] text-white"
    >
      {/* Name */}
      <h1 className="text-5xl sm:text-6xl font-bold mb-3 tracking-tight">
        Awnon Bhowmik
      </h1>

      {/* Typed role */}
      <h2 className="text-xl sm:text-2xl text-accent mt-1 min-h-[2rem]">
        <span ref={typedWordsRef}></span>
        <span className="animate-pulse">|</span>
      </h2>

      {/* Positioning line */}
      <p className="mt-4 text-gray-400 text-sm sm:text-base tracking-widest uppercase">
        Cybersecurity &nbsp;·&nbsp; Data Analytics &nbsp;·&nbsp; Software Engineering &nbsp;·&nbsp; Applied Mathematics
      </p>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-8 justify-center">
        <a
          href="https://linkedin.com/in/awnon-bhowmik"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-400 hover:text-accent transition-colors"
        >
          <FaLinkedin size={26} />
        </a>
        <a
          href="https://github.com/awnonbhowmik"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-400 hover:text-accent transition-colors"
        >
          <FaGithub size={26} />
        </a>
        <a
          href="https://www.researchgate.net/profile/Awnon-Bhowmik"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ResearchGate"
          className="text-gray-400 hover:text-accent transition-colors"
        >
          <FaResearchgate size={26} />
        </a>
        <a
          href="https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Scholar"
          className="text-gray-400 hover:text-accent transition-colors"
        >
          <FaGraduationCap size={26} />
        </a>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <button
          onClick={() => scrollTo('research')}
          className="bg-accent text-white px-6 py-2.5 rounded hover:bg-accent-dark transition-colors text-sm font-medium"
        >
          View Research
        </button>
        <a
          href="https://github.com/awnonbhowmik/Awnon-CV/releases/download/latest/main.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-accent text-accent px-6 py-2.5 rounded hover:bg-accent/10 transition-colors text-sm font-medium"
        >
          Download CV
        </a>
        <button
          onClick={() => scrollTo('contact')}
          className="border border-gray-600 text-gray-300 px-6 py-2.5 rounded bg-transparent hover:border-accent hover:text-accent transition-colors text-sm font-medium"
        >
          Contact
        </button>
      </div>
    </section>
  );
}
