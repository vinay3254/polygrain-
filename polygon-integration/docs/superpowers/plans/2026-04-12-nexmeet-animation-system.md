# NexMeet Animation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a three-layer animation system (CSS ambient + Framer Motion variants + AnimationProvider) across the entire EtherX Meet app, matching the etherxinnovations.in motion language.

**Architecture:** Layer 1 — `ambient.css` handles all background/atmospheric effects with zero JS overhead (aurora gradient, shimmer). Layer 2 — `animationVariants.js` is a single source of truth for all Framer Motion presets. Layer 3 — `AnimationContext` provides global on/off control (prefers-reduced-motion) and Room page isolation. The existing `ParticleBackground.jsx` canvas component is reused for the particle field on full-treatment pages.

**Tech Stack:** React 18, Framer Motion v12 (already installed), Tailwind CSS, Vite. No new dependencies.

---

## File Map

### New Files
| Path | Purpose |
|---|---|
| `frontend/src/styles/ambient.css` | Aurora gradient, shimmer sweep class, cursor CSS |
| `frontend/src/utils/animationVariants.js` | All Framer Motion variant presets |
| `frontend/src/context/AnimationContext.jsx` | `AnimationProvider` + `useAnimation` hook |
| `frontend/src/components/layout/AnimatedPage.jsx` | Page wrapper: applies pageTransition variant |
| `frontend/src/components/layout/CustomCursor.jsx` | Cursor dot + lagging ring, disabled on Room/touch |

### Modified Files
| Path | Change |
|---|---|
| `frontend/src/main.jsx` | Import `ambient.css` |
| `frontend/src/App.jsx` | Add `AnimationProvider`, `AnimatePresence` on routes, mount `CustomCursor` |
| `frontend/src/pages/Login.jsx` | Aurora bg + particle field + staggered entrance + shimmer card |
| `frontend/src/pages/Register.jsx` | Same treatment as Login |
| `frontend/src/pages/Join.jsx` | Aurora bg + stagger entrance + hover lift |
| `frontend/src/pages/Landing.jsx` | Aurora bg (subtle) + staggered sections + hover lift |
| `frontend/src/pages/Dashboard.jsx` | Subtle aurora + scroll reveals + stagger cards |
| `frontend/src/pages/Analytics.jsx` | Scroll reveals + stagger |
| `frontend/src/pages/Recordings.jsx` | Scroll reveals + stagger |
| `frontend/src/pages/Settings.jsx` | Stagger sections + hover lift |
| `frontend/src/pages/Room.jsx` | Logo single fadeIn only — nothing else |

---

## Task 1: CSS Ambient System

**Files:**
- Create: `frontend/src/styles/ambient.css`

- [ ] **Step 1: Create ambient.css**

