import { Component, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning';

@Component({
  selector: 'af-badge',
  host: {
    '[class]': '"badge badge--" + variant()',
  },
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  readonly variant = input<BadgeVariant>('neutral');
}
