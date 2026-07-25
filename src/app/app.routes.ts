import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'study',
    loadChildren: () =>
      import('./features/study/study.routes').then((module) => module.STUDY_ROUTES),
  },
  {
    path: '',
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
