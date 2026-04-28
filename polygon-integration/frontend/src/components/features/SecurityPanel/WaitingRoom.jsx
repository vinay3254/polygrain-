import { motion } from 'framer-motion';
import { Check, X, Clock, Monitor } from 'lucide-react';
import Button from '../../ui/Button';

export default function WaitingRoom({ participants, onAdmit, onDeny }) {
  const formatWaitTime = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m`;
  };
  
  return (
    <div className="space-y-2">
      {participants.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="glass-card p-3 rounded-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">{p.name}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              {formatWaitTime(p.time)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <Monitor size={12} />
            {p.device}
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => onAdmit(p.id)} icon={<Check />}>
              Admit
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDeny(p.id)} icon={<X />}>
              Deny
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
