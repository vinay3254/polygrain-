import { motion } from 'framer-motion';
import { Smile, Meh, Frown } from 'lucide-react';

export default function SentimentMeter({ sentiment = 'positive' }) {
  const getColor = () => {
    switch(sentiment) {
      case 'positive': return 'text-green-400';
      case 'neutral': return 'text-yellow-400';
      case 'tense': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const getIcon = () => {
    switch(sentiment) {
      case 'positive': return <Smile />;
      case 'neutral': return <Meh />;
      case 'tense': return <Frown />;
      default: return <Meh />;
    }
  };
  
  const getPosition = () => {
    switch(sentiment) {
      case 'positive': return '80%';
      case 'neutral': return '50%';
      case 'tense': return '20%';
      default: return '50%';
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">Room Energy</span>
        <span className={`font-semibold capitalize ${getColor()}`}>{sentiment}</span>
      </div>
      
      <div className="relative h-2 bg-app-surface rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-50" />
        <motion.div
          animate={{ left: getPosition() }}
          transition={{ type: 'spring', stiffness: 100 }}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 ${getColor()}`}
        >
          {getIcon()}
        </motion.div>
      </div>
    </div>
  );
}
