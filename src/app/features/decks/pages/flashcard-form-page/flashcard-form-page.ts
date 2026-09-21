import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Button } from '../../../../shared/ui/button/button';
import { CardsService } from '../../cards.service';
import { FLASHCARD_FORM_FIXTURE } from '../../data/flashcard-form.fixture';
import { DecksService } from '../../decks.service';
import { FlashcardFormViewModel } from '../../flashcard-form.models';
import { FlashcardContentForm } from '../../ui/flashcard-content-form/flashcard-content-form';
import { FlashcardFormPreview } from '../../ui/flashcard-form-preview/flashcard-form-preview';
import { FlashcardMetadataForm } from '../../ui/flashcard-metadata-form/flashcard-metadata-form';

@Component({
  selector: 'af-flashcard-form-page',
  imports: [
    RouterLink,
    Button,
    FlashcardContentForm,
    FlashcardMetadataForm,
    FlashcardFormPreview,
  ],
  templateUrl: './flashcard-form-page.html',
  styleUrl: './flashcard-form-page.scss',
})
export class FlashcardFormPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cardsService = inject(CardsService);
  private readonly decksService = inject(DecksService);
  private readonly fb = inject(FormBuilder);

  protected readonly deckId = Number(this.route.snapshot.paramMap.get('deckId'));
  protected readonly isCreateMode =
    this.route.snapshot.routeConfig?.path?.endsWith('/new') ?? false;
  private readonly cardId = this.isCreateMode
    ? null
    : Number(this.route.snapshot.paramMap.get('cardId'));

  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly deckTitle = signal('Deck');
  private readonly previewSeed = signal<{ front: string; back: string } | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    front: ['', Validators.required],
    back: ['', Validators.required],
    example: [''],
  });

  // Note type, tags and duplicate detection aren't modeled on the backend yet, so that
  // part of the view stays fixture-driven; only the deck title and (in edit mode) the
  // preview's starting front/back reflect real data.
  protected readonly card = computed<FlashcardFormViewModel>(() => {
    const seed = this.previewSeed();
    return {
      ...FLASHCARD_FORM_FIXTURE,
      deckTitle: this.deckTitle(),
      previewFront: seed?.front ?? FLASHCARD_FORM_FIXTURE.previewFront,
      previewBack: seed?.back ?? FLASHCARD_FORM_FIXTURE.previewBack,
    };
  });

  constructor() {
    this.decksService.get(this.deckId).subscribe({
      next: (deck) => this.deckTitle.set(deck.title),
      error: () => {},
    });

    if (!this.isCreateMode && this.cardId !== null) {
      this.cardsService.get(this.cardId).subscribe({
        next: (card) => {
          this.form.patchValue({
            front: card.front,
            back: card.back,
            example: card.example ?? '',
          });
          this.previewSeed.set({ front: card.front, back: card.back });
        },
        error: () => this.errorMessage.set('Could not load this flashcard.'),
      });
    }
  }

  protected save(resetAfter = false): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    const value = this.form.getRawValue();
    const example = value.example.trim() || undefined;

    const request$: Observable<unknown> =
      this.isCreateMode || this.cardId === null
        ? this.cardsService.create({ front: value.front, back: value.back, example, deckId: this.deckId })
        : this.cardsService.update({
            id: this.cardId,
            front: value.front,
            back: value.back,
            example,
            deckId: this.deckId,
          });

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        if (resetAfter) {
          this.form.reset({ front: '', back: '', example: '' });
        } else {
          this.router.navigate(['/decks', this.deckId]);
        }
      },
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Could not save the flashcard. Please try again.');
      },
    });
  }
}
