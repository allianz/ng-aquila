import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCompactProgressIndicatorComponent } from './compact/compact-progress-indicator.component';
import { NxMultiProgressIndicatorComponent } from './multi/multi-progress-indicator.component';
import { NxMultiProgressStepComponent } from './multi/multi-progress-step.component';
import { NxProgressIndicatorStepActionComponent } from './multi/progress-indicator-step-action.component';
import { NxSingleProgressIndicatorComponent } from './single/single-progress-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    NxCompactProgressIndicatorComponent,
    NxSingleProgressIndicatorComponent,
  ],
  exports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    NxCompactProgressIndicatorComponent,
    NxSingleProgressIndicatorComponent,
  ],
})
export class NxProgressIndicatorModule {}
