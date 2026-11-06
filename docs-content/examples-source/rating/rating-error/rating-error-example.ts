import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxRatingComponent } from '@allianz/ng-aquila/rating';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Rating Error Example
 */
@Component({
  selector: 'rating-error-example',
  templateUrl: './rating-error-example.html',
  styleUrls: ['./rating-error-example.css'],
  imports: [
    ReactiveFormsModule,
    NxRatingComponent,
    NxErrorComponent,
    NxButtonModule,
  ],
})
export class RatingErrorExampleComponent {
  readonly testForm = this.fb.group({
    rating: [0, Validators.min(1)],
  });

  constructor(private readonly fb: FormBuilder) {}
}
