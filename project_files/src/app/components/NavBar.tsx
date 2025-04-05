'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Research', id: 'research' },
    { name: 'Resume', id: 'resume' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]/30 backdrop-blur-md shadow-md text-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo Only */}
        <Link
          href="/"
          scroll={false}
          onClick={handleScrollToTop}
          className="flex items-center"
        >
          <Image
            src="/image_modified_high_contrast.webp"
            alt="Cyber Bee Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-2xl lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-blue-400 transition"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 bg-gray-900/90">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
