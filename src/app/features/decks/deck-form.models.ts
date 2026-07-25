export interface DeckFormField {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly required: boolean;
}

export interface DeckFormViewModel {
  readonly mode: 'create' | 'edit';
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly termLanguage: string;
  readonly definitionLanguage: string;
  readonly tags: readonly string[];
  readonly noteTypeName: string;
  readonly fields: readonly DeckFormField[];
  readonly previewFront: string;
  readonly previewBack: string;
}
