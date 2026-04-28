import { motion } from 'framer-motion';

const BANDS = [
  { key: 'bass', label: 'Bass', freq: '60Hz' },
  { key: 'lowMid', label: 'Low Mid', freq: '250Hz' },
  { key: 'mid', label: 'Mid', freq: '1kHz' },
  { key: 'highMid', label: 'High Mid', freq: '4kHz' },
  { key: 'treble', label: 'Treble', freq: '12kHz' },
];

export default function Equalizer({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };
  
  return (
    <div className="flex justify-between gap-2">
      {BANDS.map((band) => (
        <div key={band.key} className="flex flex-col items-center">
          <div className="h-32 flex flex-col items-center justify-end relative">
            {/* Track background */}
            <div className="absolute inset-x-0 h-full w-2 mx-auto bg-app-surface rounded-full" />
            
            {/* Active fill */}
            <motion.div
              animate={{ 
                height: `${Math.abs(settings[band.key]) * 4 + 50}%`,
                y: settings[band.key] > 0 ? '-50%' : '0%'
              }}
              className={`
                absolute w-2 mx-auto rounded-full origin-bottom
                ${settings[band.key] >= 0 
                  ? 'bg-gradient-to-t from-app-primary to-app-secondary bottom-1/2' 
                  : 'bg-gradient-to-b from-app-primary to-app-secondary top-1/2'}
              `}
            />
            
            {/* Slider input */}
            <input
              type="range"
              min={-12}
              max={12}
              value={settings[band.key]}
              onChange={(e) => handleChange(band.key, Number(e.target.value))}
              className="absolute h-full w-8 opacity-0 cursor-pointer"
              style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
            />
            
            {/* Value display */}
            <span className="absolute -top-6 text-xs text-app-secondary">
              {settings[band.key] > 0 ? '+' : ''}{settings[band.key]}dB
            </span>
          </div>
          
          <span className="text-xs text-gray-400 mt-2">{band.freq}</span>
        </div>
      ))}
    </div>
  );
}
