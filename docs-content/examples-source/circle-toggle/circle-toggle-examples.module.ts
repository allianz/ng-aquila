import { NxCircleToggleModule } from '@aposin/ng-aquila/circle-toggle';

import { NgModule } from '@angular/core';
import { CircleToggleGroupExampleComponent } from './circle-toggle-group/circle-toggle-group-example';
import { CircleToggleNegativeExampleComponent } from './circle-toggle-negative/circle-toggle-negative-example';
import { CircleToggleReactiveExampleComponent } from './circle-toggle-reactive/circle-toggle-reactive-example';
import { CircleToggleReactiveDisabledExampleComponent } from './circle-toggle-reactive-disabled/circle-toggle-reactive-disabled-example';
import { CircleToggleResponsiveExampleComponent } from './circle-toggle-responsive/circle-toggle-responsive-example';
import { CircleToggleSimpleBindingExampleComponent } from './circle-toggle-simple-binding/circle-toggle-simple-binding-example';
import { CircleToggleStandaloneExampleComponent } from './circle-toggle-standalone/circle-toggle-standalone-example';
import { CircleToggleTemplateDrivenExampleComponent } from './circle-toggle-template-driven/circle-toggle-template-driven-example';
import { CircleToggleTextExampleComponent } from './circle-toggle-text/circle-toggle-text-example';
import { ExamplesSharedModule } from '../examples-shared.module';
import { CircleToggleGroupExpertExampleComponent } from './circle-toggle-group-expert/circle-toggle-group-expert-example';

const EXAMPLES = [
  CircleToggleGroupExampleComponent,
  CircleToggleNegativeExampleComponent,
  CircleToggleReactiveExampleComponent,
  CircleToggleReactiveDisabledExampleComponent,
  CircleToggleResponsiveExampleComponent,
  CircleToggleSimpleBindingExampleComponent,
  CircleToggleStandaloneExampleComponent,
  CircleToggleTemplateDrivenExampleComponent,
  CircleToggleTextExampleComponent,
  CircleToggleGroupExpertExampleComponent
];

 @NgModule({
  imports: [
    NxCircleToggleModule,
    ExamplesSharedModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class CircleExamplesModule {
  static components() {
    return {
      'circle-toggle-group': CircleToggleGroupExampleComponent,
      'circle-toggle-negative': CircleToggleNegativeExampleComponent,
      'circle-toggle-reactive': CircleToggleReactiveExampleComponent,
      'circle-toggle-reactive-disabled': CircleToggleReactiveDisabledExampleComponent,
      'circle-toggle-responsive': CircleToggleResponsiveExampleComponent,
      'circle-toggle-simple-binding': CircleToggleSimpleBindingExampleComponent,
      'circle-toggle-standalone': CircleToggleStandaloneExampleComponent,
      'circle-toggle-template-driven': CircleToggleTemplateDrivenExampleComponent,
      'circle-toggle-text': CircleToggleTextExampleComponent,
      'circle-toggle-group-expert': CircleToggleGroupExpertExampleComponent
    };
  }
}
