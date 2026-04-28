import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, UserX, MessageSquareOff, Share2, 
  Eye, AlertTriangle, Key, Users, CheckCircle2 
} from 'lucide-react';
import { useMeetingContext } from '../../../context/MeetingContext';
import Button from '../../ui/Button';
import Switch from '../../ui/Switch';
import Badge from '../../ui/Badge';
import WaitingRoom from './WaitingRoom';
import ParticipantControls from './ParticipantControls';
import ActivityLog from './ActivityLog';

export default function SecurityPanel({ isOpen, onClose }) {
  const { participants } = useMeetingContext();
  const [isLocked, setIsLocked] = useState(false);
  const [waitingRoomEnabled, setWaitingRoomEnabled] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(true);
  const [reactionsEnabled, setReactionsEnabled] = useState(true);
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [showEncryption, setShowEncryption] = useState(false);
  const [waitingList, setWaitingList] = useState([
    { id: 1, name: 'Unknown User', device: 'Chrome on Windows', time: Date.now() - 60000 },
    { id: 2, name: 'Guest', device: 'Safari on iPhone', time: Date.now() - 30000 },
  ]);
  const [activityLog, setActivityLog] = useState([
    { id: 1, type: 'warning', message: 'Unknown device joined', time: Date.now() - 300000 },
    { id: 2, type: 'info', message: 'Screen share started by Alice', time: Date.now() - 180000 },
    { id: 3, type: 'success', message: 'Meeting locked by Host', time: Date.now() - 60000 },
  ]);
  
  const admitParticipant = (id) => {
    setWaitingList(prev => prev.filter(p => p.id !== id));
    setActivityLog(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `Participant admitted from waiting room`,
      time: Date.now()
    }]);
  };
  
  const denyParticipant = (id) => {
    setWaitingList(prev => prev.filter(p => p.id !== id));
    setActivityLog(prev => [...prev, {
      id: Date.now(),
      type: 'warning',
      message: `Participant denied entry`,
      time: Date.now()
    }]);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-40 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="text-app-ai" size={24} />
            <div>
              <h2 className="font-syne font-bold">Security Center</h2>
              <p className="text-xs text-gray-400">Host controls</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        {/* Encryption Status */}
        <div 
          className="glass-card rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-app-surface transition-colors"
          onClick={() => setShowEncryption(!showEncryption)}
        >
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Lock className="text-green-400" size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">End-to-End Encrypted</span>
              <CheckCircle2 className="text-green-400" size={14} />
            </div>
            <p className="text-xs text-gray-400">Click for details</p>
          </div>
        </div>
        
        {showEncryption && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-3 glass p-3 rounded-lg text-xs space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-gray-400">Encryption</span>
              <span>AES-256-GCM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Key Exchange</span>
              <span>ECDH P-256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Certificate</span>
              <span className="text-green-400">Valid</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Meeting Controls */}
      <div className="p-4 border-b border-white/10 space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Meeting Controls</h3>
        
        <div className="flex items-center justify-between glass-card p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Lock size={18} className={isLocked ? 'text-app-danger' : 'text-gray-400'} />
            <div>
              <span className="text-sm">Lock Meeting</span>
              <p className="text-xs text-gray-400">No new participants</p>
            </div>
          </div>
          <Switch checked={isLocked} onChange={setIsLocked} />
        </div>
        
        <div className="flex items-center justify-between glass-card p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Users size={18} className={waitingRoomEnabled ? 'text-app-secondary' : 'text-gray-400'} />
            <div>
              <span className="text-sm">Waiting Room</span>
              <p className="text-xs text-gray-400">Approve before joining</p>
            </div>
          </div>
          <Switch checked={waitingRoomEnabled} onChange={setWaitingRoomEnabled} />
        </div>
        
        <div className="flex items-center justify-between glass-card p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Eye size={18} className={watermarkEnabled ? 'text-app-primary' : 'text-gray-400'} />
            <div>
              <span className="text-sm">Video Watermark</span>
              <p className="text-xs text-gray-400">Name overlay on video</p>
            </div>
          </div>
          <Switch checked={watermarkEnabled} onChange={setWatermarkEnabled} />
        </div>
      </div>
      
      {/* Participant Permissions */}
      <div className="p-4 border-b border-white/10 space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Participant Permissions</h3>
        
        <div className="flex items-center justify-between glass p-2 rounded-lg">
          <span className="text-sm flex items-center gap-2">
            <MessageSquareOff size={16} /> Chat
          </span>
          <Switch checked={chatEnabled} onChange={setChatEnabled} />
        </div>
        
        <div className="flex items-center justify-between glass p-2 rounded-lg">
          <span className="text-sm flex items-center gap-2">
            <Share2 size={16} /> Screen Share
          </span>
          <Switch checked={screenShareEnabled} onChange={setScreenShareEnabled} />
        </div>
        
        <div className="flex items-center justify-between glass p-2 rounded-lg">
          <span className="text-sm flex items-center gap-2">
            😊 Reactions
          </span>
          <Switch checked={reactionsEnabled} onChange={setReactionsEnabled} />
        </div>
      </div>
      
      {/* Waiting Room */}
      {waitingRoomEnabled && waitingList.length > 0 && (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-400">Waiting Room</h3>
            <Badge variant="warning">{waitingList.length}</Badge>
          </div>
          <WaitingRoom
            participants={waitingList}
            onAdmit={admitParticipant}
            onDeny={denyParticipant}
          />
        </div>
      )}
      
      {/* Activity Log */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <AlertTriangle size={14} />
          Security Activity
        </h3>
        <ActivityLog entries={activityLog} />
      </div>
    </motion.div>
  );
}
