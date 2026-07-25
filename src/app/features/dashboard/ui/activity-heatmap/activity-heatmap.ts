import { Component, input } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { StudyActivity } from '../../dashboard.models';

@Component({
  selector: 'af-activity-heatmap',
  imports: [Card],
  templateUrl: './activity-heatmap.html',
  styleUrl: './activity-heatmap.scss',
})
export class ActivityHeatmap {
  readonly activity = input.required<readonly StudyActivity[]>();
  protected readonly levels = [0, 1, 2, 3, 4] as const;
}
