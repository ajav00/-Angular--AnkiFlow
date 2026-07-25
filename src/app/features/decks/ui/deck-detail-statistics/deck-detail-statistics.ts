import { Component, input } from '@angular/core';
import { DeckDetailStatistic } from '../../deck-details.models';

@Component({
  selector: 'af-deck-detail-statistics',
  templateUrl: './deck-detail-statistics.html',
  styleUrl: './deck-detail-statistics.scss',
})
export class DeckDetailStatistics {
  readonly statistics = input.required<readonly DeckDetailStatistic[]>();
}
