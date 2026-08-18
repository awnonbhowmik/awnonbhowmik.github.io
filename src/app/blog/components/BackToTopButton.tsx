import { FaArrowUp } from 'react-icons/fa';

export default function BackToTopButton() {
    return (
        <a
            href="#top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-colors"
            aria-label="Back to top"
            title="Back to top"
        >
            <FaArrowUp size={16} />
        </a>
    );
}
