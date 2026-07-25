import { Routes } from '@angular/router';

export const STUDY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/study-session-page/study-session-page').then(
        (module) => module.StudySessionPage,
      ),
  },
];
