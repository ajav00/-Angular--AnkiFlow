import { Component, input } from '@angular/core';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Button } from '../../../../shared/ui/button/button';
import { Card } from '../../../../shared/ui/card/card';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ReviewSummary as ReviewSummaryModel } from '../../dashboard.models';

@Component({
  selector: 'af-review-summary',
  imports: [Badge, Button, Card, Icon],
  templateUrl: './review-summary.html',
  styleUrl: './review-summary.scss',
})
export class ReviewSummary {
  readonly summary = input.required<ReviewSummaryModel>();

  protected totalCards(): number {
    const summary = this.summary();
    return summary.newCards + summary.learningCards + summary.reviewCards;
  }
}
