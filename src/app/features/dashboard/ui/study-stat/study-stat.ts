import { Component, input } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { StudyStatistic } from '../../dashboard.models';

@Component({
  selector: 'af-study-stat',
  imports: [Card],
  host: {
    '[class]': '"tone--" + statistic().tone',
  },
  templateUrl: './study-stat.html',
  styleUrl: './study-stat.scss',
})
export class StudyStat {
  readonly statistic = input.required<StudyStatistic>();
}
