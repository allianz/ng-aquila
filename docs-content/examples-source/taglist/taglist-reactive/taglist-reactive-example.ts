import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Reactive Example
 */
@Component({
    selector: 'taglist-reactive-example',
    templateUrl: './taglist-reactive-example.html',
    styleUrls: ['./taglist-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxTaglistComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
        JsonPipe,
    ],
})
export class TaglistReactiveExampleComponent {
    readonly testForm = this.fb.group({
        tagsTestReactive: [['Apples', 'Oranges'], Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
