import { motion } from 'framer-motion';

export default function FloatingReaction({ emoji, id, onComplete }) {
  // Random horizontal drift
  const randomX = Math.random() * 60 - 30;
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
      animate={{ 
        opacity: [1, 1, 0],
        y: -200,
        x: randomX,
        scale: [0, 1.5, 1],
      }}
      transition={{ duration: 3, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
      className="absolute bottom-24 left-1/2 text-5xl pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {emoji}
    </motion.div>
  );
}
