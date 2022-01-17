import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * @title Rating Reactive Example
 */
@Component({
    selector: 'rating-reactive-example',
    templateUrl: './rating-reactive-example.html',
    styleUrls: ['./rating-reactive-example.css'],
})
export class RatingReactiveExampleComponent {
    testForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            rating: [1],
        });
    }
}
