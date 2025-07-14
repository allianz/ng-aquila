import { NxRatingComponent } from '@allianz/ng-aquila/rating';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Rating Reactive Example
 */
@Component({
  selector: 'rating-reactive-example',
  templateUrl: './rating-reactive-example.html',
  styleUrls: ['./rating-reactive-example.css'],
  imports: [FormsModule, ReactiveFormsModule, NxRatingComponent, JsonPipe],
})
export class RatingReactiveExampleComponent {
  readonly testForm = this.fb.group({
    rating: [1],
  });

  constructor(private readonly fb: FormBuilder) {}
}
