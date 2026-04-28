import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

export default function RecordingIndicator({ time }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card rounded-xl p-3 flex items-center gap-3 bg-app-danger/10 border border-app-danger/30"
    >
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Circle className="text-app-danger" size={16} fill="currentColor" />
      </motion.div>
      
      <div className="flex-1">
        <span className="font-mono font-bold">{time}</span>
      </div>
      
      <span className="text-xs text-app-danger font-semibold">REC</span>
    </motion.div>
  );
}
