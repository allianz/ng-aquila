import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NX_CONTEXT_MENU_SCROLL_STRATEGY,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
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
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxIconButtonComponent,
        NxContextMenuTriggerDirective,
        NxIconComponent,
    ],
})
export class ContextMenuScrollStrategyProviderExampleComponent {}
