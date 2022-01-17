import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Tag Reactive Example
 */
@Component({
    selector: 'taglist-reactive-example',
    templateUrl: './taglist-reactive-example.html',
    styleUrls: ['./taglist-reactive-example.css'],
})
export class TaglistReactiveExampleComponent {
    testForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.testForm = this.fb.group({
            tagsTestReactive: [['Apples', 'Oranges'], Validators.required],
        });
    }
}
