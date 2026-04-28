import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const icons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

const colors = {
  warning: 'text-yellow-400',
  info: 'text-blue-400',
  success: 'text-green-400',
};

export default function ActivityLog({ entries }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-2">
      {entries.sort((a, b) => b.time - a.time).map((entry) => {
        const Icon = icons[entry.type];
        
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-3 rounded-lg flex items-start gap-3"
          >
            <Icon className={`${colors[entry.type]} shrink-0 mt-0.5`} size={16} />
            <div className="flex-1 min-w-0">
              <p className="text-sm">{entry.message}</p>
              <p className="text-xs text-gray-400">{formatTime(entry.time)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
