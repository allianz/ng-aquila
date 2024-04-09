import { NgModule } from '@angular/core';
import { NxListModule } from '@aposin/ng-aquila/list';

import { ListCirclesExampleComponent } from './list-circles/list-circles-example';
import { ListCondensedExampleComponent } from './list-condensed/list-condensed-example';
import { ListCopytextExampleComponent } from './list-copytext/list-copytext-example';
import { ListCustomColorExampleComponent } from './list-custom-color/list-custom-color-example';
import { ListIconsExampleComponent } from './list-icons/list-icons-example';
import { ListNegativeExampleComponent } from './list-negative/list-negative-example';
import { ListNestingExampleComponent } from './list-nesting/list-nesting-example';
import { ListOrderedExampleComponent } from './list-ordered/list-ordered-example';
import { ListUnorderedExampleComponent } from './list-unordered/list-unordered-example';

const EXAMPLES = [
    ListCirclesExampleComponent,
    ListCopytextExampleComponent,
    ListCustomColorExampleComponent,
    ListIconsExampleComponent,
    ListNegativeExampleComponent,
    ListNestingExampleComponent,
    ListOrderedExampleComponent,
    ListUnorderedExampleComponent,
    ListCondensedExampleComponent,
];

@NgModule({
    imports: [NxListModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ListExamplesModule {
    static components() {
        return {
            'list-circles': ListCirclesExampleComponent,
            'list-copytext': ListCopytextExampleComponent,
            'list-custom-color': ListCustomColorExampleComponent,
            'list-icons': ListIconsExampleComponent,
            'list-negative': ListNegativeExampleComponent,
            'list-nesting': ListNestingExampleComponent,
            'list-ordered': ListOrderedExampleComponent,
            'list-unordered': ListUnorderedExampleComponent,
            'list-condensed': ListCondensedExampleComponent,
        };
    }
}
