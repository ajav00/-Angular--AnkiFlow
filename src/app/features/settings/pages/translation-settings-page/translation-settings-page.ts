import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../../../shared/ui/button/button';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Icon } from '../../../../shared/ui/icon/icon';
import {
  HTTP_METHODS,
  RequestEntryGroup,
  absoluteHttpUrl,
  allowedHttpMethod,
  createRequestEntryGroup,
  trimmedLength,
  uniqueEntryKeys,
} from '../../translation-profile.form';
import {
  RequestEntry,
  TranslationProfile,
  TranslationProfileKind,
  TranslationProfileWriteRequest,
} from '../../translation-profile.models';
import { TranslationProfilesService } from '../../translation-profiles.service';
import { RequestEntriesEditor } from '../../ui/request-entries-editor/request-entries-editor';

interface EditorState {
  mode: 'create' | 'edit';
  id: number | null;
}

@Component({
  selector: 'af-translation-settings-page',
  imports: [ReactiveFormsModule, Button, Badge, Icon, RequestEntriesEditor],
  templateUrl: './translation-settings-page.html',
  styleUrl: './translation-settings-page.scss',
})
export class TranslationSettingsPage {
  private readonly profilesService = inject(TranslationProfilesService);
  private readonly fb = inject(FormBuilder);
  private suppressKindChange = false;

  protected readonly httpMethods = HTTP_METHODS;
  protected readonly headerHint =
    'Sent with every request. Values can use {{text}}, {{source}}, and {{target}}. Keys are case-insensitive.';
  protected readonly bodyHint =
    'JSON fields sent as the request body. Values can use {{text}}, {{source}}, and {{target}}.';
  protected readonly customUrlHint =
    'Absolute http or https URL. You can include {{text}}, {{source}}, and {{target}}.';
  protected readonly libreUrlHint = 'Absolute http or https URL of the LibreTranslate server.';

  protected readonly profiles = signal<TranslationProfile[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly deleting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly editor = signal<EditorState | null>(null);
  protected readonly kind = signal<TranslationProfileKind>('Custom');

  protected readonly libreTranslateExists = computed(() =>
    this.profiles().some((profile) => profile.kind === 'LibreTranslate'),
  );

  protected readonly form = this.fb.nonNullable.group({
    kind: this.fb.nonNullable.control<TranslationProfileKind>('Custom'),
    name: ['', trimmedLength(120)],
    url: ['', [Validators.required, absoluteHttpUrl(true)]],
    httpMethod: ['POST', allowedHttpMethod],
    responsePath: ['', trimmedLength(300)],
    isDefault: [false],
    headers: this.fb.array<RequestEntryGroup>([], uniqueEntryKeys(true)),
    body: this.fb.array<RequestEntryGroup>([], uniqueEntryKeys(false)),
  });

  constructor() {
    this.form.controls.kind.valueChanges.pipe(takeUntilDestroyed()).subscribe((kind) => {
      if (this.suppressKindChange) return;
      this.onKindSelected(kind);
    });
    this.reload();
  }

  protected reload(): void {
    this.fetchProfiles();
  }

  protected beginCreate(kind: TranslationProfileKind): void {
    if (kind === 'LibreTranslate' && this.libreTranslateExists()) return;

    this.errorMessage.set(null);
    this.editor.set({ mode: 'create', id: null });
    this.resetForm(
      {
        kind,
        name: kind === 'LibreTranslate' ? 'LibreTranslate' : '',
        url: '',
        httpMethod: 'POST',
        responsePath: '',
        isDefault: false,
      },
      [],
      [],
      false,
    );
  }

  protected beginEdit(profile: TranslationProfile): void {
    this.errorMessage.set(null);
    this.editor.set({ mode: 'edit', id: profile.id });
    this.resetForm(
      {
        kind: profile.kind,
        name: profile.name,
        url: profile.url,
        httpMethod: profile.httpMethod || 'POST',
        responsePath: profile.responsePath ?? '',
        isDefault: profile.isDefault,
      },
      profile.headers ?? [],
      profile.body ?? [],
      true,
    );
  }

  protected cancel(): void {
    this.errorMessage.set(null);
    this.editor.set(null);
  }

  protected save(): void {
    if (this.libreCreateBlocked()) {
      this.errorMessage.set('A LibreTranslate profile already exists.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const editor = this.editor();
    if (!editor) return;

    this.saving.set(true);
    this.errorMessage.set(null);
    const request = this.toWriteRequest();
    const request$ =
      editor.mode === 'create'
        ? this.profilesService.create({ ...request, kind: this.kind() })
        : this.profilesService.update(editor.id!, request);

    request$.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.fetchProfiles((profiles) => {
          const current = profiles.find((profile) => profile.id === saved.id) ?? saved;
          this.beginEdit(current);
        });
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.errorMessage.set(readApiError(error, 'Could not save this translation profile.'));
      },
    });
  }

