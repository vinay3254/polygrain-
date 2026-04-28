import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/layout/AnimatedPage';
import {
  CalendarClock, CalendarDays, Play, Plus, TimerReset, Video, Users2,
} from 'lucide-react';
import WalletBanner from '../components/web3/WalletBanner';
import ChainProofBadge from '../components/web3/ChainProofBadge';
import TopBar from '../components/layout/TopBar';
import Scheduler from '../components/features/Scheduler';
import { useMeeting } from '../context/MeetingContext';
import { useUser } from '../context/UserContext';

const GOLD = '#D4B571';
const GOLD_DIM = 'rgba(212,181,113,0.15)';
const GOLD_BORDER = 'rgba(212,181,113,0.25)';
const CARD_BG = 'rgba(10,10,12,0.38)';
const CARD_BORDER = 'rgba(255,255,255,0.06)';
const GRADIENT_CTA = 'linear-gradient(90deg, #D4B571 0%, #6F5115 100%)';

const card = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: 28,
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)',
  padding: '28px 28px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
};

const overline = {
  fontSize: 10,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: `rgba(212,181,113,0.65)`,
  fontWeight: 700,
  marginBottom: 4,
};

const sectionTitle = {
  fontSize: 20,
  fontWeight: 500,
  color: '#E8D5A3',
  letterSpacing: '-0.02em',
  marginTop: 2,
};

