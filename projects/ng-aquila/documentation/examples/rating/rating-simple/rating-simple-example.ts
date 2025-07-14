import { NxRatingComponent } from '@allianz/ng-aquila/rating';
import { Component } from '@angular/core';

/**
 * @title Rating Simple Bindig Example
 */
@Component({
  selector: 'rating-simple-example',
  templateUrl: './rating-simple-example.html',
  styleUrls: ['./rating-simple-example.css'],
  imports: [NxRatingComponent],
})
export class RatingSimpleExampleComponent {
  simpleBinding = 1;
}
