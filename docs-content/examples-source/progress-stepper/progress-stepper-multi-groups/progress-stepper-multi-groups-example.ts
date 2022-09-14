import { Component, ViewChild } from '@angular/core';
import { NxMultiStepperComponent } from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator Multi Groups Example
 */
@Component({
    selector: 'progress-stepper-multi-groups-example',
    templateUrl: './progress-stepper-multi-groups-example.html',
    styleUrls: ['./progress-stepper-multi-groups-example.css'],
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
