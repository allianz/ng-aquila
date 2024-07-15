import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import {
    NX_TOOLTIP_SCROLL_STRATEGY,
    NxTooltipDirective,
} from '@aposin/ng-aquila/tooltip';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'tooltip-scroll-strategy-provider-example',
    templateUrl: './tooltip-scroll-strategy-provider-example.html',
    styleUrls: ['./tooltip-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_TOOLTIP_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
    standalone: true,
    imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipScrollStrategyProviderExampleComponent {}
