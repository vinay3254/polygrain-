import { motion } from 'framer-motion';

export default function FloatingVideoTile({ delay = 0, position, avatar = '👤' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4], 
        y: [0, -20, 0] 
      }}
      transition={{ 
        duration: 6, 
        delay, 
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="absolute glass-card p-2 rounded-xl backdrop-blur-md border border-white/10"
      style={position}
    >
      <div className="w-32 h-24 bg-app-surface rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-3xl">{avatar}</span>
      </div>
    </motion.div>
  );
}
