/**
 * Mock agenda templates for EtherXMeet video conferencing
 */

export const agendaTemplates = [
  {
    id: 'template1',
    name: 'Sprint Planning',
    description: 'Standard agile sprint planning meeting template',
    items: [
      {
        id: 'item1',
        title: 'Review Sprint Goals',
        duration: 10,
        description: 'Discuss and align on the objectives for the upcoming sprint'
      },
      {
        id: 'item2',
        title: 'Backlog Refinement',
        duration: 15,
        description: 'Review and clarify user stories in the backlog'
      },
      {
        id: 'item3',
        title: 'Story Point Estimation',
        duration: 25,
        description: 'Use planning poker to estimate story complexity'
      },
      {
        id: 'item4',
        title: 'Capacity Planning',
        duration: 10,
        description: 'Calculate team capacity and commit to sprint backlog'
      },
      {
        id: 'item5',
        title: 'Action Items & Next Steps',
        duration: 5,
        description: 'Assign action items and schedule follow-ups'
      }
    ]
  },
  {
    id: 'template2',
    name: '1-on-1 Sync',
    description: 'Personal development and feedback meeting template',
    items: [
      {
        id: 'item1',
        title: 'Check-in & Updates',
        duration: 5,
        description: 'Quick personal and professional check-in'
      },
      {
        id: 'item2',
        title: 'Project Progress Review',
        duration: 10,
        description: 'Discuss current projects, wins, and challenges'
      },
      {
        id: 'item3',
        title: 'Career Development',
        duration: 10,
        description: 'Talk about growth opportunities and learning goals'
      },
      {
        id: 'item4',
        title: 'Feedback Exchange',
        duration: 10,
        description: 'Two-way feedback on recent work and collaboration'
      },
      {
        id: 'item5',
        title: 'Action Planning',
        duration: 5,
        description: 'Document commitments and follow-up items'
      }
    ]
  },
  {
    id: 'template3',
    name: 'All Hands',
    description: 'Company-wide or department-wide meeting template',
    items: [
      {
        id: 'item1',
        title: 'Welcome & Overview',
        duration: 5,
        description: 'Kick off the meeting and set the agenda'
      },
      {
        id: 'item2',
        title: 'Company Updates',
        duration: 15,
        description: 'Share key metrics, milestones, and strategic updates'
      },
      {
        id: 'item3',
        title: 'Team Highlights',
        duration: 15,
        description: 'Recognize achievements and celebrate wins'
      },
      {
        id: 'item4',
        title: 'New Initiatives',
        duration: 15,
        description: 'Introduce upcoming projects and initiatives'
      },
      {
        id: 'item5',
        title: 'Open Forum Q&A',
        duration: 10,
        description: 'Open floor for questions and discussion'
      },
      {
        id: 'item6',
        title: 'Closing Remarks',
        duration: 5,
        description: 'Wrap up and share next steps'
      }
    ]
  }
];

export default agendaTemplates;
