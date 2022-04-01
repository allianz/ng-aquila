import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NX_DROPDOWN_SCROLL_STRATEGY } from '@aposin/ng-aquila/dropdown';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'dropdown-scroll-strategy-provider-example',
    templateUrl: './dropdown-scroll-strategy-provider-example.html',
    styleUrls: ['./dropdown-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_DROPDOWN_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
})
export class DropdownScrollStrategyProviderExampleComponent {}
