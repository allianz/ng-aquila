import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * @title Rating Reactive Example
 */
@Component({
    selector: 'rating-reactive-example',
    templateUrl: './rating-reactive-example.html',
    styleUrls: ['./rating-reactive-example.css'],
})
export class RatingReactiveExampleComponent {
    readonly testForm = this.fb.group({
        rating: [1],
    });

    constructor(private readonly fb: FormBuilder) {}
}
