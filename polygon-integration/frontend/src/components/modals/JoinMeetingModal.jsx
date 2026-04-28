import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import Button from '../ui/Button';

export default function JoinMeetingModal({ isOpen, onClose, onJoin }) {
  const [meetingCode, setMeetingCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      onJoin(meetingCode.trim());
      setMeetingCode('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card p-6 rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-syne">Join Meeting</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="meetingCode" className="block text-sm font-medium mb-2">
                    Meeting Code or Room ID
                  </label>
                  <input
                    id="meetingCode"
                    type="text"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    placeholder="Enter meeting code..."
                    className="w-full px-4 py-3 bg-app-surface border border-app-border rounded-lg focus:outline-none focus:ring-2 focus:ring-app-primary text-white"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Enter the meeting code shared with you
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={!meetingCode.trim()}
                  >
                    <LogIn size={18} />
                    Join Now
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
