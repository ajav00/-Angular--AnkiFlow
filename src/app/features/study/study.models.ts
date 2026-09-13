export enum ReviewRating {
  Fail = 0,
  Hard = 1,
  Easy = 2,
  Learnt = 3,
}

export interface StudySessionDeck {
  readonly id: number;
  readonly title: string;
}

export interface StudyCard {
  readonly id: number;
  readonly front: string;
  readonly back: string;
  readonly example: string | null;
}

export type RatingTone = 'fail' | 'hard' | 'easy' | 'learnt';

export interface StudyRating {
  readonly label: string;
  readonly intervalLabel: string;
  readonly shortcut: string;
  readonly tone: RatingTone;
  readonly value: ReviewRating;
}

export const STUDY_RATINGS: readonly StudyRating[] = [
  { label: 'Fail', intervalLabel: 'Retry now', shortcut: '1', tone: 'fail', value: ReviewRating.Fail },
  { label: 'Hard', intervalLabel: '1 day', shortcut: '2', tone: 'hard', value: ReviewRating.Hard },
  { label: 'Easy', intervalLabel: '3 days', shortcut: '3', tone: 'easy', value: ReviewRating.Easy },
  { label: 'Learnt', intervalLabel: '21 days', shortcut: '4', tone: 'learnt', value: ReviewRating.Learnt },
];

export interface StudySessionViewModel {
  readonly deck: StudySessionDeck;
  readonly card: StudyCard;
  readonly currentCard: number;
  readonly totalCards: number;
  readonly reviewedCards: number;
  readonly correctCards: number;
  readonly estimatedMinutesRemaining: number;
  readonly ratings: readonly StudyRating[];
}
