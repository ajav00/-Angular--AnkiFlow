import { Component } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { Icon, IconName } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'af-quick-actions',
  imports: [Card, Icon],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
})
export class QuickActions {
  protected readonly actions: ReadonlyArray<{
    label: string;
    description: string;
    icon: IconName;
    tone: 'primary' | 'success' | 'warning';
  }> = [
    {
      label: 'Create a new deck',
      description: 'Start a fresh learning collection',
      icon: 'plus',
      tone: 'primary',
    },
    {
      label: 'Import from Anki',
      description: 'Bring an existing deck into your flow',
      icon: 'upload',
      tone: 'success',
    },
    {
      label: 'Ask the AI guide',
      description: 'Get help planning your next study session',
      icon: 'sparkles',
      tone: 'warning',
    },
  ];
}
