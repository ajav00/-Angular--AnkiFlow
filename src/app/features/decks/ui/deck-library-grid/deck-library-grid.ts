import { Component, input } from '@angular/core';
import { DeckLibraryItem } from '../../deck.models';
import { DeckLibraryCard } from '../deck-library-card/deck-library-card';

@Component({
  selector: 'af-deck-library-grid',
  imports: [DeckLibraryCard],
  templateUrl: './deck-library-grid.html',
  styleUrl: './deck-library-grid.scss',
})
export class DeckLibraryGrid {
  readonly decks = input.required<readonly DeckLibraryItem[]>();
}
