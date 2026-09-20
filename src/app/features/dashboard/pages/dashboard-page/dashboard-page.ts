import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DASHBOARD_FIXTURE } from '../../data/dashboard.fixture';
import { ActivityHeatmap } from '../../ui/activity-heatmap/activity-heatmap';
import { DeckProgressGrid } from '../../ui/deck-progress-grid/deck-progress-grid';
import { QuickActionId, QuickActions } from '../../ui/quick-actions/quick-actions';
import { ReviewSummary } from '../../ui/review-summary/review-summary';
import { StudyStat } from '../../ui/study-stat/study-stat';
import { WelcomeBanner } from '../../ui/welcome-banner/welcome-banner';

@Component({
  selector: 'af-dashboard-page',
  imports: [
    ActivityHeatmap,
    Button,
    DeckProgressGrid,
    Icon,
    QuickActions,
    ReviewSummary,
    StudyStat,
    WelcomeBanner,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private readonly router = inject(Router);

  protected readonly dashboard = DASHBOARD_FIXTURE;

  protected onQuickAction(action: QuickActionId): void {
    switch (action) {
      case 'create-deck':
        this.router.navigateByUrl('/decks/new');
        break;
      case 'import-anki':
        this.router.navigateByUrl('/decks/import');
        break;
      case 'ask-guide':
        break;
    }
  }
}
