import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { DECK_FORM_FIXTURE } from '../../data/deck-form.fixture';
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

  protected readonly deck = DECK_FORM_FIXTURE;
  protected readonly isCreateMode = this.route.snapshot.routeConfig?.path === 'new';
}
