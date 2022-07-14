import { NgModule } from '@angular/core';
import { NxDataDisplayModule } from '@aposin/ng-aquila/data-display';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxListModule } from '@aposin/ng-aquila/list';
import { DataDisplayStandardExampleComponent } from './data-display-standard/data-display-standard-example';
import { DataDisplayCondensedExampleComponent } from './data-display-condensed/data-display-condensed-example';
import { DataDisplayExpertExampleComponent } from './data-display-expert/data-display-expert-example';
import { DataDisplayHorizontalExampleComponent } from './data-display-horizontal/data-display-horizontal-example';

const EXAMPLES = [
    DataDisplayStandardExampleComponent,
    DataDisplayCondensedExampleComponent,
    DataDisplayHorizontalExampleComponent,
    DataDisplayExpertExampleComponent,
];

@NgModule({
    imports: [NxDataDisplayModule, NxGridModule, NxLinkModule, NxListModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class DataDisplayExamplesModule {
    static components() {
        return {
            'data-display-standard': DataDisplayStandardExampleComponent,
            'data-display-condensed': DataDisplayCondensedExampleComponent,
            'data-display-horizontal': DataDisplayHorizontalExampleComponent,
            'data-display-expert': DataDisplayExpertExampleComponent,
        };
    }
}
