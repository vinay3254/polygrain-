import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';

export function useVoiceFX() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentEffect, setCurrentEffect] = useState('none');
  const micRef = useRef(null);
  const effectsChainRef = useRef(null);
  
  const initialize = useCallback(async () => {
    await Tone.start();
    
    // Create microphone input
    micRef.current = new Tone.UserMedia();
    
    // Create effects chain
    const pitchShift = new Tone.PitchShift();
    const reverb = new Tone.Reverb(1.5);
    const distortion = new Tone.Distortion(0);
    const eq = new Tone.EQ3();
    const compressor = new Tone.Compressor(-30, 3);
    const volume = new Tone.Volume(0);
    
    effectsChainRef.current = {
      pitchShift, reverb, distortion, eq, compressor, volume
    };
    
    // Connect chain
    micRef.current.chain(
      pitchShift,
      reverb,
      distortion,
      eq,
      compressor,
      volume,
      Tone.Destination
    );
    
    await micRef.current.open();
    setIsInitialized(true);
  }, []);
  
  const applyEffect = useCallback((effectId) => {
    if (!effectsChainRef.current) return;
    
    const { pitchShift, reverb, distortion, volume } = effectsChainRef.current;
    
    // Reset
    pitchShift.pitch = 0;
    reverb.wet.value = 0;
    distortion.wet.value = 0;
    volume.volume.value = 0;
    
    switch (effectId) {
      case 'robot':
        pitchShift.pitch = -2;
        distortion.wet.value = 0.3;
        break;
      case 'deep':
        pitchShift.pitch = -8;
        break;
      case 'helium':
        pitchShift.pitch = 12;
        break;
      case 'echo':
        reverb.wet.value = 0.7;
        break;
      case 'whisper':
        volume.volume.value = -20;
        break;
    }
    
    setCurrentEffect(effectId);
  }, []);
  
  const cleanup = useCallback(() => {
    if (micRef.current) micRef.current.close();
    if (effectsChainRef.current) {
      Object.values(effectsChainRef.current).forEach(e => e.dispose());
    }
  }, []);
  
  return { initialize, applyEffect, cleanup, isInitialized, currentEffect };
}
