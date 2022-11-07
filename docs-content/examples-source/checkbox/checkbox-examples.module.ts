import { NgModule } from '@angular/core';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';

import { ExamplesSharedModule } from '../examples-shared.module';
import { CheckboxGroupBasicExampleComponent } from './checkbox-group-basic/checkbox-group-basic-example';
import { CheckboxGroupDynamicExampleComponent } from './checkbox-group-dynamic/checkbox-group-dynamic-example';
import { CheckboxGroupHorizontalExampleComponent } from './checkbox-group-horizontal/checkbox-group-horizontal-example';
import { CheckboxGroupInheritanceExampleComponent } from './checkbox-group-inheritance/checkbox-group-inheritance-example';
import { CheckboxGroupLabelSizeExampleComponent } from './checkbox-group-label-size/checkbox-group-label-size-example';
import { CheckboxGroupReactiveExampleComponent } from './checkbox-group-reactive/checkbox-group-reactive-example';
import { CheckboxGroupValidationExampleComponent } from './checkbox-group-validation/checkbox-group-validation-example';
import { CheckboxLabelSizeExampleComponent } from './checkbox-label-size/checkbox-label-size-example';
import { CheckboxNegativeExampleComponent } from './checkbox-negative/checkbox-negative-example';
import { CheckboxOutputsExampleComponent } from './checkbox-outputs/checkbox-outputs-example';
import { CheckboxReactiveExampleComponent } from './checkbox-reactive/checkbox-reactive-example';
import { CheckboxSimpleBindingExampleComponent } from './checkbox-simple-binding/checkbox-simple-binding-example';
import { CheckboxStatesExampleComponent } from './checkbox-states/checkbox-states-example';
import { CheckboxTemplateDrivenExampleComponent } from './checkbox-template-driven/checkbox-template-driven-example';

const EXAMPLES = [
    CheckboxGroupBasicExampleComponent,
    CheckboxGroupDynamicExampleComponent,
    CheckboxGroupHorizontalExampleComponent,
    CheckboxGroupInheritanceExampleComponent,
    CheckboxGroupLabelSizeExampleComponent,
    CheckboxGroupReactiveExampleComponent,
    CheckboxGroupValidationExampleComponent,
    CheckboxLabelSizeExampleComponent,
    CheckboxNegativeExampleComponent,
    CheckboxOutputsExampleComponent,
    CheckboxReactiveExampleComponent,
    CheckboxSimpleBindingExampleComponent,
    CheckboxStatesExampleComponent,
    CheckboxTemplateDrivenExampleComponent,
];

@NgModule({
    imports: [NxCheckboxModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class CheckboxExamplesModule {
    static components() {
        return {
            'checkbox-group-basic': CheckboxGroupBasicExampleComponent,
            'checkbox-group-dynamic': CheckboxGroupDynamicExampleComponent,
            'checkbox-group-horizontal':
                CheckboxGroupHorizontalExampleComponent,
            'checkbox-group-inheritance':
                CheckboxGroupInheritanceExampleComponent,
            'checkbox-group-label-size': CheckboxGroupLabelSizeExampleComponent,
            'checkbox-group-reactive': CheckboxGroupReactiveExampleComponent,
            'checkbox-group-validation':
                CheckboxGroupValidationExampleComponent,
            'checkbox-label-size': CheckboxLabelSizeExampleComponent,
            'checkbox-negative': CheckboxNegativeExampleComponent,
            'checkbox-outputs': CheckboxOutputsExampleComponent,
            'checkbox-reactive': CheckboxReactiveExampleComponent,
            'checkbox-simple-binding': CheckboxSimpleBindingExampleComponent,
            'checkbox-states': CheckboxStatesExampleComponent,
            'checkbox-template-driven': CheckboxTemplateDrivenExampleComponent,
        };
    }
}
