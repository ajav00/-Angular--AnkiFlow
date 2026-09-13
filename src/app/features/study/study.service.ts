import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import { DueCardResponse, SavePracticeSessionRequest } from './study.api.models';

@Injectable({ providedIn: 'root' })
export class StudyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getDueCards(deckId: number): Observable<DueCardResponse[]> {
    return this.http.get<DueCardResponse[]>(`${this.baseUrl}/Cards/Deck/${deckId}/Due`);
  }

  saveSession(request: SavePracticeSessionRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/PracticeSession`, request);
  }
}
