import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { ExamplesSharedModule } from '../examples-shared.module';
import { CardExampleComponent } from './card/card-example';
import { ClickableCardExampleComponent } from './clickable-card/clickable-card-example';
import { ClickableCardDisabledExampleComponent } from './clickable-card-disabled/clickable-card-disabled-example';
import { ClickableCardRaisedContentExampleComponent } from './clickable-card-raised-content/clickable-card-raised-content-example';
import { HighlightCardExampleComponent } from './highlight-card/highlight-card-example';
import { HighlightSelectableCardExampleComponent } from './highlight-selectable-card/highlight-selectable-card-example';
import { SelectableCardBasicExampleComponent } from './selectable-card-basic/selectable-card-basic-example';
import { SelectableCardDynamicExampleComponent } from './selectable-card-dynamic/selectable-card-dynamic-example';
import { SelectableCardExpertExampleComponent } from './selectable-card-expert/selectable-card-expert-example';
import { SelectableCardProductExampleComponent } from './selectable-card-product/selectable-card-product-example';
import { SelectableCardRadioExampleComponent } from './selectable-card-radio/selectable-card-radio-example';
import { SelectableCardReactiveExampleComponent } from './selectable-card-reactive/selectable-card-reactive-example';
import { SelectableCardStatesExampleComponent } from './selectable-card-states/selectable-card-states-example';

const EXAMPLES = [
    ClickableCardExampleComponent,
    SelectableCardRadioExampleComponent,
    CardExampleComponent,
    HighlightCardExampleComponent,
    HighlightSelectableCardExampleComponent,
    SelectableCardBasicExampleComponent,
    SelectableCardDynamicExampleComponent,
    SelectableCardReactiveExampleComponent,
    SelectableCardStatesExampleComponent,
    SelectableCardProductExampleComponent,
    SelectableCardExpertExampleComponent,
    ClickableCardRaisedContentExampleComponent,
    ClickableCardDisabledExampleComponent,
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
            'clickable-card': ClickableCardExampleComponent,
            'clickable-card-raised-content':
                ClickableCardRaisedContentExampleComponent,
            'clickable-card-disabled': ClickableCardDisabledExampleComponent,
            'selectable-card-radio': SelectableCardRadioExampleComponent,
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
