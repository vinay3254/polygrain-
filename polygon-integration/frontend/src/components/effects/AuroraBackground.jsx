import { useEffect, useRef } from 'react';
import '../../styles/aurora.css';

// Canvas mesh that warps gently based on mouse position
function MeshCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const COLS = 18;
    const ROWS = 12;
    const mouse = { x: W / 2, y: H / 2 };
    let t = 0;

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    });

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      const cellW = W / COLS;
      const cellH = H / ROWS;

      for (let row = 0; row <= ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const bx = col * cellW;
          const by = row * cellH;
          const dx = (mouse.x - bx) / W;
          const dy = (mouse.y - by) / H;
          const distFactor = 1 - Math.min(Math.sqrt(dx * dx + dy * dy) * 1.4, 1);
          const warpX = Math.sin(t + col * 0.4 + row * 0.3) * 6 * distFactor;
          const warpY = Math.cos(t + row * 0.5 + col * 0.2) * 6 * distFactor;
          const x = bx + warpX;
          const y = by + warpY;
          col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = 0.04 + (row / ROWS) * 0.03;
        ctx.strokeStyle = `rgba(212,181,113,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= ROWS; row++) {
          const bx = col * cellW;
          const by = row * cellH;
          const dx = (mouse.x - bx) / W;
          const dy = (mouse.y - by) / H;
          const distFactor = 1 - Math.min(Math.sqrt(dx * dx + dy * dy) * 1.4, 1);
          const warpX = Math.sin(t + col * 0.4 + row * 0.3) * 6 * distFactor;
          const warpY = Math.cos(t + row * 0.5 + col * 0.2) * 6 * distFactor;
          const x = bx + warpX;
          const y = by + warpY;
          row === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = 0.04 + (col / COLS) * 0.03;
        ctx.strokeStyle = `rgba(212,181,113,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export default function AuroraBackground() {
  return (
    <div className="aurora-root">
      {/* Glowing orbs */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />
      <div className="aurora-orb aurora-orb-5" />

      {/* Aurora wave bands */}
      <div className="aurora-band aurora-band-1" />
      <div className="aurora-band aurora-band-2" />

      {/* Warping mesh */}
      <MeshCanvas />
    </div>
  );
}
