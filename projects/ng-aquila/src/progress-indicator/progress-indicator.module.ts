import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxMultiProgressIndicatorComponent } from './multi/multi-progress-indicator.component';
import { NxMultiProgressStepComponent } from './multi/multi-progress-step.component';
import { NxProgressIndicatorStepActionComponent } from './multi/progress-indicator-step-action.component';

@NgModule({
  imports: [
    CommonModule,
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
  ],
  exports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
  ],
})
export class NxProgressIndicatorModule {}
