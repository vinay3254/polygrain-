import { motion } from 'framer-motion';

/**
 * Switch component with glassmorphic styling
 * @param {Object} props
 * @param {boolean} props.checked - Switch state
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Switch label
 * @param {boolean} props.disabled - Disabled state
 */
export default function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <label
      className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="relative">
        {/* Hidden checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Track */}
        <motion.div
          animate={{
            backgroundColor: checked 
              ? 'rgba(212, 181, 113, 0.8)' 
              : 'rgba(255, 255, 255, 0.1)'
          }}
          className={`
            w-14 h-7 rounded-full 
            backdrop-blur-md border
            ${checked ? 'border-[#D4B571]/30' : 'border-white/20'}
            transition-colors duration-200
          `}
        />

        {/* Handle */}
        <motion.div
          animate={{
            x: checked ? 28 : 2,
            background: checked
              ? 'linear-gradient(135deg, #D4B571 0%, #6F5115 100%)'
              : 'rgba(255, 255, 255, 0.9)'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-0 w-5 h-5 rounded-full shadow-lg"
        />
      </div>

      {label && (
        <span className="text-sm font-medium text-white/90">
          {label}
        </span>
      )}
    </label>
  );
}
