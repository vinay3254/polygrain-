import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, RefreshCw } from 'lucide-react';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

const STARTER_WORDS = ['Innovation', 'Teamwork', 'Success', 'Growth', 'Creativity'];

const MOCK_RESPONSES = [
  { word: 'Ideas', user: 'Alice', size: 1.4 },
  { word: 'Collaboration', user: 'Bob', size: 1.2 },
  { word: 'Progress', user: 'Charlie', size: 1.1 },
  { word: 'Vision', user: 'Diana', size: 1.3 },
  { word: 'Goals', user: 'Eve', size: 1.0 },
  { word: 'Leadership', user: 'Frank', size: 1.2 },
  { word: 'Results', user: 'Grace', size: 1.1 },
];

export default function WordAssociation({ onClose, onScore }) {
  const [starterWord, setStarterWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [userWord, setUserWord] = useState('');
  const [wordCloud, setWordCloud] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const startGame = (word) => {
    setStarterWord(word || STARTER_WORDS[Math.floor(Math.random() * STARTER_WORDS.length)]);
    setIsActive(true);
    setWordCloud([]);
    setHasSubmitted(false);
  };
  
  const submitWord = () => {
    if (!userWord.trim()) return;
    
    setWordCloud(prev => [...prev, { 
      word: userWord, 
      user: 'You', 
      size: 1.5,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20
    }]);
    setHasSubmitted(true);
    setUserWord('');
    onScore?.('user-1', 50);
  };
  
  // Simulate other participants submitting words
  useEffect(() => {
    if (!isActive || !hasSubmitted) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < MOCK_RESPONSES.length) {
        const response = MOCK_RESPONSES[index];
        setWordCloud(prev => [...prev, {
          ...response,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20
        }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, [isActive, hasSubmitted]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-bold text-lg">Word Association</h3>
        <Button variant="ghost" onClick={onClose} icon={<X />} />
      </div>
      
      {!isActive ? (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Choose a starter word or create your own. Everyone will submit a word they associate with it!
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            {STARTER_WORDS.map((word) => (
              <motion.button
                key={word}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startGame(word)}
                className="glass-card p-3 rounded-xl text-center hover:bg-app-surface transition-colors"
              >
                {word}
              </motion.button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-app-dark text-sm text-gray-400">or</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={userWord}
              onChange={(e) => setUserWord(e.target.value)}
              placeholder="Enter custom word..."
              className="flex-1"
            />
            <Button 
              variant="primary" 
              onClick={() => startGame(userWord)}
              disabled={!userWord.trim()}
              icon={<Send />}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Starter Word Display */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-400 mb-2">The word is:</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-syne font-bold text-app-primary"
            >
              {starterWord}
            </motion.div>
          </div>
          
          {/* Word Input */}
          {!hasSubmitted && (
            <div className="flex gap-2">
              <Input
                value={userWord}
                onChange={(e) => setUserWord(e.target.value)}
                placeholder="What comes to mind?"
                onKeyDown={(e) => e.key === 'Enter' && submitWord()}
              />
              <Button 
                variant="primary" 
                onClick={submitWord}
                disabled={!userWord.trim()}
                icon={<Send />}
              />
            </div>
          )}
          
          {/* Word Cloud */}
          <div className="glass-card rounded-xl p-4 min-h-[200px] relative overflow-hidden">
            <AnimatePresence>
              {wordCloud.map((item, index) => (
                <motion.div
                  key={`${item.word}-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: `${item.size}rem`,
                  }}
                  className={`font-semibold ${
                    item.user === 'You' ? 'text-app-primary' : 'text-app-secondary'
                  }`}
                >
                  {item.word}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {wordCloud.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Words will appear here...
              </div>
            )}
          </div>
          
          {/* Participants List */}
          {wordCloud.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Responses ({wordCloud.length})</p>
              <div className="flex flex-wrap gap-2">
                {wordCloud.map((item, i) => (
                  <span 
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.user === 'You' 
                        ? 'bg-app-primary/20 text-app-primary' 
                        : 'bg-app-surface text-gray-300'
                    }`}
                  >
                    {item.user}: {item.word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* New Round Button */}
          {hasSubmitted && wordCloud.length >= 5 && (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setIsActive(false);
                setUserWord('');
              }}
              icon={<RefreshCw />}
            >
              New Round
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
