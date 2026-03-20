'use client';

import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  // Function to scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-8">
      {/* Circular Back to Top Button */}
      <div className="text-center mb-4">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center mx-auto p-4 bg-accent text-white rounded-full shadow-lg hover:bg-accent-dark transition-colors"
          aria-label="Back to Top"
        >
          <FaArrowUp size={20} />
        </button>
      </div>

      {/* Footer Content */}
      <div className="text-center text-sm">
        <p className="mb-1">Made with Next.js & Tailwind CSS</p>
        <p className="text-gray-500">© 2026 Awnon Bhowmik. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
