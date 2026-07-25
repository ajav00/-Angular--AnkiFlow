import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, BadgeVariant } from '../../../../shared/ui/badge/badge';
import { Card } from '../../../../shared/ui/card/card';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ProgressBar } from '../../../../shared/ui/progress-bar/progress-bar';
import { DeckLibraryItem } from '../../deck.models';

@Component({
  selector: 'af-deck-library-card',
  imports: [RouterLink, Badge, Card, Icon, ProgressBar],
  host: {
    '[style.--deck-color]': 'deck().color',
  },
  templateUrl: './deck-library-card.html',
  styleUrl: './deck-library-card.scss',
})
export class DeckLibraryCard {
  readonly deck = input.required<DeckLibraryItem>();

  protected badgeVariant(): BadgeVariant {
    switch (this.deck().status) {
      case 'New':
        return 'success';
      case 'Paused':
        return 'neutral';
      default:
        return 'info';
    }
  }
}
