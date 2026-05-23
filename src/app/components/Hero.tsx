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
    let timerId: ReturnType<typeof setTimeout>;

    function type() {
      if (!el) return;
      if (letterIndex < words[wordIndex].length) {
        el.textContent = words[wordIndex].substring(0, letterIndex + 1);
        letterIndex++;
        timerId = setTimeout(type, typingSpeed);
      } else {
        timerId = setTimeout(erase, delayBetweenWords);
      }
    }

    function erase() {
      if (!el) return;
      if (letterIndex > 0) {
        el.textContent = words[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        timerId = setTimeout(erase, erasingSpeed);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        timerId = setTimeout(type, typingSpeed);
      }
    }

    type();
    return () => clearTimeout(timerId);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#1a1a1a] text-white"
    >
      <div className="relative z-10 inline-flex items-center gap-2 border border-accent/35 bg-accent/10 text-accent px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] mb-5">
        Doctoral Researcher • Software Engineer
      </div>

      {/* Name */}
      <h1 className="relative z-10 text-5xl sm:text-6xl font-bold mb-3 tracking-tight">
        Awnon Bhowmik
      </h1>

      {/* Typed role */}
      <h2 className="relative z-10 text-xl sm:text-2xl text-accent mt-1 min-h-8">
        <span ref={typedWordsRef}></span>
        <span className="animate-pulse">|</span>
      </h2>

      {/* Positioning line */}
      <p className="relative z-10 mt-4 max-w-4xl text-gray-400 text-sm sm:text-base tracking-wide uppercase leading-relaxed px-2">
        Cybersecurity · Data Analytics · Software Engineering · Applied Mathematics
      </p>

      {/* Social Icons */}
      <div className="relative z-10 flex space-x-6 mt-8 justify-center">
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
      <div className="relative z-10 flex flex-wrap gap-4 mt-8 justify-center">
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
