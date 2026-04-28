import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Timer } from 'lucide-react';
import Button from '../../../ui/Button';

const QUESTIONS = [
  { q: "What year was React first released?", options: ["2011", "2013", "2015", "2017"], answer: 1 },
  { q: "Which company created TypeScript?", options: ["Google", "Facebook", "Microsoft", "Amazon"], answer: 2 },
  { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], answer: 1 },
  { q: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SSH"], answer: 2 },
  { q: "What is the default port for HTTP?", options: ["21", "80", "443", "8080"], answer: 1 },
];

export default function TriviaQuiz({ onClose, onScore }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (showAnswer || isComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleAnswer(null);
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQ, showAnswer, isComplete]);
  
  const handleAnswer = (index) => {
    setSelected(index);
    setShowAnswer(true);
    
    if (index === QUESTIONS[currentQ].answer) {
      setScore(s => s + 100);
      onScore?.('user-1', 100);
    }
    
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setShowAnswer(false);
        setTimeLeft(15);
      } else {
        setIsComplete(true);
      }
    }, 2000);
  };
  
  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="font-syne font-bold text-2xl mb-2">Quiz Complete!</h3>
        <p className="text-3xl font-bold text-app-primary mb-6">{score} points</p>
        <p className="text-gray-400 mb-6">
          {score >= 400 ? "Amazing!" : score >= 200 ? "Good job!" : "Better luck next time!"}
        </p>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </motion.div>
    );
  }
  
  const question = QUESTIONS[currentQ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span>Question {currentQ + 1}/{QUESTIONS.length}</span>
        <span className="font-bold text-app-primary">Score: {score}</span>
      </div>
      
      {/* Timer */}
      <div className="flex items-center gap-2">
        <Timer size={16} className={timeLeft <= 5 ? 'text-app-danger' : 'text-app-secondary'} />
        <div className="flex-1 h-2 bg-app-surface rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(timeLeft / 15) * 100}%` }}
            className={`h-full ${timeLeft <= 5 ? 'bg-app-danger' : 'bg-app-secondary'}`}
          />
        </div>
        <span className="text-sm font-mono">{timeLeft}s</span>
      </div>
      
      {/* Question */}
      <div className="glass-card p-4 rounded-xl">
        <h4 className="font-semibold text-lg">{question.q}</h4>
      </div>
      
      {/* Options */}
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer;
          const isSelected = selected === i;
          
          return (
            <motion.button
              key={i}
              whileHover={!showAnswer ? { scale: 1.02 } : {}}
              whileTap={!showAnswer ? { scale: 0.98 } : {}}
              onClick={() => !showAnswer && handleAnswer(i)}
              disabled={showAnswer}
              className={`
                w-full p-4 rounded-xl text-left transition-all flex items-center gap-3
                ${showAnswer && isCorrect ? 'bg-green-500/20 border-2 border-green-500' : ''}
                ${showAnswer && isSelected && !isCorrect ? 'bg-red-500/20 border-2 border-red-500' : ''}
                ${!showAnswer ? 'glass hover:bg-app-surface' : 'glass'}
              `}
            >
              <span className="w-8 h-8 rounded-full glass flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {showAnswer && isCorrect && <CheckCircle2 className="text-green-400" />}
              {showAnswer && isSelected && !isCorrect && <XCircle className="text-red-400" />}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
