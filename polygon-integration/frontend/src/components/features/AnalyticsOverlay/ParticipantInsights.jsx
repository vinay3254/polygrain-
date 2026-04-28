import { motion } from 'framer-motion';
import { AlertCircle, MessageCircleOff } from 'lucide-react';
import Badge from '../../ui/Badge';

export default function ParticipantInsights({ interruptions, participants }) {
  const quietParticipants = participants.filter((p, i) => 
    Math.random() > 0.7 // Mock: some participants haven't spoken
  );
  
  return (
    <div className="space-y-3">
      {/* Interruption Counter */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400">Interruptions</p>
        {interruptions.map((p, index) => (
          <div key={p.name} className="flex items-center justify-between text-sm">
            <span>{p.name}</span>
            <Badge variant={p.count > 3 ? 'danger' : 'warning'}>{p.count}</Badge>
          </div>
        ))}
      </div>
      
      {/* Quiet Participants */}
      {quietParticipants.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 glass rounded-lg border border-yellow-400/30"
        >
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <MessageCircleOff size={16} />
            <span className="text-xs font-semibold">Haven't Spoken Yet</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {quietParticipants.map(p => (
              <Badge key={p.id} variant="warning">{p.name}</Badge>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
