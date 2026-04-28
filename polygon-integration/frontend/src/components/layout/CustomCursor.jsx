// frontend/src/components/layout/CustomCursor.jsx
import { useEffect, useRef } from 'react';
import { useAnimation } from '../../context/AnimationContext';

/**
 * Renders a custom cursor (dot + lagging ring).
 * - Disabled automatically on touch devices.
 * - Disabled on Room page (caller must not mount this on Room).
 * - Adds/removes .cursor-custom on <body> so ambient.css hides the default cursor.
 */
export default function CustomCursor() {
  const { isAnimated } = useAnimation();
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  // Ring position with lerp lag
  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!isAnimated) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('cursor-custom');

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      dot.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    // Check if hovering over an interactive element
    const onEnter = (e) => {
      const el = e.target.closest('a, button, input, textarea, select, [data-cursor-hover]');
      if (el) ring.classList.add('is-hovering');
    };
    const onLeave = () => ring.classList.remove('is-hovering');

    // Animate ring with lerp (80ms effective lag)
    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);
      ring.style.transform = `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      rafId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('cursor-custom');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isAnimated]);

  // Touch devices: render nothing
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
