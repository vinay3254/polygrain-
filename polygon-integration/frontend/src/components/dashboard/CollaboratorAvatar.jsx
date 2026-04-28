import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

export default function CollaboratorAvatar({ name, avatar, meetingCount }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-app-surface/50 transition-colors cursor-pointer"
    >
      <div className="relative">
        <Avatar name={name} src={avatar} size="lg" />
        <Badge variant="info" className="absolute -bottom-1 -right-1 min-w-[1.5rem] text-center">
          {meetingCount}
        </Badge>
      </div>
      <span className="text-xs text-center line-clamp-1 max-w-[80px]">{name}</span>
    </motion.div>
  );
}
