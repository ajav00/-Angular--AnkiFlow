export interface GetCardResponse {
  readonly id: number;
  readonly front: string;
  readonly back: string;
  readonly example?: string | null;
  readonly isFavorite: boolean;
  readonly deckId: number;
  readonly lastStatus: number;
}

export interface CreateCardRequest {
  readonly front: string;
  readonly back: string;
  readonly example?: string;
  readonly isFavorite?: boolean;
  readonly deckId: number;
}

export interface CreateCardResponse {
  readonly newId: number;
}

export interface EditCardRequest {
  readonly id: number;
  readonly front?: string;
  readonly back?: string;
  readonly example?: string;
  readonly isFavorite?: boolean;
  readonly deckId?: number;
}
