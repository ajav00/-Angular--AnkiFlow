import { Component } from '@angular/core';
import { DECK_DETAILS_FIXTURE } from '../../data/deck-details.fixture';
import { DeckDetailStatistics } from '../../ui/deck-detail-statistics/deck-detail-statistics';
import { DeckDetailsHeader } from '../../ui/deck-details-header/deck-details-header';
import { FlashcardList } from '../../ui/flashcard-list/flashcard-list';
import { FlashcardToolbar } from '../../ui/flashcard-toolbar/flashcard-toolbar';

@Component({
  selector: 'af-deck-details-page',
  imports: [DeckDetailsHeader, DeckDetailStatistics, FlashcardToolbar, FlashcardList],
  templateUrl: './deck-details-page.html',
  styleUrl: './deck-details-page.scss',
})
export class DeckDetailsPage {
  protected readonly deck = DECK_DETAILS_FIXTURE;
}
