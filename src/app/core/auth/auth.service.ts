import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api/api-base-url';
import { AuthResponse, LoginRequest, RegistrationRequest } from './auth.models';

const STORAGE_KEY = 'ankiflow.auth';

interface StoredSession {
  readonly id: number;
  readonly userName: string;
  readonly name: string;
  readonly lastName: string;
  readonly jwt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  private readonly session = signal<StoredSession | null>(this.readStoredSession());

  readonly currentUser = computed(() => this.session());
  readonly isAuthenticated = computed(() => this.session() !== null);
  readonly token = computed(() => this.session()?.jwt ?? null);

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/Auth/Login`, request)
      .pipe(tap((response) => this.storeSession(response)));
  }

  register(request: RegistrationRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/Auth/Register`, request)
      .pipe(tap((response) => this.storeSession(response)));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.session.set(null);
  }

  private storeSession(response: AuthResponse): void {
    const stored: StoredSession = {
      id: response.id,
      userName: response.userName,
      name: response.name,
      lastName: response.lastName,
      jwt: response.jwt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    this.session.set(stored);
  }

  private readStoredSession(): StoredSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StoredSession;
    } catch {
      return null;
    }
  }
}
