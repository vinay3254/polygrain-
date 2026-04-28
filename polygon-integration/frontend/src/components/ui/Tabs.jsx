import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tabs component with glassmorphic styling
 * @param {Object} props
 * @param {Array} props.tabs - Array of tabs { id, label, content, icon }
 * @param {string} props.defaultTab - Default active tab ID
 */
export default function Tabs({
  tabs = [],
  defaultTab,
  className = '',
  ...props
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`w-full ${className}`} {...props}>
      {/* Tab buttons */}
      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2"
          >
            {/* Active indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-cta rounded-lg border border-[#D4B571]/50"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Content */}
            <span className={`relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-white/60'}`}>
              {tab.icon && <span className="inline-block mr-1">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTabData?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
