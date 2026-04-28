// frontend/src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import etherxLogo from '../assets/etherx_transparent.png'
import AnimatedPage from '../components/layout/AnimatedPage'
import { staggerContainer, staggerChild, glowPulse } from '../utils/animationVariants'

const GOLD        = '#D4B571'
const GOLD_DIM    = 'rgba(212,181,113,0.12)'
const GOLD_BORDER = 'rgba(212,181,113,0.28)'
const GOLD_FOCUS  = 'rgba(212,181,113,0.55)'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
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
          <motion.div variants={staggerChild} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/login" style={s.backLink}>← Back</Link>
            <a href="#" style={s.helpLink}>Help</a>
          </motion.div>
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
            <motion.h1 variants={staggerChild} style={s.title}>Create account</motion.h1>
            <motion.p variants={staggerChild} style={s.subtitle}>Join and start collaborating</motion.p>

            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} style={s.errorBox}>
                <span style={{ marginRight: 6 }}>⚠</span>{error}
              </motion.div>
            )}

            <motion.form variants={staggerChild} onSubmit={handleSubmit} style={s.form}>
              <Field label="Full Name">
                <input
                  type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={s.input}
                  onFocus={e => applyFocus(e.target)}
                  onBlur={e => removeFocus(e.target)}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={s.input}
                  onFocus={e => applyFocus(e.target)}
                  onBlur={e => removeFocus(e.target)}
                />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Password">
                  <input
                    type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    style={s.input}
                    onFocus={e => applyFocus(e.target)}
                    onBlur={e => removeFocus(e.target)}
                  />
                </Field>
                <Field label="Confirm">
                  <input
                    type="password" value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Re-enter"
                    style={s.input}
                    onFocus={e => applyFocus(e.target)}
                    onBlur={e => removeFocus(e.target)}
                  />
                </Field>
              </div>
              <motion.button
                type="submit" disabled={loading}
                style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
                {...glowPulse}
              >
                {loading ? 'Creating account…' : 'Create account'}
              </motion.button>
            </motion.form>

            <motion.p variants={staggerChild} style={s.bottomText}>
              Already have an account?{' '}
              <Link to="/login" style={s.link}>Sign in</Link>
            </motion.p>
            <motion.p variants={staggerChild} style={s.termsText}>
              By creating an account you agree to our{' '}
              <a href="#" style={s.link}>Terms</a> and{' '}
              <a href="#" style={s.link}>Privacy Policy</a>
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

function applyFocus(el) {
  el.style.borderColor = GOLD_FOCUS
  el.style.boxShadow = `0 0 0 3px ${GOLD_DIM}, 0 0 20px rgba(212,181,113,0.05)`
  el.style.background = 'rgba(212,181,113,0.04)'
}
function removeFocus(el) {
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
  backLink: {
    fontSize: '13px', fontWeight: 500, color: GOLD, textDecoration: 'none',
    padding: '6px 14px', borderRadius: '8px', border: `1px solid ${GOLD_BORDER}`,
    lineHeight: 1, transition: 'background 0.15s',
  },
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
    padding: '20px 36px 20px', width: '100%', maxWidth: '460px',
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
    fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700,
    letterSpacing: '-0.04em', color: '#E8D5A3', margin: '0 0 4px',
  },
  subtitle: { fontSize: '13px', color: 'rgba(240,238,232,0.5)', margin: '0 0 14px', lineHeight: 1.5 },
  errorBox: {
    background: 'rgba(234,67,53,0.10)', border: '1px solid rgba(234,67,53,0.28)',
    color: '#f28b82', padding: '10px 14px', borderRadius: '10px',
    fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', lineHeight: 1.45,
  },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
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
  bottomText: { fontSize: '13px', color: 'rgba(240,238,232,0.5)', marginTop: '10px', textAlign: 'center', lineHeight: 1.5 },
  termsText: { fontSize: '11px', color: 'rgba(240,238,232,0.3)', marginTop: '6px', textAlign: 'center', lineHeight: 1.6 },
  link: { color: GOLD, textDecoration: 'none', fontWeight: 600 },
  footer: {
    display: 'flex', gap: '20px', justifyContent: 'center', padding: '12px 24px',
    borderTop: '1px solid rgba(212,181,113,0.06)', position: 'relative', zIndex: 2,
  },
  footerLink: { fontSize: '11px', fontWeight: 500, color: 'rgba(240,238,232,0.35)', textDecoration: 'none' },
}
