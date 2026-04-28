// frontend/src/utils/animationVariants.js
// ============================================================
// LAYER 2 — Framer Motion variant presets.
// Single source of truth. Import from here everywhere.
// All durations in seconds (Framer Motion default unit).
// ============================================================

/** Fade + slide up. Use for scroll reveals and page content. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** Simple fade. Use for overlays, images. */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

/** Stagger container — apply to a parent wrapping staggerChild elements. */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Stagger child — apply to each child inside a staggerContainer. */
export const staggerChild = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/**
 * Page transition — used by AnimatedPage wrapper.
 * AnimatePresence handles the exit automatically.
 */
export const pageTransition = {
  initial:   { opacity: 0, y: -8 },
  animate:   { opacity: 1, y: 0 },
  exit:      { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

/**
 * Hover lift — spread onto a motion element directly.
 * Usage: <motion.div {...hoverLift}>
 */
export const hoverLift = {
  whileHover: {
    scale: 1.02,
    boxShadow: '0 8px 30px rgba(147,51,234,0.28)',
    transition: { duration: 0.2 },
  },
};

/**
 * Glow border pulse — for buttons and CTAs.
 * Usage: <motion.button {...glowPulse}>
 */
export const glowPulse = {
  whileHover: {
    boxShadow: '0 0 20px rgba(147,51,234,0.5), 0 0 40px rgba(147,51,234,0.2)',
    transition: { duration: 0.2 },
  },
};
