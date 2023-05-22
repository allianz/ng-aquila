import { NgModule } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxNumberStepperModule } from '@aposin/ng-aquila/number-stepper';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { ExamplesSharedModule } from '../examples-shared.module';
import { NumberStepperAccessibilityExampleComponent } from './number-stepper-a11y/number-stepper-a11y-example';
import { NumberStepperAdditionsExampleComponent } from './number-stepper-additions/number-stepper-additions-example';
import { NumberStepperAutoResizingExampleComponent } from './number-stepper-auto-resizing/number-stepper-auto-resizing-example';
import { NumberStepperCustomLabelExampleComponent } from './number-stepper-custom-label/number-stepper-custom-label-example';
import { NumberStepperDisabledExplicitExampleComponent } from './number-stepper-disabled-explicit/number-stepper-disabled-explicit-example';
import { NumberStepperDisabledImplicitExampleComponent } from './number-stepper-disabled-implicit/number-stepper-disabled-implicit-example';
import { NumberStepperFloatingPointExampleComponent } from './number-stepper-floating-point/number-stepper-floating-point-example';
import { NumberStepperFormattingExampleComponent } from './number-stepper-formatting/number-stepper-formatting-example';
import { NumberStepperLocalizeExampleComponent } from './number-stepper-localize/number-stepper-localize-example';
import { NumberStepperNegativeExampleComponent } from './number-stepper-negative/number-stepper-negative-example';
import { NumberStepperReactiveExampleComponent } from './number-stepper-reactive/number-stepper-reactive-example';
import { NumberStepperReadonlyInputExample } from './number-stepper-readonly-input/number-stepper-readonly-input-example';
import { NumberStepperSimpleBindingExampleComponent } from './number-stepper-simple-binding/number-stepper-simple-binding-example';
import { NumberStepperSizesExampleComponent } from './number-stepper-sizes/number-stepper-sizes-example';
import { NumberStepperStandaloneExampleComponent } from './number-stepper-standalone/number-stepper-standalone-example';
import { NumberStepperTemplateDrivenExampleComponent } from './number-stepper-template-driven/number-stepper-template-driven-example';
import { NumberStepperValidationExampleComponent } from './number-stepper-validation/number-stepper-validation-example';

const EXAMPLES = [
    NumberStepperReadonlyInputExample,
    NumberStepperAccessibilityExampleComponent,
    NumberStepperAdditionsExampleComponent,
    NumberStepperAutoResizingExampleComponent,
    NumberStepperCustomLabelExampleComponent,
    NumberStepperDisabledExplicitExampleComponent,
    NumberStepperDisabledImplicitExampleComponent,
    NumberStepperFloatingPointExampleComponent,
    NumberStepperFormattingExampleComponent,
    NumberStepperLocalizeExampleComponent,
    NumberStepperNegativeExampleComponent,
    NumberStepperReactiveExampleComponent,
    NumberStepperSimpleBindingExampleComponent,
    NumberStepperSizesExampleComponent,
    NumberStepperStandaloneExampleComponent,
    NumberStepperTemplateDrivenExampleComponent,
    NumberStepperValidationExampleComponent,
];

@NgModule({
    imports: [
        NxNumberStepperModule,
        NxIconModule,
        NxPopoverModule,
        NxErrorModule,
        NxMessageModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class NumberExamplesModule {
    static components() {
        return {
            'number-stepper-readonly-input': NumberStepperReadonlyInputExample,
            'number-stepper-a11y': NumberStepperAccessibilityExampleComponent,
            'number-stepper-additions': NumberStepperAdditionsExampleComponent,
            'number-stepper-auto-resizing':
                NumberStepperAutoResizingExampleComponent,
            'number-stepper-custom-label':
                NumberStepperCustomLabelExampleComponent,
            'number-stepper-disabled-explicit':
                NumberStepperDisabledExplicitExampleComponent,
            'number-stepper-disabled-implicit':
                NumberStepperDisabledImplicitExampleComponent,
            'number-stepper-floating-point':
                NumberStepperFloatingPointExampleComponent,
            'number-stepper-formatting':
                NumberStepperFormattingExampleComponent,
            'number-stepper-localize': NumberStepperLocalizeExampleComponent,
            'number-stepper-negative': NumberStepperNegativeExampleComponent,
            'number-stepper-reactive': NumberStepperReactiveExampleComponent,
            'number-stepper-simple-binding':
                NumberStepperSimpleBindingExampleComponent,
            'number-stepper-sizes': NumberStepperSizesExampleComponent,
            'number-stepper-standalone':
                NumberStepperStandaloneExampleComponent,
            'number-stepper-template-driven':
                NumberStepperTemplateDrivenExampleComponent,
            'number-stepper-validation':
                NumberStepperValidationExampleComponent,
        };
    }
}
