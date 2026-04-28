import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Circle, Mailbox, Play, Reply, Send, StopCircle, X } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useMeeting } from '../../../context/MeetingContext';
import { useUser } from '../../../context/UserContext';

export default function AsyncMessages({ isOpen, onClose }) {
  const { user } = useUser();
  const { savedAsyncMessages, saveAsyncMessage, markAsyncMessageRead } = useMeeting();
  const [activeTab, setActiveTab] = useState('record');
  const [recipient, setRecipient] = useState('nyla@etherxmeet.app');
  const [note, setNote] = useState('A quick recap with next steps.');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const previewRef = useRef(null);

  useEffect(() => {
    if (!isOpen || activeTab !== 'record') {
      return undefined;
    }

    let mounted = true;

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (!mounted) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }
        setStream(mediaStream);
        if (previewRef.current) {
          previewRef.current.srcObject = mediaStream;
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
      setStream((previousStream) => {
        previousStream?.getTracks().forEach((track) => track.stop());
        return null;
      });
    };
  }, [activeTab, isOpen]);

  useEffect(() => {
    if (!isRecording) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRecordingTime((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRecording]);

  const inbox = useMemo(
    () => savedAsyncMessages.filter((message) => message.sender !== user.name),
    [savedAsyncMessages, user.name],
  );
  const outbox = useMemo(
    () => savedAsyncMessages.filter((message) => message.sender === user.name || message.direction === 'outbox'),
    [savedAsyncMessages, user.name],
  );

  if (!isOpen) {
    return null;
  }

  const startRecording = () => {
    if (!stream) {
      return;
    }

    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
    };
    recorder.start();
    setRecordingTime(0);
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSave = () => {
    if (!recordedUrl) {
      return;
    }

    saveAsyncMessage({
      sender: user.name,
      recipient,
      message: note,
      duration: formatDuration(recordingTime),
      videoUrl: recordedUrl,
      direction: 'outbox',
    });

    setActiveTab('outbox');
    setRecordedUrl('');
    setNote('A quick recap with next steps.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 24 }}
        className="w-full max-w-6xl rounded-[34px] border border-white/10 bg-[rgba(13,13,26,0.95)] p-6 shadow-[0_30px_90px_rgba(4,8,24,0.55)] backdrop-blur-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Async video messages</p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">Leave context-rich follow-ups when timing slips</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex gap-2">
          {['record', 'inbox', 'outbox'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm capitalize ${
                activeTab === tab
                  ? 'border-cyan-400/20 bg-cyan-400/12 text-cyan-100'
                  : 'border-white/10 bg-white/5 text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {activeTab === 'record' ? (
            <>
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(79,70,229,0.32),rgba(6,182,212,0.15),rgba(10,10,24,0.82))]">
                  {!recordedUrl ? (
                    <video ref={previewRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                  ) : (
                    <video src={recordedUrl} controls className="h-full w-full object-cover" />
                  )}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                    {isRecording ? `REC ${formatDuration(recordingTime)}` : 'Camera preview'}
                  </div>
                  {note && (
                    <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/85 backdrop-blur-xl">
                      {note}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {!isRecording ? (
                    <Button variant="primary" onClick={startRecording}>
                      <Circle className="h-4 w-4" />
                      Start recording
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={stopRecording}>
                      <StopCircle className="h-4 w-4" />
                      Stop
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleSave} disabled={!recordedUrl}>
                    <Send className="h-4 w-4" />
                    Save message
                  </Button>
                </div>
              </div>

              <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Input label="Recipient" value={recipient} onChange={(event) => setRecipient(event.target.value)} />
                <Input label="Overlay note" value={note} onChange={(event) => setNote(event.target.value)} />
                <div className="rounded-[24px] border border-white/10 bg-black/10 p-4 text-sm leading-6 text-white/55">
                  Up to five minutes works best for handoffs, approvals, and threaded recap replies.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                {(activeTab === 'inbox' ? inbox : outbox).map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (activeTab === 'inbox') {
                        markAsyncMessageRead(message.id);
                      }
                    }}
                    className="w-full rounded-[24px] border border-white/10 bg-white/5 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {activeTab === 'inbox' ? message.sender : message.recipient}
                        </p>
                        <p className="mt-1 text-sm text-white/55">{message.message}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/45">
                        {message.duration || '00:40'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Thread</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{selectedMessage.sender}</h3>
                      </div>
                      <Button variant="outline" onClick={() => setActiveTab('record')}>
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                      {selectedMessage.videoUrl ? (
                        <video src={selectedMessage.videoUrl} controls className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/40">
                          <Play className="mr-2 h-5 w-5" />
                          Mock playback preview
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-6 text-white/60">{selectedMessage.message}</p>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-black/10 text-center text-white/45">
                    <Mailbox className="mb-3 h-8 w-8" />
                    Select a message to preview the thread.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}
