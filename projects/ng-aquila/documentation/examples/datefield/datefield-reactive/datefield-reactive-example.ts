import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Reactive example
 */
@Component({
    selector: 'datefield-reactive-example',
    templateUrl: './datefield-reactive-example.html',
    styleUrls: ['./datefield-reactive-example.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldReactiveExampleComponent {
    testForm: FormGroup = new FormGroup({
        date: new FormControl('', {
            validators: Validators.required,
        }),
    });
}
