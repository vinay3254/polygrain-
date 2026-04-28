import { motion } from 'framer-motion';

/**
 * Badge component with glassmorphic styling
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'success'|'warning'|'danger'|'info'} props.variant - Badge style variant
 * @param {'sm'|'md'|'lg'} props.size - Badge size
 * @param {React.ReactNode} props.icon - Optional icon element
 */
export default function Badge({
  children,
  variant = 'info',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const variantStyles = {
    success: 'bg-green-500/20 text-green-300 border-green-400/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    danger: 'bg-red-500/20 text-red-300 border-red-400/30',
    info: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center gap-1.5 
        rounded-full font-medium 
        backdrop-blur-md border
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}
