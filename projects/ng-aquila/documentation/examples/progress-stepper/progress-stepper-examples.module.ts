import { NgModule } from '@angular/core';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxProgressStepperModule } from '@aposin/ng-aquila/progress-stepper';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxSliderModule } from '@aposin/ng-aquila/slider';

import { ExamplesSharedModule } from '../examples-shared.module';
import { ProgressStepperExampleComponent } from './progress-stepper/progress-stepper-example';
import { ProgressStepperCustomExampleComponent } from './progress-stepper-custom/progress-stepper-custom-example';
import { ProgressStepperFormExampleComponent } from './progress-stepper-form/progress-stepper-form-example';
import { ProgressStepperMultiExampleComponent } from './progress-stepper-multi/progress-stepper-multi-example';
import { ProgressStepperMultiGroupsExampleComponent } from './progress-stepper-multi-groups/progress-stepper-multi-groups-example';
import { ProgressStepperMultiVerticalExampleComponent } from './progress-stepper-multi-vertical/progress-stepper-multi-vertical-example';
import { ProgressStepperNonlinearExampleComponent } from './progress-stepper-nonlinear/progress-stepper-nonlinear-example';
import { ProgressStepperProgressExampleComponent } from './progress-stepper-progress/progress-stepper-progress-example';
import { ProgressStepperReactivemultiExampleComponent } from './progress-stepper-reactivemulti/progress-stepper-reactivemulti-example';
import { ProgressStepperReactivesingleExampleComponent } from './progress-stepper-reactivesingle/progress-stepper-reactivesingle-example';
import { ProgressStepperStepExampleComponent } from './progress-stepper-step/progress-stepper-step-example';
import { ProgressStepperTitleExampleComponent } from './progress-stepper-title/progress-stepper-title-example';

const EXAMPLES = [
    ProgressStepperExampleComponent,
    ProgressStepperCustomExampleComponent,
    ProgressStepperFormExampleComponent,
    ProgressStepperMultiExampleComponent,
    ProgressStepperMultiGroupsExampleComponent,
    ProgressStepperMultiVerticalExampleComponent,
    ProgressStepperNonlinearExampleComponent,
    ProgressStepperProgressExampleComponent,
    ProgressStepperReactivemultiExampleComponent,
    ProgressStepperReactivesingleExampleComponent,
    ProgressStepperStepExampleComponent,
    ProgressStepperTitleExampleComponent,
];

@NgModule({
    imports: [
        NxProgressStepperModule,
        NxInputModule,
        NxRadioToggleModule,
        NxSliderModule,
        NxDropdownModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ProgressExamplesModule {
    static components() {
        return {
            'progress-stepper': ProgressStepperExampleComponent,
            'progress-stepper-custom': ProgressStepperCustomExampleComponent,
            'progress-stepper-form': ProgressStepperFormExampleComponent,
            'progress-stepper-multi': ProgressStepperMultiExampleComponent,
            'progress-stepper-multi-groups':
                ProgressStepperMultiGroupsExampleComponent,
            'progress-stepper-multi-vertical':
                ProgressStepperMultiVerticalExampleComponent,
            'progress-stepper-nonlinear':
                ProgressStepperNonlinearExampleComponent,
            'progress-stepper-progress':
                ProgressStepperProgressExampleComponent,
            'progress-stepper-reactivemulti':
                ProgressStepperReactivemultiExampleComponent,
            'progress-stepper-reactivesingle':
                ProgressStepperReactivesingleExampleComponent,
            'progress-stepper-step': ProgressStepperStepExampleComponent,
            'progress-stepper-title': ProgressStepperTitleExampleComponent,
        };
    }
}
