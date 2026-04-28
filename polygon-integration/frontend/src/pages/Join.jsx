import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, Check, ChevronDown } from 'lucide-react';
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild, glowPulse } from '../utils/animationVariants';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useUI } from '../context/UIContext';
import { useUserContext } from '../context/UserContext';
import { useMediaDevices } from '../hooks/useMediaDevices';
import AudioVisualizer from '../components/meeting/AudioVisualizer';
import etherxLogo from '../assets/etherx_transparent.png';
import OnChainConfirmModal from '../components/web3/OnChainConfirmModal';
import { useWallet } from '../context/WalletContext';
import { useMeetingContract } from '../hooks/useMeetingContract';

const AVATAR_COLORS = [
  { name: 'primary', bg: 'bg-indigo-600', glow: 'shadow-indigo-500/50' },
  { name: 'secondary', bg: 'bg-cyan-500', glow: 'shadow-cyan-500/50' },
  { name: 'ai', bg: 'bg-purple-600', glow: 'shadow-purple-500/50' },
  { name: 'purple', bg: 'bg-violet-600', glow: 'shadow-violet-500/50' },
  { name: 'pink', bg: 'bg-pink-600', glow: 'shadow-pink-500/50' },
  { name: 'orange', bg: 'bg-orange-600', glow: 'shadow-orange-500/50' },
  { name: 'teal', bg: 'bg-teal-600', glow: 'shadow-teal-500/50' },
  { name: 'lime', bg: 'bg-lime-600', glow: 'shadow-lime-500/50' },
];

