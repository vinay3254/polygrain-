import { motion } from 'framer-motion';

export default function StatsCard({ icon, label, value, trend, color = 'primary' }) {
  const colorClasses = {
    primary: 'text-app-primary',
    accent: 'text-app-accent',
    success: 'text-green-400',
    warning: 'text-yellow-400'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className={`${colorClasses[color]} text-3xl mb-2`}>{icon}</div>
      <h3 className="text-2xl font-bold font-syne">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
      {trend && (
        <div className={`text-xs mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </div>
      )}
    </motion.div>
  );
}
