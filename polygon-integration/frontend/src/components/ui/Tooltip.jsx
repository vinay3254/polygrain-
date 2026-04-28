import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tooltip component with glassmorphic styling
 * @param {Object} props
 * @param {string} props.content - Tooltip content
 * @param {React.ReactNode} props.children - Element to show tooltip on
 * @param {'top'|'bottom'|'left'|'right'} props.position - Tooltip position
 */
export default function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-t-transparent border-b-transparent border-l-transparent'
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}

      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 px-3 py-2 
              bg-gray-900/95 backdrop-blur-md 
              border border-white/20 
              rounded-lg text-sm text-white 
              whitespace-nowrap shadow-xl
              pointer-events-none
              ${positionStyles[position]}
              ${className}
            `}
            role="tooltip"
          >
            {content}
            
            {/* Arrow */}
            <div
              className={`
                absolute w-2 h-2 
                bg-gray-900/95 
                border border-white/20
                rotate-45
                ${arrowStyles[position]}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
