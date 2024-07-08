import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxMultiStepperComponent,
    NxProgressStepperModule,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator Multi Groups Example
 */
@Component({
    selector: 'progress-stepper-multi-groups-example',
    templateUrl: './progress-stepper-multi-groups-example.html',
    styleUrls: ['./progress-stepper-multi-groups-example.css'],
    standalone: true,
    imports: [
        NgFor,
        NxProgressStepperModule,
        FormsModule,
        NxFormfieldComponent,
        NxInputDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxButtonComponent,
    ],
})
export class ProgressStepperMultiGroupsExampleComponent {
    @ViewChild('stepper') stepper!: NxMultiStepperComponent;

    groups = [
        {
            label: 'Group 1',
            steps: [
                { label: 'Step 1' },
                { label: 'Step 2' },
                { label: 'Step 3' },
            ],
        },
        {
            label: 'Group 2',
            steps: [{ label: 'Step 4' }, { label: 'Step 5' }],
        },
    ];
}
