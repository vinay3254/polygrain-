import { useEffect, useRef } from 'react';

export default function AudioVisualizer({ stream, height = 40 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    if (!stream) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      source.connect(analyser);
      analyser.fftSize = 256;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = '#060610';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height;
          
          const hue = (i / bufferLength) * 240 + 200;
          ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      };
      
      draw();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (source) {
          source.disconnect();
        }
        if (audioContext && audioContext.state !== 'closed') {
          audioContext.close();
        }
      };
    } catch (err) {
      console.error('Error creating audio visualizer:', err);
    }
  }, [stream]);

  return (
    <canvas 
      ref={canvasRef} 
      width="300" 
      height={height} 
      className="w-full rounded-lg bg-dark-900/50 border border-purple-500/20"
    />
  );
}
