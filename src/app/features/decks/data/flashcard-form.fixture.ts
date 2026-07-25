import { FlashcardFormViewModel } from '../flashcard-form.models';

export const FLASHCARD_FORM_FIXTURE: FlashcardFormViewModel = {
  deckId: 'everyday-english',
  deckTitle: 'Everyday English',
  noteType: 'Basic language card',
  fields: [
    {
      id: 'front',
      label: 'Front',
      value: 'Could you say that again?',
      description: 'Question, word, or phrase shown first.',
      multiline: true,
      required: true,
    },
    {
      id: 'back',
      label: 'Back',
      value: '¿Podrías repetirlo?',
      description: 'Answer or translation revealed during study.',
      multiline: true,
      required: true,
    },
    {
      id: 'example',
      label: 'Example',
      value: 'Sorry, could you say that again a little more slowly?',
      description: 'Optional context shown after revealing the answer.',
      multiline: true,
      required: false,
    },
    {
      id: 'hint',
      label: 'Hint',
      value: 'Use this when you did not hear or understand someone.',
      description: 'Optional clue available before revealing the answer.',
      multiline: false,
      required: false,
    },
  ],
  tags: ['conversation', 'clarification'],
  previewFront: 'Could you say that again?',
  previewBack: '¿Podrías repetirlo?',
  duplicateMatchCount: 1,
};
