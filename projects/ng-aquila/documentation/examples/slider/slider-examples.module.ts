import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSliderModule } from '@aposin/ng-aquila/slider';

import { NgModule } from '@angular/core';
import { SliderBasicExampleComponent } from './slider-basic/slider-basic-example';
import { SliderDecimalExampleComponent } from './slider-decimal/slider-decimal-example';
import { SliderDefaultExampleComponent } from './slider-default/slider-default-example';
import { SliderDisabledExampleComponent } from './slider-disabled/slider-disabled-example';
import { SliderInvertedExampleComponent } from './slider-inverted/slider-inverted-example';
import { SliderLabelExampleComponent } from './slider-label/slider-label-example';
import { SliderNegativeExampleComponent } from './slider-negative/slider-negative-example';
import { SliderReactiveExampleComponent } from './slider-reactive/slider-reactive-example';
import { SliderTemplateExampleComponent } from './slider-template/slider-template-example';
import { SliderTextualExampleComponent } from './slider-textual/slider-textual-example';
import { SliderThumbExampleComponent } from './slider-thumb/slider-thumb-example';
import { SliderLabelsExampleComponent } from './slider-labels/slider-labels-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  SliderBasicExampleComponent,
  SliderDecimalExampleComponent,
  SliderDefaultExampleComponent,
  SliderDisabledExampleComponent,
  SliderInvertedExampleComponent,
  SliderLabelExampleComponent,
  SliderNegativeExampleComponent,
  SliderReactiveExampleComponent,
  SliderTemplateExampleComponent,
  SliderTextualExampleComponent,
  SliderThumbExampleComponent,
  SliderLabelsExampleComponent
];

@NgModule({
  imports: [
    NxSliderModule,
    NxInputModule,
    ExamplesSharedModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class SliderExamplesModule {
  static components() {
    return {
      'slider-basic': SliderBasicExampleComponent,
      'slider-decimal': SliderDecimalExampleComponent,
      'slider-default': SliderDefaultExampleComponent,
      'slider-disabled': SliderDisabledExampleComponent,
      'slider-inverted': SliderInvertedExampleComponent,
      'slider-label': SliderLabelExampleComponent,
      'slider-negative': SliderNegativeExampleComponent,
      'slider-reactive': SliderReactiveExampleComponent,
      'slider-template': SliderTemplateExampleComponent,
      'slider-textual': SliderTextualExampleComponent,
      'slider-thumb': SliderThumbExampleComponent,
      'slider-labels': SliderLabelsExampleComponent
    };
  }
}
