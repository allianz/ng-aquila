import { NxLabelModule } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxProgressbarModule } from '@allianz/ng-aquila/progressbar';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxStepperNextDirective, NxStepperPreviousDirective } from './buttons';
import { NxMultiStepperComponent } from './multi/multi-step.component';
import { NxMultiStepperGroupComponent } from './multi/multi-step-group.component';
import { NxMultiStepItemComponent } from './multi/multi-step-item.component';
import { NxProgressStepperComponent } from './progress/progress.component';
import { NxProgressStepperDirective, NxStepComponent } from './progress-stepper.component';
import { NxSingleStepperComponent } from './single/single-step.component';

@NgModule({
  imports: [
    CommonModule,
    CdkStepperModule,
    NxIconModule,
    NxProgressbarModule,
    NxLabelModule,
    NxProgressStepperDirective,
    NxMultiStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
    NxProgressStepperComponent,
    NxSingleStepperComponent,
    NxMultiStepItemComponent,
    NxMultiStepperGroupComponent,
  ],
  exports: [
    NxProgressStepperDirective,
    NxSingleStepperComponent,
    NxProgressStepperComponent,
    NxMultiStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
    NxMultiStepperGroupComponent,
  ],
})
export class NxProgressStepperModule {}
