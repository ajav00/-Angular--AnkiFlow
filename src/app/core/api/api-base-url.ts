import { InjectionToken } from '@angular/core';

/**
 * Relative by design: `proxy.conf.json` forwards `/api` to the backend during `ng serve`,
 * and a production deploy is expected to reverse-proxy `/api` to the backend on the same
 * origin. Override this token if the API ever needs to live on a different origin.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
