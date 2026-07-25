import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DECK_LIBRARY_FIXTURE } from '../../data/deck-library.fixture';
import { DeckLibraryGrid } from '../../ui/deck-library-grid/deck-library-grid';
import { DeckLibraryToolbar } from '../../ui/deck-library-toolbar/deck-library-toolbar';

@Component({
  selector: 'af-decks-page',
  imports: [RouterLink, Button, Icon, DeckLibraryGrid, DeckLibraryToolbar],
  templateUrl: './decks-page.html',
  styleUrl: './decks-page.scss',
})
export class DecksPage {
  protected readonly library = DECK_LIBRARY_FIXTURE;
}