  protected deleteProfile(): void {
    const id = this.editor()?.id;
    if (id == null) return;

    const name = this.form.controls.name.getRawValue().trim() || 'this profile';
    if (
      !window.confirm(`Delete "${name}"? This translation profile will no longer be available.`)
    ) {
      return;
    }

    this.deleting.set(true);
    this.errorMessage.set(null);
    this.profilesService.delete(id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.editor.set(null);
        this.fetchProfiles();
      },
      error: (error: unknown) => {
        this.deleting.set(false);
        this.errorMessage.set(readApiError(error, 'Could not delete this translation profile.'));
      },
    });
  }

  protected libreCreateBlocked(): boolean {
    return (
      this.editor()?.mode === 'create' &&
      this.kind() === 'LibreTranslate' &&
      this.libreTranslateExists()
    );
  }

  protected isSelected(profile: TranslationProfile): boolean {
    const editor = this.editor();
    return editor?.mode === 'edit' && editor.id === profile.id;
  }

  protected kindLabel(kind: TranslationProfileKind): string {
    return kind === 'LibreTranslate' ? 'LibreTranslate' : 'Custom API';
  }

  protected editorTitle(): string {
    if (this.editor()?.mode === 'edit') {
      const name = this.form.controls.name.getRawValue().trim();
      return name ? `Edit ${name}` : 'Edit profile';
    }

    return this.kind() === 'LibreTranslate' ? 'Add LibreTranslate' : 'New API';
  }

  private onKindSelected(kind: TranslationProfileKind): void {
    if (kind === 'Custom' && this.form.controls.name.getRawValue() === 'LibreTranslate') {
      this.form.controls.name.setValue('', { emitEvent: false });
    }

    this.applyKind(kind, false);
  }

  private resetForm(
    value: {
      kind: TranslationProfileKind;
      name: string;
      url: string;
      httpMethod: string;
      responsePath: string;
      isDefault: boolean;
    },
    headers: RequestEntry[],
    body: RequestEntry[],
    lockKind: boolean,
  ): void {
    this.suppressKindChange = true;
    this.form.controls.kind.enable({ emitEvent: false });
    this.form.controls.name.enable({ emitEvent: false });
    this.form.controls.headers.enable({ emitEvent: false });
    this.form.controls.body.enable({ emitEvent: false });
    this.form.reset(value);
    this.replaceEntries(this.form.controls.headers, headers);
    this.replaceEntries(this.form.controls.body, body);
    this.applyKind(value.kind, lockKind);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.suppressKindChange = false;
  }

  private applyKind(kind: TranslationProfileKind, lockKind: boolean): void {
    const { name, url, responsePath, kind: kindControl, headers, body } = this.form.controls;
    this.kind.set(kind);

    url.setValidators([Validators.required, absoluteHttpUrl(kind === 'Custom')]);
    url.updateValueAndValidity({ emitEvent: false });

    if (kind === 'LibreTranslate') {
      name.setValue('LibreTranslate', { emitEvent: false });
      name.disable({ emitEvent: false });
      responsePath.clearValidators();
      headers.disable({ emitEvent: false });
      body.disable({ emitEvent: false });
    } else {
      name.enable({ emitEvent: false });
      responsePath.setValidators(trimmedLength(300));
      headers.enable({ emitEvent: false });
      body.enable({ emitEvent: false });
    }

    responsePath.updateValueAndValidity({ emitEvent: false });
    if (lockKind) kindControl.disable({ emitEvent: false });
    else kindControl.enable({ emitEvent: false });
  }

  private replaceEntries(array: FormArray<RequestEntryGroup>, entries: RequestEntry[]): void {
    array.clear();
    for (const entry of entries) {
      array.push(createRequestEntryGroup(this.fb, entry));
    }
  }

  private toWriteRequest(): TranslationProfileWriteRequest {
    const value = this.form.getRawValue();
    if (this.kind() === 'LibreTranslate') {
      return {
        name: 'LibreTranslate',
        isDefault: value.isDefault,
        url: value.url.trim(),
        httpMethod: 'POST',
        headers: [],
        body: [],
        responsePath: '',
      };
    }

    return {
      name: value.name.trim(),
      isDefault: value.isDefault,
      url: value.url.trim(),
      httpMethod: value.httpMethod,
      headers: this.readEntries(this.form.controls.headers),
      body: this.readEntries(this.form.controls.body),
      responsePath: value.responsePath.trim(),
    };
  }

  private readEntries(array: FormArray<RequestEntryGroup>): RequestEntry[] {
    return array.getRawValue().map((entry) => ({
      key: entry.key.trim(),
      value: entry.value,
    }));
  }

  private fetchProfiles(after?: (profiles: TranslationProfile[]) => void): void {
    this.profilesService.list().subscribe({
      next: (profiles) => {
        this.profiles.set(profiles);
        this.loading.set(false);
        this.loadError.set(null);
        after?.(profiles);
      },
      error: () => {
        this.loading.set(false);
        if (this.profiles().length === 0) {
          this.loadError.set('Could not load translation profiles.');
        } else {
          this.errorMessage.set('Could not refresh translation profiles.');
        }
      },
    });
  }
}

function readApiError(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse && typeof error.error === 'string') {
    const message = error.error.trim();
    if (message) return message;
  }

  return fallback;
}
