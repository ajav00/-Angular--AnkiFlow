import { Component, output } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { Icon, IconName } from '../../../../shared/ui/icon/icon';

export type QuickActionId = 'create-deck' | 'import-anki' | 'ask-guide';

@Component({
  selector: 'af-quick-actions',
  imports: [Card, Icon],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
})
export class QuickActions {
  readonly actionSelected = output<QuickActionId>();

  protected readonly actions: ReadonlyArray<{
    id: QuickActionId;
    label: string;
    description: string;
    icon: IconName;
    tone: 'primary' | 'success' | 'warning';
  }> = [
    {
      id: 'create-deck',
      label: 'Create a new deck',
      description: 'Start a fresh learning collection',
      icon: 'plus',
      tone: 'primary',
    },
    {
      id: 'import-anki',
      label: 'Import from Anki',
      description: 'Bring an existing deck into your flow',
      icon: 'upload',
      tone: 'success',
    },
    {
      id: 'ask-guide',
      label: 'Ask the AI guide',
      description: 'Get help planning your next study session',
      icon: 'sparkles',
      tone: 'warning',
    },
  ];
}
