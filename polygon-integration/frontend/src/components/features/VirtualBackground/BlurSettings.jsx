import { Droplet } from 'lucide-react';
import Slider from '../../ui/Slider';

export default function BlurSettings({ value, onChange }) {
  const presets = [
    { label: 'None', value: 0 },
    { label: 'Light', value: 5 },
    { label: 'Medium', value: 15 },
    { label: 'Heavy', value: 30 },
  ];
  
  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-app-secondary">
        <Droplet size={20} />
        <span className="font-semibold">Background Blur</span>
      </div>
      
      <div className="flex gap-2">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm transition-all
              ${value === preset.value 
                ? 'bg-app-primary text-white' 
                : 'glass hover:bg-app-surface'}
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>
      
      <Slider
        min={0}
        max={50}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        label="Custom Blur"
        showValue
      />
    </div>
  );
}
