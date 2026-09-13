import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DeckLibraryItem, DeckLibraryViewModel } from '../../deck.models';
import { DecksService } from '../../decks.service';
import { DeckLibraryGrid } from '../../ui/deck-library-grid/deck-library-grid';
import { DeckLibraryToolbar } from '../../ui/deck-library-toolbar/deck-library-toolbar';

@Component({
  selector: 'af-decks-page',
  imports: [RouterLink, Button, Icon, DeckLibraryGrid, DeckLibraryToolbar],
  templateUrl: './decks-page.html',
  styleUrl: './decks-page.scss',
})
export class DecksPage {
  private readonly decksService = inject(DecksService);

  private readonly decks = toSignal(this.decksService.list(), { initialValue: [] });

  // Card counts, due counts, mastery and category are not modeled on the backend yet,
  // so they show as placeholders until Cards/CardSchedulingState stats are exposed here.
  protected readonly library = computed<DeckLibraryViewModel>(() => {
    const items: DeckLibraryItem[] = this.decks().map(
      (deck): DeckLibraryItem => ({
        id: String(deck.id),
        title: deck.title,
        description: deck.description ?? '',
        category: 'Language',
        termLanguage: deck.termLanguageCode,
        definitionLanguage: deck.definitionLanguageCode,
        cardCount: 0,
        dueCount: 0,
        masteryPercentage: 0,
        lastStudiedLabel: 'Not studied yet',
        color: deck.color ?? '#79f3ea',
        status: 'Active',
      }),
    );

    return {
      summary: {
        totalDecks: items.length,
        totalCards: 0,
        dueToday: 0,
      },
      decks: items,
    };
  });
}
