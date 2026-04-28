import { motion } from 'framer-motion';
import { UserX, MicOff, Ban, Flag } from 'lucide-react';
import Button from '../../ui/Button';
import Avatar from '../../ui/Avatar';

export default function ParticipantControls({ participant, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-4 rounded-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={participant.name} size="lg" />
        <div>
          <h4 className="font-semibold">{participant.name}</h4>
          <p className="text-xs text-gray-400">{participant.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => onAction('mute', participant.id)}
          icon={<MicOff />}
        >
          Mute
        </Button>
        <Button 
          size="sm" 
          variant="danger"
          onClick={() => onAction('remove', participant.id)}
          icon={<UserX />}
        >
          Remove
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => onAction('report', participant.id)}
          icon={<Flag />}
        >
          Report
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => onAction('block', participant.id)}
          icon={<Ban />}
        >
          Block
        </Button>
      </div>
    </motion.div>
  );
}
