import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecksService } from '../../../decks/decks.service';
import { DueCardResponse, SavePracticeSessionCard } from '../../study.api.models';
import {
  ReviewRating,
  STUDY_RATINGS,
  StudyCard,
  StudyRating,
  StudySessionViewModel,
} from '../../study.models';
import { StudyService } from '../../study.service';
import { AnswerRatingControls } from '../../ui/answer-rating-controls/answer-rating-controls';
import { StudyFlashcard } from '../../ui/study-flashcard/study-flashcard';
import { StudySessionHeader } from '../../ui/study-session-header/study-session-header';
import { StudySessionSummary } from '../../ui/study-session-summary/study-session-summary';

type SessionStatus = 'loading' | 'empty' | 'studying' | 'saving' | 'finished' | 'error';

@Component({
  selector: 'af-study-session-page',
  imports: [RouterLink, StudySessionHeader, StudyFlashcard, AnswerRatingControls, StudySessionSummary],
  templateUrl: './study-session-page.html',
  styleUrl: './study-session-page.scss',
})
export class StudySessionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studyService = inject(StudyService);
  private readonly decksService = inject(DecksService);

  protected readonly deckId = Number(this.route.snapshot.paramMap.get('deckId'));

  protected readonly status = signal<SessionStatus>('loading');
  protected readonly deckTitle = signal('Deck');

  // A card removed from the queue on Fail is pushed back to the end, so the queue only
  // ever shrinks on a non-Fail rating — that's what makes totalCards - queue().length a
  // safe "resolved" counter regardless of how many times a card gets retried.
  private readonly queue = signal<StudyCard[]>([]);
  private readonly attempts: SavePracticeSessionCard[] = [];
  private readonly failedCardIds = new Set<number>();

  protected readonly revealed = signal(false);
  protected readonly totalCards = signal(0);
  protected readonly correctCards = signal(0);

  protected readonly ratings = STUDY_RATINGS;

  protected readonly currentCard = computed<StudyCard | null>(() => this.queue()[0] ?? null);
  protected readonly resolvedCards = computed(() => this.totalCards() - this.queue().length);

  protected readonly session = computed<StudySessionViewModel | null>(() => {
    const card = this.currentCard();
    if (!card) return null;

    return {
      deck: { id: this.deckId, title: this.deckTitle() },
      card,
      currentCard: Math.min(this.resolvedCards() + 1, this.totalCards()),
      totalCards: this.totalCards(),
      reviewedCards: this.resolvedCards(),
      correctCards: this.correctCards(),
      estimatedMinutesRemaining: Math.max(1, Math.ceil(this.queue().length * 0.5)),
      ratings: this.ratings,
    };
  });

  constructor() {
    this.decksService.get(this.deckId).subscribe({
      next: (deck) => this.deckTitle.set(deck.title),
      error: () => {},
    });

    this.studyService.getDueCards(this.deckId).subscribe({
      next: (cards) => {
        if (cards.length === 0) {
          this.status.set('empty');
          return;
        }

        this.queue.set(cards.map((card) => this.toStudyCard(card)));
        this.totalCards.set(cards.length);
        this.status.set('studying');
      },
      error: () => this.status.set('error'),
    });
  }

  protected revealAnswer(): void {
    this.revealed.set(true);
  }

  protected rate(rating: StudyRating): void {
    const card = this.currentCard();
    if (!card || !this.revealed()) return;

    this.attempts.push({ cardId: card.id, rating: rating.value });

    const rest = this.queue().slice(1);

    if (rating.value === ReviewRating.Fail) {
      this.failedCardIds.add(card.id);
      this.queue.set([...rest, card]);
    } else {
      if (!this.failedCardIds.has(card.id)) {
        this.correctCards.update((count) => count + 1);
      }
      this.queue.set(rest);
    }

    this.revealed.set(false);

    if (this.queue().length === 0) {
      this.finishSession();
    }
  }

  protected exit(): void {
    this.router.navigate(['/decks', this.deckId]);
  }

  private finishSession(): void {
    this.status.set('saving');
    this.studyService.saveSession({ deckId: this.deckId, cards: this.attempts }).subscribe({
      next: () => this.status.set('finished'),
      error: () => this.status.set('error'),
    });
  }

  private toStudyCard(card: DueCardResponse): StudyCard {
    return { id: card.id, front: card.front, back: card.back, example: card.example ?? null };
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.status() !== 'studying') return;

    if (event.code === 'Space') {
      event.preventDefault();
      if (!this.revealed()) this.revealAnswer();
      return;
    }

    if (!this.revealed()) return;

    const rating = this.ratings.find((candidate) => candidate.shortcut === event.key);
    if (rating) this.rate(rating);
  }
}
