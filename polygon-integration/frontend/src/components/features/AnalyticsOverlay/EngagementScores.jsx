import { motion } from 'framer-motion';
import { MessageSquare, Smile } from 'lucide-react';

export default function EngagementScores({ data }) {
  if (!data || data.length === 0) return null;
  
  return (
    <div className="space-y-2">
      {data.map((participant, index) => (
        <motion.div
          key={participant.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass p-3 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{participant.name}</span>
            <span className={`text-sm font-bold ${
              participant.score >= 80 ? 'text-green-400' :
              participant.score >= 60 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {participant.score}%
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-1.5 bg-app-surface rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${participant.score}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${
                participant.score >= 80 ? 'bg-green-400' :
                participant.score >= 60 ? 'bg-yellow-400' :
                'bg-red-400'
              }`}
            />
          </div>
          
          {/* Activity indicators */}
          <div className="flex gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MessageSquare size={12} />
              {participant.messages} messages
            </span>
            <span className="flex items-center gap-1">
              <Smile size={12} />
              {participant.reactions} reactions
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
