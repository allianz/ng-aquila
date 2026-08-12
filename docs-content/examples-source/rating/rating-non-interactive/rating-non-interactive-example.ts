import { NxRatingComponent } from '@allianz/ng-aquila/rating';
import { NxSliderModule } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';
/**
 * @title Rating Non-Interactive Example
 */
@Component({
  selector: 'rating-non-interactive-example',
  templateUrl: './rating-non-interactive-example.html',
  styleUrls: ['./rating-non-interactive-example.css'],
  imports: [NxRatingComponent, NxSliderModule],
})
export class RatingNonInteractiveExampleComponent {
  ratingValue = 3.25;
}
