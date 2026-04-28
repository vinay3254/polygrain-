import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Input component with glassmorphic styling
 * @param {Object} props
 * @param {string} props.type - Input type (text, number, email, password)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {React.ReactNode} props.icon - Optional icon element
 */
function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  icon,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            boxShadow: isFocused
              ? '0 0 0 3px rgba(212, 181, 113, 0.25)'
              : '0 0 0 0px rgba(212, 181, 113, 0)'
          }}
          className={`
            w-full px-4 py-2.5 
            ${icon ? 'pl-10' : ''}
            bg-white/10 backdrop-blur-md 
            border ${error ? 'border-red-400/50' : 'border-white/20'} 
            rounded-lg 
            text-white placeholder-white/40
            focus:outline-none focus:border-indigo-400/50
            transition-all duration-200
          `}
          {...props}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-red-400 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

export { Input };
export default Input;
