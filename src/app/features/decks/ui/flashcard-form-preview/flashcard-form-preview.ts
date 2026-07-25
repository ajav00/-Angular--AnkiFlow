import { Component, input } from '@angular/core';
import { Badge } from '../../../../shared/ui/badge/badge';
import { FlashcardFormViewModel } from '../../flashcard-form.models';

@Component({
  selector: 'af-flashcard-form-preview',
  imports: [Badge],
  templateUrl: './flashcard-form-preview.html',
  styleUrl: './flashcard-form-preview.scss',
})
export class FlashcardFormPreview {
  readonly card = input.required<FlashcardFormViewModel>();
}
