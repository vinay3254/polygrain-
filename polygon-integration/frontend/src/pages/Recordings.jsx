import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/layout/AnimatedPage';
import { staggerContainer, staggerChild, hoverLift } from '../utils/animationVariants';
import { Download, Play, Search, Share2 } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useMeeting } from '../context/MeetingContext';
import transcripts from '../data/transcripts';

export default function Recordings() {
  const { savedRecordings } = useMeeting();
  const [query, setQuery] = useState('');
  const [selectedRecording, setSelectedRecording] = useState(savedRecordings[0] || null);

  const filteredRecordings = useMemo(
    () =>
      savedRecordings.filter((recording) =>
        recording.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, savedRecordings],
  );

  const transcript = transcripts.find((entry) => entry.meetingId === selectedRecording?.meetingId);

  return (
    <AnimatedPage>
    <div className="min-h-[100dvh] bg-app-background text-app-text" style={{ position: 'relative' }}>
      <div className="aurora-bg aurora-subtle" aria-hidden="true" />
      <TopBar />

      <main className="mx-auto max-w-[1450px] px-4 pb-12 pt-6 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-5">
            <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(19,19,43,0.9),rgba(13,13,26,0.72))] p-6 shadow-[0_30px_90px_rgba(4,8,24,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Smart recording studio</p>
              <h1 className="mt-2 font-syne text-4xl font-bold tracking-[-0.04em] text-white">Search the room after the room</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                Browse chaptered recordings, jump through transcript moments, and share structured playback.
              </p>
              <div className="mt-5">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search recordings"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
            >
              {filteredRecordings.map((recording) => (
                <motion.button
                  key={recording.id}
                  variants={staggerChild}
                  {...hoverLift}
                  onClick={() => setSelectedRecording(recording)}
                  className={`grid w-full gap-4 rounded-[28px] border p-4 text-left ${
                    selectedRecording?.id === recording.id
                      ? 'border-cyan-400/20 bg-cyan-400/10'
                      : 'border-white/10 bg-white/5'
                  } shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:grid-cols-[auto_1fr]`}
                >
                  <div className="flex h-20 w-28 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,rgba(79,70,229,0.9),rgba(6,182,212,0.85))]">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-white">{recording.title}</p>
                    <p className="mt-2 text-sm text-white/50">
                      {new Date(recording.date).toLocaleDateString()} · {recording.duration} min · {recording.participants.length} participants
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">{recording.transcriptPreview}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </section>

          <section className="space-y-6">
            {selectedRecording && (
              <>
                <div className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="aspect-video overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(79,70,229,0.35),rgba(6,182,212,0.14),rgba(6,6,16,0.82))]">
                    <div className="flex h-full items-center justify-center text-white/75">
                      <Button variant="primary">
                        <Play className="h-5 w-5" />
                        Play recording
                      </Button>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4" />
                      Share link
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/35">Auto-generated chapters</p>
                    <div className="mt-5 space-y-3">
                      {selectedRecording.chapters.map((chapter) => (
                        <div key={chapter.title} className="rounded-[24px] border border-white/10 bg-black/10 p-4">
                          <p className="font-semibold text-white">{chapter.title}</p>
                          <p className="mt-1 text-sm text-white/45">{Math.floor(chapter.time / 60)}m mark</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[34px] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/35">Searchable transcript</p>
                    <div className="mt-5 space-y-3">
                      {(transcript?.entries || []).slice(0, 8).map((entry) => (
                        <button
                          key={`${entry.timestamp}-${entry.speaker}`}
                          className="w-full rounded-[24px] border border-white/10 bg-black/10 p-4 text-left"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-semibold text-white">{entry.speaker}</p>
                            <span className="text-xs text-white/40">{entry.timestamp}</span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/55">{entry.text}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
    </AnimatedPage>
  );
}
