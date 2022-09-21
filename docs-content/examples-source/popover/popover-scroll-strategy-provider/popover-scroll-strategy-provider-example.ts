import { NX_POPOVER_SCROLL_STRATEGY } from '@allianz/ng-aquila/popover';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'popover-scroll-strategy-provider-example',
    templateUrl: 'popover-scroll-strategy-provider-example.html',
    styleUrls: ['popover-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_POPOVER_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
})
export class PopoverScrollStrategyProviderExampleComponent {}