```css
/* frontend/src/styles/ambient.css */
/* ============================================================
   LAYER 1 — CSS Ambient System
   Aurora gradient, glassmorphism shimmer, custom cursor
   All effects are CSS-only (zero JS animation loop overhead).
   ============================================================ */

/* ── Aurora background ─────────────────────────────────────── */
@keyframes aurora-shift {
  0%   { opacity: 0.12; transform: scale(1)    rotate(0deg);   }
  33%  { opacity: 0.18; transform: scale(1.05) rotate(2deg);   }
  66%  { opacity: 0.14; transform: scale(0.98) rotate(-1deg);  }
  100% { opacity: 0.12; transform: scale(1)    rotate(0deg);   }
}

.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.aurora-bg::before,
.aurora-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: aurora-shift 12s ease-in-out infinite alternate;
}

.aurora-bg::before {
  width: 60vw;
  height: 60vw;
  top: -20%;
  left: -10%;
  background: radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%);
}

.aurora-bg::after {
  width: 50vw;
  height: 50vw;
  bottom: -15%;
  right: -5%;
  background: radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%);
  animation-delay: -6s;
  animation-duration: 15s;
}

/* Medium treatment — half opacity aurora used on Dashboard etc. */
.aurora-bg.aurora-subtle::before { opacity: 0.06; }
.aurora-bg.aurora-subtle::after  { opacity: 0.06; }

/* ── Glassmorphism shimmer sweep ────────────────────────────── */
.shimmer-card {
  position: relative;
  overflow: hidden;
}

.shimmer-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 100%
  );
  transform: skewX(-20deg);
  transition: left 0.6s ease;
  pointer-events: none;
}

.shimmer-card:hover::after {
  left: 150%;
}

/* ── Custom cursor ──────────────────────────────────────────── */
/* Hide default cursor on non-touch, non-Room pages */
.cursor-custom * {
  cursor: none !important;
}

#cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9333ea;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.15s, height 0.15s, background 0.15s;
  will-change: transform;
}

#cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid rgba(147, 51, 234, 0.55);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s;
  will-change: transform;
}

/* Hover expansion — apply [data-cursor-hover] to interactive elements */
.cursor-custom [data-cursor-hover] ~ #cursor-ring,
#cursor-ring.is-hovering {
  width: 40px;
  height: 40px;
  border-color: rgba(147, 51, 234, 0.8);
  box-shadow: 0 0 12px rgba(147, 51, 234, 0.4);
}

/* Accessibility: respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .aurora-bg::before,
  .aurora-bg::after {
    animation: none;
    opacity: 0.08;
  }
  .shimmer-card::after {
    display: none;
  }
  #cursor-dot,
  #cursor-ring {
    display: none;
  }
}
```

- [ ] **Step 2: Import ambient.css in main.jsx**

Open `frontend/src/main.jsx`. Add the import after `import './index.css'`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import App from './App.jsx'
import './index.css'
import './styles/ambient.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 3: Verify in browser**

Run `cd frontend && npm run dev`. Navigate to `/login`. You should see no visible change yet — ambient.css is loaded but no elements have the `.aurora-bg` class applied. No console errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/styles/ambient.css frontend/src/main.jsx
git commit -m "feat(anim): add CSS ambient system — aurora, shimmer, cursor styles"
```

---

## Task 2: Framer Motion Variant Presets

**Files:**
- Create: `frontend/src/utils/animationVariants.js`

- [ ] **Step 1: Create animationVariants.js**

```js
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
```

- [ ] **Step 2: Verify the file is importable**

In a terminal (no server restart needed):

```bash
node -e "import('./frontend/src/utils/animationVariants.js').then(m => console.log(Object.keys(m)))"
```

Expected output: `[ 'fadeUp', 'fadeIn', 'staggerContainer', 'staggerChild', 'pageTransition', 'hoverLift', 'glowPulse' ]`

If that doesn't work in your shell (module type issues), just move on — Vite handles ESM imports fine in dev.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/utils/animationVariants.js
git commit -m "feat(anim): add Framer Motion variant presets"
```

---

## Task 3: AnimationContext, AnimatedPage, CustomCursor

**Files:**
- Create: `frontend/src/context/AnimationContext.jsx`
- Create: `frontend/src/components/layout/AnimatedPage.jsx`
- Create: `frontend/src/components/layout/CustomCursor.jsx`

- [ ] **Step 1: Create AnimationContext.jsx**

```jsx
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
```

- [ ] **Step 2: Create AnimatedPage.jsx**

```jsx
// frontend/src/components/layout/AnimatedPage.jsx
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animationVariants';
import { useAnimation } from '../../context/AnimationContext';

/**
 * Wrap each page's root element with this to get page transitions.
 * Usage:
 *   export default function MyPage() {
 *     return <AnimatedPage><div>...</div></AnimatedPage>
 *   }
 */
export default function AnimatedPage({ children, className = '', style = {} }) {
  const { isAnimated } = useAnimation();

  if (!isAnimated) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className={className}
      style={{ width: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create CustomCursor.jsx**

```jsx
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
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/context/AnimationContext.jsx \
        frontend/src/components/layout/AnimatedPage.jsx \
        frontend/src/components/layout/CustomCursor.jsx
