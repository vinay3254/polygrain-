import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Radio, Waves, Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';
import Button from '../../ui/Button';
import Slider from '../../ui/Slider';
import EffectCard from './EffectCard';
import Equalizer from './Equalizer';

const VOICE_EFFECTS = [
  { id: 'none', name: 'Normal', icon: '🎤', description: 'No effects applied' },
  { id: 'robot', name: 'Robot', icon: '🤖', description: 'Robotic voice filter' },
  { id: 'deep', name: 'Deep Voice', icon: '🔊', description: 'Lower pitch' },
  { id: 'helium', name: 'Helium', icon: '🎈', description: 'Higher pitch' },
  { id: 'echo', name: 'Echo Chamber', icon: '🏛️', description: 'Reverb effect' },
  { id: 'radio', name: 'Radio Static', icon: '📻', description: 'Old radio filter' },
  { id: 'whisper', name: 'Whisper', icon: '🤫', description: 'Soft and quiet' },
];

export default function VoiceEffects({ isOpen, onClose }) {
  const [activeEffect, setActiveEffect] = useState('none');
  const [noiseSuppress, setNoiseSuppress] = useState(true);
  const [pushToTalk, setPushToTalk] = useState(false);
  const [volume, setVolume] = useState(80);
  const [eqSettings, setEqSettings] = useState({
    bass: 0, lowMid: 0, mid: 0, highMid: 0, treble: 0
  });
  
  const audioContextRef = useRef(null);
  const effectsRef = useRef({});
  
  useEffect(() => {
    const initAudio = async () => {
      await Tone.start();
      
      effectsRef.current = {
        pitchShift: new Tone.PitchShift(),
        reverb: new Tone.Reverb(1.5),
        distortion: new Tone.Distortion(0),
        eq: new Tone.EQ3(),
        compressor: new Tone.Compressor(-30, 3),
        volume: new Tone.Volume(0)
      };
    };
    
    if (isOpen) initAudio();
    
    return () => {
      Object.values(effectsRef.current).forEach(effect => {
        if (effect && effect.dispose) effect.dispose();
      });
    };
  }, [isOpen]);
  
  const applyEffect = (effectId) => {
    setActiveEffect(effectId);
    
    const effects = effectsRef.current;
    if (!effects.pitchShift) return;
    
    // Reset all effects
    effects.pitchShift.pitch = 0;
    effects.reverb.wet.value = 0;
    effects.distortion.wet.value = 0;
    
    switch (effectId) {
      case 'robot':
        effects.pitchShift.pitch = -2;
        effects.distortion.wet.value = 0.3;
        break;
      case 'deep':
        effects.pitchShift.pitch = -8;
        break;
      case 'helium':
        effects.pitchShift.pitch = 12;
        break;
      case 'echo':
        effects.reverb.wet.value = 0.7;
        break;
      case 'radio':
        effects.distortion.wet.value = 0.5;
        break;
      case 'whisper':
        effects.volume.volume.value = -20;
        break;
      default:
        break;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-40 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Waves className="text-app-secondary" size={24} />
          <div>
            <h2 className="font-syne font-bold">Voice Effects</h2>
            <p className="text-xs text-gray-400">Audio transformation</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>✕</Button>
      </div>
      
      {/* Volume */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {volume === 0 ? <VolumeX /> : <Volume2 />}
          <Slider
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            showValue
          />
        </div>
      </div>
      
      {/* Voice Effects Grid */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Radio size={16} className="text-app-primary" />
          Voice Effects
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {VOICE_EFFECTS.map((effect) => (
            <EffectCard
              key={effect.id}
              effect={effect}
              active={activeEffect === effect.id}
              onClick={() => applyEffect(effect.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Equalizer */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-semibold mb-3">Audio Equalizer</h3>
        <Equalizer settings={eqSettings} onChange={setEqSettings} />
        
        {/* EQ Presets */}
        <div className="flex gap-2 mt-3">
          {['Flat', 'Bass Boost', 'Voice Clarity', 'Warm'].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                const presets = {
                  'Flat': { bass: 0, lowMid: 0, mid: 0, highMid: 0, treble: 0 },
                  'Bass Boost': { bass: 6, lowMid: 3, mid: 0, highMid: -2, treble: -2 },
                  'Voice Clarity': { bass: -2, lowMid: 0, mid: 4, highMid: 5, treble: 3 },
                  'Warm': { bass: 3, lowMid: 2, mid: 0, highMid: -1, treble: -3 },
                };
                setEqSettings(presets[preset]);
              }}
              className="text-xs glass px-3 py-1.5 rounded-lg hover:bg-app-surface transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
      
      {/* Additional Settings */}
      <div className="p-4 space-y-3">
        <label className="flex items-center justify-between glass-card p-3 rounded-lg cursor-pointer">
          <span className="text-sm">Noise Suppression</span>
          <input
            type="checkbox"
            checked={noiseSuppress}
            onChange={(e) => setNoiseSuppress(e.target.checked)}
            className="rounded"
          />
        </label>
        
        <label className="flex items-center justify-between glass-card p-3 rounded-lg cursor-pointer">
          <div>
            <span className="text-sm">Push-to-Talk Mode</span>
            <p className="text-xs text-gray-400">Hold SPACE to speak</p>
          </div>
          <input
            type="checkbox"
            checked={pushToTalk}
            onChange={(e) => setPushToTalk(e.target.checked)}
            className="rounded"
          />
        </label>
      </div>
    </motion.div>
  );
}
