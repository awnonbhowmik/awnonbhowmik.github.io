import { FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 px-4 py-8">
      {/* Circular Back to Top Button */}
      <div className="text-center mb-4">
        <a
          href="#top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-colors"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp size={16} />
        </a>
      </div>

      {/* Footer Content */}
      <div className="text-center text-sm">
        <p className="mb-1">Made with Next.js</p>
        <p className="text-gray-500">© 2026 Awnon Bhowmik. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
