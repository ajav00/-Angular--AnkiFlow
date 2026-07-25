export interface FlashcardFormField {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly description: string;
  readonly multiline: boolean;
  readonly required: boolean;
}

export interface FlashcardFormViewModel {
  readonly deckId: string;
  readonly deckTitle: string;
  readonly noteType: string;
  readonly fields: readonly FlashcardFormField[];
  readonly tags: readonly string[];
  readonly previewFront: string;
  readonly previewBack: string;
  readonly duplicateMatchCount: number;
}
