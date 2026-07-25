import { Component, input } from '@angular/core';
import { Badge } from '../../../../shared/ui/badge/badge';
import { DeckFormViewModel } from '../../deck-form.models';

@Component({
  selector: 'af-card-template-preview',
  imports: [Badge],
  templateUrl: './card-template-preview.html',
  styleUrl: './card-template-preview.scss',
})
export class CardTemplatePreview {
  readonly deck = input.required<DeckFormViewModel>();
}
