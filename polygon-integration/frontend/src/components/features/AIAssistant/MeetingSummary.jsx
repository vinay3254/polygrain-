import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText } from 'lucide-react';
import Button from '../../ui/Button';

export default function MeetingSummary({ onGenerate }) {
  const [summary, setSummary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSummary(onGenerate());
      setIsGenerating(false);
    }, 2000);
  };
  
  if (!summary) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Sparkles className="text-app-ai mb-4" size={48} />
        <h3 className="font-syne font-bold mb-2">Generate Meeting Summary</h3>
        <p className="text-sm text-gray-400 text-center mb-6">
          AI will analyze the meeting and create a comprehensive summary
        </p>
        <Button 
          onClick={handleGenerate} 
          loading={isGenerating}
          icon={<FileText />}
        >
          Generate Summary
        </Button>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 space-y-4 overflow-y-auto h-full"
    >
      <Section title="Key Discussion Points" items={summary.keyPoints} />
      <Section title="Decisions Made" items={summary.decisions} />
      <Section title="Next Steps" items={summary.nextSteps} />
    </motion.div>
  );
}

function Section({ title, items }) {
  return (
    <div className="glass-card p-4 rounded-lg">
      <h4 className="font-semibold mb-3 text-app-primary">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm flex gap-2">
            <span className="text-app-secondary">•</span>
            <span>{typeof item === 'string' ? item : item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
