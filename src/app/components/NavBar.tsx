'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaFlask,
  FaCode,
  FaBook,
  FaFileAlt,
  FaPenNib,
  FaEnvelope,
} from 'react-icons/fa';

type NavLink = {
  name: string;
  id: string;
  type: 'scroll' | 'link';
  icon: React.ReactNode;
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navLinks: NavLink[] = [
    { name: 'Home', id: 'home', type: 'scroll', icon: <FaHome size={15} /> },
    { name: 'About', id: 'about', type: 'scroll', icon: <FaUser size={15} /> },
    { name: 'Research', id: 'research', type: 'scroll', icon: <FaFlask size={15} /> },
    { name: 'Projects', id: 'projects', type: 'scroll', icon: <FaCode size={15} /> },
    { name: 'Resume', id: 'resume', type: 'scroll', icon: <FaFileAlt size={15} /> },
    { name: 'Publications', id: '/publications', type: 'link', icon: <FaBook size={15} /> },
    { name: 'Blog', id: '/blog', type: 'link', icon: <FaPenNib size={15} /> },
    { name: 'Contact', id: 'contact', type: 'scroll', icon: <FaEnvelope size={15} /> },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (link: NavLink) => {
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
        <button onClick={handleScrollToTop} className="flex items-center" aria-label="Scroll to top" title="Home">
          <Image
            src="/image_modified_high_contrast.webp"
            alt="Awnon Bhowmik"
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

        {/* Desktop Nav (icon-first) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {navLinks.map((link) => (
            link.type === 'link' ? (
              <Link
                key={link.name}
                href={link.id}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${pathname === link.id ? 'border-accent bg-accent/10 text-accent' : 'border-gray-600 text-gray-300 hover:border-accent hover:text-accent'}`}
                onClick={() => setIsOpen(false)}
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </Link>
            ) : !isHome ? (
              <Link
                key={link.name}
                href={`/#${link.id}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 text-gray-300 hover:border-accent hover:text-accent transition"
                onClick={() => setIsOpen(false)}
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </Link>
            ) : (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 text-gray-300 hover:border-accent hover:text-accent transition"
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 bg-[#1a1a1a]/90">
          <div className="space-y-2">
            {navLinks.map((link) => (
              link.type === 'link' ? (
                <Link
                  key={link.name}
                  href={link.id}
                  className={`block w-full text-left py-2 transition ${pathname === link.id ? 'text-accent font-semibold' : 'text-gray-300 hover:text-accent'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : !isHome ? (
                <Link
                  key={link.name}
                  href={`/#${link.id}`}
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
