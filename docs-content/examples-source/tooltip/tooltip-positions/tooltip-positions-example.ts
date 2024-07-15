import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxTooltipDirective, TooltipPosition } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip positions
 */
@Component({
    selector: 'tooltip-positions-example',
    templateUrl: './tooltip-positions-example.html',
    styleUrls: ['./tooltip-positions-example.css'],
    standalone: true,
    imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipPositionsExampleComponent {
    positions: TooltipPosition[];

    constructor() {
        this.positions = ['top', 'right', 'bottom', 'left'];
    }
}
