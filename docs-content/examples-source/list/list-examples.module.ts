import { NxListModule } from '@allianz/ng-aquila/list';
import { NgModule } from '@angular/core';

import { ListCirclesExampleComponent } from './list-circles/list-circles-example';
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
        };
    }
}
