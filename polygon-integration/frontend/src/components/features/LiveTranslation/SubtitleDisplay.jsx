import { motion, AnimatePresence } from 'framer-motion';

export default function SubtitleDisplay({ subtitle, style, confidence, targetLanguage }) {
  if (style === 'netflix') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-full px-4"
      >
        <div className="glass-card rounded-xl p-4 text-center">
          {/* Original text */}
          <p className="text-sm text-gray-400 mb-2">{subtitle.original}</p>
          
          {/* Translated text */}
          <p className="text-lg font-semibold">{subtitle.translated}</p>
          
          {/* Confidence indicator */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xl">{targetLanguage?.flag}</span>
            <div className="h-1 w-20 bg-app-surface rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                className={`h-full ${
                  confidence > 90 ? 'bg-green-400' : 
                  confidence > 75 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
              />
            </div>
            <span className="text-xs text-gray-400">{confidence}%</span>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Sidebar style
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 w-72"
    >
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{targetLanguage?.flag}</span>
          <span className="text-sm font-semibold">{targetLanguage?.name}</span>
        </div>
        
        <p className="text-xs text-gray-400 mb-2 italic">"{subtitle.original}"</p>
        <p className="text-sm">{subtitle.translated}</p>
        
        <div className="mt-3 text-xs text-gray-400">
          Confidence: {confidence}%
        </div>
      </div>
    </motion.div>
  );
}
