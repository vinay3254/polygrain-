import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, Download, Sparkles } from 'lucide-react';
import Button from '../../ui/Button';
import Tabs from '../../ui/Tabs';
import LiveTranscription from './LiveTranscription';
import ActionItems from './ActionItems';
import MeetingSummary from './MeetingSummary';
import SentimentMeter from './SentimentMeter';

export default function AIAssistant({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('transcription');
  const [transcriptEntries, setTranscriptEntries] = useState([]);
  const [actionItems, setActionItems] = useState([]);
  const [sentiment, setSentiment] = useState('positive');
  
  // Simulate live transcription
  useEffect(() => {
    if (!isOpen) return;
    
    const mockTranscripts = [
      { speaker: 'Alice', text: 'Let\'s start by reviewing the project timeline.', time: Date.now() },
      { speaker: 'Bob', text: 'I think we should prioritize the user authentication feature.', time: Date.now() + 3000 },
      { speaker: 'Charlie', text: 'Agreed. We can complete that by next sprint.', time: Date.now() + 6000 },
      { speaker: 'Alice', text: 'Perfect. Bob, can you take the lead on that?', time: Date.now() + 9000 },
      { speaker: 'Bob', text: 'Absolutely. I\'ll start working on it this week.', time: Date.now() + 12000 },
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockTranscripts.length) {
        setTranscriptEntries(prev => [...prev, mockTranscripts[index]]);
        
        // Extract action items
        if (mockTranscripts[index].text.includes('can you') || 
            mockTranscripts[index].text.includes('take the lead')) {
          setActionItems(prev => [...prev, {
            id: Date.now(),
            text: 'Bob to lead user authentication feature',
            assignee: 'Bob',
            priority: 'high'
          }]);
        }
        
        index++;
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const generateSummary = () => {
    // Generate mock summary
    return {
      keyPoints: [
        'Reviewed project timeline and sprint goals',
        'Prioritized user authentication feature development',
        'Assigned Bob as lead for authentication module'
      ],
      decisions: [
        'User authentication will be completed by next sprint',
        'Bob will start work this week'
      ],
      actionItems: actionItems,
      nextSteps: [
        'Bob to create authentication design document',
        'Schedule follow-up review meeting',
        'Update project roadmap'
      ]
    };
  };
  
  const exportToPDF = async () => {
    // Use jsPDF to export summary
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const summary = generateSummary();
    
    doc.setFontSize(20);
    doc.text('Meeting Summary', 20, 20);
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text('Key Discussion Points:', 20, y);
    y += 10;
    summary.keyPoints.forEach(point => {
      doc.text(`• ${point}`, 25, y);
      y += 7;
    });
    
    y += 10;
    doc.text('Decisions Made:', 20, y);
    y += 10;
    summary.decisions.forEach(dec => {
      doc.text(`• ${dec}`, 25, y);
      y += 7;
    });
    
    doc.save('meeting-summary.pdf');
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-app-ai to-app-primary flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-syne font-bold">NEXAI</h2>
            <p className="text-xs text-gray-400">Your AI Assistant</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>✕</Button>
      </div>
      
      {/* Sentiment Meter */}
      <div className="p-4 border-b border-white/10">
        <SentimentMeter sentiment={sentiment} />
      </div>
      
      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs
          tabs={[
            { id: 'transcription', label: 'Live Transcript', content: <LiveTranscription entries={transcriptEntries} /> },
            { id: 'actions', label: 'Action Items', content: <ActionItems items={actionItems} /> },
            { id: 'summary', label: 'Summary', content: <MeetingSummary onGenerate={generateSummary} /> }
          ]}
          defaultTab={activeTab}
        />
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <Button icon={<Download />} onClick={exportToPDF} fullWidth>
          Export Summary
        </Button>
      </div>
    </motion.div>
  );
}
