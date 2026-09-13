import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import {
  CreateDeckRequest,
  CreateDeckResponse,
  EditDeckRequest,
  GetDeckResponse,
} from './decks.api.models';

@Injectable({ providedIn: 'root' })
export class DecksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list(): Observable<GetDeckResponse[]> {
    // pageSize must be explicit: the backend defaults to 0 (no query params) which returns
    // an empty page, so an unbounded-looking "list my decks" call needs a real page size.
    return this.http.get<GetDeckResponse[]>(`${this.baseUrl}/Decks`, {
      params: { pageNumber: 0, pageSize: 100 },
    });
  }

  get(id: number): Observable<GetDeckResponse> {
    return this.http.get<GetDeckResponse>(`${this.baseUrl}/Decks/${id}`);
  }

  create(request: CreateDeckRequest): Observable<CreateDeckResponse> {
    return this.http.post<CreateDeckResponse>(`${this.baseUrl}/Decks`, request);
  }

  update(request: EditDeckRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/Decks`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Decks/${id}`);
  }
}
