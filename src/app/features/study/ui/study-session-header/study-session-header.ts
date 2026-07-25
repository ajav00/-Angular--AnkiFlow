import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ProgressBar } from '../../../../shared/ui/progress-bar/progress-bar';
import { StudySessionViewModel } from '../../study.models';

@Component({
  selector: 'af-study-session-header',
  imports: [RouterLink, Icon, ProgressBar],
  templateUrl: './study-session-header.html',
  styleUrl: './study-session-header.scss',
})
export class StudySessionHeader {
  readonly session = input.required<StudySessionViewModel>();

  protected readonly progressPercentage = computed(() =>
    Math.round((this.session().reviewedCards / this.session().totalCards) * 100),
  );
}
