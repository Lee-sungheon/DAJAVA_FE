import { useState, useCallback, useEffect } from 'react';

import { debounce } from '@dajava/utils/event';

interface Section {
  id: string;
}

export const useVisibleSection = (sections: Section[]) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  const calculateVisibility = useCallback(() => {
    let maxVisibleRatio = 0;
    let mostVisibleSection = '';

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementHeight = rect.height;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / elementHeight;

      if (visibilityRatio > maxVisibleRatio) {
        maxVisibleRatio = visibilityRatio;
        mostVisibleSection = id;
      }
    });

    if (mostVisibleSection && maxVisibleRatio > 0.3) {
      setActiveSection(mostVisibleSection);
    }
  }, [sections]);

  useEffect(() => {
    const debouncedScroll = debounce(() => {
      requestAnimationFrame(calculateVisibility);
    }, 100);

    window.addEventListener('scroll', debouncedScroll);
    calculateVisibility();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [calculateVisibility]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  }, []);

  return {
    activeSection,
    scrollToSection,
  };
};
