import { motion } from 'framer-motion';

/**
 * Avatar component with glassmorphic styling
 * @param {Object} props
 * @param {string} props.name - User's name (for initials)
 * @param {string} props.src - Image source URL
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Avatar size
 * @param {'online'|'offline'|'away'} props.status - User status
 */
export default function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl'
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const statusColors = {
    online: 'bg-green-500 border-green-400',
    offline: 'bg-gray-500 border-gray-400',
    away: 'bg-yellow-500 border-yellow-400'
  };

  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        relative inline-flex items-center justify-center 
        rounded-full overflow-hidden
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(212,175,55,0.82),rgba(52,88,148,0.9))]" />
      
      <div className="absolute inset-0.5 flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(180deg,rgba(17,23,38,0.98),rgba(8,11,20,0.96))]">
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-poppins font-semibold tracking-[0.04em] text-white/90">
            {getInitials(name)}
          </span>
        )}
      </div>

      {status && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
            absolute bottom-0 right-0 
            ${statusSizes[size]}
            ${statusColors[status]}
            rounded-full border-2 border-gray-900
          `}
        />
      )}
    </motion.div>
  );
}
