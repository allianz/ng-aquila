import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NX_POPOVER_SCROLL_STRATEGY,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
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
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverScrollStrategyProviderExampleComponent {}
