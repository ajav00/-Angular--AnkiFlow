import { Component, inject, input } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { RequestEntryGroup, createRequestEntryGroup } from '../../translation-profile.form';

@Component({
  selector: 'af-request-entries-editor',
  imports: [ReactiveFormsModule, Button, Icon],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './request-entries-editor.html',
  styleUrl: './request-entries-editor.scss',
})
export class RequestEntriesEditor {
  private readonly container = inject(ControlContainer);
  private readonly fb = inject(FormBuilder);

  readonly arrayName = input.required<'headers' | 'body'>();
  readonly label = input.required<string>();
  readonly hint = input('');
  readonly duplicateMessage = input('Keys must be unique.');

  protected entries(): FormArray<RequestEntryGroup> {
    return this.container.control?.get(this.arrayName()) as FormArray<RequestEntryGroup>;
  }

  protected add(): void {
    this.entries().push(createRequestEntryGroup(this.fb));
  }

  protected remove(index: number): void {
    this.entries().removeAt(index);
  }
}
