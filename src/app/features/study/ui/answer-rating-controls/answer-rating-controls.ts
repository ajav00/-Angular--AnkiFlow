import { Component, input, output } from '@angular/core';
import { StudyRating } from '../../study.models';

@Component({
  selector: 'af-answer-rating-controls',
  templateUrl: './answer-rating-controls.html',
  styleUrl: './answer-rating-controls.scss',
})
export class AnswerRatingControls {
  readonly ratings = input.required<readonly StudyRating[]>();
  readonly disabled = input(false);
  readonly rate = output<StudyRating>();
}
