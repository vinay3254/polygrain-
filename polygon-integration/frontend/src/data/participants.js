/**
 * Mock participant data for EtherXMeet video conferencing
 */

export const participants = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'Host',
    email: 'sarah.johnson@etherxmeet.com',
    isMuted: false,
    isVideoOff: false,
    isSpeaking: true,
    joinedAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    avatar: '👨‍💻',
    role: 'Co-host',
    email: 'michael.chen@etherxmeet.com',
    isMuted: false,
    isVideoOff: false,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 3500000).toISOString()
  },
  {
    id: 'p3',
    name: 'Emily Rodriguez',
    avatar: 'ER',
    role: 'Participant',
    email: 'emily.rodriguez@company.com',
    isMuted: true,
    isVideoOff: false,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 3400000).toISOString()
  },
  {
    id: 'p4',
    name: 'David Kim',
    avatar: '🧑‍💼',
    role: 'Participant',
    email: 'david.kim@company.com',
    isMuted: false,
    isVideoOff: true,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 3200000).toISOString()
  },
  {
    id: 'p5',
    name: 'Priya Patel',
    avatar: 'PP',
    role: 'Participant',
    email: 'priya.patel@company.com',
    isMuted: true,
    isVideoOff: true,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 2800000).toISOString()
  },
  {
    id: 'p6',
    name: 'Alex Turner',
    avatar: '👩‍🎨',
    role: 'Participant',
    email: 'alex.turner@company.com',
    isMuted: false,
    isVideoOff: false,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 2400000).toISOString()
  },
  {
    id: 'p7',
    name: 'James Wilson',
    avatar: 'JW',
    role: 'Participant',
    email: 'james.wilson@company.com',
    isMuted: true,
    isVideoOff: false,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'p8',
    name: 'Sofia Martinez',
    avatar: '👩‍💻',
    role: 'Participant',
    email: 'sofia.martinez@company.com',
    isMuted: false,
    isVideoOff: true,
    isSpeaking: false,
    joinedAt: new Date(Date.now() - 900000).toISOString()
  }
];

export default participants;
