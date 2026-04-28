import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const MOCK_PARTICIPANTS = ['Alice', 'Bob', 'Charlie', 'Diana', 'You'];

export default function Leaderboard({ scores, onClose }) {
  const sortedScores = MOCK_PARTICIPANTS
    .map((name, i) => ({ name, score: scores[`user-${i}`] || Math.floor(Math.random() * 300) }))
    .sort((a, b) => b.score - a.score);
  
  const icons = [Trophy, Medal, Award];
  const colors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-syne font-bold text-xl text-center mb-6">🏆 Leaderboard</h3>
      
      <div className="space-y-2">
        {sortedScores.map((player, i) => {
          const Icon = icons[i] || null;
          
          return (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-4 rounded-xl flex items-center gap-3 ${
                player.name === 'You' ? 'ring-2 ring-app-primary' : ''
              }`}
            >
              <span className={`text-xl font-bold ${colors[i] || 'text-gray-400'}`}>
                #{i + 1}
              </span>
              {Icon && <Icon className={colors[i]} size={20} />}
              <span className="flex-1 font-semibold">{player.name}</span>
              <span className="text-lg font-bold text-app-primary">{player.score}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
