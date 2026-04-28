import { motion } from 'framer-motion';

export default function AgendaProgress({ elapsed, total, items }) {
  const percentage = Math.min((elapsed / total) * 100, 100);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{formatTime(elapsed)} elapsed</span>
        <span>{formatTime(total - elapsed)} remaining</span>
      </div>
      
      <div className="h-2 bg-app-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-app-primary to-app-secondary"
        />
      </div>
      
      {/* Item markers */}
      <div className="relative h-4 mt-1">
        {items.reduce((acc, item, i) => {
          const prevTotal = items.slice(0, i).reduce((a, it) => a + it.duration, 0);
          const position = (prevTotal / (total / 60)) * 100;
          
          acc.push(
            <div
              key={item.id}
              className={`absolute w-1 h-2 rounded-full ${
                item.status === 'done' ? 'bg-green-400' : 
                item.status === 'active' ? 'bg-app-primary' : 'bg-gray-500'
              }`}
              style={{ left: `${position}%` }}
              title={item.title}
            />
          );
          return acc;
        }, [])}
      </div>
    </div>
  );
}
