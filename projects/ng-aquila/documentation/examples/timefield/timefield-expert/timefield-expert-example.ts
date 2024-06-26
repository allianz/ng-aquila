import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';

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
})
export class TimefieldExpertExampleComponent {
    readonly testForm = this.fb.group({
        timefieldReactive: ['22:54', Validators.required],
        timefield12Reactive: ['', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
