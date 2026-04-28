import { motion } from 'framer-motion';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import Badge from '../../ui/Badge';

export default function ActionItems({ items }) {
  return (
    <div className="p-4 space-y-3">
      {items.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <AlertCircle className="mx-auto mb-2" size={40} />
          <p>No action items detected yet</p>
        </div>
      ) : (
        items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <Circle className="text-app-primary mt-1" size={20} />
              <div className="flex-1">
                <p className="text-sm mb-2">{item.text}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="info">{item.assignee}</Badge>
                  <Badge variant={item.priority === 'high' ? 'danger' : 'warning'}>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
