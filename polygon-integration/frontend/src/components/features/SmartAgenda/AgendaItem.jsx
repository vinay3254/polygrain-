import { motion } from 'framer-motion';
import { Check, Clock, User, AlertCircle } from 'lucide-react';

export default function AgendaItem({ item, index, isActive, currentTime }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const isOvertime = currentTime !== null && currentTime > item.duration * 60;
  const progress = currentTime !== null 
    ? Math.min((currentTime / (item.duration * 60)) * 100, 100) 
    : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        glass-card rounded-xl p-4 relative overflow-hidden
        ${isActive ? 'ring-2 ring-app-primary' : ''}
        ${item.status === 'done' ? 'opacity-60' : ''}
      `}
    >
      {/* Progress overlay */}
      {isActive && (
        <motion.div
          animate={{ width: `${progress}%` }}
          className={`absolute inset-y-0 left-0 ${
            isOvertime ? 'bg-app-danger/20' : 'bg-app-primary/20'
          }`}
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start gap-3">
          {/* Status Icon */}
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center shrink-0
            ${item.status === 'done' ? 'bg-green-500/20 text-green-400' : ''}
            ${item.status === 'active' ? 'bg-app-primary/20 text-app-primary' : ''}
            ${item.status === 'pending' ? 'bg-gray-500/20 text-gray-400' : ''}
          `}>
            {item.status === 'done' ? (
              <Check size={16} />
            ) : (
              <span className="text-sm font-bold">{index + 1}</span>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{item.title}</h4>
            
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {item.duration} min
                {item.status === 'done' && item.actualTime !== item.duration && (
                  <span className={item.actualTime > item.duration ? 'text-red-400' : 'text-green-400'}>
                    (actual: {item.actualTime}m)
                  </span>
                )}
              </span>
              <span className="flex items-center gap-1">
                <User size={12} />
                {item.owner}
              </span>
            </div>
          </div>
          
          {/* Timer for active item */}
          {isActive && currentTime !== null && (
            <div className={`
              text-lg font-mono font-bold
              ${isOvertime ? 'text-app-danger' : 'text-app-primary'}
            `}>
              {isOvertime && <AlertCircle size={16} className="inline mr-1" />}
              {formatTime(currentTime)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
