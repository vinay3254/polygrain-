// frontend/src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import etherxLogo from '../assets/etherx_transparent.png'
import AnimatedPage from '../components/layout/AnimatedPage'
import { staggerContainer, staggerChild, hoverLift, glowPulse } from '../utils/animationVariants'

const GOLD        = '#D4B571'
const GOLD_DIM    = 'rgba(212,181,113,0.12)'
const GOLD_BORDER = 'rgba(212,181,113,0.28)'
const GOLD_FOCUS  = 'rgba(212,181,113,0.55)'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
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
      <div style={s.page}>

        {/* ── Nav ── */}
        <motion.nav variants={staggerContainer} initial="hidden" animate="visible" style={s.nav}>
          <motion.div variants={staggerChild} style={s.logoWrap}>
            <img src={etherxLogo} alt="EtherX Meet" style={s.logoImg} />
          </motion.div>
          <motion.a variants={staggerChild} href="#" style={s.helpLink}>Help</motion.a>
        </motion.nav>

        {/* ── Main ── */}
        <div style={s.main}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="shimmer-card"
            style={s.card}
          >
            <div style={s.topAccent} />

            <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src={etherxLogo} alt="EtherX Meet" style={{ height: 70, width: 'auto' }} />
              <span style={{ color: GOLD, fontSize: 24, fontWeight: 100, opacity: 0.6 }}>|</span>
              <span style={{ ...s.eyebrow, margin: 0 }}>ETHERXMEET</span>
            </motion.div>
            <motion.h1 variants={staggerChild} style={s.title}>Welcome back</motion.h1>
            <motion.p variants={staggerChild} style={s.subtitle}>Sign in to your account to continue</motion.p>

            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={s.errorBox}>
                <span style={{ marginRight: 6 }}>⚠</span>{error}
              </motion.div>
            )}

            <motion.form variants={staggerChild} onSubmit={handleSubmit} style={s.form}>
              <Field label="Email">
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={s.input}
                  onFocus={e => applyFocusStyle(e.target)}
                  onBlur={e => removeFocusStyle(e.target)}
                />
              </Field>
              <Field label="Password">
                <input
                  type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={s.input}
                  onFocus={e => applyFocusStyle(e.target)}
                  onBlur={e => removeFocusStyle(e.target)}
                />
              </Field>
              <motion.button
                type="submit" disabled={loading}
                style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
                {...glowPulse}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </motion.button>
            </motion.form>

            <motion.div variants={staggerChild} style={s.divider}>
              <div style={s.divLine} />
              <span style={s.divText}>or</span>
              <div style={s.divLine} />
            </motion.div>

            <motion.button
              type="button" style={s.btnGoogle}
              {...hoverLift}
              onClick={() => { window.location.href = 'http://localhost:5000/api/auth/google' }}
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>

            <motion.p variants={staggerChild} style={s.bottomText}>
              Don't have an account?{' '}
              <Link to="/register" style={s.link}>Create one</Link>
            </motion.p>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} style={s.footer}>
          {['Privacy', 'Terms', 'Help'].map(item => (
            <a key={item} href="#" style={s.footerLink}>{item}</a>
          ))}
        </motion.footer>
      </div>
    </AnimatedPage>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function applyFocusStyle(el) {
  el.style.borderColor = GOLD_FOCUS
  el.style.boxShadow = `0 0 0 3px ${GOLD_DIM}, 0 0 20px rgba(212,181,113,0.06)`
  el.style.background = 'rgba(212,181,113,0.04)'
}
function removeFocusStyle(el) {
  el.style.borderColor = GOLD_BORDER
  el.style.boxShadow = 'none'
  el.style.background = 'rgba(255,255,255,0.04)'
}

const s = {
  page: {
    height: '100vh', overflow: 'hidden', background: 'transparent',
    display: 'flex', flexDirection: 'column',
    fontFamily: 'DM Sans, sans-serif', color: '#C9B48A', position: 'relative',
  },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 28px', height: '100px', flexShrink: 0,
    background: 'transparent', position: 'relative', zIndex: 10,
  },
  logoWrap: { display: 'flex', alignItems: 'center' },
  logoImg: { height: '100px', width: 'auto', display: 'block' },
  helpLink: {
    fontSize: '13px', fontWeight: 500, color: GOLD, textDecoration: 'none',
    padding: '6px 14px', borderRadius: '8px', border: `1px solid ${GOLD_BORDER}`,
    transition: 'background 0.15s',
  },
  main: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '8px 24px', position: 'relative', zIndex: 2, minHeight: 0,
  },
  card: {
    position: 'relative', background: 'rgba(0, 0, 0, 0.96)',
    border: `1px solid ${GOLD_BORDER}`, borderRadius: '20px',
    padding: '24px 36px 24px', width: '100%', maxWidth: '420px',
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 1px 0 rgba(212,181,113,0.14) inset',
    overflow: 'hidden',
  },
  topAccent: {
    position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(212,181,113,0.6), transparent)',
    pointerEvents: 'none',
  },
  eyebrow: {
    fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, margin: '0 0 12px', opacity: 0.8,
  },
  title: {
    fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700,
    letterSpacing: '-0.04em', color: '#E8D5A3', margin: '0 0 4px',
  },
  subtitle: { fontSize: '13px', color: 'rgba(240,238,232,0.5)', margin: '0 0 16px', lineHeight: 1.5 },
  errorBox: {
    background: 'rgba(234,67,53,0.10)', border: '1px solid rgba(234,67,53,0.28)',
    color: '#f28b82', padding: '10px 14px', borderRadius: '10px',
    fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', lineHeight: 1.45,
  },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: {
    fontSize: '12px', fontWeight: 600, color: 'rgba(212,181,113,0.75)',
    letterSpacing: '0.04em', textTransform: 'uppercase',
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${GOLD_BORDER}`,
    color: '#C9B48A', padding: '9px 14px', borderRadius: '10px',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 400, outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s', boxSizing: 'border-box',
  },
  btnPrimary: {
    width: '100%', background: 'linear-gradient(135deg, #D4B571 0%, #6F5115 100%)',
    border: 'none', color: '#E8D5A3', padding: '13px', borderRadius: '10px',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
    marginTop: '4px', letterSpacing: '-0.01em',
    boxShadow: '0 4px 20px rgba(212,181,113,0.28)', transition: 'opacity 0.15s, box-shadow 0.2s',
  },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0' },
  divLine: { flex: 1, height: '1px', background: GOLD_BORDER },
  divText: {
    fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(212,181,113,0.5)',
  },
  btnGoogle: {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${GOLD_BORDER}`,
    color: '#C9B48A', padding: '12px 16px', borderRadius: '10px',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    transition: 'background 0.15s, border-color 0.15s',
  },
  bottomText: { fontSize: '13px', color: 'rgba(240,238,232,0.5)', marginTop: '12px', textAlign: 'center', lineHeight: 1.5 },
  link: { color: GOLD, textDecoration: 'none', fontWeight: 600 },
  footer: {
    display: 'flex', gap: '20px', justifyContent: 'center', padding: '12px 24px',
    borderTop: '1px solid rgba(212,181,113,0.06)', position: 'relative', zIndex: 2,
  },
  footerLink: { fontSize: '11px', fontWeight: 500, color: 'rgba(240,238,232,0.35)', textDecoration: 'none' },
}
