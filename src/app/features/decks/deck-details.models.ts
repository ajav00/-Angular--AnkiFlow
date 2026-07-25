export type FlashcardState = 'New' | 'Learning' | 'Review' | 'Suspended';

export interface DeckDetailStatistic {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly tone: 'aqua' | 'yellow' | 'pink';
}

export interface FlashcardListItem {
  readonly id: string;
  readonly front: string;
  readonly back: string;
  readonly tags: readonly string[];
  readonly state: FlashcardState;
  readonly intervalLabel: string;
  readonly dueLabel: string;
}

export interface DeckDetailsViewModel {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly termLanguage: string;
  readonly definitionLanguage: string;
  readonly color: string;
  readonly statistics: readonly DeckDetailStatistic[];
  readonly cards: readonly FlashcardListItem[];
}
