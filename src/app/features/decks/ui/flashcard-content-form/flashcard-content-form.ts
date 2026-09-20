import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'af-flashcard-content-form',
  imports: [ReactiveFormsModule],
  templateUrl: './flashcard-content-form.html',
  styleUrl: './flashcard-content-form.scss',
})
export class FlashcardContentForm {
  readonly form = input.required<FormGroup>();
}
