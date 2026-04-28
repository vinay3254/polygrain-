import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { KEY_CODES, ROUTES } from '../../utils/constants';

export default function CommandPalette() {
  const navigate = useNavigate();
  const { isCommandPaletteOpen, closeCommandPalette } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Mock search results
  const allItems = [
    // Pages
    { type: 'page', label: 'Dashboard', path: ROUTES.DASHBOARD, icon: '📊' },
    { type: 'page', label: 'Join Meeting', path: ROUTES.JOIN, icon: '🎥' },
    { type: 'page', label: 'Recordings', path: ROUTES.RECORDINGS, icon: '🎬' },
    { type: 'page', label: 'Analytics', path: ROUTES.ANALYTICS, icon: '📈' },
    { type: 'page', label: 'Settings', path: ROUTES.SETTINGS, icon: '⚙️' },
    
    // Features
    { type: 'feature', label: 'Start New Meeting', action: 'new-meeting', icon: '➕' },
    { type: 'feature', label: 'Schedule Meeting', action: 'schedule', icon: '📅' },
    { type: 'feature', label: 'Share Screen', action: 'share-screen', icon: '🖥️' },
    { type: 'feature', label: 'Toggle Camera', action: 'toggle-camera', icon: '📹' },
    { type: 'feature', label: 'Toggle Microphone', action: 'toggle-mic', icon: '🎤' },
    
    // Participants (mock)
    { type: 'participant', label: 'John Doe', id: 'user-1', icon: '👤' },
    { type: 'participant', label: 'Jane Smith', id: 'user-2', icon: '👤' },
    { type: 'participant', label: 'Mike Johnson', id: 'user-3', icon: '👤' },
  ];

  const filteredItems = searchQuery
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems;

  // Keyboard navigation
  useEffect(() => {
    if (!isCommandPaletteOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case KEY_CODES.ARROW_DOWN:
          e.preventDefault();
          setSelectedIndex((prev) => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case KEY_CODES.ARROW_UP:
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case KEY_CODES.ENTER:
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelectItem(filteredItems[selectedIndex]);
          }
          break;
        case KEY_CODES.ESCAPE:
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, filteredItems]);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === KEY_CODES.K) {
        e.preventDefault();
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        } else {
          // TODO: openCommandPalette from UIContext
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isCommandPaletteOpen, closeCommandPalette]);

  const handleSelectItem = (item) => {
    if (item.type === 'page' && item.path) {
      navigate(item.path);
    } else if (item.type === 'feature' && item.action) {
      // TODO: Handle feature actions
      console.log('Feature action:', item.action);
    } else if (item.type === 'participant' && item.id) {
      // TODO: Open participant details or start DM
      console.log('Participant:', item.id);
    }
    handleClose();
  };

  const handleClose = () => {
    closeCommandPalette();
    setSearchQuery('');
    setSelectedIndex(0);
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Command Palette Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl glass-card overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="command-palette-title"
            >
              {/* Search Input */}
              <div className="relative border-b border-[#D4B571]/20">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4B571]" />
                <input
                  type="text"
                  id="command-palette-title"
                  placeholder="Search pages, features, participants..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-[#D4B571]/50 focus:outline-none"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-[#D4B571] bg-[#1a1200]/80 rounded border border-[#D4B571]/25">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-[#D4B571]">
                    No results found
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredItems.map((item, index) => (
                      <button
                        key={`${item.type}-${item.label}`}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          selectedIndex === index
                            ? 'bg-[#D4B571]/20 text-white'
                            : 'text-[#D4B571]/80 hover:bg-[#D4B571]/10 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs opacity-70 capitalize">{item.type}</p>
                        </div>
                        {selectedIndex === index && (
                          <ArrowRight className="w-4 h-4 text-[#D4B571]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[#D4B571]/20 px-4 py-3 flex items-center justify-between text-xs text-[#D4B571]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-[#1a1200]/80 rounded border border-[#D4B571]/25">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-[#1a1200]/80 rounded border border-[#D4B571]/25">↵</kbd>
                    Select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-[#1a1200]/80 rounded border border-[#D4B571]/25">
                    {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                  </kbd>
                  <kbd className="px-2 py-1 bg-[#1a1200]/80 rounded border border-[#D4B571]/25">K</kbd>
                  to close
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
