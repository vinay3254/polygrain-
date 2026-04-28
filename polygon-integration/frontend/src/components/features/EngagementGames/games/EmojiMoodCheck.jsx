import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MOODS = ['😊', '😐', '😴', '😤', '🤔', '🎉', '😰', '💪'];

export default function EmojiMoodCheck({ onClose }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    // Simulate other participants responding
    if (selectedMood) {
      const interval = setInterval(() => {
        if (responses.length < 7) {
          setResponses(prev => [...prev, {
            id: Date.now(),
            name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace'][prev.length],
            emoji: MOODS[Math.floor(Math.random() * MOODS.length)]
          }]);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedMood, responses.length]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <h3 className="font-syne font-bold text-xl mb-6">How are you feeling?</h3>
      
      {!selectedMood ? (
        <div className="grid grid-cols-4 gap-4">
          {MOODS.map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMood(emoji)}
              className="text-5xl p-4 glass rounded-xl hover:bg-app-surface"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-6"
          >
            {selectedMood}
          </motion.div>
          
          <p className="text-gray-400 mb-6">Waiting for others...</p>
          
          <div className="grid grid-cols-4 gap-3">
            {responses.map((r) => (
              <motion.div
                key={r.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="glass-card p-3 rounded-xl text-center"
              >
                <div className="text-3xl mb-1">{r.emoji}</div>
                <div className="text-xs truncate">{r.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
