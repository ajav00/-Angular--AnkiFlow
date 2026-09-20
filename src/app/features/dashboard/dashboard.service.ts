import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import { SessionHistoryEntry } from './dashboard.api.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getSessionHistory(startDate: string, endDate: string): Observable<SessionHistoryEntry[]> {
    return this.http.get<SessionHistoryEntry[]>(
      `${this.baseUrl}/PracticeSession/StartDate/${startDate}/EndDate/${endDate}`,
    );
  }
}
