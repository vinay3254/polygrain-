import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Maximize2, MonitorUp, PencilLine, Presentation, SplitSquareVertical, X } from 'lucide-react';
import Button from '../../ui/Button';

const shareSources = ['Browser tab', 'Window', 'Entire screen'];

export default function ScreenSharePlus({ isOpen, onClose }) {
  const [source, setSource] = useState('Browser tab');
  const [followMe, setFollowMe] = useState(true);
  const [multiShare, setMultiShare] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);

  if (!isOpen) {
    return null;
  }

  const position = (event) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event) => {
    setDrawing(true);
    setAnnotations((previous) => [...previous, [position(event)]]);
  };

  const handlePointerMove = (event) => {
    if (!drawing) {
      return;
    }

    setAnnotations((previous) => {
      const updated = [...previous];
      updated[updated.length - 1] = [...updated[updated.length - 1], position(event)];
      return updated;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
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
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Advanced Screen Share+</p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">Share, annotate, and steer the audience view</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(79,70,229,0.36),rgba(6,182,212,0.16),rgba(10,10,24,0.85))]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22400%22 height=%22240%22 viewBox=%220 0 400 240%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 stroke=%22rgba(255,255,255,0.08)%22 stroke-width=%221%22%3E%3Crect x=%2224%22 y=%2224%22 width=%22144%22 height=%2288%22 rx=%2216%22/%3E%3Crect x=%22192%22 y=%2224%22 width=%22184%22 height=%22144%22 rx=%2218%22/%3E%3Crect x=%2224%22 y=%22128%22 width=%22144%22 height=%2288%22 rx=%2216%22/%3E%3C/g%3E%3C/svg%3E')] opacity-70" />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDrawing(false)}
                onPointerLeave={() => setDrawing(false)}
              />
              <svg className="absolute inset-0 h-full w-full">
                {annotations.map((stroke, strokeIndex) => (
                  <polyline
                    key={strokeIndex}
                    fill="none"
                    stroke="rgba(255,80,80,0.95)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={stroke.map((point) => `${point.x},${point.y}`).join(' ')}
                  />
                ))}
              </svg>
              <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                {source}
              </div>
              {presentationMode && (
                <div className="absolute bottom-4 left-4 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                  Presentation Mode
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="grid gap-2">
              {shareSources.map((shareSource) => (
                <button
                  key={shareSource}
                  onClick={() => setSource(shareSource)}
                  className={`rounded-[22px] border px-4 py-3 text-left text-sm ${
                    source === shareSource
                      ? 'border-cyan-400/20 bg-cyan-400/12 text-cyan-100'
                      : 'border-white/10 bg-black/10 text-white/60'
                  }`}
                >
                  {shareSource}
                </button>
              ))}
            </div>

            <ToggleRow icon={Eye} label="Follow Me Mode" checked={followMe} onToggle={() => setFollowMe((previous) => !previous)} />
            <ToggleRow icon={SplitSquareVertical} label="Multi-share" checked={multiShare} onToggle={() => setMultiShare((previous) => !previous)} />
            <ToggleRow icon={Presentation} label="Presentation Mode" checked={presentationMode} onToggle={() => setPresentationMode((previous) => !previous)} />

            <div className="rounded-[24px] border border-white/10 bg-black/10 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <PencilLine className="h-4 w-4 text-cyan-200" />
                Annotation layer
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Draw directly over the shared view to point, outline, or zoom a specific region for the room.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setAnnotations([])}>
                <MonitorUp className="h-4 w-4" />
                Clear ink
              </Button>
              <Button variant="primary">
                <Maximize2 className="h-4 w-4" />
                Start Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ToggleRow({ icon: Icon, label, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between rounded-[22px] border px-4 py-3 text-sm ${
        checked ? 'border-indigo-400/20 bg-indigo-500/12 text-white' : 'border-white/10 bg-black/10 text-white/60'
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span>{checked ? 'On' : 'Off'}</span>
    </button>
  );
}
