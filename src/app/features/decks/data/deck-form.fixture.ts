import { DeckFormViewModel } from '../deck-form.models';

export const DECK_FORM_FIXTURE: DeckFormViewModel = {
  mode: 'edit',
  title: 'Everyday English',
  description: 'Useful vocabulary and expressions for daily conversations.',
  category: 'Language',
  termLanguage: 'English',
  definitionLanguage: 'Spanish',
  tags: ['conversation', 'english', 'daily-life'],
  noteTypeName: 'Basic language card',
  fields: [
    {
      id: 'front',
      name: 'Front',
      description: 'Question, word, or phrase shown first.',
      required: true,
    },
    {
      id: 'back',
      name: 'Back',
      description: 'Answer or translation revealed during study.',
      required: true,
    },
    {
      id: 'example',
      name: 'Example',
      description: 'Optional sentence that provides context.',
      required: false,
    },
    {
      id: 'hint',
      name: 'Hint',
      description: 'Optional clue available before revealing the answer.',
      required: false,
    },
  ],
  previewFront: 'Could you say that again?',
  previewBack: '¿Podrías repetirlo?',
};
