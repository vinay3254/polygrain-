import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import { useMeetingContext } from '../../../context/MeetingContext';
import Button from '../../ui/Button';
import SpeakingTimeChart from './SpeakingTimeChart';
import EngagementScores from './EngagementScores';
import MeetingPace from './MeetingPace';
import ParticipantInsights from './ParticipantInsights';

export default function AnalyticsOverlay({ isOpen, onClose }) {
  const { participants, startTime } = useMeetingContext();
  const [analyticsData, setAnalyticsData] = useState({});
  
  // Simulate real-time analytics
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData({
        speakingTime: participants.map((p, i) => ({
          name: p.name,
          time: Math.random() * 100,
          percentage: Math.floor(Math.random() * 30) + 10
        })),
        engagement: participants.map((p, i) => ({
          name: p.name,
          score: Math.floor(Math.random() * 40) + 60,
          reactions: Math.floor(Math.random() * 10),
          messages: Math.floor(Math.random() * 15)
        })),
        interruptions: participants.map((p) => ({
          name: p.name,
          count: Math.floor(Math.random() * 5)
        })),
        pace: ['on-track', 'too-fast', 'too-slow'][Math.floor(Math.random() * 3)]
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [participants]);
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-40 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-app-secondary" size={24} />
          <div>
            <h2 className="font-syne font-bold">Live Insights</h2>
            <p className="text-xs text-gray-400">Real-time analytics</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>✕</Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Meeting Pace */}
        <MeetingPace pace={analyticsData.pace} />
        
        {/* Speaking Time Chart */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Clock size={18} className="text-app-primary" />
            Speaking Time Distribution
          </h3>
          <SpeakingTimeChart data={analyticsData.speakingTime || []} />
        </div>
        
        {/* Engagement Scores */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-app-ai" />
            Engagement Scores
          </h3>
          <EngagementScores data={analyticsData.engagement || []} />
        </div>
        
        {/* Participant Insights */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Users size={18} className="text-app-secondary" />
            Participant Activity
          </h3>
          <ParticipantInsights 
            interruptions={analyticsData.interruptions || []}
            participants={participants}
          />
        </div>
      </div>
    </motion.div>
  );
}
