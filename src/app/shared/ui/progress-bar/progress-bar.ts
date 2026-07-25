import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'af-progress-bar',
  host: {
    '[style.--progress-value]': 'normalizedValue() + "%"',
  },
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly label = input('Progress');

  protected readonly normalizedValue = computed(() => Math.min(100, Math.max(0, this.value())));
}
