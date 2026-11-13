import { useEffect, useState } from 'react';

/** True when the reader has asked the system for less motion. Starts true, so nothing animates before it knows. */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
};
