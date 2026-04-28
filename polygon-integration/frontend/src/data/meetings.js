/**
 * Mock meeting data for EtherXMeet video conferencing
 */

export const pastMeetings = [
  {
    id: 'm1',
    title: 'Sprint Planning - Q4 2024',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    duration: 60,
    participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'],
    recordingUrl: '/recordings/m1.mp4',
    status: 'completed'
  },
  {
    id: 'm2',
    title: 'Client Demo - Dashboard Features',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    duration: 45,
    participants: ['Sarah Johnson', 'Alex Turner', 'James Wilson'],
    recordingUrl: '/recordings/m2.mp4',
    status: 'completed'
  },
  {
    id: 'm3',
    title: 'Design Review - Mobile App Redesign',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    duration: 90,
    participants: ['Alex Turner', 'Emily Rodriguez', 'Sofia Martinez', 'Michael Chen'],
    recordingUrl: '/recordings/m3.mp4',
    status: 'completed'
  },
  {
    id: 'm4',
    title: 'Weekly Team Sync',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    duration: 30,
    participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Priya Patel'],
    recordingUrl: '/recordings/m4.mp4',
    status: 'completed'
  },
  {
    id: 'm5',
    title: '1-on-1: Sarah & Michael',
    date: new Date(Date.now() - 86400000 * 8).toISOString(),
    duration: 30,
    participants: ['Sarah Johnson', 'Michael Chen'],
    recordingUrl: null,
    status: 'completed'
  },
  {
    id: 'm6',
    title: 'Product Roadmap Discussion',
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    duration: 120,
    participants: ['Sarah Johnson', 'Michael Chen', 'Alex Turner', 'James Wilson', 'Sofia Martinez'],
    recordingUrl: '/recordings/m6.mp4',
    status: 'completed'
  },
  {
    id: 'm7',
    title: 'Engineering All Hands',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    duration: 60,
    participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Priya Patel', 'Alex Turner', 'James Wilson', 'Sofia Martinez'],
    recordingUrl: '/recordings/m7.mp4',
    status: 'completed'
  },
  {
    id: 'm8',
    title: 'Security Audit Review',
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    duration: 75,
    participants: ['Michael Chen', 'David Kim', 'James Wilson'],
    recordingUrl: '/recordings/m8.mp4',
    status: 'completed'
  },
  {
    id: 'm9',
    title: 'UX Research Findings',
    date: new Date(Date.now() - 86400000 * 20).toISOString(),
    duration: 45,
    participants: ['Alex Turner', 'Emily Rodriguez', 'Sofia Martinez'],
    recordingUrl: '/recordings/m9.mp4',
    status: 'completed'
  },
  {
    id: 'm10',
    title: 'Q3 Retrospective',
    date: new Date(Date.now() - 86400000 * 25).toISOString(),
    duration: 90,
    participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Priya Patel'],
    recordingUrl: '/recordings/m10.mp4',
    status: 'completed'
  }
];

export const upcomingMeetings = [];

export const meetings = [
  ...upcomingMeetings.map((meeting) => ({ ...meeting, status: 'upcoming' })),
  ...pastMeetings.map((meeting) => ({ ...meeting, status: 'past' })),
];

export const asyncMessages = [];

export const notifications = [];

export const collaborators = [];

export default { pastMeetings, upcomingMeetings, meetings, asyncMessages, notifications, collaborators };
