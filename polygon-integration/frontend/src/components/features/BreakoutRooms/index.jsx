import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, MessageSquareShare, Shuffle, Users, WandSparkles, X } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useMeeting } from '../../../context/MeetingContext';

const baseRooms = [
  { id: 'room-a', label: 'Concept Lab', topic: 'North star priorities', timer: 900, activity: 82 },
  { id: 'room-b', label: 'Sprint Forge', topic: 'Execution risks', timer: 780, activity: 73 },
  { id: 'room-c', label: 'Signal Room', topic: 'Customer stories', timer: 660, activity: 64 },
];

export default function BreakoutRooms({ isOpen, onClose }) {
  const { participants } = useMeeting();
  const [rooms, setRooms] = useState(baseRooms);
  const [broadcast, setBroadcast] = useState('');
  const [wanderMode, setWanderMode] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRooms((previousRooms) =>
        previousRooms.map((room) => ({
          ...room,
          timer: Math.max(0, room.timer - 1),
          activity: Math.max(42, Math.min(100, room.activity + Math.floor(Math.random() * 7) - 3)),
        })),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  const participantPool = useMemo(() => participants.slice(1), [participants]);

  const smartSplit = () => {
    setRooms((previousRooms) =>
      previousRooms.map((room, index) => ({
        ...room,
        members: participantPool.filter((_, participantIndex) => participantIndex % previousRooms.length === index),
      })),
    );
  };

  const randomSplit = () => {
    const shuffled = [...participantPool].sort(() => Math.random() - 0.5);
    setRooms((previousRooms) =>
      previousRooms.map((room, index) => ({
        ...room,
        members: shuffled.filter((_, participantIndex) => participantIndex % previousRooms.length === index),
      })),
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="w-full max-w-6xl rounded-[34px] border border-white/10 bg-[rgba(13,13,26,0.92)] p-6 shadow-[0_30px_90px_rgba(4,8,24,0.55)] backdrop-blur-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Breakout Rooms 2.0</p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">Split the room without losing momentum</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              Smart assignment, host broadcast, wander mode, activity monitoring, and a visible
              path back to the main room.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" onClick={smartSplit}>
            <WandSparkles className="h-4 w-4" />
            Smart Split
          </Button>
          <Button variant="outline" onClick={randomSplit}>
            <Shuffle className="h-4 w-4" />
            Randomize
          </Button>
          <label className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            <input type="checkbox" checked={wanderMode} onChange={() => setWanderMode((previous) => !previous)} />
            Wander Mode
          </label>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room.id}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/45">
                    {room.label}
                  </span>
                  <span className="text-xs text-white/35">{formatTimer(room.timer)}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{room.topic}</h3>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Users className="h-4 w-4 text-cyan-200" />
                    {(room.members || []).length || Math.ceil(participantPool.length / rooms.length)} participants
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                      <span>Activity</span>
                      <span>{room.activity}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#10B981,#06B6D4,#4F46E5)]"
                        style={{ width: `${room.activity}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-black/10 p-3 text-xs leading-5 text-white/55">
                    {wanderMode ? 'Anyone can move between rooms during the session.' : 'Participants stay fixed until the host reassigns them.'}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Host broadcast</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">One message to every room</h3>
            </div>
            <Input
              value={broadcast}
              onChange={(event) => setBroadcast(event.target.value)}
              placeholder="Share a prompt, warning, or 60-second wrap-up message..."
            />
            <Button variant="primary" disabled={!broadcast.trim()}>
              <MessageSquareShare className="h-4 w-4" />
              Broadcast
            </Button>

            <div className="rounded-[24px] border border-white/10 bg-black/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                <Clock3 className="h-4 w-4 text-cyan-200" />
                Activity feed
              </div>
              <div className="space-y-3 text-sm text-white/60">
                {rooms
                  .slice()
                  .sort((left, right) => right.activity - left.activity)
                  .map((room) => (
                    <div key={room.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                      <span>{room.label}</span>
                      <span>{room.activity}% active</span>
                    </div>
                  ))}
              </div>
            </div>

            <Button variant="outline" onClick={onClose}>
              Rejoin Main Room
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}
