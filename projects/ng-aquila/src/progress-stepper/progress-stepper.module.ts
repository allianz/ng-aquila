import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';
import { NxMultiStepItemComponent } from './multi/multi-step-item.component';
import { NxMultiStepperComponent } from './multi/multi-step.component';
import { NxSingleStepperComponent } from './single/single-step.component';
import { NxProgressStepperComponent } from './progress/progress.component';
import { NxStepperNextDirective, NxStepperPreviousDirective } from './buttons';
import { NxProgressStepperDirective, NxStepComponent } from './progress-stepper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NxMultiStepperGroupComponent } from './multi/multi-step-group.component';
import { NxLabelModule } from '@aposin/ng-aquila/base';

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
