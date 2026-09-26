import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../../translation.service';

type CardSide = 'front' | 'back';

@Component({
  selector: 'af-flashcard-content-form',
  imports: [ReactiveFormsModule],
  templateUrl: './flashcard-content-form.html',
  styleUrl: './flashcard-content-form.scss',
})
export class FlashcardContentForm {
  private readonly translationService = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = input.required<FormGroup>();
  readonly termLanguageCode = input('');
  readonly definitionLanguageCode = input('');

  protected readonly translating = signal<CardSide | null>(null);
  protected readonly frontError = signal<string | null>(null);
  protected readonly backError = signal<string | null>(null);

  protected canTranslate(side: CardSide): boolean {
    if (this.translating() !== null) return false;
    if (!this.termLanguageCode().trim() || !this.definitionLanguageCode().trim()) return false;
    return this.fieldText(side).length > 0;
  }

  protected translateFrom(side: CardSide, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.canTranslate(side)) return;

    const term = this.termLanguageCode().trim();
    const definition = this.definitionLanguageCode().trim();
    const target: CardSide = side === 'front' ? 'back' : 'front';
    this.errorFor(side).set(null);
    this.translating.set(side);

    this.translationService
      .translate({
        text: this.fieldText(side),
        languageSourceCode: side === 'front' ? term : definition,
        languageTargetCode: side === 'front' ? definition : term,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.form().patchValue({ [target]: result.translatedText });
          this.translating.set(null);
        },
        error: (error: unknown) => {
          this.errorFor(side).set(readApiError(error, 'Could not translate this text.'));
          this.translating.set(null);
        },
      });
  }

  private fieldText(side: CardSide): string {
    return String(this.form().get(side)?.value ?? '').trim();
  }

  private errorFor(side: CardSide) {
    return side === 'front' ? this.frontError : this.backError;
  }
}

function readApiError(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse && typeof error.error === 'string') {
    const message = error.error.trim();
    if (message) return message;
  }

  return fallback;
}
