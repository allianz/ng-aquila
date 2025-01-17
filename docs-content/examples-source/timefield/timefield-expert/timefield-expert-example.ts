import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxTimefieldModule } from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield Expert example
 */
@Component({
    selector: 'timefield-expert-example',
    templateUrl: './timefield-expert-example.html',
    styleUrl: './timefield-expert-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            // This is usually coming from the NxExpertModule or other providers.
            // We use this here just for the demo purposes.
            provide: FORMFIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    imports: [
        NxTimefieldModule,
        ReactiveFormsModule,
        NxGridModule,
        JsonPipe,
        NxErrorComponent,
    ],
})
export class TimefieldExpertExampleComponent {
    readonly testForm = this.fb.group({
        timefieldReactive: ['22:54', Validators.required],
        timefieldPickerReactive: ['20:15', Validators.required],
        timefield12Reactive: ['', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
