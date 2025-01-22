'use client';

import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  // Function to scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-6">
      {/* Back to Top Button */}
      <div className="text-center mb-4">
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center mx-auto space-x-2 text-blue-400 hover:text-blue-500 transition-colors"
        >
          <FaArrowUp />
          <span>Back to Top</span>
          <FaArrowUp />
        </button>
      </div>

      {/* Footer Content */}
      <div className="text-center">
        <p className="mb-2">Made in NextJS</p>
        <p className="text-gray-500">© 2025 Awnon Bhowmik. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
