import { motion } from 'framer-motion';

const PRESET_BACKGROUNDS = [
  { id: 'office', name: 'Modern Office', type: 'image', value: '🏢', category: 'professional' },
  { id: 'cafe', name: 'Cozy Cafe', type: 'image', value: '☕', category: 'casual' },
  { id: 'space', name: 'Space', type: 'image', value: '🌌', category: 'creative' },
  { id: 'beach', name: 'Beach', type: 'image', value: '🏖️', category: 'casual' },
  { id: 'library', name: 'Library', type: 'image', value: '📚', category: 'professional' },
  { id: 'neon-city', name: 'Neon City', type: 'image', value: '🌃', category: 'creative' },
  { id: 'mountain', name: 'Mountain View', type: 'image', value: '🏔️', category: 'nature' },
  { id: 'abstract', name: 'Abstract', type: 'image', value: '🎨', category: 'creative' },
];

export default function BackgroundGallery({ onSelect, selected }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto max-h-96">
      {PRESET_BACKGROUNDS.map((bg, index) => (
        <motion.div
          key={bg.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect(bg)}
          className={`
            glass-card rounded-lg aspect-video cursor-pointer overflow-hidden relative
            ${selected?.id === bg.id ? 'ring-4 ring-app-primary' : ''}
          `}
        >
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-app-surface to-app-card">
            {bg.value}
          </div>
          <div className="absolute bottom-0 left-0 right-0 glass p-2">
            <p className="text-xs font-semibold text-center">{bg.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
