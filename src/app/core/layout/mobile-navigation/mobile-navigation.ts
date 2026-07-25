import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon, IconName } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'af-mobile-navigation',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './mobile-navigation.html',
  styleUrl: './mobile-navigation.scss',
})
export class MobileNavigation {
  protected readonly items: ReadonlyArray<{
    label: string;
    icon: IconName;
    route: string;
    disabled?: boolean;
  }> = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Decks', icon: 'decks', route: '/decks' },
    { label: 'Study', icon: 'study', route: '/study' },
    { label: 'Stats', icon: 'chart', route: '/statistics', disabled: true },
  ];
}
