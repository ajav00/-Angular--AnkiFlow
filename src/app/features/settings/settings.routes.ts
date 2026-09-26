import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/translation-settings-page/translation-settings-page').then(
        (module) => module.TranslationSettingsPage,
      ),
  },
];
