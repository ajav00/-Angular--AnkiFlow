import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'af-avatar',
  host: {
    '[style.--avatar-size]': 'size() + "px"',
  },
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input(44);

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join(''),
  );
}
