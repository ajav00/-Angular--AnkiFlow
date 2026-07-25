import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { FLASHCARD_FORM_FIXTURE } from '../../data/flashcard-form.fixture';
import { FlashcardContentForm } from '../../ui/flashcard-content-form/flashcard-content-form';
import { FlashcardFormPreview } from '../../ui/flashcard-form-preview/flashcard-form-preview';
import { FlashcardMetadataForm } from '../../ui/flashcard-metadata-form/flashcard-metadata-form';

@Component({
  selector: 'af-flashcard-form-page',
  imports: [
    RouterLink,
    Button,
    Icon,
    FlashcardContentForm,
    FlashcardMetadataForm,
    FlashcardFormPreview,
  ],
  templateUrl: './flashcard-form-page.html',
  styleUrl: './flashcard-form-page.scss',
})
export class FlashcardFormPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly card = FLASHCARD_FORM_FIXTURE;
  protected readonly isCreateMode =
    this.route.snapshot.routeConfig?.path?.endsWith('/new') ?? false;
}
