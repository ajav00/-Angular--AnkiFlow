import { Routes } from '@angular/router';

export const DECKS_ROUTES: Routes = [
  {
    path: ':deckId/cards/new',
    loadComponent: () =>
      import('./pages/flashcard-form-page/flashcard-form-page').then(
        (module) => module.FlashcardFormPage,
      ),
  },
  {
    path: ':deckId/cards/:cardId/edit',
    loadComponent: () =>
      import('./pages/flashcard-form-page/flashcard-form-page').then(
        (module) => module.FlashcardFormPage,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/deck-form-page/deck-form-page').then((module) => module.DeckFormPage),
  },
  {
    path: ':deckId/edit',
    loadComponent: () =>
      import('./pages/deck-form-page/deck-form-page').then((module) => module.DeckFormPage),
  },
  {
    path: ':deckId',
    loadComponent: () =>
      import('./pages/deck-details-page/deck-details-page').then(
        (module) => module.DeckDetailsPage,
      ),
  },
  {
    path: '',
    loadComponent: () => import('./pages/decks-page/decks-page').then((module) => module.DecksPage),
  },
];
