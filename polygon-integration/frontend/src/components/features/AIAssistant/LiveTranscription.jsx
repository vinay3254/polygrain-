import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function LiveTranscription({ entries }) {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);
  
  return (
    <div ref={scrollRef} className="h-full overflow-y-auto p-4 space-y-3">
      {entries.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p>Waiting for conversation...</p>
          <p className="text-sm mt-2">Live transcription will appear here</p>
        </div>
      ) : (
        entries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-3 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-app-secondary">{entry.speaker}</span>
              <span className="text-xs text-gray-400">
                {new Date(entry.time).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{entry.text}</p>
          </motion.div>
        ))
      )}
    </div>
  );
}
