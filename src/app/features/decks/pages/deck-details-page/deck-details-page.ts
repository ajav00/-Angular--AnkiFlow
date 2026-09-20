import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GetCardResponse } from '../../cards.api.models';
import { CardsService } from '../../cards.service';
import { DeckDetailStatistic, DeckDetailsViewModel, FlashcardListItem, FlashcardState } from '../../deck-details.models';
import { DecksService } from '../../decks.service';
import { DeckDetailStatistics } from '../../ui/deck-detail-statistics/deck-detail-statistics';
import { DeckDetailsHeader } from '../../ui/deck-details-header/deck-details-header';
import { FlashcardList } from '../../ui/flashcard-list/flashcard-list';
import { FlashcardToolbar } from '../../ui/flashcard-toolbar/flashcard-toolbar';

// Maps CardSchedulingState.Status (Lexilearn.Domain.Enums.SchedulingStatus) to the badge
// states this page knows about. "Learnt" (3) reads as a stable Review card here since the
// UI doesn't have its own tier for it.
const STATUS_LABELS: Record<number, FlashcardState> = {
  0: 'New',
  1: 'Learning',
  2: 'Review',
  3: 'Review',
  4: 'Suspended',
};

@Component({
  selector: 'af-deck-details-page',
  imports: [DeckDetailsHeader, DeckDetailStatistics, FlashcardToolbar, FlashcardList],
  templateUrl: './deck-details-page.html',
  styleUrl: './deck-details-page.scss',
})
export class DeckDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly decksService = inject(DecksService);
  private readonly cardsService = inject(CardsService);

  private readonly deckId = Number(this.route.snapshot.paramMap.get('deckId'));

  private readonly deckResponse = toSignal(this.decksService.get(this.deckId), {
    initialValue: null,
  });
  private readonly cards = toSignal(this.cardsService.listByDeck(this.deckId), {
    initialValue: [] as GetCardResponse[],
  });

  // Due count and mastery trend are not modeled on the backend beyond the per-card
  // scheduling status, so mastery is derived from that status and due-today stays a
  // placeholder until Cards/Deck/{id}/Due is wired in here too.
  protected readonly deck = computed<DeckDetailsViewModel>(() => {
    const deck = this.deckResponse();
    const cards = this.cards();
    const reviewedCount = cards.filter((card) => card.lastStatus !== 0).length;
    const masteryPercentage = cards.length === 0 ? 0 : Math.round((reviewedCount / cards.length) * 100);

    const statistics: DeckDetailStatistic[] = [
      {
        label: 'Total cards',
        value: String(cards.length),
        detail: cards.length === 1 ? '1 card in this deck' : `${cards.length} cards in this deck`,
        tone: 'aqua',
      },
      {
        label: 'Due today',
        value: '—',
        detail: 'Not shown here yet',
        tone: 'pink',
      },
      {
        label: 'Mastery',
        value: `${masteryPercentage}%`,
        detail: 'Based on card status',
        tone: 'yellow',
      },
    ];

    return {
      id: String(this.deckId),
      title: deck?.title ?? 'Deck',
      description: deck?.description ?? '',
      category: 'Language',
      termLanguage: deck?.termLanguageCode ?? '',
      definitionLanguage: deck?.definitionLanguageCode ?? '',
      color: deck?.color ?? '#79f3ea',
      statistics,
      cards: cards.map((card) => this.toFlashcardListItem(card)),
    };
  });

  private toFlashcardListItem(card: GetCardResponse): FlashcardListItem {
    const state = STATUS_LABELS[card.lastStatus] ?? 'New';

    return {
      id: String(card.id),
      front: card.front,
      back: card.back,
      // Tags aren't modeled on the Card domain entity yet.
      tags: [],
      state,
      intervalLabel: state === 'New' ? 'Not started' : state === 'Suspended' ? 'Paused' : '—',
      dueLabel: state === 'New' ? 'New' : state === 'Suspended' ? 'Suspended' : '—',
    };
  }
}
