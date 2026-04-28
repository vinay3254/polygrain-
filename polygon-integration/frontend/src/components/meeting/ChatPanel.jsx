import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Send, Sparkles } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMeeting } from '../../context/MeetingContext';
import { useUser } from '../../context/UserContext';

export default function ChatPanel() {
  const { chatMessages, sendChatMessage } = useMeeting();
  const { settings } = useUser();
  const [draft, setDraft] = useState('');

  const orderedMessages = useMemo(
    () => [...chatMessages].sort((left, right) => left.timestamp - right.timestamp),
    [chatMessages],
  );

  const handleSend = () => {
    sendChatMessage(draft);
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,70,229,0.95),rgba(6,182,212,0.9))]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Smart chat lane</p>
            <p className="text-xs text-white/45">
              Translation: {settings.privacy.autoTranslateChat ? 'active' : 'off'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {orderedMessages.map((message) => (
          <motion.article
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-[24px] border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${
                message.isSelf
                  ? 'border-indigo-400/20 bg-indigo-500/12'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">{message.sender}</p>
                <p className="text-xs text-white/35">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/75">{message.text}</p>
              {settings.privacy.autoTranslateChat && message.translated && (
                <div className="mt-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/6 px-3 py-3">
                  <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-200/70">
                    <Languages className="h-3.5 w-3.5" />
                    Translation
                  </div>
                  <p className="text-sm text-cyan-50/85">{message.translated}</p>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-4 rounded-[28px] border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Drop a thought, link, or decision..."
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            className="flex-1"
          />
          <Button variant="primary" onClick={handleSend} disabled={!draft.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
