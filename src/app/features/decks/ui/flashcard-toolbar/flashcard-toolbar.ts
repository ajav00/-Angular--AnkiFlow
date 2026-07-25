import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'af-flashcard-toolbar',
  imports: [RouterLink, Icon],
  templateUrl: './flashcard-toolbar.html',
  styleUrl: './flashcard-toolbar.scss',
})
export class FlashcardToolbar {
  readonly deckId = input.required<string>();
}
