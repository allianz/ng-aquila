import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';

import { ExamplesSharedModule } from '../examples-shared.module';
import { RadioToggleExampleComponent } from './radio-toggle/radio-toggle-example';
import { RadioToggleCustomExampleComponent } from './radio-toggle-custom/radio-toggle-custom-example';
import { RadioToggleFormExampleComponent } from './radio-toggle-form/radio-toggle-form-example';
import { RadioToggleNegativeExampleComponent } from './radio-toggle-negative/radio-toggle-negative-example';
import { RadioToggleReactiveExampleComponent } from './radio-toggle-reactive/radio-toggle-reactive-example';
import { RadioToggleValidationExampleComponent } from './radio-toggle-validation/radio-toggle-validation-example';

const EXAMPLES = [
    RadioToggleExampleComponent,
    RadioToggleCustomExampleComponent,
    RadioToggleFormExampleComponent,
    RadioToggleNegativeExampleComponent,
    RadioToggleReactiveExampleComponent,
    RadioToggleValidationExampleComponent,
];

@NgModule({
    imports: [NxRadioToggleModule, NxIconModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class RadioToggleExamplesModule {
    static components() {
        return {
            'radio-toggle': RadioToggleExampleComponent,
            'radio-toggle-custom': RadioToggleCustomExampleComponent,
            'radio-toggle-form': RadioToggleFormExampleComponent,
            'radio-toggle-negative': RadioToggleNegativeExampleComponent,
            'radio-toggle-reactive': RadioToggleReactiveExampleComponent,
            'radio-toggle-validation': RadioToggleValidationExampleComponent,
        };
    }
}
