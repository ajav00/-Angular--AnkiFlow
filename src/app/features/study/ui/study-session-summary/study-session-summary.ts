import { Component, input } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { StudySessionViewModel } from '../../study.models';

@Component({
  selector: 'af-study-session-summary',
  imports: [Icon],
  templateUrl: './study-session-summary.html',
  styleUrl: './study-session-summary.scss',
})
export class StudySessionSummary {
  readonly session = input.required<StudySessionViewModel>();
}
