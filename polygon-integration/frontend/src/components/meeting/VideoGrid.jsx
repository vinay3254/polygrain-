import { motion } from 'framer-motion';
import VideoTile from './VideoTile';

function getGridClass(participantCount) {
  if (participantCount <= 1) {
    return 'grid-cols-1';
  }

  if (participantCount <= 4) {
    return 'grid-cols-1 sm:grid-cols-2';
  }

  if (participantCount <= 8) {
    return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
  }

  return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4';
}

export default function VideoGrid({ participants }) {
  if (!participants.length) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-white/52">
        Waiting for participants to join the room.
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`grid min-h-[520px] gap-4 auto-rows-[minmax(210px,1fr)] md:auto-rows-[minmax(230px,1fr)] ${getGridClass(
        participants.length,
      )}`}
    >
      {participants.map((participant, index) => (
        <VideoTile key={participant.id} participant={participant} index={index} />
      ))}
    </motion.div>
  );
}
