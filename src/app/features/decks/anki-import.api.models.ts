export interface ImportedDeckSummary {
  deckId: number;
  title: string;
  cardCount: number;
}

export interface ImportAnkiPackageResponse {
  decks: ImportedDeckSummary[];
  totalCardsImported: number;
  totalCardsSkipped: number;
  skippedAttachments: number;
}

export interface ImportAnkiPackageOptions {
  termLanguageCode: string;
  definitionLanguageCode: string;
}
