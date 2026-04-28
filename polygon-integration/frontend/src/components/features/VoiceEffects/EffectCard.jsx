import { motion } from 'framer-motion';

export default function EffectCard({ effect, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-3 rounded-xl text-left transition-all
        ${active 
          ? 'bg-app-primary/20 border-2 border-app-primary ring-4 ring-app-primary/20' 
          : 'glass hover:bg-app-surface'}
      `}
    >
      <div className="text-2xl mb-1">{effect.icon}</div>
      <h4 className="text-sm font-semibold">{effect.name}</h4>
      <p className="text-xs text-gray-400">{effect.description}</p>
    </motion.button>
  );
}
