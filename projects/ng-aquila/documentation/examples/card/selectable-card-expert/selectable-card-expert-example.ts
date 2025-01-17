import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxSelectableCardComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Selectable cards expert example
 */
@Component({
    selector: 'selectable-card-expert-example',
    templateUrl: './selectable-card-expert-example.html',
    styleUrls: ['./selectable-card-expert-example.css'],
    imports: [
        NxSelectableCardComponent,
        NxHeadlineComponent,
        NxCopytextComponent,
        FormsModule,
        ReactiveFormsModule,
        NxErrorComponent,
    ],
})
export class SelectableCardExpertExampleComponent {
    readonly formGroup = this.fb.group({
        card: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: FormBuilder) {
        this.formGroup.markAllAsTouched();
    }
}