const lift = {
  whileHover: { scale: 1.02, y: -3, transition: { type: 'spring', stiffness: 420, damping: 26 } },
  whileTap: { scale: 0.98 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { scheduledMeetings, savedAsyncMessages, savedRecordings } = useMeeting();
  const [showScheduler, setShowScheduler] = useState(false);

  const upcoming = useMemo(
    () => [...scheduledMeetings].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4),
    [scheduledMeetings],
  );

  const stats = useMemo(() => {
    const totalMinutes = scheduledMeetings.reduce((sum, m) => sum + (m.duration || 0), 0);
    const uniqueParticipants = new Set(
      scheduledMeetings.flatMap((m) => m.participants || [])
    ).size;
    return [
      { label: 'Meetings Scheduled', value: `${scheduledMeetings.length}`, Icon: CalendarDays },
      { label: 'Hours Planned', value: `${(totalMinutes / 60).toFixed(1)}h`, Icon: TimerReset },
      { label: 'Recordings', value: `${savedRecordings.length}`, Icon: Video },
      { label: 'Collaborators', value: `${uniqueParticipants}`, Icon: Users2 },
    ];
  }, [scheduledMeetings, savedRecordings]);

  return (
    <AnimatedPage>
      <div style={{ minHeight: '100dvh', color: '#f0f0f0', position: 'relative' }}>
        <TopBar />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 20px 60px' }}>

          <WalletBanner />

          {/* ── HERO ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              ...card,
              borderColor: GOLD_BORDER,
              boxShadow: `0 0 0 1px ${GOLD_BORDER}, 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,181,113,0.15)`,
              marginBottom: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* gold shimmer line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,181,113,0.6), transparent)',
            }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p style={overline}>Personal Mission Control</p>
                <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 500, color: '#E8D5A3', letterSpacing: '-0.03em', margin: '8px 0 10px' }}>
                  {user.name.split(' ')[0]}'s Collaboration Cockpit
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 520 }}>
                  Run live rooms, async follow-ups, scheduled sessions, and recordings from one premium workspace.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate(`/join?code=${user.roomSlug}`)}
                  style={{ background: GRADIENT_CTA, border: 'none', color: '#111', fontWeight: 700, fontSize: 14, padding: '11px 22px', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <Plus size={15} /> Open My Room
                </button>
                <button
                  onClick={() => setShowScheduler(true)}
                  style={{ background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, color: GOLD, fontWeight: 600, fontSize: 14, padding: '11px 22px', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}
                >
                  <CalendarClock size={15} /> Schedule
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── STATS GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
            {stats.map(({ label, value, Icon }, i) => (
              <motion.div
                key={label}
                {...lift}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.15 }}
                style={{
                  ...card,
                  borderColor: GOLD_BORDER,
                  padding: '24px 22px',
                  cursor: 'default',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: GOLD_DIM, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={18} color={GOLD} />
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 30, fontWeight: 600, color: '#E8D5A3', letterSpacing: '-0.03em', marginTop: 4 }}>{value}</p>
              </motion.div>
            ))}
          </div>

          {/* ── MAIN 2-COL ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 20, alignItems: 'start' }}>

            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Upcoming Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={card}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                  <div>
                    <p style={overline}>Timeline</p>
                    <p style={sectionTitle}>Upcoming Sessions</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, padding: '5px 13px', borderRadius: 99 }}>
                    {upcoming.length} scheduled
                  </span>
                </div>
                {upcoming.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0' }}>
                    No sessions scheduled yet. Use the Schedule button to add one.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {upcoming.map((meeting) => (
                      <motion.button
                        key={meeting.id}
                        {...lift}
                        onClick={() => navigate(`/join?code=${meeting.id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '14px 18px', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                      >
                        <div style={{ minWidth: 52, textAlign: 'center', background: 'rgba(0,0,0,0.4)', border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: '8px 10px' }}>
                          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: GOLD, fontWeight: 700 }}>
                            {new Date(meeting.date).toLocaleDateString([], { month: 'short' })}
                          </p>
                          <p style={{ fontSize: 22, fontWeight: 600, color: '#E8D5A3', lineHeight: 1.1 }}>
                            {new Date(meeting.date).getDate()}
                          </p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 15, fontWeight: 500, color: '#E8D5A3', marginBottom: 3 }}>{meeting.title}</p>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>
                            {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {meeting.duration} min · {meeting.participants.length} people
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          <ChainProofBadge txHash={meeting.txHash} />
                          <span style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>Join →</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Recent Recordings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={card}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                  <div>
                    <p style={overline}>Library</p>
                    <p style={sectionTitle}>Recent Recordings</p>
                  </div>
                  <button onClick={() => navigate('/recordings')} style={{ fontSize: 12, color: GOLD, background: 'transparent', border: `1px solid ${GOLD_BORDER}`, borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontWeight: 600 }}>
                    See All
                  </button>
                </div>
                {savedRecordings.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0' }}>
                    No recordings yet. End a meeting to save a recording.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {savedRecordings.slice(0, 4).map((rec) => (
                      <motion.div
                        key={rec.id}
                        {...lift}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '12px 16px', cursor: 'pointer' }}
                      >
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Play size={15} color={GOLD} fill={GOLD} />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: '#E8D5A3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.title}</p>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{rec.duration} min · {rec.participants?.length ?? 0} peers</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Top Collaborators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                style={card}
              >
                <div style={{ marginBottom: 20 }}>
                  <p style={overline}>Network</p>
                  <p style={sectionTitle}>Top Collaborators</p>
                </div>
                {upcoming.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0' }}>
                    Collaborators appear after your first shared meeting.
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {Array.from(
                      scheduledMeetings
                        .flatMap((m) => m.participants || [])
                        .reduce((map, name) => { map.set(name, (map.get(name) || 0) + 1); return map; }, new Map())
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([name, count]) => {
                        const initials = name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();
                        return (
                          <motion.div
                            key={name}
                            {...lift}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '10px 12px', cursor: 'pointer' }}
                          >
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: GRADIENT_CTA, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#111', flexShrink: 0 }}>
                              {initials}
                            </div>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 500, color: '#E8D5A3' }}>{name}</p>
                              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{count} session{count !== 1 ? 's' : ''}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </motion.div>

              {/* Async Inbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                style={card}
              >
                <div style={{ marginBottom: 20 }}>
                  <p style={overline}>Async Inbox</p>
                  <p style={sectionTitle}>Video Follow-ups</p>
                </div>
                {savedAsyncMessages.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px 0' }}>
                    No video follow-ups yet.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {savedAsyncMessages.slice(0, 4).map((msg) => (
                      <motion.div
                        key={msg.id}
                        {...lift}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '12px 16px', cursor: 'pointer' }}
                      >
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: '#E8D5A3' }}>{msg.sender}</p>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{msg.message}</p>
                        </div>
                        <span style={{ fontSize: 11, color: GOLD, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: 99, padding: '4px 10px', fontWeight: 700, flexShrink: 0 }}>
                          {msg.duration || '01:10'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </div>

        <Scheduler isOpen={showScheduler} onClose={() => setShowScheduler(false)} />
      </div>
    </AnimatedPage>
  );
}
