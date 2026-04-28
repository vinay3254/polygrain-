import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Dropdown component with glassmorphic styling
 * @param {Object} props
 * @param {React.ReactNode} props.trigger - Element that triggers the dropdown
 * @param {Array} props.items - Array of items { label, onClick, icon, disabled }
 * @param {'bottom-left'|'bottom-right'|'top-left'|'top-right'} props.position - Dropdown position
 */
export default function Dropdown({
  trigger,
  items = [],
  position = 'bottom-left',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const positionStyles = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2'
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
        return;
      }

      if (!isOpen) return;

      const enabledItems = items.filter(item => !item.disabled);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < enabledItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : enabledItems.length - 1
        );
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        const item = enabledItems[focusedIndex];
        item?.onClick?.();
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, items, focusedIndex]);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`} {...props}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 min-w-[200px]
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-xl border border-white/20
              rounded-xl shadow-2xl overflow-hidden
              ${positionStyles[position]}
            `}
          >
            <div className="py-2">
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.();
                      setIsOpen(false);
                      setFocusedIndex(-1);
                    }
                  }}
                  disabled={item.disabled}
                  className={`
                    w-full px-4 py-2.5 text-left
                    flex items-center gap-3
                    text-white transition-colors
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    ${focusedIndex === index ? 'bg-white/10' : ''}
                  `}
                >
                  {item.icon && (
                    <span className="text-white/70">{item.icon}</span>
                  )}
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
