import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Plus, Play, Pause, SkipForward, Clock, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button';
import AgendaItem from './AgendaItem';
import AgendaProgress from './AgendaProgress';
import MeetingHealth from './MeetingHealth';
import AddItemModal from './AddItemModal';

export default function SmartAgenda({ isOpen, onClose }) {
  const [items, setItems] = useState([
    { id: 1, title: 'Welcome & Introductions', duration: 5, owner: 'Host', status: 'done', actualTime: 4 },
    { id: 2, title: 'Project Status Update', duration: 10, owner: 'Alice', status: 'active', actualTime: 0 },
    { id: 3, title: 'Technical Discussion', duration: 15, owner: 'Bob', status: 'pending', actualTime: 0 },
    { id: 4, title: 'Q&A Session', duration: 10, owner: 'All', status: 'pending', actualTime: 0 },
    { id: 5, title: 'Wrap-up & Next Steps', duration: 5, owner: 'Host', status: 'pending', actualTime: 0 },
  ]);
  
  const [isRunning, setIsRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const activeItem = items.find(i => i.status === 'active');
  const totalDuration = items.reduce((acc, i) => acc + i.duration, 0);
  const elapsedDuration = items
    .filter(i => i.status === 'done')
    .reduce((acc, i) => acc + i.actualTime, 0) + currentTime;
  
  // Timer for active item
  useEffect(() => {
    if (!isRunning || !activeItem) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        
        // Check if time exceeded
        if (newTime >= activeItem.duration * 60) {
          // Play notification sound
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10...');
          // audio.play().catch(() => {});
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, activeItem]);
  
  const advanceToNext = useCallback(() => {
    setItems(prev => {
      const updated = [...prev];
      const activeIndex = updated.findIndex(i => i.status === 'active');
      
      if (activeIndex !== -1) {
        updated[activeIndex].status = 'done';
        updated[activeIndex].actualTime = Math.floor(currentTime / 60);
        
        if (activeIndex + 1 < updated.length) {
          updated[activeIndex + 1].status = 'active';
        }
      }
      
      return updated;
    });
    setCurrentTime(0);
  }, [currentTime]);
  
  const extendTime = (minutes) => {
    setItems(prev => prev.map(item => 
      item.status === 'active' 
        ? { ...item, duration: item.duration + minutes }
        : item
    ));
  };
  
  const addItem = (item) => {
    setItems([...items, { ...item, id: Date.now(), status: 'pending', actualTime: 0 }]);
    setShowAddModal(false);
  };
  
  const getMeetingHealth = () => {
    const expectedTime = items
      .filter(i => i.status === 'done' || i.status === 'active')
      .reduce((acc, i) => acc + i.duration, 0);
    
    const diff = elapsedDuration / 60 - expectedTime + (activeItem?.duration || 0);
    
    if (diff < -2) return 'ahead';
    if (diff > 2) return 'behind';
    return 'on-time';
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListChecks className="text-app-secondary" size={24} />
            <div>
              <h2 className="font-syne font-bold">Smart Agenda</h2>
              <p className="text-xs text-gray-400">Meeting flow control</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        {/* Progress Bar */}
        <AgendaProgress 
          elapsed={elapsedDuration} 
          total={totalDuration * 60} 
          items={items}
        />
        
        {/* Meeting Health */}
        <MeetingHealth status={getMeetingHealth()} />
      </div>
      
      {/* Controls */}
      <div className="p-4 border-b border-white/10 flex gap-2">
        <Button 
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={() => setIsRunning(!isRunning)}
          icon={isRunning ? <Pause /> : <Play />}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <Button 
          variant="secondary"
          onClick={advanceToNext}
          icon={<SkipForward />}
          disabled={!activeItem}
        >
          Next Item
        </Button>
        <Button 
          variant="ghost"
          onClick={() => extendTime(5)}
          disabled={!activeItem}
        >
          +5 min
        </Button>
      </div>
      
      {/* Agenda Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item, index) => (
          <AgendaItem
            key={item.id}
            item={item}
            index={index}
            isActive={item.status === 'active'}
            currentTime={item.status === 'active' ? currentTime : null}
          />
        ))}
        
        <Button 
          variant="ghost" 
          fullWidth 
          onClick={() => setShowAddModal(true)}
          icon={<Plus />}
        >
          Add Agenda Item
        </Button>
      </div>
      
      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddItemModal
            onClose={() => setShowAddModal(false)}
            onAdd={addItem}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
