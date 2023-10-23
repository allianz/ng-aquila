import { NgModule } from '@angular/core';
import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMessageModule } from '@aposin/ng-aquila/message';

import { ExamplesSharedModule } from './../examples-shared.module';
import { AccordionExampleComponent } from './accordion/accordion-example';
import { AccordionErrorExampleComponent } from './accordion-error/accordion-error-example';
import { AccordionExtraLightExampleComponent } from './accordion-extra-light/accordion-extra-light-example';
import { AccordionExtraLightNegativeExampleComponent } from './accordion-extra-light-negative/accordion-extra-light-negative-example';
import { AccordionLazyExampleComponent } from './accordion-lazy/accordion-lazy-example';
import { AccordionLightExampleComponent } from './accordion-light/accordion-light-example';
import { AccordionLightNegativeExampleComponent } from './accordion-light-negative/accordion-light-negative-example';
import { AccordionMultiExampleComponent } from './accordion-multi/accordion-multi-example';
import { AccordionNegativeExampleComponent } from './accordion-negative/accordion-negative-example';
import { AccordionScrollSmoothExampleComponent } from './accordion-scroll-smooth/accordion-scroll-smooth-example';
import { AccordionStandaloneExampleComponent } from './accordion-standalone/accordion-standalone-example';

const EXAMPLES = [
    AccordionExampleComponent,
    AccordionErrorExampleComponent,
    AccordionExtraLightExampleComponent,
    AccordionExtraLightNegativeExampleComponent,
    AccordionLazyExampleComponent,
    AccordionLightExampleComponent,
    AccordionLightNegativeExampleComponent,
    AccordionMultiExampleComponent,
    AccordionNegativeExampleComponent,
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
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class AccordionExamplesModule {
    static components() {
        return {
            accordion: AccordionExampleComponent,
            'accordion-error': AccordionErrorExampleComponent,
            'accordion-extra-light': AccordionExtraLightExampleComponent,
            'accordion-extra-light-negative':
                AccordionExtraLightNegativeExampleComponent,
            'accordion-lazy': AccordionLazyExampleComponent,
            'accordion-light': AccordionLightExampleComponent,
            'accordion-light-negative': AccordionLightNegativeExampleComponent,
            'accordion-multi': AccordionMultiExampleComponent,
            'accordion-negative': AccordionNegativeExampleComponent,
            'accordion-standalone': AccordionStandaloneExampleComponent,
            'accordion-scroll-smooth': AccordionScrollSmoothExampleComponent,
        };
    }
}
