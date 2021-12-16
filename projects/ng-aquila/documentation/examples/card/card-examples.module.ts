import { RouterModule } from '@angular/router';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxCardModule } from '@aposin/ng-aquila/card';

import { NgModule } from '@angular/core';
import { CardExampleComponent } from './card/card-example';
import { SelectableCardBasicExampleComponent } from './selectable-card-basic/selectable-card-basic-example';
import { SelectableCardDynamicExampleComponent } from './selectable-card-dynamic/selectable-card-dynamic-example';
import { SelectableCardReactiveExampleComponent } from './selectable-card-reactive/selectable-card-reactive-example';
import { SelectableCardStatesExampleComponent } from './selectable-card-states/selectable-card-states-example';
import { ExamplesSharedModule } from '../examples-shared.module';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { SelectableCardProductExampleComponent } from './selectable-card-product/selectable-card-product-example';
import { SelectableCardExpertExampleComponent } from './selectable-card-expert/selectable-card-expert-example';

const EXAMPLES = [
    CardExampleComponent,
    SelectableCardBasicExampleComponent,
    SelectableCardDynamicExampleComponent,
    SelectableCardReactiveExampleComponent,
    SelectableCardStatesExampleComponent,
    SelectableCardProductExampleComponent,
    SelectableCardExpertExampleComponent,
];

@NgModule({
    imports: [NxCardModule, NxIconModule, NxLinkModule, NxPopoverModule, ExamplesSharedModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class CardExamplesModule {
    static components() {
        return {
            card: CardExampleComponent,
            'selectable-card-basic': SelectableCardBasicExampleComponent,
            'selectable-card-dynamic': SelectableCardDynamicExampleComponent,
            'selectable-card-reactive': SelectableCardReactiveExampleComponent,
            'selectable-card-states': SelectableCardStatesExampleComponent,
            'selectable-card-product': SelectableCardProductExampleComponent,
            'selectable-card-expert': SelectableCardExpertExampleComponent,
        };
    }
}
