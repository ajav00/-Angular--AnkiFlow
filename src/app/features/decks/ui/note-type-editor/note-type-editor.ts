import { Component, input } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DeckFormViewModel } from '../../deck-form.models';

@Component({
  selector: 'af-note-type-editor',
  imports: [Icon],
  templateUrl: './note-type-editor.html',
  styleUrl: './note-type-editor.scss',
})
export class NoteTypeEditor {
  readonly deck = input.required<DeckFormViewModel>();
}
