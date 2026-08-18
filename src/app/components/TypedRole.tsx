'use client';

import { useEffect, useRef } from 'react';

const ROLES = ['Researcher', 'Data Analyst', 'Engineer', 'Mathematics Tutor'];

export default function TypedRole() {
  const typedWordsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const element = typedWordsRef.current;
    if (!element) return;

    let wordIndex = 0;
    let letterIndex = ROLES[0].length;
    let timerId: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = ROLES[wordIndex];
      if (letterIndex < word.length) {
        letterIndex += 1;
        element.textContent = word.substring(0, letterIndex);
        timerId = setTimeout(type, 90);
      } else {
        timerId = setTimeout(erase, 1800);
      }
    };

    const erase = () => {
      const word = ROLES[wordIndex];
      if (letterIndex > 0) {
        letterIndex -= 1;
        element.textContent = word.substring(0, letterIndex);
        timerId = setTimeout(erase, 65);
      } else {
        wordIndex = (wordIndex + 1) % ROLES.length;
        timerId = setTimeout(type, 90);
      }
    };

    timerId = setTimeout(erase, 1800);
    return () => clearTimeout(timerId);
  }, []);

  return <span ref={typedWordsRef}>Researcher</span>;
}
