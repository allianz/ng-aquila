import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Tag Reactive Example
 */
@Component({
    selector: 'taglist-reactive-example',
    templateUrl: './taglist-reactive-example.html',
    styleUrls: ['./taglist-reactive-example.css'],
})
export class TaglistReactiveExampleComponent {
    readonly testForm = this.fb.group({
        tagsTestReactive: [['Apples', 'Oranges'], Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
