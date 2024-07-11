import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxTimefieldComponent } from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield reactive forms example
 */
@Component({
    selector: 'nx-timefield-reactive-example',
    templateUrl: './timefield-reactive-example.html',
    styleUrls: ['./timefield-reactive-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxTimefieldComponent,
        NxErrorComponent,
        JsonPipe,
    ],
})
export class TimefieldReactiveExampleComponent {
    readonly testForm = this.fb.group({
        timefieldReactive: ['22:54', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
