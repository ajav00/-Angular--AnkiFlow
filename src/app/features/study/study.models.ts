export interface StudySessionDeck {
  readonly id: string;
  readonly title: string;
  readonly color: string;
}

export interface StudyCard {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly hint: string;
  readonly tags: readonly string[];
  readonly example: string;
}

export interface StudyRating {
  readonly label: string;
  readonly intervalLabel: string;
  readonly shortcut: string;
  readonly tone: 'again' | 'hard' | 'good' | 'easy';
}

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
