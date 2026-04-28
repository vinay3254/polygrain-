import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Circle, Square, Settings, Layout, Mic, MessageSquare, Palette } from 'lucide-react';
import { useMeetingContext } from '../../../context/MeetingContext';
import Button from '../../ui/Button';
import RecordingIndicator from './RecordingIndicator';
import LayoutSelector from './LayoutSelector';
import QualitySettings from './QualitySettings';
import RecordingPreview from './RecordingPreview';

export default function RecordingStudio({ isOpen, onClose }) {
  const { isRecording, startRecording, stopRecording } = useMeetingContext();
  const [recordingTime, setRecordingTime] = useState(0);
  const [layout, setLayout] = useState('grid');
  const [quality, setQuality] = useState('1080p');
  const [includeChat, setIncludeChat] = useState(true);
  const [includeWhiteboard, setIncludeWhiteboard] = useState(true);
  const [includeReactions, setIncludeReactions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    if (!isRecording) {
      setRecordingTime(0);
      return;
    }
    
    const interval = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRecording]);
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartRecording = () => {
    startRecording({ layout, quality, includeChat, includeWhiteboard, includeReactions });
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
            <Circle className={`${isRecording ? 'text-app-danger' : 'text-gray-400'}`} size={24} fill={isRecording ? 'currentColor' : 'none'} />
            <div>
              <h2 className="font-syne font-bold">Recording Studio</h2>
              <p className="text-xs text-gray-400">
                {isRecording ? `Recording: ${formatTime(recordingTime)}` : 'Not recording'}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        {/* Recording Status */}
        {isRecording && <RecordingIndicator time={formatTime(recordingTime)} />}
      </div>
      
      {/* Recording Controls */}
      <div className="p-4 border-b border-white/10">
        {!isRecording ? (
          <Button
            variant="primary"
            fullWidth
            onClick={handleStartRecording}
            icon={<Circle fill="currentColor" />}
            className="bg-app-danger hover:bg-red-600"
          >
            Start Recording
          </Button>
        ) : (
          <Button
            variant="danger"
            fullWidth
            onClick={stopRecording}
            icon={<Square fill="currentColor" />}
          >
            Stop Recording
          </Button>
        )}
        
        <Button
          variant="ghost"
          fullWidth
          className="mt-2"
          onClick={() => setShowSettings(!showSettings)}
          icon={<Settings />}
        >
          {showSettings ? 'Hide Settings' : 'Recording Settings'}
        </Button>
      </div>
      
      {/* Settings */}
      {showSettings && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="p-4 border-b border-white/10 space-y-4"
        >
          {/* Layout Selector */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Layout size={14} /> Recording Layout
            </label>
            <LayoutSelector value={layout} onChange={setLayout} />
          </div>
          
          {/* Quality Settings */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
              <Palette size={14} /> Video Quality
            </label>
            <QualitySettings value={quality} onChange={setQuality} />
          </div>
          
          {/* Include Options */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Include in Recording</label>
            
            <label className="flex items-center justify-between glass p-2 rounded-lg cursor-pointer">
              <span className="text-sm flex items-center gap-2">
                <MessageSquare size={14} /> Chat Panel
              </span>
              <input
                type="checkbox"
                checked={includeChat}
                onChange={(e) => setIncludeChat(e.target.checked)}
                className="rounded"
              />
            </label>
            
            <label className="flex items-center justify-between glass p-2 rounded-lg cursor-pointer">
              <span className="text-sm">🎨 Whiteboard</span>
              <input
                type="checkbox"
                checked={includeWhiteboard}
                onChange={(e) => setIncludeWhiteboard(e.target.checked)}
                className="rounded"
              />
            </label>
            
            <label className="flex items-center justify-between glass p-2 rounded-lg cursor-pointer">
              <span className="text-sm">😊 Reactions</span>
              <input
                type="checkbox"
                checked={includeReactions}
                onChange={(e) => setIncludeReactions(e.target.checked)}
                className="rounded"
              />
            </label>
          </div>
        </motion.div>
      )}
      
      {/* Preview */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Preview</h3>
        <RecordingPreview layout={layout} />
      </div>
    </motion.div>
  );
}
