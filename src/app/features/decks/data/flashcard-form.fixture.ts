import { FlashcardFormViewModel } from '../flashcard-form.models';

// Note types, tags, and duplicate detection aren't modeled on the backend yet, so this
// fixture backs the decorative parts of the flashcard editor (metadata panel and preview
// defaults); the front/back/example fields themselves are driven by a real reactive form.
export const FLASHCARD_FORM_FIXTURE: FlashcardFormViewModel = {
  deckTitle: 'Deck',
  noteType: 'Basic language card',
  tags: [],
  previewFront: 'Front of the card',
  previewBack: 'Back of the card',
  duplicateMatchCount: 0,
};
