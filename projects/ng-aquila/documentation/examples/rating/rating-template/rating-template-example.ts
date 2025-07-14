import { NxRatingComponent } from '@allianz/ng-aquila/rating';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Rating Template Driven Example
 */
@Component({
  selector: 'rating-template-example',
  templateUrl: './rating-template-example.html',
  styleUrls: ['./rating-template-example.css'],
  imports: [NxRatingComponent, FormsModule],
})
export class RatingTemplateExampleComponent {
  ngModelBinding = 1;
}
