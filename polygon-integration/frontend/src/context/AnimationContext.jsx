// frontend/src/context/AnimationContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AnimationContext = createContext({ isAnimated: true, isRoom: false });

/**
 * Wrap the app with this provider.
 * - isAnimated: false when user prefers reduced motion
 * - isRoom: true when Room page is active — consumers opt out of effects
 */
export function AnimationProvider({ children }) {
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsAnimated(!mq.matches);
    const handler = (e) => setIsAnimated(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <AnimationContext.Provider value={{ isAnimated }}>
      {children}
    </AnimationContext.Provider>
  );
}

/** Use inside any component to read animation state. */
export function useAnimation() {
  return useContext(AnimationContext);
}
