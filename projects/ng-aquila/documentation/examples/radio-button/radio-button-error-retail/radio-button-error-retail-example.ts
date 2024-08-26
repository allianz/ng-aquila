import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';

/**
 * @title Radio error message retail
 */
@Component({
    standalone: true,
    selector: 'radio-button-error-retail-example',
    templateUrl: './radio-button-error-retail-example.html',
    styleUrl: './radio-button-error-retail-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        NxRadioModule,
        NxLabelComponent,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class RadioButtonErrorRetailExampleComponent {
    readonly testForm = this.fb.group({
        radioTestReactive: [null, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
