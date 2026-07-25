import { Component, input } from '@angular/core';
import { FlashcardFormViewModel } from '../../flashcard-form.models';

@Component({
  selector: 'af-flashcard-content-form',
  templateUrl: './flashcard-content-form.html',
  styleUrl: './flashcard-content-form.scss',
})
export class FlashcardContentForm {
  readonly card = input.required<FlashcardFormViewModel>();
}
