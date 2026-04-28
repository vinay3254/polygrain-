# NexMeet / EtherX Meet — Animation System Design

**Date:** 2026-04-12  
**Scope:** Entire app (Landing, Login, Register, Join, Dashboard, Analytics, Recordings, Settings, Room)  
**Stack:** React 18 + Framer Motion v12 + Tailwind CSS + Vite  
**Animation source:** etherxinnovations.in motion language

---

## Overview

A three-layer animation system that applies a unified motion language across the entire EtherX Meet app while keeping the Room page (video conferencing iframe) fully subdued. All nine animation types requested — particles, scroll reveals, aurora gradient, text animations, hover glow, page transitions, custom cursor, staggered entrance, glassmorphism shimmer — are delivered through clear, maintainable layers.

---

## Architecture

### Layer 1 — CSS Ambient System (`src/styles/ambient.css`)

Zero JS overhead. Handles all background/atmospheric effects.

| Effect | Implementation |
|---|---|
| Aurora gradient | `conic-gradient` mesh, 12s infinite alternate ease-in-out, opacity 0.15, 80px blur |
| Particle field | 12 CSS pseudo-elements via `.particle:nth-child()`, `float-y` keyframe, 6–20s staggered duration |
| Glassmorphism shimmer | `::after` sweep with white→transparent gradient, triggered on `:hover`, 0.6s ease |
| Custom cursor | CSS-positioned dot (6px) + ring (28px), purple (#9333ea), no-cursor on Room + mobile |

Aurora colors: `#9333ea → #ec4899 → #312e81` (matches existing app palette).

### Layer 2 — Framer Motion Variants (`src/utils/animationVariants.js`)

Single source of truth for all interactive animation values. Import and reuse across every page.

```js
// Key presets
fadeUp:          { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, duration: 0.5, ease: 'easeOut' }
fadeIn:          { initial: { opacity: 0 },         animate: { opacity: 1 },       duration: 0.4 }
staggerContainer:{ transition: { staggerChildren: 0.08 } }
staggerChild:    { initial: { opacity: 0, y: 16 },  animate: { opacity: 1, y: 0 }, ease: 'easeOut' }
pageTransition:  { initial: { opacity: 0, y: -8 },  animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, duration: 0.25 }
hoverLift:       { whileHover: { scale: 1.02, boxShadow: '0 8px 30px rgba(147,51,234,0.3)' }, transition: { duration: 0.2 } }
```

### Layer 3 — AnimationProvider Context (`src/context/AnimationContext.jsx`)

Global control layer.

- Reads `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount
- Exposes `isAnimated: boolean` and `isRoom: boolean` via React context
- All Framer Motion variants check `isAnimated` — if false, skip all motion
- `App.jsx` wraps routes in `AnimatePresence` for page transitions
- Room page receives `isRoom: true` → disables ambient CSS classes + cursor + all variants

---

## New Files

| File | Purpose |
|---|---|
| `src/styles/ambient.css` | Aurora, particles, shimmer, cursor CSS |
| `src/utils/animationVariants.js` | All Framer Motion variant presets |
| `src/context/AnimationContext.jsx` | AnimationProvider + useAnimation hook |
| `src/components/layout/AnimatedPage.jsx` | Wrapper component — applies pageTransition + ambient bg |
| `src/components/layout/CustomCursor.jsx` | Cursor dot + ring, mousemove listener |

---

## Modified Files

| File | Change |
|---|---|
| `src/App.jsx` | Add `AnimatePresence` around routes, mount `CustomCursor`, wrap `AnimationProvider` |
| `src/pages/Landing.jsx` | Aurora bg, particle field, typewriter headline, scroll reveals, stagger sections |
| `src/pages/Login.jsx` | Aurora bg, staggered form entrance, hover glow inputs, shimmer card |
| `src/pages/Register.jsx` | Same treatment as Login |
| `src/pages/Join.jsx` | Aurora bg, stagger entrance, hover lift on join button |
| `src/pages/Dashboard.jsx` | Subtle aurora, scroll reveals on cards, stagger meeting list, hover lift |
| `src/pages/Analytics.jsx` | Scroll reveals, stagger charts/cards, hover lift |
| `src/pages/Recordings.jsx` | Scroll reveals, stagger table rows, hover lift |
| `src/pages/Settings.jsx` | Stagger sections, hover lift on inputs |
| `src/pages/Room.jsx` | Logo fadeIn only (0.4s), no bg effects, cursor disabled |
| `src/styles/ambient.css` | New file (imported in main.jsx or App.jsx) |
| `src/components/ui/animations.css` | Extend with shimmer class |

---

## Animation Per Page

### Full Treatment (Landing, Login, Register, Join)
- Aurora gradient background (full opacity 0.15)
- Particle field active
- Custom cursor active
- Staggered entrance on page load (elements cascade in at 0.08s intervals)
- Page transition (fade + y slide, 0.25s) on route change
- Text: typewriter on Landing headline; fadeUp on subheadlines
- Hover: glow lift on all buttons + cards; shimmer sweep on glass cards

### Medium Treatment (Dashboard, Analytics, Recordings, Settings)
- Subtle aurora at 50% opacity (0.075) — ambient atmosphere without distraction
- No particle field
- Custom cursor active
- Scroll-triggered reveals (fadeUp, whileInView, once: true, threshold 0.1)
- Stagger on list/card grids
- Hover lift on cards and buttons

### Subdued (Room)
- Logo fades in once (fadeIn, 0.4s) on mount
- No aurora, no particles, no cursor, no hover effects
- iframe left completely untouched

---

## Custom Cursor Spec

```
Dot:  6px diameter · #9333ea · position: fixed, pointer-events: none · follows mouse instantly
Ring: 28px diameter · border: 1.5px solid rgba(147,51,234,0.5) · lags 80ms behind via lerp
Hover state: ring expands to 40px + box-shadow glow · triggered by [data-cursor-hover] attribute
Disabled: Room page (isRoom) · touch devices (matchMedia pointer: coarse)
```

Component: `CustomCursor.jsx` — uses `useEffect` for mousemove listener + `requestAnimationFrame` for ring lerp. Mounted once in `App.jsx`.

---

## Text Animation Spec

- **Landing hero h1:** Typewriter effect — the main hero headline split into characters, revealed one by one via Framer Motion `staggerChildren: 0.03`
- **Landing subheadline:** `fadeUp` with 0.3s delay after headline completes
- **CTA buttons:** `fadeIn` with 0.5s delay
- **All other pages:** `staggerChild` fadeUp on page load, no typewriter

---

## Accessibility

- `prefers-reduced-motion: reduce` → `isAnimated = false` → all Framer Motion variants set `duration: 0`, aurora/particles hidden via CSS `@media (prefers-reduced-motion: reduce)`
- All animations use `once: true` in scroll reveals (no re-triggering)
- Cursor falls back to default on touch devices

---

## Performance Notes

- Aurora and particles are CSS-only — no JS animation loop, no layout thrash
- Framer Motion uses GPU-accelerated `transform` and `opacity` only
- Particle count capped at 12 — safe for mid-range devices
- Room page: zero animation overhead (no Framer wrappers, no CSS animation classes)
- `will-change: transform` applied only to cursor ring (single element)
