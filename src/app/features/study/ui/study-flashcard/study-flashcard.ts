import { Component, input } from '@angular/core';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Icon } from '../../../../shared/ui/icon/icon';
import { StudyCard } from '../../study.models';

@Component({
  selector: 'af-study-flashcard',
  imports: [Badge, Icon],
  templateUrl: './study-flashcard.html',
  styleUrl: './study-flashcard.scss',
})
export class StudyFlashcard {
  readonly card = input.required<StudyCard>();
}
