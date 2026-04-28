import { motion } from 'framer-motion';
import { Hand, Mic, MicOff, Signal, Video, VideoOff } from 'lucide-react';
import Avatar from '../ui/Avatar';

const networkTone = {
  strong: 'bg-emerald-400',
  fair: 'bg-amber-400',
  weak: 'bg-red-400',
};

export default function ParticipantsPanel({ participants }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Live roster</p>
        <p className="mt-2 text-xl font-semibold text-white">{participants.length} in the room</p>
        <p className="mt-2 text-sm text-white/50">Presence, media, hands, and connection quality update live.</p>
      </div>

      {participants.map((participant) => (
        <motion.article
          key={participant.id}
          whileHover={{ y: -2 }}
          className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <div className="flex items-center gap-3">
            <Avatar name={participant.name} size="lg" status="online" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-white">{participant.name}</p>
                <span className="rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {participant.role}
                </span>
                {participant.isHandRaised && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/15 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-200">
                    <Hand className="h-3 w-3" />
                    Hand up
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-white/40">{participant.email}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/10 px-2 py-1">
              <Signal className="h-3.5 w-3.5 text-white/45" />
              <span className={`h-2.5 w-2.5 rounded-full ${networkTone[participant.networkQuality] || networkTone.strong}`} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <StatusPill active={!participant.isMuted} icon={participant.isMuted ? MicOff : Mic} label={participant.isMuted ? 'Muted' : 'Mic live'} />
            <StatusPill active={!participant.isVideoOff} icon={participant.isVideoOff ? VideoOff : Video} label={participant.isVideoOff ? 'Camera off' : 'Camera live'} />
            <StatusPill active={participant.isSpeaking} icon={Signal} label={participant.isSpeaking ? 'Speaking' : 'Quiet'} />
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function StatusPill({ active, icon: Icon, label }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs ${
        active ? 'border-cyan-400/15 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-black/10 text-white/50'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
