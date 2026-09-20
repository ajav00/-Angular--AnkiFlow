import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import {
  CreateCardRequest,
  CreateCardResponse,
  EditCardRequest,
  GetCardResponse,
} from './cards.api.models';

@Injectable({ providedIn: 'root' })
export class CardsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  listByDeck(deckId: number): Observable<GetCardResponse[]> {
    // pageSize must be explicit: like Decks, the backend defaults to 0 (no query params)
    // which returns an empty page.
    return this.http.get<GetCardResponse[]>(`${this.baseUrl}/Cards/Deck/${deckId}`, {
      params: { pageNumber: 0, pageSize: 100 },
    });
  }

  get(id: number): Observable<GetCardResponse> {
    return this.http.get<GetCardResponse>(`${this.baseUrl}/Cards/${id}`);
  }

  create(request: CreateCardRequest): Observable<CreateCardResponse> {
    return this.http.post<CreateCardResponse>(`${this.baseUrl}/Cards`, request);
  }

  update(request: EditCardRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/Cards`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Cards/${id}`);
  }
}
