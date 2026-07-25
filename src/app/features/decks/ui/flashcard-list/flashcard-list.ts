import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, BadgeVariant } from '../../../../shared/ui/badge/badge';
import { Icon } from '../../../../shared/ui/icon/icon';
import { FlashcardListItem, FlashcardState } from '../../deck-details.models';

@Component({
  selector: 'af-flashcard-list',
  imports: [RouterLink, Badge, Icon],
  templateUrl: './flashcard-list.html',
  styleUrl: './flashcard-list.scss',
})
export class FlashcardList {
  readonly cards = input.required<readonly FlashcardListItem[]>();
  readonly deckId = input.required<string>();

  protected badgeVariant(state: FlashcardState): BadgeVariant {
    switch (state) {
      case 'New':
        return 'success';
      case 'Learning':
        return 'warning';
      case 'Review':
        return 'info';
      default:
        return 'neutral';
    }
  }
}
