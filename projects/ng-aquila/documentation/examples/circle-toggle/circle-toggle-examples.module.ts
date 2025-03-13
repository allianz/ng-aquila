import { NgModule } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxCircleToggleModule } from '@aposin/ng-aquila/circle-toggle';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';

import { ExamplesSharedModule } from '../examples-shared.module';
import { CircleToggleExpertExampleComponent } from './circle-toggle-expert/circle-toggle-expert-example';
import { CircleToggleGroupExampleComponent } from './circle-toggle-group/circle-toggle-group-example';
import { CircleToggleGroupExpertExampleComponent } from './circle-toggle-group-expert/circle-toggle-group-expert-example';
import { CircleToggleLayoutExampleComponent } from './circle-toggle-layout/circle-toggle-layout-example';
import { CircleToggleNegativeExampleComponent } from './circle-toggle-negative/circle-toggle-negative-example';
import { CircleToggleReactiveExampleComponent } from './circle-toggle-reactive/circle-toggle-reactive-example';
import { CircleToggleReactiveDisabledExampleComponent } from './circle-toggle-reactive-disabled/circle-toggle-reactive-disabled-example';
import { CircleToggleReadonlyExampleComponent } from './circle-toggle-readonly/circle-toggle-readonly-example';
import { CircleToggleResponsiveExampleComponent } from './circle-toggle-responsive/circle-toggle-responsive-example';
import { CircleToggleSimpleBindingExampleComponent } from './circle-toggle-simple-binding/circle-toggle-simple-binding-example';
import { CircleToggleStandaloneExampleComponent } from './circle-toggle-standalone/circle-toggle-standalone-example';
import { CircleToggleTemplateDrivenExampleComponent } from './circle-toggle-template-driven/circle-toggle-template-driven-example';
import { CircleToggleTextExampleComponent } from './circle-toggle-text/circle-toggle-text-example';
import { CircleToggleValidationExampleComponent } from './circle-toggle-validation/circle-toggle-validation-example';

const EXAMPLES = [
    CircleToggleGroupExampleComponent,
    CircleToggleLayoutExampleComponent,
    CircleToggleNegativeExampleComponent,
    CircleToggleReactiveExampleComponent,
    CircleToggleReactiveDisabledExampleComponent,
    CircleToggleResponsiveExampleComponent,
    CircleToggleSimpleBindingExampleComponent,
    CircleToggleStandaloneExampleComponent,
    CircleToggleTemplateDrivenExampleComponent,
    CircleToggleTextExampleComponent,
    CircleToggleGroupExpertExampleComponent,
    CircleToggleValidationExampleComponent,
    CircleToggleReadonlyExampleComponent,
    CircleToggleExpertExampleComponent,
];

@NgModule({
    imports: [
        NxCircleToggleModule,
        ExamplesSharedModule,
        NxErrorModule,
        NxFormfieldModule,
        EXAMPLES,
    ],
    exports: [EXAMPLES],
})
export class CircleExamplesModule {
    static components() {
        return {
            'circle-toggle-group': CircleToggleGroupExampleComponent,
            'circle-toggle-layout': CircleToggleLayoutExampleComponent,
            'circle-toggle-negative': CircleToggleNegativeExampleComponent,
            'circle-toggle-reactive': CircleToggleReactiveExampleComponent,
            'circle-toggle-reactive-disabled':
                CircleToggleReactiveDisabledExampleComponent,
            'circle-toggle-responsive': CircleToggleResponsiveExampleComponent,
            'circle-toggle-simple-binding':
                CircleToggleSimpleBindingExampleComponent,
            'circle-toggle-standalone': CircleToggleStandaloneExampleComponent,
            'circle-toggle-template-driven':
                CircleToggleTemplateDrivenExampleComponent,
            'circle-toggle-text': CircleToggleTextExampleComponent,
            'circle-toggle-group-expert':
                CircleToggleGroupExpertExampleComponent,
            'circle-toggle-validation': CircleToggleValidationExampleComponent,
            'circle-toggle-readonly': CircleToggleReadonlyExampleComponent,
            'circle-toggle-expert': CircleToggleExpertExampleComponent,
        };
    }
}
