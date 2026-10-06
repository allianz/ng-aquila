import { NxAccordionModule } from '@allianz/ng-aquila/accordion';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from './../examples-shared.module';
import { AccordionExampleComponent } from './accordion/accordion-example';
import { AccordionErrorExampleComponent } from './accordion-error/accordion-error-example';
import { AccordionExtraLightExampleComponent } from './accordion-extra-light/accordion-extra-light-example';
import { AccordionExtraLightInverseExampleComponent } from './accordion-extra-light-inverse/accordion-extra-light-inverse-example';
import { AccordionFlushExampleComponent } from './accordion-flush/accordion-flush-example';
import { AccordionInverseExampleComponent } from './accordion-inverse/accordion-inverse-example';
import { AccordionLazyExampleComponent } from './accordion-lazy/accordion-lazy-example';
import { AccordionLightExampleComponent } from './accordion-light/accordion-light-example';
import { AccordionLightInverseExampleComponent } from './accordion-light-inverse/accordion-light-inverse-example';
import { AccordionMultiExampleComponent } from './accordion-multi/accordion-multi-example';
import { AccordionScrollSmoothExampleComponent } from './accordion-scroll-smooth/accordion-scroll-smooth-example';
import { AccordionStandaloneExampleComponent } from './accordion-standalone/accordion-standalone-example';

const EXAMPLES = [
  AccordionExampleComponent,
  AccordionErrorExampleComponent,
  AccordionExtraLightExampleComponent,
  AccordionExtraLightInverseExampleComponent,
  AccordionLazyExampleComponent,
  AccordionLightExampleComponent,
  AccordionLightInverseExampleComponent,
  AccordionMultiExampleComponent,
  AccordionInverseExampleComponent,
  AccordionStandaloneExampleComponent,
  AccordionScrollSmoothExampleComponent,
];

@NgModule({
  imports: [
    NxAccordionModule,
    NxInputModule,
    NxIconModule,
    NxMessageModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class AccordionExamplesModule {
  static components() {
    return {
      accordion: AccordionExampleComponent,
      'accordion-error': AccordionErrorExampleComponent,
      'accordion-extra-light': AccordionExtraLightExampleComponent,
      'accordion-extra-light-inverse':
        AccordionExtraLightInverseExampleComponent,
      'accordion-lazy': AccordionLazyExampleComponent,
      'accordion-light': AccordionLightExampleComponent,
      'accordion-light-inverse': AccordionLightInverseExampleComponent,
      'accordion-multi': AccordionMultiExampleComponent,
      'accordion-inverse': AccordionInverseExampleComponent,
      'accordion-standalone': AccordionStandaloneExampleComponent,
      'accordion-scroll-smooth': AccordionScrollSmoothExampleComponent,
      'accordion-flush': AccordionFlushExampleComponent,
    };
  }
}
