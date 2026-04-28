import { motion } from 'framer-motion';
import { Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MeetingPace({ pace = 'on-track' }) {
  const paceConfig = {
    'on-track': {
      color: 'text-green-400',
      bg: 'bg-green-400/20',
      icon: <CheckCircle2 />,
      label: 'On Track',
      description: 'Meeting is progressing well'
    },
    'too-fast': {
      color: 'text-orange-400',
      bg: 'bg-orange-400/20',
      icon: <AlertTriangle />,
      label: 'Too Fast',
      description: 'Consider slowing down'
    },
    'too-slow': {
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/20',
      icon: <AlertTriangle />,
      label: 'Too Slow',
      description: 'Try to pick up the pace'
    }
  };
  
  const config = paceConfig[pace] || paceConfig['on-track'];
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`glass-card rounded-xl p-4 ${config.bg} border-2 border-current ${config.color}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{config.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Gauge size={16} />
            <h4 className="font-semibold">Meeting Pace: {config.label}</h4>
          </div>
          <p className="text-xs text-gray-400 mt-1">{config.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
