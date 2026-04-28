const QUALITIES = [
  { id: '720p', name: '720p HD', size: '~1 GB/hr' },
  { id: '1080p', name: '1080p Full HD', size: '~2 GB/hr' },
  { id: '4k', name: '4K Ultra HD', size: '~6 GB/hr' },
];

export default function QualitySettings({ value, onChange }) {
  return (
    <div className="space-y-2">
      {QUALITIES.map((q) => (
        <button
          key={q.id}
          onClick={() => onChange(q.id)}
          className={`
            w-full p-3 rounded-xl text-left flex items-center justify-between transition-all
            ${value === q.id 
              ? 'bg-app-primary text-white' 
              : 'glass hover:bg-app-surface'}
          `}
        >
          <span className="font-semibold">{q.name}</span>
          <span className="text-xs opacity-70">{q.size}</span>
        </button>
      ))}
    </div>
  );
}
