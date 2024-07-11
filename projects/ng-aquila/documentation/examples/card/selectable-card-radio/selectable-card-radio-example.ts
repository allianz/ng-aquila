import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxSelectableCardComponent,
    NxSelectableCardGroupComponent,
} from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Selectable cards radio example
 */
@Component({
    selector: 'selectable-card-radio-example',
    templateUrl: './selectable-card-radio-example.html',
    styleUrls: ['./selectable-card-radio-example.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxSelectableCardGroupComponent,
        NxSelectableCardComponent,
        NxCopytextComponent,
        NxErrorComponent,
        NxButtonComponent,
        JsonPipe,
    ],
})
export class SelectableCardRadioExampleComponent {
    cards = [
        {
            value: 'a',
            disabled: false,
            title: 'Selectable radio card',
        },
        {
            value: 'b',
            disabled: false,
            title: 'Selectable radio card',
        },
        {
            value: 'c',
            disabled: true,
            title: 'Disabled selected radio card',
        },
        {
            value: 'd',
            disabled: true,
            title: 'Disabled radio card',
        },
    ];
    readonly formGroup = this.fb.group({
        radio: ['c', Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}

    addNewCard() {
        this.cards.push({
            value: (this.cards.length + 1).toString(),
            disabled: false,
            title: 'New radio card',
        });
    }

    removeFirstCard() {
        this.cards.pop();
    }
}
