import { Component } from '@angular/core';
import { NxRatingComponent } from '@aposin/ng-aquila/rating';

/**
 * @title Rating Simple Bindig Example
 */
@Component({
    selector: 'rating-simple-example',
    templateUrl: './rating-simple-example.html',
    styleUrls: ['./rating-simple-example.css'],
    standalone: true,
    imports: [NxRatingComponent],
})
export class RatingSimpleExampleComponent {
    simpleBinding = 1;
}
