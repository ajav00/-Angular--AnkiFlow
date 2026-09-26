import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import {
  CreateTranslationProfileRequest,
  TranslationProfile,
  TranslationProfileWriteRequest,
} from './translation-profile.models';

@Injectable({ providedIn: 'root' })
export class TranslationProfilesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list(): Observable<TranslationProfile[]> {
    return this.http.get<TranslationProfile[]>(`${this.baseUrl}/TranslationProfiles`);
  }

  create(request: CreateTranslationProfileRequest): Observable<TranslationProfile> {
    return this.http.post<TranslationProfile>(`${this.baseUrl}/TranslationProfiles`, request);
  }

  update(id: number, request: TranslationProfileWriteRequest): Observable<TranslationProfile> {
    return this.http.put<TranslationProfile>(`${this.baseUrl}/TranslationProfiles/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/TranslationProfiles/${id}`);
  }
}
