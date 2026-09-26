import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import { TranslateTextRequest, TranslationOutput } from './translation.api.models';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  translate(request: TranslateTextRequest): Observable<TranslationOutput> {
    return this.http.post<TranslationOutput>(`${this.baseUrl}/Translation`, request);
  }
}
