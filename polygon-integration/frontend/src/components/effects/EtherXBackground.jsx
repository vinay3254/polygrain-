/**
 * EtherXBackground — Vanta.js GLOBE effect
 * Replicates the etherxinnovations.in interactive background.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import VantaGlobe from 'vanta/dist/vanta.globe.min';

export default function EtherXBackground() {
  const mountRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || vantaRef.current) return;

    // Vanta UMD module: check various export shapes
    const VANTA = typeof VantaGlobe === 'function'
      ? VantaGlobe
      : VantaGlobe?.default ?? VantaGlobe;

    if (typeof VANTA !== 'function') {
      console.warn('Vanta GLOBE not loaded correctly', VantaGlobe);
      return;
    }

    vantaRef.current = VANTA({
      el: mountRef.current,
      THREE,

      /* ── Colors matching etherxinnovations.in ── */
      color: 0xd4b571,           // gold wireframe
      color2: 0xd4b571,          // bright gold highlights
      backgroundColor: 0x090b0b, // match --color-bg

      /* ── Globe geometry ── */
      size: 1.20,
      points: 9,
      maxDistance: 22,
      spacing: 18,

      /* ── Interactivity ── */
      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      minHeight: 200,
      minWidth: 200,
      scale: 1.0,
      scaleMobile: 1.0,
    });

    return () => {
      vantaRef.current?.destroy();
      vantaRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,         /* behind all page content */
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
}
