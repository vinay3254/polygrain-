import { motion } from 'framer-motion';

const LAYOUTS = [
  { id: 'grid', name: 'Grid', icon: '⊞' },
  { id: 'speaker', name: 'Active Speaker', icon: '◰' },
  { id: 'sidebyside', name: 'Side by Side', icon: '⊟' },
];

export default function LayoutSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {LAYOUTS.map((layout) => (
        <motion.button
          key={layout.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(layout.id)}
          className={`
            p-3 rounded-xl text-center transition-all
            ${value === layout.id 
              ? 'bg-app-primary text-white' 
              : 'glass hover:bg-app-surface'}
          `}
        >
          <div className="text-2xl mb-1">{layout.icon}</div>
          <div className="text-xs">{layout.name}</div>
        </motion.button>
      ))}
    </div>
  );
}
