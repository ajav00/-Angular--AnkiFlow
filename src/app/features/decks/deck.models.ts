export type DeckCategory = 'Language' | 'Science' | 'Professional' | 'Personal';
export type DeckStatus = 'Active' | 'New' | 'Paused';

export interface DeckLibraryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: DeckCategory;
  readonly termLanguage: string;
  readonly definitionLanguage: string;
  readonly cardCount: number;
  readonly dueCount: number;
  readonly masteryPercentage: number;
  readonly lastStudiedLabel: string;
  readonly color: string;
  readonly status: DeckStatus;
}

export interface DeckLibrarySummary {
  readonly totalDecks: number;
  readonly totalCards: number;
  readonly dueToday: number;
}

export interface DeckLibraryViewModel {
  readonly summary: DeckLibrarySummary;
  readonly decks: readonly DeckLibraryItem[];
}
