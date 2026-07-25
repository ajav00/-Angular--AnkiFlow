import { Component, input } from '@angular/core';

@Component({
  selector: 'af-icon-button',
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton {
  readonly label = input.required<string>();
}
