/**
 * Mock transcript data for EtherXMeet video conferencing
 */

export const transcripts = [
  {
    id: 'trans1',
    meetingId: 'm1',
    title: 'Sprint Planning - Q4 2024',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    entries: [
      {
        timestamp: '00:00:15',
        speaker: 'Sarah Johnson',
        text: 'Good morning everyone! Thanks for joining our Q4 sprint planning. Let\'s get started with our agenda for today.'
      },
      {
        timestamp: '00:00:45',
        speaker: 'Michael Chen',
        text: 'Morning Sarah. I\'ve prepared the backlog review. We have 23 stories ready for estimation.'
      },
      {
        timestamp: '00:01:20',
        speaker: 'Emily Rodriguez',
        text: 'Before we dive in, can we discuss the performance issues from last sprint? I think it affects our capacity planning.'
      },
      {
        timestamp: '00:02:10',
        speaker: 'Sarah Johnson',
        text: 'Good point Emily. David, you were working on the optimization. Can you give us a quick update?'
      },
      {
        timestamp: '00:02:45',
        speaker: 'David Kim',
        text: 'Yes, we\'ve reduced the API response time by 40%. The database indexing changes are deployed to production.'
      },
      {
        timestamp: '00:03:30',
        speaker: 'Michael Chen',
        text: 'That\'s excellent. So we can now allocate more time to the new features instead of tech debt.'
      },
      {
        timestamp: '00:04:15',
        speaker: 'Emily Rodriguez',
        text: 'Perfect. I\'m ready to start estimating. Should we use planning poker again?'
      },
      {
        timestamp: '00:04:50',
        speaker: 'Sarah Johnson',
        text: 'Yes, let\'s stick with planning poker. Michael, can you share the first story?'
      },
      {
        timestamp: '00:05:30',
        speaker: 'Michael Chen',
        text: 'First story: As a user, I want to export my meeting transcripts as PDF so I can share them with my team.'
      },
      {
        timestamp: '00:06:20',
        speaker: 'David Kim',
        text: 'I\'d estimate this as a 5. We already have the PDF generation library integrated.'
      }
    ]
  },
  {
    id: 'trans2',
    meetingId: 'm2',
    title: 'Client Demo - Dashboard Features',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    entries: [
      {
        timestamp: '00:00:10',
        speaker: 'Sarah Johnson',
        text: 'Welcome everyone! Thank you for taking the time to review our new dashboard features today.'
      },
      {
        timestamp: '00:00:35',
        speaker: 'Alex Turner',
        text: 'Hi Sarah, excited to see what you\'ve built. We\'ve been waiting for these analytics capabilities.'
      },
      {
        timestamp: '00:01:05',
        speaker: 'Sarah Johnson',
        text: 'Great! Let me hand it over to James who will walk through the new features.'
      },
      {
        timestamp: '00:01:25',
        speaker: 'James Wilson',
        text: 'Thanks Sarah. So the first major feature is real-time analytics. You can now see user engagement metrics as they happen.'
      },
      {
        timestamp: '00:02:10',
        speaker: 'James Wilson',
        text: 'Let me share my screen. As you can see here, the dashboard updates every 30 seconds with the latest data.'
      },
      {
        timestamp: '00:03:00',
        speaker: 'Alex Turner',
        text: 'This looks fantastic! Can we customize which metrics are displayed on the main view?'
      },
      {
        timestamp: '00:03:30',
        speaker: 'James Wilson',
        text: 'Absolutely. You can drag and drop widgets, resize them, and even create custom views for different teams.'
      },
      {
        timestamp: '00:04:15',
        speaker: 'Sarah Johnson',
        text: 'We also added export functionality. You can download reports in CSV, Excel, or PDF format.'
      },
      {
        timestamp: '00:05:00',
        speaker: 'Alex Turner',
        text: 'Perfect. When can we expect this to be available in production?'
      },
      {
        timestamp: '00:05:30',
        speaker: 'Sarah Johnson',
        text: 'We\'re targeting the end of this month. We\'ll schedule a training session for your team next week.'
      }
    ]
  },
  {
    id: 'trans3',
    meetingId: 'm3',
    title: 'Design Review - Mobile App Redesign',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    entries: [
      {
        timestamp: '00:00:20',
        speaker: 'Alex Turner',
        text: 'Hello everyone! Today we\'re reviewing the mobile app redesign. I\'ve incorporated all the feedback from our last session.'
      },
      {
        timestamp: '00:01:00',
        speaker: 'Emily Rodriguez',
        text: 'Excited to see the updates! The navigation was a bit confusing in the previous version.'
      },
      {
        timestamp: '00:01:35',
        speaker: 'Alex Turner',
        text: 'Yes, that was a common piece of feedback. We\'ve moved to a bottom tab navigation instead of the hamburger menu.'
      },
      {
        timestamp: '00:02:15',
        speaker: 'Sofia Martinez',
        text: 'That makes sense. Most users expect tabs at the bottom on mobile. What about the meeting controls?'
      },
      {
        timestamp: '00:02:50',
        speaker: 'Alex Turner',
        text: 'Great question. The meeting controls are now always visible during calls, with quick access to mute, video, and screen share.'
      },
      {
        timestamp: '00:03:40',
        speaker: 'Michael Chen',
        text: 'From a technical perspective, can we implement this with our current component library?'
      },
      {
        timestamp: '00:04:20',
        speaker: 'Alex Turner',
        text: 'Yes, I\'ve checked with the dev team. We have all the components we need. Some minor styling adjustments required.'
      },
      {
        timestamp: '00:05:10',
        speaker: 'Emily Rodriguez',
        text: 'What about dark mode? I noticed it wasn\'t working properly in the prototype.'
      },
      {
        timestamp: '00:05:45',
        speaker: 'Alex Turner',
        text: 'Good catch. I\'ve fixed those issues. The color tokens now properly switch between light and dark themes.'
      },
      {
        timestamp: '00:06:30',
        speaker: 'Sofia Martinez',
        text: 'This looks really polished. I think we\'re ready to move to development. Any concerns?'
      }
    ]
  }
];

export default transcripts;
