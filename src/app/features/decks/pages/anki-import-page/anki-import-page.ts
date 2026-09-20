import { HttpEventType } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { Card } from '../../../../shared/ui/card/card';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ProgressBar } from '../../../../shared/ui/progress-bar/progress-bar';
import { ImportAnkiPackageResponse } from '../../anki-import.api.models';
import { AnkiImportService } from '../../anki-import.service';

type ImportStep = 'select' | 'uploading' | 'done' | 'error';

@Component({
  selector: 'af-anki-import-page',
  imports: [RouterLink, ReactiveFormsModule, Button, Card, Icon, ProgressBar],
  templateUrl: './anki-import-page.html',
  styleUrl: './anki-import-page.scss',
})
export class AnkiImportPage {
  private readonly ankiImportService = inject(AnkiImportService);
  private readonly fb = inject(FormBuilder);

  protected readonly step = signal<ImportStep>('select');
  protected readonly selectedFile = signal<File | null>(null);
  protected readonly uploadProgress = signal(0);
  protected readonly result = signal<ImportAnkiPackageResponse | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    termLanguageCode: ['en', Validators.required],
    definitionLanguageCode: ['', Validators.required],
  });

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file && !file.name.toLowerCase().endsWith('.apkg')) {
      this.errorMessage.set('Please choose a .apkg file exported from Anki.');
      this.selectedFile.set(null);
      input.value = '';
      return;
    }

    this.errorMessage.set(null);
    this.selectedFile.set(file);
  }

  protected import(): void {
    const file = this.selectedFile();
    if (!file || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.step.set('uploading');
    this.uploadProgress.set(0);
    this.errorMessage.set(null);

    this.ankiImportService.upload(file, this.form.getRawValue()).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress.set(Math.round((event.loaded / event.total) * 100));
        } else if (event.type === HttpEventType.Response && event.body) {
          this.result.set(event.body);
          this.step.set('done');
        }
      },
      error: () => {
        this.errorMessage.set('Could not import the Anki package. Please try again.');
        this.step.set('error');
      },
    });
  }

  protected reset(): void {
    this.step.set('select');
    this.selectedFile.set(null);
    this.uploadProgress.set(0);
    this.result.set(null);
    this.errorMessage.set(null);
  }
}
