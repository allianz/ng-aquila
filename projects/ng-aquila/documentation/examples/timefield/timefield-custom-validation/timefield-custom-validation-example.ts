import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import {
    NxTimefieldComponent,
    NxTimefieldModule,
} from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield without timepicker example
 */
@Component({
    selector: 'timefield-custom-validation-example',
    templateUrl: './timefield-custom-validation-example.html',
    styleUrls: ['./timefield-custom-validation-example.css'],
    imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule, JsonPipe],
})
export class TimefieldCustomValidationExampleComponent
    implements AfterViewInit
{
    timefield = viewChild.required(NxTimefieldComponent);

    readonly testForm = this.fb.group({
        timefieldReactive: [''],
    });

    constructor(private readonly fb: FormBuilder) {}

    ngAfterViewInit() {
        // this is only to simulate user input that the example already shows the error
        this.timefield().hours = '33';
        this.testForm.controls.timefieldReactive.markAsTouched();
        this.testForm.controls.timefieldReactive.updateValueAndValidity();
    }
}
