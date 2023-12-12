import { NgModule } from '@angular/core';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { PaginationA11yExampleComponent } from './pagination-a11y/pagination-a11y-example';
import { PaginationAdvancedExampleComponent } from './pagination-advanced/pagination-advanced-example';
import { PaginationLocalizeExampleComponent } from './pagination-localize/pagination-localize-example';
import { PaginationLocalizeAdvancedExampleComponent } from './pagination-localize-advanced/pagination-localize-advanced-example';
import { PaginationSimpleExampleComponent } from './pagination-simple/pagination-simple-example';
import { PaginationSliderExampleComponent } from './pagination-slider/pagination-slider-example';

const EXAMPLES = [
    PaginationAdvancedExampleComponent,
    PaginationLocalizeExampleComponent,
    PaginationLocalizeAdvancedExampleComponent,
    PaginationSimpleExampleComponent,
    PaginationA11yExampleComponent,
    PaginationSliderExampleComponent,
];

@NgModule({
    imports: [
        NxPaginationModule,
        NxTableModule,
        NxHeadlineModule,
        NxMessageModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class PaginationExamplesModule {
    static components() {
        return {
            'pagination-advanced': PaginationAdvancedExampleComponent,
            'pagination-localize': PaginationLocalizeExampleComponent,
            'pagination-localize-advanced':
                PaginationLocalizeAdvancedExampleComponent,
            'pagination-simple': PaginationSimpleExampleComponent,
            'pagination-a11y': PaginationA11yExampleComponent,
            'pagination-slider': PaginationSliderExampleComponent,
        };
    }
}
