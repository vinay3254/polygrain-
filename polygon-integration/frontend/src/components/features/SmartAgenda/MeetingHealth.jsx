import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MeetingHealth({ status }) {
  const config = {
    'on-time': { 
      icon: <Minus />, 
      label: 'On Track', 
      color: 'text-green-400', 
      bg: 'bg-green-400/20' 
    },
    'ahead': { 
      icon: <TrendingUp />, 
      label: 'Ahead of Schedule', 
      color: 'text-blue-400', 
      bg: 'bg-blue-400/20' 
    },
    'behind': { 
      icon: <TrendingDown />, 
      label: 'Behind Schedule', 
      color: 'text-orange-400', 
      bg: 'bg-orange-400/20' 
    },
  };
  
  const { icon, label, color, bg } = config[status];
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${bg} ${color} rounded-lg p-2 flex items-center gap-2`}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </motion.div>
  );
}
