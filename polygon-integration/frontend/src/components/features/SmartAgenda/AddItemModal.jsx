import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

export default function AddItemModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(10);
  const [owner, setOwner] = useState('');
  
  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title, duration, owner: owner || 'Unassigned' });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="font-syne font-bold text-xl mb-4">Add Agenda Item</h2>
        
        <div className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Project Discussion"
          />
          
          <Input
            label="Duration (minutes)"
            type="number"
            min={1}
            max={60}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          
          <Input
            label="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g., Alice"
          />
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} fullWidth disabled={!title.trim()}>
            Add Item
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
