export interface DashboardUser {
  readonly name: string;
  readonly currentStreak: number;
}

export interface ReviewSummary {
  readonly newCards: number;
  readonly learningCards: number;
  readonly reviewCards: number;
  readonly estimatedMinutes: number;
}

export interface StudyStatistic {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly tone: 'primary' | 'success' | 'warning';
}

export interface DeckProgress {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly termLanguage: string;
  readonly definitionLanguage: string;
  readonly totalCards: number;
  readonly dueCards: number;
  readonly masteryPercentage: number;
  readonly color: string;
}

export interface StudyActivity {
  readonly date: string;
  readonly reviewCount: number;
  readonly intensity: 0 | 1 | 2 | 3 | 4;
}

export interface DashboardViewModel {
  readonly user: DashboardUser;
  readonly reviewSummary: ReviewSummary;
  readonly statistics: readonly StudyStatistic[];
  readonly recentDecks: readonly DeckProgress[];
  readonly activity: readonly StudyActivity[];
}
