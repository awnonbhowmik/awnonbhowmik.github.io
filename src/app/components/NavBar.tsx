'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', type: 'scroll' },
    { name: 'About', id: 'about', type: 'scroll' },
    { name: 'Research', id: 'research', type: 'scroll' },
    { name: 'Publications', id: '/publications', type: 'link' },
    { name: 'Resume', id: 'resume', type: 'scroll' },
    { name: 'Blog', id: '/blog', type: 'link' },
    { name: 'Contact', id: 'contact', type: 'scroll' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.type === 'link') {
      setIsOpen(false);
    } else {
      scrollToSection(link.id);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]/30 backdrop-blur-md shadow-md text-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <button onClick={handleScrollToTop} className="flex items-center">
          <Image
            src="/image_modified_high_contrast.webp"
            alt="Cyber Bee Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
        </button>

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
            link.type === 'link' ? (
              <Link
                key={link.name}
                href={link.id}
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="hover:text-accent transition"
              >
                {link.name}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 bg-gray-900/90">
          <div className="space-y-2">
            {navLinks.map((link) => (
              link.type === 'link' ? (
                <Link
                  key={link.name}
                  href={link.id}
                  className="block w-full text-left py-2 text-gray-300 hover:text-accent transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="block w-full text-left py-2 text-gray-300 hover:text-accent transition"
                >
                  {link.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
