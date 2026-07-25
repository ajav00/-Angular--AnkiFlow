import { Component } from '@angular/core';
import { STUDY_SESSION_FIXTURE } from '../../data/study-session.fixture';
import { AnswerRatingControls } from '../../ui/answer-rating-controls/answer-rating-controls';
import { StudyFlashcard } from '../../ui/study-flashcard/study-flashcard';
import { StudySessionHeader } from '../../ui/study-session-header/study-session-header';
import { StudySessionSummary } from '../../ui/study-session-summary/study-session-summary';

@Component({
  selector: 'af-study-session-page',
  imports: [StudySessionHeader, StudyFlashcard, AnswerRatingControls, StudySessionSummary],
  templateUrl: './study-session-page.html',
  styleUrl: './study-session-page.scss',
})
export class StudySessionPage {
  protected readonly session = STUDY_SESSION_FIXTURE;
}
