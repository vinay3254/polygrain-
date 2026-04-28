import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, X } from 'lucide-react';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

export default function QuickPoll({ onClose }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isLive, setIsLive] = useState(false);
  const [votes, setVotes] = useState({});
  
  const addOption = () => setOptions([...options, '']);
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const launchPoll = () => {
    setIsLive(true);
    // Simulate votes
    const interval = setInterval(() => {
      setVotes(prev => {
        const newVotes = { ...prev };
        const randomOption = Math.floor(Math.random() * options.length);
        newVotes[randomOption] = (newVotes[randomOption] || 0) + 1;
        return newVotes;
      });
    }, 1000);
    
    setTimeout(() => clearInterval(interval), 10000);
  };
  
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-syne font-bold text-lg">Quick Poll</h3>
        <Button variant="ghost" onClick={onClose} icon={<X />} />
      </div>
      
      {!isLive ? (
        <div className="space-y-4">
          <Input
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What should we discuss next?"
          />
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Options</label>
            {options.map((opt, i) => (
              <Input
                key={i}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
            ))}
            
            <Button variant="ghost" onClick={addOption} icon={<Plus />} fullWidth>
              Add Option
            </Button>
          </div>
          
          <Button
            variant="primary"
            fullWidth
            onClick={launchPoll}
            disabled={!question || options.filter(o => o).length < 2}
            icon={<Send />}
          >
            Launch Poll
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="font-semibold">{question}</h4>
          <p className="text-sm text-gray-400">{totalVotes} votes</p>
          
          {options.filter(o => o).map((opt, i) => {
            const voteCount = votes[i] || 0;
            const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
            
            return (
              <div key={i} className="glass-card p-3 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span>{opt}</span>
                  <span className="font-bold">{Math.round(percentage)}%</span>
                </div>
                <div className="h-2 bg-app-surface rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-gradient-to-r from-app-primary to-app-secondary"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
