import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Video, VideoOff } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import Avatar from '../ui/Avatar';

export default function MeetingRail({ mobile = false }) {
  const { participants, chatMessages, sendChatMessage } = useMeeting();
  const [draft, setDraft] = useState('');

  const orderedMessages = useMemo(
    () => [...chatMessages].sort((left, right) => left.timestamp - right.timestamp),
    [chatMessages],
  );

  const sortedParticipants = useMemo(
    () =>
      [...participants].sort((left, right) => {
        if (left.isSpeaking && !right.isSpeaking) {
          return -1;
        }

        if (!left.isSpeaking && right.isSpeaking) {
          return 1;
        }

        return left.name.localeCompare(right.name);
      }),
    [participants],
  );

  const handleSend = () => {
    if (!draft.trim()) {
      return;
    }

    sendChatMessage(draft);
    setDraft('');
  };

  return (
    <div
      id="etherx-rail"
      className={`etherx-glass flex min-h-0 flex-col overflow-hidden rounded-[30px] p-4 font-inter ${
        mobile ? 'h-full' : 'sticky top-24 h-[calc(100dvh-130px)]'
      }`}
    >
      <div className="mb-4 rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4B571]/72">Room sidebar</p>
        <h2 className="mt-2 font-poppins text-xl font-semibold tracking-[-0.03em] text-white">People and chat</h2>
        <p className="mt-1 text-sm leading-6 text-white/52">
          Follow the live roster and keep quick decisions moving without crowding the stage.
        </p>
      </div>

      <section className="etherx-glass-soft flex min-h-0 flex-1 flex-col rounded-[26px] p-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/36">People</p>
            <p className="mt-1 text-sm font-medium text-white">{participants.length} in this meeting</p>
          </div>
          <span className="rounded-full border border-[#D4B571]/16 bg-[#D4B571]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#E8D18D]">
            Live
          </span>
        </div>

        <div className="etherx-scrollbar mt-3 max-h-[230px] space-y-2 overflow-y-auto pr-1">
          {sortedParticipants.length ? (
            sortedParticipants.map((participant) => (
              <motion.div
                key={participant.id}
                whileHover={{ scale: 1.01, y: -1 }}
                className="flex items-center gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-3 py-3 transition-all duration-300 hover:border-[#D4B571]/18"
              >
                <Avatar name={participant.name} size="md" status="online" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-white">{participant.name}</p>
                    {participant.isSpeaking ? (
                      <span className="rounded-full border border-[#D4B571]/16 bg-[#D4B571]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#E8D18D]">
                        Speaking
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-white/42">{participant.role}</p>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-white/8 bg-[#070c14]/70 px-2 py-1 text-white/50">
                  {participant.isMuted ? (
                    <MicOff className="h-3.5 w-3.5 text-red-300" />
                  ) : (
                    <Mic className="h-3.5 w-3.5" />
                  )}
                  {participant.isVideoOff ? (
                    <VideoOff className="h-3.5 w-3.5" />
                  ) : (
                    <Video className="h-3.5 w-3.5" />
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm text-white/45">
              Nobody has joined yet.
            </div>
          )}
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-[22px] border border-white/8 bg-[#050910]/48 p-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/36">Chat</p>
              <p className="mt-1 text-sm font-medium text-white">Meeting thread</p>
            </div>
            <span className="text-xs text-white/35">{orderedMessages.length} messages</span>
          </div>

          <div className="etherx-scrollbar mt-3 flex-1 space-y-3 overflow-y-auto pr-1">
            {orderedMessages.length ? (
              orderedMessages.map((message) => (
                <motion.article
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-[22px] border px-3.5 py-3 ${
                      message.isSelf
                        ? 'border-[#D4B571]/18 bg-[#D4B571]/10 text-white'
                        : 'border-white/8 bg-white/[0.04] text-white/85'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-white/92">{message.sender}</p>
                      <p className="text-[11px] text-white/38">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-6">{message.text}</p>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm text-white/45">
                Messages will appear here once the conversation starts.
              </div>
            )}
          </div>

          <div className="mt-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex gap-2">
              <input
                id="etherx-chat-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Send a message"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                className="min-w-0 flex-1 rounded-[16px] border border-transparent bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/28 focus:border-[#D4B571]/25 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[#D4B571]/18 bg-[#D4B571]/12 text-[#E8D18D] transition-all duration-300 hover:scale-[1.03] hover:border-[#D4B571]/36 hover:bg-[#D4B571]/16 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
