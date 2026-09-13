import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeckFormViewModel } from '../../deck-form.models';

@Component({
  selector: 'af-deck-metadata-form',
  imports: [ReactiveFormsModule],
  templateUrl: './deck-metadata-form.html',
  styleUrl: './deck-metadata-form.scss',
})
export class DeckMetadataForm {
  readonly deck = input.required<DeckFormViewModel>();
  readonly form = input.required<FormGroup>();
}
