import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { ExamplesSharedModule } from '../examples-shared.module';
import { CardExampleComponent } from './card/card-example';
import { HighlightCardExampleComponent } from './highlight-card/highlight-card-example';
import { HighlightSelectableCardExampleComponent } from './highlight-selectable-card/highlight-selectable-card-example';
import { SelectableCardBasicExampleComponent } from './selectable-card-basic/selectable-card-basic-example';
import { SelectableCardDynamicExampleComponent } from './selectable-card-dynamic/selectable-card-dynamic-example';
import { SelectableCardExpertExampleComponent } from './selectable-card-expert/selectable-card-expert-example';
import { SelectableCardProductExampleComponent } from './selectable-card-product/selectable-card-product-example';
import { SelectableCardReactiveExampleComponent } from './selectable-card-reactive/selectable-card-reactive-example';
import { SelectableCardStatesExampleComponent } from './selectable-card-states/selectable-card-states-example';

const EXAMPLES = [
    CardExampleComponent,
    HighlightCardExampleComponent,
    HighlightSelectableCardExampleComponent,
    SelectableCardBasicExampleComponent,
    SelectableCardDynamicExampleComponent,
    SelectableCardReactiveExampleComponent,
    SelectableCardStatesExampleComponent,
    SelectableCardProductExampleComponent,
    SelectableCardExpertExampleComponent,
];

@NgModule({
    imports: [
        NxCardModule,
        NxIconModule,
        NxLinkModule,
        NxPopoverModule,
        ExamplesSharedModule,
        RouterModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class CardExamplesModule {
    static components() {
        return {
            card: CardExampleComponent,
            'highlight-card': HighlightCardExampleComponent,
            'selectable-card-basic': SelectableCardBasicExampleComponent,
            'selectable-card-dynamic': SelectableCardDynamicExampleComponent,
            'selectable-card-reactive': SelectableCardReactiveExampleComponent,
            'selectable-card-states': SelectableCardStatesExampleComponent,
            'highlight-selectable-card':
                HighlightSelectableCardExampleComponent,
            'selectable-card-product': SelectableCardProductExampleComponent,
            'selectable-card-expert': SelectableCardExpertExampleComponent,
        };
    }
}
