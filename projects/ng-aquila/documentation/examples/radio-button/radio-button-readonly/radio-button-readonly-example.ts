import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Radio button readonly example
 */
@Component({
    selector: 'radio-button-readonly-example',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxRadioGroupComponent,
        NxLabelComponent,
        NxRadioComponent,
        JsonPipe,
    ],
    templateUrl: './radio-button-readonly-example.html',
    styleUrl: './radio-button-readonly-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonReadonlyExampleComponent {
    readonly testForm = this.fb.group({
        radioTestReactive: ['oranges', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
