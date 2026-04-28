import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Users, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

const MOCK_PLAYERS = [
  {
    name: 'Alice',
    avatar: '👩‍💼',
    statements: [
      { text: "I've visited 15 countries", isLie: false },
      { text: "I once met a celebrity at a coffee shop", isLie: false },
      { text: "I can speak 5 languages fluently", isLie: true },
    ]
  },
  {
    name: 'Bob',
    avatar: '👨‍💻',
    statements: [
      { text: "I've never broken a bone", isLie: true },
      { text: "I play guitar in a band", isLie: false },
      { text: "I ran a marathon last year", isLie: false },
    ]
  },
  {
    name: 'Charlie',
    avatar: '🧑‍🎨',
    statements: [
      { text: "I have a twin sibling", isLie: false },
      { text: "I've skydived three times", isLie: false },
      { text: "I've never eaten sushi", isLie: true },
    ]
  },
];

export default function TwoTruthsOneLie({ onClose, onScore }) {
  const [phase, setPhase] = useState('setup'); // setup, submit, guess, results
  const [statements, setStatements] = useState(['', '', '']);
  const [lieIndex, setLieIndex] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [votes, setVotes] = useState({});
  
  const updateStatement = (index, value) => {
    const newStatements = [...statements];
    newStatements[index] = value;
    setStatements(newStatements);
  };
  
  const submitStatements = () => {
    if (statements.every(s => s.trim()) && lieIndex !== null) {
      setPhase('guess');
      // Start with first mock player
      setCurrentPlayer(0);
    }
  };
  
  const makeGuess = (index) => {
    setSelectedGuess(index);
    setShowResult(true);
    
    const player = MOCK_PLAYERS[currentPlayer];
    const isCorrect = player.statements[index].isLie;
    
    if (isCorrect) {
      setScore(s => s + 100);
      onScore?.('user-1', 100);
    }
    
    // Simulate other participants voting
    const mockVotes = {};
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * 3);
      mockVotes[randomIndex] = (mockVotes[randomIndex] || 0) + Math.floor(Math.random() * 3) + 1;
    }
    mockVotes[index] = (mockVotes[index] || 0) + 1; // Add user's vote
    setVotes(mockVotes);
  };
  
  const nextPlayer = () => {
    if (currentPlayer < MOCK_PLAYERS.length - 1) {
      setCurrentPlayer(p => p + 1);
      setSelectedGuess(null);
      setShowResult(false);
      setVotes({});
    } else {
      setPhase('results');
    }
  };
  
  const player = MOCK_PLAYERS[currentPlayer];
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-bold text-lg">2 Truths 1 Lie</h3>
        <Button variant="ghost" onClick={onClose} icon={<X />} />
      </div>
      
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-400">
              Enter 2 truths and 1 lie about yourself. Others will try to guess the lie!
            </p>
            
            <div className="space-y-3">
              {statements.map((statement, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Input
                      value={statement}
                      onChange={(e) => updateStatement(i, e.target.value)}
                      placeholder={`Statement ${i + 1}`}
                      className="flex-1"
                    />
                    <button
                      onClick={() => setLieIndex(i)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        lieIndex === i 
                          ? 'bg-red-500/20 text-red-400 border border-red-500' 
                          : 'bg-app-surface text-gray-400 hover:bg-app-surface/80'
                      }`}
                    >
                      {lieIndex === i ? 'LIE' : 'Mark'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">
              👆 Click "Mark" to indicate which statement is the lie
            </p>
            
            <Button
              variant="primary"
              fullWidth
              onClick={submitStatements}
              disabled={!statements.every(s => s.trim()) || lieIndex === null}
              icon={<Send />}
            >
              Submit & Start Guessing
            </Button>
          </motion.div>
        )}
        
        {phase === 'guess' && (
          <motion.div
            key="guess"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Player Info */}
            <div className="glass-card p-4 rounded-xl flex items-center gap-3">
              <div className="text-4xl">{player.avatar}</div>
              <div>
                <h4 className="font-semibold">{player.name}'s turn</h4>
                <p className="text-sm text-gray-400">Which one is the lie?</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Player {currentPlayer + 1}/{MOCK_PLAYERS.length}</p>
                <p className="font-bold text-app-primary">{score} pts</p>
              </div>
            </div>
            
            {/* Statements */}
            <div className="space-y-2">
              {player.statements.map((statement, i) => {
                const voteCount = votes[i] || 0;
                const votePercent = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                
                return (
                  <motion.button
                    key={i}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => !showResult && makeGuess(i)}
                    disabled={showResult}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all
                      ${showResult && statement.isLie ? 'bg-red-500/20 border-2 border-red-500' : ''}
                      ${showResult && selectedGuess === i && !statement.isLie ? 'bg-gray-500/20 border-2 border-gray-500' : ''}
                      ${!showResult ? 'glass hover:bg-app-surface cursor-pointer' : 'glass'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full glass flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="flex-1">{statement.text}</span>
                      {showResult && statement.isLie && (
                        <span className="text-red-400 text-sm font-semibold">LIE!</span>
                      )}
                      {showResult && selectedGuess === i && (
                        statement.isLie 
                          ? <CheckCircle2 className="text-green-400" size={20} />
                          : <XCircle className="text-red-400" size={20} />
                      )}
                    </div>
                    
                    {/* Vote bar */}
                    {showResult && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{voteCount} votes</span>
                          <span>{Math.round(votePercent)}%</span>
                        </div>
                        <div className="h-1.5 bg-app-surface rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${votePercent}%` }}
                            className="h-full bg-app-secondary"
                          />
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Result Message */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-2"
              >
                {player.statements[selectedGuess].isLie ? (
                  <p className="text-green-400 font-semibold">🎉 Correct! +100 points</p>
                ) : (
                  <p className="text-red-400 font-semibold">❌ Wrong! That was actually true</p>
                )}
                
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={nextPlayer}
                  icon={<ChevronRight />}
                >
                  {currentPlayer < MOCK_PLAYERS.length - 1 ? 'Next Player' : 'See Results'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {phase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="font-syne font-bold text-2xl mb-2">Game Complete!</h3>
            <p className="text-3xl font-bold text-app-primary mb-2">{score} points</p>
            <p className="text-gray-400 mb-6">
              You guessed {score / 100} out of {MOCK_PLAYERS.length} correctly!
            </p>
            
            <div className="glass-card p-4 rounded-xl mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users size={16} className="text-app-secondary" />
                <span className="text-sm text-gray-400">Now it's their turn to guess your lie!</span>
              </div>
              <p className="text-sm">
                Your statements are being shown to other participants...
              </p>
            </div>
            
            <Button variant="primary" onClick={onClose}>Close</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
