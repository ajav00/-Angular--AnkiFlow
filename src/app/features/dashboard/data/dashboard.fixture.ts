import { DashboardViewModel } from '../dashboard.models';

export const DASHBOARD_FIXTURE: DashboardViewModel = {
  user: {
    name: 'Javier',
    currentStreak: 12,
  },
  reviewSummary: {
    newCards: 18,
    learningCards: 7,
    reviewCards: 32,
    estimatedMinutes: 24,
  },
  statistics: [
    {
      label: 'Current streak',
      value: '12 days',
      detail: 'Personal best: 18 days',
      tone: 'warning',
    },
    {
      label: 'Cards reviewed',
      value: '1,284',
      detail: '+146 this week',
      tone: 'primary',
    },
    {
      label: 'Recall rate',
      value: '89%',
      detail: '+4% from last month',
      tone: 'success',
    },
  ],
  recentDecks: [
    {
      id: 1,
      title: 'Everyday English',
      description: 'Useful vocabulary for daily conversations',
      termLanguage: 'English',
      definitionLanguage: 'Spanish',
      totalCards: 240,
      dueCards: 28,
      masteryPercentage: 72,
      color: '#4a90e2',
    },
    {
      id: 2,
      title: 'Japanese Essentials',
      description: 'Core expressions, kanji, and pronunciation',
      termLanguage: 'Japanese',
      definitionLanguage: 'English',
      totalCards: 186,
      dueCards: 14,
      masteryPercentage: 54,
      color: '#ff8da1',
    },
    {
      id: 3,
      title: 'Medical Terminology',
      description: 'High-yield terms for anatomy and physiology',
      termLanguage: 'English',
      definitionLanguage: 'English',
      totalCards: 320,
      dueCards: 9,
      masteryPercentage: 81,
      color: '#50c878',
    },
  ],
};
