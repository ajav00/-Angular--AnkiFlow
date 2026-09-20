export interface FlashcardFormViewModel {
  readonly deckTitle: string;
  readonly noteType: string;
  readonly tags: readonly string[];
  readonly previewFront: string;
  readonly previewBack: string;
  readonly duplicateMatchCount: number;
}