git commit -m "feat(anim): add AnimationContext, AnimatedPage wrapper, CustomCursor"
```

---

## Task 4: Wire Up App.jsx

**Files:**
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx**

The `useLocation` hook must be called inside `<BrowserRouter>`, so routes move to an inner `AppRoutes` component. `AnimationProvider` wraps everything. `AnimatePresence` (keyed by pathname) wraps routes.

```jsx
// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from './context/AnimationContext';
import { MeetingProvider } from './context/MeetingContext';
import { UserProvider } from './context/UserContext';
import { UIProvider } from './context/UIContext';
import CustomCursor from './components/layout/CustomCursor';
import Landing from './pages/Landing';
import Join from './pages/Join';
import Room from './pages/Room';
import Dashboard from './pages/Dashboard';
import Recordings from './pages/Recordings';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import CommandPalette from './components/layout/CommandPalette';
import ToastSystem from './components/layout/ToastSystem';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ROUTES } from './utils/constants';

/** Inner component so useLocation can be called inside BrowserRouter. */
function AppRoutes() {
  const location = useLocation();
  const isRoom = location.pathname.startsWith('/room');

  return (
    <>
      {/* Custom cursor — not shown on Room page or touch devices */}
      {!isRoom && <CustomCursor />}

      <CommandPalette />
      <ToastSystem />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path={ROUTES.LOGIN}         element={<Login />} />
          <Route path={ROUTES.REGISTER}      element={<Register />} />
          <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.HOME}        element={<Landing />} />
            <Route path={ROUTES.JOIN}        element={<Join />} />
            <Route path={ROUTES.ROOM}        element={<Room />} />
            <Route path={ROUTES.DASHBOARD}   element={<Dashboard />} />
            <Route path={ROUTES.RECORDINGS}  element={<Recordings />} />
            <Route path={ROUTES.ANALYTICS}   element={<Analytics />} />
            <Route path={ROUTES.SETTINGS}    element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimationProvider>
        <UserProvider>
          <UIProvider>
            <MeetingProvider>
              <AppRoutes />
            </MeetingProvider>
          </UIProvider>
        </UserProvider>
      </AnimationProvider>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 2: Verify app still loads**

`npm run dev` → navigate to `/login`. App should load without errors. No visual change yet (Login not yet updated). Check console: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/App.jsx
git commit -m "feat(anim): wire AnimationProvider, AnimatePresence, CustomCursor in App.jsx"
```

---

## Task 5: Animate Login & Register

**Files:**
- Modify: `frontend/src/pages/Login.jsx`
- Modify: `frontend/src/pages/Register.jsx`

Login uses inline JS styles. We keep all existing logic and style objects untouched — we only add:
1. An `.aurora-bg` div behind the content
2. A `ParticleBackground` canvas
3. `motion.div` wrappers for the stagger entrance
4. `.shimmer-card` class on the card div (needs `className` added alongside `style`)

- [ ] **Step 1: Update Login.jsx — add aurora + particles + stagger + shimmer**

Replace the entire file content:

```jsx
// frontend/src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import etherxLogo from '../assets/etherx_transparent.png'
import ParticleBackground from '../components/effects/ParticleBackground'
import AnimatedPage from '../components/layout/AnimatedPage'
import { staggerContainer, staggerChild, hoverLift, glowPulse } from '../utils/animationVariants'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      if (res.data.success) {
        localStorage.setItem('nexmeet_token', res.data.data.token)
        localStorage.setItem('nexmeet_user', JSON.stringify(res.data.data.user))
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Cannot connect to server. Make sure backend is running.')
    }
    setLoading(false)
  }

  return (
    <AnimatedPage>
      <div style={styles.page}>
        {/* Ambient layers */}
        <div className="aurora-bg" aria-hidden="true" />
        <ParticleBackground />

        {/* Navbar */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={styles.nav}
        >
          <motion.div variants={staggerChild} style={styles.logo}>
            <img src={etherxLogo} alt="EtherX Meet" style={styles.logoImage} />
          </motion.div>
          <motion.a variants={staggerChild} href="#" style={styles.helpLink}>Help</motion.a>
        </motion.nav>

        {/* Main */}
        <div style={styles.main}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="shimmer-card"
            style={{ ...styles.card, position: 'relative', zIndex: 1 }}
          >
            <motion.h1 variants={staggerChild} style={styles.title}>Sign in</motion.h1>
            <motion.p variants={staggerChild} style={styles.subtitle}>
              Use your EtherXMeet account to continue
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.errorBox}
              >
                {error}
              </motion.div>
            )}

            <motion.form variants={staggerChild} onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={styles.input}
                  data-cursor-hover
                  onFocus={e => e.target.style.borderColor = '#D4B571'}
                  onBlur={e => e.target.style.borderColor = '#6F5115'}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={styles.input}
                  data-cursor-hover
                  onFocus={e => e.target.style.borderColor = '#D4B571'}
                  onBlur={e => e.target.style.borderColor = '#6F5115'}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
                data-cursor-hover
                {...glowPulse}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </motion.form>

            <motion.div variants={staggerChild} style={styles.divider}>
              <div style={styles.divLine} />
              <span style={styles.divText}>or</span>
              <div style={styles.divLine} />
            </motion.div>

            <motion.button
              type="button"
              style={styles.btnGoogle}
              data-cursor-hover
              {...hoverLift}
              onClick={() => { window.location.href = 'http://localhost:5000/api/auth/google' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </motion.button>

            <motion.p variants={staggerChild} style={styles.bottomText}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>Create one</Link>
            </motion.p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={styles.footer}
        >
          <a href="#" style={styles.footerLink}>Privacy</a>
          <a href="#" style={styles.footerLink}>Terms</a>
          <a href="#" style={styles.footerLink}>Help</a>
        </motion.footer>
      </div>
    </AnimatedPage>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#090B0B',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto, sans-serif',
    color: '#e8eaed',
    position: 'relative',
  },
  nav: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '0 24px',
    minHeight: '56px',
    overflow: 'hidden',
    background: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  logo: { display: 'flex', alignItems: 'center', margin: 0, padding: 0 },
  logoImage: { height: '150px', width: 'auto', display: 'block', margin: 0, padding: 0, marginTop: '-36px' },
  helpLink: { fontSize: '14px', color: '#D4B571', textDecoration: 'none', padding: '8px 12px', borderRadius: '4px' },
  main: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 24px', position: 'relative', zIndex: 1 },
  card: {
    background: '#090B0B',
    border: '1px solid #6F5115',
    borderRadius: '8px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 24px rgba(111, 81, 21, 0.25)',
  },
  title: { fontSize: '24px', fontWeight: '400', color: 'rgb(232, 234, 237)', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: '#D4B571', marginBottom: '28px', lineHeight: '1.5' },
  errorBox: {
    background: 'rgba(234,67,53,0.1)',
    border: '1px solid rgba(234,67,53,0.3)',
    color: '#f28b82',
    padding: '10px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', color: '#D4B571', letterSpacing: '0.3px' },
  input: {
    width: '100%',
    background: '#090B0B',
    border: '1px solid #6F5115',
    color: '#e8eaed',
    padding: '12px 14px',
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  },
  btnPrimary: {
    width: '100%',
    background: '#D4B571',
    border: 'none',
    color: '#090B0B',
    padding: '12px',
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '4px',
  },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' },
  divLine: { flex: 1, height: '1px', background: '#6F5115' },
  divText: { fontSize: '12px', color: '#D4B571' },
  btnGoogle: {
    width: '100%',
    background: 'transparent',
    border: '1px solid #6F5115',
    color: '#D4B571',
    padding: '11px 16px',
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  bottomText: { fontSize: '13px', color: '#D4B571', marginTop: '20px', textAlign: 'center' },
  link: { color: '#D4B571', textDecoration: 'none' },
  footer: { display: 'flex', gap: '20px', justifyContent: 'center', padding: '8px 24px', flexWrap: 'wrap', position: 'relative', zIndex: 1 },
  footerLink: { fontSize: '12px', color: '#6F5115', textDecoration: 'none' },
}
```

- [ ] **Step 2: Verify Login animations in browser**

`npm run dev` → go to `/login`. You should see:
- Aurora purple/pink glow bleeding in from the top-left and bottom-right corners
- Particle field (purple dots with connecting lines) floating in the background
- Logo, nav, and card elements cascade in with stagger (0.08s offsets)
- Shimmer sweep across the card on hover
- Sign-in button glows on hover
- Custom cursor dot + ring visible (desktop only)

- [ ] **Step 3: Update Register.jsx — same treatment**

Register.jsx has the same inline-style structure as Login. Apply the same pattern. Read the full Register.jsx first, then replace with the animated version. The key changes are identical to Login — add these imports at the top:

```jsx
import { motion } from 'framer-motion'
import ParticleBackground from '../components/effects/ParticleBackground'
import AnimatedPage from '../components/layout/AnimatedPage'
import { staggerContainer, staggerChild, hoverLift, glowPulse } from '../utils/animationVariants'
```

Then:
1. Wrap the outermost `<div style={styles.page}>` with `<AnimatedPage>`
2. Add `<div className="aurora-bg" aria-hidden="true" />` and `<ParticleBackground />` as first children inside `styles.page` div
3. Add `position: 'relative'` to `styles.page` and `styles.main`
4. Add `position: 'relative', zIndex: 1` to `styles.nav`, `styles.main`, and `styles.footer`
5. Wrap the nav in `<motion.nav variants={staggerContainer} initial="hidden" animate="visible">`
6. Wrap the card `<div>` in `<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="shimmer-card">`
7. Wrap the title, subtitle, form fields, and bottom text each in `<motion.div variants={staggerChild}>`
8. Add `{...glowPulse}` to the submit button and `{...hoverLift}` to the Google button
9. Add `data-cursor-hover` to all inputs and buttons

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Login.jsx frontend/src/pages/Register.jsx
git commit -m "feat(anim): animate Login and Register — aurora, particles, stagger, shimmer"
```

---

## Task 6: Animate Landing & Join

**Files:**
- Modify: `frontend/src/pages/Landing.jsx`
- Modify: `frontend/src/pages/Join.jsx`

Landing.jsx is the post-login home (camera preview + meeting launcher). Join.jsx already imports `motion`.

- [ ] **Step 1: Add aurora + stagger to Landing.jsx**

Add these imports to `frontend/src/pages/Landing.jsx` (after existing imports):

```jsx
import { motion } from 'framer-motion';
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild, hoverLift, glowPulse } from '../utils/animationVariants';
```

Find the `return (` in Landing.jsx and make these changes:

1. Wrap the outermost returned element with `<AnimatedPage style={{ position: 'relative' }}>`.

2. Add aurora div as first child inside the outermost container:
```jsx
<div className="aurora-bg aurora-subtle" aria-hidden="true" />
```

3. Find the main header/greeting section (the h1 or first heading that welcomes the user) and wrap its parent container with:
```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
```
Wrap the individual heading, subtitle, and CTA buttons inside it with `<motion.div variants={staggerChild}>`.

4. Find any card grid or section list and wrap the container with `staggerContainer`, each card with `staggerChild`. Add `{...hoverLift}` to clickable cards using `motion.div`.

5. Add `{...glowPulse}` to primary action buttons (new meeting, join).

- [ ] **Step 2: Add aurora + stagger to Join.jsx**

Join.jsx already imports `motion`. Add to its imports:

```jsx
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild, hoverLift, glowPulse } from '../utils/animationVariants';
```

In the Join return:
1. Wrap outermost element with `<AnimatedPage>`.
2. Add `<div className="aurora-bg" aria-hidden="true" />` as first child.
3. Wrap the pre-join card/form container with staggerContainer:
```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
```
4. Wrap each field group (name input, meeting code input, avatar picker, join button) with `<motion.div variants={staggerChild}>`.
5. Add `{...glowPulse}` to the join/start button. Add `data-cursor-hover` to inputs.

- [ ] **Step 3: Verify in browser**

Navigate to `/` (Landing) and `/join`. Both should show the aurora glow and elements cascading in on load.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Landing.jsx frontend/src/pages/Join.jsx
git commit -m "feat(anim): animate Landing and Join — aurora, stagger entrance, hover lift"
```

---

## Task 7: Animate Dashboard

**Files:**
- Modify: `frontend/src/pages/Dashboard.jsx`

Dashboard already imports `motion`. Apply medium treatment: subtle aurora + scroll-triggered card reveals + stagger on stats grid.

- [ ] **Step 1: Add aurora to Dashboard.jsx**

Add imports:

```jsx
import AnimatedPage from '../components/layout/AnimatedPage';
import { fadeUp, staggerContainer, staggerChild, hoverLift } from '../utils/animationVariants';
```

In the Dashboard `return`:

1. Wrap outermost `<div>` with `<AnimatedPage>`.
2. Add subtle aurora as first child:
```jsx
<div className="aurora-bg aurora-subtle" aria-hidden="true" />
```

- [ ] **Step 2: Add scroll reveals to stats cards**

Find the stats grid (the 4 stat cards with Flame, TimerReset, TrendingUp, Users2 icons). Wrap the stats container div with staggerContainer and each stat card with staggerChild + hoverLift:

```jsx
<motion.div
  className="grid grid-cols-2 gap-4 lg:grid-cols-4"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
>
  {stats.map((stat) => (
    <motion.div
      key={stat.label}
      variants={staggerChild}
      {...hoverLift}
      className={/* existing classes */}
    >
      {/* existing card content unchanged */}
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 3: Add scroll reveals to upcoming meetings list**

Find the upcoming meetings section. Wrap its container with:

```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-30px' }}
>
```

And each meeting card row with `<motion.div variants={staggerChild} {...hoverLift}>`.

- [ ] **Step 4: Verify in browser**

Navigate to `/dashboard`. You should see:
- Subtle aurora glow (half-opacity) in background
- Stats cards stagger in on first scroll into view
- Meeting rows stagger in on scroll
- Cards lift on hover

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/Dashboard.jsx
git commit -m "feat(anim): animate Dashboard — subtle aurora, scroll reveals, stagger cards"
```

---

## Task 8: Analytics, Recordings, Settings (medium) + Room (subdued)

**Files:**
- Modify: `frontend/src/pages/Analytics.jsx`
- Modify: `frontend/src/pages/Recordings.jsx`
- Modify: `frontend/src/pages/Settings.jsx`
- Modify: `frontend/src/pages/Room.jsx`

- [ ] **Step 1: Add scroll reveals to Analytics.jsx**

Add imports:
```jsx
import { motion } from 'framer-motion';
import AnimatedPage from '../components/layout/AnimatedPage';
import { fadeUp, staggerContainer, staggerChild, hoverLift } from '../utils/animationVariants';
```

In Analytics return:
1. Wrap root with `<AnimatedPage>`.
2. Add `<div className="aurora-bg aurora-subtle" aria-hidden="true" />` as first child.
3. Find the main content sections (charts, tables, cards). Wrap each section container with:
```jsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
>
```
4. For card grids, use staggerContainer + staggerChild + hoverLift (same pattern as Dashboard Task 7 Steps 2–3).

- [ ] **Step 2: Add scroll reveals to Recordings.jsx**

Same pattern as Analytics. Add the same imports. Apply:
1. `<AnimatedPage>` wrapper.
2. `<div className="aurora-bg aurora-subtle" aria-hidden="true" />`.
3. Wrap recording card/row containers with staggerContainer + staggerChild.
4. Add `{...hoverLift}` to each recording card.

- [ ] **Step 3: Add stagger to Settings.jsx**

Same imports as above. Apply:
1. `<AnimatedPage>` wrapper.
2. `<div className="aurora-bg aurora-subtle" aria-hidden="true" />`.
3. Wrap the settings sections/panels with staggerContainer on the root, staggerChild on each section:
```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {/* each settings panel */}
  <motion.div variants={staggerChild}>
    {/* panel content */}
  </motion.div>
</motion.div>
```

- [ ] **Step 4: Apply subdued treatment to Room.jsx**

Room.jsx currently:
```jsx
export default function Room() {
  const { code } = useParams();
  useEffect(() => { document.title = `Meeting · ${code}`; }, [code]);
  return (
    <div className="etherx-room-wrap">
      <div className="etherx-room-logo" role="img" aria-label="EtherX Meet logo">
        <img src={etherxLogo} alt="EtherX Meet" />
      </div>
      <iframe ... />
    </div>
  );
}
```

Add a single import and animate only the logo:

```jsx
// frontend/src/pages/Room.jsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import etherxLogo from '../assets/etherx_transparent.png';
import { fadeIn } from '../utils/animationVariants';
import '../styles/room.css';

export default function Room() {
  const { code } = useParams();

  useEffect(() => {
    document.title = `Meeting · ${code}`;
  }, [code]);

  return (
    <div className="etherx-room-wrap">
      {/* Logo fades in once — nothing else animates on this page */}
      <motion.div
        className="etherx-room-logo"
        role="img"
        aria-label="EtherX Meet logo"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <img src={etherxLogo} alt="EtherX Meet" />
      </motion.div>
      <iframe
        src={`https://8x8.vc/vpaas-magic-cookie-a390c03ef55e457ebeb88a41bdb4af08/${code}`}
        style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        allowFullScreen
      />
    </div>
  );
}
```

- [ ] **Step 5: Full end-to-end smoke test**

With `npm run dev` running:
1. `/login` — aurora ✓ particles ✓ stagger ✓ shimmer on hover ✓ custom cursor ✓
2. `/register` — same as login ✓
3. `/` (Landing) — subtle aurora ✓ stagger ✓ hover lift ✓
4. `/join` — aurora ✓ stagger ✓
5. `/dashboard` — subtle aurora ✓ scroll reveals ✓ hover lift ✓
6. `/analytics` — scroll reveals ✓
7. `/recordings` — scroll reveals ✓
8. `/settings` — stagger ✓
9. `/room/test-code` — only logo fades in ✓ no cursor ✓ no aurora ✓
10. Navigate between pages — fade+y slide transition ✓

- [ ] **Step 6: Commit**

```bash
git add frontend/src/pages/Analytics.jsx \
        frontend/src/pages/Recordings.jsx \
        frontend/src/pages/Settings.jsx \
        frontend/src/pages/Room.jsx
git commit -m "feat(anim): animate Analytics, Recordings, Settings (medium) + Room subdued logo fadeIn"
```

---

## Completion Checklist

- [ ] `ambient.css` imported in `main.jsx`
- [ ] `animationVariants.js` — 6 presets defined
- [ ] `AnimationContext` — prefers-reduced-motion respected
- [ ] `AnimatedPage` wrapper applied to all 9 pages
- [ ] `CustomCursor` — mounted in App, disabled on Room route + touch
- [ ] `AnimatePresence` — page transitions working on all route changes
- [ ] Aurora: full on Login/Register/Join/Landing, subtle on Dashboard/Analytics/Recordings/Settings, absent on Room
- [ ] Particles: Login and Register only
- [ ] Shimmer: Login and Register cards
- [ ] Stagger: all pages except Room
- [ ] Hover lift + glow: all interactive cards and buttons except Room
- [ ] Room: logo fadeIn only, no cursor, no aurora, iframe untouched
