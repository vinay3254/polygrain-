import { motion } from 'framer-motion';

/**
 * Card component with glassmorphic styling
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {React.ReactNode} props.actions - Action buttons for header
 * @param {boolean} props.hoverable - Enable hover lift effect
 */
export default function Card({
  children,
  title,
  icon,
  actions,
  hoverable = false,
  className = '',
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20
        rounded-2xl shadow-xl overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Header */}
      {(title || icon || actions) && (
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-indigo-600/20 border border-indigo-400/30 rounded-lg text-indigo-400">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="text-xl font-bold text-white">
                {title}
              </h3>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 text-white/90">
        {children}
      </div>
    </motion.div>
  );
}
