'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Function to scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-opacity-30 backdrop-blur-md bg-[#1a1a1a] text-gray-100 fixed w-full shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Favicon and Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center" onClick={closeMenu} scroll={false}>
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={100}
              height={100}
              className="mr-2 rounded-full"
              priority
              onClick={(e) => {e.preventDefault; scrollToTop(); closeMenu();}}/>
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-gray-100 text-2xl lg:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0`}
        >
          <Link href="#home" className="block py-2 lg:py-0 hover:text-blue-400" onClick={closeMenu}>
            Home
          </Link>
          <Link href="#about" className="block py-2 lg:py-0 hover:text-blue-400" onClick={closeMenu}>
            About
          </Link>
          <Link href="#research" className="block py-2 lg:py-0 hover:text-blue-400" onClick={closeMenu}>
            Research
          </Link>
          <Link href="#resume" className="block py-2 lg:py-0 hover:text-blue-400" onClick={closeMenu}>
            Resume
          </Link>
          <Link href="#contact" className="block py-2 lg:py-0 hover:text-blue-400" onClick={closeMenu}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
