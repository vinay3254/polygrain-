import { motion } from 'framer-motion';
import { useEffect } from 'react';

const REACTIONS = ['👍', '❤️', '😂', '😮', '👏', '🎉', '🔥', '💯'];

export default function ReactionPicker({ onSelect, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e) => {
      if (e.target.closest('.reaction-picker')) return;
      onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      className="reaction-picker absolute bottom-full mb-2 glass-card p-3 rounded-xl flex gap-2 shadow-2xl"
    >
      {REACTIONS.map((emoji, i) => (
        <motion.button
          key={emoji}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(emoji)}
          className="text-3xl hover:bg-app-surface p-2 rounded-lg transition-colors"
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
}
