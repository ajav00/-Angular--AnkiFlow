import { ReviewRating } from './study.models';

export interface DueCardResponse {
  readonly id: number;
  readonly front: string;
  readonly back: string;
  readonly example?: string | null;
  readonly isFavorite: boolean;
  readonly deckId: number;
  readonly lastStatus: number;
}

export interface SavePracticeSessionCard {
  readonly cardId: number;
  readonly rating: ReviewRating;
}

export interface SavePracticeSessionRequest {
  readonly deckId: number;
  readonly cards: readonly SavePracticeSessionCard[];
}
