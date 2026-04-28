import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Button component with glassmorphic styling
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'|'danger'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 */
function Button({ 
  variant = 'primary', 
  size = 'md', 
  icon = null,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  className = '',
  ...props 
}) {
  const [ripples, setRipples] = useState([]);

  const baseStyles = 'relative overflow-hidden rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md border';
  
  const variantStyles = {
    primary: 'bg-indigo-600/80 hover:bg-indigo-600/90 text-white border-indigo-400/30 shadow-lg shadow-indigo-500/20',
    secondary: 'bg-cyan-500/80 hover:bg-cyan-500/90 text-white border-cyan-400/30 shadow-lg shadow-cyan-500/20',
    ghost: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    outline: 'bg-transparent hover:bg-white/10 text-white border-white/20',
    danger: 'bg-red-500/80 hover:bg-red-500/90 text-white border-red-400/30 shadow-lg shadow-red-500/20'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'w-11 h-11 text-base'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? disabledStyles : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
      
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      
      {children}
    </motion.button>
  );
}

export { Button };
export default Button;
