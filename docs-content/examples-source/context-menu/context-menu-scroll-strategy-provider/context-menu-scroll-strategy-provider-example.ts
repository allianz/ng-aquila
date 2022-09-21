import { NX_CONTEXT_MENU_SCROLL_STRATEGY } from '@allianz/ng-aquila/context-menu';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'context-menu-scroll-strategy-provider-example',
    templateUrl: './context-menu-scroll-strategy-provider-example.html',
    styleUrls: ['./context-menu-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_CONTEXT_MENU_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
})
export class ContextMenuScrollStrategyProviderExampleComponent {}
