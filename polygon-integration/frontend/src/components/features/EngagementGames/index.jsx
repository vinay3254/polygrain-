import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Trophy, BarChart3, MessageCircle, Brain, Smile, Users } from 'lucide-react';
import Button from '../../ui/Button';
import QuickPoll from './games/QuickPoll';
import WordAssociation from './games/WordAssociation';
import TwoTruthsOneLie from './games/TwoTruthsOneLie';
import TriviaQuiz from './games/TriviaQuiz';
import EmojiMoodCheck from './games/EmojiMoodCheck';
import SpeedNetworking from './games/SpeedNetworking';
import Leaderboard from './Leaderboard';

const GAMES = [
  { id: 'poll', name: 'Quick Poll', icon: BarChart3, description: 'Create instant polls', color: 'app-primary' },
  { id: 'word', name: 'Word Association', icon: MessageCircle, description: 'Word cloud game', color: 'app-secondary' },
  { id: 'truths', name: '2 Truths 1 Lie', icon: Brain, description: 'Guess the lie', color: 'app-ai' },
  { id: 'trivia', name: 'Trivia Quiz', icon: Trophy, description: '5 questions', color: 'yellow-400' },
  { id: 'emoji', name: 'Emoji Mood Check', icon: Smile, description: 'How are you feeling?', color: 'pink-400' },
  { id: 'speed', name: 'Speed Networking', icon: Users, description: '2-min 1-on-1s', color: 'purple-400' },
];

export default function EngagementGames({ isOpen, onClose }) {
  const [activeGame, setActiveGame] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scores, setScores] = useState({});
  
  const updateScore = (participantId, points) => {
    setScores(prev => ({
      ...prev,
      [participantId]: (prev[participantId] || 0) + points
    }));
  };
  
  const renderActiveGame = () => {
    const props = { onClose: () => setActiveGame(null), onScore: updateScore };
    
    switch(activeGame) {
      case 'poll': return <QuickPoll {...props} />;
      case 'word': return <WordAssociation {...props} />;
      case 'truths': return <TwoTruthsOneLie {...props} />;
      case 'trivia': return <TriviaQuiz {...props} />;
      case 'emoji': return <EmojiMoodCheck {...props} />;
      case 'speed': return <SpeedNetworking {...props} />;
      default: return null;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-40"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-app-secondary" size={24} />
            <div>
              <h2 className="font-syne font-bold">Engagement Games</h2>
              <p className="text-xs text-gray-400">Icebreakers & fun</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        {/* Leaderboard Button */}
        {Object.keys(scores).length > 0 && (
          <Button
            variant="secondary"
            fullWidth
            className="mt-3"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            icon={<Trophy />}
          >
            View Leaderboard
          </Button>
        )}
      </div>
      
      {/* Games Grid or Active Game */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeGame ? (
            renderActiveGame()
          ) : showLeaderboard ? (
            <Leaderboard scores={scores} onClose={() => setShowLeaderboard(false)} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {GAMES.map((game, index) => (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveGame(game.id)}
                  className="glass-card p-4 rounded-xl text-center hover:bg-app-surface transition-colors"
                >
                  <game.icon className={`text-${game.color} mx-auto mb-2`} size={32} />
                  <h3 className="text-sm font-semibold">{game.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{game.description}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
