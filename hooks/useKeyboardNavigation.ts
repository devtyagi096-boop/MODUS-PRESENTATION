import { useEffect, useRef } from 'react';

export function useKeyboardNavigation() {
  const isNavigating = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating.current) return;

      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length === 0) return;

      let currentIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = index;
        }
      });

      let targetIndex = -1;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        if (e.key === ' ') e.preventDefault();
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        targetIndex = Math.max(currentIndex - 1, 0);
      }

      if (targetIndex !== -1 && targetIndex !== currentIndex) {
        isNavigating.current = true;
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          isNavigating.current = false;
        }, 800);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}