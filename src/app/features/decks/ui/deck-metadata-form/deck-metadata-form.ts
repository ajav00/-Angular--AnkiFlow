import { Component, input } from '@angular/core';
import { DeckFormViewModel } from '../../deck-form.models';

@Component({
  selector: 'af-deck-metadata-form',
  templateUrl: './deck-metadata-form.html',
  styleUrl: './deck-metadata-form.scss',
})
export class DeckMetadataForm {
  readonly deck = input.required<DeckFormViewModel>();
}
