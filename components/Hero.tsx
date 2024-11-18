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

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Awnon Bhowmik</h1>
        <h2 className="text-2xl mt-4 text-[#149ddd]">A <span id="typed-words"></span></h2>
        
        {/* Social Media Icons */}
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
        <div className="flex space-x-6 mt-8 justify-center">
        <a
            href="#contact"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
            Get In Touch
            </a>
            <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
            Download CV
            </a>
            </div>
      </div>
    </section>
  );
}
