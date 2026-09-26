export interface TranslateTextRequest {
  readonly text: string;
  readonly languageSourceCode: string;
  readonly languageTargetCode: string;
}

export interface TranslationOutput {
  readonly translatedText: string;
}
