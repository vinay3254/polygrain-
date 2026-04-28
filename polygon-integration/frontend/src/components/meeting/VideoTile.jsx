import { motion } from 'framer-motion';
import { Hand, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import Avatar from '../ui/Avatar';

const networkTone = {
  strong: '#66d9a3',
  fair: '#f2c66d',
  weak: '#ff8c7a',
};

const tileThemes = [
  {
    background:
      'radial-gradient(circle at 18% 16%, rgba(212,175,55,0.18), transparent 26%), radial-gradient(circle at 82% 18%, rgba(63,101,171,0.24), transparent 36%), linear-gradient(145deg, rgba(13,18,30,0.98), rgba(7,10,18,0.94))',
    orb: 'linear-gradient(180deg, rgba(212,175,55,0.36), rgba(212,175,55,0.02))',
  },
  {
    background:
      'radial-gradient(circle at 22% 18%, rgba(65,104,180,0.24), transparent 28%), radial-gradient(circle at 78% 22%, rgba(212,175,55,0.16), transparent 34%), linear-gradient(145deg, rgba(10,16,29,0.98), rgba(6,9,18,0.94))',
    orb: 'linear-gradient(180deg, rgba(78,125,214,0.34), rgba(78,125,214,0.04))',
  },
  {
    background:
      'radial-gradient(circle at 24% 18%, rgba(212,175,55,0.18), transparent 26%), radial-gradient(circle at 72% 76%, rgba(42,76,138,0.22), transparent 30%), linear-gradient(145deg, rgba(12,17,31,0.98), rgba(5,8,16,0.94))',
    orb: 'linear-gradient(180deg, rgba(212,175,55,0.28), rgba(212,175,55,0.02))',
  },
];

export default function VideoTile({ participant, index = 0, compact = false }) {
  const theme = tileThemes[index % tileThemes.length];
  const borderClass = participant.isSpeaking
    ? 'border-[#D4B571]/50 shadow-[0_0_0_1px_rgba(212,175,55,0.16),0_24px_60px_rgba(0,0,0,0.34)]'
    : 'border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.28)]';

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      whileHover={{ scale: compact ? 1.01 : 1.015, y: -2 }}
      className={`group relative overflow-hidden rounded-[20px] border ${borderClass}`}
      style={{
        background: theme.background,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(3,5,10,0.55))]" />
      <div className="absolute left-1/2 top-[22%] h-40 w-40 -translate-x-1/2 rounded-full blur-3xl" style={{ background: theme.orb }} />

      <div className={`relative flex h-full flex-col justify-between ${compact ? 'min-h-[160px] p-4' : 'min-h-[220px] p-5'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#060a12]/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/48 backdrop-blur-xl">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: networkTone[participant.networkQuality] || networkTone.strong }}
            />
            {compact ? 'Preview' : 'Online'}
          </div>

          {participant.isSpeaking ? (
            <div className="rounded-full border border-[#D4B571]/24 bg-[#D4B571]/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#E8D18D]">
              Active speaker
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-center">
          {participant.isVideoOff ? (
            <div className="rounded-full border border-white/10 bg-white/[0.05] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Avatar name={participant.name} size={compact ? 'lg' : 'xl'} />
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute h-24 w-24 rounded-full border border-white/8 bg-white/[0.04] blur-2xl" />
              <div className="relative rounded-full border border-white/10 bg-white/[0.04] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Avatar name={participant.name} size={compact ? 'md' : 'lg'} />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/8 bg-[#070c14]/62 px-3 py-1.5 backdrop-blur-xl">
              <p className="truncate text-sm font-medium text-white">{participant.name}</p>
              {compact ? (
                <span className="rounded-full bg-[#D4B571]/14 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#E8D18D]">
                  You
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-white/38">
              {participant.isVideoOff ? 'Camera off' : 'Live feed'} {participant.role ? `· ${participant.role}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/8 bg-[#060a12]/62 px-3 py-2 text-white/70 backdrop-blur-xl">
            {participant.isMuted ? (
              <MicOff className="h-4 w-4 text-red-300" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            {participant.isVideoOff ? (
              <VideoOff className="h-4 w-4 text-white/55" />
            ) : (
              <Video className="h-4 w-4" />
            )}
            {participant.isHandRaised ? <Hand className="h-4 w-4 text-[#E8D18D]" /> : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
