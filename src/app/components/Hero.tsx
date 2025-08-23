'use client';

import { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaResearchgate, FaGraduationCap } from 'react-icons/fa';

export default function Hero() {
  useEffect(() => {
    const words = ["Researcher", "Mentor", "Developer"];
    let wordIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenWords = 1000;
    const typedWordsElement = document.getElementById("typed-words");

    function type() {
      if (typedWordsElement) {
        if (letterIndex < words[wordIndex].length) {
          typedWordsElement.textContent = words[wordIndex].substring(0, letterIndex + 1);
          letterIndex++;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(erase, delayBetweenWords);
        }
      }
    }

    function erase() {
      if (typedWordsElement) {
        if (letterIndex > 0) {
          typedWordsElement.textContent = words[wordIndex].substring(0, letterIndex - 1);
          letterIndex--;
          setTimeout(erase, erasingSpeed);
        } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, typingSpeed);
        }
      }
    }

    type();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#1a1a1a] text-white"
    >
      {/* Name */}
      <h1 className="text-6xl font-bold mb-4">Awnon Bhowmik</h1>

      {/* Animated Typing */}
      <h2 className="text-xl sm:text-2xl mt-2 text-[#149ddd]">
        A <span id="typed-words"></span>
      </h2>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-8 justify-center">
        <a
          href="https://linkedin.com/in/awnon-bhowmik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://github.com/awnonbhowmik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.researchgate.net/profile/Awnon-Bhowmik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          <FaResearchgate size={30} />
        </a>
        <a
          href="https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
        >
          <FaGraduationCap size={30} />
        </a>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <button
          onClick={scrollToContact}
          className="bg-[#149ddd] text-white px-5 py-2 rounded hover:bg-[#117bb8] transition-colors"
        >
          Get In Touch
        </button>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#149ddd] text-[#149ddd] px-5 py-2 rounded bg-transparent hover:bg-[#149ddd]/10 transition-colors"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
