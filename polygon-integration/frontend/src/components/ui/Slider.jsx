import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Slider component with glassmorphic styling
 * @param {Object} props
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Slider label
 * @param {boolean} props.showValue - Show value tooltip
 */
export default function Slider({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  label,
  showValue = true,
  className = '',
  ...props
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-white/90">
            {label}
          </label>
          {showValue && (
            <span className="text-sm font-semibold text-indigo-400">
              {value}
            </span>
          )}
        </div>
      )}

      <div
        className="relative h-8 flex items-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Track */}
        <div className="absolute w-full h-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden">
          {/* Fill */}
          <motion.div
            className="h-full bg-gradient-cta"
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
          {...props}
        />

        {/* Thumb */}
        <motion.div
          className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-2 border-indigo-500 pointer-events-none"
          style={{ left: `calc(${percentage}% - 10px)` }}
          animate={{
            scale: isHovering || isDragging ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Tooltip */}
        <AnimatePresence>
          {(isHovering || isDragging) && showValue && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-10 bg-indigo-600/90 backdrop-blur-md border border-indigo-400/30 px-3 py-1 rounded-lg text-sm font-semibold text-white shadow-lg"
              style={{ left: `calc(${percentage}% - 20px)` }}
            >
              {value}
              <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-indigo-600/90 rotate-45 border-r border-b border-indigo-400/30" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
