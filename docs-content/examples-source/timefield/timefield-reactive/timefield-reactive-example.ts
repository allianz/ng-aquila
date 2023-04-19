import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Timefield reactive forms example
 */
@Component({
    selector: 'nx-timefield-reactive-example',
    templateUrl: './timefield-reactive-example.html',
    styleUrls: ['./timefield-reactive-example.css'],
})
export class TimefieldReactiveExampleComponent {
    readonly testForm = this.fb.group({
        timefieldReactive: ['22:54', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
