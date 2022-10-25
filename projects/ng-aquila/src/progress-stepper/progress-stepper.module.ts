import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxLabelModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';

import { NxStepperNextDirective, NxStepperPreviousDirective } from './buttons';
import { NxMultiStepperComponent } from './multi/multi-step.component';
import { NxMultiStepperGroupComponent } from './multi/multi-step-group.component';
import { NxMultiStepItemComponent } from './multi/multi-step-item.component';
import { NxProgressStepperComponent } from './progress/progress.component';
import { NxProgressStepperDirective, NxStepComponent } from './progress-stepper.component';
import { NxSingleStepperComponent } from './single/single-step.component';

@NgModule({
    imports: [CommonModule, CdkStepperModule, NxIconModule, NxProgressbarModule, NxLabelModule],
    declarations: [
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
