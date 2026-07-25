import { StudySessionViewModel } from '../study.models';

export const STUDY_SESSION_FIXTURE: StudySessionViewModel = {
  deck: {
    id: 'everyday-english',
    title: 'Everyday English',
    color: '#79f3ea',
  },
  card: {
    id: 'card-002',
    front: 'Could you say that again?',
    back: '¿Podrías repetirlo?',
    hint: 'Use this when you did not hear or understand someone.',
    tags: ['conversation', 'clarification'],
    example: 'Sorry, could you say that again a little more slowly?',
  },
  currentCard: 8,
  totalCards: 28,
  reviewedCards: 7,
  correctCards: 6,
  estimatedMinutesRemaining: 9,
  ratings: [
    {
      label: 'Again',
      intervalLabel: '1 min',
      shortcut: '1',
      tone: 'again',
    },
    {
      label: 'Hard',
      intervalLabel: '6 min',
      shortcut: '2',
      tone: 'hard',
    },
    {
      label: 'Good',
      intervalLabel: '3 days',
      shortcut: '3',
      tone: 'good',
    },
    {
      label: 'Easy',
      intervalLabel: '8 days',
      shortcut: '4',
      tone: 'easy',
    },
  ],
};
