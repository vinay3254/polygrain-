import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Play, Video, BarChart3, LogIn } from 'lucide-react';
import Button from '../ui/Button';

export default function MeetingCard({ meeting, variant = 'past' }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(147, 51, 234, 0.2)' }}
      className="glass-card p-4 rounded-xl"
    >
      {/* Thumbnail or placeholder */}
      <div className="bg-gradient-to-br from-app-primary/20 to-app-accent/20 rounded-lg h-32 mb-3 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <Play className="text-app-primary relative z-10" size={40} />
      </div>
      
      <h3 className="font-semibold mb-2 truncate">{meeting.title}</h3>
      
      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3 flex-wrap">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {formatDate(meeting.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {meeting.duration}m
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} />
          {meeting.participants?.length || 0}
        </span>
      </div>
      
      {variant === 'past' && (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            <Video size={16} />
            Recording
          </Button>
          <Button size="sm" variant="ghost">
            <BarChart3 size={16} />
          </Button>
        </div>
      )}
      
      {variant === 'upcoming' && (
        <Button size="sm" variant="primary" fullWidth>
          <LogIn size={16} />
          Join Meeting
        </Button>
      )}
    </motion.div>
  );
}
