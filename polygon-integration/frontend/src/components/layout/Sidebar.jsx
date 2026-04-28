import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { KEY_CODES } from '../../utils/constants';

export default function Sidebar({ isOpen = false, onClose, children, title, width = 'w-[360px]' }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === KEY_CODES.ESCAPE && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(3,6,12,0.58)] backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className={`fixed right-0 top-0 z-50 h-[100dvh] ${width} border-l border-white/10 bg-[linear-gradient(180deg,rgba(12,16,28,0.95),rgba(7,11,21,0.92))] shadow-[0_25px_80px_rgba(2,6,18,0.52)] backdrop-blur-2xl`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidebar-title"
          >
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#D4B571]/60">Workspace panel</p>
                  <h2 id="sidebar-title" className="mt-1 font-poppins text-xl font-semibold text-white">
                    {title}
                  </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label={`Close ${title}`}>
                  <X className="h-4 w-4" />
                </Button>
              </header>
              <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
