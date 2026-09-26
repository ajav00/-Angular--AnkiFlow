import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RequestEntry } from './translation-profile.models';

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

export type RequestEntryGroup = FormGroup<{
  key: FormControl<string>;
  value: FormControl<string>;
}>;

const PLACEHOLDER_PROBES: readonly (readonly [string, string])[] = [
  ['{{text}}', 'text'],
  ['{{source}}', 'en'],
  ['{{target}}', 'es'],
];

export function createRequestEntryGroup(fb: FormBuilder, entry?: RequestEntry): RequestEntryGroup {
  return fb.nonNullable.group({
    key: [entry?.key ?? '', [Validators.required, Validators.maxLength(256)]],
    value: [entry?.value ?? '', [Validators.maxLength(8000)]],
  });
}

export function trimmedLength(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    if (!value) return { required: true };
    if (value.length > max)
      return { maxlength: { requiredLength: max, actualLength: value.length } };
    return null;
  };
}

export function absoluteHttpUrl(allowPlaceholders: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = String(control.value ?? '').trim();
    if (!raw) return null;
    if (raw.length > 2000) return { maxlength: { requiredLength: 2000, actualLength: raw.length } };

    const candidate = allowPlaceholders ? probeUrl(raw) : raw;
    try {
      const url = new URL(candidate);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return { httpUrl: true };
    } catch {
      return { httpUrl: true };
    }

    return null;
  };
}

export function allowedHttpMethod(control: AbstractControl): ValidationErrors | null {
  const method = String(control.value ?? '')
    .trim()
    .toUpperCase();
  return HTTP_METHODS.includes(method as (typeof HTTP_METHODS)[number]) ? null : { method: true };
}

export function uniqueEntryKeys(caseInsensitive: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rows = (control.value ?? []) as RequestEntry[];
    const seen = new Set<string>();

    for (const row of rows) {
      const key = String(row?.key ?? '').trim();
      if (!key) continue;
      const token = caseInsensitive ? key.toLowerCase() : key;
      if (seen.has(token)) return { duplicateKey: true };
      seen.add(token);
    }

    return null;
  };
}

function probeUrl(value: string): string {
  return PLACEHOLDER_PROBES.reduce(
    (current, [placeholder, sample]) => current.replaceAll(placeholder, sample),
    value,
  );
}
