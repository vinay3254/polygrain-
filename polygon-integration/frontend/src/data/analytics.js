/**
 * Mock analytics data for EtherXMeet video conferencing
 */

export const meetingAnalytics = {
  meetingId: 'm1',
  meetingTitle: 'Sprint Planning - Q4 2024',
  duration: 60,
  totalParticipants: 8,
  
  // Speaking time distribution (percentage)
  speakingTime: [
    { participant: 'Sarah Johnson', percentage: 28, duration: 16.8 },
    { participant: 'Michael Chen', percentage: 22, duration: 13.2 },
    { participant: 'Emily Rodriguez', percentage: 15, duration: 9.0 },
    { participant: 'David Kim', percentage: 12, duration: 7.2 },
    { participant: 'Priya Patel', percentage: 8, duration: 4.8 },
    { participant: 'Alex Turner', percentage: 7, duration: 4.2 },
    { participant: 'James Wilson', percentage: 5, duration: 3.0 },
    { participant: 'Sofia Martinez', percentage: 3, duration: 1.8 }
  ],

  // Overall engagement score (0-100)
  engagementScore: 85,

  // Number of times participants spoke over each other
  interruptionCount: 7,

  // Sentiment analysis data
  sentimentData: {
    positive: 65,
    neutral: 28,
    negative: 7,
    timeline: [
      { minute: 0, sentiment: 'positive', score: 0.7 },
      { minute: 10, sentiment: 'positive', score: 0.8 },
      { minute: 20, sentiment: 'neutral', score: 0.5 },
      { minute: 30, sentiment: 'positive', score: 0.6 },
      { minute: 40, sentiment: 'positive', score: 0.9 },
      { minute: 50, sentiment: 'neutral', score: 0.4 },
      { minute: 60, sentiment: 'positive', score: 0.8 }
    ]
  },

  // Word cloud data (most frequently used words)
  wordCloud: [
    { word: 'sprint', count: 45 },
    { word: 'feature', count: 38 },
    { word: 'user', count: 32 },
    { word: 'story', count: 28 },
    { word: 'estimate', count: 25 },
    { word: 'points', count: 23 },
    { word: 'backlog', count: 20 },
    { word: 'planning', count: 18 },
    { word: 'capacity', count: 16 },
    { word: 'team', count: 15 },
    { word: 'priority', count: 14 },
    { word: 'implementation', count: 12 },
    { word: 'review', count: 11 },
    { word: 'dashboard', count: 10 },
    { word: 'API', count: 9 }
  ],

  // Participation metrics
  participationMetrics: {
    questionsAsked: 12,
    decisionsRaised: 5,
    actionItemsCreated: 8,
    averageResponseTime: 3.5 // seconds
  },

  // Meeting health indicators
  healthIndicators: {
    balanced: true, // Speaking time distribution is balanced
    engaging: true, // High engagement score
    productive: true, // Good action items to time ratio
    inclusive: false // Some participants spoke very little
  }
};

export default meetingAnalytics;
