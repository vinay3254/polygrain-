import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function SpeakingTimeChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400 py-4">No data yet</div>;
  }
  
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            stroke="rgba(255,255,255,0.2)"
          />
          <YAxis 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            stroke="rgba(255,255,255,0.2)"
          />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(19, 19, 43, 0.9)', 
              border: '1px solid rgba(79, 70, 229, 0.3)',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#E8D5A3' }}
          />
          <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
