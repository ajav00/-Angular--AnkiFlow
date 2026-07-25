import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DeckDetailsViewModel } from '../../deck-details.models';

@Component({
  selector: 'af-deck-details-header',
  imports: [RouterLink, Icon],
  host: {
    '[style.--deck-color]': 'deck().color',
  },
  templateUrl: './deck-details-header.html',
  styleUrl: './deck-details-header.scss',
})
export class DeckDetailsHeader {
  readonly deck = input.required<DeckDetailsViewModel>();
}
