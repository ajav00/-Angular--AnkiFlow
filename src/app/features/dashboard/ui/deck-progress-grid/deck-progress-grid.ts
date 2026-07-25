import { Component, input } from '@angular/core';
import { DeckProgress } from '../../dashboard.models';
import { DeckProgressCard } from '../deck-progress-card/deck-progress-card';

@Component({
  selector: 'af-deck-progress-grid',
  imports: [DeckProgressCard],
  templateUrl: './deck-progress-grid.html',
  styleUrl: './deck-progress-grid.scss',
})
export class DeckProgressGrid {
  readonly decks = input.required<readonly DeckProgress[]>();
}
