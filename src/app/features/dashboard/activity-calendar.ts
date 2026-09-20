import { SessionHistoryEntry } from './dashboard.api.models';
import { StudyActivity } from './dashboard.models';

export const ACTIVITY_WINDOW_DAYS = 84;

export interface ActivityWindow {
  readonly days: number;
  readonly start: Date;
  readonly startDate: string;
  readonly endDate: string;
}

// The backend timestamps and groups PracticeSession rows by DateTime.UtcNow.Date, so the
// window here must be expressed in UTC days too — bucketing by the browser's local calendar
// day would silently drop/misplace a user's most recent session whenever their local date and
// the UTC date disagree (i.e. most of the day, for anyone not in UTC+0).
function toDateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** A rolling window of `days` UTC calendar days ending today. */
export function buildActivityWindow(days: number, today = new Date()): ActivityWindow {
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  return { days, start, startDate: toDateKey(start), endDate: toDateKey(end) };
}

function toIntensity(records: number): StudyActivity['intensity'] {
  if (records <= 0) return 0;
  if (records === 1) return 1;
  if (records === 2) return 2;
  if (records === 3) return 3;
  return 4;
}

/** Fills every day in the window with its session count, so days with no study show as 0. */
export function buildActivityCalendar(
  entries: readonly SessionHistoryEntry[],
  window: ActivityWindow,
): StudyActivity[] {
  const recordsByDate = new Map(entries.map((entry) => [entry.date.slice(0, 10), entry.records]));
  const calendar: StudyActivity[] = [];

  for (let i = 0; i < window.days; i++) {
    const date = new Date(window.start);
    date.setUTCDate(date.getUTCDate() + i);
    const dateKey = toDateKey(date);
    const records = recordsByDate.get(dateKey) ?? 0;

    calendar.push({ date: dateKey, reviewCount: records, intensity: toIntensity(records) });
  }

  return calendar;
}
