export interface GetDeckResponse {
  readonly id: number;
  readonly title: string;
  readonly termLanguageCode: string;
  readonly definitionLanguageCode: string;
  readonly description?: string | null;
  readonly color?: string | null;
}

export interface CreateDeckRequest {
  readonly title: string;
  readonly termLanguageCode: string;
  readonly definitionLanguageCode: string;
  readonly description?: string;
  readonly color?: string;
}

export interface CreateDeckResponse {
  readonly newId: number;
}

export interface EditDeckRequest {
  readonly id: number;
  readonly title?: string;
  readonly termLanguageCode?: string;
  readonly definitionLanguageCode?: string;
  readonly description?: string;
  readonly color?: string;
}
