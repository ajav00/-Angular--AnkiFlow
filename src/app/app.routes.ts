import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },
  {
    path: 'study',
    pathMatch: 'full',
    redirectTo: '/decks',
  },
  {
    path: 'study',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/study/study.routes').then((module) => module.STUDY_ROUTES),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/app-shell/app-shell').then((module) => module.AppShell),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((module) => module.DASHBOARD_ROUTES),
      },
      {
        path: 'decks',
        loadChildren: () =>
          import('./features/decks/decks.routes').then((module) => module.DECKS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
