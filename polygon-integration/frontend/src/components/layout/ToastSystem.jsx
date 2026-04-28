import { useEffect } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { TOAST_TYPES } from '../../utils/constants';

export default function ToastSystem() {
  const { toasts, removeToast } = useUI();

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onClose }) {
  const { id, message, type = TOAST_TYPES.INFO, duration = 5000 } = toast;

  // Auto-dismiss after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    [TOAST_TYPES.SUCCESS]: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      iconColor: 'text-green-400',
    },
    [TOAST_TYPES.ERROR]: {
      icon: XCircle,
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/50',
      iconColor: 'text-red-400',
    },
    [TOAST_TYPES.WARNING]: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50',
      iconColor: 'text-yellow-400',
    },
    [TOAST_TYPES.INFO]: {
      icon: Info,
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50',
      iconColor: 'text-blue-400',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor } = config[type] || config[TOAST_TYPES.INFO];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={`glass-card ${bgColor} border ${borderColor} p-4 flex items-start gap-3 shadow-lg min-w-[320px]`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />

      {/* Message */}
      <p className="flex-1 text-white text-sm font-medium">{message}</p>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-[#D4B571] hover:text-white transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
