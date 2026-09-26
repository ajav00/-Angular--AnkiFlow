export type TranslationProfileKind = 'Custom' | 'LibreTranslate';

export interface RequestEntry {
  key: string;
  value: string;
}

export interface TranslationProfile {
  id: number;
  name: string;
  kind: TranslationProfileKind;
  isDefault: boolean;
  url: string;
  httpMethod: string;
  headers: RequestEntry[];
  body: RequestEntry[];
  responsePath: string;
}

export interface TranslationProfileWriteRequest {
  name: string;
  isDefault: boolean;
  url: string;
  httpMethod: string;
  headers: RequestEntry[];
  body: RequestEntry[];
  responsePath: string;
}

export interface CreateTranslationProfileRequest extends TranslationProfileWriteRequest {
  kind: TranslationProfileKind;
}
