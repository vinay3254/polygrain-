import { motion } from 'framer-motion';

export default function RecordingPreview({ layout }) {
  const renderLayout = () => {
    switch(layout) {
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-1 aspect-video">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-app-surface rounded flex items-center justify-center">
                👤
              </div>
            ))}
          </div>
        );
      case 'speaker':
        return (
          <div className="aspect-video relative">
            <div className="absolute inset-0 bg-app-surface rounded flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="absolute bottom-2 right-2 w-24 h-16 bg-app-card rounded flex items-center justify-center">
              👤
            </div>
          </div>
        );
      case 'sidebyside':
        return (
          <div className="grid grid-cols-2 gap-1 aspect-video">
            <div className="bg-app-surface rounded flex items-center justify-center text-2xl">👤</div>
            <div className="bg-app-surface rounded flex items-center justify-center text-2xl">👤</div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-xl p-4"
    >
      {renderLayout()}
      <p className="text-xs text-center text-gray-400 mt-3">Layout preview</p>
    </motion.div>
  );
}
