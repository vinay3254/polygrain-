import { useEffect, useRef, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import etherxLogo from '../assets/etherx_transparent.png';
import { clearAuthSession, getStoredUser, getUserInitials } from '../utils/auth';
import { ROUTES } from '../utils/constants';
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild, glowPulse } from '../utils/animationVariants';
import WalletBanner from '../components/web3/WalletBanner';
import OnChainConfirmModal from '../components/web3/OnChainConfirmModal';
import { useWallet } from '../context/WalletContext';
import { useMeetingContract } from '../hooks/useMeetingContract';
import '../styles/landing.css';

const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

const normalizeMeetingCode = (value) => {
  const cleaned = value.toLowerCase().replace(/\s+/g, '').trim();
  const jitsiMatch = cleaned.match(/(?:https?:\/\/)?meet\.jit\.si\/([^/?#]+)/i);

  if (jitsiMatch?.[1]) {
    return jitsiMatch[1].toLowerCase();
  }

  return cleaned;
};

function generateRoomCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = 'etherx-';
  for (let i = 0; i < 8; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function MicOnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.93V21h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3.07A7 7 0 0 1 5 11a1 1 0 1 1 2 0 5 5 0 0 0 10 0z"
      />
    </svg>
  );
}

function MicOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M15 11V8.41l2 2V11a5 5 0 0 1-7.73 4.18l1.46-1.46A3 3 0 0 0 15 11zM12 3a3 3 0 0 1 3 3v1.59l-6-6A3 3 0 0 1 12 3zM5.27 4L4 5.27 8.09 9.36V11a3.9 3.9 0 0 0 .04.54L6.31 9.72A5.9 5.9 0 0 0 6 11a6 6 0 0 0 6 6 5.8 5.8 0 0 0 2.43-.51L16 18.06V21h3a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h3v-2.07A8 8 0 0 1 4 11a7.9 7.9 0 0 1 .88-3.65L5.27 4zM20 20.73L6.54 7.27 5.13 5.86 3.27 4 2 5.27l1.86 1.86 1.41 1.41L18.73 22 20 20.73z"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2l5 4V4l-5 4z"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const storedUser = getStoredUser();
  const displayName = storedUser?.name || 'Alex';
  const displayInitial = getUserInitials(displayName).charAt(0) || 'A';
  const { account } = useWallet();
  const { createMeeting, joinMeeting, isTxPending, txHash, error: contractError } = useMeetingContract();

  const [clock, setClock] = useState(formatTime(new Date()));
  const [meetingCode, setMeetingCode] = useState('');
  const [micMuted, setMicMuted] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [showChainModal, setShowChainModal] = useState(false);
  const [pendingCode, setPendingCode] = useState('');
  const [pendingIsHost, setPendingIsHost] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setClock(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (error) {
      setCameraOn(false);
      window.alert('Unable to access camera. Please check browser permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  };

  const handleCameraToggle = () => {
    if (cameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const handleJoin = () => {
    const code = normalizeMeetingCode(meetingCode);
    if (!code) { window.alert('Please enter a meeting code.'); return; }
    if (account) {
      setPendingCode(code);
      setPendingIsHost(false);
      setShowChainModal(true);
    } else {
      navigate(`/room/${encodeURIComponent(code)}`);
    }
  };

  const handleCreateMeeting = () => {
    const roomCode = generateRoomCode();
    if (account) {
      setPendingCode(roomCode);
      setPendingIsHost(true);
      setShowChainModal(true);
    } else {
      navigate(`/room/${roomCode}`);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    window.location.replace(ROUTES.LOGIN);
  };

  return (
    <AnimatedPage style={{ position: 'relative' }}>
    <div className="meet-landing">
      <header className="meet-nav">
        <div className="meet-logo" role="img" aria-label="EtherXMeet logo">
          <span className="meet-brand-logo">
            <img src={etherxLogo} alt="EtherX Meet" style={{ height: '120px', width: 'auto' }} />
          </span>
        </div>

        <div className="meet-nav-right">
          <span className="meet-clock" aria-live="polite">{clock}</span>
          <button
            type="button"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            aria-label="Dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'linear-gradient(135deg, #D4B571 0%, #6F5115 100%)',
              border: 'none',
              color: '#E8D5A3',
              fontWeight: 600,
              fontSize: 13,
              padding: '7px 16px',
              borderRadius: 9,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              boxShadow: '0 3px 14px rgba(212,181,113,0.28)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </button>
          <button type="button" className="meet-help" onClick={handleLogout}>
            Logout
          </button>
          <button type="button" className="meet-help" aria-label="Help">
            ?
          </button>
          <div className="meet-avatar" aria-label="User avatar">
            {displayInitial}
          </div>
        </div>
      </header>

      <main className="meet-main">
        <div className="meet-content">
          <section className="meet-preview-column">
            <div className="meet-preview-box">
              {cameraOn ? (
                <video ref={videoRef} autoPlay muted playsInline className="meet-video" />
              ) : (
                <div className="meet-preview-avatar" aria-hidden="true">
                  {displayInitial}
                </div>
              )}

              <span className="meet-label meet-name-label">{displayName}</span>
              <span className="meet-label meet-camera-label">{cameraOn ? 'Camera is on' : 'Camera is off'}</span>
            </div>

            <div className="meet-controls">
              <button
                type="button"
                className={`meet-control-btn ${micMuted ? 'is-muted' : ''}`}
                onClick={() => setMicMuted((value) => !value)}
                aria-label={micMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {micMuted ? <MicOffIcon /> : <MicOnIcon />}
              </button>

              <button
                type="button"
                className="meet-control-btn"
                onClick={handleCameraToggle}
                aria-label={cameraOn ? 'Turn camera off' : 'Turn camera on'}
              >
                <CameraIcon />
              </button>

              <button type="button" className="meet-control-btn" aria-label="More options">
                <MoreIcon />
              </button>
            </div>
          </section>

          <motion.section
            className="meet-join-column"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <WalletBanner />
            <motion.h1 variants={staggerChild}>Ready to join?</motion.h1>
            <motion.p variants={staggerChild}>No one else can see you until you join this meeting.</motion.p>

            <motion.div variants={staggerChild} className="meet-join-row">
              <input
                type="text"
                value={meetingCode}
                onChange={(event) => setMeetingCode(normalizeMeetingCode(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleJoin();
                  }
                }}
                placeholder="Enter a code or link"
                aria-label="Meeting code"
                data-cursor-hover
              />

              <motion.button type="button" className="join-btn" onClick={handleJoin} {...glowPulse}>
                Join
              </motion.button>
            </motion.div>

            <motion.div variants={staggerChild} className="meet-divider" aria-hidden="true">
              <span>or</span>
            </motion.div>

            <motion.button
              type="button"
              className="new-meeting-btn"
              onClick={handleCreateMeeting}
              variants={staggerChild}
              {...glowPulse}
            >
              New meeting
            </motion.button>

            <motion.p variants={staggerChild} className="meet-privacy-note">
              By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy</a>.
            </motion.p>
          </motion.section>
        </div>
      </main>

      <footer className="meet-footer" aria-label="Footer links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">About</a>
        <a href="#">Help</a>
      </footer>
    </div>
      <OnChainConfirmModal
        isOpen={showChainModal}
        onClose={() => setShowChainModal(false)}
        onConfirmed={() => {
          setShowChainModal(false);
          navigate(`/room/${pendingCode}`);
        }}
        meetingId={pendingCode}
        isHost={pendingIsHost}
        onSubmit={pendingIsHost ? createMeeting : joinMeeting}
        isTxPending={isTxPending}
        txHash={txHash}
        contractError={contractError}
      />
    </AnimatedPage>
  );
}
