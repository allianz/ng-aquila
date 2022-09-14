import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';

import { ExamplesSharedModule } from '../examples-shared.module';
import { RadioButtonExampleComponent } from './radio-button/radio-button-example';
import { RadioButtonDisabledExampleComponent } from './radio-button-disabled/radio-button-disabled-example';
import { RadioButtonEventExampleComponent } from './radio-button-event/radio-button-event-example';
import { RadioButtonFormExampleComponent } from './radio-button-form/radio-button-form-example';
import { RadioButtonGroupExampleComponent } from './radio-button-group/radio-button-group-example';
import { RadioButtonGroupHorizontalExampleComponent } from './radio-button-group-horizontal/radio-button-group-horizontal-example';
import { RadioButtonGroupLabelSizeExampleComponent } from './radio-button-group-label-size/radio-button-group-label-size-example';
import { RadioButtonGroupValidationExampleComponent } from './radio-button-group-validation/radio-button-group-validation-example';
import { RadioButtonNegativeExampleComponent } from './radio-button-negative/radio-button-negative-example';
import { RadioButtonReactiveExampleComponent } from './radio-button-reactive/radio-button-reactive-example';
import { RadioButtonSampleExampleComponent } from './radio-button-sample/radio-button-sample-example';
import { RadioButtonSizesExampleComponent } from './radio-button-sizes/radio-button-sizes-example';

const EXAMPLES = [
    RadioButtonExampleComponent,
    RadioButtonDisabledExampleComponent,
    RadioButtonEventExampleComponent,
    RadioButtonFormExampleComponent,
    RadioButtonGroupExampleComponent,
    RadioButtonGroupHorizontalExampleComponent,
    RadioButtonGroupLabelSizeExampleComponent,
    RadioButtonGroupValidationExampleComponent,
    RadioButtonNegativeExampleComponent,
    RadioButtonReactiveExampleComponent,
    RadioButtonSampleExampleComponent,
    RadioButtonSizesExampleComponent,
];

@NgModule({
    imports: [NxRadioModule, NxIconModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class RadioExamplesModule {
    static components() {
        return {
            'radio-button': RadioButtonExampleComponent,
            'radio-button-disabled': RadioButtonDisabledExampleComponent,
            'radio-button-event': RadioButtonEventExampleComponent,
            'radio-button-form': RadioButtonFormExampleComponent,
            'radio-button-group': RadioButtonGroupExampleComponent,
            'radio-button-group-horizontal':
                RadioButtonGroupHorizontalExampleComponent,
            'radio-button-group-label-size':
                RadioButtonGroupLabelSizeExampleComponent,
            'radio-button-group-validation':
                RadioButtonGroupValidationExampleComponent,
            'radio-button-negative': RadioButtonNegativeExampleComponent,
            'radio-button-reactive': RadioButtonReactiveExampleComponent,
            'radio-button-sample': RadioButtonSampleExampleComponent,
            'radio-button-sizes': RadioButtonSizesExampleComponent,
        };
    }
}
