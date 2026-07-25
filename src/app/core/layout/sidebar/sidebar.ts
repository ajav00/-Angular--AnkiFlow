import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon, IconName } from '../../../shared/ui/icon/icon';

interface NavigationItem {
  readonly label: string;
  readonly icon: IconName;
  readonly route: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'af-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly primaryNavigation: readonly NavigationItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/' },
    { label: 'My decks', icon: 'decks', route: '/decks' },
    { label: 'Study', icon: 'study', route: '/study' },
    { label: 'Statistics', icon: 'chart', route: '/statistics', disabled: true },
    { label: 'AI guide', icon: 'sparkles', route: '/ai-guide', disabled: true },
  ];

  protected readonly secondaryNavigation: readonly NavigationItem[] = [
    { label: 'Settings', icon: 'settings', route: '/settings', disabled: true },
  ];
}
