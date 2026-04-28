import { motion } from 'framer-motion';

const COLORS = [
  '#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#6366F1', '#10B981', '#F97316', '#84CC16'
];

export default function ColorPicker({ onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {COLORS.map((color, index) => (
        <motion.button
          key={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(color)}
          className="aspect-square rounded-xl ring-2 ring-white/20 hover:ring-4 transition-all"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
