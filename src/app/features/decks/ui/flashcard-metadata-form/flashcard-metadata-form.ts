import { Component, input } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { FlashcardFormViewModel } from '../../flashcard-form.models';

@Component({
  selector: 'af-flashcard-metadata-form',
  imports: [Icon],
  templateUrl: './flashcard-metadata-form.html',
  styleUrl: './flashcard-metadata-form.scss',
})
export class FlashcardMetadataForm {
  readonly card = input.required<FlashcardFormViewModel>();
}