export default function Join() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToast } = useUI();
  const { user, updateUser } = useUserContext();
  const { account } = useWallet();
  const {
    joinMeeting, createMeeting,
    isTxPending, txHash, error: contractError,
  } = useMeetingContract();

  const [meetingCode, setMeetingCode] = useState('');
  const [displayName, setDisplayName] = useState(user.name || '');
  const [avatarColor, setAvatarColor] = useState(user.avatarColor || 'primary');
  const [codeError, setCodeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [showChainModal, setShowChainModal] = useState(false);
  const [pendingCode, setPendingCode] = useState('');
  const [pendingIsHost, setPendingIsHost] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  );
  
  const {
    stream,
    devices,
    permissions,
    error: mediaError,
    videoRef,
    isVideoEnabled,
    isAudioEnabled,
    requestPermission,
    toggleVideo,
    toggleAudio,
    switchDevice,
  } = useMediaDevices();

  const isHostFromUrl = searchParams.get('host') === 'true';

  // Parse meeting code from URL
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setMeetingCode(formatMeetingCode(codeParam));
    }
  }, [searchParams]);

  // Request media permissions on mount
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formatMeetingCode = (code) => {
    const cleaned = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 10)}`;
  };

  const handleCodeChange = (e) => {
    const formatted = formatMeetingCode(e.target.value);
    setMeetingCode(formatted);
    setCodeError('');
  };

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
    setNameError('');
  };

  const validateForm = () => {
    let isValid = true;

    if (!displayName.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else if (displayName.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      isValid = false;
    } else if (displayName.trim().length > 50) {
      setNameError('Name must be less than 50 characters');
      isValid = false;
    }

    const codePattern = /^[A-Z0-9]{3}-[A-Z0-9]{4}-[A-Z0-9]{3}$/;
    if (!meetingCode.trim()) {
      setCodeError('Meeting code is required');
      isValid = false;
    } else if (!codePattern.test(meetingCode)) {
      setCodeError('Invalid format (use XXX-XXXX-XXX)');
      isValid = false;
    }

    return isValid;
  };

  const handleJoinMeeting = async () => {
    if (!validateForm()) return;

    setIsJoining(true);
    
    // Save user info to context
    updateUser({
      name: displayName.trim(),
      avatarColor: avatarColor,
    });

    // Simulate a brief delay for better UX
    setTimeout(() => {
      const cleanCode = meetingCode.replace(/-/g, '').toLowerCase();
      if (account) {
        setPendingCode(cleanCode);
        setPendingIsHost(isHostFromUrl);
        setShowChainModal(true);
        setIsJoining(false);
      } else {
        navigate(`/room/${cleanCode}`);
      }
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexmeet_token');
    localStorage.removeItem('nexmeet_user');
    navigate('/login');
  };

  const handleHelp = () => {
    addToast('Need help? Enter a valid meeting code and check your camera/mic setup.', 'info');
  };

  const userInitial = (displayName || user.name || 'U').trim().charAt(0).toUpperCase();

  return (
    <AnimatedPage>
    <div style={{ minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', fontFamily: 'DM Sans, sans-serif', color: '#C9B48A', position: 'relative' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', height: '80px', background: 'transparent', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={etherxLogo} alt="EtherXMeet" style={{ height: '90px', width: 'auto', display: 'block' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(240,238,232,0.45)', letterSpacing: '0.02em' }}>{clock}</span>

          <button
            type="button"
            onClick={handleHelp}
            aria-label="Help"
            style={{ height: '34px', padding: '0 14px', borderRadius: '8px', border: '1px solid rgba(212,181,113,0.28)', background: 'transparent', color: '#D4B571', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500 }}
          >
            Help
          </button>

          <button
            type="button"
            onClick={handleLogout}
            style={{ height: '34px', padding: '0 14px', borderRadius: '8px', border: '1px solid rgba(212,181,113,0.28)', background: 'transparent', color: '#D4B571', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500 }}
          >
            Logout
          </button>

          <div
            aria-label="User avatar"
            style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4B571 0%, #6F5115 100%)', color: '#E8D5A3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', boxShadow: '0 0 0 2px rgba(212,181,113,0.25)' }}
          >
            {userInitial}
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 2 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <div style={{ background: 'rgba(8,8,12,0.28)', border: '1px solid rgba(212,181,113,0.28)', borderRadius: '20px', padding: '36px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 1px 0 rgba(212,181,113,0.12) inset', position: 'relative', overflow: 'hidden' }}>
          {/* top accent line */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,181,113,0.6), transparent)' }} />
          <motion.p variants={staggerChild} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4B571', margin: '0 0 12px', opacity: 0.8 }}>EtherXMeet</motion.p>
          <motion.h1 variants={staggerChild} style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.04em', color: '#E8D5A3', margin: '0 0 8px', textAlign: 'center' }}>
            Join Meeting
          </motion.h1>
          <motion.p variants={staggerChild} style={{ fontSize: '14px', color: 'rgba(240,238,232,0.5)', margin: '0 0 28px', textAlign: 'center', lineHeight: 1.5 }}>
            Set up your camera and microphone before joining
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Preview Panel */}
            <motion.div variants={staggerChild} className="space-y-4">
              {/* Video Preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stream ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative', aspectRatio: '16/9', background: 'rgba(8,8,12,0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,181,113,0.22)' }}
              >
                {stream ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
                    />
                    {!isVideoEnabled && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,8,12,0.6)' }}>
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-full ${AVATAR_COLORS.find(c => c.name === avatarColor)?.bg} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2`}>
                            {displayName.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <p className="text-white/70">Camera is off</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/50">
                      {mediaError ? (
                        <div className="px-4">
                          <VideoOff className="w-12 h-12 mx-auto mb-2 text-red-400" />
                          <p className="text-sm text-red-400">{mediaError}</p>
                        </div>
                      ) : (
                        <>
                          <div className="animate-pulse">
                            <Video className="w-12 h-12 mx-auto mb-2" />
                            <p>Requesting camera access...</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Audio Visualizer */}
              {stream && isAudioEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AudioVisualizer stream={stream} height={40} />
                </motion.div>
              )}

              {/* Media Controls */}
              <div className="flex gap-3 justify-center">
                <Button
                  variant={isVideoEnabled ? 'primary' : 'danger'}
                  onClick={toggleVideo}
                  disabled={!stream}
                  className="flex-1"
                >
                  {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  <span className="ml-2">{isVideoEnabled ? 'Camera On' : 'Camera Off'}</span>
                </Button>
                <Button
                  variant={isAudioEnabled ? 'primary' : 'danger'}
                  onClick={toggleAudio}
                  disabled={!stream}
                  className="flex-1"
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  <span className="ml-2">{isAudioEnabled ? 'Mic On' : 'Mic Off'}</span>
                </Button>
              </div>

              {/* Device Selection */}
              {stream && (
                <div className="space-y-3">
                  <DeviceSelector
                    label="Camera"
                    devices={devices.cameras}
                    onSelect={(deviceId) => switchDevice('video', deviceId)}
                  />
                  <DeviceSelector
                    label="Microphone"
                    devices={devices.microphones}
                    onSelect={(deviceId) => switchDevice('audio', deviceId)}
                  />
                </div>
              )}
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={staggerChild} className="space-y-6">
              {/* Name Input */}
              <div>
                <Input
                  label="Your Name"
                  type="text"
                  placeholder="Enter your name"
                  value={displayName}
                  onChange={handleNameChange}
                  error={nameError}
                />
              </div>

              {/* Avatar Color Picker */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Avatar Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {AVATAR_COLORS.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAvatarColor(color.name)}
                      className={`
                        w-12 h-12 rounded-full ${color.bg}
                        flex items-center justify-center
                        transition-all duration-200
                        ${avatarColor === color.name 
                          ? `ring-4 ring-white/50 shadow-xl ${color.glow}` 
                          : 'hover:ring-2 hover:ring-white/30'
                        }
                      `}
                    >
                      {avatarColor === color.name && (
                        <Check className="w-6 h-6 text-white" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Meeting Code Input */}
              <div>
                <Input
                  label="Meeting Code"
                  type="text"
                  placeholder="XXX-XXXX-XXX"
                  value={meetingCode}
                  onChange={handleCodeChange}
                  error={codeError}
                />
                <p style={{ marginTop: '6px', fontSize: '11px', color: 'rgba(212,181,113,0.5)' }}>
                  Format: XXX-XXXX-XXX (e.g., ABC-1234-XYZ)
                </p>
              </div>

              {/* Join Button */}
              <motion.div {...glowPulse}>
                <Button
                  variant="primary"
                  className="w-full text-lg py-3"
                  onClick={handleJoinMeeting}
                  disabled={isJoining || !displayName.trim() || !meetingCode.trim()}
                  loading={isJoining}
                  data-cursor-hover
                >
                  {isJoining ? 'Joining...' : 'Join Meeting'}
                </Button>
              </motion.div>

              {/* Footer */}
              <p style={{ fontSize: '11px', textAlign: 'center', color: 'rgba(240,238,232,0.3)', lineHeight: 1.6 }}>
                By joining, you agree to our Terms of Service
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
      <OnChainConfirmModal
        isOpen={showChainModal}
        onClose={() => setShowChainModal(false)}
        onConfirmed={(_txHash) => {
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

// Device Selector Component
function DeviceSelector({ label, devices, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(devices[0]?.deviceId || '');

  useEffect(() => {
    if (devices.length > 0 && !selected) {
      setSelected(devices[0].deviceId);
    }
  }, [devices]);

  const handleSelect = (deviceId) => {
    setSelected(deviceId);
    onSelect(deviceId);
    setIsOpen(false);
  };

  if (devices.length <= 1) return null;

  const selectedDevice = devices.find(d => d.deviceId === selected);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/70 mb-1">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm flex items-center justify-between hover:bg-white/15 transition-colors"
      >
        <span className="truncate">{selectedDevice?.label || 'Select device'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 w-full mt-1 bg-dark-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl overflow-hidden"
        >
          {devices.map((device) => (
            <button
              key={device.deviceId}
              onClick={() => handleSelect(device.deviceId)}
              className={`
                w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors
                ${device.deviceId === selected ? 'bg-white/10' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{device.label}</span>
                {device.deviceId === selected && <Check className="w-4 h-4 text-green-400" />}
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
