import { Component, computed, input } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { StudyActivity } from '../../dashboard.models';

const RANGE_LABEL_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
};

/** Parses a "yyyy-MM-dd" key (a UTC day, see activity-calendar.ts) back into a Date for display. */
function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

@Component({
  selector: 'af-activity-heatmap',
  imports: [Card],
  templateUrl: './activity-heatmap.html',
  styleUrl: './activity-heatmap.scss',
})
export class ActivityHeatmap {
  readonly activity = input.required<readonly StudyActivity[]>();
  protected readonly levels = [0, 1, 2, 3, 4] as const;

  protected readonly daysStudied = computed(
    () => this.activity().filter((day) => day.reviewCount > 0).length,
  );

  protected readonly rangeLabel = computed(() => {
    const days = this.activity();
    if (days.length === 0) return '';

    const first = parseDateKey(days[0].date);
    const last = parseDateKey(days[days.length - 1].date);
    const format = (date: Date) => date.toLocaleDateString(undefined, RANGE_LABEL_FORMAT);
    return `${format(first)} – ${format(last)}`;
  });
}
