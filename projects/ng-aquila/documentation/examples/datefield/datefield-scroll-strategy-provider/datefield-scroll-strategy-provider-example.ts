import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NX_DATEPICKER_SCROLL_STRATEGY } from '@aposin/ng-aquila/datefield';
import { Moment } from 'moment';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'datefield-scroll-strategy-provider-example',
    templateUrl: './datefield-scroll-strategy-provider-example.html',
    styleUrls: ['./datefield-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_DATEPICKER_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
})
export class DatefieldScrollStrategyProviderExampleComponent {
    currentDate: Moment | null = null;
}
