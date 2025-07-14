import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxMultiStepperComponent,
  NxProgressStepperModule,
} from '@allianz/ng-aquila/progress-stepper';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Progress Indicator Multi Groups Example
 */
@Component({
  selector: 'progress-stepper-multi-groups-example',
  templateUrl: './progress-stepper-multi-groups-example.html',
  styleUrls: ['./progress-stepper-multi-groups-example.css'],
  imports: [
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
      steps: [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
    },
    {
      label: 'Group 2',
      steps: [{ label: 'Step 4' }, { label: 'Step 5' }],
    },
  ];
}
