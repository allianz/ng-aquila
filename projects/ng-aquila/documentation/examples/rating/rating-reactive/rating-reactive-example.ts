import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxRatingComponent } from '@aposin/ng-aquila/rating';

/**
 * @title Rating Reactive Example
 */
@Component({
    selector: 'rating-reactive-example',
    templateUrl: './rating-reactive-example.html',
    styleUrls: ['./rating-reactive-example.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NxRatingComponent, JsonPipe],
})
export class RatingReactiveExampleComponent {
    readonly testForm = this.fb.group({
        rating: [1],
    });

    constructor(private readonly fb: FormBuilder) {}
}
