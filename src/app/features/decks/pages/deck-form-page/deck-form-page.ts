import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DECK_FORM_FIXTURE } from '../../data/deck-form.fixture';
import { DecksService } from '../../decks.service';
import { CardTemplatePreview } from '../../ui/card-template-preview/card-template-preview';
import { DeckMetadataForm } from '../../ui/deck-metadata-form/deck-metadata-form';
import { NoteTypeEditor } from '../../ui/note-type-editor/note-type-editor';

@Component({
  selector: 'af-deck-form-page',
  imports: [RouterLink, Button, Icon, DeckMetadataForm, NoteTypeEditor, CardTemplatePreview],
  templateUrl: './deck-form-page.html',
  styleUrl: './deck-form-page.scss',
})
export class DeckFormPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly decksService = inject(DecksService);
  private readonly fb = inject(FormBuilder);

  // Note type / tags / preview are display-only fixture data: the backend has no concept
  // of custom note types or per-card templates yet, so that part of the page stays static.
  protected readonly deck = DECK_FORM_FIXTURE;
  protected readonly isCreateMode = this.route.snapshot.routeConfig?.path === 'new';
  protected readonly saving = signal(false);
  protected readonly deleting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  private readonly deckId = Number(this.route.snapshot.paramMap.get('deckId'));

  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    termLanguageCode: ['', Validators.required],
    definitionLanguageCode: ['', Validators.required],
  });

  constructor() {
    if (!this.isCreateMode) {
      this.decksService.get(this.deckId).subscribe((deck) => {
        this.form.patchValue({
          title: deck.title,
          description: deck.description ?? '',
          termLanguageCode: deck.termLanguageCode,
          definitionLanguageCode: deck.definitionLanguageCode,
        });
      });
    }
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    const value = this.form.getRawValue();

    const request$: Observable<unknown> = this.isCreateMode
      ? this.decksService.create(value)
      : this.decksService.update({ id: this.deckId, ...value });

    request$.subscribe({
      next: () => this.router.navigateByUrl('/decks'),
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Could not save the deck. Please try again.');
      },
    });
  }

  protected deleteDeck(): void {
    if (this.isCreateMode) return;

    const title = this.form.getRawValue().title || 'this deck';
    if (!window.confirm(`Delete "${title}"? This also removes its cards and cannot be undone.`)) {
      return;
    }

    this.deleting.set(true);
    this.errorMessage.set(null);

    this.decksService.delete(this.deckId).subscribe({
      next: () => this.router.navigateByUrl('/decks'),
      error: () => {
        this.deleting.set(false);
        this.errorMessage.set('Could not delete the deck. Please try again.');
      },
    });
  }
}
