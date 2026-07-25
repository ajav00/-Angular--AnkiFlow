import { Component, input } from '@angular/core';

export type CardVariant = 'default' | 'primary' | 'success' | 'warning';

@Component({
  selector: 'af-card',
  host: {
    '[class]': '"card card--" + variant()',
  },
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly variant = input<CardVariant>('default');
}
