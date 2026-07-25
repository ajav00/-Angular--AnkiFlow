import { Component, input } from '@angular/core';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Card } from '../../../../shared/ui/card/card';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ProgressBar } from '../../../../shared/ui/progress-bar/progress-bar';
import { DeckProgress } from '../../dashboard.models';

@Component({
  selector: 'af-deck-progress-card',
  imports: [Badge, Card, Icon, ProgressBar],
  host: {
    '[style.--deck-color]': 'deck().color',
  },
  templateUrl: './deck-progress-card.html',
  styleUrl: './deck-progress-card.scss',
})
export class DeckProgressCard {
  readonly deck = input.required<DeckProgress>();
}
