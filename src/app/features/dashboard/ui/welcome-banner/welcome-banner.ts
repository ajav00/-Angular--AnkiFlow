import { Component, input } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DashboardUser } from '../../dashboard.models';

@Component({
  selector: 'af-welcome-banner',
  imports: [Button, Icon],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.scss',
})
export class WelcomeBanner {
  readonly user = input.required<DashboardUser>();
  readonly dueCards = input.required<number>();
}
