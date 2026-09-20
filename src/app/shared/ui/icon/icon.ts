import { Component, input } from '@angular/core';

export type IconName =
  | 'home'
  | 'decks'
  | 'study'
  | 'chart'
  | 'sparkles'
  | 'settings'
  | 'bell'
  | 'search'
  | 'plus'
  | 'upload'
  | 'flame'
  | 'clock'
  | 'book'
  | 'arrow-right'
  | 'check'
  | 'x';

@Component({
  selector: 'af-icon',
  host: {
    '[style.--icon-size]': 'size() + "px"',
    'aria-hidden': 'true',
  },
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
