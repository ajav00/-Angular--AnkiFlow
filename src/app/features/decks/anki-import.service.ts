import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api/api-base-url';
import { ImportAnkiPackageOptions, ImportAnkiPackageResponse } from './anki-import.api.models';

@Injectable({ providedIn: 'root' })
export class AnkiImportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  upload(
    file: File,
    options: ImportAnkiPackageOptions,
  ): Observable<HttpEvent<ImportAnkiPackageResponse>> {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('TermLanguageCode', options.termLanguageCode);
    formData.append('DefinitionLanguageCode', options.definitionLanguageCode);

    return this.http.post<ImportAnkiPackageResponse>(`${this.baseUrl}/Decks/ImportAnki`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
