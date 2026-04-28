import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Eraser,
  Highlighter,
  ImagePlus,
  MousePointer2,
  Paintbrush2,
  PanelRightOpen,
  RotateCcw,
  RotateCw,
  StickyNote,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import Button from '../../ui/Button';

const stickyPalette = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'];
const templates = ['blank', 'kanban', 'mindmap', 'retro', 'flow'];

export default function Whiteboard({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#4F46E5');
  const [strokeSize, setStrokeSize] = useState(4);
  const [lines, setLines] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [template, setTemplate] = useState('blank');
  const [laser, setLaser] = useState({ x: 160, y: 120, visible: false });
  const [layers, setLayers] = useState({
    guides: true,
    ink: true,
    notes: true,
    upload: true,
  });
  const [uploadedImage, setUploadedImage] = useState('');
  const [remoteCursors, setRemoteCursors] = useState([
    { id: 'remote-1', name: 'Nyla', x: 220, y: 180, color: '#06B6D4' },
    { id: 'remote-2', name: 'Rian', x: 520, y: 320, color: '#10B981' },
  ]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setRemoteCursors((previous) =>
        previous.map((cursor) => ({
          ...cursor,
          x: Math.max(60, Math.min(1180, cursor.x + Math.floor(Math.random() * 90) - 45)),
          y: Math.max(60, Math.min(700, cursor.y + Math.floor(Math.random() * 90) - 45)),
        })),
      );
    }, 1800);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (layers.upload && uploadedImage) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = uploadedImage;
    }

    if (!layers.ink) {
      return;
    }

    lines.forEach((line) => {
      if (!line.points.length) {
        return;
      }

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = line.tool === 'eraser' ? '#13132b' : line.color;
      ctx.lineWidth = line.tool === 'highlighter' ? line.size * 3 : line.size;
      ctx.globalAlpha = line.tool === 'highlighter' ? 0.24 : 1;
      ctx.moveTo(line.points[0].x, line.points[0].y);
      line.points.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }, [layers.ink, layers.upload, lines, uploadedImage]);

  if (!isOpen) {
    return null;
  }

  const pointerPosition = (event) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }

    return {
      x: ((event.clientX - rect.left) / rect.width) * canvasRef.current.width,
      y: ((event.clientY - rect.top) / rect.height) * canvasRef.current.height,
    };
  };

  const handlePointerDown = (event) => {
    const point = pointerPosition(event);

    if (tool === 'sticky') {
      setNotes((previousNotes) => [
        ...previousNotes,
        {
          id: `sticky-${Date.now()}`,
          x: point.x,
          y: point.y,
          text: 'New idea',
          color: stickyPalette[notes.length % stickyPalette.length],
        },
      ]);
      return;
    }

    if (tool === 'laser') {
      setLaser({ x: point.x, y: point.y, visible: true });
      return;
    }

    setIsDrawing(true);
    setRedoStack([]);
    setLines((previousLines) => [
      ...previousLines,
      {
        id: `line-${Date.now()}`,
        tool,
        color,
        size: strokeSize,
        points: [point],
      },
    ]);
  };

  const handlePointerMove = (event) => {
    const point = pointerPosition(event);

    if (tool === 'laser') {
      setLaser({ x: point.x, y: point.y, visible: true });
      return;
    }

    if (!isDrawing) {
      return;
    }

    setLines((previousLines) => {
      const updated = [...previousLines];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        points: [...updated[updated.length - 1].points, point],
      };
      return updated;
    });
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    if (tool === 'laser') {
      setLaser((previous) => ({ ...previous, visible: false }));
    }
  };

  const undo = () => {
    if (!lines.length) {
      return;
    }

    setRedoStack((previousRedo) => [lines[lines.length - 1], ...previousRedo]);
    setLines((previousLines) => previousLines.slice(0, -1));
  };

  const redo = () => {
    if (!redoStack.length) {
      return;
    }

    setLines((previousLines) => [...previousLines, redoStack[0]]);
    setRedoStack((previousRedo) => previousRedo.slice(1));
  };

  const exportPng = () => {
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (!dataUrl) {
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = 'etherxmeet-whiteboard.png';
    anchor.click();
  };

  const exportPdf = () => {
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (!dataUrl) {
      return;
    }
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1280, 720] });
    pdf.addImage(dataUrl, 'PNG', 0, 0, 1280, 720);
    pdf.save('etherxmeet-whiteboard.pdf');
  };

  const backgroundGuide = useMemo(() => {
    switch (template) {
      case 'kanban':
        return 'bg-[linear-gradient(90deg,transparent_0,transparent_32%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.08)_33%,transparent_33%,transparent_66%,rgba(255,255,255,0.08)_66%,rgba(255,255,255,0.08)_67%,transparent_67%)]';
      case 'mindmap':
        return 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_2px,transparent_2px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:180px_180px,40px_40px,40px_40px]';
      case 'retro':
        return 'bg-[linear-gradient(90deg,rgba(16,185,129,0.08)_0,rgba(16,185,129,0.08)_33%,rgba(245,158,11,0.08)_33%,rgba(245,158,11,0.08)_66%,rgba(239,68,68,0.08)_66%,rgba(239,68,68,0.08)_100%)]';
      case 'flow':
        return 'bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]';
      default:
        return 'bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]';
    }
  }, [template]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 p-3 backdrop-blur-sm"
    >
      <div className="flex h-full flex-col rounded-[36px] border border-white/10 bg-[rgba(13,13,26,0.95)] p-4 shadow-[0_30px_100px_rgba(4,8,24,0.62)] backdrop-blur-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Collaborative whiteboard</p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">Sketch, map, and annotate in the room</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <ToolButton active={tool === 'pen'} icon={Paintbrush2} label="Pen" onClick={() => setTool('pen')} />
            <ToolButton active={tool === 'highlighter'} icon={Highlighter} label="Marker" onClick={() => setTool('highlighter')} />
            <ToolButton active={tool === 'eraser'} icon={Eraser} label="Erase" onClick={() => setTool('eraser')} />
            <ToolButton active={tool === 'sticky'} icon={StickyNote} label="Sticky" onClick={() => setTool('sticky')} />
            <ToolButton active={tool === 'laser'} icon={MousePointer2} label="Laser" onClick={() => setTool('laser')} />
            <ToolButton active={false} icon={RotateCcw} label="Undo" onClick={undo} />
            <ToolButton active={false} icon={RotateCw} label="Redo" onClick={redo} />
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1021] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
              {templates.map((boardTemplate) => (
                <button
                  key={boardTemplate}
                  onClick={() => setTemplate(boardTemplate)}
                  className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                    template === boardTemplate
                      ? 'border-cyan-400/20 bg-cyan-400/12 text-cyan-100'
                      : 'border-white/10 bg-black/20 text-white/45'
                  }`}
                >
                  {boardTemplate}
                </button>
              ))}
            </div>

            <div className={`absolute inset-0 ${layers.guides ? backgroundGuide : ''}`} />

            <div
              className="absolute inset-0 origin-top-left"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            >
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />

              {layers.notes &&
                notes.map((note) => (
                  <motion.textarea
                    key={note.id}
                    drag
                    defaultValue={note.text}
                    onChange={(event) => {
                      const text = event.target.value;
                      setNotes((previousNotes) =>
                        previousNotes.map((currentNote) =>
                          currentNote.id === note.id ? { ...currentNote, text } : currentNote,
                        ),
                      );
                    }}
                    className="absolute min-h-[120px] w-40 resize-none rounded-[20px] border border-white/10 p-3 text-sm text-white shadow-[0_16px_40px_rgba(4,8,24,0.35)]"
                    style={{
                      left: note.x,
                      top: note.y,
                      background: note.color,
                    }}
                  />
                ))}

              {laser.visible && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute h-5 w-5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                  style={{ left: laser.x - 10, top: laser.y - 10 }}
                />
              )}

              {remoteCursors.map((cursor) => (
                <motion.div
                  key={cursor.id}
                  animate={{ x: cursor.x, y: cursor.y }}
                  className="absolute left-0 top-0"
                >
                  <div className="rounded-full px-2 py-1 text-xs text-white shadow-[0_10px_24px_rgba(4,8,24,0.4)]" style={{ background: cursor.color }}>
                    {cursor.name}
                  </div>
                  <div className="ml-2 h-3 w-3 rounded-full" style={{ background: cursor.color }} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-[260px] flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Board controls</p>
              <div className="mt-3 flex items-center gap-2">
                <Button variant="outline" onClick={() => setZoom((previous) => Math.max(0.6, previous - 0.1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-2 text-sm text-white/70">
                  {Math.round(zoom * 100)}%
                </div>
                <Button variant="outline" onClick={() => setZoom((previous) => Math.min(1.8, previous + 0.1))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Color & stroke</p>
              <div className="mt-3 flex gap-2">
                {['#4F46E5', '#06B6D4', '#10B981', '#EF4444', '#F59E0B'].map((swatch) => (
                  <button
                    key={swatch}
                    onClick={() => setColor(swatch)}
                    className={`h-8 w-8 rounded-full border ${color === swatch ? 'border-white' : 'border-white/10'}`}
                    style={{ background: swatch }}
                  />
                ))}
              </div>
              <input
                className="mt-4 w-full"
                type="range"
                min="2"
                max="20"
                value={strokeSize}
                onChange={(event) => setStrokeSize(Number(event.target.value))}
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">Layers</p>
              <div className="mt-3 space-y-2">
                {Object.entries(layers).map(([key, enabled]) => (
                  <button
                    key={key}
                    onClick={() => setLayers((previous) => ({ ...previous, [key]: !previous[key] }))}
                    className={`flex w-full items-center justify-between rounded-[18px] border px-3 py-2 text-sm capitalize ${
                      enabled ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-black/10 text-white/55'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <PanelRightOpen className="h-4 w-4" />
                      {key}
                    </span>
                    <span>{enabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="cursor-pointer rounded-[22px] border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/65">
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                Upload image
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setUploadedImage(String(reader.result));
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            <div className="mt-auto flex flex-col gap-2">
              <Button variant="outline" onClick={exportPng}>
                <Download className="h-4 w-4" />
                Export PNG
              </Button>
              <Button variant="primary" onClick={exportPdf}>
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ToolButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[20px] border px-3 py-3 text-left text-sm ${
        active ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100' : 'border-white/10 bg-black/10 text-white/60'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
